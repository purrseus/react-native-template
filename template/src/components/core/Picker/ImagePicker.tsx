import { ActionSheetMethods, File, ImagePickerMethods } from '@core/interfaces';
import { PickedImageType } from '@core/types';
import { useAppTranslation } from '@hooks';
import {
  checkCameraPermission,
  checkPhotoGalleryPermissions,
  compareMemo,
  logger,
} from '@utilities';
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import ActionSheet, { ActionSheetProps } from '../BottomSheet/ActionSheet';

type PickType = 'pick' | 'replace';

interface ImagePickerProps extends Omit<ActionSheetProps, 'onSelect' | 'options'> {
  images: PickedImageType[];
  onChangeImage: (images: PickedImageType[]) => void;
  maximumImages?: number;
  cameraOptions?: CameraOptions;
  imageLibraryOptions?: ImageLibraryOptions;
}

enum PickerOptions {
  CAMERA = 1,
  IMAGE_LIBRARY = 2,
}

const DEFAULT_MAXIMUM_IMAGES = 10;

const CAMERA_OPTIONS: CameraOptions & ImageLibraryOptions = {
  mediaType: 'photo',
  quality: 1,
  cameraType: 'back',
  includeExtra: true,
  saveToPhotos: true,
};

const selectOptions = {
  [PickerOptions.CAMERA]: launchCamera,
  [PickerOptions.IMAGE_LIBRARY]: launchImageLibrary,
};

const ImagePicker = compareMemo<ImagePickerMethods, ImagePickerProps>(
  forwardRef(
    (
      {
        images,
        onChangeImage,
        cameraOptions = {},
        imageLibraryOptions = {},
        maximumImages = DEFAULT_MAXIMUM_IMAGES,
        ...props
      },
      ref,
    ) => {
      const { t } = useAppTranslation('imagePicker');
      const pickType = useRef<PickType | null>(null);
      const replaceIndex = useRef<number>(-1);
      const actionSheetRef = useRef<ActionSheetMethods | null>(null);

      const options = useMemo(() => [t('cancel'), t('takePhoto'), t('chooseFromLibrary')], [t]);

      const resetValue = () => {
        pickType.current = null;
        replaceIndex.current = -1;
      };

      const onSelect = useCallback(
        async (buttonIndex: 0 | PickerOptions) => {
          const notReplace =
            !buttonIndex ||
            (pickType.current === 'replace' && replaceIndex.current < 0) ||
            !pickType.current;

          if (notReplace) {
            resetValue();
            return;
          }

          const imageOptions = {
            ...CAMERA_OPTIONS,
            ...(buttonIndex === PickerOptions.CAMERA ? cameraOptions : imageLibraryOptions),
          };

          try {
            const result = await selectOptions[buttonIndex](imageOptions);
            if (!result?.assets?.length) {
              throw new Error(JSON.stringify(result));
            } else {
              const [{ uri, fileName: name, type }] = result.assets;
              if (!uri || !type || !name) throw '';

              const image: File = { uri, type, name };

              switch (pickType.current) {
                case 'pick':
                  onChangeImage([...images, image]);
                  break;

                case 'replace':
                  const clonedImages = [...images];
                  clonedImages[replaceIndex.current] = image;
                  onChangeImage(clonedImages);
                  break;
              }
            }
          } catch (error) {
            logger(error);
          } finally {
            resetValue();
          }
        },
        [cameraOptions, imageLibraryOptions, images, onChangeImage],
      );

      const pickImage = useCallback(
        (type: PickType) => async (index?: number) => {
          //#region check permissions
          const hasCameraPermission = await checkCameraPermission();
          if (!hasCameraPermission) return;

          const hasGalleryPermission = await checkPhotoGalleryPermissions();
          if (!hasGalleryPermission) return;
          //#endregion

          const canNotPick = type === 'pick' && images.length >= maximumImages;
          const canNotReplace =
            (type === 'replace' && !images.length) || (type === 'replace' && index === undefined);
          if (canNotReplace || canNotPick) return;

          pickType.current = type;
          const canReplace =
            type === 'replace' && index !== undefined && index >= 0 && index < images.length;

          if (canReplace) replaceIndex.current = index;
          actionSheetRef.current?.show();
        },
        [images, maximumImages],
      );

      const deleteImage = useCallback(
        (deleteIndex?: number) => {
          if (deleteIndex === undefined) {
            onChangeImage([]);
            return;
          }

          const canDeleteImage = !!images.length && deleteIndex >= 0 && deleteIndex < images.length;
          if (canDeleteImage) {
            onChangeImage(images.filter((_, i) => i !== deleteIndex));
          }
        },
        [images, onChangeImage],
      );

      useImperativeHandle(
        ref,
        () => ({
          pick: pickImage('pick'),
          replace: pickImage('replace'),
          delete: deleteImage,
        }),
        [pickImage, deleteImage],
      );

      return (
        <ActionSheet
          {...props}
          ref={actionSheetRef}
          options={options}
          onSelect={onSelect as (buttonIndex: number) => void}
        />
      );
    },
  ),
);

export default ImagePicker;
