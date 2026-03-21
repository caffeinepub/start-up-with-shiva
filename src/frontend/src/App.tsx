import { Toaster } from "@/components/ui/sonner";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Header from "./components/Header";
import ProfileModal from "./components/ProfileModal";
import Sidebar from "./components/Sidebar";
import { useGetMyInbox } from "./hooks/useQueries";
import AdminDashboard from "./pages/AdminDashboard";
import BusinessIdeas from "./pages/BusinessIdeas";
import BuyersBoard from "./pages/BuyersBoard";
import Dashboard from "./pages/Dashboard";
import DemandMap from "./pages/DemandMap";
import ImportExport from "./pages/ImportExport";
import InvestorsHub from "./pages/InvestorsHub";
import Messages from "./pages/Messages";
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
  | "place-needs"
  | "messages";

export type AccountType = "seller" | "buyer" | "investor" | "partner";

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  city: string;
  accountType: AccountType;
}

export interface ComposeTarget {
  recipientId: string;
  recipientName: string;
  subject?: string;
}

function playChime() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch {}
}

function MainApp() {
  const [page, setPage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [pendingCompose, setPendingCompose] = useState<ComposeTarget | null>(
    null,
  );

  const { data: inbox } = useGetMyInbox();
  const unreadCount = (inbox ?? []).filter((m) => !m.isRead).length;
  const prevUnreadRef = useRef(unreadCount);
  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    const stored = localStorage.getItem("startup-shiva-profile");
    if (stored) {
      setProfile(JSON.parse(stored));
    } else {
      setShowProfileModal(true);
    }
  }, []);

  // Notification effect — only fires after initial load
  useEffect(() => {
    if (isInitialLoadRef.current) {
      // Skip the first time inbox loads
      if (inbox !== undefined) {
        prevUnreadRef.current = unreadCount;
        isInitialLoadRef.current = false;
      }
      return;
    }

    if (unreadCount > prevUnreadRef.current) {
      const unreadMessages = (inbox ?? []).filter((m) => !m.isRead);
      const newest = unreadMessages[0];
      const title = newest
        ? `New message from ${newest.senderName ?? "Someone"}`
        : "New message";
      const description = newest?.subject ?? "You have a new message";

      playChime();
      toast(title, {
        description,
        action: {
          label: "View",
          onClick: () => setPage("messages"),
        },
      });
    }

    prevUnreadRef.current = unreadCount;
  }, [unreadCount, inbox]);

  const handleSaveProfile = (p: UserProfile) => {
    localStorage.setItem("startup-shiva-profile", JSON.stringify(p));
    setProfile(p);
    setShowProfileModal(false);
  };

  const handleOpenCompose = (target: ComposeTarget) => {
    setPendingCompose(target);
    setPage("messages");
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard profile={profile} onNavigate={setPage} />;
      case "problems":
        return <ProblemDiscovery />;
      case "sellers":
        return <SellerMarketplace onMessage={handleOpenCompose} />;
      case "buyers":
        return <BuyersBoard onMessage={handleOpenCompose} />;
      case "investors":
        return <InvestorsHub onMessage={handleOpenCompose} />;
      case "partnerships":
        return <PartnershipBoard onMessage={handleOpenCompose} />;
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
      case "messages":
        return (
          <Messages
            initialCompose={pendingCompose}
            onClearCompose={() => setPendingCompose(null)}
          />
        );
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
        unreadMessages={unreadCount}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          profile={profile}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onEditProfile={() => setShowProfileModal(true)}
          unreadMessages={unreadCount}
          inbox={inbox ?? []}
          onGoToMessages={() => setPage("messages")}
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
