// --- Razorpay Configuration ---
const RAZORPAY_KEY_ID = "rzp_live_LIqOpioBHDIhG4"; // Your Live Key

// --- State Management ---
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("Website Loaded"); // Debugging check
    updateCartCount();
    
    // Improved Routing: Check which element exists on the page
    if (document.getElementById('product-grid')) {
        renderShop();
    } 
    else if (document.getElementById('product-detail')) {
        renderSingleProduct();
    } 
    else if (document.getElementById('cart-items')) {
        renderCart();
    }
    // Note: Homepage doesn't need specific JS rendering for this setup
});

// --- Shop Functionality ---
function renderShop() {
    console.log("Rendering Shop...");
    const grid = document.getElementById('product-grid');
    const searchInput = document.getElementById('search-input');
    const catSelect = document.getElementById('category-select');

    // Function to draw the cards
    function displayProducts(items) {
        if (items.length === 0) {
            grid.innerHTML = '<p>No products found.</p>';
            return;
        }
        
        grid.innerHTML = items.map(product => `
            <div class="product-card">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                </a>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="category" style="font-size:0.8rem; color:#777;">${product.category}</p>
                    <p class="price">₹${product.price}</p>
                    <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `).join('');
    }

    // Initial Render
    displayProducts(products);

    // Search Filter
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(term));
        displayProducts(filtered);
    });

    // Category Filter
    catSelect.addEventListener('change', (e) => {
        const cat = e.target.value;
        const filtered = cat === 'all' 
            ? products 
            : products.filter(p => p.category === cat);
        displayProducts(filtered);
    });
}

// --- Single Product Functionality ---
function renderSingleProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const product = products.find(p => p.id === id);

    if (product) {
        document.getElementById('product-detail').innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="detail-text">
                <h1>${product.name}</h1>
                <p class="category">Category: ${product.category}</p>
                <p class="price" style="font-size: 2rem; color: #e67e22;">₹${product.price}</p>
                <p>Experience premium quality with our ${product.name}. Perfect for any occasion and crafted with care.</p>
                <br>
                <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    } else {
        document.getElementById('product-detail').innerHTML = '<p>Product not found.</p>';
    }
}

// --- Cart Functionality ---
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if(badge) badge.innerText = count;
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        container.innerHTML = '<tr><td colspan="4" style="text-align:center;">Your cart is empty. <a href="shop.html">Shop Now</a></td></tr>';
        totalEl.innerText = '0';
        return;
    }

    container.innerHTML = cart.map((item, index) => `
        <tr>
            <td>
                <div style="display:flex; align-items:center; gap:10px;">
                    <img src="${item.image}" style="width:50px; height:50px; object-fit:cover; border-radius:4px;">
                    ${item.name}
                </div>
            </td>
            <td>₹${item.price}</td>
            <td>
                <div style="display:flex; gap:10px; align-items:center;">
                    <button style="padding:2px 8px;" onclick="changeQty(${index}, -1)">-</button>
                    ${item.quantity}
                    <button style="padding:2px 8px;" onclick="changeQty(${index}, 1)">+</button>
                </div>
            </td>
            <td>₹${item.price * item.quantity}</td>
        </tr>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalEl.innerText = total;
}

function changeQty(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// --- Razorpay Payment Integration ---
function checkout() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if(total === 0) return alert("Cart is empty");

    const options = {
        "key": RAZORPAY_KEY_ID, 
        "amount": total * 100, // Amount in paise
        "currency": "INR",
        "name": "Luxe Store",
        "description": "Payment for order",
        "handler": function (response){
            alert("Payment Successful! Ref: " + response.razorpay_payment_id);
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'index.html';
        },
        "prefill": {
            "name": "Valued Customer",
            "email": "customer@example.com",
            "contact": "9999999999"
        },
        "theme": {
            "color": "#e67e22"
        }
    };
    
    const rzp1 = new Razorpay(options);
    rzp1.open();
}