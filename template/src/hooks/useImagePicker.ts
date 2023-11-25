import { File, PromiseObject } from '@/core/interfaces';
import { PickedImageType } from '@/core/types';
import { checkCameraPermission, checkPhotoGalleryPermissions } from '@/utils';
import { useCallback, useMemo, useRef } from 'react';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { useImmer } from 'use-immer';
import useAppActionSheet from './useAppActionSheet';
import useAppTranslation from './useAppTranslation';

interface Options {
  maximumImages?: number;
  cameraOptions?: CameraOptions;
  imageLibraryOptions?: ImageLibraryOptions;
}

enum PickerOptions {
  CAMERA,
  IMAGE_LIBRARY,
}

const selectOptions = {
  [PickerOptions.CAMERA]: launchCamera,
  [PickerOptions.IMAGE_LIBRARY]: launchImageLibrary,
};

const defaultOptions: CameraOptions & ImageLibraryOptions = {
  mediaType: 'photo',
  quality: 1,
  cameraType: 'back',
  includeExtra: true,
  saveToPhotos: true,
};

const checkImagePickerPermission = async (): Promise<boolean> => {
  try {
    const hasCameraPermission = await checkCameraPermission();
    if (!hasCameraPermission) return false;

    const hasGalleryPermission = await checkPhotoGalleryPermissions();
    if (!hasGalleryPermission) return false;

    return true;
  } catch (error) {
    print(error);
    return false;
  }
};

const useImagePicker = ({
  maximumImages = 10,
  cameraOptions,
  imageLibraryOptions,
}: Options = {}) => {
  const pickerAction = useRef<PromiseObject<File | undefined> | null>(null);
  const [images, setImages] = useImmer<PickedImageType[]>([]);
  const { t } = useAppTranslation('imagePicker');

  const showActionSheet = useAppActionSheet(
    useMemo(
      () => ({
        options: [t('cancel'), t('takePhoto'), t('chooseFromLibrary')],
        cancelButtonIndex: 0,
      }),
      [t],
    ),
    useCallback(
      async buttonIndex => {
        const action = pickerAction.current;
        if (!action) return;
        if (!Number.isInteger(buttonIndex)) return action.reject(buttonIndex);
        if (!buttonIndex) return action.resolve(undefined);

        try {
          const options = {
            ...defaultOptions,
            ...(buttonIndex === PickerOptions.CAMERA ? cameraOptions : imageLibraryOptions),
          };

          const result = await selectOptions[buttonIndex as PickerOptions](options);
          const [{ uri, fileName: name, type }] = result.assets || [{}];

          if (!uri || !type || !name) return action.reject(result);
          return action.resolve({ uri, type, name });
        } catch (error) {
          print(error);
          action.reject(error);
        } finally {
          pickerAction.current = null;
        }
      },
      [cameraOptions, imageLibraryOptions],
    ),
  );

  const openImagePicker = useCallback(
    () =>
      new Promise<File | undefined>((resolve, reject) => {
        pickerAction.current = { resolve, reject };
        showActionSheet();
      }),
    [showActionSheet],
  );

  const addImage = useCallback(
    async (type: 'pick' | 'replace', replaceIndex?: number) => {
      try {
        const isPick = type === 'pick' && typeof replaceIndex !== 'number';
        const isReplace = type === 'replace' && Number.isInteger(replaceIndex);

        const canPick = isPick && images.length <= maximumImages;
        const canReplace = isReplace && replaceIndex!.isValidIndex(images);

        const canOpenImagePicker = canPick || canReplace;
        const hasPermission = await checkImagePickerPermission();
        if (!canOpenImagePicker || !hasPermission) return;

        const file = await openImagePicker();
        if (!file) return;

        setImages(draft => {
          if (canPick) draft.push(file);
          if (canReplace) draft[replaceIndex!] = file;
        });
      } catch (error) {
        print(error);
      }
    },
    [images, maximumImages, openImagePicker, setImages],
  );

  const pickImage = useCallback(async () => addImage('pick'), [addImage]);

  const replaceImage = useCallback(
    async (replaceIndex: number) => addImage('replace', replaceIndex),
    [addImage],
  );

  const deleteImage = useCallback(
    (deleteIndex?: number) => {
      if (deleteIndex?.isValidIndex(images)) {
        setImages(draft => {
          draft.splice(deleteIndex, 1);
        });
        return;
      }
      setImages([]);
    },
    [images, setImages],
  );

  return { images, setImages, pickImage, replaceImage, deleteImage };
};

export default useImagePicker;
