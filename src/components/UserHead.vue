/*
 * @Author: 刘志鹏 
 * @Date: 2019-06-21 16:31:33 
 * @Last Modified by: 刘志鹏
 * @Last Modified time: 2023-03-12 11:10:57
 */
<!-- 用户 -->
<template>
  <div class="UserHead" :style="styleSheet">
    <Dropdown trigger="click" placement="bottom-start" @on-click="handleClickUserDropdown">
      <div class="name" title="点击退出">
        <span class="sp1">欢迎您, {{userName ? userName : '游客'}}</span>
      </div>
      <template #list>
        <DropdownMenu>
          <DropdownItem name="loginout">退出登录</DropdownItem>
        </DropdownMenu>
      </template>
    </Dropdown>
  </div>
</template>

<script>
export default {
  props: {
    styleSheet: {
      type: Object,
      default: function() {
        return{
          position: 'fixed',
          right: 0,
          top: '10px',
          height: '40px',
          zIndex: 1000,
          lineHeight: '40px',
          color: '#fff',
        }
      }
    }
  },
  data() {
    return {
      userName: ''
    };
  },
  components: {
    
  },
  computed: {},
  methods: {
    handleClickUserDropdown(name) {
      if (name === "ownSpace") {
        // util.openNewPage(this, 'ownspace_index');
        this.$router.push("");
      } else if (name === "loginout") {
        // 退出登录
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("roleList");
        localStorage.setItem("isLogin", false);
        this.$router.push("/login");
      } else if (name === "passWordChange") {
      } else if (name === "message") {
      }
    }
  },
  mounted() {
    this.userName = localStorage.getItem("userName");
  },
  created() {}
};
</script>

<style scoped lang="less">
.UserHead {
  cursor: pointer;
  width: 110px;
  /deep/.ivu-dropdown{
    height: 100%;
    .ivu-dropdown-rel{
      height: 100%;
    }
  }
  .name{
    font-size: 14px;
    // font-weight: bold;
    display: inline-block; 
    white-space: nowrap;
    width: 110px; 
    overflow: hidden; 
    text-overflow:ellipsis;
  }
}
</style>