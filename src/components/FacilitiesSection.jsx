import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FiWifi, FiDroplet, FiHome, FiCoffee, FiHeart,
  FiActivity, FiTruck, FiClock, FiBriefcase
} from 'react-icons/fi';
import { facilities } from '../data/data';

const iconMap = {
  wifi: FiWifi,
  pool: FiDroplet,
  room: FiHome,
  restaurant: FiCoffee,
  spa: FiHeart,
  gym: FiActivity,
  parking: FiTruck,
  service: FiClock,
  conference: FiBriefcase,
};

const FacilityCard = ({ facility, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = iconMap[facility.icon] || FiHome;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="group relative p-6 border border-gold-500/10 hover:border-gold-400/40 bg-navy-800/30 hover:bg-navy-800/60 rounded-sm transition-all duration-500 cursor-default"
    >
      {/* Glowing corner */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold-400/0 group-hover:border-gold-400/60 transition-all duration-500" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold-400/0 group-hover:border-gold-400/60 transition-all duration-500" />

      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-gold-500/10 group-hover:bg-gold-500/20 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110">
        <Icon size={20} className="text-gold-400" />
      </div>

      <h3 className="font-cormorant text-xl font-semibold text-cream-50 mb-2 group-hover:text-gold-300 transition-colors duration-300">
        {facility.title}
      </h3>
      <p className="font-jost text-sm text-cream-100/50 leading-relaxed">
        {facility.description}
      </p>
    </motion.div>
  );
};

const FacilitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="facilities" className="py-28 px-6 bg-navy-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #d4a853 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="section-subtitle mb-4"
          >
            World-Class Amenities
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mb-5"
          >
            Facilities &amp;<br />
            <span className="gold-text italic">Services</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="divider-gold mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="font-jost text-cream-100/50 max-w-2xl mx-auto leading-relaxed"
          >
            Every detail of Varun GM is designed to elevate your stay. From our world-renowned spa to our gourmet restaurants, indulge in facilities that set new standards of luxury.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {facilities.map((facility, i) => (
            <FacilityCard key={facility.id} facility={facility} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
