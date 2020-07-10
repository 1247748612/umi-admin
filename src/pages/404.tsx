import React from 'react';
import { Button, Result } from 'antd'
import { history } from 'umi';

const NotFoundPage: React.FC<{}> = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉, 没有此网页"
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          返回
        </Button>
      }
    />
  )
}

export default NotFoundPage