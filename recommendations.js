// recommendations.js
// Include this file in your WatchMart product/cart pages: <script src="recommendations.js"></script>
// Requires a <div id="recommendations"></div> in your HTML where suggestions should appear.

// 1. Your product catalog — reuse the same data you already show on the site.
//    Just name + short description is enough for the AI to work with.
const CATALOG = [
  { name: "Classic Leather Chrono", description: "Analog chronograph, brown leather strap, formal style" },
  { name: "Steel Diver 200m", description: "Stainless steel dive watch, water resistant to 200m, sporty" },
  { name: "Minimalist Slim", description: "Ultra-thin case, mesh strap, minimalist everyday watch" },
  { name: "Smart Fit Pro", description: "Smartwatch with fitness tracking, heart rate monitor" },
  { name: "Gold Edition Classic", description: "Gold-plated dress watch, premium formal wear" },
  // ...add the rest of your actual WatchMart catalog here
];

// 2. Track what the user has viewed (call this whenever a product page/card is opened)
function trackView(productName) {
  const viewed = JSON.parse(sessionStorage.getItem("viewedProducts") || "[]");
  if (!viewed.includes(productName)) {
    viewed.push(productName);
    sessionStorage.setItem("viewedProducts", JSON.stringify(viewed));
  }
}

// 3. Fetch AI recommendations based on what's been viewed
async function loadRecommendations() {
  const viewedProducts = JSON.parse(sessionStorage.getItem("viewedProducts") || "[]");
  const container = document.getElementById("recommendations");

  if (!container) return;

  if (viewedProducts.length === 0) {
    container.innerHTML = ""; // nothing viewed yet, show nothing (or show bestsellers as fallback)
    return;
  }

  container.innerHTML = "<p>Finding watches you'll love...</p>";

  try {
    const res = await fetch("/.netlify/functions/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ viewedProducts, catalog: CATALOG }),
    });

    const data = await res.json();

    if (!data.recommendations) throw new Error("No recommendations returned");

    container.innerHTML = `
      <h3>You might also like</h3>
      <div class="rec-grid">
        ${data.recommendations
          .map(
            (r) => `
          <div class="rec-card">
            <strong>${r.name}</strong>
            <p>${r.reason}</p>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  } catch (err) {
    console.error("Recommendation error:", err);
    container.innerHTML = ""; // fail silently, don't break the page
  }
}

// Call this on page load
document.addEventListener("DOMContentLoaded", loadRecommendations);
