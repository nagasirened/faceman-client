<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!--条件搜索框-->
      <el-row>
        <el-col :span="24">
          <el-form
            ref="searchParam"
            class="search-form-wrap"
            label-position="top"
            :model="searchParam"
            size="small">

            <el-collapse-transition>
              <el-row v-if="isExpand">

                <el-col :span="6">
                  <el-form-item
                    label="创建时间">
                    <el-date-picker
                      size="small"
                      class="search_date"
                      v-model="dates"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item
                    class="search_input"
                    label="用户卡号">
                    <el-input placeholder="用户卡号" v-model="searchParam.cardId"/>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item
                    class="search_input"
                    label="用户职务">
                    <el-input placeholder="用户职务" v-model="searchParam.duty"/>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item
                    class="search_input"
                    label="用户性别">
                    <el-select v-model="searchParam.sex" value="">
                      <el-option v-for="item in sexoptions"
                                 :value="item.value"
                                 :label="item.key"
                                 :key="item.value"/>
                    </el-select>
                  </el-form-item>

                </el-col>
              </el-row>
            </el-collapse-transition>

            <el-row>

              <el-col :span="6">
                <el-form-item
                  class="search_input"
                  label="用户名/姓名">
                  <el-input placeholder="用户名/姓名" v-model="searchParam.name"/>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item
                  class="search_input"
                  label="项目名称">
                  <el-input placeholder="项目名称" v-model="searchParam.projectName"/>
                </el-form-item>
                <!--折叠展开按钮开始--> <!--expand-icon iconfont icon-yijianshouqi-->
                <i @click="isExpand = !isExpand" style="background-color: #eae6ee;"
                   :class="['expand-icon',isExpand ? 'iconfont  icon-shouqi':'iconfont  icon-xiala']"></i>
                <!--折叠展开按钮开始-->
              </el-col>

              <el-col :span="6" style="margin-top: 41px;">
                <el-form-item>
                  <el-button @click="resetParams">重置</el-button>
                  <el-button type="success" @click="searchUsers">查询</el-button>
                  <el-button type="primary" @click="createUser">添加用户</el-button>
                  <el-button type="danger" @click="deleteBatch">删除选中</el-button>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </el-col>
      </el-row>

      <el-table
        :data="users"
        @selection-change="handleSelectionChange"
        width="100%">
        <el-table-column
          prop="id"
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          prop="cardId"
          label="Card"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="loginName"
          label="登录名"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="createDate"
          label="注册日期"
          width="120">
          <template slot-scope="scope">
            {{dateFormat(scope.row)}}
          </template>
        </el-table-column>

        <el-table-column
          prop="merchantName"
          label="商家"
          width="120">
        </el-table-column>

        <el-table-column
          prop=""
          label="区域"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{brand['86'][scope.row.province]}}/
            {{brand[scope.row.province][scope.row.city]}}/
            {{brand[scope.row.city][scope.row.area]}}
          </template>
        </el-table-column>

        <el-table-column
          prop="projectName"
          label="项目"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="phone"
          label="注册电话"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="userName"
          label="姓名"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="duty"
          label="职务"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="sex"
          label="性别"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.sex === 1 ? '女' : '男'}}</span>
          </template>
        </el-table-column>

        <!--操作列开始-->
        <el-table-column
          label="操作"
          header-align="center"
          show-overflow-tooltip
          width="180px">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 0">
              <el-tooltip effect="light" content="详情" placement="top" :enterable="false" >
                <el-button type="success" icon="el-icon-view" size="mini" @click="getUser(scope.row.id)"/>
              </el-tooltip>
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="modifyUser(scope.row.id)"/>
              <!--enterable="false" 表示禁止鼠标进入到提示框内-->
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"/>
            </div>
            <div v-else-if="scope.row.status === 1">
              <el-button type="success" size="small" @click="apply(scope.row.id)">通过</el-button>
              <el-button type="warning" size="small" @click="refuse(scope.row.id)">拒绝</el-button>
            </div>
          </template>
        </el-table-column>
        <!--操作列结束-->
      </el-table>

      <!--分页组件-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchParam.pageNo"
        :page-sizes="[5, 10, 20]"
        :page-size="searchParam.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userTotal">
      </el-pagination>

    </el-card>
  </div>
</template>

