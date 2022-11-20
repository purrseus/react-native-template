import { icons } from '@assets';
import { BottomSpacer, Icon, Row, Spacer, Text, PressArea } from '@components/core';
import { HORIZONTAL_SAFETY_EDGES, TAB_BAR_HEIGHT } from '@core/constants';
import { TabScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { useAppTranslation, useKeyboard, useStyle } from '@hooks';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors as Colors, globalStyles } from '@themes';
import { createShadow } from '@utilities';
import { useMemo } from 'react';
import { ColorValue, ImageRequireSource, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface TabUI {
  icon: ImageRequireSource;
  focusedIcon: ImageRequireSource;
  focusedColor: ColorValue;
  label: string;
}

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const CustomizedTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const styles = useStyle(createStyles);
  const { t } = useAppTranslation('tab');
  const { keyboardShown } = useKeyboard();

  const tabUI: Record<TabScreenName, TabUI> = useMemo(
    () => ({
      [TabScreenName.Home]: {
        icon: icons.bottomTab.home,
        focusedIcon: icons.bottomTab.homeFocused,
        focusedColor: Colors.purple,
        label: t('home'),
      },
      [TabScreenName.Messages]: {
        icon: icons.bottomTab.message,
        focusedIcon: icons.bottomTab.messageFocused,
        focusedColor: Colors.orange,
        label: t('messages'),
      },
      [TabScreenName.Notification]: {
        icon: icons.bottomTab.notification,
        focusedIcon: icons.bottomTab.notificationFocused,
        focusedColor: Colors.red,
        label: t('notification'),
      },
      [TabScreenName.Profile]: {
        icon: icons.bottomTab.profile,
        focusedIcon: icons.bottomTab.profileFocused,
        focusedColor: Colors.blue,
        label: t('profile'),
      },
    }),
    [t],
  );

  const tabBarAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: withTiming(keyboardShown ? 100 : 0) }],
    }),
    [keyboardShown],
  );

  return (
    <AnimatedSafeAreaView
      edges={HORIZONTAL_SAFETY_EDGES}
      style={[styles.rootContainer, tabBarAnimatedStyle]}
    >
      <Row style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const screenName = route.name as TabScreenName;
          const { icon, focusedIcon, focusedColor, label } = tabUI[screenName];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({
                name: screenName,
                params: undefined,
                merge: true,
              });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <PressArea
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={globalStyles.flexFillCenter}
            >
              <Icon
                size={24}
                source={isFocused ? focusedIcon : icon}
                style={[styles.icon, isFocused && { tintColor: focusedColor as string }]}
              />
              <Spacer h={4} />
              <Text
                style={[styles.label, isFocused && [{ color: focusedColor }, styles.focusedLabel]]}
              >
                {label}
              </Text>
            </PressArea>
          );
        })}
      </Row>

      <BottomSpacer type="halfSafeArea" />
    </AnimatedSafeAreaView>
  );
};

const createStyles = ({ colors, create }: StyleCallbackParams) =>
  create({
    rootContainer: {
      ...StyleSheet.absoluteFillObject,
      top: undefined,
      ...createShadow(colors.shadow, [0, 0], 0.1, 10, 20),
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: colors.tabBarBackground,
    },
    container: {
      height: TAB_BAR_HEIGHT,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    icon: {
      tintColor: colors.tabBlur,
    },
    label: {
      fontSize: 12,
      color: colors.tabBlur,
    },
    focusedLabel: {
      fontWeight: 'bold',
    },
  });

export default CustomizedTabBar;
