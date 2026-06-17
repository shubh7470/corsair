import { corsair } from '@/app/lib/corsair';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const tenant = corsair.withTenant(session.user.email);
  let gmailConnected = false;
  let calendarConnected = false;

  try {
    await tenant.gmail.api.messages.list({ maxResults: 1 });
    gmailConnected = true;
  } catch (e) {}

  try {
    await tenant.googlecalendar.api.events.getMany({ calendarId: 'primary', maxResults: 1 });
    calendarConnected = true;
  } catch (e) {}

  return Response.json({ gmailConnected, calendarConnected });
}
 