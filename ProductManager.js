const { promises } = require("fs");
const fs = promises;

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.countId = 0;
  }

  //Metodo para agregar productos

  async addProducts(title, description, price, thumbnail, code, stock) {
    //Compruebo que se llenen todos los campos
    if (
      title === "" ||
      description === "" ||
      price === "" ||
      thumbnail === "" ||
      code === "" ||
      stock === ""
    ) {
      console.log("Todos los campos son obligatorios, llenelos.");
      return;
    }

    //Compruebo que no se repita el code

    const foundCode = this.products.find((product) => product.code === code);
    if (foundCode) {
      console.error("Ya existe un producto con ese code");
      return;
    }

    //Asigno nuevo id autoincremental
    const productId = this.countId++;

    const products = {
      id: productId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(products);

    try {
      const contentObj = JSON.stringify(this.products, null, 2);
      await fs.writeFile(path, contentObj, "utf-8");
    } catch (error) {
      console.log(error);
    }

    console.info("Se añadio el producto con exito");
  }

  //Metodo para obtener lista de productos
  async getProducts() {
    try {
      let dataJson;

      try {
        dataJson = await fs.readFile(path, "utf-8");
      } catch (error) {
        //si hay un error al leer el archivo crea el array vacio
        dataJson = "[]";
      }

      const productsArray = JSON.parse(dataJson);

      return productsArray;
    } catch (error) {
      console.error(error);
    }
    return [];
  }

  //Metodo para buscar productos por id
  async getProductById(id) {
    let dataJson;
    try {
      dataJson = await fs.readFile(path, "utf-8");
      console.log(dataJson);
      const products = JSON.parse(dataJson);

      const foundId = products.find((product) => product.id === id);
      if (!foundId) {
        console.log("Not found");
      } else {
        console.table(foundId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //metodo para actualizar un producto
  async updateProduct(id) {
    try {
      const dataJson = await fs.readFile(path);
      const dataObj = JSON.parse(dataJson);
      const foundId = dataObj.findIndex((product) => product.id === id);
      if (foundId === -1) {
        console.log(`No se encontro el ID ${id} para actualizar el producto`);
      } else {
        dataObj[id].title = "Producto Actualizado";
        const dataStr = JSON.stringify(dataObj, null, 2);
        await fs.writeFile(path, dataStr);
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Metodo para eliminar un producto
  async deleteProduct(id) {
    try {
      const dataJson = await fs.readFile(path);
      const dataObj = JSON.parse(dataJson);
      const foundId = dataObj.findIndex((product) => product.id === id);
      if (foundId === -1) {
        console.log(`No se encontró el ID ${id} para eliminar el producto`);
      } else {
        dataObj.splice(foundId, 1);
        const dataStr = JSON.stringify(dataObj, null, 2);
        await fs.writeFile(path, dataStr);
        console.log("product eliminado");
      }
    } catch (error) {}
  }
}
const path = "./ProductManager.json";
const productManager1 = new ProductManager(path);
main();
async function main() {
  console.log(await productManager1.getProducts());

  await productManager1.addProducts(
    "Producto prueba",
    "Este es un producto de prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
  console.log(await productManager1.getProducts());

  await productManager1.addProducts(
    "Producto prueba 2",
    "Este es un producto de prueba 2",
    300,
    "Sin imagen2",
    "abc456",
    26
  );
  await productManager1.addProducts(
    "Producto prueba 3",
    "Este es un producto de prueba 3",
    300,
    "Sin imagen3",
    "abc457",
    26
  );
  await productManager1.addProducts(
    "Producto prueba 4",
    "Este es un producto de prueba 4",
    300,
    "Sin imagen4",
    "abc458",
    26
  );

  await productManager1.getProductById(1);
  await productManager1.updateProduct(7);
  await productManager1.updateProduct(2);
  await productManager1.deleteProduct(1);
  await productManager1.deleteProduct(8);

  await productManager1.getProductById(2);
}
