import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight, FiMessageSquare } from 'react-icons/fi';
import { testimonials } from '../data/data';

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <FiStar key={i} size={14} className={i < rating ? 'text-gold-400 fill-gold-400' : 'text-cream-100/20'} />
    ))}
  </div>
);

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const next = () => setActive((p) => (p + 1) % testimonials.length);
  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-28 px-6 bg-navy-950 relative overflow-hidden">
      {/* BG pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-gold-400 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-gold-400 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="section-subtitle mb-4"
          >
            Guest Stories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mb-5"
          >
            What Our Guests<br />
            <span className="gold-text italic">Are Saying</span>
          </motion.h2>
          <div className="divider-gold" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Featured testimonial */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="glass border border-gold-500/15 rounded-sm p-8 h-full flex flex-col"
              >
                {/* Quote icon */}
                <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-6">
                  <FiMessageSquare size={20} className="text-gold-400" />
                </div>

                <StarRating rating={testimonials[active].rating} />

                <p className="font-cormorant text-xl text-cream-50/90 leading-relaxed mt-5 mb-6 italic flex-1">
                  "{testimonials[active].text}"
                </p>

                <div className="border-t border-gold-500/10 pt-5 flex items-center gap-4">
                  <img
                    src={testimonials[active].avatar}
                    alt={testimonials[active].name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gold-400/40"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-jost font-semibold text-cream-50">{testimonials[active].name}</p>
                    <p className="font-jost text-xs text-cream-100/50">{testimonials[active].role} · {testimonials[active].location}</p>
                    <p className="font-jost text-xs text-gold-400/60 mt-0.5">{testimonials[active].stay} · {testimonials[active].date}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Other testimonials list */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            {testimonials.map((t, i) => (
              i !== active && (
                <button
                  key={t.id}
                  onClick={() => setActive(i)}
                  className="text-left p-5 border border-gold-500/10 hover:border-gold-400/30 bg-navy-800/30 hover:bg-navy-800/60 rounded-sm transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-8 h-8 rounded-full object-cover border border-gold-400/20"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-jost text-sm font-medium text-cream-50 group-hover:text-gold-300 transition-colors">{t.name}</p>
                      <p className="font-jost text-[10px] text-cream-100/40">{t.stay}</p>
                    </div>
                    <div className="ml-auto">
                      <StarRating rating={t.rating} />
                    </div>
                  </div>
                  <p className="font-jost text-xs text-cream-100/50 line-clamp-2 leading-relaxed">"{t.text}"</p>
                </button>
              )
            ))}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full border border-gold-500/20 flex items-center justify-center text-gold-400 hover:bg-gold-500/10 transition-all"
          >
            <FiChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${i === active ? 'w-8 h-2 bg-gold-400' : 'w-2 h-2 bg-cream-100/20'}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-11 h-11 rounded-full border border-gold-500/20 flex items-center justify-center text-gold-400 hover:bg-gold-500/10 transition-all"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
