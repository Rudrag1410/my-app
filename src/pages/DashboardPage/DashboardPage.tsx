import { Screen } from '@/shared/components/Screen';
import { Text, TextVariant } from '@/shared/components/Text';
import { mockUserProfile } from '@/shared/data/mockUser';
import {
  usePortfolioHydration,
  usePortfolioStore,
} from '@/shared/store/portfolio.store';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { ScrollView, View } from 'react-native';
import { dashboardPageStyles as styles } from './DashboardPage.styles';
import { GoalsList } from './GoalsList';

interface BalanceTileProps {
  label: string;
  amount: number;
}

const BalanceTile = ({ label, amount }: BalanceTileProps) => {
  return (
    <View style={styles.balanceTile}>
      <Text variant={TextVariant.Caption} colorToken='textSecondary'>
        {label}
      </Text>
      <Text variant={TextVariant.Title}>{formatCurrency(amount)}</Text>
    </View>
  );
};

export const DashboardPage = () => {
  const portfolio = usePortfolioStore((state) => state.portfolio);
  const goals = usePortfolioStore((state) => state.goals);
  const isHydrating = !usePortfolioHydration();

  return (
    <Screen>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text variant={TextVariant.Display}>
            Hi, {mockUserProfile.name.split(' ')[0]}
          </Text>
        </View>

        <View style={styles.balanceRow}>
          <BalanceTile label='Save' amount={portfolio.saveBalance} />
          <BalanceTile label='Grow' amount={portfolio.growBalance} />
        </View>

        {portfolio.borrowedAgainstPortfolio > 0 ? (
          <View style={styles.borrowedBanner}>
            <Text variant={TextVariant.Caption} colorToken='textSecondary'>
              Borrowed against your portfolio
            </Text>
            <Text variant={TextVariant.BodyMedium}>
              {formatCurrency(portfolio.borrowedAgainstPortfolio)}
            </Text>
          </View>
        ) : null}

        <Text variant={TextVariant.Title} style={styles.sectionTitle}>
          Your goals
        </Text>

        <GoalsList goals={goals} isHydrating={isHydrating} />
      </ScrollView>
    </Screen>
  );
};
