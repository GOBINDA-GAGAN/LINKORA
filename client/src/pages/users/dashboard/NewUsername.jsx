import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Link2,
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  ExternalLink,
  Globe,
} from "lucide-react";
import rightImage from "../../../assets/images/newaccount/linkora-onboarding.png";

const NewUsername = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
    },
  });

  const username = watch("username");

  const suggestions =
    username?.length >= 3
      ? [`${username}2`, `${username}official`, `${username}_dev`]
      : [];

  const onSubmit = (data) => {
    navigate(
      `/new-profile/details?username=${encodeURIComponent(data.username)}`,
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="grid min-h-screen lg:grid-cols-[65%_35%]">
        {/* =====================================
            LEFT SIDE
        ===================================== */}

        <section className="flex min-h-screen flex-col bg-white">
          {/* HEADER */}
          <header className="flex h-[76px] shrink-0 items-center justify-between px-6 sm:px-10 lg:px-12">
            <Link to="/dashboard" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#171717] text-white">
                <Link2 size={19} />
              </div>

              <span className="font-headline text-xl font-bold tracking-tight text-[#171717]">
                Linkora
                <span className="ml-1 text-[#c6ff35]">✳</span>
              </span>
            </Link>

            <button
              onClick={() => navigate("/home")}
              className="flex items-center gap-2 text-sm font-medium text-[#777780] transition hover:text-[#171717]"
            >
              <ArrowLeft size={16} />
              Back to Home
            </button>
          </header>

          {/* FORM CONTENT */}
          <main className="flex flex-1 items-center justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-[530px]"
            >
              {/* STEP */}
              <div className="mb-8 flex items-center gap-2">
                <span className="h-1.5 w-9 rounded-full bg-[#c6ff35]" />
                <span className="h-1.5 w-9 rounded-full bg-[#e9e8f0]" />
                <span className="h-1.5 w-9 rounded-full bg-[#e9e8f0]" />

                <span className="ml-2 text-xs text-[#777780]">
                  Step 01 / 03
                </span>
              </div>

              {/* HEADING */}
              <div className="mb-9">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7165ff]">
                  Workspace onboarding
                </p>

                <h1 className="font-headline text-3xl font-bold tracking-tight text-[#171717] sm:text-[38px]">
                  Claim your Linkora
                </h1>

                <p className="mt-3 max-w-[450px] text-sm leading-6 text-[#777780]">
                  Your identity, your content, your audience. Everything starts
                  with your unique username.
                </p>
              </div>

              <div className="mb-8 h-px bg-[#e9e8f0]" />

              {/* FORM */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className="mb-3 block text-xs font-semibold text-[#171717]">
                  Public profile handle
                </label>

                {/* USERNAME INPUT */}
                <div
                  className={`flex h-[54px] items-center rounded-xl border bg-[#f7f6fa] px-4 transition-all focus-within:ring-2 focus-within:ring-[#7165ff]/20 ${
                    errors.username
                      ? "border-red-500"
                      : "border-[#e9e8f0] focus-within:border-[#7165ff]"
                  }`}
                >
                  <span className="shrink-0 text-xs font-medium text-[#777780]">
                    linkora.bio/
                  </span>

                  <input
                    type="text"
                    placeholder="yourusername"
                    autoComplete="off"
                    maxLength={20}
                    className="h-full min-w-0 flex-1 bg-transparent px-2 text-sm font-semibold text-[#171717] outline-none placeholder:font-normal placeholder:text-[#aaa]"
                    {...register("username", {
                      required: "Username is required",
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters required",
                      },
                      maxLength: {
                        value: 20,
                        message: "Maximum 20 characters allowed",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message:
                          "Only letters, numbers and underscores allowed",
                      },
                    })}
                  />

                  {isValid && (
                    <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#c6ff35]/30 px-2.5 py-1">
                      <Check size={12} className="text-[#3c6810]" />
                      <span className="text-[10px] font-semibold text-[#3c6810]">
                        Valid
                      </span>
                    </div>
                  )}
                </div>

                {errors.username && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.username.message}
                  </p>
                )}

                {/* SUGGESTIONS */}
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="text-xs font-semibold text-[#171717]">
                    Suggestions:
                  </span>

                  {suggestions.length > 0 ? (
                    suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => {
                          // Set the selected suggestion through the input
                          document
                            .querySelector('input[name="username"]')
                            ?.focus();
                        }}
                        className="text-xs font-medium text-[#7165ff] hover:underline"
                      >
                        {suggestion}
                      </button>
                    ))
                  ) : (
                    <span className="text-xs text-[#999]">
                      Your username suggestions will appear here.
                    </span>
                  )}
                </div>

                <p className="mt-3 flex items-center gap-1.5 text-[11px] text-[#777780]">
                  <Globe size={13} />
                  Custom domains can be connected later in settings.
                </p>

                {/* PROFILE PREVIEW */}
                <div className="mt-8 rounded-xl border border-[#e9e8f0] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#777780]">
                      Your public profile
                    </span>

                    <ExternalLink size={14} className="text-[#999]" />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#171717] text-[#c6ff35]">
                      <Link2 size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#171717]">
                        linkora.bio/{username || "yourusername"}
                      </p>
                      <p className="mt-1 text-[10px] text-[#999]">
                        Your unique Linkora address
                      </p>
                    </div>
                  </div>
                </div>

                {/* CONTINUE */}
                <motion.button
                  type="submit"
                  disabled={!isValid}
                  whileHover={isValid ? { scale: 1.01 } : {}}
                  whileTap={isValid ? { scale: 0.98 } : {}}
                  className="mt-7 flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#171717] text-sm font-semibold text-white transition hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continue
                  <ArrowRight size={17} />
                </motion.button>
              </form>

              <p className="mt-6 text-center text-[11px] text-[#999]">
                You can customize your profile after claiming your username.
              </p>
            </motion.div>
          </main>

          {/* FOOTER */}
          <footer className="flex items-center justify-between border-t border-[#e9e8f0] px-6 py-4 sm:px-12">
            <span className="text-[10px] text-[#999]">© 2026 Linkora</span>
            <span className="text-[10px] text-[#999]">Made for creators.</span>
          </footer>
        </section>

        {/* =====================================
            RIGHT SIDE - VISUAL PANEL
        ===================================== */}

        <aside className="relative hidden min-h-screen overflow-hidden bg-[#171717] lg:block">
          {/* BACKGROUND IMAGE */}
          <img
            src={rightImage}
            alt="Linkora creator workspace"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>
      </div>
    </div>
  );
};

export default NewUsername;
