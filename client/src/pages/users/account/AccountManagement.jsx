
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  MoreHorizontal,
  UserRound,
  Link2,
  Palette,
  Settings,
  Trash2,
  Zap,
  Users,
  ExternalLink,
  LayoutGrid,
  List,
  Check,
  Crown,
} from "lucide-react";

const AccountManagement = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [view, setView] = useState("list");

  const [accounts] = useState([
    {
      _id: "1",
      username: "GobindaGagan",
      avatar: "",
      plan: "Free",
      adminEmail: "gobindagagandey@gmail.com",
      profileLink: "/gobinda1",
    },
    {
      _id: "2",
      username: "gobindagagandey",
      avatar: "",
      plan: "Free",
      adminEmail: "gobindagagandey@gmail.com",
      profileLink: "/gobinda2",
    },
  ]);

  const menuItems = [
    { label: "Change username", icon: UserRound },
    { label: "Links", icon: Link2 },
    { label: "Design", icon: Palette },
    { label: "Settings", icon: Settings },
  ];

  const handleMenuAction = (action, account) => {
    setActiveMenu(null);
    console.log(action, account._id);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.07 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.15 },
    },
  };

  const AccountItem = ({ account }) => {
    const isList = view === "list";

    return (
      <motion.article
        layout
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`relative min-w-0 ${
          isList
            ? "flex flex-col gap-4 py-5 sm:flex-row sm:items-center"
            : "flex flex-col border-b border-border py-5"
        }`}
      >
        {/* Account Header */}
        <div className={`flex min-w-0 items-center gap-3 ${
          isList ? "flex-1" : ""
        }`}>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
            {account.avatar ? (
              <img
                src={account.avatar}
                alt={account.username}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound size={21} className="text-muted-foreground" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <Link
              to={account.profileLink}
              className="block truncate text-sm font-semibold text-foreground transition hover:text-primary"
            >
              @{account.username}
            </Link>

            <a
              href={account.profileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary"
            >
              View profile
              <ExternalLink size={11} />
            </a>
          </div>

          {/* Dropdown */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() =>
                setActiveMenu(
                  activeMenu === account._id ? null : account._id
                )
              }
              aria-label="Account options"
              aria-expanded={activeMenu === account._id}
              className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <MoreHorizontal size={19} />
            </button>

            <AnimatePresence>
              {activeMenu === account._id && (
                <>
                  <motion.button
                    type="button"
                    aria-label="Close menu"
                    className="fixed inset-0 z-30 cursor-default"
                    onClick={() => setActiveMenu(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.97 }}
                    transition={{ duration: 0.16 }}
                    className="absolute right-0 top-10 z-40 w-48 overflow-hidden rounded-xl border border-border bg-popover py-1 shadow-xl"
                  >
                    {menuItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() =>
                            handleMenuAction(item.label, account)
                          }
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-xs text-popover-foreground transition hover:bg-muted"
                        >
                          <Icon size={15} className="text-muted-foreground" />
                          {item.label}
                        </button>
                      );
                    })}

                    <div className="my-1 border-t border-border" />

                    <button
                      type="button"
                      onClick={() =>
                        handleMenuAction("Delete Linkora", account)
                      }
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-xs font-medium text-destructive transition hover:bg-destructive/10"
                    >
                      <Trash2 size={15} />
                      Delete Linkora
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Account Details */}
        <div
          className={`min-w-0 ${
            isList
              ? "grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2"
              : "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
          }`}
        >
          {/* Plan */}
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground">
              Plan
            </p>

            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs text-foreground">
                {account.plan}
              </span>

              {account.plan.toLowerCase() === "pro" && (
                <span className="flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[9px] font-bold text-secondary-foreground">
                  <Crown size={10} />
                  PRO
                </span>
              )}
            </div>
          </div>

          {/* Admin */}
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-muted-foreground">
              Admin
            </p>

            <div className="mt-1 flex min-w-0 items-center gap-2">
              <span className="truncate text-xs text-foreground">
                {account.adminEmail}
              </span>
              <Check size={13} className="shrink-0 text-primary" />
            </div>
          </div>
        </div>

        {/* Upgrade */}
        <div className={isList ? "shrink-0" : "mt-4"}>
          <button
            type="button"
            className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground transition hover:opacity-90 sm:w-auto"
          >
            <Zap size={14} />
            Upgrade to Pro
          </button>
        </div>
      </motion.article>
    );
  };

  return (
    <div className="mx-auto w-full max-w-300">

      {/* ONE FULL BACKGROUND CARD */}
      <section className="w-full overflow-visible rounded-xl border border-border bg-card">

        {/* Header */}
        <header className="border-b border-border px-5 py-5 sm:px-6">
          <h1 className="text-lg font-semibold tracking-tight text-card-foreground">
            Account Management
          </h1>

          <p className="mt-1 text-xs text-muted-foreground">
            Manage your Linkora profiles and who has access to them.
          </p>
        </header>

        <div className="px-5 sm:px-6">

          {/* Collaboration Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border py-5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Users size={21} />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-sm font-semibold text-foreground">
                    Collaboration made simple
                  </h2>

                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[9px] font-bold text-secondary-foreground">
                    NEW
                  </span>
                </div>

                <p className="mt-1 text-xs text-muted-foreground">
                  Collaborate with your team using Linkora workspaces.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="h-9 shrink-0 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Try now
            </button>
          </div>

          {/* Accounts Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-5">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Linkora profiles
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                {accounts.length} accounts
              </p>
            </div>

            {/* Grid / List Switch */}
            <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
              <button
                type="button"
                onClick={() => setView("grid")}
                aria-label="Grid view"
                aria-pressed={view === "grid"}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition ${
                  view === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <LayoutGrid size={14} />
                <span className="hidden sm:inline">Grid</span>
              </button>

              <button
                type="button"
                onClick={() => setView("list")}
                aria-label="List view"
                aria-pressed={view === "list"}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition ${
                  view === "list"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <List size={14} />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>

          {/* Account Collection */}
          <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={
              view === "grid"
                ? "grid grid-cols-1 gap-x-6 sm:grid-cols-2"
                : "flex flex-col"
            }
          >
            <AnimatePresence mode="popLayout">
              {accounts.map((account) => (
                <AccountItem key={account._id} account={account} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border py-4">
            <p className="text-[11px] text-muted-foreground">
              Manage all your Linkora profiles from one place.
            </p>

            <button
              type="button"
              className="text-xs font-semibold text-primary transition hover:opacity-80"
            >
              + Create new profile
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AccountManagement;
