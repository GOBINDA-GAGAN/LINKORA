import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Share2, Link2, Check, Circle, X, Copy, Send } from "lucide-react";

import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaFacebookF,
  FaWhatsapp,
  FaLinkedinIn,
  FaFacebookMessenger,
  FaSnapchatGhost,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

import { getPublicProfileService } from "../../../services/profileService";

// YOUR ORIGINAL THEME
const dummyTheme = {
  background: "#230813",
  cardBackground: "#3A1020",
  titleColor: "#FFF0F3",
  bioColor: "#FFF0F3",
  buttonBackground: "#581126",
  buttonTextColor: "#FFF0F3",
  accentColor: "#FF4D6D",
  borderColor: "#70203A",
  fontFamily: "var(--font-sans)",
  cardRadius: "30px",
  cardShadow: "0 24px 70px rgba(0, 0, 0, 0.45)",
};

// YOUR ORIGINAL ANIMATIONS
const containerVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

// YOUR ORIGINAL SOCIAL LINKS
const socialLinks = [
  { name: "Instagram", icon: FaInstagram, url: "#" },
  { name: "Facebook", icon: FaFacebook, url: "#" },
  { name: "YouTube", icon: FaYoutube, url: "#" },
];

const PublicProfile = () => {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // NEW: SHARE MODAL STATE
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPublicProfileService(username);
        setProfile(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Profile not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  // NEW: OPEN MODAL
  const handleShare = () => {
    setShowShareModal(true);
  };

  // NEW: COPY PROFILE LINK
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profile.profileLink);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Unable to copy profile link:", err);
    }
  };

  // LOADING
  if (loading) {
    return (
      <main className="grid h-dvh place-items-center bg-background text-muted-foreground">
        Loading profile...
      </main>
    );
  }

  // ERROR
  if (error || !profile) {
    return (
      <main className="grid h-dvh place-items-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-5xl font-bold">404</h1>
          <p className="mt-3 text-muted-foreground">
            {error || "Profile not found"}
          </p>
        </div>
      </main>
    );
  }

  const theme = {
    ...dummyTheme,
    titleColor: profile.titleColor || dummyTheme.titleColor,
    fontFamily: profile.titleFont || dummyTheme.fontFamily,
  };

  // SHARE URLS
  const profileUrl = profile.profileLink || window.location.href;
  const encodedUrl = encodeURIComponent(profileUrl);
  const encodedTitle = encodeURIComponent(
    profile.title || "Check out my profile",
  );

  const shareOptions = [
    {
      name: "X",
      color: "#000000",
      icon: <span className="text-2xl">𝕏</span>,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "Facebook",
      color: "#1877F2",
      icon: <FaFacebookF size={22} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "WhatsApp",
      color: "#00D66F",
      icon: <FaWhatsapp size={24} />,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      color: "#0A66C2",
      icon: <FaLinkedinIn size={23} />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Messenger",
      color: "#F0F0F0",
      icon: <FaFacebookMessenger size={23} color="#168AFF" />,
      url: "https://www.messenger.com/",
    },
    {
      name: "Snapchat",
      color: "#FFFC00",
      icon: <FaSnapchatGhost size={24} color="#000000" />,
      url: `https://www.snapchat.com/scan?attachmentUrl=${encodedUrl}`,
    },
  ];

  return (
    <main
      className="flex h-dvh w-full justify-center overflow-hidden p-3"
      style={{
        background: theme.background,
        fontFamily: theme.fontFamily,
      }}
    >
      {/* YOUR ORIGINAL PROFILE TEMPLATE */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative flex h-full w-full max-w-[524px] flex-col overflow-hidden px-6 pt-6 sm:px-8"
        style={{
          background: theme.cardBackground,
          borderRadius: theme.cardRadius,
          boxShadow: theme.cardShadow,
        }}
      >
        {/* HEADER */}
        <motion.header
          variants={itemVariants}
          className="flex shrink-0 items-center justify-between"
        >
          <motion.a
            href="/"
            aria-label="Linkora home"
            whileHover={{ scale: 1.06, rotate: -3 }}
            whileTap={{ scale: 0.94 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              background: theme.buttonBackground,
              color: theme.buttonTextColor,
            }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-primary text-white">
              <Link2 size={17} />
            </div>
          </motion.a>

          <div className="flex items-center gap-2">
            {/* ONLY CHANGE: SHARE NOW OPENS MODAL */}
            <motion.button
              whileHover={{ y: -2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              aria-label="Share profile"
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{
                background: theme.buttonBackground,
                color: theme.buttonTextColor,
              }}
            >
              <Share2 size={18} />
            </motion.button>
          </div>
        </motion.header>

        {/* BANNER */}
        {profile.bannerImage && (
          <motion.div
            variants={itemVariants}
            className="mt-7 h-28 shrink-0 overflow-hidden rounded-2xl"
          >
            {profile.bannerLink ? (
              <a
                href={profile.bannerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={profile.bannerImage}
                  alt="Profile banner"
                  className="h-full w-full object-cover"
                />
              </a>
            ) : (
              <img
                src={profile.bannerImage}
                alt="Profile banner"
                className="h-full w-full object-cover"
              />
            )}
          </motion.div>
        )}

        {/* PROFILE INFORMATION */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex shrink-0 flex-col items-center text-center"
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 15,
              delay: 0.2,
            }}
            whileHover={{ scale: 1.05 }}
            src={profile.profileImage || "/default-avatar.png"}
            alt={profile.title || "Profile"}
            className="h-24 w-24 rounded-full border-2 object-cover shadow-sm"
            style={{ borderColor: theme.borderColor }}
          />

          <motion.h1
            variants={itemVariants}
            className="mt-4 max-w-full text-xl font-bold tracking-tight sm:text-2xl"
            style={{
              color: theme.titleColor,
              fontWeight: profile.titleStyle === "bold" ? 800 : 500,
              fontStyle: profile.titleStyle === "italic" ? "italic" : "normal",
            }}
          >
            {profile.title}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-2 max-w-sm text-sm leading-6"
            style={{ color: theme.bioColor }}
          >
            {profile.bio}
          </motion.p>

          {/* ORIGINAL SOCIAL ICONS */}
          <motion.div
            variants={itemVariants}
            className="mt-5 flex items-center gap-5"
          >
            {socialLinks.map(({ name, icon: Icon, url }, index) => (
              <motion.a
                key={name}
                href={url}
                aria-label={name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                style={{ color: theme.titleColor }}
              >
                <Icon size={23} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* FLEXIBLE EMPTY CONTENT AREA */}
        <div className="flex-1" />

        {/* YOUR ORIGINAL FOOTER */}
        <motion.footer variants={itemVariants} className="shrink-0">
          <div
            className="flex flex-wrap justify-center gap-x-1.5 gap-y-2 text-center text-[11px] font-medium"
            style={{ color: theme.bioColor }}
          >
            <a href="#">Cookie Preferences</a>
            <span>·</span>
            <a href="#">Report</a>
            <span>·</span>
            <a href="#">Privacy</a>
            <span>·</span>
            <a href="#">Explore</a>
            <span>·</span>
            <a href="#">About this account</a>
          </div>

          {/* ORIGINAL BRANDING */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="relative -mx-6 mt-12 overflow-hidden px-6 pb-3 pt-10 text-center sm:-mx-8 sm:px-8"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, var(--muted))",
              }}
            />

            <div className="relative z-10">
              <motion.a
                href="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md"
              >
                linkora.com/you
                <Circle size={8} fill="#C6FF35" stroke="#C6FF35" />
              </motion.a>

              <p
                className="mt-3 text-sm font-semibold"
                style={{
                  backgroundImage: theme.bioColor,
                  WebkitBackgroundClip: "text",
                }}
              >
                Get your own Linkora
              </p>
            </div>
          </motion.div>
        </motion.footer>
      </motion.section>

      {/* =====================================
          SHARE MODAL - NEW ADDITION ONLY
      ===================================== */}

      <AnimatePresence>
        {showShareModal && (
          <motion.div
            key="share-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowShareModal(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background p-3 backdrop-blur-sm sm:p-5"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[520px] overflow-hidden rounded-[26px] bg-primary-foreground text-black shadow-2xl"
            >
              {/* MODAL HEADER */}
              <div className="flex items-center justify-between px-6 py-5">
                <h2 className="text-lg font-semibold">Share Linkora</h2>

                <button
                  onClick={() => setShowShareModal(false)}
                  aria-label="Close modal"
                  className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
                >
                  <X size={20} />
                </button>
              </div>

              {/* PROFILE PREVIEW */}
              <div className="px-6">
                <div
                  className={`flex min-h-[245px] flex-col items-center justify-center overflow-hidden rounded-[24px]  px-5 py-7 text-center text-white`}
                  style={{ backgroundColor: dummyTheme.cardBackground }}
                >
                  <img
                    src={profile.profileImage || "/default-avatar.png"}
                    alt="Profile"
                    className="mb-5 h-28 w-28 rounded-full border-2 border-white/20 object-cover"
                  />

                  <h3 className="line-clamp-2 max-w-full text-xl font-bold">
                    {profile.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-300">
                    ✳ /{profile.username}
                  </p>
                </div>
              </div>

              {/* HORIZONTAL SHARE OPTIONS */}
              <div className="share-scrollbar flex gap-5 overflow-x-auto px-6 py-8">
                {/* COPY LINK */}
                <button
                  onClick={handleCopyLink}
                  className="flex min-w-[65px] shrink-0 flex-col items-center gap-2"
                >
                  <motion.span
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="grid h-12 w-12 place-items-center rounded-full bg-[#E5E7E0] text-black"
                  >
                    {copied ? <Check size={21} /> : <Copy size={20} />}
                  </motion.span>

                  <span className="whitespace-nowrap text-xs">
                    {copied ? "Copied!" : "Copy Link"}
                  </span>
                </button>

                {/* SOCIAL PLATFORMS */}
                {shareOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-w-[65px] shrink-0 flex-col items-center gap-2"
                  >
                    <motion.span
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="grid h-12 w-12 place-items-center rounded-full text-white"
                      style={{ background: option.color }}
                    >
                      {option.icon}
                    </motion.span>

                    <span className="whitespace-nowrap text-xs">
                      {option.name}
                    </span>
                  </a>
                ))}
              </div>
              {/* BOTTOM BRANDING */}
              <div className="border-t border-gray-200 px-6 py-6">
                <h3 className="text-sm font-semibold">
                  Join {profile.username} on Linkora
                </h3>

                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Get your own free Linkora. The only link you need to share
                  everything.
                </p>

                <div className="mt-4 flex gap-2">
                  <a
                    href="/auth/login"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                  >
                    Sign up free
                    <Circle size={8} fill="#C6FF35" stroke="#C6FF35" />
                  </a>

                  <a
                    href="/auth/register"
                    className="flex flex-1 items-center justify-center rounded-full border border-gray-200 px-4 py-3 text-center text-sm font-semibold transition hover:bg-gray-100"
                  >
                    Find out more
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default PublicProfile;
