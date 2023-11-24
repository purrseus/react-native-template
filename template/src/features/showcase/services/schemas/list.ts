import { z } from 'zod';

export const PhotosSchema = z.array(
  z.object({
    albumId: z.number().int(),
    id: z.number().int(),
    title: z.string().min(1),
    url: z.string().url(),
    thumbnailUrl: z.string().url(),
  }),
);

export type Photos = z.infer<typeof PhotosSchema>;
