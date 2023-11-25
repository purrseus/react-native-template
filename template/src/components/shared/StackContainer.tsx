import { useTailwind } from '@/hooks';
import { compareMemo } from '@/utils';
import { useMemo } from 'react';
import { ScrollView, View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Style } from 'twrnc/dist/esm/types';
import AppBar, { AppBarProps } from './AppBar';

interface StackContainerProps extends ViewProps {
  wrapperType?: 'scrollView' | 'view';
  title?: AppBarProps['title'];
  appBarProps?: AppBarProps;
  wrapperStyle?: Style;
  style?: Style;
}

function StackContainer({
  title,
  wrapperType = 'view',
  appBarProps,
  wrapperStyle,
  style,
  children,
  ...props
}: StackContainerProps) {
  const tw = useTailwind();
  const edgeInsets = useSafeAreaInsets();
  const Wrapper = wrapperType === 'scrollView' ? ScrollView : View;

  const wrapperProps = useMemo(
    () => ({
      contentContainerStyle: tw.style(`px-4 pb-[${edgeInsets.bottom}px]`, wrapperStyle),
      automaticallyAdjustsScrollIndicatorInsets: false,
    }),
    [edgeInsets.bottom, wrapperStyle, tw],
  );

  return (
    <View {...props} style={tw.style('flex-1', style)}>
      {!!title && <AppBar title={title} {...appBarProps} />}
      <Wrapper
        style={tw.style('flex-1', wrapperType !== 'scrollView' && wrapperStyle)}
        {...(wrapperType === 'scrollView' && wrapperProps)}
      >
        {children}
      </Wrapper>
    </View>
  );
}

export default compareMemo(StackContainer);
