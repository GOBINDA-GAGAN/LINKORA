import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Link2,
  LayoutDashboard,
  UserRound,
  Palette,
  ChartNoAxesCombined,
  MessageCircle,
  ShoppingBag,
  HandCoins,
  Users,
  Plug,
  Contact,
  Link,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";

const navigation = [
  {
    title: "CORE",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, href: "/home" },
      { name: "My Linkora", icon: UserRound, href: "/home/link" },
      { name: "Design & Themes", icon: Palette, href: "/home/design" },
      {
        name: "Analytics & Insights",
        icon: ChartNoAxesCombined,
        href: "/home/analytics",
      },
      { name: "Messages", icon: MessageCircle, href: "/home/messages" },
    ],
  },
  {
    title: "MONETIZE",
    items: [
      { name: "Store & Products", icon: ShoppingBag, href: "/home/store" },
      { name: "Tip Jar / Earn", icon: HandCoins, href: "/home/tipjar" },
      { name: "Subscribers & Leads", icon: Users, href: "/home/subscribers" },
    ],
  },
  {
    title: "TOOLS",
    items: [
      { name: "Integrations", icon: Plug, href: "/home/integrations" },
      { name: "Business Card", icon: Contact, href: "/home/business-card" },
      { name: "Link Shortener", icon: Link, href: "/home/shortener" },
      {
        name: "Insta Auto Reply",
        icon: FaInstagram,
        href: "/home/instagram",
      },
    ],
  },
];

const DeshboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("/home");

  const sidebarVariants = {
    expanded: { width: 260 },
    collapsed: { width: 72 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -8 },
  };

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">

      {/* LOGO */}
      <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-sidebar-border px-3">
        <motion.a
          href="/home"
          className="flex min-w-0 items-center gap-2 overflow-hidden"
          whileTap={{ scale: 0.97 }}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-primary text-white">
            <Link2 size={18} />
          </div>

          <AnimatePresence>
            {(!collapsed || isMobile) && (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <span className="font-headline text-lg font-bold tracking-tight">
                  Linkora
                </span>
                <span className="rounded-full bg-brand-secondary px-1.5 py-0.5 text-[9px] font-bold text-brand-primary">
                  v1.0
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.a>

        {/* COLLAPSE BUTTON */}
        {!isMobile && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCollapsed(!collapsed)}
            className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground md:flex"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={collapsed ? "open" : "close"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {collapsed ? (
                  <PanelLeftOpen size={17} />
                ) : (
                  <PanelLeftClose size={17} />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        )}

        {/* MOBILE CLOSE */}
        {isMobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-sidebar-accent"
          >
            <X size={19} />
          </button>
        )}
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-4 overflow-y-auto overflow-x-hidden px-2.5 py-3">

        {navigation.map((section) => (
          <div key={section.title} className="space-y-1">

            {/* SECTION TITLE */}
            <AnimatePresence>
              {(!collapsed || isMobile) && (
                <motion.p
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="px-2.5 pb-0.5 font-label text-[9px] font-bold tracking-[0.13em] text-muted-foreground"
                >
                  {section.title}
                </motion.p>
              )}
            </AnimatePresence>

            {/* NAVIGATION ITEMS */}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.href;

              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setActive(item.href);
                    if (isMobile) setMobileOpen(false);
                  }}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.97 }}
                  title={collapsed && !isMobile ? item.name : ""}
                  className={`group relative flex h-9 items-center gap-2.5 overflow-hidden rounded-md px-2.5 text-xs font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-brand-primary text-white shadow-sm"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                  } ${collapsed && !isMobile ? "justify-center px-0" : ""}`}
                >
                  <Icon
                    size={17}
                    strokeWidth={isActive ? 2.3 : 1.8}
                    className="shrink-0"
                  />

                  <AnimatePresence>
                    {(!collapsed || isMobile) && (
                      <motion.span
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex-1 whitespace-nowrap text-[11.5px]"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* ACTIVE INDICATOR */}
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute right-2 h-1.5 w-1.5 rounded-full bg-brand-secondary"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>
        ))}
      </nav>

      {/* BOTTOM ACCOUNT */}
      <div className="shrink-0 border-t border-sidebar-border p-2">
        <div
          className={`flex items-center gap-2 rounded-md bg-sidebar-accent/60 p-1.5 ${
            collapsed && !isMobile ? "justify-center" : ""
          }`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-purple text-xs font-bold text-white">
            G
          </div>

          <AnimatePresence>
            {(!collapsed || isMobile) && (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="min-w-0 flex-1"
              >
                <p className="truncate text-[11px] font-semibold">
                  My Account
                </p>
                <p className="truncate text-[9px] text-muted-foreground">
                  Free Plan
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {(!collapsed || isMobile) && (
            <ChevronRight size={15} className="text-muted-foreground" />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <motion.aside
        variants={sidebarVariants}
        animate={collapsed ? "collapsed" : "expanded"}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 28,
        }}
        className="fixed left-0 top-0 z-40 hidden h-screen overflow-hidden border-r border-sidebar-border bg-sidebar md:block"
      >
        <SidebarContent />
      </motion.aside>

      {/* MOBILE HEADER */}
      <div className="fixed left-0 top-0 z-30 flex w-full items-center justify-between border-b border-border bg-background px-4 py-2.5 md:hidden">
        <a href="/home" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary text-white">
            <Link2 size={17} />
          </div>
          <span className="font-headline text-lg font-bold">Linkora</span>
        </a>

        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-muted"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] md:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="fixed left-0 top-0 z-50 h-screen w-[280px] overflow-hidden border-r border-sidebar-border bg-sidebar shadow-2xl md:hidden"
            >
              <SidebarContent isMobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeshboardSidebar;
