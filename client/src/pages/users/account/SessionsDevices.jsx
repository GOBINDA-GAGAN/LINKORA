
import React, { useState } from "react";
import {
  Monitor,
  Smartphone,
  Tablet,
  MapPin,
  Clock,
  ShieldCheck,
  LogOut,
  MoreHorizontal,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Laptop,
  RefreshCw,
} from "lucide-react";

const SessionsDevices = () => {
  const [sessions, setSessions] = useState([
    {
      id: "1",
      device: "Windows PC",
      browser: "Chrome 157",
      os: "Windows 11",
      location: "Bengaluru, India",
      ip: "103.XX.XX.21",
      lastActive: "Active now",
      current: true,
      type: "desktop",
    },
    {
      id: "2",
      device: "iPhone 15",
      browser: "Safari",
      os: "iOS 18",
      location: "Bengaluru, India",
      ip: "103.XX.XX.45",
      lastActive: "2 hours ago",
      current: false,
      type: "mobile",
    },
    {
      id: "3",
      device: "MacBook Air",
      browser: "Chrome",
      os: "macOS",
      location: "Bhubaneswar, India",
      ip: "49.XX.XX.18",
      lastActive: "Yesterday",
      current: false,
      type: "laptop",
    },
  ]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");

  const getDeviceIcon = (type) => {
    switch (type) {
      case "mobile":
        return Smartphone;
      case "tablet":
        return Tablet;
      case "laptop":
        return Laptop;
      default:
        return Monitor;
    }
  };

  const revokeSession = (id) => {
    const session = sessions.find((item) => item.id === id);

    if (session?.current) return;

    setSessions((prev) => prev.filter((item) => item.id !== id));
    setMessage("Device session revoked successfully.");
  };

  const revokeAllOtherSessions = () => {
    setSessions((prev) => prev.filter((item) => item.current));
    setShowConfirm(false);
    setMessage("All other device sessions have been signed out.");
  };

  const currentSession = sessions.find((item) => item.current);
  const otherSessions = sessions.filter((item) => !item.current);

  return (
    <div className="mx-auto w-full max-w-300">

      {/* SINGLE BACKGROUND CARD */}
      <section className="w-full overflow-hidden rounded-xl border border-border bg-card">

        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-5 sm:px-6">
          <div>
            <h1 className="text-lg font-semibold text-card-foreground">
              Sessions & Devices
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Monitor devices that are currently signed in to your Linkora account.
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-primary">
            <ShieldCheck size={13} />
            Device Security
          </span>
        </header>

        <div className="px-5 sm:px-6">

          {/* Feedback */}
          {message && (
            <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/50 px-3 py-2.5">
              <p className="flex items-center gap-2 text-xs text-foreground">
                <CheckCircle2 size={14} className="text-primary" />
                {message}
              </p>
              <button
                onClick={() => setMessage("")}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Current Device */}
          <section className="border-b border-border py-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  Current Device
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  This is the device you're currently using.
                </p>
              </div>

              <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-bold text-primary">
                THIS DEVICE
              </span>
            </div>

            {currentSession ? (
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground">
                  {React.createElement(getDeviceIcon(currentSession.type), {
                    size: 21,
                  })}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">
                      {currentSession.device}
                    </p>
                    <span className="flex items-center gap-1 text-[10px] font-medium text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Active now
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {currentSession.browser} · {currentSession.os}
                  </p>

                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin size={11} />
                      {currentSession.location}
                    </span>
                    <span>IP: {currentSession.ip}</span>
                  </div>
                </div>

                <span className="text-[10px] text-muted-foreground">
                  Current session
                </span>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                Current session information is unavailable.
              </p>
            )}
          </section>

          {/* Other Sessions */}
          <section className="py-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  Other Active Sessions
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {otherSessions.length} other device
                  {otherSessions.length !== 1 ? "s" : ""} signed in.
                </p>
              </div>

              {otherSessions.length > 0 && (
                <button
                  onClick={() => setShowConfirm(true)}
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-destructive/30 px-3 text-xs font-medium text-destructive transition hover:bg-destructive/10"
                >
                  <LogOut size={14} />
                  Sign out all
                </button>
              )}
            </div>

            {otherSessions.length > 0 ? (
              <div>
                {otherSessions.map((session) => {
                  const DeviceIcon = getDeviceIcon(session.type);

                  return (
                    <div
                      key={session.id}
                      className="flex flex-col gap-3 border-b border-border py-4 last:border-b-0 sm:flex-row sm:items-center"
                    >
                      {/* Device */}
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                          <DeviceIcon size={19} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {session.device}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {session.browser} · {session.os}
                          </p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="min-w-0 sm:w-48">
                        <p className="flex items-center gap-1.5 text-xs text-foreground">
                          <MapPin
                            size={13}
                            className="shrink-0 text-muted-foreground"
                          />
                          {session.location}
                        </p>
                        <p className="mt-1 text-[10px] text-muted-foreground">
                          IP: {session.ip}
                        </p>
                      </div>

                      {/* Activity */}
                      <div className="sm:w-32">
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock size={13} />
                          {session.lastActive}
                        </p>
                      </div>

                      {/* Revoke */}
                      <button
                        onClick={() => revokeSession(session.id)}
                        className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 self-start rounded-lg px-3 text-xs font-medium text-destructive transition hover:bg-destructive/10 sm:self-center"
                      >
                        <LogOut size={13} />
                        Sign out
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center">
                <CheckCircle2
                  size={25}
                  className="mx-auto text-primary"
                />
                <p className="mt-2 text-sm font-medium text-foreground">
                  No other active sessions
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Your account is only signed in on this device.
                </p>
              </div>
            )}
          </section>

          {/* Security Information */}
          <section className="border-t border-border py-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <ShieldCheck size={18} />
              </div>

              <div>
                <h3 className="text-xs font-semibold text-foreground">
                  Keep your account secure
                </h3>
                <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted-foreground">
                  If you notice a device or location you don't recognize,
                  sign it out immediately and update your password. Never
                  share your login credentials with anyone.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border py-4">
            <p className="text-[11px] text-muted-foreground">
              Session information is displayed for account security.
            </p>

            <button
              onClick={() => setMessage("Session list refreshed in this preview.")}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:opacity-80"
            >
              <RefreshCw size={13} />
              Refresh sessions
            </button>
          </footer>
        </div>
      </section>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-border bg-card p-5 shadow-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle size={20} />
            </div>

            <h3 className="mt-4 text-base font-semibold text-foreground">
              Sign out all other devices?
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              All other devices will be signed out. Your current device will
              remain connected.
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="h-9 rounded-lg border border-border px-4 text-xs font-medium text-foreground hover:bg-muted"
              >
                Cancel
              </button>

              <button
                onClick={revokeAllOtherSessions}
                className="h-9 rounded-lg bg-destructive px-4 text-xs font-semibold text-destructive-foreground hover:opacity-90"
              >
                Sign out devices
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionsDevices;
