import { corsair } from '@/app/lib/corsair';
import { generateOAuthUrl } from 'corsair/oauth';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const { searchParams } = new URL(req.url);
  const plugin = searchParams.get('plugin');

  if (!plugin) {
    return new NextResponse('Missing plugin parameter', { status: 400 });
  }

  const redirectUri = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/connect/callback`;

  try {
    const { url } = await generateOAuthUrl(corsair, plugin, {
      tenantId: session.user.email,
      redirectUri,
    });
    
    return NextResponse.redirect(url);
  } catch (e: any) {
    console.error(e);
    return new NextResponse(e.message, { status: 500 });
  }
}
