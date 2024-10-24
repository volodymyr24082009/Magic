document.addEventListener('DOMContentLoaded', function () {
    loadProducts(); // Load products on the main page
    loadCartItems(); // Load items in the cart
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check credentials
    if (email === "24g_chvv@liceum.ztu.edu.ua" && password === "319560") {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        alert('Welcome to the admin panel!');
        loadExistingProducts(); // Load existing products
    } else {
        alert('Incorrect email or password!');
    }
});

// Load products on the main page
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = ''; // Clear container before adding products

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Ціна: ${product.price} грн</p>
            <button class="addToCartBtn">Купити</button>
        `;
        productContainer.appendChild(productDiv);
    });

    // Add products to the cart after loading
    document.querySelectorAll('.addToCartBtn').forEach(button => {
        button.addEventListener('click', function () {
            const productDiv = this.closest('.product');
            const name = productDiv.querySelector('h3').innerText;
            const price = productDiv.querySelector('p').innerText.replace('Ціна: ', '').replace(' грн', '');
            const image = productDiv.querySelector('img').src;

            addToCart({ name, price, image });
        });
    });
}

// Add item to the cart
function addToCart(product) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.push(product);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    alert('Товар додано до кошика!');
    loadCartItems(); // Update cart display
}

// Load items in the cart
function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    let totalPrice = 0;

    cartContainer.innerHTML = ''; // Clear previous content

    // If cart is empty, show a message
    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Ваш кошик порожній.</p>';
    } else {
        cartItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Ціна: ${item.price} грн</p>
            `;
            cartContainer.appendChild(itemDiv);
            totalPrice += parseFloat(item.price);
        });
    }

    totalPriceElement.innerText = totalPrice;

    // Show or hide the place order button based on cart items
    document.getElementById('placeOrderBtn').style.display = cartItems.length > 0 ? 'block' : 'none';
}

// Load existing products in the admin panel
function loadExistingProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const existingProductsDiv = document.getElementById('existingProducts');
    existingProductsDiv.innerHTML = ''; // Clear previous list

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

// Add new product via admin panel
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
            image: reader.result // Use data URL
        });
        localStorage.setItem('products', JSON.stringify(products));
        alert('Товар успішно додано!');
        document.getElementById('productForm').reset(); // Clear the form
        loadProducts(); // Update products on the main page
        loadExistingProducts(); // Update products in admin panel
    };
    reader.readAsDataURL(productImage);
});

// Delete product by index from admin panel
function deleteProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    // Remove product at the specified index
    products.splice(index, 1);
    
    // Update localStorage with the updated product list
    localStorage.setItem('products', JSON.stringify(products));
    
    alert('Товар видалено!');
    
    // Reload products on the main page and admin panel
    loadProducts();
    loadExistingProducts();
}

// Handle placing the order
document.getElementById('placeOrderBtn').addEventListener('click', function() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartItems.length === 0) {
        alert('Ваш кошик порожній! Додайте товари перед оформленням замовлення.');
        return;
    }

    // Optionally, you can clear the cart after the order is placed
    localStorage.removeItem('cart');
    alert('Дякуємо за замовлення! Ваше замовлення оформлено.');

    loadCartItems(); // Reload the cart to show that it's empty
});
document.getElementById('productForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').files[0];

    console.log('Product Name:', productName);
    console.log('Product Price:', productPrice);
    console.log('Product Image:', productImage);

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
        document.getElementById('productForm').reset();
        loadProducts();
        loadExistingProducts();
    };
    reader.readAsDataURL(productImage);
});
