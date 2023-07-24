<template>
  <div class="personal-main">
    <div class="personal-pay">
      <h3><i>借款人信息认证</i></h3>

      <el-steps :active="active" style="margin: 40px">
        <el-step title="填写借款人信息"></el-step>
        <el-step title="提交平台审核"></el-step>
        <el-step title="等待认证结果"></el-step>
      </el-steps>

      <div v-if="active === 0" class="user-borrower">
        <h6>个人基本信息</h6>
        <el-form label-width="120px">
          <el-form-item label="年龄">
            <el-col :span="5">
              <el-input v-model="borrower.age" />
            </el-col>
          </el-form-item>

          <el-form-item label="性别">
            <el-select v-model="borrower.sex">
              <el-option :value="1" :label="'男'" />
              <el-option :value="0" :label="'女'" />
            </el-select>
          </el-form-item>
          <el-form-item label="婚否">
            <el-select v-model="borrower.marry">
              <el-option :value="true" :label="'是'" />
              <el-option :value="false" :label="'否'" />
            </el-select>
          </el-form-item>
          <el-form-item label="学历">
            <el-select v-model="borrower.education">
              <el-option
                v-for="item in educationList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="行业">
            <el-select v-model="borrower.industry">
              <el-option
                v-for="item in industryList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="月收入">
            <el-select v-model="borrower.income">
              <el-option
                v-for="item in incomeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="还款来源">
            <el-select v-model="borrower.returnSource">
              <el-option
                v-for="item in returnSourceList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <h6>联系人信息</h6>
        <el-form label-width="120px">
          <el-form-item label="联系人姓名">
            <el-col :span="5">
              <el-input v-model="borrower.contactsName" />
            </el-col>
          </el-form-item>
          <el-form-item label="联系人手机">
            <el-col :span="5">
              <el-input v-model="borrower.contactsMobile" />
            </el-col>
          </el-form-item>
          <el-form-item label="联系人关系">
            <el-select v-model="borrower.contactsRelation">
              <el-option
                v-for="item in contactsRelationList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>

        <h6>身份认证信息</h6>
        <el-form label-width="120px">
          <el-form-item label="身份证人像面">
            <el-upload
              :on-success="onUploadSuccessIdCard1"
              :on-remove="onUploadRemove"
              :multiple="false"
              :action="uploadUrl"
              :data="{ imageType: 'idCard1' }"
              :limit="1"
              list-type="picture-card"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="身份证国徽面">
            <el-upload
              :on-success="onUploadSuccessIdCard2"
              :on-remove="onUploadRemove"
              :multiple="false"
              :action="uploadUrl"
              :data="{ imageType: 'idCard2' }"
              :limit="1"
              list-type="picture-card"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <h6>其他信息</h6>
        <el-form label-width="120px">
          <el-form-item label="房产信息">
            <el-upload
              :on-success="onUploadSuccessHouse"
              :on-remove="onUploadRemove"
              :multiple="false"
              :action="uploadUrl"
              :data="{ imageType: 'house' }"
              list-type="picture-card"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="车辆信息">
            <el-upload
              :on-success="onUploadSuccessCar"
              :on-remove="onUploadRemove"
              :multiple="false"
              :action="uploadUrl"
              :data="{ imageType: 'car' }"
              list-type="picture-card"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>

        <el-form label-width="120px">
          <el-form-item>
            <el-button
              type="primary"
              :disabled="submitBtnDisabled"
              @click="save"
            >
              提交
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div v-if="active === 1">
        <div style="margin-top: 40px">
          <el-alert
            title="您的认证申请已成功提交，请耐心等待"
            type="warning"
            show-icon
            :closable="false"
          >
            我们将在2小时内完成审核，审核时间为周一至周五8:00至20:00。
          </el-alert>
        </div>
      </div>

      <div v-if="active === 2">
        <div style="margin-top: 40px">
          <el-alert
            v-if="borrowerStatus === 2"
            title="您的认证审批已通过"
            type="success"
            show-icon
            :closable="false"
          >
            <NuxtLink to="/user/apply" v-if="borrowerStatus === 2">
              <el-button style="margin-top: 20px" type="success">
                我要借款
              </el-button>
            </NuxtLink>
          </el-alert>

          <el-alert
            v-if="borrowerStatus === -1"
            title="您的认证审批未通过"
            type="error"
            show-icon
            :closable="false"
          >
          </el-alert>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
