/* ========= Firebase (v9 modular) ========= */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

/* ⛳ REPLACE WITH YOUR DATABASE URL */
const app = initializeApp({
  apiKey: "AIzaSyCtiVkr15-KbU3Hv7i4g2HmO0cClInpvvs",
  authDomain: "watch-market-41b8e.firebaseapp.com",
  databaseURL: "https://watch-market-41b8e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "watch-market-41b8e",
  storageBucket: "watch-market-41b8e.firebasestorage.app",
  messagingSenderId: "400858590565",
  appId: "1:400858590565:web:0a6d41653bd8eb0ff6858c",
});
const db = getDatabase(app);
const auth = getAuth(app);

/* Save order to Firebase -> returns orderId (key) */
async function saveOrderToFirebase(order) {
  const newRef = await push(ref(db, "orders"), {
    ...order,
    status: "PLACED",
    createdAt: serverTimestamp(),
  });
  return newRef.key;
}

/* ========= Products (WatchMarket dataset) ========= */
const products = [
  {
    id: 1,
    name: "Classic Steel Chrono",
    brand: "JUNGHANS",
    price: 19499,
    img: "http://4.bp.blogspot.com/-9dVJGmjt8SA/VUn8QvvTt6I/AAAAAAAAMKg/OdG9sTG4iNc/s1600/Junghans-Meister-Agenda-027_4567_00-001.jpg",
    sizes: ["38mm", "42mm", "45mm"],
  },
  {
    id: 2,
    name: "Chain Dress Watch",
    brand: "TITAN",
    price: 12999,
    img: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwb83e9f06/images/Titan/Catalog/90110QM01_1.jpg?sw=800&sh=800",
    sizes: ["36mm", "40mm", "44mm"],
  },
  {
    id: 3,
    name: "Diver 200M",
    brand: "ZENETH EL PRIMERO",
    price: 14599,
    img: "https://cdn4.ethoswatches.com/the-watch-guide/wp-content/uploads/2018/02/top-5-zenith-chronomaster-watches-men-collectors-prices-mobile-mast.jpg",
    sizes: ["40mm", "42mm", "44mm"],
  },
  {
    id: 4,
    name: "Carbon Sport",
    brand: "OMEGA",
    price: 32799,
    img: "https://wallpapercave.com/wp/wp6974961.jpg",
    sizes: ["41mm", "43mm", "45mm"],
  },
  {
    id: 5,
    name: "Minimal Silver",
    brand: "GLASHUTTE",
    price: 22499,
    img: "https://monochrome-watches.com/wp-content/uploads/2015/10/Glashutte-Original-Sixties-grey-dial-full.jpg",
    sizes: ["36mm", "40mm", "42mm"],
  },
  {
    id: 6,
    name: "Field Khaki",
    brand: "ULYSSE NARDIN",
    price: 26699,
    img: "https://images4.alphacoders.com/574/574260.jpg",
    sizes: ["38mm", "40mm", "42mm"],
  },
  {
    id: 7,
    name: "Pilot Chronograph",
    brand: "TITAN",
    price: 14899,
    img: "https://www.titan.co.in/on/demandware.static/-/Sites-titan-master-catalog/default/dweda92dde/images/Titan/Catalog/90110WL04_1.jpg",
    sizes: ["42mm", "44mm", "46mm"],
  },
  {
    id: 8,
    name: "Titanium Everyday",
    brand: "BALTIC",
    price: 31199,
    img: "https://images.opumo.com/wordpress/wp-content/uploads/2022/08/opumo-banner-15.jpg",
    sizes: ["38mm", "40mm", "42mm"],
  },
  {
    id: 9,
    name: "Black GMT",
    brand: "SEIKO",
    price: 51299,
    img: "https://watchesbysjx.com/wp-content/uploads/2023/03/Seiko-Prospex-1968-GMT-SPB-383-black-profile.jpg",
    sizes: ["40mm", "42mm", "44mm"],
  },
  {
    id: 10,
    name: "Ceramic Bezel",
    brand: "WERTERN LITH",
    price: 25699,
    img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=wood-wristwatch-time-190819.jpg&fm=jpg",
    sizes: ["40mm", "42mm", "45mm"],
  },
  {
    id: 11,
    name: "Rally Panda",
    brand: "ADAM KIMMIEL",
    price: 41099,
    img: "https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg?cs=srgb&dl=pexels-pixabay-277319.jpg&fm=jpg",
    sizes: ["38mm", "40mm", "42mm"],
  },
  {
    id: 12,
    name: "Solar Explorer",
    brand: "IWC SCHAFFHAUSEN",
    price: 11299,
    img: "https://i.pinimg.com/originals/a5/af/29/a5af297cc589e13706929afb0015aabd.jpg",
    sizes: ["40mm", "42mm", "44mm"],
  },
  {
    id: 13,
    name: "Aether Chrono",
    brand: "JACK PIERRE",
    price: 31899,
    img: "https://images6.alphacoders.com/398/thumb-1920-398482.jpg",
    sizes: ["40mm", "42mm", "44mm"],
  },
  {
    id: 14,
    name: "Aurum Pilot",
    brand: "EMPORIO ARMANI",
    price: 39799,
    img: "https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?cs=srgb&dl=pexels-jatin-anand-125779.jpg&fm=jpg",
    sizes: ["40mm", "42mm", "44mm"],
  },
  {
    id: 15,
    name: "Stratos Racer",
    brand: "BVLGAR",
    price: 23999,
    img: "https://wallpaperaccess.com/full/4523621.jpg",
    sizes: ["40mm", "42mm", "44mm"],
  },
  {
    id: 16,
    name: "Vanguard GT",
    brand: "ULYSSE NARDIN",
    price: 93099,
    img: "https://i.pinimg.com/originals/f7/8e/53/f78e53dba9ffb52025e479630debf0e3.jpg",
    sizes: ["40mm", "42mm", "44mm"],
  },
  {
    id: 17,
    name: "Velocity Pro",
    brand: "OMEGA",
    price: 13999,
    img: "https://wallpaperaccess.com/full/812848.jpg",
    sizes: ["40mm", "42mm", "44mm"],
  },
  {
    id: 18,
    name: "Deepline Automatic",
    brand: "LONGINESE",
    price: 36299,
    img: "https://images6.alphacoders.com/349/349397.jpg",
    sizes: ["40mm", "42mm", "44mm"],
  },
  {
    id: 19,
    name: "Blackwater Pro",
    brand: "TITAN OCTANE",
    price: 76699,
    img: "https://wallpaperaccess.com/full/8635516.jpg",
    sizes: ["40mm", "42mm", "44mm"],
  },
  {
    id: 20,
    name: "Titan Edge Ceramic",
    brand: "Titan",
    price: 41199,
    img: "https://www.kamalwatch.com/cdn/shop/files/1696QC06_1_1.jpg?v=1718283402&width=800",
    sizes: ["40mm", "42mm", "44mm"],
  },
];

