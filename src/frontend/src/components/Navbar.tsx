import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navLinks = [
  { id: "home", label: "Home" },
  { id: "menu", label: "Menu" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-warm border-b border-border"
          : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.button
          type="button"
          className="cursor-pointer"
          onClick={() => handleNav("home")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <img
            src="/assets/generated/logo-purely-transparent.dim_300x100.png"
            alt="Purely Restaurant"
            className="h-14 w-auto object-contain"
          />
        </motion.button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                data-ocid={`nav.${link.id}.link`}
                onClick={() => handleNav(link.id)}
                className={`relative px-4 py-2 font-body font-medium text-sm rounded-full transition-colors duration-200 ${
                  activeSection === link.id
                    ? "text-terracotta"
                    : scrolled
                      ? "text-foreground hover:text-terracotta"
                      : "text-cream hover:text-golden"
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-terracotta"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Reserve / CTA */}
        <div className="hidden md:block">
          <Button
            type="button"
            onClick={() => handleNav("contact")}
            className="bg-terracotta text-primary-foreground hover:bg-terracotta-dark font-body font-semibold rounded-full px-5 shadow-warm transition-all"
          >
            Reserve a Table
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-cream/98 backdrop-blur-md border-b border-border overflow-hidden"
          >
            <ul className="flex flex-col px-4 py-3 gap-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    data-ocid={`nav.${link.id}.link`}
                    onClick={() => handleNav(link.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-body font-medium transition-colors ${
                      activeSection === link.id
                        ? "bg-terracotta/10 text-terracotta"
                        : "text-foreground hover:bg-warm-sand"
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2 pb-1">
                <Button
                  type="button"
                  onClick={() => handleNav("contact")}
                  className="w-full bg-terracotta text-primary-foreground hover:bg-terracotta-dark font-body font-semibold rounded-full"
                >
                  Reserve a Table
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
