import { BottomSpacer, Row, Spacer } from '@components/core';
import { StackContainer } from '@components/custom';
import { ProtectedScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { globalStyles } from '@themes';
import { withHook } from '@utilities';
import { View } from 'react-native';
import { Separator, ShowcaseItem } from '../components';
import useSpacerContainer from '../containers/useSpacerContainer';

const SpacersScreen = withHook(
  useSpacerContainer,
  ({
    WIDTH,
    HEIGHT,
    showWidthSpacer,
    showHeightSpacer,
    showBottomTabSpacer,
    showSafeAreaSpacer,
    showHalfSafeAreaSpacer,
    status,
  }) => {
    const styles = useStyle(createStyles);

    return (
      <StackContainer headerTitle={ProtectedScreenName.Spacers}>
        <View style={[globalStyles.flexFillCenter, styles.container]}>
          <ShowcaseItem title={`Show width spacer: ${WIDTH}`} onPress={showWidthSpacer} />
          <Separator />
          <ShowcaseItem title={`Show height spacer: ${HEIGHT}`} onPress={showHeightSpacer} />
          <Separator />
          <ShowcaseItem title="Show bottomTab spacer" onPress={showBottomTabSpacer} />
          <Separator />
          <ShowcaseItem title="Show safeArea spacer" onPress={showSafeAreaSpacer} />
          <Separator />
          <ShowcaseItem title="Show halfSafeArea spacer" onPress={showHalfSafeAreaSpacer} />

          <Spacer h={100} />

          {status === 'spacerWidth' && (
            <Row style={[styles.spacerExampleContainer, styles.row]}>
              <View style={styles.sideView} />
              <Spacer w={WIDTH} />
              <View style={styles.sideView} />
            </Row>
          )}
          {status === 'spacerHeight' && (
            <View style={styles.spacerExampleContainer}>
              <Spacer h={HEIGHT} />
            </View>
          )}
        </View>

        {status === 'bottomTab' && <BottomSpacer type="bottomTab" />}
        {status === 'safeArea' && <BottomSpacer type="safeArea" />}
        {status === 'halfSafeArea' && <BottomSpacer type="halfSafeArea" />}
      </StackContainer>
    );
  },
);

const createStyles = ({ create, colors, dimensions }: StyleCallbackParams) =>
  create({
    container: {
      backgroundColor: colors.darkGray,
    },
    spacerExampleContainer: {
      backgroundColor: colors.white,
      width: dimensions.width,
    },
    sideView: {
      flex: 1,
      backgroundColor: colors.darkGray,
    },
    row: {
      height: 32,
    },
  });

export default SpacersScreen;
