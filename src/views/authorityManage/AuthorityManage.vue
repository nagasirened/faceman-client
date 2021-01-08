<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理列表</el-breadcrumb-item>
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
          <el-button type="info">删除选中</el-button>
        </el-col>
      </el-row>

      <el-table
        width="100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          prop="companyName"
          label="公司名称"
          width="120">

        </el-table-column>

        <el-table-column
          prop="projectName"
          label="项目名称"
          width="120">
        </el-table-column>

        <el-table-column
          prop="cityId"
          label="城市名称"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="area"
          label="区域名称"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="address"
          label="具体地址"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="linkmanName"
          label="联系人姓名"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="linkmanPhone"
          label="联系人电话"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="linkmanSex"
          label="联系人性别"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="linkmanEmail"
          label="联系人邮箱"
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
  name: 'authority-manage'
}
</script>

<style scoped>

</style>
