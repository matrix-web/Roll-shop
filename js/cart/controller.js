import Cart from "./model.js"
import * as view from "./view.js"

export default function (data) {
    const cart = new Cart()
    const cardBody = document.querySelector("[data-cart-box]")

    const calculateTotalPrice = products => {
        let totalPrice = 0
        for (const product of products) {
            totalPrice += product.numberOrders * product.price
        }

        return totalPrice
    }

    let totalPrice = calculateTotalPrice(cart.cartData)
    if (cart.cartData.length) {
        view.renderCart(cart.cartData, totalPrice)
    } else {
        view.rendermessageBox()
    }

    cardBody.addEventListener("click", event => {
        const target = event.target
        
        if (target.dataset.action === "delete") {
            const id = parseInt(target.closest(".cart-item").dataset.id)
            const isDelete = cart.remove(id)

            if (isDelete) {
                view.renderCart(cart.cartData)
            }

            if (!cart.cartData.length) {
                view.rendermessageBox()
            }
        }

        const cartItem = event.target.closest('.cart-item')
        
        if (cartItem) {
            const counter = cartItem.querySelector('[data-counter]')
            let counterValue = parseInt(counter.value)
    
            if (event.target.dataset.action === "minus") {
                if (counterValue > 1) {
                    counterValue--
                    counter.value = counterValue
                }
            } else if (event.target.dataset.action === "plus") {
                counterValue++
                counter.value = counterValue
            }

            const id = parseInt(cartItem.dataset.id)
            const product = cart.get(id)

            if (product){
                product.numberOrders = counterValue
                totalPrice = calculateTotalPrice(cart.cartData)
                cart.add(product)
                view.renderCart(cart.cartData, totalPrice)
            }
        }
    })

    document.body.addEventListener("click", event => {
        const target = event.target

        if (target.hasAttribute("data-cart")) {
            const counter = target.closest(".card").querySelector("[data-counter]")
            const counterValue = parseInt(counter.value)
            const id = parseInt(target.closest(".card").dataset.id)
            const item = data.find(item => item.id === id)
            if (!item.hasOwnProperty("numberOrders")) {
                item.numberOrders = counterValue
            }

            cart.add(item, counterValue)
            counter.value = 1

            totalPrice = calculateTotalPrice(cart.cartData)
            view.renderCart(cart.cartData, totalPrice)
        }
    })
}