import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const guides = [
  {
    id: "tea-stall",
    emoji: "☕",
    name: "Tea Stall",
    cost: "₹800 - ₹1,500",
    difficulty: "Easy",
    timeToProfit: "Week 1",
    steps: [
      "Buy a portable gas stove and cylinder (₹400)",
      "Purchase tea powder, milk, sugar in bulk from Begum Bazaar",
      "Get paper cups (100 for ₹40) and a small table",
      "Scout location: near offices, schools, or bus stops",
      "Start at 6am to capture morning rush",
      "Scale up by adding snacks like biscuits, samosas",
    ],
  },
  {
    id: "fruit-cart",
    emoji: "🍎",
    name: "Fruit Cart",
    cost: "₹1,500 - ₹3,000",
    difficulty: "Easy",
    timeToProfit: "Day 1",
    steps: [
      "Buy or rent a pushcart (₹800 rental/month)",
      "Source fruits from Gudimalkapur Vegetable Market",
      "Set up at busy junctions, markets, or parks",
      "Start with seasonal fruits for best prices",
      "Offer pre-cut fruit bowls at premium price",
    ],
  },
  {
    id: "tiffin-service",
    emoji: "🍱",
    name: "Tiffin Service",
    cost: "₹2,000 - ₹5,000",
    difficulty: "Easy",
    timeToProfit: "Week 2",
    steps: [
      "Start with 10 regular customers from WhatsApp groups",
      "Prepare fresh home-cooked food daily",
      "Buy 20 tiffin containers (₹1,000)",
      "Deliver by 1pm to nearby offices",
      "Charge ₹80-120 per tiffin",
      "Grow through referrals and WhatsApp status",
      "Expand to catering for office events",
    ],
  },
  {
    id: "mobile-repair",
    emoji: "📱",
    name: "Mobile Repair Shop",
    cost: "₹8,000 - ₹15,000",
    difficulty: "Medium",
    timeToProfit: "Month 2",
    steps: [
      "Complete a 30-day mobile repair course online (₹2,000)",
      "Buy basic tool kit: screwdrivers, suction cups, heat gun (₹3,000)",
      "Start home-visit repair service first to build trust",
      "Advertise free repair diagnosis on local WhatsApp groups",
      "Stock common spare parts: screens, batteries (₹5,000)",
      "Expand to accessories sales for additional income",
    ],
  },
  {
    id: "vegetable-delivery",
    emoji: "🥦",
    name: "Vegetable Delivery",
    cost: "₹3,000 - ₹6,000",
    difficulty: "Easy",
    timeToProfit: "Week 1",
    steps: [
      "Get a bicycle or moped for delivery",
      "Source from Gudimalkapur or Bowenpally market",
      "Create WhatsApp group with 50 colony residents",
      "Take morning orders, deliver by evening",
      "Offer weekly subscription packages",
    ],
  },
  {
    id: "coaching-center",
    emoji: "📚",
    name: "Coaching Center",
    cost: "₹15,000 - ₹30,000",
    difficulty: "Medium",
    timeToProfit: "Month 2",
    steps: [
      "Rent a room or hall near school/residential area",
      "Hire subject matter experts (₹5,000-8,000/month each)",
      "Focus on high-demand subjects: Math, Science, English",
      "Start with 8th-10th class students",
      "Distribute pamphlets in colony and near schools",
      "Build parent trust through monthly progress reports",
    ],
  },
];

function DiffBadge({ level }: { level: string }) {
  return (
    <Badge
      variant="outline"
      className={`text-xs ${
        level === "Easy"
          ? "border-green-300 text-green-700 bg-green-50"
          : "border-yellow-300 text-yellow-700 bg-yellow-50"
      }`}
    >
      {level}
    </Badge>
  );
}

export default function StartupGuides() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl font-bold">Startup Guides</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Step-by-step instructions to start your business today.
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {guides.map((g, i) => (
          <AccordionItem
            key={g.id}
            value={g.id}
            className="border border-border rounded-xl px-0 shadow-card bg-card"
            data-ocid={`guides.item.${i + 1}`}
          >
            <AccordionTrigger
              data-ocid={`guides.toggle.${i + 1}`}
              className="px-5 py-4 hover:no-underline"
            >
              <div className="flex items-center gap-3 text-left">
                <span className="text-2xl">{g.emoji}</span>
                <div>
                  <p className="font-display font-semibold">{g.name}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs text-muted-foreground">
                      {g.cost}
                    </span>
                    <DiffBadge level={g.difficulty} />
                    <span className="text-xs text-muted-foreground">
                      First profit: {g.timeToProfit}
                    </span>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5">
              <ol className="space-y-2">
                {g.steps.map((step, j) => (
                  <li key={`${g.id}-${j}`} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {j + 1}
                    </span>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
