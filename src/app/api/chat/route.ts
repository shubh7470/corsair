import { OpenAIAgentsProvider } from '@corsair-dev/mcp';
import { Agent, run, tool } from '@openai/agents';
import { corsair } from '@/app/lib/corsair';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message } = await req.json();
    const provider = new OpenAIAgentsProvider();
    
    // Connect to the specific user's tenant
    const tenant = corsair.withTenant(session.user.email);
    const tools = provider.build({ corsair: tenant as any, tool });

    const now = new Date();
    const currentDate = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const currentTime = now.toLocaleTimeString('en-US');

    const agent = new Agent({
        name: 'corsair-agent',
        model: 'gpt-4o',
        instructions:
            `You are a specialized Email and Calendar AI Assistant.\n` +
            `Today's current date and time is: ${currentDate}, ${currentTime}.\n` +
            `You MUST ONLY help the user with managing their inbox, sending emails, and scheduling events using your Corsair tools.\n` +
            `If the user asks you anything unrelated to their emails, calendar, or scheduling (like math, programming, or general knowledge), ` +
            `you MUST politely refuse and tell them that you can only assist with their inbox and calendar.\n` +
            `CRITICAL: When the user asks you to read or fetch their emails, the "list messages" tool will only return email IDs. ` +
            `You MUST take those IDs and use the "get message" tool to fetch the actual details (Subject, Sender, Snippet, Date) ` +
            `BEFORE replying to the user. NEVER show raw IDs to the user. Always summarize the actual email contents clearly.\n` +
            `CRITICAL CALENDAR INSTRUCTIONS: When scheduling an event for "today" or "tomorrow", use the current date provided above to accurately determine the exact date and time. Do NOT hallucinate dates.`,
        tools,
    });
    
    const result = await run(agent, message);
    return Response.json({ response: result.finalOutput });
}