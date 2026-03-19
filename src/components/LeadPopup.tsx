import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LeadInquiryForm } from "@/components/LeadInquiryForm";

const STORAGE_KEY = "cornelian_lead_popup_dismissed";
const SHOW_AFTER_MS = 2.5 * 1000; // 2.5 seconds after page load
const SHOW_AGAIN_AFTER_MS = 30 * 60 * 1000; // 30 minutes after dismiss

function getDismissedAt(): number | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? n : null;
}

function setDismissedAt() {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, String(Date.now()));
}

function shouldShowPopup(): boolean {
  const dismissed = getDismissedAt();
  if (!dismissed) return true;
  return Date.now() - dismissed >= SHOW_AGAIN_AFTER_MS;
}

export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!shouldShowPopup()) return;

    const t = setTimeout(() => {
      setOpen(true);
    }, SHOW_AFTER_MS);

    return () => clearTimeout(t);
  }, [mounted]);

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setDismissedAt();
    }
    setOpen(next);
  };

  const handleSuccess = () => {
    setDismissedAt();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md luxury-container border-border bg-background p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="font-heading text-xl md:text-2xl text-foreground">
            Get a Free Consultation
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Share your details and we&apos;ll get back with expert advice for your space.
          </p>
        </DialogHeader>
        <div className="p-6">
          <LeadInquiryForm
            variant="contact"
            source="lead_popup"
            pagePath={typeof window !== "undefined" ? window.location.pathname : ""}
            submitButtonLabel="Send"
            fallbackSubmitButtonLabel="Email Us"
            showCancelButton
            cancelButtonLabel="Not now"
            onCancel={() => handleOpenChange(false)}
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
