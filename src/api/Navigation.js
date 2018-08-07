class Navigation {
    static getItems () {
        return new Promise((resolve) => {
            setTimeout(resolve, 400, [
                {
                    id: 'n1', title: '新闻中心', children: [
                        {id: 'n2', title: '要闻'},
                        {id: 'n3', title: '国际'}
                    ]
                }
            ])
        })
    }
}

export default Navigation