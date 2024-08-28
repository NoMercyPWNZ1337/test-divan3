const productsContainer = document.getElementById('products');
const filtersForm = document.getElementById('catalog-filters');
const minPriceInput = document.getElementById('min');
const maxPriceInput = document.getElementById('max');
const categoryFilters = document.querySelectorAll('.category-filter');
const subcategoryFilters = document.querySelectorAll('.subcategory-filter');

function displayProducts(cards) {
    productsContainer.innerHTML = '';
    cards.forEach(card => {
        const productHTML = `
            <article class="product-card">
                <a href="../pages/product.html?productId=${card._id}" class="card-image-a">
                <img class="card-image" src="${card.image}" alt="product image"  /></a>
                <h3 class="card-title">
                    <a href="../pages/product.html?productId=${card._id}">${card.name}</a>
                </h3>
                <p class="card-price">
                    <span>
                        <span class="price">${card.price}</span>
                        грн
                    </span>
                </p>
            </article>
        `;
        productsContainer.insertAdjacentHTML('beforeend', productHTML);
    });
}

function filterProducts() {
    const minPrice = parseInt(minPriceInput.value, 10);
    const maxPrice = parseInt(maxPriceInput.value, 10);

    // Фільтруємо товари за ціною
    let filteredCards = CardsArray.filter(card => {
        const price = card.discountedPrice || card.price;
        return (isNaN(minPrice) || price >= minPrice) && (isNaN(maxPrice) || price <= maxPrice);
    });

    // Фільтруємо товари за категоріями (categoryId)
    const activeCategoryFilters = Array.from(categoryFilters)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.dataset.category);

    if (activeCategoryFilters.length > 0) {
        filteredCards = filteredCards.filter(card =>
            activeCategoryFilters.includes(card.categoryId)
        );
    }

    // Фільтруємо товари за підкатегоріями (underCategoryId)
    const activeSubcategoryFilters = Array.from(subcategoryFilters)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.dataset.underCategory);

    if (activeSubcategoryFilters.length > 0) {
        filteredCards = filteredCards.filter(card =>
            activeSubcategoryFilters.includes(card.underCategoryId)
        );
    }

    // Відображаємо відфільтровані товари
    displayProducts(filteredCards);
}

// Обробка подій input для фільтрації в реальному часі
function handleFilterInput() {
    filterProducts();
}

// Додаємо обробники подій на всі чекбокси та поля вводу цін
minPriceInput.addEventListener('input', handleFilterInput);
maxPriceInput.addEventListener('input', handleFilterInput);
categoryFilters.forEach(checkbox => checkbox.addEventListener('change', handleFilterInput));
subcategoryFilters.forEach(checkbox => checkbox.addEventListener('change', handleFilterInput));

// Початкове відображення всіх продуктів
displayProducts(CardsArray);

// Функція для фільтрації продуктів за категорією або підкатегорією з URL
function CategoryProducts(categoryId, underCategoryId) {
    let CategoryCards = CardsArray;

    if (categoryId) {
        CategoryCards = CategoryCards.filter(card => card.categoryId === categoryId);
    }
    if (underCategoryId) {
        CategoryCards = CategoryCards.filter(card => card.underCategoryId === underCategoryId);
    }

    displayProducts(CategoryCards);
}

// Отримання параметрів з URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
const subcategory = urlParams.get('subcategory');

// Фільтрація та відображення продуктів за категорією та підкатегорією
CategoryProducts(category, subcategory);