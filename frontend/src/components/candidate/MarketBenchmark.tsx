'use client';

import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TrendingUpIcon, BarChartIcon, UsersIcon } from '@/components/ui/icons';
import { formatCurrency } from '@/lib/utils';

const salaryTrendData = [
  { year: '2020', yours: 75000, market: 78000 },
  { year: '2021', yours: 82000, market: 85000 },
  { year: '2022', yours: 90000, market: 95000 },
  { year: '2023', yours: 95000, market: 105000 },
  { year: '2024', yours: 100000, market: 115000 },
];

const salaryByExperienceData = [
  { experience: '0-2', min: 60000, avg: 75000, max: 90000, yours: 0 },
  { experience: '2-4', min: 80000, avg: 95000, max: 120000, yours: 100000 },
  { experience: '4-6', min: 100000, avg: 125000, max: 160000, yours: 0 },
  { experience: '6-8', min: 120000, avg: 150000, max: 190000, yours: 0 },
  { experience: '8+', min: 140000, avg: 180000, max: 250000, yours: 0 },
];

const skillDemandData = [
  { skill: 'Python', demand: 95, growth: 12 },
  { skill: 'React', demand: 88, growth: 15 },
  { skill: 'AWS', demand: 92, growth: 20 },
  { skill: 'Kubernetes', demand: 78, growth: 25 },
  { skill: 'System Design', demand: 85, growth: 18 },
  { skill: 'Machine Learning', demand: 90, growth: 30 },
];

const locationData = [
  { city: 'San Francisco', avgSalary: 165000, demand: 92, costOfLiving: 180 },
  { city: 'New York', avgSalary: 155000, demand: 88, costOfLiving: 165 },
  { city: 'Seattle', avgSalary: 150000, demand: 85, costOfLiving: 145 },
  { city: 'Austin', avgSalary: 125000, demand: 82, costOfLiving: 110 },
  { city: 'Boston', avgSalary: 145000, demand: 80, costOfLiving: 150 },
];

export const MarketBenchmark: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'salary' | 'skills' | 'location'>('salary');

  const marketPosition = 12; // 12% below market
  const peerRanking = 68; // 68th percentile

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-8 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <BarChartIcon size={32} />
          <h1 className="text-3xl font-bold">Market Benchmark</h1>
        </div>
        <p className="text-indigo-100">
          Compare your compensation and skills against market trends
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUpIcon size={24} className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Market Position</p>
                <p className="text-2xl font-bold text-gray-900">{marketPosition}% below</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Based on your role, experience, and location
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
                <p className="text-sm text-gray-500">Peer Ranking</p>
                <p className="text-2xl font-bold text-gray-900">{peerRanking}th percentile</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              You earn more than {peerRanking}% of similar professionals
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BarChartIcon size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Market Avg Salary</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(115000)}</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              For Software Engineers with 4 years experience
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        <Button
          variant={selectedView === 'salary' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setSelectedView('salary')}
        >
          Salary Analysis
        </Button>
        <Button
          variant={selectedView === 'skills' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setSelectedView('skills')}
        >
          Skill Demand
        </Button>
        <Button
          variant={selectedView === 'location' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setSelectedView('location')}
        >
          Location Insights
        </Button>
      </div>

      {/* Salary Analysis */}
      {selectedView === 'salary' && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Salary Trend Over Time</CardTitle>
              <CardDescription>Your salary growth vs. market average</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salaryTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="yours"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Your Salary"
                  />
                  <Line
                    type="monotone"
                    dataKey="market"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Market Average"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-800">
                  💡 <strong>Insight:</strong> Your salary growth rate is slower than the market. Consider negotiating a raise or exploring new opportunities.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Salary by Experience Level</CardTitle>
              <CardDescription>Market ranges and your position</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salaryByExperienceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="experience" label={{ value: 'Years of Experience', position: 'insideBottom', offset: -5 }} />
                  <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Bar dataKey="min" fill="#e5e7eb" name="Min" />
                  <Bar dataKey="avg" fill="#3b82f6" name="Average" />
                  <Bar dataKey="max" fill="#10b981" name="Max" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}

      {/* Skills Demand */}
      {selectedView === 'skills' && (
        <Card>
          <CardHeader>
            <CardTitle>Skill Demand & Growth</CardTitle>
            <CardDescription>Most in-demand skills and their growth trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillDemandData.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium text-gray-900 w-40">{skill.skill}</h4>
                      <Badge variant={skill.growth > 20 ? 'success' : skill.growth > 15 ? 'warning' : 'default'}>
                        +{skill.growth}% growth
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-600">
                      Demand: <span className="font-semibold">{skill.demand}%</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all"
                      style={{ width: `${skill.demand}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>Recommendation:</strong> Focus on high-growth skills like Kubernetes (+25%) and Machine Learning (+30%) to maximize your market value.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Location Insights */}
      {selectedView === 'location' && (
        <Card>
          <CardHeader>
            <CardTitle>Location Comparison</CardTitle>
            <CardDescription>Salary, demand, and cost of living across major tech hubs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">City</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Avg Salary</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Demand</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Cost of Living</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Value Score</th>
                  </tr>
                </thead>
                <tbody>
                  {locationData.map((location, idx) => {
                    const valueScore = Math.round((location.avgSalary / location.costOfLiving) * 100);
                    return (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{location.city}</td>
                        <td className="py-3 px-4 text-right text-gray-700">
                          {formatCurrency(location.avgSalary)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center gap-1">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${location.demand}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600">{location.demand}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Badge variant={location.costOfLiving > 160 ? 'danger' : location.costOfLiving > 130 ? 'warning' : 'success'}>
                            {location.costOfLiving} index
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-gray-900">
                          {valueScore}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                💡 <strong>Best Value:</strong> Austin offers the best salary-to-cost-of-living ratio (113), while San Francisco has the highest absolute salaries.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
