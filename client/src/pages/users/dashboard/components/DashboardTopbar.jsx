
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  Bell,
  ChevronDown,
  ArrowLeftRight,
  Plus,
  UserRound,
  Zap,
  CircleHelp,
  BookOpenText,
  Lightbulb,
  LogOut,
  ExternalLink,
  Check,
  X,
  Link2,
  Sparkles,
} from "lucide-react";

const DashboardTopbar = ({
  user = {
    id: "1",
    name: "Trust me I am...",
    username: "Gobinda",
    avatar: "",
    plan: "Free",
    profileUrl: "http://localhost:5173/gobinda1",
  },
  accounts = [],
  onLogout,
  onNavigate,
  onSwitchAccount,
}) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [switchPanel, setSwitchPanel] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [activeAccount, setActiveAccount] = useState(user);

  const containerRef = useRef(null);

  useEffect(() => {
    setActiveAccount(user);
  }, [user]);

  // ESCAPE: CLOSE ONE PANEL AT A TIME
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key !== "Escape") return;

      if (switchPanel) {
        setSwitchPanel(false);
      } else if (open) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, switchPanel]);

  // OUTSIDE CLICK: CLOSE ONE PANEL AT A TIME
  useEffect(() => {
    const handleOutside = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        if (switchPanel) {
          setSwitchPanel(false);
        } else if (open) {
          setOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open, switchPanel]);

  const menuSections = [
    [
      { label: "Switch Linktrees", icon: ArrowLeftRight, action: "switch-linktrees" },
      { label: "Create new Linktree", icon: Plus, action: "create-linktree" },
    ],
    [
      { label: "Account", icon: UserRound, action: "account" },
      { label: "Upgrade", icon: Zap, action: "upgrade" },
    ],
    [
      { label: "Ask a question", icon: CircleHelp, action: "support" },
      { label: "Help topics", icon: BookOpenText, action: "help" },
      { label: "Share feedback", icon: Lightbulb, action: "feedback" },
    ],
  ];

  const accountList = accounts.length ? accounts : [activeAccount];

  const Avatar = ({ account, size = "h-10 w-10" }) => (
    account?.avatar ? (
      <img
        src={account.avatar}
        alt={account.name}
        className={`${size} shrink-0 rounded-full border border-border object-cover`}
      />
    ) : (
      <div className={`${size} flex shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground`}>
        {account?.name?.charAt(0)?.toUpperCase() || "G"}
      </div>
    )
  );

  const handleAction = (action) => {
    switch (action) {
      case "switch-linktrees":
        // Keep account menu OPEN.
        setSwitchPanel((prev) => !prev);
        break;

      case "create-linktree":
        setOpen(false);
        setSwitchPanel(false);
        navigate("/new-profile/your-username");
        break;

      case "account":
        setOpen(false);
        setSwitchPanel(false);
        navigate("/home/account");
        break;

      case "logout":
        setOpen(false);
        setSwitchPanel(false);
        onLogout?.();
        break;

      default:
        setOpen(false);
        setSwitchPanel(false);
        onNavigate?.(action);
    }
  };

  const handleSwitchAccount = (account) => {
    setActiveAccount(account);
    setSwitchPanel(false);
    setOpen(false);
    onSwitchAccount?.(account);
  };

  const panelTransition = {
    duration: 0.22,
    ease: [0.16, 1, 0.3, 1],
  };

  return (
    <header className="fixed right-0 top-0 z-40 flex h-[68px] w-full items-center justify-end border-b border-border bg-background/90 px-4 backdrop-blur-xl md:px-8">

      <div className="flex items-center gap-3">

        {/* NOTIFICATION */}
        <button
          onClick={() => setNotifications(false)}
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted"
        >
          <Bell size={20} />

          {notifications && (
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-background bg-brand-secondary" />
          )}
        </button>

        {/* PROFILE AREA */}
        <div className="relative" ref={containerRef}>

          {/* PROFILE BUTTON */}
          <motion.button
            onClick={() => setOpen((prev) => !prev)}
            whileTap={{ scale: 0.97 }}
            aria-expanded={open}
            className={`flex items-center gap-2 rounded-full border p-1.5 pr-3 transition ${
              open
                ? "border-ring bg-muted"
                : "border-transparent hover:border-border hover:bg-muted"
            }`}
          >
            <Avatar account={activeAccount} size="h-9 w-9" />

            <div className="hidden min-w-0 text-left sm:block">
              <p className="max-w-[140px] truncate text-xs font-semibold">
                {activeAccount.name}
              </p>
              <p className="max-w-[140px] truncate text-[10px] text-muted-foreground">
                {activeAccount.profileUrl}
              </p>
            </div>

            <span className="hidden rounded-full border border-border bg-card px-2.5 py-1 text-[10px] font-semibold sm:block">
              {activeAccount.plan || "Free"}
            </span>

            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} className="text-muted-foreground" />
            </motion.span>
          </motion.button>

          {/* BOTH PANELS: SAME PARENT, SAME ALIGNMENT */}
          <AnimatePresence>
            {(open || switchPanel) && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={panelTransition}
                className="
                  absolute right-0 top-[calc(100%+12px)]
                  z-50 flex flex-col items-stretch gap-3
                  w-[min(360px,calc(100vw-24px))]
                  md:w-auto md:flex-row-reverse md:items-start
                "
              >

                {/* =================================
                    ACCOUNT MENU
                ================================= */}

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={panelTransition}
                      className="w-full shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-xl md:w-[290px]"
                    >

                      {/* ACCOUNT HEADER */}
                      <div className="flex items-center gap-3 p-4">
                        <Avatar account={activeAccount} />

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">
                            {activeAccount.name}
                          </p>

                          <a
                            href={activeAccount.profileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 truncate text-xs text-muted-foreground hover:text-brand-purple"
                          >
                            {activeAccount.profileUrl}
                            <ExternalLink size={11} />
                          </a>
                        </div>

                        <span className="rounded-full border border-border px-2.5 py-1 text-[10px] font-semibold">
                          {activeAccount.plan || "Free"}
                        </span>

                        <button
                          onClick={() => setOpen(false)}
                          aria-label="Close account menu"
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
                        >
                          <X size={15} />
                        </button>
                      </div>

                      <div className="h-px bg-border" />

                      {/* MENU ITEMS */}
                      {menuSections.map((section, index) => (
                        <div
                          key={index}
                          className="border-b border-border py-1.5"
                        >
                          {section.map((item) => {
                            const Icon = item.icon;

                            return (
                              <motion.button
                                key={item.action}
                                whileHover={{ x: 3 }}
                                onClick={() => handleAction(item.action)}
                                className={`flex w-full items-center gap-3 px-5 py-3 text-left text-[13px] transition hover:bg-muted ${
                                  item.action === "switch-linktrees" && switchPanel
                                    ? "bg-muted text-foreground"
                                    : "text-card-foreground"
                                }`}
                              >
                                <Icon
                                  size={18}
                                  className="text-muted-foreground"
                                />

                                <span className="flex-1">
                                  {item.label}
                                </span>

                                {item.action === "switch-linktrees" && (
                                  <motion.span
                                    animate={{ rotate: switchPanel ? 180 : 0 }}
                                  >
                                    <ChevronDown size={14} className="text-muted-foreground" />
                                  </motion.span>
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                      ))}

                      {/* LOGOUT */}
                      <div className="p-1.5">
                        <button
                          onClick={() => handleAction("logout")}
                          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-[13px] font-medium text-red-500 transition hover:bg-red-500/10"
                        >
                          <LogOut size={18} />
                          Log out
                        </button>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

                {/* =================================
                    SWITCH ACCOUNT PANEL
                ================================= */}

                <AnimatePresence>
                  {switchPanel && (
                    <motion.div
                      initial={{ opacity: 0, x: 12,  scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 12, scale: 0.98 }}
                      transition={panelTransition}
                      className="w-full shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-xl md:w-[320px] relative top-19"
                    >

                      {/* HEADER */}
                      <div className="flex items-center justify-between border-b border-border px-4 py-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-secondary text-brand-primary">
                              <Link2 size={17} />
                            </div>

                            <h3 className="font-headline text-base font-bold">
                              Switch Linkora
                            </h3>
                          </div>

                          <p className="mt-1.5 text-xs text-muted-foreground">
                            Manage your profiles.
                          </p>
                        </div>

                        <button
                          onClick={() => setSwitchPanel(false)}
                          aria-label="Close switcher"
                          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted"
                        >
                          <X size={17} />
                        </button>
                      </div>

                      {/* ACCOUNTS */}
                      <div className="max-h-[min(340px,45vh)] overflow-y-auto p-2 ">
                        {accountList.map((account, index) => {
                          const isActive =
                            String(account.id || account._id || account.username) ===
                            String(activeAccount.id || activeAccount._id || activeAccount.username);

                          return (
                            <motion.button
                              key={account.id || account._id || account.username || index}
                              whileHover={{ x: 2 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleSwitchAccount(account)}
                              className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
                                isActive
                                  ? "border border-brand-purple bg-brand-purple/10"
                                  : "border border-transparent hover:bg-muted"
                              }`}
                            >
                              <Avatar account={account} size="h-11 w-11" />

                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[13px] font-semibold">
                                  {account.name}
                                </p>

                                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                                  {account.profileUrl ||
                                    `linkora.bio/${account.username}`}
                                </p>
                              </div>

                              <span className="rounded-full border border-border bg-background px-2 py-1 text-[10px] font-semibold">
                                {account.plan || "Free"}
                              </span>

                              {isActive && (
                                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-secondary text-brand-primary">
                                  <Check size={12} strokeWidth={3} />
                                </div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* NEW PROFILE */}
                      <div className="border-t border-border p-2">
                        <button
                          onClick={() => {
                            setOpen(false);
                            setSwitchPanel(false);
                            navigate("/new-profile/your-username");
                          }}
                          className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-muted"
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted transition group-hover:bg-brand-secondary group-hover:text-brand-primary">
                            <Plus size={22} />
                          </div>

                          <div className="flex-1">
                            <p className="text-sm font-semibold">
                              New Linkora
                            </p>
                            <p className="mt-0.5 text-[11px] text-muted-foreground">
                              Create another profile
                            </p>
                          </div>

                          <Sparkles
                            size={17}
                            className="text-muted-foreground group-hover:text-brand-purple"
                          />
                        </button>
                      </div>

                      <div className="bg-muted/50 px-4 py-2.5 text-center">
                        <p className="text-[10px] text-muted-foreground">
                          All your profiles, one account.
                        </p>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </header>
  );
};

export default DashboardTopbar;
