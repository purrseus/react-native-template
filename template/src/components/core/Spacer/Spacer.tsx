import { compareMemo } from '@utilities';
import { View } from 'react-native';

interface SpacerProps {
  w?: number;
  h?: number;
}

const Spacer = compareMemo<SpacerProps>(({ w, h }) => <View style={{ width: w, height: h }} />);

export default Spacer;
