document.addEventListener('DOMContentLoaded', loadProducts); // Load products on page load

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if the provided credentials match
    if (email === "24g_chvv@liceum.ztu.edu.ua" && password === "319560") {
        // Hide the login form and show the admin panel
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        alert('Вітаємо в адміністративній панелі!');
        loadExistingProducts(); // Load existing products in admin panel
    } else {
        alert('Неправильний логін або пароль!');
    }
});

// Load products from local storage and display them on the main page
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = ''; // Clear the container before adding products
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Ціна: ${product.price} грн</p>
            <button>Купити</button>
        `;
        productContainer.appendChild(productDiv);
    });
}

// Load existing products in the admin panel
function loadExistingProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const existingProductsDiv = document.getElementById('existingProducts');
    existingProductsDiv.innerHTML = ''; // Clear the previous list
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('existing-product');
        productDiv.innerHTML = `
            <span>${product.name} - Ціна: ${product.price} грн</span>
            <button onclick="deleteProduct(${index})">Видалити</button>
        `;
        existingProductsDiv.appendChild(productDiv);
    });
}

// Product addition logic
document.getElementById('productForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').files[0];

    const reader = new FileReader();
    reader.onloadend = function () {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push({
            name: productName,
            price: productPrice,
            image: reader.result
        });
        localStorage.setItem('products', JSON.stringify(products));
        alert('Товар успішно додано!');
        document.getElementById('productForm').reset(); // Clear the form
        loadProducts(); // Refresh product display on the main page
        loadExistingProducts(); // Refresh existing products display in admin panel
    };
    reader.readAsDataURL(productImage);
});

// Function to delete a product
function deleteProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    if (index > -1 && index < products.length) {
        products.splice(index, 1); // Remove product from array
        localStorage.setItem('products', JSON.stringify(products)); // Update local storage
        loadProducts(); // Refresh product display on the main page
        loadExistingProducts(); // Refresh existing products display in admin panel
        alert('Товар успішно видалено!');
    } else {
        alert('Товар не знайдено!');
    }
}
