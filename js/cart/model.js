export default class Cart {
    constructor() {
        this.cartData = JSON.parse(localStorage.getItem("products")) || []
        this.isChange = false
    }

    excludeDuplicates(item) {
        return this.cartData.some(product => product.productName.toLowerCase().includes(item.productName.toLowerCase()))
    }

    add (item, counterValue = null) {
        const isProduct = this.excludeDuplicates(item)

        if (!isProduct) {
            this.cartData.push(item)
            this.isChange = true
        } else {
            const index = this.cartData.findIndex(product => product.id === item.id)

            if (counterValue) {

                if (counterValue == 1) {
                    this.cartData[index].numberOrders++
                } else {
                    this.cartData[index].numberOrders += counterValue
                }

                this.isChange = true
            } else {
                this.cartData[index] = item
                localStorage.setItem("products", JSON.stringify(this.cartData))
            }
        }

        if (this.isChange) {
            localStorage.setItem("products", JSON.stringify(this.cartData))
        }

        this.isChange = false
    }

    get (id) {
        return this.cartData.find(product => product.id === id)
    }

    remove (id) {
        const index = this.cartData.findIndex(item => item.id === id)
        const deleted = this.cartData.splice(index, 1)

        if (deleted.length) {
            localStorage.setItem("products", JSON.stringify(this.cartData))
            return true
        }

        return false
    }

    clear (key) {
        localStorage.removeItem(key)
    }
}