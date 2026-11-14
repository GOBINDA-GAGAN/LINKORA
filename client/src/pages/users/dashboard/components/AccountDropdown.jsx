
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Plus,
  UserRound,
  X,
} from "lucide-react";

const initialAccounts = [
  {
    id: 1,
    name: "Trust me I am an Engineer",
    username: "GobindaGagan",
    image: "",
    plan: "Free",
  },
  {
    id: 2,
    name: "@gobindagagandey",
    username: "gobindagagandey",
    image: "",
    plan: "Free",
  },
  {
    id: 3,
    name: "@gobindagagandey7",
    username: "gobindagagandey7",
    image: "",
    plan: "Free",
  },
  {
    id: 4,
    name: "@xyzjjjhgfdssdfg",
    username: "xyzjjjhgfdssdfg",
    image: "",
    plan: "Free",
  },
];

function AccountAvatar({ account, large = false }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E8EAE7] ${
        large ? "h-9 w-9" : "h-11 w-11"
      }`}
    >
      {account.image ? (
        <img
          src={account.image}
          alt={account.name}
          className="h-full w-full object-cover"
        />
      ) : (
        <UserRound
          size={large ? 23 : 29}
          strokeWidth={1.5}
          className="text-white"
          fill="#A6AAA3"
        />
      )}
    </div>
  );
}

export default function AccountDropdown() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeAccount, setActiveAccount] = useState(initialAccounts[0]);

  const [accounts] = useState(initialAccounts);

  // Filter accounts
  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) =>
      `${account.name} ${account.username}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [accounts, search]);

  // Close dropdown and clear search
  const closeDropdown = () => {
    setOpen(false);
    setSearch("");
  };

  // Close on Escape and outside click
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeDropdown();
      }
    };

    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [open]);

  // Select account
  const selectAccount = (account) => {
    setActiveAccount(account);
    closeDropdown();
  };

  // Create new account
  const createAccount = () => {
    closeDropdown();
    navigate("/new-profile/your-username");
  };

  return (
    <div ref={dropdownRef} className="relative z-50">

      {/* Account Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex h-11 max-w-[280px] items-center gap-2 rounded-full bg-card px-2.5 transition hover:bg-[#E8EAE8]"
      >
        <AccountAvatar account={activeAccount} large />

        <span className="max-w-[190px] truncate text-sm font-semibold text-[#242424]">
          {activeAccount.name}
        </span>

        <ChevronDown
          size={17}
          className={`shrink-0 text-[#454545] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-[calc(100%+9px)] z-50 w-[320px] -translate-x-1/2 overflow-hidden rounded-[30px] border border-[#E8E8E8] bg-white shadow-[0_8px_35px_rgba(0,0,0,0.12)] sm:w-[340px]"
          >

            {/* Search */}
            <div className="px-3 pb-2 pt-3">
              <div className="flex h-11 items-center gap-3 rounded-full border border-[#E9E9E9] px-3.5">
                <Search size={17} className="text-[#666]" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                  autoComplete="off"
                  className="w-full bg-transparent text-sm text-[#222] outline-none placeholder:text-[#777]"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                  >
                    <X size={15} className="text-gray-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Account List */}
            <div className="max-h-[300px] overflow-y-auto px-3 pb-2">
              {filteredAccounts.map((account) => {
                const isActive = activeAccount.id === account.id;

                return (
                  <button
                    type="button"
                    key={account.id}
                    onClick={() => selectAccount(account)}
                    className="flex w-full items-center gap-3 rounded-xl px-1.5 py-2 text-left transition hover:bg-[#F7F7F7]"
                  >
                    {/* Avatar */}
                    <div
                      className={`rounded-full p-[2px] ${
                        isActive
                          ? "border-2 border-[#252525]"
                          : "border-2 border-transparent"
                      }`}
                    >
                      <AccountAvatar account={account} />
                    </div>

                    {/* Account Details */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#252525]">
                        {account.name}
                      </p>

                      <p className="truncate text-xs text-[#777]">
                        linkora.com/{account.username}
                      </p>
                    </div>

                    {/* Plan */}
                    <span className="shrink-0 rounded-full border border-[#E6E6E6] px-2 py-0.5 text-[10px] font-medium text-[#555]">
                      {account.plan}
                    </span>
                  </button>
                );
              })}

              {filteredAccounts.length === 0 && (
                <div className="py-8 text-center text-sm text-gray-500">
                  No accounts found
                </div>
              )}
            </div>

            {/* Create New Account */}
            <button
              type="button"
              onClick={createAccount}
              className="flex w-full items-center gap-3 border-b border-[#EEEEEE] px-4 py-3.5 text-left transition hover:bg-[#F8F8F8]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F1F0]">
                <Plus size={23} strokeWidth={1.7} />
              </div>

              <span className="text-sm font-semibold text-[#292929]">
                New Linkora
              </span>
            </button>

            {/* Promotional Section */}
            <button
              type="button"
              onClick={() => {
                closeDropdown();
                navigate("/home/upgrade");
              }}
              className="flex w-full items-center gap-3 bg-[#FAFAFA] px-4 py-4 text-left transition hover:bg-[#F3F3F3]"
            >
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white">
                <div className="flex h-10 w-8 flex-col gap-1 rounded-md border border-[#DADADA] bg-white p-1 shadow-sm">
                  <div className="h-1.5 w-full rounded bg-[#C6FF35]" />
                  <div className="h-1 w-full rounded bg-gray-200" />
                  <div className="h-1 w-4/5 rounded bg-gray-200" />
                  <div className="mt-1 h-2 w-full rounded bg-[#7165FF]/20" />
                </div>

                <span className="absolute -left-1 top-0 rounded bg-[#315D27] px-1 text-[8px] font-bold text-white">
                  NEW
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#292929]">
                  A faster way to switch!
                </p>

                <p className="mt-0.5 text-[11px] leading-[1.4] text-[#777]">
                  Try Workspaces, our new way to manage multiple Linkoras.
                </p>
              </div>

              <ChevronRight
                size={18}
                className="shrink-0 text-[#777]"
              />
            </button>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
