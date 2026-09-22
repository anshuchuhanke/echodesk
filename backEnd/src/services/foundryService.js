const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");

const project = new AIProjectClient(
  process.env.FOUNDRY_PROJECT_ENDPOINT,
  new DefaultAzureCredential()
);

const openai = project.getOpenAIClient({
  azureConfig: {
    allowPreview: true,
    agentName: process.env.FOUNDRY_AGENT_NAME,
  },
});

async function askFoundry(message) {
  const response = await openai.responses.create({
    input: message,
  });

  return response.output_text;
}

module.exports = {
  askFoundry,
};