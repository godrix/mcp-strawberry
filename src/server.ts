import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CounterLetterInWordService } from "./services/CounterLetterInWordService";
import { CounterLettersToolController } from "./controllers/tools/CounterLettersToolController";
import { CounterRLettersToolController } from "./controllers/tools/CounterRLettersToolController";
import "dotenv/config";

async function main() {
  const server = new McpServer({
    name: "mcp-strawberry",
    version: "1.0.0",
  });

  // Services
  const counterLetterInWordService = new CounterLetterInWordService();

  //Tools
  new CounterLettersToolController(server, counterLetterInWordService);
  new CounterRLettersToolController(server, counterLetterInWordService);

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Strawberry MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
