import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useState } from "react";

interface Idea {
  name: string;
  category: string;
  cost: number;
  costLabel: string;
  profit: string;
  emoji: string;
  timeline: string;
  materials: string[];
  steps: string[];
  tips: string[];
}

const allIdeas: Idea[] = [
  {
    name: "Tea Stall",
    category: "Food",
    cost: 800,
    costLabel: "₹800",
    profit: "₹6,000–₹9,000/mo",
    emoji: "☕",
    timeline: "Start in 1 day",
    materials: [
      "Gas stove & cylinder",
      "Tea powder, milk, sugar",
      "Paper cups (100 pcs = ₹40)",
      "Small folding table",
      "Kettle & strainer",
    ],
    steps: [
      "Buy portable gas stove from local hardware shop (₹400)",
      "Source tea powder & milk from Begum Bazaar wholesale",
      "Scout location: near offices, bus stops, schools (7am–10am peak)",
      "Start with 50 cups/day at ₹10 each = ₹500 revenue",
      "Add biscuits, bread toast for extra margin",
      "Build regular customer base via consistent timing",
      "Scale to 2 locations after 1 month",
    ],
    tips: [
      "Consistency is key — come at same time every day",
      "Keep stall clean to build trust",
      "Offer credit to loyal customers",
    ],
  },
  {
    name: "Fruit Cart",
    category: "Food",
    cost: 1500,
    costLabel: "₹1,500",
    profit: "₹8,000–₹12,000/mo",
    emoji: "🍎",
    timeline: "Start in 1 day",
    materials: [
      "Pushcart (rent ₹800/mo or buy ₹4,000)",
      "Seasonal fruits from wholesale",
      "Weighing scale",
      "Plastic bags",
      "Umbrella for shade",
    ],
    steps: [
      "Source fruits from Gudimalkapur Vegetable Market at 5am",
      "Set up at busy junction, park entrance, or office area",
      "Focus on 4–5 seasonal fruits for best margins",
      "Offer pre-cut fruit bowls for premium price (₹30–50)",
      "Build weekly subscription customers",
      "Expand to vegetables during off-season",
    ],
    tips: [
      "Buy only what you can sell in one day",
      "Fruit bowls have 3x higher margin",
      "WhatsApp orders save time",
    ],
  },
  {
    name: "Tiffin Service",
    category: "Food",
    cost: 2000,
    costLabel: "₹2,000",
    profit: "₹12,000–₹18,000/mo",
    emoji: "🍱",
    timeline: "Start in 3 days",
    materials: [
      "20 tiffin containers (₹1,000)",
      "Gas stove (existing or ₹600)",
      "Delivery bags",
      "WhatsApp Business account",
    ],
    steps: [
      "Create WhatsApp group with 10–15 nearby office workers",
      "Offer trial week at ₹50/tiffin (normally ₹80–100)",
      "Prepare fresh home-cooked lunch daily by 11am",
      "Deliver by 1pm sharp — punctuality builds trust",
      "Collect weekly payments to improve cashflow",
      "Expand to 30+ customers by month 2",
      "Add dinner option for extra income",
    ],
    tips: [
      "Consistency in taste wins long-term customers",
      "Monthly subscription beats per-day payments",
      "Cater office events for bonus income",
    ],
  },
  {
    name: "Juice Shop",
    category: "Food",
    cost: 5000,
    costLabel: "₹5,000",
    profit: "₹15,000–₹22,000/mo",
    emoji: "🥤",
    timeline: "Start in 2 days",
    materials: [
      "Juicer machine (₹2,000)",
      "Sugarcane press (₹2,500 rent)",
      "Fresh fruits",
      "Paper cups & straws",
      "Small counter or kiosk",
    ],
    steps: [
      "Buy commercial juicer from wholesale electronics market",
      "Rent kiosk near gym, park, or market (₹1,500/mo)",
      "Source fruits from Gudimalkapur wholesale daily",
      "Offer sugarcane juice — highest margin per cup",
      "Add seasonal specials like watermelon in summer",
      "Display hygiene certificates prominently",
    ],
    tips: [
      "Cleanliness is your biggest USP",
      "Sugarcane machine attracts foot traffic",
      "Summer = 3x more demand",
    ],
  },
  {
    name: "Vegetable Delivery",
    category: "Food",
    cost: 4000,
    costLabel: "₹4,000",
    profit: "₹10,000–₹15,000/mo",
    emoji: "🥦",
    timeline: "Start in 2 days",
    materials: [
      "Bicycle or moped (own or rent)",
      "Large carry bags",
      "WhatsApp Business",
      "Weighing scale",
    ],
    steps: [
      "Source from Gudimalkapur or Bowenpally market at 5am",
      "Create WhatsApp group with 50+ colony residents",
      "Take advance orders by 7pm previous night",
      "Deliver fresh vegetables by 8am",
      "Offer weekly subscription packages (₹500/week)",
      "Add fruits & dairy for higher basket size",
    ],
    tips: [
      "Subscriptions = stable income",
      "Women's WhatsApp groups = best marketing",
      "Freshness guarantee builds loyalty",
    ],
  },
  {
    name: "Flower Stall",
    category: "Retail",
    cost: 3000,
    costLabel: "₹3,000",
    profit: "₹12,000–₹18,000/mo",
    emoji: "🌸",
    timeline: "Start in 1 day",
    materials: [
      "Pushcart or footpath stall",
      "Flowers from wholesale",
      "Plastic bags & rubber bands",
      "Sprinkler for freshness",
    ],
    steps: [
      "Source from Gudimalkapur flower market at 4am",
      "Set up near temple, school, or market entrance",
      "Learn basic bouquet making (YouTube tutorial)",
      "Peak sales: Monday & Friday (temple days)",
      "Offer pre-booked wedding bouquets",
      "Expand to event decorations",
    ],
    tips: [
      "Festival seasons double revenue",
      "Temple locations = guaranteed daily sales",
      "Wedding events = ₹5,000+ single order",
    ],
  },
  {
    name: "Mobile Repair",
    category: "Services",
    cost: 8000,
    costLabel: "₹8,000",
    profit: "₹20,000–₹30,000/mo",
    emoji: "📱",
    timeline: "Start in 2 weeks",
    materials: [
      "Repair tool kit (screwdrivers, suction cups, spudgers)",
      "Heat gun",
      "Spare parts: screens, batteries",
      "Soldering iron (optional)",
    ],
    steps: [
      "Complete 30-day online mobile repair course (₹2,000)",
      "Buy basic tool kit from Malakpet wholesale (₹3,000)",
      "Start with home-visit service to build trust",
      "Advertise 'free diagnosis' on local WhatsApp groups",
      "Stock common parts: Samsung & iPhone screens, batteries",
      "Open small shop after 2 months when demand is stable",
      "Add accessories sales for 40% extra income",
    ],
    tips: [
      "Home visits charge ₹50 extra — customers pay happily",
      "Speed of repair wins reviews",
      "YouTube has free tutorials for most phone models",
    ],
  },
  {
    name: "Tailoring Shop",
    category: "Services",
    cost: 15000,
    costLabel: "₹15,000",
    profit: "₹18,000–₹28,000/mo",
    emoji: "🧵",
    timeline: "Start in 1 week",
    materials: [
      "Sewing machine (₹8,000–₹12,000)",
      "Cutting table",
      "Thread, needles, scissors",
      "Measuring tape & chalk",
    ],
    steps: [
      "Set up in residential colony near women's market",
      "Specialize in ladies blouses, salwar suits (high demand)",
      "Offer alteration service at ₹100–300 to build clientele",
      "Focus on festival orders (Diwali, Eid, weddings)",
      "Partner with fabric shops for referrals",
      "Hire one helper at month 3 to scale",
    ],
    tips: [
      "Festival season = 3x income",
      "Take 50% advance for custom orders",
      "Instagram photos of work = free marketing",
    ],
  },
  {
    name: "Online Tutoring",
    category: "Online",
    cost: 1000,
    costLabel: "₹1,000",
    profit: "₹15,000–₹40,000/mo",
    emoji: "📚",
    timeline: "Start in 3 days",
    materials: [
      "Laptop or smartphone",
      "Stable internet",
      "Whiteboard (physical or online)",
      "Zoom/Google Meet account (free)",
    ],
    steps: [
      "Choose your subject specialization (Math/Science/English)",
      "Create profile on UrbanPro, Superprof, or WhatsApp",
      "Offer 3 free demo classes to first students",
      "Start with ₹200/hour, increase as reputation grows",
      "Create recorded video courses on Udemy for passive income",
      "Build batch classes (10 students × ₹1,500/mo)",
    ],
    tips: [
      "Board exam students pay highest rates",
      "Group batches = more income per hour",
      "Record sessions for absent students — they love it",
    ],
  },
  {
    name: "Computer Classes",
    category: "Services",
    cost: 20000,
    costLabel: "₹20,000",
    profit: "₹25,000–₹45,000/mo",
    emoji: "💻",
    timeline: "Start in 1 week",
    materials: [
      "2–3 computers (secondhand ₹8,000 each)",
      "Chairs & desks",
      "Printer (optional)",
      "Whiteboard",
    ],
    steps: [
      "Rent small room near school or residential area",
      "Offer basic courses: MS Office, Tally, Photoshop",
      "Target job-seekers (most willing to pay)",
      "Charge ₹1,500–₹3,000/month per student",
      "Tie up with colleges for internship students",
      "Add government scheme computer courses",
    ],
    tips: [
      "Tally course has highest demand for job placement",
      "Evening batches fill fastest",
      "Job placement assistance = premium charges",
    ],
  },
  {
    name: "Grocery Store",
    category: "Retail",
    cost: 35000,
    costLabel: "₹35,000",
    profit: "₹35,000–₹55,000/mo",
    emoji: "🏪",
    timeline: "Start in 2 weeks",
    materials: [
      "Shop rental (₹5,000–₹8,000/mo)",
      "Initial stock (₹20,000)",
      "Shelving & counter",
      "Billing machine",
    ],
    steps: [
      "Find good location: dense residential area",
      "Get FSSAI basic registration (free online)",
      "Stock 200+ essential daily items",
      "Tie up with Begum Bazaar wholesale for best prices",
      "Offer home delivery on WhatsApp",
      "List on Swiggy Instamart/Blinkit for extra orders",
    ],
    tips: [
      "Home delivery adds 30% more revenue",
      "Monthly credit to 10 families = guaranteed business",
      "Festival stock early for best prices",
    ],
  },
  {
    name: "Cloud Kitchen",
    category: "Food",
    cost: 40000,
    costLabel: "₹40,000",
    profit: "₹50,000–₹80,000/mo",
    emoji: "🍳",
    timeline: "Start in 3 weeks",
    materials: [
      "Commercial kitchen space (₹5,000/mo)",
      "Cooking equipment",
      "FSSAI license",
      "Packaging materials",
    ],
    steps: [
      "Rent small kitchen space (separate from home)",
      "Get FSSAI food license & GST registration",
      "Register on Swiggy, Zomato as restaurant",
      "Focus on one cuisine type (biryani, South Indian)",
      "Build consistent quality over 2–3 months",
      "Add 2nd brand from same kitchen to double revenue",
    ],
    tips: [
      "Multiple brands from one kitchen = higher ROI",
      "Packaging quality drives review scores",
      "Lunch hours = highest order volume",
    ],
  },
  {
    name: "Import Spices to USA",
    category: "Import-Export",
    cost: 50000,
    costLabel: "₹50,000",
    profit: "₹80,000–₹1.5L/mo",
    emoji: "🌶️",
    timeline: "Start in 1 month",
    materials: [
      "Export license (IEC code)",
      "FSSAI export certification",
      "FDA registration (USA)",
      "Packaging & labeling",
    ],
    steps: [
      "Get Importer Exporter Code (IEC) from DGFT website (₹500)",
      "Register with APEDA for agri products",
      "Source spices from Guntur wholesale market",
      "Get FDA registration for US market (online process)",
      "Find US buyers on Alibaba, IndiaMART, Global Trade",
      "Start with small 50kg trial shipment",
      "Scale based on buyer feedback",
    ],
    tips: [
      "Turmeric & chili have highest demand",
      "Organic certification adds 40% premium",
      "Indian diaspora communities = easiest first buyers",
    ],
  },
  {
    name: "Export Handicrafts to Germany",
    category: "Import-Export",
    cost: 30000,
    costLabel: "₹30,000",
    profit: "₹60,000–₹1L/mo",
    emoji: "🎨",
    timeline: "Start in 3 weeks",
    materials: [
      "IEC export license",
      "Handicraft samples",
      "Professional product photography",
      "Export packaging",
    ],
    steps: [
      "Connect with Nirmal, Bidriware, Pochampally artisans",
      "Get IEC code from DGFT for export",
      "Create Etsy/Amazon Handmade seller account",
      "Take professional product photos (₹3,000)",
      "List on Etsy with competitive pricing",
      "Partner with German boutique stores via email outreach",
    ],
    tips: [
      "Etsy = easiest entry for handicrafts globally",
      "Authenticity stories sell better than just products",
      "German buyers value eco-friendly packaging",
    ],
  },
  {
    name: "Wholesale Grocery Supply",
    category: "Retail",
    cost: 80000,
    costLabel: "₹80,000",
    profit: "₹60,000–₹90,000/mo",
    emoji: "📦",
    timeline: "Start in 2 weeks",
    materials: [
      "Warehouse space",
      "Delivery vehicle (rent or own)",
      "GST registration",
      "FSSAI license",
    ],
    steps: [
      "Lease small warehouse space near wholesale market",
      "Get GST registration and FSSAI license",
      "Source from Begum Bazaar at best prices",
      "Target small kirana stores for weekly supply",
      "Build network of 20+ grocery stores as clients",
      "Offer 30-day credit to trusted clients",
    ],
    tips: [
      "30-day credit to stores = they stay loyal",
      "Fast delivery = main competitive advantage",
      "Own vehicle saves 15% in logistics costs",
    ],
  },
  {
    name: "YouTube Channel",
    category: "Online",
    cost: 5000,
    costLabel: "₹5,000",
    profit: "₹10,000–₹50,000/mo",
    emoji: "🎥",
    timeline: "Start earning in 3–6 months",
    materials: [
      "Smartphone (existing)",
      "Ring light (₹1,500)",
      "Lavalier mic (₹800)",
      "Video editing app (free)",
    ],
    steps: [
      "Pick a niche: cooking, tutorials, local vlogs, education",
      "Post 3 videos per week consistently",
      "Optimize titles and thumbnails (most important!)",
      "Reach 1,000 subscribers for monetization eligibility",
      "Apply for YouTube Partner Program at 4,000 watch hours",
      "Add affiliate links and brand sponsorships",
    ],
    tips: [
      "Telugu/Hindi content has 500M+ audience",
      "Educational + entertainment = best retention",
      "Consistency beats perfection",
    ],
  },
  {
    name: "Courier & Delivery Service",
    category: "Services",
    cost: 10000,
    costLabel: "₹10,000",
    profit: "₹18,000–₹25,000/mo",
    emoji: "🚴",
    timeline: "Start in 1 week",
    materials: [
      "Bicycle or moped",
      "Delivery bags (insulated)",
      "Smartphone for orders",
      "Google Maps",
    ],
    steps: [
      "Register as delivery partner on Swiggy, Zomato, Dunzo",
      "Work peak hours: 12pm–2pm, 7pm–10pm for max earnings",
      "Accept bulk business deliveries from local shops",
      "Build own local delivery network for higher margin",
      "Add medicine delivery (Medlife, NetMeds)",
    ],
    tips: [
      "Peak hour earnings = ₹80–120 per hour",
      "Good ratings = more orders assigned",
      "Business deliveries pay more than food",
    ],
  },
  {
    name: "Coaching Center",
    category: "Services",
    cost: 25000,
    costLabel: "₹25,000",
    profit: "₹40,000–₹70,000/mo",
    emoji: "🏫",
    timeline: "Start in 2 weeks",
    materials: [
      "Rented hall or room",
      "Chairs & whiteboard",
      "Textbooks & study material",
      "Printer",
    ],
    steps: [
      "Find room near school in residential area",
      "Hire subject expert teachers (₹8,000–₹15,000/mo)",
      "Start with 8th–10th class board exam students",
      "Charge ₹1,500–₹2,500/month per student",
      "Distribute pamphlets near schools in morning",
      "Offer scholarship to top student for marketing",
    ],
    tips: [
      "Board exam students have highest willingness to pay",
      "Results display = best marketing",
      "Online + offline hybrid boosts capacity",
    ],
  },
  {
    name: "Textile Export to UK",
    category: "Import-Export",
    cost: 45000,
    costLabel: "₹45,000",
    profit: "₹70,000–₹1.2L/mo",
    emoji: "👗",
    timeline: "Start in 1 month",
    materials: [
      "IEC code",
      "TEXPROCIL registration",
      "Sample fabrics",
      "Export packaging",
    ],
    steps: [
      "Source handloom fabrics from Sultan Bazaar, Hyderabad",
      "Register with TEXPROCIL (Textile Export Promotion Council)",
      "Get IEC code from DGFT",
      "Find UK buyers on Alibaba or UK trade fairs",
      "Send 10m sample to interested buyers",
      "Scale after first successful shipment",
    ],
    tips: [
      "Handloom fabrics command 5x premium in UK",
      "Sustainable/eco label increases price further",
      "UK Indian diaspora is your warmest audience",
    ],
  },
  {
    name: "Mehndi / Bridal Artist",
    category: "Services",
    cost: 3000,
    costLabel: "₹3,000",
    profit: "₹20,000–₹40,000/mo",
    emoji: "🖌️",
    timeline: "Start in 1 week",
    materials: [
      "Mehndi cones (₹500)",
      "Design books/phone gallery",
      "Mat for sitting",
      "Hand sanitizer & towel",
    ],
    steps: [
      "Practice 20+ standard bridal designs",
      "Create Instagram/Facebook page with photos",
      "Start with ₹300 basic mehndi design",
      "Target wedding season (Oct–March)",
      "Partner with beauty parlors for referrals",
      "Charge ₹2,000–₹8,000 for bridal mehndi",
    ],
    tips: [
      "Bridal season = ₹50,000+ monthly",
      "Instagram Reels go viral for mehndi",
      "Package deals (bride + bridesmaids) = high value",
    ],
  },
  {
    name: "Laptop Repair",
    category: "Services",
    cost: 12000,
    costLabel: "₹12,000",
    profit: "₹22,000–₹35,000/mo",
    emoji: "🖥️",
    timeline: "Start in 2 weeks",
    materials: [
      "Repair tool kit",
      "Thermal paste & isopropyl alcohol",
      "Replacement parts (RAM, HDD)",
      "Anti-static mat",
    ],
    steps: [
      "Learn laptop repair via YouTube/online course (free–₹2,000)",
      "Buy tool kit and common spare parts",
      "Advertise on local Facebook groups & WhatsApp",
      "Charge ₹300–500 for basic issues, ₹1,500–3,000 for screen/board",
      "Partner with corporate offices for bulk service contracts",
      "Open small shop after 3 months",
    ],
    tips: [
      "Corporate contracts = stable monthly income",
      "Free pickup/delivery adds ₹200 per job",
      "Data recovery is high-margin emergency service",
    ],
  },
  {
    name: "Event Photography",
    category: "Services",
    cost: 25000,
    costLabel: "₹25,000",
    profit: "₹30,000–₹60,000/mo",
    emoji: "📸",
    timeline: "Start in 1 week",
    materials: [
      "DSLR/mirrorless camera (₹20,000+)",
      "Basic lenses",
      "Editing software (Lightroom)",
      "Portfolio website",
    ],
    steps: [
      "Practice shooting at free events first",
      "Build Instagram portfolio with 50+ quality photos",
      "Start with birthday parties (₹3,000–5,000)",
      "Move to weddings (₹15,000–50,000 per event)",
      "Add reels/video service for higher package rates",
      "Join wedding photographer networks",
    ],
    tips: [
      "Wedding season Oct–March = peak earnings",
      "Reels videos command 2x premium",
      "Same-day delivery of edited photos wins reviews",
    ],
  },
];

