export interface AffiliateExample {
  name: string;
  deposit: number;
}

export interface Rules {
  icon: React.ReactNode;
  name: string;
}

export interface AffiliateLevel {
  title: string;
  range: string;
  percentage: number;
  toleranceDays: number;
  rules: Rules[];
  examples: AffiliateExample[];
}
