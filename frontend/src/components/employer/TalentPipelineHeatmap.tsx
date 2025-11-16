'use client';

import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FilterIcon, UsersIcon, AlertCircleIcon, TrendingUpIcon } from '@/components/ui/icons';

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  tenure: number;
  retentionRisk: number; // 0-1
  promotionReadiness: number; // 0-1
  quadrant: 'high_potential' | 'flight_risk' | 'stable' | 'low_impact';
}

const mockEmployees: Employee[] = [
  { id: '1', name: 'Sarah Chen', role: 'Data Analyst', department: 'Engineering', tenure: 18, retentionRisk: 0.22, promotionReadiness: 0.89, quadrant: 'high_potential' },
  { id: '2', name: 'Michael Brown', role: 'Senior Engineer', department: 'Engineering', tenure: 36, retentionRisk: 0.15, promotionReadiness: 0.75, quadrant: 'high_potential' },
  { id: '3', name: 'Emily Davis', role: 'Product Manager', department: 'Product', tenure: 24, retentionRisk: 0.78, promotionReadiness: 0.82, quadrant: 'flight_risk' },
  { id: '4', name: 'James Wilson', role: 'Engineer', department: 'Engineering', tenure: 12, retentionRisk: 0.65, promotionReadiness: 0.58, quadrant: 'flight_risk' },
  { id: '5', name: 'Lisa Anderson', role: 'Marketing Manager', department: 'Marketing', tenure: 48, retentionRisk: 0.25, promotionReadiness: 0.45, quadrant: 'stable' },
  { id: '6', name: 'David Martinez', role: 'Sales Rep', department: 'Sales', tenure: 6, retentionRisk: 0.35, promotionReadiness: 0.38, quadrant: 'stable' },
  { id: '7', name: 'Rachel Green', role: 'Junior Engineer', department: 'Engineering', tenure: 8, retentionRisk: 0.72, promotionReadiness: 0.28, quadrant: 'low_impact' },
  { id: '8', name: 'Tom Harris', role: 'Designer', department: 'Design', tenure: 14, retentionRisk: 0.82, promotionReadiness: 0.35, quadrant: 'low_impact' },
  { id: '9', name: 'Anna Lee', role: 'Staff Engineer', department: 'Engineering', tenure: 60, retentionRisk: 0.18, promotionReadiness: 0.92, quadrant: 'high_potential' },
  { id: '10', name: 'Chris Taylor', role: 'Engineering Manager', department: 'Engineering', tenure: 42, retentionRisk: 0.28, promotionReadiness: 0.68, quadrant: 'stable' },
];

const getQuadrantColor = (quadrant: string) => {
  switch (quadrant) {
    case 'high_potential':
      return '#10b981'; // green
    case 'flight_risk':
      return '#ef4444'; // red
    case 'stable':
      return '#3b82f6'; // blue
    case 'low_impact':
      return '#f59e0b'; // orange
    default:
      return '#6b7280'; // gray
  }
};

const getQuadrantLabel = (quadrant: string) => {
  switch (quadrant) {
    case 'high_potential':
      return 'High Potential';
    case 'flight_risk':
      return 'Flight Risk';
    case 'stable':
      return 'Stable';
    case 'low_impact':
      return 'Development Needed';
    default:
      return '';
  }
};

