# vue-tree-select

## Description

TreeSelect组件，目前实现了单选、多选。

计划：树查看，树编辑，树菜单

## Events

* **change**: 
    
    选项改变时触发，无论其来源是否是用户的点击（isSelected改变也会触发事件），因此多选点击时可能触发多次，默认传递参数name, value, level, isFolder

* **itemclick**: 

    用户点击选项时触发，包括单选的选中，多选的选中或撤销，，默认传递参数name, value, level, isFolder

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
