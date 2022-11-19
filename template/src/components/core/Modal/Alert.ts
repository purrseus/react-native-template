import { Alert as RNAlert } from 'react-native';

const Alert = (...[title, message, buttons, options]: Parameters<typeof RNAlert.alert>) =>
  RNAlert.alert(title, message, buttons, {
    cancelable: false,
    ...options,
  });

export default Alert;
