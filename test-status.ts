import { corsair } from './src/app/lib/corsair';

async function test() {
  const email = "7470shubh@gmail.com"; 
  const status = await corsair.connectionStatus.get({ tenantId: email });
  console.log(JSON.stringify(status, null, 2));
  process.exit(0);
}

test().catch(console.error);
