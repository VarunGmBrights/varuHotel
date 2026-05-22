import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiStar, FiArrowRight, FiUsers, FiMaximize } from 'react-icons/fi';
import { rooms } from '../data/data';

const categories = ['All', 'Deluxe', 'Suite', 'Villa', 'Family', 'Studio'];

const RoomCard = ({ room, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative bg-navy-800/40 border border-gold-500/10 hover:border-gold-400/30 overflow-hidden rounded-sm transition-all duration-500 card-hover"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={room.image}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />

        {/* Price badge */}
        <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-sm">
          <span className="font-jost text-xs text-cream-100/60">from</span>
          <span className="font-cormorant text-lg font-semibold text-gold-400 ml-1">
            ₹{room.price.toLocaleString()}
          </span>
          <span className="font-jost text-[10px] text-cream-100/40">/night</span>
        </div>

        {/* Category tag */}
        <div className="absolute top-4 left-4">
          <span className="font-jost text-[10px] tracking-[0.2em] uppercase bg-gold-500/20 border border-gold-500/30 text-gold-300 px-2.5 py-1 rounded-full">
            {room.subtitle}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-cormorant text-2xl font-semibold text-cream-50 group-hover:text-gold-300 transition-colors">
            {room.title}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <FiStar size={13} className="text-gold-400 fill-gold-400" />
            <span className="font-jost text-sm font-medium text-cream-100/70">{room.rating}</span>
            <span className="font-jost text-xs text-cream-100/40">({room.reviews})</span>
          </div>
        </div>

        <p className="font-jost text-sm text-cream-100/50 leading-relaxed mb-5 line-clamp-2">
          {room.description}
        </p>

        {/* Room specs */}
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gold-500/10">
          <div className="flex items-center gap-1.5 text-cream-100/40">
            <FiMaximize size={13} />
            <span className="font-jost text-xs">{room.size}</span>
          </div>
          <div className="flex items-center gap-1.5 text-cream-100/40">
            <FiUsers size={13} />
            <span className="font-jost text-xs">{room.capacity}</span>
          </div>
          <div className="font-jost text-xs text-cream-100/40">{room.bed}</div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between">
          <div>
            {room.originalPrice && (
              <span className="font-jost text-xs text-cream-100/30 line-through mr-2">
                ₹{room.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="font-cormorant text-2xl text-gold-400 font-semibold">
              ₹{room.price.toLocaleString()}
            </span>
            <span className="font-jost text-xs text-cream-100/40 ml-1">/night</span>
          </div>
          <Link
            to={`/rooms/${room.slug}`}
            className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-gold-400 hover:text-gold-300 transition-colors group/btn"
          >
            View Details
            <FiArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const RoomsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filtered = activeCategory === 'All'
    ? rooms
    : rooms.filter(r => r.category.toLowerCase() === activeCategory.toLowerCase() || r.subtitle.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="rooms" className="py-28 px-6 bg-navy-950 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="section-subtitle mb-4"
          >
            Rooms &amp; Suites
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mb-5"
          >
            Your Perfect<br />
            <span className="gold-text italic">Sanctuary</span>
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
            className="font-jost text-cream-100/50 max-w-xl mx-auto"
          >
            From intimate deluxe rooms to sprawling private villas, each space is a masterwork of thoughtful design and extravagant comfort.
          </motion.p>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-jost text-xs tracking-widest uppercase px-5 py-2.5 rounded-full border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gold-500 border-gold-500 text-navy-900 font-semibold'
                  : 'border-gold-500/20 text-cream-100/50 hover:border-gold-400 hover:text-gold-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Room cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-cormorant text-2xl text-cream-100/30">No rooms found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RoomsSection;
