<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

      <!-- 搜索框 + 添加按钮 -->
      <el-row>
        <el-col :span="24">
          <el-form
            label-position="top"
            ref="queryInfoRef"
            :inline="true"
            :model="queryInfo">

            <el-collapse-transition>
              <el-row v-if="isExpand">

                <el-col :span="6">

                  <el-form-item size="small" label="是否维修">
                    <el-select
                      class="search_input"
                      clearable
                      v-model="queryInfo.isEquipmentService"
                      placeholder="是否维修" value="">
                      <el-option label="是" :value="0"/>
                      <el-option label="否" :value="1"/>
                    </el-select>
                  </el-form-item>

                </el-col>

                <el-col :span="6">
                  <el-form-item size="small" label="设备状态">
                    <el-select
                      class="search_input"
                      clearable
                      v-model="queryInfo.equipmentStatus"
                      placeholder="设备状态" value="">
                      <el-option label="正常" :value="0"/>
                      <el-option label="异常" :value="1"/>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="6">

                  <el-form-item size="small" label="设备安装时间">
                    <el-date-picker
                      class="search_date"
                      v-model="searchEquipmentCreateTime"
                      @change="searchTimeChange"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>

                </el-col>

                <el-col :span="6">

                  <el-form-item size="small" label="项目地址">
                    <el-cascader
                      class="search_input"
                      v-model="searchAreaArray"
                      @change="companyAddressChange"
                      placeholder="项目地址"
                      clearable
                      :options="cityOptions"> <!--@change="handleChange"-->
                    </el-cascader>
                  </el-form-item>

                </el-col>
              </el-row>
            </el-collapse-transition>

            <el-row>
              <el-col :span="6">

                <el-form-item size="small" label="公司名称">
                  <el-input
                    class="search_input"
                    clearable
                    v-model="queryInfo.merchantName"
                    placeholder="公司名称"/>
                </el-form-item>

              </el-col>

              <el-col :span="6">

                <el-form-item size="small" label="项目名称">
                  <el-input
                    class="search_input"
                    clearable
                    v-model="queryInfo.projectName"
                    placeholder="项目名称"/>
                </el-form-item>

              </el-col>

              <el-col :span="6">

                <el-form-item size="small" label="设备编号">
                  <el-input
                    class="search_input"
                    clearable
                    v-model="queryInfo.equipmentNum"
                    placeholder="设备编号"/>
                </el-form-item>

                <!--折叠展开按钮开始--> <!--expand-icon iconfont icon-yijianshouqi-->
                <i @click="isExpand = !isExpand" style="background-color: #eae6ee;"
                   :class="['expand-icon',isExpand ? 'iconfont  icon-shouqi':'iconfont  icon-xiala']"></i>
                <!--折叠展开按钮开始-->
              </el-col>

              <el-col :span="6" style="margin: 41px 0 0 0">
                <el-button
                  size="small"
                  type="primary"
                  @click="getEquipmentList">查询
                </el-button>

                <el-button
                  size="small"
                  type="success"
                  @click="resetQueryInfoBtnClick()">重置
                </el-button>

              </el-col>
            </el-row>

          </el-form>

        </el-col>
      </el-row>

      <el-table
        :data="equipmentManageList"
        width="100%">

        <el-table-column
          prop="merchantName"
          label="公司"
          width="120">

        </el-table-column>

        <el-table-column
          prop="projectName"
          label="项目"
          width="120">
        </el-table-column>

        <el-table-column
          label="城市"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{brand['86'][scope.row.province]}} /
            {{brand[scope.row.province][scope.row.city]}}
          </template>
        </el-table-column>

        <el-table-column
          label="区域"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{brand[scope.row.city][scope.row.area]}}
          </template>
        </el-table-column>

        <el-table-column
          prop="pointCount"
          label="点位数量"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="doorNum"
          label="点位位置"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="equipmentNum"
          label="设备编号"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="equipmentState"
          label="设备运行状态"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag type="danger" size="mini" v-if="scope.row.equipmentState === 1">异常</el-tag>
            <el-tag type="success" size="mini" v-else>正常</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="equipmentService"
          label="设备维修情况"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag type="warning" size="mini" v-if="scope.row.equipmentService === 0">是</el-tag>
            <el-tag type="success" size="mini" v-else>否</el-tag>
          </template>
        </el-table-column>

        <!--操作列开始-->
        <el-table-column
          align="center"
          label="操作"
          header-align="center"
          show-overflow-tooltip
          width="230px">
          <template slot-scope="scope">
            <el-button type="primary" @click="showEditEquipmentBtnClick(scope.row.id)" icon="el-icon-edit" size="mini"/>

            <!--enterable="false" 表示禁止鼠标进入到提示框内-->
            <el-tooltip effect="light" content="详情" placement="top"
                        :enterable="false">
              <el-button type="success" icon="el-icon-view" @click="showEquipmentDetail(scope.row)" size="mini"/>
            </el-tooltip>

            <el-tooltip effect="light" content="添加巡检记录" placement="top"
                        :enterable="false">
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="showAddCheckEqDialog(scope.row)"/>
            </el-tooltip>

            <el-tooltip effect="light" content="查看巡检记录" placement="top"
                        :enterable="false">
              <el-button
                type="info"
                icon="el-icon-document"
                size="mini"
                @click="showCheckEqDetailDialog(scope.row.id)"/>
            </el-tooltip>

          </template>
        </el-table-column>
        <!--操作列结束-->
      </el-table>

      <!--分页组件开始-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNo"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pageSize"
        layout="total,sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <!--分页组件结束-->

      <!--设备详情对话框开始-->
      <el-dialog
        :close-on-click-modal="false"
        title="设备详情"
        :visible.sync="equipmentDialogVisible"
        width="60%">
        <el-form
          :model="equipmentDetail"
          label-width="120px"
          label-position="left">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="公司名称">
                <el-input v-model="equipmentDetail.merchantName" disabled/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="项目名称">
                <el-input v-model="equipmentDetail.projectName" disabled/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="项目地址">
                <el-cascader
                  disabled
                  v-model="equipmentDetailCity"
                  class="form_width"
                  placeholder="请选择项目地址"
                  size="large"
                  :options="cityOptions"
                  clearable/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="项目点位数量">
                <el-input v-model="equipmentDetail.pointCount" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="联系人">
                <el-input v-model="equipmentDetail.linkmanName" disabled/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="联系人电话">
                <el-input v-model="equipmentDetail.linkmanPhone" disabled/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="我方联系人">
                <el-input v-model="equipmentDetail.accessName" disabled/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="我方联系人电话">
                <el-input v-model="equipmentDetail.accessPhone" disabled/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="点位位置">
                <el-input v-model="equipmentDetail.doorNum" disabled/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="设备编号">
                <el-input v-model="equipmentDetail.equipmentNum" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="equipmentDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <!--设备详情对话框结束-->

      <!--添加巡检记录对话框开始-->
      <el-dialog
        :close-on-click-modal="false"
        title="添加巡检记录"
        :visible.sync="checkEquipmentDialogVisible"
        @close="addCheckEquipmentDialogClosed"
        width="60%">

        <el-form
          :model="addEquipmentForm"
          label-width="120px"
          label-position="left"
          :rules="addEquipmentFormRules"
          ref="addEquipmentFormRef">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item
                prop="checkMan"
                label="巡检人">
                <el-input
                  placeholder="请输入巡检人"
                  v-model="addEquipmentForm.checkMan"
                  clearable/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="巡检时间"
                prop="checkDate">
                <el-date-picker
                  style="width: 100%;"
                  v-model="addEquipmentForm.checkDate"
                  type="date"
                  clearable
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item
                label="巡检事项"
                prop="checkItem">
                <el-input
                  clearable
                  placeholder="请输入巡检事项"
                  v-model="addEquipmentForm.checkItem"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="是否维修">
                <el-switch
                  v-model="addEquipmentForm.isCheck">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item
                label="维修说明">
                <el-input
                  placeholder="维修说明"
                  clearable
                  :disabled="!addEquipmentForm.isCheck"
                  v-model="addEquipmentForm.checkMessage"/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="设备编号">
                <el-input v-model="addEquipmentForm.equipmentNum" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="checkEquipmentDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="commitAddEquipmentCheckForm">确 定</el-button>
        </span>
      </el-dialog>
      <!--添加巡检记录对话框结束-->

      <!--设备巡查记录对话框开始-->
      <el-dialog
        title="设备巡查记录"
        :visible.sync="equipmentCheckDialogVisible"
        width="80%">

        <el-table
          :data="equipmentCheckList"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="150">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="checkMan"
            label="巡检人"
            width="130">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="checkDate"
            label="巡检时间"
            width="150">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="checkItem"
            label="巡检事项"
            width="150">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="checkMessage"
            label="巡检说明"
            width="150">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="isCheck"
            label="是否维修"
            width="150">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="equipmentNum"
            label="设备编号"
            width="150">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="操作"
            width="150">
            <el-link type="primary" icon="el-icon-delete">删除</el-link>
          </el-table-column>
        </el-table>

        <span slot="footer" class="dialog-footer">
        <el-button @click="equipmentCheckDialogVisible = false">关闭</el-button>
        </span>
        <!--设备记录对话框分页开始-->
        <el-pagination
          @size-change="equipmentCheckHandleSizeChange"
          @current-change="equipmentCheckHandleCurrentChange"
          :current-page.sync="equipmentCheckParam.pageNo"
          :page-size="equipmentCheckParam.pageSize"
          layout="total, prev, pager, next"
          :total="equipmentCheckTotal">
        </el-pagination>
        <!--设备记录对话框分页结束-->

      </el-dialog>
      <!--设备巡查记录对话框结束-->

      <!--修改设备信息开始-->
      <el-dialog
        title="修改设备信息"
        :visible.sync="editEquipmentDialogVisible"
        @close="editEquipmentDialogClosed"
        width="40%">

        <el-form
          :model="editEquipmentForm"
          :rules="editEquipmentFormRules"
          ref="editEquipmentFormRef"
          label-width="100px">
          <el-form-item label="设备编号:">
            <span>{{editEquipmentForm.equipmentNum}}</span>
          </el-form-item>

          <el-form-item label="设备位置:" prop="doorNum">
            <el-input clearable v-model="editEquipmentForm.doorNum"/>
          </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editEquipmentDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="commitEditEquipment">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改设备信息结束-->
    </el-card>
  </div>
