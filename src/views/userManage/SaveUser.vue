<template>
  <div>
    <label-header :labelTitle="'用户编辑'"></label-header>
    <el-row :gutter="30">
      <div style="width: 50%; margin: auto">
        <el-form
          label-position="left"
          :model="userInfo"
          :rules="rules"
          label-width="100px">
          <el-form-item label="商家:" class="custom_form_item">
            <el-button icon="el-icon-edit" type='primary' circle size='medium' @click='showMerchantDialog'></el-button> &nbsp; <span>{{merchantInfo.merchantName}}</span><span v-if="!merchantInfo.merchantName" class="placeholder">请选择商家</span>
          </el-form-item>
          <el-form-item label="项目:" class="custom_form_item">
            <el-button :disabled="projectSearchData.merchantId === 0" icon="el-icon-edit" type='primary' circle size='medium' @click='showProjectDialog'></el-button> &nbsp; <span>{{projectInfo.projectName}}</span><span v-if="!projectInfo.projectName" class="placeholder">请选择项目</span>
          </el-form-item>
          <el-form-item label="头像" v-show="(!isModify && updateHeadImage) || (isModify && !updateHeadImage)">
            <div style="float: left; width: 50%">
              <el-upload :http-request="uploadHead"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :on-exceed="handleExceed"
                :before-upload="beforeAvatarUpload"
                :limit="1"
                :on-remove="removeIndexImage"
                ref="myupload">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </div>
            <div style="float: left; width: 50%">
              <img :src="userInfo.headImg" />
            </div>
          </el-form-item>
          <!-- 仅有修改的时候才会显示 -->
          <el-form-item v-show="isModify && updateHeadImage">
            <img :src="userInfo.headImg" />
            <br/>
            <el-button type="primary" @click="yoloHeadImg">修改头像</el-button>
          </el-form-item>
          <el-form-item label="登录账号" prop="loginName">
            <el-input v-model="userInfo.loginName" clearable maxlength="20"/>
          </el-form-item>
          <el-form-item label="密码" prop="password" v-show="!isModify">
            <el-input v-model="userInfo.password" show-password clearable maxlength="20"/>
          </el-form-item>
          <el-form-item label="密码确认" prop="password_twice" v-show="!isModify">
            <el-input v-model="userInfo.password_twice" show-password clearable maxlength="20"/>
          </el-form-item>
          <el-form-item label="联系人姓名" prop="userName">
            <el-input v-model="userInfo.userName" clearable maxlength="20"/>
          </el-form-item>
          <el-form-item label="联系人性别">
            <el-radio-group v-model="userInfo.sex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="userInfo.phone" clearable/>
          </el-form-item>
          <el-form-item label="联系人职务" prop="duty" >
            <el-input v-model="userInfo.duty" clearable maxlength="20"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="info" @click="cancle">取 消</el-button>
          <el-button type="primary" @click="save">保 存</el-button>
        </div>
        <el-dialog title="选择商家" :visible.sync="merchantDialogDisabled" width='75%'>
          <div class="custom-tree-container">
            <div class='custom_pracel_result'>
              <el-table
                :data='merchantList'
                style='width: 100%;margin:0 auto'
                :header-cell-style='{background:"#F3F3F3"}'
              >
                <el-table-column
                  prop='companyName'
                  label='名称'
                  align='left'
                ></el-table-column>
                <el-table-column
                  prop='contactName'
                  label='联系人'
                  align='left'
                ></el-table-column>
                <el-table-column
                  prop='startTime'
                  label='合作开始时间'
                  align='left'
                ></el-table-column>
                <el-table-column label='操作' align='center'>
                  <template slot-scope='scope'>
                    <el-button
                      type='text'
                      size='small'
                      @click='handleClickMerchant(scope.row)'
                    >选择</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <div class='paginate'>
                <el-pagination
                  @current-change='handleMerchantCurrentChange'
                  :current-page='merchantSearchData.pageNo'
                  :page-size='merchantSearchData.pageSize'
                  layout='total, sizes, prev, pager, next, jumper'
                  :total='merchantTotal'
                ></el-pagination>
              </div>
            </div>
          </div>
        </el-dialog>
        <el-dialog title="选择项目" :visible.sync="projectDialogDisabled" width='75%'>
          <el-row :gutter="30">
            <el-col :span="8">
              <el-input placeholder="请输项目名称" v-model="projectSearchData.projectName" />
            </el-col>
          </el-row>
          <div class="custom-tree-container">
            <div class='custom_pracel_result'>
              <el-table
                :data='projectList'
                style='width: 100%;margin:0 auto'
                :header-cell-style='{background:"#F3F3F3"}'
              >
                <el-table-column
                  prop='projectName'
                  label='项目名称'
                  align='left'
                ></el-table-column>
                <el-table-column
                  prop='linkmanName'
                  label='联系人'
                  align='left'
                ></el-table-column>
                <el-table-column
                  prop=''
                  label='地址'
                  align='left'>
                  <template slot-scope="scope">
                    {{brand['86'][scope.row.province]}}/
                    {{brand[scope.row.province][scope.row.city]}}/
                    {{brand[scope.row.city][scope.row.area]}}
                    &nbsp;&nbsp; {{scope.address}}
                  </template>
                </el-table-column>
                <el-table-column label='操作' align='center'>
                  <template slot-scope='scope'>
                    <el-button
                      type='text'
                      size='small'
                      @click='handleClickProject(scope.row)'
                    >选择</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <div class='paginate'>
                <el-pagination
                  @current-change='handleMerchantCurrentChange'
                  :current-page='projectSearchData.pageNo'
                  :page-size='projectSearchData.pageSize'
                  layout='total, sizes, prev, pager, next, jumper'
                  :total='projectTotal'
                ></el-pagination>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
      <div style="height: 200px"></div>
    </el-row>
  </div>
