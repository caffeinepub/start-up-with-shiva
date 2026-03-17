import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, MapPin } from "lucide-react";
import { useState } from "react";

type DemandLevel = "High" | "Medium" | "Low";

interface Region {
  name: string;
  demand: DemandLevel;
  need: string;
  score: number;
  flag?: string;
  children?: Region[];
}

const worldData: Region[] = [
  {
    name: "India",
    flag: "🇮🇳",
    demand: "High",
    need: "Food, Services, Delivery",
    score: 92,
    children: [
      {
        name: "Telangana",
        demand: "High",
        need: "Food & Delivery",
        score: 95,
        children: [
          {
            name: "Hyderabad — Hitech City",
            demand: "High",
            need: "Cheap breakfast, delivery",
            score: 97,
          },
          {
            name: "Hyderabad — Balapur",
            demand: "Medium",
            need: "Vegetable delivery",
            score: 68,
          },
          {
            name: "Hyderabad — Kukatpally",
            demand: "Medium",
            need: "Tutoring services",
            score: 72,
          },
          {
            name: "Hyderabad — Dilsukhnagar",
            demand: "Low",
            need: "Healthcare access",
            score: 45,
          },
          {
            name: "Nizamabad Town",
            demand: "Medium",
            need: "Affordable groceries",
            score: 62,
          },
          {
            name: "Sangareddy Village",
            demand: "High",
            need: "Daily goods shop",
            score: 84,
          },
          {
            name: "Warangal",
            demand: "Medium",
            need: "Transport services",
            score: 70,
          },
          {
            name: "Karimnagar",
            demand: "Low",
            need: "Coaching centers",
            score: 42,
          },
        ],
      },
      {
        name: "Andhra Pradesh",
        demand: "High",
        need: "Agri exports, food",
        score: 88,
        children: [
          {
            name: "Vijayawada",
            demand: "High",
            need: "Food delivery",
            score: 89,
          },
          {
            name: "Visakhapatnam",
            demand: "High",
            need: "Tourism services",
            score: 85,
          },
          {
            name: "Tirupati",
            demand: "Medium",
            need: "Pilgrim services",
            score: 76,
          },
          { name: "Guntur", demand: "High", need: "Spice export", score: 90 },
          {
            name: "Nellore Village",
            demand: "Medium",
            need: "Agri supplies",
            score: 65,
          },
        ],
      },
      {
        name: "Maharashtra",
        demand: "High",
        need: "Tech services, food",
        score: 90,
        children: [
          {
            name: "Mumbai",
            demand: "High",
            need: "Food delivery, services",
            score: 93,
          },
          { name: "Pune", demand: "High", need: "Tech services", score: 91 },
          { name: "Nashik", demand: "Medium", need: "Agri export", score: 72 },
          {
            name: "Aurangabad",
            demand: "Medium",
            need: "Handicrafts export",
            score: 68,
          },
        ],
      },
      {
        name: "Karnataka",
        demand: "High",
        need: "IT, food delivery",
        score: 89,
        children: [
          {
            name: "Bangalore",
            demand: "High",
            need: "IT services, food",
            score: 94,
          },
          {
            name: "Mysore",
            demand: "Medium",
            need: "Tourism, silk export",
            score: 73,
          },
          {
            name: "Hubli",
            demand: "Low",
            need: "Agricultural supplies",
            score: 48,
          },
        ],
      },
      {
        name: "Tamil Nadu",
        demand: "Medium",
        need: "Textiles, IT",
        score: 80,
        children: [
          {
            name: "Chennai",
            demand: "High",
            need: "IT, food delivery",
            score: 88,
          },
          {
            name: "Coimbatore",
            demand: "Medium",
            need: "Textiles export",
            score: 75,
          },
          {
            name: "Madurai",
            demand: "Medium",
            need: "Tourism, food",
            score: 67,
          },
        ],
      },
      {
        name: "Uttar Pradesh",
        demand: "High",
        need: "Basic services, food",
        score: 85,
        children: [
          {
            name: "Lucknow",
            demand: "High",
            need: "Food, services",
            score: 83,
          },
          {
            name: "Varanasi",
            demand: "High",
            need: "Tourism, crafts export",
            score: 87,
          },
          {
            name: "Agra",
            demand: "Medium",
            need: "Tourism services",
            score: 74,
          },
          {
            name: "Mathura Village",
            demand: "High",
            need: "Dairy products",
            score: 86,
          },
        ],
      },
    ],
  },
  {
    name: "United Arab Emirates",
    flag: "🇦🇪",
    demand: "High",
    need: "Indian food, vegetables, services",
    score: 94,
    children: [
      {
        name: "Dubai",
        demand: "High",
        need: "Indian food products",
        score: 96,
      },
      {
        name: "Abu Dhabi",
        demand: "High",
        need: "Spices, vegetables",
        score: 91,
      },
      { name: "Sharjah", demand: "Medium", need: "Retail goods", score: 74 },
    ],
  },
  {
    name: "United States",
    flag: "🇺🇸",
    demand: "High",
    need: "Spices, organic food, IT",
    score: 91,
    children: [
      { name: "New Jersey", demand: "High", need: "Indian spices", score: 93 },
      {
        name: "California",
        demand: "High",
        need: "Organic Indian food",
        score: 90,
      },
      { name: "Texas", demand: "Medium", need: "IT services, food", score: 77 },
      {
        name: "New York",
        demand: "High",
        need: "Indian restaurant supply",
        score: 89,
      },
    ],
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    demand: "High",
    need: "Handicrafts, textiles",
    score: 86,
    children: [
      {
        name: "Berlin",
        demand: "High",
        need: "Handicrafts, ethnic goods",
        score: 88,
      },
      { name: "Munich", demand: "Medium", need: "Luxury crafts", score: 76 },
      {
        name: "Hamburg",
        demand: "Medium",
        need: "Import/port goods",
        score: 72,
      },
    ],
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    demand: "High",
    need: "Textiles, food",
    score: 84,
    children: [
      {
        name: "London",
        demand: "High",
        need: "Indian textiles, spices",
        score: 87,
      },
      {
        name: "Birmingham",
        demand: "High",
        need: "Indian food products",
        score: 85,
      },
      {
        name: "Manchester",
        demand: "Medium",
        need: "Clothing, textiles",
        score: 71,
      },
    ],
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    demand: "Medium",
    need: "Leather goods, food",
    score: 74,
    children: [
      {
        name: "Sydney",
        demand: "High",
        need: "Indian food, handicrafts",
        score: 81,
      },
      {
        name: "Melbourne",
        demand: "Medium",
        need: "Textiles, spices",
        score: 73,
      },
      { name: "Brisbane", demand: "Low", need: "Food products", score: 55 },
    ],
  },
  {
    name: "Japan",
    flag: "🇯🇵",
    demand: "Medium",
    need: "Organic food, textiles",
    score: 70,
    children: [
      { name: "Tokyo", demand: "Medium", need: "Organic spices", score: 72 },
      { name: "Osaka", demand: "Low", need: "Ethnic goods", score: 54 },
    ],
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    demand: "Medium",
    need: "IT services, food",
    score: 76,
    children: [
      {
        name: "Toronto",
        demand: "High",
        need: "Indian food products",
        score: 83,
      },
      {
        name: "Vancouver",
        demand: "Medium",
        need: "Spices, textiles",
        score: 70,
      },
    ],
  },
];

