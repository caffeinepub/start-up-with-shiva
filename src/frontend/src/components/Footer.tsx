import { Heart, Leaf, Mail, MapPin, Phone } from "lucide-react";

interface FooterProps {
  onNavigate: (section: string) => void;
}

const quickLinks = [
  { id: "home", label: "Home" },
  { id: "menu", label: "Menu" },
  { id: "about", label: "About Us" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

const currentYear = new Date().getFullYear();

export default function Footer({ onNavigate }: FooterProps) {
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  )}`;

  return (
    <footer className="bg-foreground text-cream py-14 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/generated/logo-purely-transparent.dim_300x100.png"
                alt="Purely Restaurant"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="font-body text-cream/70 text-sm leading-relaxed max-w-sm mb-5">
              A homely vegetarian restaurant where every dish carries the warmth
              and love of a home kitchen. Purely yours, always.
            </p>
            <div className="flex items-center gap-2 text-veggreen-light font-body text-sm font-semibold">
              <Leaf size={14} className="fill-current" />
              100% Pure Vegetarian
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-cream text-lg mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.id)}
                    className="font-body text-sm text-cream/70 hover:text-cream transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-cream text-lg mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone size={15} className="text-golden mt-0.5 shrink-0" />
                <a
                  href="tel:+918744688860"
                  className="font-body text-sm text-cream/70 hover:text-cream transition-colors"
                >
                  +91 8744688860
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={15} className="text-golden mt-0.5 shrink-0" />
                <a
                  href="mailto:styhurf@gmail.com"
                  className="font-body text-sm text-cream/70 hover:text-cream transition-colors break-all"
                >
                  styhurf@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-golden mt-0.5 shrink-0" />
                <span className="font-body text-sm text-cream/70">
                  Balapur, Hyderabad, Telangana
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cream/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-body text-cream/50">
          <p>© {currentYear} Purely Restaurant. All rights reserved.</p>
          <p>
            Built with{" "}
            <Heart
              size={13}
              className="inline text-terracotta-light fill-current"
            />{" "}
            using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noreferrer"
              className="text-cream/70 hover:text-cream transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
