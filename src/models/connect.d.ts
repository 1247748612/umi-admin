/*
 * @Author: your name
 * @Date: 2020-07-07 11:20:19
 * @LastEditTime: 2020-07-10 09:33:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \umijs\src\models\connect.d.ts
 */

import { MenuDataItem } from '@ant-design/pro-layout';
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';
import { UserModelState } from './user';

export { GlobalModelState, SettingModelState, UserModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: SettingModelState;
  user: UserModelState;
  // login: StateType;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
