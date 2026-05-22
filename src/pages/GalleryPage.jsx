import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { galleryImages } from '../data/data';

const categories = ['All', 'Exterior', 'Rooms', 'Pool', 'Dining', 'Spa', 'Interior'];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory.toLowerCase());

  const openLightbox = (img) => setLightbox(img);

  const navigate = (dir) => {
    const currentIdx = filtered.findIndex((img) => img.id === lightbox.id);
    const next = (currentIdx + dir + filtered.length) % filtered.length;
    setLightbox(filtered[next]);
  };

  return (
    <div className="pt-20 min-h-screen bg-navy-900">
      {/* Header */}
      <div className="relative h-48 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600&q=80"
          alt="Gallery"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-900/80" />
        <div ref={ref} className="relative text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="section-subtitle mb-3"
          >
            Visual Stories
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-cormorant text-5xl md:text-6xl text-cream-50"
          >
            Our <span className="gold-text italic">Gallery</span>
          </motion.h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
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
        </div>

        {/* Masonry */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="masonry-grid"
          >
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="masonry-item group relative overflow-hidden cursor-pointer rounded-sm"
                onClick={() => openLightbox(img)}
              >
                <div className={img.tall ? 'h-80' : 'h-56'}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/30 transition-all duration-500 flex items-end justify-start p-4">
                    <span className="font-jost text-xs tracking-widest uppercase text-gold-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 glass px-3 py-1 rounded-full">
                      {img.alt}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-center font-cormorant text-2xl text-cream-100/30 py-20">No images in this category.</p>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/97 backdrop-blur-xl"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full mx-4"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightbox.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  src={lightbox.src}
                  alt={lightbox.alt}
                  className="w-full max-h-[80vh] object-contain rounded-sm"
                />
              </AnimatePresence>

              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-navy-900/90 to-transparent rounded-b-sm">
                <p className="font-jost text-sm text-gold-400 uppercase tracking-widest">{lightbox.alt}</p>
                <p className="font-jost text-xs text-cream-100/40 capitalize">{lightbox.category}</p>
              </div>

              {/* Controls */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-gold-400 rounded-full flex items-center justify-center text-navy-900 hover:bg-gold-300 transition-colors shadow-lg"
              >
                <FiX size={18} />
              </button>
              <button
                onClick={() => navigate(-1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-gold-400 hover:bg-gold-500/20 transition-all"
              >
                <FiChevronLeft size={20} />
              </button>
              <button
                onClick={() => navigate(1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-gold-400 hover:bg-gold-500/20 transition-all"
              >
                <FiChevronRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
