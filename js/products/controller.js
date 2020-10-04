import * as view from "./view.js"

export default function (data) {
    const cards = document.querySelector(".cards")

    if (data.length > 0) {
        view.renderProducts(data)
    }

    cards.addEventListener("click", event => {
        view.changeCounter(event.target)
    })
}