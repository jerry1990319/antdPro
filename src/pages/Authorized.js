import React from 'react';
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';
import Redirect from 'umi/redirect';

const Authority = getAuthority();
const Authorized = RenderAuthorized(Authority);

// function checkLogin() {
//   const authority = getAuthority();
//   return Array.isArray(authority) && authority.length > 0;
// }

export default ({ children }) => (
    <Authorized>
    {children}
  </Authorized>
);
