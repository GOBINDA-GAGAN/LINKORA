
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  X,
  Crown,
  Rocket,
  Zap,
  Gem,
  CreditCard,
  ShieldCheck,
  CalendarDays,
  Download,
  FileText,
  Users,
  Link2,
  Package,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  History,
  Info,
  RefreshCw,
} from "lucide-react";

/* ==================== PLAN DATA ==================== */

const plans = [
  {
    name: "Free",
    price: 0,
    yearly: 0,
    icon: Gem,
    description: "Start building your online presence.",
    features: [
      ["3 basic templates", true],
      ["Up to 5 profiles", true],
      ["Up to 20 links", true],
      ["Basic customization", true],
      ["Basic analytics", true],
      ["Unlimited products", false],
      ["Instagram automation", false],
    ],
  },
  {
    name: "Starter",
    price: 99,
    yearly: 990,
    icon: Rocket,
    description: "Everything you need to get started.",
    features: [
      ["5 premium templates", true],
      ["Up to 20 profiles", true],
      ["Unlimited links", true],
      ["Custom profile URL", true],
      ["Basic customization", true],
      ["Basic analytics", true],
      ["Unlimited products", false],
      ["Instagram automation", false],
    ],
  },
  {
    name: "Pro",
    price: 199,
    yearly: 1990,
    icon: Crown,
    popular: true,
    description: "More freedom for growing creators.",
    features: [
      ["All premium templates", true],
      ["Unlimited profiles", true],
      ["Unlimited links", true],
      ["Custom profile URL", true],
      ["Advanced customization", true],
      ["Advanced analytics", true],
      ["Unlimited products", true],
      ["Instagram automation", false],
    ],
  },
  {
    name: "Premium",
    price: 299,
    yearly: 2990,
    icon: Zap,
    description: "Automate your workflow and grow faster.",
    features: [
      ["Everything in Pro", true],
      ["Unlimited links & products", true],
      ["Advanced customization", true],
      ["Advanced analytics", true],
      ["Instagram DM automation", true],
      ["Automated comment replies", true],
      ["Priority support", true],
    ],
  },
];

const initialInvoices = [
  {
    id: "INV-2026-004",
    date: "Nov 01, 2026",
    plan: "Pro Monthly",
    amount: 199,
    status: "Paid",
  },
  {
    id: "INV-2026-003",
    date: "Oct 01, 2026",
    plan: "Pro Monthly",
    amount: 199,
    status: "Paid",
  },
  {
    id: "INV-2026-002",
    date: "Sep 01, 2026",
    plan: "Starter Monthly",
    amount: 99,
    status: "Paid",
  },
  {
    id: "INV-2026-001",
    date: "Aug 01, 2026",
    plan: "Starter Monthly",
    amount: 99,
    status: "Paid",
  },
];

const initialPayments = [
  {
    id: 1,
    brand: "Visa",
    lastFour: "4242",
    expiry: "12/28",
    primary: true,
  },
];

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

/* ==================== SMALL COMPONENTS ==================== */

function SectionTitle({ title, subtitle, action }) {
  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
      <div>
        <h2 className="text-[13px] font-bold text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-0.5 text-[10px] text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

function StatusBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-secondary/20 px-2 py-1 text-[9px] font-semibold text-foreground">
      <CheckCircle2 size={10} />
      {children}
    </span>
  );
}

function UsageBar({ label, value, limit, icon: Icon }) {
  const unlimited = limit === Infinity;
  const percentage = unlimited
    ? 100
    : Math.min((value / Math.max(limit, 1)) * 100, 100);

  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-[11px] font-medium text-foreground">
          <Icon size={13} className="text-muted-foreground" />
          {label}
        </span>
        <span className="text-[10px] text-muted-foreground">
          {unlimited ? "Unlimited" : `${value} / ${limit}`}
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8 }}
          className="h-full rounded-full bg-secondary"
        />
      </div>
    </div>
  );
}

/* ==================== MAIN COMPONENT ==================== */

