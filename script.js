let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count on load
updateCartCount();

// If on cart page, render items
if (document.querySelector('.cart-items')) {
    renderCart();
}

function addToCart(title, price, image) {
    const product = {
        title: title,
        price: price,
        image: image,
        id: Date.now() // Simple unique ID
    };

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Feedback
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "AÑADIDO";
    btn.style.background = "#ccff00";
    btn.style.color = "black";

    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "";
        btn.style.color = "";
    }, 1000);
}

function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    countElements.forEach(el => el.innerText = cart.length);
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Tu cesta está vacía.</p>';
        subtotalEl.innerText = '€0.00';
        totalEl.innerText = '€0.00';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const price = parseFloat(item.price.replace('€', ''));
        total += price;

        const itemEl = document.createElement('div');
        itemEl.classList.add('cart-item');
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.title}</h3>
                <span class="cart-item-price">${item.price}</span>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    subtotalEl.innerText = '€' + total.toFixed(2);
    totalEl.innerText = '€' + total.toFixed(2);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        } else {
            // If on cart page and clicking a hash link (like #shop), go to index
            window.location.href = 'index.html' + targetId;
        }
    });
});
