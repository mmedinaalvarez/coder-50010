const express = require("express");
const { ProductManager } = require("./ProductManager.js");

const app = express();
const productManager = new ProductManager("./ProductManager.json");
app.get("/products", async (req, res) => {
  try {
    let products = await productManager.getProducts();
    let limit;

    if (req.query.limit) {
      limit = Number(req.query.limit);
    } else {
      limit = undefined;
    }
    if (limit === undefined) {
      res.send(products);
    } else {
      res.send(products.slice(0, limit));
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const products = await productManager.getProducts();
    const product = products.find((product) => product.id === Number(pid));

    if (product) {
      res.send(product);
    } else {
      const mensaje = {
        mensagge: "No existe el producto solicitado",
      };

      res.send(mensaje);
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(8080, () => {
  console.log("escuchando el puerto 8080");
});
