import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { toast } from "sonner";

const features = [
  "Problem Discovery — Post & upvote problems",
  "Business Ideas Generator — Personalized ideas",
  "Demand Map — Real-time heat map",
  "All Startup Guides — Step-by-step guides",
  "Import-Export Data — Global opportunities",
  "Supplier Contacts — Wholesale markets",
  "Partner Matching — Find co-founders",
  "Profit Calculator — Estimate returns",
  "Notifications — Opportunity alerts",
];

const revenue = [
  { emoji: "💰", label: "User Subscriptions", desc: "₹5 for 5 days access" },
  {
    emoji: "📣",
    label: "Business Advertising",
    desc: "Local ads on the platform",
  },
  { emoji: "📋", label: "Startup Listings", desc: "Premium business listings" },
  {
    emoji: "📊",
    label: "Analytics Reports",
    desc: "Paid market intelligence reports",
  },
];

export default function Subscription() {
  const handleSubscribe = () => {
    toast.success("Redirecting to payment...");
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-bold">Subscription</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Get full access to all features at an unbeatable price.
        </p>
      </div>

      {/* Pricing card */}
      <Card
        className="shadow-card overflow-hidden border-primary/30"
        data-ocid="subscription.pricing.card"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.14 0.045 255) 0%, oklch(0.20 0.06 255) 100%)",
        }}
      >
        <CardContent className="p-8">
          <div className="text-center text-white mb-6">
            <Badge className="bg-orange-brand/20 text-orange-brand border-orange-brand/30 mb-4 text-sm px-3 py-1">
              🚀 Most Popular
            </Badge>
            <div className="flex items-end justify-center gap-1 mb-2">
              <span className="font-display text-6xl font-bold">₹5</span>
              <span className="text-white/60 mb-2">for 5 days</span>
            </div>
            <p className="text-white/70 text-sm">
              Full access to the entire platform
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-2 mb-6">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-orange-brand flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">{f}</span>
              </div>
            ))}
          </div>

          <Separator className="border-white/10 mb-6" />

          <div className="space-y-4">
            <div>
              <p className="text-white/60 text-sm text-center mb-3">Pay with</p>
              <div className="flex justify-center gap-3 flex-wrap">
                {["Google Pay", "PhonePe", "Paytm"].map((method) => (
                  <Badge
                    key={method}
                    variant="outline"
                    className="border-white/20 text-white/80 bg-white/10 px-4 py-1.5 text-sm"
                  >
                    {method}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              data-ocid="subscription.subscribe.primary_button"
              onClick={handleSubscribe}
              className="w-full bg-orange-brand hover:bg-orange-dark text-white font-bold text-lg py-6 shadow-orange"
            >
              Subscribe Now — ₹5 Only
            </Button>

            <p className="text-center text-white/40 text-xs">
              🔒 Secure payment. Cancel anytime. No hidden charges.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Revenue model */}
      <div>
        <h2 className="font-display font-semibold text-lg mb-4">
          How Startup With Shiva Earns
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {revenue.map((r, i) => (
            <Card
              key={r.label}
              className="shadow-card"
              data-ocid={`subscription.revenue.item.${i + 1}`}
            >
              <CardContent className="p-4 flex items-start gap-3">
                <span className="text-2xl">{r.emoji}</span>
                <div>
                  <p className="font-semibold text-sm">{r.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {r.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
