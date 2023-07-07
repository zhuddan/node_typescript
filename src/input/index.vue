<template>
  <div class="app-container">
    <el-form
      v-show="showSearch"
      ref="queryForm"
      :model="queryParams"
      size="small"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="${comment}" prop="deptId">
        <el-input
          v-model="queryParams.deptId"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数据源名称" prop="sourceName">
        <el-input
          v-model="queryParams.sourceName"
          placeholder="请输入数据源名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代码" prop="sourceCode">
        <el-input
          v-model="queryParams.sourceCode"
          placeholder="请输入代码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单位" prop="sourceUnit">
        <el-input
          v-model="queryParams.sourceUnit"
          placeholder="请输入单位"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="sort">
        <el-input
          v-model="queryParams.sort"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['business:source:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['business:source:edit']"
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['business:source:remove']"
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['business:source:export']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          >导出</el-button
        >
      </el-col>
      <right-toolbar :show-search.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="sourceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="id" />
      <el-table-column label="${comment}" align="center" prop="deptId" />
      <el-table-column label="数据源名称" align="center" prop="sourceName" />
      <el-table-column label="代码" align="center" prop="sourceCode" />
      <el-table-column label="单位" align="center" prop="sourceUnit" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="${comment}" align="center" prop="sort" />
      <el-table-column label="操作" align="center" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['business:source:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            >修改</el-button
          >
          <el-button
            v-hasPermi="['business:source:remove']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改数据源对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="50%" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="${comment}" prop="deptId">
              <el-input v-model="form.deptId" placeholder="请输入${comment}" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="数据源名称" prop="sourceName">
              <el-input v-model="form.sourceName" placeholder="请输入数据源名称" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="代码" prop="sourceCode">
              <el-input v-model="form.sourceCode" placeholder="请输入代码" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="单位" prop="sourceUnit">
              <el-input v-model="form.sourceUnit" placeholder="请输入单位" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="${comment}" prop="sort">
              <el-input v-model="form.sort" placeholder="请输入${comment}" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" icon="el-icon-edit" :loading="btnLoading" @click="submitForm"
          >确 定</el-button
        >
        <el-button icon="el-icon-close" @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { listSource, getSource, delSource, addSource, updateSource } from '@/api/business/source';

  import { download } from '@/utils/request';

  export default {
    name: 'Source',
    data() {
      return {
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 数据源表格数据
        sourceList: [],
        // 弹出层标题
        title: '',
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          deptId: null,
          sourceName: null,
          sourceCode: null,
          sourceUnit: null,
          sort: null,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {},
        btnLoading: false,
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询数据源列表 */
      getList() {
        this.loading = true;
        listSource(this.queryParams).then((response) => {
          this.sourceList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          deptId: null,
          sourceName: null,
          sourceCode: null,
          sourceUnit: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
          remark: null,
          sort: null,
        };
        this.resetForm('form');
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm('queryForm');
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map((item) => item.id);
        this.single = selection.length !== 1;
        this.multiple = !selection.length;
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = '添加数据源';
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids;
        getSource(id).then((response) => {
          this.form = response.data;
          this.open = true;
          this.title = '修改数据源';
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.btnLoading = true;
            if (this.form.id != null) {
              updateSource(this.form)
                .then((response) => {
                  this.$modal.msgSuccess('修改成功');
                  this.open = false;
                  this.getList();
                })
                .finally(() => {
                  this.btnLoading = false;
                });
            } else {
              addSource(this.form)
                .then((response) => {
                  this.$modal.msgSuccess('新增成功');
                  this.open = false;
                  this.getList();
                })
                .finally(() => {
                  this.btnLoading = false;
                });
            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids;
        this.$modal
          .confirm('是否确认删除数据源编号为"' + ids + '"的数据项？')
          .then(() => {
            return delSource(ids);
          })
          .then(() => {
            this.getList();
            this.$modal.msgSuccess('删除成功');
          })
          .catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        download(
          {
            url: 'business/source/export',
            method: 'post',
            data: this.queryParams,
          },
          {
            filename: `source_${new Date().getTime()}.xlsx`,
          },
        );
      },
    },
  };
</script>
