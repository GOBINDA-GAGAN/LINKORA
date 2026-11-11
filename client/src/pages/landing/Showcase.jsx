
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const categories = [
  "All",
  "Creators",
  "Developers",
  "Designers",
  "Businesses",
];

const templates = [
  {
    id: 1,
    name: "Leo Zhang",
    username: "@leo.zhang",
    category: "Developers",
    type: "Developer Preset",
    status: "AVAILABLE",
    description: "Full-stack developer, systems engineer, open-source.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop",
    links: ["creators.dev/fast-api", "github.com/leo"],
    theme: "dark",
  },
  {
    id: 2,
    name: "Clara Vane",
    username: "@claravane",
    category: "Designers",
    type: "Editorial Preset",
    status: "EDITORIAL",
    description: "Art direction & digital storytelling.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop",
    links: ["Selected Works 2024–2025", "Monograph Inquiries"],
    theme: "cream",
  },
  {
    id: 3,
    name: "Maya Finch",
    username: "@mayafinch",
    category: "Creators",
    type: "Media Preset",
    status: "CREATOR PRO",
    description: "Daily vlogs, fashion tips & hardware reviews.",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop",
    links: ["YouTube channel (480K)", "My Desk Setup 2025 Gear"],
    theme: "light",
  },
  {
    id: 4,
    name: "Kanso Studio",
    username: "@kansostudio",
    category: "Businesses",
    type: "Commerce Preset",
    status: "STORE FRONT",
    description: "Ceramics, home goods & slow goods.",
    avatar: null,
    links: ["Batch 003 Drop (Available) $42", "Visit Kyoto Pop-Up"],
    theme: "business",
  },
];

const Showcase = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTemplates =
    activeCategory === "All"
      ? templates
      : templates.filter(
          (template) => template.category === activeCategory
        );

  return (
    <section
      id="templates"
      className="relative overflow-hidden bg-background px-4 py-16 text-foreground transition-colors duration-300 sm:px-6 sm:py-20 lg:px-8"
    >


      <div className="relative mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-purple/15 bg-brand-purple/10 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-brand-purple">
              <Sparkles size={11} />
              Curated presets
            </span>

            <h2 className="mt-4 text-3xl leading-tight font-bold tracking-[-0.045em] text-foreground sm:text-4xl lg:text-5xl">
              Make it yours.
            </h2>

            <p className="mt-2 max-w-lg text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Discover beautifully designed profile templates.
              Choose your style, customize your identity, and
              create your own space on the internet.
            </p>
          </motion.div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-3.5 py-2 text-[9px] font-semibold transition-all duration-200 ${
                  activeCategory === category
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-card-foreground hover:border-foreground/40"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Template Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredTemplates.map((template, index) => (
              <motion.article
                key={template.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.05,
                }}
                whileHover={{ y: -5 }}
                className={`group relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl border p-4 transition-all duration-300 hover:shadow-lg sm:min-h-[300px] sm:p-5 ${
                  template.theme === "dark"
                    ? "border-neutral-800 bg-neutral-900 text-white"
                    : template.theme === "cream"
                      ? "border-[#e9e2d7] bg-[#faf7f1] text-neutral-900 dark:border-border dark:bg-card dark:text-card-foreground"
                      : "border-border bg-card text-card-foreground"
                }`}
              >
                {/* Top Information */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[8px] font-bold uppercase tracking-wider ${
                      template.theme === "dark"
                        ? "text-brand-secondary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {template.status}
                  </span>

                  <span
                    className={`h-2 w-2 rounded-full ${
                      template.theme === "dark"
                        ? "bg-brand-secondary"
                        : template.theme === "light"
                          ? "bg-red-500"
                          : "bg-muted-foreground/40"
                    }`}
                  />
                </div>

                {/* Avatar */}
                <div className="mt-5">
                  {template.avatar ? (
                    <img
                      src={template.avatar}
                      alt={template.name}
                      loading="lazy"
                      className="h-10 w-10 rounded-xl border border-black/10 object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-purple/10 text-sm font-bold text-brand-purple">
                      KO
                    </div>
                  )}
                </div>

                {/* Profile Details */}
                <div className="mt-3">
                  <h3 className="text-base font-bold tracking-tight">
                    {template.name}
                  </h3>

                  <p
                    className={`mt-1 min-h-8 text-[9px] leading-relaxed ${
                      template.theme === "dark"
                        ? "text-white/60"
                        : "text-muted-foreground"
                    }`}
                  >
                    {template.description}
                  </p>
                </div>

                {/* Preview Links */}
                <div className="mt-3 space-y-1.5">
                  {template.links.map((link, linkIndex) => (
                    <div
                      key={link}
                      className={`flex min-h-8 items-center justify-between gap-2 rounded-lg border px-2.5 py-2 text-[8px] font-semibold transition-colors ${
                        template.theme === "dark"
                          ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                          : template.theme === "cream"
                            ? "border-[#e9e2d7] bg-white text-neutral-800 dark:border-border dark:bg-muted dark:text-foreground"
                            : template.theme === "light" && linkIndex === 0
                              ? "border-brand-secondary bg-brand-secondary text-neutral-900"
                              : "border-border bg-muted text-foreground"
                      }`}
                    >
                      <span className="truncate">{link}</span>
                      <ArrowUpRight size={10} className="shrink-0" />
                    </div>
                  ))}
                </div>

                {/* Card Footer */}
                <div
                  className={`mt-auto flex items-center justify-between border-t pt-3 ${
                    template.theme === "dark"
                      ? "border-white/15"
                      : "border-border"
                  }`}
                >
                  <span
                    className={`text-[8px] ${
                      template.theme === "dark"
                        ? "text-white/60"
                        : "text-muted-foreground"
                    }`}
                  >
                    {template.type}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      console.log("Selected template:", template.id)
                    }
                    className={`inline-flex items-center gap-1 text-[8px] font-bold transition-all hover:gap-2 ${
                      template.theme === "dark"
                        ? "text-brand-secondary"
                        : "text-foreground"
                    }`}
                  >
                    Use layout
                    <ChevronRight size={11} />
                  </button>
                </div>

                {/* Hover Accent */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-secondary transition-all duration-500 group-hover:w-full" />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-7 flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:px-6 sm:py-5"
        >
          <div>
            <h3 className="text-sm font-bold text-card-foreground">
              Your style. Your space. Your Linkora.
            </h3>
            <p className="mt-1 text-[10px] text-muted-foreground sm:text-xs">
              Start with a preset and customize every detail.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[10px] font-semibold text-primary-foreground transition hover:opacity-85"
          >
            Explore all templates
            <ArrowUpRight size={13} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase;
