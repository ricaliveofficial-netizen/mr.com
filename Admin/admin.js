import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ================= Firebase Config =================
const firebaseConfig = {
    apiKey: "AIzaSyDaTVXqAH8jXHf1jPcVPXKb9OY_ALVO1_k",
    authDomain: "zero-online.firebaseapp.com",
    projectId: "zero-online",
    storageBucket: "zero-online.firebasestorage.app",
    messagingSenderId: "575456882778",
    appId: "1:575456882778:web:cf345132c8e8b5bb682863",
    measurementId: "G-QBZ2O36PLP"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const baseImgur = "https://i.imgur.com/";

// ================= Add Product =================
document.getElementById("addBtn").addEventListener("click", async () => {
    let name = document.getElementById("name").value.trim();
    let price = document.getElementById("price").value.trim();
    let img = document.getElementById("img").value.trim();

    if (img && !img.startsWith("http")) {
        img = baseImgur + img;
    }

    if (!name || !price || !img) {
        alert("Please fill all fields!");
        return;
    }

    try {
        await addDoc(collection(db, "products"), {
            name,
            price,
            img
        });

        alert("Product Added!");
        loadProducts();

        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
        document.getElementById("img").value = "";

    } catch (error) {
        alert("Error adding product");
        console.log(error);
    }
});

// ============== Load Product List ==============
async function loadProducts() {
    let list = document.getElementById("productList");
    list.innerHTML = "Loading...";

    const querySnapshot = await getDocs(collection(db, "products"));

    list.innerHTML = "";

    querySnapshot.forEach((doc) => {
        let p = doc.data();
        list.innerHTML += `
            <div class="item">
                <img src="${p.img}" width="80">
                <h3>${p.name}</h3>
                <p>Price: ${p.price}</p>
            </div>
        `;
    });
}

loadProducts();