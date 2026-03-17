import {
  BookOpen,
  Calculator,
  CreditCard,
  Globe,
  Handshake,
  LayoutDashboard,
  Lightbulb,
  Map as MapIcon,
  MapPin,
  Search,
  ShoppingBag,
  ShoppingCart,
  Star,
  Store,
  TrendingUp,
  X,
} from "lucide-react";
import type { Page } from "../App";

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  onClose: () => void;
}

type NavItem = {
  page: Page;
  label: string;
  icon: React.ElementType;
  group?: string;
};

const navItems: NavItem[] = [
  { page: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { page: "problems", label: "Problem Discovery", icon: Search },
  {
    page: "sellers",
    label: "Seller Marketplace",
    icon: ShoppingBag,
    group: "accounts",
  },
  {
    page: "buyers",
    label: "Buyers Board",
    icon: ShoppingCart,
    group: "accounts",
  },
  {
    page: "investors",
    label: "Investors Hub",
    icon: TrendingUp,
    group: "accounts",
  },
  {
    page: "partnerships",
    label: "Partnership Board",
    icon: Handshake,
    group: "accounts",
  },
  { page: "ideas", label: "Business Ideas", icon: Lightbulb },
  { page: "guides", label: "Startup Guides", icon: BookOpen },
  { page: "map", label: "Demand Map", icon: MapIcon },
  { page: "import-export", label: "Import-Export", icon: Globe },
  { page: "suppliers", label: "Supplier Finder", icon: Store },
  { page: "calculator", label: "Profit Calculator", icon: Calculator },
  {
    page: "success-stories",
    label: "Success Stories",
    icon: Star,
    group: "community",
  },
  {
    page: "place-needs",
    label: "Place-Based Needs",
    icon: MapPin,
    group: "community",
  },
  { page: "subscription", label: "Subscription", icon: CreditCard },
];

export default function Sidebar({
  currentPage,
  onNavigate,
  isOpen,
  onClose,
}: SidebarProps) {
  let lastGroup = "";

  return (
    <aside
      className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 flex-shrink-0
        bg-sidebar flex flex-col
        transform transition-transform duration-250 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      {/* Logo area */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
        <img
          src="/assets/generated/startup-shiva-logo.dim_300x300.png"
          alt="Startup With Shiva"
          className="w-10 h-10 rounded-xl object-cover"
        />
        <div className="min-w-0">
          <p className="font-display font-bold text-sm text-sidebar-foreground leading-tight">
            Startup With Shiva
          </p>
          <p className="text-xs text-sidebar-foreground/50 truncate">
            Find Needs. Build Businesses.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="ml-auto lg:hidden text-sidebar-foreground/50 hover:text-sidebar-foreground p-1 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {navItems.map(({ page, label, icon: Icon, group }) => {
          const showAccountsDivider =
            group === "accounts" && lastGroup !== "accounts";
          const showCommunityDivider =
            group === "community" && lastGroup !== "community";
          lastGroup = group ?? "";
          return (
            <div key={page}>
              {showAccountsDivider && (
                <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/30">
                  Accounts
                </p>
              )}
              {showCommunityDivider && (
                <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/30">
                  Community
                </p>
              )}
              <button
                type="button"
                data-ocid={`nav.${page}.link`}
                onClick={() => onNavigate(page)}
                className={`sidebar-nav-link w-full text-left ${
                  currentPage === page ? "active" : ""
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{label}</span>
              </button>
            </div>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-sidebar-border">
        <div
          className="rounded-xl p-3"
          style={{ background: "oklch(0.68 0.18 50 / 0.12)" }}
        >
          <p className="text-xs font-semibold text-orange-brand mb-1">
            🚀 Full Access
          </p>
          <p className="text-xs text-sidebar-foreground/60">₹5 for 5 days</p>
          <button
            type="button"
            data-ocid="sidebar.subscription.button"
            onClick={() => onNavigate("subscription")}
            className="mt-2 w-full text-xs font-semibold py-1.5 rounded-lg bg-orange-brand text-white hover:bg-orange-dark transition-colors"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </aside>
  );
}
