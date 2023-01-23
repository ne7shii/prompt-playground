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
    }),
  voiceOrder: publicProcedure
    .input(z.object({
      tsCode: z.string(),
      text: z.string()
    }))
    .mutation(async ({ input }) => {

      const fullPrompt = `
      here is typescript type definition of Menu
      ${input.tsCode}
      here is sentence input from user 
      ${input.text}
      i want you to turn this sentence into json of type Menu[]
      `
      const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${fullPrompt}`,
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
    })
});
