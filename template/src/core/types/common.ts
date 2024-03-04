import { File } from '@/core/interfaces';
import { ScaledSize } from 'react-native';

export type CommonSize = Pick<ScaledSize, 'width' | 'height'>;

export type PickedImageType = string | File;
