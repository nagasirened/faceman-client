<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备巡检列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 搜索框 + 添加按钮 -->
      <el-row :gutter="30">
        <el-col :span="8">
          <el-input placeholder="请输公司名称">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>

        <el-col :span="2">
          <el-button type="primary">巡检申请</el-button>
        </el-col>

        <el-col :span="2">
          <el-button type="danger">删除选中</el-button>
        </el-col>
      </el-row>

      <el-table
        :data="equipmentInspectionList"
        width="100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          prop="companyName"
          label="公司"
          width="120">

        </el-table-column>

        <el-table-column
          prop="projectName"
          label="项目"
          width="120">
        </el-table-column>

        <el-table-column
          prop="cityId"
          label="城市"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="area"
          label="区域"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="pointCount"
          label="点位数量"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="pointLocation"
          label="点位位置"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="deviceId"
          label="设备编号"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="deviceState"
          label="设备运行状态"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="equipmentOperation"
          label="设备维修情况"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="inspectionDate"
          label="巡检日期"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="inspector"
          label="巡检人"
          show-overflow-tooltip>
        </el-table-column>

        <!--操作列开始-->
        <el-table-column
          label="操作"
          header-align="center"
          show-overflow-tooltip
          width="180px">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini"/>
            <!--enterable="false" 表示禁止鼠标进入到提示框内-->
            <el-tooltip effect="light" content="详情" placement="top" :enterable="false">
              <el-button type="success" icon="el-icon-view" size="mini"/>
            </el-tooltip>
            <el-button type="danger" icon="el-icon-delete" size="mini"/>
          </template>
        </el-table-column>
        <!--操作列结束-->
      </el-table>

      <!--分页组件-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="2"
        layout="total,sizes, prev, pager, next, jumper"
        :total="8">
      </el-pagination>

    </el-card>
  </div>
</template>

<script>
export default {
  name: 'equipmentList-inspection',
  data () {
    return {
      equipmentInspectionList: [
        {
          companyName: '万科股份',
          projectName: '重庆永川项目',
          province: '重庆市',
          area: '永川区',
          pointCount: '10',
          pointLocation: '渝西广场',
          deviceId: '1022556',
          deviceState: true,
          equipmentOperation: '未维修',
          inspectionDate: new Date().getFullYear(),
          inspector: '张华'
        },
        {
          companyName: '万科股份',
          projectName: '重庆永川项目',
          province: '重庆市',
          area: '永川区',
          pointCount: '10',
          pointLocation: '渝西广场',
          deviceId: '1022556',
          deviceState: true,
          equipmentOperation: '未维修',
          inspectionDate: new Date().getFullYear(),
          inspector: '张华'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
