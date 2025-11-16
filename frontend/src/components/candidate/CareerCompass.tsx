'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDuration } from '@/lib/utils';
import { TrendingUpIcon, TargetIcon, BriefcaseIcon, ChevronRightIcon } from '@/components/ui/icons';

interface CareerNode {
  id: string;
  role: string;
  level: number;
  probability: number;
  timeToReach: number; // in months
  medianSalary: number;
  skillGaps: string[];
  children?: CareerNode[];
}

// Mock data for demonstration
const mockCareerTree: CareerNode = {
  id: '1',
  role: 'Software Engineer',
  level: 1,
  probability: 1.0,
  timeToReach: 0,
  medianSalary: 95000,
  skillGaps: [],
  children: [
    {
      id: '2',
      role: 'Senior Software Engineer',
      level: 2,
      probability: 0.85,
      timeToReach: 12,
      medianSalary: 135000,
      skillGaps: ['System Design', 'Mentoring'],
      children: [
        {
          id: '4',
          role: 'Engineering Manager',
          level: 3,
          probability: 0.74,
          timeToReach: 30,
          medianSalary: 165000,
          skillGaps: ['People Management', 'Budgeting', 'Strategic Planning'],
        },
        {
          id: '5',
          role: 'Staff Engineer',
          level: 3,
          probability: 0.68,
          timeToReach: 24,
          medianSalary: 185000,
          skillGaps: ['Technical Leadership', 'Architecture', 'Cross-team Collaboration'],
        },
      ],
    },
    {
      id: '3',
      role: 'Product Manager',
      level: 2,
      probability: 0.62,
      timeToReach: 18,
      medianSalary: 125000,
      skillGaps: ['Product Strategy', 'User Research', 'Roadmap Planning'],
      children: [
        {
          id: '6',
          role: 'Senior Product Manager',
          level: 3,
          probability: 0.58,
          timeToReach: 36,
          medianSalary: 155000,
          skillGaps: ['Market Analysis', 'Go-to-Market Strategy', 'Leadership'],
        },
      ],
    },
  ],
};

interface CareerNodeCardProps {
  node: CareerNode;
  onSelect: (node: CareerNode) => void;
  isSelected: boolean;
}

const CareerNodeCard: React.FC<CareerNodeCardProps> = ({ node, onSelect, isSelected }) => {
  const getProbabilityColor = (prob: number) => {
    if (prob >= 0.7) return 'success';
    if (prob >= 0.5) return 'warning';
    return 'danger';
  };

  return (
    <div
      onClick={() => onSelect(node)}
      className={`
        bg-white border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg
        ${isSelected ? 'border-blue-600 shadow-md' : 'border-gray-200'}
      `}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{node.role}</h4>
          <p className="text-sm text-gray-500 mt-1">{formatDuration(node.timeToReach)}</p>
        </div>
        <Badge variant={getProbabilityColor(node.probability)}>
          {Math.round(node.probability * 100)}% match
        </Badge>
      </div>

      <div className="space-y-2 mt-3">
        <div className="flex items-center gap-2 text-sm">
          <BriefcaseIcon size={16} className="text-gray-400" />
          <span className="text-gray-700">{formatCurrency(node.medianSalary)}</span>
        </div>

        {node.skillGaps.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-gray-500 mb-1">Skill gaps:</p>
            <div className="flex flex-wrap gap-1">
              {node.skillGaps.slice(0, 2).map((skill, idx) => (
                <span key={idx} className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded">
                  {skill}
                </span>
              ))}
              {node.skillGaps.length > 2 && (
                <span className="text-xs text-gray-500">+{node.skillGaps.length - 2}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const CareerCompass: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<CareerNode | null>(mockCareerTree);
  const [expandedLevels, setExpandedLevels] = useState<Set<number>>(new Set([1, 2]));

  const toggleLevel = (level: number) => {
    const newExpanded = new Set(expandedLevels);
    if (newExpanded.has(level)) {
      newExpanded.delete(level);
    } else {
      newExpanded.add(level);
    }
    setExpandedLevels(newExpanded);
  };

  const renderTree = (node: CareerNode, level: number = 1) => {
    const isExpanded = expandedLevels.has(level);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="flex flex-col">
        <div className="flex items-center gap-4">
          <CareerNodeCard
            node={node}
            onSelect={setSelectedNode}
            isSelected={selectedNode?.id === node.id}
          />
          {hasChildren && (
            <button
              onClick={() => toggleLevel(level + 1)}
              className="text-gray-400 hover:text-gray-600"
            >
              <ChevronRightIcon
                size={20}
                className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              />
            </button>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-12 mt-4 space-y-4 border-l-2 border-gray-200 pl-6">
            {node.children!.map((child) => renderTree(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <TargetIcon size={32} />
          <h1 className="text-3xl font-bold">Career Compass</h1>
        </div>
        <p className="text-blue-100">
          Explore your personalized career paths powered by AI predictions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Career Tree */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Career Trajectories</CardTitle>
              <CardDescription>
                Click on any role to see detailed insights and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {renderTree(mockCareerTree)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Role Details */}
        <div className="lg:col-span-1">
          {selectedNode && (
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Role Details</CardTitle>
                <CardDescription>{selectedNode.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Success Probability</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${selectedNode.probability * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {Math.round(selectedNode.probability * 100)}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Time to Reach</p>
                    <p className="text-2xl font-bold text-gray-900">{formatDuration(selectedNode.timeToReach)}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Median Salary</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(selectedNode.medianSalary)}</p>
                  </div>

                  {selectedNode.skillGaps.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Skills to Develop</p>
                      <div className="space-y-2">
                        {selectedNode.skillGaps.map((skill, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full" />
                            <span className="text-sm text-gray-700">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    <Button className="w-full" variant="primary">
                      <TrendingUpIcon size={20} className="mr-2" />
                      Build Learning Path
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
