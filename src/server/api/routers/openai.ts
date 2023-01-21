/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { openai } from "../../../utils/openapi";

export const openaiRouter = createTRPCRouter({
  purePrompt: publicProcedure
    .input(z.object({
      prompt: z.string(),
      model: z.string().optional()
    }))
    .mutation(async ({ input }) => {
      const res = await openai.createCompletion({
        model: input.model || "text-davinci-003",
        prompt: `${input.prompt}`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      console.log('res', res)
      return {
        res: res.data.choices[0]?.text,
        model: res.data.model
      };
    }),
  listModels: publicProcedure
    .query(async () => {
      const models = await openai.listModels()
      return {
        res: models.data
      };
    })
});
