'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  Save, 
  X, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut,
  Package,
  CreditCard,
  Bell,
  Shield
} from 'lucide-react';

const AccountPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [userInfo, setUserInfo] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    address: '123 MG Road, Bangalore, Karnataka 560001',
    joinDate: '2023-06-15',
    avatar: ''
  });

  const hapticFeedback = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const handleSave = () => {
    hapticFeedback();
    setIsEditing(false);
    // In a real app, save to backend
  };

  const handleCancel = () => {
    hapticFeedback();
    setIsEditing(false);
    // Reset form data
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 4999,
      items: 2,
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 8999,
      items: 1,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'Processing',
      total: 2499,
      items: 1,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  ];

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
          <h1 className="font-royal text-3xl md:text-4xl font-bold text-royal-red mb-4">
            My Account
          </h1>
          <p className="text-royal-brown/80 text-lg">
            Manage your profile, orders, and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6 lg:sticky lg:top-8">
              {/* User Avatar */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-royal-red to-royal-maroon rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-2xl">
                    {userInfo.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-royal-red text-lg">{userInfo.name}</h3>
                <p className="text-royal-brown/60 text-sm">{userInfo.email}</p>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-1 lg:space-y-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      hapticFeedback();
                      setActiveTab(tab.id);
                    }}
                    className={`w-full flex items-center space-x-2 lg:space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-colors duration-300 text-left text-sm lg:text-base ${
                      activeTab === tab.id
                        ? 'bg-royal-red text-white'
                        : 'text-royal-brown hover:bg-royal-grey/50'
                    }`}
                  >
                    <tab.icon size={16} className="lg:w-[18px] lg:h-[18px]" />
                    <span className="font-medium">{tab.label}</span>
                  </motion.button>
                ))}
                
                {/* Logout */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={hapticFeedback}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-300 text-left text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  <span className="font-medium">Logout</span>
                </motion.button>
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-royal text-2xl font-bold text-royal-red">
                      Profile Information
                    </h2>
                    {!isEditing ? (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          hapticFeedback();
                          setIsEditing(true);
                        }}
                        className="btn-secondary inline-flex items-center"
                      >
                        <Edit3 className="mr-2" size={16} />
                        Edit Profile
                      </motion.button>
                    ) : (
                      <div className="flex space-x-2">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSave}
                          className="btn-primary inline-flex items-center"
                        >
                          <Save className="mr-2" size={16} />
                          Save
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={handleCancel}
                          className="btn-secondary inline-flex items-center"
                        >
                          <X className="mr-2" size={16} />
                          Cancel
                        </motion.button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-royal-brown font-medium mb-2">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={userInfo.name}
                          onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                          className="w-full px-4 py-3 border border-royal-brown/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 p-3 bg-royal-grey/20 rounded-lg">
                          <User className="text-royal-brown/60" size={18} />
                          <span className="text-royal-red font-medium">{userInfo.name}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-royal-brown font-medium mb-2">
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                          className="w-full px-4 py-3 border border-royal-brown/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 p-3 bg-royal-grey/20 rounded-lg">
                          <Mail className="text-royal-brown/60" size={18} />
                          <span className="text-royal-red font-medium">{userInfo.email}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-royal-brown font-medium mb-2">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-royal-brown/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 p-3 bg-royal-grey/20 rounded-lg">
                          <Phone className="text-royal-brown/60" size={18} />
                          <span className="text-royal-red font-medium">{userInfo.phone}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-royal-brown font-medium mb-2">
                        Member Since
                      </label>
                      <div className="flex items-center space-x-3 p-3 bg-royal-grey/20 rounded-lg">
                        <Calendar className="text-royal-brown/60" size={18} />
                        <span className="text-royal-red font-medium">
                          {new Date(userInfo.joinDate).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-royal-brown font-medium mb-2">
                        Address
                      </label>
                      {isEditing ? (
                        <textarea
                          value={userInfo.address}
                          onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
                          rows={3}
                          className="w-full px-4 py-3 border border-royal-brown/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold"
                        />
                      ) : (
                        <div className="flex items-start space-x-3 p-3 bg-royal-grey/20 rounded-lg">
                          <MapPin className="text-royal-brown/60 mt-0.5" size={18} />
                          <span className="text-royal-red font-medium">{userInfo.address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="font-royal text-2xl font-bold text-royal-red mb-6">
                    Order History
                  </h2>
                  
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="border border-royal-brown/20 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={order.image}
                              alt="Order item"
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div>
                              <h3 className="font-semibold text-royal-red">Order #{order.id}</h3>
                              <p className="text-royal-brown/70 text-sm">
                                {new Date(order.date).toLocaleDateString('en-IN')} • {order.items} item{order.items > 1 ? 's' : ''}
                              </p>
                              <p className="font-bold text-royal-red">₹{order.total.toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                            <Link href={`/order/${order.id}`} className="btn-secondary text-sm">
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center mt-8">
                    <Link href="/" className="btn-primary">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="font-royal text-2xl font-bold text-royal-red mb-6">
                    My Wishlist
                  </h2>
                  <div className="text-center py-12">
                    <Heart className="mx-auto text-royal-brown/40 mb-4" size={64} />
                    <h3 className="font-semibold text-royal-red text-xl mb-2">Your wishlist is empty</h3>
                    <p className="text-royal-brown/70 mb-6">Save items you love to your wishlist</p>
                    <Link href="/" className="btn-primary">
                      Start Shopping
                    </Link>
                  </div>
                </div>
              )}

              {/* Other tabs placeholder */}
              {!['profile', 'orders', 'wishlist'].includes(activeTab) && (
                <div>
                  <h2 className="font-royal text-2xl font-bold text-royal-red mb-6">
                    {tabs.find(tab => tab.id === activeTab)?.label}
                  </h2>
                  <div className="text-center py-12">
                    <Settings className="mx-auto text-royal-brown/40 mb-4" size={64} />
                    <h3 className="font-semibold text-royal-red text-xl mb-2">Coming Soon</h3>
                    <p className="text-royal-brown/70">This feature is under development</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;