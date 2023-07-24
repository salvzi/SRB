<template>
  <div class="app-container">
    <div style="margin-bottom: 10px">
      <el-button
        @click="dialogVisible = true"
        type="primary"
        size="mini"
        icon="el-icon-upload"
      >
        导入Excel
      </el-button>

      <el-button
        @click="downloadExcel()"
        type="primary"
        size="mini"
        icon="el-icon-download"
      >
        导出Excel
      </el-button>
    </div>

    <el-dialog title="数据字典导入" :visible.sync="dialogVisible" width="30%">
      <el-form>
        <el-form-item label="请选择Excel文件">
          <el-upload
            :auto-upload="true"
            :multiple="false"
            :limit="1"
            :on-exceed="fileUploadExceed"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            :action="BASE_API + '/admin/core/dict/importExcel'"
            name="file"
            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false"> 取消 </el-button>
      </div>
    </el-dialog>

    <el-table :data="list" style="width: 100%" row-key="id" lazy :load="getChildren">
      <el-table-column prop="id" label="主键" width="180"> </el-table-column>
      <el-table-column prop="name" label="名称" width="180"> </el-table-column>
      <el-table-column prop="value" label="字典码值" width="180">
      </el-table-column>
      <el-table-column prop="dictCode" label="字典码"> </el-table-column>
    </el-table>
  </div>
</template>
  <script>
import dictApi from "@/api/core/dict";

export default {
  data() {
    return {
      list: [],
      dialogVisible: false,
      BASE_API: process.env.VUE_APP_BASE_API //获取后端接口地址
    };
  },
  created() {
    this.getDictListByParentId(1);
  },
  methods: {
    getChildren(row,treeNode,reslove){
      let parentId = row.id;
      dictApi.getDictListByParentId(parentId).then(response=>{
        reslove(response.data.list)
      })
    },
    getDictListByParentId(parentId){
      dictApi.getDictListByParentId(parentId).then(response=>{
        this.list = response.data.list
      })
    },
    downloadExcel() {
      // alert("下载文件");
      window.location.href = "http://localhost/admin/core/dict/exportExcel";
    },
    fileUploadExceed() {
      // alert("文件超出上限");
      this.$message.error("文件超出上限")
    },
    fileUploadSuccess() {
      // alert("上传成功");
      this.$message.success("上传成功")
      this.dialogVisible = false
      this.getDictListByParentId(1);

    },
    fileUploadError() {
        this.$message.error("上传失败")
    },
  },
};
</script>