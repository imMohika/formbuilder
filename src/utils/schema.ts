import { z } from 'zod';

export const slugSchema = z.string().min(3).max(20);
