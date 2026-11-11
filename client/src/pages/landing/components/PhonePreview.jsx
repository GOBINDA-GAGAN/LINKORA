
import React from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  CheckCircle2,
  Wifi,
  Signal,
  BatteryCharging,
  ChevronLeft,
  Circle,
  Square,
  Music2,
  Globe2,
  Camera,
  ShoppingBag,
  Heart,
  Bell,
  MousePointerClick,
  Battery,
  BatteryFull,
} from "lucide-react";
import { FaInstagram, FaYoutube } from "react-icons/fa";

const products = [
  {
    name: "Workspace Kit",
    price: "$29",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=150&h=100&fit=crop",
  },
  {
    name: "Portfolio Template",
    price: "$19",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&h=100&fit=crop",
  },
  {
    name: "Design Essentials",
    price: "$15",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=150&h=100&fit=crop",
  },
  {
    name: "Brand Identity",
    price: "$12",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=150&h=100&fit=crop",
  },
];

const PhonePreview = () => {
  const socials = [FaInstagram, FaYoutube, Music2, Globe2, Camera];

  const profileLinks = [
    ["01", "Portfolio 2025", "Selected client case studies"],
    ["02", "Design System Kit", "Figma & Tailwind UI kit"],
    ["03", "Book 1:1 Mentorship", "30m portfolio teardown"],
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative mx-auto w-[245px] sm:w-[300px] mt-10 sm:mt-16"
    >
      {/* Side buttons */}
      <div className="absolute -left-[4px] top-24 h-9 w-[4px] rounded-l bg-neutral-500" />
      <div className="absolute -left-[4px] top-36 h-7 w-[4px] rounded-l bg-neutral-500" />
      <div className="absolute -right-[4px] top-32 h-12 w-[4px] rounded-r bg-neutral-500" />

      {/* Phone frame */}
      <div className="rounded-[34px] border-[3px] border-[#292929] bg-[#292929] p-1 shadow-[0_20px_45px_rgba(0,0,0,0.2)]">

        {/* Screen */}
        <div className="overflow-hidden rounded-[27px] bg-white">

          {/* Status bar */}
          <div className="relative flex h-8 items-center justify-between px-3 text-black">
            <span className="text-[10px] font-bold">9:41</span>

            {/* Camera island */}
            <div className="absolute left-1/2 top-1.5 flex h-[17px] w-[58px] -translate-x-1/2 items-center justify-end rounded-full bg-black px-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-900 ring-1 ring-gray-600" />
            </div>

            {/* Indicators */}
            <div className="flex items-center gap-1">
              <span className="text-[7px] font-bold">5G</span>
              <Signal size={11} />
              <Wifi size={11} />
              <span className="text-[7px] font-bold">86%</span>
              <BatteryFull size={13} className="" />
            </div>
          </div>

          {/* Profile */}
          <div className="px-3 pb-2 pt-2.5">

            {/* Username */}
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[8px] font-bold">linkora.bio/alex</span>
              <span className="text-[9px] text-gray-500">•••</span>
            </div>

            {/* Avatar */}
            <div className="relative mx-auto h-12 w-12">
              <img
                src="https://play-lh.googleusercontent.com/Nj2RW3n3XTW2pWNTloXHWe12mFuUroDso4VkUmUGV-2Rwa7n53cNRIeBMMYRgpZ-Zdg0wLMqxjkArpCW_RW4Aw"
                alt="Alex Rivera"
                className="h-full w-full rounded-full border border-gray-200 object-cover"
              />
              <span className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#c6ff35]">
                <CheckCircle2 size={9} />
              </span>
            </div>

            {/* User details */}
            <div className="mt-1.5 text-center">
              <h3 className="flex items-center justify-center gap-1 text-xs font-bold">
                Alex Rivera
                <CheckCircle2
                  size={10}
                  className="fill-blue-500 text-white"
                />
              </h3>

              <p className="mt-0.5 text-[7px] text-gray-500">
                Product Designer & Creative Dev
              </p>

              <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[7px] font-semibold text-green-700">
                <span className="h-1 w-1 rounded-full bg-green-500" />
                Available for projects
              </div>
            </div>

            {/* Social icons */}
            <div className="mt-2 flex justify-center gap-2">
              {socials.map((Icon, index) => (
                <div
                  key={index}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-50"
                >
                  <Icon size={11} />
                </div>
              ))}
            </div>

            {/* Profile links */}
            <div className="mt-3 space-y-1.5">
              {profileLinks.map(([number, title, description], index) => (
                <motion.div
                  key={number}
                  whileHover={{ x: 2 }}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 px-2 py-1.5"
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[7px] font-bold ${
                      index === 1 ? "bg-[#c6ff35]" : "bg-violet-50"
                    }`}
                  >
                    {number}
                  </span>

                  <div className="min-w-0 flex-1 text-left">
                    <p className="truncate text-[8px] font-bold">{title}</p>
                    <p className="truncate text-[7px] text-gray-500">
                      {description}
                    </p>
                  </div>

                  <ArrowUpRight size={10} />
                </motion.div>
              ))}
            </div>

            {/* Products */}
            <div className="mt-3">
              <div className="mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <ShoppingBag size={10} />
                  <span className="text-[8px] font-bold">
                    Featured products
                  </span>
                </div>
                <span className="text-[6px] font-bold text-gray-400">
                  VIEW ALL
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {products.map((product) => (
                  <div
                    key={product.name}
                    className="overflow-hidden rounded-lg border border-gray-200"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-[43px] w-full object-cover"
                    />
                    <div className="flex items-center justify-between gap-1 p-1">
                      <span className="truncate text-[7px] font-semibold">
                        {product.name}
                      </span>
                      <span className="shrink-0 text-[7px] font-bold">
                        {product.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Branding */}
            <p className="mt-2 text-center text-[6px] font-bold uppercase tracking-widest text-gray-400">
              Powered by Linkora
            </p>
          </div>

          {/* Bottom Android navigation */}
          <div className="flex h-7 items-center justify-around border-t border-gray-100 bg-white px-7">
            <ChevronLeft size={15} />
            <Circle size={11} />
            <Square size={10} />
          </div>
        </div>
      </div>

      {/* Traffic badge */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -left-24 top-[38%] hidden items-center gap-2 rounded-xl border border-gray-200 bg-white px-2.5 py-2 shadow-md sm:flex"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#c6ff35]">
          <MousePointerClick size={14} />
        </div>
        <div>
          <p className="text-[7px] uppercase text-gray-500">Traffic pulse</p>
          <p className="text-[10px] font-bold">+4,830 clicks</p>
        </div>
      </motion.div>

      {/* Newsletter badge */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity }}
        className="absolute -right-24 top-[47%] hidden items-center gap-2 rounded-xl border border-gray-200 bg-white px-2.5 py-2 shadow-md sm:flex"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black text-[#c6ff35]">
          <Bell size={13} />
        </div>
        <div>
          <p className="text-[7px] uppercase text-gray-500">Newsletter</p>
          <p className="text-[10px] font-bold">+120 new emails</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PhonePreview;
