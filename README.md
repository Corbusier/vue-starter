# vue-starter

> demo为vue2.5 + vuex + vue-router构建的移动端单页面应用。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Introduction
本项目涉及到vue模块的全局和局部应用配置、第三方UI组件的使用、vuex模块、vue-router编程式的导航，路由子路由配置，路由信息对象等。

项目由十几个页面构成，主要分为主页、相册、用户中心三部分。主页内容包含评论、可编辑的标题及正文。相册内容包含预加载的标题及对应图像。用户中心内容包含用户信息及更多内容，更多内容部分又有子路由内容，包含用户的任务、动态、相册等内容。

### 请求数据
该项目运用了在线模拟的REST API服务器──[jsonplaceholder](http://jsonplaceholder.typicode.com/)

首先在webpack的配置中修改代理项:
```js
    '/replace': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        pathRewrite: {
          '^/replace': ''
        }
    },
    '/api': {
        target: 'http://47.94.102.32:8080',
        pathRewrite: {
          '^/api': ''
        }
    }
```
并且将不同的请求接口放在单独的模块中封装起来(`services/jsonholder.js`)，当首页内容完成创建时(`created`)使用`action`异步请求封装接口获取数据，再分发提交载荷到`mutation`中，储存获取到的数据，最后经过`getters`返回数据。这是一个完整的vuex状态管理运行机制。在之前写过[vuex-cart 介绍](https://corbusier.github.io/2018/04/18/vuex-cart/)。

在获取数据时，使用计算属性得到vuex保存的数据。同时，异步提交修改加载动画的状态。注意，此处`dispatch('doSpinner', showSpinner, { root: true })` 中的第三个参数申明了调用的不是本模块的`action`。

还需要注意的是：在划分vuex模块后，导出的模块需加上`namespaced: true`命名空间，这样才可以更方便访问到该模块中的状态。

### 路由嵌套
在用户中心中点击查看更多，进入用户详细信息页面，该部分的路由嵌套三个子路由，即任务、动态、相册。在`router`配置时：

```js
	{
      path: '/users/:userId',
      name: 'user-detail',
      component: UserDetail,
      children: [
        {
          path: 'todos',
          name: 'user-todos',
          component: UserTodos
        },
        {
          path: 'posts',
          name: 'user-posts',
          component: UserPosts,
        },
        {
          path: 'albums',
          name: 'user-albums',
          component: UserAlbums,
        }
      ]
    }
```
在组件中动态匹配路由时：

```js
	<mu-bottom-nav-item :to="todoRouter"/>
	<mu-bottom-nav-item :to="postRouter"/>
	<mu-bottom-nav-item :to="albumRouter"/>
	
	data () {
	  return {
		// ...省略
		todoRouter: `/users/${this.$route.params.userId}/todos`,
		postRouter: `/users/${this.$route.params.userId}/posts`,
		albumRouter: `/users/${this.$route.params.userId}/albums`
	  }
	}
```

## Preview
[在线预览请点击](http://111.231.228.147:8001)





