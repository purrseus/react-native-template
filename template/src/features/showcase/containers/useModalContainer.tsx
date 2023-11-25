import { Alert, Text } from '@/components/core';
import { useState } from 'react';

const useModalContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const ModalTexts = createAscendingOrderArray(10).map((it, i) => (
    <Text key={i}>{it.toString().repeat(i + 1)}</Text>
  ));

  const openModal = () => setIsModalVisible(true);

  const dismissModal = () => setIsModalVisible(false);

  const showAlert = () => Alert('This is a title', 'This is a message');

  return {
    openModal,
    showAlert,
    isModalVisible,
    dismissModal,
    ModalTexts,
  };
};

export default useModalContainer;
