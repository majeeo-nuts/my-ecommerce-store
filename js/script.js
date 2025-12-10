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
    
    // Initialize Featured Section on Home Page (if exists)
    if (document.getElementById('featured-list')) {
        renderFeatured();
    }
});

// --- Shop Page Logic ---
function renderShop() {
    const grid = document.getElementById('product-grid');
    const searchInput = document.getElementById('search-input');
    const catSelect = document.getElementById('category-select');

    function displayProducts(items) {
        if (!grid) return; 
        
        if (items.length === 0) {
            grid.innerHTML = '<p style="text-align:center; width:100%; padding:20px;">No products found.</p>';
            return;
        }
        
        grid.innerHTML = items.map(product => `
            <div class="product-card">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" 
                         alt="${product.name}" 
                         class="product-image"
                         onerror="this.src='https://placehold.co/400x400?text=Image+Not+Found'">
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

    // Initial Load - Check if products data exists
    if(typeof products !== 'undefined') {
        displayProducts(products);
    } else {
        grid.innerHTML = '<p style="color:red; text-align:center;">Error: products.js not loaded correctly.</p>';
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

// --- Home Page Featured Logic ---
function renderFeatured() {
    const featuredContainer = document.getElementById('featured-list');
    if (!featuredContainer || typeof products === 'undefined') return;

    // slice(0, 8) gets the first 8 items from your list
    const featuredItems = products.slice(0, 8); 

    featuredContainer.innerHTML = featuredItems.map(product => `
        <div class="product-card">
            <a href="product.html?id=${product.id}">
                <img src="${product.image}" 
                     alt="${product.name}"
                     class="product-image"
                     style="height: 250px; object-fit: cover; width: 100%; border-radius: 8px;"
                     onerror="this.src='https://placehold.co/400x400?text=Image+Not+Found'">
            </a>
            <div class="product-info" style="padding: 10px;">
                <h3 style="font-size: 1rem; margin: 5px 0;">${product.name}</h3>
                <p style="color: #e91e63; font-weight: bold;">₹${product.price}</p>
            </div>
        </div>
    `).join('');
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

// --- Cart Page Rendering ---
function renderCart() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        container.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 20px;">Your cart is empty. <br><br> <a href="shop.html" style="color:#e91e63; text-decoration:none; font-weight:bold;">Shop Now</a></td></tr>';
        if(totalEl) totalEl.innerText = '0';
        return;
    }

    container.innerHTML = cart.map((item, index) => `
        <tr>
            <td>
                <div style="display:flex; align-items:center; gap:10px;">
                    <img src="${item.image}" 
                         style="width:50px; height:50px; object-fit:cover; border-radius:4px;"
                         onerror="this.src='https://placehold.co/50?text=x'">
                    ${item.name}
                </div>
            </td>
            <td>₹${item.price}</td>
            <td>
                <div style="display:flex; gap:10px; align-items:center;">
                    <button style="padding:2px 8px; cursor:pointer;" onclick="changeQty(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button style="padding:2px 8px; cursor:pointer;" onclick="changeQty(${index}, 1)">+</button>
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

// --- Single Product Page Logic ---
function renderSingleProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const product = products.find(p => p.id === id);
    
    if(product) {
        const detailContainer = document.getElementById('product-detail');
        // Clear previous content to avoid duplication
        detailContainer.innerHTML = ''; 
        
        detailContainer.innerHTML = `
            <div style="flex:1; max-width:500px;">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     style="width:100%; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1);"
                     onerror="this.src='https://placehold.co/500x500?text=Image+Not+Found'">
            </div>
            <div class="detail-text" style="flex:1; padding: 20px;">
                <h1 style="font-size:2rem; margin-bottom:10px;">${product.name}</h1>
                <p style="color:#666; margin-bottom:20px;">Category: <span style="background:#eee; padding:2px 8px; border-radius:4px;">${product.category}</span></p>
                <h2 style="color:#e91e63; font-size:1.8rem; margin-bottom:20px;">₹${product.price}</h2>
                
                <p style="margin-bottom:20px; line-height:1.6;">
                    Experience luxury with our ${product.name}. Crafted for quality and style, this item from our ${product.category} collection is the perfect addition to your lifestyle.
                </p>

                <div class="card-actions" style="justify-content:flex-start; gap: 20px; margin-bottom:30px;">
                     <div class="qty-selector">
                        <button class="qty-btn" onclick="updateCardQty(${product.id}, -1)">-</button>
                        <input id="qty-${product.id}" class="qty-input" value="1" readonly>
                        <button class="qty-btn" onclick="updateCardQty(${product.id}, 1)">+</button>
                    </div>
                </div>
                <button class="btn" style="background:#333; color:white; padding:12px 30px; border:none; border-radius:5px; cursor:pointer; font-size:1rem;" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    } else {
        document.getElementById('product-detail').innerHTML = '<p>Product not found.</p>';
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
        "name": "MajeeoNuts Store",
        "description": "Payment for Order",
        "handler": function (response){
            alert("Payment Successful! Ref: " + response.razorpay_payment_id);
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'index.html';
        },
        "theme": { "color": "#e91e63" }
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
}