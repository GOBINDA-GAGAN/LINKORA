import React from "react";
import {
  ArrowUpRight,
  ExternalLink,
  Share2,
  Pencil,
  Eye,
  Users,
  MousePointerClick,
  TrendingUp,
  ChevronRight,
  Link2,
  Plus,
} from "lucide-react";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const profile = {
  name: "Trust me I am an Engineering Student",
  username: "gobinda1",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPxZxrWMhXaNYTkx9GpjVmwbjLq73WazhOsTIfLKpTMg&s=10",
  links: 2,
  url: "http://localhost:5173/gobinda1",
};

const stats = [
  { label: "Profile Views", value: "12,840", change: "+12.5%", icon: Eye },
  {
    label: "Link Clicks",
    value: "8,420",
    change: "+8.2%",
    icon: MousePointerClick,
  },
  { label: "Followers", value: "1,240", change: "+18.4%", icon: Users },
];

const activities = [
  {
    name: "Instagram",
    icon: FaInstagram,
    clicks: "1,240",
    color: "text-pink-500",
  },
  { name: "YouTube", icon: FaYoutube, clicks: "856", color: "text-red-500" },
  { name: "LinkedIn", icon: FaLinkedin, clicks: "620", color: "text-blue-500" },
];

const GrowthChart = () => (
  <svg
    viewBox="0 0 600 210"
    className="h-full w-full"
    preserveAspectRatio="none"
  >
    {[35, 80, 125, 170].map((y) => (
      <line
        key={y}
        x1="35"
        y1={y}
        x2="585"
        y2={y}
        stroke="currentColor"
        opacity="0.09"
        strokeDasharray="4 5"
      />
    ))}

    <path
      d="M35 145 C80 135 100 150 145 130 S220 110 265 120 S340 85 385 90 S460 60 500 65 S550 42 585 35"
      fill="none"
      stroke="#7165ff"
      strokeWidth="3"
      strokeLinecap="round"
    />

    <path
      d="M35 175 C90 170 110 165 145 170 S220 150 265 155 S340 130 385 135 S460 110 500 115 S550 95 585 90"
      fill="none"
      stroke="#c6ff35"
      strokeWidth="3"
      strokeLinecap="round"
    />

    <path
      d="M35 190 C90 185 110 188 145 180 S220 175 265 170 S340 165 385 160 S460 150 500 145 S550 135 585 130"
      fill="none"
      stroke="#78b9f5"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {[35, 145, 265, 385, 500, 585].map((x, i) => (
      <circle
        key={i}
        cx={x}
        cy={[145, 130, 120, 90, 65, 35][i]}
        r="4"
        fill="#7165ff"
      />
    ))}
  </svg>
);

