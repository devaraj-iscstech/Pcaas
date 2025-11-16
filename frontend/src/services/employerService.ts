import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface Employee {
  employeeId: string;
  clientId: string;
  name: string;
  currentRole: string;
  tenureMonths: number;
  retentionRiskScore: number;
  promotionReadinessScore: number;
  highPotential: boolean;
  recommendedNextRole: string;
  upskillingNeeds: string[];
}

export interface TalentHeatmap {
  employees: Employee[];
  quadrants: {
    highPotential: number;
    flightRisk: number;
    stable: number;
    lowImpact: number;
  };
}

export interface CareerSimulation {
  employeeId: string;
  targetRole: string;
  successProbability: number;
  requiredSkills: string[];
  riskFactors: string[];
  timeline: number;
  estimatedCost: number;
  roi: number;
}

export interface WorkforceForecast {
  clientId: string;
  roleFamily: string;
  forecastYear: number;
  currentHeadcount: number;
  projectedShortfall: number;
  recommendedActions: string[];
}

export interface DEIMetrics {
  diversityBreakdown: {
    category: string;
    percentage: number;
    target: number;
  }[];
  promotionGaps: {
    level: string;
    women: number;
    men: number;
    gap: number;
  }[];
  payEquity: {
    role: string;
    womenAvg: number;
    menAvg: number;
    gap: number;
  }[];
}

class EmployerService {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
  }

  // Talent Heatmap
  async getTalentHeatmap(clientId: string, filters?: any): Promise<TalentHeatmap> {
    const response = await axios.get(
      `${API_BASE_URL}/employers/${clientId}/talent-heatmap`,
      { ...this.getAuthHeaders(), params: filters }
    );
    return response.data;
  }

  // Employee Profile
  async getEmployeeProfile(employeeId: string): Promise<Employee> {
    const response = await axios.get(
      `${API_BASE_URL}/employees/${employeeId}`,
      this.getAuthHeaders()
    );
    return response.data;
  }

  async getEmployeeInsights(employeeId: string): Promise<any> {
    const response = await axios.get(
      `${API_BASE_URL}/employees/${employeeId}/insights`,
      this.getAuthHeaders()
    );
    return response.data;
  }

  async updateEmployee(employeeId: string, data: Partial<Employee>): Promise<Employee> {
    const response = await axios.put(
      `${API_BASE_URL}/employees/${employeeId}`,
      data,
      this.getAuthHeaders()
    );
    return response.data;
  }

  // Career Simulator
  async simulateCareerMove(
    employeeId: string,
    targetRole: string
  ): Promise<CareerSimulation> {
    const response = await axios.post(
      `${API_BASE_URL}/employees/${employeeId}/simulate-career`,
      { targetRole },
      this.getAuthHeaders()
    );
    return response.data;
  }

  async createDevelopmentPlan(employeeId: string, targetRole: string): Promise<any> {
    const response = await axios.post(
      `${API_BASE_URL}/employees/${employeeId}/development-plan`,
      { targetRole },
      this.getAuthHeaders()
    );
    return response.data;
  }

  // Workforce Forecasting
  async getWorkforceForecast(clientId: string, roleFamily?: string): Promise<WorkforceForecast[]> {
    const response = await axios.get(
      `${API_BASE_URL}/employers/${clientId}/workforce-forecast`,
      { ...this.getAuthHeaders(), params: { roleFamily } }
    );
    return response.data;
  }

  async getAttritionTrends(clientId: string): Promise<any> {
    const response = await axios.get(
      `${API_BASE_URL}/employers/${clientId}/attrition-trends`,
      this.getAuthHeaders()
    );
    return response.data;
  }

  async getSkillGapForecast(clientId: string): Promise<any> {
    const response = await axios.get(
      `${API_BASE_URL}/employers/${clientId}/skill-gap-forecast`,
      this.getAuthHeaders()
    );
    return response.data;
  }

  // DEI Metrics
  async getDEIMetrics(clientId: string): Promise<DEIMetrics> {
    const response = await axios.get(
      `${API_BASE_URL}/employers/${clientId}/dei-metrics`,
      this.getAuthHeaders()
    );
    return response.data;
  }

  async getDEIInitiatives(clientId: string): Promise<any> {
    const response = await axios.get(
      `${API_BASE_URL}/employers/${clientId}/dei-initiatives`,
      this.getAuthHeaders()
    );
    return response.data;
  }

  async updateDEIInitiative(clientId: string, initiativeId: string, data: any): Promise<any> {
    const response = await axios.patch(
      `${API_BASE_URL}/employers/${clientId}/dei-initiatives/${initiativeId}`,
      data,
      this.getAuthHeaders()
    );
    return response.data;
  }

  // Dashboard & Analytics
  async getDashboardStats(clientId: string): Promise<any> {
    const response = await axios.get(
      `${API_BASE_URL}/employers/${clientId}/dashboard`,
      this.getAuthHeaders()
    );
    return response.data;
  }

  async getAlerts(clientId: string): Promise<any> {
    const response = await axios.get(
      `${API_BASE_URL}/employers/${clientId}/alerts`,
      this.getAuthHeaders()
    );
    return response.data;
  }

  // Export & Reports
  async exportReport(clientId: string, reportType: string): Promise<Blob> {
    const response = await axios.get(
      `${API_BASE_URL}/employers/${clientId}/reports/${reportType}`,
      { ...this.getAuthHeaders(), responseType: 'blob' }
    );
    return response.data;
  }
}

export const employerService = new EmployerService();
