'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { TargetIcon, CheckCircleIcon, AlertCircleIcon, BookOpenIcon } from '@/components/ui/icons';

interface Skill {
  name: string;
  level: number; // 0-100
  required: number; // 0-100
  category: 'technical' | 'soft' | 'business';
}

interface Course {
  title: string;
  platform: string;
  duration: string;
  url: string;
  skills: string[];
}

const mockCurrentSkills: Skill[] = [
  { name: 'Python', level: 85, required: 90, category: 'technical' },
  { name: 'React', level: 75, required: 85, category: 'technical' },
  { name: 'System Design', level: 40, required: 80, category: 'technical' },
  { name: 'Team Leadership', level: 30, required: 75, category: 'soft' },
  { name: 'Communication', level: 70, required: 80, category: 'soft' },
  { name: 'Agile Methods', level: 80, required: 70, category: 'business' },
  { name: 'Cloud Architecture', level: 25, required: 85, category: 'technical' },
];

const mockRecommendedCourses: Course[] = [
  {
    title: 'System Design Interview',
    platform: 'Coursera',
    duration: '40 hours',
    url: 'https://coursera.org',
    skills: ['System Design'],
  },
  {
    title: 'AWS Certified Solutions Architect',
    platform: 'A Cloud Guru',
    duration: '50 hours',
    url: 'https://acloudguru.com',
    skills: ['Cloud Architecture'],
  },
  {
    title: 'Leading People and Teams',
    platform: 'Coursera',
    duration: '25 hours',
    url: 'https://coursera.org',
    skills: ['Team Leadership', 'Communication'],
  },
];

export const SkillGapAnalyzer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'technical' | 'soft' | 'business'>('all');

  const filteredSkills = selectedCategory === 'all'
    ? mockCurrentSkills
    : mockCurrentSkills.filter(s => s.category === selectedCategory);

  const getSkillStatus = (skill: Skill) => {
    const gap = skill.required - skill.level;
    if (gap <= 0) return 'proficient';
    if (gap <= 20) return 'close';
    if (gap <= 40) return 'developing';
    return 'critical';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'proficient':
        return <Badge variant="success">Proficient</Badge>;
      case 'close':
        return <Badge variant="info">Almost There</Badge>;
      case 'developing':
        return <Badge variant="warning">Developing</Badge>;
      case 'critical':
        return <Badge variant="danger">Critical Gap</Badge>;
      default:
        return null;
    }
  };

  const getProgressVariant = (status: string): 'default' | 'success' | 'warning' | 'danger' => {
    switch (status) {
      case 'proficient':
        return 'success';
      case 'close':
        return 'default';
      case 'developing':
        return 'warning';
      case 'critical':
        return 'danger';
      default:
        return 'default';
    }
  };

  const criticalGaps = mockCurrentSkills.filter(s => getSkillStatus(s) === 'critical').length;
  const proficientSkills = mockCurrentSkills.filter(s => getSkillStatus(s) === 'proficient').length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <TargetIcon size={32} />
          <h1 className="text-3xl font-bold">Skill Gap Analyzer</h1>
        </div>
        <p className="text-purple-100">
          Compare your skills against your target role requirements
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircleIcon size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{proficientSkills}</p>
                <p className="text-sm text-gray-500">Proficient Skills</p>
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
                <p className="text-2xl font-bold text-gray-900">{criticalGaps}</p>
                <p className="text-sm text-gray-500">Critical Gaps</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpenIcon size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{mockRecommendedCourses.length}</p>
                <p className="text-sm text-gray-500">Recommended Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Comparison */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Skill Comparison</CardTitle>
              <CardDescription>Your current level vs. target role requirements</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All
              </Button>
              <Button
                variant={selectedCategory === 'technical' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory('technical')}
              >
                Technical
              </Button>
              <Button
                variant={selectedCategory === 'soft' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory('soft')}
              >
                Soft Skills
              </Button>
              <Button
                variant={selectedCategory === 'business' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory('business')}
              >
                Business
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredSkills.map((skill, idx) => {
              const status = getSkillStatus(skill);
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium text-gray-900">{skill.name}</h4>
                      {getStatusBadge(status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">
                        Current: <span className="font-semibold">{skill.level}%</span>
                      </span>
                      <span className="text-gray-600">
                        Required: <span className="font-semibold">{skill.required}%</span>
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    {/* Required level background */}
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full bg-gray-100 rounded-full h-3" />
                    </div>
                    {/* Current level */}
                    <div className="relative flex items-center">
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-3 rounded-full transition-all ${
                            status === 'proficient' ? 'bg-green-600' :
                            status === 'close' ? 'bg-blue-600' :
                            status === 'developing' ? 'bg-yellow-600' :
                            'bg-red-600'
                          }`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                    {/* Required marker */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-gray-400"
                      style={{ left: `${skill.required}%` }}
                    >
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-400 rounded-full" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Learning Paths</CardTitle>
          <CardDescription>Curated courses to bridge your skill gaps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecommendedCourses.map((course, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpenIcon size={20} className="text-blue-600" />
                    <h4 className="font-semibold text-gray-900">{course.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {course.platform} • {course.duration}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {course.skills.map((skill, skillIdx) => (
                      <span
                        key={skillIdx}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <Button size="sm" variant="primary">
                  Enroll
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
