import { DarkTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { AnimatedSplashOverlay } from '@/components/AnimatedSplashOverlay';
import { AppTabs } from '@/components/AppTabs';
import { useAppFonts } from '@/shared/theme/fonts';
import { theme } from '@/shared/theme/theme';

SplashScreen.preventAutoHideAsync();

const appNavigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: theme.colors.brand,
    background: theme.colors.bgPage,
    card: theme.colors.bgCard,
    text: theme.colors.textPrimary,
    border: theme.colors.borderDefault,
  },
};

const TabLayout = () => {
  const [fontsLoaded] = useAppFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={appNavigationTheme}>
      <AnimatedSplashOverlay />
      <AppTabs />
    </ThemeProvider>
  );
};

export default TabLayout;
