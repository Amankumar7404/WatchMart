// netlify/functions/recommend.js
//
// This runs on Netlify's server, NOT in the browser — so your API key stays hidden.
// Uses Groq's free API (Llama model) to generate watch recommendations.

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { viewedProducts, catalog } = JSON.parse(event.body);

    const prompt = `
You are a product recommendation engine for an online watch store called WatchMart.

Customer has viewed/added these products:
${viewedProducts.join(", ")}

Full catalog available:
${catalog.map((p) => `- ${p.name}: ${p.description}`).join("\n")}

Based on the customer's interest, recommend exactly 3 watches from the catalog
(do not invent new products) that they would most likely also like.
Reply ONLY in this JSON format, nothing else, no markdown fences:
[{"name": "...", "reason": "one short sentence why"}]
`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log("Groq raw response:", JSON.stringify(data));

    const rawText = data.choices[0].message.content;
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const recommendations = JSON.parse(cleaned);

    return {
      statusCode: 200,
      body: JSON.stringify({ recommendations }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not generate recommendations" }),
    };
  }
};
