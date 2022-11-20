import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { globalStyles } from '@themes';
import { compareMemo } from '@utilities';
import { ScrollView, StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import NavigationHeader, { NavigationHeaderProps } from './NavigationHeader';

interface StackContainerProps extends ViewProps {
  wrapperType?: 'scrollView' | 'view';
  headerTitle?: NavigationHeaderProps['title'];
  navigationHeaderProps?: NavigationHeaderProps;
  wrapperStyle?: StyleProp<ViewStyle>;
}

const StackContainer = compareMemo<StackContainerProps>(
  ({
    headerTitle,
    wrapperType = 'view',
    navigationHeaderProps,
    wrapperStyle,
    style,
    children,
    ...props
  }) => {
    const styles = useStyle(createStyles);
    const Wrapper = wrapperType === 'scrollView' ? ScrollView : View;

    return (
      <View {...props} style={[globalStyles.flexFill, style]}>
        {!!headerTitle && <NavigationHeader title={headerTitle} {...navigationHeaderProps} />}
        <Wrapper
          style={[styles.wrapper, wrapperType !== 'scrollView' && wrapperStyle]}
          {...(wrapperType === 'scrollView' && {
            contentContainerStyle: [styles.contentContainer, wrapperStyle],
            automaticallyAdjustsScrollIndicatorInsets: false,
          })}
        >
          {children}
        </Wrapper>
      </View>
    );
  },
);

const createStyles = ({ create, edgeInsets }: StyleCallbackParams) =>
  create({
    wrapper: {
      flex: 1,
    },
    contentContainer: {
      paddingHorizontal: 16,
      paddingBottom: edgeInsets.bottom,
    },
  });

export default StackContainer;
