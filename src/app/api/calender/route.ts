import { corsair } from '@/app/lib/corsair';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return Response.json({ error: "Unauthorized" }, { status: 401 });
  
  const tenant = corsair.withTenant(session.user.email);
  const events = await tenant.googlecalendar.db.events.search({
    limit: 20,
  });
  return Response.json(events);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { title, attendee, startTime, endTime } = await req.json();
  const tenant = corsair.withTenant(session.user.email);
  
  const result = await tenant.googlecalendar.api.events.create({
    calendarId: "primary",
    sendUpdates: "all",
    event: {
      summary: title,
      attendees: [{ email: attendee }],
      start: { dateTime: startTime },
      end: { dateTime: endTime },
    }
  });

  return Response.json(result);
}