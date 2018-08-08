class Stat {
    static getBigNumberResults () {
        return new Promise((resolve) => {
            setTimeout(resolve, 400, [])
        })
    }

    static getTabResults () {
        return new Promise((resolve) => {
            setTimeout(resolve, 400, [])
        })
    }
}

export default Stat