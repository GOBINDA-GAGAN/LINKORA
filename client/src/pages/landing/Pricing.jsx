
import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Check,
  X,
  ArrowRight,
  Sparkles,
  Zap,
  Crown,
  Rocket,
  ShieldCheck,
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: 99,
    icon: Rocket,
    description: "Everything you need to get started.",
    features: [
      ["5 premium templates", true],
      ["Up to 20 links", true],
      ["Custom profile URL", true],
      ["Basic profile customization", true],
      ["Basic click analytics", true],
      ["Unlimited products", false],
      ["Instagram automation", false],
    ],
  },
  {
    name: "Pro",
    price: 199,
    icon: Crown,
    popular: true,
    description: "More freedom for growing creators.",
    features: [
      ["All premium templates", true],
      ["Unlimited links", true],
      ["Custom profile URL", true],
      ["Advanced customization", true],
      ["Advanced click analytics", true],
      ["Unlimited products", true],
      ["Instagram automation", false],
    ],
  },
  {
    name: "Premium",
    price: 299,
    icon: Zap,
    description: "Automate your workflow and grow faster.",
    features: [
      ["Everything in Pro", true],
      ["Unlimited links & products", true],
      ["Advanced profile customization", true],
      ["Advanced analytics", true],
      ["Instagram DM automation", true],
      ["Automated comment replies", true],
      ["Priority support", true],
    ],
  },
];

const Pricing = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-background px-4 py-16 text-foreground sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-xl text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[9px] font-bold uppercase tracking-wider">
            <Sparkles size={11} className="text-lime-600" />
            Simple pricing
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-[-0.055em] sm:text-4xl lg:text-5xl">
            Simple plans. <span className="text-muted-foreground">Big possibilities.</span>
          </h2>

          <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Everything you need to build your personal brand,
            showcase your products, and grow your audience.
          </p>

          {/* Billing switch */}
          <div className="mt-5 inline-flex items-center gap-1 rounded-full border border-border bg-card p-1">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-4 py-2 text-[10px] font-semibold transition ${
                !yearly
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setYearly(true)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-semibold transition ${
                yearly
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              <span className="rounded-full bg-brand-secondary px-1.5 py-0.5 text-[8px] font-black text-black">
                -2 MONTHS
              </span>
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = yearly
              ? plan.price * 10
              : plan.price;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -7,
                  transition: { duration: 0.25 },
                }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border p-5 transition-colors duration-300 sm:p-6 ${
                  plan.popular
                    ? "border-primary bg-primary text-primary-foreground shadow-xl shadow-black/10"
                    : "border-border bg-card text-card-foreground hover:border-foreground/40 hover:shadow-lg"
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute right-0 top-0 rounded-bl-xl bg-brand-secondary px-3 py-1.5 text-[8px] font-black uppercase tracking-wider text-black">
                    Most popular
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                    plan.popular
                      ? "bg-white/10 text-brand-secondary"
                      : "bg-muted text-foreground group-hover:bg-brand-secondary group-hover:text-black"
                  } transition-colors duration-300`}
                >
                  <Icon size={17} />
                </div>

                {/* Plan */}
                <h3 className="mt-4 text-base font-bold">{plan.name}</h3>

                <p
                  className={`mt-1 text-[10px] ${
                    plan.popular
                      ? "text-white/60"
                      : "text-muted-foreground"
                  }`}
                >
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-lg font-semibold">₹</span>

                  <motion.span
                    key={price}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold tracking-[-0.07em]"
                  >
                    {price}
                  </motion.span>

                  <span
                    className={`text-[10px] ${
                      plan.popular
                        ? "text-white/50"
                        : "text-muted-foreground"
                    }`}
                  >
                    /{yearly ? "year" : "month"}
                  </span>
                </div>

                <p
                  className={`mt-1 text-[9px] ${
                    plan.popular
                      ? "text-white/50"
                      : "text-muted-foreground"
                  }`}
                >
                  {yearly ? "Billed annually" : "Billed monthly"}
                </p>

                {/* CTA */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-[11px] font-bold transition-all duration-300 ${
                    plan.popular
                      ? "bg-brand-secondary text-black hover:bg-white"
                      : "bg-primary text-primary-foreground hover:opacity-80"
                  }`}
                >
                  Choose {plan.name}
                  <ArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </motion.button>

                {/* Divider */}
                <div
                  className={`my-5 border-t ${
                    plan.popular ? "border-white/15" : "border-border"
                  }`}
                />

                {/* Features */}
                <p
                  className={`mb-4 text-[9px] font-bold uppercase tracking-widest ${
                    plan.popular
                      ? "text-white/50"
                      : "text-muted-foreground"
                  }`}
                >
                  What's included
                </p>

                <ul className="space-y-3">
                  {plan.features.map(([feature, included]) => (
                    <li
                      key={feature}
                      className={`flex items-center gap-2.5 text-[10px] ${
                        included
                          ? plan.popular
                            ? "text-white/90"
                            : "text-foreground"
                          : plan.popular
                            ? "text-white/30"
                            : "text-muted-foreground/50"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                          included
                            ? plan.popular
                              ? "bg-brand-secondary text-black"
                              : "bg-brand-secondary text-black"
                            : plan.popular
                              ? "bg-white/10"
                              : "bg-muted"
                        }`}
                      >
                        {included ? (
                          <Check size={10} strokeWidth={3} />
                        ) : (
                          <X size={9} />
                        )}
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div
                  className={`mt-auto flex items-center gap-1.5 border-t pt-4 mt-6 text-[9px] ${
                    plan.popular
                      ? "border-white/15 text-white/50"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  <ShieldCheck size={12} />
                  Secure payment · Cancel anytime
                </div>

                {/* Hover accent */}
                <div
                  className={`absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full ${
                    plan.popular
                      ? "bg-brand-secondary"
                      : "bg-primary"
                  }`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[9px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Check size={11} className="text-green-600" />
            No hidden fees
          </span>
          <span className="flex items-center gap-1.5">
            <Check size={11} className="text-green-600" />
            Secure checkout
          </span>
          <span className="flex items-center gap-1.5">
            <Check size={11} className="text-green-600" />
            Built for creators
          </span>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
