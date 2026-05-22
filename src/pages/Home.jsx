import React from 'react';
import HeroSection from '../components/HeroSection';
import FacilitiesSection from '../components/FacilitiesSection';
import RoomsSection from '../components/RoomsSection';
import BookingSection from '../components/BookingSection';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
import GallerySection from '../components/GallerySection';
import FAQSection from '../components/FAQSection';

const Home = () => (
  <main>
    <HeroSection />
    <FacilitiesSection />
    <RoomsSection />
    <BookingSection />
    <AboutSection />
    <TestimonialsSection />
    <GallerySection />
    <FAQSection />
  </main>
);

export default Home;
