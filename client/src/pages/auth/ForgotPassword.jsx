
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import {
  Link2,
  ArrowLeft,
  ArrowRight,
  CircleHelp,
  KeyRound,
  Mail,
  LockKeyhole,
  ShieldCheck,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

const ForgotPassword = () => {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      identifier: "",
    },
  });

  // Send Recovery Link
  const onSubmit = async (data) => {
    try {
      clearErrors("root");
      setSuccess(false);

      // Connect your forgot-password API here.
      // Example:
      // await forgotPasswordApi({
      //   identifier: data.identifier.trim(),
      // });

      console.log("Recovery requested:", data.identifier);

      setSuccess(true);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 429) {
        setError("root", {
          type: "server",
          message: "Too many requests. Please try again later.",
        });
      } else {
        setError("root", {
          type: "server",
          message:
            error?.response?.data?.message ||
            "Unable to send recovery link. Please try again.",
        });
      }
    }
  };

  const identifierValidation = (value) => {
    const input = value.trim();

    if (!input) {
      return "Email address or username is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleRegex = /^[a-zA-Z0-9._-]{3,30}$/;

    if (!emailRegex.test(input) && !handleRegex.test(input)) {
      return "Enter a valid email address or username.";
    }

    return true;
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fcfaff] text-black">

      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-gray-200/70 px-5 sm:px-8">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-[#c6ff35]">
            <Link2 size={19} strokeWidth={3} />
          </span>

          <span className="text-base font-bold tracking-tight">
            Linkora
          </span>
        </a>

        {/* Header Actions */}
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="hidden items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[10px] font-medium transition hover:border-black/40 sm:flex"
          >
            <ArrowLeft size={11} />
            Back to Home
          </a>

          <a
            href="#help"
            className="flex items-center gap-1.5 text-xs text-gray-700 transition hover:text-black"
          >
            <CircleHelp size={13} />
            Help
          </a>
        </div>
      </header>

      {/* Main */}
      <main
        className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-12"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.08) 0.8px, transparent 0.8px)",
          backgroundSize: "22px 22px",
        }}
      >
        {/* Purple side accent */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-violet-500" />

        {/* Reset Password Card */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full max-w-[460px] rounded-2xl border border-gray-200/80 bg-white px-6 py-7 shadow-[0_8px_25px_rgba(0,0,0,0.04)] sm:px-8"
        >

          {/* Secure Badge */}
          <motion.div
            initial={{ opacity: 0, rotate: -8, y: -8 }}
            animate={{ opacity: 1, rotate: 2, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="absolute -top-2.5 right-5 flex items-center gap-1 rounded-full border border-black/20 bg-[#c6ff35] px-3 py-1 text-[9px] font-black uppercase shadow-sm"
          >
            <LockKeyhole size={10} />
            Secure session
          </motion.div>

          {/* Icon */}
          <div className="mb-4 flex justify-center">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50">
              <KeyRound size={27} strokeWidth={2.2} />

              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#c6ff35]">
                <LockKeyhole size={12} />
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-[28px]">
              Reset your password
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-xs leading-[1.7] text-gray-500">
              Forgot your master password? No worries. Enter your email or
              your Linkora handle, and we will send you a magic recovery link.
            </p>
          </div>

          {/* Success State */}
          {success ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-3 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
                <CheckCircle2 size={26} />
              </div>

              <h2 className="text-base font-semibold">
                Check your inbox!
              </h2>

              <p className="mt-2 text-xs leading-relaxed text-gray-500">
                If an account exists with those details, a recovery link
                will be sent to the registered email address.
              </p>

              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-5 text-xs font-semibold text-black underline underline-offset-4"
              >
                Try another email or handle
              </button>
            </motion.div>
          ) : (
            <>
              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-4"
              >

                {/* Email / Username */}
                <div>
                  <label
                    htmlFor="identifier"
                    className="mb-2 block text-[11px] font-semibold"
                  >
                    Email or linkora.bio/handle
                  </label>

                  <div className="relative">
                    <Mail
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                    />

                    <input
                      id="identifier"
                      type="text"
                      autoComplete="username"
                      placeholder="alex@linkora.bio or alexsmith"
                      aria-invalid={!!errors.identifier}
                      className={`h-11 w-full rounded-lg border bg-white pl-9 pr-3 text-xs outline-none transition placeholder:text-gray-400 focus:ring-2 ${
                        errors.identifier
                          ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-black focus:ring-black/5"
                      }`}
                      {...register("identifier", {
                        validate: identifierValidation,
                        maxLength: {
                          value: 254,
                          message: "Input is too long.",
                        },
                      })}
                    />
                  </div>

                  {errors.identifier && (
                    <p
                      role="alert"
                      className="mt-1.5 text-[10px] text-red-600"
                    >
                      {errors.identifier.message}
                    </p>
                  )}
                </div>

                {/* Server Error */}
                {errors.root && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-600"
                  >
                    {errors.root.message}
                  </div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.015 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-black text-xs font-bold text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending recovery link...
                    </>
                  ) : (
                    <>
                      Send Recovery Link
                      <ArrowRight size={15} />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Tip */}
              <div className="mt-5 flex gap-3 rounded-lg border border-violet-100 bg-violet-50 px-3 py-3">
                <Lightbulb
                  size={15}
                  className="mt-0.5 shrink-0 text-amber-500"
                />

                <p className="text-[10px] leading-relaxed text-gray-600">
                  <span className="font-semibold text-black">Tip:</span>{" "}
                  Check your spam or promotions folder if you don't see the
                  email within 2 minutes.
                </p>
              </div>
            </>
          )}

          {/* Back to Login */}
          <div className="mt-6 border-t border-gray-200 pt-4 text-center">
            <p className="text-[11px] text-gray-600">
              Remembered your password?{" "}
              <a
                href="/auth/login"
                className="font-semibold text-black transition hover:underline"
              >
                Back to Log In →
              </a>
            </p>
          </div>
        </motion.div>

        {/* Security Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-5 flex items-center justify-center gap-2 text-[9px] font-semibold uppercase tracking-wide text-gray-600"
        >
          <ShieldCheck size={11} />
          256-bit TLS end-to-end encryption
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-4 bg-[#fcfaff] px-5 py-5 text-[10px] text-gray-600 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c6ff35]" />
          © 2025 Linkora. All rights reserved. Encrypted & Secure.
        </p>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href="#terms" className="transition hover:text-black">
            Terms of Service
          </a>
          <a href="#privacy" className="transition hover:text-black">
            Privacy Policy
          </a>
          <a href="#security" className="transition hover:text-black">
            Security Assurance
          </a>
          <a href="#status" className="flex items-center gap-1 transition hover:text-black">
            Status
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default ForgotPassword;
