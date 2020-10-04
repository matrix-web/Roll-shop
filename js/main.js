import Products from "./products/model.js"
import productsController from "./products/controller.js"
import cartController from "./cart/controller.js"

// Получение всех продуктов
const products = new Products()

products.get('database/database.json', data => {
    productsController(data)
    cartController(data)
})



