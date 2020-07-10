// import React from 'react';
// import { Result } from 'antd';

// interface AuthorizedProps {
//   authority: IAuthorityType;
//   noMatch?: React.ReactNode;
// }

// type IAuthorizedType = React.FunctionComponent<AuthorizedProps> & {
//   check: typeof check;
//   AuthorizedRoute: typeof AuthorizedRoute;
// };

// const Authorized: React.FunctionComponent<AuthorizedProps> = ({
//   children,
//   identifier,
//   noMatch = (
//     <Result
//       status="403"
//       title="403"
//       subTitle="Sorry, you are not authorized to access this page."
//     />
//   ),
// }) => {
//   const childrenRender: React.ReactNode = typeof children === 'undefined' ? null : children;
//   const dom = check(identifier);
//   return <>{dom}</>;
// };

// export default Authorized as IAuthorizedType;
