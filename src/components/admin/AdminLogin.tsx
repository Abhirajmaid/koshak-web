"use client";

import { useState } from "react";
import { loginAdmin, createAdminAccount } from "@/services/auth";

interface AdminLoginProps {
  onLoginSuccess: (email: string) => void;
}

export const AdminLogin = ({ onLoginSuccess }: AdminLoginProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    // Validate inputs
    if (!email || !password) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    // Additional validation for sign-up
    if (isSignUp) {
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        setIsLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setIsLoading(false);
        return;
      }
    }

    try {
      if (isSignUp) {
        // Create new account
        const user = await createAdminAccount(email, password);
        setSuccessMessage("Account created successfully! Signing you in...");
        
        // Automatically sign in after successful sign-up
        setTimeout(async () => {
          try {
            const signedInUser = await loginAdmin(email, password);
            onLoginSuccess(signedInUser.email || email);
          } catch (err) {
            setError("Account created but failed to sign in. Please try signing in manually.");
            setIsSignUp(false);
            setPassword("");
            setConfirmPassword("");
          }
        }, 1000);
      } else {
        // Sign in existing user
        const user = await loginAdmin(email, password);
        onLoginSuccess(user.email || email);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${isSignUp ? "create account" : "sign in"}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
    setSuccessMessage(null);
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 px-4 py-16 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Koshak Admin</h1>
          <p className="mt-2 text-sm text-white/60">
            {isSignUp
              ? "Create a new admin account"
              : "Sign in to access the product management dashboard."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 autofill:bg-white/10 autofill:text-white"
              placeholder="admin@koshak.in"
              autoComplete="email"
              style={{ color: "white" }}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 autofill:bg-white/10 autofill:text-white"
              placeholder="••••••••"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              style={{ color: "white" }}
            />
            {isSignUp && (
              <p className="mt-1 text-xs text-white/50">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          {isSignUp && (
            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 autofill:bg-white/10 autofill:text-white"
                placeholder="••••••••"
                autoComplete="new-password"
                style={{ color: "white" }}
              />
            </div>
          )}

          {error ? (
            <div className="rounded-lg border border-red-400/40 bg-red-500/10 p-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          ) : null}

          {successMessage ? (
            <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-3">
              <p className="text-sm text-emerald-400">{successMessage}</p>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:bg-white/40"
          >
            {isLoading
              ? isSignUp
                ? "Creating account..."
                : "Signing in..."
              : isSignUp
                ? "Create Account"
                : "Enter Dashboard"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-white/40">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              type="button"
              onClick={toggleMode}
              className="font-semibold text-white underline transition hover:text-white/80"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
          <p className="mt-4 text-xs text-white/40">
            Secure admin access with Firebase Authentication
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;


