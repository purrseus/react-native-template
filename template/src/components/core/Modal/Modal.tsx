import { DEFAULT_BACKDROP_OPACITY } from '@core/constants';
import { StyleCallbackParams } from '@core/interfaces';
import { CommonSize } from '@core/types';
import { useStyle } from '@hooks';
import { compareMemo } from '@utilities';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import RNModal, { ModalProps as RNModalProps } from 'react-native-modal';

type CombinedModalProps = Partial<RNModalProps> & Pick<RNModalProps, 'children' | 'isVisible'>;

export interface ModalProps extends CombinedModalProps {
  type?: 'modal' | 'bottomSheet';
}

type AnimationType = Record<
  NonNullable<ModalProps['type']>,
  Pick<ModalProps, 'animationIn' | 'animationOut'>
>;

const { width, height } = Dimensions.get('screen');

const animationType: AnimationType = {
  modal: { animationIn: 'fadeIn', animationOut: 'fadeOut' },
  bottomSheet: { animationIn: 'slideInUp', animationOut: 'slideOutDown' },
};

const Modal = compareMemo<ModalProps>(({ type = 'modal', style, ...props }) => {
  const styles = useStyle(createStyles);
  const [dimensions, setDimensions] = useState<CommonSize>({ width, height });

  useEffect(() => {
    // Screen Dimensions, not Window Dimensions
    const subscription = Dimensions.addEventListener('change', ({ screen }) => {
      setDimensions({ width: screen.width, height: screen.height });
    });

    return () => subscription.remove();
  }, []);

  return (
    <RNModal
      {...animationType[type]}
      backdropOpacity={DEFAULT_BACKDROP_OPACITY}
      {...props}
      avoidKeyboard
      statusBarTranslucent
      deviceWidth={dimensions.width}
      deviceHeight={dimensions.height}
      style={[styles.common, styles[type], style]}
    />
  );
});

const createStyles = ({ create }: StyleCallbackParams) =>
  create({
    common: {
      padding: 0,
      margin: 0,
    },
    modal: {
      justifyContent: 'center',
    },
    bottomSheet: {
      justifyContent: 'flex-end',
    },
  });

export default Modal;
