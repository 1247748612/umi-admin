import { history, getDvaApp, Reducer } from 'umi';
import { getToken, clearToken } from './utils/authority';
import { getUserMenu } from './services/auth';

let extraRoutes = [
  {
    path: '/',
    name: 'dashboard',
    component: '@/layouts/BasicLayout',
    routes: [{
      path: 'setting',
      name: '系统设置',
      component: '@/pages/settings',
      routes: [
        {
          path: 'user',
          name: '用户管理',
          component: '@/pages/settings/user',
        },
        {
          path: 'role',
          name: '角色管理',
          component: '@/pages/settings/role',
        }
      ]
    }],
  },
]

export function onRouteChange({ matchedRoutes }: any) {
  console.log(arguments, 'onRouteChange')
  document.title = matchedRoutes[matchedRoutes.length - 1].name || 'React Admin'
}

export function render(instatnce: any) {
  getUserMenu().then(({ state, data }) => {
    if (state === 'success') {
      extraRoutes = data
      console.log(extraRoutes, 'menus')
    } else {
      clearToken()
    }
  })
  return instatnce()
  // TODO: 请求获取路由
}

// export 
export function patchRoutes({ routes }: { routes: any[] }) {
  // TODO: render方法请求的路由在此插入
  // routes.unshift(...extraRoutes)
  console.log(extraRoutes, '外部routes')
  console.log(routes, 'patchRoutes')
}