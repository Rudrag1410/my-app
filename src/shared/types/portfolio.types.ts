export interface ExistingSip {
  id: string;
  goalName: string;
  monthlyAmount: number;
  startedOn: string;
  durationMonths: number;
}

export interface ActiveBorrow {
  id: string;
  amount: number;
  ratePercentAnnual: number;
  takenOn: string;
  outstanding: number;
}

export interface PortfolioSnapshot {
  saveBalance: number;
  growBalance: number;
  borrowedAgainstPortfolio: number;
  sips: ExistingSip[];
  borrows: ActiveBorrow[];
}
