import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiStar } from 'react-icons/fi';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=85',
    heading: 'Experience Luxury',
    subheading: '& Comfort',
    tagline: 'Where elegance meets tranquility',
  },
  {
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=85',
    heading: 'Private Villas',
    subheading: 'Beyond Compare',
    tagline: 'Exclusive retreats with every indulgence',
  },
  {
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920&q=85',
    heading: 'Infinite Serenity',
    subheading: 'Awaits You',
    tagline: 'Dive into a world of unparalleled relaxation',
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleBookClick = () => {
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreClick = () => {
    const el = document.getElementById('rooms');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt="Varun GM Hotel"
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-900/50 to-navy-900/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/60 via-transparent to-navy-900/40" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-8 w-px h-40 bg-gradient-to-b from-transparent via-gold-400/40 to-transparent hidden lg:block" />
      <div className="absolute top-1/4 right-8 w-px h-40 bg-gradient-to-b from-transparent via-gold-400/40 to-transparent hidden lg:block" />

      {/* Stars badge */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute top-32 left-8 lg:left-16 hidden md:flex items-center gap-2 glass px-4 py-2 rounded-full"
      >
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} size={11} className="text-gold-400 fill-gold-400" />
          ))}
        </div>
        <span className="font-jost text-xs text-cream-100/70">5-Star Luxury Hotel</span>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="h-px w-12 bg-gold-400/60" />
          <span className="font-jost text-xs tracking-[0.4em] uppercase text-gold-400">Welcome to Varun GM</span>
          <div className="h-px w-12 bg-gold-400/60" />
        </motion.div>

        {/* Heading */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-cormorant text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-cream-50 leading-none mb-2"
          >
            {slides[current].heading}
            <br />
            <span className="gold-text italic">{slides[current].subheading}</span>
          </motion.h1>
        </AnimatePresence>

        {/* Tagline */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`tag-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-jost text-base md:text-lg text-cream-100/60 mt-6 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {slides[current].tagline} — crafted for those who demand nothing but the finest in every detail of their stay.
          </motion.p>
        </AnimatePresence>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button onClick={handleBookClick} className="btn-gold rounded-sm min-w-[180px]">
            Book Your Stay
          </button>
          <button onClick={handleExploreClick} className="btn-outline rounded-sm min-w-[180px]">
            Explore Rooms
          </button>
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-0.5 rounded-full transition-all duration-500 ${
              i === current ? 'w-10 bg-gold-400' : 'w-4 bg-cream-100/30'
            }`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => document.getElementById('facilities')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-100/40 hover:text-gold-400 transition-colors z-10"
      >
        <span className="font-jost text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <FiChevronDown size={18} />
      </motion.button>

      {/* Floating stats card */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-20 right-8 lg:right-16 hidden lg:block glass rounded-sm p-5"
      >
        <div className="flex items-center gap-6">
          {[
            { val: '5★', label: 'Rating' },
            { val: '15+', label: 'Years' },
            { val: '98%', label: 'Satisfied' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-cormorant text-2xl text-gold-400 font-semibold">{s.val}</p>
              <p className="font-jost text-[10px] tracking-widest uppercase text-cream-100/40">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