export const TalentPipelineHeatmap: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const departments = ['all', ...Array.from(new Set(mockEmployees.map(e => e.department)))];

  const filteredEmployees = selectedDepartment === 'all'
    ? mockEmployees
    : mockEmployees.filter(e => e.department === selectedDepartment);

  // Transform data for scatter chart
  const chartData = filteredEmployees.map(emp => ({
    x: emp.retentionRisk * 100,
    y: emp.promotionReadiness * 100,
    z: 100,
    ...emp,
  }));

  const quadrantStats = {
    high_potential: filteredEmployees.filter(e => e.quadrant === 'high_potential').length,
    flight_risk: filteredEmployees.filter(e => e.quadrant === 'flight_risk').length,
    stable: filteredEmployees.filter(e => e.quadrant === 'stable').length,
    low_impact: filteredEmployees.filter(e => e.quadrant === 'low_impact').length,
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">{data.role}</p>
          <div className="mt-2 space-y-1 text-xs">
            <p>Retention Risk: <span className="font-semibold">{Math.round(data.retentionRisk * 100)}%</span></p>
            <p>Promotion Readiness: <span className="font-semibold">{Math.round(data.promotionReadiness * 100)}%</span></p>
            <p>Tenure: <span className="font-semibold">{data.tenure} months</span></p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <UsersIcon size={32} />
          <h1 className="text-3xl font-bold">Talent Pipeline Heatmap</h1>
        </div>
        <p className="text-blue-100">
          Visualize and manage your workforce by retention risk and promotion potential
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUpIcon size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{quadrantStats.high_potential}</p>
                <p className="text-sm text-gray-500">High Potential</p>
              </div>
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
                <p className="text-2xl font-bold text-gray-900">{quadrantStats.flight_risk}</p>
                <p className="text-sm text-gray-500">Flight Risk</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <UsersIcon size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{quadrantStats.stable}</p>
                <p className="text-sm text-gray-500">Stable</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FilterIcon size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{quadrantStats.low_impact}</p>
                <p className="text-sm text-gray-500">Development Needed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Department Filter</CardTitle>
              <CardDescription>Filter employees by department</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <Button
                key={dept}
                variant={selectedDepartment === dept ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept === 'all' ? 'All Departments' : dept}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Talent Matrix</CardTitle>
              <CardDescription>Retention Risk vs. Promotion Readiness</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={500}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Retention Risk"
                    unit="%"
                    label={{ value: 'Retention Risk →', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Promotion Readiness"
                    unit="%"
                    label={{ value: '← Promotion Readiness', angle: -90, position: 'insideLeft' }}
                  />
                  <ZAxis type="number" dataKey="z" range={[100, 400]} />
                  <Tooltip content={<CustomTooltip />} />

                  {/* Quadrant lines */}
                  <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#e5e7eb" strokeWidth={2} />
                  <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#e5e7eb" strokeWidth={2} />

                  <Scatter
                    name="Employees"
                    data={chartData}
                    onClick={(data: any) => setSelectedEmployee(data)}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getQuadrantColor(entry.quadrant)} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-600" />
                  <span className="text-sm text-gray-700">High Potential</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-600" />
                  <span className="text-sm text-gray-700">Flight Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-600" />
                  <span className="text-sm text-gray-700">Stable</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-600" />
                  <span className="text-sm text-gray-700">Development Needed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Employee List */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Employees</CardTitle>
              <CardDescription>Click to view details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {filteredEmployees.map((employee) => (
                  <div
                    key={employee.id}
                    onClick={() => setSelectedEmployee(employee)}
                    className={`
                      p-3 rounded-lg border-2 cursor-pointer transition-all
                      ${selectedEmployee?.id === employee.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm text-gray-900">{employee.name}</h4>
                      <Badge variant={
                        employee.quadrant === 'high_potential' ? 'success' :
                        employee.quadrant === 'flight_risk' ? 'danger' :
                        employee.quadrant === 'stable' ? 'info' : 'warning'
                      }>
                        {getQuadrantLabel(employee.quadrant)}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{employee.role}</p>
                    <p className="text-xs text-gray-500 mt-1">{employee.department}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Items */}
      {quadrantStats.flight_risk > 0 && (
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-900">⚠️ Urgent Actions Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-800">
              You have <strong>{quadrantStats.flight_risk} employees</strong> at high risk of leaving with strong promotion potential.
              Consider immediate retention strategies.
            </p>
            <div className="mt-4">
              <Button variant="danger" size="sm">
                View Retention Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
