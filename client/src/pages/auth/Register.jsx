
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Link2,
  CircleHelp,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  LockKeyhole,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { motion } from "motion/react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const password = watch("password", "");
  const username = watch("username", "");

  // Password strength
  const passwordStrength = [
    password.length >= 8,
    /[A-Z]/.test(password) || /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  const strengthLabel = ["Weak", "Fair", "Good", "Strong"][
    passwordStrength
  ];

  // Registration Handler
  const onSubmit = async (data) => {
    try {
      clearErrors("root");

      const payload = {
        name: data.name,
        email: data.email,
        username: data.username,
        password: data.password,
      };

      // Connect your registration API here.
      // await registerApi(payload);

      console.log("Registration:", payload);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 409) {
        setError("username", {
          type: "server",
          message: "Username or email already exists.",
        });
      } else {
        setError("root", {
          type: "server",
          message:
            error?.response?.data?.message ||
            "Something went wrong. Please try again.",
        });
      }
    }
  };

  // Social Login
  const handleGoogleSignup = () => {
    // window.location.href = `${API_URL}/auth/google`;
    console.log("Google signup");
  };

  const handleFacebookSignup = () => {
    // window.location.href = `${API_URL}/auth/facebook`;
    console.log("Facebook signup");
  };

  // Input styling
  const inputClass = (hasError) =>
    `h-9 w-full rounded-lg border bg-white px-3 text-xs outline-none transition placeholder:text-gray-400 focus:ring-2 ${
      hasError
        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
        : "border-gray-200 focus:border-black focus:ring-black/5"
    }`;

  return (
    <div className="flex min-h-dvh flex-col bg-[#fcfaff] text-black">

      {/* HEADER */}
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-gray-200/80 px-5 sm:px-8">

        <a href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-[#c6ff35]">
            <Link2 size={19} strokeWidth={3} />
          </span>

          <span className="text-base font-bold tracking-tight">
            Linkora
          </span>
        </a>

        <a
          href="#help"
          className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-black"
        >
          <CircleHelp size={13} />
          Help
        </a>
      </header>

      {/* MAIN */}
      <main
        className="relative flex flex-1 items-center justify-center overflow-y-auto px-3 py-5 sm:px-5"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.07) 0.8px, transparent 0.8px)",
          backgroundSize: "22px 22px",
        }}
      >

        {/* REGISTER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative my-auto w-full max-w-[650px] rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_5px_20px_rgba(0,0,0,0.04)] sm:p-7"
        >

          {/* BADGE */}
          <div className="absolute -top-2.5 right-5 rounded-full border border-gray-300 bg-white px-3 py-1 text-[9px] font-bold shadow-sm">
            ⭐ 120k+ creators
          </div>

          {/* TOP SECTION */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">

            <div>
              <div className="mb-2 inline-flex items-center gap-1 rounded-full border border-black bg-[#c6ff35] px-3 py-1 text-[9px] font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-black" />
                Free forever · No credit card
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-[30px]">
                Claim your link. Build your world.
              </h1>

              <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
                Join 120,000+ creators, builders, and studios.
              </p>
            </div>

            {/* LOGIN LINK INSIDE CARD */}
            <div className="rounded-lg bg-[#f7f5ff] px-3 py-2 text-[10px] sm:text-xs">
              <span className="text-gray-500">
                Already have an account?
              </span>
              <a
                href="http://localhost:5173/auth/login"
                className="ml-1 font-bold text-black underline underline-offset-2 hover:text-gray-500"
              >
                Log In
              </a>
            </div>

          </div>

          {/* USERNAME */}
          <div className="mb-4 rounded-lg border border-[#e8e3fa] bg-[#f5f2ff] p-3">

            <label className="mb-1.5 block text-[10px] font-semibold text-gray-600">
              Your unique Linkora handle
            </label>

            <div className="flex h-9 items-center overflow-hidden rounded-md border border-gray-200 bg-white px-2.5">

              <span className="shrink-0 text-[11px] text-gray-500">
                linkora.bio/
              </span>

              <input
                type="text"
                placeholder="yourname"
                aria-label="Username"
                className="min-w-0 flex-1 bg-transparent px-1 text-xs font-semibold outline-none"
                {...register("username", {
                  required: "Username is required.",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters required.",
                  },
                  maxLength: {
                    value: 20,
                    message: "Maximum 20 characters allowed.",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._]+$/,
                    message: "Only letters, numbers, dots and underscores.",
                  },
                })}
              />

              <span className="flex shrink-0 items-center gap-1 rounded-full border border-[#a3cf40] bg-[#f3ffda] px-2 py-1 text-[9px] text-green-800">
                <CheckCircle2 size={11} />
                Check availability
              </span>

            </div>

            {errors.username && (
              <p className="mt-1 text-[10px] text-red-500">
                {errors.username.message}
              </p>
            )}

            {!errors.username && username && (
              <p className="mt-1 text-[9px] text-gray-500">
                Username availability needs server verification.
              </p>
            )}

          </div>

          {/* SOCIAL SIGNUP */}
          <div className="grid grid-cols-2 gap-2">

            <button
              type="button"
              onClick={handleGoogleSignup}
              className="flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-200 text-[10px] font-semibold transition hover:bg-gray-50 sm:text-xs"
            >
              <FcGoogle size={17} />
              Sign up with Google
            </button>

            <button
              type="button"
              onClick={handleFacebookSignup}
              className="flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-200 text-[10px] font-semibold transition hover:bg-gray-50 sm:text-xs"
            >
              <FaFacebook size={16} className="text-[#1877F2]" />
              Sign up with Facebook
            </button>

          </div>

          {/* DIVIDER */}
          <div className="my-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-[9px] font-semibold text-gray-500">
              OR CONTINUE WITH EMAIL
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-3"
          >

            {/* TWO COLUMN FIELDS */}
            <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">

              {/* FULL NAME */}
              <div>
                <label className="mb-1 block text-[10px] font-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Maya Lin"
                  className={inputClass(errors.name)}
                  {...register("name", {
                    required: "Full name is required.",
                    minLength: {
                      value: 2,
                      message: "Name must contain at least 2 characters.",
                    },
                  })}
                />

                {errors.name && (
                  <p className="mt-1 text-[10px] text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-1 block text-[10px] font-semibold">
                  Work or Personal Email
                </label>

                <input
                  type="email"
                  autoComplete="email"
                  placeholder="maya@studio.design"
                  className={inputClass(errors.email)}
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address.",
                    },
                  })}
                />

                {errors.email && (
                  <p className="mt-1 text-[10px] text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="text-[10px] font-semibold">
                    Create Password
                  </label>

                  <span className={`text-[9px] font-semibold ${
                    passwordStrength === 3
                      ? "text-green-700"
                      : "text-gray-500"
                  }`}>
                    {password ? strengthLabel : ""}
                  </span>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Create password"
                    className={`${inputClass(errors.password)} pr-10`}
                    {...register("password", {
                      required: "Password is required.",
                      minLength: {
                        value: 8,
                        message: "Minimum 8 characters required.",
                      },
                      validate: (value) =>
                        /[0-9]/.test(value) ||
                        /[^A-Za-z0-9]/.test(value) ||
                        "Include a number or special symbol.",
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-gray-500"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                  </button>
                </div>

                {/* PASSWORD STRENGTH */}
                <div className="mt-1.5 grid grid-cols-3 gap-1">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className={`h-1 rounded-full ${
                        passwordStrength >= item
                          ? "bg-[#a3ed19]"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>

                {errors.password && (
                  <p className="mt-1 text-[10px] text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="mb-1 block text-[10px] font-semibold">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Confirm password"
                    className={`${inputClass(errors.confirmPassword)} pr-10`}
                    {...register("confirmPassword", {
                      required: "Please confirm your password.",
                      validate: (value) =>
                        value === password || "Passwords do not match.",
                    })}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-gray-500"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="mt-1 text-[10px] text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

            </div>

            <p className="text-[9px] text-gray-400">
              Password must be at least 8 characters with a symbol or number.
            </p>

            {/* TERMS */}
            <div>
              <label className="flex cursor-pointer items-start gap-2 text-[10px] leading-relaxed text-gray-600">
                <input
                  type="checkbox"
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-black"
                  {...register("agreeTerms", {
                    required: "Please accept the terms to continue.",
                  })}
                />

                <span>
                  By creating an account, I agree to Linkora's{" "}
                  <a href="/terms" className="font-semibold text-black underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="font-semibold text-black underline">
                    Privacy Policy
                  </a>.
                </span>
              </label>

              {errors.agreeTerms && (
                <p className="mt-1 text-[10px] text-red-500">
                  {errors.agreeTerms.message}
                </p>
              )}
            </div>

            {/* SERVER ERROR */}
            {errors.root && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[10px] text-red-600"
              >
                {errors.root.message}
              </div>
            )}

            {/* SUBMIT */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileTap={{ scale: 0.98 }}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-black text-xs font-bold text-white transition hover:bg-black/85 disabled:opacity-60"
            >
              {isSubmitting ? "Creating Account..." : "Create Your Free Page"}

              {!isSubmitting && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#c6ff35] text-black">
                  <ArrowRight size={12} />
                </span>
              )}
            </motion.button>

          </form>

        </motion.div>

      </main>

      {/* SECURITY BAR */}
      <div className="flex shrink-0 flex-wrap items-center justify-center gap-x-5 gap-y-1 border-t border-gray-100 bg-[#fcfaff] px-3 py-2 text-[9px] text-gray-500">

        <span className="flex items-center gap-1">
          <LockKeyhole size={11} className="text-green-700" />
          256-bit SSL Encrypted
        </span>

        <span className="flex items-center gap-1">
          <ShieldCheck size={11} className="text-green-700" />
          Secure & Protected
        </span>

        <span className="flex items-center gap-1">
          <Zap size={11} className="text-yellow-600" />
          99.99% Uptime
        </span>

      </div>

      {/* FOOTER */}
      <footer className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-gray-200/80 px-5 py-3 text-[9px] text-gray-600 sm:px-8">

        <p>
          <span className="font-bold text-black">Linkora</span>
          <span className="mx-2">/</span>
          © 2025 Linkora. All rights reserved. Encrypted & Secure.
        </p>

        <nav className="flex flex-wrap gap-x-4 gap-y-1">
          <a href="/terms" className="hover:text-black">
            Terms of Service
          </a>

          <a href="/privacy" className="hover:text-black">
            Privacy Policy
          </a>

          <a href="/security" className="hover:text-black">
            Security
          </a>

          <a href="/status" className="hover:text-black">
            ● Status
          </a>
        </nav>

      </footer>

    </div>
  );
};

export default Register;
