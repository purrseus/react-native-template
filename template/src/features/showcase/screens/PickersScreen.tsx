import { DateTimePicker, ImagePicker } from '@components/core';
import { StackContainer } from '@components/custom';
import { ProtectedScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { withHook } from '@utilities';
import { Separator, ShowcaseItem } from '../components';
import { usePickerContainer } from '../containers';

const PickersScreen = withHook(
  usePickerContainer,
  ({
    images,
    setImages,
    dateTime,
    setDateTime,
    imagePickerRef,
    dateTimePickerRef,
    showImagePicker,
    showDateTimePicker,
  }) => {
    const styles = useStyle(createStyles);

    return (
      <StackContainer
        headerTitle={ProtectedScreenName.Pickers}
        wrapperType="scrollView"
        wrapperStyle={styles.scrollView}
      >
        <ShowcaseItem title="Show ImagePicker" onPress={showImagePicker} />
        <Separator />
        <ShowcaseItem title="Show DateTimePicker" onPress={showDateTimePicker} />

        <ImagePicker ref={imagePickerRef} images={images} onChangeImage={setImages} />

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

const createStyles = ({ create }: StyleCallbackParams) =>
  create({
    scrollView: {
      paddingVertical: 16,
    },
  });

export default PickersScreen;
