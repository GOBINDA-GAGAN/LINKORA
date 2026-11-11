
import React, { useState } from "react";
import {
  Link2,
  Heart,
  ArrowUpRight,
  Circle,
} from "lucide-react";
import { motion } from "motion/react";

const footerGroups = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Templates", href: "#templates" },
      { name: "Integrations", href: "#integrations" },
      { name: "Changelog", href: "#changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "#documentation" },
      { name: "Guides", href: "#guides" },
      { name: "Showcase", href: "#showcase" },
      { name: "API Reference", href: "#api" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "Discord", href: "#discord" },
      { name: "Twitter", href: "#twitter" },
      { name: "Creator Fund", href: "#creator-fund" },
      { name: "Brand Assets", href: "#brand-assets" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Security", href: "#security" },
    ],
  },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    // Connect your newsletter API here.
    console.log("Newsletter email:", email);
    setEmail("");
  };

  const brand = "LINKORA";

  return (
    <footer className="relative overflow-hidden rounded-b-2xl border border-border bg-linear-to-br from-[#edf5ff] via-[#c9e4ff] to-[#79baf5] text-[#101010]">
      <div className="relative z-10 mx-auto max-w-400 px-6 pt-12 sm:px-8 sm:pt-14 lg:px-10 lg:pt-14">

        {/* Top Section */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">

          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            {/* Logo */}
            <a
              href="#home"
              className="mb-5 inline-flex items-center gap-2.5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white">
                <Link2 size={18} />
              </span>

              <span className="text-xl font-bold tracking-tight">
                Linkora
              </span>
            </a>

            {/* Description */}
            <p className="max-w-sm text-sm leading-relaxed text-black/70">
              Linkora is the personal home for digital natives, creators, and
              independent thinkers.
            </p>

            {/* Newsletter */}
            <div className="mt-6 max-w-sm">
              <p className="mb-2 text-[9px] font-bold uppercase tracking-widest">
                Subscribe to our dispatch
              </p>

              <form
                onSubmit={handleSubscribe}
                className="flex items-center gap-2"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="h-10 min-w-0 flex-1 rounded-lg border border-black/10 bg-white px-3 text-xs text-black outline-none transition placeholder:text-gray-500 focus:border-black/50"
                />

                <button
                  type="submit"
                  className="flex h-10 items-center gap-1.5 rounded-lg bg-black px-4 text-xs font-semibold text-white transition hover:bg-black/80 active:scale-95"
                >
                  Join
                  <ArrowUpRight size={13} />
                </button>
              </form>
            </div>
          </motion.div>

          {/* Navigation Columns */}
          {footerGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-xs font-bold tracking-wide">
                {group.title}
              </h3>

              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-xs text-black/65 transition hover:text-black"
                    >
                      {link.name}

                      <ArrowUpRight
                        size={11}
                        className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Creator Badge */}
        <div className="mt-12 flex justify-center lg:absolute lg:right-10 lg:top-6 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, rotate: -8, scale: 0.8 }}
            whileInView={{ opacity: 1, rotate: 2, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ rotate: 0, scale: 1.05 }}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#c6ff35] px-4 py-2 shadow-sm"
          >
            <Heart size={12} fill="black" />

            <span className="text-[9px] font-black uppercase tracking-wider">
              Crafted for creators
            </span>
          </motion.div>
        </div>

        {/* Oversized Animated Brand Typography */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-16 overflow-hidden sm:mt-20 lg:mt-16"
        >
          <motion.h2
            initial="initial"
            whileHover="hover"
            className="flex justify-center whitespace-nowrap select-none cursor-pointer text-[clamp(6rem,70vw,25rem)] leading-[0.82] font-black tracking-[-0.075em] text-white"
          >
            {brand.split("").map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                variants={{
                  initial: {
                    y: 0,
                    rotate: 0,
                    scale: 1,
                    color: "#ffffff",
                  },
                  hover: {
                    y: -20,
                    rotate: index % 2 === 0 ? -10 : 10,
                    scale: 1.12,
                    color: "#fffff3",
                  },
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 12,
                  delay: index * 0.04,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </motion.h2>
        </motion.div>

        {/* Bottom Footer */}
        <div className="mt-10 flex flex-col gap-5 border-t border-black/10 py-6 text-[10px] sm:flex-row sm:items-center sm:justify-between">

          {/* Copyright */}
          <p className="text-black/75">
            © 2026 Linkora Inc. All rights reserved. Crafted for modern
            creators.
          </p>

          {/* System Status */}
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-1.5">
              <Circle
                size={7}
                fill="#16a34a"
                stroke="#16a34a"
              />
              <span>All systems nominal</span>
            </div>

            <span className="text-black/75">
              Designed with precision
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
