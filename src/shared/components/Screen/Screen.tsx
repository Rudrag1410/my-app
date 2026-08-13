import type { ReactNode } from 'react';
import { Platform } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { screenStyles } from './Screen.styles';

interface ScreenProps {
  children: ReactNode;
}

// Android's native bottom tab bar (expo-router NativeTabs) already sits above
// the system nav bar, but react-native-safe-area-context isn't aware of it and
// pads for that inset a second time, leaving a visible gap under screen content.
// iOS's UITabBar coordinates safe areas correctly, so it keeps the bottom edge.
const edges: Edge[] = Platform.OS === 'ios' ? ['top', 'bottom'] : ['top'];

export const Screen = ({ children }: ScreenProps) => {
  return (
    <SafeAreaView style={screenStyles.container} edges={edges}>
      {children}
    </SafeAreaView>
  );
};
