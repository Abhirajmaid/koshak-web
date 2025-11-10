"use client";

import { useState, useEffect } from "react";
import { AdminDashboardNew } from "@/components/admin/AdminDashboardNew";
import AdminLogin from "@/components/admin/AdminLogin";
import { onAuthStateChange, signOutAdmin, getCurrentUser } from "@/services/auth";

const AdminPage = () => {
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const unsubscribe = onAuthStateChange((user) => {
      if (user && user.email) {
        setAdminEmail(user.email);
      } else {
        setAdminEmail(null);
      }
      setIsCheckingAuth(false);
    });

    // Also check current user immediately
    const currentUser = getCurrentUser();
    if (currentUser?.email) {
      setAdminEmail(currentUser.email);
      setIsCheckingAuth(false);
    }

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOutAdmin();
      setAdminEmail(null);
    } catch (error) {
      console.error("Sign out error:", error);
      // Still clear the email even if sign out fails
      setAdminEmail(null);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-white mx-auto"></div>
          <p className="text-sm text-white/60">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!adminEmail) {
    return <AdminLogin onLoginSuccess={setAdminEmail} />;
  }

  return (
    <AdminDashboardNew adminEmail={adminEmail} onSignOut={handleSignOut} />
  );
};

export default AdminPage;

