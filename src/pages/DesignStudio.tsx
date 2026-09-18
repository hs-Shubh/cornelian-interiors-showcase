import { useState } from "react";
import {
  Sofa,
  BedDouble,
  UtensilsCrossed,
  Baby,
  CookingPot,
  Briefcase,
  Sparkles,
  Loader2,
  Check,
  MessageCircle,
  CalendarClock,
  type LucideIcon,
} from "lucide-react";
import { SeoHead } from "@/components/SeoHead";
import { Quote } from "@/components/Quote";
import { quoteByIndex } from "@/data/quotes";
import { Reveal } from "@/components/Parallax";
import { getSupabaseClient } from "@/lib/supabase";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Local styling primitives (mirrors LeadInquiryForm inputClass; kept
 * local per assignment so this page owns its own form styles).
 * ------------------------------------------------------------------ */
const inputClass =
  "w-full px-4 py-3 bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors";
const labelClass = "luxury-label block mb-3";

const WHATSAPP_URL = "https://wa.me/919720130734";

/* ------------------------------------------------------------------ *
 * Option data
 * ------------------------------------------------------------------ */
interface RoomOption {
  value: string;
  label: string;
  icon: LucideIcon;
}

const ROOM_TYPES: RoomOption[] = [
  { value: "living", label: "Living Room", icon: Sofa },
  { value: "bedroom", label: "Bedroom", icon: BedDouble },
  { value: "kitchen", label: "Kitchen", icon: CookingPot },
  { value: "kids", label: "Kids Room", icon: Baby },
  { value: "dining", label: "Dining", icon: UtensilsCrossed },
  { value: "office", label: "Home Office", icon: Briefcase },
];

const STYLES = [
  "Modern",
  "Classical",
  "Minimal",
  "Luxury",
  "Indian Contemporary",
  "Scandinavian",
];

const PALETTES = [
  "Warm Neutrals",
  "Cornelian & Cream",
  "Sage & Oak",
  "Monochrome",
  "Jewel Tones",
];

const BUDGETS = [
  "Under ₹5 Lakh",
  "₹5 – 10 Lakh",
  "₹10 – 25 Lakh",
  "₹25 – 50 Lakh",
  "₹50 Lakh+",
];

/* ------------------------------------------------------------------ *
 * Types
 * ------------------------------------------------------------------ */
type Status = "idle" | "loading" | "images" | "success";

interface DesignPayload {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  room_type: string;
  length_ft: number | null;
  width_ft: number | null;
  height_ft: number | null;
  styles: string[];
  palette: string;
  budget: string;
}

/* ------------------------------------------------------------------ *
 * Persistence fallback — save to Supabase `inquiries` when the design
 * webhook is absent or fails. Never throws; the caller always resolves
 * to a friendly success state so the visitor is never shown a crash.
 * ------------------------------------------------------------------ */
async function saveToSupabase(payload: DesignPayload): Promise<void> {
  const client = getSupabaseClient();
  if (!client) return; // Supabase not configured — still resolve gracefully.

  const dims =
    payload.length_ft && payload.width_ft
      ? `${payload.length_ft} × ${payload.width_ft}${payload.height_ft ? ` × ${payload.height_ft}` : ""} ft`
      : "";
  const message = [
    payload.styles.length ? `Styles: ${payload.styles.join(", ")}` : "",
    payload.palette ? `Palette: ${payload.palette}` : "",
    payload.budget ? `Budget: ${payload.budget}` : "",
    payload.whatsapp ? `WhatsApp: ${payload.whatsapp}` : "",
  ]
    .filter(Boolean)
    .join(" · ");

  try {
    await client.from("inquiries").insert({
      name: payload.name,
      email: payload.email,
      phone: payload.phone || null,
      message: message || null,
      inquiry_type: "design-studio",
      product_type: payload.room_type || null,
      source: "design-studio",
      page_path: "/design-studio",
      dimensions_text: dims || null,
      status: "new",
    });
  } catch {
    /* swallow — success UI is shown regardless */
  }
}

