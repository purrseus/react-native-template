import { Text } from '@/components/core';
import { useState } from 'react';
import { Alert } from 'react-native';

const useModalContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const ModalTexts = Array.from({ length: 20 }, (_, i) => (
    <Text key={i}>{i.toString().repeat(i + 1)}</Text>
  ));

  const openModal = () => setIsModalVisible(true);

  const dismissModal = () => setIsModalVisible(false);

  const showAlert = () => Alert.alert('This is a title', 'This is a message');

  return {
    openModal,
    showAlert,
    isModalVisible,
    dismissModal,
    ModalTexts,
  };
};

export default useModalContainer;
