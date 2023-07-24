<template>
  <div class="app-container">
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="主键" width="180"> </el-table-column>
      <el-table-column prop="integralStart" label="开始区间" width="180">
      </el-table-column>
      <el-table-column prop="integralEnd" label="结束区间" width="180">
      </el-table-column>
      <el-table-column prop="borrowAmount" label="额度"> </el-table-column>
      <el-table-column label="操作列">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeById(scope.row.id)"
          >
            删除
          </el-button>

          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="updateById(scope.row.id)"
          >
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import integralGradeApi from "@/api/core/integral-grade";
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      integralGradeApi.getList().then((response) => {
        console.log("======", response.data.list);
        this.list = response.data.list;
      });
    },
    removeById(id) {
      // alert("删除id是"+id+"的数据")
      integralGradeApi.removeById(id).then((response) => {
        this.$message.error("删除成功");
        this.fetchData();
      });
    },  
    updateById(id) {
      // 跳转到更新的路由
      this.$router.push("/core/integral-grade/edit/"+id)
    }
  },
};
</script>