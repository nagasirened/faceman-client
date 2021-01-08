<template>

  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>项目管理</el-breadcrumb-item>
      <el-breadcrumb-item>项目管理列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

      <!--搜索开始-->
      <el-row>
        <el-col :span="24">
          <el-form
            label-position="top"
            ref="queryInfoRef"
            :inline="true"
            :model="queryInfo">

            <!--使用过度动画进行包裹-->
            <el-collapse-transition>
              <el-row v-if="isExpand">
                <el-col :span="6">
                  <el-form-item
                    label="项目日期"
                    size="small">
                    <el-date-picker
                      @change="searchTimeChange"
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
                    label="性别"
                    size="small"
                    prop="linkmanSex">
                    <el-select
                      class="search_input"
                      clearable
                      v-model="queryInfo.linkmanSex"
                      placeholder="性别" value="">
                      <el-option label="男" :value="0"/>
                      <el-option label="女" :value="1"/>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item
                    label="联系人电话"
                    size="small"
                    prop="linkmanTel">
                    <el-input
                      class="search_input"
                      clearable
                      v-model="queryInfo.linkmanTel"
                      placeholder="联系人电话"/>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item
                    label="联系人姓名"
                    size="small"
                    prop="linkmanName">
                    <el-input
                      class="search_input"
                      clearable
                      v-model="queryInfo.linkmanName"
                      placeholder="联系人姓名"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-transition>

            <el-row>
              <el-col :span="6">
                <el-form-item
                  label="公司名称"
                  size="small" prop="merchantName">
                  <el-input
                    class="search_input"
                    clearable
                    v-model="queryInfo.merchantName"
                    placeholder="公司名称"/>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item
                  label="项目名称" size="small" prop="projectName">
                  <el-input
                    class="search_input"
                    clearable
                    v-model="queryInfo.projectName"
                    placeholder="项目名称"/>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item
                  label="项目地址" size="small" prop="projectName">
                  <el-cascader
                    v-model="searchAddressArr"
                    class="search_input"
                    @change="projectAddressChange"
                    placeholder="项目地址"
                    clearable
                    size="small"
                    :options="cityOptions">
                  </el-cascader>
                </el-form-item>

                <!--折叠展开按钮开始--> <!--expand-icon iconfont icon-yijianshouqi-->
                <i @click="isExpand = !isExpand" style="background-color: #eae6ee;"
                   :class="['expand-icon',isExpand ? 'iconfont  icon-shouqi':'iconfont  icon-xiala']"></i>
                <!--折叠展开按钮开始-->

              </el-col>

              <el-col :span="6" style="margin-top: 41px;">

                <el-button
                  type="primary"
                  size="small"
                  @click="getProjectList">查询
                </el-button>
                <el-button
                  size="small"
                  type="success"
                  @click="resetQueryInfoBtnClick">重置
                </el-button>

                <el-button
                  size="small"
                  type="primary"
                  @click="openAddProjectDialog">添加项目
                </el-button>

                <el-button
                  size="small"
                  type="danger"
                  :disabled="selectedProjectObj.length === 0"
                  @click="deleteProjectByIds">删除选中
                </el-button>
              </el-col>
            </el-row>

          </el-form>
        </el-col>
      </el-row>
      <!--搜索结束-->

      <!--表格区域开始-->
      <el-table
        :data="projectList"
        width="100%"
        stripe
        @selection-change="tableSelected">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          type="expand"
          width="55">

        </el-table-column>

        <el-table-column
          prop="merchantName"
          label="公司"
          width="120"
          align="center">

        </el-table-column>

        <el-table-column
          prop="projectName"
          label="项目"
          width="120"
          align="center">
        </el-table-column>

        <el-table-column
          label="城市"
          show-overflow-tooltip
          align="center">
          <template slot-scope="scope">
            {{brand["86"][scope.row.province]}} /
            {{brand[scope.row.province][scope.row.city]}}
          </template>
        </el-table-column>

        <el-table-column
          prop="area"
          label="区域"
          show-overflow-tooltip
          align="center">
          <template slot-scope="scope">
            {{brand[scope.row.city][scope.row.area]}}
          </template>
        </el-table-column>

        <el-table-column
          prop="address"
          label="具体地址"
          show-overflow-tooltip
          align="center">
        </el-table-column>

        <el-table-column
          prop="linkmanName"
          label="联系人姓名"
          show-overflow-tooltip
          align="center">
        </el-table-column>

        <el-table-column
          prop="linkmanPhone"
          label="联系人电话"
          show-overflow-tooltip
          align="center">
        </el-table-column>

        <el-table-column
          prop="linkmanSex"
          label="联系人性别"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.linkmanSex === 0">男</el-tag>
            <el-tag type="danger" v-else>女</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="linkmanEmail"
          label="联系人邮箱"
          show-overflow-tooltip
          align="center">
        </el-table-column>

        <!--操作列开始-->
        <el-table-column
          label="操作"
          header-align="center"
          show-overflow-tooltip
          width="230px"
          align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditProjectDialog(scope.row)"/>
            <!--enterable="false" 表示禁止鼠标进入到提示框内-->
            <el-tooltip
              effect="light"
              content="详情"
              placement="top"
              :enterable="false">
              <el-button type="success" icon="el-icon-view" size="mini" @click="showProjectDetailDialog(scope.row)"/>
            </el-tooltip>
            <el-button type="danger" icon="el-icon-delete" @click="deleteProjectById(scope.row.id)" size="mini"/>
          </template>
        </el-table-column>
        <!--操作列结束-->
      </el-table>
      <!--表格区域结束-->

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

    </el-card>

    <!--添加项目对话框开始-->
    <el-dialog
      title="添加项目"
      :visible.sync="addProjectDialogVisible"
      :close-on-click-modal="false"
      width="40%"
      @close="addProjectDialogClosed">

      <el-form
        label-position="left"
        :model="addProjectForm"
        :rules="addProjectFormRules"
        ref="addProjectFormRef"
        label-width="120px">
        <el-form-item label="项目名称" prop="projectName">
          <el-input placeholder="请输入项目名称" v-model="addProjectForm.projectName" clearable/>
        </el-form-item>

        <!--选择 商家 -->
        <el-form-item label="选择商家">
          <el-select
            class="form_width"
            v-model="addProjectForm.merchantName"
            filterable placeholder="请选择"
            @change="addSelectMerchant"
            clearable>
            <el-option
              v-for="item in merchantInfo"
              :key="item.id"
              :label="item.companyName"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <!--选择商家-->

        <!--地区选择-->
        <el-form-item prop="province" label="项目地址">
          <el-cascader
            class="form_width"
            placeholder="请选择项目地址"
            size="large"
            :options="cityOptions"
            clearable
            @change="chooseProjectAddress">
          </el-cascader>
        </el-form-item>
        <!--地区选择-->

        <el-form-item label="具体地址" prop="address">
          <el-input placeholder="请输入具体地址" v-model="addProjectForm.address" clearable/>
        </el-form-item>

        <!--联系人姓名-->
        <el-form-item label="联系人姓名" prop="linkmanName">
          <el-input placeholder="请输入联系人姓名" v-model="addProjectForm.linkmanName" clearable/>
        </el-form-item>

        <!--联系人姓名-->
        <el-form-item label="联系人职务" prop="linkmanDuty">
          <el-input placeholder="请输入联系人职务" v-model="addProjectForm.linkmanDuty" clearable/>
        </el-form-item>

        <!--联系人性别-->
        <el-form-item label="联系人性别">
          <el-radio-group v-model="addProjectForm.linkmanSex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <!--联系人电话-->
        <el-form-item prop="linkmanPhone" label="联系人电话">
          <el-input placeholder="请输入联系人电话" v-model="addProjectForm.linkmanPhone" clearable/>
        </el-form-item>

        <!--联系人邮箱-->
        <el-form-item prop="linkmanEmail" label="联系人邮箱">
          <el-input placeholder="请输入联系人邮箱" v-model="addProjectForm.linkmanEmail" clearable/>
        </el-form-item>

        <!--我方联系人姓名-->
        <el-form-item prop="accessName" label="我方联系人姓名">
          <el-input placeholder="请输入我方联系人姓名" v-model="addProjectForm.accessName" clearable/>
        </el-form-item>

        <!--我方联系人电话-->
        <el-form-item prop="accessPhone" label="我方联系人电话">
          <el-input placeholder="请输入我方联系人电话" v-model="addProjectForm.accessPhone" clearable/>
        </el-form-item>

        <!--'equipment.' + index + '.doorNum'-->
        <!--添加设备-->
        <div v-for="(equipment, index) in equipmentList">
          <el-form-item
            :label="'设备'  + (index + 1)"
            :rules="addEquipmentFormRules"
            prop="doorNum">
            <el-row :gutter="4">
              <el-col :span="9">
                <el-input placeholder="商城门编号" v-model="equipment.doorNum"/>
              </el-col>
              <el-col :span="10">
                <el-input ref="equipmentNum" @blur="getEquipmentNum" placeholder="设备编号"
                          v-model="equipment.equipmentNum"/>
              </el-col>
              <el-col :span="4">
                <!--删除设备文本框的按钮-->
                <el-tooltip
                  effect="light"
                  content="删除"
                  placement="top"
                  :enterable="false">
                  <el-button
                    :disabled="equipmentList.length <= 1"
                    type="danger"
                    icon="el-icon-delete"
                    @click.prevent="removeAddDomain(equipment)"
                    circle
                    size="mini"/>
                </el-tooltip>

                <!--添加设备文本框的按钮-->
                <el-tooltip
                  effect="light"
                  content="添加"
                  placement="top"
                  :enterable="false">
                  <el-button
                    v-if="(equipmentList.length - 1) === index"
                    type="primary"
                    icon="el-icon-plus"
                    @click="addAddDomain"
                    circle
                    size="mini"/>
                </el-tooltip>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <!--添加设备结束-->
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addProjectDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitAddProjectForm">确 定</el-button>
      </span>
    </el-dialog>
    <!--添加项目对话框结束-->

    <!--查询项目详情对话框开始-->
    <el-dialog
      title="项目详情"
      :visible.sync="projectDetailDialogVisible"
      width="40%">

      <el-form
        label-position="left"
        :model="showProjectDetail"
        label-width="120px">
        <el-form-item label="项目名称">
          <el-input placeholder="请输入项目名称" disabled v-model="showProjectDetail.projectName" clearable/>
        </el-form-item>

        <!--选择 商家 -->
        <el-form-item label="商家名称">
          <el-select
            disabled
            class="form_width"
            v-model="showProjectDetail.merchantName"
            filterable placeholder="请选择"
            @change="addSelectMerchant"
            clearable>
            <el-option
              v-for="item in merchantInfo"
              :key="item.id"
              :label="item.companyName"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <!--选择商家-->

        <!--地区选择-->
        <el-form-item label="项目地址">
          <el-cascader
            disabled
            v-model="showProjectDetailCity"
            class="form_width"
            placeholder="请选择项目地址"
            size="large"
            :options="cityOptions"
            clearable
            @change="chooseProjectAddress">
          </el-cascader>
        </el-form-item>
        <!--地区选择-->

        <el-form-item label="具体地址">
          <el-input disabled placeholder="请输入具体地址" v-model="showProjectDetail.address" clearable/>
        </el-form-item>

        <!--联系人姓名-->
        <el-form-item label="联系人姓名">
          <el-input disabled placeholder="请输入联系人姓名" v-model="showProjectDetail.linkmanName" clearable/>
        </el-form-item>

        <!--联系人姓名-->
        <el-form-item label="联系人职务">
          <el-input disabled placeholder="请输入联系人职务" v-model="showProjectDetail.linkmanDuty" clearable/>
        </el-form-item>

        <!--联系人性别-->
        <el-form-item label="联系人性别">
          <el-radio-group disabled v-model="showProjectDetail.linkmanSex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <!--联系人电话-->
        <el-form-item label="联系人电话">
          <el-input disabled placeholder="请输入联系人电话" v-model="showProjectDetail.linkmanPhone" clearable/>
        </el-form-item>

        <!--联系人邮箱-->
        <el-form-item label="联系人邮箱">
          <el-input disabled placeholder="请输入联系人邮箱" v-model="showProjectDetail.linkmanEmail" clearable/>
        </el-form-item>

        <!--我方联系人姓名-->
        <el-form-item label="我方联系人姓名">
          <el-input disabled placeholder="请输入我方联系人姓名" v-model="showProjectDetail.accessName" clearable/>
        </el-form-item>

        <!--我方联系人电话-->
        <el-form-item label="我方联系人电话">
          <el-input disabled placeholder="请输入我方联系人电话" v-model="showProjectDetail.accessPhone" clearable/>
        </el-form-item>

        <div v-for="(equipment, index) in showEquipmentDetail">
          <el-form-item
            :label="'设备'  + (index + 1)">
            <el-row :gutter="4">
              <el-col :span="11">
                <el-input
                  disabled
                  v-model="equipment.doorNum"/>
              </el-col>
              <el-col :span="12">
                <el-input
                  disabled
                  v-model="equipment.equipmentNum"/>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="projectDetailDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--查询项目详情对话框结束-->

    <!--修改项目对话框开始-->
    <el-dialog
      title="修改项目"
      :visible.sync="editProjectDialogVisible"
      :close-on-click-modal="false"
      width="40%"
      @close="editProjectDialogClosed">

      <el-form
        label-position="left"
        :model="editProjectForm"
        :rules="editProjectFormRules"
        ref="editProjectFormRef"
        label-width="120px">
        <el-form-item label="项目名称" prop="projectName">
          <el-input
            placeholder="请输入项目名称"
            v-model="editProjectForm.projectName"
            clearable
            disabled/>
        </el-form-item>

        <!--选择 商家 -->
        <el-form-item label="选择商家">
          <el-select
            class="form_width"
            v-model="editProjectForm.merchantName"
            filterable placeholder="请选择"
            @change="editSelectMerchant"
            clearable>
            <el-option
              v-for="item in merchantInfo"
              :key="item.id"
              :label="item.companyName"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <!--选择商家-->

        <!--地区选择-->
        <el-form-item prop="province" label="项目地址">
          <el-cascader
            v-model="editProjectAddressArr"
            class="form_width"
            placeholder="请选择项目地址"
            size="large"
            :options="cityOptions"
            clearable
            @change="chooseProjectAddress">
          </el-cascader>
        </el-form-item>
        <!--地区选择-->

        <el-form-item label="具体地址" prop="address">
          <el-input placeholder="请输入具体地址" v-model="editProjectForm.address" clearable/>
        </el-form-item>

        <!--联系人姓名-->
        <el-form-item label="联系人姓名" prop="linkmanName">
          <el-input placeholder="请输入联系人姓名" v-model="editProjectForm.linkmanName" clearable/>
        </el-form-item>

        <!--联系人姓名-->
        <el-form-item label="联系人职务" prop="linkmanDuty">
          <el-input placeholder="请输入联系人职务" v-model="editProjectForm.linkmanDuty" clearable/>
        </el-form-item>

        <!--联系人性别-->
        <el-form-item label="联系人性别">
          <el-radio-group v-model="editProjectForm.linkmanSex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <!--联系人电话-->
        <el-form-item prop="linkmanPhone" label="联系人电话">
          <el-input placeholder="请输入联系人电话" v-model="editProjectForm.linkmanPhone" clearable/>
        </el-form-item>

        <!--联系人邮箱-->
        <el-form-item prop="linkmanEmail" label="联系人邮箱">
          <el-input placeholder="请输入联系人邮箱" v-model="editProjectForm.linkmanEmail" clearable/>
        </el-form-item>

        <!--我方联系人姓名-->
        <el-form-item prop="accessName" label="我方联系人姓名">
          <el-input placeholder="请输入我方联系人姓名" v-model="editProjectForm.accessName" clearable/>
        </el-form-item>

        <!--我方联系人电话-->
        <el-form-item prop="accessPhone" label="我方联系人电话">
          <el-input placeholder="请输入我方联系人电话" v-model="editProjectForm.accessPhone" clearable/>
        </el-form-item>
        <!--'equipment.' + index + '.doorNum'-->
        <!--添加设备-->
        <div v-for="(equipment, index) in editEquipmentList">
          <el-form-item
            :label="'设备'  + (index + 1)"
            :rules="addEquipmentFormRules"
            prop="doorNum">
            <el-row :gutter="4">
              <el-col :span="9">
                <el-input placeholder="商城门编号" v-model="equipment.doorNum"/>
              </el-col>
              <el-col :span="10">
                <el-input ref="equipmentNum" @blur="getEquipmentNum" placeholder="设备编号"
                          v-model="equipment.equipmentNum"/>
              </el-col>
              <el-col :span="4">
                <!--删除设备文本框的按钮-->
                <el-tooltip
                  effect="light"
                  content="删除"
                  placement="top"
                  :enterable="false">
                  <el-button
                    :disabled="editEquipmentList.length <= 1"
                    type="danger"
                    icon="el-icon-delete"
                    @click.prevent="removeEditDomain(equipment)"
                    circle
                    size="mini"/>
                </el-tooltip>

                <!--添加设备文本框的按钮-->
                <el-tooltip
                  effect="light"
                  content="添加"
                  placement="top"
                  :enterable="false">
                  <el-button
                    v-if="(editEquipmentList.length - 1) === index"
                    type="primary"
                    icon="el-icon-plus"
                    @click="addEditDomain"
                    circle
                    size="mini"/>
                </el-tooltip>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <!--添加设备结束-->
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editProjectDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitEditProjectForm">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改项目对话框结束-->

  </div>

