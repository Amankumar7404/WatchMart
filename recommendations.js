// recommendations.js
// Include this file in your WatchMart product/cart pages: <script src="recommendations.js"></script>
// Requires a <div id="recommendations"></div> in your HTML where suggestions should appear.

// 1. Your product catalog — reuse the same data you already show on the site.
//    Just name + short description is enough for the AI to work with.
const CATALOG = [
  { name: "Classic Steel Chrono", description: "JUNGHANS chronograph, ₹19,499, classic steel dress style" },
  { name: "Chain Dress Watch", description: "TITAN dress watch, ₹12,999, chain strap, formal style" },
  { name: "Diver 200M", description: "ZENETH EL PRIMERO dive watch, ₹14,599, sporty" },
  { name: "Carbon Sport", description: "OMEGA sport watch, ₹32,799, carbon-style rugged build" },
  { name: "Minimal Silver", description: "GLASHUTTE minimalist watch, ₹22,499, silver dial, everyday wear" },
  { name: "Field Khaki", description: "ULYSSE NARDIN field watch, ₹26,699, khaki military style" },
  { name: "Pilot Chronograph", description: "TITAN pilot chronograph, ₹14,899, aviation style" },
  { name: "Titanium Everyday", description: "BALTIC titanium watch, ₹31,199, lightweight daily wear" },
  { name: "Black GMT", description: "SEIKO GMT watch, ₹51,299, black dial, travel/dual-time" },
  { name: "Ceramic Bezel", description: "WERTERN LITH watch, ₹25,699, ceramic bezel, sporty" },
  { name: "Rally Panda", description: "ADAM KIMMIEL racing chronograph, ₹41,099, panda dial" },
  { name: "Solar Explorer", description: "IWC SCHAFFHAUSEN solar watch, ₹11,299, explorer style" },
  { name: "Aether Chrono", description: "JACK PIERRE chronograph, ₹31,899, modern sport style" },
  { name: "Aurum Pilot", description: "EMPORIO ARMANI pilot watch, ₹39,799, gold-tone aviation style" },
  { name: "Stratos Racer", description: "BVLGAR racing watch, ₹23,999, motorsport style" },
  { name: "Vanguard GT", description: "ULYSSE NARDIN GT watch, ₹93,099, premium sport luxury" },
  { name: "Velocity Pro", description: "OMEGA sport watch, ₹13,999, performance style" },
  { name: "Deepline Automatic", description: "LONGINESE automatic dive watch, ₹36,299, deep-sea style" },
  { name: "Blackwater Pro", description: "TITAN OCTANE dive watch, ₹76,699, premium dive watch" },
  { name: "Titan Edge Ceramic", description: "Titan ceramic watch, ₹41,199, sleek modern design" },
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
