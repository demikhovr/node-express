const prices = document.querySelectorAll('.price');
prices.forEach((node) => {
  const price = new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency',
  }).format(node.textContent);

  node.textContent = price;
});
