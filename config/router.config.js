export default [
  {
    path: '/',
    component: '../layouts/login',
    Routes: ['src/pages/AuthorizedForUser'],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // { path: '/Testsubject', redirect: '/Testsubject/list' },
      {
        path: '/Testsubject',
        icon: 'test-list',
        name: '测试主题',
        component: './Testsubject/list',
      },
      {
        path: '/Testsubject/editor',
        icon: 'test-editor',
        name: '主题编辑',
        component: './Testsubject/editor',
        hideInMenu: true,
      },
      {
        path: '/Question',
        icon: 'problem-sets',
        name: '问题集',
        component: './Question/index',
      },
      {
        path: '/Question/list',
        name: '问题列表',
        component: './Question/list',
        hideInMenu: true,
      },
      {
        path: '/Question/editor',
        name: '问题编辑',
        component: './Question/editor',
        hideInMenu: true,
      },
      {
        path: '/Result',
        icon: 'result',
        name: '结果集',
        component: './Result/index',
      },
      {
        path: '/Result/editor',
        name: '结果编辑',
        component: './Result/editor',
        hideInMenu: true,
      },
      {
        path: '/GoodsLibrary',
        icon: 'goods-library',
        name: '商品库',
        component: './GoodsLibrary/index',
      },
      {
        path: '/Template',
        icon: 'ui-template',
        name: 'UI模板',
        component: './Template/index',
      },
    ]

  }
];
