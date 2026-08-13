import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockPortfolio } from '../data/mockUser';
import { GoalStatus } from '../constants/goalStatus.constants';
import type { PortfolioSnapshot } from '../types/portfolio.types';
import type { Goal } from '../types/goal.types';

interface AddGoalAndSipInput {
  goalName: string;
  monthlyAmount: number;
  durationMonths: number;
  projectedValue: number;
}

interface AddBorrowInput {
  amount: number;
  ratePercentAnnual: number;
}

interface PortfolioState {
  portfolio: PortfolioSnapshot;
  goals: Goal[];
  addGoalAndSip: (input: AddGoalAndSipInput) => void;
  addBorrow: (input: AddBorrowInput) => void;
}

const PORTFOLIO_STORAGE_KEY = 'blinkmoney-portfolio';

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      portfolio: mockPortfolio,
      goals: [],
      addGoalAndSip: (input) =>
        set((state) => {
          const goal: Goal = {
            id: `goal_${Date.now()}`,
            name: input.goalName,
            targetAmount: input.projectedValue,
            monthlyAmount: input.monthlyAmount,
            durationMonths: input.durationMonths,
            createdOn: new Date().toISOString(),
            projectedValue: input.projectedValue,
            status: GoalStatus.Active,
          };
          return {
            goals: [...state.goals, goal],
            portfolio: {
              ...state.portfolio,
              sips: [
                ...state.portfolio.sips,
                {
                  id: `sip_${Date.now()}`,
                  goalName: input.goalName,
                  monthlyAmount: input.monthlyAmount,
                  startedOn: new Date().toISOString(),
                  durationMonths: input.durationMonths,
                },
              ],
            },
          };
        }),
      addBorrow: (input) =>
        set((state) => ({
          portfolio: {
            ...state.portfolio,
            borrowedAgainstPortfolio:
              state.portfolio.borrowedAgainstPortfolio + input.amount,
            borrows: [
              ...state.portfolio.borrows,
              {
                id: `borrow_${Date.now()}`,
                amount: input.amount,
                ratePercentAnnual: input.ratePercentAnnual,
                takenOn: new Date().toISOString(),
                outstanding: input.amount,
              },
            ],
          },
        })),
    }),
    {
      name: PORTFOLIO_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        portfolio: state.portfolio,
        goals: state.goals,
      }),
    }
  )
);

export const usePortfolioHydration = (): boolean => {
  const [hasHydrated, setHasHydrated] = useState(() =>
    usePortfolioStore.persist.hasHydrated()
  );

  useEffect(() => {
    return usePortfolioStore.persist.onFinishHydration(() =>
      setHasHydrated(true)
    );
  }, []);

  return hasHydrated;
};
