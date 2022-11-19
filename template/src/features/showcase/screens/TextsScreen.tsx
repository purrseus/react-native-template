import { icons } from '@assets';
import {
  Icon,
  IconTextInput,
  KeyboardAwareScrollView,
  MultilineTextInput,
  Text,
  TextInput,
} from '@components/core';
import { StackContainer } from '@components/custom';
import { ProtectedScreenName } from '@core/enums';
import { useTranslation } from 'react-i18next';
import { Separator } from '../components';

const TextsScreen = () => {
  const { t } = useTranslation();

  return (
    <StackContainer headerTitle={ProtectedScreenName.Texts}>
      <KeyboardAwareScrollView style={{ paddingHorizontal: 16 }}>
        <Text>Normal text</Text>
        <Text>Locale text: {t('common.cancel')}</Text>

        <Separator />

        <Text>SinglelineTextInput</Text>
        <TextInput style={{ borderWidth: 1, width: '100%' }} />

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
        <MultilineTextInput placeholder="MultilineTextInput" containerStyle={{ width: '100%' }} />

        <Separator />

        <Text>MultilineTextInput dynamicHeight</Text>
        <MultilineTextInput
          dynamicHeight
          placeholder="MultilineTextInput"
          containerStyle={{ width: '100%' }}
        />
      </KeyboardAwareScrollView>
    </StackContainer>
  );
};

export default TextsScreen;
