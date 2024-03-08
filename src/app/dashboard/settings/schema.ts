import { z } from 'zod';
import { slugSchema } from '#utils/schema';

export const updateSlugSchema = z.object({
	slug: slugSchema,
});