function DemandBadge({ level }: { level: DemandLevel }) {
  const cls =
    level === "High"
      ? "bg-red-100 text-red-700 border-red-200"
      : level === "Medium"
        ? "bg-yellow-100 text-yellow-700 border-yellow-200"
        : "bg-green-100 text-green-700 border-green-200";
  const icon = level === "High" ? "🔴" : level === "Medium" ? "🟡" : "🟢";
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cls}`}
    >
      {icon} {level}
    </span>
  );
}

function scoreColor(score: number) {
  if (score >= 80) return "bg-red-500";
  if (score >= 60) return "bg-yellow-500";
  return "bg-green-500";
}

export default function DemandMap() {
  const [path, setPath] = useState<Region[]>([]);

  const current = path.length === 0 ? null : path[path.length - 1];
  const displayList = current?.children ?? worldData;

  const topOpportunities = [...displayList]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const drillDown = (r: Region) => {
    if (r.children && r.children.length > 0) {
      setPath((p) => [...p, r]);
    }
  };

  const navigatePath = (idx: number) => {
    setPath((p) => p.slice(0, idx + 1));
  };

  const goRoot = () => setPath([]);

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-display text-2xl font-bold">
          Worldwide Demand Map
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Drill down from country → state → city → village to find business
          opportunities.
        </p>
      </div>

      {/* Legend */}
      <div className="flex gap-4 flex-wrap text-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500" /> 🔴 High Demand
          (80–100)
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-yellow-500" /> 🟡 Medium
          Demand (50–79)
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-green-500" /> 🟢 Low Demand
          (0–49)
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 flex-wrap text-sm">
        <button
          type="button"
          data-ocid="map.home.link"
          onClick={goRoot}
          className="text-primary font-medium hover:underline"
        >
          🌍 World
        </button>
        {path.map((r, i) => (
          <span key={r.name} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            <button
              type="button"
              data-ocid={`map.breadcrumb.link.${i + 1}`}
              onClick={() => navigatePath(i)}
              className="text-primary font-medium hover:underline"
            >
              {r.name}
            </button>
          </span>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map grid */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="font-display font-semibold text-base">
            {current ? `${current.name} — Sub-regions` : "Global Overview"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {displayList.map((r, i) => (
              <button
                type="button"
                key={r.name}
                data-ocid={`map.area.item.${i + 1}`}
                onClick={() => drillDown(r)}
                className={`text-left rounded-xl border p-4 transition-all ${
                  r.children && r.children.length > 0
                    ? "hover:border-primary hover:shadow-orange cursor-pointer"
                    : "cursor-default"
                } ${
                  r.score >= 80
                    ? "border-red-200 bg-red-50/40"
                    : r.score >= 60
                      ? "border-yellow-200 bg-yellow-50/40"
                      : "border-green-200 bg-green-50/40"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-sm">
                      {r.flag && <span className="mr-1">{r.flag}</span>}
                      {r.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {r.need}
                    </p>
                  </div>
                  <DemandBadge level={r.demand} />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      Opportunity Score
                    </span>
                    <span className="font-bold">{r.score}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${scoreColor(r.score)}`}
                      style={{ width: `${r.score}%` }}
                    />
                  </div>
                </div>
                {r.children && r.children.length > 0 && (
                  <p className="text-xs text-primary font-medium mt-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Drill down: {r.children.length} sub-regions
                    <ChevronRight className="w-3 h-3" />
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Top opportunities sidebar */}
        <div>
          <Card className="shadow-card sticky top-4">
            <CardHeader>
              <CardTitle className="font-display text-sm">
                🔥 Top 5 Opportunities
                {current && (
                  <span className="text-xs font-normal text-muted-foreground ml-1">
                    in {current.name}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topOpportunities.map((r, i) => (
                <div
                  key={r.name}
                  className="flex items-start gap-2"
                  data-ocid={`map.opportunity.item.${i + 1}`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                      i === 0
                        ? "bg-red-100 text-red-700"
                        : i === 1
                          ? "bg-orange-100 text-orange-700"
                          : i === 2
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold leading-tight">
                      {r.flag && <span className="mr-0.5">{r.flag}</span>}
                      {r.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {r.need}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex-1 bg-muted rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${scoreColor(r.score)}`}
                          style={{ width: `${r.score}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground w-6 text-right">
                        {r.score}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Navigate back */}
          {path.length > 0 && (
            <Button
              data-ocid="map.back.button"
              variant="outline"
              className="w-full mt-3 text-sm"
              onClick={() => setPath((p) => p.slice(0, -1))}
            >
              ← Go Back
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
