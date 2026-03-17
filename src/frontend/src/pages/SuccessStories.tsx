import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Quote, Star, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const stories = [
  {
    id: 1,
    name: "Ranjitha Devi",
    location: "Hyderabad, Telangana",
    image: "/assets/generated/success-ranjitha.dim_400x400.jpg",
    business: "Idli & Dosa Food Stall",
    before: "Housewife, no income",
    after: "₹35,000/month",
    quote:
      "Startup with Shiva showed me there was demand for homemade food in my area. I started with ₹3,000 and now earn ₹35,000 every month!",
    category: "Food",
    categoryColor: "bg-amber-100 text-amber-700 border-amber-200",
    growth: "12x growth",
  },
  {
    id: 2,
    name: "Arjun Reddy",
    location: "Warangal, Telangana",
    image: "/assets/generated/success-arjun.dim_400x400.jpg",
    business: "Vegetable Export to UAE",
    before: "Unemployed graduate",
    after: "₹1,20,000/month",
    quote:
      "The import-export route map showed me India-UAE demand. I started exporting vegetables and my business grew 10x in 8 months.",
    category: "Import-Export",
    categoryColor: "bg-blue-100 text-blue-700 border-blue-200",
    growth: "10x in 8 months",
  },
  {
    id: 3,
    name: "Priya Sharma",
    location: "Bengaluru, Karnataka",
    image: "/assets/generated/success-priya.dim_400x400.jpg",
    business: "Online Ethnic Clothing Store",
    before: "₹8,000/month salary job",
    after: "₹75,000/month",
    quote:
      "I found my niche using the Business Ideas section. Now I run a successful online store from home.",
    category: "Online Business",
    categoryColor: "bg-purple-100 text-purple-700 border-purple-200",
    growth: "9x income",
  },
  {
    id: 4,
    name: "Ramesh Kumar",
    location: "Pune, Maharashtra",
    image: "/assets/generated/success-ramesh.dim_400x400.jpg",
    business: "Hardware & Tools Retail Shop",
    before: "Daily wage worker",
    after: "₹55,000/month",
    quote:
      "The demand map showed high hardware demand in my area. I opened my shop with ₹50,000 and now it's booming.",
    category: "Retail",
    categoryColor: "bg-green-100 text-green-700 border-green-200",
    growth: "Steady ₹55k/mo",
  },
  {
    id: 5,
    name: "Vikram Nair",
    location: "Kochi, Kerala",
    image: "/assets/generated/success-vikram.dim_400x400.jpg",
    business: "Mobile Phone Repair & Accessories",
    before: "Odd jobs, ₹5,000/month",
    after: "₹42,000/month",
    quote:
      "I used the startup guide for electronics repair. Step by step, I built my shop and customer base.",
    category: "Services",
    categoryColor: "bg-cyan-100 text-cyan-700 border-cyan-200",
    growth: "8x income",
  },
  {
    id: 6,
    name: "Sunita Patel",
    location: "Ahmedabad, Gujarat",
    image: "/assets/generated/success-sunita.dim_400x400.jpg",
    business: "Homemade Pickles & Spices Brand",
    before: "Homemaker",
    after: "₹28,000/month",
    quote:
      "The supplier finder helped me source cheap raw materials. I started selling locally and now ship across India.",
    category: "Food & Manufacturing",
    categoryColor: "bg-orange-100 text-orange-700 border-orange-200",
    growth: "Pan-India shipping",
  },
];

const platformStats = [
  { label: "Businesses Started", value: "2,400+", icon: "🏢" },
  { label: "Monthly Revenue Generated", value: "₹4.2 Cr", icon: "💰" },
  { label: "States Covered", value: "18", icon: "🗺️" },
];

export default function SuccessStories() {
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
            Real Success Stories
          </span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold">
          Businesses That Changed Lives
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Real entrepreneurs from across India who used Startup with Shiva to
          find opportunities, build businesses, and transform their families.
        </p>
      </motion.div>

      {/* Stats Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.55 0.18 145) 0%, oklch(0.45 0.16 165) 100%)",
        }}
        data-ocid="success.stats.section"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
          {platformStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center py-6 px-4 text-white"
            >
              <span className="text-3xl mb-2">{stat.icon}</span>
              <p className="font-display text-3xl font-bold">{stat.value}</p>
              <p className="text-white/80 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Story Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {stories.map((story, i) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
            data-ocid={`success.story.item.${i + 1}`}
          >
            <Card className="shadow-card overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
              {/* Photo + Category */}
              <div className="relative">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-52 object-cover object-top"
                />
                <div className="absolute top-3 right-3">
                  <Badge
                    className={`text-xs font-semibold border ${story.categoryColor}`}
                    variant="outline"
                  >
                    {story.category}
                  </Badge>
                </div>
                {/* Growth ribbon */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-2 flex items-center gap-2"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.65), transparent)",
                  }}
                >
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-300">
                    {story.growth}
                  </span>
                </div>
              </div>

              <CardContent className="p-5 flex-1 flex flex-col gap-4">
                {/* Name & location */}
                <div>
                  <h3 className="font-display font-bold text-lg leading-tight">
                    {story.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    📍 {story.location}
                  </p>
                  <p className="text-sm font-semibold text-foreground/80 mt-1">
                    {story.business}
                  </p>
                </div>

                {/* Before / After */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-red-50 border border-red-100 p-3">
                    <p className="text-[10px] font-bold text-red-500 uppercase tracking-wide mb-1">
                      Before
                    </p>
                    <p className="text-xs text-red-700 font-medium">
                      {story.before}
                    </p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide mb-1">
                      After
                    </p>
                    <p className="text-sm text-emerald-700 font-bold">
                      {story.after}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <div className="flex-1 flex items-start gap-2 bg-amber-50 rounded-xl p-3 border border-amber-100">
                  <Quote className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 italic leading-relaxed">
                    {story.quote}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* CTA Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="rounded-2xl p-8 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.14 0.045 255) 0%, oklch(0.22 0.07 255) 100%)",
        }}
      >
        <p className="font-display text-2xl font-bold text-white mb-2">
          Your success story starts today
        </p>
        <p className="text-white/70 text-sm max-w-md mx-auto mb-5">
          Join 2,400+ entrepreneurs who found their business opportunity on
          Startup with Shiva.
        </p>
        <Button className="bg-orange-brand hover:bg-orange-dark text-white shadow-orange font-semibold">
          Discover Your Business Idea <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </motion.div>
    </div>
  );
}
