<template>
  <div id="app">


    <!--左边扩展功能按钮 开始-->
    <div class="open-right">
      <div class="open-right-btn" @click="isExpand = !isExpand">
        <i :class="[isExpand ?'iconfont icon-zhankai-' : 'iconfont icon-zhankai4']"></i>
      </div>

      <transition name="el-zoom-in-right">
        <!--扩展模块 开始-->
        <div class="expand-right" v-if="isExpand" @click="$router.push('/mainPage')">
          <div class="expand-right-top">
            <i class="iconfont icon-shuju1"></i>
          </div>
        </div>
      </transition>
    </div>
    <!--扩展模块 结束-->

    <!--头部导航区域开始-->
    <el-header>
      <div class="title">
        <h3>logo</h3>
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
          <el-dropdown-item command="manager" class="iconfont icon-houtaiguanli">后台管理</el-dropdown-item>
          <el-dropdown-item divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <!--头部导航区域结束-->

    <!--修改个人信息对话框开始-->
    <el-dialog
      title="修改个人信息"
      :visible.sync="userInfoDialogVisible"
      width="40%">

      <el-form
        :model="editUserInfoForm"
        :rules="editUserInfoFormRules"
        ref="editUserInfoFormRef"
        label-width="100px">
        <el-form-item label="公司" prop="merchantName">
          <el-input v-model="editUserInfoForm.merchantName"/>
        </el-form-item>

        <el-form-item label="项目" prop="projectName">
          <el-input v-model="editUserInfoForm.projectName"/>
        </el-form-item>

        <el-form-item label="项目地址" prop="projectName">
          <el-input v-model="editUserInfoForm.projectName"/>
        </el-form-item>

        <el-form-item label="姓名" prop="userName">
          <el-input v-model="editUserInfoForm.userName"/>
        </el-form-item>

        <el-form-item label="职务" prop="duty">
          <el-input v-model="editUserInfoForm.duty"/>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-input v-model="editUserInfoForm.sex"/>
        </el-form-item>

        <el-form-item label="性别" prop="phone">
          <el-input v-model="editUserInfoForm.phone"/>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="userInfoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="userInfoDialogVisible = false">保 存</el-button>
     </span>
    </el-dialog>
    <!--修改个人信息对话框结束-->

    <!--折叠搜索条件开始-->
    <el-collapse-transition>
      <div class="searchBox" v-if="isCollapse">
        <el-form
          class="searchForm"
          label-position="left"
          :model="queryInfo"
          :rules="dataSearchFormRules"
          ref="ruleForm"
          label-width="80px">

          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item
                class="search_input"
                label="全部商家:"
                size="small">
                <el-select
                  @change="merchantIsSelected"
                  clearable
                  v-model="queryInfo.company_ID"
                  placeholder="请选择商家">
                  <el-option
                    v-for="item in merchantIdAndName"
                    :key="item.id"
                    :label="item.companyName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>

            </el-col>

            <el-col :span="6">
              <el-form-item
                class="search_input"
                label="项目地址:"
                size="small"
                prop="cities">
                <el-cascader
                  :disabled="(searchProjectParam.merchantId.length >= 0)"
                  @change="merchantAddressChange"
                  clearable
                  placeholder="请选择项目地址"
                  v-model="projectAddressArray"
                  :options="projectAddressObjArray"
                  :props="merchantAddressProps"/>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item
                class="search_input"
                label="项目名称:"
                size="small"
                prop="projects">
                <el-select
                  @change="projectChange"
                  clearable
                  v-model="queryInfo.mark_ID"
                  placeholder="请选择项目名称" value="">
                  <el-option
                    v-for="item in projectList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row :gutter="20">

            <el-col :span="6">
              <el-form-item
                class="search_input"
                label="点位:"
                size="small"
                prop="allMerchant">
                <el-select
                  clearable
                  v-model="queryInfo.ports"
                  placeholder="请选择点位" value="">
                  <el-option
                    v-for="item in doorNumList"
                    :label="item.label"
                    :key="item.value"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item
                label="时间:"
                size="small">
                <el-date-picker
                  @change="comeDateChangeEvent"
                  class="search_input"
                  v-model="comeDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row :gutter="20">

            <el-col :span="6">
              <el-form-item
                class="search_input"
                label="性别:"
                size="small"
                prop="allMerchant">
                <el-select
                  v-model="queryInfo.gender"
                  placeholder="性别" value="">
                  <el-option label="男" :value="0"/>
                  <el-option label="女" :value="1"/>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item
                class="search_input"
                label="年龄分布:"
                size="small"
                prop="allMerchant">
                <el-select
                  clearable
                  v-model="queryInfo.age_GROUP"
                  placeholder="年龄分布" value="">
                  <el-option
                    label="1~10岁"
                    value="1">
                  </el-option>
                  <el-option
                    label="1~10岁"
                    value="1">
                  </el-option>
                  <el-option
                    label="11~20岁"
                    value="2">
                  </el-option>
                  <el-option
                    label="21~30岁"
                    value="3">
                  </el-option>
                  <el-option
                    label="31~40岁"
                    value="4">
                  </el-option>
                  <el-option
                    label="41~50岁"
                    value="5">
                  </el-option>
                  <el-option
                    label="大于50岁"
                    value="6">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item
                class="search_input"
                label="情绪分布:"
                size="small"
                prop="allMerchant">
                <el-select
                  clearable
                  v-model="queryInfo.emotion"
                  placeholder="情绪分布" value="">
                  <el-option
                    label="开心"
                    value="1">
                  </el-option>
                  <el-option
                    label="微笑"
                    value="2">
                  </el-option>
                  <el-option
                    label="惊讶"
                    value="3">
                  </el-option>
                  <el-option
                    label="失望"
                    value="4">
                  </el-option>
                  <el-option
                    label="生气"
                    value="5">
                  </el-option>
                  <el-option
                    label="悲伤"
                    value="6">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item
                class="search_input"
                label="是否会员:"
                size="small">
                <el-select
                  clearable
                  v-model="queryInfo.is_VIP">
                  <el-option label="是" :value="0"/>
                  <el-option label="否" :value="1"/>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item
                class="search_input"
                label="出现频率"
                size="small"
                prop="allMerchant">
                <el-select
                  clearable
                  v-model="queryInfo.rating"
                  placeholder="出现频率" value="">
                  <el-option
                    label="1次"
                    value="1">
                  </el-option>
                  <el-option
                    label="2次"
                    value="2">
                  </el-option>
                  <el-option
                    label="3次"
                    value="3">
                  </el-option>
                  <el-option
                    label="4次"
                    value="4">
                  </el-option>
                  <el-option
                    label="大于5次"
                    value="5">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">

            </el-col>

            <el-col :span="6">
              <el-form-item
                size="small">
                <el-button
                  icon="el-icon-search"
                  type="primary"
                  @click="searchDataBtnClick">搜索
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-collapse-transition>
    <!--折叠搜索添加结束-->

    <!--折叠按钮开始-->
    <div class="searchUp" @click="collapseSearch">
      <i :class="[isCollapse ? 'iconfont icon-shouqi':'iconfont icon-xiala']"></i>
    </div>
    <!--折叠按钮结束-->

    <!--内容区域开始-->
    <el-container>
      <el-main>

        <!--图表开始-->
        <div id="myChart" :style="{width: '700', height: myChartHeight}"></div>
        <!--图表结束-->

      </el-main>
    </el-container>
    <!--内容区域结束-->

  </div>
