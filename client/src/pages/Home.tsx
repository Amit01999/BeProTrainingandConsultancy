import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedCourses from '@/components/FeaturedCourses';
import Upgradeyourskills from '@/components/Upgradeyourskills';
import TopCourse from '@/components/TopCourse';
import FinalCTA from '@/components/FinalCTA';
import SkillsBoostPreview from '@/components/SkillsBoostPreview';
import UCEPPreview from '@/components/home/UCEPPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';

export default function Home() {
  return (
    <div className="min-h-screen  ">
      {/* HeroSection */}
      <HeroSection />
      {/* Featured Courses Carousel Section */}
      <FeaturedCourses />
      {/* Upgrade Skills Section */}
      <SkillsBoostPreview />
      {/* Upgrade Skills Section */}
      {/* <Upgradeyourskills /> */}
      {/* Explore Top Courses */}
      <TopCourse />
      {/* UCEPPreview  Section */}
      <UCEPPreview />
      {/* Final CTA Section */}
      <FinalCTA />
      {/* Testimonials Section */}
      <TestimonialsSection />
    </div>
  );
}
