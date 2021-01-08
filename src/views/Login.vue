<template>
  <div class='custom_login'>

    <div style="position:absolute; width:100%; height:100%; z-index:-1">
      <img :src="appearance.backgroundImage" alt="" height="100%" width="100%">
    </div>
    <div class='custom_login_up' style="position:absolute;  z-index:2">
      <div class='custom_login_box'>
        <el-tabs v-model="activeName" type="card"> <!--@tab-click="handleClick"-->
          <el-tab-pane label="登录" name="first">
            <el-form label-position="left" label-width="80px" :model="loginData">
              <el-form-item label="登录名">
                <el-input v-model="loginData.loginName"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password" v-model="loginData.password"></el-input>
              </el-form-item>
              <!--<el-form-item label="验证码">
                <el-input v-model="loginData.captcha"></el-input>
                <img :src="captcha" />
              </el-form-item>-->
              <el-form-item>
                <el-button type="primary" size="mini" @click="loginUser('ruleForm')">登录</el-button>
                <el-button @click="resetForm('login')" size="mini">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="注册" name="second">
            <el-form label-position="left"
                     label-width="80px"
                     :rules="registerRules"
                     :model="registerData">
              <el-form-item label="项目名称" prop="projectName">
                <el-input v-model="registerData.projectName"></el-input>
              </el-form-item>
              <el-form-item label="登录名" prop="loginName">
                <el-input v-model="registerData.loginName"></el-input>
              </el-form-item>
              <el-form-item label="真实姓名" prop="userName">
                <el-input v-model="registerData.userName"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerData.password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPwd">
                <el-input type="password" v-model="confirmPwd"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="registerData.phone"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="registerUser('ruleForm')">注册</el-button>
                <el-button size="mini" @click="resetForm('register')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

  </div>
</template>

<script>
import { saveUser, login } from '../api/api'
export default {
  name: 'Login',
  data () {
    return {
      activeName: 'first',
      appearance: {
        title: '龙湖商业体客流大数据运营管理平台',
        backgroundImage: require('../assets/img/main/bg.png'),
        logoImage: require('../assets/img/main/avatar.jpg')
      },
      loginData: {
        loginName: '',
        password: ''
      },
      registerData: {
        projectName: '',
        phone: '',
        loginName: '',
        userName: '',
        password: '',
        type: 1
      },
      confirmPwd: '',
      registerRules: {
        projectName: [
          { required: true, message: '请输入完整项目名称', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请请输入联系方式', trigger: 'blur' }
        ],
        loginName: [
          { required: true, message: '请输入登录名', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        confirmPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      captcha: '',
      userInfo: {}
    }
  },
  methods: {
    loginUser () {
      if (!this.loginData.loginName) {
        this.$alert('请输入登录名', '警告', { confirmButtonText: '确定', callback: action => { } })
        return
      }
      if (!this.loginData.password) {
        this.$alert('请输入密码', '警告', { confirmButtonText: '确定', callback: action => { } })
        return
      }
      this.loginData.loginName = this.loginData.loginName.trim()
      this.loginData.password = this.loginData.password.trim()
      login(this.loginData).then(res => {
        this.userInfo = res.result
        if (this.userInfo.power === 0) {
          // 跳转到后台管理界面
          this.$router.push({ path: 'index' })
        } else if (!this.userInfo.power || this.userInfo.power === 1) {
          // 跳转到这个人的项目预览页
          let projectId = this.userInfo.projectId
          this.$router.push({ path: 'mainpage', query: { projectId: projectId } })
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    resetForm (info) {
      if (info === 'login') {
        this.loginData.loginName = ''
        this.loginData.password = ''
      } else if (info === 'register') {
        this.registerData.company = ''
        this.registerData.loginName = ''
        this.registerData.userName = ''
        this.registerData.phone = ''
        this.registerData.password = ''
        this.confirmPwd = ''
      }
    },
    registerUser () {
      // 验证
      if (!this.registerData.projectName.trim()) {
        this.$alert('请输入完整项目名称', '警告', {
          confirmButtonText: '确定',
          callback: action => { }
        })
        return
      }
      if (!this.registerData.loginName.trim()) {
        this.$alert('请输入登录名', '警告', { confirmButtonText: '确定', callback: action => { } })
        return
      }
      if (!this.registerData.password.trim() || !this.confirmPwd.trim() || this.registerData.password.trim() !== this.confirmPwd.trim()) {
        this.$alert('两次密码输入不一致', '警告', { confirmButtonText: '确定', callback: action => { } })
        return
      }
      if (!this.registerData.userName.trim()) {
        this.$alert('不存在用户名或长度过长', '警告', { confirmButtonText: '确定', callback: action => { } })
        return
      }
      if (!this.registerData.phone.trim()) {
        this.$alert('请输入电话号码', '警告', { confirmButtonText: '确定', callback: action => { } })
        return
      }
      let rgTel = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/
      if (!rgTel.test(this.registerData.phone.trim())) {
        this.$alert('请输入正确的联系方式', '警告', { confirmButtonText: '确定', callback: action => { } })
        return
      }
      this.registerData.projectName = this.registerData.projectName.trim()
      this.registerData.loginName = this.registerData.loginName.trim()
      this.registerData.password = this.registerData.password.trim()
      this.registerData.userName = this.registerData.userName.trim()
      this.registerData.phone = this.registerData.phone.trim()
      // 注册
      saveUser(this.registerData).then(res => {
        this.$message.info(res.msg)
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    loadCapture () {
      this.$http.get('/web/login/captcha').then(res => {
        console.info(res)
      })
    }
  },
  mounted () {
  },
  created () {
  }
}
</script>
<style lang='stylus' scoped>
  @import '../assets/styles/varibles.styl'
  .custom_login
    .custom_login_up
      float right
      position relative
      top 50%
      right 2rem
      margin-top -213px
      .custom_login_box
        width 6rem
        padding 0.6rem
        padding-bottom 0.1rem
        background url(../assets/img/main/bg.png) no-repeat
        background-position center
        background-size 100% 100%
        .custom_login_title_img
          display inline-block
          width 1.8rem
          height 1.2rem
        .custom_login_title
          display flex
          justify-content space-around
          text-align left
          color rgba(255, 255, 255, 1)
          font-size 0.5rem
          margin 0.4rem 0
          font-weight 400
          line-height 0.6rem
        .custom_login_inst
          color #ffffff
          font-size 0.2rem
          text-transform uppercase
          line-height 0.35rem
          margin-bottom 0.3rem !important
        .el-row
          margin-bottom 0.4rem
          &:last-child
            margin-bottom 0
        .custom_login_remember
          color #ffffff
        .custom_login_forget
          float right
        .custom_login_code
          display flex
          align-items center
        .custom_login_code img
          margin-left 4px
          width 1.6rem
          height 0.7rem
          cursor pointer
        .login_btn
          border-radius 5px
.el-tabs__nav
  .el-tabs__item
    text
      color white
</style>
