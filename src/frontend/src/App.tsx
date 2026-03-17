import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import ProfileModal from "./components/ProfileModal";
import Sidebar from "./components/Sidebar";
import AdminDashboard from "./pages/AdminDashboard";
import BusinessIdeas from "./pages/BusinessIdeas";
import BuyersBoard from "./pages/BuyersBoard";
import Dashboard from "./pages/Dashboard";
import DemandMap from "./pages/DemandMap";
import ImportExport from "./pages/ImportExport";
import InvestorsHub from "./pages/InvestorsHub";
import PartnershipBoard from "./pages/PartnershipBoard";
import PlaceNeeds from "./pages/PlaceNeeds";
import ProblemDiscovery from "./pages/ProblemDiscovery";
import ProfitCalculator from "./pages/ProfitCalculator";
import SellerMarketplace from "./pages/SellerMarketplace";
import StartupGuides from "./pages/StartupGuides";
import Subscription from "./pages/Subscription";
import SuccessStories from "./pages/SuccessStories";
import SupplierFinder from "./pages/SupplierFinder";

export type Page =
  | "dashboard"
  | "problems"
  | "sellers"
  | "buyers"
  | "investors"
  | "partnerships"
  | "ideas"
  | "map"
  | "calculator"
  | "guides"
  | "import-export"
  | "suppliers"
  | "subscription"
  | "success-stories"
  | "place-needs";

export type AccountType = "seller" | "buyer" | "investor" | "partner";

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  city: string;
  accountType: AccountType;
}

function MainApp() {
  const [page, setPage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("startup-shiva-profile");
    if (stored) {
      setProfile(JSON.parse(stored));
    } else {
      setShowProfileModal(true);
    }
  }, []);

  const handleSaveProfile = (p: UserProfile) => {
    localStorage.setItem("startup-shiva-profile", JSON.stringify(p));
    setProfile(p);
    setShowProfileModal(false);
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard profile={profile} onNavigate={setPage} />;
      case "problems":
        return <ProblemDiscovery />;
      case "sellers":
        return <SellerMarketplace />;
      case "buyers":
        return <BuyersBoard />;
      case "investors":
        return <InvestorsHub />;
      case "partnerships":
        return <PartnershipBoard />;
      case "ideas":
        return <BusinessIdeas />;
      case "map":
        return <DemandMap />;
      case "calculator":
        return <ProfitCalculator />;
      case "guides":
        return <StartupGuides />;
      case "import-export":
        return <ImportExport />;
      case "suppliers":
        return <SupplierFinder />;
      case "subscription":
        return <Subscription />;
      case "success-stories":
        return <SuccessStories />;
      case "place-needs":
        return <PlaceNeeds />;
      default:
        return <Dashboard profile={profile} onNavigate={setPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Toaster richColors position="top-right" />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={() => setSidebarOpen(false)}
          role="button"
          tabIndex={0}
        />
      )}

      <Sidebar
        currentPage={page}
        onNavigate={(p) => {
          setPage(p);
          setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          profile={profile}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onEditProfile={() => setShowProfileModal(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderPage()}
        </main>
        <footer className="text-center text-xs text-muted-foreground py-3 border-t border-border bg-card">
          © {new Date().getFullYear()} Startup With Shiva. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            className="text-primary underline underline-offset-2"
            target="_blank"
            rel="noreferrer"
          >
            caffeine.ai
          </a>
        </footer>
      </div>

      <ProfileModal
        open={showProfileModal}
        onSave={handleSaveProfile}
        onClose={() => setShowProfileModal(false)}
        existingProfile={profile}
      />
    </div>
  );
}

export default function App() {
  const isAdmin = window.location.pathname === "/admin";
  if (isAdmin) {
    return (
      <>
        <Toaster richColors position="top-right" />
        <AdminDashboard />
      </>
    );
  }
  return <MainApp />;
}
