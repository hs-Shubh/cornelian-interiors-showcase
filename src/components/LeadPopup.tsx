import { useState, useEffect, type FormEvent } from "react";
import { X } from "lucide-react";
import { submitLead } from "@/lib/api/leads";
import { isSupabaseConfigured } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { trackLead } from "@/lib/analytics";

const SEEN_KEY = "cei_lead_popup_seen";
const DELAY_MS = 30000;
const inputClass =
  "w-full px-4 py-3 bg-background border border-hairline font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors rounded-sm";

/**
 * One-time (per session) lead popup shown after 30s of browsing. Saves directly
 * to Supabase `leads` — no automation needed. Dismissible; never re-shows once
 * seen or submitted in the session.
 */
export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SEEN_KEY)) return;
    const t = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem(SEEN_KEY, "1");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitLead({
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      message: form.message || "Requested a callback (popup).",
      source: "popup",
    });
    setSubmitting(false);
    if (res.success) {
      trackLead("popup");
      toast({ title: "Thank you!", description: "Our team will reach out shortly." });
      close();
    } else {
      toast({
        title: "Couldn't submit",
        description: res.error ?? "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm" onClick={close} />
      <div className="relative z-10 w-full max-w-md bg-card border border-hairline rounded-sm p-8 shadow-2xl">
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={20} />
        </button>
        <p className="luxury-label text-accent mb-3">Free Consultation</p>
        <h3 className="font-display text-3xl text-cream mb-2">Let's design your space</h3>
        <p className="luxury-body-sm mb-6">
          Leave your details and our team will reach out with ideas for your home.
        </p>
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            required
            placeholder="Your name"
            className={inputClass}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            required
            type="email"
            placeholder="Email"
            className={inputClass}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Phone / WhatsApp"
            className={inputClass}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <textarea
            placeholder="Tell us about your project (optional)"
            rows={3}
            className={inputClass}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-accent text-accent-foreground py-3 font-body text-xs tracking-[0.14em] uppercase rounded-sm transition-colors hover:bg-cornelian-glow disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Request Callback"}
          </button>
        </form>
        {!isSupabaseConfigured && (
          <p className="mt-3 text-[11px] text-muted-foreground">
            Note: backend not configured — submissions won't be saved yet.
          </p>
        )}
      </div>
    </div>
  );
}
