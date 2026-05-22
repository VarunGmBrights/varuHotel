import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-navy-900 flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        {/* Logo */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
              <span className="font-cormorant text-2xl font-bold text-navy-900">V</span>
            </div>
            <div>
              <h1 className="font-cormorant text-4xl font-semibold text-cream-50">Varun GM</h1>
              <p className="font-jost text-xs tracking-[0.3em] text-gold-400 uppercase">Luxury Hotel & Resort</p>
            </div>
          </motion.div>
        </div>

        {/* Loading bar */}
        <div className="w-64 h-0.5 bg-navy-800 rounded-full overflow-hidden mx-auto mb-6">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="font-jost text-xs tracking-[0.2em] text-gold-400/60 uppercase"
        >
          Preparing your experience...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
