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

  static async update(app) {
    const apps = await App.getAll();
    const index = apps.findIndex(it => it.id === app.id);
    apps[index] = app;

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

  static async getById(id) {
    const apps = await App.getAll();
    return apps.find(it => it.id === id);
  }
}

module.exports = App;
