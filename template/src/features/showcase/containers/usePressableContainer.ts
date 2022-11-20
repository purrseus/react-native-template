import { wait } from '@utilities';
import { useState } from 'react';

const usePressableContainer = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onPress = async (value: boolean) => {
    setIsLoading(true);
    setIsEnabled(value);
    try {
      await wait(500);
      throw new Error('test');
    } catch (error) {
      setIsEnabled(!value);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isEnabled,
    isLoading,
    onPress,
  };
};

export default usePressableContainer;
