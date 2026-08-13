import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, TextVariant } from '@/shared/components/Text';
import { Button } from '@/shared/components/Button';
import { emptyGoalsStateStyles as styles } from './EmptyGoalsState.styles';

export const EmptyGoalsState = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text variant={TextVariant.Title} style={styles.title}>
        No goals yet
      </Text>
      <Text
        variant={TextVariant.Body}
        colorToken='textSecondary'
        style={styles.subtitle}
      >
        Chat with your BlinkMoney agent to set up your first Save or Grow goal.
      </Text>
      <View style={styles.button}>
        <Button label='Start a goal' onPress={() => router.push('/chat')} />
      </View>
    </View>
  );
};
