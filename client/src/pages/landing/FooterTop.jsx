

import { motion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";

const FooterTop = () => {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[360px] items-center justify-center overflow-hidden bg-white px-5 py-20 sm:min-h-[420px]"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(0,0,0,0.16) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      {/* Soft white overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-white/20" />

      {/* Hero Content */}
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        {/* Creator Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ duration: 0.6 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#c6ff35] px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-black shadow-sm"
        >
          <Sparkles size={11} />
          Join 180,000+ creators
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl text-4xl leading-[1.1] font-bold tracking-tight text-black sm:text-5xl lg:text-6xl"
        >
          One link. A million possibilities.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 max-w-xl text-sm leading-6 text-gray-600 sm:text-base"
        >
          Claim your unique username, style it to your aesthetic, and give your
          audience a unified place to connect with your best work.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
        >
          {/* Primary Button */}
          <motion.a
            href="/register"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-black px-7 text-xs font-semibold text-white shadow-md transition hover:bg-black/85"
          >
            Create your free page
            <span className="h-2 w-2 rounded-full bg-[#c6ff35]" />
          </motion.a>

          {/* Secondary Button */}
          <motion.a
            href="#showcase"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-full border border-gray-200 bg-white/80 px-7 
            text-xs font-semibold text-black transition hover:border-black/30"
          >
            View showcase
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </motion.a>
        </motion.div>
 
      </div>
    </section>
  );
};

export default FooterTop;
