import React from 'react';
import {useLocation} from "react-router-dom";
import {PageHeader} from 'antd';

import {Routes} from "../../router/Routes";

export const AppHeader = () => {
  const location = useLocation();

  // Used to determine the page title. If not page is found, we create a
  // dummy page with a "Page Not Found" title
  let notFound = Routes.find(r => r.path === location.pathname) ?? {
    path: '*',
    exact: false,
    title: 'Page Not Found',
    icon: 'DangerOutline',
    page: null,
  };

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="ERP Ultimate"
        subTitle={notFound.title}
        style={{margin: '8px 16px'}} />
    </div>
    // TODO: Add "Profile" icon top right for logged in user. On click,
    // show a menu that gives the option to log out.
  );
}
