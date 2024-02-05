import { z } from 'zod';

export const createTitleSchema = z.object({
	title: z
		.string({ required_error: 'Email is required' })
		.min(3, 'Title should be at least 3 characters'),
});
