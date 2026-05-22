import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiAward, FiStar, FiHeart } from 'react-icons/fi';
import { stats } from '../data/data';
import { useEffect, useState } from 'react';

const CounterNumber = ({ value, suffix, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const step = (end / duration) * 16;

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span className="font-cormorant text-5xl md:text-6xl font-light text-gold-400">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const statsRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-28 px-6 bg-navy-900 relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
        <div className="w-full h-full" style={{
          background: 'radial-gradient(ellipse at right center, #d4a853 0%, transparent 70%)'
        }} />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: images */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=700&q=80"
                alt="Varun GM Hotel Lobby"
                className="w-full h-96 object-cover rounded-sm"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent rounded-sm" />
            </div>
            {/* Floating image */}
            <div className="absolute -bottom-10 -right-6 w-48 h-60 hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80"
                alt="Fine Dining"
                className="w-full h-full object-cover border-4 border-navy-900 rounded-sm shadow-2xl"
                loading="lazy"
              />
            </div>
            {/* Badge */}
            <div className="absolute -top-5 -left-5 glass border border-gold-400/30 rounded-full w-28 h-28 flex flex-col items-center justify-center hidden md:flex">
              <FiAward size={20} className="text-gold-400 mb-1" />
              <span className="font-cormorant text-2xl font-semibold text-gold-400">5★</span>
              <span className="font-jost text-[9px] tracking-widest text-cream-100/50 uppercase">Luxury</span>
            </div>
          </motion.div>

          {/* Right: content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pl-8"
          >
            <p className="section-subtitle mb-5">Our Story</p>
            <h2 className="section-title mb-6">
              A Legacy of<br />
              <span className="gold-text italic">Exceptional Hospitality</span>
            </h2>
            <div className="divider-gold mb-8 ml-0" style={{ margin: '0 0 2rem 0' }} />

            <div className="space-y-5 font-jost text-cream-100/60 leading-relaxed text-base">
              <p>
                Founded in 2010, Varun GM Hotel was born from a singular vision: to create a sanctuary where luxury transcends expectation and hospitality becomes an art form. What began as a boutique property has evolved into one of India's most celebrated luxury destinations.
              </p>
              <p>
                Every corner of our hotel tells a story of craftsmanship, cultural heritage, and contemporary elegance. We draw inspiration from India's rich architectural traditions while embracing the finest in modern design and technology.
              </p>
              <p>
                Our philosophy is simple — every guest deserves to feel like royalty. From the moment you arrive to the moment you reluctantly depart, every detail is orchestrated to create memories that last a lifetime.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 mt-10">
              {[
                { icon: FiAward, label: 'Award-Winning Hotel' },
                { icon: FiStar, label: 'Forbes Five-Star Rated' },
                { icon: FiHeart, label: '98% Guest Satisfaction' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                    <Icon size={16} className="text-gold-400" />
                  </div>
                  <span className="font-jost text-sm text-cream-100/60">{label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-gold mt-10 rounded-sm inline-block"
            >
              Experience It Yourself
            </button>
          </motion.div>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center p-6 border border-gold-500/10 bg-navy-800/30 rounded-sm"
            >
              <CounterNumber value={stat.value} suffix={stat.suffix} isInView={statsInView} />
              <p className="font-jost text-xs text-cream-100/40 uppercase tracking-widest mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
