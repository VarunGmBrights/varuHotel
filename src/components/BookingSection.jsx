import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiCalendar, FiUsers, FiHome, FiCheck, FiX } from 'react-icons/fi';

const BookingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [form, setForm] = useState({
    checkin: today,
    checkout: tomorrow,
    guests: '2',
    room: '',
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const errs = {};
    if (!form.checkin) errs.checkin = 'Please select a check-in date';
    if (!form.checkout) errs.checkout = 'Please select a check-out date';
    if (form.checkin && form.checkout && form.checkin >= form.checkout)
      errs.checkout = 'Check-out must be after check-in';
    if (!form.guests) errs.guests = 'Please select number of guests';
    if (!form.room) errs.room = 'Please select a room type';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowModal(true);
    }, 1500);
  };

  const nights = form.checkin && form.checkout
    ? Math.max(0, Math.floor((new Date(form.checkout) - new Date(form.checkin)) / 86400000))
    : 0;

  return (
    <section id="booking" className="py-28 px-6 bg-navy-900 relative overflow-hidden">
      {/* Bg decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-navy-800/50" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="section-subtitle mb-4"
          >
            Reserve Your Stay
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mb-5"
          >
            Book Your<br />
            <span className="gold-text italic">Experience</span>
          </motion.h2>
          <div className="divider-gold" />
        </div>

        {/* Booking form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="glass border border-gold-500/15 rounded-sm p-8 md:p-12"
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Check-in */}
              <div>
                <label className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-gold-400 mb-3">
                  <FiCalendar size={12} /> Check-In Date
                </label>
                <input
                  type="date"
                  name="checkin"
                  value={form.checkin}
                  min={today}
                  onChange={handleChange}
                  className={`w-full bg-navy-800/60 border ${errors.checkin ? 'border-red-500' : 'border-gold-500/20 focus:border-gold-400'} px-4 py-3.5 font-jost text-sm text-cream-50 focus:outline-none transition-colors rounded-sm`}
                />
                {errors.checkin && <p className="font-jost text-xs text-red-400 mt-1">{errors.checkin}</p>}
              </div>

              {/* Check-out */}
              <div>
                <label className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-gold-400 mb-3">
                  <FiCalendar size={12} /> Check-Out Date
                </label>
                <input
                  type="date"
                  name="checkout"
                  value={form.checkout}
                  min={form.checkin || today}
                  onChange={handleChange}
                  className={`w-full bg-navy-800/60 border ${errors.checkout ? 'border-red-500' : 'border-gold-500/20 focus:border-gold-400'} px-4 py-3.5 font-jost text-sm text-cream-50 focus:outline-none transition-colors rounded-sm`}
                />
                {errors.checkout && <p className="font-jost text-xs text-red-400 mt-1">{errors.checkout}</p>}
              </div>

              {/* Guests */}
              <div>
                <label className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-gold-400 mb-3">
                  <FiUsers size={12} /> Guests
                </label>
                <select
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  className={`w-full bg-navy-800/60 border ${errors.guests ? 'border-red-500' : 'border-gold-500/20 focus:border-gold-400'} px-4 py-3.5 font-jost text-sm text-cream-50 focus:outline-none transition-colors rounded-sm appearance-none cursor-pointer`}
                >
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <option key={n} value={n} className="bg-navy-900">{n} Guest{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
                {errors.guests && <p className="font-jost text-xs text-red-400 mt-1">{errors.guests}</p>}
              </div>

              {/* Room type */}
              <div>
                <label className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-gold-400 mb-3">
                  <FiHome size={12} /> Room Type
                </label>
                <select
                  name="room"
                  value={form.room}
                  onChange={handleChange}
                  className={`w-full bg-navy-800/60 border ${errors.room ? 'border-red-500' : 'border-gold-500/20 focus:border-gold-400'} px-4 py-3.5 font-jost text-sm text-cream-50 focus:outline-none transition-colors rounded-sm appearance-none cursor-pointer`}
                >
                  <option value="" className="bg-navy-900">Select Room Type</option>
                  <option value="deluxe" className="bg-navy-900">Deluxe Room — ₹4,999/night</option>
                  <option value="executive" className="bg-navy-900">Executive Suite — ₹9,999/night</option>
                  <option value="family" className="bg-navy-900">Family Room — ₹7,999/night</option>
                  <option value="villa" className="bg-navy-900">Luxury Villa — ₹24,999/night</option>
                  <option value="premium" className="bg-navy-900">Premium Suite — ₹12,999/night</option>
                  <option value="ocean" className="bg-navy-900">Ocean Studio — ₹6,999/night</option>
                </select>
                {errors.room && <p className="font-jost text-xs text-red-400 mt-1">{errors.room}</p>}
              </div>
            </div>

            {/* Summary row */}
            {nights > 0 && form.room && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-gold-500/5 border border-gold-500/20 rounded-sm px-6 py-4 mb-8 flex items-center justify-between flex-wrap gap-4"
              >
                <div className="flex items-center gap-6">
                  <div>
                    <p className="font-jost text-xs text-cream-100/40 uppercase tracking-widest">Duration</p>
                    <p className="font-cormorant text-xl text-cream-50">{nights} Night{nights > 1 ? 's' : ''}</p>
                  </div>
                  <div className="w-px h-8 bg-gold-500/20" />
                  <div>
                    <p className="font-jost text-xs text-cream-100/40 uppercase tracking-widest">Guests</p>
                    <p className="font-cormorant text-xl text-cream-50">{form.guests}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-jost text-xs text-cream-100/40 uppercase tracking-widest">Estimated Total</p>
                  <p className="font-cormorant text-2xl text-gold-400 font-semibold">Contact Us for Pricing</p>
                </div>
              </motion.div>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="btn-gold rounded-sm min-w-[220px] flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-navy-900/30 border-t-navy-900 rounded-full"
                    />
                    Checking Availability...
                  </>
                ) : (
                  'Check Availability'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-navy-900/80 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-navy-800 border border-gold-400/30 rounded-sm p-10 max-w-md w-full text-center relative"
            >
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-cream-100/40 hover:text-gold-400 transition-colors">
                <FiX size={20} />
              </button>

              {/* Success icon */}
              <div className="w-20 h-20 rounded-full bg-gold-500/20 border border-gold-400/40 flex items-center justify-center mx-auto mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  <FiCheck size={36} className="text-gold-400" />
                </motion.div>
              </div>

              <h3 className="font-cormorant text-3xl text-cream-50 mb-3">Room Available!</h3>
              <p className="font-jost text-sm text-cream-100/60 mb-6 leading-relaxed">
                Excellent news! Your selected room is available for your chosen dates. Our reservations team will contact you within the next hour to confirm your booking.
              </p>

              <div className="bg-navy-900/50 border border-gold-500/15 rounded-sm p-4 mb-6 text-left space-y-2">
                {[
                  ['Check-In', form.checkin],
                  ['Check-Out', form.checkout],
                  ['Guests', `${form.guests} guest${form.guests > 1 ? 's' : ''}`],
                  ['Duration', `${nights} night${nights > 1 ? 's' : ''}`],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between">
                    <span className="font-jost text-xs text-cream-100/40 uppercase tracking-widest">{label}</span>
                    <span className="font-jost text-sm text-cream-100/80">{val}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-outline flex-1 py-3 text-xs rounded-sm"
                >
                  Modify
                </button>
                <a
                  href="tel:+919876543210"
                  className="btn-gold flex-1 py-3 text-xs rounded-sm text-center"
                >
                  Call to Confirm
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BookingSection;
