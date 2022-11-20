import { icons } from '@assets';
import { Button, Row, Spacer, Switch } from '@components/core';
import { StackContainer } from '@components/custom';
import { ProtectedScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { colors, globalStyles } from '@themes';
import { withHook } from '@utilities';
import { Separator } from '../components';
import { usePressableContainer } from '../containers';

const PressableScreen = withHook(usePressableContainer, ({ isEnabled, onPress, isLoading }) => {
  const styles = useStyle(createStyles);

  return (
    <StackContainer
      wrapperType="scrollView"
      headerTitle={ProtectedScreenName.Pressable}
      wrapperStyle={styles.scrollView}
    >
      <Switch isEnabled={isEnabled} loading={isLoading} onPress={onPress} />
      <Separator />

      {/* Size */}
      <Button title="Large size (default)" size="large" />
      <Separator />
      <Button title="Medium size" size="medium" />
      <Separator />
      <Button title="Small size" size="small" />
      <Separator />

      <Row>
        <Button title="Small left" size="small" style={globalStyles.flexFill} />
        <Spacer w={16} />
        <Button title="Small right" size="small" style={globalStyles.flexFill} />
      </Row>
      <Separator />

      {/* Type */}
      <Button title="Filled type (default)" type="filled" />
      <Separator />
      <Button title="Outline type" type="outlined" />
      <Separator />
      <Button title="Tonal type" type="tonal" />
      <Separator />

      {/* Color */}
      <Button title="Another color" color={colors.red} />
      <Separator />
      <Button title="Gradient color" gradient />
      <Separator />
      <Button
        title="Another gradient color"
        gradient
        gradientColors={[colors.purple, colors.blue, colors.red, colors.orange]}
      />
      <Separator />

      {/* State */}
      <Button title="Loading..." loading />
      <Separator />
      <Button title="Disabled" disabled />
      <Separator />

      {/* Icon */}
      <Button title="Title with right icon" iconSpacing={8} iconRight={icons.bottomTab.home} />
      <Separator />
      <Button title="Title with left icon" iconSpacing={8} iconLeft={icons.header.back} />
      <Separator />
      <Button
        title="Title with both icon"
        iconSpacing={8}
        iconLeft={icons.header.back}
        iconRight={icons.bottomTab.home}
      />
      <Separator />
      <Button
        title="Title is not in center position"
        titleCenter={false}
        iconSpacing={8}
        iconRight={icons.bottomTab.home}
      />
    </StackContainer>
  );
});

const createStyles = ({ create }: StyleCallbackParams) =>
  create({
    scrollView: {
      paddingVertical: 16,
    },
  });

export default PressableScreen;
