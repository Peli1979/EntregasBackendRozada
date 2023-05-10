const express = require("express");
const ProductManager = require('./entrega2');
const alfombra = new ProductManager('products.json');

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
  const limit = req.query.limit;
  const products = await alfombra.getProducts();
  if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
  } else {
    res.json(products);
  }
});

app.get('/products/:pid', async (req, res) => {
  const pid = req.params.pid;
  const product = await alfombra.getProductById(pid);
  if (!product) {
    res.status(404).json('Product not found');
  } else {
    res.json(product);
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
