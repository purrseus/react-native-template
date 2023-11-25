import { ArrowLeft } from '@/assets/icons';
import { Text, Touchable } from '@/components/core';
import { APP_BAR_HEIGHT, DEFAULT_HORIZONTAL_EDGE_SPACING } from '@/core/constants';
import { AppBarAction } from '@/core/interfaces';
import { useLayout, useTailwind } from '@/hooks';
import { useNavigation } from '@react-navigation/native';
import { compareMemo } from '@/utils';
import { useMemo } from 'react';
import { View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface AppBarProps extends ViewProps {
  title: string;
  rightActions?: AppBarAction[];
  actionSeparatorWidth?: number;
}

function AppBar({ title, rightActions = [], actionSeparatorWidth = 8, ...props }: AppBarProps) {
  const tw = useTailwind();
  const edgeInsets = useSafeAreaInsets();
  const { canGoBack, goBack } = useNavigation();
  const { layout: sideLayout, handleLayout: handleSideLayout } = useLayout({
    flexibleLayout: false,
  });
  const iconColor = tw.color(tw.prefixMatch('dark') ? 'white' : 'zinc-700');

  const RightActions = useMemo(
    () =>
      rightActions.map(({ onPress, Icon, size = 24 }: AppBarAction, index) => {
        return (
          <Touchable key={index} hitSlop={actionSeparatorWidth / 2} onPress={onPress}>
            <Icon width={size} height={size} stroke={iconColor} />
          </Touchable>
        );
      }),
    [rightActions, actionSeparatorWidth, iconColor],
  );

  const handleGoBack = canGoBack() ? goBack : undefined;

  return (
    <View
      {...props}
      style={tw`bg-white dark:bg-zinc-900 pt-[${edgeInsets.top}px] pl-[${edgeInsets.left}px] pr-[${edgeInsets.right}px] shadow-black shadow-opacity-10 shadow-radius-2 elevation-16`}
    >
      <View style={tw`h-[${APP_BAR_HEIGHT}px] flex-row`}>
        <View
          style={tw.style(
            `flex-row min-w-[20%] px-[${DEFAULT_HORIZONTAL_EDGE_SPACING}px] items-center justify-start`,
            !!sideLayout.width && `w-[${sideLayout.width}px]`,
          )}
        >
          {handleGoBack && (
            <Touchable hitSlop={actionSeparatorWidth / 2} onPress={handleGoBack}>
              <ArrowLeft stroke={iconColor} />
            </Touchable>
          )}
        </View>

        <View style={tw`flex-fill-center flex-row`}>
          <Text numberOfLines={1} style={tw`font-bold text-xl`}>
            {title}
          </Text>
        </View>

        <View
          onLayout={rightActions.isNotEmpty ? handleSideLayout : undefined}
          style={tw`flex-row min-w-[20%] px-[${DEFAULT_HORIZONTAL_EDGE_SPACING}px] items-center justify-end gap-x-[${actionSeparatorWidth}px]`}
        >
          {RightActions}
        </View>
      </View>
    </View>
  );
}

export default compareMemo(AppBar);