export default {
  data() {
    let BASE_API = process.env.BASE_API;

    return {
      active: 0, //步骤
      borrowerStatus: null,
      submitBtnDisabled: false,
      //借款人信息
      borrower: {
        borrowerAttachList: [],
      },
      educationList: [], //学历列表
      industryList: [], //行业列表
      incomeList: [], //月收入列表
      returnSourceList: [], //还款来源列表
      contactsRelationList: [], //联系人关系
      uploadUrl: BASE_API + "/api/oss/file/uploadImage", //文件上传地址
    };
  },

  mounted() {
    this.$axios
      .$get("/api/core/borrower/getBorrowerStatus")
      .then((response) => {
        this.borrowerStatus = response.data.borrowerStatus;
        if (this.borrowerStatus === 0) {
          this.active = 0;
          this.getDictSelectedByDictCode();
        }
        if (this.borrowerStatus === 1) {
          this.active = 1;
        }
        if (this.borrowerStatus === 2) {
          this.active = 2;
        }
      });
  },

  methods: {
    onUploadSuccessIdCard1(response, file) {
      // 保存上传图片的元信息
      this.onUploadSuccess(response, file, "idCard1");
    },
    onUploadSuccessIdCard2(response, file) {
      // 保存上传图片的元信息
      this.onUploadSuccess(response, file, "idCard2");
    },
    onUploadSuccessHouse(response, file) {
      // 保存上传图片的元信息
      this.onUploadSuccess(response, file, "house");
    },
    onUploadSuccessCar(response, file) {
      // 保存上传图片的元信息
      this.onUploadSuccess(response, file, "car");
    },

    onUploadSuccess(response, file, imageType) {
      console.log("file", file);
      this.borrower.borrowerAttachList.push({
        imageType: imageType,
        imageUrl: response.data.url,
        imageName: file.name,
      });
    },

    onUploadRemove(file, fileList) {
      // alert("删除")
      this.$axios
        .$delete("/api/oss/file/deleteImage?url=" + file.response.data.url)
        .then((response) => {
          this.$message.error("删除成功");
          this.borrower.borrowerAttachList =
            this.borrower.borrowerAttachList.filter((borrowerAttach) => {
              // return borrowerAttach.imageUrl!=file.response.data.url
              if (borrowerAttach.imageUrl === file.response.data.url) {
                return false;
              } else {
                return true;
              }
            });
        });
    },
    getDictSelectedByDictCode() {
      this.$axios
        .$get("/api/core/dict/getDictSelectedByDictCode/education")
        .then((response) => {
          this.educationList = response.data.dictList;
        });

      this.$axios
        .$get("/api/core/dict/getDictSelectedByDictCode/industry")
        .then((response) => {
          this.industryList = response.data.dictList;
        });

      this.$axios
        .$get("/api/core/dict/getDictSelectedByDictCode/income")
        .then((response) => {
          this.incomeList = response.data.dictList;
        });

      this.$axios
        .$get("/api/core/dict/getDictSelectedByDictCode/returnSource")
        .then((response) => {
          this.returnSourceList = response.data.dictList;
        });

      this.$axios
        .$get("/api/core/dict/getDictSelectedByDictCode/relation")
        .then((response) => {
          this.contactsRelationList = response.data.dictList;
        });
    },
    save() {
      this.submitBtnDisabled = true;
      this.$axios
        .$post("/api/core/borrower/auth/save", this.borrower)
        .then((response) => {
          this.$message.success("提交成功");
          this.active = 1;
        });
    },
  },
};
</script>