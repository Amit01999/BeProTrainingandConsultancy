import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedCourses from '@/components/FeaturedCourses';
import Benefits from '@/components/Benefits';
import TopCourse from '@/components/TopCourse';
import FinalCTA from '@/components/FinalCTA';
import SkillsBoostPreview from '@/components/SkillsBoostPreview';
import UCEPPreview from '@/components/home/UCEPPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';
export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* HeroSection */}
      <HeroSection />
      {/* Featured Courses Carousel Section */}
      <FeaturedCourses />
      {/* Upgrade Skills Section */}
      <SkillsBoostPreview />
      {/* Explore Top Courses */}
      <TopCourse />
      {/* UCEPPreview  Section */}
      {/* <UCEPPreview /> */}
      {/* Upgrade Skills Section */}
      <Benefits />
      {/* Final CTA Section */}
      <FinalCTA />
      {/* Testimonials Section */}
      <TestimonialsSection />
    </div>
  );
}
