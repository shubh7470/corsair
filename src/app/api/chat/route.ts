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

    const agent = new Agent({
        name: 'corsair-agent',
        model: 'gpt-4o',
        instructions:
            'You are a helpful AI assistant. You have access to Corsair tools. ' +
            'Use them to manage the user\'s inbox, send emails, and schedule events.',
        tools,
    });
    
    const result = await run(agent, message);
    return Response.json({ response: result.finalOutput });
}