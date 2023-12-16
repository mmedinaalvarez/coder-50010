const { promises } = require("fs");

const fs = promises;

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.countId = 0;
  }

  //Metodo para agregar productos

  async addProduct(productData) {
    const { title, description, price, thumbnail, code, stock } = productData;

    //Compruebo que se llenen todos los campos
    if (
      productData.title === "" ||
      productData.description === "" ||
      productData.price === "" ||
      productData.thumbnail === "" ||
      productData.code === "" ||
      productData.stock === ""
    ) {
      console.log("Todos los campos son obligatorios, llenelos.");
      return;
    }

    //Compruebo que no se repita el code

    const foundCode = this.products.find(
      (product) => product.code === productData.code
    );
    if (foundCode) {
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
      // console.log(dataJson);
      const products = JSON.parse(dataJson);

      const foundId = products.find((product) => product.id === id);
      if (!foundId) {
        // console.log("Not found");
      } else {
        // console.table(foundId);
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
        // console.log(`No se encontró el ID ${id} para eliminar el producto`);
      } else {
        dataObj.splice(foundId, 1);
        const dataStr = JSON.stringify(dataObj, null, 2);
        await fs.writeFile(path, dataStr);
        // console.log("product eliminado");
      }
    } catch (error) {}
  }
}
const path = "./ProductManager.json";
const productManager1 = new ProductManager(path);
main();
async function main() {
  // console.log(await productManager1.getProducts());

  await productManager1.addProduct({
    title: "Producto prueba",
    description: "Este es un producto de prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });
  // console.log(await productManager1.getProducts());

  await productManager1.addProduct({
    title: "Producto prueba 2",
    description: "Este es un producto de prueba 2",
    price: 300,
    thumbnail: "Sin imagen2",
    code: "abc456",
    stock: 26,
  });
  await productManager1.addProduct({
    title: "Producto prueba 3",
    description: "Este es un producto de prueba 3",
    price: 300,
    thumbnail: "Sin imagen3",
    code: "abc457",
    stock: 26,
  });
  await productManager1.addProduct({
    title: "Producto prueba 4",
    description: "Este es un producto de prueba 4",
    price: 300,
    thumbnail: "Sin imagen4",
    code: "abc328",
    stock: 26,
  });

  await productManager1.addProduct({
    title: "Producto prueba 5",
    description: "Este es un producto de prueba 5",
    price: 300,
    thumbnail: "Sin imagen5",
    code: "abc408",
    stock: 26,
  });
  await productManager1.addProduct({
    title: "Producto prueba 6",
    description: "Este es un producto de prueba 6",
    price: 300,
    thumbnail: "Sin imagen6",
    code: "abc4108",
    stock: 26,
  });
  await productManager1.addProduct({
    title: "Producto prueba 7",
    description: "Este es un producto de prueba 7",
    price: 300,
    thumbnail: "Sin imagen7",
    code: "abc108",
    stock: 26,
  });
  await productManager1.addProduct({
    title: "Producto prueba 8",
    description: "Este es un producto de prueba 8",
    price: 300,
    thumbnail: "Sin imagen8",
    code: "abc428",
    stock: 26,
  });
  await productManager1.addProduct({
    title: "Producto prueba 9",
    description: "Este es un producto de prueba 9",
    price: 300,
    thumbnail: "Sin imagen9",
    code: "abc438",
    stock: 26,
  });
  await productManager1.addProduct({
    title: "Producto prueba 10",
    description: "Este es un producto de prueba 10",
    price: 300,
    thumbnail: "Sin imagen10",
    code: "def14",
    stock: 26,
  });
  await productManager1.addProduct({
    title: "Producto prueba 11",
    description: "Este es un producto de prueba 11",
    price: 300,
    thumbnail: "Sin imagen11",
    code: "def13",
    stock: 26,
  });
  await productManager1.addProduct({
    title: "Producto prueba 12",
    description: "Este es un producto de prueba 12",
    price: 300,
    thumbnail: "Sin imagen12",
    code: "def12",
    stock: 26,
  });

  await productManager1.getProductById(1);
  await productManager1.getProducts();
  await productManager1.updateProduct(7);
  await productManager1.updateProduct(2);
  await productManager1.deleteProduct(1);
  await productManager1.deleteProduct(8);

  await productManager1.getProductById(2);
}

module.exports = { ProductManager };
