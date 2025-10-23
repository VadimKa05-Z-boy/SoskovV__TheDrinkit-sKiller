// === Данные о товарах ===
const products = {
  'T001': {
    name: 'Латте',
    price: 250,
    image: 'latte.jpg',
    description: 'Классический латте с молоком. Идеально подходит для утреннего старта.',
    ingredients: ['Эспрессо — 60 мл', 'Молоко — 200 мл'],
    allergens: 'Содержит молоко',
    options: {
      size: [
        { name: 'S', price: 0 },
        { name: 'M', price: 30 },
        { name: 'L', price: 50 }
      ],
      milk: [
        { name: 'Обычное', price: 0 },
        { name: 'Овсяное', price: 30 },
        { name: 'Миндальное', price: 40 }
      ],
      shot: [
        { name: 'Одинарный', price: 0 },
        { name: 'Двойной', price: 20 }
      ]
    },
    recommendations: ['T201', 'T202'] // Чизкейк, Круассан
  },
  'T002': {
    name: 'Капучино',
    price: 225,
    image: 'cappuccino.jpg',
    description: 'Нежный капучино с плотной пенкой.',
    ingredients: ['Эспрессо — 60 мл', 'Молоко — 180 мл'],
    allergens: 'Содержит молоко',
    options: {
      size: [{ name: 'S', price: 0 }, { name: 'M', price: 25 }, { name: 'L', price: 45 }],
      milk: [{ name: 'Обычное', price: 0 }, { name: 'Овсяное', price: 30 }],
      shot: [{ name: 'Одинарный', price: 0 }, { name: 'Двойной', price: 20 }]
    },
    recommendations: ['T201']
  },
  'T201': {
    name: 'Чизкейк',
    price: 250,
    image: 'cheesecake.jpg',
    description: 'Нежный чизкейк с ягодным соусом.',
    ingredients: ['Творожный сыр', 'Яйца', 'Сахар', 'Печенье'],
    allergens: 'Содержит молоко, яйца, глютен',
    options: {
      size: [{ name: 'Порция', price: 0 }],
      milk: [],
      shot: []
    },
    recommendations: ['T001']
  }
};

// === Глобальные переменные выбранных опций ===
let selectedOptions = {
  size: { name: '', price: 0 },
  milk: { name: '', price: 0 },
  shot: { name: '', price: 0 }
};

// === Функция: отобразить товар ===
function renderProduct(productId) {
  const product = products[productId];
  if (!product) {
    document.getElementById('product-name').textContent = 'Товар не найден';
    return;
  }

  // Заполнить данные
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-image').src = `image/${product.image}`;
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('product-allergens').textContent = product.allergens;

  // Состав
  const ingredientsList = document.getElementById('product-ingredients');
  ingredientsList.innerHTML = '';
  product.ingredients.forEach(ing => {
    const li = document.createElement('li');
    li.textContent = ing;
    ingredientsList.appendChild(li);
  });

  // Опции
  renderOptions('size', product.options.size, 'size-options');
  renderOptions('milk', product.options.milk, 'milk-options');
  renderOptions('shot', product.options.shot, 'shot-options');

  // Установить первые опции по умолчанию
  if (product.options.size.length > 0) {
    selectedOptions.size = product.options.size[0];
  }
  if (product.options.milk.length > 0) {
    selectedOptions.milk = product.options.milk[0];
  }
  if (product.options.shot.length > 0) {
    selectedOptions.shot = product.options.shot[0];
  }

  // Показать цену
  updateTotalPrice(product.price);

  // Рекомендации
  renderRecommendations(product.recommendations);
}

// === Функция: отобразить кнопки опций ===
function renderOptions(type, options, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = `${opt.name} ${opt.price > 0 ? `(+${opt.price} ₽)` : ''}`;
    btn.dataset.type = type;
    btn.dataset.price = opt.price;
    btn.dataset.name = opt.name;

    btn.addEventListener('click', () => {
      // Убрать active у всех
      container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Сохранить выбор
      selectedOptions[type] = { name: opt.name, price: opt.price };
      // Обновить цену
      const currentProduct = Object.values(products).find(p =>
        p.options[type] && p.options[type].some(o => o.name === opt.name)
      );
      if (currentProduct) {
        updateTotalPrice(currentProduct.price);
      }
    });

    // Первый — активный по умолчанию
    if (options.indexOf(opt) === 0) {
      btn.classList.add('active');
    }

    container.appendChild(btn);
  });
}

// === Функция: обновить итоговую цену ===
function updateTotalPrice(basePrice) {
  const total = basePrice +
    selectedOptions.size.price +
    selectedOptions.milk.price +
    selectedOptions.shot.price;
  document.getElementById('total-price').textContent = `${total} ₽`;
}

// === Функция: отобразить рекомендации ===
function renderRecommendations(ids) {
  const grid = document.getElementById('recommendations-grid');
  grid.innerHTML = '';

  ids.forEach(id => {
    const item = products[id];
    if (!item) return;

    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="image/${item.image}" alt="${item.name}" onerror="this.src='image/placeholder.jpg'">
      <h4>${item.name}</h4>
      <div class="price">${item.price} ₽</div>
    `;
    card.onclick = () => {
      window.location.href = `product.html?id=${id}`;
    };
    grid.appendChild(card);
  });
}

// === Обработчик кнопки "Добавить в заказ" ===
document.getElementById('add-to-cart').addEventListener('click', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const product = products[productId];

  if (!product) return;

  const orderItem = {
    id: productId,
    name: product.name,
    options: {
      size: selectedOptions.size.name,
      milk: selectedOptions.milk.name,
      shot: selectedOptions.shot.name
    },
    price: parseInt(document.getElementById('total-price').textContent)
  };

  // Сохранить в localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(orderItem);
  localStorage.setItem('cart', JSON.stringify(cart));

  alert(`✅ ${product.name} добавлен в заказ!`);
  window.location.href = 'cart.html';
});

// === Запуск при загрузке ===
document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'T001'; // по умолчанию — Латте
  renderProduct(productId);
});