class Navigation {
    static getItems () {
        return new Promise((resolve) => {
            setTimeout(resolve, 400, [])
        })
    }
}

export default Navigation