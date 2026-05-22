import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon, FiPhone } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Rooms', href: '/#rooms' },
  { label: 'Facilities', href: '/#facilities' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleNavClick = (href) => {
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      if (location.pathname !== '/') {
        window.location.href = href;
        return;
      }
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-navy-900/95 backdrop-blur-xl border-b border-gold-500/10 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        {/* Top strip */}
        {!scrolled && (
          <div className="hidden md:flex bg-navy-900/80 border-b border-gold-500/10 px-8 py-1.5 items-center justify-between text-xs font-jost">
            <div className="flex items-center gap-6 text-cream-100/50">
              <span className="flex items-center gap-1.5"><FiPhone size={11} /> +91 98765 43210</span>
              <span>gmvarun60@gmail.com</span>
            </div>
            <div className="flex items-center gap-4 text-gold-400">
              <span className="tracking-widest uppercase text-[10px]">✦ Open 24/7 · Check-in 3PM · Check-out 12PM ✦</span>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg group-hover:shadow-gold-500/30 transition-all duration-300">
              <span className="font-cormorant text-xl font-bold text-navy-900">V</span>
            </div>
            <div>
              <h1 className="font-cormorant text-2xl font-semibold text-cream-50 leading-none">Varun GM</h1>
              <p className="font-jost text-[9px] tracking-[0.25em] text-gold-400/80 uppercase">Luxury Hotel & Resort</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              link.href.startsWith('/#') ? (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="font-jost text-sm font-medium text-cream-100/70 hover:text-gold-400 transition-colors duration-300 tracking-wider uppercase text-xs relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 group-hover:w-full transition-all duration-300" />
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-jost text-sm font-medium text-cream-100/70 hover:text-gold-400 transition-colors duration-300 tracking-wider uppercase text-xs relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 group-hover:w-full transition-all duration-300" />
                </Link>
              )
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="hidden lg:flex w-9 h-9 rounded-full border border-gold-500/20 items-center justify-center text-gold-400 hover:bg-gold-500/10 transition-all duration-300"
            >
              {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>

            {/* Book Now CTA */}
            <button
              onClick={() => handleNavClick('/#booking')}
              className="hidden lg:block btn-gold text-xs px-6 py-3 rounded-sm"
            >
              Book Now
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-gold-400 rounded-full border border-gold-500/20 hover:bg-gold-500/10 transition-all"
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-navy-900/95 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-navy-900 border-l border-gold-500/10 flex flex-col">
              {/* Mobile menu header */}
              <div className="p-6 border-b border-gold-500/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                    <span className="font-cormorant text-base font-bold text-navy-900">V</span>
                  </div>
                  <span className="font-cormorant text-xl text-cream-50">Varun GM</span>
                </div>
                <button onClick={() => setMenuOpen(false)} className="text-gold-400">
                  <FiX size={22} />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto p-6">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      {link.href.startsWith('/#') ? (
                        <button
                          onClick={() => handleNavClick(link.href)}
                          className="w-full text-left py-4 px-4 font-jost text-sm uppercase tracking-widest text-cream-100/70 hover:text-gold-400 hover:bg-gold-500/5 rounded transition-all border-b border-navy-800"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <Link
                          to={link.href}
                          className="block py-4 px-4 font-jost text-sm uppercase tracking-widest text-cream-100/70 hover:text-gold-400 hover:bg-gold-500/5 rounded transition-all border-b border-navy-800"
                        >
                          {link.label}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Mobile footer */}
              <div className="p-6 border-t border-gold-500/10 space-y-3">
                <button
                  onClick={() => handleNavClick('/#booking')}
                  className="btn-gold w-full text-center text-xs py-4 rounded-sm"
                >
                  Book Now
                </button>
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-center gap-2 py-3 border border-gold-500/20 text-gold-400 text-sm rounded hover:bg-gold-500/10 transition-all"
                >
                  {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </button>
                <div className="text-center">
                  <p className="text-cream-100/40 text-xs">+91 98765 43210</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
