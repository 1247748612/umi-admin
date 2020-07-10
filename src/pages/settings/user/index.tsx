import React, { useRef } from 'react'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import request from '@/utils/request';

interface UserItem {
  creatorId: string | null
  nickname: string
  avatar: string
  phoneNumber: string
  lastLoginIp: string
  roles: Array<Role>
  status: boolean
  _id: string
  username: string
  lastLoginTime: string
  createdAt: string
  updatedAt: string
}

interface Role {
  creatorId: string;
  explanation: string;
  _id: string;
  createdAt: string
  updatedAt: string
  id: number
}


const columns: ProColumns<UserItem>[] = [
  {
    title: 'id',
    dataIndex: '_id',
    valueType: 'indexBorder',
    width: 72,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    valueType: 'text',
    copyable: true,
    rules: [
      {
        required: true,
        message: '用户名必须填写',
      },
    ],
  },
  {
    title: '密码',
    dataIndex: 'password',
    valueType: 'text',
    rules: [
      {
        required: true,
        message: '密码必须填写',
      },
    ],
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    valueType: 'text',
    copyable: true,
    rules: [
      {
        required: true,
        message: '昵称必须填写',
      },
    ],
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    valueType: 'avatar'
  },
  {
    title: '状态',
    dataIndex: 'state',
    initialValue: 'all',
    filters: true,
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      true: {
        text: '启用',
        status: 'Success',
      },
      false: {
        text: '禁用',
        status: 'Error',
      },
    },
    width: '10%',
  },
];


const User: React.FC<{}> = (props) => {
  const actionRef = useRef<ActionType>();
  
  return (
    <>
      <h1>用户管理</h1>
      <ProTable<UserItem>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}) => request<{data: UserItem[]}>('/user/pagination', {
          params: {
            page: params.current,
            limit: params.pageSize
          }
        })}
        postData={(data: any) => {
          console.log(data, 'postData')
          return data.data
        }}
        rowKey="id"
        dateFormatter="string"
        headerTitle="用户列表"
      >

      </ProTable>
    </>
  )
}

export default User