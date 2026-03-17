import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  Briefcase,
  Handshake,
  MapPin,
  Quote,
  ShoppingBag,
  ShoppingCart,
  Star,
  ThumbsUp,
  TrendingUp,
} from "lucide-react";
import type { Page, UserProfile } from "../App";
import SocialProof from "../components/SocialProof";
import {
  useGetAllBuyerRequests,
  useGetAllInvestorProfiles,
  useGetAllListings,
  useGetAllPartnerOpportunities,
  useGetAllProblems,
} from "../hooks/useQueries";

interface DashboardProps {
  profile: UserProfile | null;
  onNavigate: (page: Page) => void;
}

const ACCOUNT_TYPE_CONFIG = {
  seller: {
    label: "Seller",
    icon: ShoppingBag,
    color: "text-orange-brand",
    bg: "bg-orange-50",
    border: "border-orange-200",
    primaryAction: {
      page: "sellers" as Page,
      label: "Post Your Product",
      emoji: "🛒",
    },
    secondaryActions: [
      { page: "buyers" as Page, label: "See Buyer Needs", emoji: "👀" },
      { page: "problems" as Page, label: "Discover Problems", emoji: "🔍" },
    ],
  },
  buyer: {
    label: "Buyer",
    icon: ShoppingCart,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    primaryAction: {
      page: "buyers" as Page,
      label: "Post Your Need",
      emoji: "📢",
    },
    secondaryActions: [
      { page: "sellers" as Page, label: "Browse Sellers", emoji: "🏪" },
      { page: "suppliers" as Page, label: "Find Suppliers", emoji: "📦" },
    ],
  },
  investor: {
    label: "Investor",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    primaryAction: {
      page: "investors" as Page,
      label: "Register as Investor",
      emoji: "💰",
    },
    secondaryActions: [
      {
        page: "partnerships" as Page,
        label: "Find Opportunities",
        emoji: "🤝",
      },
      { page: "map" as Page, label: "View Demand Map", emoji: "🗺️" },
    ],
  },
  partner: {
    label: "Partner",
    icon: Handshake,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    primaryAction: {
      page: "partnerships" as Page,
      label: "Post Opportunity",
      emoji: "🚀",
    },
    secondaryActions: [
      { page: "investors" as Page, label: "Find Investors", emoji: "💵" },
      { page: "ideas" as Page, label: "Browse Ideas", emoji: "💡" },
    ],
  },
};

const FEATURED_STORY = {
  name: "Ranjitha Devi",
  location: "Hyderabad, Telangana",
  image: "/assets/generated/success-ranjitha.dim_400x400.jpg",
  business: "Idli & Dosa Food Stall",
  before: "Housewife, no income",
  after: "₹35,000/month",
  quote:
    "I started with ₹3,000 and now earn ₹35,000 every month thanks to Startup with Shiva!",
  category: "Food",
};

