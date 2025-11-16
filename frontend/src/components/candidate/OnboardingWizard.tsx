'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Progress } from '@/components/ui/Progress';
import { CheckCircleIcon } from '@/components/ui/icons';

interface OnboardingData {
  // Step 1: Basic Info
  name: string;
  email: string;
  currentRole: string;
  experienceYears: number;

  // Step 2: Skills
  skills: string[];

  // Step 3: Career Goals
  careerGoal: string;
  targetRole: string;
  timeline: string;

  // Step 4: Consent
  consentGranted: boolean;
}

const initialData: OnboardingData = {
  name: '',
  email: '',
  currentRole: '',
  experienceYears: 0,
  skills: [],
  careerGoal: '',
  targetRole: '',
  timeline: '2-3 years',
  consentGranted: false,
};

export const OnboardingWizard: React.FC<{ onComplete: (data: OnboardingData) => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [skillInput, setSkillInput] = useState('');

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const updateData = (updates: Partial<OnboardingData>) => {
    setData({ ...data, ...updates });
  };

  const addSkill = () => {
    if (skillInput.trim() && !data.skills.includes(skillInput.trim())) {
      updateData({ skills: [...data.skills, skillInput.trim()] });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    updateData({ skills: data.skills.filter(s => s !== skill) });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(data);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to PCaaS</h1>
        <p className="text-gray-600">Let's build your personalized career roadmap</p>
        <div className="mt-4">
          <Progress value={progress} showLabel />
          <p className="text-sm text-gray-500 mt-2">Step {step} of {totalSteps}</p>
        </div>
      </div>

      <Card>
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Tell us about yourself and your current position</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  value={data.name}
                  onChange={(e) => updateData({ name: e.target.value })}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  value={data.email}
                  onChange={(e) => updateData({ email: e.target.value })}
                />
                <Input
                  label="Current Role"
                  placeholder="Software Engineer"
                  value={data.currentRole}
                  onChange={(e) => updateData({ currentRole: e.target.value })}
                />
                <Input
                  label="Years of Experience"
                  type="number"
                  min="0"
                  max="50"
                  value={data.experienceYears}
                  onChange={(e) => updateData({ experienceYears: parseInt(e.target.value) || 0 })}
                />
              </div>
            </CardContent>
          </>
        )}

        {/* Step 2: Skills Assessment */}
        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle>Skills Assessment</CardTitle>
              <CardDescription>Add your key skills and competencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Skills
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., Python, React, Leadership"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                    />
                    <Button onClick={addSkill} type="button">Add</Button>
                  </div>
                </div>

                {data.skills.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Skills ({data.skills.length})
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-1 hover:text-blue-900"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <p className="text-sm text-blue-800">
                    💡 Tip: Add both technical and soft skills. Our AI will use these to recommend personalized career paths.
                  </p>
                </div>
              </div>
            </CardContent>
          </>
        )}

        {/* Step 3: Career Goals */}
        {step === 3 && (
          <>
            <CardHeader>
              <CardTitle>Career Goals</CardTitle>
              <CardDescription>What do you want to achieve in your career?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  label="Career Goal"
                  placeholder="e.g., Become an Engineering Manager leading a team of 10+ engineers"
                  value={data.careerGoal}
                  onChange={(e) => updateData({ careerGoal: e.target.value })}
                  rows={3}
                />
                <Input
                  label="Target Role"
                  placeholder="e.g., Engineering Manager"
                  value={data.targetRole}
                  onChange={(e) => updateData({ targetRole: e.target.value })}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={data.timeline}
                    onChange={(e) => updateData({ timeline: e.target.value })}
                  >
                    <option value="1 year">Within 1 year</option>
                    <option value="2-3 years">2-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </>
        )}

        {/* Step 4: Consent */}
        {step === 4 && (
          <>
            <CardHeader>
              <CardTitle>Data Privacy & Consent</CardTitle>
              <CardDescription>Review and accept our terms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-lg space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircleIcon size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <p>Your data is encrypted and stored securely</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircleIcon size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <p>We use your data only to personalize your career recommendations</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircleIcon size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <p>Your data will never be shared with employers without your explicit consent</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircleIcon size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <p>You can export or delete your data at any time</p>
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={data.consentGranted}
                    onChange={(e) => updateData({ consentGranted: e.target.checked })}
                  />
                  <span className="text-sm text-gray-700">
                    I have read and agree to the privacy policy and consent to the use of my data for personalized career recommendations in accordance with GDPR and CCPA regulations.
                  </span>
                </label>
              </div>
            </CardContent>
          </>
        )}

        <CardFooter>
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && (!data.name || !data.email || !data.currentRole)) ||
                (step === 2 && data.skills.length === 0) ||
                (step === 3 && (!data.careerGoal || !data.targetRole)) ||
                (step === 4 && !data.consentGranted)
              }
            >
              {step === totalSteps ? 'Complete' : 'Next'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
