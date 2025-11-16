'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { TargetIcon, TrendingUpIcon, UsersIcon, BarChartIcon, AwardIcon, BriefcaseIcon } from '@/components/ui/icons';

const features = [
  {
    icon: TargetIcon,
    title: 'AI-Powered Career Paths',
    description: 'Machine learning algorithms analyze your skills, experience, and goals to map personalized career trajectories with 95% accuracy.',
    color: 'from-blue-500 to-cyan-500',
    stats: '10K+ Paths',
  },
  {
    icon: TrendingUpIcon,
    title: 'Skill Gap Intelligence',
    description: 'Identify exactly what skills you need to reach your next role, with curated learning paths from top platforms.',
    color: 'from-purple-500 to-pink-500',
    stats: '500+ Skills',
  },
  {
    icon: BarChartIcon,
    title: 'Market Insights',
    description: 'Real-time salary data, demand trends, and competitive intelligence across industries and locations.',
    color: 'from-orange-500 to-red-500',
    stats: 'Live Data',
  },
  {
    icon: UsersIcon,
    title: 'Talent Pipeline Heatmap',
    description: 'Visualize retention risk vs. promotion readiness. Identify high-potentials and flight risks instantly.',
    color: 'from-green-500 to-teal-500',
    stats: '87% Retention',
  },
  {
    icon: BriefcaseIcon,
    title: 'Career Simulator',
    description: 'Run "what-if" scenarios to predict success probability, ROI, and timeline for any career move.',
    color: 'from-indigo-500 to-purple-500',
    stats: '2.8x ROI',
  },
  {
    icon: AwardIcon,
    title: 'Workforce Forecasting',
    description: 'Predict future skill shortages, attrition trends, and headcount gaps with AI-driven forecasting models.',
    color: 'from-pink-500 to-rose-500',
    stats: '99% Accurate',
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
            Powerful Features
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Master Your Career
            </span>
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cutting-edge AI technology meets human-centered design to deliver actionable career intelligence
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                hover
                className="group relative overflow-hidden border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300"
              >
                {/* Gradient border on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />
                <div className="absolute inset-[2px] bg-white rounded-lg -z-10" />

                <CardContent className="pt-6 relative">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} className="text-white" />
                  </div>

                  {/* Title */}
                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-br group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                    {feature.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Stats badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:to-purple-50 transition-all">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-gray-700">{feature.stats}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Join thousands of professionals and organizations transforming careers with AI
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all"
          >
            Get Started Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
