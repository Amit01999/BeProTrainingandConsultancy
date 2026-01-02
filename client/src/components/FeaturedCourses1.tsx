import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import { Link } from 'wouter';
import { useCourses } from '@/hooks/use-courses';
import type { Course } from '@shared/schema';

export default function FeaturedCourses() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { data: allCourses, isLoading, error } = useCourses();

  // Define color schemes for different categories
  const getCategoryColor = (category: string, index: number) => {
    const colorSchemes = [
      'bg-purple-100',
      'bg-yellow-100',
      'bg-orange-100',
      'bg-blue-100',
      'bg-pink-100',
      'bg-green-100',
    ];
    return colorSchemes[index % colorSchemes.length];
  };

  // Filter courses based on active slide
  const getFilteredCourses = () => {
    if (!allCourses) return [];

    if (activeSlide === 0) {
      // New courses - sort by createdAt descending
      return [...allCourses]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 4);
    } else if (activeSlide === 1) {
      // Recommended - show featured courses
      return allCourses.filter(c => c.isFeatured).slice(0, 4);
    } else {
      // Most popular - for now, just show all courses
      return allCourses.slice(0, 4);
    }
  };

  const featuredCourses = getFilteredCourses();

  // Get counts for each tab
  const newCoursesCount = allCourses?.length || 0;
  const recommendedCount = allCourses?.filter(c => c.isFeatured).length || 0;
  const popularCount = allCourses?.length || 0;

  if (isLoading) {
    return (
      <div>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-center py-20">
              <p className="text-lg text-foreground/60">Loading courses...</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-center py-20">
              <p className="text-lg text-destructive">
                Failed to load courses. Please try again later.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="py-16 bg-[#F7F7F5] px-6 lg:px-16 ">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Take your <span className="text-primary">knowledge</span>
                <br />a degree further
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Badge className="bg-secondary text-foreground px-4 py-2 rounded-full border-none">
                Our experts
              </Badge>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            <button
              className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                activeSlide === 0
                  ? 'bg-white text-foreground shadow-md'
                  : 'bg-white/50 text-foreground/60 hover:bg-white/70'
              }`}
              onClick={() => setActiveSlide(0)}
            >
              New courses ({newCoursesCount})
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                activeSlide === 1
                  ? 'bg-white text-foreground shadow-md'
                  : 'bg-white/50 text-foreground/60 hover:bg-white/70'
              }`}
              onClick={() => setActiveSlide(1)}
            >
              Recommended ({recommendedCount})
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                activeSlide === 2
                  ? 'bg-white text-foreground shadow-md'
                  : 'bg-white/50 text-foreground/60 hover:bg-white/70'
              }`}
              onClick={() => setActiveSlide(2)}
            >
              Most popular ({popularCount})
            </button>
          </div>

          {/* Course Cards Grid */}
          {featuredCourses.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-lg text-foreground/60">
                No courses available in this category.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {featuredCourses.map((course, index) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="learnify-card group cursor-pointer"
                >
                  {/* Course Image/Illustration Placeholder */}
                  <div
                    className={`h-48 ${getCategoryColor(
                      course.category,
                      index
                    )} p-6 relative overflow-hidden`}
                  >
                    {/* Category Badge */}
                    <Badge
                      className={`absolute top-4 left-4 learnify-badge ${
                        index === 0
                          ? 'bg-purple text-white'
                          : index === 1
                          ? 'bg-secondary text-foreground'
                          : index === 2
                          ? 'bg-white/90 text-foreground'
                          : 'bg-white/90 text-foreground'
                      }`}
                    >
                      {course.category}
                    </Badge>

                    {/* Course Level & Duration */}
                    <div className="absolute top-4 right-4 text-xs text-foreground/70 font-semibold">
                      {course.level && <div>{course.level}</div>}
                      {course.duration && <div>{course.duration}</div>}
                    </div>

                    {/* Simple illustration elements */}
                    <div className="absolute bottom-4 right-4 w-20 h-20 opacity-50">
                      {index === 0 && (
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <rect
                            x="20"
                            y="30"
                            width="60"
                            height="50"
                            fill="#7C3AED"
                            rx="4"
                          />
                          <rect
                            x="30"
                            y="40"
                            width="15"
                            height="2"
                            fill="white"
                          />
                          <rect
                            x="30"
                            y="50"
                            width="20"
                            height="2"
                            fill="white"
                          />
                        </svg>
                      )}
                      {index === 1 && (
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <path
                            d="M 30 70 Q 50 40 70 70"
                            stroke="#FF6B4A"
                            strokeWidth="4"
                            fill="none"
                          />
                          <circle cx="30" cy="70" r="4" fill="#FF6B4A" />
                          <circle cx="70" cy="70" r="4" fill="#FF6B4A" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="font-display font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>

                    {/* Course Details */}
                    <div className="mb-3 space-y-1">
                      {course.fee && (
                        <p className="text-sm font-semibold text-primary">
                          {course.fee}
                        </p>
                      )}
                      {course.description && (
                        <p className="text-xs text-foreground/60 line-clamp-2">
                          {course.description}
                        </p>
                      )}
                    </div>

                    <Link to={`/courses/${course._id}`}>
                      <Button
                        size="sm"
                        className="w-full bg-primary hover:bg-primary/90 text-white rounded-full"
                      >
                        More details
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setActiveSlide(0)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeSlide === 0 ? 'bg-foreground w-8' : 'bg-foreground/30'
              }`}
              aria-label="Slide 1"
            />
            <button
              onClick={() => setActiveSlide(1)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeSlide === 1 ? 'bg-foreground w-8' : 'bg-foreground/30'
              }`}
              aria-label="Slide 2"
            />
            <button
              onClick={() => setActiveSlide(2)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeSlide === 2 ? 'bg-foreground w-8' : 'bg-foreground/30'
              }`}
              aria-label="Slide 3"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
