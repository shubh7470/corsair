import { corsair } from '@/app/lib/corsair';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tenant = corsair.withTenant(session.user.email);
  
  let unreadCount = 0;
  let todayEvents: any[] = [];
  let recentActivity: any[] = [];
  
  try {
    const unreadRes = await tenant.gmail.api.messages.list({ q: 'is:unread', maxResults: 1 });
    unreadCount = unreadRes.resultSizeEstimate || 0;
  } catch (e) {
    console.error("Failed to fetch unread emails", e);
  }

  try {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const eventsRes = await tenant.googlecalendar.api.events.getMany({ 
      calendarId: 'primary', 
      timeMin: now.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    });
    todayEvents = eventsRes.items || [];
  } catch (e) {
    console.error("Failed to fetch calendar events", e);
  }

  try {
    // Fetch recently sent emails as "Recent Activity"
    const sentRes = await tenant.gmail.api.messages.list({ q: 'in:sent', maxResults: 3 });
    if (sentRes.messages && sentRes.messages.length > 0) {
      for (const msg of sentRes.messages) {
        if (!msg.id) continue;
        const msgDetails = await tenant.gmail.api.messages.get({ id: msg.id, format: 'metadata', metadataHeaders: ['Subject', 'To'] });
        const headers = msgDetails.payload?.headers || [];
        const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';
        const to = headers.find(h => h.name === 'To')?.value || 'Unknown recipient';
        
        // Format time
        let timeStr = "Recently";
        if (msgDetails.internalDate) {
          const date = new Date(parseInt(msgDetails.internalDate));
          timeStr = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }

        recentActivity.push({
          id: msg.id,
          title: `Sent email to ${to.split('<')[0].trim()}`,
          desc: subject,
          time: timeStr,
          type: 'email'
        });
      }
    }
  } catch (e) {
    console.error("Failed to fetch recent activity", e);
  }

  return Response.json({
    unreadEmails: unreadCount,
    todayEvents: todayEvents,
    recentActivity: recentActivity
  });
}
