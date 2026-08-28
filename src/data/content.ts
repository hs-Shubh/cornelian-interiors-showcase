// Project data + types now live in dedicated modules.
// Re-exported here for backward compatibility with existing imports.
export { projects } from "./projects";
export type {
  Project,
  ProjectImage,
  ProjectPlan,
  ProjectVideo,
  ProjectBrand,
  ProjectMedia,
  WalkthroughFrames,
} from "@/types/project";

export const services = [
  {
    id: "interior-designing",
    title: "Interior Designing",
    description: "Comprehensive design solutions that blend aesthetics with functionality, creating spaces that inspire and endure.",
    icon: "Palette",
  },
  {
    id: "interior-construction",
    title: "Interior Construction",
    description: "Expert execution of interior build-outs with premium materials and meticulous attention to detail.",
    icon: "Hammer",
  },
  {
    id: "renovation-works",
    title: "Renovation Works",
    description: "Transforming existing spaces into renewed masterpieces while preserving their inherent character.",
    icon: "RefreshCw",
  },
  {
    id: "customized-furniture",
    title: "Customized Furniture",
    description: "Bespoke furniture crafted to perfection, tailored to your unique style and spatial requirements.",
    icon: "Sofa",
  },
  {
    id: "modular-solutions",
    title: "Modular Wardrobe & Kitchen",
    description: "Smart, elegant modular solutions that maximize space efficiency without compromising on style.",
    icon: "Grid3X3",
  },
  {
    id: "home-automation",
    title: "Home Automation",
    description: "Cutting-edge smart home integration for enhanced comfort, security, and energy efficiency.",
    icon: "Smartphone",
  },
  {
    id: "hvac-works",
    title: "HVAC Works",
    description: "Climate control solutions engineered for optimal comfort and environmental sustainability.",
    icon: "Wind",
  },
  {
    id: "electrical-appliances",
    title: "Electrical & Appliances",
    description: "Premium electrical installations and designer lighting to illuminate your space beautifully.",
    icon: "Lightbulb",
  },
  {
    id: "plumbing-firefighting",
    title: "Plumbing & Firefighting",
    description: "Essential infrastructure services executed with precision and adherence to safety standards.",
    icon: "Droplets",
  },
  {
    id: "home-decor",
    title: "Home Décor",
    description: "Curated decorative elements that add the finishing touches of elegance to your space.",
    icon: "Flower2",
  },
  {
    id: "blinds-curtains",
    title: "Blinds & Curtains",
    description: "Luxurious window treatments that control light beautifully while enhancing privacy and aesthetics.",
    icon: "PanelTop",
  },
  {
    id: "designer-lights",
    title: "Designer Lights",
    description: "Statement lighting pieces that serve as functional art, defining the ambiance of every room.",
    icon: "Lamp",
  },
];

export const stats = [
  { value: "5+", label: "Years of Experience" },
  { value: "50+", label: "Projects Completed" },
  { value: "3L+", label: "Sq. Ft. Delivered" },
  { value: "10+", label: "Cities Served" },
];

export const brandAttributes = [
  "Elegant",
  "Sophisticated",
  "Timeless",
  "Innovative",
  "Detailed",
  "Luxurious",
  "Functional",
  "Artistic",
];

export const brandWords = [
  "Classical",
  "Modern",
  "Refined",
  "Intricate",
  "Opulent",
  "Grand",
  "Harmonious",
  "Artisan",
];
