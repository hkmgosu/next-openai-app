// pages/api/openai.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: 'user', content: prompt }],
      });
      const theResponse = completion.choices[0].message;
      return res.status(200).json({ output: theResponse });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res.status(500).json({ error: "Error fetching data from OpenAI" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
