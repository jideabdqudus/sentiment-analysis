import Together from "together-ai";
const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

export async function POST(request: Request) {
  const { question } = await request.json();

  const res = await together.chat.completions.create({
    model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    messages: [
      {
        role: "system",
        content: `You are a sentiment analysis expert. Analyze the given product review and respond with EXACTLY ONE WORD from these options: 'Positive', 'Negative', or 'Neutral'.

          Rules:
          - Positive: Clear satisfaction, praise, or recommendation
          - Negative: Disappointment, complaints, or warnings against the product
          - Neutral: Mixed feelings or balanced opinions

          Do not explain or add any other text. Only respond with one of the three words.`,
      },
      { role: "user", content: question },
    ],
    logprobs: 1,
    max_tokens: 1,
    temperature: 1,
  });

  const confidence = res.choices[0].logprobs?.token_logprobs?.[0] ?? -Infinity;
  const confidenceScore = Math.min(Math.max(Math.exp(confidence), 0), 1);

  const rawResult = res.choices[0].message?.content?.trim();
  const validSentiments = ["Positive", "Negative", "Neutral"];
  const result = validSentiments.includes(rawResult ?? "")
    ? rawResult
    : "Neutral";

  return Response.json({
    result,
    confidence: confidenceScore,
  });
}
