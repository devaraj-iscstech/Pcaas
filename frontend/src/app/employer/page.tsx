'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  HomeIcon,
  UsersIcon,
  BriefcaseIcon,
  SettingsIcon,
  TrendingUpIcon,
  BarChartIcon,
} from '@/components/ui/icons';

import { TalentPipelineHeatmap } from '@/components/employer/TalentPipelineHeatmap';
import { EmployeeProfile } from '@/components/employer/EmployeeProfile';
import { CareerSimulator } from '@/components/employer/CareerSimulator';
import { WorkforceForecast } from '@/components/employer/WorkforceForecast';
import { DEIMobilityTracker } from '@/components/employer/DEIMobilityTracker';

type ViewType = 'dashboard' | 'heatmap' | 'profile' | 'simulator' | 'forecast' | 'dei';

export default function EmployerDashboard() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  // Navigation items
  const navItems = [
    { id: 'dashboard' as ViewType, label: 'Dashboard', icon: HomeIcon },
    { id: 'heatmap' as ViewType, label: 'Talent Pipeline', icon: UsersIcon },
    { id: 'profile' as ViewType, label: 'Employee Profile', icon: BriefcaseIcon },
    { id: 'simulator' as ViewType, label: 'Career Simulator', icon: SettingsIcon },
    { id: 'forecast' as ViewType, label: 'Workforce Forecast', icon: TrendingUpIcon },
    { id: 'dei' as ViewType, label: 'DEI Tracker', icon: BarChartIcon },
  ];

  // Dashboard stats
  const dashboardStats = [
    { label: 'Total Employees', value: '2,500', trend: '+12%', color: 'text-blue-600' },
    { label: 'High Potential', value: '235', trend: '+8%', color: 'text-green-600' },
    { label: 'Flight Risk', value: '42', trend: '-5%', color: 'text-red-600' },
    { label: 'Avg Retention', value: '87%', trend: '+3%', color: 'text-purple-600' },
  ];

  const alerts = [
    {
      id: '1',
      type: 'critical',
      title: 'High Attrition Risk',
      message: '42 employees identified as flight risk with high promotion potential',
      action: 'View Details',
      link: 'heatmap' as ViewType,
    },
    {
      id: '2',
      type: 'warning',
      title: 'Skill Gap Alert',
      message: 'Projected shortage of 12 Data Engineers by Q3 2026',
      action: 'View Forecast',
      link: 'forecast' as ViewType,
    },
    {
      id: '3',
      type: 'info',
      title: 'DEI Initiative',
      message: 'Women in Leadership Program at 75% completion',
      action: 'View Progress',
      link: 'dei' as ViewType,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PCaaS - Employer Console</h1>
              <p className="text-sm text-gray-500">TechGlobal Inc. • Enterprise Plan</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="info">2,500 Employees</Badge>
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                TG
              </div>
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
                            ? 'bg-purple-600 text-white'
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
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-xl">
                  <h2 className="text-3xl font-bold mb-2">Talent Strategy Dashboard</h2>
                  <p className="text-purple-100">
                    AI-powered insights for workforce planning and talent development
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {dashboardStats.map((stat, idx) => (
                    <Card key={idx}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-gray-500">{stat.label}</p>
                          <Badge variant={
                            stat.trend.startsWith('+') ? 'success' :
                            stat.trend.startsWith('-') ? 'danger' : 'default'
                          }>
                            {stat.trend}
                          </Badge>
                        </div>
                        <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Alerts & Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle>Action Items & Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {alerts.map((alert) => (
                        <div
                          key={alert.id}
                          className={`
                            p-4 rounded-lg border-2 flex items-start justify-between
                            ${alert.type === 'critical' ? 'border-red-300 bg-red-50' :
                              alert.type === 'warning' ? 'border-orange-300 bg-orange-50' :
                              'border-blue-300 bg-blue-50'
                            }
                          `}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                              <Badge variant={
                                alert.type === 'critical' ? 'danger' :
                                alert.type === 'warning' ? 'warning' : 'info'
                              }>
                                {alert.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-700">{alert.message}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setCurrentView(alert.link)}
                          >
                            {alert.action}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

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
                        onClick={() => setCurrentView('heatmap')}
                      >
                        <UsersIcon size={20} className="mr-2" />
                        View Talent Pipeline
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setCurrentView('simulator')}
                      >
                        <SettingsIcon size={20} className="mr-2" />
                        Simulate Career Move
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setCurrentView('forecast')}
                      >
                        <TrendingUpIcon size={20} className="mr-2" />
                        Workforce Forecast
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top High-Potential Employees</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { name: 'Sarah Chen', role: 'Data Analyst', score: 89 },
                          { name: 'Anna Lee', role: 'Staff Engineer', score: 92 },
                          { name: 'Michael Brown', role: 'Senior Engineer', score: 85 },
                        ].map((emp, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                            onClick={() => setCurrentView('profile')}
                          >
                            <div>
                              <p className="font-medium text-gray-900">{emp.name}</p>
                              <p className="text-sm text-gray-600">{emp.role}</p>
                            </div>
                            <Badge variant="success">{emp.score}% ready</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { action: 'Promoted 5 employees to senior roles', time: '2 days ago' },
                          { action: 'Completed Q4 performance reviews', time: '1 week ago' },
                          { action: 'Launched DEI mentorship program', time: '2 weeks ago' },
                        ].map((activity, idx) => (
                          <div key={idx} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0">
                            <div className="w-2 h-2 rounded-full bg-purple-600" />
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
              </div>
            )}

            {currentView === 'heatmap' && <TalentPipelineHeatmap />}
            {currentView === 'profile' && <EmployeeProfile />}
            {currentView === 'simulator' && <CareerSimulator />}
            {currentView === 'forecast' && <WorkforceForecast />}
            {currentView === 'dei' && <DEIMobilityTracker />}
          </div>
        </div>
      </div>
    </div>
  );
}
