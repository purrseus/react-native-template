/* eslint-disable react-native/no-inline-styles */
import { compareMemo } from '@utilities';
import { View, ViewProps } from 'react-native';

interface RowProps extends ViewProps {
  reverse?: boolean;
}

const Row = compareMemo<RowProps>(({ reverse = false, style, ...props }) => (
  <View {...props} style={[style, { flexDirection: reverse ? 'row-reverse' : 'row' }]} />
));

export default Row;
