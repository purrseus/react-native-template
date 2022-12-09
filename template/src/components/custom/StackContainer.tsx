import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { globalStyles } from '@themes';
import { compareMemo } from '@utilities';
import { ScrollView, StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import AppBar, { AppBarProps } from './AppBar';

interface StackContainerProps extends ViewProps {
  wrapperType?: 'scrollView' | 'view';
  title?: AppBarProps['title'];
  appBarProps?: AppBarProps;
  wrapperStyle?: StyleProp<ViewStyle>;
}

const StackContainer = compareMemo<StackContainerProps>(
  ({ title, wrapperType = 'view', appBarProps, wrapperStyle, style, children, ...props }) => {
    const styles = useStyle(createStyles);
    const Wrapper = wrapperType === 'scrollView' ? ScrollView : View;

    return (
      <View {...props} style={[globalStyles.flexFill, style]}>
        {!!title && <AppBar title={title} {...appBarProps} />}
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
