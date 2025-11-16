'use client';

import React from 'react';
import { TrendingUpIcon, UsersIcon, AwardIcon, BarChartIcon } from '@/components/ui/icons';

const stats = [
  {
    icon: UsersIcon,
    value: '10,000+',
    label: 'Active Users',
    description: 'Professionals trust PCaaS for career guidance',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: TrendingUpIcon,
    value: '95%',
    label: 'Accuracy Rate',
    description: 'ML prediction accuracy for career paths',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: AwardIcon,
    value: '500+',
    label: 'Enterprise Clients',
    description: 'Fortune 500 companies use our platform',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: BarChartIcon,
    value: '2.8x',
    label: 'Average ROI',
    description: 'Return on investment for employers',
    color: 'from-green-500 to-teal-500',
  },
];

const metrics = [
  { label: 'Faster Career Progression', value: '40%' },
  { label: 'Improved Retention', value: '35%' },
  { label: 'Skill Development', value: '60%' },
  { label: 'Employee Satisfaction', value: '85%' },
];

export const StatsSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-3">
            Proven Results
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Numbers That Speak
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
              For Themselves
            </span>
          </h3>
        </div>

        {/* Main stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105"
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />

                <div className="relative">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-6`}>
                    <Icon size={28} className="text-white" />
                  </div>

                  {/* Value */}
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>

                  {/* Label */}
                  <div className="text-lg font-semibold text-gray-300 mb-2">{stat.label}</div>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed">{stat.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Impact metrics */}
        <div className="max-w-4xl mx-auto">
          <h4 className="text-2xl font-bold text-white text-center mb-12">
            Real Impact on Careers & Organizations
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg text-gray-300">{metric.label}</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 text-transparent bg-clip-text">
                    +{metric.value}
                  </span>
                </div>
                <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full transition-all duration-1000"
                    style={{ width: metric.value }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="mt-20 text-center">
          <blockquote className="text-2xl text-gray-300 italic max-w-3xl mx-auto">
            "PCaaS transformed how we approach talent development. We've seen a 35% improvement in retention
            and identified high-potentials we would have otherwise missed."
          </blockquote>
          <div className="mt-6">
            <p className="text-white font-semibold">Sarah Johnson</p>
            <p className="text-gray-400">Chief People Officer, TechCorp Global</p>
          </div>
        </div>
      </div>
    </section>
  );
};