</template>

<script>
  /*城市选择器*/
  import {provinceAndCityData, regionData} from 'element-china-area-data'
  import moment from 'moment'
  import brand from '../utils/brand.json'
  import {cascader, findDoorNumByProjectId, getMerchantListToProject, overview, pName} from "../api/api";
  import {setCacadeValue} from "../utils/util";

  export default {
    name: "dataPage",
    data() {
      return {
        // 搜索数据的表单
        queryInfo: {
          // 项目id
          mark_ID: '',
          // 商家id
          company_ID: '',
          is_VIP: '',
          // 省
          province: '',
          // 区
          region: '',
          // 开始时间
          start_TIME: '',
          // 结束时间
          end_TIME: '',
          // 点位信息
          ports: '',
          // 性别
          gender: '',
          // 年龄
          age_GROUP: '',
          // 情绪
          emotion: '',
          // 频次
          rating: '1'
        },
        // 项目查询信息对象
        searchProjectParam: {
          province: '',
          city: '',
          area: '',
          merchantId: ''
        },
        // 搜索数据的表单验证规则对象
        dataSearchFormRules: {},
        cityOptions: provinceAndCityData,
        areaOptions: regionData,
        // 城市选择器数据
        brand: brand,
        // 控制搜索菜单的折叠与展开
        isCollapse: true,
        // 控制 图表的高度
        myChartHeight: '465px',
        // 接收获取到的商家id和商家名称
        merchantIdAndName: [],
        // 商家地址 级联选择器配置对象
        merchantAddressProps: {
          expandTrigger: 'hover',
          children: 'children',
          label: 'label',
          value: 'value'
        },
        // 商家地址 数组对象
        projectAddressObjArray: [],
        // 城市 选择全部 的对象
        cityAllObj: {
          "label": '全部',
          "value": ''
        },
        // 存储当前被选中的 项目地址数组
        projectAddressArray: [],
        // 查询到的项目数组
        projectList: [],
        // 设备点位列表
        doorNumList: [],
        // 到访时间
        comeDate: [],
        //图标展示的时间数组
        timeDataArr: [],
        // 人数数组
        personCountArr: [],
        // 搜索查询到的结果数组
        searchDataArr: [],
        moment: moment,
        // 控制右侧扩展展开与收起
        isExpand: false,
        // 控制修改个人信息对话框的显示与隐藏
        userInfoDialogVisible: false,
        // 修改个人信息表单对象
        editUserInfoForm: {},
        // 修改个人信息表单验证对象
        editUserInfoFormRules: {}
      }
    },
    methods: {
      /**
       * 控制搜索栏的折叠效果
       */
      collapseSearch() {
        this.isCollapse = !this.isCollapse
        if (!this.isCollapse) {
          this.myChartHeight = '600'
        }
      },

      /**
       * 画图
       */
      drawIt() {

        let myChart = this.$echarts.init(document.getElementById('myChart'))
        let options = {
          title: {text: '总人流量:5000万人次'},
          tooltip: {},
          xAxis: {
            data: this.timeDataArr
          },
          yAxis: {},
          series: [{
            name: '流量',
            type: this.personCountArr.length > 15 ? 'line' : 'bar',
            itemStyle: {
              normal: {
                color: '#4ad2ff'
              }
            },
            data: this.personCountArr,

          }]
        }

        if (options && typeof options === 'object') {
          myChart.setOption(options, true)
        }
      },

      /**
       * 获取商家id和 商家名称
       */
      getMerchantIdAndName() {
        getMerchantListToProject().then(res => {
          if (res.code !== 200) this.$message.error('获取商家列表失败!')
          this.merchantIdAndName = res.result
        })
      },

      /**
       * 获取商家地址数组
       */
      getMerchantAddressArray() {
        cascader(this.searchProjectParam.merchantId).then(res => {
          // 判断当前请求是否成功
          if (res.code !== 200) return this.$message.error('获取商家地址失败!')
          // 将包装过的数据返回并使用数组进行接收
          this.projectAddressObjArray = setCacadeValue(res.result, this.cityAllObj)
        })
      },


      /**
       * 查询项目 id 和 项目名称
       * */
      getProjectIdAndName() {
        // 根据传递的查询参数查询 项目信息
        pName(this.searchProjectParam).then(res => {
          this.projectList = res.result
        })
      },

      /**
       * 当选择商家改变的时候
       * @param merchantId
       */
      merchantIsSelected(merchantId) {
        this.searchProjectParam.merchantId = this.queryInfo.company_ID
        this.getMerchantAddressArray(merchantId)
        this.getProjectIdAndName()
      },

      /**
       * 当项目地址改变的时候
       */
      merchantAddressChange() {
        console.log(this.projectAddressArray)
        if (this.projectAddressArray &&
          this.projectAddressArray.length > 0) {
          this.searchProjectParam.province = this.projectAddressArray[0]
          this.searchProjectParam.city = this.projectAddressArray[1]
          this.searchProjectParam.area = this.projectAddressArray[2]
        }
        this.getProjectIdAndName()
      },


      /**
       * 根据项目id查询设备点位信息
       * @param projectId
       */
      getDoorNumByProjectId(projectId) {
        findDoorNumByProjectId(projectId).then(res => {
          if (res.code !== 200) return this.$message.error('查询设备点位信息出错！')
          this.doorNumList = res.result
        })
      },

      /**
       * 当项目选择改变的改变的时候
       */
      projectChange() {
        this.getDoorNumByProjectId(this.queryInfo.mark_ID)
      },

      /**
       * 单击搜索按钮触发的事件
       */
      searchDataBtnClick() {
        this.searchDataMethod()
        this.searchDataArr = []
        this.timeDataArr = []
        this.personCountArr = []
      },

      /**
       * 将筛选数据的方法抽取出来
       * */
      searchDataMethod() {
        console.log(this.queryInfo)
        overview(this.queryInfo).then(res => {
          // 判断当前数据是否获取成功!
          if (res.code !== 200) this.$message.error('获取访问数失败!')
          // 将结果中的数据遍历取出
          this.searchDataArr = res.result
          console.log(this.searchDataArr);
          this.searchDataArr.forEach(item => {
            this.timeDataArr.push(moment(new Date(parseFloat(item.timer))).format('YYYY-MM-DD'))
            this.personCountArr.push(item.quantity)
          })
          console.log(this.timeDataArr);
          console.log(this.personCountArr);
          this.drawIt()
        })
      },

      /**
       * 当时间发生改变的时候触发该事件
       */
      comeDateChangeEvent() {
        if (this.comeDate && this.comeDate.length > 0) {
          this.queryInfo.start_TIME = moment(new Date(this.comeDate[0])).format('YYYY-MM-DD')
          this.queryInfo.end_TIME = moment(new Date(this.comeDate[1])).format('YYYY-MM-DD')
        }
      },

      /**
       * 设置时间默认值
       */
      setTimeDefaultValue() {
        // 将今天 到 7天前的日期设置到数组中
        this.comeDate.push(moment(moment().subtract(7, 'days').calendar()).format('YYYY-MM-DD'))
        this.comeDate.push(moment(new Date()).format('YYYY-MM-DD'))
        // 此时初始化查询条件
        this.queryInfo.start_TIME = this.comeDate[0]
        this.queryInfo.end_TIME = this.comeDate[1]
      },

      /**
       * 处理下拉列表中下拉项的单击事件
       */
      handleDropdownCommand(command) {
        if (command === 'editUserInfo') {
          this.userInfoDialogVisible = true
        } else if (command === 'manager') {
          this.$router.push('/index')
        }
      }
    },
    created() {
      this.searchDataMethod()
      this.getMerchantIdAndName()
      this.setTimeDefaultValue()
    },
    mounted() {
      // 在使用Echarts的时候需要在mounted生命周期函数中实例化echarts对象。因为我们要确保dom元素已经挂载在页面上。
      this.drawIt()
    }
  }
