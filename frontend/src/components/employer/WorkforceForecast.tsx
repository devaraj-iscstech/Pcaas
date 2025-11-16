'use client';

import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { TrendingUpIcon, AlertCircleIcon, UsersIcon, BriefcaseIcon } from '@/components/ui/icons';

const headcountForecast = [
  { year: '2024', actual: 2500, forecast: 2500, demand: 2500 },
  { year: '2025', actual: null, forecast: 2750, demand: 2900 },
  { year: '2026', actual: null, forecast: 2850, demand: 3200 },
  { year: '2027', actual: null, forecast: 2950, demand: 3500 },
  { year: '2028', actual: null, forecast: 3100, demand: 3800 },
];

const skillGapForecast = [
  {
    role: 'Data Engineers',
    current: 45,
    '2025': 40,
    '2026': 33,
    '2027': 28,
    shortage: 12,
  },
  {
    role: 'ML Engineers',
    current: 28,
    '2025': 25,
    '2026': 20,
    '2027': 15,
    shortage: 18,
  },
  {
    role: 'Cloud Architects',
    current: 15,
    '2025': 18,
    '2026': 20,
    '2027': 22,
    shortage: 8,
  },
  {
    role: 'DevOps Engineers',
    current: 35,
    '2025': 30,
    '2026': 28,
    '2027': 25,
    shortage: 15,
  },
  {
    role: 'Product Managers',
    current: 22,
    '2025': 20,
    '2026': 18,
    '2027': 16,
    shortage: 10,
  },
];

const attritionTrend = [
  { quarter: 'Q1 2023', voluntary: 8, involuntary: 2, projected: 10 },
  { quarter: 'Q2 2023', voluntary: 12, involuntary: 3, projected: 10 },
  { quarter: 'Q3 2023', voluntary: 10, involuntary: 2, projected: 10 },
  { quarter: 'Q4 2023', voluntary: 15, involuntary: 4, projected: 10 },
  { quarter: 'Q1 2024', voluntary: 18, involuntary: 3, projected: 12 },
  { quarter: 'Q2 2024', voluntary: null, involuntary: null, projected: 14 },
  { quarter: 'Q3 2024', voluntary: null, involuntary: null, projected: 16 },
  { quarter: 'Q4 2024', voluntary: null, involuntary: null, projected: 18 },
];

const recommendations = [
  {
    id: '1',
    priority: 'Critical',
    title: 'Data Engineering Shortage',
    description: 'Projected shortage of 12 Data Engineers by Q3 2026',
    actions: [
      'Launch internal upskilling program',
      'Partner with bootcamps',
      'Increase recruiting budget by 25%',
    ],
    impact: 'High',
    timeline: 'Immediate',
  },
  {
    id: '2',
    priority: 'High',
    title: 'Rising Voluntary Attrition',
    description: 'Attrition trending 30% above target',
    actions: [
      'Conduct retention interviews',
      'Review compensation packages',
      'Implement stay bonuses for key talent',
    ],
    impact: 'High',
    timeline: '1-2 months',
  },
  {
    id: '3',
    priority: 'Medium',
    title: 'ML Engineering Gap',
    description: '18 ML Engineer shortage expected by 2027',
    actions: [
      'Create ML apprenticeship program',
      'Sponsor ML certifications',
      'Build university partnerships',
    ],
    impact: 'Medium',
    timeline: '3-6 months',
  },
];

