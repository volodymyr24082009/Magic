// Завантаження продуктів з JSON файлу
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('.product-container');
        data.products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Ціна: $${product.price}</p>
            `;
            container.appendChild(productDiv);
        });
    })
    .catch(error => console.error('Error loading products:', error));
