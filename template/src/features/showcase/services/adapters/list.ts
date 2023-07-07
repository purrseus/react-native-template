/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

const photosSchema = z.array(
  z.object({
    albumId: z.number().nullable(),
    id: z.number().nullable(),
    title: z.string().min(1).nullable(),
    url: z.string().url().nullable(),
    thumbnailUrl: z.string().url().nullable(),
  }),
);

type PhotosResponse = z.infer<typeof photosSchema>;

export type Photos = PhotosResponse;

const isPhoto = (input: any): input is PhotosResponse => !!photosSchema.parse(input);

export const photosAdapter = (adaptee: any): Photos => {
  if (isPhoto(adaptee)) return adaptee;
  return [];
};
