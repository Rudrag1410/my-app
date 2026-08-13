import type { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenStyles } from './Screen.styles';

interface ScreenProps {
  children: ReactNode;
}

export const Screen = ({ children }: ScreenProps) => {
  return (
    <SafeAreaView style={screenStyles.container} edges={['top', 'bottom']}>
      {children}
    </SafeAreaView>
  );
};
