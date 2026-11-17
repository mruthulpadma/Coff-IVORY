document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));

      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const prices = {
    'latte-quantity': 180,
    'bubble-quantity': 210,
    'mocha-quantity': 200,
    'cold-quantity': 170
  };
  const quantitySelectors = Object.keys(prices)
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const total = document.querySelector('.summary-total strong');
  const emptyOrder = document.querySelector('.empty-order');

  if (!total || !quantitySelectors.length) return;

  const updateOrderTotal = () => {
    const amount = quantitySelectors.reduce(
      (sum, selector) => sum + Number(selector.value) * prices[selector.id],
      0
    );

    total.textContent = `₹${amount}`;
    if (emptyOrder) emptyOrder.hidden = amount > 0;
  };

  quantitySelectors.forEach((selector) => {
    selector.addEventListener('change', updateOrderTotal);
  });

  updateOrderTotal();
});
