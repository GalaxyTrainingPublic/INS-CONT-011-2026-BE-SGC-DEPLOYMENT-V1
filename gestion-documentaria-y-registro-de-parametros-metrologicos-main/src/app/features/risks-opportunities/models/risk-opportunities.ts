import { InherentValue } from './inherent-value.model';

export interface RiskOpportunitiesModel {
  process: string
  subProcess: string
  task: string
  riskOrOpportunity: string
  description: string
  causes: string
  consequences: string
  inherentValue: InherentValue
}
