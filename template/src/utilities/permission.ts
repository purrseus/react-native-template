import Alert from '@components/core/Modal/Alert';
import i18n from '@i18n';
import { Platform } from 'react-native';
import {
  check,
  checkMultiple,
  openSettings,
  Permission,
  PERMISSIONS,
  PermissionStatus,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import { logger } from './logger';

const ALLOWED_STATUSES: PermissionStatus[] = [RESULTS.GRANTED, RESULTS.LIMITED];
const { ANDROID, IOS } = PERMISSIONS;

//#region permission names
const photoGalleryPermissions = Platform.select<Permission[]>({
  android: [ANDROID.READ_EXTERNAL_STORAGE, ANDROID.WRITE_EXTERNAL_STORAGE],
  ios: [IOS.PHOTO_LIBRARY, IOS.PHOTO_LIBRARY_ADD_ONLY],
});

const cameraPermission = Platform.select({
  android: ANDROID.CAMERA,
  ios: IOS.CAMERA,
});
//#endregion

//#region alerts
const showUnavailablePermissionAlert = (): false => {
  Alert(i18n.t('permission.unavailableTitle'));

  return false;
};

const showBlockedPermissionAlert = (permissionName: string): false => {
  Alert(
    i18n.t('permission.blockedTitle', { permissionName }),
    i18n.t('permission.blockedMessage'),
    [
      {
        text: i18n.t('common.cancel'),
        style: 'cancel',
      },
      {
        text: i18n.t('permission.openSettings'),
        onPress: () =>
          openSettings().catch(() => logger('[permission] Cannot open permission settings!')),
        style: 'default',
      },
    ],
  );

  return false;
};
//#endregion

const checkMultiplePermissions =
  (getPermissionName: () => string, permissions: Permission[]) => async (): Promise<boolean> => {
    const permissionName = getPermissionName();

    try {
      const permissionsStatuses = await checkMultiple(permissions);

      const permissionsStatusValues = Object.values(permissionsStatuses);

      if (permissionsStatusValues.includes(RESULTS.UNAVAILABLE))
        return showUnavailablePermissionAlert();

      if (permissionsStatusValues.includes(RESULTS.BLOCKED))
        return showBlockedPermissionAlert(permissionName);

      const deniedPermissions = Object.entries(permissionsStatuses)
        .filter(([, value]) => value === RESULTS.DENIED)
        .map(([key]) => key as Permission);

      if (deniedPermissions.length) {
        const requestedStatuses = await requestMultiple(deniedPermissions);
        Object.assign(permissionsStatuses, requestedStatuses);
      }

      const statuses = Object.values(permissionsStatuses);

      if (statuses.includes(RESULTS.BLOCKED)) return showBlockedPermissionAlert(permissionName);

      return statuses.every(status => ALLOWED_STATUSES.includes(status));
    } catch (error) {
      logger(error);
      return false;
    }
  };

const checkPermission =
  (getPermissionName: () => string, permission: Permission) => async (): Promise<boolean> => {
    const permissionName = getPermissionName();

    try {
      const permissionStatus = await check(permission);

      switch (permissionStatus) {
        case RESULTS.UNAVAILABLE:
          return showUnavailablePermissionAlert();

        case RESULTS.BLOCKED:
          return showBlockedPermissionAlert(permissionName);

        case RESULTS.DENIED:
          const requestedStatus = await request(permission);
          if (requestedStatus === RESULTS.BLOCKED)
            return showBlockedPermissionAlert(permissionName);
          return ALLOWED_STATUSES.includes(requestedStatus);

        case RESULTS.LIMITED:
        case RESULTS.GRANTED:
          return true;

        default:
          return false;
      }
    } catch (error) {
      logger(error);
      return false;
    }
  };

//#region check permissions
export const checkPhotoGalleryPermissions = checkMultiplePermissions(
  () => i18n.t('permission.photoGallery'),
  photoGalleryPermissions!,
);

export const checkCameraPermission = checkPermission(
  () => i18n.t('permission.camera'),
  cameraPermission!,
);
//#endregion
