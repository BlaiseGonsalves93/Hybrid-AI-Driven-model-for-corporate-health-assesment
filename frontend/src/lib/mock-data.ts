
import { CompanyAnalysis } from "./types";

export const mockCompanies: Record<string, CompanyAnalysis> = {
  "Apple": {
    companyName: "Apple Inc.",
    ticker: "AAPL",
    sector: "Technology",
    overallScore: 86,
    financialRatiosScore: 92, // 50% weight
    redFlagsScore: 75, // 30% weight
    sentimentScore: 88, // 20% weight
    financialRatios: [
      {
        name: "Current Ratio",
        value: 1.43,
        benchmark: 1.5,
        description: "Measures a company's ability to pay short-term obligations.",
        isGood: false
      },
      {
        name: "Debt-to-Equity",
        value: 1.21,
        benchmark: 2.0,
        description: "Indicates the relative proportion of shareholders' equity and debt used to finance assets.",
        isGood: true
      },
      {
        name: "Return on Assets (ROA)",
        value: 25.3,
        benchmark: 10.0,
        description: "Shows how efficiently a company is using its assets to generate earnings.",
        isGood: true
      },
      {
        name: "Gross Profit Margin",
        value: 43.2,
        benchmark: 35.0,
        description: "Percentage of revenue retained after direct costs of producing goods/services.",
        isGood: true
      },
      {
        name: "Price-to-Earnings (P/E)",
        value: 28.4,
        benchmark: 25.0,
        description: "Ratio of share price to earnings per share, indicating market valuation.",
        isGood: false
      }
    ],
    redFlags: [
      {
        title: "Supply Chain Concentration",
        description: "Heavy reliance on suppliers in specific regions may pose continuity risks.",
        severity: "medium",
        impact: 6.5
      },
      {
        title: "Regulatory Scrutiny",
        description: "Facing increased regulatory scrutiny in key markets.",
        severity: "medium",
        impact: 5.0
      }
    ],
    sentimentAnalysis: [
      {
        source: "Financial Times",
        sentiment: "positive",
        score: 0.82,
        excerpt: "Apple continues to show strong growth in services revenue, offsetting concerns about hardware sales.",
        date: "2025-03-15"
      },
      {
        source: "Wall Street Journal",
        sentiment: "positive",
        score: 0.75,
        excerpt: "New product lineup expected to drive significant growth in coming quarters.",
        date: "2025-03-22"
      },
      {
        source: "Bloomberg",
        sentiment: "neutral",
        score: 0.55,
        excerpt: "While facing headwinds in China market, Apple maintains strong position in premium segment.",
        date: "2025-04-01"
      }
    ]
  },

  "Microsoft": {
    companyName: "Microsoft Corporation",
    ticker: "MSFT",
    sector: "Technology",
    overallScore: 89,
    financialRatiosScore: 94,
    redFlagsScore: 82,
    sentimentScore: 90,
    financialRatios: [
      {
        name: "Current Ratio",
        value: 1.9,
        benchmark: 1.5,
        description: "Measures a company's ability to pay short-term obligations.",
        isGood: true
      },
      {
        name: "Debt-to-Equity",
        value: 0.42,
        benchmark: 2.0,
        description: "Indicates the relative proportion of shareholders' equity and debt used to finance assets.",
        isGood: true
      },
      {
        name: "Return on Assets (ROA)",
        value: 21.6,
        benchmark: 10.0,
        description: "Shows how efficiently a company is using its assets to generate earnings.",
        isGood: true
      },
      {
        name: "Gross Profit Margin",
        value: 68.9,
        benchmark: 35.0,
        description: "Percentage of revenue retained after direct costs of producing goods/services.",
        isGood: true
      },
      {
        name: "Price-to-Earnings (P/E)",
        value: 32.1,
        benchmark: 25.0,
        description: "Ratio of share price to earnings per share, indicating market valuation.",
        isGood: false
      }
    ],
    redFlags: [
      {
        title: "Cloud Competition",
        description: "Facing intense competition in cloud services market from AWS and Google Cloud.",
        severity: "low",
        impact: 3.8
      }
    ],
    sentimentAnalysis: [
      {
        source: "Financial Times",
        sentiment: "positive",
        score: 0.88,
        excerpt: "Microsoft's AI investments showing strong returns with integration across product lines.",
        date: "2025-03-18"
      },
      {
        source: "Wall Street Journal",
        sentiment: "positive",
        score: 0.92,
        excerpt: "Azure cloud growth exceeding analyst expectations for third consecutive quarter.",
        date: "2025-03-28"
      },
      {
        source: "CNBC",
        sentiment: "positive",
        score: 0.85,
        excerpt: "Microsoft's enterprise solutions continue to see strong adoption in remote work environment.",
        date: "2025-04-02"
      }
    ]
  },

  "Tesla": {
    companyName: "Tesla, Inc.",
    ticker: "TSLA",
    sector: "Automotive",
    overallScore: 71,
    financialRatiosScore: 75,
    redFlagsScore: 58,
    sentimentScore: 83,
    financialRatios: [
      {
        name: "Current Ratio",
        value: 1.32,
        benchmark: 1.5,
        description: "Measures a company's ability to pay short-term obligations.",
        isGood: false
      },
      {
        name: "Debt-to-Equity",
        value: 0.29,
        benchmark: 2.0,
        description: "Indicates the relative proportion of shareholders' equity and debt used to finance assets.",
        isGood: true
      },
      {
        name: "Return on Assets (ROA)",
        value: 8.6,
        benchmark: 10.0,
        description: "Shows how efficiently a company is using its assets to generate earnings.",
        isGood: false
      },
      {
        name: "Gross Profit Margin",
        value: 22.8,
        benchmark: 20.0,
        description: "Percentage of revenue retained after direct costs of producing goods/services.",
        isGood: true
      },
      {
        name: "Price-to-Earnings (P/E)",
        value: 78.3,
        benchmark: 40.0,
        description: "Ratio of share price to earnings per share, indicating market valuation.",
        isGood: false
      }
    ],
    redFlags: [
      {
        title: "Production Capacity Constraints",
        description: "Challenges in scaling production to meet demand targets.",
        severity: "medium",
        impact: 6.2
      },
      {
        title: "Executive Volatility",
        description: "CEO actions and statements creating market uncertainty.",
        severity: "high",
        impact: 8.5
      },
      {
        title: "Competition Intensifying",
        description: "Traditional automakers aggressively entering electric vehicle market.",
        severity: "medium",
        impact: 5.4
      }
    ],
    sentimentAnalysis: [
      {
        source: "Bloomberg",
        sentiment: "neutral",
        score: 0.52,
        excerpt: "Tesla deliveries met revised expectations, but fell short of original projections.",
        date: "2025-03-10"
      },
      {
        source: "Financial Times",
        sentiment: "positive",
        score: 0.76,
        excerpt: "New factory ramp-up expected to significantly increase production capacity by Q4.",
        date: "2025-03-25"
      },
      {
        source: "CNBC",
        sentiment: "positive",
        score: 0.81,
        excerpt: "Energy storage division showing strong growth, diversifying revenue streams.",
        date: "2025-04-01"
      }
    ]
  },

  "Amazon": {
    companyName: "Amazon.com, Inc.",
    ticker: "AMZN",
    sector: "Retail/Technology",
    overallScore: 84,
    financialRatiosScore: 88,
    redFlagsScore: 76,
    sentimentScore: 87,
    financialRatios: [
      {
        name: "Current Ratio",
        value: 1.22,
        benchmark: 1.5,
        description: "Measures a company's ability to pay short-term obligations.",
        isGood: false
      },
      {
        name: "Debt-to-Equity",
        value: 0.58,
        benchmark: 2.0,
        description: "Indicates the relative proportion of shareholders' equity and debt used to finance assets.",
        isGood: true
      },
      {
        name: "Return on Assets (ROA)",
        value: 5.2,
        benchmark: 10.0,
        description: "Shows how efficiently a company is using its assets to generate earnings.",
        isGood: false
      },
      {
        name: "Gross Profit Margin",
        value: 41.8,
        benchmark: 35.0,
        description: "Percentage of revenue retained after direct costs of producing goods/services.",
        isGood: true
      },
      {
        name: "Price-to-Earnings (P/E)",
        value: 42.6,
        benchmark: 40.0,
        description: "Ratio of share price to earnings per share, indicating market valuation.",
        isGood: false
      }
    ],
    redFlags: [
      {
        title: "Regulatory Pressure",
        description: "Facing antitrust scrutiny in multiple jurisdictions.",
        severity: "medium",
        impact: 6.8
      },
      {
        title: "Labor Practices",
        description: "Ongoing concerns about warehouse working conditions affecting public perception.",
        severity: "low",
        impact: 4.2
      }
    ],
    sentimentAnalysis: [
      {
        source: "Wall Street Journal",
        sentiment: "positive",
        score: 0.79,
        excerpt: "AWS continues to drive profit growth despite intensifying cloud competition.",
        date: "2025-03-12"
      },
      {
        source: "Financial Times",
        sentiment: "positive",
        score: 0.84,
        excerpt: "Amazon's logistics investments paying dividends with improved delivery metrics.",
        date: "2025-03-22"
      },
      {
        source: "Bloomberg",
        sentiment: "positive",
        score: 0.83,
        excerpt: "Advertising revenue growing at unexpected pace, becoming major profit center.",
        date: "2025-04-05"
      }
    ]
  }
};

export const getCompanyData = (companyName: string): CompanyAnalysis | undefined => {
  // Case-insensitive search
  const normalizedName = companyName.toLowerCase();
  
  // Check for exact match first
  const exactMatch = Object.keys(mockCompanies).find(
    key => key.toLowerCase() === normalizedName
  );
  
  if (exactMatch) {
    return mockCompanies[exactMatch];
  }
  
  // Check for partial matches
  const partialMatch = Object.keys(mockCompanies).find(
    key => key.toLowerCase().includes(normalizedName) || 
           normalizedName.includes(key.toLowerCase())
  );
  
  if (partialMatch) {
    return mockCompanies[partialMatch];
  }
  
  return undefined;
};
