import { Alert as RNAlert } from 'react-native';

export default function Alert(
  ...[title, message, buttons, options]: Parameters<typeof RNAlert.alert>
) {
  return RNAlert.alert(title, message, buttons, {
    cancelable: false,
    ...options,
  });
}