</script>

<style lang="less" scoped>

  .el-header {
    display: flex;
    justify-content: space-between;
    /*设置按钮居中显示*/
    height: 50px !important;
    color: #fff;
    align-items: center;
    font-size: 16px;
    /*设置字体盒子的对齐方式 使用嵌套*/
    > .title {
      width: 150px;
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

  /*右侧展开与收起 开始4*/
  .open-right {
    z-index: 2;
    position: fixed;
    right: 0;
    top: 50%;
    height: 200px;
    transform: translate(0, -50%);
  }

  .open-right-btn {
    float: left;
    width: 40px;
    height: 70px;
    line-height: 70px;
    background: rgba(0, 0, 0, .3);
    border-radius: 20px 0 0 20px;
    transform: translate(0, 80%);
    color: rgba(0, 0, 0, .8);
    cursor: pointer;
  }

  .open-right .open-right-btn i {
    font-size: 40px;
  }

  .expand-right {
    float: left;
    width: 100px;
    height: 200px;
    background-color: rgba(0, 0, 0, .3);
    border-radius: 10px 0 0 10px;
  }

  .expand-right .expand-right-top {
    width: 70px;
    height: 80px;
    margin: 0 auto;
  }

  .expand-right .expand-right-top i {
    cursor: pointer;
    font-size: 66px;
    color: #081252;
  }

  .expand-right .expand-right-top i:hover {
    color: #fff;
  }

  /*右侧展开与收起 结束*/

  .searchForm .el-form-item__label {
    color: #f00 !important;
  }

  .search_input {
    width: 300px;
  }

  .searchBox {
    background-color: #040526;
  }

  .searchForm {
    width: 80%;
    margin: auto;
    padding-bottom: 20px;
  }

  .searchUp {
    width: 50px;
    height: 50px;
    /* background: url(../assets/img/main/up.png) center top no-repeat;
     background-size: cover;*/
    cursor: pointer;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -60%);
    color: #fff;
  }

</style>
