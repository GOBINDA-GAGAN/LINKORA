
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  RotateCcw,
  X,
  ShieldAlert,
  Trash2,
  UserRoundCog,
  ArrowRight,
  Mail,
  CheckCircle2,
  LockKeyhole,
} from "lucide-react";

const actions = {
  transfer: {
    title: "Transfer account ownership",
    description:
      "Transfer ownership of your Linkora account and its associated resources to another user.",
    warning:
      "You will lose owner-level control after the transfer is completed.",
    confirm: "TRANSFER",
    button: "Transfer ownership",
  },
  reset: {
    title: "Full account reset",
    description:
      "Remove all profiles, links, products, analytics, social accounts and custom settings.",
    warning:
      "This action permanently removes your existing account content. Your login account will remain active.",
    confirm: "RESET",
    button: "Reset everything",
  },
  delete: {
    title: "Delete your account",
    description:
      "Permanently delete your Linkora account and associated account data.",
    warning:
      "You may lose access to all profiles, public pages, subscriptions and account resources. This action cannot be undone.",
    confirm: "DELETE",
    button: "Delete account",
  },
};

export default function DangerZone() {
  const [activeAction, setActiveAction] = useState(null);
  const [confirmation, setConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    if (loading) return;
    setActiveAction(null);
    setConfirmation("");
    setEmail("");
  };

  const handleAction = async () => {
    const action = actions[activeAction];

    if (!action || confirmation !== action.confirm) return;
    if (activeAction === "transfer" && !email.trim()) return;

    setLoading(true);

    try {
      // Connect the appropriate authenticated backend API.
      //
      // transfer: POST /api/v1/account/transfer
      // reset:    DELETE /api/v1/account/reset
      // delete:   DELETE /api/v1/account
      //
      // Add password/re-authentication and email verification
      // on the backend before executing these operations.

      console.log(`${activeAction} requested`, {
        email: activeAction === "transfer" ? email : undefined,
      });

      // Replace this with your API call.
      alert("Connect your backend API to complete this action.");

      closeModal();
    } catch (error) {
      console.error("Danger zone action failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const dangerItems = [
    {
      id: "transfer",
      icon: UserRoundCog,
      title: "Transfer account ownership",
      description:
        "Transfer your account and its resources to another user.",
      button: "Transfer ownership",
      iconClass: "bg-brand-purple/10 text-brand-purple",
      borderClass: "border-brand-purple/20",
      buttonClass:
        "border border-brand-purple/30 text-brand-purple hover:bg-brand-purple/10",
    },
    {
      id: "reset",
      icon: RotateCcw,
      title: "Full account reset",
      description:
        "Delete all profiles, links, products, analytics and custom settings.",
      button: "Reset account",
      iconClass: "bg-red-500/10 text-red-500",
      borderClass: "border-red-500/20",
      buttonClass: "border border-red-500/30 text-red-500 hover:bg-red-500/10",
    },
    {
      id: "delete",
      icon: Trash2,
      title: "Delete account",
      description:
        "Permanently delete your Linkora account and associated data.",
      button: "Delete account",
      iconClass: "bg-red-500/10 text-red-500",
      borderClass: "border-red-500/20",
      buttonClass: "bg-red-500 text-white hover:bg-red-600",
    },
  ];

  const current = activeAction ? actions[activeAction] : null;

  return (
    <>
      {/* MAIN DANGER ZONE */}
      <section className="w-full rounded-xl border border-red-500/30 bg-card p-4 sm:p-5 max-w-300  mx-auto">
        <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
            <AlertTriangle size={16} />
          </div>

          <div>
            <h2 className="text-sm font-bold text-foreground">
              Danger Zone
            </h2>
            <p className="text-[10px] text-muted-foreground">
              Irreversible account actions. Proceed carefully.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {dangerItems.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -1 }}
                className={`flex flex-col justify-between gap-3 rounded-lg border bg-background p-3 sm:flex-row sm:items-center ${item.borderClass}`}
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.iconClass}`}
                  >
                    <Icon size={16} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 max-w-lg text-[10px] leading-4 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveAction(item.id)}
                  className={`flex shrink-0 items-center justify-center gap-2 rounded-lg px-3 py-2 text-[10px] font-bold transition ${item.buttonClass}`}
                >
                  {item.button}
                  <ArrowRight size={12} />
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-4 flex items-start gap-2 border-t border-border pt-3">
          <LockKeyhole
            size={13}
            className="mt-0.5 shrink-0 text-muted-foreground"
          />
          <p className="text-[9px] leading-4 text-muted-foreground">
            Sensitive account actions require identity verification.
            Transfers, resets and deletions should be confirmed securely
            before they are processed.
          </p>
        </div>
      </section>

      {/* CONFIRMATION MODALS */}
      <AnimatePresence>
        {activeAction && current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-xl border border-border bg-card p-5 shadow-xl"
            >
              {/* Modal header */}
              <div className="mb-4 flex items-center justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    activeAction === "transfer"
                      ? "bg-brand-purple/10 text-brand-purple"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {activeAction === "transfer" ? (
                    <UserRoundCog size={20} />
                  ) : activeAction === "reset" ? (
                    <RotateCcw size={20} />
                  ) : (
                    <ShieldAlert size={20} />
                  )}
                </div>

                <button
                  onClick={closeModal}
                  disabled={loading}
                  className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted"
                >
                  <X size={17} />
                </button>
              </div>

              <h3 className="text-base font-bold text-foreground">
                {current.title}
              </h3>

              <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
                {current.description}
              </p>

              {/* Transfer ownership */}
              {activeAction === "transfer" && (
                <div className="mt-4">
                  <label className="mb-1.5 block text-[10px] font-semibold text-foreground">
                    New owner's email address
                  </label>

                  <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3">
                    <Mail size={14} className="text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="newowner@example.com"
                      className="w-full bg-transparent py-2.5 text-xs text-foreground outline-none placeholder:text-muted-foreground"
                    />
                  </div>

                  <p className="mt-2 text-[9px] leading-4 text-muted-foreground">
                    The new owner should verify their identity and accept
                    the transfer before ownership changes.
                  </p>
                </div>
              )}

              {/* Warning */}
              <div className="my-4 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                <AlertTriangle
                  size={14}
                  className="mt-0.5 shrink-0 text-red-500"
                />
                <p className="text-[10px] leading-5 text-foreground">
                  {current.warning}
                </p>
              </div>

              {/* Items removed */}
              {activeAction !== "transfer" && (
                <div className="mb-4 space-y-2">
                  <p className="text-[10px] font-semibold text-foreground">
                    {activeAction === "reset"
                      ? "Data affected:"
                      : "Account data affected:"}
                  </p>

                  {(activeAction === "reset"
                    ? [
                        "All profiles and public pages",
                        "Links, products and social accounts",
                        "Analytics and customization",
                        "Account preferences and settings",
                      ]
                    : [
                        "Account profile and login credentials",
                        "All profiles and public pages",
                        "Links, products and social accounts",
                        "Analytics and uploaded content",
                        "Active sessions and connected services",
                      ]
                  ).map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-[10px] text-muted-foreground"
                    >
                      <X size={11} className="text-red-500" />
                      {item}
                    </div>
                  ))}
                </div>
              )}

              {/* Confirmation input */}
              <label className="mb-2 block text-[10px] font-semibold text-foreground">
                Type{" "}
                <span className="font-bold text-red-500">
                  {current.confirm}
                </span>{" "}
                to confirm
              </label>

              <input
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                placeholder={`Type ${current.confirm}`}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-xs text-foreground outline-none transition focus:border-red-500"
              />

              {/* Buttons */}
              <div className="mt-5 flex gap-2">
                <button
                  onClick={closeModal}
                  disabled={loading}
                  className="flex-1 rounded-lg border border-border py-2.5 text-[10px] font-semibold text-foreground transition hover:bg-muted"
                >
                  Cancel
                </button>

                <button
                  disabled={
                    confirmation !== current.confirm ||
                    loading ||
                    (activeAction === "transfer" && !email.trim())
                  }
                  onClick={handleAction}
                  className={`flex-1 rounded-lg py-2.5 text-[10px] font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-40 ${
                    activeAction === "transfer"
                      ? "bg-brand-purple hover:opacity-90"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {loading ? "Processing..." : current.button}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
