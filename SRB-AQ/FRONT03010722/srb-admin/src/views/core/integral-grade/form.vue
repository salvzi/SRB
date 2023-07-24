<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="借款额度">
        <el-input-number v-model="integralGrade.borrowAmount" :min="0" />
      </el-form-item>
      <el-form-item label="积分区间开始">
        <el-input-number v-model="integralGrade.integralStart" :min="0" />
      </el-form-item>
      <el-form-item label="积分区间结束">
        <el-input-number v-model="integralGrade.integralEnd" :min="0" />
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate()"
        >
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  <script>
import integralGradeApi from "@/api/core/integral-grade";
export default {
  data() {
    return {
      integralGrade: {},
      saveBtnDisabled: false,
    };
  },
  created() {
    // 获取id调用回显方法
    this.integralGrade.id = this.$route.params.id;
    this.fetchDataById();
  },
  methods: {
    fetchDataById() {
      integralGradeApi.getDataById(this.integralGrade.id).then((response) => {
        this.integralGrade = response.data.integralGrade;
      });
    },
    saveOrUpdate() {
      if (this.integralGrade.id) {
        this.updateById();
      } else {
        this.save();
      }
    },
    updateById() {
      this.saveBtnDisabled = true;
      integralGradeApi.updateById(this.integralGrade).then((response) => {
        this.$message.success("修改成功");
        // 修改操作成功后跳转列表页
        this.$router.push("/core/integral-grade/list");
      });
    },
    save() {
      this.saveBtnDisabled = true;
      integralGradeApi.save(this.integralGrade).then((response) => {
        this.$message.success("保存成功");
        // 保存操作成功后跳转列表页
        this.$router.push("/core/integral-grade/list");
      });
    },
  },
};
</script>