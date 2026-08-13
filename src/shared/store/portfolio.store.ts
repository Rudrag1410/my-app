import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockPortfolio } from '../data/mockUser';
import type { PortfolioSnapshot } from '../types/portfolio.types';
import type { Goal } from '../types/goal.types';
import {
  createBorrow,
  createGoal,
  createSip,
  type AddBorrowInput,
  type AddGoalAndSipInput,
} from './portfolio.store.utils';

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
        set((state) => ({
          goals: [...state.goals, createGoal(input)],
          portfolio: {
            ...state.portfolio,
            sips: [...state.portfolio.sips, createSip(input)],
          },
        })),
      addBorrow: (input) =>
        set((state) => ({
          portfolio: {
            ...state.portfolio,
            borrowedAgainstPortfolio:
              state.portfolio.borrowedAgainstPortfolio + input.amount,
            borrows: [...state.portfolio.borrows, createBorrow(input)],
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
