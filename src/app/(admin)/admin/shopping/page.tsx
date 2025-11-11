"use client";

import { useEffect, useState } from "react";
import { AdminDashboardNew } from "@/components/admin/AdminDashboardNew";
import AdminLogin from "@/components/admin/AdminLogin";
import { onAuthStateChange, signOutAdmin, getCurrentUser } from "@/services/auth";

const AdminShoppingPage = () => {
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (user && user.email) {
        setAdminEmail(user.email);
      } else {
        setAdminEmail(null);
      }
      setIsCheckingAuth(false);
    });

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
    } catch {
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
    <AdminDashboardNew adminEmail={adminEmail} onSignOut={handleSignOut} initialView="shopping" />
  );
};

export default AdminShoppingPage;


