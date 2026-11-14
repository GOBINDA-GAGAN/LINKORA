
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Plus,
  X,
  LayoutDashboard,
  Image,
  Palette,
  Settings,
} from "lucide-react";

const tabs = [
  {
    id: "content",
    label: "Content",
    path: "/home/link",
    icon: LayoutDashboard,
  },
  {
    id: "header",
    label: "Header",
    path: "/home/link/header",
    icon: Image,
  },
  {
    id: "design",
    label: "Design",
    path: "/home/link/design",
    icon: Palette,
  },
  {
    id: "settings",
    label: "Settings",
    path: "/home/link/settings",
    icon: Settings,
  },
];

export default function AnimatedFooter() {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Find active page using the current URL
  const activeTab =
    tabs.find((tab) => tab.path === location.pathname)?.id || "content";

  // Navigate to selected page
  const handleSelect = (tab) => {
    navigate(tab.path);
    setOpen(false);
  };

  // Close menu on outside click and Escape
  useEffect(() => {
    const handleOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <footer
      ref={menuRef}
      className="fixed bottom-7 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="relative flex h-16 w-16 items-center justify-center">

        {/* Radial navigation buttons */}
        <AnimatePresence>
          {open &&
            tabs.map((tab, index) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              // Upper semicircle positioning
              const angle = 200 + index * (140 / 3);
              const radians = (angle * Math.PI) / 180;
              const radius = 112;

              const x = Math.cos(radians) * radius;
              const y = Math.sin(radians) * radius;

              return (
                <motion.button
                  key={tab.id}
                  type="button"
                  aria-label={`Open ${tab.label}`}
                  title={tab.label}
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                    scale: 0.3,
                  }}
                  animate={{
                    x,
                    y,
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                    scale: 0.3,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 24,
                    delay: index * 0.045,
                  }}
                  onClick={() => handleSelect(tab)}
                  className={`absolute z-10 flex h-14 w-14 items-center justify-center rounded-full border shadow-xl backdrop-blur-xl transition-all duration-200 ${
                    active
                      ? "border-brand-purple bg-brand-purple text-white shadow-brand-purple/30"
                      : "border-border bg-background/95 text-foreground hover:scale-110 hover:border-brand-purple hover:text-brand-purple"
                  }`}
                >
                  <Icon size={21} strokeWidth={2} />
                </motion.button>
              );
            })}
        </AnimatePresence>

        {/* Central magic button */}
        <motion.button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          animate={{ rotate: open ? 45 : 0 }}
          whileTap={{ scale: 0.9 }}
          className="relative z-20 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-[#5143e9] text-white shadow-[0_8px_35px_rgba(113,101,255,0.4)] ring-4 ring-background transition-shadow hover:shadow-[0_8px_45px_rgba(113,101,255,0.6)]"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <X size={27} strokeWidth={2.5} />
              </motion.span>
            ) : (
              <motion.span
                key="plus"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <Plus size={29} strokeWidth={2.5} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

      </div>
    </footer>
  );
}
