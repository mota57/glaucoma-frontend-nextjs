var openapi = require('@hey-api/openapi-ts');

openapi.createClient({
  client: '@hey-api/client-fetch',
  input: 'C:\\Users\\pc001\\Projects\\glaucoma-frontend-nextjs\\commands\\generate-client\\openapi.json',
  output: './lib/client',
  services: {
    asClass:true
  }
});