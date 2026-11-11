
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { motion } from "motion/react";
import {
  Link2,
  CircleHelp,
  ArrowLeft,
  ShieldCheck,
  LockKeyhole,
  Timer,
  KeyRound,
  Smartphone,
  RefreshCw,
} from "lucide-react";

const OTP_LENGTH = 6;
const INITIAL_TIME = 42;

const OtpVerification = () => {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [resending, setResending] = useState(false);
  const [alternativeMethod, setAlternativeMethod] = useState(false);

  const inputRefs = useRef([]);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const otp = watch("otp");

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format timer
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  // Handle individual digit changes
  const handleOtpChange = (value, index, onChange) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const updatedOtp = otp.split("");
    updatedOtp[index] = digit;

    const newOtp = Array.from(
      { length: OTP_LENGTH },
      (_, i) => updatedOtp[i] || ""
    ).join("");

    onChange(newOtp);
    clearErrors(["otp", "root"]);

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const updatedOtp = otp.split("");
        updatedOtp[index] = "";

        setValue("otp", updatedOtp.join(""), {
          shouldValidate: false,
        });
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle OTP paste
  const handlePaste = (e, onChange) => {
    e.preventDefault();

    const pastedOtp = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pastedOtp) return;

    onChange(pastedOtp);
    clearErrors(["otp", "root"]);

    const nextIndex = Math.min(pastedOtp.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  // Verify OTP
  const onSubmit = async (data) => {
    try {
      clearErrors("root");

      // Connect your OTP verification API here.
      // Example:
      // await verifyOtpApi({
      //   email: "alex@example.com",
      //   otp: data.otp,
      // });

      console.log("OTP submitted:", data.otp);

    } catch (error) {
      const status = error?.response?.status;

      if (status === 400 || status === 401) {
        setError("root", {
          type: "server",
          message: "Invalid or expired verification code.",
        });
      } else if (status === 429) {
        setError("root", {
          type: "server",
          message: "Too many attempts. Please try again later.",
        });
      } else {
        setError("root", {
          type: "server",
          message:
            error?.response?.data?.message ||
            "Verification failed. Please try again.",
        });
      }
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (timeLeft > 0 || resending) return;

    try {
      setResending(true);
      clearErrors("root");

      // Connect your resend OTP API here.
      // await resendOtpApi({ email: "alex@example.com" });

      setValue("otp", "");
      setTimeLeft(INITIAL_TIME);
      inputRefs.current[0]?.focus();

    } catch (error) {
      setError("root", {
        type: "server",
        message:
          error?.response?.data?.message ||
          "Unable to resend code. Please try again.",
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fcfaff] text-black">

      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-gray-200/80 px-5 sm:px-8">

        <a href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
            <Link2 size={19} strokeWidth={3} />
          </span>

          <span className="text-base font-bold tracking-tight">
            Linkora
          </span>
        </a>

        <a
          href="#help"
          className="flex items-center gap-1.5 text-xs text-gray-700 transition hover:text-black"
        >
          <CircleHelp size={13} />
          Help
        </a>
      </header>

      {/* Main */}
      <main
        className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.08) 0.8px, transparent 0.8px)",
          backgroundSize: "22px 22px",
        }}
      >
        {/* Purple Side Accent */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-violet-500" />

        <div className="w-full max-w-[460px]">

          {/* Back to Login */}
          <a
            href="/auth/login"
            className="mb-4 inline-flex items-center gap-1.5 text-[10px] font-medium text-gray-700 transition hover:text-black"
          >
            <ArrowLeft size={12} />
            Back to login
          </a>

          {/* OTP Card */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl border border-gray-200/80 bg-white px-5 py-7 shadow-[0_8px_25px_rgba(0,0,0,0.04)] sm:px-8"
          >

            {/* Security Badge */}
            <div className="absolute -top-2.5 right-0 flex items-center gap-1 rounded-bl-lg border border-black/20 bg-[#c6ff35] px-3 py-1 text-[9px] font-black uppercase shadow-sm">
              <ShieldCheck size={10} />
              2FA Security
            </div>

            {/* Security Icon */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-violet-100 bg-violet-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black bg-[#c6ff35]">
                <ShieldCheck size={25} strokeWidth={2.5} />
              </div>

              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-black text-[#c6ff35]">
                <LockKeyhole size={10} />
              </span>
            </motion.div>

            {/* Heading */}
            <div className="text-center">
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Verify your identity
              </h1>

              <p className="mx-auto mt-2 max-w-sm text-xs leading-[1.7] text-gray-500">
                We sent a 6-digit verification code to
                <br />
                <span className="font-semibold text-black">
                  alex****@domain.com
                </span>
                . Enter the code below to securely sign in.
              </p>
            </div>

            {/* OTP Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="mt-6"
            >
              <label className="mb-3 block text-center text-[10px] font-semibold">
                Authentication Code
              </label>

              <Controller
                name="otp"
                control={control}
                rules={{
                  validate: (value) =>
                    value.length === OTP_LENGTH &&
                    /^\d{6}$/.test(value)
                      ? true
                      : "Please enter the complete 6-digit verification code.",
                }}
                render={({ field }) => (
                  <div className="flex justify-center gap-2 sm:gap-3">
                    {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        autoComplete={index === 0 ? "one-time-code" : "off"}
                        maxLength={1}
                        value={field.value[index] || ""}
                        onChange={(e) =>
                          handleOtpChange(
                            e.target.value,
                            index,
                            field.onChange
                          )
                        }
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={(e) => handlePaste(e, field.onChange)}
                        onFocus={(e) => e.target.select()}
                        aria-label={`Verification digit ${index + 1}`}
                        className={`h-11 w-10 rounded-lg border-2 bg-white text-center text-lg font-semibold outline-none transition sm:h-12 sm:w-11 ${
                          errors.otp
                            ? "border-red-400 focus:border-red-500"
                            : field.value[index]
                              ? "border-black"
                              : "border-gray-200 focus:border-black"
                        }`}
                      />
                    ))}
                  </div>
                )}
              />

              {errors.otp && (
                <p
                  role="alert"
                  className="mt-2 text-center text-[10px] text-red-600"
                >
                  {errors.otp.message}
                </p>
              )}

              {/* Resend Code */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5 text-[10px]">
                <span className="text-gray-600">
                  Didn't receive code?
                </span>

                {timeLeft > 0 ? (
                  <span className="inline-flex items-center gap-1 font-semibold text-black">
                    <Timer size={11} />
                    Resend in {formatTime(timeLeft)}
                  </span>
                ) : (
                  <button
                    type="button"
                    disabled={resending}
                    onClick={handleResend}
                    className="inline-flex items-center gap-1 font-semibold text-black underline underline-offset-2 disabled:opacity-50"
                  >
                    <RefreshCw
                      size={11}
                      className={resending ? "animate-spin" : ""}
                    />
                    {resending ? "Sending..." : "Resend code"}
                  </button>
                )}
              </div>

              {/* Server Error */}
              {errors.root && (
                <div
                  role="alert"
                  className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-center text-xs text-red-600"
                >
                  {errors.root.message}
                </div>
              )}

              {/* Verify Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.015 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-black text-xs font-bold text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <LockKeyhole size={13} />
                    Verify & Continue
                  </>
                )}
              </motion.button>
            </form>

            {/* Alternative Verification */}
            <div className="mt-5 border-t border-gray-200 pt-4 text-center">
              <button
                type="button"
                onClick={() => setAlternativeMethod((prev) => !prev)}
                className="inline-flex items-center justify-center gap-1.5 text-[10px] text-gray-700 transition hover:text-black"
              >
                <KeyRound size={12} />
                Try another way (Use recovery code or authenticator app)
              </button>

              {alternativeMethod && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2"
                >
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 p-3 text-[10px] font-medium transition hover:bg-gray-50"
                  >
                    <KeyRound size={13} />
                    Recovery code
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 p-3 text-[10px] font-medium transition hover:bg-gray-50"
                  >
                    <Smartphone size={13} />
                    Authenticator app
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Security Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-5 flex items-center justify-center gap-2 text-[9px] font-semibold uppercase tracking-wide text-gray-600"
          >
            <ShieldCheck size={11} className="text-green-700" />
            Protected by Linkora Safeguard 2FA
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-4 border-t border-gray-200/70 bg-[#fcfaff] px-5 py-5 text-[10px] text-gray-600 sm:flex-row sm:items-center sm:justify-between sm:px-8">
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

export default OtpVerification;
