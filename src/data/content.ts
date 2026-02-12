// Project images
import parxLaureate1 from "@/assets/projects/parx-laureate-1.jpg";
import parxLaureate2 from "@/assets/projects/parx-laureate-2.jpg";
import parxLaureate3 from "@/assets/projects/parx-laureate-3.jpg";
import mezzaria1_1 from "@/assets/projects/mezzaria1-1.jpg";
import mezzaria1_2 from "@/assets/projects/mezzaria1-2.jpg";
import mezzaria1_3 from "@/assets/projects/mezzaria1-3.jpg";
import mezzaria2_1 from "@/assets/projects/mezzaria2-1.jpg";
import mezzaria2_2 from "@/assets/projects/mezzaria2-2.jpg";
import mezzaria2_3 from "@/assets/projects/mezzaria2-3.jpg";

export interface ProjectImage {
  src: string;
  caption: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  location: string;
  category: string;
  description: string;
  thumbnail: string;
  images: ProjectImage[];
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "parx-laureate",
    name: "Parx Laureate",
    location: "Noida",
    category: "Residential",
    description: "A masterpiece of contemporary elegance, Parx Laureate showcases our signature blend of classical beauty with modern functionality. Every corner speaks of refined taste and meticulous craftsmanship.",
    thumbnail: parxLaureate1,
    images: [
      { src: parxLaureate1, caption: "Living Room" },
      { src: parxLaureate2, caption: "Living Room" },
      { src: parxLaureate3, caption: "Master Bedroom" },
    ],
  },
  {
    id: "2",
    slug: "mahagun-mezzaria-1",
    name: "Mahagun Mezzaria I",
    location: "Greater Noida",
    category: "Residential",
    description: "An exquisite residence that embodies sophistication at every turn. Rich textures, thoughtful lighting, and bespoke furniture come together in perfect harmony.",
    thumbnail: mezzaria1_1,
    images: [
      { src: mezzaria1_1, caption: "Living Room" },
      { src: mezzaria1_2, caption: "Lounge" },
      { src: mezzaria1_3, caption: "Master Bedroom" },
    ],
  },
  {
    id: "3",
    slug: "mahagun-mezzaria-2",
    name: "Mahagun Mezzaria II",
    location: "Greater Noida",
    category: "Residential",
    description: "Where traditional meets modern in perfect equilibrium. This residence features an elegant interplay of light, space, and luxurious materials.",
    thumbnail: mezzaria2_1,
    images: [
      { src: mezzaria2_1, caption: "Living Room" },
      { src: mezzaria2_2, caption: "Lounge" },
      { src: mezzaria2_3, caption: "Master Bedroom" },
    ],
  },
];

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
