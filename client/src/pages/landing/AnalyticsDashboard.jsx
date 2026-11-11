
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  Link2,
  BarChart3,
  Users,
  Palette,
  Settings,
  HelpCircle,
  Search,
  Bell,
  ChevronDown,
  ChevronLeft,
  Menu,
  X,
  Eye,
  MousePointerClick,
  TrendingUp,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Globe,

  MoreHorizontal,
  CalendarDays,
  Activity,
  Sparkles,
  LogOut,
  Plus,
  Zap,
} from "lucide-react";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const AnalyticsDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [period, setPeriod] = useState("7 days");
  const [activeNav, setActiveNav] = useState("Overview");

  const navigation = [
    {
      label: "Workspace",
      items: [
        { name: "Overview", icon: LayoutDashboard },
        { name: "My Links", icon: Link2 },
        { name: "Analytics", icon: BarChart3 },
        { name: "Audience", icon: Users },
      ],
    },
    {
      label: "Customize",
      items: [
        { name: "Appearance", icon: Palette },
        { name: "Settings", icon: Settings },
      ],
    },
  ];

  const stats = [
    {
      title: "Total visitors",
      value: "142.8K",
      change: "+18.4%",
      icon: Eye,
      positive: true,
    },
    {
      title: "Total clicks",
      value: "94.2K",
      change: "+24.1%",
      icon: MousePointerClick,
      positive: true,
    },
    {
      title: "Click rate",
      value: "66.0%",
      change: "+3.2%",
      icon: Percent,
      positive: true,
    },
    {
      title: "Conversions",
      value: "14.2K",
      change: "+12.8%",
      icon: TrendingUp,
      positive: true,
    },
  ];

  const chartData = {
    "7 days": [35, 48, 40, 62, 46, 76, 60, 84, 68, 96, 74, 100],
    "30 days": [25, 42, 32, 53, 45, 68, 54, 78, 65, 88, 75, 96],
    "90 days": [18, 34, 29, 45, 38, 59, 50, 69, 61, 82, 72, 94],
  };

  const topLinks = [
    { name: "Portfolio 2025", url: "linkora.bio/alex/portfolio", clicks: "38,240", rate: 41 },
    { name: "Design System Kit", url: "linkora.bio/alex/design", clicks: "29,310", rate: 31 },
    { name: "Mentorship Calendar", url: "linkora.bio/alex/book", clicks: "16,400", rate: 18 },
    { name: "Newsletter", url: "linkora.bio/alex/newsletter", clicks: "10,265", rate: 10 },
  ];

  const sources = [
    { name: "Instagram", percent: 42, color: "bg-brand-secondary", icon: FaInstagram },
    { name: "Direct traffic", percent: 28, color: "bg-brand-tertiary", icon: Globe },
    { name: "YouTube", percent: 18, color: "bg-brand-purple", icon: FaYoutube },
    { name: "LinkedIn", percent: 12, color: "bg-foreground", icon: FaLinkedin },
  ];

  const activities = [
    { title: "New visitor from Instagram", detail: "Alex's portfolio link", time: "2 min ago", icon: FaInstagram },
    { title: "Link clicked", detail: "Design System Kit", time: "12 min ago", icon: MousePointerClick },
    { title: "New subscriber", detail: "Newsletter signup", time: "28 min ago", icon: Users },
    { title: "Profile visited", detail: "Direct traffic", time: "45 min ago", icon: Eye },
  ];

  const chartLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const sidebarWidth = collapsed ? "lg:w-[76px]" : "lg:w-[230px]";

  return (
    <section
      id="analytics-dashboard"
      className="bg-background px-2 py-8 text-foreground sm:px-4 lg:px-8 lg:py-14"
    >
      <div className="mx-auto max-w-[1450px]">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-7 max-w-xl"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-secondary px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-black">
            <Sparkles size={11} />
            Your creator workspace
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">
            Everything in one place.
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Track your audience, manage your links and understand your growth.
          </p>
        </motion.div>

        {/* Dashboard shell */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative flex min-h-[690px] overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
        >
          {/* Mobile overlay */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.button
                type="button"
                aria-label="Close navigation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="absolute inset-0 z-30 bg-black/30 lg:hidden"
              />
            )}
          </AnimatePresence>

          {/* Sidebar */}
          <motion.aside
            animate={{ width: collapsed ? 76 : 230 }}
            transition={{ duration: 0.25 }}
            className={`absolute inset-y-0 left-0 z-40 flex w-[230px] flex-col border-r border-border bg-card transition-transform duration-300 lg:relative lg:translate-x-0 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } ${sidebarWidth}`}
          >
            {/* Brand */}
            <div className="flex h-[65px] items-center justify-between border-b border-border px-4">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Link2 size={17} />
                </div>
                {!collapsed && (
                  <span className="text-base font-bold tracking-tight">Linkora</span>
                )}
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
                aria-label="Close sidebar"
              >
                <X size={17} />
              </button>
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="hidden rounded-md p-1.5 text-muted-foreground hover:bg-muted lg:block"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft
                  size={15}
                  className={collapsed ? "rotate-180" : ""}
                />
              </button>
            </div>

            {/* Profile */}
            <div className="mx-3 mt-4 flex items-center gap-2 rounded-xl border border-border bg-background p-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
                alt="Alex Rivera"
                className="h-8 w-8 shrink-0 rounded-full object-cover"
              />
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10px] font-bold">Alex Rivera</p>
                  <p className="truncate text-[9px] text-muted-foreground">
                    Creator account
                  </p>
                </div>
              )}
              {!collapsed && <ChevronDown size={13} className="text-muted-foreground" />}
            </div>

            {/* Navigation */}
            <div className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
              {navigation.map((group) => (
                <div key={group.label}>
                  {!collapsed && (
                    <p className="mb-2 px-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                      {group.label}
                    </p>
                  )}

                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const active = activeNav === item.name;

                      return (
                        <button
                          key={item.name}
                          onClick={() => {
                            setActiveNav(item.name);
                            setSidebarOpen(false);
                          }}
                          title={collapsed ? item.name : undefined}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[11px] font-medium transition ${
                            active
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <Icon size={16} className="shrink-0" />
                          {!collapsed && <span>{item.name}</span>}
                          {active && !collapsed && (
                            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-secondary" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Upgrade */}
            {!collapsed && (
              <div className="mx-3 mb-3 rounded-xl bg-primary p-3 text-primary-foreground">
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-brand-secondary" />
                  <p className="text-[10px] font-bold">Upgrade your plan</p>
                </div>
                <p className="mt-2 text-[9px] leading-relaxed opacity-70">
                  Unlock unlimited links and advanced analytics.
                </p>
                <button className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg bg-brand-secondary py-2 text-[9px] font-bold text-black hover:opacity-90">
                  Explore plans <ArrowUpRight size={11} />
                </button>
              </div>
            )}

            {/* Bottom */}
            <div className="border-t border-border p-3">
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[10px] text-muted-foreground hover:bg-muted">
                <HelpCircle size={15} />
                {!collapsed && "Help & support"}
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[10px] text-muted-foreground hover:bg-muted">
                <LogOut size={15} />
                {!collapsed && "Log out"}
              </button>
            </div>
          </motion.aside>

          {/* Main dashboard */}
          <div className="min-w-0 flex-1">
            {/* Topbar */}
            <header className="sticky top-0 z-20 flex min-h-[65px] items-center justify-between gap-3 border-b border-border bg-card/95 px-3 backdrop-blur-md sm:px-5">
              <div className="flex min-w-0 items-center gap-2">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="rounded-lg p-2 hover:bg-muted lg:hidden"
                  aria-label="Open sidebar"
                >
                  <Menu size={18} />
                </button>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold sm:text-sm">
                    {activeNav}
                  </p>
                  <p className="hidden text-[9px] text-muted-foreground sm:block">
                    Welcome back, Alex. Here's your performance.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden h-8 items-center gap-2 rounded-lg border border-border bg-background px-3 md:flex">
                  <Search size={13} className="text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">Search anything...</span>
                  <kbd className="ml-4 rounded border border-border px-1 text-[8px] text-muted-foreground">⌘ K</kbd>
                </div>
                <button className="relative rounded-lg border border-border p-2 hover:bg-muted">
                  <Bell size={15} />
                  <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                </button>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
                  alt="Profile"
                  className="h-8 w-8 rounded-full border border-border object-cover"
                />
              </div>
            </header>

            {/* Content */}
            <main className="space-y-5 p-3 sm:p-5">
              {/* Page heading */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold tracking-tight sm:text-xl">
                    Overview
                  </h2>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    Here's what's happening with your Linkora page.
                  </p>
                </div>
                <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-[10px] font-semibold text-primary-foreground transition hover:opacity-80">
                  <Plus size={13} /> Add new link
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      whileHover={{ y: -3 }}
                      className="rounded-xl border border-border bg-background p-3 sm:p-4"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[9px] font-medium text-muted-foreground sm:text-[10px]">
                          {stat.title}
                        </p>
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted">
                          <Icon size={14} />
                        </div>
                      </div>
                      <p className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
                        {stat.value}
                      </p>
                      <div className="mt-1 flex items-center gap-1 text-[9px] text-green-600">
                        <ArrowUpRight size={11} />
                        <span className="font-bold">{stat.change}</span>
                        <span className="text-muted-foreground">vs last period</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Chart + Top links */}
              <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1.65fr_1fr]">
                {/* Chart */}
                <div className="min-w-0 rounded-xl border border-border bg-background p-3 sm:p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xs font-bold">Traffic overview</h3>
                      <p className="mt-1 text-[9px] text-muted-foreground">
                        Visitors and link engagement
                      </p>
                    </div>
                    <select
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                      className="rounded-lg border border-border bg-card px-2 py-1.5 text-[9px] outline-none"
                    >
                      <option>7 days</option>
                      <option>30 days</option>
                      <option>90 days</option>
                    </select>
                  </div>

                  <div className="mt-5 flex items-end gap-3">
                    <span className="text-2xl font-bold">142.8K</span>
                    <span className="mb-1 flex items-center gap-1 text-[9px] font-semibold text-green-600">
                      <TrendingUp size={11} /> 18.4%
                    </span>
                  </div>

                  {/* Chart bars */}
                  <div className="relative mt-5 h-40">
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {[0, 1, 2, 3].map((line) => (
                        <div key={line} className="border-t border-dashed border-border" />
                      ))}
                    </div>

                    <div className="absolute inset-0 flex items-end justify-around gap-1.5 px-1">
                      {chartData[period].map((value, index) => (
                        <div key={`${period}-${index}`} className="group flex h-full flex-1 items-end justify-center">
                          <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: `${value}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.65, delay: index * 0.035 }}
                            className={`w-full max-w-7 rounded-t-md transition-colors ${
                              index === 9
                                ? "bg-brand-secondary"
                                : "bg-brand-tertiary/70 group-hover:bg-brand-secondary"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-2 flex justify-around">
                    {chartLabels.map((label) => (
                      <span key={label} className="text-[8px] text-muted-foreground">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Top links */}
                <div className="min-w-0 rounded-xl border border-border bg-background p-3 sm:p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold">Top performing links</h3>
                      <p className="mt-1 text-[9px] text-muted-foreground">
                        Your most popular content
                      </p>
                    </div>
                    <button aria-label="More link options" className="rounded-md p-1 hover:bg-muted">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {topLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08 }}
                        className="group"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-[10px] font-semibold">
                              {link.name}
                            </p>
                            <p className="mt-1 truncate text-[8px] text-muted-foreground">
                              {link.url}
                            </p>
                          </div>
                          <span className="shrink-0 text-[10px] font-bold">
                            {link.clicks}
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${link.rate}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                            className="h-full rounded-full bg-brand-secondary"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <button className="mt-5 flex w-full items-center justify-center gap-1 border-t border-border pt-3 text-[9px] font-semibold text-muted-foreground hover:text-foreground">
                    View all links <ArrowUpRight size={11} />
                  </button>
                </div>
              </div>

              {/* Traffic sources + Activity */}
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                {/* Sources */}
                <div className="rounded-xl border border-border bg-background p-3 sm:p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold">Traffic sources</h3>
                      <p className="mt-1 text-[9px] text-muted-foreground">
                        Where your audience comes from
                      </p>
                    </div>
                    <Globe size={15} className="text-muted-foreground" />
                  </div>

                  <div className="flex h-3 overflow-hidden rounded-full bg-muted">
                    {sources.map((source) => (
                      <motion.div
                        key={source.name}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${source.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className={source.color}
                      />
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {sources.map((source) => {
                      const Icon = source.icon;
                      return (
                        <div key={source.name} className="flex items-center gap-2">
                          <Icon size={13} className="text-muted-foreground" />
                          <div className="min-w-0">
                            <p className="truncate text-[9px] font-medium">{source.name}</p>
                            <p className="text-[9px] text-muted-foreground">{source.percent}%</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Activity */}
                <div className="rounded-xl border border-border bg-background p-3 sm:p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold">Recent activity</h3>
                      <p className="mt-1 text-[9px] text-muted-foreground">
                        Latest interactions on your page
                      </p>
                    </div>
                    <Activity size={15} className="text-muted-foreground" />
                  </div>

                  <div className="space-y-1">
                    {activities.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.07 }}
                          className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-muted/60"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                            <Icon size={14} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[9px] font-semibold">{item.title}</p>
                            <p className="mt-1 truncate text-[8px] text-muted-foreground">{item.detail}</p>
                          </div>
                          <span className="shrink-0 text-[8px] text-muted-foreground">
                            {item.time}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
                <p className="text-[9px] text-muted-foreground">
                  © 2026 Linkora. All rights reserved.
                </p>
                <div className="flex items-center gap-1.5 text-[9px] text-green-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  All systems operational
                </div>
              </div>
            </main>
          </div>
        </motion.div>

        {/* Showcase caption */}
        <p className="mt-4 text-center text-[10px] text-muted-foreground">
          One workspace. Every click, visitor and connection, beautifully organized.
        </p>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;
