import { corsair } from '@/app/lib/corsair';
import { toNextJsHandler } from 'corsair';

const handler = toNextJsHandler(corsair, { basePath: '/api/corsair' });

export const GET = handler.GET;
export const POST = handler.POST;
