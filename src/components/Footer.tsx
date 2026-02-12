import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-primary-foreground">
      <div className="luxury-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Cornelian" className="h-12 w-12 object-contain invert" />
              <div>
                <span className="font-heading text-xl tracking-wide text-cream">Cornelian</span>
                <span className="block text-[10px] tracking-[0.15em] uppercase text-light-grey">
                  Executive Interiors
                </span>
              </div>
            </Link>
            <p className="text-sm text-light-grey leading-relaxed max-w-xs">
              Crafting Timeless Spaces with Modern Grace. Transforming visions into luxurious realities since 2020.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-lg mb-6 text-cream">Navigation</h4>
            <nav className="flex flex-col gap-3">
              {["Home", "Projects", "Services", "Blog", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : item === "Blog" ? "/blog" : `/${item.toLowerCase()}`}
                  className="text-sm text-light-grey hover:text-cream transition-colors duration-300"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg mb-6 text-cream">Services</h4>
            <nav className="flex flex-col gap-3">
              {["Interior Designing", "Interior Construction", "Renovation Works", "Customized Furniture", "Home Automation"].map(
                (item) => (
                  <span key={item} className="text-sm text-light-grey">
                    {item}
                  </span>
                )
              )}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg mb-6 text-cream">Get in Touch</h4>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+919720130734"
                className="flex items-center gap-3 text-sm text-light-grey hover:text-cream transition-colors"
              >
                <Phone size={16} />
                <span>+91 97201 30734</span>
              </a>
              <a
                href="mailto:cornelianexecutiveinteriors@gmail.com"
                className="flex items-center gap-3 text-sm text-light-grey hover:text-cream transition-colors"
              >
                <Mail size={16} />
                <span>cornelianexecutiveinteriors@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-light-grey">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>D107, Sector 2, Noida, NCR</span>
              </div>
              <a
                href="https://instagram.com/world_cornelian"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-light-grey hover:text-cream transition-colors"
              >
                <Instagram size={16} />
                <span>@world_cornelian</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-light-grey/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-light-grey">
              © {currentYear} Cornelian Executive Interiors. All rights reserved.
            </p>
            <p className="text-xs text-light-grey">
              Trust • Transparency • Quality • Value
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
