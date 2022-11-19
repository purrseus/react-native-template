import { isAndroid, isIos } from '@utilities';
import { useCallback, useEffect, useState } from 'react';
import { Keyboard, KeyboardEventListener, KeyboardEventName } from 'react-native';

const keyboardEventNames: KeyboardEventName[] = [
  'keyboardWillShow',
  'keyboardDidShow',
  'keyboardWillHide',
  'keyboardDidHide',
];

const useKeyboard = () => {
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const keyboardEventListener = useCallback(
    (eventName: KeyboardEventName): KeyboardEventListener =>
      event => {
        const androidKeyboardHeightChanged = eventName.includes('Did') && isAndroid();
        const iosKeyboardHeightChanged = eventName.includes('Will') && isIos();

        setKeyboardShown(eventName.endsWith('DidShow'));
        if (androidKeyboardHeightChanged || iosKeyboardHeightChanged)
          setKeyboardHeight(eventName.endsWith('Show') ? event.endCoordinates.height : 0);
      },
    [],
  );

  useEffect(() => {
    const subscriptions = keyboardEventNames.map(eventName =>
      Keyboard.addListener(eventName, keyboardEventListener(eventName)),
    );

    return () => subscriptions.forEach(subscription => subscription.remove());
  }, [keyboardEventListener]);

  return { keyboardShown, keyboardHeight };
};

export default useKeyboard;
