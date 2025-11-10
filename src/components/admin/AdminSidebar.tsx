"use client";

interface AdminSidebarProps {
  activeSection: "dashboard" | "products";
  onSectionChange: (section: "dashboard" | "products") => void;
  adminEmail: string;
  onSignOut: () => void;
}

export const AdminSidebar = ({
  activeSection,
  onSectionChange,
  adminEmail,
  onSignOut,
}: AdminSidebarProps) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/10 bg-black/40 backdrop-blur">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="border-b border-white/10 p-6">
          <h1 className="text-xl font-bold text-white">Koshak Admin</h1>
          <p className="mt-1 text-xs text-white/50">{adminEmail}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          <button
            onClick={() => onSectionChange("dashboard")}
            className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
              activeSection === "dashboard"
                ? "bg-white text-neutral-900"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onSectionChange("products")}
            className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
              activeSection === "products"
                ? "bg-white text-neutral-900"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            Products
          </button>
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-4">
          <button
            onClick={onSignOut}
            className="w-full rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};