/* ========= DOM Refs ========= */
const grid = document.getElementById("productsGrid");
const cartCount = document.getElementById("cartCount");
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const cartContent = document.getElementById("cartContent");
const cartTotalEl = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const placeOrderBtn = document.getElementById("placeOrderBtn");
const confirmModal = document.getElementById("confirmModal");
const orderIdEl = document.getElementById("orderId");
const orderSummary = document.getElementById("orderSummary");
const toast = document.getElementById("toast");
const yearEl = document.getElementById("year");

/* Footer year */
yearEl.textContent = new Date().getFullYear();

/* ========= CART state ========= */
let cart = JSON.parse(localStorage.getItem("watch_cart") || "[]");

function saveCart() {
  localStorage.setItem("watch_cart", JSON.stringify(cart));
  renderCartCount();
}

function renderCartCount() {
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  if (totalQty > 0) {
    cartCount.style.display = "inline-block";
    cartCount.textContent = totalQty;
  } else cartCount.style.display = "none";
}

function showToast(msg, ms = 2000) {
  toast.textContent = msg;
  toast.style.display = "block";
  setTimeout(() => (toast.style.display = "none"), ms);
}

/* ========= Products render ========= */
function renderProducts() {
  grid.innerHTML = "";
  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";
    const sizeOptions = p.sizes
      .map((s) => `<option value="${s}">${s}</option>`)
      .join("");
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <div class="meta">${p.brand}</div>
      <div class="price">₹${p.price.toLocaleString("en-IN")}</div>
      <div style="display:flex;gap:8px;align-items:center">
        <select class="size-select" data-id="${p.id}">
          <option value="">Select Size</option>
          ${sizeOptions}
        </select>
        <button class="btn addBtn" data-id="${p.id}">Add to Cart</button>
      </div>
    `;
    grid.appendChild(card);
  });

  // attach handlers to add buttons
  grid.querySelectorAll(".addBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const select = grid.querySelector(`select[data-id="${id}"]`);
      const size = select ? select.value : "";
      addToCart(id, size);
    });
  });
}

/* ========= Add to cart ========= */
function addToCart(productId, size, qty = 1) {
  if (!size) {
    showToast("Please select a size");
    return;
  }
  const prod = products.find((p) => p.id === productId);
  if (!prod) return;
  trackView(prod.name);

  const existing = cart.find(
    (i) => i.id === productId && i.size === String(size),
  );
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      size: String(size),
      qty: qty,
      img: prod.img,
    });
  }
  saveCart();
  showToast("Added to cart");
}

/* ========= Render cart modal ========= */
function renderCart() {
  if (cart.length === 0) {
    cartContent.innerHTML = '<p class="small muted">Your cart is empty.</p>';
    cartTotalEl.textContent = "₹0";
    return;
  }
  const list = document.createElement("div");
  list.className = "cart-list";
  cart.forEach((item, idx) => {
    const el = document.createElement("div");
    el.className = "cart-item";
    el.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div style="flex:1">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
          <div>
            <strong>${item.name}</strong>
            <div class="small muted">Size: ${item.size}</div>
          </div>
          <div class="price">₹${item.price.toLocaleString("en-IN")}</div>
        </div>
        <div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center">
          <div class="qty-controls">
            <button class="btn ghost dec" data-idx="${idx}">-</button>
            <div style="min-width:24px;text-align:center">${item.qty}</div>
            <button class="btn ghost inc" data-idx="${idx}">+</button>
            <button class="btn danger" data-idx="${idx}" id="remove${idx}">Remove</button>
          </div>
        </div>
      </div>
    `;
    list.appendChild(el);
  });
  cartContent.innerHTML = "";
  cartContent.appendChild(list);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  cartTotalEl.textContent = "₹" + total.toLocaleString("en-IN");

  // hook up inc/dec/remove
  list.querySelectorAll(".inc").forEach((b) =>
    b.addEventListener("click", () => {
      const i = Number(b.dataset.idx);
      cart[i].qty += 1;
      saveCart();
      renderCart();
    }),
  );
  list.querySelectorAll(".dec").forEach((b) =>
    b.addEventListener("click", () => {
      const i = Number(b.dataset.idx);
      if (cart[i].qty > 1) cart[i].qty -= 1;
      else cart.splice(i, 1);
      saveCart();
      renderCart();
    }),
  );
  list.querySelectorAll('[id^="remove"]').forEach((b) =>
    b.addEventListener("click", () => {
      const idx = Number(b.dataset.idx);
      cart.splice(idx, 1);
      saveCart();
      renderCart();
    }),
  );
}

