import { ArrowLeft, Home } from '@/assets/icons';
import { Button, Switch } from '@/components/core';
import { StackContainer } from '@/components/shared';
import { ProtectedScreenName } from '@/core/enums';
import { useTailwind } from '@/hooks';
import { withHook } from '@/utils';
import { View } from 'react-native';
import { Separator } from '../components';
import { useTouchableContainer } from '../containers';

const TouchableScreen = withHook(
  useTouchableContainer,
  ({
    isSwitchEnabled,
    onSwitchPress,
    onLargeButtonPress,
    onMediumButtonPress,
    onSmallButtonPress,
  }) => {
    const tw = useTailwind();

    return (
      <StackContainer
        wrapperType="scrollView"
        title={ProtectedScreenName.Touchable}
        wrapperStyle={tw`py-4`}
      >
        <Switch isEnabled={isSwitchEnabled} onPress={onSwitchPress} />
        <Separator />

        {/* Size */}
        <Button title="Large size (default)" size="large" onPress={onLargeButtonPress} />
        <Separator />
        <Button title="Medium size" size="medium" onPress={onMediumButtonPress} />
        <Separator />
        <Button title="Small size" size="small" onPress={onSmallButtonPress} />
        <Separator />

        <View style={tw`flex-row gap-x-4`}>
          <Button title="Small left" size="small" style={tw`flex-1`} />
          <Button title="Small right" size="small" style={tw`flex-1`} />
        </View>
        <Separator />

        {/* Type */}
        <Button title="Filled type (default)" type="filled" />
        <Separator />
        <Button title="Outline type" type="outlined" />
        <Separator />
        <Button title="Tonal type" type="tonal" />
        <Separator />

        {/* Color */}
        <Button title="Another color" color={tw.color('red-500')} />
        <Separator />
        <Button title="Gradient color" gradient />
        <Separator />
        <Button
          title="Another gradient color"
          gradient
          gradientColors={
            [
              tw.color('pink-500'),
              tw.color('purple-500'),
              tw.color('violet-500'),
              tw.color('blue-500'),
              tw.color('green-500'),
              tw.color('yellow-500'),
              tw.color('orange-500'),
              tw.color('red-500'),
            ] as string[]
          }
        />
        <Separator />

        {/* State */}
        <Button title="Loading..." loading />
        <Separator />
        <Button title="Disabled" disabled />
        <Separator />

        {/* Icon */}
        <Button title="Title with right icon" RightIcon={props => <Home {...props} />} />
        <Separator />
        <Button title="Title with left icon" LeftIcon={props => <ArrowLeft {...props} />} />
        <Separator />
        <Button
          title="Title with both icons"
          LeftIcon={props => <ArrowLeft {...props} />}
          RightIcon={props => <Home {...props} />}
        />
        <Separator />
        <Button
          title="Non-center title"
          centerTitle={false}
          RightIcon={props => <Home {...props} />}
        />
      </StackContainer>
    );
  },
);

export default TouchableScreen;
