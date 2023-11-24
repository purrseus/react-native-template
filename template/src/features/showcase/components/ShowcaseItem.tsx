import { Text, Touchable } from '@/components/core';
import { useTailwind } from '@/hooks';
import { compareMemo } from '@/utils';

interface ShowcaseItemProps {
  title: string;
  onPress: () => void;
}

function ShowcaseItem({ title, onPress }: ShowcaseItemProps) {
  const tw = useTailwind();

  return (
    <Touchable
      onPress={onPress}
      style={tw`p-4 rounded-lg items-center bg-zinc-300 dark:bg-zinc-700`}
    >
      <Text style={tw`text-base font-bold`}>{title}</Text>
    </Touchable>
  );
}

export default compareMemo(ShowcaseItem);
