
import React from "react";
import { motion } from "motion/react";
import {
  UserRoundPlus,
  Link2,
  Share2,
  Check,
  WandSparkles,
  Globe2,
  ChartNoAxesCombined,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create your account",
    description:
      "Claim your unique username and secure your personal Linkora URL in seconds.",
    icon: UserRoundPlus,
    preview: (
      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/60 px-3 py-2">
        <span className="text-[9px] font-semibold text-foreground">
          linkora.bio/yourname
        </span>
        <span className="flex items-center gap-1 text-[8px] font-bold text-green-600">
          <Check size={10} />
          Available
        </span>
      </div>
    ),
  },
  {
    number: "02",
    title: "Add your links",
    description:
      "Bring your social profiles, websites, products and favourite content together.",
    icon: Link2,
    preview: (
      <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/60 px-3 py-2">
        <WandSparkles size={12} className="text-foreground" />
        <span className="text-[9px] font-semibold text-foreground">
          Smart link previews enabled
        </span>
      </div>
    ),
  },
  {
    number: "03",
    title: "Share everywhere",
    description:
      "Share one beautiful URL across Instagram, TikTok, LinkedIn and everywhere else.",
    icon: Share2,
    preview: (
      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/60 px-3 py-2">
        <span className="text-[9px] font-semibold text-foreground">
          Your page is ready
        </span>
        <Globe2 size={12} className="text-green-600" />
      </div>
    ),
  },
  {
    number: "04",
    title: "Track your growth",
    description:
      "Understand your audience with click tracking, visitor insights and analytics.",
    icon: ChartNoAxesCombined,
    preview: (
      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/60 px-3 py-2">
        <div>
          <p className="text-[8px] text-muted-foreground">Total clicks</p>
          <p className="text-xs font-bold text-foreground">4,830</p>
        </div>
        <div className="flex h-7 items-end gap-1">
          {[35, 55, 40, 75, 50, 90, 65].map((height, i) => (
            <motion.span
              key={i}
              initial={{ height: 3 }}
              whileInView={{ height: `${height}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`w-1.5 rounded-t-sm ${
                i === 5 ? "bg-brand-secondary" : "bg-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    ),
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-background px-4 py-14 text-foreground transition-colors duration-300 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="relative mx-auto max-w-6xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-9 max-w-xl text-center sm:mb-11"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[9px] font-bold uppercase tracking-wider">
            <Sparkles size={11} />
            Effortless onboarding
          </span>

          <h2 className="mt-4 text-2xl font-bold tracking-[-0.05em] sm:text-3xl lg:text-4xl">
            Up and running in{" "}
            <span className="relative inline-block">
              60 seconds.
              <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-brand-secondary" />
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-md text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
            From your first link to your personal online headquarters.
            Four simple steps. Zero complicated setup.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.09,
                }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.22 },
                }}
                className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-xl border border-border bg-card p-4 shadow-xs transition-all duration-300 hover:border-foreground/30 hover:shadow-lg sm:p-5"
              >
                {/* Card top */}
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${
                      index === 1
                        ? "bg-brand-secondary text-black"
                        : "bg-muted text-foreground group-hover:bg-brand-secondary group-hover:text-black"
                    }`}
                  >
                    <Icon size={17} strokeWidth={2} />
                  </div>

                  <span className="text-[10px] font-bold tracking-wider text-muted-foreground/60">
                    STEP {step.number}
                  </span>
                </div>

                {/* Text */}
                <div className="mt-4">
                  <h3 className="text-sm font-bold tracking-tight">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-[10px] leading-[1.7] text-muted-foreground sm:text-[11px]">
                    {step.description}
                  </p>
                </div>

                {/* Preview */}
                <div className="mt-auto pt-5">
                  {step.preview}
                </div>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-brand-secondary transition-all duration-500 group-hover:w-full" />

                {/* Hover arrow */}
                <ArrowUpRight
                  size={14}
                  className="absolute right-4 top-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
        >
          <span className="flex items-center gap-1.5 text-[9px] font-medium text-muted-foreground">
            <Check size={12} className="text-green-600" />
            Free instant registration
          </span>
          <span className="flex items-center gap-1.5 text-[9px] font-medium text-muted-foreground">
            <Check size={12} className="text-green-600" />
            No coding required
          </span>
          <span className="flex items-center gap-1.5 text-[9px] font-medium text-muted-foreground">
            <Check size={12} className="text-green-600" />
            No credit card required
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
