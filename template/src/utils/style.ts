import config from '@/../tailwind.config';
import { CommonSize } from '@/core/types';
import { create } from 'twrnc';

export const tailwind = create(config);

export const randomColor = () => `#${Math.random().toString(16).slice(-6)}`;

export const resizeImage = (
  sizeType: 'width' | 'height',
  expectSize: number,
  currentWidth: number,
  currentHeight: number,
): CommonSize => {
  if (!expectSize) return { width: 0, height: 0 };
  const dimensionTarget = (sizeType === 'width' ? currentWidth : currentHeight) || 1;
  const scale = expectSize / dimensionTarget;
  return { width: currentWidth * scale, height: currentHeight * scale };
};
