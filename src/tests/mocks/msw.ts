import { setupServer } from 'msw/node';
import { resendHandlers } from '#tests/mocks/resend';

// NOTE: Updating handlers requires restarting nextjs.
// Check https://github.com/mswjs/examples/pull/101#issuecomment-1904485310
export const server = setupServer(...resendHandlers);
