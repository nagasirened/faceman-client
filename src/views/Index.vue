<template>
  <div id="app">
    <el-container>

      <el-header>
        <div class="title">
          <h3>logo</h3>
          <span>大数据平台后台管理系统</span>
        </div>


        <el-dropdown @command="handleDropdownCommand"
                     trigger="click">
          <div class="avatar">
            <img src="../assets/img/admin/user.jpg" alt="">
            <em>用户_123456</em>
            <span class=" el-icon-arrow-down el-icon--right"></span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user-solid" command="editUserInfo">个人信息</el-dropdown-item>
            <el-dropdown-item class="iconfont icon-xiugaimima">修改密码</el-dropdown-item>
            <el-dropdown-item command="dataPage" class="iconfont icon-shuju1">数据统计</el-dropdown-item>
            <el-dropdown-item divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>


      </el-header>

      <el-container>

        <!--侧边栏开始-->
        <transition name="el-fade-in">
          <el-aside :width="isCollapse ? '69px' : '200px' ">
            <div class="toggle-collapse" @click="isCollapseMenu">|||</div>
            <!--侧边栏-->
            <el-menu
              default-active="2"
              background-color="#040526"
              text-color="#fff"
              active-text-color="#409EFF"
              :collapse-transition="false"
              unique-opened
              :collapse="isCollapse"
              router
              :default-active="activePath">

              <!--一级菜单-->
              <el-submenu
                :index="item.id"
                v-for="item in menuList"
                :key="item.id">

                <template slot="title">
                  <i :class="iconList[item.id]"></i>
                  <span>{{item.authName}}</span>
                </template>

                <!--二级菜单-->
                <el-menu-item
                  v-for="subItem in item.children"
                  :index="'/' + subItem.path"
                  :key="subItem.id"
                  @click="saveActivePath('/' + subItem.path)">  <!--点击时将激活的链接存储到sessionStorage中-->

                  <i class="el-icon-menu"></i>
                  <span>{{subItem.authName}}</span>

                </el-menu-item>

              </el-submenu>
              <!--一级菜单结束-->

            </el-menu>
          </el-aside>
        </transition>
        <!--侧边栏结束-->

        <!--主界面开始-->
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        menuList: [
          {
            authName: '商家管理',
            id: '1',
            path: 'merchantManageList',
            children: [
              {
                authName: '商家管理列表',
                id: '1',
                path: 'merchantManage'
              }
            ]
          },

          {
            authName: '项目管理',
            id: '2',
            path: 'projectManageList',
            children: [
              {
                authName: '项目管理列表',
                id: '2',
                path: 'projectManage'
              }
            ]
          },

          {
            authName: '设备管理',
            id: '3',
            path: 'equipmentManageList',
            children: [
              {
                authName: '设备管理列表',
                id: '3',
                path: 'equipmentManage'
              }
              /* {
                authName: '设备巡检',
                id: '4',
                path: 'equipmentInspection',
              } */
            ]
          },

          {
            authName: '用户管理',
            id: '4',
            path: 'userManageList',
            children: [
              {
                authName: '用户管理列表',
                id: '5',
                path: 'userManage'
              }
            ]
          }/* ,
        {
          authName: '权限管理',
          id: '5',
          path: 'authorityManageList',
          children: [
            {
              authName: '权限管理列表',
              id: '6',
              path: 'authorityManage',
            }
          ]
        } */
        ],

        /* 保存导航图标的样式的对象 ， 对象的键需与一级菜单中的id对应这样进行 一对一的查找 */
        iconList: {
          '1': 'iconfont icon-shangjia',
          '2': 'iconfont icon-xiangmu',
          '3': 'iconfont icon-ziyuanxhdpi',
          '4': 'iconfont icon-yonghu',
          '5': 'iconfont icon-quanxian'
        },
        /* 是否折叠侧边栏 */
        isCollapse: false,
        // 存储当前点击的路径 赋值给 menu的default-active属性 设置高亮显示效果
        activePath: ''
      }
    },
    methods: {
      isCollapseMenu() {
        this.isCollapse = !this.isCollapse
      },
      saveActivePath(activePath) {
        window.sessionStorage.setItem('activePath', activePath)
        this.activePath = activePath
      },

      /**
       * 当触发用户下拉列表的某个选项时触发某个指令
       */
      handleDropdownCommand(command) {
        if (command === 'dataPage') {
          this.$router.push('/dataPage')
        }
      }
    },
    created() {
      // 每次刷新页面的时候 设置获取当前保存的当前路径 设置其的高亮显示
      this.activePath = window.sessionStorage.getItem('activePath')
    }
  }
</script>

<style lang='less' scoped>

  /*顶部导航开始*/
  .el-header {
    display: flex;
    justify-content: space-between;
    /*设置按钮居中显示*/
    align-items: center;
    color: #fff;
    font-size: 16px;
    /*设置字体盒子的对齐方式 使用嵌套*/
    > .title {
      display: flex;
      align-items: center;
      > h3 {
        font-size: 25px;
        margin-left: 20px;
      }
      span {
        font-size: 25px;
        margin-left: 80px;
      }
    }
    > .el-dropdown {
      > .avatar {
        margin-right: 20px;
        font-size: 18px;
        > img {
          border-radius: 50%;
        }

        > em {
          cursor: pointer;
          margin-left: 15px;
        }
      }
    }
  }

  /*顶部导航结束*/

  .iconfont {
    margin-right: 15px;
  }

  .toggle-collapse {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 20px;
    text-align: center;
    color: #fff;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
