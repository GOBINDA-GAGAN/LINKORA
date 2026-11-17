
import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  Plus,
  ListChecks,
  Archive,
  Link2,
  MessageCircle,
  AtSign,
  Globe,
  Mail,
} from "lucide-react";

import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaReact,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import { user } from "./data/user";

import AddLinkModal from "./components/AddLinkModal";
import SocialIconsModal from "./components/SocialIconsModal";

// DEFAULT SOCIAL PROFILES
const initialSocials = [
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

// SOCIAL ICON MAPPING
const socialIconMap = {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  WhatsApp: MessageCircle,
  "WhatsApp Channel": MessageCircle,
  Threads: AtSign,
  FaYoutube,
  FaFacebook,
  Email: Mail,
  Website: Globe,

  // React
  React: FaReact,
};

const MyLinkora = () => {
  const [activeTab, setActiveTab] = useState("links");

  const [links, setLinks] = useState([]);
  const [collections, setCollections] = useState([]);

  const [socials, setSocials] = useState(initialSocials);
  const [socialPosition, setSocialPosition] = useState("top");

  const [isAddLinkOpen, setIsAddLinkOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);

  // ADD LINK
  const handleAddLink = (newLink) => {
    setLinks((prev) => [...prev, newLink]);
  };

  // DELETE LINK
  const handleDeleteLink = (id) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  // SAVE SOCIAL SETTINGS
  const handleSaveSocials = ({ socials, position }) => {
    setSocials(socials);
    setSocialPosition(position);
  };

  // ADD COLLECTION
  const handleAddCollection = () => {
    const name = window.prompt("Enter collection name:");

    if (!name?.trim()) return;

    setCollections((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: name.trim(),
      },
    ]);
  };

  // ENABLED SOCIALS
  const enabledSocials = socials.filter(
    (social) => social.enabled
  );

  // SOCIAL PROFILE URL
  const getSocialUrl = (item) => {
    if (item.name === "Email") {
      return item.value.startsWith("mailto:")
        ? item.value
        : `mailto:${item.value}`;
    }

    if (item.name === "WhatsApp") {
      const number = item.value.replace(/\D/g, "");
      return `https://wa.me/${number}`;
    }

    if (/^https?:\/\//i.test(item.value)) {
      return item.value;
    }

    return `https://${item.value.replace(/^@/, "")}`;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-h-screen w-full bg-background p-3 sm:p-5 md:p-8"
      >
        {/* MAIN CONTAINER */}

        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mx-auto min-h-[calc(100vh-24px)] w-full rounded-t-[24px] border border-border bg-card px-5 py-7 shadow-sm sm:px-8 md:px-12"
        >
          {/* HEADER */}

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between"
          >
            <h1 className="font-headline text-xl font-bold tracking-tight text-card-foreground">
              Content
            </h1>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                title="List view"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition hover:bg-accent"
              >
                <ListChecks size={17} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                title="Archive"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition hover:bg-accent"
              >
                <Archive size={17} />
              </motion.button>
            </div>
          </motion.div>

          {/* PROFILE */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mt-6 flex items-start gap-4"
          >
            <motion.img
              src={user.profileImage}
              alt={user.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="h-16 w-16 shrink-0 rounded-full border border-border object-cover"
            />

            <div className="min-w-0 flex-1">
              <h2 className="truncate text-base font-semibold text-card-foreground">
                {user.title}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {user.bio}
              </p>

              {/* SOCIAL ICONS */}

              <div
                className={`mt-2 flex flex-wrap items-center gap-4 ${
                  socialPosition === "bottom"
                    ? "flex-row-reverse justify-end"
                    : ""
                }`}
              >
                {enabledSocials.map((social) => {
                  const Icon =
                    socialIconMap[social.name] || Link2;

                  return (
                    <motion.a
                      key={social.id}
                      href={getSocialUrl(social)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="text-card-foreground transition hover:scale-110 hover:text-muted-foreground"
                    >
                      <Icon size={21} />
                    </motion.a>
                  );
                })}

                {/* MANAGE SOCIAL ICONS */}

                <motion.button
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSocialModalOpen(true)}
                  title="Manage social icons"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-foreground transition hover:bg-accent"
                >
                  <Plus size={17} />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* TABS */}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8 flex items-center gap-7 border-b border-border"
          >
            {["links", "shop"].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileTap={{ scale: 0.96 }}
                className={`relative px-3 pb-3 text-sm font-medium capitalize transition ${
                  activeTab === tab
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}

                {activeTab === tab && (
                  <motion.span
                    layoutId="active-tab"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                    className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-primary"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* ACTION BUTTONS */}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mt-8 flex gap-2 sm:gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={handleAddCollection}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-muted text-sm font-semibold text-foreground transition hover:bg-accent"
            >
              <Link2 size={17} />
              Add collection
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsAddLinkOpen(true)}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <Plus size={21} />
              Add
            </motion.button>
          </motion.div>

          {/* CONTENT AREA */}

          <div className="mt-12">
            {activeTab === "links" ? (
              links.length === 0 && collections.length === 0 ? (
                /* EMPTY STATE */

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative mb-5 flex h-20 w-32 items-center justify-center"
                  >
                    <div className="absolute left-9 top-0 flex h-12 w-20 rotate-[10deg] items-center justify-center rounded-lg border-2 border-border bg-muted">
                      <Link2
                        size={19}
                        className="text-muted-foreground"
                      />
                    </div>

                    <div className="absolute left-5 top-3 flex h-12 w-20 rotate-[5deg] items-center justify-center rounded-lg border-2 border-border bg-card">
                      <Link2
                        size={19}
                        className="text-muted-foreground"
                      />
                    </div>

                    <div className="absolute left-0 top-6 flex h-12 w-20 items-center justify-center rounded-lg border-2 border-border bg-card shadow-sm">
                      <Link2
                        size={19}
                        className="text-muted-foreground"
                      />
                    </div>
                  </motion.div>

                  <h3 className="font-headline text-base font-semibold">
                    No links yet
                  </h3>

                  <p className="mt-1 max-w-[250px] text-sm leading-5 text-muted-foreground">
                    Show the world who you are.
                    <br />
                    Add links to get started.
                  </p>
                </motion.div>
              ) : (
                /* LINKS AND COLLECTIONS */

                <div className="space-y-3">
                  {collections.map((collection) => (
                    <motion.div
                      key={collection.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-xl border border-border bg-card p-4"
                    >
                      <div className="flex items-center gap-2">
                        <Link2 size={17} />

                        <h3 className="text-sm font-semibold">
                          {collection.name}
                        </h3>
                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Empty collection
                      </p>
                    </motion.div>
                  ))}

                  {links.map((link) => (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition hover:bg-accent/30"
                    >
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold">
                          {link.title}
                        </h3>

                        <p className="truncate text-xs text-muted-foreground">
                          {link.url}
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteLink(link.id)}
                        className="ml-3 rounded-lg bg-muted px-3 py-2 text-xs text-destructive transition hover:bg-destructive/10"
                      >
                        Delete
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )
            ) : (
              /* SHOP EMPTY STATE */

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.05 }}
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted"
                >
                  <Archive
                    size={30}
                    className="text-muted-foreground"
                  />
                </motion.div>

                <h3 className="font-headline text-base font-semibold">
                  No products yet
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Add products to start building your store.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* ADD LINK MODAL */}

      <AddLinkModal
        isOpen={isAddLinkOpen}
        onClose={() => setIsAddLinkOpen(false)}
        links={links}
        onAdd={handleAddLink}
      />

      {/* SOCIAL ICONS MODAL */}

      <SocialIconsModal
        isOpen={isSocialModalOpen}
        onClose={() => setIsSocialModalOpen(false)}
        initialSocials={socials}
        initialPosition={socialPosition}
        onSave={handleSaveSocials}
      />
    </>
  );
};

export default MyLinkora;
