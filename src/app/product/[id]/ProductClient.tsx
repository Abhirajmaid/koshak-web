"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { products } from "@/data/products";
import {
  Heart,
  ShoppingBag,
  Star,
  ArrowLeft,
  Plus,
  Minus,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  Scale,
  Info,
  Package,
  Award,
} from "lucide-react";
import { useCompare } from "@/contexts/CompareContext";
import CompareProducts from "@/components/CompareProducts";

// Fake reviews data to make the product page look realistic
const generateFakeReviews = (productId: string) => {
  const reviewTemplates = [
    {
      name: "Priya Sharma",
      rating: 5,
      comment:
        "Absolutely stunning! The quality exceeded my expectations. Perfect fit and beautiful embroidery work.",
      date: "2024-01-15",
      verified: true,
      helpful: 12,
    },
    {
      name: "Rajesh Kumar",
      rating: 4,
      comment:
        "Great product with excellent craftsmanship. The fabric quality is premium and the design is elegant.",
      date: "2024-01-10",
      verified: true,
      helpful: 8,
    },
    {
      name: "Anita Patel",
      rating: 5,
      comment:
        "Loved the traditional look! Perfect for festivals and special occasions. Highly recommended.",
      date: "2024-01-08",
      verified: false,
      helpful: 15,
    },
    {
      name: "Meera Singh",
      rating: 4,
      comment:
        "Beautiful design and comfortable to wear. The colors are vibrant and the stitching is perfect.",
      date: "2024-01-05",
      verified: true,
      helpful: 6,
    },
    {
      name: "Kavya Reddy",
      rating: 5,
      comment:
        "Outstanding quality! The embroidery work is intricate and the fabric feels luxurious. Worth every penny.",
      date: "2024-01-02",
      verified: true,
      helpful: 20,
    },
  ];

  return reviewTemplates.slice(0, Math.floor(Math.random() * 3) + 3); // Return 3-5 reviews
};

interface ProductClientProps {
  params: {
    id: string;
  };
}

