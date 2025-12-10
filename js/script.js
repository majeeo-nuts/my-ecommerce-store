const RAZORPAY_KEY_ID = "rzp_live_LIqOpioBHDIhG4"; 
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    if (!document.getElementById('toast-box')) {
        const toastDiv = document.createElement('div');
        toastDiv.id = 'toast-box';
        toastDiv.className = 'toast';
        document.body.appendChild(toastDiv);
    }
    if (document.getElementById('product-grid')) renderShop();
    else if (document.getElementById('product-detail')) renderSingleProduct();
    else if (document.getElementById('cart-items')) renderCart();
    if (document.getElementById('featured-list')) renderFeatured();
});

function renderShop() {
    const grid = document.getElementById('product-grid');
    const searchInput = document.getElementById('search-input');
    const catSelect = document.getElementById('category-select');

    function displayProducts(items) {
        if (!grid) return; 
        if (items.length === 0) { grid.innerHTML = '<p style="text-align:center;width:100%;">No products found.</p>'; return; }
        
        grid.innerHTML = items.map(product => `
            <div class="product-card">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://placehold.co/400?text=Image+Missing'">
                </a>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="category" style="font-size:0.8rem;color:#777;">${product.category}</p>
                    <div style="margin-top:auto">
                        <p class="price">₹${product.price}</p>
                        <div class="card-actions">
                            <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    if(typeof products !== 'undefined') displayProducts(products);
    
    if(searchInput) searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        displayProducts(products.filter(p => p.name.toLowerCase().includes(term)));
    });
    if(catSelect) catSelect.addEventListener('change', (e) => {
        const cat = e.target.value;
        displayProducts(cat === 'all' ? products : products.filter(p => p.category === cat));
    });
}

function renderFeatured() {
    const featuredContainer = document.getElementById('featured-list');
    if (!featuredContainer || typeof products === 'undefined') return;
    const featuredItems = products.slice(0, 8); 
    featuredContainer.innerHTML = featuredItems.map(product => `
        <div class="product-card">
            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image" style="height:250px;width:100%;object-fit:cover;" onerror="this.src='https://placehold.co/400?text=Image+Missing'">
            </a>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p style="color:#000;font-weight:bold;">₹${product.price}</p>
            </div>
        </div>
    `).join('');
}

function updateCardQty(id, change) {
    const input = document.getElementById(`qty-${id}`);
    if(!input) return;
    let val = parseInt(input.value) + change;
    if (val < 1) val = 1;
    input.value = val;
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    let quantity = 1;
    const qtyInput = document.getElementById(`qty-${id}`);
    if (qtyInput) quantity = parseInt(qtyInput.value);

    const existing = cart.find(item => item.id === id);
    if (existing) existing.quantity += quantity;
    else cart.push({ ...product, quantity: quantity });

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`Added ${quantity}x ${product.name} to Cart`);
}

function showToast(message) {
    const toast = document.getElementById('toast-box');
    if(!toast) return;
    toast.innerText = "✅ " + message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
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
        container.innerHTML = '<tr><td colspan="4" style="text-align:center;">Your bag is empty. <a href="shop.html">Shop Now</a></td></tr>';
        if(totalEl) totalEl.innerText = '0';
        return;
    }

    container.innerHTML = cart.map((item, index) => `
        <tr>
            <td><div style="display:flex;align-items:center;gap:10px;"><img src="${item.image}" style="width:50px;height:50px;object-fit:cover;border-radius:4px;">${item.name}</div></td>
            <td>₹${item.price}</td>
            <td><div style="display:flex;gap:10px;"><button onclick="changeQty(${index}, -1)">-</button>${item.quantity}<button onclick="changeQty(${index}, 1)">+</button></div></td>
            <td>₹${item.price * item.quantity}</td>
        </tr>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if(totalEl) totalEl.innerText = total;
    const subDisplay = document.getElementById('subtotal-display');
    if(subDisplay) subDisplay.innerText = total;
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
            <div style="flex:1;"><img src="${product.image}" style="width:100%;border-radius:4px;" onerror="this.src='https://placehold.co/500?text=Image+Missing'"></div>
            <div class="detail-text" style="flex:1;">
                <h1>${product.name}</h1>
                <p>Category: ${product.category}</p>
                <h2>₹${product.price}</h2>
                <div style="margin:20px 0;"><div class="qty-selector"><button onclick="updateCardQty(${product.id}, -1)">-</button><input id="qty-${product.id}" class="qty-input" value="1" readonly><button onclick="updateCardQty(${product.id}, 1)">+</button></div></div>
                <button class="btn" style="background:#000;color:#fff;padding:15px 40px;" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    }
}

function checkout() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if(total === 0) return alert("Cart is empty");
    const options = {
        "key": RAZORPAY_KEY_ID, 
        "amount": total * 100, 
        "currency": "INR",
        "name": "GAMACOSMETICOS",
        "handler": function (response){
            alert("Order Confirmed! Ref: " + response.razorpay_payment_id);
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'index.html';
        },
        "theme": { "color": "#000" }
    };
    new Razorpay(options).open();
}