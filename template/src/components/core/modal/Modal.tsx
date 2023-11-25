import { DEFAULT_BACKDROP_OPACITY } from '@/core/constants';
import { CommonSize } from '@/core/types';
import { useTailwind } from '@/hooks';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import RNModal, { ModalProps as RNModalProps } from 'react-native-modal';
import { Style } from 'twrnc/dist/esm/types';

type CombinedModalProps = Partial<RNModalProps> & Pick<RNModalProps, 'children' | 'isVisible'>;

export interface ModalProps extends CombinedModalProps {
  style?: Style;
}

const { width, height } = Dimensions.get('screen');

export default function Modal({ style, ...props }: ModalProps) {
  const tw = useTailwind();
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
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={DEFAULT_BACKDROP_OPACITY}
      {...props}
      avoidKeyboard
      statusBarTranslucent
      deviceWidth={dimensions.width}
      deviceHeight={dimensions.height}
      style={tw.style('p-0 m-0 justify-center', style)}
    />
  );
}
