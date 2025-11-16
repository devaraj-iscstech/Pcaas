'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { SettingsIcon, TrendingUpIcon, AlertCircleIcon, CheckCircleIcon } from '@/components/ui/icons';
import { formatCurrency, formatDuration } from '@/lib/utils';

interface SimulationResult {
  successProbability: number;
  timeline: number; // months
  requiredSkills: string[];
  riskFactors: string[];
  benefits: string[];
  estimatedCost: number;
  roi: number;
}

const availableRoles = [
  'Senior Data Scientist',
  'ML Engineer',
  'Engineering Manager',
  'Product Manager',
  'Staff Engineer',
  'Technical Lead',
];

const mockSimulationResults: { [key: string]: SimulationResult } = {
  'Senior Data Scientist': {
    successProbability: 0.89,
    timeline: 12,
    requiredSkills: ['PySpark', 'ML Ops', 'Advanced Statistics'],
    riskFactors: ['Limited leadership experience'],
    benefits: [
      'Strong technical foundation',
      'Demonstrated learning agility',
      'High performance ratings',
    ],
    estimatedCost: 15000,
    roi: 2.8,
  },
  'ML Engineer': {
    successProbability: 0.65,
    timeline: 10,
    requiredSkills: ['TensorFlow', 'Kubernetes', 'MLOps', 'Python Advanced'],
    riskFactors: ['No ML production experience', 'Moderate cloud skills'],
    benefits: [
      'Strong Python background',
      'Quick learner',
    ],
    estimatedCost: 25000,
    roi: 1.9,
  },
  'Engineering Manager': {
    successProbability: 0.45,
    timeline: 18,
    requiredSkills: ['People Management', 'Budgeting', 'Strategic Planning', 'Conflict Resolution'],
    riskFactors: [
      'No direct management experience',
      'Limited budget management',
      'Prefers technical work',
    ],
    benefits: [
      'Good communication skills',
      'Respected by peers',
    ],
    estimatedCost: 35000,
    roi: 1.2,
  },
  'Product Manager': {
    successProbability: 0.52,
    timeline: 15,
    requiredSkills: ['Product Strategy', 'User Research', 'Roadmap Planning', 'Stakeholder Management'],
    riskFactors: [
      'Limited product experience',
      'Technical background may not translate',
    ],
    benefits: [
      'Understanding of technical constraints',
      'Good analytical skills',
    ],
    estimatedCost: 20000,
    roi: 1.5,
  },
};

