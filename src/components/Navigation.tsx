import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpg";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Services", path: "/services" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Custom Furniture", path: "/custom-furniture" },
  { name: "CHIITRA", path: "/chiitra" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const showLightNav = !isScrolled && location.pathname === "/";
  const navBg = showLightNav
    ? "bg-charcoal/60 backdrop-blur-md border-b border-white/20"
    : "bg-background/98 backdrop-blur-md shadow-sm border-b border-border/50";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
      role="banner"
    >
      <nav className="luxury-container" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0"
            aria-label="Cornelian Executive Interiors - Home"
          >
            <img
              src={logo}
              alt="Cornelian Executive Interiors"
              className={`h-12 w-12 min-w-[3rem] min-h-[3rem] object-contain transition-all duration-500 ${
                showLightNav ? "invert opacity-95" : "opacity-95"
              }`}
            />
            <div className="hidden sm:block">
              <span
                className={`font-heading text-lg md:text-xl font-semibold tracking-[0.04em] transition-colors duration-500 ${
                  showLightNav ? "text-white" : "text-foreground"
                }`}
              >
                Cornelian
              </span>
              <span
                className={`block text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors duration-500 ${
                  showLightNav ? "text-white/90" : "text-muted-foreground"
                }`}
              >
                Executive Interiors
              </span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`nav-link text-[13px] tracking-[0.12em] font-medium ${
                  isActive(link.path) ? "active text-foreground font-semibold" : ""
                } ${showLightNav ? "text-white/95 hover:text-white" : "text-foreground/85 hover:text-foreground"}`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-3 pl-4 ml-2 border-l border-border/50">
              <Link
                to="/contact"
                className={`hidden lg:inline-flex items-center px-4 py-2.5 font-body text-xs tracking-[0.15em] uppercase transition-colors rounded-sm ${
                  showLightNav
                    ? "border border-white/80 text-white hover:bg-white/15"
                    : "border border-current hover:bg-black/5"
                }`}
              >
                Get Free Consultation
              </Link>
              <Link
                to="/custom-furniture"
                className={`inline-flex items-center px-5 py-2.5 font-body text-xs tracking-[0.15em] uppercase rounded-sm transition-opacity hover:opacity-90 ${
                  showLightNav ? "bg-cream text-charcoal" : "bg-accent text-accent-foreground"
                }`}
              >
                Design Your Cabinet
              </Link>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 rounded hover:bg-black/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className={`xl:hidden overflow-hidden transition-all duration-500 ease-luxury ${
            isOpen ? "max-h-[32rem] pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-1 pt-4 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`font-body text-sm tracking-[0.1em] uppercase py-3 px-2 rounded transition-colors ${
                  isActive(link.path)
                    ? "text-foreground font-semibold bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center border border-border py-3 font-body text-xs tracking-[0.15em] uppercase rounded-sm"
              >
                Get Free Consultation
              </Link>
              <Link
                to="/custom-furniture"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center bg-accent text-accent-foreground py-3 font-body text-xs tracking-[0.15em] uppercase rounded-sm"
              >
                Design Your Cabinet
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
