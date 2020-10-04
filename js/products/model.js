class Products {
    async get(url, process) {
        try {
            const response = await fetch(url)
            const data = await response.json()
            process(data)

            if (!response.ok) {
                throw new Error("Network error")
            }
        } catch(err) {
            console.log(err)
        }
    }
}

export default Products