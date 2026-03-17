import { motion } from "motion/react";

const galleryImages = [
  {
    src: "/assets/generated/hero-restaurant.dim_1200x600.jpg",
    alt: "Purely Restaurant Interior",
    className: "col-span-2 row-span-1",
    aspectClass: "aspect-[2/1]",
  },
  {
    src: "/assets/generated/dish-dal-makhani.dim_400x300.jpg",
    alt: "Dal Makhani",
    className: "col-span-1 row-span-1",
    aspectClass: "aspect-[4/3]",
  },
  {
    src: "/assets/generated/dish-paneer-masala.dim_400x300.jpg",
    alt: "Paneer Butter Masala",
    className: "col-span-1 row-span-1",
    aspectClass: "aspect-[4/3]",
  },
  {
    src: "/assets/generated/about-kitchen.dim_600x400.jpg",
    alt: "Our Kitchen",
    className: "col-span-1 row-span-1",
    aspectClass: "aspect-[3/2]",
  },
  {
    src: "/assets/generated/dish-aloo-paratha.dim_400x300.jpg",
    alt: "Aloo Paratha",
    className: "col-span-1 row-span-1",
    aspectClass: "aspect-[4/3]",
  },
  {
    src: "/assets/generated/dish-veg-biryani.dim_400x300.jpg",
    alt: "Veg Biryani",
    className: "col-span-1 row-span-1",
    aspectClass: "aspect-[4/3]",
  },
  {
    src: "/assets/generated/dish-gulab-jamun.dim_400x300.jpg",
    alt: "Gulab Jamun",
    className: "col-span-1 row-span-1",
    aspectClass: "aspect-[4/3]",
  },
  {
    src: "/assets/generated/dish-lassi.dim_400x300.jpg",
    alt: "Mango Lassi",
    className: "col-span-1 row-span-1",
    aspectClass: "aspect-[4/3]",
  },
];

export default function GallerySection() {
  return (
    <section className="py-20 md:py-28 bg-background" id="gallery">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-terracotta font-body font-semibold text-sm tracking-widest uppercase mb-3">
            Gallery
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-semibold text-foreground mb-4">
            A Feast for the Eyes
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
            Every dish tells a story. Here's a glimpse into the warmth and
            beauty of Purely's kitchen and table.
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-12 bg-border" />
            <div className="w-2 h-2 rounded-full bg-golden" />
            <div className="h-px w-12 bg-border" />
          </div>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
              className={`group relative overflow-hidden rounded-2xl ${
                index === 0 ? "col-span-2 md:col-span-2" : ""
              } ${index === 3 ? "md:col-span-1 row-span-2" : ""}`}
            >
              <div className={image.aspectClass}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  loading="lazy"
                  style={{
                    transform: "scale(1)",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform =
                      "scale(1.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform =
                      "scale(1)";
                  }}
                />
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-terracotta/0 group-hover:bg-terracotta/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="font-body text-sm font-semibold text-white drop-shadow-md">
                  {image.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