const categories = [
  "All",
  "Food",
  "Retail",
  "Services",
  "Online",
  "Import-Export",
];
const budgetFilters = [
  { label: "All Budgets", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "Under ₹10,000", min: 0, max: 9999 },
  { label: "₹10k – ₹1 Lakh", min: 10000, max: 99999 },
  { label: "Above ₹1 Lakh", min: 100000, max: Number.POSITIVE_INFINITY },
];

export default function BusinessIdeas() {
  const [category, setCategory] = useState("All");
  const [budgetIdx, setBudgetIdx] = useState(0);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const budget = budgetFilters[budgetIdx];
  const filtered = allIdeas.filter((idea) => {
    const catMatch = category === "All" || idea.category === category;
    const budgetMatch = idea.cost >= budget.min && idea.cost <= budget.max;
    const searchMatch =
      !search || idea.name.toLowerCase().includes(search.toLowerCase());
    return catMatch && budgetMatch && searchMatch;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-display text-2xl font-bold">Business Ideas</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {allIdeas.length}+ real business ideas with full step-by-step launch
          guides.
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              data-ocid="ideas.search.search_input"
              placeholder="Search ideas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">
            Category:
          </span>
          {categories.map((c) => (
            <button
              type="button"
              key={c}
              data-ocid={`ideas.category.${c.toLowerCase().replace(/[^a-z0-9]/g, "-")}.tab`}
              onClick={() => setCategory(c)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                category === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <Tabs
          value={String(budgetIdx)}
          onValueChange={(v) => setBudgetIdx(Number(v))}
          data-ocid="ideas.budget.tab"
        >
          <TabsList className="h-auto flex-wrap gap-1">
            {budgetFilters.map((b, i) => (
              <TabsTrigger
                key={b.label}
                value={String(i)}
                data-ocid={`ideas.budget.tab.${i + 1}`}
                className="text-xs"
              >
                {b.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
        ideas
        {category !== "All" && (
          <>
            {" "}
            in <span className="font-semibold text-primary">{category}</span>
          </>
        )}
      </p>

      {/* Grid */}
      {filtered.length === 0 && (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="ideas.empty_state"
        >
          <p className="text-4xl mb-3">💡</p>
          <p className="font-medium">No ideas found</p>
          <p className="text-sm">Try changing the filters or search term</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((idea, i) => (
          <Card
            key={idea.name}
            className={`shadow-card transition-all duration-200 ${
              expanded === idea.name
                ? "ring-2 ring-primary shadow-orange"
                : "hover:shadow-orange"
            }`}
            data-ocid={`ideas.result.item.${i + 1}`}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl flex-shrink-0">{idea.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-sm leading-tight">
                    {idea.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0"
                    >
                      {idea.category}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-[10px] px-1.5 py-0 bg-orange-50 text-orange-700 border-orange-200"
                    >
                      {idea.costLabel}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Expected monthly profit
                  </p>
                  <p className="font-display font-bold text-green-600 text-sm">
                    {idea.profit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Timeline</p>
                  <p className="text-xs font-medium">{idea.timeline}</p>
                </div>
              </div>

              <button
                type="button"
                data-ocid={`ideas.expand.button.${i + 1}`}
                className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline w-full"
                onClick={() =>
                  setExpanded(expanded === idea.name ? null : idea.name)
                }
              >
                {expanded === idea.name ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5" /> Hide Full Guide
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5" /> View Full Guide
                  </>
                )}
              </button>

              {expanded === idea.name && (
                <div className="mt-4 space-y-4 border-t border-border pt-4">
                  {/* Materials */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Materials Needed
                    </p>
                    <ul className="space-y-1">
                      {idea.materials.map((m) => (
                        <li key={m} className="flex items-start gap-2 text-xs">
                          <span className="text-primary mt-0.5">•</span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Steps */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Step-by-Step Process
                    </p>
                    <ol className="space-y-2">
                      {idea.steps.map((step, j) => (
                        <li
                          key={`${idea.name}-step-${j}`}
                          className="flex items-start gap-2 text-xs"
                        >
                          <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                            {j + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Tips */}
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-3">
                    <p className="text-xs font-semibold text-amber-700 mb-2">
                      💡 Pro Tips
                    </p>
                    <ul className="space-y-1">
                      {idea.tips.map((t) => (
                        <li key={t} className="text-xs text-amber-800">
                          • {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
