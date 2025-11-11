'use client';

import { useEffect, useMemo, useState } from "react";
import { subscribeToOrders, setOrderPaid, type OrderEntry } from "@/services/orders";

type TabKey = "card" | "upi" | "cod";

export const AdminShoppingView = ({ initialMethod }: { initialMethod?: "card" | "upi" | "cod" }) => {
  const [orders, setOrders] = useState<OrderEntry[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>(initialMethod ?? "card");
  const [selected, setSelected] = useState<OrderEntry | null>(null);

  useEffect(() => {
    const unsub = subscribeToOrders(setOrders, console.error);
    return () => unsub();
  }, []);

  const filtered = useMemo(
    () => orders.filter((o) => o.paymentMethod === activeTab),
    [orders, activeTab],
  );

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(["card", "upi", "cod"] as TabKey[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === tab ? "bg-white text-neutral-900" : "text-white/80 border border-white/20 hover:bg-white/10"
            }`}
          >
            {tab === "card" ? "Credit/Debit Card" : tab === "upi" ? "UPI Payment" : "Cash on Delivery"}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/70">Order ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/70">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/70">Total</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/70">Paid</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/70">Created</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filtered.map((o) => (
              <tr key={o.id} className="hover:bg-white/5">
                <td className="px-4 py-3 text-white/90">{o.id.slice(0, 8)}</td>
                <td className="px-4 py-3 text-white/90">
                  {o.customer.firstName} {o.customer.lastName}
                  <div className="text-xs text-white/50">{o.customer.email}</div>
                </td>
                <td className="px-4 py-3 text-white/90">₹{o.total.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                      o.paid ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-200"
                    }`}
                  >
                    {o.paid ? "Paid" : "Unpaid"}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/70">{new Date(o.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => setSelected(o)}
                    className="rounded-lg border border-white/20 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-white/50">
                  No orders yet for this payment method.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/60 md:items-center">
          <div className="mx-auto w-full max-w-3xl rounded-t-2xl bg-neutral-900 p-6 md:rounded-2xl md:p-8 border border-white/10">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Order {selected.id}</h3>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg border border-white/20 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 text-sm font-medium text-white/70">Customer</h4>
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <table className="min-w-full divide-y divide-white/10">
                    <tbody className="divide-y divide-white/10 text-white/90 text-sm">
                      <tr><td className="px-3 py-2">Name</td><td className="px-3 py-2">{selected.customer.firstName} {selected.customer.lastName}</td></tr>
                      <tr><td className="px-3 py-2">Email</td><td className="px-3 py-2">{selected.customer.email}</td></tr>
                      <tr><td className="px-3 py-2">Phone</td><td className="px-3 py-2">{selected.customer.phone}</td></tr>
                      <tr><td className="px-3 py-2">Address</td><td className="px-3 py-2">{selected.customer.address}</td></tr>
                      <tr><td className="px-3 py-2">City/State</td><td className="px-3 py-2">{selected.customer.city}, {selected.customer.state}</td></tr>
                      <tr><td className="px-3 py-2">Pincode</td><td className="px-3 py-2">{selected.customer.pincode}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-medium text-white/70">Payment</h4>
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <table className="min-w-full divide-y divide-white/10">
                    <tbody className="divide-y divide-white/10 text-white/90 text-sm">
                      <tr><td className="px-3 py-2">Method</td><td className="px-3 py-2">
                        {selected.paymentMethod === "card" ? "Credit/Debit Card" : selected.paymentMethod === "upi" ? "UPI Payment" : "Cash on Delivery"}
                      </td></tr>
                      <tr><td className="px-3 py-2">Total</td><td className="px-3 py-2">₹{selected.total.toLocaleString()}</td></tr>
                      <tr><td className="px-3 py-2">Paid</td><td className="px-3 py-2">{selected.paid ? "Yes" : "No"}</td></tr>
                      <tr><td className="px-3 py-2">Created</td><td className="px-3 py-2">{new Date(selected.createdAt).toLocaleString()}</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-3">
                  <button
                    onClick={async () => {
                      await setOrderPaid(selected.id, !selected.paid);
                    }}
                    className={`mt-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                      selected.paid ? "bg-amber-500/20 text-amber-200 hover:bg-amber-500/30" : "bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30"
                    }`}
                  >
                    Mark as {selected.paid ? "Unpaid" : "Paid"}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="mb-2 text-sm font-medium text-white/70">Items</h4>
              <div className="overflow-hidden rounded-xl border border-white/10">
                <table className="min-w-full divide-y divide-white/10">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-white/70">Name</th>
                      <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-white/70">Qty</th>
                      <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-white/70">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-white/90 text-sm">
                    {selected.items.map((it, idx) => (
                      <tr key={idx}>
                        <td className="px-3 py-2">{it.name}</td>
                        <td className="px-3 py-2">{it.quantity}</td>
                        <td className="px-3 py-2">₹{(it.price * it.quantity).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


