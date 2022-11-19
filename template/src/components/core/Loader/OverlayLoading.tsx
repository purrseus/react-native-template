import { OverlayLoadingMethods, StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { alphaHexColor, compareMemo } from '@utilities';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { View } from 'react-native';
import Modal from '../Modal/Modal';
import ActivityIndicator from './ActivityIndicator';

const OverlayLoading = compareMemo<OverlayLoadingMethods, unknown>(
  forwardRef((_, ref) => {
    const styles = useStyle(createStyles);
    const [isVisible, setIsVisible] = useState(false);

    useImperativeHandle(ref, () => ({ show: setIsVisible }), []);

    return (
      <Modal isVisible={isVisible}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" />
        </View>
      </Modal>
    );
  }),
);

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    activityIndicatorWrapper: {
      alignSelf: 'center',
      padding: 20,
      backgroundColor: alphaHexColor(colors.black, 0.6),
      borderRadius: 12,
    },
  });

export default OverlayLoading;