</template>

<script>
import { saveUser, getMerchantManage, getProjectList, detailUser } from '../../api/api'
import Brand from '../../utils/brand'
import LabelHeader from '../../components/LabelHeader'
export default {
  name: 'saveUser',
  data () {
    let checkTel = (rules, value, cb) => {
      const rgTel = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/
      // 如果验证通过将返回回调函数
      if (rgTel.test(value)) {
        return cb()
      }
      cb(new Error('电话号码不合法!'))
    }
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
      merchantDialogDisabled: false,
      merchantList: [],
      merchantInfo: {
        merchantName: ''
      },
      merchantTotal: 0,
      merchantSearchData: {
        pageNo: 1,
        pageSize: 10
      },
      projectDialogDisabled: false,
      projectList: [],
      projectInfo: {
        projectId: 0,
        projectName: ''
      },
      projectTotal: 0,
      projectSearchData: {
        pageNo: 1,
        pageSize: 10,
        merchantId: 0,
        projectName: ''
      },
      rules: {
        projectId: [
          { required: true, message: '请选择项目!', trigger: 'blur' }
        ],
        loginName: [
          { required: true, message: '请输入用户名!', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码!', trigger: 'blur' }
        ],
        password_twice: [
          { required: true, message: '请重复密码!', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入联系人姓名!', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系人电话!', trigger: 'blur' },
          { validator: checkTel, message: '电话号码格式不正确!', trigger: 'blur' }
        ]
      },
      backpath: '',
      isModify: false,
      // 正在修改头像
      updateHeadImage: true
    }
  },
  methods: {
    handleMerchantCurrentChange (val) {
      this.merchantSearchData.pageNo = val
    },
    handleClickMerchant (row) {
      console.log(row.id)
      this.projectSearchData.merchantId = row.id
      this.merchantInfo.merchantName = row.companyName
      this.merchantDialogDisabled = false
    },
    showMerchantDialog () {
      getMerchantManage(this.merchantSearchData).then(res => {
        this.merchantList = res.result.merchantList
        this.merchantTotal = res.result.total
        this.merchantDialogDisabled = true
      }).catch(error => {
        this.$message.error(error)
      })
    },
    showProjectDialog () {
      if (this.projectSearchData.merchantId === 0) {
        this.$alert('请选择商家', '警告', {
          confirmButtonText: '确定',
          callback: action => { }
        })
        return
      }
      getProjectList(this.projectSearchData).then(res => {
        this.projectList = res.result.projectList
        this.projectTotal = res.result.total
        this.projectDialogDisabled = true
      }).catch(error => {
        this.$message.error(error)
      })
    },
    handleClickProject (row) {
      this.userInfo.projectId = row.id
      this.projectInfo.projectName = row.projectName
      this.projectDialogDisabled = false
    },
    cancle () {
      this.$router.push({ path: this.backpath })
    },
    save () {
      // 验证
      if (this.userInfo.projectId === 0) {
        this.$alert('请选择项目', '警告', {
          confirmButtonText: '确定',
          callback: action => { }
        })
        return
      }
      if (!this.userInfo.loginName) {
        this.$alert('请输入登录名', '警告', { confirmButtonText: '确定', callback: action => { } })
        return
      }
      if (!this.isModify && (!this.userInfo.password || !this.userInfo.password_twice || this.userInfo.password !== this.userInfo.password_twice)) {
        this.$alert('两次密码输入不一致', '警告', { confirmButtonText: '确定', callback: action => { } })
        return
      }
      if (!this.userInfo.userName) {
        this.$alert('不存在用户名或长度过长', '警告', { confirmButtonText: '确定', callback: action => { } })
        return
      }
      if (!this.userInfo.phone) {
        this.$alert('请输入电话号码', '警告', { confirmButtonText: '确定', callback: action => { } })
        return
      }
      let rgTel = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/
      if (!rgTel.test(this.userInfo.phone)) {
        this.$alert('请输入正确的联系方式', '警告', { confirmButtonText: '确定', callback: action => { } })
        return
      }
      saveUser(this.userInfo).then(res => {
        if (res.code === 200) {
          this.$message.success('成功')
        }
        this.$router.push({ path: 'userManage' })
      }).catch(error => {
        this.$message.error(error.msg)
      })
    },
    uploadHead (e) {
      let params = new FormData()
      params.append('file', e.file)
      /* getindexLogo(params).then(res => {
        if (res.code === 100) {
          let src1 = window.location.host
          let src = 'http://' + src1 + '/api/file/image?path='
          this.form.indexLogo = res.result
          let url = src + res.result
          this.indexImage = url
        } else {
          this.$message.error(res.result)
        }
      }) */
      this.userInfo.headImg = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594804938046&di=30743bd0f49b9cccbe8797cbd12bd107&imgtype=0&src=http%3A%2F%2Fwww.cssqt.com%2FUpload%255C20120829%255CRe_201208291615256879.jpg'
    },
    handleExceed () {
      this.$message.warning('抱歉，只能选择一张图片')
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 < 500
      if (!isLt2M) {
        this.$message.error('抱歉，图片大小不能超过500kb')
      }
      return isLt2M
    },
    removeIndexImage () {
      this.userInfo.headImg = ''
    },
    yoloHeadImg () {
      this.updateHeadImage = !this.updateHeadImage
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
        this.isModify = true
        this.projectInfo.projectName = res.result.projectName
        this.projectSearchData.merchantId = res.result.merchantId
        this.projectInfo.projectId = res.result.id
        this.merchantInfo.merchantName = res.result.merchantName
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
