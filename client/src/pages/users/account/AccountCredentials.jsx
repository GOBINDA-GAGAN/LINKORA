
import React, { useState } from "react";
import {
  ShieldCheck,
  LockKeyhole,
  CheckCircle2,
  CircleCheck,
  Mail,
  Eye,
  EyeOff,
  Copy,
} from "lucide-react";

const AccountCredentials = () => {
  const [email, setEmail] = useState("maya@studio.design");
  const [editingEmail, setEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(email);

  const [editingPassword, setEditingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [twoFactor, setTwoFactor] = useState(true);
  const [showRecoveryCodes, setShowRecoveryCodes] = useState(false);

  const [connectedAccounts, setConnectedAccounts] = useState([
    { id: "google", name: "Google", short: "G", connected: true },
    { id: "github", name: "GitHub", short: "GH", connected: true },
    { id: "twitter", name: "X / Twitter", short: "X", connected: false },
  ]);

  const [message, setMessage] = useState("");

  const handleEmailSave = () => {
    if (!newEmail.trim()) {
      setMessage("Please enter an email address.");
      return;
    }

    setEmail(newEmail);
    setEditingEmail(false);
    setMessage("Email updated successfully.");
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();

    if (!passwords.current || !passwords.new || !passwords.confirm) {
      setMessage("Please fill in all password fields.");
      return;
    }

    if (passwords.new.length < 16) {
      setMessage("Use at least 16 characters for your new password.");
      return;
    }

    if (passwords.new !== passwords.confirm) {
      setMessage("Passwords do not match.");
      return;
    }

    setPasswords({ current: "", new: "", confirm: "" });
    setEditingPassword(false);
    setMessage("Password updated successfully.");
  };

  const toggleAccount = (id) => {
    setConnectedAccounts((accounts) =>
      accounts.map((account) =>
        account.id === id
          ? { ...account, connected: !account.connected }
          : account
      )
    );
  };

  const recoveryCodes = [
    "LK-82A9-1XQP",
    "LK-93B7-2YTR",
    "LK-74C6-3WPM",
    "LK-65D5-4ZVN",
    "LK-56E4-5KJL",
    "LK-47F3-6HGS",
    "LK-38G2-7DFA",
    "LK-29H1-8QWE",
  ];

  const copyCodes = () => {
    navigator.clipboard.writeText(recoveryCodes.join("\n"));
    setMessage("Recovery codes copied.");
  };

  return (
    <div className="mx-auto w-full max-w-300 rounded-xl border border-border bg-card p-4 sm:p-6">

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
        <div>
          <h1 className="text-lg font-semibold text-card-foreground">
            Account & Credentials
          </h1>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Control how you log in and authenticate access to your Linkora workspace.
          </p>
        </div>

        <span className="rounded-md bg-primary/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">
          Security Level: High
        </span>
      </div>

      {/* Feedback */}
      {message && (
        <div className="mt-3 flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs text-foreground">
          <span className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-primary" />
            {message}
          </span>
          <button
            onClick={() => setMessage("")}
            className="text-muted-foreground hover:text-foreground"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Primary Email */}
      <section className="flex flex-col justify-between gap-3 border-b border-border py-6 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-foreground">
              {email}
            </span>

            <CircleCheck size={14} className="text-primary" />

            <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
              Primary Email
            </span>
          </div>

          <p className="mt-1 text-xs text-muted-foreground">
            Used for billing receipts, account recovery alerts, and daily login tokens.
          </p>

          {editingEmail && (
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="h-9 w-full max-w-sm rounded-lg border border-input bg-background px-3 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring/20"
                placeholder="Enter new email"
              />
              <button
                onClick={handleEmailSave}
                className="h-9 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditingEmail(false);
                  setNewEmail(email);
                }}
                className="h-9 rounded-lg border border-border px-4 text-xs text-foreground"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => setEditingEmail(!editingEmail)}
          className="h-9 shrink-0 rounded-full border border-border px-4 text-xs font-medium text-foreground transition hover:bg-muted"
        >
          {editingEmail ? "Close" : "Change Email"}
        </button>
      </section>

      {/* Password */}
      <section className="flex flex-col justify-between gap-3 border-b border-border py-5 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-foreground">
              Password
            </span>
            <span className="text-[10px] text-muted-foreground">
              Last updated 2 months ago
            </span>
          </div>

          <p className="mt-1 text-xs text-muted-foreground">
            We recommend using a passphrase of at least 16 characters or a dedicated password manager.
          </p>

          {editingPassword && (
            <form onSubmit={handlePasswordSave} className="mt-4 max-w-lg space-y-3">
              {[
                { name: "current", label: "Current password" },
                { name: "new", label: "New password" },
                { name: "confirm", label: "Confirm new password" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    {field.label}
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwords[field.name]}
                    onChange={(e) =>
                      setPasswords((prev) => ({
                        ...prev,
                        [field.name]: e.target.value,
                      }))
                    }
                    className="h-9 w-full rounded-lg border border-input bg-background px-3 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring/20"
                    placeholder={field.label}
                  />
                </div>
              ))}

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex h-8 items-center gap-1.5 text-xs text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  {showPassword ? "Hide passwords" : "Show passwords"}
                </button>

                <button
                  type="submit"
                  className="h-9 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground"
                >
                  Save Password
                </button>

                <button
                  type="button"
                  onClick={() => setEditingPassword(false)}
                  className="h-9 rounded-lg border border-border px-4 text-xs text-foreground"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <button
          onClick={() => setEditingPassword(!editingPassword)}
          className="h-9 shrink-0 rounded-full border border-border px-4 text-xs font-medium text-foreground transition hover:bg-muted"
        >
          {editingPassword ? "Close" : "Update Password"}
        </button>
      </section>

      {/* Two Factor Authentication */}
      <section className="my-5 rounded-xl border border-border bg-primary/5 p-3 sm:p-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <LockKeyhole size={17} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-sm font-semibold text-foreground">
                  Two-Factor Authentication (2FA)
                </h2>

                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                    twoFactor
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {twoFactor ? "Enabled" : "Disabled"}
                </span>
              </div>

              <p className="mt-1 max-w-lg text-xs leading-relaxed text-muted-foreground">
                {twoFactor
                  ? "Authenticator app active (1Password / Google Authenticator). 8 backup recovery codes remaining."
                  : "Two-factor authentication is currently disabled. Enable it for additional account protection."}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
            {twoFactor && (
              <button
                onClick={() => setShowRecoveryCodes(!showRecoveryCodes)}
                className="h-9 rounded-full border border-border bg-background px-4 text-xs font-medium text-foreground hover:bg-muted"
              >
                View Codes
              </button>
            )}

            <button
              onClick={() => setTwoFactor(!twoFactor)}
              className="h-9 rounded-full border border-border bg-background px-4 text-xs font-medium text-destructive transition hover:bg-muted"
            >
              {twoFactor ? "Configure" : "Enable 2FA"}
            </button>
          </div>
        </div>

        {showRecoveryCodes && twoFactor && (
          <div className="mt-4 border-t border-border pt-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <h3 className="text-xs font-semibold text-foreground">
                  Recovery Codes
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Store these codes somewhere safe.
                </p>
              </div>

              <button
                onClick={copyCodes}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-foreground hover:bg-muted"
              >
                <Copy size={13} />
                Copy codes
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {recoveryCodes.map((code) => (
                <div
                  key={code}
                  className="rounded-md border border-border bg-background px-3 py-2 text-center font-mono text-xs text-foreground"
                >
                  {code}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Connected Accounts */}
      <section className="border-t border-border pt-5">
        <h2 className="mb-3 text-sm font-semibold text-foreground">
          Connected Accounts
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {connectedAccounts.map((account) => (
            <div
              key={account.id}
              className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-border bg-background p-3"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-foreground">
                  {account.short}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-foreground">
                    {account.name}
                  </p>

                  <p
                    className={`mt-0.5 text-[10px] ${
                      account.connected
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {account.connected ? "Connected" : "Not connected"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleAccount(account.id)}
                className={`shrink-0 text-[11px] font-medium transition hover:underline ${
                  account.connected
                    ? "text-muted-foreground"
                    : "text-foreground"
                }`}
              >
                {account.connected ? "Disconnect" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AccountCredentials;
