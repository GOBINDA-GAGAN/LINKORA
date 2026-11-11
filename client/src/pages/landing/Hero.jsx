import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  Star,
  Eye,
  CheckCircle2,
  MousePointerClick,
  Bell,
  Sparkles,
  Phone,
} from "lucide-react";
import {
  FaCamera,
  FaGlobe,
  FaInstagram,
  FaMusic,
  FaYoutube,
} from "react-icons/fa";
import PhonePreview from "./components/PhonePreview";

const Hero = () => {
  const [username, setUsername] = useState("yourname");
  const [error, setError] = useState("");

  const handleClaim = (e) => {
    e.preventDefault();

    const handle = username.trim();

    if (!handle) {
      setError("Please enter a username.");
      return;
    }

    if (handle.length < 3) {
      setError("Username must contain at least 3 characters.");
      return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(handle)) {
      setError("Only letters, numbers, _ and - are allowed.");
      return;
    }

    setError("");

    // Connect your username availability API here.
    // Example:
    // navigate(`/register?username=${encodeURIComponent(handle)}`);

    console.log("Claim username:", handle);
  };

  const floatingAnimation = {
    animate: {
      y: [0, -7, 0],
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-background px-4 pb-16 pt-16 text-black sm:px-6 sm:pt-20 lg:min-h-[calc(100vh-64px)] lg:pt-24"
    >
      {/* Dot Background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.13) 0.8px, transparent 0.8px)",
          backgroundSize: "24px 24px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        }}
      />

      {/* Main Content */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        {/* Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50/80 px-3 py-1.5 text-[8px] font-bold uppercase tracking-wide text-gray-700 sm:text-[9px]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#c6ff35]" />
          Next-gen link-in-bio engine
          <span className="text-gray-300">•</span>
          100% free forever
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl text-[clamp(2.7rem,7vw,5rem)] leading-[1.02] font-black tracking-[-0.06em]"
        >
          Your internet.
          <br />
          All in one link.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 max-w-xl text-xs leading-relaxed text-gray-600 sm:text-sm sm:leading-6"
        >
          Bring your social profiles, creative work, favourite links and
          everything you share into one beautiful personal space.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <motion.a
            href="/register"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-black px-7 text-[11px] font-bold text-white shadow-md transition hover:bg-black/85 sm:w-auto"
          >
            Create your Linkora
            <ArrowRight size={14} />
          </motion.a>

          <motion.a
            href="#showcase"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-7 text-[11px] font-semibold text-black transition hover:border-black/40 sm:w-auto"
          >
            Explore examples
            <Eye size={13} />
          </motion.a>
        </motion.div>

        {/* Username Claim Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-7 w-full max-w-[420px]"
        >
          <form
            onSubmit={handleClaim}
            className={`flex w-full items-center gap-2 rounded-xl border bg-white p-1.5 shadow-sm transition focus-within:shadow-md ${
              error
                ? "border-red-400"
                : "border-gray-200 focus-within:border-black/40"
            }`}
          >
            {/* Fixed URL Prefix */}
            <span className="shrink-0 pl-2 text-[11px] font-semibold text-black sm:text-xs">
              linkora.bio/
            </span>

            {/* Editable Username */}
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""));
                setError("");
              }}
              placeholder="yourname"
              maxLength={30}
              minLength={3}
              required
              aria-label="Choose your Linkora username"
              className="h-9 min-w-0 flex-1 bg-transparent text-xs font-semibold text-black outline-none placeholder:font-normal placeholder:text-gray-400"
            />

            {/* Claim Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="flex h-9 shrink-0 items-center justify-center gap-1 rounded-lg bg-[#c6ff35] px-3 text-[10px] font-bold text-black transition hover:bg-[#b5ef20] sm:px-4 sm:text-xs"
            >
              Claim handle
              <ArrowUpRight size={13} />
            </motion.button>
          </form>

          {error ? (
            <p className="mt-2 text-left text-[10px] text-red-500">{error}</p>
          ) : (
            <p className="mt-3 text-[9px] text-gray-500 sm:text-[10px]">
              Free instant registration · No credit card required
            </p>
          )}
        </motion.div>

        {/* Floating Badge: Profile */}
        <motion.div
          {...floatingAnimation}
          initial={{ opacity: 0, x: -20, rotate: -7 }}
          animate={{
            opacity: 1,
            x: 0,
            rotate: -5,
            y: [0, -7, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.6 },
            x: { duration: 0.6, delay: 0.6 },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute left-0 top-10 hidden items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm sm:flex lg:left-5 lg:top-12"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-[10px] font-bold text-[#c6ff35]">
            G
          </div>

          <div className="text-left">
            <p className="text-[9px] font-bold">alex.dev</p>
            <p className="text-[8px] text-gray-500">Creator profile</p>
          </div>
        </motion.div>

        {/* Floating Badge: Featured Creator */}
        <motion.div
          initial={{ opacity: 0, x: 20, rotate: 8 }}
          animate={{ opacity: 1, x: 0, rotate: 3 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          whileHover={{ rotate: 0, scale: 1.06 }}
          className="absolute right-0 top-14 hidden items-center gap-1.5 rounded-full border border-black/10 bg-[#c6ff35] px-3 py-1.5 text-[9px] font-black uppercase shadow-sm sm:flex lg:right-5 lg:top-10"
        >
          <Star size={11} fill="black" />
          Featured creator
        </motion.div>

        {/* Floating Badge: Views */}
        <motion.div
          initial={{ opacity: 0, x: -20, rotate: -8 }}
          animate={{ opacity: 1, x: 0, rotate: -4 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ rotate: 0, scale: 1.06 }}
          className="absolute bottom-[180px] left-0 hidden items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm md:flex lg:left-0"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
            <Eye size={14} />
          </div>

          <div className="text-left">
            <p className="text-[9px] font-bold">Latest vlog ✨</p>
            <p className="text-[8px] text-gray-500">24.5K views</p>
          </div>
        </motion.div>

        {/* Floating Badge: Likes */}
        <motion.div
          initial={{ opacity: 0, x: 20, rotate: 8 }}
          animate={{ opacity: 1, x: 0, rotate: 4 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          whileHover={{ rotate: 0, scale: 1.06 }}
          className="absolute right-0 bottom-[190px] hidden items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm md:flex lg:right-0"
        >
          <Heart size={13} fill="#fb7185" className="text-rose-400" />
          <span className="text-[9px] font-bold">12.4K likes</span>
        </motion.div>

        {/* Phone Profile Preview */}
        {/*         

        {/* Phone Floating Badge: Traffic */}
        <PhonePreview />

        {/* Phone Floating Badge: Newsletter */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="absolute right-0 bottom-[110px] hidden items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm md:flex lg:right-5"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-[#c6ff35]">
            <Bell size={15} />
          </div>

          <div className="text-left">
            <p className="text-[8px] font-semibold uppercase text-gray-500">
              Newsletter alert
            </p>
            <p className="text-xs font-bold">+120 new emails</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
