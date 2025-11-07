'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'Absolutely stunning lehenga! The quality and craftsmanship exceeded my expectations. Perfect for my sister\'s wedding.',
    product: 'Golden Banarasi Lehenga'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    text: 'The sherwani was perfect for my wedding. Great fit, beautiful embroidery, and excellent customer service.',
    product: 'Regal Sherwani Set'
  },
  {
    id: 3,
    name: 'Anita Patel',
    location: 'Ahmedabad',
    rating: 5,
    text: 'Love the fusion dress! It\'s comfortable, stylish, and perfect for both traditional and modern occasions.',
    product: 'Indo-Western Fusion Dress'
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-royal-grey/40 to-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="font-royal text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-royal-red mb-3 sm:mb-4 px-2">
            What Our Customers Say
          </h2>
          <p className="text-base sm:text-lg text-royal-brown/80 max-w-2xl mx-auto px-4 sm:px-0">
            Real stories from our satisfied customers who trust Koshak for their special occasions
          </p>
          <div className="w-16 sm:w-24 h-1 bg-royal-gold mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg card-hover relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-royal-gold/5 rounded-full -translate-y-12 translate-x-12 sm:-translate-y-16 sm:translate-x-16"></div>
                
                {/* Quote Icon */}
                <div className="relative z-10">
                  <Quote className="text-royal-gold mb-3 sm:mb-4" size={24} />
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="text-royal-gold fill-current sm:w-4 sm:h-4"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-royal-brown/80 mb-4 sm:mb-6 leading-relaxed italic text-sm sm:text-base">
                    "{testimonial.text}"
                  </p>

                  {/* Product */}
                  <div className="mb-3 sm:mb-4">
                    <span className="text-royal-red font-medium text-xs sm:text-sm">
                      Product: {testimonial.product}
                    </span>
                  </div>

                  {/* Customer Info */}
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-royal-red to-royal-maroon rounded-full flex items-center justify-center mr-3 sm:mr-4">
                      <span className="text-white font-semibold text-base sm:text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-royal-red text-sm sm:text-base">
                        {testimonial.name}
                      </h4>
                      <p className="text-royal-brown/60 text-xs sm:text-sm">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative Border */}
                <div className="absolute inset-0 border-2 border-royal-gold/10 rounded-xl sm:rounded-2xl group-hover:border-royal-gold/30 transition-colors duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 lg:mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="font-royal text-2xl sm:text-3xl font-bold text-royal-red mb-1 sm:mb-2">500+</div>
              <div className="text-royal-brown/70 text-xs sm:text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="font-royal text-2xl sm:text-3xl font-bold text-royal-red mb-1 sm:mb-2">4.9★</div>
              <div className="text-royal-brown/70 text-xs sm:text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="font-royal text-2xl sm:text-3xl font-bold text-royal-red mb-1 sm:mb-2">98%</div>
              <div className="text-royal-brown/70 text-xs sm:text-sm">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="font-royal text-2xl sm:text-3xl font-bold text-royal-red mb-1 sm:mb-2">24/7</div>
              <div className="text-royal-brown/70 text-xs sm:text-sm">Customer Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;