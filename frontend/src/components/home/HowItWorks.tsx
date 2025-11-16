'use client';

import React from 'react';
import { CheckCircleIcon } from '@/components/ui/icons';

const candidateSteps = [
  {
    step: '01',
    title: 'Complete Your Profile',
    description: 'Upload your resume, connect LinkedIn, and set your career goals in minutes.',
    features: ['AI-powered resume parsing', 'Skill auto-detection', 'Goal setting wizard'],
  },
  {
    step: '02',
    title: 'Get AI Insights',
    description: 'Our machine learning models analyze your profile and generate personalized career paths.',
    features: ['95% prediction accuracy', '10+ career path options', 'Salary projections'],
  },
  {
    step: '03',
    title: 'Bridge Skill Gaps',
    description: 'Follow your customized learning roadmap with courses from top platforms.',
    features: ['Curated course recommendations', 'Progress tracking', 'Skill mastery levels'],
  },
  {
    step: '04',
    title: 'Track & Achieve',
    description: 'Monitor your progress with gamification, achievements, and market benchmarking.',
    features: ['Career health score', 'Market insights', 'Achievement badges'],
  },
];

const employerSteps = [
  {
    step: '01',
    title: 'Sync Your HRIS',
    description: 'Securely connect your HR system (Workday, SAP, etc.) via our encrypted API.',
    features: ['SOC 2 compliant', 'Encrypted data sync', 'Multi-tenant isolation'],
  },
  {
    step: '02',
    title: 'Analyze Your Workforce',
    description: 'Get instant insights on retention risks, high-potentials, and skill gaps.',
    features: ['Talent heatmap visualization', 'Flight risk alerts', 'Promotion readiness scores'],
  },
  {
    step: '03',
    title: 'Simulate Scenarios',
    description: 'Run "what-if" analyses to predict outcomes of career moves and promotions.',
    features: ['Success probability', 'ROI calculations', 'Risk factor analysis'],
  },
  {
    step: '04',
    title: 'Plan for the Future',
    description: 'Forecast workforce needs, skill shortages, and diversity goals.',
    features: ['3-year forecasts', 'DEI tracking', 'Strategic recommendations'],
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-3">
            How It Works
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple Process,
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Powerful Results
            </span>
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in minutes, see results in days
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-16">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg">
            For Candidates
          </button>
          <button className="px-8 py-3 border-2 border-gray-200 text-gray-700 rounded-lg font-semibold hover:border-purple-600 transition-colors">
            For Employers
          </button>
        </div>

        {/* Steps - Candidate Flow */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-0 left-8 md:left-1/2 w-0.5 h-full bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 hidden md:block" />

          <div className="space-y-16">
            {candidateSteps.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="inline-block mb-4">
                    <span className="text-6xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 text-transparent bg-clip-text opacity-20">
                      {item.step}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h4>
                  <p className="text-gray-600 mb-4 text-lg">{item.description}</p>
                  <ul className={`space-y-2 ${index % 2 === 0 ? 'md:flex md:flex-col md:items-end' : ''}`}>
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <CheckCircleIcon size={18} className="text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Center circle */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-xl">
                    <span className="text-white font-bold text-xl">{item.step}</span>
                  </div>
                  {/* Pulse effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 animate-ping opacity-20" />
                </div>

                {/* Image placeholder */}
                <div className="flex-1">
                  <div className="w-full h-64 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-gray-100 flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-400 font-medium">Step {item.step}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
