// Завантажити продукти з LocalStorage при завантаженні сторінки
window.onload = () => {
    loadProducts();
};

// Функція для завантаження продуктів з LocalStorage
function loadProducts() {
    const productContainer = document.querySelector('.product-container');
    const products = JSON.parse(localStorage.getItem('products')) || [];

    productContainer.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Ціна: ${product.price} грн</p>
            <img src="${product.image}" alt="${product.name}">
        `;
        productContainer.appendChild(productElement);
    });
}
