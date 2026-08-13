import type { Goal } from '@/shared/features/portfolio/portfolio.types';
import { EmptyGoalsState } from '../EmptyGoalsState';
import { GoalCard, GoalCardSkeleton } from '../GoalCard';

const SKELETON_PLACEHOLDER_COUNT = 2;

interface GoalsListProps {
  goals: Goal[];
  isHydrating: boolean;
}

export const GoalsList = ({ goals, isHydrating }: GoalsListProps) => {
  if (isHydrating) {
    return (
      <>
        {Array.from({ length: SKELETON_PLACEHOLDER_COUNT }).map((_, index) => (
          <GoalCardSkeleton key={index} />
        ))}
      </>
    );
  }

  if (goals.length === 0) {
    return <EmptyGoalsState />;
  }

  return (
    <>
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </>
  );
};
