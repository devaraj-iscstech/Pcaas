'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckCircleIcon } from '@/components/ui/icons';

const candidatePlans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for exploring your career options',
    features: [
      'Basic career path visualization',
      '3 skill gap analyses per month',
      'Market benchmark reports',
      'Community access',
      'Email support',
    ],
    cta: 'Get Started Free',
    popular: false,
    color: 'from-gray-500 to-gray-600',
  },
  {
    name: 'Professional',
    price: '$29',
    period: 'per month',
    description: 'For serious professionals ready to accelerate',
    features: [
      'Unlimited career paths',
      'Unlimited skill gap analyses',
      'Personalized learning roadmaps',
      'AI-powered recommendations',
      'Weekly progress reports',
      'Priority email support',
      '1-on-1 career coaching session/quarter',
    ],
    cta: 'Start Free Trial',
    popular: true,
    color: 'from-blue-600 to-purple-600',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact sales',
    description: 'For organizations investing in their people',
    features: [
      'Everything in Professional',
      'Team dashboard & analytics',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee',
      'Advanced security & compliance',
      'Custom AI model training',
    ],
    cta: 'Contact Sales',
    popular: false,
    color: 'from-purple-600 to-pink-600',
  },
];

const employerPlans = [
  {
    name: 'Starter',
    price: '$5,000',
    period: 'per month',
    description: 'For growing companies up to 500 employees',
    features: [
      'Up to 500 employees',
      'Talent pipeline heatmap',
      'Basic workforce forecasting',
      'Monthly reports',
      'Email support',
      'Standard API access',
    ],
    cta: 'Start Free Trial',
    popular: false,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Growth',
    price: '$15,000',
    period: 'per month',
    description: 'For established companies up to 2,500 employees',
    features: [
      'Up to 2,500 employees',
      'Advanced talent analytics',
      'Career simulator',
      'DEI mobility tracker',
      'Real-time forecasting',
      'Priority support',
      'HRIS integration',
      'Custom reports',
    ],
    cta: 'Start Free Trial',
    popular: true,
    color: 'from-purple-600 to-pink-600',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact sales',
    description: 'For large organizations with complex needs',
    features: [
      'Unlimited employees',
      'Custom AI models',
      'White-label option',
      'Dedicated success team',
      'SLA guarantee',
      'Advanced security & compliance',
      'API access & custom integrations',
      'Onsite training',
    ],
    cta: 'Contact Sales',
    popular: false,
    color: 'from-orange-600 to-red-600',
  },
];

export const PricingSection: React.FC = () => {
  const [isEmployer, setIsEmployer] = useState(false);
  const plans = isEmployer ? employerPlans : candidatePlans;

  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-3">
            Pricing Plans
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Pricing for Everyone
            </span>
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your needs. All plans include 14-day free trial.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setIsEmployer(false)}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                !isEmployer
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              For Candidates
            </button>
            <button
              onClick={() => setIsEmployer(true)}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                isEmployer
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              For Employers
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden ${
                plan.popular
                  ? 'ring-2 ring-purple-600 shadow-2xl scale-105'
                  : 'border-2 border-gray-200 shadow-lg'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}

              <div className="p-8 bg-white">
                {/* Plan name */}
                <h4 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h4>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-5xl font-bold bg-gradient-to-r ${plan.color} text-transparent bg-clip-text`}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-500">/ {plan.period}</span>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className={`w-full mb-8 ${
                    plan.popular
                      ? `bg-gradient-to-r ${plan.color} text-white hover:shadow-xl`
                      : ''
                  }`}
                >
                  {plan.cta}
                </Button>

                {/* Features */}
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircleIcon
                        size={20}
                        className={`flex-shrink-0 mt-0.5 ${
                          plan.popular ? 'text-purple-600' : 'text-green-500'
                        }`}
                      />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h4 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h4>
          <div className="space-y-6">
            {[
              {
                q: 'Can I switch plans later?',
                a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Absolutely. All paid plans come with a 14-day free trial. No credit card required.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and wire transfers for enterprise plans.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes. You can cancel your subscription at any time. No long-term contracts or commitments.',
              },
            ].map((faq, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h5 className="font-semibold text-gray-900 mb-2">{faq.q}</h5>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
