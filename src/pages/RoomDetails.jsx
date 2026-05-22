import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiArrowLeft, FiMaximize, FiUsers, FiEye, FiCheck, FiX } from 'react-icons/fi';
import { rooms } from '../data/data';

const RoomDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const room = rooms.find((r) => r.slug === slug);
  const [activeImg, setActiveImg] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [form, setForm] = useState({ checkin: '', checkout: '', guests: '2', name: '', email: '' });

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-cormorant text-4xl text-cream-50 mb-4">Room not found</h2>
          <Link to="/" className="btn-gold rounded-sm text-xs">Back to Home</Link>
        </div>
      </div>
    );
  }

  const similar = rooms.filter((r) => r.id !== room.id && r.category === room.category).slice(0, 3);
  const others = rooms.filter((r) => r.id !== room.id).slice(0, 3);
  const suggestions = similar.length ? similar : others;

  const handleBook = (e) => {
    e.preventDefault();
    setTimeout(() => { setBooked(true); }, 1000);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="pt-20 min-h-screen bg-navy-900">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 font-jost text-sm text-cream-100/50 hover:text-gold-400 transition-colors group"
        >
          <FiArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Rooms
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Image gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">
          <div className="lg:col-span-2">
            <motion.img
              key={activeImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              src={room.images?.[activeImg] || room.image}
              alt={room.title}
              className="w-full h-[400px] md:h-[520px] object-cover rounded-sm"
            />
          </div>
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto">
            {(room.images || [room.image]).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`shrink-0 rounded-sm overflow-hidden border-2 transition-all duration-300 ${
                  i === activeImg ? 'border-gold-400' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-32 h-24 lg:w-full lg:h-28 object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Details */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-jost text-xs tracking-[0.2em] uppercase bg-gold-500/20 border border-gold-500/30 text-gold-300 px-3 py-1 rounded-full">
                  {room.subtitle}
                </span>
                <div className="flex items-center gap-1 ml-2">
                  <FiStar size={13} className="text-gold-400 fill-gold-400" />
                  <span className="font-jost text-sm text-cream-100/70">{room.rating} ({room.reviews} reviews)</span>
                </div>
              </div>
              <h1 className="font-cormorant text-5xl md:text-6xl text-cream-50 mb-4">{room.title}</h1>
              <p className="font-jost text-base text-cream-100/60 leading-relaxed max-w-2xl">{room.longDescription}</p>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { icon: FiMaximize, label: 'Size', val: room.size },
                { icon: FiUsers, label: 'Capacity', val: room.capacity },
                { icon: FiEye, label: 'View', val: room.view },
                { icon: FiCheck, label: 'Bed', val: room.bed },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="p-4 border border-gold-500/10 bg-navy-800/30 rounded-sm text-center">
                  <Icon size={18} className="text-gold-400 mx-auto mb-2" />
                  <p className="font-jost text-[10px] uppercase tracking-widest text-cream-100/40 mb-1">{label}</p>
                  <p className="font-jost text-sm text-cream-50">{val}</p>
                </div>
              ))}
            </div>

            {/* Amenities */}
            <div className="mb-10">
              <h2 className="font-cormorant text-3xl text-cream-50 mb-6">Room Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {room.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0">
                      <FiCheck size={10} className="text-gold-400" />
                    </div>
                    <span className="font-jost text-sm text-cream-100/60">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews placeholder */}
            <div>
              <h2 className="font-cormorant text-3xl text-cream-50 mb-6">Guest Reviews</h2>
              <div className="space-y-4">
                {[
                  { name: 'Ananya K.', rating: 5, text: 'Absolutely stunning room! Every detail was perfect, from the bedding to the view.', date: 'April 2025' },
                  { name: 'Rohit M.', rating: 5, text: 'The service was impeccable. The room exceeded all our expectations.', date: 'March 2025' },
                ].map((r, i) => (
                  <div key={i} className="p-5 border border-gold-500/10 bg-navy-800/20 rounded-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-jost font-semibold text-cream-50 text-sm">{r.name}</p>
                        <p className="font-jost text-xs text-cream-100/40">{r.date}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <FiStar key={j} size={12} className={j < r.rating ? 'text-gold-400 fill-gold-400' : 'text-cream-100/20'} />
                        ))}
                      </div>
                    </div>
                    <p className="font-jost text-sm text-cream-100/60">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Booking sidebar */}
          <div>
            <div className="sticky top-28 glass border border-gold-500/15 rounded-sm p-6">
              <div className="mb-5 pb-5 border-b border-gold-500/10">
                <p className="font-jost text-xs text-cream-100/40 uppercase tracking-widest mb-1">Starting From</p>
                {room.originalPrice && (
                  <span className="font-jost text-sm text-cream-100/30 line-through mr-2">₹{room.originalPrice.toLocaleString()}</span>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="font-cormorant text-4xl text-gold-400 font-semibold">₹{room.price.toLocaleString()}</span>
                  <span className="font-jost text-sm text-cream-100/40">/night</span>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <div>
                  <label className="font-jost text-[10px] uppercase tracking-widest text-gold-400 block mb-1.5">Check-In</label>
                  <input
                    type="date"
                    min={today}
                    value={form.checkin}
                    onChange={(e) => setForm({ ...form, checkin: e.target.value })}
                    className="w-full bg-navy-800/60 border border-gold-500/20 focus:border-gold-400 px-3 py-2.5 font-jost text-sm text-cream-50 focus:outline-none rounded-sm"
                  />
                </div>
                <div>
                  <label className="font-jost text-[10px] uppercase tracking-widest text-gold-400 block mb-1.5">Check-Out</label>
                  <input
                    type="date"
                    min={form.checkin || today}
                    value={form.checkout}
                    onChange={(e) => setForm({ ...form, checkout: e.target.value })}
                    className="w-full bg-navy-800/60 border border-gold-500/20 focus:border-gold-400 px-3 py-2.5 font-jost text-sm text-cream-50 focus:outline-none rounded-sm"
                  />
                </div>
                <div>
                  <label className="font-jost text-[10px] uppercase tracking-widest text-gold-400 block mb-1.5">Guests</label>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    className="w-full bg-navy-800/60 border border-gold-500/20 focus:border-gold-400 px-3 py-2.5 font-jost text-sm text-cream-50 focus:outline-none rounded-sm"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n} className="bg-navy-900">{n} Guest{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={() => setShowBooking(true)}
                className="btn-gold w-full text-center text-xs py-4 rounded-sm mb-3"
              >
                Book This Room
              </button>
              <a
                href="tel:+919876543210"
                className="btn-outline w-full text-center text-xs py-4 rounded-sm block"
              >
                Call to Reserve
              </a>

              <div className="mt-5 pt-5 border-t border-gold-500/10 space-y-2">
                {['Free cancellation up to 48hrs', 'No prepayment required', 'Best rate guarantee'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <FiCheck size={12} className="text-gold-400 shrink-0" />
                    <span className="font-jost text-xs text-cream-100/50">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Rooms */}
        {suggestions.length > 0 && (
          <div className="mt-20">
            <h2 className="font-cormorant text-4xl text-cream-50 mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestions.map((r) => (
                <Link
                  key={r.id}
                  to={`/rooms/${r.slug}`}
                  className="group border border-gold-500/10 hover:border-gold-400/30 bg-navy-800/30 rounded-sm overflow-hidden transition-all duration-300 card-hover"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-cormorant text-xl text-cream-50 group-hover:text-gold-300 transition-colors mb-1">{r.title}</h3>
                    <p className="font-jost text-xs text-cream-100/40 mb-3">{r.subtitle}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-cormorant text-xl text-gold-400 font-semibold">₹{r.price.toLocaleString()}</span>
                      <span className="font-jost text-xs text-gold-400 uppercase tracking-widest">View →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking modal */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-navy-900/80 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-navy-800 border border-gold-400/30 rounded-sm p-8 max-w-md w-full"
          >
            {!booked ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-cormorant text-2xl text-cream-50">Complete Your Booking</h3>
                  <button onClick={() => setShowBooking(false)} className="text-cream-100/40 hover:text-gold-400 transition-colors">
                    <FiX size={20} />
                  </button>
                </div>
                <form onSubmit={handleBook} className="space-y-4">
                  <div>
                    <label className="font-jost text-xs uppercase tracking-widest text-gold-400 block mb-1.5">Full Name</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full bg-navy-900/60 border border-gold-500/20 focus:border-gold-400 px-4 py-3 font-jost text-sm text-cream-50 focus:outline-none placeholder-cream-100/30 rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="font-jost text-xs uppercase tracking-widest text-gold-400 block mb-1.5">Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-navy-900/60 border border-gold-500/20 focus:border-gold-400 px-4 py-3 font-jost text-sm text-cream-50 focus:outline-none placeholder-cream-100/30 rounded-sm"
                    />
                  </div>
                  <div className="p-4 bg-gold-500/5 border border-gold-500/15 rounded-sm">
                    <div className="flex justify-between mb-1">
                      <span className="font-jost text-xs text-cream-100/40">Room</span>
                      <span className="font-jost text-xs text-cream-100/70">{room.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-jost text-xs text-cream-100/40">Rate per night</span>
                      <span className="font-jost text-xs text-gold-400">₹{room.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <button type="submit" className="btn-gold w-full py-4 text-xs rounded-sm">
                    Confirm Reservation
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-gold-500/20 border border-gold-400/40 flex items-center justify-center mx-auto mb-5">
                  <FiCheck size={28} className="text-gold-400" />
                </div>
                <h3 className="font-cormorant text-3xl text-cream-50 mb-3">Booking Confirmed!</h3>
                <p className="font-jost text-sm text-cream-100/60 mb-6">
                  Thank you, {form.name}! Your reservation for the {room.title} has been received. We'll send a confirmation to {form.email} shortly.
                </p>
                <button onClick={() => { setShowBooking(false); setBooked(false); }} className="btn-gold rounded-sm text-xs px-8 py-3">
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
