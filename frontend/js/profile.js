// js/profile.js
document.addEventListener('DOMContentLoaded', () => {
  // Загрузка данных профиля
  document.getElementById('display-name').textContent = localStorage.getItem('name') || '—';
  document.getElementById('display-email').textContent = localStorage.getItem('mail') || '—';
  document.getElementById('display-tel').textContent = localStorage.getItem('tel') || '—';

  // Загрузка истории заказов
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const list = document.getElementById('orders-list');
  
  if (orders.length === 0) {
    list.innerHTML = '<p>Нет заказов</p>';
  } else {
    orders.forEach(order => {
      const div = document.createElement('div');
      div.className = 'order-item';
      div.innerHTML = `
        <p><strong>Заказ #${order.id}</strong> от ${order.date}</p>
        <p>Итого: ${order.total}</p>
      `;
      list.appendChild(div);
    });
  }
});