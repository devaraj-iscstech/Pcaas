'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { StarIcon } from '@/components/ui/icons';

const testimonials = [
  {
    name: 'Alex Rivera',
    role: 'Software Engineer → Engineering Manager',
    company: 'Google',
    image: '👨‍💻',
    rating: 5,
    text: "PCaaS showed me career paths I never considered. Within 18 months, I went from Senior Engineer to Engineering Manager, following their AI-recommended roadmap. The skill gap analysis was spot-on.",
    results: ['Promoted in 18 months', '40% salary increase', 'Clear development plan'],
  },
  {
    name: 'Maria Chen',
    role: 'VP of People Operations',
    company: 'Stripe',
    image: '👩‍💼',
    rating: 5,
    text: "The talent heatmap is a game-changer. We identified 15 high-potential employees at flight risk and retained 13 of them with targeted interventions. ROI was 3.2x in the first year alone.",
    results: ['3.2x ROI', '87% retention', '35% faster promotions'],
  },
  {
    name: 'James Wilson',
    role: 'Data Analyst → Data Scientist',
    company: 'Meta',
    image: '👨‍🔬',
    rating: 5,
    text: "The learning roadmap was perfectly tailored to my goals. PCaaS recommended courses that directly addressed my skill gaps. I transitioned to Data Scientist role 6 months ahead of schedule.",
    results: ['6 months early', '3 certifications earned', '50% skill growth'],
  },
  {
    name: 'Emily Thompson',
    role: 'Head of Talent',
    company: 'Amazon',
    image: '👩‍💼',
    rating: 5,
    text: "Workforce forecasting helped us avoid a critical shortage of ML engineers. We launched upskilling programs 18 months early and now have a robust internal pipeline. Absolutely transformative.",
    results: ['Avoided shortage', '$2M saved', '95% forecast accuracy'],
  },
  {
    name: 'David Park',
    role: 'Product Manager',
    company: 'Microsoft',
    image: '👨‍💼',
    rating: 5,
    text: "The career simulator let me test different paths before committing. I discovered Product Management was a better fit than Engineering Management, and PCaaS gave me the exact roadmap to transition.",
    results: ['Perfect role fit', '85% match score', 'Seamless transition'],
  },
  {
    name: 'Lisa Anderson',
    role: 'Chief Diversity Officer',
    company: 'Salesforce',
    image: '👩‍💼',
    rating: 5,
    text: "The DEI tracker exposed promotion gaps we didn't know existed. We've since launched 3 targeted initiatives and improved women's promotion rates from L4 to L5 by 22%. Data-driven diversity works.",
    results: ['22% improvement', '3 new initiatives', 'Board approval'],
  },
];

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
            Success Stories
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by Professionals &
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Trusted by Enterprises
            </span>
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people who transformed their careers with PCaaS
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              hover
              className="group relative overflow-hidden border-2 border-gray-100 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl"
            >
              <CardContent className="pt-6">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} size={18} className="text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Results */}
                <div className="mb-6 space-y-2">
                  {testimonial.results.map((result, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      <span className="text-gray-600">{result}</span>
                    </div>
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 mb-8 uppercase tracking-wide text-sm font-semibold">
            Trusted by Leading Organizations
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
            {['Google', 'Meta', 'Amazon', 'Microsoft', 'Stripe', 'Salesforce'].map((company) => (
              <div key={company} className="text-2xl font-bold text-gray-400">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
