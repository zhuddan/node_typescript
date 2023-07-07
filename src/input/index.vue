<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="数据源id" prop="sourceId">
        <el-input
          v-model="queryParams.sourceId"
          placeholder="请输入数据源id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="周期" prop="cycle">
        <el-input
          v-model="queryParams.cycle"
          placeholder="请输入周期"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="值" prop="cycleValue">
        <el-input
          v-model="queryParams.cycleValue"
          placeholder="请输入值"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['business:SourceChild1:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['business:SourceChild1:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['business:SourceChild1:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['business:SourceChild1:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="SourceChild1List"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="id" />
      <el-table-column label="数据源id" align="center" prop="sourceId" />
      <el-table-column label="周期" align="center" prop="cycle" />
      <el-table-column label="值" align="center" prop="cycleValue" />
      <el-table-column label="操作" align="center" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['business:SourceChild1:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['business:SourceChild1:remove']"
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

    <!-- 添加或修改数据源配置子-周期对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="50%"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="数据源id" prop="sourceId">
              <el-input v-model="form.sourceId" placeholder="请输入数据源id" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="周期" prop="cycle">
              <el-input v-model="form.cycle" placeholder="请输入周期" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="值" prop="cycleValue">
              <el-input v-model="form.cycleValue" placeholder="请输入值" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="submitForm"
          :loading="btnLoading"
          >确 定</el-button
        >
        <el-button icon="el-icon-close" @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listSourceChild1,
  getSourceChild1,
  delSourceChild1,
  addSourceChild1,
  updateSourceChild1,
} from "@/api/business/SourceChild1";

import { download } from "@/utils/request";

export default {
  name: "SourceChild1",
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
      // 数据源配置子-周期表格数据
      SourceChild1List: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sourceId: null,
        cycle: null,
        cycleValue: null,
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
    /** 查询数据源配置子-周期列表 */
    getList() {
      this.loading = true;
      listSourceChild1(this.queryParams).then((response) => {
        this.SourceChild1List = response.rows;
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
        sourceId: null,
        cycle: null,
        cycleValue: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
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
      this.title = "添加数据源配置子-周期";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getSourceChild1(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改数据源配置子-周期";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.btnLoading = true;
          if (this.form.id != null) {
            updateSourceChild1(this.form)
              .then((response) => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              })
              .finally(() => {
                this.btnLoading = false;
              });
          } else {
            addSourceChild1(this.form)
              .then((response) => {
                this.$modal.msgSuccess("新增成功");
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
        .confirm('是否确认删除数据源配置子-周期编号为"' + ids + '"的数据项？')
        .then(() => {
          return delSourceChild1(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      download(
        {
          url: "business/SourceChild1/export",
          method: "post",
          data: this.queryParams,
        },
        {
          filename: `SourceChild1_${new Date().getTime()}.xlsx`,
        }
      );
    },
  },
};
</script>