export const Home = () => {
  const navigate = useNavigate();

  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const shareProfile = async () => {
    try {
      await navigator.clipboard.writeText(profile.url);
    } catch (error) {
      console.error("Unable to copy profile link", error);
    }
  };

  const createNewProfile = () => {
    navigate("/new-profile/your-username");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1250px] space-y-9 px-4 py-7 sm:px-7 lg:px-10 lg:py-9">
        {/* HEADER */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <div>
            <h1 className="font-headline text-xl font-bold tracking-tight sm:text-2xl">
              {greeting}, {profile.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Here's what's happening with your Linkora.
            </p>
          </div>

          <a
            href={profile.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-full bg-muted px-4 py-2.5 text-sm font-medium transition hover:bg-accent/30"
          >
            <Link2 size={16} />
            <span className="max-w-[170px] truncate">
              linkora.com/{profile.username}
            </span>
            <ExternalLink size={15} />
          </a>
        </header>

        {/* PROFILE SECTION */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-headline text-lg font-bold">Your Linkora</h2>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Manage profiles <ChevronRight size={15} className="inline" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* PROFILE PREVIEW CARD */}
            <div className="relative flex min-h-[350px] flex-col overflow-hidden rounded-[26px] bg-[#062b23] p-4 text-white shadow-sm">
              {/* STATUS */}
              <div className="flex">
                <span className="flex items-center gap-2 rounded-full bg-white/75 px-3 py-1.5 text-[11px] font-medium text-[#171717]">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  Unpublished changes
                </span>
              </div>

              {/* PROFILE IMAGE */}
              <div className="flex flex-1 items-center justify-center py-5">
                <div className="h-36 w-36 overflow-hidden rounded-full border-4 border-white/10 bg-white/10">
                  <img
                    src={profile.image}
                    alt="Profile"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>

              {/* PROFILE FOOTER */}
              <div className="flex items-end justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="truncate text-xl font-bold">{profile.name}</h3>
                  <p className="mt-1 text-sm text-white/70">
                    {profile.links} links
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={shareProfile}
                    title="Copy profile link"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-[#171717] transition hover:bg-white"
                  >
                    <Share2 size={18} />
                  </button>

                  <a
                    href="/home/link"
                    className="rounded-full bg-white/60 px-5 py-2.5 text-sm font-semibold text-[#171717] transition hover:bg-white"
                  >
                    Edit
                  </a>
                </div>
              </div>
            </div>

            {/* CREATE PROFILE CARD */}
            <button
              onClick={createNewProfile}
              className="group flex min-h-[350px] flex-col items-center justify-center rounded-[26px] border-2 border-dashed border-border bg-card p-6 transition hover:border-brand-purple hover:bg-muted/40"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-secondary text-brand-primary transition group-hover:scale-110">
                <Plus size={27} />
              </div>
              <h3 className="font-headline text-lg font-bold">
                Create another profile
              </h3>
              <p className="mt-2 max-w-[220px] text-center text-sm text-muted-foreground">
                Create multiple Linkora profiles for different purposes.
              </p>
            </button>
          </div>
        </section>

        {/* WEEKLY ANALYTICS */}
        <section>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-headline text-lg font-bold">
                In the last week
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your profile performance at a glance.
              </p>
            </div>

            <select className="rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>

          {/* STAT CARDS */}
          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-card p-5 transition hover:shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <div className="rounded-lg bg-muted p-2">
                      <Icon size={18} />
                    </div>
                  </div>

                  <div className="mt-5 flex items-end justify-between">
                    <h3 className="font-headline text-3xl font-bold">
                      {stat.value}
                    </h3>
                    <span className="mb-1 flex items-center gap-1 text-xs font-semibold text-green-600">
                      <TrendingUp size={13} />
                      {stat.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ANALYTICS PANELS */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* VISITORS */}
            <div className="overflow-hidden rounded-[24px] border border-border bg-card p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-semibold">Linkora visitors</h3>
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  Last 7 days <ChevronRight size={16} />
                </button>
              </div>

              <div className="relative flex min-h-[245px] flex-col justify-end overflow-hidden rounded-xl bg-muted/30 p-4">
                {/* DECORATIVE MAP PATTERN */}
                <div
                  className="absolute inset-0 opacity-[0.16]"
                  style={{
                    backgroundImage:
                      "radial-gradient(#777780 1.5px, transparent 1.5px)",
                    backgroundSize: "9px 9px",
                    maskImage:
                      "radial-gradient(ellipse at center, black 20%, transparent 75%)",
                  }}
                />

                <div className="relative z-10">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-brand-purple text-white shadow">
                    <Link2 size={17} />
                  </div>

                  <h3 className="max-w-[450px] font-headline text-xl font-bold leading-tight sm:text-2xl">
                    Your audience is discovering your Linkora profile.
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Track your visitors and understand where they come from.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Total visitors
                  </p>
                  <p className="mt-1 text-xl font-bold">12,840</p>
                </div>

                <a
                  href="/dashboard/analytics"
                  className="flex items-center gap-1 text-sm font-semibold hover:text-brand-purple"
                >
                  View analytics <ArrowUpRight size={15} />
                </a>
              </div>
            </div>

            {/* FOLLOWER GROWTH */}
            <div className="overflow-hidden rounded-[24px] border border-border bg-card p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Follower growth</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Your audience growth over time
                  </p>
                </div>

                <span className="rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-600">
                  +18.4%
                </span>
              </div>

              <div className="flex h-[245px] items-center rounded-xl border border-border bg-muted/30 p-3">
                <GrowthChart />
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Total followers
                  </p>
                  <p className="mt-1 text-xl font-bold">1,240</p>
                </div>

                <a
                  href="/dashboard/analytics"
                  className="flex items-center gap-1 text-sm font-semibold hover:text-brand-purple"
                >
                  View insights <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
