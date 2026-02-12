import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50" : "bg-transparent"
      }`}
      role="banner"
    >
      <nav className="luxury-container" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo: darkened on light navbar for contrast */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="Cornelian Executive Interiors - Home">
            <img
              src={logo}
              alt=""
              className={`h-12 w-12 object-contain transition-all duration-500 ${
                isScrolled ? "brightness-0 opacity-90" : ""
              }`}
            />
            <div className="hidden sm:block">
              <span
                className={`font-heading text-lg md:text-xl font-semibold tracking-[0.02em] transition-colors duration-500 ${
                  isScrolled ? "text-foreground" : "text-cream"
                }`}
              >
                Cornelian
              </span>
              <span
                className={`block text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors duration-500 ${
                  isScrolled ? "text-muted-foreground" : "text-cream/80"
                }`}
              >
                Executive Interiors
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? "active text-foreground font-medium" : ""} ${
                  !isScrolled ? "text-cream/90 hover:text-cream" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/custom-order"
              className="hidden lg:inline-flex items-center bg-accent text-accent-foreground px-5 py-2.5 font-body text-xs tracking-[0.15em] uppercase hover:opacity-90 transition-opacity"
            >
              Design Your Cabinet
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-luxury ${
            isOpen ? "max-h-[28rem] pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`font-body text-sm tracking-[0.1em] uppercase py-2 transition-colors ${
                  isActive(link.path) ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/custom-order"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center bg-accent text-accent-foreground px-5 py-3 font-body text-xs tracking-[0.15em] uppercase"
            >
              Design Your Cabinet
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
