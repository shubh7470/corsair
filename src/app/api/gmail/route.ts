import { corsair } from '@/app/lib/corsair';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return Response.json({ error: "Unauthorized" }, { status: 401 });
  
  const { searchParams } = new URL(req.url);
  const folder = searchParams.get('folder') || 'INBOX';

  const tenant = corsair.withTenant(session.user.email);
  
  try {
    const listResponse = await tenant.gmail.api.messages.list({
      userId: 'me',
      maxResults: 20,
      labelIds: [folder],
    });
    
    const messages = listResponse.messages || [];
    
    // Fetch full details for each message in parallel
    const detailedMessages = await Promise.all(
      messages
        .filter((msg: any) => msg.id)
        .map(async (msg: any) => {
          return await tenant.gmail.api.messages.get({
            userId: 'me',
            id: msg.id as string,
          });
        })
    );
    
    return Response.json(detailedMessages);
  } catch (error) {
    console.error("Error fetching emails:", error);
    return Response.json({ error: "Failed to fetch emails" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { to, subject, body } = await req.json();
  const tenant = corsair.withTenant(session.user.email);
  
  const message = [
    `To: ${to}`,
    `Subject: ${subject}`,
    "",
    body,
  ].join("\n");
  
  const raw = Buffer.from(message).toString("base64url");

  const result = await tenant.gmail.api.messages.send({
    userId: "me",
    raw,
  });

  return Response.json(result);
}