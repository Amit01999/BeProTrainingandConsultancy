import React from 'react';
import { Button } from './ui/button';

export default function Upgradeyourskills() {
  return (
    <div>
      <section className="py-16 bg-white px-6 lg:px-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-secondary rounded-3xl p-12 lg:p-16 relative overflow-hidden border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            {/* Content */}
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                Ready to{' '}
                <span className="text-primary">Start Your Journey?</span>
              </h2>
              <p className="text-foreground/80 mb-8 leading-relaxed max-w-lg">
                Join thousands of students who have transformed their careers
                with
                <span className="font-semibold">
                  {' '}
                  BePro Training and Consultancy
                </span>
                .
              </p>
              <Button
                size="lg"
                className="bg-primary border border-black hover:bg-primary/80 text-white rounded-full px-8"
              >
                Enroll Now
              </Button>
            </div>

            {/* Decorative illustration */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
              <div className="relative w-64 h-64">
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  {/* Puzzle pieces */}
                  <path
                    d="M 120 80 L 180 80 L 180 140 L 120 140 Z"
                    fill="#FF6B4A"
                  />
                  <path
                    d="M 140 100 L 160 100 L 160 120 L 140 120 Z"
                    fill="#9F7AEA"
                  />
                  <circle cx="200" cy="100" r="25" fill="#FFD333" />
                  <rect
                    x="80"
                    y="160"
                    width="50"
                    height="50"
                    rx="8"
                    fill="#C4B5FD"
                  />

                  {/* Book/Document shapes */}
                  <rect
                    x="160"
                    y="180"
                    width="70"
                    height="80"
                    rx="4"
                    fill="#7C3AED"
                  />
                  <rect x="165" y="190" width="20" height="2" fill="white" />
                  <rect x="165" y="200" width="30" height="2" fill="white" />
                  <rect x="165" y="210" width="25" height="2" fill="white" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
