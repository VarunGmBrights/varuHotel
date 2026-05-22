import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiSend, FiCheck, FiAlertCircle, FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

const ContactPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('loading');

    try {
      // Using FormSubmit.co — sends directly to gmvarun60@gmail.com
      const response = await fetch('https://formsubmit.co/ajax/gmvarun60@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || 'Not provided',
          subject: form.subject || 'General Inquiry — Varun GM Hotel',
          message: form.message,
          _subject: `New Contact: ${form.subject || 'General Inquiry'} — Varun GM Hotel`,
        }),
      });

      const data = await response.json();
      if (data.success === 'true' || response.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      title: 'Visit Us',
      lines: ['123 Palace Road, Luxury District', 'Bengaluru, Karnataka 560001'],
    },
    {
      icon: FiPhone,
      title: 'Call Us',
      lines: ['+91 98765 43210', '+91 80 4567 8900'],
    },
    {
      icon: FiMail,
      title: 'Email Us',
      lines: ['gmvarun60@gmail.com', 'reservations@varungm.com'],
    },
    {
      icon: FiClock,
      title: 'Hours',
      lines: ['Reservations: 24/7', 'Front Desk: 24/7'],
    },
  ];

  return (
    <div className="pt-20 min-h-screen bg-navy-900">
      {/* Hero banner */}
      <div className="relative h-56 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80"
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-900/80" />
        <div className="relative text-center">
          <p className="section-subtitle mb-3">We're Here to Help</p>
          <h1 className="font-cormorant text-5xl md:text-6xl text-cream-50">
            Get In <span className="gold-text italic">Touch</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-cormorant text-4xl text-cream-50 mb-3">
                Let's Start a<br />
                <span className="gold-text italic">Conversation</span>
              </h2>
              <p className="font-jost text-sm text-cream-100/50 leading-relaxed mb-10">
                Whether you're planning your visit, have a special request, or simply want to learn more about what we offer, our team is ready to assist.
              </p>

              <div className="space-y-6">
                {contactInfo.map(({ icon: Icon, title, lines }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                      <Icon size={17} className="text-gold-400" />
                    </div>
                    <div>
                      <p className="font-jost text-xs uppercase tracking-widest text-gold-400 mb-1">{title}</p>
                      {lines.map((line) => (
                        <p key={line} className="font-jost text-sm text-cream-100/60">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-10 rounded-sm overflow-hidden border border-gold-500/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9856756083!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="200"
                  style={{ border: 0, filter: 'grayscale(80%) invert(10%)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Varun GM Hotel Location"
                />
              </div>
            </motion.div>
          </div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass border border-gold-500/15 rounded-sm p-8 md:p-10">
              <h3 className="font-cormorant text-3xl text-cream-50 mb-8">Send Us a Message</h3>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-5 bg-green-500/10 border border-green-500/30 rounded-sm flex items-start gap-3"
                >
                  <FiCheck size={20} className="text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-jost font-semibold text-green-400 text-sm">Message Sent Successfully!</p>
                    <p className="font-jost text-xs text-cream-100/60 mt-1">
                      Thank you for reaching out. Our team will respond within 24 hours.
                    </p>
                  </div>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-5 bg-red-500/10 border border-red-500/30 rounded-sm flex items-start gap-3"
                >
                  <FiAlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-jost font-semibold text-red-400 text-sm">Something went wrong</p>
                    <p className="font-jost text-xs text-cream-100/60 mt-1">
                      Please try again or contact us directly at gmvarun60@gmail.com
                    </p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="font-jost text-xs uppercase tracking-widest text-gold-400 block mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`w-full bg-navy-800/60 border ${errors.name ? 'border-red-500' : 'border-gold-500/20 focus:border-gold-400'} px-4 py-3.5 font-jost text-sm text-cream-50 focus:outline-none transition-colors placeholder-cream-100/25 rounded-sm`}
                    />
                    {errors.name && <p className="font-jost text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="font-jost text-xs uppercase tracking-widest text-gold-400 block mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`w-full bg-navy-800/60 border ${errors.email ? 'border-red-500' : 'border-gold-500/20 focus:border-gold-400'} px-4 py-3.5 font-jost text-sm text-cream-50 focus:outline-none transition-colors placeholder-cream-100/25 rounded-sm`}
                    />
                    {errors.email && <p className="font-jost text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div>
                    <label className="font-jost text-xs uppercase tracking-widest text-gold-400 block mb-2">Phone</label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="w-full bg-navy-800/60 border border-gold-500/20 focus:border-gold-400 px-4 py-3.5 font-jost text-sm text-cream-50 focus:outline-none transition-colors placeholder-cream-100/25 rounded-sm"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="font-jost text-xs uppercase tracking-widest text-gold-400 block mb-2">Subject</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full bg-navy-800/60 border border-gold-500/20 focus:border-gold-400 px-4 py-3.5 font-jost text-sm text-cream-50 focus:outline-none transition-colors rounded-sm appearance-none"
                    >
                      <option value="" className="bg-navy-900">Select subject</option>
                      <option value="Reservation Inquiry" className="bg-navy-900">Reservation Inquiry</option>
                      <option value="Special Request" className="bg-navy-900">Special Request</option>
                      <option value="Event Planning" className="bg-navy-900">Event Planning</option>
                      <option value="Feedback" className="bg-navy-900">Feedback</option>
                      <option value="General Inquiry" className="bg-navy-900">General Inquiry</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="font-jost text-xs uppercase tracking-widest text-gold-400 block mb-2">
                    Your Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className={`w-full bg-navy-800/60 border ${errors.message ? 'border-red-500' : 'border-gold-500/20 focus:border-gold-400'} px-4 py-3.5 font-jost text-sm text-cream-50 focus:outline-none transition-colors placeholder-cream-100/25 rounded-sm resize-none`}
                  />
                  {errors.message && <p className="font-jost text-xs text-red-400 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-gold w-full py-4 text-xs rounded-sm flex items-center justify-center gap-3"
                >
                  {status === 'loading' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-navy-900/30 border-t-navy-900 rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend size={14} />
                      Send Message
                    </>
                  )}
                </button>

                <p className="font-jost text-xs text-cream-100/30 text-center">
                  Your message will be sent directly to gmvarun60@gmail.com. We typically respond within 24 hours.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
