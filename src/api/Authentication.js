class Authentication {
    static login (userForm) {
        return new Promise((resolve) => {
            setTimeout(resolve, 400, userForm)
        })
    }
}

export default Authentication