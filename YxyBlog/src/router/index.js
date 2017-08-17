import Vue from 'vue'
import Router from 'vue-router'
// import Auth from 'utils/auth.js'
// import store from 'store'
// let auth = new Auth()

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: require('pages/Index.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: require('pages/Login.vue')
    },
    {
      path: '/adminIndex',
      name: 'AdminIndex',
      component: require('pages/admin/Index.vue')
    }
    // {
    //   path: '/changePwd',
    //   name: 'ChangePwd',
    //   component: require('pages/ChangePwd.vue')
    // },
    // {
    //   path: '/index',
    //   name: 'Index',
    //   component: require('pages/content/Index.vue')
    // },
    // {
    //   path: '/userDkpList',
    //   name: 'UserDkpList',
    //   component: require('pages/content/UserDkpList.vue')
    // },
    // {
    //   path: '/userChange',
    //   name: 'UserChange',
    //   component: require('pages/content/changeUser.vue')
    // }
      // children: [
      //   {
      //     path: '',
      //     name: 'GoodsList',
      //     component: require('pages/GoodsList'),
      //     meta: {
      //       menuIndex: 1
      //     }
      //   }
      // ]
    //     {
    //       path: 'borderList',
    //       component: require('pages/BorderList.vue'),
    //       meta: {
    //         menuIndex: 2
    //       }
    //     },
    //     {
    //       path: 'accountList',
    //       component: require('pages/AccountList.vue'),
    //       meta: {
    //         menuIndex: 3
    //       }
    //     },
    //     {
    //       path: 'changePwd',
    //       component: require('pages/ChangePwd.vue'),
    //       meta: {
    //         menuIndex: 4
    //       }
    //     },
    //     {
    //       path: 'editBorder',
    //       component: require('pages/EditBorder.vue'),
    //       meta: {
    //         menuIndex: 2
    //       }
    //     },
    //     {
    //       path: 'msgList',
    //       component: require('pages/MsgList.vue'),
    //       meta: {
    //         menuIndex: -1
    //       }
    //     }
    //   ]
    // }
  ]
})

/*
路由跳转前置钩子，检查用户是否是登陆状态，不是则跳转回到登陆页面
 */
// router.beforeEach((to, from, next) => {
//   let logged = auth.loggedIn()
//   if (to.matched.some(record => record.meta.auth)) {
//     if (!logged) {
//       next({
//         path: '/login'
//       })
//     } else {
//       if (to.matched.some(record => record.meta.menuIndex)) {
//         let menuIndex = to.matched[to.matched.length - 1].meta.menuIndex || 0
//         store.dispatch('setMenuIndex', menuIndex)
//       }
//       next()
//     }
//   } else {
//     if (to.name === 'Login' && logged) {
//       return next({
//         path: '/admin'
//       })
//     }
//     next()
//   }
// })

export default router
