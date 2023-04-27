<template>
  <div class="personerCenter">
    <Row :gutter="20">
      <Col :sm="24" :md="24" :lg="9" :xl="6" style="margin-bottom: 10px">
        <Card class="box-card">
          <template #title>
            <div class="clearfix">
              <span>个人信息</span>
            </div>
          </template>
          <div>
            <div style="text-align: center">
              <div class="el-upload">
                <img
                  v-lazy="require('@/assets/imgs/avatar.jpeg')"
                  title="点击上传头像"
                  class="avatar"
                  @click="toggleShow"
                />
                <myUpload
                  v-model="show"
                  @crop-upload-success="cropUploadSuccess"
                />
              </div>
            </div>
            <ul class="user-info">
              <li>
                <div style="height: 100%">
                  <Icon type="ios-log-in" /> 登录账号
                  <div class="user-right">{{ getUserInfo.seller_account }}</div>
                </div>
              </li>
              <li>
                <Icon type="ios-contact-outline" /> 店铺名
                <div class="user-right">{{ getUserInfo.seller_name }}</div>
              </li>
              <li>
                <Icon type="ios-card-outline" /> 身份证号
                <div class="user-right">{{ seller_idcard }}</div>
              </li>
              <li>
                <Icon type="ios-phone-portrait" /> 手机号码
                <div class="user-right">{{ getUserInfo.seller_tel }}</div>
              </li>
              <li>
                <Icon type="ios-mail-outline" /> 邮箱
                <div class="user-right">{{ getUserInfo.seller_email }}</div>
              </li>
            </ul>
          </div>
        </Card>
      </Col>
      <Col :sm="24" :md="16" :lg="15" :xl="18">
        <!--    用户资料    -->
        <Card class="box-card">
          <Tabs v-model="activeName">
            <TabPane label="用户资料" name="first">
              <Form
                ref="editForm"
                :model="form"
                :rules="rules"
                style="margin-top: 10px"
                size="small"
                :label-width="100"
              >
                <FormItem label="店铺名" prop="seller_name">
                  <Input v-model="AppliForm.seller_name" style="width: 35%" />
                  <span style="color: #c0c0c0; margin-left: 10px"
                    >店铺名不作为登录使用</span
                  >
                </FormItem>
                <FormItem label="手机号" prop="seller_tel">
                  <Input v-model="AppliForm.seller_tel" style="width: 35%" />
                  <span style="color: #c0c0c0; margin-left: 10px"
                    >手机号码不能重复</span
                  >
                </FormItem>
                <FormItem label="邮箱" prop="seller_email">
                  <Input v-model="AppliForm.seller_email" style="width: 35%" />
                  <span style="color: #c0c0c0; margin-left: 10px"
                    >邮箱不能重复</span
                  >
                </FormItem>
                <FormItem label="">
                  <Button
                    :loading="saveLoading"
                    size="mini"
                    type="primary"
                    @click="doSubmit"
                    >保存配置</Button
                  >
                </FormItem>
              </Form>
            </TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import myUpload from "vue-image-crop-upload";
import { mapState } from "vuex";
export default {
  name: "Center",
  components: { myUpload },
  data() {
    // 自定义验证
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入电话号码"));
      } else if (!isvalidPhone(value)) {
        callback(new Error("请输入正确的11位手机号码"));
      } else {
        callback();
      }
    };
    return {
      show: false,
      activeName: "first",
      saveLoading: false,
      AppliForm: {
        seller_name: "",
        seller_tel: "",
        seller_email: "",
      },
      rules: {
        seller_name: [
          { required: true, message: "请输入店铺名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        seller_tel: [
          { required: true, trigger: "blur", validator: validPhone },
        ],
      },
    };
  },
  computed: {
    seller_idcard() {
      if (this.getUserInfo.seller_idcard) {
        let reg = /^(\d{4})\d{11}(\d{3}|\d{4}X)$/;
        let result = this.getUserInfo.seller_idcard.replace(
          reg,
          "$1***********$2"
        );
        return result;
      }
    },
    ...mapState({
      getUserInfo: (state) => state.user.userInfo,
    }),
  },
  created() {},
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    cropUploadSuccess(jsonData, field) {
      console.log(jsonData);
      console.log(field);
    },
    doSubmit() {
      if (this.$refs["editForm"]) {
        this.$refs["editForm"].validate((valid) => {
          if (valid) {
            this.saveLoading = true;
          }
        });
      }
    },
  },
  mounted() {
    this.AppliForm = {
      seller_name: this.getUserInfo.seller_name,
      seller_tel: this.getUserInfo.seller_tel,
      seller_email: this.getUserInfo.seller_email,
    };
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.personerCenter {
  padding: 20px 20px 45px 20px;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.user-info {
  padding-left: 0;
  list-style: none;
  li {
    border-bottom: 1px solid #f0f3f4;
    padding: 11px 0;
    font-size: 13px;
  }
  .user-right {
    float: right;
    a {
      color: #317ef3;
    }
  }
}

.el-upload {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  outline: none;
}
</style>
