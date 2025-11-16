import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface CandidateProfile {
  id: string;
  email: string;
  name: string;
  currentRole: string;
  experienceYears: number;
  skills: string[];
  careerGoals: string[];
  location: string;
  consentGranted: boolean;
}

export interface CareerPath {
  pathId: string;
  candidateId: string;
  targetRole: string;
  steps: CareerStep[];
  totalDurationMonths: number;
  medianSalaryUsd: number;
}

export interface CareerStep {
  stepId: number;
  role: string;
  durationMonths: number;
  requiredSkills: string[];
  successProbability: number;
}

export interface SkillGap {
  candidateId: string;
  targetRole: string;
  currentSkills: string[];
  missingSkills: string[];
  recommendedCourses: Course[];
}

export interface Course {
  platform: string;
  title: string;
  url: string;
  duration: string;
  skills: string[];
}

export interface MarketData {
  role: string;
  avgSalary: number;
  demandScore: number;
  growthRate: number;
}

class CandidateService {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
  }

  async getProfile(candidateId: string): Promise<CandidateProfile> {
    const response = await axios.get(
      `${API_BASE_URL}/candidates/${candidateId}`,
      this.getAuthHeaders()
    );
    return response.data;
  }

  async updateProfile(candidateId: string, data: Partial<CandidateProfile>): Promise<CandidateProfile> {
    const response = await axios.put(
      `${API_BASE_URL}/candidates/${candidateId}`,
      data,
      this.getAuthHeaders()
    );
    return response.data;
  }

  async createProfile(data: Partial<CandidateProfile>): Promise<CandidateProfile> {
    const response = await axios.post(
      `${API_BASE_URL}/candidates`,
      data,
      this.getAuthHeaders()
    );
    return response.data;
  }

  async getCareerPaths(candidateId: string): Promise<CareerPath[]> {
    const response = await axios.get(
      `${API_BASE_URL}/candidates/${candidateId}/career-paths`,
      this.getAuthHeaders()
    );
    return response.data;
  }

  async generateCareerPath(candidateId: string, targetRole: string): Promise<CareerPath> {
    const response = await axios.post(
      `${API_BASE_URL}/candidates/${candidateId}/career-paths`,
      { targetRole },
      this.getAuthHeaders()
    );
    return response.data;
  }

  async getSkillGaps(candidateId: string, targetRole: string): Promise<SkillGap> {
    const response = await axios.get(
      `${API_BASE_URL}/candidates/${candidateId}/skill-gaps?targetRole=${targetRole}`,
      this.getAuthHeaders()
    );
    return response.data;
  }

  async getLearningRoadmap(candidateId: string): Promise<any> {
    const response = await axios.get(
      `${API_BASE_URL}/candidates/${candidateId}/learning-roadmap`,
      this.getAuthHeaders()
    );
    return response.data;
  }

  async updateLearningProgress(candidateId: string, itemId: string, progress: number): Promise<any> {
    const response = await axios.patch(
      `${API_BASE_URL}/candidates/${candidateId}/learning-roadmap/${itemId}`,
      { progress },
      this.getAuthHeaders()
    );
    return response.data;
  }

  async getMarketBenchmark(role: string, location: string): Promise<MarketData> {
    const response = await axios.get(
      `${API_BASE_URL}/market/benchmark?role=${role}&location=${location}`,
      this.getAuthHeaders()
    );
    return response.data;
  }

  async getProgress(candidateId: string): Promise<any> {
    const response = await axios.get(
      `${API_BASE_URL}/candidates/${candidateId}/progress`,
      this.getAuthHeaders()
    );
    return response.data;
  }

  async updateSkills(candidateId: string, skills: string[]): Promise<CandidateProfile> {
    const response = await axios.patch(
      `${API_BASE_URL}/candidates/${candidateId}/skills`,
      { skills },
      this.getAuthHeaders()
    );
    return response.data;
  }
}

export const candidateService = new CandidateService();
