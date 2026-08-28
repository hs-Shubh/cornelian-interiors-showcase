import { useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { trackLead } from "@/lib/analytics";

const inputClass =
  "w-full px-4 py-3 bg-background border border-hairline font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors rounded-sm";

/**
 * "Try the Design Studio" CTA that first captures the visitor's name + contact
 * (saved to Supabase `design_requests`) and then routes to /design-studio.
 * Never blocks the visitor: if the save fails or Supabase isn't configured it
 * still proceeds to the studio.
 */
export function DesignStudioCTA({
  label = "Try the Design Studio",
  className,
}: {
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "" });
  const navigate = useNavigate();

  const proceed = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const isEmail = form.contact.includes("@");
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        await supabase.from("design_requests").insert({
          name: form.name,
          email: isEmail ? form.contact : null,
          phone: isEmail ? null : form.contact,
          whatsapp: isEmail ? null : form.contact,
          status: "studio_entry",
        });
      }
    } catch {
      /* never block entry on a save error */
    }
    setSubmitting(false);
    trackLead("ai-studio-gate");
    navigate("/design-studio");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group inline-flex items-center gap-3 bg-accent text-accent-foreground px-10 py-4 font-body text-sm tracking-[0.12em] uppercase transition-colors duration-500 hover:bg-cornelian-glow",
          className
        )}
      >
        {label}
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>

      {open && createPortal(
        <div className="fixed inset-0 z-[85] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-md bg-card border border-hairline rounded-sm p-8 shadow-2xl text-left">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>
            <p className="luxury-label text-accent mb-3">AI Design Studio</p>
            <h3 className="font-display text-3xl text-cream mb-2">Before we begin</h3>
            <p className="luxury-body-sm mb-6">
              Tell us who you are — we'll send your AI concepts and a designer will follow up.
            </p>
            <form onSubmit={proceed} className="space-y-3">
              <input
                required
                placeholder="Your name"
                className={inputClass}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                required
                placeholder="Phone / WhatsApp or email"
                className={inputClass}
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 font-body text-xs tracking-[0.14em] uppercase rounded-sm transition-colors hover:bg-cornelian-glow disabled:opacity-60"
              >
                {submitting ? "Opening…" : "Continue to Studio"}
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        </div>
      , document.body)}
    </>
  );
}
