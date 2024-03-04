import { useTailwind } from '@/hooks';
import { Dispatch, SetStateAction, createRef, useImperativeHandle, useState } from 'react';
import { View } from 'react-native';
import Modal from '../modal/Modal';
import ActivityIndicator from './ActivityIndicator';

export namespace OverlayLoading {
  interface OverlayLoadingMethods {
    show: Dispatch<SetStateAction<boolean>>;
  }

  const overlayLoadingRef = createRef<OverlayLoadingMethods>();

  export const show = (): void => overlayLoadingRef.current?.show(true);
  export const hide = (): void => overlayLoadingRef.current?.show(false);

  export function Component() {
    const tw = useTailwind();
    const [isVisible, setIsVisible] = useState(false);

    useImperativeHandle(overlayLoadingRef, () => ({ show: setIsVisible }), []);

    return (
      <Modal isVisible={isVisible}>
        <View style={tw`self-center p-5 rounded-xl bg-black/60`}>
          <ActivityIndicator size="large" />
        </View>
      </Modal>
    );
  }
}
