export const renderProducts = (data) => {
    data.forEach(item => {
        const cardHTML = `
            <div class="col-md-6">
                <div class="card mb-4" data-id="${item.id}">
                    <img class="product-img" src="${item.imgSrc}" alt="${item.productName}">
                    <div class="card-body text-center">
                        <h4 class="item-title">${item.productName}</h4>
                        <p><small data-items-in-box class="text-muted">${item.count} шт.</small></p>

                        <div class="details-wrapper">
                            <div class="items counter-wrapper">
                                <button class="items__control" data-action="minus">-</button>
                                <input class="items__current" data-counter value="1" disabled>
                                <button class="items__control" data-action="plus">+</button>
                            </div>

                            <div class="price">
                                <div class="price__weight">${item.weight}г.</div>
                                <div class="price__currency">${item.price} ₽</div>
                            </div>
                        </div>
                        <button data-cart type="button" class="btn btn-block btn-outline-warning">+ в корзину</button>
                    </div>
                </div>
            </div>
        `

        document.querySelector(".cards").insertAdjacentHTML("beforeend", cardHTML)
    })
}

export const changeCounter = (element) => {
    const card = element.closest(".card")

    if (card) {
        const counter = card.querySelector("[data-counter]")
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