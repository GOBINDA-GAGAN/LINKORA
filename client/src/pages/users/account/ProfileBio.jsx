
import React, { useEffect, useState } from "react";
import {
  UserRound,
  Upload,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
  LoaderCircle,
  Sparkles,
  ChevronDown,
  Check,
  ShieldCheck,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

const STORAGE_KEY = "linkora-personal-profile";

const defaultFormData = {
  fullName: "",
  email: "",
  mobileNumber: "",
  pronouns: "",
  location: "",
  bio: "",
  showEmail: true,
  showMobile: false,
};

const pronounOptions = [
  { label: "He / Him", value: "He/Him" },
  { label: "She / Her", value: "She/Her" },
  { label: "They / Them", value: "They/Them" },
  { label: "Prefer not to say", value: "Prefer not to say" },
];

const inputClass =
  "h-10 w-full min-w-0 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/15";

const labelClass = "text-xs font-semibold text-foreground";

// Custom Pronouns Dropdown
const PronounsDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const selected = pronounOptions.find(
    (option) => option.value === value
  );

  return (
    <div className="relative space-y-2">
      <label className={labelClass}>Pronouns</label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className={`flex h-10 w-full items-center justify-between rounded-lg border bg-background px-3 text-sm transition-all ${
          open
            ? "border-primary ring-2 ring-primary/15"
            : "border-input hover:border-primary/40"
        }`}
      >
        <span
          className={
            selected ? "text-foreground" : "text-muted-foreground"
          }
        >
          {selected?.label || "Select pronouns"}
        </span>

        <ChevronDown
          size={16}
          className={`text-primary transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-xl"
          >
            {pronounOptions.map((option) => (
              <button
                type="button"
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs transition ${
                  value === option.value
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {option.label}

                {value === option.value && (
                  <Check size={14} className="text-primary" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Verification Badge
const VerificationBadge = ({ verified, onVerify }) => {
  return verified ? (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
      <CheckCircle2 size={12} />
      Verified
    </span>
  ) : (
    <button
      type="button"
      onClick={onVerify}
      className="shrink-0 rounded-full border border-primary/25 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
    >
      Verify now
    </button>
  );
};

// Reusable Toggle
const Toggle = ({ checked, onClick, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={onClick}
    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
      checked ? "bg-primary" : "bg-muted"
    }`}
  >
    <span
      className={`absolute top-1 h-4 w-4 rounded-full bg-primary-foreground shadow-sm transition-all ${
        checked ? "left-6" : "left-1"
      }`}
    />
  </button>
);

const ProfileBio = () => {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      return saved
        ? { ...defaultFormData, ...JSON.parse(saved) }
        : defaultFormData;
    } catch {
      return defaultFormData;
    }
  });

  const [avatar, setAvatar] = useState(null);
  const [saveStatus, setSaveStatus] = useState("saved");

  // Verification state should ultimately come from your backend.
  const [verification, setVerification] = useState({
    emailVerified: false,
    mobileVerified: false,
  });

  // Auto-save
  useEffect(() => {
    setSaveStatus("saving");

    const timeout = setTimeout(() => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(formData)
        );

        setSaveStatus("saved");
      } catch {
        setSaveStatus("error");
        toast.error("Unable to save profile changes.");
      }
    }, 700);

    return () => clearTimeout(timeout);
  }, [formData]);

  // Form change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset verification when contact details change.
    if (name === "email") {
      setVerification((prev) => ({
        ...prev,
        emailVerified: false,
      }));
    }

    if (name === "mobileNumber") {
      setVerification((prev) => ({
        ...prev,
        mobileVerified: false,
      }));
    }
  };

  // Toggle change
  const handleToggle = (name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Pronouns change
  const handlePronounsChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      pronouns: value,
    }));
  };

  // Avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      e.target.value = "";
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload JPG, PNG or WebP image.");
      e.target.value = "";
      return;
    }

    setAvatar((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return URL.createObjectURL(file);
    });

    toast.success("Profile image selected.");
  };

  // Remove avatar
  const handleRemoveAvatar = () => {
    if (avatar) URL.revokeObjectURL(avatar);
    setAvatar(null);
    toast.success("Profile image removed.");
  };

  // Email verification
  const handleVerifyEmail = () => {
    if (!formData.email.trim()) {
      toast.error("Please enter your email address first.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Connect your email OTP API here.
    toast.info("Email verification API is not connected yet.", {
      description: `Verification will be sent to ${formData.email}`,
    });
  };

  // Mobile verification
  const handleVerifyMobile = () => {
    if (!formData.mobileNumber.trim()) {
      toast.error("Please enter your mobile number first.");
      return;
    }

    const digits = formData.mobileNumber.replace(/\D/g, "");

    if (digits.length < 10 || digits.length > 15) {
      toast.error("Please enter a valid mobile number.");
      return;
    }

    // Connect your mobile OTP API here.
    toast.info("Mobile verification API is not connected yet.", {
      description: `Verification will be sent to ${formData.mobileNumber}`,
    });
  };

  return (
    <div className="w-full min-w-0  max-w-300 mx-auto">
      <section className="w-full overflow-visible rounded-xl border border-border bg-card">

        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-t-xl border-b border-border px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <UserRound size={19} />
            </div>

            <div className="min-w-0">
              <h1 className="text-base font-bold tracking-tight text-card-foreground sm:text-lg">
                Personal Information
              </h1>

              <p className="mt-0.5 text-xs text-muted-foreground">
                Manage your personal details and profile bio.
              </p>
            </div>
          </div>

          {/* Auto Save */}
          <div
            aria-live="polite"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5"
          >
            {saveStatus === "saving" ? (
              <>
                <LoaderCircle
                  size={13}
                  className="animate-spin text-primary"
                />
                <span className="text-[10px] font-semibold text-primary">
                  Saving...
                </span>
              </>
            ) : saveStatus === "saved" ? (
              <>
                <CheckCircle2 size={13} className="text-primary" />
                <span className="text-[10px] font-semibold text-primary">
                  Auto-saved
                </span>
              </>
            ) : (
              <span className="text-[10px] font-semibold text-destructive">
                Save failed
              </span>
            )}
          </div>
        </header>

        <div className="p-4 sm:p-6">

          {/* Avatar */}
          <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-muted/30 p-4">
            <div className="relative flex h-[68px] w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary/30 bg-background">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound
                  size={30}
                  className="text-muted-foreground"
                />
              )}

              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-card bg-primary" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-foreground">
                Profile Picture
              </h3>

              <p className="mt-1 text-[11px] text-muted-foreground">
                Upload a professional profile picture.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90">
                  <Upload size={13} />
                  Upload Image

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>

                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  disabled={!avatar}
                  className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Remove
                </button>
              </div>

              <p className="mt-2 text-[10px] text-muted-foreground">
                JPG, PNG or WebP. Maximum 5MB.
              </p>
            </div>
          </div>

          {/* Personal Details Heading */}
          <div className="mb-5 flex items-center gap-2 border-b border-border pb-3">
            <span className="h-5 w-1 rounded-full bg-primary" />

            <div>
              <h2 className="text-sm font-bold text-foreground">
                Personal Details
              </h2>

              <p className="text-[11px] text-muted-foreground">
                Update your contact information.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">

            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="fullName" className={labelClass}>
                Full Name
              </label>

              <input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                maxLength={80}
                autoComplete="name"
                className={inputClass}
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label htmlFor="email" className={labelClass}>
                  Email Address
                </label>

                <VerificationBadge
                  verified={verification.emailVerified}
                  onVerify={handleVerifyEmail}
                />
              </div>

              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className={`${inputClass} pl-9`}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Mobile */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label htmlFor="mobileNumber" className={labelClass}>
                  Mobile Number
                </label>

                <VerificationBadge
                  verified={verification.mobileVerified}
                  onVerify={handleVerifyMobile}
                />
              </div>

              <div className="relative">
                <Phone
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
                />

                <input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  autoComplete="tel"
                  className={`${inputClass} pl-9`}
                  placeholder="+91 00000 00000"
                />
              </div>
            </div>

            {/* Pronouns */}
            <PronounsDropdown
              value={formData.pronouns}
              onChange={handlePronounsChange}
            />

            {/* Location */}
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="location" className={labelClass}>
                Location
              </label>

              <div className="relative">
                <MapPin
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
                />

                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  autoComplete="address-level2"
                  className={`${inputClass} pl-9`}
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="bio" className={labelClass}>
                  Bio
                </label>

                <span className="text-[10px] tabular-nums text-muted-foreground">
                  {formData.bio.length}/160
                </span>
              </div>

              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                maxLength={160}
                rows={4}
                className={`${inputClass} h-auto resize-y py-3`}
                placeholder="Write something about yourself..."
              />
            </div>
          </div>

          {/* Contact Visibility */}
          <div className="mt-6 border-t border-border pt-5">
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-primary" />

                <h3 className="text-sm font-bold text-foreground">
                  Contact Visibility
                </h3>
              </div>

              <p className="mt-1 text-[11px] text-muted-foreground">
                Choose which contact details appear on your public profile.
              </p>
            </div>

            <div className="space-y-4">

              {/* Email Visibility */}
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground">
                    Show Email Address
                  </p>

                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Allow visitors to see your email.
                  </p>
                </div>

                <Toggle
                  checked={formData.showEmail}
                  onClick={() => handleToggle("showEmail")}
                  label="Show email address"
                />
              </div>

              {/* Mobile Visibility */}
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground">
                    Show Mobile Number
                  </p>

                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Allow visitors to see your mobile number.
                  </p>
                </div>

                <Toggle
                  checked={formData.showMobile}
                  onClick={() => handleToggle("showMobile")}
                  label="Show mobile number"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
            <p className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Sparkles size={12} className="text-primary" />
              Your changes are automatically saved.
            </p>

            <span className="text-[10px] font-semibold text-primary">
              No manual save required
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileBio;
