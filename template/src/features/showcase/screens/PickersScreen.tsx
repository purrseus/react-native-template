import { DateTimePicker } from '@/components/core';
import { StackContainer } from '@/components/shared';
import { ProtectedScreenName } from '@/core/enums';
import { withHook } from '@/utils';
import { Separator, ShowcaseItem } from '../components';
import { usePickerContainer } from '../containers';
import { useTailwind } from '@/hooks';

const PickersScreen = withHook(
  usePickerContainer,
  ({ dateTime, setDateTime, dateTimePickerRef, showImagePicker, showDateTimePicker }) => {
    const tw = useTailwind();

    return (
      <StackContainer
        title={ProtectedScreenName.Pickers}
        wrapperType="scrollView"
        wrapperStyle={tw`py-4`}
      >
        <ShowcaseItem title="Show ImagePicker" onPress={showImagePicker} />
        <Separator />
        <ShowcaseItem title="Show DateTimePicker" onPress={showDateTimePicker} />

        <DateTimePicker
          mode="time"
          ref={dateTimePickerRef}
          date={dateTime ?? undefined}
          onConfirm={setDateTime}
        />
      </StackContainer>
    );
  },
);

export default PickersScreen;