export default function SubscriptionBilling() {
  const [billing, setBilling] = useState("monthly");
  const [currentPlan, setCurrentPlan] = useState("Pro");

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [modal, setModal] = useState("");
  const [toast, setToast] = useState("");
  const [showAll, setShowAll] = useState(false);

  const [invoices] = useState(initialInvoices);
  const [payments, setPayments] = useState(initialPayments);

  const [customer, setCustomer] = useState({
    name: "Gobinda Gagan Dey",
    email: "gobinda@example.com",
    address: "Bengaluru, Karnataka, India",
    gst: "",
  });

  const activePlan =
    plans.find((plan) => plan.name === currentPlan) || plans[0];

  const isYearly = billing === "yearly";

  const currentPrice = isYearly
    ? activePlan.yearly
    : activePlan.price;

  // Sample usage data. Replace with backend data.
  const usage = {
    profiles: 12,
    links: 68,
    products: 8,
  };

  const limits = {
    profiles:
      currentPlan === "Free"
        ? 5
        : currentPlan === "Starter"
          ? 20
          : Infinity,
    links: currentPlan === "Free" ? 20 : Infinity,
    products:
      currentPlan === "Free"
        ? 0
        : currentPlan === "Starter"
          ? 10
          : Infinity,
  };

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const confirmPlan = () => {
    if (!selectedPlan) return;
    setCurrentPlan(selectedPlan.name);
    setSelectedPlan(null);
    notify(`${selectedPlan.name} plan selected.`);
  };

  const cancelSubscription = () => {
    setCurrentPlan("Free");
    setModal("");
    notify("Demo subscription changed to Free.");
  };

  const downloadInvoice = (invoice) => {
    const content = [
      "LINKORA INVOICE",
      `Invoice: ${invoice.id}`,
      `Date: ${invoice.date}`,
      `Plan: ${invoice.plan}`,
      `Amount: ${money(invoice.amount)}`,
      `Status: ${invoice.status}`,
    ].join("\n");

    const url = URL.createObjectURL(
      new Blob([content], { type: "text/plain" })
    );

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${invoice.id}.txt`;
    anchor.click();

    URL.revokeObjectURL(url);
  };

  /* ==================== RENDER ==================== */

  return (
    <div className="w-full min-w-0 max-w-300 bg-background mx-auto">

      {/* MAIN FULL WIDTH CARD */}
      <div className="w-full min-w-0 space-y-5 rounded-xl border border-border bg-card p-3 sm:p-5">

        {/* ================= HEADER ================= */}

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <div className="mb-1 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
              <Sparkles size={12} className="text-brand-purple" />
              Account / Billing
            </div>

            <h1 className="text-lg font-bold text-foreground">
              Subscription & Billing
            </h1>

            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Manage your plan, payments and billing history.
            </p>
          </div>

          <button
            onClick={() => notify("Billing information refreshed.")}
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-[10px] font-semibold text-foreground transition hover:bg-muted"
          >
            <RefreshCw size={12} />
            Refresh billing
          </button>
        </div>

        {/* ================= CURRENT PLAN ================= */}

        <section className="rounded-lg border border-border bg-background p-3 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                <Crown size={19} />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xs font-bold text-foreground">
                    Current plan
                  </h2>
                  <StatusBadge>Active</StatusBadge>
                </div>

                <p className="mt-1 text-[11px] text-muted-foreground">
                  {currentPlan} Plan · {money(currentPrice)} /{" "}
                  {isYearly ? "year" : "month"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <div>
                <p className="text-[9px] text-muted-foreground">
                  Billing cycle
                </p>
                <p className="mt-1 text-[11px] font-semibold text-foreground">
                  {isYearly ? "Yearly" : "Monthly"}
                </p>
              </div>

              <div>
                <p className="text-[9px] text-muted-foreground">
                  Next renewal
                </p>
                <p className="mt-1 text-[11px] font-semibold text-foreground">
                  Dec 01, 2026
                </p>
              </div>

              <button
                onClick={() =>
                  document
                    .getElementById("pricing-plans")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5 text-[10px] font-bold text-secondary-foreground transition hover:brightness-105"
              >
                Change plan
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap justify-between gap-2 border-t border-border pt-3 text-[9px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={12} />
              Secure subscription
            </span>
            <span>Subscription ID: SUB-2026-00124</span>
          </div>
        </section>

        {/* ================= USAGE ================= */}

        <section>
          <SectionTitle
            title="Usage overview"
            subtitle="Your current resource usage."
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <UsageBar
              label="Profiles"
              value={usage.profiles}
              limit={limits.profiles}
              icon={Users}
            />
            <UsageBar
              label="Links"
              value={usage.links}
              limit={limits.links}
              icon={Link2}
            />
            <UsageBar
              label="Products"
              value={usage.products}
              limit={limits.products}
              icon={Package}
            />
          </div>
        </section>

        {/* ================= PRICING ================= */}

        <section id="pricing-plans" className="scroll-mt-5">
          <SectionTitle
            title="Choose your plan"
            subtitle="Upgrade or change your subscription anytime."
            action={
              <div className="flex rounded-lg border border-border bg-background p-1">
                {["monthly", "yearly"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setBilling(type)}
                    className={`rounded-md px-3 py-1.5 text-[9px] font-bold capitalize transition ${
                      billing === type
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {type}
                    {type === "yearly" && " · Save"}
                  </button>
                ))}
              </div>
            }
          />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.07 },
              },
            }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
          >
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isPro = plan.popular;
              const amount = isYearly ? plan.yearly : plan.price;
              const isCurrent = currentPlan === plan.name;

              return (
                <motion.article
                  key={plan.name}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4 },
                    },
                  }}
                  whileHover={{ y: -4 }}
                  className={`relative flex min-w-0 flex-col rounded-xl border p-4 transition-shadow hover:shadow-md ${
                    isPro
                      ? "border-[#292929] bg-[#171717] text-white"
                      : "border-border bg-background text-foreground"
                  }`}
                >
                  {isPro && (
                    <span className="absolute right-0 top-0 rounded-bl-lg rounded-tr-xl bg-secondary px-3 py-1.5 text-[8px] font-extrabold uppercase text-secondary-foreground">
                      Most popular
                    </span>
                  )}

                  <div
                    className={`mb-4 flex h-8 w-8 items-center justify-center rounded-full ${
                      isPro
                        ? "bg-[#303030] text-secondary"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <Icon size={16} />
                  </div>

                  <h3 className="text-xs font-bold">{plan.name}</h3>

                  <p
                    className={`mt-1 min-h-7 text-[9px] ${
                      isPro ? "text-white/55" : "text-muted-foreground"
                    }`}
                  >
                    {plan.description}
                  </p>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-base font-semibold">₹</span>

                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`${plan.name}-${amount}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="text-4xl font-extrabold leading-none tracking-tight"
                      >
                        {amount}
                      </motion.span>
                    </AnimatePresence>

                    <span
                      className={`text-[9px] ${
                        isPro ? "text-white/50" : "text-muted-foreground"
                      }`}
                    >
                      /{isYearly ? "year" : "month"}
                    </span>
                  </div>

                  <p
                    className={`mt-2 text-[9px] ${
                      isPro ? "text-white/50" : "text-muted-foreground"
                    }`}
                  >
                    Billed {isYearly ? "annually" : "monthly"}
                  </p>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      if (isCurrent) {
                        notify("You are already using this plan.");
                      } else {
                        setSelectedPlan(plan);
                      }
                    }}
                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[10px] font-bold transition ${
                      isPro
                        ? "bg-secondary text-secondary-foreground hover:brightness-105"
                        : "bg-foreground text-background hover:opacity-80"
                    }`}
                  >
                    {isCurrent ? "Current Plan" : `Choose ${plan.name}`}
                    <ArrowRight size={12} />
                  </motion.button>

                  <div
                    className={`my-4 border-t ${
                      isPro ? "border-white/15" : "border-border"
                    }`}
                  />

                  <p
                    className={`mb-3 text-[8px] font-bold uppercase tracking-widest ${
                      isPro ? "text-white/50" : "text-muted-foreground"
                    }`}
                  >
                    What's included
                  </p>

                  <ul className="flex-1 space-y-2.5">
                    {plan.features.map(([label, included]) => (
                      <li
                        key={label}
                        className={`flex items-start gap-2 text-[9px] leading-4 ${
                          included
                            ? isPro
                              ? "text-white"
                              : "text-foreground"
                            : isPro
                              ? "text-white/30"
                              : "text-muted-foreground/50"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full ${
                            included
                              ? "bg-secondary text-secondary-foreground"
                              : isPro
                                ? "bg-white/10"
                                : "bg-muted"
                          }`}
                        >
                          {included ? (
                            <Check size={9} strokeWidth={3} />
                          ) : (
                            <X size={8} />
                          )}
                        </span>
                        {label}
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`mt-4 border-t pt-3 text-[8px] ${
                      isPro
                        ? "border-white/15 text-white/50"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck size={11} />
                      Secure payment · Cancel anytime
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </section>

        {/* ================= PAYMENT + BILLING ================= */}

        <section>
          <SectionTitle
            title="Payment & billing"
            subtitle="Manage your payment method and billing details."
          />

          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            {/* PAYMENT METHODS */}
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <CreditCard size={14} className="text-brand-purple" />
                  Payment methods
                </h3>

                <button
                  onClick={() => setModal("payment")}
                  className="flex items-center gap-1 rounded-lg bg-secondary px-3 py-2 text-[9px] font-bold text-secondary-foreground"
                >
                  <Plus size={11} />
                  Add method
                </button>
              </div>

              {payments.length > 0 ? (
                <div className="space-y-2">
                  {payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between gap-2 rounded-lg border border-border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard
                          size={18}
                          className="text-muted-foreground"
                        />

                        <div>
                          <p className="text-[10px] font-semibold text-foreground">
                            {payment.brand} ending {payment.lastFour}
                          </p>
                          <p className="mt-0.5 text-[9px] text-muted-foreground">
                            Expires {payment.expiry}
                          </p>
                        </div>

                        {payment.primary && (
                          <span className="rounded bg-secondary/30 px-2 py-1 text-[8px] font-bold">
                            Default
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          setPayments((prev) =>
                            prev.filter((p) => p.id !== payment.id)
                          );
                          notify("Payment method removed.");
                        }}
                        className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-red-500"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border p-5 text-center">
                  <CreditCard
                    size={20}
                    className="mx-auto text-muted-foreground"
                  />
                  <p className="mt-2 text-[10px] text-muted-foreground">
                    No payment methods added.
                  </p>
                </div>
              )}

              <p className="mt-3 flex items-center gap-1.5 text-[9px] text-muted-foreground">
                <ShieldCheck size={11} />
                Secure payment processing.
              </p>
            </div>

            {/* BILLING INFORMATION */}
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <FileText size={14} className="text-brand-purple" />
                  Billing information
                </h3>

                <button
                  onClick={() => setModal("billing")}
                  className="rounded-lg border border-border px-3 py-2 text-[9px] font-semibold text-foreground hover:bg-muted"
                >
                  Edit details
                </button>
              </div>

              <div className="space-y-2.5">
                {[
                  ["Full name", customer.name],
                  ["Email address", customer.email],
                  ["Billing address", customer.address],
                  ["GST number", customer.gst || "Not provided"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex flex-wrap justify-between gap-2 border-b border-border pb-2 last:border-0"
                  >
                    <span className="text-[9px] text-muted-foreground">
                      {label}
                    </span>
                    <span className="break-all text-right text-[10px] font-medium text-foreground">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= BILLING HISTORY ================= */}

        <section className="overflow-hidden rounded-lg border border-border bg-background">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <h2 className="flex items-center gap-2 text-xs font-bold text-foreground">
                <History size={14} className="text-brand-purple" />
                Billing history
              </h2>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                View and download your previous invoices.
              </p>
            </div>

            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="text-[10px] font-semibold text-foreground hover:text-brand-purple"
            >
              {showAll ? "Show less" : "View all"} →
            </button>
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto border-t border-border md:block">
            <table className="w-full text-left">
              <thead className="bg-muted/40">
                <tr>
                  {[
                    "Invoice",
                    "Date",
                    "Description",
                    "Amount",
                    "Status",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {(showAll ? invoices : invoices.slice(0, 3)).map(
                  (invoice) => (
                    <tr
                      key={invoice.id}
                      className="border-t border-border transition hover:bg-muted/20"
                    >
                      <td className="px-4 py-3 text-[10px] font-semibold text-foreground">
                        {invoice.id}
                      </td>

                      <td className="px-4 py-3 text-[10px] text-muted-foreground">
                        {invoice.date}
                      </td>

                      <td className="px-4 py-3 text-[10px] text-foreground">
                        {invoice.plan}
                      </td>

                      <td className="px-4 py-3 text-[10px] font-semibold text-foreground">
                        {money(invoice.amount)}
                      </td>

                      <td className="px-4 py-3">
                        <StatusBadge>{invoice.status}</StatusBadge>
                      </td>

                      <td className="px-4 py-3">
                        <button
                          onClick={() => downloadInvoice(invoice)}
                          className="flex items-center gap-1 text-[9px] font-semibold text-foreground hover:text-brand-purple"
                        >
                          <Download size={12} />
                          Download
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile list */}
          <div className="divide-y divide-border border-t border-border md:hidden">
            {(showAll ? invoices : invoices.slice(0, 3)).map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between gap-3 p-3"
              >
                <div>
                  <p className="text-[10px] font-semibold text-foreground">
                    {invoice.plan}
                  </p>
                  <p className="mt-1 text-[9px] text-muted-foreground">
                    {invoice.id} · {invoice.date}
                  </p>
                  <div className="mt-2">
                    <StatusBadge>{invoice.status}</StatusBadge>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[10px] font-bold text-foreground">
                    {money(invoice.amount)}
                  </p>
                  <button
                    onClick={() => downloadInvoice(invoice)}
                    className="mt-2 flex items-center gap-1 text-[9px] font-semibold text-brand-purple"
                  >
                    <Download size={11} />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          {invoices.length === 0 && (
            <div className="border-t border-border p-6 text-center">
              <FileText
                size={20}
                className="mx-auto text-muted-foreground"
              />
              <p className="mt-2 text-[11px] font-semibold text-foreground">
                No invoices yet
              </p>
            </div>
          )}
        </section>

        {/* ================= SUBSCRIPTION MANAGEMENT ================= */}

        <section className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-background p-4">
          <div>
            <h3 className="flex items-center gap-2 text-xs font-bold text-foreground">
              <CalendarDays size={14} className="text-brand-purple" />
              Subscription management
            </h3>
            <p className="mt-1 max-w-xl text-[10px] leading-4 text-muted-foreground">
              Manage your renewal preferences or cancel your subscription.
            </p>
          </div>

          <button
            disabled={currentPlan === "Free"}
            onClick={() => setModal("cancel")}
            className="rounded-lg border border-red-500/30 px-3 py-2 text-[9px] font-semibold text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Cancel subscription
          </button>
        </section>

        {/* CARD FOOTER */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-t border-border pt-4 text-center text-[9px] text-muted-foreground">
          <ShieldCheck size={12} className="text-brand-purple" />
          Secure payments · No hidden charges · Your data is protected
        </div>
      </div>

      {/* ================= MODALS ================= */}

      <AnimatePresence>
        {(selectedPlan || modal) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedPlan(null);
              setModal("");
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-sm rounded-xl border border-border bg-card p-5 text-foreground shadow-xl"
            >
              {/* PLAN MODAL */}
              {selectedPlan && (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                      <Crown size={17} />
                    </div>
                    <button
                      onClick={() => setSelectedPlan(null)}
                      className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <h3 className="text-sm font-bold">
                    Choose {selectedPlan.name}?
                  </h3>

                  <p className="mt-1 text-[10px] text-muted-foreground">
                    Review your subscription before continuing.
                  </p>

                  <div className="my-4 flex items-center justify-between rounded-lg bg-muted p-3">
                    <span className="text-xs font-semibold">
                      {selectedPlan.name} Plan
                    </span>
                    <span className="text-sm font-bold">
                      {money(
                        isYearly
                          ? selectedPlan.yearly
                          : selectedPlan.price
                      )}
                      <span className="text-[9px] font-normal text-muted-foreground">
                        /{isYearly ? "year" : "month"}
                      </span>
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedPlan(null)}
                      className="flex-1 rounded-lg border border-border py-2.5 text-[10px] font-semibold hover:bg-muted"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmPlan}
                      className="flex-1 rounded-lg bg-secondary py-2.5 text-[10px] font-bold text-secondary-foreground hover:brightness-105"
                    >
                      Confirm plan
                    </button>
                  </div>
                </>
              )}

              {/* CANCEL MODAL */}
              {modal === "cancel" && (
                <>
                  <Info size={21} className="mb-3 text-red-500" />
                  <h3 className="text-sm font-bold">
                    Cancel subscription?
                  </h3>
                  <p className="mt-2 text-[10px] leading-5 text-muted-foreground">
                    This demo changes your plan to Free immediately. For
                    production, implement cancellation at the end of the
                    current billing period using your payment provider.
                  </p>

                  <div className="mt-5 flex gap-2">
                    <button
                      onClick={() => setModal("")}
                      className="flex-1 rounded-lg border border-border py-2.5 text-[10px] font-semibold"
                    >
                      Keep plan
                    </button>
                    <button
                      onClick={cancelSubscription}
                      className="flex-1 rounded-lg bg-red-500 py-2.5 text-[10px] font-bold text-white"
                    >
                      Cancel plan
                    </button>
                  </div>
                </>
              )}

              {/* PAYMENT MODAL */}
              {modal === "payment" && (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-bold">
                      Add payment method
                    </h3>
                    <button onClick={() => setModal("")}>
                      <X size={16} />
                    </button>
                  </div>

                  <p className="mb-3 text-[10px] text-muted-foreground">
                    Demo only. Use Razorpay or Stripe to tokenize real cards.
                  </p>

                  <input
                    id="card-last-four"
                    maxLength={4}
                    placeholder="Last 4 digits (demo)"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-xs outline-none focus:border-brand-purple"
                  />

                  <button
                    onClick={() => {
                      const digits =
                        document.getElementById("card-last-four").value;

                      if (!/^\d{4}$/.test(digits)) {
                        notify("Enter four valid digits.");
                        return;
                      }

                      setPayments((prev) => [
                        ...prev,
                        {
                          id: Date.now(),
                          brand: "Card",
                          lastFour: digits,
                          expiry: "12/29",
                          primary: prev.length === 0,
                        },
                      ]);

                      setModal("");
                      notify("Demo payment method added.");
                    }}
                    className="mt-4 w-full rounded-lg bg-secondary py-2.5 text-[10px] font-bold text-secondary-foreground"
                  >
                    Add method
                  </button>
                </>
              )}

              {/* BILLING MODAL */}
              {modal === "billing" && (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-bold">
                      Billing information
                    </h3>
                    <button onClick={() => setModal("")}>
                      <X size={16} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {[
                      ["name", "Full name"],
                      ["email", "Email address"],
                      ["address", "Billing address"],
                      ["gst", "GST number"],
                    ].map(([key, label]) => (
                      <label key={key} className="block">
                        <span className="mb-1 block text-[9px] font-semibold text-muted-foreground">
                          {label}
                        </span>
                        <input
                          value={customer[key]}
                          onChange={(event) =>
                            setCustomer((prev) => ({
                              ...prev,
                              [key]: event.target.value,
                            }))
                          }
                          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[10px] outline-none focus:border-brand-purple"
                        />
                      </label>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setModal("");
                      notify("Billing information updated.");
                    }}
                    className="mt-4 w-full rounded-lg bg-secondary py-2.5 text-[10px] font-bold text-secondary-foreground"
                  >
                    Save changes
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= TOAST ================= */}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-5 left-1/2 z-[120] flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-lg border border-border bg-card px-4 py-3 text-[10px] font-semibold text-foreground shadow-xl"
          >
            <CheckCircle2 size={14} className="text-brand-purple" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
