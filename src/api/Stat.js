let mapCache = new Map()

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

    static loadTabTitle (id) {
        return new Promise((resolve) => {
            if (mapCache.get(id)) {
                setTimeout(resolve, 0, {title: '文章 ' + id})
            } else {
                setTimeout(() => {
                    mapCache.set(id, id)
                    resolve({title: '文章 ' + id})
                }, 400)
            }

        })
    }
}

export default Stat