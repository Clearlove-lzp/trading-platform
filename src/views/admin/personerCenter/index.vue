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
                  <div class="user-right">{{ user.seller_account }}</div>
                </div>
              </li>
              <li>
                <Icon type="ios-contact-outline" /> 店铺名
                <div class="user-right">{{ user.seller_name }}</div>
              </li>
              <li>
                <Icon type="ios-card-outline" /> 身份证号
                <div class="user-right">{{ seller_idcard }}</div>
              </li>
              <li>
                <Icon type="ios-phone-portrait" /> 手机号码
                <div class="user-right">{{ user.seller_tel }}</div>
              </li>
              <li>
                <Icon type="ios-mail-outline" /> 邮箱
                <div class="user-right">{{ user.seller_email }}</div>
              </li>
              <!-- <li>
                <Icon type="ios-settings-outline" /> 安全设置
                <div class="user-right">
                  <a @click="$refs.pass.dialog = true">修改密码</a>
                  <a @click="$refs.email.dialog = true">修改邮箱</a>
                </div>
              </li> -->
            </ul>
          </div>
        </Card>
      </Col>
      <Col :sm="24" :md="16" :lg="15" :xl="18">
        <!--    用户资料    -->
        <Card class="box-card">
          <Tabs v-model="activeName" @on-click="handleClick">
            <TabPane label="用户资料" name="first">
              <Form
                ref="form"
                :model="form"
                :rules="rules"
                style="margin-top: 10px"
                size="small"
                :label-width="100"
              >
                <FormItem label="店铺名" prop="seller_name">
                  <Input v-model="form.seller_name" style="width: 35%" />
                  <span style="color: #c0c0c0; margin-left: 10px"
                    >店铺名不作为登录使用</span
                  >
                </FormItem>
                <FormItem label="手机号" prop="seller_tel">
                  <Input v-model="form.seller_tel" style="width: 35%" />
                  <span style="color: #c0c0c0; margin-left: 10px"
                    >手机号码不能重复</span
                  >
                </FormItem>
                <FormItem label="邮箱" prop="seller_email">
                  <Input v-model="form.seller_email" style="width: 35%" />
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
            <!--    操作日志    -->
            <!-- <TabPane label="操作日志" name="second">
              <el-table v-loading="loading" :data="data" style="width: 100%">
                <el-table-column prop="description" label="行为" />
                <el-table-column prop="requestIp" label="IP" />
                <el-table-column
                  :show-overflow-tooltip="true"
                  prop="address"
                  label="IP来源"
                />
                <el-table-column prop="browser" label="浏览器" />
                <el-table-column prop="time" label="请求耗时" align="center">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.time <= 300"
                      >{{ scope.row.time }}ms</el-tag
                    >
                    <el-tag v-else-if="scope.row.time <= 1000" type="warning"
                      >{{ scope.row.time }}ms</el-tag
                    >
                    <el-tag v-else type="danger">{{ scope.row.time }}ms</el-tag>
                  </template>
                </el-table-column>
                <el-table-column align="right">
                  <template slot="header">
                    <div
                      style="
                        display: inline-block;
                        float: right;
                        cursor: pointer;
                      "
                      @click="init"
                    >
                      创建日期<i
                        class="el-icon-refresh"
                        style="margin-left: 40px"
                      />
                    </div>
                  </template>
                  <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                :total="total"
                :current-page="page + 1"
                style="margin-top: 8px"
                layout="total, prev, pager, next, sizes"
                @size-change="sizeChange"
                @current-change="pageChange"
              />
            </TabPane> -->
          </Tabs>
        </Card>
      </Col>
    </Row>
    <!-- <updateEmail ref="email" :email="user.email" /> -->
    <!-- <updatePass ref="pass" /> -->
  </div>
</template>

<script>
import myUpload from "vue-image-crop-upload";
import { mapGetters } from "vuex";
// import updatePass from "./center/updatePass";
// import updateEmail from "./center/updateEmail";
// import { getToken } from "@/utils/auth";
import store from "@/store";
// import { isvalidPhone } from "@/utils/validate";
// import crud from "@/mixins/crud";
// import { editUser } from "@/api/system/user";
// import Avatar from "@/assets/images/avatar.png";
export default {
  name: "Center",
  // components: { updatePass, updateEmail, myUpload },
  components: { myUpload },
  // mixins: [crud],
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
      // Avatar: Avatar,
      activeName: "first",
      saveLoading: false,
      headers: {
        // Authorization: getToken(),
      },
      form: {},
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
      user: {
        seller_account: "messi",
        seller_name: "里奥梅西",
        seller_idcard: "342922199809871232",
        seller_tel: "13800000000",
        seller_email: "134444@qq.com",
      },
      baseApi: "",
    };
  },
  computed: {
    seller_idcard() {
      if (this.user.seller_idcard) {
        let reg = /^(\d{4})\d{11}(\d{3}|\d{4}X)$/;
        let result = this.user.seller_idcard.replace(reg, "$1***********$2");
        return result;
      }
    },
    // ...mapGetters(["user", "updateAvatarApi"]),
  },
  created() {
    // this.form = {
    //   id: this.user.id,
    //   nickName: this.user.nickName,
    //   gender: this.user.gender,
    //   phone: this.user.phone,
    // };
    // store.dispatch("GetInfo").then(() => {});
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    handleClick(tab, event) {
      if (tab.name === "second") {
        this.init();
      }
    },
    beforeInit() {
      this.url = "api/logs/user";
      return true;
    },
    cropUploadSuccess(jsonData, field) {
      console.log(jsonData);
      console.log(field);
    },
    doSubmit() {
      if (this.$refs["form"]) {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            this.saveLoading = true;
            editUser(this.form)
              .then(() => {
                this.editSuccessNotify();
                store.dispatch("GetInfo").then(() => {});
                this.saveLoading = false;
              })
              .catch(() => {
                this.saveLoading = false;
              });
          }
        });
      }
    },
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
