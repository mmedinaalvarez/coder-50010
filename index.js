class ProductManager {
    
    constructor(){
        this.products = [];
        this.countId = 0;
    }

   
    //Metodo para agregar productos

    addProducts(title, description,price,thumbnail,code,stock)
    {
        //Compruebo que se llenen todos los campos
        if(title === '' || description === '' || price ==='' || thumbnail === '' || code ==='' || stock === ''){
            console.log('Todos los campos son obligatorios, llenelos.')
            return
        }
        
        //Compruebo que no se repita el code

        const foundCode = this.products.find((product) => product.code === code)
        if(foundCode){
            console.error('Ya existe un producto con ese code')
            return
        }

        //Asigno nuevo id autoincremental
        const productId = this.countId++

        const products = 
        {
            id:productId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        
        this.products.push(products)
        
        console.info('Se añadio el producto con exito')
    }

     //Metodo para obtener lista de productos
     getProducts() 
     {
        return this.products;
     }

     //Metodo para buscar en el arreglo un producto por id
     getProductById(id){
        const foundId = this.products.find((product)=> product.id === id)
        if(!foundId)
        {
            console.log('Not found')
        }
        else{
            console.table(foundId)
        }
     }
 
}
// Creo una instancia de product manager
const productManager1 = new ProductManager()



// obtengo la lista vacia de product manager
console.log(productManager1.getProducts())

//llamo a la instancia addproducts
productManager1.addProducts("Producto prueba", "Este es un producto de prueba", 200, "Sin imagen", "abc123", 25)

//llamo nuevamente a getproducts para ver que se haya cargado correctamente
console.table(productManager1.getProducts())

//Vuelvo a colocar el mismo producto para mostrar el error que esta repetido
productManager1.addProducts("Producto prueba", "Este es un producto de prueba", 200, "Sin imagen", "abc123", 25)

//Agrego otro producto para mostrar que el id cambia y buscar por el getproductbyid
productManager1.addProducts("Producto prueba2", "Este es un producto de prueba2", 300, "Sin imagen2", "abc456", 26)

//Vuelvo a llamar para mostrar los productos
console.table(productManager1.getProducts())

//llamo al metodo getProductById para buscar por el codigo el producto, ejemplo de producto encontrado
productManager1.getProductById(1)

//llamo al metodo getProductById con un numero de id erroneo
productManager1.getProductById(3)