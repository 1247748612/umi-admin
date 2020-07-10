import ProLayout, { BasicLayoutProps as ProLayoutProps, MenuDataItem, SettingDrawer, Settings } from '@ant-design/pro-layout'
import { Dispatch, connect, Link } from 'umi'
import { ConnectState } from '@/models/connect'
import logo from '@/assets/logo.svg'
import React, { useEffect } from 'react'
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons';
interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  token: string | null,
  settings: Settings;
  dispatch: Dispatch;
}

const routes = [
  {
    path: '/',
    name: '首页',
    icon: <DashboardOutlined />,
    component: '@/layouts/BasicLayout',
  },
  {
    path: '/settings',
    name: '系统设置',
    icon: <SettingOutlined />,
    children: [
      {
        path: '/setting/user',
        name: '用户管理',
      },
      {
        path: '/setting/role',
        name: '角色管理',
      },
      {
        path: '/setting/menu',
        name: '菜单管理',
      },
      {
        path: '/setting/onlineUser',
        name: '在线用户管理',
      },
      {
        path: '/setting/dictionary',
        name: '字典管理',
      },
      {
        path: '/setting/logging',
        name: '日志管理'
      }
    ]
  },
  {
    path: '/user',
    name: '权限管理',
    icon: <UserOutlined />,
    children: [
      {
        path: '/user',
        redirect: 'login'
      },
      {
        name: '登录页',
        path: '/user/login',
      },
      {
        name: '注册页',
        path: '/user/register',
      },
    ]
  },
]

// 动态获取菜单
const postMenuRender = (): MenuDataItem[] => routes

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    dispatch,
    children,
    settings,
    token,
    location = {
      pathname: '/'
    },
  } = props

  useEffect(() => {
    dispatch({
      type: 'user/getUserAndMenu',
      token
    })
  }, [])

  console.log(props, 'basic layout props')

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload
      })
    }
  }

  return (
    <>
      <ProLayout
        location={location}
        logo={logo}
        menuHeaderRender={(logoDom, titleDom) => (
          <Link to="/">
            { logoDom }
            { titleDom }
          </Link> 
        )}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        // breadcrumbRender={(route
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        postMenuData={postMenuRender}
        menuRender={(props, dom) => {
          console.log(props, dom)
          return dom
        }}
        onCollapse={handleMenuCollapse}
        { ...settings }
        { ...props }
      >
        { children }
        <SettingDrawer
          settings={settings}
          onSettingChange={(config) =>
            dispatch({
              type: 'settings/changeSetting',
              payload: config,
            })
          }
        />
      </ProLayout>
    </>
  )
}

export default connect(({ global, settings, user }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
  token: user.token
}))(BasicLayout)