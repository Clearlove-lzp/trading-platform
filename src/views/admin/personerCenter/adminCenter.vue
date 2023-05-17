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
                  <div class="user-right">{{ getUserInfo.admin_name }}</div>
                </div>
              </li>
            </ul>
          </div>
        </Card>
      </Col>
      <Col :sm="24" :md="16" :lg="15" :xl="18">
        <!--    用户资料    -->
        <Card class="box-card">
          <Tabs v-model="activeName">
            <TabPane label="用户资料" name="first"> </TabPane>
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
      userInfo: {
        seller_account: "messi",
      },
    };
  },
  computed: {
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