</template>

<script>
import {
  addEquipmentCheck,
  findEquipmentById,
  getEquipmentCheckList,
  getEquipmentList,
  updateEquipmentById
} from '../../api/api'
/* 城市选择器 */
import { regionData } from 'element-china-area-data'

import brand from '../../utils/brand.json'
import { cityStringToArray } from '../../utils/util'

export default {
  name: 'equipmentList-manage',
  data () {
    return {
      // 查询条件对象
      queryInfo: {
        // 商家名称
        merchantName: '',
        // 项目名称
        projectName: '',
        // 设备编号
        equipmentNum: '',
        // 是否维修
        isEquipmentService: '',
        equipmentStatus: '',
        // 设备安装开始时间
        equipmentCreateStartTime: '',
        // 设备安装结束时间
        equipmentCreateEndTime: '',
        area: '',
        pageNo: 1,
        pageSize: 2
      },
      equipmentCheckParam: {
        equipmentId: 0,
        pageNo: 1,
        pageSize: 2
      },
      total: 0,
      // 设备管理列表
      equipmentManageList: [],
      // 城市json数据
      brand: brand,
      // 控制设备详情对话框的显示与隐藏
      equipmentDialogVisible: false,
      // 接收设备详情
      equipmentDetail: {},
      // 城市选择器数据
      cityOptions: regionData,
      // 控制添加巡检记录对话框的显示与隐藏
      checkEquipmentDialogVisible: false,
      // 添加设备巡检记录实体
      addEquipmentForm: {
        equipmentId: '',
        checkMan: '',
        checkDate: '',
        checkItem: '',
        checkMessage: '',
        isCheck: false,
        equipmentNum: ''
      },
      addEquipmentFormRules: {
        checkMan: [
          { required: true, message: '请输入巡检人', trigger: 'blur' }
        ],
        checkDate: [
          { required: true, message: '请输入巡检时间', trigger: 'blur' }
        ],
        checkItem: [
          { required: true, message: '请输入巡检事项', trigger: 'blur' }
        ]
      },
      // 控制设备巡查列表对话框的显示与隐藏
      equipmentCheckDialogVisible: false,
      // 接收设备巡检记录 集合
      equipmentCheckList: [],
      equipmentCheckTotal: 0,
      // 设备详情中的项目地址 id 数组
      equipmentDetailCity: [],
      // 控制修改设备对话框的显示与隐藏
      editEquipmentDialogVisible: false,
      // 修改设备 表单对象
      editEquipmentForm: {},
      // 修改设备表单验证规则对象
      editEquipmentFormRules: {
        doorNum: [
          { required: true, message: '请输入设备位置!', trigger: 'blur' }
        ]
      },
      // 控制搜索框的展开与折叠
      isExpand: false,
      // 设备安装时间
      searchEquipmentCreateTime: [],
      searchAreaArray: []
    }
  },
  methods: {
    /**
     * 查询所有设备成功!
     * */
    getEquipmentList () {
      getEquipmentList(this.queryInfo).then(res => {
        if (res.code !== 200) return this.$message.error('查询设备列表失败!')
        this.equipmentManageList = res.result.equipmentAndProjectList
        this.total = res.result.total
        console.log(res)
      }).catch(error => error)
    },

    /**
     * 当每页显示条数改变的时候触发
     * @param newSize
     */
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getEquipmentList()
    },

    /**
     * 当当前页码发生改变的时候触发
     * @param newPage
     */
    handleCurrentChange (newPage) {
      this.queryInfo.pageNo = newPage
      this.getEquipmentList()
    },

    /**
     * 打开设备详情页面
     * @param equipment
     */
    showEquipmentDetail (equipment) {
      this.equipmentDialogVisible = true
      this.equipmentDetail = equipment
      // 将返回的信息中的省市区代码push到数组中
      console.log(this.equipmentDetail)
      this.equipmentDetailCity = cityStringToArray(equipment.province, equipment.city, equipment.area)
    },

    /**
     * 当查询地址发生改变的时候
     */
    companyAddressChange (cityArray) {
      if (this.searchAreaArray && this.searchAreaArray.length > 0) {
        // 将查询条件中的区域id设置上
        this.queryInfo.area = this.searchAreaArray[2]
        this.queryInfo.pageNo = 1
      }
    },

    /**
     * 打开添加巡检设备对话框
     * @param equipment
     */
    showAddCheckEqDialog (equipment) {
      // 显示添加巡检记录对话框
      this.checkEquipmentDialogVisible = true
      this.addEquipmentForm.equipmentNum = equipment.equipmentNum
      this.addEquipmentForm.equipmentId = equipment.id
    },

    /**
     * 查询 该设备的巡查记录 对话框
     * @param equipmentId
     */
    showCheckEqDetailDialog (equipmentId) {
      this.equipmentCheckParam.equipmentId = equipmentId
      getEquipmentCheckList(this.equipmentCheckParam).then(res => {
        if (res.code !== 200) this.$message.error('查询设备巡检记录失败!')
        this.equipmentCheckList = res.result.equipmentCheckList
        this.equipmentCheckTotal = res.result.total
        this.equipmentCheckDialogVisible = true
      })
    },

    /**
     *当 添加设备巡查对话框被关闭的时候 触发的事件
     */
    addCheckEquipmentDialogClosed () {
      this.$refs.addEquipmentFormRef.resetFields()
    },

    /**
     * 提交 添加巡检记录表单
     */
    commitAddEquipmentCheckForm () {
      // 提交之前进行表单预验证
      this.$refs.addEquipmentFormRef.validate((valid, msg) => {
        if (!valid) return this.$message.error('请将表单填写完善后再提交!')

        // 发送请求 提交数据
        addEquipmentCheck(this.addEquipmentForm).then(res => {
          if (res.code !== 200) return this.$message.error('提交巡查记录失败!')
          this.$message.success('提交成功!')
          this.checkEquipmentDialogVisible = false
        })
      })
    },

    /**
     * 当 巡查列表每页显示条数发生改变的时候触发
     * @param newSize
     */
    equipmentCheckHandleSizeChange (newSize) {
      this.equipmentCheckParam.pageSize = newSize
    },

    /**
     * 当页码改变的时候触发
     * @param newPage
     */
    equipmentCheckHandleCurrentChange (newPage) {
      this.equipmentCheckParam.pageNo = newPage
      this.showCheckEqDetailDialog(this.equipmentCheckParam.equipmentId)
    },

    /**
     * 打开修改设备界面
     * @param equipmentId
     */
    showEditEquipmentBtnClick (equipmentId) {
      // 当点击编辑设备按钮的时候打开 修改设备对话框
      findEquipmentById(equipmentId).then(res => {
        this.editEquipmentForm = res.result
        console.log(this.editEquipmentForm)
      })
      this.editEquipmentDialogVisible = true
    },

    /**
     * 当修改设备对话框关闭的时候触发的事件
     */
    editEquipmentDialogClosed () {
      this.$refs.editEquipmentFormRef.resetFields()
    },

    /**
     * 提交修改后的设备信息
     */
    commitEditEquipment () {
      // 判断当前修改设备对话框的 表单验证是否通过
      this.$refs.editEquipmentFormRef.validate(valid => {
        if (!valid) return this.$message.error('请完善表单之后再进行提交!')

        // 发送请求提交数据
        updateEquipmentById(this.editEquipmentForm).then(res => {
          if (res.code !== 200) return this.$message.error('修改失败!')
          this.editEquipmentDialogVisible = false
          this.$message.success('修改设备信息成功!')
          this.getEquipmentList()
        })
      })
    },

    /**
     * 重置搜索框
     */
    resetQueryInfoBtnClick () {
      this.$refs.queryInfoRef.resetFields()
      this.queryInfo.merchantName = ''
      this.queryInfo.projectName = ''
      this.queryInfo.equipmentNum = ''
      this.queryInfo.isEquipmentService = ''
      this.queryInfo.equipmentStatus = ''
      this.queryInfo.area = ''
      this.searchEquipmentCreateTime = []
      this.searchAreaArray = []
      this.queryInfo.equipmentCreateStartTime = ''
      this.queryInfo.equipmentCreateEndTime = ''
      this.getEquipmentList()
    },

    /**
     * 当搜索框中的时间改变的时候触发的事件
     */
    searchTimeChange () {
      if (this.searchEquipmentCreateTime && this.searchEquipmentCreateTime.length > 0) {
        this.queryInfo.equipmentCreateStartTime = this.searchEquipmentCreateTime[0]
        this.queryInfo.equipmentCreateEndTime = this.searchEquipmentCreateTime[1]
      }
    }
  },
  created () {
    this.getEquipmentList()
  }
}
</script>

<style lang="less" scoped>
  .search_input {
    width: 220px;
  }

  .search_date {
    width: 220px;
  }

  .expand-icon {
    cursor: pointer;
  }
</style>
