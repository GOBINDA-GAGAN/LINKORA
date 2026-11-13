
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Crown,
  Zap,
  Gem,
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Everything you need to get started.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: Rocket,
    features: [
      { label: "3 premium templates", included: true },
      { label: "Up to 5 profiles", included: true },
      { label: "Up to 20 links", included: true },
      { label: "Basic profile customization", included: true },
      { label: "Basic click analytics", included: true },
      { label: "Unlimited products", included: false },
      { label: "Instagram automation", included: false },
    ],
    theme: "free",
  },
  {
    name: "Starter",
    description: "Everything you need to grow.",
    monthlyPrice: 99,
    yearlyPrice: 990,
    icon: Rocket,
    features: [
      { label: "5 premium templates", included: true },
      { label: "Up to 20 profiles", included: true },
      { label: "Unlimited links", included: true },
      { label: "Custom profile URL", included: true },
      { label: "Basic profile customization", included: true },
      { label: "Basic click analytics", included: true },
      { label: "Unlimited products", included: false },
      { label: "Instagram automation", included: false },
    ],
    theme: "starter",
  },
  {
    name: "Pro",
    description: "More freedom for growing creators.",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    icon: Crown,
    popular: true,
    features: [
      { label: "All premium templates", included: true },
      { label: "Unlimited profiles", included: true },
      { label: "Unlimited links", included: true },
      { label: "Custom profile URL", included: true },
      { label: "Advanced customization", included: true },
      { label: "Advanced click analytics", included: true },
      { label: "Unlimited products", included: true },
      { label: "Instagram automation", included: false },
    ],
    theme: "pro",
  },
  {
    name: "Premium",
    description: "Automate your workflow and grow faster.",
    monthlyPrice: 299,
    yearlyPrice: 2990,
    icon: Zap,
    features: [
      { label: "Everything in Pro", included: true },
      { label: "Unlimited links & products", included: true },
      { label: "Advanced profile customization", included: true },
      { label: "Advanced analytics", included: true },
      { label: "Instagram DM automation", included: true },
      { label: "Automated comment replies", included: true },
      { label: "Priority support", included: true },
    ],
    theme: "premium",
  },
];

