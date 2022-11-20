import { Alert, Text } from '@components/core';
import { createArray } from '@utilities';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useModalContainer = () => {
  const { bottom } = useSafeAreaInsets();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBottomModalVisible, setIsBottomModalVisible] = useState(false);

  const ModalTexts = createArray(10).map((it, i) => (
    <Text key={i}>{it.toString().repeat(i + 1)}</Text>
  ));

  const openModal = () => setIsModalVisible(true);

  const dismissModal = () => setIsModalVisible(false);

  const openBottomModal = () => setIsBottomModalVisible(true);

  const dismissBottomModal = () => setIsBottomModalVisible(false);

  const showAlert = () => Alert('This is a title', 'This is a message');

  return {
    isModalVisible,
    isBottomModalVisible,
    openModal,
    dismissModal,
    openBottomModal,
    dismissBottomModal,
    ModalTexts,
    showAlert,
    bottomModalSafeArea: bottom,
  };
};

export default useModalContainer;
