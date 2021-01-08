const routes = [
  {
    path: '/',
    redirect: '/login',
    meta: {
      title: '主页'
    },
    hidden: true
  },
  {
    path: '/login',
    name: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('../views/Login.vue'),
    hidden: true
  },
  {
    path: '/index',
    name: 'index',
    redirect: '/welcome',
    meta: {
      title: '首页'
    },
    component: () => import('../views/Index.vue'),
    hidden: true,
    children: [
      {
        path: '/merchantManage',
        name: 'merchantManage',
        meta: {
          title: '首页'
        },
        component: () => import('../views/MerchantManage/MerchantManage'),
        hidden: true
      },
      {
        path: '/welcome',
        name: 'welcome',
        meta: {
          title: '欢迎页面'
        },
        component: () => import('../views/welcome/Welcome'),
        hidden: true
      },
      {
        path: '/projectManage',
        name: 'projectManage',
        meta: {
          title: '项目管理列表'
        },
        component: () => import('../views/projectManage/ProjectManage'),
        hidden: true
      },
      {
        path: '/equipmentManage',
        name: 'equipmentManage',
        meta: {
          title: '设备管理列表'
        },
        component: () => import('../views/equipmentManage/EquipmentManage'),
        hidden: true
      },
      {
        path: '/equipmentInspection',
        name: 'equipmentInspection',
        meta: {
          title: '设备巡检'
        },
        component: () => import('../views/equipmentManage/EquipmentInspection'),
        hidden: true
      },
      {
        path: '/authorityManage',
        name: 'authorityManage',
        meta: {
          title: '权限管理列表'
        },
        component: () => import('../views/authorityManage/AuthorityManage'),
        hidden: true
      }
    ]
  },
  {
    path: '/mainpage',
    name: 'mainpage',
    meta: {
      title: '首页'
    },
    component: () => import('../components/MainPage.vue'),
    hidden: true
  },
  {
    path: '/dataPage',
    name: 'dataPage',
    meta: {
      title: '数据统计'
    },
    component: () => import('../components/DataPage.vue'),
    hidden: true
  },
  {
    path: '/userManage',
    name: 'userManage',
    redirect: '/userManage',
    meta: {
      title: '用户管理页面'
    },
    component: () => import('../views/Index.vue'),
    hidden: true,
    children: [
      {
        path: '/userManage',
        name: 'userManage',
        meta: {
          title: '用户管理列表'
        },
        component: () => import('../views/userManage/UserManage'),
        hidden: true
      },
      {
        path: '/saveUser',
        name: 'saveUser',
        meta: {
          title: '编辑用户'
        },
        component: () => import('../views/userManage/SaveUser'),
        hidden: true
      },
      {
        path: '/detailUser',
        name: 'detailUser',
        meta: {
          title: '用户详情'
        },
        component: () => import('../views/userManage/DetailUser'),
        hidden: true
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    meta: {
      title: '测试'
    },
    component: () => import('../components/test.vue'),
    hidden: true
  }
]
export default routes
