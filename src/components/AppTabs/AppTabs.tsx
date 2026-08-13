import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { theme } from '@/shared/theme/theme';

const AppTabs = () => {
  return (
    <NativeTabs
      backgroundColor={theme.colors.bgPage}
      indicatorColor={theme.colors.bgElevated}
      iconColor={{
        default: theme.colors.textSecondary,
        selected: theme.colors.brand,
      }}
      labelStyle={{ selected: { color: theme.colors.brand } }}
    >
      <NativeTabs.Trigger name='index'>
        <NativeTabs.Trigger.Label>Dashboard</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          md='home'
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name='chat'>
        <NativeTabs.Trigger.Label>Chat</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{
            default: 'bubble.left.and.bubble.right',
            selected: 'bubble.left.and.bubble.right.fill',
          }}
          md='chat'
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default AppTabs;
