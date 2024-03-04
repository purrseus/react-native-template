/* eslint-disable react-native/split-platform-components */
import I18n from '@/i18n';
import { DefaultNS, ParseKeys, TOptions } from 'i18next';
import { Alert, Platform, PlatformAndroidStatic } from 'react-native';
import {
  AndroidPermission,
  IOSPermission,
  PERMISSIONS,
  Permission,
  PermissionStatus,
  RESULTS,
  check,
  checkMultiple,
  openSettings,
  request,
  requestMultiple,
} from 'react-native-permissions';

export namespace PermissionService {
  type PermissionName = ParseKeys<DefaultNS, TOptions, undefined> | TemplateStringsArray;
  type CheckPermissionCommonParams = [
    PermissionName,
    AndroidPermission | AndroidPermission[],
    IOSPermission | IOSPermission[],
  ];

  class PermissionChecker {
    private static readonly allowedStatues: PermissionStatus[] = [RESULTS.GRANTED, RESULTS.LIMITED];

    private static showUnavailablePermissionAlert(): false {
      Alert.alert(I18n.t('permission.unavailableTitle'));
      return false;
    }

    private static showBlockedPermissionAlert(permissionName: string): false {
      Alert.alert(
        I18n.t('permission.blockedTitle', { permissionName }),
        I18n.t('permission.blockedMessage'),
        [
          {
            text: I18n.t('common.cancel'),
            style: 'cancel',
          },
          {
            text: I18n.t('permission.openSettings'),
            onPress: () =>
              openSettings().catch(() => print('[permission] Cannot open permission settings!')),
            style: 'default',
          },
        ],
      );
      return false;
    }

    private static checkMultiplePermissions(
      name: PermissionName,
      androidPermissions: AndroidPermission[],
      iosPermissions: IOSPermission[],
    ): () => Promise<boolean> {
      return async () => {
        const permission = isAndroid() ? androidPermissions : iosPermissions;
        const permissionName = I18n.t(name);

        try {
          const permissionsStatuses = await checkMultiple(permission);

          const permissionsStatusValues = Object.values(permissionsStatuses);

          if (permissionsStatusValues.includes(RESULTS.UNAVAILABLE))
            return PermissionChecker.showUnavailablePermissionAlert();

          if (permissionsStatusValues.includes(RESULTS.BLOCKED))
            return PermissionChecker.showBlockedPermissionAlert(permissionName);

          const deniedPermissions = Object.entries(permissionsStatuses)
            .filter(([, value]) => value === RESULTS.DENIED)
            .map(([key]) => key as Permission);

          if (deniedPermissions.isNotEmpty) {
            const requestedStatuses = await requestMultiple(deniedPermissions);
            Object.assign(permissionsStatuses, requestedStatuses);
          }

          const statuses = Object.values(permissionsStatuses);

          if (statuses.includes(RESULTS.BLOCKED))
            return PermissionChecker.showBlockedPermissionAlert(permissionName);

          return statuses.every(status => PermissionChecker.allowedStatues.includes(status));
        } catch (error) {
          print(error);
          return false;
        }
      };
    }

    private static checkSinglePermission(
      name: PermissionName,
      androidPermission: AndroidPermission,
      iosPermission: IOSPermission,
    ): () => Promise<boolean> {
      return async () => {
        const permission = isAndroid() ? androidPermission : iosPermission;
        const permissionName = I18n.t(name);

        try {
          const permissionStatus = await check(permission);

          switch (permissionStatus) {
            case RESULTS.UNAVAILABLE:
              return PermissionChecker.showUnavailablePermissionAlert();

            case RESULTS.BLOCKED:
              return PermissionChecker.showBlockedPermissionAlert(permissionName);

            case RESULTS.DENIED:
              const requestedStatus = await request(permission);
              if (requestedStatus === RESULTS.BLOCKED)
                return PermissionChecker.showBlockedPermissionAlert(permissionName);
              return PermissionChecker.allowedStatues.includes(requestedStatus);

            case RESULTS.LIMITED:
            case RESULTS.GRANTED:
              return true;

            default:
              return false;
          }
        } catch (error) {
          print(error);
          return false;
        }
      };
    }

    static checkPermission(...args: CheckPermissionCommonParams): () => Promise<boolean> {
      const [name, androidPermission, iosPermission] = args;

      if (Array.isArray(androidPermission) && Array.isArray(iosPermission)) {
        return PermissionChecker.checkMultiplePermissions(name, androidPermission, iosPermission);
      }

      if (typeof androidPermission === 'string' && typeof iosPermission === 'string') {
        return PermissionChecker.checkSinglePermission(name, androidPermission, iosPermission);
      }

      throw new TypeError('The permission params are not invalid');
    }
  }

  type PermissionNameString = Extract<PermissionName, `permission.@${string}`>;

  type PermissionResources = Readonly<
    Record<
      PermissionNameString,
      { android: AndroidPermission | AndroidPermission[]; ios: IOSPermission | IOSPermission[] }
    >
  >;

  // https://developer.android.com/reference/android/os/Build.VERSION_CODES#TIRAMISU
  const isTiramisuVersionOrHigher =
    isAndroid() && (Platform as PlatformAndroidStatic).constants.Version >= 33;

  const permissionResources: PermissionResources = {
    'permission.@camera': {
      android: [PERMISSIONS.ANDROID.CAMERA],
      ios: [PERMISSIONS.IOS.CAMERA],
    },
    'permission.@photoGallery': {
      android: [
        isTiramisuVersionOrHigher
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      ],
      ios: [PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY],
    },
  };

  function getParams(
    name: PermissionNameString,
  ): Parameters<typeof PermissionChecker.checkPermission> {
    return [name, permissionResources[name].android, permissionResources[name].ios];
  }

  export const checkCamera = PermissionChecker.checkPermission(...getParams('permission.@camera'));

  export const checkPhotoGallery = PermissionChecker.checkPermission(
    ...getParams('permission.@photoGallery'),
  );
}
