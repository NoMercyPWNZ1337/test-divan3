
// DOM елементи
const DOM = {
    wraperSearchForm: document.querySelector('#search'),
    showSearchFormBtn: document.querySelector('#search #search-trigger'),
    searchProductList: document.querySelector('#search #product-list'),
    searchAnalogList: document.querySelector('#search #analog-list'),
    searchForm: document.querySelector('#search #search-form'),
    searchBgForHideForm: document.querySelector('#search #search-bg'),
};

// Шаблон для відображення продуктів

const productTemplate = (product) => {
    // const replaceImg = product.image.replace('../assets', 'src/assets');
    
    return `
        <li>
            <a 
                class="
                    search-link
                    ${product.discountedPrice ? 'discounted' : ''}
                "
                href="../pages/product.html?productId=${product._id}"
            >
            <img src="${product.image}" alt="${product.name}">
                <span class="link-title">${product.name}</span>
                <span class="link-price">
                  <span>${product.price} грн</span>
                </span>
                ${
                    product.discountedPrice
                        ? `
                            <span class="link-price-discounted">
                                Ціна зі знижкою: 
                                <span>${product.discountedPrice} грн</span>
                            </span>
                        `
                        : ''
                }
            </a>
        </li>
    `;
}

// Функція для пошуку продуктів
const searchProduct = () => {
    const searchInput = DOM.searchForm.search;

    // Відкриття форми пошуку
    DOM.showSearchFormBtn.addEventListener('click', () => {
        document.body.style.overflow = 'hidden';
        DOM.wraperSearchForm.classList.add('active');
        searchInput.focus();
    });

    // Закриття форми пошуку
    DOM.searchBgForHideForm.addEventListener('click', () => {
        DOM.wraperSearchForm.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Обробка введення в поле пошуку
    searchInput.addEventListener('input', (e) => {
        const search = e.target.value.toLowerCase();

        if (search.length < 3) {
            DOM.searchProductList.innerHTML = '';
            DOM.searchAnalogList.innerHTML = '<h3>Нічого не знайдено</h3>';
            DOM.searchProductList.classList.remove('active');
            DOM.searchAnalogList.classList.remove('active');
            return;
        }

        // Пошук продуктів
        const foundProducts = CardsArray.filter(product => 
            product.name.toLowerCase().includes(search)
        );

        if (foundProducts.length) {
            const productListHtml = foundProducts.map(product => productTemplate(product)).join('');

            DOM.searchProductList.innerHTML = productListHtml;
            DOM.searchProductList.classList.add('active');
            DOM.searchAnalogList.classList.remove('active');
        } else {
            DOM.searchProductList.innerHTML = '<h3>Нічого не знайдено</h3>';
            DOM.searchProductList.classList.add('active');
            DOM.searchAnalogList.innerHTML = '';
            DOM.searchAnalogList.classList.remove('active');
        }
    });

    // Обробка відправки форми пошуку
    DOM.searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const search = e.target.search.value.toLowerCase();

        if (search.length >= 3) {
            // Можна додати функціонал для редиректу на іншу сторінку, якщо потрібно
            window.location.href = `/search-result/search=${search}`;
        }
    });
}

// Ініціалізація пошуку
searchProduct();
