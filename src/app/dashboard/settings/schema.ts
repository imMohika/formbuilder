import { z } from 'zod';
import { inviteCodeSchema, slugSchema } from '#utils/schema';

export const updateSlugSchema = z.object({
	slug: slugSchema,
});

export const regenerateInviteCodeSchema = z.object({
	oldInviteCode: inviteCodeSchema.optional(),
});
