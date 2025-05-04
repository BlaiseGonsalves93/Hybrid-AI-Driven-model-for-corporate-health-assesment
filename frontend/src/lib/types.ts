
export interface FinancialRatio {
  name: string;
  value: number;
  benchmark: number;
  description: string;
  isGood: boolean;
}

export interface RedFlag {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  impact: number;
}

export interface SentimentItem {
  source: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  excerpt: string;
  date: string;
}

export interface CompanyAnalysis {
  companyName: string;
  ticker: string;
  sector: string;
  overallScore: number;
  financialRatiosScore: number;
  redFlagsScore: number;
  sentimentScore: number;
  financialRatios: FinancialRatio[];
  redFlags: RedFlag[];
  sentimentAnalysis: SentimentItem[];
}
