/*
 * @Author: your name
 * @Date: 2020-07-08 15:22:09
 * @LastEditTime: 2020-07-09 18:31:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \umijs\src\models\user.ts
 */

/*
 * @Author: dengqing
 */

/*
 * @Author: dengqing
 */
import { Effect, Reducer, history } from 'umi';
import { login, getUserInfo, getUserMenu, logout } from '@/services/auth';
import { setToken, getToken, clearToken } from '../utils/authority';

export interface UserModelState {
  avatar?: string; // 用户头像
  token?: string | null; // 用户token
  userInfo?: object; // 个人信息
  menuList?: any[]; // 菜单列表
  permissionIdentifierList?: string[]; // 权限标识符列表
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  reducers: {
    setToken?: Reducer<UserModelState>;
    setUserInfo?: Reducer<UserModelState>;
    setUserMenu?: Reducer<UserModelState>;
    resetState?: Reducer<UserModelState>;
  };
  effects: {
    login?: Effect;
    logout?: Effect;
    getUserAndMenu?: Effect;
  };
}

const initialState: UserModelState = {
  avatar: '',
  token: getToken(),
  userInfo: {},
  menuList: [],
  permissionIdentifierList: [],
};

const UserModel: UserModelType = {
  namespace: 'user',
  state: initialState,
  reducers: {
    setToken(state, { payload }) {
      const token = payload.data.accessToken;
      // token存在localStroage
      setToken(token);
      return {
        ...state,
        token: payload.data && payload.data.accessToken,
      };
    },
    setUserInfo(state, { permissionIdentifierList }) {
      return {
        ...state,
        permissionIdentifierList,
      };
    },
    resetState() {
      clearToken();
      return initialState;
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      if (!response.state || response.state === 'error') {
        return;
      }
      yield put({ type: 'setToken', payload: response });
      location.href = '/';
      // location.href = history.createHref({
      //   pathname: '/',
      // });
    },
    *getUserAndMenu({ token }, { call, put }) {
      if (token) {
        const [userInfo, userMenu] = yield [
          call(getUserInfo),
          call(getUserMenu),
        ];
        if (userInfo.state === 'error' || userMenu.state === 'error') {
          yield put({
            type: 'resetState',
          });
        }

        const { permissionIdentifierList, avatar } = userInfo;
        yield put({
          type: 'setUserInfo',
          permissionIdentifierList,
          avatar,
          userInfo,
        });
        // resetMenu(userMenu);
        console.log(userInfo, userMenu, 'userAndMenu');
      }
    },
  },
};

export default UserModel;
