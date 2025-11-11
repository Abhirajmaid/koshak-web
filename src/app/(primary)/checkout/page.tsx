'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { addOrder } from '@/services/orders';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react';

const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [summaryItems, setSummaryItems] = useState<Array<{ name: string; price: number; quantity: number }>>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const compute = () => {
      try {
        const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
        const isBuyNow = params?.get('buyNow') === 'true';

        if (isBuyNow) {
          const raw = localStorage.getItem('buyNowItem');
          const item = raw ? JSON.parse(raw) : null;
          const items = item
            ? [{ name: item.name, price: Number(item.price) || 0, quantity: Number(item.quantity) || 1 }]
            : [];
          const sub = items.reduce((s, it) => s + it.price * it.quantity, 0);
          const ship = sub > 5000 ? 0 : (sub > 0 ? 200 : 0);
          setSummaryItems(items);
          setSubtotal(sub);
          setShipping(ship);
          setTotal(sub + ship);
          return;
        }

        const rawCart = localStorage.getItem('cart');
        const cartItems: Array<{ name: string; price: number; quantity: number }> = rawCart ? JSON.parse(rawCart) : [];
        const items = cartItems.map((it) => ({
          name: it.name,
          price: Number(it.price) || 0,
          quantity: Number(it.quantity) || 1,
        }));
        const sub = items.reduce((s, it) => s + it.price * it.quantity, 0);
        const ship = sub > 5000 ? 0 : (sub > 0 ? 200 : 0);
        setSummaryItems(items);
        setSubtotal(sub);
        setShipping(ship);
        setTotal(sub + ship);
      } catch {
        setSummaryItems([]);
        setSubtotal(0);
        setShipping(0);
        setTotal(0);
      }
    };

    compute();
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'cart' || e.key === 'buyNowItem') compute();
    };
    const onCartUpdated = () => compute();
    window.addEventListener('storage', onStorage);
    window.addEventListener('cart-updated', onCartUpdated as EventListener);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('cart-updated', onCartUpdated as EventListener);
    };
  }, []);

  if (step === 3) {
    return (
      <div className="min-h-screen bg-royal-grey/30 py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <CheckCircle className="mx-auto text-green-500 mb-6" size={80} />
            <h1 className="font-royal text-3xl md:text-4xl font-bold text-royal-red mb-4">
              Order Confirmed!
            </h1>
            <p className="text-royal-brown/70 mb-6 text-lg">
              Thank you for your purchase. Your order #KSK-2024-001 has been confirmed.
            </p>
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <h3 className="font-semibold text-royal-red mb-4">Order Details</h3>
              <div className="text-left space-y-2">
                <div className="flex justify-between">
                  <span>Order Number:</span>
                  <span className="font-semibold">KSK-2024-001</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-semibold">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery:</span>
                  <span className="font-semibold">5-7 business days</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-primary">
                Continue Shopping
              </Link>
              <Link href="/orders" className="btn-secondary">
                Track Order
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-royal-grey/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link
            href="/cart"
            className="inline-flex items-center text-royal-brown hover:text-royal-red transition-colors duration-300 mb-4"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Cart
          </Link>
          <h1 className="font-royal text-3xl md:text-4xl font-bold text-royal-red">
            Checkout
          </h1>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= stepNumber
                      ? 'bg-royal-red text-white'
                      : 'bg-royal-brown/20 text-royal-brown/60'
                  }`}
                >
                  {stepNumber}
                </div>
                <span
                  className={`ml-2 ${
                    step >= stepNumber ? 'text-royal-red' : 'text-royal-brown/60'
                  }`}
                >
                  {stepNumber === 1 ? 'Shipping' : 'Payment'}
                </span>
                {stepNumber < 2 && (
                  <div
                    className={`w-16 h-0.5 mx-4 ${
                      step > stepNumber ? 'bg-royal-red' : 'bg-royal-brown/20'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h2 className="font-royal text-2xl font-bold text-royal-red mb-6">
                  Shipping Information
                </h2>

                <form className="space-y-6">
                  <div>
                    <label className="block text-royal-brown font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-royal-brown/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-royal-brown font-medium mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-royal-brown/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent"
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <label className="block text-royal-brown font-medium mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-royal-brown/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-royal-brown font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-royal-brown/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-royal-brown font-medium mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-royal-brown/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent"
                      placeholder="Street address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-royal-brown font-medium mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-royal-brown/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-royal-brown font-medium mb-2">
                        State
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-royal-brown/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent"
                      >
                        <option value="">Select State</option>
                        <option value="delhi">Delhi</option>
                        <option value="mumbai">Mumbai</option>
                        <option value="bangalore">Bangalore</option>
                        <option value="chennai">Chennai</option>
                        <option value="kolkata">Kolkata</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-royal-brown font-medium mb-2">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-royal-brown/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent"
                        placeholder="110001"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full btn-primary"
                  >
                    Continue to Payment
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h2 className="font-royal text-2xl font-bold text-royal-red mb-6">
                  Payment Method
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="border border-royal-brown/20 rounded-lg p-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <CreditCard className="mr-2 text-royal-red" size={20} />
                      <span className="font-medium">Credit/Debit Card</span>
                    </label>
                  </div>

                  <div className="border border-royal-brown/20 rounded-lg p-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <span className="mr-2 text-royal-red font-bold">₹</span>
                      <span className="font-medium">UPI Payment</span>
                    </label>
                  </div>

                  <div className="border border-royal-brown/20 rounded-lg p-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <Truck className="mr-2 text-royal-red" size={20} />
                      <span className="font-medium">Cash on Delivery</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4 text-sm text-royal-brown/60 mb-6">
                  <Shield size={16} />
                  <span>Your payment information is secure and encrypted</span>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      // Build order from formData and localStorage cart
                      try {
                        const rawCart = localStorage.getItem('cart');
                        const cartItems: Array<{ id: string; name: string; price: number; quantity: number; size?: string; color?: string; }> =
                          rawCart ? JSON.parse(rawCart) : [];
                        const total = cartItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
                        const paid = formData.paymentMethod !== 'cod';
                        await addOrder({
                          createdAt: new Date().toISOString(),
                          paid,
                          paymentMethod: formData.paymentMethod as any,
                          total,
                          items: cartItems.map((it) => ({
                            id: it.id,
                            name: it.name,
                            price: it.price,
                            quantity: it.quantity,
                            size: it.size,
                            color: it.color,
                          })),
                          customer: {
                            email: formData.email,
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            phone: formData.phone,
                            address: formData.address,
                            city: formData.city,
                            state: formData.state,
                            pincode: formData.pincode,
                          },
                        });
                        // Clear cart on successful order
                        localStorage.removeItem('cart');
                        window.dispatchEvent(new Event('cart-updated'));
                        setStep(3);
                      } catch (e) {
                        console.error('Failed to place order', e);
                        setStep(3);
                      }
                    }}
                    className="flex-1 btn-primary"
                  >
                    Place Order
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg sticky top-8"
            >
              <h2 className="font-royal text-2xl font-bold text-royal-red mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {summaryItems.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <p className="font-medium text-royal-red">{item.name}</p>
                      <p className="text-sm text-royal-brown/70">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-royal-red">
                      ₹{item.price.toLocaleString()}
                    </span>
                  </div>
                ))}
                {summaryItems.length === 0 && (
                  <div className="text-sm text-royal-brown/60">No items found.</div>
                )}
              </div>

              <div className="space-y-2 mb-6 pt-4 border-t border-royal-brown/20">
                <div className="flex justify-between">
                  <span className="text-royal-brown/70">Subtotal</span>
                  <span className="font-semibold text-royal-red">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-royal-brown/70">Shipping</span>
                  <span className="font-semibold text-royal-red">
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-royal-brown/20">
                  <span className="text-royal-red">Total</span>
                  <span className="text-royal-red">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3 text-sm text-royal-brown/60">
                <div className="flex items-center">
                  <Shield size={16} className="mr-2" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center">
                  <Truck size={16} className="mr-2" />
                  <span>Free shipping on orders over ₹5,000</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={16} className="mr-2" />
                  <span>30-day return policy</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;