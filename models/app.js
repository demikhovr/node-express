const uuid = require('uuid/v4');
const fs = require('fs');
const path = require('path');

class App {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.id = uuid();
  }

  toJSON() {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id,
    };
  }

  async save() {
    const apps = await App.getAll();
    apps.push(this.toJSON());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'apps.json'),
        JSON.stringify(apps),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'apps.json'),
        'utf-8',
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            const json = JSON.parse(content);
            resolve(json);
          }
        },
      );
    });
  }
}

module.exports = App;