export const WorkforceForecast: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'headcount' | 'skills' | 'attrition'>('headcount');

  const totalShortage = skillGapForecast.reduce((sum, role) => sum + role.shortage, 0);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-8 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUpIcon size={32} />
          <h1 className="text-3xl font-bold">Workforce Forecasting</h1>
        </div>
        <p className="text-orange-100">
          Predict future workforce needs and skill gaps
        </p>
      </div>

      {/* Key Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-red-300 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-200 rounded-lg">
                <AlertCircleIcon size={24} className="text-red-700" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-900">{totalShortage}</p>
                <p className="text-sm text-red-700">Projected Shortage by 2027</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-300 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-200 rounded-lg">
                <TrendingUpIcon size={24} className="text-orange-700" />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-900">30%</p>
                <p className="text-sm text-orange-700">Above Target Attrition</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-300 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-200 rounded-lg">
                <UsersIcon size={24} className="text-blue-700" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">150</p>
                <p className="text-sm text-blue-700">Headcount Gap by 2026</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        <Button
          variant={selectedView === 'headcount' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setSelectedView('headcount')}
        >
          Headcount Forecast
        </Button>
        <Button
          variant={selectedView === 'skills' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setSelectedView('skills')}
        >
          Skill Gaps
        </Button>
        <Button
          variant={selectedView === 'attrition' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setSelectedView('attrition')}
        >
          Attrition Trends
        </Button>
      </div>

      {/* Headcount Forecast */}
      {selectedView === 'headcount' && (
        <Card>
          <CardHeader>
            <CardTitle>Headcount Forecast vs. Demand</CardTitle>
            <CardDescription>Projected workforce size compared to business demand</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={headcountForecast}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="demand"
                  stroke="#ef4444"
                  fill="#fecaca"
                  name="Business Demand"
                />
                <Area
                  type="monotone"
                  dataKey="forecast"
                  stroke="#3b82f6"
                  fill="#bfdbfe"
                  name="Forecasted Headcount"
                />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="#10b981"
                  fill="#86efac"
                  name="Actual Headcount"
                />
              </AreaChart>
            </ResponsiveContainer>

            <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-sm text-orange-800">
                <strong>⚠️ Alert:</strong> By 2026, there will be a gap of approximately 350 employees between demand and supply.
                Immediate hiring acceleration needed.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Skill Gaps */}
      {selectedView === 'skills' && (
        <Card>
          <CardHeader>
            <CardTitle>Critical Skill Gaps by Role</CardTitle>
            <CardDescription>Projected shortages in key technical roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {skillGapForecast.map((role, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{role.role}</h4>
                      <p className="text-sm text-gray-600">
                        Current: {role.current} • Projected 2027: {role['2027']}
                      </p>
                    </div>
                    <Badge variant={role.shortage > 15 ? 'danger' : role.shortage > 10 ? 'warning' : 'info'}>
                      -{role.shortage} shortage
                    </Badge>
                  </div>

                  <ResponsiveContainer width="100%" height={60}>
                    <BarChart data={[role]} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="role" hide />
                      <Tooltip />
                      <Bar dataKey="current" fill="#10b981" name="Current" stackId="a" />
                      <Bar dataKey="2025" fill="#3b82f6" name="2025" stackId="b" />
                      <Bar dataKey="2026" fill="#f59e0b" name="2026" stackId="c" />
                      <Bar dataKey="2027" fill="#ef4444" name="2027" stackId="d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Attrition Trends */}
      {selectedView === 'attrition' && (
        <Card>
          <CardHeader>
            <CardTitle>Attrition Trends & Forecast</CardTitle>
            <CardDescription>Historical and projected employee turnover</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={attritionTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis label={{ value: 'Employees', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="voluntary"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Voluntary Attrition"
                  connectNulls
                />
                <Line
                  type="monotone"
                  dataKey="involuntary"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  name="Involuntary Attrition"
                  connectNulls
                />
                <Line
                  type="monotone"
                  dataKey="projected"
                  stroke="#6b7280"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-red-800">
                <strong>🚨 Critical:</strong> Voluntary attrition has increased 80% year-over-year. This trend threatens our 2025 growth plans.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Strategic Recommendations</CardTitle>
          <CardDescription>AI-powered action items to address workforce challenges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className={`
                  p-4 rounded-lg border-2
                  ${rec.priority === 'Critical' ? 'border-red-300 bg-red-50' :
                    rec.priority === 'High' ? 'border-orange-300 bg-orange-50' :
                    'border-yellow-300 bg-yellow-50'
                  }
                `}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                      <Badge variant={
                        rec.priority === 'Critical' ? 'danger' :
                        rec.priority === 'High' ? 'warning' : 'info'
                      }>
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{rec.description}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Recommended Actions:</p>
                  <ul className="space-y-1">
                    {rec.actions.map((action, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span>Impact: <strong>{rec.impact}</strong></span>
                  <span>Timeline: <strong>{rec.timeline}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="primary">
          <BriefcaseIcon size={20} className="mr-2" />
          Create Action Plan
        </Button>
        <Button variant="outline">
          Export Forecast Report
        </Button>
        <Button variant="outline">
          Schedule Review
        </Button>
      </div>
    </div>
  );
};
