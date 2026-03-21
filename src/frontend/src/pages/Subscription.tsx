import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { useState } from "react";
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
  const [showQR, setShowQR] = useState(false);
  const [screenshotUploaded, setScreenshotUploaded] = useState(false);

  const handleSubscribe = () => {
    setShowQR(true);
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setScreenshotUploaded(true);
      toast.success(
        "Payment screenshot received! Your access will be activated within a few minutes.",
      );
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-bold">Subscription</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Get full access to all features at an unbeatable price.
        </p>
      </div>

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

          {!showQR ? (
            <div className="space-y-4">
              <div>
                <p className="text-white/60 text-sm text-center mb-3">
                  Pay with
                </p>
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
          ) : (
            <div className="space-y-4">
              <p className="text-white text-center font-semibold">
                Scan & Pay ₹5 via PhonePe
              </p>
              <div className="flex justify-center">
                <div className="bg-white rounded-2xl p-3 w-fit">
                  <img
                    src="/assets/uploads/AccountQRCodeUnion-Bank-Of-India-1238_DARK_THEME-1.png"
                    alt="PhonePe QR Code - DURGA SHIVASAI"
                    className="w-56 h-auto rounded-lg"
                  />
                </div>
              </div>
              <p className="text-white/70 text-sm text-center">
                Pay to:{" "}
                <span className="font-bold text-white">DURGA SHIVASAI</span>
              </p>
              <Separator className="border-white/10" />
              <div className="space-y-2">
                <p className="text-white/70 text-sm text-center">
                  After paying, upload your payment screenshot to activate
                  access:
                </p>
                {!screenshotUploaded ? (
                  <label className="block cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleScreenshotUpload}
                    />
                    <div className="w-full border-2 border-dashed border-white/30 rounded-xl py-4 px-6 text-center text-white/60 hover:border-orange-brand/60 hover:text-white/80 transition-colors">
                      📷 Upload Payment Screenshot
                    </div>
                  </label>
                ) : (
                  <div className="w-full bg-green-500/20 border border-green-500/40 rounded-xl py-4 px-6 text-center text-green-300 text-sm">
                    ✅ Screenshot received! Access will be activated soon.
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowQR(false)}
                className="text-white/40 text-xs text-center w-full hover:text-white/60 transition-colors"
              >
                ← Back
              </button>
            </div>
          )}
        </CardContent>
      </Card>

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
