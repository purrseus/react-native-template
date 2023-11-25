import { OverlayLoadingMethods } from '@/core/interfaces';
import { useTailwind } from '@/hooks';
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { View } from 'react-native';
import Modal from '../modal/Modal';
import ActivityIndicator from './ActivityIndicator';

function OverlayLoading(_: unknown, ref: ForwardedRef<OverlayLoadingMethods>) {
  const tw = useTailwind();
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({ show: setIsVisible }), []);

  return (
    <Modal isVisible={isVisible}>
      <View style={tw`self-center p-5 rounded-xl bg-black/60`}>
        <ActivityIndicator size="large" />
      </View>
    </Modal>
  );
}

export default forwardRef(OverlayLoading);
