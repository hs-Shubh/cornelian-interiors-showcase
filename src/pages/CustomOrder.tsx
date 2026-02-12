import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Ruler, Palette, ImageIcon, FileText, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  generateOrderId,
  uploadOrderImages,
  submitCustomOrder,
  isOrdersApiConfigured,
} from "@/lib/api/orders";
import { SeoHead } from "@/components/SeoHead";

const PRODUCT_TYPES = [
  { id: "console-cabinet", label: "Console Cabinet" },
  { id: "modular-cabinet", label: "Modular Cabinet" },
];

const STEPS = [
  { id: 1, label: "Product type", icon: Ruler },
  { id: 2, label: "Dimensions", icon: Ruler },
  { id: 3, label: "Material & finish", icon: Palette },
  { id: 4, label: "Reference images", icon: ImageIcon },
  { id: 5, label: "Notes & submit", icon: FileText },
];

const CustomOrder = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [orderId] = useState(() => generateOrderId());
  const [form, setForm] = useState({
    product_type: "",
    width_cm: "",
    height_cm: "",
    depth_cm: "",
    material: "",
    finish: "",
    notes: "",
    customer_name: "",
    customer_email: "",
    customer_phone: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const addFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files ? Array.from(e.target.files) : [];
    const images = list.filter((f) => f.type.startsWith("image/"));
    setFiles((prev) => [...prev, ...images].slice(0, 6));
  };

  const removeFile = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const canProceed = () => {
    if (step === 1) return !!form.product_type;
    if (step === 2)
      return (
        Number(form.width_cm) > 0 &&
        Number(form.height_cm) > 0 &&
        Number(form.depth_cm) > 0
      );
    return true;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    let imageUrls: string[] = [];
    if (isOrdersApiConfigured() && files.length > 0) {
      imageUrls = await uploadOrderImages(orderId, files);
    }
    const result = await submitCustomOrder({
      order_id: orderId,
      product_type: form.product_type,
      width_cm: Number(form.width_cm),
      height_cm: Number(form.height_cm),
      depth_cm: Number(form.depth_cm),
      material: form.material || null,
      finish: form.finish || null,
      notes: form.notes || null,
      image_urls: imageUrls,
      customer_name: form.customer_name || null,
      customer_email: form.customer_email || null,
      customer_phone: form.customer_phone || null,
      status: "pending",
    });
    setIsSubmitting(false);
    if (result.success) {
      setSubmitted(true);
      toast({
        title: "Order submitted",
        description: `Your order ID is ${orderId}. We'll contact you shortly.`,
      });
    } else {
      toast({
        title: "Submission failed",
        description: result.error ?? "Please try again or contact us.",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <>
        <SeoHead />
        <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-16 luxury-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-lg"
          >
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-accent" aria-hidden />
            </div>
            <h1 className="luxury-heading-lg mb-4">Order received</h1>
            <p className="luxury-body mb-2">
              Your custom furniture order has been submitted successfully.
            </p>
            <p className="font-heading text-xl text-accent mb-8">Order ID: {orderId}</p>
            <p className="luxury-body-sm text-muted-foreground mb-8">
              We'll reach out to confirm dimensions and discuss next steps. Payment integration coming soon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/custom-order"
                className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 font-body text-sm uppercase tracking-wider hover:border-accent hover:text-accent transition-colors"
                onClick={() => { setSubmitted(false); setStep(1); setForm({ product_type: "", width_cm: "", height_cm: "", depth_cm: "", material: "", finish: "", notes: "", customer_name: "", customer_email: "", customer_phone: "" }); setFiles([]); }}
              >
                Place another order
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-charcoal text-cream px-6 py-3 font-body text-sm uppercase tracking-wider hover:bg-accent transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <SeoHead />
      <section className="pt-32 pb-12 bg-secondary" aria-labelledby="custom-order-heading">
        <div className="luxury-container">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-body text-sm tracking-[0.1em] uppercase"
          >
            <ArrowLeft size={16} />
            Home
          </Link>
          <h1 id="custom-order-heading" className="luxury-heading-xl mb-2">
            Design Your Cabinet
          </h1>
          <p className="luxury-body max-w-xl">
            Custom console or modular cabinets. Enter dimensions, choose material and finish, upload reference images. No middlemen — delivered to your doorstep.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            {STEPS.map((s) => (
              <span
                key={s.id}
                className={`flex items-center gap-2 font-body text-sm tracking-wide ${
                  step >= s.id ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                    step > s.id ? "bg-accent text-accent-foreground" : step === s.id ? "bg-foreground text-background" : "bg-muted"
                  }`}
                >
                  {step > s.id ? <Check size={14} /> : s.id}
                </span>
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="luxury-section bg-background">
        <div className="luxury-container max-w-2xl">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="luxury-heading-md mb-6">Select product type</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {PRODUCT_TYPES.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => update("product_type", p.id)}
                      className={`p-6 border-2 text-left transition-all ${
                        form.product_type === p.id
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <span className="font-heading text-xl">{p.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="luxury-heading-md mb-6">Dimensions (cm)</h2>
                <p className="luxury-body-sm mb-6">Width × Height × Depth in centimetres.</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="width_cm" className="luxury-label block mb-2">Width</label>
                    <input
                      id="width_cm"
                      type="number"
                      min="1"
                      value={form.width_cm}
                      onChange={(e) => update("width_cm", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border font-body focus:outline-none focus:border-accent"
                      placeholder="e.g. 120"
                    />
                  </div>
                  <div>
                    <label htmlFor="height_cm" className="luxury-label block mb-2">Height</label>
                    <input
                      id="height_cm"
                      type="number"
                      min="1"
                      value={form.height_cm}
                      onChange={(e) => update("height_cm", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border font-body focus:outline-none focus:border-accent"
                      placeholder="e.g. 90"
                    />
                  </div>
                  <div>
                    <label htmlFor="depth_cm" className="luxury-label block mb-2">Depth</label>
                    <input
                      id="depth_cm"
                      type="number"
                      min="1"
                      value={form.depth_cm}
                      onChange={(e) => update("depth_cm", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border font-body focus:outline-none focus:border-accent"
                      placeholder="e.g. 45"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="luxury-heading-md mb-6">Material & finish</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="material" className="luxury-label block mb-2">Material (optional)</label>
                    <input
                      id="material"
                      type="text"
                      value={form.material}
                      onChange={(e) => update("material", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border font-body focus:outline-none focus:border-accent"
                      placeholder="e.g. MDF, Plywood, Solid wood"
                    />
                  </div>
                  <div>
                    <label htmlFor="finish" className="luxury-label block mb-2">Finish (optional)</label>
                    <input
                      id="finish"
                      type="text"
                      value={form.finish}
                      onChange={(e) => update("finish", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border font-body focus:outline-none focus:border-accent"
                      placeholder="e.g. Matte laminate, Veneer, Painted"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="luxury-heading-md mb-6">Reference images (optional)</h2>
                <p className="luxury-body-sm mb-4">Upload up to 6 images from camera or file. Helps us match your style.</p>
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
                  className="w-full border-2 border-dashed border-border hover:border-accent/50 py-12 flex flex-col items-center gap-2 transition-colors"
                >
                  <ImageIcon size={32} className="text-muted-foreground" />
                  <span className="font-body text-sm tracking-wide">Click to add images</span>
                  <span className="text-xs text-muted-foreground">{files.length} / 6</span>
                </button>
                {files.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {files.map((file, i) => (
                      <div key={i} className="relative group aspect-square bg-muted rounded overflow-hidden">
                        <img
                          src={URL.createObjectURL(file)}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="absolute top-2 right-2 w-8 h-8 bg-charcoal/80 text-cream rounded flex items-center justify-center text-sm hover:bg-charcoal"
                          aria-label="Remove image"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="luxury-heading-md mb-6">Your details & notes</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="customer_name" className="luxury-label block mb-2">Name</label>
                    <input
                      id="customer_name"
                      type="text"
                      value={form.customer_name}
                      onChange={(e) => update("customer_name", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border font-body focus:outline-none focus:border-accent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="customer_email" className="luxury-label block mb-2">Email</label>
                    <input
                      id="customer_email"
                      type="email"
                      value={form.customer_email}
                      onChange={(e) => update("customer_email", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border font-body focus:outline-none focus:border-accent"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="customer_phone" className="luxury-label block mb-2">Phone</label>
                    <input
                      id="customer_phone"
                      type="tel"
                      value={form.customer_phone}
                      onChange={(e) => update("customer_phone", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border font-body focus:outline-none focus:border-accent"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label htmlFor="notes" className="luxury-label block mb-2">Additional notes</label>
                    <textarea
                      id="notes"
                      rows={4}
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border font-body focus:outline-none focus:border-accent resize-none"
                      placeholder="Any specific requirements, delivery address, etc."
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-12 pt-8 border-t border-border">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="inline-flex items-center gap-2 font-body text-sm tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:pointer-events-none"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canProceed()}
                className="inline-flex items-center gap-2 bg-charcoal text-cream px-6 py-3 font-body text-sm tracking-[0.1em] uppercase hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 font-body text-sm tracking-[0.1em] uppercase hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {isSubmitting ? "Submitting..." : "Submit order"}
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomOrder;
