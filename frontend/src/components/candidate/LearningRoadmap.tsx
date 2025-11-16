'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { CalendarIcon, CheckCircleIcon, BookOpenIcon, BriefcaseIcon } from '@/components/ui/icons';

interface RoadmapItem {
  id: string;
  type: 'course' | 'project' | 'job_application' | 'milestone';
  title: string;
  description: string;
  duration: string;
  startWeek: number;
  endWeek: number;
  status: 'completed' | 'in_progress' | 'upcoming';
  skills: string[];
  platform?: string;
}

const mockRoadmap: RoadmapItem[] = [
  {
    id: '1',
    type: 'course',
    title: 'Advanced Python Programming',
    description: 'Deep dive into Python internals, decorators, and async programming',
    duration: '4 weeks',
    startWeek: 1,
    endWeek: 4,
    status: 'completed',
    skills: ['Python', 'Async Programming'],
    platform: 'Coursera',
  },
  {
    id: '2',
    type: 'project',
    title: 'Contribute to Open Source',
    description: 'Make meaningful contributions to popular Python projects on GitHub',
    duration: '2 weeks',
    startWeek: 3,
    endWeek: 4,
    status: 'in_progress',
    skills: ['Git', 'Open Source', 'Collaboration'],
  },
  {
    id: '3',
    type: 'course',
    title: 'System Design Fundamentals',
    description: 'Learn to design scalable distributed systems',
    duration: '6 weeks',
    startWeek: 5,
    endWeek: 10,
    status: 'in_progress',
    skills: ['System Design', 'Architecture'],
    platform: 'educative.io',
  },
  {
    id: '4',
    type: 'course',
    title: 'AWS Solutions Architect Certification',
    description: 'Prepare for and pass the AWS SA Associate exam',
    duration: '8 weeks',
    startWeek: 7,
    endWeek: 14,
    status: 'upcoming',
    skills: ['AWS', 'Cloud Architecture'],
    platform: 'A Cloud Guru',
  },
  {
    id: '5',
    type: 'milestone',
    title: 'Senior Engineer Readiness',
    description: 'Complete all required technical competencies',
    duration: '1 week',
    startWeek: 12,
    endWeek: 12,
    status: 'upcoming',
    skills: [],
  },
  {
    id: '6',
    type: 'job_application',
    title: 'Apply to 5 Senior Engineer Roles',
    description: 'Target companies: Google, Meta, Amazon, Microsoft, Netflix',
    duration: '2 weeks',
    startWeek: 13,
    endWeek: 14,
    status: 'upcoming',
    skills: ['Interviewing', 'Communication'],
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'course':
      return <BookOpenIcon size={20} />;
    case 'project':
      return <CheckCircleIcon size={20} />;
    case 'job_application':
      return <BriefcaseIcon size={20} />;
    case 'milestone':
      return <CalendarIcon size={20} />;
    default:
      return <BookOpenIcon size={20} />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'course':
      return 'bg-blue-100 text-blue-800';
    case 'project':
      return 'bg-green-100 text-green-800';
    case 'job_application':
      return 'bg-purple-100 text-purple-800';
    case 'milestone':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const LearningRoadmap: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'in_progress' | 'upcoming'>('all');

  const filteredRoadmap = filter === 'all'
    ? mockRoadmap
    : mockRoadmap.filter(item => item.status === filter);

  const completedCount = mockRoadmap.filter(item => item.status === 'completed').length;
  const totalCount = mockRoadmap.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  const getCurrentWeek = () => {
    // For demo, let's say we're on week 5
    return 5;
  };

  const currentWeek = getCurrentWeek();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <CalendarIcon size={32} />
          <h1 className="text-3xl font-bold">Learning Roadmap</h1>
        </div>
        <p className="text-green-100">
          Your personalized path to achieving your career goals
        </p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>Track your journey towards becoming a Senior Engineer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {completedCount} of {totalCount} milestones completed
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <Progress value={progressPercentage} variant="success" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-700">{completedCount}</p>
                <p className="text-sm text-green-600">Completed</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-700">
                  {mockRoadmap.filter(i => i.status === 'in_progress').length}
                </p>
                <p className="text-sm text-blue-600">In Progress</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-700">
                  {mockRoadmap.filter(i => i.status === 'upcoming').length}
                </p>
                <p className="text-sm text-gray-600">Upcoming</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'completed' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
        <Button
          variant={filter === 'in_progress' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setFilter('in_progress')}
        >
          In Progress
        </Button>
        <Button
          variant={filter === 'upcoming' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setFilter('upcoming')}
        >
          Upcoming
        </Button>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline View</CardTitle>
          <CardDescription>Week-by-week breakdown of your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredRoadmap.map((item, idx) => {
              const isActive = currentWeek >= item.startWeek && currentWeek <= item.endWeek;
              const isPast = currentWeek > item.endWeek;

              return (
                <div key={item.id} className="relative">
                  {/* Timeline connector */}
                  {idx < filteredRoadmap.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200" />
                  )}

                  <div className="flex gap-4">
                    {/* Timeline dot */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        item.status === 'completed'
                          ? 'bg-green-600 text-white'
                          : isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {getTypeIcon(item.type)}
                    </div>

                    {/* Content */}
                    <div
                      className={`flex-1 border-2 rounded-lg p-4 transition-all ${
                        isActive
                          ? 'border-blue-500 bg-blue-50'
                          : item.status === 'completed'
                          ? 'border-green-200 bg-white'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{item.title}</h4>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(
                                item.type
                              )}`}
                            >
                              {item.type.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>
                              <CalendarIcon size={14} className="inline mr-1" />
                              Week {item.startWeek}-{item.endWeek}
                            </span>
                            <span>• {item.duration}</span>
                            {item.platform && <span>• {item.platform}</span>}
                          </div>
                        </div>

                        <div className="flex-shrink-0 ml-4">
                          {item.status === 'completed' && (
                            <Badge variant="success">Completed</Badge>
                          )}
                          {item.status === 'in_progress' && (
                            <Badge variant="info">In Progress</Badge>
                          )}
                          {item.status === 'upcoming' && (
                            <Badge variant="default">Upcoming</Badge>
                          )}
                        </div>
                      </div>

                      {item.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {item.skills.map((skill, skillIdx) => (
                            <span
                              key={skillIdx}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.status === 'in_progress' && (
                        <div className="mt-4">
                          <Progress value={65} variant="default" showLabel />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="primary" className="w-full">
              <BookOpenIcon size={20} className="mr-2" />
              Continue Current Course
            </Button>
            <Button variant="outline" className="w-full">
              <CalendarIcon size={20} className="mr-2" />
              Adjust Timeline
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
