// Зміна видимості бокової панелі
document.getElementById('toggleSidebar').addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
});

// Додавання нового продукту
document.getElementById('addProduct').addEventListener('click', () => {
    document.getElementById('productForm').style.display = 'block';
});

// Обробка форми
document.getElementById('productFormElement').addEventListener('submit', function (event) {
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
            image: reader.result // Використання базового64 зображення
        });
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
        document.getElementById('productForm').style.display = 'none'; // Сховати форму
        this.reset(); // Очистити форму
    };
    reader.readAsDataURL(productImage); // Читати зображення як базове64
});

// Функція для завантаження продуктів з LocalStorage
function loadProducts() {
    const productList = document.querySelector('.product-list');
    const products = JSON.parse(localStorage.getItem('products')) || [];

    productList.innerHTML = '';
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>Ціна: ${product.price} грн</p>
            <img src="${product.image}" alt="${product.name}" style="width: 100px;">
        `;
        productList.appendChild(productItem);
    });
}

// Завантажити продукти при завантаженні сторінки
window.onload = loadProducts;
