import { env } from 'cloudflare:workers';
export function database(){if(!env.DB)throw Error('Journal storage is unavailable');return env.DB;}
export function bucket(){if(!env.BUCKET)throw Error('Photo storage is unavailable');return env.BUCKET;}
export function sameOrigin(request:Request){const origin=request.headers.get('origin');return origin===new URL(request.url).origin;}