/* ========= Modals open/close ========= */
function openModal(el) {
  el.style.display = "flex";
}
function closeModal(el) {
  el.style.display = "none";
}

// Cart button
cartBtn.addEventListener("click", () => {
  renderCart();
  openModal(cartModal);
});
document
  .getElementById("closeCart")
  .addEventListener("click", () => closeModal(cartModal));

// Checkout button
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Cart is empty");
    return;
  }
  closeModal(cartModal);
  openModal(checkoutModal);
});

// Payment method toggle
document.getElementById("paymentMethod").addEventListener("change", (e) => {
  const v = e.target.value;
  document.getElementById("cardFields").style.display =
    v === "card" ? "block" : "none";
});

// Cancel checkout
document
  .getElementById("cancelCheckout")
  .addEventListener("click", () => closeModal(checkoutModal));

/* ========= Place order (saves to Firebase) ========= */
placeOrderBtn.addEventListener("click", async () => {
  const fullname = document.getElementById("fullname").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const city = document.getElementById("city").value.trim();
  const pincode = document.getElementById("pincode").value.trim();
  const paymentMethod = document.getElementById("paymentMethod").value;

  if (!fullname || !phone || !address || !city || !pincode) {
    showToast("Please fill all address fields");
    return;
  }
  if (!/^\d{10}$/.test(phone)) {
    showToast("Enter valid 10-digit phone");
    return;
  }
  if (!/^\d{5,6}$/.test(pincode)) {
    showToast("Enter valid pincode");
    return;
  }

  if (paymentMethod === "card") {
    const cardNo = document.getElementById("cardNo").value.trim();
    const cardExp = document.getElementById("cardExp").value.trim();
    const cardCvc = document.getElementById("cardCvc").value.trim();
    if (!cardNo || !cardExp || !cardCvc) {
      showToast("Fill mock card details");
      return;
    }
    if (!/^\d{12,19}$/.test(cardNo.replace(/\s+/g, ""))) {
      showToast("Enter valid mock card number");
      return;
    }
  }

  const order = {
    // id will be filled with Firebase key
    id: null,
    date: new Date().toISOString(),
    customer: { fullname, phone, address, city, pincode, paymentMethod },
    items: cart.map((i) => ({
      name: i.name,
      size: i.size,
      price: i.price,
      qty: i.qty,
    })),
    total: cart.reduce((s, i) => s + i.price * i.qty, 0),
  };

  try {
    // Save to Firebase and get generated key
    const fbId = await saveOrderToFirebase(order);
    order.id = fbId;

    // Update confirmation UI
    orderIdEl.textContent = `#${order.id}`;
    orderSummary.innerHTML = `
      <strong>Customer:</strong> ${order.customer.fullname}<br>
      <strong>Phone:</strong> ${order.customer.phone}<br>
      <strong>Address:</strong> ${order.customer.address}, ${
        order.customer.city
      } - ${order.customer.pincode}<br>
      <strong>Payment:</strong> ${
        order.customer.paymentMethod === "cod"
          ? "Cash on Delivery"
          : "Mock Card"
      }<br>
      <strong>Items:</strong>
      <ul>
        ${order.items
          .map(
            (it) =>
              `<li>${it.name} (Size ${it.size}) x ${it.qty} — ₹${(
                it.price * it.qty
              ).toLocaleString("en-IN")}</li>`,
          )
          .join("")}
      </ul>
      <strong>Total:</strong> ₹${order.total.toLocaleString("en-IN")}
    `;

    // Clear cart and show confirmation
    cart = [];
    saveCart();
    closeModal(checkoutModal);
    openModal(confirmModal);
  } catch (err) {
    console.error(err);
    showToast("Failed to place order. Try again.");
  }

  // reset fields
  [
    "fullname",
    "phone",
    "address",
    "city",
    "pincode",
    "cardNo",
    "cardExp",
    "cardCvc",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  document.getElementById("paymentMethod").value = "cod";
  document.getElementById("cardFields").style.display = "none";
});

// Done button
document.getElementById("doneBtn").addEventListener("click", () => {
  closeModal(confirmModal);
  showToast("Order confirmed — thank you!");
});

// Login modal (demo)
/* ========= Real Authentication (Firebase Auth) ========= */
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const loginClose = document.getElementById("loginClose");
const loginMsg = document.getElementById("loginMsg");
const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const authSubmitBtn = document.getElementById("authSubmitBtn");
const authModalTitle = document.getElementById("authModalTitle");
const authToggleText = document.getElementById("authToggleText");
const authToggleLink = document.getElementById("authToggleLink");

let isSignupMode = false; // tracks whether the modal is in "Login" or "Sign up" mode
let currentUser = null; // holds the logged-in user's info once authenticated

// Switch between Login and Sign up views (just changes text/labels, same form)
authToggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  isSignupMode = !isSignupMode;
  if (isSignupMode) {
    authModalTitle.textContent = "Sign Up";
    authSubmitBtn.textContent = "Sign Up";
    authToggleText.textContent = "Already have an account?";
    authToggleLink.textContent = "Login";
  } else {
    authModalTitle.textContent = "Login";
    authSubmitBtn.textContent = "Login";
    authToggleText.textContent = "Don't have an account?";
    authToggleLink.textContent = "Sign up";
  }
  loginMsg.textContent = "";
});

