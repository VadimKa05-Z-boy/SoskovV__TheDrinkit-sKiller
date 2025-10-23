document.addEventListener('DOMContentLoaded', function () {
  const menuData = {
    'milk-coffee': [
      { id: 'T001', name: 'Латте', price: 250, img: 'latte.jpg' },
      { id: 'T002', name: 'Капучино', price: 225, img: 'cappuccino.jpg' }
    ],
    'black-coffee': [
      { id: 'T003', name: 'Американо', price: 200, img: 'americano.jpg' }
    ],
    'filter': [
      { id: 'T004', name: 'Фильтр-кофе', price: 240, img: 'filter.jpg' }
    ],
    'ice-milk-coffee': [
      { id: 'T005', name: 'Айс Латте', price: 260, img: 'icelatte.jpg' }
    ],
    'matcha': [
      { id: 'T101', name: 'Матча', price: 280, img: 'matcha.jpg' }
    ],
    'tea': [
      { id: 'T102', name: 'Зелёный чай', price: 180, img: 'tea.jpg' }
    ],
    'juse': [
      { id: 'T103', name: 'Лимонад с мятой', price: 220, img: 'lemonade.jpg' }
    ],
    'dessert': [
      { id: 'T201', name: 'Чизкейк', price: 250, img: 'cheesecake.jpg' }
    ],
    'sendwich': [
      { id: 'T202', name: 'Клаб-сэндвич', price: 350, img: 'sandwich.jpg' }
    ]
  };

  // === Рендер товаров для категории ===
  function renderCategoryProducts(categoryKey) {
    const container = document.getElementById(`${categoryKey}-products`);
    if (!container) return;

    container.innerHTML = '';

    // Определяем, какие подкатегории есть в этой категории
    const subcategoriesMap = {
      coffee: ['milk-coffee', 'black-coffee', 'filter', 'author-filter', 'ice-milk-coffee', 'ice-black-coffee'],
      'non-coffee': ['matcha', 'ice-matcha', 'chokolate', 'juse', 'tea'],
      food: ['sendwich', 'salad', 'baking', 'dessert', 'topings'],
      rec: [] // для рекомендаций — отдельная логика
    };

    const subcategories = subcategoriesMap[categoryKey] || [];

    if (categoryKey === 'rec') {
      const img = document.createElement('img');
      img.src = './image/photo/loading/1.png';
      img.alt = 'Рекомендуемые товары';
      img.className = 'in-develop';
      img.loading = 'lazy';
      container.appendChild(img);
      return;
    }

    subcategories.forEach(subcat => {
      const products = menuData[subcat] || [];
      if (products.length === 0) return; // пропускаем пустые

      const section = document.createElement('section');
      section.id = subcat;
      section.className = 'product-section';

      const title = document.createElement('h3');
      title.textContent = getSubcategoryName(subcat); // функция ниже
      section.appendChild(title);

      const grid = document.createElement('div');
      grid.className = 'products-grid';
      grid.dataset.subcategory = subcat;

      products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="image/${product.img}" alt="${product.name}" onerror="this.src='image/placeholder.jpg'">
          <h4>${product.name}</h4>
          <div class="price">${product.price} ₽</div>
        `;
        card.onclick = () => {
          window.location.href = `product.html?id=${product.id}`;
        };
        grid.appendChild(card);
      });

      section.appendChild(grid);
      container.appendChild(section);
    });
  }

  function getSubcategoryName(key) {
    const names = {
      'milk-coffee': 'Кофе с молоком',
      'black-coffee': 'Чёрный кофе',
      'filter': 'Фильтр',
      'author-filter': 'Авторский фильтр',
      'ice-milk-coffee': 'Айс кофе с молоком',
      'ice-black-coffee': 'Айс чёрный кофе',
      'matcha': 'Матча',
      'ice-matcha': 'Айс Матча',
      'chokolate': 'Какао',
      'juse': 'Соки и лимонады',
      'tea': 'Чай',
      'sendwich': 'Сэндвичи',
      'salad': 'Салаты',
      'baking': 'Выпечка',
      'dessert': 'Сладкое',
      'topings': 'Топинги'
    };
    return names[key] || key;
  }

  // === Обработчики категорий ===
  const tabButtons = document.querySelectorAll('.tab');
  tabButtons.forEach(button => {
    button.addEventListener('click', function () {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Скрыть всё
      document.querySelectorAll('.submenu, .products-container').forEach(el => {
        el.classList.add('ghost');
      });

      const category = this.dataset.category;

      // Показать подменю
      if (category === 'coffee') {
        document.getElementById('coffee-submenu').classList.remove('ghost');
        document.getElementById('coffee-products').classList.remove('ghost');
        renderCategoryProducts('coffee');
      } else if (category === 'non-coffee') {
        document.getElementById('non-submenu').classList.remove('ghost');
        document.getElementById('non-coffee-products').classList.remove('ghost');
        renderCategoryProducts('non-coffee');
      } else if (category === 'food') {
        document.getElementById('food').classList.remove('ghost');
        document.getElementById('food-products').classList.remove('ghost');
        renderCategoryProducts('food');
      } else if (category === 'rec') {
        document.getElementById('for-you').classList.remove('ghost');
        document.getElementById('rec-products').classList.remove('ghost');
        renderCategoryProducts('rec');
      }
    });
  });

  // === Обработчики подкатегорий (скролл) ===
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('subtab')) {
      const subcat = e.target.dataset.subcategory;
      const targetSection = document.getElementById(subcat);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  // === По умолчанию: показать "Кофе" ===
  document.querySelector('.tab[data-category="coffee"]').click();
});