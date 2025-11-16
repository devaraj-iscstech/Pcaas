'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { AwardIcon, StarIcon, CheckCircleIcon, TrendingUpIcon } from '@/components/ui/icons';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  progress?: number;
  target?: number;
}

interface Skill {
  name: string;
  level: number;
  xp: number;
  nextLevelXp: number;
}

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your profile setup',
    icon: '🎯',
    unlocked: true,
    unlockedDate: '2024-01-15',
  },
  {
    id: '2',
    title: 'Learning Enthusiast',
    description: 'Complete 5 courses',
    icon: '📚',
    unlocked: true,
    unlockedDate: '2024-02-20',
  },
  {
    id: '3',
    title: 'Skill Master',
    description: 'Reach expert level in 3 skills',
    icon: '⭐',
    unlocked: false,
    progress: 2,
    target: 3,
  },
  {
    id: '4',
    title: 'Career Climber',
    description: 'Complete 50% of your career roadmap',
    icon: '🚀',
    unlocked: false,
    progress: 35,
    target: 50,
  },
  {
    id: '5',
    title: 'Networking Pro',
    description: 'Connect with 10 mentors',
    icon: '🤝',
    unlocked: false,
    progress: 3,
    target: 10,
  },
  {
    id: '6',
    title: 'Consistency King',
    description: '30 day learning streak',
    icon: '🔥',
    unlocked: true,
    unlockedDate: '2024-03-10',
  },
];

const mockSkillLevels: Skill[] = [
  { name: 'Python', level: 8, xp: 2400, nextLevelXp: 3000 },
  { name: 'React', level: 7, xp: 1850, nextLevelXp: 2500 },
  { name: 'System Design', level: 4, xp: 650, nextLevelXp: 1000 },
  { name: 'Leadership', level: 3, xp: 420, nextLevelXp: 700 },
];

const milestones = [
  { date: '2024-01-15', event: 'Joined PCaaS', type: 'success' },
  { date: '2024-02-01', event: 'Completed Python Advanced Course', type: 'success' },
  { date: '2024-02-20', event: 'Earned "Learning Enthusiast" Badge', type: 'achievement' },
  { date: '2024-03-05', event: 'Reached Level 8 in Python', type: 'levelup' },
  { date: '2024-03-10', event: '30 Day Streak!', type: 'achievement' },
];

export const ProgressTracker: React.FC = () => {
  const careerHealthScore = 78;
  const totalXP = 5320;
  const currentStreak = 15;
  const longestStreak = 30;

  const unlockedAchievements = mockAchievements.filter(a => a.unlocked).length;
  const totalAchievements = mockAchievements.length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 text-white p-8 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <AwardIcon size={32} />
          <h1 className="text-3xl font-bold">Progress Tracker</h1>
        </div>
        <p className="text-yellow-100">
          Track your achievements, skills, and career growth
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-20 h-20 mb-3">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#10b981"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(careerHealthScore / 100) * 226} 226`}
                  />
                </svg>
                <span className="absolute text-xl font-bold text-gray-900">{careerHealthScore}</span>
              </div>
              <p className="text-sm font-medium text-gray-700">Career Health Score</p>
              <Badge variant="success" className="mt-2">Excellent</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <StarIcon size={40} className="text-yellow-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-900">{totalXP.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Total XP</p>
              <p className="text-xs text-gray-400 mt-2">Level 12 Explorer</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🔥</div>
              <p className="text-3xl font-bold text-gray-900">{currentStreak}</p>
              <p className="text-sm text-gray-500 mt-1">Day Streak</p>
              <p className="text-xs text-gray-400 mt-2">Best: {longestStreak} days</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <AwardIcon size={40} className="text-purple-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-900">
                {unlockedAchievements}/{totalAchievements}
              </p>
              <p className="text-sm text-gray-500 mt-1">Achievements</p>
              <Progress value={(unlockedAchievements / totalAchievements) * 100} className="mt-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements & Badges</CardTitle>
          <CardDescription>Unlock achievements as you progress in your career journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`
                  border-2 rounded-lg p-4 transition-all
                  ${achievement.unlocked
                    ? 'border-yellow-400 bg-yellow-50'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div className="text-4xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>

                    {achievement.unlocked ? (
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircleIcon size={14} />
                        <span>Unlocked {achievement.unlockedDate}</span>
                      </div>
                    ) : (
                      achievement.progress !== undefined && achievement.target && (
                        <div>
                          <Progress
                            value={(achievement.progress / achievement.target) * 100}
                            className="mb-1"
                          />
                          <p className="text-xs text-gray-500">
                            {achievement.progress} / {achievement.target}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skill Levels */}
      <Card>
        <CardHeader>
          <CardTitle>Skill Mastery Levels</CardTitle>
          <CardDescription>Level up your skills through courses and practice</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockSkillLevels.map((skill, idx) => {
              const progressToNextLevel = (skill.xp / skill.nextLevelXp) * 100;
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                      <p className="text-sm text-gray-500">Level {skill.level}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-700">
                        {skill.xp} / {skill.nextLevelXp} XP
                      </p>
                      <p className="text-xs text-gray-500">
                        {skill.nextLevelXp - skill.xp} XP to level {skill.level + 1}
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <Progress value={progressToNextLevel} variant="success" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Milestones</CardTitle>
          <CardDescription>Your recent achievements and activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  {milestone.type === 'success' && <CheckCircleIcon size={20} className="text-blue-600" />}
                  {milestone.type === 'achievement' && <AwardIcon size={20} className="text-yellow-600" />}
                  {milestone.type === 'levelup' && <TrendingUpIcon size={20} className="text-green-600" />}
                </div>
                <div className="flex-1 pb-4 border-b border-gray-100 last:border-0">
                  <p className="font-medium text-gray-900">{milestone.event}</p>
                  <p className="text-sm text-gray-500">{milestone.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Motivational Card */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🎯</div>
            <div>
              <h3 className="text-xl font-bold mb-2">Keep Going!</h3>
              <p className="text-purple-100">
                You're making great progress! Complete 2 more courses this month to unlock the "Learning Champion" achievement.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
