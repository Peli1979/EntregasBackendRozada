const fs = require('fs');


class ProductManager {


  constructor(path) {
    this.path = path;
    this.products = this.loadProducts();
  }

  #generateId() {
    let maxId = 0;
    for (let i = 0; i < this.products.length; i++) {
      const prod = this.products[i];
      if (prod.id > maxId) {
        maxId = prod.id;
      }
    }
    return ++maxId;
  }

  loadProducts() {
    try {
      const productString = fs.readFileSync(this.path, 'utf8');
      const prod = JSON.parse(productString)
      return prod
    } catch (err) {
      console.error(`Error reading file ${this.path}: ${err}`);
      return [];
    }
  }

  saveProducts() {
    try {
      const prodString = JSON.stringify(this.products);
      fs.writeFileSync(this.path, prodString);
    } catch (err) {
      console.error(`Error writing file ${this.path}: ${err}`);
    }
  }

  getProducts() {
    this.loadProducts();
    return this.products}

  getProductById(id) {
    this.loadProducts();
    const encontrado = this.products.find((prod) => prod.id == id);
    if (encontrado) {
      return encontrado;
    } else {
      console.error("Product not found");
    }
  }

  addProduct(product) {
    this.loadProducts();
    const { title, description, price, thumbnail, code, stock } = product;
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("All fields are required");
      return;
    }

    if (this.products.some((p) => p.code === code)) {
      console.log("Code already exists, please choose another one");
      return;
    }

    const newProduct = {
      ...product,
      id: this.#generateId(),
    };

    this.products.push(newProduct);
    this.saveProducts();
  }

  updateProduct(id, newProduct) {
    this.loadProducts();
    const index = this.products.findIndex((prod) => prod.id == id);
    if (index !== -1) {
      this.products[index] = {...this.products[index], ...newProduct};
      this.saveProducts();
    } else {
      console.error("Product not found");
    }
  }

  deleteProduct(id) {
    this.loadProducts()
    const index = this.products.findIndex((prod) => prod.id == id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
    } else {
      console.error("Product not found");
    }
  }
}

const alfombra = new ProductManager('products.json');

/*alfombra.addProduct({
  title: 'Product 1',
  description: 'Description 1',
  price: 1000,
  thumbnail: 'path/to/thumbnail/1',
  code: 'P1',
  stock: 100,
});

alfombra.addProduct({
  title: 'Product 2',
  description: 'Description 2',
  price: 20,
  thumbnail: 'path/to/thumbnail/2',
  code: 'P2',
  stock: 50,
})*/

/*alfombra.updateProduct(2, {
  title: 'New Product 1',
  description: 'New Description 1',
  price: 500000,
  thumbnail: 'path/to/new/thumbnail/1',
  code: 'NP1',
  stock: 80,
});*/



//alfombra.deleteProduct(2);

//console.log(alfombra.getProductById(1))
//console.log(alfombra.getProducts())
//console.log(alfombra.getProductById(3))
