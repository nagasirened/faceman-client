const mutations = {
  // 保存token
  COMMIT_TOKEN (state, object) {
    state.token = object
  },
  // 登录信息
  COMMIT_LOGINDATA (state, loginData) {
    state.loginData = loginData
  },
  // 菜单
  COMMIT_MENULIST (state, obj) {
    state.menuList = obj.length !== 0 ? obj : JSON.parse(localStorage.getItem('AI')).menuList
  },
  // 权限菜单左侧
  COMMIT_USERMENULIST (state, params) {
    state.userMenuList = params && params.length !== 0 ? params : JSON.parse(localStorage.getItem('AI')).userMenuList
  },
  // 数据集
  COMMIT_TYPELIST (state, arr) {
    state.typeList = arr.length !== 0 ? arr : JSON.parse(localStorage.getItem('AI')).typeList
  },
  // 管理员
  COMMIT_ISADMIN (state, isAdmin) {
    state.isAdmin = isAdmin
  },
  // 业务管理
  COMMIT_ISBUSER (state, isBuser) {
    state.isBuser = isBuser
  },
  // 专家用户
  COMMIT_ISORDINARY (state, isOrdinary) {
    state.isOrdinary = isOrdinary
  },
  // 普通用户
  COMMIT_ISAPPLY (state, isApply) {
    state.isApply = isApply
  },
  // 左侧菜单伸缩
  COMMIT_ISCOLLAPSE (state, name) {
    state.isCollapse = name
  },
  // 操作权限列表
  ROLE_PERMISSIONLIST (state, arr) {
    state.permissionList = arr && arr.length !== 0 ? arr : JSON.parse(localStorage.getItem('AI')).permissionList
  }
}
export default mutations
