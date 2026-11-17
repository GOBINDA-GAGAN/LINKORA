
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  X,
  Plus,
  ArrowLeft,
  Search,
  Pencil,
  GripVertical,
  ChartNoAxesCombined,
  ChevronRight,
  Mail,
  MessageCircle,
  AtSign,
  Globe,
  Link2,
} from "lucide-react";

import {
  FaWhatsapp,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaSnapchatGhost,
  FaAmazon,
  FaGooglePlay,
  FaApple,
  FaTiktok,
  FaYoutube,
  FaReact,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

// SOCIAL PLATFORM CATALOG
const platformCatalog = [
  {
    name: "Instagram",
    icon: FaInstagram,
    placeholder: "instagram.com/username",
  },
  {
    name: "Email",
    icon: Mail,
    placeholder: "hello@example.com",
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    placeholder: "facebook.com/username",
  },
  {
    name: "TikTok",
    icon: FaTiktok,
    placeholder: "tiktok.com/@username",
  },
  {
    name: "WhatsApp Channel",
    icon: FaWhatsapp,
    placeholder: "WhatsApp channel URL",
  },
  {
    name: "Snapchat",
    icon: FaSnapchatGhost,
    placeholder: "snapchat.com/add/username",
  },
  {
    name: "Airchat",
    icon: MessageCircle,
    placeholder: "Your Airchat URL",
  },
  {
    name: "Amazon",
    icon: FaAmazon,
    placeholder: "Your Amazon profile URL",
  },
  {
    name: "Android Play Store",
    icon: FaGooglePlay,
    placeholder: "Google Play Store URL",
  },
  {
    name: "Apple App Store",
    icon: FaApple,
    placeholder: "Apple App Store URL",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    placeholder: "youtube.com/@username",
  },
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    placeholder: "Phone number or WhatsApp URL",
  },
  {
    name: "X (formerly Twitter)",
    icon: FaTwitter,
    placeholder: "x.com/username",
  },
  {
    name: "Threads",
    icon: AtSign,
    placeholder: "threads.net/@username",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    placeholder: "github.com/username",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    placeholder: "linkedin.com/in/username",
  },
  {
    name: "React",
    icon: FaReact,
    placeholder: "react.dev or your React project URL",
  },
  {
    name: "Website",
    icon: Globe,
    placeholder: "https://example.com",
  },
];

// DEFAULT SOCIAL PROFILES
const defaultSocials = [
  {
    id: "social-1",
    name: "YouTube",
    value: "youtube.com/@TechnoCoderX",
    enabled: false,
  },
  {
    id: "social-2",
    name: "WhatsApp",
    value: "+9556185722",
    enabled: true,
  },
  {
    id: "social-3",
    name: "X (formerly Twitter)",
    value: "@_GobindaGagan_",
    enabled: true,
  },
  {
    id: "social-4",
    name: "Threads",
    value: "xyx",
    enabled: true,
  },
];

