import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { SeoHead } from "@/components/SeoHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SeoHead title="Page Not Found | Cornelian Executive Interiors" noindex />
      <div className="min-h-screen flex items-center justify-center bg-background pt-24">
        <div className="luxury-container text-center">
        <span className="font-heading text-8xl md:text-9xl text-accent/30">404</span>
        <h1 className="luxury-heading-lg mt-6 mb-4">Page Not Found</h1>
        <p className="luxury-body max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-3 bg-charcoal text-cream px-8 py-4 font-body text-sm tracking-[0.1em] uppercase hover:bg-accent transition-all duration-500"
        >
          <ArrowLeft size={16} />
          Return Home
        </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
