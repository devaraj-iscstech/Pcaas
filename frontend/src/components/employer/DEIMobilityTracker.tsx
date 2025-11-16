'use client';

import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { UsersIcon, TrendingUpIcon, AlertCircleIcon } from '@/components/ui/icons';

const diversityBreakdown = [
  { category: 'Women', value: 38, target: 45, color: '#8b5cf6' },
  { category: 'Men', value: 62, target: 55, color: '#3b82f6' },
];

const ethnicityData = [
  { group: 'Asian', percentage: 32, color: '#10b981' },
  { group: 'White', percentage: 45, color: '#3b82f6' },
  { group: 'Black', percentage: 12, color: '#f59e0b' },
  { group: 'Hispanic', percentage: 8, color: '#ef4444' },
  { group: 'Other', percentage: 3, color: '#6b7280' },
];

const promotionRatesByGender = [
  { level: 'L1-L2', women: 85, men: 88, target: 90 },
  { level: 'L2-L3', women: 78, men: 82, target: 80 },
  { level: 'L3-L4', women: 65, men: 75, target: 70 },
  { level: 'L4-L5', women: 52, men: 68, target: 65 },
  { level: 'L5-L6', women: 38, men: 55, target: 50 },
];

const payEquityData = [
  { role: 'Software Engineer', women: 95000, men: 98000, gap: 3.1 },
  { role: 'Senior Engineer', women: 135000, men: 142000, gap: 5.2 },
  { role: 'Engineering Manager', women: 165000, men: 178000, gap: 7.9 },
  { role: 'Product Manager', women: 125000, men: 128000, gap: 2.4 },
  { role: 'Data Scientist', women: 118000, men: 125000, gap: 5.9 },
];

const mobilityMetrics = [
  {
    metric: 'Internal Promotion Rate',
    overall: 68,
    women: 62,
    men: 72,
    gap: 10,
    status: 'needs_improvement',
  },
  {
    metric: 'Cross-functional Moves',
    overall: 24,
    women: 28,
    men: 22,
    gap: -6,
    status: 'good',
  },
  {
    metric: 'Leadership Opportunities',
    overall: 15,
    women: 12,
    men: 17,
    gap: 5,
    status: 'needs_improvement',
  },
  {
    metric: 'Retention Rate',
    overall: 87,
    women: 84,
    men: 89,
    gap: 5,
    status: 'needs_improvement',
  },
];

const initiatives = [
  {
    id: '1',
    title: 'Women in Leadership Program',
    status: 'active',
    participants: 45,
    target: 60,
    impact: 'High',
    completion: 75,
  },
  {
    id: '2',
    title: 'Sponsorship Matching',
    status: 'active',
    participants: 28,
    target: 30,
    impact: 'Medium',
    completion: 93,
  },
  {
    id: '3',
    title: 'Pay Equity Review',
    status: 'completed',
    participants: 2500,
    target: 2500,
    impact: 'High',
    completion: 100,
  },
  {
    id: '4',
    title: 'Inclusive Interview Training',
    status: 'planning',
    participants: 0,
    target: 120,
    impact: 'Medium',
    completion: 0,
  },
];

