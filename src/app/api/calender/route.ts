import { corsair } from '@/app/lib/corsair';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return Response.json({ error: "Unauthorized" }, { status: 401 });
  
  try {
    const tenant = corsair.withTenant(session.user.email);
    const eventsResponse: any = await tenant.googlecalendar.db.events.search({
      limit: 20,
    });
    // Ensure we always return an array
    const events = Array.isArray(eventsResponse) ? eventsResponse : eventsResponse.data || [];
    return Response.json(events);
  } catch (error: any) {
    console.error("Calendar error:", error);
    // If google calendar is not connected, return empty list instead of crashing
    if (error.message?.includes("Account not found")) {
      return Response.json([]);
    }
    return Response.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { title, attendee, startTime, endTime } = await req.json();
  const tenant = corsair.withTenant(session.user.email);
  
  try {
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
  } catch (error: any) {
    console.error("Error creating event:", error);
    if (error.message?.includes("Account not found")) {
      return Response.json({ error: "Google Calendar not connected. Please connect it first." }, { status: 403 });
    }
    return Response.json({ error: "Failed to create event" }, { status: 500 });
  }
}