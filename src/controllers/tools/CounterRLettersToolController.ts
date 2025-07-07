import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { CounterLetterInWordService } from "../../services/CounterLetterInWordService";

export class CounterRLettersToolController {
  constructor(
    private server: McpServer,
    private counterLetterInWordService: CounterLetterInWordService
  ) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetUuidToolhandler();
  }

  private registerGetUuidToolhandler(): void {
    this.server.tool(
      "counter-letters",
      "Counts the number of letters 'R' in a given word.",
      {
        word: z
          .string()
          .min(1, "The word cannot be empty.")
          .refine(
            (word) => !word.includes(" "),
            "Must contain only one word and no spaces."
          )
          .describe("Word to count the letters"),
      },
      ({ word }) => {
        let data = this.counterLetterInWordService.counterRLetters(word);

        return {
          content: [
            {
              type: "text",
              text: data,
            },
          ],
        };
      }
    );
  }
}
