import { Button, Modal } from '@/components/core';
import { StackContainer } from '@/components/shared';
import { ProtectedScreenName } from '@/core/enums';
import { useTailwind } from '@/hooks';
import { withHook } from '@/utils';
import { View } from 'react-native';
import { ShowcaseItem } from '../components';
import { useModalContainer } from '../containers';

const ModalsScreen = withHook(
  useModalContainer,
  ({ openModal, showAlert, isModalVisible, dismissModal, ModalTexts }) => {
    const tw = useTailwind();

    return (
      <>
        <StackContainer
          title={ProtectedScreenName.Modals}
          wrapperType="scrollView"
          wrapperStyle={tw`flex-fill-center gap-y-4`}
        >
          <ShowcaseItem title="Show modal" onPress={openModal} />
          <ShowcaseItem title="Show alert" onPress={showAlert} />
        </StackContainer>

        <Modal isVisible={isModalVisible} onBackdropPress={dismissModal}>
          <View style={tw`bg-white dark:bg-zinc-700 p-4 mx-8 rounded-xl gap-y-4`}>
            <View>{ModalTexts}</View>

            <Button title="Dismiss modal" onPress={dismissModal} />
          </View>
        </Modal>
      </>
    );
  },
);

export default ModalsScreen;
