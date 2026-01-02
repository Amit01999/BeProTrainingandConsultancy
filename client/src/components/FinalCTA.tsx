import React from 'react';
import { Button } from './ui/button';

export default function FinalCTA() {
  return (
    <div>
      <section className="py-16 px-6 lg:px-20 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-secondary rounded-3xl p-12 lg:p-16 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            {/* Content */}
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Ready to{' '}
                <span className="text-primary">Start Your Journey?</span>
              </h2>
              <p className="text-foreground/70 mb-10 text-lg leading-relaxed">
                Join thousands of students who have transformed their careers
                with{' '}
                <span className="font-semibold">
                  BePro Training and Consultancy
                </span>
                .
              </p>

              <Button
                size="lg"
                className="bg-primary border-2 border-black text-white px-10 h-14 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-full"
              >
                Enroll Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
