import { useState, useRef } from "react";
import { Send, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitLead } from "@/lib/api/leads";
import { submitInquiry, uploadInquiryImages, isInquiriesApiConfigured } from "@/lib/api/inquiries";
import { isSupabaseConfigured } from "@/lib/supabase";
import type { InquiryInsert } from "@/types/supabase";

const inputClass =
  "w-full px-4 py-3 bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors";
const labelClass = "luxury-label block mb-2";

export type InquiryFormVariant = "contact" | "custom_furniture" | "chiitra" | "general";

export interface LeadInquiryFormProps {
  variant: InquiryFormVariant;
  source?: string;
  pagePath?: string;
  productType?: string;
  inquiryType?: string;
  showDimensions?: boolean;
  showMaterialFinish?: boolean;
  showArtworkSizeFrame?: boolean;
  showReferenceImages?: boolean;
  submitButtonLabel?: string;
  onSuccess?: () => void;
  className?: string;
}

export function LeadInquiryForm({
  variant,
  source,
  pagePath = typeof window !== "undefined" ? window.location.pathname : "",
  productType,
  inquiryType,
  showDimensions = false,
  showMaterialFinish = false,
  showArtworkSizeFrame = false,
  showReferenceImages = false,
  submitButtonLabel = "Send Message",
  onSuccess,
  className = "",
}: LeadInquiryFormProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    dimensions_text: "",
    material: "",
    finish: "",
    artwork_size: "",
    frame_style: "",
  });
  const [files, setFiles] = useState<File[]>([]);

  const backendAvailable = variant === "contact" ? isSupabaseConfigured : isInquiriesApiConfigured();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files ? Array.from(e.target.files) : [];
    const images = list.filter((f) => f.type.startsWith("image/"));
    setFiles((prev) => [...prev, ...images].slice(0, 6));
  };

  const removeFile = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!backendAvailable) {
      toast({
        title: "Form unavailable",
        description: "Please email us directly at cornelianexecutiveinteriors@gmail.com",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      if (variant === "contact") {
        const result = await submitLead({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message,
          source: source ?? "contact",
        });
        if (result.success) {
          toast({
            title: "Message Sent",
            description: "Thank you for reaching out. We'll get back to you shortly.",
          });
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            dimensions_text: "",
            material: "",
            finish: "",
            artwork_size: "",
            frame_style: "",
          });
          onSuccess?.();
        } else {
          toast({
            title: "Could not send",
            description: result.error ?? "Please try again or email us directly.",
            variant: "destructive",
          });
        }
      } else {
        let reference_image_urls: string[] = [];
        if (showReferenceImages && files.length > 0) {
          const prefix = `inquiry-${Date.now()}`;
          reference_image_urls = await uploadInquiryImages(prefix, files);
        }
        const payload: InquiryInsert = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message || null,
          inquiry_type: inquiryType ?? variant,
          product_type: productType ?? variant,
          source: source ?? variant,
          page_path: pagePath,
          dimensions_text: showDimensions ? formData.dimensions_text || null : null,
          material: showMaterialFinish ? formData.material || null : null,
          finish: showMaterialFinish ? formData.finish || null : null,
          artwork_size: showArtworkSizeFrame ? formData.artwork_size || null : null,
          frame_style: showArtworkSizeFrame ? formData.frame_style || null : null,
          reference_image_urls,
          status: "new",
        };
        const result = await submitInquiry(payload);
        if (result.success) {
          toast({
            title: "Inquiry submitted",
            description: "We'll get back to you shortly with next steps.",
          });
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            dimensions_text: "",
            material: "",
            finish: "",
            artwork_size: "",
            frame_style: "",
          });
          setFiles([]);
          onSuccess?.();
        } else {
          toast({
            title: "Could not submit",
            description: result.error ?? "Please try again or email us.",
            variant: "destructive",
          });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-6 ${className}`}
      aria-label="Inquiry form"
    >
      {!backendAvailable && (
        <p className="text-sm text-muted-foreground border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-3 rounded">
          Form submission is temporarily unavailable. Please email us at{" "}
          <a href="mailto:cornelianexecutiveinteriors@gmail.com" className="underline text-accent">
            cornelianexecutiveinteriors@gmail.com
          </a>
          .
        </p>
      )}

      <div>
        <label htmlFor="inquiry-name" className={labelClass}>Your Name</label>
        <input
          id="inquiry-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={inputClass}
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="inquiry-email" className={labelClass}>Email</label>
        <input
          id="inquiry-email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={inputClass}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="inquiry-phone" className={labelClass}>Phone</label>
        <input
          id="inquiry-phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={inputClass}
          placeholder="+91 98765 43210"
        />
      </div>

      {showDimensions && (
        <div>
          <label htmlFor="inquiry-dimensions" className={labelClass}>Dimensions (W × H × D or describe)</label>
          <input
            id="inquiry-dimensions"
            type="text"
            name="dimensions_text"
            value={formData.dimensions_text}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g. 120cm × 90cm × 45cm"
          />
        </div>
      )}

      {showMaterialFinish && (
        <>
          <div>
            <label htmlFor="inquiry-material" className={labelClass}>Material</label>
            <input
              id="inquiry-material"
              type="text"
              name="material"
              value={formData.material}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. MDF, Plywood, Solid wood"
            />
          </div>
          <div>
            <label htmlFor="inquiry-finish" className={labelClass}>Finish</label>
            <input
              id="inquiry-finish"
              type="text"
              name="finish"
              value={formData.finish}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. Matte laminate, Veneer"
            />
          </div>
        </>
      )}

      {showArtworkSizeFrame && (
        <>
          <div>
            <label htmlFor="inquiry-artwork-size" className={labelClass}>Artwork size</label>
            <input
              id="inquiry-artwork-size"
              type="text"
              name="artwork_size"
              value={formData.artwork_size}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. 24×36 inches"
            />
          </div>
          <div>
            <label htmlFor="inquiry-frame-style" className={labelClass}>Frame / style</label>
            <input
              id="inquiry-frame-style"
              type="text"
              name="frame_style"
              value={formData.frame_style}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. Framed, Canvas, No frame"
            />
          </div>
        </>
      )}

      <div>
        <label htmlFor="inquiry-message" className={labelClass}>Message</label>
        <textarea
          id="inquiry-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Tell us about your requirements..."
        />
      </div>

      {showReferenceImages && (
        <div>
          <label className={labelClass}>Reference images (optional)</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={addFiles}
            className="hidden"
            aria-label="Upload reference images"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-border hover:border-accent/50 py-8 flex flex-col items-center gap-2 transition-colors text-muted-foreground hover:text-foreground"
          >
            <ImageIcon size={24} />
            <span className="font-body text-sm">Add images ({files.length}/6)</span>
          </button>
          {files.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {files.map((file, i) => (
                <div key={i} className="relative aspect-square bg-muted rounded overflow-hidden">
                  <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="absolute top-1 right-1 w-6 h-6 bg-charcoal/80 text-cream rounded text-sm"
                    aria-label="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !backendAvailable}
        className="w-full flex items-center justify-center gap-3 bg-charcoal text-cream py-4 font-body text-sm tracking-[0.1em] uppercase hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500"
      >
        {isSubmitting ? "Sending..." : submitButtonLabel}
        <Send size={16} />
      </button>
    </form>
  );
}