const SocialIconsModal = ({
  isOpen,
  onClose,
  initialSocials = defaultSocials,
  initialPosition = "top",
  onSave,
}) => {
  const [view, setView] = useState("manage");

  const [socials, setSocials] = useState(initialSocials);
  const [position, setPosition] = useState(initialPosition);

  const [search, setSearch] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [profileValue, setProfileValue] = useState("");
  const [editingId, setEditingId] = useState(null);

  // RESET WHEN MODAL OPENS
  useEffect(() => {
    if (isOpen) {
      setSocials(initialSocials);
      setPosition(initialPosition);
      setView("manage");
      setSearch("");
      setSelectedPlatform(null);
      setProfileValue("");
      setEditingId(null);
    }
  }, [isOpen, initialSocials, initialPosition]);

  if (!isOpen) return null;

  // GET PLATFORM ICON
  const getPlatform = (name) =>
    platformCatalog.find((item) => item.name === name) || {
      icon: Link2,
      placeholder: "Enter profile URL",
    };

  // CLOSE MODAL
  const resetAndClose = (save = true) => {
    if (save) {
      onSave?.({ socials, position });
    }

    setView("manage");
    setSearch("");
    setSelectedPlatform(null);
    setProfileValue("");
    setEditingId(null);

    onClose();
  };

  // TOGGLE SOCIAL
  const toggleSocial = (id) => {
    setSocials((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, enabled: !item.enabled }
          : item
      )
    );
  };

  // EDIT SOCIAL
  const openEdit = (social) => {
    setSelectedPlatform(social.name);
    setProfileValue(social.value);
    setEditingId(social.id);
    setView("edit");
  };

  // SELECT NEW PLATFORM
  const selectPlatform = (platform) => {
    setSelectedPlatform(platform.name);
    setProfileValue("");
    setEditingId(null);
    setView("edit");
  };

  // SAVE SOCIAL
  const saveSocial = (e) => {
    e.preventDefault();

    if (!profileValue.trim()) return;

    if (editingId !== null) {
      setSocials((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                value: profileValue.trim(),
              }
            : item
        )
      );
    } else {
      setSocials((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: selectedPlatform,
          value: profileValue.trim(),
          enabled: true,
        },
      ]);
    }

    setView("manage");
    setSelectedPlatform(null);
    setProfileValue("");
    setEditingId(null);
  };

  // SEARCH PLATFORMS
  const filteredPlatforms = platformCatalog.filter((platform) =>
    platform.name.toLowerCase().includes(search.toLowerCase())
  );

  // BACKDROP CLOSE
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) {
      resetAndClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm"
      onMouseDown={handleBackdrop}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className="relative flex max-h-[90vh] w-full max-w-[510px] flex-col overflow-hidden rounded-[30px] border border-border bg-popover text-popover-foreground shadow-2xl"
      >
        {/* HEADER */}

        <div className="relative flex h-[70px] shrink-0 items-center justify-center px-5">
          {view !== "manage" && (
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setView("manage")}
              className="absolute left-5 flex h-9 w-9 items-center justify-center rounded-full bg-muted transition hover:bg-accent"
            >
              <ArrowLeft size={19} />
            </motion.button>
          )}

          <h2 className="font-headline text-xl font-bold">
            {view === "manage"
              ? "Social icons"
              : view === "add"
              ? "Add social icon"
              : editingId !== null
              ? "Edit social icon"
              : selectedPlatform}
          </h2>

          <motion.button
            whileHover={{ scale: 1.08, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => resetAndClose()}
            className="absolute right-5 flex h-10 w-10 items-center justify-center rounded-full bg-muted transition hover:bg-accent"
          >
            <X size={21} />
          </motion.button>
        </div>

        {/* MANAGE SOCIAL ICONS */}

        <AnimatePresence mode="wait">
          {view === "manage" && (
            <motion.div
              key="manage"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.2 }}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">
                <div className="mb-6">
                  <h3 className="text-base font-semibold">
                    Show visitors where to find you
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Add your social profiles, email and more as linked icons on
                    your Linkora.
                  </p>
                </div>

                {/* SOCIAL LIST */}

                <div className="space-y-2">
                  {socials.map((social) => {
                    const Icon = getPlatform(social.name).icon;

                    return (
                      <motion.div
                        key={social.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -1 }}
                        transition={{ duration: 0.2 }}
                        className="flex min-h-[58px] items-center gap-2 rounded-[19px] border border-border bg-card px-3 py-2"
                      >
                        <GripVertical
                          size={16}
                          className="shrink-0 text-muted-foreground"
                        />

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
                          <Icon size={21} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">
                            {social.name}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            {social.value}
                          </p>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openEdit(social)}
                          title="Edit profile"
                          className="shrink-0 rounded-md p-1.5 hover:bg-muted"
                        >
                          <Pencil size={16} />
                        </motion.button>

                        {/* ENABLE / DISABLE */}

                        <button
                          role="switch"
                          aria-checked={social.enabled}
                          aria-label={`Toggle ${social.name}`}
                          onClick={() => toggleSocial(social.id)}
                          className={`relative h-6 w-12 shrink-0 rounded-full transition-colors ${
                            social.enabled
                              ? "bg-[#20ae56]"
                              : "bg-muted-foreground/30"
                          }`}
                        >
                          <motion.span
                            animate={{
                              x: social.enabled ? 26 : 2,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                            className="absolute left-0 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm"
                          />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>

                {/* SOCIAL POSITION */}

                <div className="mt-6">
                  <h3 className="text-sm font-semibold">
                    Social icon position
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Display icons at the top or bottom of your profile
                  </p>

                  <div className="mt-4 space-y-3">
                    {["top", "bottom"].map((item) => (
                      <label
                        key={item}
                        className="flex cursor-pointer items-center gap-3 text-sm"
                      >
                        <input
                          type="radio"
                          name="social-position"
                          value={item}
                          checked={position === item}
                          onChange={() => setPosition(item)}
                          className="h-5 w-5 accent-primary"
                        />

                        <span className="capitalize">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* FOOTER */}

              <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-border bg-popover p-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => resetAndClose()}
                  className="flex h-10 items-center gap-2 rounded-full border border-border px-4 text-sm font-semibold transition hover:bg-muted"
                >
                  <ChartNoAxesCombined size={17} />
                  See insights
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setView("add");
                    setSearch("");
                  }}
                  className="flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  <Plus size={19} />
                  Add social icon
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ADD SOCIAL PLATFORM */}

          {view === "add" && (
            <motion.div
              key="add"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="px-5 pb-3 pt-2">
                <div className="flex h-12 items-center gap-3 rounded-full border border-border bg-background px-4 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20">
                  <Search size={19} className="text-muted-foreground" />

                  <input
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">
                {filteredPlatforms.map((platform) => {
                  const Icon = platform.icon;

                  return (
                    <motion.button
                      key={platform.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => selectPlatform(platform)}
                      className="flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left transition hover:bg-muted"
                    >
                      <Icon size={22} className="shrink-0" />

                      <span className="flex-1 text-sm font-semibold">
                        {platform.name}
                      </span>

                      <ChevronRight
                        size={18}
                        className="text-muted-foreground"
                      />
                    </motion.button>
                  );
                })}

                {filteredPlatforms.length === 0 && (
                  <p className="py-10 text-center text-sm text-muted-foreground">
                    No platforms found.
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* ADD / EDIT SOCIAL PROFILE */}

          {view === "edit" && (
            <motion.form
              key="edit"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              onSubmit={saveSocial}
              className="flex-1 space-y-5 overflow-y-auto p-5"
            >
              <div className="flex items-center gap-3 rounded-xl bg-muted p-4">
                {(() => {
                  const Icon = getPlatform(selectedPlatform).icon;
                  return <Icon size={26} />;
                })()}

                <div>
                  <p className="text-sm font-semibold">
                    {selectedPlatform}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Add your profile details
                  </p>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Profile URL or username
                </label>

                <input
                  autoFocus
                  value={profileValue}
                  onChange={(e) => setProfileValue(e.target.value)}
                  placeholder={getPlatform(selectedPlatform).placeholder}
                  className="field-input"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="h-12 w-full rounded-full bg-primary text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Save social icon
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default SocialIconsModal;
