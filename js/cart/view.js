export const renderCart = (cartData, totalPrice = null) => {
    const cartProducts = document.createElement("div")
    const cartWrapper = document.createElement("div")
    const cardBody = document.querySelector("[data-cart-box]")
    const titleHTML = `<h5 class="card-title">Ваш заказ</h4>`
    const orderForm = document.querySelector("#order-form")

    cardBody.textContent = ""

    if (cartData.length) {
        orderForm.classList.remove("none")
    } else {
        orderForm.classList.add("none")
    }

    cartProducts.classList.add("cart-products")
    cartWrapper.classList.add("cart-wrapper")

    if (cardBody.querySelector('.cart-products')) {
        cardBody.querySelector('.cart-products').remove()
    }

    cartData.forEach(item => {
        const cartHTML = `
            <div class="cart-item" data-id="${item.id}">
                <button data-action="delete" class="btn-delete">&#215;</button>
                <div class="cart-item__top">
                    <div class="cart-item__img">
                        <img src="${item.imgSrc}" alt="${item.productName}">
                    </div>
                    <div class="cart-item__desc">
                        <div class="cart-item__title">${item.productName}</div>
                        <div class="cart-item__weight">${item.count} шт. / ${item.weight}г.</div>

                        <!-- cart-item__details -->
                        <div class="cart-item__details">

                            <div class="items items--small counter-wrapper">
                                <button class="items__control" data-action="minus">-</button>
                                <input class="items__current" data-counter value="${item.numberOrders}" disabled>
                                <button class="items__control" data-action="plus">+</button>
                            </div>

                            <div class="price">
                                <div class="price__currency">${item.price} ₽</div>
                            </div>

                        </div>
                        <!-- // cart-item__details -->

                    </div>
                </div>
            </div>
        `
        cartWrapper.insertAdjacentHTML("beforeend", cartHTML)
    })

    cartProducts.insertAdjacentHTML("afterbegin", titleHTML)
    
    cartProducts.append(cartWrapper)
    cardBody.append(cartProducts)

    if (!cartData.length) {
        const titleElement = cartProducts.querySelector(".card-title")
        titleElement.remove()
    }

    if (totalPrice) {
        renderCartTotal(totalPrice)
    } 
}

const renderCartTotal = (totalAmountOrder) => {
    const cartProducts = document.querySelector(".cart-products")
    const cartTotal = document.createElement("div")
    const infoHTML = `
        <p style="display: none;"><span class="h5">Доставка:</span> <span class="delivery-cost free">бесплатно</span></p>
        <p><span class="h5">Итого:</span> <span class="total-price">${totalAmountOrder}</span> <span class="rouble">₽</span></p>
    `
    cartTotal.classList.add('cart-total')
    const cartTotalElement = cartProducts.querySelector(".cart-total")
    cartTotal.insertAdjacentHTML("beforeend", infoHTML)
    cartProducts.insertAdjacentElement("beforeend", cartTotal)

    if (totalAmountOrder > 2000) {
        cartTotal.firstElementChild.style.display = "block"
    } else {
        cartTotal.firstElementChild.style.display = "none"
    }

    if (cartTotalElement) {
        cartTotalElement.remove()
    }
}

export const rendermessageBox = () => {
    const cardBody = document.querySelector("[data-cart-box]")
    const alert = document.createElement("div")
    alert.classList.add("alert", "alert-secondary")
    alert.setAttribute("role", "alert")
    alert.dataset.cartEmpty=""
    alert.textContent = "Корзина пуста"

    const removedAlert = cardBody.querySelector(".alert")

    if (removedAlert) {
        removedAlert.remove()
    }

    cardBody.prepend(alert)
}

export const changeCartCounter = (element) => {
    const cartItem = element.closest(".cart-item")

    if (cartItem) {
        const counter = cartItem.querySelector("[data-counter]")
        let counterValue = parseInt(counter.value)
        
        if (element.dataset.action === "minus") {
            if (counterValue > 1) {
                counterValue--
                counter.value = counterValue
            }
        } else if (element.dataset.action === "plus") {
            counterValue++
            counter.value = counterValue
        }
    }
}
