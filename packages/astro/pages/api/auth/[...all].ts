import type { APIRoute } from 'astro';

import { auth } from '../../../libs/auth';

export const ALL: APIRoute = async (ctx) => {
  return auth.handler(ctx.request);
};
