import { z } from 'zod';

export const createFormSchema = z.object({
	title: z.string().min(3),
});
