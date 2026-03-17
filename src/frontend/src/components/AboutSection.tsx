import { Flame, Heart, Leaf } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Heart,
    title: "100% Homemade",
    description:
      "Every recipe is made fresh in our kitchen — no packaged sauces, no shortcuts.",
    color: "text-terracotta",
    bg: "bg-terracotta/10",
  },
  {
    icon: Flame,
    title: "No Artificial Flavors",
    description:
      "Real spices, real ingredients, real taste. Nothing artificial ever touches our food.",
    color: "text-golden-dark",
    bg: "bg-golden/15",
  },
  {
    icon: Leaf,
    title: "Pure Vegetarian",
    description:
      "A 100% pure vegetarian kitchen — safe, clean, and cruelty-free from day one.",
    color: "text-veggreen",
    bg: "bg-veggreen/10",
  },
];

export default function AboutSection() {
  return (
    <section className="py-20 md:py-28 bg-cream-dark" id="about">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-terracotta font-body font-semibold text-sm tracking-widest uppercase mb-4">
              Our Story
            </span>

            <h2 className="font-display text-5xl md:text-6xl font-semibold text-foreground leading-tight mb-6">
              Cooked with{" "}
              <span className="relative inline-block">
                Love
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-1 bg-golden rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                />
              </span>
            </h2>

            <p className="font-body text-foreground/80 text-lg leading-relaxed mb-5">
              At Purely, every dish is made with the care and warmth of a home
              kitchen. We believe food tastes best when it's made fresh, with no
              artificial flavors, and served with love.
            </p>

            <p className="font-body text-foreground/70 leading-relaxed mb-10">
              Our recipes are passed down through generations, bringing you the
              true taste of Indian home cooking. From the slow-simmered Dal
              Makhani to the buttery Aloo Paratha — each plate carries a memory,
              a tradition, and a smile.
            </p>

            {/* Feature highlights */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card shadow-xs border border-border"
                >
                  <div className={`${feature.bg} p-2.5 rounded-lg shrink-0`}>
                    <feature.icon size={20} className={feature.color} />
                  </div>
                  <div>
                    <h4 className="font-body font-semibold text-foreground mb-0.5">
                      {feature.title}
                    </h4>
                    <p className="font-body text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Kitchen image */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-warm-lg">
              <img
                src="/assets/generated/about-kitchen.dim_600x400.jpg"
                alt="Our home kitchen at Purely Restaurant"
                className="w-full h-[480px] object-cover"
                loading="lazy"
              />
              {/* Warm color overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-terracotta/30 to-transparent" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-warm-lg p-5 border border-border"
            >
              <div className="font-display text-4xl font-bold text-terracotta mb-1">
                100+
              </div>
              <div className="font-body text-sm text-muted-foreground">
                Homemade recipes
              </div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="absolute -top-4 -right-4 bg-golden text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-warm font-body text-center"
            >
              <span className="text-xs font-bold leading-tight">Since</span>
              <span className="text-lg font-bold leading-tight">2018</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
