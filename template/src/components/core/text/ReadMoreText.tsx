import { useAppTranslation, useTailwind } from '@/hooks';
import { useMemo, useRef, useState } from 'react';
import { NativeSyntheticEvent, TextLayoutEventData } from 'react-native';
import Text, { TextProps } from './Text';

export default function ReadMoreText({ children, numberOfLines = 3, ...props }: TextProps) {
  const tw = useTailwind();
  const isFirstRender = useRef(true);
  const [expanded, setExpanded] = useState(false);
  const [truncatedText, setTruncatedText] = useState('');
  const { t } = useAppTranslation('text');
  const [readMoreText, seeLessText] = useMemo(() => [t('readMore'), t('seeLess')], [t]);

  const toggle = () => {
    if (!truncatedText) return;
    setExpanded(!expanded);
  };

  const onTextLayout = ({ nativeEvent: { lines } }: NativeSyntheticEvent<TextLayoutEventData>) => {
    if (!isFirstRender.current) return;
    const shouldTruncate = lines.length > 3;
    if (!shouldTruncate) return;

    const suffixTruncatedText = '... ';

    const text = lines
      .slice(0, numberOfLines)
      .reduce((previousValue, currentValue) => previousValue + currentValue.text, '')
      .slice(0, -(suffixTruncatedText.length + readMoreText.length));

    setTruncatedText(`${text}${suffixTruncatedText}`);
    isFirstRender.current = false;
  };

  return (
    <Text {...props} suppressHighlighting onTextLayout={onTextLayout} onPress={toggle}>
      <Text>{truncatedText && !expanded ? truncatedText : children}</Text>
      {expanded ? '\n' : ' '}
      {!!truncatedText && (
        <Text style={tw`text-sky-600`}>{expanded ? seeLessText : readMoreText}</Text>
      )}
    </Text>
  );
}
