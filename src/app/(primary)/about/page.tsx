'use client';

import { motion } from 'framer-motion';
import { Award, Heart, Sparkles, Users, Globe, Shield } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Craft',
      description: 'Every piece is crafted with love and attention to detail, preserving traditional techniques.'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We use only the finest fabrics and materials to ensure lasting beauty and comfort.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We provide personalized service for every customer.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Bringing Indian fashion to the world while staying true to our cultural roots.'
    }
  ];

  const milestones = [
    { year: '2018', event: 'Founded Koshak with a vision to modernize traditional Indian wear' },
    { year: '2019', event: 'Launched our first collection of Indo-Western fusion wear' },
    { year: '2020', event: 'Expanded to online platform, reaching customers nationwide' },
    { year: '2021', event: 'Introduced sustainable and eco-friendly fabric options' },
    { year: '2022', event: 'Opened our flagship store in Delhi and Mumbai' },
    { year: '2023', event: 'Launched international shipping to 15+ countries' },
    { year: '2024', event: 'Celebrating 500+ happy customers and growing' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-royal-cream to-white overflow-hidden">
        <div className="absolute inset-0 bg-indian-pattern opacity-5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-royal text-4xl md:text-5xl lg:text-6xl font-bold text-royal-red mb-6">
              Our Story
            </h1>
            <p className="text-xl text-royal-brown/80 max-w-3xl mx-auto leading-relaxed">
              Born from a passion for Indian heritage and contemporary style, Koshak represents 
              the perfect fusion of tradition and modernity in fashion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-royal text-3xl md:text-4xl font-bold text-royal-red mb-6">
                Preserving Heritage, Embracing Future
              </h2>
              <p className="text-royal-brown/80 mb-6 leading-relaxed">
                Founded in 2018 by fashion enthusiasts Arjun and Meera Koshak, our brand was born 
                from a simple yet powerful vision: to make traditional Indian clothing accessible 
                and relevant for the modern world.
              </p>
              <p className="text-royal-brown/80 mb-6 leading-relaxed">
                We believe that fashion should tell a story, and every piece in our collection 
                narrates the rich tapestry of Indian culture while embracing contemporary aesthetics. 
                From the bustling streets of Old Delhi to the fashion capitals of the world, 
                Koshak bridges the gap between tradition and innovation.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-4 bg-royal-cream/30 rounded-lg">
                  <div className="font-royal text-2xl font-bold text-royal-red mb-2">6+</div>
                  <div className="text-royal-brown/70 text-sm">Years of Excellence</div>
                </div>
                <div className="text-center p-4 bg-royal-cream/30 rounded-lg">
                  <div className="font-royal text-2xl font-bold text-royal-red mb-2">15+</div>
                  <div className="text-royal-brown/70 text-sm">Countries Served</div>
                </div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-royal-red/20 to-royal-gold/20 z-10"></div>
                <div className="w-full h-full bg-gradient-to-br from-royal-red to-royal-maroon flex items-center justify-center">
                  <div className="text-center text-white z-20 relative">
                    <div className="w-24 h-24 mx-auto mb-4 bg-royal-gold/20 rounded-full flex items-center justify-center">
                      <Sparkles className="text-royal-gold" size={32} />
                    </div>
                    <p className="text-royal-cream/80">Founders Image</p>
                    <p className="text-sm text-royal-cream/60 mt-2">Arjun & Meera Koshak</p>
                  </div>
                </div>
              </div>
              <div className="absolute -inset-4 border-4 border-royal-gold/30 rounded-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-royal-brown/5 to-royal-gold/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-royal text-3xl md:text-4xl font-bold text-royal-red mb-4">
              Our Values
            </h2>
            <p className="text-lg text-royal-brown/80 max-w-2xl mx-auto">
              The principles that guide everything we do at Koshak
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg card-hover">
                  <div className="w-16 h-16 bg-gradient-to-br from-royal-red to-royal-maroon rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="text-royal-gold" size={24} />
                  </div>
                  <h3 className="font-royal text-xl font-semibold text-royal-red mb-4">
                    {value.title}
                  </h3>
                  <p className="text-royal-brown/70 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-royal text-3xl md:text-4xl font-bold text-royal-red mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-royal-brown/80">
              Milestones that shaped our story
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-royal-gold/30"></div>

            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex items-start mb-12"
              >
                {/* Timeline Dot */}
                <div className="w-16 h-16 bg-gradient-to-br from-royal-red to-royal-maroon rounded-full flex items-center justify-center text-white font-bold text-sm mr-8 flex-shrink-0 z-10">
                  {milestone.year}
                </div>

                {/* Content */}
                <div className="bg-royal-cream/30 rounded-lg p-6 flex-1">
                  <p className="text-royal-brown/80 leading-relaxed">
                    {milestone.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-royal-cream/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-royal text-3xl md:text-4xl font-bold text-royal-red mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-royal-brown/80 max-w-2xl mx-auto">
              The passionate individuals behind Koshak's success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Arjun Koshak', role: 'Co-Founder & CEO', specialty: 'Business Strategy' },
              { name: 'Meera Koshak', role: 'Co-Founder & Creative Director', specialty: 'Design & Innovation' },
              { name: 'Rajesh Sharma', role: 'Head of Production', specialty: 'Quality Assurance' }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg card-hover">
                  <div className="w-24 h-24 bg-gradient-to-br from-royal-red to-royal-maroon rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-royal-gold text-2xl font-royal">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-royal text-xl font-semibold text-royal-red mb-2">
                    {member.name}
                  </h3>
                  <p className="text-royal-brown/70 mb-2">{member.role}</p>
                  <p className="text-royal-brown/60 text-sm">{member.specialty}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-royal-brown to-royal-maroon text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-royal text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience Koshak?
            </h2>
            <p className="text-royal-cream/80 text-lg mb-8 leading-relaxed">
              Join our family of satisfied customers and discover the perfect blend 
              of tradition and contemporary style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="bg-royal-gold hover:bg-yellow-500 text-royal-brown font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Shop Now
              </a>
              <a
                href="#contact"
                className="border-2 border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-royal-brown font-semibold py-3 px-8 rounded-lg transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;