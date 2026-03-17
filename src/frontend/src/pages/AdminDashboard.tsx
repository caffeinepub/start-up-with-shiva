import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Eye,
  EyeOff,
  Globe,
  Handshake,
  Lock,
  LogOut,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useGetAdminStats } from "../hooks/useQueries";

const ADMIN_PASSWORD = "shiva123";

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("admin-authed") === "1",
  );
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const { data: stats, isLoading: statsLoading } = useGetAdminStats();

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin-authed", "1");
      setAuthed(true);
      toast.success("Welcome, Shiva!");
    } else {
      setError("Incorrect password.");
      toast.error("Wrong password");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin-authed");
    setAuthed(false);
    setPw("");
  };

  if (!authed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.14 0.045 255) 0%, oklch(0.22 0.07 255) 100%)",
        }}
        data-ocid="admin.page"
      >
        <div className="w-full max-w-sm mx-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-orange-brand/20 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-orange-brand" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white">
              Admin Access
            </h1>
            <p className="text-white/60 text-sm mt-1">
              Start-up with Shiva — Admin Panel
            </p>
          </div>
          <Card className="bg-card shadow-xl" data-ocid="admin.login.panel">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="admin-pw">Admin Password</Label>
                <div className="relative">
                  <Input
                    id="admin-pw"
                    data-ocid="admin.password.input"
                    type={showPw ? "text" : "password"}
                    placeholder="Enter password"
                    value={pw}
                    onChange={(e) => {
                      setPw(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPw(!showPw)}
                    data-ocid="admin.show_password.toggle"
                  >
                    {showPw ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {error && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="admin.login.error_state"
                  >
                    {error}
                  </p>
                )}
              </div>
              <Button
                data-ocid="admin.login.submit_button"
                className="w-full bg-primary text-primary-foreground shadow-orange font-semibold"
                onClick={handleLogin}
              >
                <Lock className="w-4 h-4 mr-2" /> Enter Admin Panel
              </Button>
            </CardContent>
          </Card>
          <p className="text-center text-white/40 text-xs mt-4">
            <a href="/" className="hover:text-white/60 transition-colors">
              ← Back to App
            </a>
          </p>
        </div>
      </div>
    );
  }

  const accountTypeStats = [
    {
      label: "Sellers",
      value: stats ? String(stats.sellerCount) : "—",
      icon: ShoppingBag,
      color: "text-orange-brand",
      bg: "bg-orange-50",
    },
    {
      label: "Buyers",
      value: stats ? String(stats.buyerCount) : "—",
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Investors",
      value: stats ? String(stats.investorCount) : "—",
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Partners",
      value: stats ? String(stats.partnerCount) : "—",
      icon: Handshake,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  const activityStats = [
    {
      label: "Total Problems",
      value: stats ? String(stats.totalProblems) : "—",
      icon: Globe,
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      label: "Seller Listings",
      value: stats ? String(stats.totalListings) : "—",
      icon: ShoppingBag,
      color: "text-orange-brand",
      bg: "bg-orange-50",
    },
    {
      label: "Buyer Requests",
      value: stats ? String(stats.totalBuyerRequests) : "—",
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Investor Profiles",
      value: stats ? String(stats.totalInvestorProfiles) : "—",
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Partner Opportunities",
      value: stats ? String(stats.totalPartnerOpportunities) : "—",
      icon: Handshake,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Total Users",
      value: stats
        ? String(
            (stats.sellerCount ?? 0n) +
              (stats.buyerCount ?? 0n) +
              (stats.investorCount ?? 0n) +
              (stats.partnerCount ?? 0n),
          )
        : "—",
      icon: Users,
      color: "text-foreground",
      bg: "bg-muted",
    },
  ];

  return (
    <div
      className="min-h-screen bg-background"
      data-ocid="admin.dashboard.page"
    >
      <header className="bg-sidebar border-b border-sidebar-border px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-sidebar-foreground">
            🛡️ Admin Dashboard
          </h1>
          <p className="text-sidebar-foreground/50 text-xs">
            Start-up with Shiva — Control Panel
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="text-sidebar-foreground/60 hover:text-sidebar-foreground text-sm transition-colors"
          >
            ← View App
          </a>
          <Button
            data-ocid="admin.logout.button"
            size="sm"
            variant="outline"
            onClick={handleLogout}
            className="border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent text-xs"
          >
            <LogOut className="w-3.5 h-3.5 mr-1" /> Logout
          </Button>
        </div>
      </header>

      <main className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Account Type Breakdown */}
        <div>
          <h2 className="font-display font-semibold mb-3">
            Users by Account Type
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {accountTypeStats.map((s, i) => (
              <Card
                key={s.label}
                className="shadow-card"
                data-ocid={`admin.account_type.card.${i + 1}`}
              >
                <CardContent className="p-4">
                  <div
                    className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}
                  >
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  {statsLoading ? (
                    <Skeleton className="h-8 w-16 mb-1" />
                  ) : (
                    <p className="font-display text-2xl font-bold">{s.value}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {s.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Activity Stats */}
        <div>
          <h2 className="font-display font-semibold mb-3">Platform Activity</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {activityStats.map((s, i) => (
              <Card
                key={s.label}
                className="shadow-card"
                data-ocid={`admin.activity.card.${i + 1}`}
              >
                <CardContent className="p-4">
                  <div
                    className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-2`}
                  >
                    <s.icon className={`w-4 h-4 ${s.color}`} />
                  </div>
                  {statsLoading ? (
                    <Skeleton className="h-6 w-12 mb-1" />
                  ) : (
                    <p className="font-display text-xl font-bold">{s.value}</p>
                  )}
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">
                    {s.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Account type distribution visual */}
        {stats && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                User Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    label: "Sellers",
                    count: stats.sellerCount,
                    color: "bg-orange-brand",
                    total:
                      stats.sellerCount +
                      stats.buyerCount +
                      stats.investorCount +
                      stats.partnerCount,
                  },
                  {
                    label: "Buyers",
                    count: stats.buyerCount,
                    color: "bg-blue-500",
                    total:
                      stats.sellerCount +
                      stats.buyerCount +
                      stats.investorCount +
                      stats.partnerCount,
                  },
                  {
                    label: "Investors",
                    count: stats.investorCount,
                    color: "bg-emerald-500",
                    total:
                      stats.sellerCount +
                      stats.buyerCount +
                      stats.investorCount +
                      stats.partnerCount,
                  },
                  {
                    label: "Partners",
                    count: stats.partnerCount,
                    color: "bg-purple-500",
                    total:
                      stats.sellerCount +
                      stats.buyerCount +
                      stats.investorCount +
                      stats.partnerCount,
                  },
                ].map((row, i) => {
                  const total = Number(row.total) || 1;
                  const pct = Math.round((Number(row.count) / total) * 100);
                  return (
                    <div
                      key={row.label}
                      data-ocid={`admin.distribution.item.${i + 1}`}
                    >
                      <div className="flex justify-between text-xs mb-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${row.color}`}
                          />
                          <span className="font-medium">{row.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {String(row.count)}
                          </Badge>
                          <span className="text-muted-foreground">{pct}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${row.color} transition-all`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        <p className="text-center text-xs text-muted-foreground pb-4">
          © {new Date().getFullYear()} Start-up with Shiva. Admin Panel —
          Restricted Access.
        </p>
      </main>
    </div>
  );
}