<script>
import { userList, deleteUser, deleteUserBatch, userAudit } from '../../api/api'
import moment from 'moment'
import Brand from '../../utils/brand'
export default {
  name: 'user-manage',
  data () {
    return {
      users: [],
      brand: Brand,
      batch: [],
      userTotal: 0,
      dates: [],
      searchParam: {
        cardId: '',
        name: '',
        startTime: '',
        endTime: '',
        projectName: '',
        duty: '',
        sex: '',
        pageNo: 1,
        pageSize: 10
      },
      sexoptions: [
        { key: '男', value: '0' },
        { key: '女', value: '1' }
      ],
      auditParam: {
        userId: 0,
        status: 1
      },
      // 控制搜索栏的显示与隐藏
      isExpand: false
    }
  },
  methods: {
    pageUsers () {
      if (this.dates) {
        this.searchParam.startTime = this.dates[0]
        this.searchParam.endTime = this.dates[1]
      }
      userList(this.searchParam).then(res => {
        this.users = res.result.userDetailVOList
        this.userTotal = res.result.total
        console.log(this.users)
      }).catch(error => {
        this.$message.error(error)
      })
    },
    // 时间格式化
    dateFormat (row) {
      let date = row.createDate === undefined ? '' : row.createDate
      return moment(date).format('YYYY-MM-DD')
    },
    handleSizeChange (val) {
      this.searchParam.pageSize = val
    },
    handleCurrentChange (val) {
      this.searchParam.pageNo = val
    },
    // 重置查询条件
    resetParams () {
      this.searchParam.sex = ''
      this.searchParam.duty = ''
      this.searchParam.projectName = ''
      this.searchParam.pageNo = 1
      this.searchParam.name = ''
      this.searchParam.cardId = ''
      this.searchParam.endTime = ''
      this.searchParam.startTime = ''
      this.dates = []
      this.pageUsers()
    },
    searchUsers () {
      this.pageUsers()
    },
    createUser () {
      this.$router.push({ path: 'saveUser', query: { backpath: this.$router.currentRoute.fullPath } })
    },
    handleSelectionChange (val) {
      this.batch = val
    },
    deleteBatch () {
      if (!this.batch.length) {
        this.$alert('请选择至少一个用户', '警告', {
          confirmButtonText: '确定',
          callback: action => { }
        })
        return
      }
      let ids = []
      this.batch.forEach(item => {
        ids.push(item.id)
      })
      this.$confirm('确定要删除该用户吗?', '删除用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteUserBatch(ids).then(res => {
          if (res.code === 200) {
            this.$message.info('成功')
          }
          this.searchParam.pageNo = 1
          this.pageUsers()
        }).catch(error => {
          this.$message.error(error)
        })
      })
    },
    getUser (id) {
      this.$router.push({ path: 'detailUser', query: { userId: id, backpath: this.$router.currentRoute.fullPath } })
    },
    modifyUser (id) {
      this.$router.push({ path: 'saveUser', query: { userId: id, backpath: this.$router.currentRoute.fullPath } })
    },
    deleteUser (id) {
      this.$confirm('确定要删除该用户吗?', '删除用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteUser(id).then(res => {
          if (res.code === 200) {
            this.$message.success('成功')
          }
          this.searchParam.pageNo = 1
          this.pageUsers()
        }).catch(error => {
          this.$message.error(error)
        })
      })
    },
    // 审核通过
    apply (id) {
      this.auditParam.userId = id
      this.auditParam.status = 0
      userAudit(this.auditParam).then(res => {
        this.$message.info(res.msg)
        this.pageUsers()
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    // 审核拒绝
    refuse (id) {
      this.auditParam.userId = id
      this.auditParam.status = 2
      userAudit(this.auditParam).then(res => {
        this.$message.info(res.msg)
        this.pageUsers()
      }).catch(err => {
        this.$message.error(err.msg)
      })
    }
  },
  mounted () {
    this.pageUsers()
  }
}
</script>

<style scoped>
  .search-form-wrap__box {
    max-height: 70px;
    transition: all 1s linear;
  }

  /*搜索框的宽度*/
  .search_input {
    width: 240px;
  }

  /*时间选择器的宽度*/
  .search_date {
    width: 240px;
  }

  /*接触图标变小手*/
  .expand-icon {
    cursor: pointer;
  }
</style>
