export interface Venture {
  id: string;
  name: string;
  sector: string;
  description: string;
  status: 'Alpha' | 'Beta' | 'Deploying' | 'Production';
  progress: number;
  specifications: Record<string, string>;
}

export interface AdvisoryDiscipline {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export interface InvestmentScenario {
  initialAmount: number;
  annualContribution: number;
  years: number;
  growthRate: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'partner';
  text: string;
  timestamp: Date;
}
