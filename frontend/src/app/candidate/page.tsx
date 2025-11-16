'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  HomeIcon,
  TargetIcon,
  BookOpenIcon,
  TrendingUpIcon,
  BarChartIcon,
  AwardIcon,
} from '@/components/ui/icons';

import { OnboardingWizard } from '@/components/candidate/OnboardingWizard';
import { CareerCompass } from '@/components/candidate/CareerCompass';
import { SkillGapAnalyzer } from '@/components/candidate/SkillGapAnalyzer';
import { LearningRoadmap } from '@/components/candidate/LearningRoadmap';
import { MarketBenchmark } from '@/components/candidate/MarketBenchmark';
import { ProgressTracker } from '@/components/candidate/ProgressTracker';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { authService } from '@/services/oauthService';
import { useRouter } from 'next/navigation';

type ViewType = 'dashboard' | 'onboarding' | 'career' | 'skills' | 'learning' | 'market' | 'progress';

function CandidateDashboardContent() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isOnboarded, setIsOnboarded] = useState(false);

  const handleLogout = async () => {
    await authService.logout();
    router.push('/auth/login');
  };

  const handleOnboardingComplete = (data: any) => {
    console.log('Onboarding data:', data);
    setIsOnboarded(true);
    setCurrentView('dashboard');
  };

  // Navigation items
  const navItems = [
    { id: 'dashboard' as ViewType, label: 'Dashboard', icon: HomeIcon },
    { id: 'career' as ViewType, label: 'Career Compass', icon: TargetIcon },
    { id: 'skills' as ViewType, label: 'Skill Gap', icon: BookOpenIcon },
    { id: 'learning' as ViewType, label: 'Learning Path', icon: TrendingUpIcon },
    { id: 'market' as ViewType, label: 'Market Insights', icon: BarChartIcon },
    { id: 'progress' as ViewType, label: 'Progress', icon: AwardIcon },
  ];

  // Quick stats for dashboard
  const quickStats = [
    { label: 'Career Health', value: '78/100', color: 'text-green-600' },
    { label: 'Skills Mastered', value: '12', color: 'text-blue-600' },
    { label: 'Courses Completed', value: '5', color: 'text-purple-600' },
    { label: 'Learning Streak', value: '15 days', color: 'text-orange-600' },
  ];

  if (!isOnboarded && currentView === 'dashboard') {
    return <OnboardingWizard onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PCaaS - Candidate Portal</h1>
              <p className="text-sm text-gray-500">Welcome back! Ready to level up your career?</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="success">Career Health: 78</Badge>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold cursor-pointer" title="Profile">
                {authService.getCurrentUser()?.name.charAt(0).toUpperCase() || 'U'}
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar Navigation */}
          <div className="col-span-12 lg:col-span-2">
            <Card className="sticky top-6">
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setCurrentView(item.id)}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                          ${currentView === item.id
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                          }
                        `}
                      >
                        <Icon size={18} />
                        <span className="hidden lg:inline">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-10">
            {currentView === 'dashboard' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl">
                  <h2 className="text-3xl font-bold mb-2">Your Career Dashboard</h2>
                  <p className="text-blue-100">Track your progress and explore new opportunities</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {quickStats.map((stat, idx) => (
                    <Card key={idx}>
                      <CardContent className="pt-6">
                        <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                        <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button
                        variant="primary"
                        className="w-full"
                        onClick={() => setCurrentView('career')}
                      >
                        <TargetIcon size={20} className="mr-2" />
                        Explore Career Paths
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setCurrentView('skills')}
                      >
                        <BookOpenIcon size={20} className="mr-2" />
                        Analyze Skill Gaps
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setCurrentView('learning')}
                      >
                        <TrendingUpIcon size={20} className="mr-2" />
                        View Learning Roadmap
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { action: 'Completed Python Advanced course', time: '2 days ago', type: 'success' },
                        { action: 'Updated career goal to Engineering Manager', time: '5 days ago', type: 'info' },
                        { action: 'Reached Level 8 in Python', time: '1 week ago', type: 'success' },
                        { action: 'Started System Design Fundamentals', time: '2 weeks ago', type: 'info' },
                      ].map((activity, idx) => (
                        <div key={idx} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.type === 'success' ? 'bg-green-600' : 'bg-blue-600'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentView === 'career' && <CareerCompass />}
            {currentView === 'skills' && <SkillGapAnalyzer />}
            {currentView === 'learning' && <LearningRoadmap />}
            {currentView === 'market' && <MarketBenchmark />}
            {currentView === 'progress' && <ProgressTracker />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CandidateDashboard() {
  return (
    <ProtectedRoute requiredRole="candidate">
      <CandidateDashboardContent />
    </ProtectedRoute>
  );
}