export const DEIMobilityTracker: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'overview' | 'promotions' | 'pay' | 'initiatives'>('overview');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-8 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <UsersIcon size={32} />
          <h1 className="text-3xl font-bold">DEI & Mobility Tracker</h1>
        </div>
        <p className="text-pink-100">
          Monitor diversity, equity, and internal mobility metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <UsersIcon size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">38%</p>
                <p className="text-sm text-gray-500">Women in Workforce</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-600">Target: 45%</span>
                <span className="text-gray-600">Gap: 7%</span>
              </div>
              <Progress value={(38 / 45) * 100} variant="warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircleIcon size={24} className="text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">14%</p>
                <p className="text-sm text-gray-500">Promotion Gap (L4-L5)</p>
              </div>
            </div>
            <div className="mt-3">
              <Badge variant="danger">Needs Attention</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUpIcon size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">5.1%</p>
                <p className="text-sm text-gray-500">Avg Pay Gap</p>
              </div>
            </div>
            <div className="mt-3">
              <Badge variant="warning">In Progress</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <UsersIcon size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">68%</p>
                <p className="text-sm text-gray-500">Internal Mobility Rate</p>
              </div>
            </div>
            <div className="mt-3">
              <Badge variant="success">Above Target</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        <Button
          variant={selectedView === 'overview' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setSelectedView('overview')}
        >
          Overview
        </Button>
        <Button
          variant={selectedView === 'promotions' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setSelectedView('promotions')}
        >
          Promotion Equity
        </Button>
        <Button
          variant={selectedView === 'pay' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setSelectedView('pay')}
        >
          Pay Equity
        </Button>
        <Button
          variant={selectedView === 'initiatives' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setSelectedView('initiatives')}
        >
          Initiatives
        </Button>
      </div>

      {/* Overview */}
      {selectedView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Gender Diversity</CardTitle>
              <CardDescription>Current vs. target representation</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={diversityBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {diversityBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ethnicity Breakdown</CardTitle>
              <CardDescription>Workforce composition</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ethnicityData.map((group, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{group.group}</span>
                      <span className="text-sm font-semibold text-gray-900">{group.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${group.percentage}%`,
                          backgroundColor: group.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Promotion Equity */}
      {selectedView === 'promotions' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Promotion Rates by Level</CardTitle>
              <CardDescription>Comparing women vs. men promotion rates across career levels</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={promotionRatesByGender}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="level" />
                  <YAxis label={{ value: 'Promotion Rate (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="women" fill="#ec4899" name="Women" />
                  <Bar dataKey="men" fill="#3b82f6" name="Men" />
                  <Bar dataKey="target" fill="#10b981" name="Target" />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-800">
                  <strong>⚠️ Alert:</strong> Women are 30% less likely to be promoted from L4 to L5 compared to men.
                  This creates a leadership pipeline gap.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Internal Mobility Metrics</CardTitle>
              <CardDescription>Career progression opportunities by demographic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mobilityMetrics.map((metric, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{metric.metric}</h4>
                      <Badge variant={metric.status === 'good' ? 'success' : 'warning'}>
                        {metric.gap > 0 ? `${metric.gap}% gap` : `${Math.abs(metric.gap)}% favorable`}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Women</p>
                        <div className="flex items-center gap-2">
                          <Progress value={metric.women} variant="default" className="flex-1" />
                          <span className="text-sm font-semibold text-gray-900">{metric.women}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Men</p>
                        <div className="flex items-center gap-2">
                          <Progress value={metric.men} variant="default" className="flex-1" />
                          <span className="text-sm font-semibold text-gray-900">{metric.men}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Overall</p>
                        <div className="flex items-center gap-2">
                          <Progress value={metric.overall} variant="success" className="flex-1" />
                          <span className="text-sm font-semibold text-gray-900">{metric.overall}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Pay Equity */}
      {selectedView === 'pay' && (
        <Card>
          <CardHeader>
            <CardTitle>Pay Equity Analysis</CardTitle>
            <CardDescription>Compensation comparison by role and gender</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Women Avg</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Men Avg</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Gap %</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payEquityData.map((role, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{role.role}</td>
                      <td className="py-3 px-4 text-right text-gray-700">
                        ${role.women.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-700">
                        ${role.men.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-gray-900">
                        {role.gap.toFixed(1)}%
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Badge variant={role.gap < 3 ? 'success' : role.gap < 6 ? 'warning' : 'danger'}>
                          {role.gap < 3 ? 'Good' : role.gap < 6 ? 'Fair' : 'Needs Review'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-sm text-orange-800">
                <strong>💡 Recommendation:</strong> Engineering Manager role shows the largest pay gap (7.9%).
                Conduct detailed pay equity review and adjust compensation for affected individuals.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Initiatives */}
      {selectedView === 'initiatives' && (
        <Card>
          <CardHeader>
            <CardTitle>DEI Initiatives</CardTitle>
            <CardDescription>Active programs to improve diversity and inclusion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {initiatives.map((initiative) => (
                <div
                  key={initiative.id}
                  className="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{initiative.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>
                          Participants: <strong>{initiative.participants}/{initiative.target}</strong>
                        </span>
                        <span>Impact: <strong>{initiative.impact}</strong></span>
                      </div>
                    </div>
                    <Badge variant={
                      initiative.status === 'completed' ? 'success' :
                      initiative.status === 'active' ? 'info' :
                      initiative.status === 'planning' ? 'default' : 'warning'
                    }>
                      {initiative.status}
                    </Badge>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-gray-900 font-semibold">{initiative.completion}%</span>
                    </div>
                    <Progress
                      value={initiative.completion}
                      variant={initiative.completion === 100 ? 'success' : 'default'}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button variant="primary" className="w-full">
                <UsersIcon size={20} className="mr-2" />
                Launch New Initiative
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
