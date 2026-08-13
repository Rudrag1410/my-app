import type {
  UserProfile,
  PortfolioSnapshot,
} from '../features/portfolio/portfolio.types';

export const mockUserProfile: UserProfile = {
  id: 'user_001',
  name: 'Aarav Mehta',
  age: 26,
  city: 'Indore',
  monthlyIncome: 65000,
};

export const mockPortfolio: PortfolioSnapshot = {
  saveBalance: 18000,
  growBalance: 42000,
  borrowedAgainstPortfolio: 0,
  sips: [
    {
      id: 'sip_001',
      goalName: 'Emergency Fund',
      monthlyAmount: 3000,
      startedOn: '2025-03-01',
      durationMonths: 24,
    },
  ],
  borrows: [],
};
