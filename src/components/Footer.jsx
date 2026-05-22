import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiLinkedin, FiMapPin, FiPhone, FiMail, FiArrowRight } from 'react-icons/fi';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-950 border-t border-gold-500/10">
      {/* Newsletter bar */}
      <div className="border-b border-gold-500/10 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-cormorant text-2xl text-cream-50 mb-1">Stay in the know</h3>
            <p className="font-jost text-cream-100/50 text-sm">Get exclusive offers and early access to new experiences.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex gap-0 w-full md:w-auto min-w-[340px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-navy-800/50 border border-gold-500/20 border-r-0 px-5 py-3.5 text-cream-100 text-sm font-jost placeholder-cream-100/30 focus:outline-none focus:border-gold-400"
              required
            />
            <button
              type="submit"
              className="btn-gold px-6 py-3.5 text-xs whitespace-nowrap"
            >
              {subscribed ? '✓ Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <span className="font-cormorant text-2xl font-bold text-navy-900">V</span>
              </div>
              <div>
                <h2 className="font-cormorant text-2xl font-semibold text-cream-50">Varun GM</h2>
                <p className="font-jost text-[9px] tracking-[0.2em] text-gold-400/70 uppercase">Luxury Hotel & Resort</p>
              </div>
            </div>
            <p className="font-jost text-cream-100/50 text-sm leading-relaxed mb-6">
              Redefining luxury hospitality since 2010. Where every stay becomes a treasured memory and every guest becomes family.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { icon: FiInstagram, href: '#' },
                { icon: FiFacebook, href: '#' },
                { icon: FiTwitter, href: '#' },
                { icon: FiYoutube, href: '#' },
                { icon: FiLinkedin, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full border border-gold-500/20 flex items-center justify-center text-gold-400/60 hover:text-gold-400 hover:border-gold-400 hover:bg-gold-500/10 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-jost text-xs font-semibold tracking-[0.25em] uppercase text-gold-400 mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
                { label: 'Our Rooms', action: () => handleNavClick('rooms') },
                { label: 'Facilities', action: () => handleNavClick('facilities') },
                { label: 'About Us', action: () => handleNavClick('about') },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Contact', href: '/contact' },
                { label: 'Book Now', action: () => handleNavClick('booking') },
              ].map((item, i) => (
                <li key={i}>
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="font-jost text-sm text-cream-100/50 hover:text-gold-400 transition-colors flex items-center gap-2 group"
                    >
                      <FiArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={item.action}
                      className="font-jost text-sm text-cream-100/50 hover:text-gold-400 transition-colors flex items-center gap-2 group"
                    >
                      <FiArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Room Types */}
          <div>
            <h3 className="font-jost text-xs font-semibold tracking-[0.25em] uppercase text-gold-400 mb-6">Our Rooms</h3>
            <ul className="space-y-3">
              {['Deluxe Room', 'Executive Suite', 'Family Room', 'Luxury Villa', 'Premium Suite', 'Ocean Studio'].map((room) => (
                <li key={room}>
                  <Link
                    to={`/rooms/${room.toLowerCase().replace(' ', '-')}`}
                    className="font-jost text-sm text-cream-100/50 hover:text-gold-400 transition-colors flex items-center gap-2 group"
                  >
                    <FiArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {room}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-jost text-xs font-semibold tracking-[0.25em] uppercase text-gold-400 mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <FiMapPin size={16} className="text-gold-400 shrink-0 mt-0.5" />
                <span className="font-jost text-sm text-cream-100/50 leading-relaxed">
                  123 Palace Road, Luxury District,<br />Bengaluru, Karnataka 560001
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <FiPhone size={16} className="text-gold-400 shrink-0" />
                <a href="tel:+919876543210" className="font-jost text-sm text-cream-100/50 hover:text-gold-400 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <FiMail size={16} className="text-gold-400 shrink-0" />
                <a href="mailto:gmvarun60@gmail.com" className="font-jost text-sm text-cream-100/50 hover:text-gold-400 transition-colors">
                  gmvarun60@gmail.com
                </a>
              </li>
            </ul>

            <div className="mt-6 p-4 border border-gold-500/15 rounded-sm bg-gold-500/5">
              <p className="font-jost text-xs text-gold-400/70 uppercase tracking-widest mb-1">Reservations</p>
              <p className="font-cormorant text-xl text-cream-50">+91 98765 43210</p>
              <p className="font-jost text-xs text-cream-100/40 mt-0.5">Available 24 hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold-500/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-jost text-xs text-cream-100/30">
            © {new Date().getFullYear()} Varun GM Luxury Hotel & Resort. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms & Conditions', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="font-jost text-xs text-cream-100/30 hover:text-gold-400 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
