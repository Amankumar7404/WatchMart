// netlify/functions/recommend.js
//
// This runs on Netlify's server, NOT in the browser — so your API key stays hidden.
// It takes the watches the user has viewed/added to cart and asks the AI
// to recommend similar or complementary watches from your catalog.

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { viewedProducts, catalog } = JSON.parse(event.body);

    // viewedProducts: e.g. ["Classic Leather Chrono", "Steel Diver 200m"]
    // catalog: full list of your product names+brief specs, so AI only recommends real products

    const prompt = `
You are a product recommendation engine for an online watch store called WatchMart.

Customer has viewed/added these products:
${viewedProducts.join(", ")}

Full catalog available:
${catalog.map((p) => `- ${p.name}: ${p.description}`).join("\n")}

Based on the customer's interest, recommend exactly 3 watches from the catalog
(do not invent new products) that they would most likely also like.
Reply ONLY in this JSON format, nothing else:
[{"name": "...", "reason": "one short sentence why"}]
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const rawText = data.candidates[0].content.parts[0].text;

    // Clean up in case the model wraps it in ```json fences
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
