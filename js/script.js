// --- Razorpay Configuration ---
const RAZORPAY_KEY_ID = "rzp_live_LIqOpioBHDIhG4"; // YOUR LIVE KEY

// --- State Management ---
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Page Routing Logic
    const path = window.location.pathname;
    if (path.includes('shop.html')) renderShop();
    if (path.includes('product.html')) renderSingleProduct();
    if (path.includes('cart.html')) renderCart();
    if (path.includes('index.html') || path === '/') renderFeatured();
});

// --- Shop Functionality ---
function renderShop() {
    const grid = document.getElementById('product-grid');
    const searchInput = document.getElementById('search-input');
    const catSelect = document.getElementById('category-select');

    function displayProducts(items) {
        grid.innerHTML = items.map(product => `
            <div class="product-card">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                </a>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">₹${product.price}</p>
                    <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `).join('');
    }

    displayProducts(products);

    // Filter Logic
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(term));
        displayProducts(filtered);
    });

    catSelect.addEventListener('change', (e) => {
        const cat = e.target.value;
        const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
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
                <p class="price">₹${product.price}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. High quality material.</p>
                <br>
                <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
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
        container.innerHTML = '<tr><td colspan="4">Your cart is empty.</td></tr>';
        totalEl.innerText = '0';
        return;
    }

    container.innerHTML = cart.map((item, index) => `
        <tr>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>
                <button onclick="changeQty(${index}, -1)">-</button>
                ${item.quantity}
                <button onclick="changeQty(${index}, 1)">+</button>
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
        "amount": total * 100, // Amount in paise (multiply by 100)
        "currency": "INR",
        "name": "My Store",
        "description": "Purchase Description",
        "handler": function (response){
            alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'index.html';
        },
        "prefill": {
            "name": "Customer Name",
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