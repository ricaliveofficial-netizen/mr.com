// Firebase Import (V9 Module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyDaTVXqAH8jXHfljPcVPXKb90Y_ALV01_k",
    authDomain: "zero-online.firebaseapp.com",
    projectId: "zero-online",
    storageBucket: "zero-online.firebasestorage.app",
    messagingSenderId: "575456882778",
    appId: "1:575456882778:web:cf345132c8e8b5bb682863",
    measurementId: "G-QB2Z036PLP"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load Products
async function loadProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "<p>Loading...</p>";

    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        productList.innerHTML = "";

        querySnapshot.forEach(doc => {
            const p = doc.data();

            productList.innerHTML += `
                <div class="product-card">
                    <img src="${p.image}">
                    <h3 class="product-title">${p.title}</h3>
                    <p class="product-price">৳ ${p.price}</p>
                    <button class="buy-btn">Buy Now</button>
                </div>
            `;
        });

    } catch (error) {
        productList.innerHTML = "<p>Error loading products!</p>";
    }
}

loadProducts();