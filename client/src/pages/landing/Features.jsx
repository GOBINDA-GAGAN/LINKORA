
import React from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  UserRound,
  Grip,
  ChartNoAxesCombined,
  PanelsTopLeft,
  Smartphone,
  ArrowUpRight,
  Check,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "One link for everything",
    description:
      "Consolidate your YouTube channel, GitHub repositories, online shops, podcasts, and newsletter subscriptions into a cohesive personal home.",
    label: "OMNI-INTEGRATION",
    color: "bg-[#c6ff35]",
  },
  {
    icon: UserRound,
    title: "Beautiful profile customization",
    description:
      "Curated typographic pairings, modern layout presets, premium custom CSS injections, and smart layout presets that reflect your true taste.",
    label: "ZERO TEMPLATE CLUTTER",
    color: "bg-black text-white",
  },
  {
    icon: Grip,
    title: "Drag-and-drop link management",
    description:
      "Effortlessly reorder blocks, schedule timed drops for product launches, and toggle visibility in real-time right from your browser.",
    label: "DYNAMIC SCHEDULING",
    color: "bg-[#eeedf8]",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Real-time analytics",
    description:
      "Privacy-friendly visitor tracking, referrer attribution, device analytics, and geographic engagement heatmaps with zero third-party cookie bloat.",
    label: "GDPR-COMPLIANT",
    color: "bg-[#c6ff35]",
  },
  {
    icon: PanelsTopLeft,
    title: "Personal branding",
    description:
      "Connect your own custom domain like yourname.com, completely strip all Linkora branding badges, and gain full favicon/meta tag control.",
    label: "WHITE LABEL READY",
    color: "bg-black text-white",
  },
  {
    icon: Smartphone,
    title: "Mobile-friendly pages",
    description:
      "Blazing fast sub-second CDN edge delivery precision engineered for in-app browsers like TikTok, Instagram, Threads, and LinkedIn.",
    label: "EDGE-DELIVERED SPEED",
    color: "bg-[#eeedf8]",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      {/* Subtle dot background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.12) 0.7px, transparent 0.7px)",
          backgroundSize: "22px 22px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-9 max-w-2xl sm:mb-12 lg:mb-14"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#b5ed36] bg-[#c6ff35]/20 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-black">
            <Sparkles size={10} />
            Powerful & uncomplicated
          </span>

          <h2 className="mt-4 text-3xl leading-[1.12] font-bold tracking-[-0.045em] text-black sm:text-4xl lg:text-5xl">
            Everything you need.
            <br className="hidden sm:block" />
            <span className="text-gray-400"> All in one place.</span>
          </h2>

          <p className="mt-3 max-w-xl text-xs leading-6 text-gray-500 sm:text-sm">
            Crafted for creators, engineers, writers, and independent
            brands who care about craft.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: (index % 3) * 0.08,
                }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition-colors duration-300 hover:border-black/30 hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)] sm:min-h-[235px] sm:p-6"
              >
                {/* Icon */}
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${feature.color} transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110`}
                >
                  <Icon size={18} strokeWidth={2} />
                </div>

                {/* Card Content */}
                <div className="mt-5 flex-1">
                  <h3 className="text-sm font-bold tracking-tight text-black sm:text-base">
                    {feature.title}
                  </h3>

                  <p className="mt-2 max-w-sm text-[11px] leading-[1.8] text-gray-500 sm:text-xs">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Label */}
                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-gray-400 sm:text-[9px]">
                    {feature.label}
                  </span>

                  <motion.div
                    whileHover={{ rotate: 45 }}
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 transition-colors group-hover:border-black group-hover:bg-black group-hover:text-white"
                  >
                    <ArrowUpRight size={12} />
                  </motion.div>
                </div>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#c6ff35] transition-all duration-500 group-hover:w-full" />
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Features;
