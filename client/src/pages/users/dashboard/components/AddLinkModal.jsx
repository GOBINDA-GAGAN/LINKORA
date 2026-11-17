import React, { useState } from "react";
import {
  X,
  Plus,
  Search,
  Link2,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AddLinkModal = ({
  isOpen,
  onClose,
  links = [],
  onAdd,
}) => {
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  if (!isOpen) return null;

  const resetModal = () => {
    setView("list");
    setSearch("");
    setTitle("");
    setUrl("");
    onClose();
  };

  const filteredLinks = links.filter((link) =>
    link.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !url.trim()) return;

    let finalUrl = url.trim();

    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`;
    }

    onAdd({
      id: crypto.randomUUID(),
      title: title.trim(),
      url: finalUrl,
      createdAt: new Date().toISOString(),
    });

    resetModal();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) resetModal();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className="flex max-h-[85vh] w-full max-w-[520px] flex-col overflow-hidden rounded-[28px] border border-border bg-popover text-popover-foreground shadow-2xl"
      >
        {/* HEADER */}
        <div className="relative flex h-16 shrink-0 items-center justify-between border-b border-border px-5">

          {view === "create" ? (
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setView("list")}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-muted transition hover:bg-accent"
            >
              <ArrowLeft size={19} />
            </motion.button>
          ) : (
            <div className="w-9" />
          )}

          <h2 className="absolute left-1/2 -translate-x-1/2 font-headline text-lg font-bold">
            {view === "list" ? "Add a link" : "Create new link"}
          </h2>

          <motion.button
            whileHover={{ scale: 1.08, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={resetModal}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted transition hover:bg-accent"
          >
            <X size={20} />
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {view === "list" ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.2 }}
              className="flex min-h-0 flex-1 flex-col"
            >
              {/* SEARCH */}
              <div className="px-5 pt-5">
                <div className="flex h-12 items-center gap-3 rounded-full border border-border bg-background px-4 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20">
                  <Search size={19} className="text-muted-foreground" />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search existing links"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              {/* ADD NEW LINK */}
              <div className="px-5 pt-5">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setView("create")}
                  className="flex w-full items-center gap-3 rounded-xl border border-dashed border-border p-4 text-left transition hover:bg-accent/30"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
                    <Plus size={22} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold">
                      Add new link
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Create a new link for your profile
                    </p>
                  </div>
                </motion.button>
              </div>

              {/* EXISTING LINKS */}
              <div className="min-h-0 flex-1 overflow-y-auto p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Existing links
                </p>

                {filteredLinks.length > 0 ? (
                  <div className="space-y-2">
                    <AnimatePresence>
                      {filteredLinks.map((link) => (
                        <motion.div
                          key={link.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -15 }}
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-3 rounded-xl border border-border p-3 transition hover:bg-accent/30"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            <Link2 size={19} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold">
                              {link.title}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {link.url}
                            </p>
                          </div>

                          <motion.a
                            whileHover={{ scale: 1.12 }}
                            whileTap={{ scale: 0.9 }}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open link"
                            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            <ExternalLink size={17} />
                          </motion.a>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="py-10 text-center"
                  >
                    <Link2
                      size={28}
                      className="mx-auto mb-3 text-muted-foreground"
                    />
                    <p className="text-sm font-medium">
                      No existing links found
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Create your first link to get started.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            /* CREATE FORM */
            <motion.form
              key="create"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-5 p-5"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Link title
                </label>

                <input
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="My portfolio"
                  className="field-input"
                  required
                  maxLength={80}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Destination URL
                </label>

                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="field-input"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <Plus size={18} />
                Save link
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AddLinkModal;