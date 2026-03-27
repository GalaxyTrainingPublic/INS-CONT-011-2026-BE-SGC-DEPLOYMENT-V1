import { ActionPlan } from './action.model';
export type RiskLevel = 'Bajo' | 'Medio' | 'Alto' | 'Muy alto';
export interface Risk {
  id: number;
  process: string;
  subprocess: string;
  task: string;
  type: 'Riesgo' | 'Oportunidad';
  description: string;
  laboratory: string;
  causes: string;
  consequences: string;
  probability: number;
  impact: number;
  value: number;
  level: RiskLevel;
  status: 'Identificado' | 'En progreso' | 'Cerrado';
  significant: boolean;
  opportunityPromoted: boolean;

  actions?: ActionPlan[]; 
  residualValue?: number;
  effectiveness?: number;
}