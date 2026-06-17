import { corsair } from '@/app/lib/corsair';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return Response.json({ error: "Unauthorized" }, { status: 401 });
  
  const tenant = corsair.withTenant(session.user.email);
  const emails = await tenant.gmail.db.messages.search({
    limit: 20,
  });
  return Response.json(emails);
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