</template>

<script>
import {
  deleteProjectById,
  deleteProjectByIds,
  getMerchantListToProject,
  getProjectAndEquipmentList,
  getProjectList,
  saveProject
} from '../../api/api'
/* 城市选择器 */
import { regionData } from 'element-china-area-data'
/* 城市json数据 */
import brand from '../../utils/brand.json'
/* utils中的外部函数 */
import { checkEquipmentInput, cityArrayToString, cityStringToArray } from '../../utils/util'
/* 时间格式工具 */

// 城市的Json值
export default {
  name: 'project-manage',
  data () {
    // 自定义校验规则：邮箱验证
    let checkEmail = (rules, value, cb) => {
      const rgEmail = /^\w+@\w+(\.\w+)+$/
      // 如果通过了校验规则就返回回调函数
      if (rgEmail.test(value)) {
        return cb()
      }
      // 如果校验失败将调用回调函数并传递一个错误对象
      cb(new Error('您输入的邮箱不合法!'))
    }

    /**
     * 自定义校验规则 ，手机号验证
     * @param rules
     * @param value
     * @param cb
     */
    let checkTel = (rules, value, cb) => {
      const rgTel = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/

      // 如果校验通过将返回回调函数
      if (rgTel.test(value)) return cb()

      cb(new Error('您输入的手机号不合法!'))
    }

    /**
     * 判断当前用户填写的 商场门编号是否有重复
     * @param rules
     * @param value
     * @param cb
     */
    let checkEquipmentDoorNum = (rules, value, cb) => {
      // 遍历 设备数组
      this.equipmentList.forEach(item => {
        if (item.doorNum !== this.doorNum) {
          console.log(value)
          return cb()
        }
        cb(new Error('您输入的商场编号不可重复!'))
      })
    }

    return {
      // 接收 后端返回的项目实体集合
      projectList: [],
      queryInfo: {
        projectName: '',
        merchantName: '',
        linkmanName: '',
        linkmanTel: '',
        linkmanSex: '',
        area: '',
        startTime: '',
        endTime: '',
        pageNo: 1,
        pageSize: 2
      },
      // 返回数据的总数
      total: 0,
      // 控制添加项目对话框的打开与关闭
      addProjectDialogVisible: false,
      addProjectForm: {
        merchantName: '',
        merchantId: '',
        projectName: '',
        province: '',
        city: '',
        area: '',
        address: '',
        linkmanName: '',
        linkmanDuty: '',
        linkmanSex: 0,
        linkmanPhone: '',
        linkmanEmail: '',
        accessName: '',
        accessPhone: '',
        pointCount: 0
        // 添加设备的对象
      },
      equipmentList: [
        {
          doorNum: '',
          equipmentNum: ''
        }
      ],
      addProjectFormRules: {
        projectName: [
          { required: true, message: '请输入项目名称!', blur }
          // { min: 0, max: 10, message: '项目名称不能超过10个字符', trigger: ['blur', 'change'] }
        ],
        merchantId: [
          { required: true, message: '选择商家', blur }
        ],
        province: [
          { required: true, message: '请选择项目地址', blur }
        ],
        address: [
          { required: true, message: '请填写项目的具体地址', blur },
          { min: 0, max: 30, message: '具体地址不能超过30个字符', blur }
        ],
        linkmanName: [
          { required: true, message: '请输入联系人姓名', blur }
        ],
        linkmanDuty: [
          { required: true, message: '请输入联系人职务', blur },
          { min: 0, max: 15, message: '职务不能超过15个字符', blur }
        ],
        linkmanPhone: [
          { required: true, message: '请输入联系人电话', blur },
          { validator: checkTel, message: '您输入的电话格式不合法!', blur }
        ],
        linkmanEmail: [
          { required: true, message: '请输入联系人邮箱', blur },
          { validator: checkEmail, message: '您输入的邮箱格式不合法!', blur }
        ],
        accessName: [
          { required: true, message: '请输入我方联系人姓名', blur }
        ],
        accessPhone: [
          { required: true, message: '请输入我方联系人电话', blur },
          { validator: checkTel, message: '您输入的电话格式不合法!', blur }
        ]
      },
      cityOptions: regionData,
      // 接收获取到的商家信息
      merchantInfo: [],
      // 城市json数据对象
      brand: brand,
      // 当选择表格多选时存储被选择的对象
      selectedProjectObj: [],
      // 用于控制项目详情对话框的显示与隐藏
      projectDetailDialogVisible: false,
      // 接收项目详情的对象
      showProjectDetail: {},
      // 接收 设备详情 信息的对象
      showEquipmentDetail: [],
      // 添加设备的表单验证规则
      addEquipmentFormRules: {
        doorNum: [
          { validator: checkTel, message: '设备编号不能重复', trigger: 'change' }
        ]
      },
      // 获取到当前正在输入的 商场门编号
      doorNum: '',
      // 获取到当前正在输入的 设备编号
      equipmentNum: '',
      // 获取详情中接收到的 项目地址数组
      showProjectDetailCity: [],
      // 控制修改项目对话框的实现与隐藏
      editProjectDialogVisible: false,
      // 修改项目需要提交的 项目对象
      editProjectForm: {},
      // 修改设备 需要提交的对象数组
      editEquipmentList: [
        {
          doorNum: '',
          equipmentNum: ''
        }
      ],
      // 编辑项目表单验证数组
      editProjectFormRules: {
        projectName: [
          { required: true, message: '请输入项目名称!', blur }
          // { min: 0, max: 10, message: '项目名称不能超过10个字符', trigger: ['blur', 'change'] }
        ],
        merchantId: [
          { required: true, message: '选择商家', blur }
        ],
        province: [
          { required: true, message: '请选择项目地址', blur }
        ],
        address: [
          { required: true, message: '请填写项目的具体地址', blur },
          { min: 0, max: 30, message: '具体地址不能超过30个字符', blur }
        ],
        linkmanName: [
          { required: true, message: '请输入联系人姓名', blur }
        ],
        linkmanDuty: [
          { required: true, message: '请输入联系人职务', blur },
          { min: 0, max: 15, message: '职务不能超过15个字符', blur }
        ],
        linkmanPhone: [
          { required: true, message: '请输入联系人电话', blur },
          { validator: checkTel, message: '您输入的电话格式不合法!', blur }
        ],
        linkmanEmail: [
          { required: true, message: '请输入联系人邮箱', blur },
          { validator: checkEmail, message: '您输入的邮箱格式不合法!', blur }
        ],
        accessName: [
          { required: true, message: '请输入我方联系人姓名', blur }
        ],
        accessPhone: [
          { required: true, message: '请输入我方联系人电话', blur },
          { validator: checkTel, message: '您输入的电话格式不合法!', blur }
        ]
      },
      // 修改对话框中 地址 属性数组
      editProjectAddressArr: [],
      // 保存搜索时间段的数组
      dates: [],
      // 控制搜索框的折叠与展开
      isExpand: false,
      // 搜索栏 存储选择的项目地址
      searchAddressArr: []
    }
  },
  methods: {
    getProjectList () {
      getProjectList(this.queryInfo).then(res => {
        if (res.code !== 200) return this.$message.error('请求项目列表数据失败!')
        // 如果请求成功 将数据赋值给 data域中的数据 projectList
        this.projectList = res.result.projectList
        this.total = res.result.total
      })
    },

    /**
     * 监听 每页显示条数的改变
     * @param newSize
     */
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getProjectList()
    },

    /**
     * 监听页码的改变
     * @param newPage
     */
    handleCurrentChange (newPage) {
      this.queryInfo.pageNo = newPage
      this.getProjectList()
    },

    openAddProjectDialog () {
      this.getMerchantList()
      this.addProjectDialogVisible = true
    },

    /**
     * 选择地址之后触发的事件方法
     * */
    chooseProjectAddress (addressArr) {
      // 当地址发生改变的时候将 每个地址的代码赋值给每一个对象的属性
      cityArrayToString(this.addProjectForm, addressArr)
      cityArrayToString(this.editProjectForm, addressArr)
    },

    /**
     * 在项目表单中获取商家信息
     */
    getMerchantList () {
      getMerchantListToProject().then(res => {
        this.merchantInfo = res.result
      })
    },

    /**
     * 当选择商家下拉列表发生改变时 触发该事件
     */
    addSelectMerchant (merchant) {
      // 将商家的 名称复制给 提交的表单对象
      this.addProjectForm.merchantName = merchant.companyName
      this.addProjectForm.merchantId = merchant.id
    },

    /**
     * 当添加 项目的对话框关闭的时候 触发的事件
     */
    addProjectDialogClosed () {
      this.$refs.addProjectFormRef.resetFields()
      // 需要将 设备数组清除
      this.equipmentList = [
        {
          doorNum: '',
          equipmentNum: ''
        }
      ]
    },

    /**
     * 提交添加项目表单到后端服务器
     */
    commitAddProjectForm () {
      // 进行表单的预验证
      this.$refs.addProjectFormRef.validate(async valid => {
        if (!valid) return
        // 如果表单验证通过之后才能进行提交
        // console.log(this.addProjectForm)
        let param = {}

        // 检查 添加设备对象数组中是否有空项
        let newEquipmentList = checkEquipmentInput(this.equipmentList)

        // 去空的之后计算出当前点位的数量  点位数量就是 设备数组对象的长度
        this.addProjectForm.pointCount = newEquipmentList.length
        param.project = this.addProjectForm
        param.equipmentList = newEquipmentList
        saveProject(param).then(res => {
          // console.log(res)
          if (res.code !== 200) return this.$message.error('添加项目失败!')
          // 否则添加项目成功!
          // 1. 关闭添加对话框
          this.addProjectDialogVisible = false
          // 2. 提示消息
          this.$message.success('添加成功!')
          // 3. 刷新
          this.getProjectList()
        })
      })
    },

    /**
     * 根据项目id删除项目
     * @param projectId
     */
    async deleteProjectById (projectId) {
      const result = await this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      // 判断当前用户选择的是哪个按钮
      if (result === 'cancel') {
        return this.$message.info('您已取消了删除!')
      } else {
        // 否则就是点击了确定按钮 就需要进行删除操作
        deleteProjectById(projectId).then(res => {
          if (res.code !== 200) return this.$message.error('您删除项目失败!')
          this.$message.success('您删除项目成功!')
          // 刷新界面
          this.getProjectList()
        })
      }
    },

    /**
     * 当选择改变的时候触发该方法
     * @param obj
     */
    tableSelected (obj) {
      this.selectedProjectObj = obj
    },

    /**
     * 根据 ids 集合 删除选中的项目
     */
    async deleteProjectByIds () {
      // 判断当前的数组是否为空
      if (!this.selectedProjectObj) {
        return this.$message.error('请先选择你需要删除的项!')
      }
      const result = await this.$confirm('此操作将永久删除您所选中的商家, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      // 判断用户选择的 是确定按钮还是取消按钮
      if (result === 'cancel') return this.$message.info('您已取消删除!')

      // 遍历数组将其存入到新数组中
      let projectIds = []
      this.selectedProjectObj.forEach(item => {
        projectIds.push(item.id)
      })

      // 发送请求进行 批量删除
      deleteProjectByIds(projectIds).then(res => {
        // console.log(res)
        if (res.code !== 200) return this.$message.error('删除失败!')
        // 删除成功之后 :
        this.getProjectList()
      })
    },

    /**
     * 城市选择器改变之后触发的事件
     */
    projectAddressChange (cityArray) {
      if (this.searchAddressArr && this.searchAddressArr.length > 0) {
        this.queryInfo.area = this.searchAddressArr[2]
        this.queryInfo.pageNo = 1
      }
    },

    /**
     * 当点击了 查看详情按钮之后打开展示详情对话框 并将当前行的项目数据传递过去
     * @param project
     */
    showProjectDetailDialog (project) {
      // 请求获取 当前的 项目 和 设备列表
      getProjectAndEquipmentList(project.id).then(res => {
        if (res.code !== 200) return this.$message.error('查询项目信息失败!')
        // 项目对象
        this.showProjectDetail = res.result.project
        // 设备列表对象
        this.showEquipmentDetail = res.result.equipmentList
        this.showProjectDetailCity = cityStringToArray(res.result.project.province, res.result.project.city, res.result.project.area)
        this.projectDetailDialogVisible = true
      })
    },

    /**
     * 删除 添加 点位信息输入框
     * @param equipment
     */
    removeAddDomain (equipment) {
      let index = this.equipmentList.indexOf(equipment)
      if (index !== -1) {
        this.equipmentList.splice(index, 1)
      }
    },

    /**
     * 新增 添加 点位信息输入框
     */
    addAddDomain () {
      this.equipmentList.push(
        {
          doorNum: '',
          equipmentNum: ''
        }
      )
    },

    /**
     * 删除 修改 点位信息输入框
     * @param equipment
     */
    removeEditDomain (equipment) {
      let index = this.editEquipmentList.indexOf(equipment)
      if (index !== -1) {
        this.editEquipmentList.splice(index, 1)
      }
    },

    /**
     * 新增 修改 点位信息输入框
     */
    addEditDomain () {
      this.editEquipmentList.push(
        {
          doorNum: '',
          equipmentNum: ''
        }
      )
    },

    /**
     * 获取当前输入框的值
     * @param doorNum
     */
    getDoorNum (doorNum) {
      this.doorNum = doorNum
    },

    /**
     * 获取当前正在输入的 设备编号
     * @param equipmentNum
     */
    getEquipmentNum (equipmentNum) {
      this.equipmentNum = equipmentNum
    },

    /**
     * 提交 修改项目之后的对象
     */
    commitEditProjectForm () {
      // 进行修改表单之前的预验证
      this.$refs.editProjectFormRef.validate(valid => {
        if (!valid) return this.$message.error('请完善表单之后在提交!')

        /** 存在的问题 ：当用户 添加多个设备输入框的时候 可能有空对象
         * 也进行了提交 ， 编写一个数组对未填写的对象进行移除操作
         **/
        let newEditEquipmentList = checkEquipmentInput(this.editEquipmentList)
        console.log(newEditEquipmentList)
        // 定义一个临时的对象 存储需要传递到后端的对象
        this.addProjectForm.pointCount = newEditEquipmentList.length
        let param = {}
        param.project = this.editProjectForm
        param.equipmentList = newEditEquipmentList
        saveProject(param).then(res => {
          if (res.code !== 200) return this.$message.error('修改失败失败')
          this.editProjectDialogVisible = false
          this.$message.success('修改成功!')
          // 刷新界面
          this.getProjectList()
        })
      })
    },

    /**
     * 当编辑项目对话框关闭的时候 触发的事件
     */
    editProjectDialogClosed () {

    },

    /**
     * 打开编辑项目对话框
     */
    showEditProjectDialog (project) {
      // 获取商家信息
      this.getMerchantList()
      // 请求当前对应id的数据
      getProjectAndEquipmentList(project.id).then(res => {
        if (res.code !== 200) return this.$message.error('请求数据失败!')
        this.editProjectForm = res.result.project
        this.editEquipmentList = res.result.equipmentList
        // 处理返回的地址
        this.editProjectAddressArr = cityStringToArray(
          this.editProjectForm.province,
          this.editProjectForm.city,
          this.editProjectForm.area)
      })

      this.editProjectDialogVisible = true
    },

    /**
     * 当选择商家对话框发生改变的时候触发的事件
     * @param merchant
     */
    editSelectMerchant (merchant) {
      this.editProjectForm.merchantName = merchant.companyName
      this.editProjectForm.merchantId = merchant.id
    },

    /**
     * 重置搜索框 并发送新的请求
     */
    resetQueryInfoBtnClick () {
      this.$refs.queryInfoRef.resetFields()
      this.dates = []
      this.searchAddressArr = []
      this.queryInfo.area = ''
      this.queryInfo.startTime = ''
      this.queryInfo.endTime = ''
      this.getProjectList()
    },

    /**
     * 当日期选择器改变的时候触发该事件
     * @param timeArray
     */
    searchTimeChange (timeArray) {
      // 当时间选择框发生改变的时候触发该事件 ，将时间数组转换为字符串
      // console.log(this.moment(new Date(timeArray[1])).format('YYYY-MM-DD'));
      if (this.dates && this.dates.length > 0) {
        this.queryInfo.startTime = this.dates[0]
        this.queryInfo.endTime = this.dates[1]
      }
    }
  },

  created () {
    this.getProjectList()
  }
}
</script>

<style scoped>
  .form_width {
    width: 100%;
  }

  .search_input {
    width: 200px;
  }

  .search_date {
    width: 200px;
  }

  .expand-icon {
    cursor: pointer;
  }
</style>
