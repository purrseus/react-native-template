import * as Icons from '@/assets/icons';
import { BottomSpacer, Text, Touchable } from '@/components/core';
import { HORIZONTAL_SAFETY_EDGES } from '@/core/constants';
import { TabScreenName } from '@/core/enums';
import { useAppTranslation, useKeyboard, useTailwind } from '@/hooks';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { FC, useMemo } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';

interface TabUI {
  icon: FC<SvgProps>;
  focusedIcon: FC<SvgProps>;
  focusedColor?: string;
  label: string;
}

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

export default function CustomizedBottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const tw = useTailwind();
  const { t } = useAppTranslation('tab');
  const { keyboardShown } = useKeyboard();

  const tabUI: Record<TabScreenName, TabUI> = useMemo(
    () => ({
      [TabScreenName.Home]: {
        icon: Icons.Home,
        focusedIcon: Icons.HomeFocused,
        focusedColor: tw.color('violet-500'),
        label: t('home'),
      },
      [TabScreenName.Messages]: {
        icon: Icons.Messages,
        focusedIcon: Icons.MessagesFocused,
        focusedColor: tw.color('orange-500'),
        label: t('messages'),
      },
      [TabScreenName.Notification]: {
        icon: Icons.Notification,
        focusedIcon: Icons.NotificationFocused,
        focusedColor: tw.color('red-500'),
        label: t('notification'),
      },
      [TabScreenName.Profile]: {
        icon: Icons.Profile,
        focusedIcon: Icons.ProfileFocused,
        focusedColor: tw.color('blue-500'),
        label: t('profile'),
      },
    }),
    [t, tw],
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
      style={[
        tw.style(
          'bg-white dark:bg-zinc-900 shadow-black dark:shadow-zinc-200 shadow-opacity-10 shadow-radius-2 elevation-20',
          { top: undefined },
        ),
        tabBarAnimatedStyle,
      ]}
    >
      <View style={tw`flex-row h-[70px]`}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const screenName = route.name as TabScreenName;
          const { icon: Icon, focusedIcon: FocusedIcon, focusedColor, label } = tabUI[screenName];
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
            <Touchable
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={tw`flex-fill-center gap-y-1`}
            >
              {isFocused ? (
                <FocusedIcon fill={focusedColor} />
              ) : (
                <Icon stroke={tw.color('zinc-400')} />
              )}
              <Text
                style={tw.style(
                  'text-zinc-400 text-xs',
                  isFocused && `text-[${focusedColor}] font-bold`,
                )}
              >
                {label}
              </Text>
            </Touchable>
          );
        })}
      </View>

      <BottomSpacer type="halfSafeArea" />
    </AnimatedSafeAreaView>
  );
}
