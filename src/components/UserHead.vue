<!-- 用户 -->
<template>
  <div class="UserHead" :style="styleSheet">
    <Dropdown trigger="click" placement="bottom-start" @on-click="handleClickUserDropdown">
      <div class="name" title="点击退出">
        <span class="sp1">欢迎您, {{getUserInfo.admin_name ? getUserInfo.admin_name : getUserInfo.seller_name ? getUserInfo.seller_name : '游客'}}</span>
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
import { mapState } from 'vuex';
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
    };
  },
  components: {
    
  },
  computed: {
    ...mapState({
      getUserInfo: state => state.user.userInfo
    })
  },
  methods: {
    handleClickUserDropdown(name) {
      if (name === "ownSpace") {
      } else if (name === "loginout") {
        // 退出登录
        if(this.getUserInfo.admin_id) {
          return this.$router.push("/admin/SystemLogin");
        }
        this.$router.push("/admin/login");
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
  :deep(.ivu-dropdown) {
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