const toCurrency = price => new Intl.NumberFormat('ru-RU', {
  currency: 'rub',
  style: 'currency',
}).format(price);

const prices = document.querySelectorAll('.price');
prices.forEach((node) => {
  node.textContent = toCurrency(node.textContent);
});

const $cart = document.querySelector('.cart');

if ($cart) {
  $cart.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('js-remove')) {
      const { id } = evt.target.dataset;

      fetch(`/cart/remove/${id}`, {
        method: 'delete',
      })
        .then(res => res.json())
        .then((cart) => {
          if (cart.apps.length) {
            $cart.querySelector('tbody').innerHTML = cart.apps.map(it => (`
              <tr>
                <td>${it.title}</td>
                <td>${it.count}</td>
                <td>
                  <button class="btn btn-small js-remove" type="button" data-id="${it.id}">Delete</button>
                </td>
              </tr>`)).join('');
            $cart.querySelector('.price').textContent = toCurrency(cart.price);
          } else {
            $cart.innerHTML = '<p>Cart is empty</p>';
          }
        })
    }
  });
}