export const CareerSimulator: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const handleSimulate = () => {
    if (!selectedRole) return;

    setIsSimulating(true);
    // Simulate API call delay
    setTimeout(() => {
      setResult(mockSimulationResults[selectedRole] || null);
      setIsSimulating(false);
    }, 1500);
  };

  const handleReset = () => {
    setSelectedRole(null);
    setResult(null);
  };

  const getSuccessColor = (probability: number) => {
    if (probability >= 0.7) return 'success';
    if (probability >= 0.5) return 'warning';
    return 'danger';
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-8 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon size={32} />
          <h1 className="text-3xl font-bold">Career Path Simulator</h1>
        </div>
        <p className="text-cyan-100">
          Simulate career moves and predict outcomes using AI
        </p>
      </div>

      {/* Employee Context */}
      <Card>
        <CardHeader>
          <CardTitle>Current Employee</CardTitle>
          <CardDescription>Simulation context</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Name</p>
              <p className="font-semibold text-gray-900">Sarah Chen</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Current Role</p>
              <p className="font-semibold text-gray-900">Data Analyst</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Tenure</p>
              <p className="font-semibold text-gray-900">18 months</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Performance</p>
              <Badge variant="success">Exceeds Expectations</Badge>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Promotion Readiness</p>
              <div className="flex items-center gap-2">
                <Progress value={89} variant="success" className="flex-1" />
                <span className="text-sm font-semibold">89%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Retention Risk</p>
              <div className="flex items-center gap-2">
                <Progress value={22} variant="success" className="flex-1" />
                <span className="text-sm font-semibold">Low</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Target Role</CardTitle>
          <CardDescription>Choose a role to simulate the career move</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {availableRoles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`
                  p-4 rounded-lg border-2 transition-all text-left
                  ${selectedRole === role
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <p className="font-semibold text-gray-900">{role}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              onClick={handleSimulate}
              disabled={!selectedRole || isSimulating}
              variant="primary"
            >
              {isSimulating ? 'Simulating...' : 'Run Simulation'}
            </Button>
            {result && (
              <Button onClick={handleReset} variant="outline">
                Reset
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Simulation Results */}
      {result && (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Simulation Results</CardTitle>
                  <CardDescription>AI-powered predictions for: {selectedRole}</CardDescription>
                </div>
                <Badge variant={getSuccessColor(result.successProbability)} className="text-lg px-4 py-2">
                  {Math.round(result.successProbability * 100)}% Success Rate
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Timeline</p>
                  <p className="text-2xl font-bold text-gray-900">{formatDuration(result.timeline)}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Expected ROI</p>
                  <p className="text-2xl font-bold text-green-700">{result.roi}x</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Training Cost</p>
                  <p className="text-2xl font-bold text-purple-700">{formatCurrency(result.estimatedCost)}</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Skills Gap</p>
                  <p className="text-2xl font-bold text-orange-700">{result.requiredSkills.length}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Required Skills */}
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-blue-900 text-base">Required Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {result.requiredSkills.map((skill, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          <span className="text-sm text-gray-700">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Benefits */}
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-green-900 text-base flex items-center gap-2">
                      <CheckCircleIcon size={18} />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {result.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircleIcon size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Factors */}
                <Card className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="text-red-900 text-base flex items-center gap-2">
                      <AlertCircleIcon size={18} />
                      Risk Factors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {result.riskFactors.map((risk, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <AlertCircleIcon size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{risk}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className={`
            ${result.successProbability >= 0.7 ? 'bg-green-50 border-green-200' :
              result.successProbability >= 0.5 ? 'bg-blue-50 border-blue-200' :
              'bg-red-50 border-red-200'
            }
          `}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {result.successProbability >= 0.7 ? (
                  <>
                    <CheckCircleIcon size={24} className="text-green-600" />
                    <span className="text-green-900">Recommended Move</span>
                  </>
                ) : result.successProbability >= 0.5 ? (
                  <>
                    <TrendingUpIcon size={24} className="text-blue-600" />
                    <span className="text-blue-900">Moderate Risk</span>
                  </>
                ) : (
                  <>
                    <AlertCircleIcon size={24} className="text-red-600" />
                    <span className="text-red-900">High Risk - Not Recommended</span>
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result.successProbability >= 0.7 ? (
                <div className="space-y-3">
                  <p className="text-green-800">
                    <strong>This is an excellent career move.</strong> Sarah has a high probability of success ({Math.round(result.successProbability * 100)}%)
                    and the required training can be completed within {formatDuration(result.timeline)}.
                  </p>
                  <div className="p-4 bg-white rounded-lg border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Next Steps:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                      <li>Enroll in upskilling program for required skills</li>
                      <li>Assign mentor from target role</li>
                      <li>Set quarterly milestones</li>
                      <li>Schedule promotion review in {Math.floor(result.timeline * 0.8)} months</li>
                    </ol>
                  </div>
                </div>
              ) : result.successProbability >= 0.5 ? (
                <div className="space-y-3">
                  <p className="text-blue-800">
                    <strong>This move is possible but requires significant preparation.</strong> Success rate is {Math.round(result.successProbability * 100)}%,
                    with {result.riskFactors.length} risk factors to address.
                  </p>
                  <div className="p-4 bg-white rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Recommendations:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>Extend timeline to allow for skill development</li>
                      <li>Consider interim role or project assignments</li>
                      <li>Regular progress assessments every 3 months</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-red-800">
                    <strong>This career move is not recommended at this time.</strong> The success probability ({Math.round(result.successProbability * 100)}%)
                    is too low given current skills and experience.
                  </p>
                  <div className="p-4 bg-white rounded-lg border border-red-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Alternative Paths:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>Consider a different role with higher success probability</li>
                      <li>Build foundational skills first in current role</li>
                      <li>Revisit this path in 12-18 months</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="primary">
              Create Development Plan
            </Button>
            <Button variant="outline">
              Export Report
            </Button>
            <Button variant="outline">
              Compare with Other Roles
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
