<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商家管理</el-breadcrumb-item>
      <el-breadcrumb-item>商家管理列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">

      <!--条件搜索框-->
      <el-row>
        <el-col :span="24">
          <el-form
            label-position="top"
            ref="queryInfoRef"
            :inline="true"
            :model="queryInfo">

            <el-collapse-transition >
              <el-row v-if="isExpand">

                <el-col :span="6">
                  <el-form-item size="small" label="联系人电话" prop="contactTel">
                    <el-input
                      class="search_input"
                      clearable
                      v-model="queryInfo.contactTel"
                      placeholder="联系人电话"/>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item size="small" label="性别" prop="contactSex">
                    <el-select
                      class="search_input"
                      clearable
                      v-model="queryInfo.contactSex"
                      placeholder="性别" value="">
                      <el-option label="男" :value="0"/>
                      <el-option label="女" :value="1"/>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item size="small" label="合作开始时间">
                    <el-date-picker
                      class="search_date"
                      v-model="datesStart"
                      @change="searchStartTimeChange"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item size="small" label="合作结束时间">
                    <el-date-picker
                      class="search_date"
                      v-model="datesEnd"
                      @change="searchEndTimeChange"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-transition>

            <el-row>

              <el-col :span="6">
                <el-form-item label="公司名称" size="small" prop="companyName">
                  <el-input
                    class="search_input"
                    clearable
                    v-model="queryInfo.companyName"
                    placeholder="公司名称"/>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item size="small" label="联系人姓名" prop="contactName">
                  <el-input
                    class="search_input"
                    clearable
                    v-model="queryInfo.contactName"
                    placeholder="联系人姓名"/>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item size="small" label="公司地址">
                  <el-cascader
                    class="search_input"
                    v-model="areaArray"
                    @change="companyAddressChange"
                    placeholder="公司地址"
                    clearable
                    :options="cityOptions"> <!--@change="handleChange"-->
                  </el-cascader>
                </el-form-item>

                <!--折叠展开按钮开始--> <!--expand-icon iconfont icon-yijianshouqi-->
                <i @click="isExpand = !isExpand" style="background-color: #eae6ee;"
                   :class="['expand-icon',isExpand ? 'iconfont  icon-shouqi':'iconfont  icon-xiala']"></i>
                <!--折叠展开按钮开始-->
              </el-col>

              <el-col :span="6" style="margin: 41px 0 0 0">

                <el-form-item size="small">
                  <el-button
                    type="primary"
                    @click="getMerchantManage">查询
                  </el-button>
                  <el-button
                    type="success"
                    @click="resetQueryInfoBtnClick">重置
                  </el-button>
                  <el-button size="small" type="primary" @click="addMerchantDialog()">添加商家</el-button>
                  <el-button size="small" type="danger" :disabled="merchantSelectedIds.length === 0"
                             @click="deleteBatchMerchantById">删除选中
                  </el-button>
                </el-form-item>

              </el-col>

            </el-row>

          </el-form>

        </el-col>
      </el-row>

      <!--表格开始-->
      <el-table
        ref="multipleTable"
        :data="merchantManage"
        tooltip-effect="dark"
        style="width: 100%;height: 100%;"
        @selection-change="tableSelected">

        <el-table-column
          type="selection"
          width="55"
          align="center">
        </el-table-column>

        <el-table-column
          type="expand"
          width="55"
          align="center">
        </el-table-column>

        <el-table-column
          prop="companyName"
          label="公司名称"
          width="120"
          align="center">

        </el-table-column>

        <el-table-column
          label="营业执照"
          width="120"
          align="center">
          <template slot-scope="scope">
            <el-image style="width: 35px;" :src="scope.row.businessImg"/>
          </template>
        </el-table-column>

        <el-table-column
          label="城市名称"
          show-overflow-tooltip
          align="center">
          <template slot-scope="scope">
            {{brand["86"][scope.row.province]}}/
            {{brand[scope.row.province][scope.row.city]}}
          </template>
        </el-table-column>

        <el-table-column
          label="区域名称"
          show-overflow-tooltip
          align="center">
          <template slot-scope="scope">
            {{brand[scope.row.city][scope.row.area]}}
          </template>
        </el-table-column>

        <el-table-column
          prop="specificAddress"
          label="具体地址"
          show-overflow-tooltip
          align="center">
        </el-table-column>

        <el-table-column
          prop="contactName"
          label="联系人姓名"
          show-overflow-tooltip
          align="center">
        </el-table-column>

        <el-table-column
          prop="contactTel"
          label="联系人电话"
          show-overflow-tooltip
          align="center">
        </el-table-column>

        <el-table-column
          label="联系人性别"
          show-overflow-tooltip
          align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.contactSex === 0">
              男
            </el-tag>
            <el-tag type="danger" v-else>
              女
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="contactEmail"
          label="联系人邮箱"
          show-overflow-tooltip
          align="center">
        </el-table-column>

        <!--操作列开始-->
        <el-table-column
          label="操作"
          header-align="center"
          show-overflow-tooltip
          width="180px">
          <template slot-scope="scope">
            <el-button type="primary" @click="showEditMerchantDialog(scope.row)" icon="el-icon-edit" size="mini"/>
            <!--enterable="false" 表示禁止鼠标进入到提示框内-->
            <el-tooltip
              effect="light"
              content="详情"
              placement="top"
              :enterable="false">
              <el-button type="success" icon="el-icon-view" size="mini" @click="merchantDetailBtn(scope.row.id)"/>
            </el-tooltip>
            <el-button type="danger" icon="el-icon-delete" @click="deleteMerchantById(scope.row.id)" size="mini"/>
          </template>
        </el-table-column>
      </el-table>
      <!--操作列结束-->
      <!--表格结束-->

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

      <!--添加商家Dialog 开始-->
      <!-- :close-on-click-modal="false" 点在 dialog外边 dialog 不关闭-->
      <el-dialog
        title="添加商家"
        :visible.sync="addMerchant"
        width="40%"
        :close-on-click-modal="false"
        @close="addMerchantDiaLogClosed">
        <el-form
          label-position="left"
          :model="addMerchantForm"
          :rules="addMerchantRules"
          ref="addMerchantFormRef"
          label-width="120px">
          <el-form-item label="商家名称" prop="companyName">
            <el-input placeholder="请输入商家名称" v-model="addMerchantForm.companyName" clearable/>
          </el-form-item>

          <!--头像上传开始 prop="businessImg" 这里暂时不设置表单验证 -->
          <el-form-item label="营业执照" prop="businessImg">
            <el-upload
              ref="upload"
              action="/web/upload/businessImg"
              name="businessImg"
              list-type="picture-card"
              :limit="1"
              :file-list="fileList"
              :on-exceed="onExceed"
              :before-upload="beforeUpload"
              :on-preview="handlePreview"
              :on-success="handleSuccess"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="uploadBusinessImg">
              <img width="100%" :src="dialogBusinessImgUrl" alt="">
            </el-dialog>
          </el-form-item>
          <!--头像上传结束-->

          <!--地区选择-->
          <el-form-item
            prop="city"
            label="公司地址">
            <el-cascader
              v-model="addCityArr"
              placeholder="请选择公司地址"
              size="large"
              :options="cityOptions"
              @change="chooseCompanyAddress">
              <!--@change="handleChange"-->
            </el-cascader>
          </el-form-item>
          <!--地区选择-->

          <el-form-item label="具体地址" prop="specificAddress">
            <el-input v-model="addMerchantForm.specificAddress" clearable/>
          </el-form-item>

          <!--联系人姓名-->
          <el-form-item label="联系人姓名" prop="contactName">
            <el-input v-model="addMerchantForm.contactName" clearable/>
          </el-form-item>

          <!--联系人性别-->
          <el-form-item label="联系人性别">
            <el-radio-group v-model="addMerchantForm.contactSex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>

          <!--联系人电话-->
          <el-form-item prop="contactTel" label="联系人电话">
            <el-input v-model="addMerchantForm.contactTel" clearable/>
          </el-form-item>

          <!--联系人职务-->
          <el-form-item prop="contactJob" label="联系人职务">
            <el-input v-model="addMerchantForm.contactJob" clearable/>
          </el-form-item>

          <!--联系人邮箱-->
          <el-form-item prop="contactEmail" label="联系人邮箱">
            <el-input v-model="addMerchantForm.contactEmail" clearable/>
          </el-form-item>

          <!--合作日期-->
          <el-form-item label="合作日期">
            <div class="block">
              <el-date-picker
                v-model="cooperationTime"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                type="daterange"
                unlink-panels
                @change="chooseTimeRange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </el-form-item>

          <!--我方联系人姓名-->
          <el-form-item prop="ourMatchmakerName" label="我方联系人姓名">
            <el-input v-model="addMerchantForm.ourMatchmakerName" clearable/>
          </el-form-item>

          <!--我方联系人电话-->
          <el-form-item prop="ourMatchmakerTel" label="我方联系人电话">
            <el-input v-model="addMerchantForm.ourMatchmakerTel" clearable/>
          </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="addMerchant = false">取 消</el-button>
            <el-button type="primary" @click="commitMerchantDialogForm">确 定</el-button>
        </span>
      </el-dialog>
      <!--添加商家Dialog 结束-->

      <!--商家详情开始-->
      <el-dialog
        title="商家详情"
        :visible.sync="merchantDetailVisible"
        width="40%"
        @close="merchantDetailDialogClosed"
        :close-on-click-modal="false">
        <el-form
          label-position="left"
          :model="merchantDetailForm"
          ref="merchantDetailFormRef"
          label-width="120px">
          <el-form-item label="商家名称">
            <el-input placeholder="请输入商家名称" disabled v-model="merchantDetailForm.companyName"/>
          </el-form-item>

          <!--头像上传开始-->
          <el-form-item label="营业执照">
            <div class="block">
              <el-image style="width: 100px;" :src="merchantDetailForm.businessImg"/>
            </div>
          </el-form-item>
          <!--头像上传结束-->

          <!--地区选择-->
          <el-form-item label="公司地址">
            <el-input disabled v-model="companyAddress"/>
          </el-form-item>
          <!--地区选择-->

          <el-form-item label="具体地址">
            <el-input
              disabled
              v-model="merchantDetailForm.specificAddress"/>
          </el-form-item>

          <!--联系人姓名-->
          <el-form-item label="联系人姓名">
            <el-input disabled v-model="merchantDetailForm.contactName"/>
          </el-form-item>

          <!--联系人性别-->
          <el-form-item label="联系人性别">
            <el-radio-group disabled v-model="merchantDetailForm.contactSex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>

          <!--联系人电话-->
          <el-form-item label="联系人电话">
            <el-input disabled v-model="merchantDetailForm.contactTel"/>
          </el-form-item>

          <!--联系人职务-->
          <el-form-item label="联系人职务">
            <el-input disabled v-model="merchantDetailForm.contactJob"/>
          </el-form-item>

          <!--联系人邮箱-->
          <el-form-item label="联系人邮箱">
            <el-input disabled v-model="merchantDetailForm.contactEmail"/>
          </el-form-item>

          <!--合作日期-->
          <el-form-item label="合作日期">
            <div class="block">
              <el-date-picker
                v-model="cooperationTimeToDetail"
                disabled
                value-format="yyyy-MM-dd"
                type="daterange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </el-form-item>

          <!--我方联系人姓名-->
          <el-form-item label="我方联系人姓名">
            <el-input disabled v-model="merchantDetailForm.ourMatchmakerName"/>
          </el-form-item>

          <!--我方联系人电话-->
          <el-form-item label="我方联系人电话">
            <el-input disabled v-model="merchantDetailForm.ourMatchmakerTel"/>
          </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="merchantDetailVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <!--商家详情结束-->

      <!--修改商家信息开始-->
      <el-dialog
        title="修改商家信息"
        :visible.sync="editMerchantDialogVisible"
        width="40%"
        @close="editMerchantDialogClosed"
        :close-on-click-modal="false">
        <el-form
          :rules="editMerchantRules"
          label-position="left"
          :model="editMerchantForm"
          ref="editMerchantFormRef"
          label-width="120px">
          <!--隐藏域传递id值 -->
          <el-input
            type="hidden"
            v-model="editMerchantForm.id"/>
          <el-form-item label="商家名称">
            <el-input
              disabled
              placeholder="请输入商家名称"
              v-model="editMerchantForm.companyName"
              clearable/>
          </el-form-item>

          <!--营业执照上传开始-->
          <el-form-item label="营业执照" prop="businessImg">
            <el-upload
              ref="upload"
              action="/web/upload/businessImg"
              name="businessImg"
              list-type="picture-card"
              :limit="1"
              :file-list="fileList"
              :on-exceed="onExceed"
              :before-upload="beforeUpload"
              :on-preview="handlePreview"
              :on-success="handleEditMerchantSuccess"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="uploadBusinessImg">
              <img width="100%" :src="dialogBusinessImgUrl" alt="">
            </el-dialog>
          </el-form-item>
          <!--营业执照上传结束-->

          <!--地区选择-->
          <el-form-item label="公司地址" prop="city">
            <el-cascader
              v-model="editCityArr"
              style="width: 100%;"
              placeholder="请选择公司地址"
              size="large"
              clearable
              @change="editMerchantAddressChange"
              :options="cityOptions">
              <!--@change="handleChange"-->
            </el-cascader>
          </el-form-item>
          <!--地区选择-->

          <el-form-item label="具体地址" prop="specificAddress">
            <el-input
              clearable
              v-model="editMerchantForm.specificAddress"/>
          </el-form-item>

          <!--联系人姓名-->
          <el-form-item label="联系人姓名" prop="contactName">
            <el-input
              clearable
              v-model="editMerchantForm.contactName"/>
          </el-form-item>

          <!--联系人性别-->
          <el-form-item label="联系人性别">
            <el-radio-group v-model="editMerchantForm.contactSex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>

          <!--联系人电话-->
          <el-form-item label="联系人电话" prop="contactTel">
            <el-input
              clearable
              v-model="editMerchantForm.contactTel"/>
          </el-form-item>

          <!--联系人职务-->
          <el-form-item label="联系人职务" prop="contactJob">
            <el-input
              clearable
              v-model="editMerchantForm.contactJob"/>
          </el-form-item>

          <!--联系人邮箱-->
          <el-form-item label="联系人邮箱" prop="contactEmail">
            <el-input
              clearable
              v-model="editMerchantForm.contactEmail"/>
          </el-form-item>

          <!--合作日期-->
          <el-form-item label="合作日期">
            <div class="block">
              <el-date-picker
                v-model="cooperationTimeToEdit"
                type="daterange"
                unlink-panels
                clearable
                @change="editMerchantTimeChange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </el-form-item>

          <!--我方联系人姓名-->
          <el-form-item label="我方联系人姓名" prop="ourMatchmakerName">
            <el-input
              clearable
              v-model="editMerchantForm.ourMatchmakerName"/>
          </el-form-item>

          <!--我方联系人电话-->
          <el-form-item label="我方联系人电话" prop="ourMatchmakerTel">
            <el-input
              clearable
              v-model="editMerchantForm.ourMatchmakerTel"/>
          </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editMerchantDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="commitEditMerchantClick">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改商家信息结束-->

    </el-card>

  </div>
