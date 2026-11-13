
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  UserRound,
  Link2,
  ShieldCheck,
  Monitor,
  CreditCard,
  AlertTriangle,
  Globe,
} from "lucide-react";

const sections = [
  {
    title: "PERSONAL & PROFILE",
    items: [
      { name: "Profile & Bio", tab: "profile", icon: UserRound },
      { name: "Account Management", tab: "management", icon: Link2 },
    ],
  },
  {
    title: "ACCOUNT & SECURITY",
    items: [
      { name: "Account & Credentials", tab: "security", icon: ShieldCheck, badge: "2FA" },
      { name: "Sessions & Devices", tab: "sessions", icon: Monitor },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { name: "Subscription & Billing", tab: "billing", icon: CreditCard },
      {
        name: "Danger Zone",
        tab: "danger-zone",
        icon: AlertTriangle,
        danger: true,
      },
    ],
  },
];

const AccountSidebar = () => {
  const [activeTab, setActiveTab] = useState(
    new URLSearchParams(window.location.search).get("tab") || "profile"
  );

  // Automatically update active tab while scrolling
  useEffect(() => {
    const container = document.getElementById("account-scroll");
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          );

        if (visible.length > 0) {
          const id = visible[0].target.id;

          setActiveTab(id);

          const url = new URL(window.location.href);
          url.searchParams.set("tab", id);
          window.history.replaceState({}, "", url);
        }
      },
      {
        root: container,
        threshold: [0.1, 0.25, 0.5],
        rootMargin: "-10% 0px -65% 0px",
      }
    );

    sections.forEach(({ items }) => {
      items.forEach(({ tab }) => {
        const element = document.getElementById(tab);
        if (element) observer.observe(element);
      });
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll on sidebar click
  const handleTabClick = (tab) => {
    setActiveTab(tab);

    const element = document.getElementById(tab);

    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState({}, "", url);
  };

  return (
    <aside className="flex h-full w-[230px] shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar">

      {/* Back to App */}
      <div className="shrink-0 border-b border-sidebar-border px-4 py-4">
        <Link
          to="/"
          className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft
            size={17}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to App
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="mb-2 px-2 text-[9px] font-bold tracking-[0.15em] text-muted-foreground">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.tab;

                return (
                  <button
                    key={item.tab}
                    type="button"
                    onClick={() => handleTabClick(item.tab)}
                    className={`group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[12px] font-medium transition-all duration-200 ${
                      isActive
                        ? item.danger
                          ? "bg-destructive text-destructive-foreground"
                          : "bg-primary text-primary-foreground shadow-sm"
                        : item.danger
                          ? "text-destructive hover:bg-destructive/10"
                          : "text-sidebar-foreground hover:bg-sidebar-accent"
                    }`}
                  >
                    <Icon size={15} strokeWidth={1.8} />

                    <span className="min-w-0 flex-1 truncate">
                      {item.name}
                    </span>

                    {item.badge && (
                      <span className="rounded bg-secondary px-1 py-0.5 text-[8px] font-bold text-secondary-foreground">
                        {item.badge}
                      </span>
                    )}

                    {isActive && !item.danger && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2 rounded-lg px-2 py-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
            <Globe size={15} />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold text-sidebar-foreground">
              Linkora
            </p>
            <p className="text-[10px] text-muted-foreground">
              Account Settings
            </p>
          </div>

          <span className="ml-auto text-[9px] text-muted-foreground">
            v1.0
          </span>
        </div>
      </div>
    </aside>
  );
};

export default AccountSidebar;
