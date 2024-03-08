import { z } from 'zod';

export const slugSchema = z.string().min(3).max(20);
export const inviteCodeSchema = z.string().length(6, 'Invalid invite code');
