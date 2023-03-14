/*
 * @Author: 刘志鹏 
 * @Date: 2019-06-18 17:37:56 
 * @Last Modified by: 刘志鹏
 * @Last Modified time: 2023-03-12 12:57:27
 */
<!--  -->
<template>
  <div :style="styleSheet" >
    <Dropdown trigger="click" @on-click="typeChange">
      <div title="主题切换">
        <Icon type="md-repeat" :size="24" />
      </div>
      <DropdownMenu slot="list" class="ownSize">
        <DropdownItem name="主题一">主题一</DropdownItem>
        <DropdownItem name="主题二">主题二</DropdownItem>
        <!-- <DropdownItem name="主题三">主题三</DropdownItem> -->
      </DropdownMenu>
    </Dropdown>
    <!-- <Tooltip content="切换" placement="bottom">
      <Icon @click.native="changeLayOut" type="md-repeat" :size="24"></Icon>
    </Tooltip> -->
  </div>
</template>

<script>

export default {
  props: {
    styleSheet: {
      type: Object,
      default: function(){
        return{
          position: 'fixed',
          right: "160px",
          width: "40px",
          height: "40px",
          top: "10px",
          color: "#fff",
          zIndex: "1000",
          textAlign: 'center',
          lineHeight: '40px'
        }
      }
    }
  },
  data () {
    return {
    };
  },
  components: {},
  computed: {},
  methods: {
    typeChange(value) {
      this.$emit('changeLayOut', value)
    }
  },
  mounted() {},
  created() {},
}
</script>

<style scoped lang="scss">
</style>