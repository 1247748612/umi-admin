import request from '@/utils/request';

export const login = async (data: any) =>
  request.post('/user/login', {
    data,
  });

export const logout = async (data: any) =>
  request.post('/user/logout', {
    data,
  });

export const getUserInfo = async (data: any) =>
  request.post('/user/info', {
    data,
  });

export const getUserMenu = async () => request.get('/user/menu');
