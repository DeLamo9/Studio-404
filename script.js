let cartCount = 0;

function addToCart() {
    cartCount++;
    document.querySelector('.cart-count').innerText = cartCount;

    // Simple animation feedback
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

function toggleCart() {
    alert("¡Próximamente! Artículos en el carrito: " + cartCount);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
