import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { faqs } from '../data/data';

const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div className="border-b border-gold-500/10 last:border-0">
    <button
      onClick={onToggle}
      className="w-full text-left py-5 flex items-start justify-between gap-4 group"
    >
      <span className="font-jost text-sm md:text-base text-cream-50/80 group-hover:text-gold-300 transition-colors">
        {faq.question}
      </span>
      <div className="shrink-0 w-7 h-7 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:bg-gold-500/10 transition-all mt-0.5">
        {isOpen ? <FiMinus size={14} /> : <FiPlus size={14} />}
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="font-jost text-sm text-cream-100/50 leading-relaxed pb-5">
            {faq.answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQSection = () => {
  const [openId, setOpenId] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const half = Math.ceil(faqs.length / 2);
  const left = faqs.slice(0, half);
  const right = faqs.slice(half);

  return (
    <section className="py-28 px-6 bg-navy-950">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="section-subtitle mb-4"
          >
            Common Questions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mb-5"
          >
            Frequently Asked<br />
            <span className="gold-text italic">Questions</span>
          </motion.h2>
          <div className="divider-gold" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {left.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {right.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center mt-14 p-8 border border-gold-500/10 bg-navy-800/30 rounded-sm"
        >
          <p className="font-cormorant text-2xl text-cream-50 mb-3">Still have questions?</p>
          <p className="font-jost text-sm text-cream-100/50 mb-6">Our concierge team is available 24/7 to assist you with any queries.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919876543210" className="btn-gold rounded-sm text-xs px-8 py-4">
              Call Us Now
            </a>
            <a href="mailto:gmvarun60@gmail.com" className="btn-outline rounded-sm text-xs px-8 py-4">
              Email Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