</template>

<script>

import {
  commitMerchantEntity,
  deleteMerchantBatchId,
  deleteMerchantById,
  findMerchantByName,
  getMerchantById,
  getMerchantManage
} from '../../api/api'
/* 城市选择器 */
import { regionData } from 'element-china-area-data'

import brand from '../../utils/brand.json'
import { cityArrayToString, cityStringToArray, timeStringToArray } from '../../utils/util'

export default {
  name: 'merchant-manage',
  components: {},
  data () {
    // 自定义验证规则 : 邮箱验证
    let checkEmail = (rules, value, cb) => {
      const rgEmail = /^\w+@\w+(\.\w+)+$/
      // 如果通过了校验规则将返回回调函数
      if (rgEmail.test(value)) {
        return cb()
      }
      // 如果校验失败将 调用回调函数 回调函数中传递一个Error对象
      cb(new Error('邮箱不合法!'))
    }

    // 自定义验证规则 ： 手机号验证
    let checkTel = (rules, value, cb) => {
      const rgTel = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
      // 如果验证通过将返回回调函数
      if (rgTel.test(value)) {
        return cb()
      }

      // 如果校验失败 将调用回调函数，回调函数传递一个Error对象
      cb(new Error('电话号码不合法!'))
    }

    let checkMerchantName = (rules, value, cb) => {
      findMerchantByName(value).then(res => {
        // 判断当前的请求是否发送成功!
        if (res.code !== 200) return

        // 用户不存在
        if (!res.result) return cb()

        // 用户已经存在
        cb(new Error('您输入的商家名称已经存在!'))
        this.$message.error('您输入的商家名称已经存在!')
      })
    }

    return {
      merchantManage: [],
      queryInfo: {
        contactSex: '',
        contactTel: '',
        contactName: '',
        companyName: '',
        // 合作开始时间的开始时间
        startTimeToStart: '',
        // 合作开始时间的结束时间
        endTimeToStart: '',
        // 合作开始时间的开始时间
        startTimeToEnd: '',
        // 合作开始时间的结束时间
        endTimeToEnd: '',
        // 区域id
        area: '',
        pageSize: 2,
        pageNo: 1
      },
      total: 0,
      // 控制添加商家Dialog是否打开
      addMerchant: false,
      // 提交表单的商家数据
      addMerchantForm: {
        companyName: '',
        businessImg: '',
        province: '',
        city: '',
        area: '',
        specificAddress: '',
        contactName: '',
        contactSex: 1,
        contactTel: '',
        contactJob: '',
        contactEmail: '',
        startTime: '',
        endTime: '',
        ourMatchmakerName: '',
        ourMatchmakerTel: ''
      },
      // 存返回前台的公司地址数据
      /* companyAddresses: [],
      // 存储 合作的时间数组
      cooperationTimes: [], */
      // 表单验证 规则数组
      addMerchantRules: {
        companyName: [
          { required: true, message: '请输入商家名称!', blur },
          { validator: checkMerchantName, message: '该商家已经存在!', trigger: 'change' }
        ],
        contactName: [
          { required: true, message: '请输入联系人姓名!', blur },
          { min: 1, max: 8, message: '姓名不能超过8个字符', blur }
        ],
        province: [
          { required: true, message: '请选择公司地址!', blur }
        ],
        specificAddress: [
          { required: true, message: '请填写公司具体地址!', trigger: ['blur', 'change'] }
        ],
        contactTel: [
          { required: true, message: '请输入联系人电话!', blur },
          { validator: checkTel, message: '电话号码不合法!', trigger: blur }
        ],
        businessImg: [
          { required: true, message: '请上传营业执照!', trigger: 'blur' }
        ],
        contactJob: [
          { required: true, message: '请输入联系人职务!', trigger: 'blur' },
          { min: 1, max: 8, message: '职务不能超过8个字符', blur }
        ],
        contactEmail: [
          { required: true, message: '请输入联系人邮箱!', trigger: 'blur' },
          // 使用自定义邮箱验证规则验证邮箱
          { validator: checkEmail, message: '您输入的邮箱格式不合法!', blur }
        ],
        startTime: [
          /* 时间需要监听它的change事件 */
          { required: true, message: '请输入合作时间!', blur }
        ],
        ourMatchmakerName: [
          { required: true, message: '请输入我方联系人姓名!', trigger: 'blur' },
          { min: 1, max: 8, message: '姓名不能超过8个字符', blur }
        ],
        ourMatchmakerTel: [
          { required: true, message: '请输入我方联系人电话!', trigger: 'blur' },
          { validator: checkTel, message: '电话号码不合法!', trigger: blur }
        ],
        city: [
          { required: true, message: '请选择公司地址!', trigger: 'blur' }
        ]
      },
      // 商家详情对象
      merchantDetailForm: {},
      // 控制 商家详情Dialog
      merchantDetailVisible: false,
      // china城市选择器数据
      cityOptions: regionData,
      brand: brand,
      companyAddress: '',
      // 存储返回时间的数组 添加商家时的合作日期
      cooperationTime: [],
      // 商家详情中的合作日期
      cooperationTimeToDetail: [],
      // 修改商家信息
      cooperationTimeToEdit: [],
      // 存储表格中选中的id值
      merchantSelectedIds: [],
      // 根据id批量删除 商家信息按钮是否可用
      isDelBatchMerchantBtn: true,
      // 控制修改商家信息 对话框的显示与隐藏
      editMerchantDialogVisible: false,
      // 修改商家信息 表单对象
      editMerchantForm: {},
      // 添加时 存储 公司地址id的数组
      addCityArr: [],
      // 编辑时 存储 公司地址id的数组
      editCityArr: [],
      // 图片列表（用于在上传组件中回显图片）
      fileList: [],
      // 控制 上传营业执照的 显示与隐藏
      uploadBusinessImg: false,
      // 展示营业执照图片
      dialogBusinessImgUrl: '',
      // 编辑商家信息的 验证规则对象
      editMerchantRules: {
        contactName: [
          { required: true, message: '请输入联系人姓名!', blur },
          { min: 1, max: 8, message: '姓名不能超过8个字符', blur }
        ],
        province: [
          { required: true, message: '请选择公司地址!', blur }
        ],
        specificAddress: [
          { required: true, message: '请填写公司具体地址!', trigger: ['blur', 'change'] }
        ],
        contactTel: [
          { required: true, message: '请输入联系人电话!', blur },
          { validator: checkTel, message: '电话号码不合法!', trigger: blur }
        ],
        businessImg: [
          { required: true, message: '请上传营业执照!', trigger: 'change' }
        ],
        contactJob: [
          { required: true, message: '请输入联系人职务!', trigger: 'blur' },
          { min: 1, max: 8, message: '职务不能超过8个字符', blur }
        ],
        contactEmail: [
          { required: true, message: '请输入联系人邮箱!', trigger: 'blur' },
          // 使用自定义邮箱验证规则验证邮箱
          { validator: checkEmail, message: '您输入的邮箱格式不合法!', blur }
        ],
        startTime: [
          /* 时间需要监听它的change事件 */
          { required: true, message: '请输入合作时间!', blur }
        ],
        ourMatchmakerName: [
          { required: true, message: '请输入我方联系人姓名!', trigger: 'blur' },
          { min: 1, max: 8, message: '姓名不能超过8个字符', blur }
        ],
        ourMatchmakerTel: [
          { required: true, message: '请输入我方联系人电话!', trigger: 'blur' },
          { validator: checkTel, message: '电话号码不合法!', trigger: blur }
        ],
        city: [
          { required: true, message: '请选择公司地址!', trigger: 'blur' }
        ]
      },
      // 存储公司地址的数组
      areaArray: [],
      // 合作开始时间数组
      datesStart: [],
      // 合作结束时间数组
      datesEnd: [],
      isExpand: false
    }
  },
  methods: {
    getMerchantManage () {
      getMerchantManage(this.queryInfo).then(res => {
        // console.info(res)
        if (res.code !== 200) return this.$message.error('获取数据失败!')
        this.merchantManage = res.result.merchantList
        this.total = res.result.total
      }).catch(error => {
        console.error(error.msg)
      })
    },

    /**
     * 监听每页显示条数改变
     * @param newSize
     */
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getMerchantManage()
    },

    /**
     * 监听页码的改变
     * @param newPage
     */
    handleCurrentChange (newPage) {
      this.queryInfo.pageNo = newPage
      this.getMerchantManage()
    },
    addMerchantDialog () {
      this.addMerchant = true
    },

    /**
     *
     * ***************** 添加用户 ****************
     * 点击 添加商家表单的确定按钮执行的事件
     * */
    commitMerchantDialogForm () {
      // 在真正提交表单之前需要进行表单的预验证
      this.$refs.addMerchantFormRef.validate(async valid => {
        // 表单预验证未通过需要 不能进行提交表单
        if (!valid) return
        // 验证通过 ---> 提交表单 发送请求
        commitMerchantEntity(this.addMerchantForm).then(res => {
          // console.log(res)
          if (res.code !== 200) return this.$message.error(res.msg)
          this.$message.success('添加商家成功!')
          this.getMerchantManage()
          this.addMerchant = false
          this.cooperationTime = []
          this.addCityArr = []
        })
      })
    },

    /**
     * 当添加商家的表单被关闭时需要清空表单
     */
    addMerchantDiaLogClosed () {
      // 使用表单引用对象
      this.$refs.addMerchantFormRef.resetFields()
      this.cooperationTime = []
      this.addCityArr = []
    },

    /**
     * 根据 id 删除商家
     */
    async deleteMerchantById (merchantId) {
      const result = await this.$confirm('此操作将永久删除该商家, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      // 如果点击了提示框的确定按钮 将会返回一个 字符串为 confirm 的结果
      // 如果点击了提示框的取消按钮，将会抛出一个异常如果进行捕获异常 将返回一个 cancel的字符串
      // console.log(result)
      if (result !== 'confirm') return this.$message.info('你已取消了删除!')

      deleteMerchantById(merchantId).then(res => {
        if (res.code !== 200) return this.$message.error('删除商家失败!')
        // 查询 商家列表 刷洗页面
        this.getMerchantManage()
        this.$message.success('删除成功!')
      })
    },

    /**
     * 商家详情  查询需要优化 更加人性化
     */
    merchantDetailBtn (merchantId) {
      this.merchantDetailVisible = true
      getMerchantById(merchantId).then(res => {
        // console.log(res)
        this.merchantDetailForm = res.result
        // 拼接处公司地址
        this.companyAddress = this.brand['86'][res.result.province] + '/' +
          this.brand[res.result.province][res.result.city] + '/' +
          this.brand[res.result.city][res.result.area]

        // 在utils.js中定义一个 timeStringToArray 工具函数将时间字符串转化为 时间数组
        this.cooperationTimeToDetail = timeStringToArray(this.merchantDetailForm.startTime, this.merchantDetailForm.endTime)
      })
    },

    /**
     * 合作时间处理 这里将拿到一个格式化后的时间数组
     */
    chooseTimeRange (time) {
      if (time && time.length > 0) {
        // ["2020-07-29", "2020-07-29"]
        this.addMerchantForm.startTime = time[0]
        this.addMerchantForm.endTime = time[1]
      }
    },

    /**
     * 选择公司地址改变的时候执行
     */
    chooseCompanyAddress (address) {
      this.addMerchantForm.province = address[0]
      this.addMerchantForm.city = address[1]
      this.addMerchantForm.area = address[2]
      console.log(this.addCityArr)
    },

    /**
     * 当 选择 公司地址条件  改变时 调用
     */
    companyAddressChange () {
      // 将查询条件中的区域id设置上
      if (this.areaArray && this.areaArray.length > 0) {
        this.queryInfo.area = this.areaArray[2]
        this.queryInfo.pageNo = 1
      }
      // 调用查询方法
      // this.getMerchantManage()
    },

    /**
     * 获取表格多选 选中的商家信息
     */
    tableSelected (val) {
      this.merchantSelectedIds = val
    },

    /**
     * 通过商家的id批量删除
     */
    async deleteBatchMerchantById () {
      // console.log(this.merchantSelectedIds)
      if (!this.merchantSelectedIds) {
        return this.$message.error('请选择您需要删除的项!')
      }

      const result = await this.$confirm('此操作将永久删除您所选中的商家, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (result === 'cancel') {
        return this.$message.info('您已取消了删除!')
      }

      let param = []
      this.merchantSelectedIds.forEach(item => {
        param.push(item.id)
      })
      deleteMerchantBatchId(param).then(res => {
        console.log(res)
        if (res.code !== 200) return this.$message.error(res.msg)

        this.getMerchantManage()
        this.$message.success('删除成功!')
      })
      // 删除完成之后 需将数组清空
      this.merchantSelectedIds = []
    },

    /**
     * 编辑商家信息
     * @param merchant
     */
    showEditMerchantDialog (merchant) {
      this.editMerchantForm = merchant
      // 在fileList中设置返回的图片对象
      this.fileList.push({ name: '', url: merchant.businessImg })
      // 将 时间字符串 转换为  时间数组
      this.cooperationTimeToEdit = timeStringToArray(this.editMerchantForm.startTime, this.editMerchantForm.endTime)
      // 将城市 id 字符串存储到数组中
      this.editCityArr = cityStringToArray(merchant.province, merchant.city, merchant.area)
      this.editMerchantDialogVisible = true
    },

    /**
     * 当编辑商家对话框关闭的时候触发的事件
     * */
    editMerchantDialogClosed () {
      this.fileList = []
      this.$refs.editMerchantFormRef.resetFields()
    },

    /**
     * 当商家详情界面关闭的时候 触发的事件
     */
    merchantDetailDialogClosed () {
      // 清空保存时间的数组
      this.cooperationTimeToDetail = []
    },

    /**
     * 上传文件超出个数时的钩子函数
     */
    onExceed () {
      this.$message.info('最多只能上传一个文件!')
    },

    /**
     *  文件上传前的前的钩子函数
     *参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
     * @param file
     * @returns {boolean}
     */
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isGIF = file.type === 'image/gif'
      const isPNG = file.type === 'image/png'
      const isBMP = file.type === 'image/bmp'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return (isJPG || isBMP || isGIF || isPNG) && isLt2M
    },

    /**
     * 点击列表中已上传的文件事件的钩子函数
     * @param file
     */
    handlePreview (file) {
      this.uploadBusinessImg = true
      this.dialogBusinessImgUrl = file.url
    },

    /**
     * 删除文件之前的钩子函数
     * @param file
     * @param fileList
     */
    handleRemove (file, fileList) {
      this.$message.info('已删除原有图片!')
    },

    // 文件上传成功的钩子函数
    handleSuccess (res, file) {
      this.$message.success('图片上传成功！')
      // 图片上传成功之后将上传之后的路径 赋值给 对象属性
      if (res.code === 200) {
        this.addMerchantForm.businessImg = res.result
      }
    },

    /**
     * 当编辑商家营业执照 成功的时候触发该函数
     * @param res
     * @param file
     */
    handleEditMerchantSuccess (res, file) {
      this.$message.success('修改商家营业执照成功！')

      if (res.code === 200) {
        this.editMerchantForm.businessImg = res.result
      }
    },

    /**
     * 提交修改商家信息的单击事件
     */
    commitEditMerchantClick () {
      console.log(this.editMerchantForm)

      this.$refs.editMerchantFormRef.validate(valid => {
        if (!valid) return this.$message.error('请完善你的表单!')
        commitMerchantEntity(this.editMerchantForm).then(res => {
          if (res.code !== 200) return this.$message.error('修改商家信息失败!')

          this.$message.success('修改商家信息成功!')

          this.editMerchantDialogVisible = false
          this.getMerchantManage()
        })
      })
    },

    /**
     * 当 修改商家信息 中商家地址的时候触发该事件
     */
    editMerchantAddressChange (addressArr) {
      cityArrayToString(this.editMerchantForm, addressArr)
    },

    /**
     * 当编辑商家时间下拉框发生改变的时候触发
     * */
    editMerchantTimeChange () {
      if (this.cooperationTimeToEdit && this.cooperationTimeToEdit.length > 0) {
        this.editMerchantForm.startTime = this.cooperationTimeToEdit[0]
        this.editMerchantForm.endTime = this.cooperationTimeToEdit[1]
      }

      console.log(this.editMerchantForm.startTime)
      console.log(this.cooperationTimeToEdit)
    },

    /**
     * 重置查询条件按钮事件
     */
    resetQueryInfoBtnClick () {
      this.$refs.queryInfoRef.resetFields()
      this.datesStart = []
      this.datesEnd = []
      this.areaArray = []
      this.queryInfo.area = ''
      this.queryInfo.startTimeToStart = ''
      this.queryInfo.endTimeToStart = ''
      this.queryInfo.startTimeToEnd = ''
      this.queryInfo.endTimeToEnd = ''
      this.getMerchantManage()
    },

    /**
     * 当搜索的时间段发生改变的时候触发该事件
     */
    searchStartTimeChange (timeArray) {
      if (this.datesStart && this.datesStart.length > 0) {
        this.queryInfo.startTimeToStart = this.datesStart[0]
        this.queryInfo.endTimeToStart = this.datesStart[1]
      }
    },

    /**
     * 当合作的结束时间发生改变的时候触发
     */
    searchEndTimeChange (timeArray) {
      if (this.datesEnd && this.datesEnd.length > 0) {
        this.queryInfo.startTimeToEnd = this.datesEnd[0]
        this.queryInfo.endTimeToEnd = this.datesEnd[1]
      }
    }

  },
  created () {
    this.getMerchantManage()
  }
}
</script>

<style scoped>

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
