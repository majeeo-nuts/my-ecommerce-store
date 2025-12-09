// --- Razorpay Configuration ---
const RAZORPAY_KEY_ID = "rzp_live_LIqOpioBHDIhG4"; 

// --- State Management ---
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("App Initialized");
    updateCartCount();
    
    // Inject Toast Container if not exists
    if (!document.getElementById('toast-box')) {
        const toastDiv = document.createElement('div');
        toastDiv.id = 'toast-box';
        toastDiv.className = 'toast';
        document.body.appendChild(toastDiv);
    }

    // Determine which page we are on based on elements present
    if (document.getElementById('product-grid')) {
        renderShop();
    } 
    else if (document.getElementById('product-detail')) {
        renderSingleProduct();
    } 
    else if (document.getElementById('cart-items')) {
        renderCart();
    }
});

// --- Shop Page Logic ---
function renderShop() {
    const grid = document.getElementById('product-grid');
    const searchInput = document.getElementById('search-input');
    const catSelect = document.getElementById('category-select');

    function displayProducts(items) {
        if (!grid) return; // Safety check
        
        if (items.length === 0) {
            grid.innerHTML = '<p style="text-align:center; width:100%;">No products found.</p>';
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
                    <div style="margin-top:auto">
                        <p class="price" style="margin-bottom:10px;">₹${product.price}</p>
                        
                        <div class="card-actions">
                            <div class="qty-selector">
                                <button class="qty-btn" onclick="updateCardQty(${product.id}, -1)">-</button>
                                <input id="qty-${product.id}" class="qty-input" value="1" readonly>
                                <button class="qty-btn" onclick="updateCardQty(${product.id}, 1)">+</button>
                            </div>
                            <button class="add-btn" onclick="addToCart(${product.id})">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Initial Load
    if(typeof products !== 'undefined') {
        displayProducts(products);
    } else {
        grid.innerHTML = '<p>Error: Product data not loaded.</p>';
    }

    // Search Listener
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = products.filter(p => p.name.toLowerCase().includes(term));
            displayProducts(filtered);
        });
    }

    // Category Listener
    if(catSelect) {
        catSelect.addEventListener('change', (e) => {
            const cat = e.target.value;
            const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
            displayProducts(filtered);
        });
    }
}

// --- Card Quantity Logic ---
function updateCardQty(id, change) {
    const input = document.getElementById(`qty-${id}`);
    if(!input) return;
    let val = parseInt(input.value);
    val += change;
    if (val < 1) val = 1;
    if (val > 20) val = 20;
    input.value = val;
}

// --- Cart Logic ---
function addToCart(id) {
    const product = products.find(p => p.id === id);
    
    // Check if adding from Shop Page (with qty selector) or Single Page
    let quantity = 1;
    const qtyInput = document.getElementById(`qty-${id}`);
    if (qtyInput) {
        quantity = parseInt(qtyInput.value);
    }

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ ...product, quantity: quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`Added ${quantity}x ${product.name} to Cart`);
}

function showToast(message) {
    const toast = document.getElementById('toast-box');
    if(!toast) return;
    toast.innerText = "✅ " + message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
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
        if(totalEl) totalEl.innerText = '0';
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
    if(totalEl) totalEl.innerText = total;
}

function changeQty(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function renderSingleProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const product = products.find(p => p.id === id);
    if(product) {
        const detailContainer = document.getElementById('product-detail');
        detailContainer.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="detail-text">
                <h1>${product.name}</h1>
                <p>Category: ${product.category}</p>
                <h2 style="color:#e67e22">₹${product.price}</h2>
                <br>
                <div class="card-actions" style="justify-content:flex-start; margin-bottom:20px;">
                     <div class="qty-selector">
                        <button class="qty-btn" onclick="updateCardQty(${product.id}, -1)">-</button>
                        <input id="qty-${product.id}" class="qty-input" value="1" readonly>
                        <button class="qty-btn" onclick="updateCardQty(${product.id}, 1)">+</button>
                    </div>
                </div>
                <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    }
}

// --- Razorpay Payment Integration ---
function checkout() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if(total === 0) return alert("Cart is empty");

    const options = {
        "key": RAZORPAY_KEY_ID, 
        "amount": total * 100, 
        "currency": "INR",
        "name": "Luxe Store",
        "description": "Payment",
        "handler": function (response){
            alert("Payment Successful! Ref: " + response.razorpay_payment_id);
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'index.html';
        },
        "theme": { "color": "#e67e22" }
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
}