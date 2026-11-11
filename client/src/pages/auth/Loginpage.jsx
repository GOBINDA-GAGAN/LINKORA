
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Link2,
  CircleHelp,
  Eye,
  EyeOff,
  LockKeyhole,
  Zap,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { motion } from "motion/react";
import useAuth from "../../hook/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login, loading } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Login Handler
  const onSubmit = async (data) => {
    try {
      clearErrors("root");

      await login(data);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        setError("root", {
          type: "server",
          message: "Invalid email or password.",
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
            "Something went wrong. Please try again.",
        });
      }
    }
  };

  // Social Login Handlers
  const handleGoogleLogin = () => {
    // Redirect to your Google OAuth endpoint.
    console.log("Google Login");
  };

  const handleFacebookLogin = () => {
    // Redirect to your Facebook OAuth endpoint.
    console.log("Facebook Login");
  };

  // Input Styling
  const inputClass = (hasError) =>
    `h-11 w-full rounded-lg border bg-background px-3 text-xs text-foreground outline-none transition placeholder:text-muted-foreground focus:ring-2 ${
      hasError
        ? "border-destructive focus:border-destructive focus:ring-destructive/10"
        : "border-border focus:border-primary focus:ring-ring/10"
    }`;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">

      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-border px-5 sm:px-8">
        <a href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Link2 size={19} strokeWidth={3} />
          </span>

          <span className="text-base font-bold tracking-tight">
            Linkora
          </span>
        </a>

        <a
          href="#help"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <CircleHelp size={13} />
          Help
        </a>
      </header>

      {/* Main */}
      <main
        className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-10 sm:py-12"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--border) 0.8px, transparent 0.8px)",
          backgroundSize: "22px 22px",
        }}
      >

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-[460px] rounded-2xl border border-border bg-card p-5 shadow-lg sm:p-7"
        >

          {/* Badge */}
          <div className="absolute -top-2.5 right-5 rounded-full border border-primary/20 bg-secondary px-3 py-1 text-[9px] font-black uppercase text-secondary-foreground shadow-sm">
            Welcome back ✦
          </div>

          {/* Heading */}
          <div className="mb-5">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-[28px]">
              Log in to your internet.
            </h1>

            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Enter your credentials to access your Linkora dashboard and links.
            </p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-card text-xs font-semibold text-foreground transition hover:border-ring hover:bg-muted active:scale-[0.98]"
            >
              <FcGoogle size={18} />
              <span>Google</span>
            </button>

            {/* Facebook */}
            <button
              type="button"
              onClick={handleFacebookLogin}
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-card text-xs font-semibold text-foreground transition
               hover:border-ring hover:bg-muted active:scale-[0.98]"
            >
              <FaFacebook size={17} className="text-[#1877F2]" />
              <span>Facebook</span>
            </button>

          </div>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />

            <span className="text-[9px] font-semibold uppercase text-muted-foreground">
              Or continue with email
            </span>

            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-[11px] font-semibold"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="alex@example.com"
                aria-invalid={!!errors.email}
                className={inputClass(errors.email)}
                {...register("email", {
                  required: "Email address is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address.",
                  },
                  maxLength: {
                    value: 254,
                    message: "Email address is too long.",
                  },
                })}
              />

              {errors.email && (
                <p className="mt-1.5 text-[10px] text-destructive" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-[11px] font-semibold"
                >
                  Password
                </label>

                <a
                  href="/auth/forgot-password"
                  className="text-[10px] text-muted-foreground hover:text-foreground hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  aria-invalid={!!errors.password}
                  className={`${inputClass(errors.password)} pr-11`}
                  {...register("password", {
                    required: "Password is required.",
                    minLength: {
                      value: 8,
                      message: "Password must contain at least 8 characters.",
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1.5 text-[10px] text-destructive" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <label className="flex cursor-pointer items-center gap-2 text-[10px] text-muted-foreground">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-3.5 w-3.5 accent-primary"
              />
              Remember me for 30 days
            </label>

            {/* Server Error */}
            {errors.root && (
              <div
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-xs text-destructive"
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
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary text-xs font-bold text-primary-foreground transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}

              {!loading && (
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              )}
            </motion.button>

          </form>

          {/* Sign Up */}
          <div className="mt-5 border-t border-border pt-4 text-center">
            <p className="text-[10px] text-muted-foreground">
              Don't have a Linkora page?{" "}
              <a
                href="/auth/register"
                className="font-semibold text-foreground hover:underline"
              >
                Claim your handle & sign up →
              </a>
            </p>
          </div>

        </motion.div>

        {/* Security Indicators */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-5 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <LockKeyhole size={11} className="text-brand-secondary" />
            End-to-end encrypted
          </span>

          <span className="flex items-center gap-1.5">
            <Zap size={11} className="text-brand-tertiary" />
            99.9% uptime
          </span>
        </div>

      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-4 border-t border-border bg-background px-5 py-5 text-[10px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© 2025 Linkora. All rights reserved. Encrypted & Secure.</p>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href="#terms" className="hover:text-foreground">
            Terms of Service
          </a>

          <a href="#privacy" className="hover:text-foreground">
            Privacy Policy
          </a>

          <a href="#security" className="hover:text-foreground">
            Security Assurance
          </a>

          <a href="#status" className="hover:text-foreground">
            Status
          </a>
        </nav>
      </footer>

    </div>
  );
};

export default Login;
