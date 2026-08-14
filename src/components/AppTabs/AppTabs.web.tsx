import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  type TabTriggerSlotProps,
  type TabListProps,
} from 'expo-router/ui';
import { Pressable, View } from 'react-native';

import { Text, TextVariant } from '@/shared/components/Text';

import { styles } from './AppTabs.styles';

const AppTabs = () => {
  return (
    <Tabs>
      <TabSlot style={styles.slot} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name='index' href='/' asChild>
            <TabButton>Dashboard</TabButton>
          </TabTrigger>
          <TabTrigger name='chat' href='/chat' asChild>
            <TabButton>Chat</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
};

export default AppTabs;

export const TabButton = ({
  children,
  isFocused,
  ...props
}: TabTriggerSlotProps) => {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => (pressed ? styles.pressed : undefined)}
    >
      <View
        style={[
          styles.tabButtonView,
          isFocused ? styles.tabButtonViewFocused : undefined,
        ]}
      >
        <Text
          variant={TextVariant.Label}
          colorToken={isFocused ? 'textOnAccent' : 'textSecondary'}
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

export const CustomTabList = (props: TabListProps) => {
  return (
    <View {...props} style={styles.tabListContainer}>
      <View style={styles.innerContainer}>
        <Text
          variant={TextVariant.Label}
          colorToken='brand'
          style={styles.brandText}
        >
          AI Agent
        </Text>

        {props.children}
      </View>
    </View>
  );
};
