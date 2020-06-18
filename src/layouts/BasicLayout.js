import React from 'react';
import { connect, routerRedux } from 'dva';
import { Layout } from 'antd';
import SiderMenu from '@/components/SiderMenu';
import { getFlatMenuKeys } from '@/components/SiderMenu/SiderMenuUtils';
import Header from '@/components/Header';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import styles from './BasicLayout.less';



const { Content, Sider } = Layout;

function getMenuItem(route) {
  if (route.name) {
    const menuItem = {
      name: route.name,
      path: route.path,
      icon: route.icon,
      img: route.images,
      hideInMenu: route.hideInMenu ? route.hideInMenu : false
    };
    if (Array.isArray(route.routes) && route.routes.length > 0 && !route.hideChildrenInMenu) {
      const children = [];
      route.routes.forEach((item) => {
        const child = getMenuItem(item);
        if (child) {
          children.push(child);
        }
      });
      if (children.length > 0) {
        menuItem.children = children;
      }
    }
    return menuItem;
  }
  return null;
}

function getMenu(routes) {
  const menu = [];
  routes.forEach((route) => {
    const menuItem = getMenuItem(route);
    if (menuItem) {
      menu.push(menuItem);
    }
  });
  return menu;
}

const memoizeOneGetMenu = memoizeOne(getMenu, isEqual);

@connect()

class BasicLayout extends React.PureComponent {

  componentWillMount() {
    if (!sessionStorage.getItem('userName')) {
      this.props.dispatch(routerRedux.replace('/'));
    }

  }

  render() {
    const { route: { routes }, children } = this.props;
    const menuData = memoizeOneGetMenu(routes);
    const flatMenuKeys = getFlatMenuKeys(menuData);
    return (
      <Layout>
        <Layout style={{ width: '100%', minHeight: '100vh' }}>
          <Sider>
            <SiderMenu
              collapsible
              menuData={menuData}
              flatMenuKeys={flatMenuKeys}
              {...this.props}
            />
          </Sider>
          <Layout className={styles.content}>
            <Header />
            <Content className={styles['content-container']} style={{ background: '#fff', marginTop: '63px' }} >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout >
    );
  }
}

export default BasicLayout;