import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiX, FiArrowRight } from 'react-icons/fi';
import { galleryImages } from '../data/data';

const GallerySection = () => {
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const preview = galleryImages.slice(0, 8);

  return (
    <section id="gallery" className="py-28 px-6 bg-navy-900 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="section-subtitle mb-4"
          >
            Visual Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mb-5"
          >
            Gallery of<br />
            <span className="gold-text italic">Moments</span>
          </motion.h2>
          <div className="divider-gold" />
        </div>

        {/* Masonry grid */}
        <div className="masonry-grid mb-10">
          {preview.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.07, duration: 0.6 }}
              className="masonry-item group relative overflow-hidden cursor-pointer rounded-sm"
              onClick={() => setSelected(img)}
            >
              <div className={img.tall ? 'h-80' : 'h-52'}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/40 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 glass rounded-full px-4 py-2">
                  <span className="font-jost text-xs text-gold-400 tracking-widest uppercase">{img.alt}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-3 font-jost text-sm uppercase tracking-widest text-gold-400 border border-gold-500/30 px-8 py-4 hover:bg-gold-500/10 hover:border-gold-400 transition-all duration-300 rounded-sm group"
          >
            View Full Gallery
            <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/95 backdrop-blur-xl p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <img
                src={selected.src}
                alt={selected.alt}
                className="w-full max-h-[80vh] object-cover rounded-sm"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy-900/80 to-transparent rounded-b-sm">
                <p className="font-jost text-sm text-gold-400 tracking-widest uppercase">{selected.alt}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-gold-400 rounded-full flex items-center justify-center text-navy-900 hover:bg-gold-300 transition-colors shadow-lg"
              >
                <FiX size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