const ProductClient = ({ params }: ProductClientProps) => {
  const product = products.find((p) => p.id === params.id);
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  const { addToCompare, isInCompare, compareCount } = useCompare();

  const hapticFeedback = () => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(50);
    }
  };

  const handleAddToCompare = () => {
    if (product && addToCompare(product)) {
      hapticFeedback();
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-royal-grey/30 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-royal text-3xl md:text-4xl font-bold text-royal-red mb-4">
            Product Not Found
          </h1>
          <p className="text-royal-brown/70 mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link href="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-royal-grey/30 py-8 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <Link
            href="/products"
            className="inline-flex items-center text-royal-brown hover:text-royal-red transition-colors duration-300"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Products
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-xl lg:rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <motion.button
                  type="button"
                  title="Share Product"
                  whileTap={{ scale: 0.95 }}
                  onClick={hapticFeedback}
                  className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-royal-red hover:bg-white transition-colors duration-300"
                >
                  <Share2 size={18} />
                </motion.button>
                <motion.button
                  type="button"
                  title="Compare Product"
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCompare}
                  disabled={isInCompare(product.id)}
                  className={`w-10 h-10 bg-white/90 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isInCompare(product.id)
                      ? "text-royal-gold bg-royal-gold/10"
                      : "text-royal-red hover:bg-white"
                  }`}
                >
                  <Scale size={18} />
                </motion.button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  type="button"
                  title={`View image ${index + 1}`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    hapticFeedback();
                    setActiveImageIndex(index);
                  }}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors duration-300 ${
                    activeImageIndex === index
                      ? "border-royal-gold"
                      : "border-royal-brown/20"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* SKU and Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(product.rating)
                          ? "text-royal-gold fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-royal-brown/60 text-sm">
                  ({product.rating}) • {product.reviewCount} reviews
                </span>
              </div>
              <span className="text-royal-brown/60 text-sm">
                SKU: {product.sku}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-royal text-2xl sm:text-3xl md:text-4xl font-bold text-royal-red">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="font-bold text-royal-red text-2xl sm:text-3xl">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-royal-brown/50 text-lg sm:text-xl line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % OFF
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-royal-brown/80 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-royal-red text-sm sm:text-base">
                Color
              </h3>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {product.colors.map((color) => (
                  <motion.button
                    key={color}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      hapticFeedback();
                      setSelectedColor(color);
                    }}
                    className={`relative w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] rounded-full border transition-all duration-300 ${
                      selectedColor === color
                        ? "border-royal-gold ring-1 ring-royal-gold/40"
                        : "border-royal-brown/30 hover:border-royal-gold/50"
                    }`}
                    style={{
                      backgroundColor:
                        color.toLowerCase().includes("red") ||
                        color.toLowerCase().includes("maroon")
                          ? "#8B0000"
                          : color.toLowerCase().includes("gold") ||
                            color.toLowerCase().includes("golden")
                          ? "#FFD700"
                          : color.toLowerCase().includes("blue") ||
                            color.toLowerCase().includes("royal")
                          ? "#000080"
                          : color.toLowerCase().includes("green") ||
                            color.toLowerCase().includes("emerald")
                          ? "#006400"
                          : color.toLowerCase().includes("purple") ||
                            color.toLowerCase().includes("violet")
                          ? "#800080"
                          : color.toLowerCase().includes("pink")
                          ? "#FF69B4"
                          : color.toLowerCase().includes("orange")
                          ? "#FF8C00"
                          : color.toLowerCase().includes("yellow")
                          ? "#FFD700"
                          : color.toLowerCase().includes("black")
                          ? "#000000"
                          : color.toLowerCase().includes("white")
                          ? "#FFFFFF"
                          : "#8B4513",
                    }}
                    title={color}
                  >
                    {selectedColor === color && (
                      <div className="absolute inset-0 rounded-full border-2 border-royal-gold animate-pulse"></div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-royal-red text-sm sm:text-base">
                  Size
                </h3>
                <button
                  type="button"
                  className="text-royal-brown/60 text-xs sm:text-sm hover:text-royal-red transition-colors"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      hapticFeedback();
                      setSelectedSize(size);
                    }}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 transition-colors duration-300 font-semibold text-sm sm:text-base ${
                      selectedSize === size
                        ? "border-royal-gold bg-royal-gold/10 text-royal-red"
                        : "border-royal-brown/20 hover:border-royal-gold/50"
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="font-semibold text-royal-red text-sm sm:text-base">
                Quantity
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center border border-royal-brown/20 rounded-lg">
                  <motion.button
                    type="button"
                    title="Decrease quantity"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      hapticFeedback();
                      setQuantity(Math.max(1, quantity - 1));
                    }}
                    className="p-2 sm:p-3 hover:bg-royal-cream/50 transition-colors duration-300"
                  >
                    <Minus size={16} />
                  </motion.button>
                  <span className="px-3 sm:px-4 py-2 sm:py-3 font-semibold text-royal-red min-w-12 text-center text-sm sm:text-base">
                    {quantity}
                  </span>
                  <motion.button
                    type="button"
                    title="Increase quantity"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      hapticFeedback();
                      setQuantity(quantity + 1);
                    }}
                    className="p-2 sm:p-3 hover:bg-royal-cream/50 transition-colors duration-300"
                  >
                    <Plus size={16} />
                  </motion.button>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      product.inStock ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  <span className="text-royal-brown/60 text-xs sm:text-sm">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white/80 rounded-lg p-3 sm:p-4 border border-royal-brown/10">
              <div className="flex items-center mb-2">
                <Award className="text-royal-gold mr-2" size={18} />
                <span className="font-semibold text-royal-red text-sm">
                  Key Features
                </span>
              </div>
              <ul className="text-royal-brown/80 text-sm space-y-1">
                {product.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-royal-gold rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                disabled={!selectedSize || !selectedColor || !product.inStock}
                onClick={() => {
                  hapticFeedback();
                  // Add to cart functionality
                  if (selectedSize && selectedColor && product.inStock) {
                    const cartItem = {
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      originalPrice: product.originalPrice,
                      image: product.images[0],
                      size: selectedSize,
                      color: selectedColor,
                      quantity: quantity,
                    };

                    // Store in localStorage for now (in real app, use proper state management)
                    const existingCart = JSON.parse(
                      localStorage.getItem("cart") || "[]"
                    );
                    const existingItemIndex = existingCart.findIndex(
                      (item: any) =>
                        item.id === product.id &&
                        item.size === selectedSize &&
                        item.color === selectedColor
                    );

                    if (existingItemIndex >= 0) {
                      existingCart[existingItemIndex].quantity += quantity;
                    } else {
                      existingCart.push(cartItem);
                    }

                    localStorage.setItem("cart", JSON.stringify(existingCart));
                    router.push("/cart");
                  }
                }}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center py-3 sm:py-4 text-sm sm:text-base"
              >
                <ShoppingBag className="mr-2" size={18} />
                Add to Cart
              </motion.button>

              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                disabled={!selectedSize || !selectedColor || !product.inStock}
                onClick={() => {
                  hapticFeedback();
                  // Buy now functionality - redirect to checkout with this item
                  if (selectedSize && selectedColor && product.inStock) {
                    const buyNowItem = {
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      originalPrice: product.originalPrice,
                      image: product.images[0],
                      size: selectedSize,
                      color: selectedColor,
                      quantity: quantity,
                    };

                    // Store buy now item in localStorage and redirect to checkout
                    localStorage.setItem(
                      "buyNowItem",
                      JSON.stringify(buyNowItem)
                    );
                    router.push("/checkout?buyNow=true");
                  }
                }}
                className="flex-1 bg-royal-gold hover:bg-royal-gold/90 text-white font-semibold rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center py-3 sm:py-4 text-sm sm:text-base"
              >
                Buy Now
              </motion.button>
            </div>

            {/* Wishlist Button */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                hapticFeedback();
                setIsWishlisted(!isWishlisted);
              }}
              className={`w-full btn-secondary inline-flex items-center justify-center py-3 sm:py-4 text-sm sm:text-base ${
                isWishlisted ? "bg-red-100 text-red-600 border-red-200" : ""
              }`}
            >
              <Heart
                className={`mr-2 ${isWishlisted ? "fill-current" : ""}`}
                size={18}
              />
              {isWishlisted ? "Wishlisted" : "Wishlist"}
            </motion.button>

            {/* Service Highlights - small cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-royal-brown/20">
              <div className="bg-white/80 border border-royal-brown/10 rounded-md p-2 sm:p-3 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="mx-auto mb-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-royal-cream/60 flex items-center justify-center">
                  <Truck className="text-royal-gold" size={14} />
                </div>
                <p className="font-semibold text-royal-red text-[11px] sm:text-xs">Free Shipping</p>
                <p className="text-royal-brown/60 text-[9px] sm:text-[10px] mt-0.5">On orders over ₹5,000</p>
              </div>
              <div className="bg-white/80 border border-royal-brown/10 rounded-md p-2 sm:p-3 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="mx-auto mb-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-royal-cream/60 flex items-center justify-center">
                  <RotateCcw className="text-royal-gold" size={14} />
                </div>
                <p className="font-semibold text-royal-red text-[11px] sm:text-xs">Easy Returns</p>
                <p className="text-royal-brown/60 text-[9px] sm:text-[10px] mt-0.5">30-day return policy</p>
              </div>
              <div className="bg-white/80 border border-royal-brown/10 rounded-md p-2 sm:p-3 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="mx-auto mb-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-royal-cream/60 flex items-center justify-center">
                  <Shield className="text-royal-gold" size={14} />
                </div>
                <p className="font-semibold text-royal-red text-[11px] sm:text-xs">Secure Payment</p>
                <p className="text-royal-brown/60 text-[9px] sm:text-[10px] mt-0.5">100% secure checkout</p>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-royal-cream/30 rounded-lg p-4 mt-4 sm:mt-6">
              <h4 className="font-semibold text-royal-red mb-3 text-sm sm:text-base">
                Delivery Information
              </h4>
              <div className="space-y-2 text-xs sm:text-sm text-royal-brown/80">
                <div className="flex justify-between">
                  <span>Standard Delivery (5-7 days)</span>
                  <span className="font-medium">₹99</span>
                </div>
                <div className="flex justify-between">
                  <span>Express Delivery (2-3 days)</span>
                  <span className="font-medium">₹199</span>
                </div>
                <div className="flex justify-between">
                  <span>Same Day Delivery (Mumbai/Delhi)</span>
                  <span className="font-medium">₹299</span>
                </div>
                <div className="pt-2 border-t border-royal-brown/20">
                  <p className="text-green-600 font-medium">
                    ✓ Cash on Delivery Available
                  </p>
                  <p className="text-royal-brown/60">
                    Estimated delivery:{" "}
                    {new Date(
                      Date.now() + 5 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Highlights removed as per requirement */}

        

        {/* Product Details Tabs */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 lg:mt-12"
        >
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-royal-brown/20">
              <div className="flex overflow-x-auto">
                {[
                  { id: "description", label: "Description", icon: Info },
                  {
                    id: "specifications",
                    label: "Specifications",
                    icon: Package,
                  },
                  { id: "care", label: "Care Instructions", icon: Shield },
                  
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      hapticFeedback();
                      setActiveTab(tab.id);
                    }}
                    className={`flex items-center space-x-1 px-2 sm:px-6 py-2 sm:py-4 font-medium transition-colors duration-300 whitespace-nowrap text-xs sm:text-base ${
                      activeTab === tab.id
                        ? "text-royal-red border-b-2 border-royal-gold bg-royal-cream/20"
                        : "text-royal-brown/70 hover:text-royal-red"
                    }`}
                  >
                    <tab.icon size={16} />
                    <span>{tab.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              {activeTab === "description" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className="font-royal text-xl sm:text-2xl font-bold text-royal-red mb-3 sm:mb-4">
                      Product Description
                    </h3>
                    <p className="text-royal-brown/80 leading-relaxed text-sm sm:text-base mb-4 sm:mb-6">
                      {product.detailedDescription}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-royal-red mb-3 text-base sm:text-lg">
                      Key Features
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {product.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center text-royal-brown/80 text-sm sm:text-base"
                        >
                          <span className="w-2 h-2 bg-royal-gold rounded-full mr-3 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-royal-red mb-3 text-base sm:text-lg">
                      Occasions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.occasion.map((occ, index) => (
                        <span
                          key={index}
                          className="bg-royal-cream/50 text-royal-brown px-3 py-1 rounded-full text-xs sm:text-sm"
                        >
                          {occ}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "specifications" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <h3 className="font-royal text-xl sm:text-2xl font-bold text-royal-red">
                    Product Specifications
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-3 sm:space-y-4">
                      <h4 className="font-semibold text-royal-red text-base sm:text-lg">
                        General Information
                      </h4>
                      <div className="space-y-2 sm:space-y-3">
                        {Object.entries(product.specifications).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between py-2 border-b border-royal-brown/10"
                            >
                              <span className="text-royal-brown/70 text-sm sm:text-base">
                                {key}
                              </span>
                              <span className="text-royal-red font-medium text-sm sm:text-base">
                                {value}
                              </span>
                            </div>
                          )
                        )}
                        <div className="flex justify-between py-2 border-b border-royal-brown/10">
                          <span className="text-royal-brown/70 text-sm sm:text-base">
                            Weight
                          </span>
                          <span className="text-royal-red font-medium text-sm sm:text-base">
                            {product.weight}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-royal-brown/10">
                          <span className="text-royal-brown/70 text-sm sm:text-base">
                            Origin
                          </span>
                          <span className="text-royal-red font-medium text-sm sm:text-base">
                            {product.origin}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <h4 className="font-semibold text-royal-red text-base sm:text-lg">
                        Size Chart
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm">
                          <thead>
                            <tr className="border-b border-royal-brown/20">
                              <th className="text-left py-2 text-royal-red">
                                Size
                              </th>
                              {Object.keys(
                                product.measurements[product.sizes[0]] || {}
                              ).map((measurement) => (
                                <th
                                  key={measurement}
                                  className="text-left py-2 text-royal-red capitalize"
                                >
                                  {measurement}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {product.sizes.map((size) => (
                              <tr
                                key={size}
                                className="border-b border-royal-brown/10"
                              >
                                <td className="py-2 font-medium text-royal-red">
                                  {size}
                                </td>
                                {Object.values(
                                  product.measurements[size] || {}
                                ).map((value, index) => (
                                  <td
                                    key={index}
                                    className="py-2 text-royal-brown/80"
                                  >
                                    {value}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "care" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <h3 className="font-royal text-xl sm:text-2xl font-bold text-royal-red">
                    Care Instructions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h4 className="font-semibold text-royal-red mb-3 text-base sm:text-lg">
                        How to Care
                      </h4>
                      <ul className="space-y-2 sm:space-y-3">
                        {product.careInstructions.map((instruction, index) => (
                          <li
                            key={index}
                            className="flex items-start text-royal-brown/80 text-sm sm:text-base"
                          >
                            <span className="w-2 h-2 bg-royal-gold rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            {instruction}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-royal-cream/30 rounded-lg p-4">
                      <h4 className="font-semibold text-royal-red mb-3 text-base sm:text-lg">
                        Important Notes
                      </h4>
                      <ul className="space-y-2 text-royal-brown/80 text-sm sm:text-base">
                        <li>• First wash should be done separately</li>
                        <li>• Avoid using harsh detergents</li>
                        <li>• Store in a cool, dry place</li>
                        <li>
                          • Professional cleaning recommended for heavy
                          embroidery
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              
            </div>
          </div>
        </motion.section>

        {/* Reviews - standalone section at the end */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 lg:mt-12"
        >
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h3 className="font-royal text-xl sm:text-2xl font-bold text-royal-red">
                Customer Reviews
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${i < Math.floor(product.rating) ? "text-royal-gold fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-royal-brown/60 text-sm">
                  {product.rating} out of 5 ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {generateFakeReviews(product.id).map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-royal-cream/20 rounded-lg p-4 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-royal-red to-royal-maroon rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {review.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-royal-red text-sm sm:text-base">
                              {review.name}
                            </h4>
                            {review.verified && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={`${i < review.rating ? "text-royal-gold fill-current" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <span className="text-royal-brown/60 text-xs">
                              {new Date(review.date).toLocaleDateString("en-IN")}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-royal-brown/80 text-sm sm:text-base leading-relaxed mb-3">
                        {review.comment}
                      </p>
                      <div className="flex items-center gap-4 text-xs sm:text-sm text-royal-brown/60">
                        <button className="hover:text-royal-red transition-colors">👍 Helpful ({review.helpful})</button>
                        <button className="hover:text-royal-red transition-colors">Reply</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="text-center pt-6 border-t border-royal-brown/20">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={hapticFeedback}
                  className="btn-secondary inline-flex items-center px-6 py-3"
                >
                  <Star className="mr-2" size={16} />
                  Write a Review
                </motion.button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Frequently Bought Together - moved after description tabs */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8 lg:mt-12"
        >
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-6 lg:p-8">
            <h2 className="font-royal text-xl sm:text-2xl font-bold text-royal-red mb-6">
              Frequently Bought Together
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-royal-cream/50 rounded-lg flex items-center justify-center">
                  <span className="text-royal-red font-semibold">
                    This Item
                  </span>
                </div>
                <span className="text-royal-brown/60 text-2xl">+</span>
                <div className="w-20 h-20 bg-royal-cream/50 rounded-lg flex items-center justify-center">
                  <span className="text-royal-red font-semibold text-sm text-center">
                    Matching Dupatta
                  </span>
                </div>
                <span className="text-royal-brown/60 text-2xl">+</span>
                <div className="w-20 h-20 bg-royal-cream/50 rounded-lg flex items-center justify-center">
                  <span className="text-royal-red font-semibold text-sm text-center">
                    Jewelry Set
                  </span>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-royal-brown/80 mb-2">
                  Total Price:{" "}
                  <span className="font-bold text-royal-red">
                    ₹{(product.price + 899 + 1999).toLocaleString()}
                  </span>
                </p>
                <p className="text-green-600 font-medium mb-4">
                  Save ₹500 when bought together!
                </p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={hapticFeedback}
                  className="btn-secondary px-6 py-2 text-sm"
                >
                  Add All to Cart
                </motion.button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2 className="font-royal text-2xl md:text-3xl font-bold text-royal-red mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
                    <div className="relative h-48">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-royal-red mb-2 group-hover:text-royal-maroon transition-colors duration-300">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-royal-red">
                          ₹{relatedProduct.price.toLocaleString()}
                        </span>
                        {relatedProduct.originalPrice && (
                          <span className="text-royal-brown/50 text-sm line-through">
                            ₹{relatedProduct.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* Sticky Bottom Bar: price + actions */}
        <div className="fixed bottom-3 left-0 right-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-xl sm:max-w-2xl bg-royal-maroon text-white rounded-full shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-white/80 text-xs sm:text-sm">Price</span>
                  <span className="font-bold text-lg sm:text-2xl">₹{product.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    disabled={!selectedSize || !selectedColor || !product.inStock}
                    onClick={() => {
                      hapticFeedback();
                      if (selectedSize && selectedColor && product.inStock) {
                        const cartItem = {
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          originalPrice: product.originalPrice,
                          image: product.images[0],
                          size: selectedSize,
                          color: selectedColor,
                          quantity: quantity,
                        };
                        const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
                        const existingItemIndex = existingCart.findIndex(
                          (item: any) => item.id === product.id && item.size === selectedSize && item.color === selectedColor
                        );
                        if (existingItemIndex >= 0) {
                          existingCart[existingItemIndex].quantity += quantity;
                        } else {
                          existingCart.push(cartItem);
                        }
                        localStorage.setItem("cart", JSON.stringify(existingCart));
                        router.push("/cart");
                      }
                    }}
                    className="bg-royal-gold hover:bg-royal-gold/90 text-royal-red font-semibold rounded-full px-4 sm:px-6 py-2 sm:py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add to Cart
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    disabled={!selectedSize || !selectedColor || !product.inStock}
                    onClick={() => {
                      hapticFeedback();
                      if (selectedSize && selectedColor && product.inStock) {
                        const buyNowItem = {
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          originalPrice: product.originalPrice,
                          image: product.images[0],
                          size: selectedSize,
                          color: selectedColor,
                          quantity: quantity,
                        };
                        localStorage.setItem("buyNowItem", JSON.stringify(buyNowItem));
                        router.push("/checkout?buyNow=true");
                      }
                    }}
                    className="bg-white text-royal-red hover:bg-royal-cream/90 font-semibold rounded-full px-4 sm:px-6 py-2 sm:py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Buy Now
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Compare Button */}
        {compareCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed right-4 bottom-20 sm:bottom-24 z-50"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                hapticFeedback();
                setShowCompare(true);
              }}
              className="bg-royal-red text-white rounded-full p-3 shadow-lg hover:bg-royal-maroon transition-colors duration-300 flex items-center space-x-2"
            >
              <Scale size={20} />
              <span className="font-medium">Compare ({compareCount})</span>
            </motion.button>
          </motion.div>
        )}

        {/* Compare Modal */}
        <CompareProducts
          isOpen={showCompare}
          onClose={() => setShowCompare(false)}
        />
      </div>
    </div>
  );
};

export default ProductClient;
