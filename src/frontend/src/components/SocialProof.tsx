import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { label: "Active Users", value: 2400000, display: "2.4M+" },
  { label: "Countries", value: 180, display: "180+" },
  { label: "Business Ideas Generated", value: 850000, display: "850K+" },
  { label: "Problems Solved", value: 3200000, display: "3.2M+" },
];

const USERS = [
  {
    name: "Ravi Kumar",
    type: "seller",
    location: "Hyderabad, India",
    time: "just now",
    idx: 1,
  },
  {
    name: "Amara Osei",
    type: "investor",
    location: "Accra, Ghana",
    time: "2 mins ago",
    idx: 2,
  },
  {
    name: "Liu Wei",
    type: "buyer",
    location: "Shanghai, China",
    time: "3 mins ago",
    idx: 3,
  },
  {
    name: "Fatima Al-Hassan",
    type: "partner",
    location: "Dubai, UAE",
    time: "5 mins ago",
    idx: 4,
  },
  {
    name: "Carlos Mendez",
    type: "seller",
    location: "S\u00e3o Paulo, Brazil",
    time: "7 mins ago",
    idx: 5,
  },
  {
    name: "Priya Sharma",
    type: "buyer",
    location: "Mumbai, India",
    time: "8 mins ago",
    idx: 6,
  },
  {
    name: "James Okafor",
    type: "investor",
    location: "Lagos, Nigeria",
    time: "10 mins ago",
    idx: 7,
  },
  {
    name: "Anna Schmidt",
    type: "partner",
    location: "Berlin, Germany",
    time: "12 mins ago",
    idx: 8,
  },
  {
    name: "Mohammed Al-Farsi",
    type: "seller",
    location: "Riyadh, Saudi Arabia",
    time: "15 mins ago",
    idx: 9,
  },
  {
    name: "Sarah Johnson",
    type: "buyer",
    location: "New York, USA",
    time: "18 mins ago",
    idx: 10,
  },
  {
    name: "Kenji Tanaka",
    type: "investor",
    location: "Tokyo, Japan",
    time: "20 mins ago",
    idx: 11,
  },
  {
    name: "Ngozi Adeyemi",
    type: "partner",
    location: "Abuja, Nigeria",
    time: "22 mins ago",
    idx: 12,
  },
  {
    name: "Arjun Patel",
    type: "seller",
    location: "Ahmedabad, India",
    time: "25 mins ago",
    idx: 13,
  },
  {
    name: "Emma Wilson",
    type: "buyer",
    location: "London, UK",
    time: "28 mins ago",
    idx: 14,
  },
  {
    name: "Raj Verma",
    type: "investor",
    location: "Bengaluru, India",
    time: "30 mins ago",
    idx: 15,
  },
] as const;

const TICKER_MESSAGES = [
  {
    id: "t1",
    text: "\ud83d\udfe2 Ravi Kumar from Hyderabad just joined as Seller",
  },
  {
    id: "t2",
    text: "\ud83d\udfe2 Amara Osei from Ghana just posted an investment opportunity",
  },
  { id: "t3", text: "\ud83d\udfe2 3,421 users active right now" },
  {
    id: "t4",
    text: "\ud83d\udfe2 Liu Wei from Shanghai just found a business match",
  },
  {
    id: "t5",
    text: "\ud83d\udfe2 Fatima from Dubai just partnered with a startup",
  },
  {
    id: "t6",
    text: "\ud83d\udfe2 New demand spike in Lagos, Nigeria \u2014 food delivery sector",
  },
  {
    id: "t7",
    text: "\ud83d\udfe2 Carlos Mendez from S\u00e3o Paulo just listed a product",
  },
  { id: "t8", text: "\ud83d\udfe2 2,847 business ideas generated today" },
  {
    id: "t9",
    text: "\ud83d\udfe2 Priya Sharma from Mumbai just solved a supply chain problem",
  },
  {
    id: "t10",
    text: "\ud83d\udfe2 New import-export route discovered: India \u2192 UAE",
  },
];

const TYPE_CONFIG = {
  seller: {
    label: "Seller",
    bg: "bg-orange-100",
    text: "text-orange-700",
    avatar: "bg-orange-500",
  },
  buyer: {
    label: "Buyer",
    bg: "bg-blue-100",
    text: "text-blue-700",
    avatar: "bg-blue-500",
  },
  investor: {
    label: "Investor",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    avatar: "bg-emerald-500",
  },
  partner: {
    label: "Partner",
    bg: "bg-purple-100",
    text: "text-purple-700",
    avatar: "bg-purple-500",
  },
};

function AnimatedCounter({
  target,
  display,
}: { target: number; display: string }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              clearInterval(interval);
              setDone(true);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const formatted = done
    ? display
    : count >= 1_000_000
      ? `${(count / 1_000_000).toFixed(1)}M+`
      : count >= 1_000
        ? `${Math.floor(count / 1_000)}K+`
        : String(count);

  return <span ref={ref}>{formatted}</span>;
}

export default function SocialProof() {
  return (
    <div
      className="rounded-2xl overflow-hidden border border-border/50"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.97 0.008 250) 0%, oklch(0.99 0.003 250) 100%)",
      }}
    >
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-y md:divide-y-0 divide-border/50">
        {STATS.map((stat) => (
          <div key={stat.label} className="p-5 text-center">
            <p
              className="font-display text-3xl md:text-4xl font-bold"
              style={{ color: "oklch(0.62 0.18 50)" }}
            >
              <AnimatedCounter target={stat.value} display={stat.display} />
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-border/50" />

      {/* Section label */}
      <div className="px-5 pt-4 pb-2 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Recently Joined Users
        </p>
      </div>

      {/* User cards scroll */}
      <div className="px-5 pb-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3" style={{ width: "max-content" }}>
          {USERS.map((user) => {
            const cfg = TYPE_CONFIG[user.type];
            const initials = user.name
              .split(" ")
              .slice(0, 2)
              .map((n) => n[0])
              .join("");
            return (
              <div
                key={user.name}
                data-ocid={`social.user.card.${user.idx}`}
                className="flex-shrink-0 w-44 rounded-xl border border-border bg-card p-3 space-y-2 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="w-9 h-9">
                    <AvatarFallback
                      className={`${cfg.avatar} text-white text-xs font-bold`}
                    >
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {user.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className={`text-[10px] px-1.5 py-0.5 ${cfg.bg} ${cfg.text} border-0`}
                  >
                    {cfg.label}
                  </Badge>
                  <span className="text-[10px] text-emerald-600 font-medium">
                    {user.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ticker */}
      <div
        className="border-t border-border/50 py-2.5 overflow-hidden"
        style={{ background: "oklch(0.14 0.045 255)" }}
      >
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ animation: "marquee 32s linear infinite" }}
        >
          {[...TICKER_MESSAGES, ...TICKER_MESSAGES].map((msg, pos) => (
            <span
              key={`${msg.id}-${pos < TICKER_MESSAGES.length ? "a" : "b"}`}
              className="text-xs text-white/80 font-medium flex-shrink-0"
            >
              {msg.text}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
