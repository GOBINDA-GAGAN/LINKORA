
import React, { useEffect, useState } from "react";

import {
  BarChart3,
  Circle,
  Home,
  Link2,
  Menu,
  Settings,
  X,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "motion/react";

// Navigation configuration
const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Features", href: "#features", icon: Settings },
  { name: "Templates", href: "#templates", icon: Link2 },
  { name: "Pricing", href: "#pricing", icon: BarChart3 },
  { name: "Docs", href: "#docs", icon: Settings },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Navigation handler
  const handleNavigation = (name) => {
    setActiveLink(name);
    setIsOpen(false);
  };

  // Mobile menu animation
  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        height: {
          duration: 0.3,
          ease: "easeOut",
        },
        opacity: {
          duration: 0.2,
        },
        staggerChildren: 0.06,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: {
          duration: 0.25,
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.15,
        },
      },
    },
  };

  // Mobile navigation item animation
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -12,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-16 max-w-360 items-center justify-between px-4 sm:px-6 lg:px-12">

        {/* Logo */}
        <motion.a
          href="#home"
          onClick={() => handleNavigation("Home")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex shrink-0 items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-primary text-white">
            <Link2 size={17} />
          </div>

          <span className="font-headline text-xl font-bold tracking-tight">
            Linkora
          </span>

          <span className="rounded-full bg-brand-secondary px-2 py-0.5 text-[10px] font-bold text-brand-primary">
            v1.0
          </span>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex lg:gap-9">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={() => handleNavigation(item.name)}
              whileHover={{ y: -2 }}
              className={`relative py-2 text-sm font-medium transition-colors ${
                activeLink === item.name
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.name}

              {activeLink === item.name && (
                <motion.span
                  layoutId="activeNavbar"
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-foreground"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </motion.a>
          ))}
        </div>

        {/* Desktop Actions: 768px and above */}
        <div className="hidden items-center gap-5 md:flex">
          <motion.a
            href="/auth/login"
            whileHover={{ y: -2 }}
            className="text-sm font-semibold text-foreground transition-colors hover:text-muted-foreground"
          >
            Login
          </motion.a>

          <motion.a
            href="/auth/register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-xs font-semibold text-white"
          >
            Get Started
            <Circle
              size={8}
              fill="#C6FF35"
              stroke="#C6FF35"
            />
          </motion.a>
        </div>

        {/* Mobile Menu Button: below 768px */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border transition-colors hover:bg-muted md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {isOpen ? <X size={21} /> : <Menu size={21} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-5 sm:px-6">

              {/* Navigation Items */}
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.name}
                    variants={itemVariants}
                    href={item.href}
                    onClick={() => handleNavigation(item.name)}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      activeLink === item.name
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.8} />
                    {item.name}
                  </motion.a>
                );
              })}

              {/* Mobile Actions */}
              <motion.div
                variants={itemVariants}
                className="mt-4 flex flex-col gap-3 border-t border-border pt-5"
              >
                <motion.a
                  href="/auth/login"
                  whileTap={{ scale: 0.98 }}
                  className="rounded-xl border border-border py-3.5 text-center text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Login
                </motion.a>

                <motion.a
                  href="/auth/register"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 rounded-full bg-brand-primary py-3.5 text-sm font-semibold text-white"
                >
                  Get Started
                  <Circle
                    size={8}
                    fill="#C6FF35"
                    stroke="#C6FF35"
                  />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
