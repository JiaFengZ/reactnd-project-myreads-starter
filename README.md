# MyReads 阅读书架

## 1 实现功能
* 分为书架主页(HomePage)和搜索页(SearchPage)
* HomePage 有 `Currently Reading` `Want to Read` `Read`三个书架，书架上书籍可移动切换书架，支持批量移动
* SearchPage 可搜索在线书籍，可添加到主页任意一个书架上，且书籍状态与主页相同

## 2 组件设计
* `App` → `HomePage` → `BookShelf`(`Select`)

          `SearchPage`→ `BookShelf`(`Select`)
* 使用 `React-router` 拆分 `HomePage` 和 `SearchPage`，实现主页搜索页导航
* 状态设计(`state`)  
App 顶层组件存储 `books`书架上所有书籍，通过`props`创递给`HomePage``SearchPage`;  
`HomePage` 中多选书籍时可通过 `props`传递进来的回调函数更新书籍的选中状态，即更新`App`中的`books`；  
`SearchPage`中添加书籍时通过 `props.updateBooks`更新`App`中的`books`；  
`HomePage` 负责主页书架书籍移动的动作；  
`SearchPage`负责搜索页搜索及往书架添加书籍的动作。

## 3 项目运行
* 项目开发运行：npm run start
* 项目打包部署：npm run build


