import { Configuration, OpenAIApi } from "openai";
import { serverEnv } from "../env/schema.mjs";
const configuration = new Configuration({
  apiKey: serverEnv.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);