const themeStyles = {
  free: {
    card: "border-border bg-card",
    icon: "bg-muted text-muted-foreground",
    button:
      "border border-border bg-muted text-foreground hover:bg-secondary hover:border-secondary",
    check: "bg-secondary text-secondary-foreground",
  },
  starter: {
    card: "border-border bg-card",
    icon: "bg-muted text-foreground",
    button:
      "bg-foreground text-background hover:bg-brand-purple hover:text-white",
    check: "bg-secondary text-secondary-foreground",
  },
  pro: {
    card: "border-[#292929] bg-[#171717] text-white",
    icon: "bg-[#303030] text-secondary",
    button:
      "bg-secondary text-secondary-foreground hover:brightness-105",
    check: "bg-secondary text-secondary-foreground",
  },
  premium: {
    card: "border-border bg-card",
    icon: "bg-muted text-foreground",
    button:
      "bg-foreground text-background hover:bg-brand-tertiary hover:text-accent-foreground",
    check: "bg-secondary text-secondary-foreground",
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function SubscriptionBilling() {
  const [billing, setBilling] = useState("monthly");
  const [currentPlan, setCurrentPlan] = useState("Free");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [message, setMessage] = useState("");

  const handleChoosePlan = (plan) => {
    if (plan.name === currentPlan) {
      setMessage("You are already using this plan.");
      return;
    }

    setSelectedPlan(plan);
  };

  const confirmPlan = () => {
    if (!selectedPlan) return;

    setCurrentPlan(selectedPlan.name);
    setMessage(`${selectedPlan.name} plan selected successfully!`);
    setSelectedPlan(null);

    window.setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-full w-full bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1250px] space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
        >
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Sparkles size={17} className="text-brand-purple" />
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Subscription & Billing
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Choose your plan
            </h1>

            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Simple pricing. Powerful features. Everything you need to grow
              your online presence.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="inline-flex w-fit items-center rounded-xl border border-border bg-card p-1">
            {["monthly", "yearly"].map((type) => (
              <button
                key={type}
                onClick={() => setBilling(type)}
                className={`relative rounded-lg px-4 py-2 text-xs font-semibold capitalize transition-colors duration-200 ${
                  billing === type
                    ? "text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {billing === type && (
                  <motion.span
                    layoutId="billing-active"
                    className="absolute inset-0 rounded-lg bg-secondary"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 28,
                    }}
                  />
                )}
                <span className="relative z-10">{type}</span>
                {type === "yearly" && (
                  <span className="relative z-10 ml-1.5 text-[9px] font-bold">
                    SAVE
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const styles = themeStyles[plan.theme];
            const isDark = plan.theme === "pro";
            const price =
              billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

            return (
              <motion.div
                key={plan.name}
                variants={cardVariants}
                whileHover={{
                  y: -9,
                  transition: { duration: 0.25 },
                }}
                className={`group relative flex min-w-0 flex-col overflow-hidden rounded-[22px] border p-5 transition-shadow duration-300 hover:shadow-xl sm:p-6 ${
                  styles.card
                } ${
                  plan.popular
                    ? "shadow-lg shadow-black/10 ring-1 ring-secondary/30"
                    : "shadow-sm"
                }`}
              >
                {/* Popular Label */}
                {plan.popular && (
                  <div className="absolute right-0 top-0 overflow-hidden rounded-bl-2xl rounded-tr-[20px] bg-secondary px-4 py-2">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-secondary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Icon */}
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.12 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`mb-5 flex h-10 w-10 items-center justify-center rounded-full ${styles.icon}`}
                >
                  <Icon size={19} strokeWidth={2} />
                </motion.div>

                {/* Plan Name */}
                <h2
                  className={`text-base font-bold ${
                    isDark ? "text-white" : "text-foreground"
                  }`}
                >
                  {plan.name}
                </h2>

                <p
                  className={`mt-1.5 min-h-8 text-[11px] leading-5 ${
                    isDark ? "text-white/60" : "text-muted-foreground"
                  }`}
                >
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-5">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-lg font-semibold ${
                        isDark ? "text-white" : "text-foreground"
                      }`}
                    >
                      ₹
                    </span>

                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`${plan.name}-${price}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`text-[42px] font-extrabold leading-none tracking-[-0.06em] ${
                          isDark ? "text-white" : "text-foreground"
                        }`}
                      >
                        {price}
                      </motion.span>
                    </AnimatePresence>

                    <span
                      className={`text-[10px] ${
                        isDark ? "text-white/50" : "text-muted-foreground"
                      }`}
                    >
                      /{billing === "monthly" ? "month" : "year"}
                    </span>
                  </div>

                  <p
                    className={`mt-2 text-[10px] ${
                      isDark ? "text-white/50" : "text-muted-foreground"
                    }`}
                  >
                    {billing === "monthly"
                      ? "Billed monthly"
                      : "Billed annually"}
                  </p>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleChoosePlan(plan)}
                  className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl px-3 py-3 text-xs font-bold transition-colors duration-300 ${styles.button}`}
                >
                  {currentPlan === plan.name
                    ? "Current Plan"
                    : `Choose ${plan.name}`}
                  <motion.span
                    className="inline-flex"
                    whileHover={{ x: 4 }}
                  >
                    <ArrowRight size={15} />
                  </motion.span>
                </motion.button>

                {/* Divider */}
                <div
                  className={`my-5 border-t ${
                    isDark ? "border-white/15" : "border-border"
                  }`}
                />

                {/* Feature Heading */}
                <p
                  className={`mb-4 text-[9px] font-bold uppercase tracking-[0.15em] ${
                    isDark ? "text-white/50" : "text-muted-foreground"
                  }`}
                >
                  What's included
                </p>

                {/* Features */}
                <ul className="flex-1 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.15 + index * 0.08 + featureIndex * 0.035,
                      }}
                      className={`flex items-start gap-2.5 text-[11px] leading-4 ${
                        feature.included
                          ? isDark
                            ? "text-white"
                            : "text-foreground"
                          : isDark
                            ? "text-white/35"
                            : "text-muted-foreground/50"
                      }`}
                    >
                      <span
                        className={`mt-[-1px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                          feature.included
                            ? styles.check
                            : isDark
                              ? "bg-white/10 text-white/30"
                              : "bg-muted text-muted-foreground/50"
                        }`}
                      >
                        {feature.included ? (
                          <Check size={10} strokeWidth={3} />
                        ) : (
                          <X size={9} />
                        )}
                      </span>
                      <span>{feature.label}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Footer */}
                <div
                  className={`mt-5 border-t pt-4 ${
                    isDark ? "border-white/15" : "border-border"
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 text-[10px] ${
                      isDark ? "text-white/50" : "text-muted-foreground"
                    }`}
                  >
                    <ShieldCheck size={13} />
                    Secure payment · Cancel anytime
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-center gap-2 text-center text-xs text-muted-foreground"
        >
          <ShieldCheck size={15} className="text-brand-purple" />
          Secure payments · No hidden charges · Cancel anytime
        </motion.div>

        {/* Toast */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground shadow-xl"
            >
              <CheckCircle2 size={17} className="text-brand-purple" />
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Plan Confirmation Dialog */}
        <AnimatePresence>
          {selectedPlan && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
              onClick={() => setSelectedPlan(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(event) => event.stopPropagation()}
                className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                    <Gem size={21} />
                  </div>
                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    <X size={18} />
                  </button>
                </div>

                <h3 className="text-lg font-bold text-foreground">
                  Upgrade to {selectedPlan.name}?
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  You're choosing the {selectedPlan.name} plan. Review your
                  selection before continuing.
                </p>

                <div className="my-5 rounded-xl border border-border bg-muted/50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">
                      {selectedPlan.name}
                    </span>
                    <span className="text-lg font-bold text-foreground">
                      ₹
                      {billing === "monthly"
                        ? selectedPlan.monthlyPrice
                        : selectedPlan.yearlyPrice}
                      <span className="text-xs font-normal text-muted-foreground">
                        /{billing === "monthly" ? "month" : "year"}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmPlan}
                    className="flex-1 rounded-xl bg-secondary px-4 py-3 text-sm font-bold text-secondary-foreground transition hover:brightness-105 active:scale-[0.97]"
                  >
                    Confirm plan
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
