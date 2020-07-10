/*
 * @Author: dengqing
 */
import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3301/',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },
  // layout: {},
  antd: {},
  dva: {
    hmr: true,
  },
  mock: false,
  routes: [
    {
      path: '/user',
      name: 'user',
      component: '@/layouts/UserLayout',
      routes: [
        {
          path: '/user',
          redirect: 'login',
        },
        {
          name: 'login',
          path: 'login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      name: 'dashboard',
      component: '@/layouts/BasicLayout',
      routes: [
        {
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
            },
          ],
        },
      ],
    },
    {
      path: '/404',
      component: '@/pages/404',
    },
    {
      component: '@/pages/404',
    },
  ],
});
