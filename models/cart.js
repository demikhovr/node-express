const path = require('path');
const fs = require('fs');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json',
);

class Cart {
  static async add(app) {
    const cart = await Cart.fetch();

    const index = cart.apps.findIndex(it => it.id === app.id);
    const candidate = cart.apps[index];

    if (candidate) {
      candidate.count += 1;
      cart.apps[index] = candidate;
    } else {
      app.count = 1;
      cart.apps.push(app);
    }

    cart.price += Number(app.price);
    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static async remove(id) {
    const cart = await Cart.fetch();
    const index = cart.apps.findIndex(it => it.id === id);
    const app = cart.apps[index];

    if (app.count === 1) {
      cart.apps = cart.apps.filter(it => it.id !== id);
    } else {
      app.count -= 1;
    }

    cart.price -= app.price;
    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(cart);
        }
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, 'utf-8', (err, content) => {
        if (err) {
          reject(err);
        } else {
          const json = JSON.parse(content);
          resolve(json);
        }
      });
    });
  }
}

module.exports = Cart;