const DesignStudio = () => {
  const quote = quoteByIndex(5);

  const [roomType, setRoomType] = useState<string>("living");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [styles, setStyles] = useState<string[]>([]);
  const [palette, setPalette] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [images, setImages] = useState<string[]>([]);
  const roomLabel =
    ROOM_TYPES.find((r) => r.value === roomType)?.label ?? "room";

  const toggleStyle = (s: string) =>
    setStyles((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const toNum = (v: string): number | null => {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    const payload: DesignPayload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      whatsapp: whatsapp.trim() || phone.trim(),
      room_type: roomType,
      length_ft: toNum(length),
      width_ft: toNum(width),
      height_ft: toNum(height),
      styles,
      palette,
      budget,
    };

    setStatus("loading");

    const webhook = import.meta.env.VITE_N8N_DESIGN_WEBHOOK_URL as
      | string
      | undefined;

    if (webhook && webhook.trim()) {
      try {
        const res = await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
        const data: unknown = await res.json().catch(() => null);
        let urls: unknown = null;
        if (data && typeof data === "object" && "image_urls" in data) {
          urls = data.image_urls;
        }
        if (Array.isArray(urls) && urls.length > 0) {
          setImages(urls.filter((u): u is string => typeof u === "string"));
          setStatus("images");
          return;
        }
        // Webhook succeeded but returned no images — graceful success.
        setStatus("success");
        return;
      } catch {
        // Webhook failed — fall through to Supabase persistence.
        await saveToSupabase(payload);
        setStatus("success");
        return;
      }
    }

    // No webhook configured — persist directly (or no-op if Supabase absent).
    await saveToSupabase(payload);
    setStatus("success");
  };

  /* ---------------------------------------------------------------- *
   * Result states
   * ---------------------------------------------------------------- */
  if (status === "images") {
    return (
      <>
        <SeoHead
          title="AI Design Studio | Cornelian"
          description="Preview your room in a Cornelian-crafted concept. Free AI-generated interior design previews tailored to your space, style and palette."
        />
        <section className="pt-32 pb-24 bg-background min-h-screen">
          <div className="luxury-container">
            <Reveal>
              <p className="luxury-label mb-4 text-accent">Your Concept</p>
              <h1 className="luxury-heading-xl mb-6">A First Look at Your Space</h1>
              <div className="luxury-divider" />
              <p className="luxury-body max-w-2xl mt-8">
                Here is an AI-crafted preview of your {roomLabel.toLowerCase()}.
                Our designers can refine these directions into a fully realised, buildable scheme.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((src, i) => (
                <Reveal key={src} delay={i * 0.08}>
                  <figure className="group relative overflow-hidden border border-hairline bg-secondary">
                    <img
                      src={src}
                      alt={`AI concept ${i + 1} for your ${roomLabel}`}
                      loading="lazy"
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </figure>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-16">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-body text-sm uppercase tracking-[0.18em] hover:opacity-90 transition-opacity"
                >
                  <CalendarClock className="w-4 h-4" /> Book a Consultation
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-border text-foreground font-body text-sm uppercase tracking-[0.18em] hover:border-accent transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Continue on WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </>
    );
  }

  if (status === "success") {
    return (
      <>
        <SeoHead
          title="AI Design Studio | Cornelian"
          description="Preview your room in a Cornelian-crafted concept. Free AI-generated interior design previews tailored to your space, style and palette."
        />
        <section className="pt-32 pb-24 bg-background min-h-screen flex items-center">
          <div className="luxury-container">
            <Reveal className="max-w-2xl">
              <div className="w-14 h-14 border border-accent flex items-center justify-center mb-8">
                <Check className="w-6 h-6 text-accent" strokeWidth={1.5} />
              </div>
              <p className="luxury-label mb-4 text-accent">Request Received</p>
              <h1 className="luxury-heading-lg mb-6">Your Concept Is In Motion</h1>
              <div className="luxury-divider" />
              <p className="luxury-body mt-8">
                Your concept request is in — our team will send your AI previews to your
                WhatsApp/email shortly. In the meantime, feel free to reach us directly.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-body text-sm uppercase tracking-[0.18em] hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-4 h-4" /> Message Us on WhatsApp
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-border text-foreground font-body text-sm uppercase tracking-[0.18em] hover:border-accent transition-colors"
                >
                  <CalendarClock className="w-4 h-4" /> Book a Consultation
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </>
    );
  }

  /* ---------------------------------------------------------------- *
   * Form (idle / loading)
   * ---------------------------------------------------------------- */
  return (
    <>
      <SeoHead
        title="AI Design Studio | Cornelian"
        description="Preview your room in a Cornelian-crafted concept. Free AI-generated interior design previews tailored to your space, style and palette."
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-secondary" aria-labelledby="ds-heading">
        <div className="luxury-container">
          <p className="luxury-label mb-4 flex items-center gap-2 text-accent">
            <Sparkles className="w-4 h-4" /> Free AI Preview
          </p>
          <h1 id="ds-heading" className="luxury-heading-xl mb-6">
            Visualize Your Room
          </h1>
          <div className="luxury-divider" />
          <p className="luxury-body max-w-2xl mt-8">
            Tell us about your space and we will craft an AI-generated concept in the
            unmistakable Cornelian language — warm, layered and quietly luxurious. It takes
            a minute, and it is entirely complimentary.
          </p>
        </div>
      </section>

      <Quote quote={quote.quote} author={quote.author} />

      {/* Form */}
      <section className="luxury-section bg-background">
        <div className="luxury-container">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-16">
            {/* Room type */}
            <Reveal>
              <fieldset>
                <legend className={labelClass}>1 — Which room are we designing?</legend>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ROOM_TYPES.map(({ value, label, icon: Icon }) => {
                    const active = roomType === value;
                    return (
                      <button
                        type="button"
                        key={value}
                        onClick={() => setRoomType(value)}
                        aria-pressed={active}
                        className={cn(
                          "flex flex-col items-center justify-center gap-3 py-6 border transition-colors",
                          active
                            ? "border-accent bg-secondary text-foreground"
                            : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
                        )}
                      >
                        <Icon
                          className={cn("w-6 h-6", active && "text-accent")}
                          strokeWidth={1.4}
                        />
                        <span className="font-body text-xs uppercase tracking-[0.14em]">
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </Reveal>

            {/* Dimensions */}
            <Reveal>
              <fieldset>
                <legend className={labelClass}>2 — Approximate dimensions (ft)</legend>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="ds-length" className="luxury-body-sm mb-2 block text-muted-foreground">
                      Length
                    </label>
                    <input
                      id="ds-length"
                      type="number"
                      min="0"
                      inputMode="decimal"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="16"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="ds-width" className="luxury-body-sm mb-2 block text-muted-foreground">
                      Width
                    </label>
                    <input
                      id="ds-width"
                      type="number"
                      min="0"
                      inputMode="decimal"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="12"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="ds-height" className="luxury-body-sm mb-2 block text-muted-foreground">
                      Height
                    </label>
                    <input
                      id="ds-height"
                      type="number"
                      min="0"
                      inputMode="decimal"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="10"
                      className={inputClass}
                    />
                  </div>
                </div>
              </fieldset>
            </Reveal>

            {/* Styles (multi) */}
            <Reveal>
              <fieldset>
                <legend className={labelClass}>
                  3 — Which styles speak to you?{" "}
                  <span className="text-muted-foreground normal-case tracking-normal">
                    (choose any)
                  </span>
                </legend>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {STYLES.map((s) => {
                    const active = styles.includes(s);
                    return (
                      <button
                        type="button"
                        key={s}
                        onClick={() => toggleStyle(s)}
                        aria-pressed={active}
                        className={cn(
                          "relative flex items-center justify-center py-4 px-3 border text-center font-body text-sm transition-colors",
                          active
                            ? "border-accent bg-secondary text-foreground"
                            : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
                        )}
                      >
                        {active && (
                          <Check
                            className="absolute left-3 w-4 h-4 text-accent"
                            strokeWidth={2}
                          />
                        )}
                        {s}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </Reveal>

            {/* Palette */}
            <Reveal>
              <fieldset>
                <legend className={labelClass}>4 — Preferred palette</legend>
                <div className="flex flex-wrap gap-3">
                  {PALETTES.map((p) => {
                    const active = palette === p;
                    return (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setPalette(active ? "" : p)}
                        aria-pressed={active}
                        className={cn(
                          "px-5 py-2.5 border font-body text-sm transition-colors",
                          active
                            ? "border-accent bg-accent text-accent-foreground"
                            : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
                        )}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </Reveal>

            {/* Budget */}
            <Reveal>
              <fieldset>
                <legend className={labelClass}>
                  5 — Budget{" "}
                  <span className="text-muted-foreground normal-case tracking-normal">
                    (optional)
                  </span>
                </legend>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className={cn(inputClass, "appearance-none")}
                  aria-label="Budget range"
                >
                  <option value="">Prefer not to say</option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </fieldset>
            </Reveal>

            {/* Contact */}
            <Reveal>
              <fieldset>
                <legend className={labelClass}>6 — Where do we send your preview?</legend>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="ds-name" className="luxury-body-sm mb-2 block text-muted-foreground">
                      Full name
                    </label>
                    <input
                      id="ds-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="ds-email" className="luxury-body-sm mb-2 block text-muted-foreground">
                      Email
                    </label>
                    <input
                      id="ds-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="ds-phone" className="luxury-body-sm mb-2 block text-muted-foreground">
                      Phone
                    </label>
                    <input
                      id="ds-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 …"
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="ds-whatsapp" className="luxury-body-sm mb-2 block text-muted-foreground">
                      WhatsApp{" "}
                      <span className="text-muted-foreground/70">
                        (optional — if different from phone)
                      </span>
                    </label>
                    <input
                      id="ds-whatsapp"
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+91 …"
                      className={inputClass}
                    />
                  </div>
                </div>
              </fieldset>
            </Reveal>

            {/* CTA */}
            <Reveal>
              <div className="hairline-t pt-10">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-accent text-accent-foreground font-body text-sm uppercase tracking-[0.2em] hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-wait"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Rendering your concept…
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate my concept
                    </>
                  )}
                </button>
                <p className="luxury-body-sm text-muted-foreground mt-4">
                  No obligation. Your details are used only to prepare and share your preview.
                </p>
              </div>
            </Reveal>
          </form>
        </div>
      </section>
    </>
  );
};

export default DesignStudio;