// Open/close modal (only when NOT logged in — logged in users log out instead)
const userDropdown = document.getElementById("userDropdown");
const logoutLink = document.getElementById("logoutLink");
const myOrdersLink = document.getElementById("myOrdersLink");

// Clicking the button either opens login modal (logged out) or toggles dropdown (logged in)
loginBtn.addEventListener("click", () => {
  if (currentUser) {
    userDropdown.style.display =
      userDropdown.style.display === "block" ? "none" : "block";
  } else {
    openModal(loginModal);
  }
});

// Close dropdown if clicking anywhere else on the page
document.addEventListener("click", (e) => {
  if (!e.target.closest(".user-menu-wrapper")) {
    userDropdown.style.display = "none";
  }
});

// Explicit logout action
logoutLink.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth);
  userDropdown.style.display = "none";
});

// Placeholder for "My Orders" — we'll build this in the next phase
myOrdersLink.addEventListener("click", (e) => {
  e.preventDefault();
  alert("Order history page coming soon!");
  userDropdown.style.display = "none";
});

loginClose.addEventListener("click", () => closeModal(loginModal));
loginModal.addEventListener("click", (e) => {
  if (e.target === loginModal) closeModal(loginModal);
});

// Handle Login / Sign up submit
authSubmitBtn.addEventListener("click", async () => {
  const email = authEmail.value.trim();
  const password = authPassword.value.trim();

  if (!email || !password) {
    loginMsg.textContent = "Please fill all fields!";
    return;
  }

  try {
    if (isSignupMode) {
      // Create a brand new account
      await createUserWithEmailAndPassword(auth, email, password);
      loginMsg.textContent = "Account created! You're now logged in.";
    } else {
      // Log into an existing account
      await signInWithEmailAndPassword(auth, email, password);
      loginMsg.textContent = "Login successful!";
    }
    authEmail.value = "";
    authPassword.value = "";
    setTimeout(() => closeModal(loginModal), 700);
  } catch (err) {
    // Firebase gives descriptive error codes/messages we can show directly
    loginMsg.textContent = humanizeAuthError(err.code);
  }
});

// Convert Firebase's technical error codes into friendly messages
function humanizeAuthError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Try logging in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    default:
      return "Something went wrong. Please try again.";
  }
}

// This runs automatically whenever login state changes (login, logout, or page load)
onAuthStateChanged(auth, (user) => {
  currentUser = user;
  if (user) {
    // Logged in — show their email instead of "Login", and change button to "Logout"
    loginBtn.textContent = user.email.split("@")[0]; // show just the username part
  } else {
    loginBtn.textContent = "Login";
  }
});
/* ========= Init ========= */
renderProducts();
renderCartCount();

// close modals by clicking outside
[cartModal, checkoutModal, confirmModal, loginModal].forEach((m) => {
  m.addEventListener("click", (e) => {
    if (e.target === m) closeModal(m);
  });
});
