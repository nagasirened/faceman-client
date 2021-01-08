<template>
  <div>
    <label-header :labelTitle="'用户详情'"></label-header>
    <el-row :gutter="30">
      <div style="width: 50%; margin: auto">
        <el-form
          label-position="left"
          :model="userInfo"
          label-width="100px">
          <el-form-item label="登录账号:">
            <span>{{userInfo.loginName}}</span>
          </el-form-item>
          <el-form-item label="联系人姓名:">
            <span>{{userInfo.userName}}</span>
          </el-form-item>
          <el-form-item label="商家:" class="custom_form_item">
            <span>{{merchantInfo.merchantName}}</span>
          </el-form-item>
          <el-form-item label="项目:" class="custom_form_item">
            <span>{{projectInfo.projectName}}</span>
          </el-form-item>
          <el-form-item label="头像:">
            <div>
              <img :src="userInfo.headImg" />
            </div>
          </el-form-item>
          <el-form-item label="联系人性别:">
            <span>{{userInfo.sex === 0 ? '男' : '女'}}</span>
          </el-form-item>
          <el-form-item label="联系电话:">
            <span>{{userInfo.phone}}</span>
          </el-form-item>
          <el-form-item label="联系人职务:">
            <span>{{userInfo.duty}}</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="info" @click="cancle">返回</el-button>
        </div>
      </div>
      <div style="height: 200px"></div>
    </el-row>
  </div>
</template>

<script>
import { detailUser, getProjectDetail } from '../../api/api'
import Brand from '../../utils/brand'
import LabelHeader from '../../components/LabelHeader'
export default {
  name: 'saveUser',
  data () {
    return {
      brand: Brand,
      userInfo: {
        projectId: 0,
        headImg: '',
        loginName: '',
        password: '',
        password_twice: '',
        userName: '',
        sex: 0,
        phone: '',
        duty: ''
      },
      merchantList: [],
      merchantInfo: {
        merchantName: ''
      },
      projectInfo: {
        projectName: ''
      },
      backpath: ''
    }
  },
  methods: {
    cancle () {
      this.$router.push({ path: this.backpath })
    }
  },
  mounted () {
    let backPath = this.$route.query.backpath
    if (backPath) {
      this.backpath = backPath
    }
    let userId = this.$route.query.userId
    if (userId) {
      detailUser(userId).then(res => {
        this.userInfo = res.result
        // 修改，根据项目主键查询项目基本信息并设值
        getProjectDetail(this.userInfo.projectId).then(r => {
          this.projectInfo.projectName = r.result.projectName
          this.merchantInfo.merchantName = r.result.merchantName
        })
      }).catch(error => {
        this.$message.error(error)
      })
    }
  },
  components: {
    LabelHeader
  }
}
</script>

<style scoped>
.dialog-footer{
  float: right;
  margin-top: 20px;
}
</style>
