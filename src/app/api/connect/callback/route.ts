import { corsair } from '@/app/lib/corsair';
import { processOAuthCallback } from 'corsair/oauth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code || !state) {
    return new NextResponse('Missing code or state', { status: 400 });
  }

  const redirectUri = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/connect/callback`;

  try {
    const result = await processOAuthCallback(corsair, {
      code,
      state,
      redirectUri,
    });
    
    // Automatically chain authentication: if user just connected Gmail, send them to connect Calendar next.
    if (result.plugin === 'gmail') {
      return NextResponse.redirect(new URL('/api/connect?plugin=googlecalendar', req.url));
    }
    
    // Successfully connected everything! Redirect back to the dashboard
    return NextResponse.redirect(new URL('/inbox', req.url));
  } catch (e: any) {
    console.error(e);
    return new NextResponse(e.message, { status: 500 });
  }
}
