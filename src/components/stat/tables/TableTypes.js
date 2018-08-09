import ResultsTableView from './ResultsTableView'
import DepartmentTableView from './DepartmentTableView'
import SectionTableView from './SecctionTableView'
import TopArticlesTableView from './TopArticlesTableView'
import ArticleTableView from './ArticleTableView'
import TopicsTableView from './TopicsTableView'

const typeMap = new Map()
typeMap.set('R', [ResultsTableView, '搜索结果'])
typeMap.set('D', [DepartmentTableView, '部门列表'])
typeMap.set('S', [SectionTableView, '栏目列表'])
typeMap.set('T', [TopArticlesTableView, '文章Top列表'])
typeMap.set('A', [ArticleTableView, '文章统计表'])
typeMap.set('P', [TopicsTableView, '专题统计表'])

class TableTypes {
    static get TYPE_MAP () {
        return typeMap
    }

    static get COMPONENTS () {
        return {
            ResultsTableView,
            DepartmentTableView,
            SectionTableView,
            TopArticlesTableView,
            ArticleTableView,
            TopicsTableView
        }
    }
}

export default TableTypes

//TODO imutable it

// function () {
//     return new Promise((resolve) => {
//         setTimeout(resolve, 500, '>>>搜索结果')
//     })
// }