export default function Dashboard({ profile, onNavigate }: DashboardProps) {
  const accountType = profile?.accountType ?? "buyer";
  const config = ACCOUNT_TYPE_CONFIG[accountType];
  const AccountIcon = config.icon;

  const { data: problems, isLoading: loadingProblems } = useGetAllProblems();
  const { data: listings, isLoading: loadingListings } = useGetAllListings();
  const { data: buyerRequests } = useGetAllBuyerRequests();
  const { data: investors, isLoading: loadingInvestors } =
    useGetAllInvestorProfiles();
  const { data: partnerships, isLoading: loadingPartnerships } =
    useGetAllPartnerOpportunities();

  const stats = [
    {
      label: "Problems Posted",
      value: problems?.length ?? 0,
      icon: Briefcase,
      color: "text-red-500",
      bg: "bg-red-50",
      page: "problems" as Page,
      loading: loadingProblems,
    },
    {
      label: "Seller Listings",
      value: listings?.length ?? 0,
      icon: ShoppingBag,
      color: "text-orange-brand",
      bg: "bg-orange-50",
      page: "sellers" as Page,
      loading: loadingListings,
    },
    {
      label: "Investor Profiles",
      value: investors?.length ?? 0,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      page: "investors" as Page,
      loading: loadingInvestors,
    },
    {
      label: "Partner Opportunities",
      value: partnerships?.length ?? 0,
      icon: Handshake,
      color: "text-purple-600",
      bg: "bg-purple-50",
      page: "partnerships" as Page,
      loading: loadingPartnerships,
    },
  ];

  const recentProblems = (problems ?? []).slice(0, 3);

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Welcome banner */}
      <div
        className="rounded-2xl p-6 md:p-8 text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.14 0.045 255) 0%, oklch(0.22 0.07 255) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 50%, oklch(0.68 0.18 50) 0%, transparent 60%)",
          }}
        />
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-white/60 text-sm font-medium mb-1">
              Welcome back,{" "}
              {profile ? profile.name.split(" ")[0] : "Entrepreneur"} 👋
            </p>
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
              Find Needs. Build Businesses.
            </h1>
            <p className="text-white/70 text-sm max-w-lg">
              Discover real problems in your area and turn them into profitable
              businesses.
            </p>
            <Button
              data-ocid="dashboard.discover.primary_button"
              onClick={() => onNavigate(config.primaryAction.page)}
              className="mt-4 bg-orange-brand hover:bg-orange-dark text-white shadow-orange font-semibold"
            >
              {config.primaryAction.emoji} {config.primaryAction.label}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          {/* Account type badge */}
          <div
            className={`flex-shrink-0 rounded-2xl p-4 ${config.bg} flex flex-col items-center gap-1 min-w-[96px]`}
          >
            <AccountIcon className={`w-7 h-7 ${config.color}`} />
            <Badge
              className={`text-xs font-bold ${config.color} border-current bg-transparent`}
              variant="outline"
            >
              {config.label}
            </Badge>
            <p className="text-xs text-muted-foreground text-center leading-tight">
              Account
            </p>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <SocialProof />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <button
            type="button"
            key={s.label}
            className="text-left"
            onClick={() => onNavigate(s.page)}
            data-ocid={`dashboard.stat.card.${i + 1}`}
          >
            <Card className="shadow-card hover:border-primary/50 transition-all cursor-pointer">
              <CardContent className="p-4">
                <div
                  className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}
                >
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                {s.loading ? (
                  <Skeleton className="h-8 w-16 mb-1" />
                ) : (
                  <p className="font-display text-2xl font-bold">{s.value}</p>
                )}
                <p className="text-xs text-muted-foreground mt-0.5">
                  {s.label}
                </p>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Problems */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-lg">
              Recent Problems
            </h2>
            <Button
              variant="ghost"
              size="sm"
              data-ocid="dashboard.problems.link"
              onClick={() => onNavigate("problems")}
              className="text-primary text-xs"
            >
              View all <ArrowRight className="ml-1 w-3 h-3" />
            </Button>
          </div>
          {loadingProblems ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full rounded-xl" />
              ))}
            </div>
          ) : recentProblems.length === 0 ? (
            <Card
              className="shadow-card"
              data-ocid="dashboard.problems.empty_state"
            >
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground text-sm">
                  No problems posted yet.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => onNavigate("problems")}
                >
                  Post the first problem
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {recentProblems.map((p, i) => (
                <Card
                  key={String(p.id)}
                  className="shadow-card"
                  data-ocid={`dashboard.problem.item.${i + 1}`}
                >
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{p.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        📍 {p.location}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <Badge variant="outline" className="text-xs">
                        {p.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-orange-brand font-semibold">
                        <ThumbsUp className="w-3 h-3" /> {String(p.upvotes)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="font-display font-semibold text-lg mb-3">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button
              type="button"
              data-ocid="dashboard.primary_action.button"
              onClick={() => onNavigate(config.primaryAction.page)}
              className="w-full rounded-xl border-2 border-primary/30 bg-primary/5 p-4 text-left hover:border-primary hover:bg-primary/10 transition-all duration-150 group"
            >
              <span className="text-2xl block mb-1">
                {config.primaryAction.emoji}
              </span>
              <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                {config.primaryAction.label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Your primary action
              </p>
            </button>
            {config.secondaryActions.map((q) => (
              <button
                type="button"
                key={q.page}
                data-ocid={`dashboard.quicklink.${q.page}.button`}
                onClick={() => onNavigate(q.page)}
                className="w-full rounded-xl border border-border bg-card p-3 text-left hover:border-primary/50 transition-all duration-150 group flex items-center gap-3"
              >
                <span className="text-xl">{q.emoji}</span>
                <div>
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">
                    {q.label}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary" />
              </button>
            ))}
            <button
              type="button"
              data-ocid="dashboard.quicklink.ideas.button"
              onClick={() => onNavigate("ideas")}
              className="w-full rounded-xl border border-border bg-card p-3 text-left hover:border-primary/50 transition-all duration-150 group flex items-center gap-3"
            >
              <span className="text-xl">💡</span>
              <div>
                <p className="font-medium text-sm group-hover:text-primary transition-colors">
                  Business Ideas
                </p>
              </div>
              <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary" />
            </button>
            <button
              type="button"
              data-ocid="dashboard.quicklink.map.button"
              onClick={() => onNavigate("map")}
              className="w-full rounded-xl border border-border bg-card p-3 text-left hover:border-primary/50 transition-all duration-150 group flex items-center gap-3"
            >
              <span className="text-xl">🗺️</span>
              <div>
                <p className="font-medium text-sm group-hover:text-primary transition-colors">
                  Demand Map
                </p>
              </div>
              <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary" />
            </button>
            <button
              type="button"
              data-ocid="dashboard.quicklink.calculator.button"
              onClick={() => onNavigate("calculator")}
              className="w-full rounded-xl border border-border bg-card p-3 text-left hover:border-primary/50 transition-all duration-150 group flex items-center gap-3"
            >
              <span className="text-xl">📊</span>
              <div>
                <p className="font-medium text-sm group-hover:text-primary transition-colors">
                  Profit Calculator
                </p>
              </div>
              <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Success Story */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
            <h2 className="font-display font-semibold text-lg">
              Featured Success Story
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            data-ocid="dashboard.success_stories.link"
            onClick={() => onNavigate("success-stories")}
            className="text-primary text-xs"
          >
            See all stories <ArrowRight className="ml-1 w-3 h-3" />
          </Button>
        </div>
        <Card
          className="shadow-card overflow-hidden"
          data-ocid="dashboard.featured_story.card"
        >
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              <img
                src={FEATURED_STORY.image}
                alt={FEATURED_STORY.name}
                className="w-full sm:w-48 h-48 sm:h-auto object-cover object-top flex-shrink-0"
              />
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-display font-bold text-lg">
                        {FEATURED_STORY.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        📍 {FEATURED_STORY.location}
                      </p>
                      <p className="text-sm text-foreground/70 mt-0.5">
                        {FEATURED_STORY.business}
                      </p>
                    </div>
                    <Badge className="text-xs bg-amber-100 text-amber-700 border border-amber-200">
                      {FEATURED_STORY.category}
                    </Badge>
                  </div>
                  <div className="flex gap-3 my-3">
                    <div className="rounded-lg bg-red-50 border border-red-100 px-3 py-2 text-xs">
                      <p className="font-bold text-red-500 text-[10px] uppercase">
                        Before
                      </p>
                      <p className="text-red-700 font-medium">
                        {FEATURED_STORY.before}
                      </p>
                    </div>
                    <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2 text-xs">
                      <p className="font-bold text-emerald-600 text-[10px] uppercase">
                        After
                      </p>
                      <p className="text-emerald-700 font-bold text-base">
                        {FEATURED_STORY.after}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-amber-50 rounded-xl p-3 border border-amber-100">
                    <Quote className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 italic">
                      {FEATURED_STORY.quote}
                    </p>
                  </div>
                </div>
                <Button
                  className="mt-4 self-start bg-orange-brand hover:bg-orange-dark text-white text-sm font-semibold shadow-orange"
                  onClick={() => onNavigate("success-stories")}
                  data-ocid="dashboard.featured_story.primary_button"
                >
                  See All 2,400+ Stories <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Post a Local Need CTA */}
      <Card
        className="shadow-card border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors cursor-pointer group"
        data-ocid="dashboard.place_needs.card"
        onClick={() => onNavigate("place-needs")}
      >
        <CardContent className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-display font-bold text-base">
              Post a Local Need
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Tell others what your area is missing — become a business
              opportunity for someone near you.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
        </CardContent>
      </Card>

      {/* Buyer requests preview if buyer */}
      {accountType === "buyer" && (buyerRequests?.length ?? 0) > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-lg">
              Recent Buyer Requests
            </h2>
            <Button
              variant="ghost"
              size="sm"
              data-ocid="dashboard.buyers.link"
              onClick={() => onNavigate("buyers")}
              className="text-primary text-xs"
            >
              View all <ArrowRight className="ml-1 w-3 h-3" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {(buyerRequests ?? []).slice(0, 4).map((r, i) => (
              <Card
                key={String(r.id)}
                className="shadow-card"
                data-ocid={`dashboard.buyer.item.${i + 1}`}
              >
                <CardContent className="p-4">
                  <p className="font-medium text-sm">{r.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    📍 {r.location}
                  </p>
                  <p className="text-xs font-semibold text-emerald-600 mt-1">
                    Budget: ₹{String(r.budget)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
