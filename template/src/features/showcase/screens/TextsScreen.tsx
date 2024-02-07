import { Home } from '@/assets/icons';
import {
  IconTextInput,
  MultilineTextInput,
  ReadMoreText,
  Text,
  TextInput,
} from '@/components/core';
import { StackContainer } from '@/components/shared';
import { ProtectedScreenName } from '@/core/enums';
import { useTailwind } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { Separator } from '../components';

export default function TextsScreen() {
  const tw = useTailwind();
  const { t } = useTranslation();

  return (
    <StackContainer title={ProtectedScreenName.Texts}>
      <ScrollView style={tw`px-4`}>
        <Text>Normal text</Text>

        <Separator />

        <Text>Locale text: {t('common.cancel')}</Text>

        <Separator />

        <ReadMoreText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </ReadMoreText>

        <Separator />

        <Text>SinglelineTextInput</Text>
        <TextInput style={tw`border w-[100%]`} />

        <Separator />

        <Text>IconTextInput (left)</Text>
        <IconTextInput
          placeholder="IconTextInput (left)"
          IconLeftComponent={<Home stroke={tw.color('zinc-400')} />}
        />

        <Separator />

        <Text>IconTextInput (right)</Text>
        <IconTextInput
          placeholder="IconTextInput (right)"
          IconRightComponent={<Home stroke={tw.color('zinc-400')} />}
        />

        <Separator />

        <Text>IconTextInput (both)</Text>
        <IconTextInput
          placeholder="IconTextInput (both)"
          IconLeftComponent={<Home stroke={tw.color('zinc-400')} />}
          IconRightComponent={<Home stroke={tw.color('zinc-400')} />}
        />

        <Separator />

        <Text>MultilineTextInput</Text>
        <MultilineTextInput placeholder="MultilineTextInput" containerStyle={tw`w-[100%]`} />

        <Separator />

        <Text>MultilineTextInput dynamicHeight</Text>
        <MultilineTextInput
          dynamicHeight
          placeholder="MultilineTextInput dynamicHeight"
          containerStyle={tw`w-[100%]`}
        />
      </ScrollView>
    </StackContainer>
  );
}
