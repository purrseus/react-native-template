import { icons } from '@assets';
import {
  Icon,
  IconTextInput,
  KeyboardAwareScrollView,
  MultilineTextInput,
  Text,
  TextInput,
} from '@components/core';
import { StackContainer } from '@components/shared';
import { ProtectedScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { useTranslation } from 'react-i18next';
import { Separator } from '../components';

const TextsScreen = () => {
  const { t } = useTranslation();
  const styles = useStyle(createStyles);

  return (
    <StackContainer title={ProtectedScreenName.Texts}>
      <KeyboardAwareScrollView style={styles.keyboardView}>
        <Text>Normal text</Text>
        <Text>Locale text: {t('common.cancel')}</Text>

        <Separator />

        <Text>SinglelineTextInput</Text>
        <TextInput style={styles.singlelineTextInput} />

        <Separator />

        <Text>IconTextInput (left)</Text>
        <IconTextInput
          placeholder="IconTextInput (left)"
          IconLeftComponent={<Icon source={icons.bottomTab.home} />}
        />

        <Separator />

        <Text>IconTextInput (right)</Text>
        <IconTextInput
          placeholder="IconTextInput (right)"
          IconRightComponent={<Icon source={icons.bottomTab.home} />}
        />

        <Separator />

        <Text>IconTextInput (both)</Text>
        <IconTextInput
          placeholder="IconTextInput (both)"
          IconLeftComponent={<Icon source={icons.bottomTab.home} />}
          IconRightComponent={<Icon source={icons.bottomTab.message} />}
        />

        <Separator />

        <Text>MultilineTextInput</Text>
        <MultilineTextInput
          placeholder="MultilineTextInput"
          containerStyle={styles.multilineTextInput}
        />

        <Separator />

        <Text>MultilineTextInput dynamicHeight</Text>
        <MultilineTextInput
          dynamicHeight
          placeholder="MultilineTextInput"
          containerStyle={styles.dynamicHeightMultilineTextInput}
        />
      </KeyboardAwareScrollView>
    </StackContainer>
  );
};

const createStyles = ({ create }: StyleCallbackParams) =>
  create({
    keyboardView: {
      paddingHorizontal: 16,
    },
    singlelineTextInput: {
      borderWidth: 1,
      width: '100%',
    },
    multilineTextInput: {
      width: '100%',
    },
    dynamicHeightMultilineTextInput: {
      width: '100%',
    },
  });

export default TextsScreen;
