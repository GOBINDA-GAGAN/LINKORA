import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link2, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

const RedirectPopup = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => Math.max(prev - 1, 0));
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/home", { replace: true });
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-[3px] px-4">

      {/* Modal */}
      <div className="redirect-popup relative w-full max-w-[390px] overflow-hidden rounded-xl border border-border bg-card p-7 shadow-2xl">

        {/* Welcome Badge */}
        <div className="absolute -top-0 right-5 -translate-y-0 rounded-b-md bg-secondary px-4 py-1.5 text-[10px] font-bold tracking-wide text-secondary-foreground shadow-sm">
          WELCOME BACK <span className="ml-1">✦</span>
        </div>

        {/* Icon */}
        <div className="mb-5 mt-5 flex justify-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Link2 size={29} strokeWidth={2.5} />

            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-card bg-secondary">
              <CheckCircle2 size={14} className="text-secondary-foreground" />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h2 className="font-headline text-2xl font-bold tracking-tight text-foreground">
            You're already signed in!
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Your account is authenticated. We're taking you back to your
            Linkora dashboard.
          </p>
        </div>

        {/* Countdown */}
        <div className="my-7 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-muted font-headline text-2xl font-bold text-foreground">
            {count}
          </div>

          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">
              Redirecting...
            </p>
            <p className="text-xs text-muted-foreground">
              Please wait a moment
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="redirect-progress h-full rounded-full bg-secondary" />
        </div>

        {/* Destination */}
        <div className="mt-5 flex items-center justify-between rounded-md border border-border bg-muted/50 px-3 py-3">
          <div className="flex items-center gap-2">
            <ShieldCheck size={17} className="text-brand-neutral" />
            <span className="text-xs font-medium text-muted-foreground">
              Secure destination
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
            /home
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-primary text-primary-foreground">
            <Link2 size={12} />
          </div>
          <span className="text-xs font-bold tracking-tight text-foreground">
            Linkora
          </span>
          <span className="text-xs text-muted-foreground">
            · Secure & encrypted
          </span>
        </div>

      </div>
    </div>
  );
};

export default RedirectPopup;