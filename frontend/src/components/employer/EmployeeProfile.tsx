'use client';

import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { BriefcaseIcon, TrendingUpIcon, AlertCircleIcon, CheckCircleIcon } from '@/components/ui/icons';
import { formatCurrency } from '@/lib/utils';

interface EmployeeData {
  id: string;
  name: string;
  role: string;
  department: string;
  tenure: number;
  retentionScore: number;
  promotionReadiness: number;
  highPotential: boolean;
  recommendedNextRole: string;
  currentSalary: number;
  marketSalary: number;
}

const mockEmployee: EmployeeData = {
  id: '1',
  name: 'Sarah Chen',
  role: 'Data Analyst',
  department: 'Engineering',
  tenure: 18,
  retentionScore: 0.87,
  promotionReadiness: 0.89,
  highPotential: true,
  recommendedNextRole: 'Senior Data Scientist',
  currentSalary: 95000,
  marketSalary: 105000,
};

const skillsData = [
  { skill: 'Technical', value: 85, fullMark: 100 },
  { skill: 'Leadership', value: 72, fullMark: 100 },
  { skill: 'Communication', value: 88, fullMark: 100 },
  { skill: 'Strategic Thinking', value: 65, fullMark: 100 },
  { skill: 'Collaboration', value: 90, fullMark: 100 },
  { skill: 'Problem Solving', value: 82, fullMark: 100 },
];

const performanceHistory = [
  { period: 'Q1 2023', performance: 78, goal: 80 },
  { period: 'Q2 2023', performance: 82, goal: 80 },
  { period: 'Q3 2023', performance: 88, goal: 85 },
  { period: 'Q4 2023', performance: 91, goal: 85 },
  { period: 'Q1 2024', performance: 89, goal: 90 },
];

const upskillingNeeds = [
  { skill: 'PySpark', priority: 'High', gap: 40 },
  { skill: 'ML Ops', priority: 'High', gap: 35 },
  { skill: 'Team Leadership', priority: 'Medium', gap: 25 },
  { skill: 'Data Visualization', priority: 'Low', gap: 15 },
];

const careerPredictions = [
  {
    scenario: 'Stay in Current Role',
    probability: 0.35,
    timeline: '12 months',
    outcome: 'Likely to become disengaged',
    salaryGrowth: '3%',
  },
  {
    scenario: 'Promote to Senior Data Scientist',
    probability: 0.89,
    timeline: '10-14 months',
    outcome: 'Highly likely to succeed',
    salaryGrowth: '18%',
  },
  {
    scenario: 'Lateral Move to ML Engineer',
    probability: 0.65,
    timeline: '8-12 months',
    outcome: 'Moderate success probability',
    salaryGrowth: '12%',
  },
];

export const EmployeeProfile: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{mockEmployee.name}</h1>
            <p className="text-purple-100">{mockEmployee.role} • {mockEmployee.department}</p>
          </div>
          {mockEmployee.highPotential && (
            <Badge className="bg-yellow-500 text-white border-0 text-lg px-4 py-2">
              ⭐ High Potential
            </Badge>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-20 h-20 mb-3">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#10b981"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${mockEmployee.retentionScore * 226} 226`}
                  />
                </svg>
                <span className="absolute text-xl font-bold text-gray-900">
                  {Math.round(mockEmployee.retentionScore * 100)}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-700">Retention Score</p>
              <p className="text-xs text-gray-500 mt-1">Likelihood to stay 3+ years</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-20 h-20 mb-3">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${mockEmployee.promotionReadiness * 226} 226`}
                  />
                </svg>
                <span className="absolute text-xl font-bold text-gray-900">
                  {Math.round(mockEmployee.promotionReadiness * 100)}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-700">Promotion Readiness</p>
              <p className="text-xs text-gray-500 mt-1">Ready for promotion</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BriefcaseIcon size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Tenure</p>
                <p className="text-2xl font-bold text-gray-900">{mockEmployee.tenure}m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${
                mockEmployee.currentSalary < mockEmployee.marketSalary ? 'bg-orange-100' : 'bg-green-100'
              }`}>
                <TrendingUpIcon size={24} className={
                  mockEmployee.currentSalary < mockEmployee.marketSalary ? 'text-orange-600' : 'text-green-600'
                } />
              </div>
              <div>
                <p className="text-sm text-gray-500">Salary vs Market</p>
                <p className="text-lg font-bold text-gray-900">
                  {Math.round(((mockEmployee.currentSalary / mockEmployee.marketSalary) - 1) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Predictions</CardTitle>
          <CardDescription>Career trajectory predictions based on performance and market data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {careerPredictions.map((prediction, idx) => (
              <div
                key={idx}
                className={`
                  p-4 rounded-lg border-2 transition-all
                  ${prediction.probability > 0.7 ? 'border-green-300 bg-green-50' :
                    prediction.probability > 0.5 ? 'border-blue-300 bg-blue-50' :
                    'border-gray-300 bg-gray-50'
                  }
                `}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{prediction.scenario}</h4>
                    <p className="text-sm text-gray-600 mt-1">{prediction.outcome}</p>
                  </div>
                  <Badge variant={
                    prediction.probability > 0.7 ? 'success' :
                    prediction.probability > 0.5 ? 'info' : 'warning'
                  }>
                    {Math.round(prediction.probability * 100)}% probability
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                  <div>
                    <span className="text-gray-500">Timeline:</span>
                    <span className="font-semibold text-gray-900 ml-2">{prediction.timeline}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Salary Growth:</span>
                    <span className="font-semibold text-green-600 ml-2">{prediction.salaryGrowth}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>💡 Recommendation:</strong> Promote to Senior Data Scientist within 10-14 months to maximize retention and ROI. Start upskilling program now.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Competency Assessment</CardTitle>
            <CardDescription>Current skill levels across key dimensions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={skillsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Skills" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance History */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
            <CardDescription>Quarterly performance vs. goals</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="performance" fill="#3b82f6" name="Performance" />
                <Bar dataKey="goal" fill="#10b981" name="Goal" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Upskilling Needs */}
      <Card>
        <CardHeader>
          <CardTitle>Upskilling Requirements</CardTitle>
          <CardDescription>Skills needed for next role: {mockEmployee.recommendedNextRole}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upskillingNeeds.map((need, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium text-gray-900">{need.skill}</h4>
                    <Badge variant={
                      need.priority === 'High' ? 'danger' :
                      need.priority === 'Medium' ? 'warning' : 'default'
                    }>
                      {need.priority} Priority
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-600">Gap: {need.gap}%</span>
                </div>
                <Progress
                  value={100 - need.gap}
                  variant={need.priority === 'High' ? 'danger' : need.priority === 'Medium' ? 'warning' : 'default'}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="primary" className="w-full">
              <TrendingUpIcon size={20} className="mr-2" />
              Create Development Plan
            </Button>
            <Button variant="outline" className="w-full">
              <BriefcaseIcon size={20} className="mr-2" />
              Simulate Career Move
            </Button>
            <Button variant="outline" className="w-full">
              View Full History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
