<!-- 整体风格设置 -->
<template>
  <Drawer title="整体风格设置" width="300" v-model="showDrawer" :closable="false">
    <Divider>导航模式</Divider>
    <Row :gutter="16">
      <Col span="8" v-for="(item, index) in typeList" :key="index">
        <div class="modeType" @click.stop="changeThemeStyle(item.type)">
          <Icon v-show="layOutType === item.type" type="md-checkmark" class="checked" />
          <img :src="item.img" />
        </div>
      </Col>
    </Row>
    <Divider>主题配色</Divider>
    <Row :gutter="16">
      <Col span="6" v-for="(item, index) in colorList" :key="index">
        <div class="box-color" :style="{background: item.color}"  @click.stop="changeThemeColor(item.type)">
          <Icon type="md-checkmark" v-show="theme === item.type" class="checked" />
        </div>
      </Col>
    </Row>
  </Drawer>
</template>

<script>
export default {
  props: {
    layOutType: {
      type: String,
      default: '主题二'
    },
    theme: {
      type: String,
      default: 'theme1'
    }
  },
  data () {
    return {
      showDrawer: false,
      // layOutType: '主题一',
      typeList: [
        {
          type: '主题一',
          img: require('../assets/theme/type1.png')
        },
        {
          type: '主题二',
          img: require('../assets/theme/type2.png')
        }
      ],
      colorList: [
        {
          type: 'theme1',
          color: '#56324e'
        },
        {
          type: 'theme2',
          color: '#00978b'
        },
        {
          type: 'theme3',
          color: '#3264fb'
        },
        {
          type: 'theme4',
          color: '#26282e'
        }
      ]
    };
  },
  components: {},
  computed: {},
  methods: {
    // 切换颜色
    changeThemeColor(value) {
      localStorage.setItem(
        "themeColor",
        value
      );
      setTimeout(() => {
        this.$emit('localStorageDate')
      }, 50)
    },
    // 切换风格
    changeThemeStyle(value) {
      this.$emit('changeLayOut', value)
      // this.layOutType = value
    },
    // // 获取存储在浏览器的导航风格
    // getLayOutType() {
    //   if (localStorage.getItem("layOutType")) {
    //     this.layOutType = localStorage.getItem("layOutType");
    //   }
    // }
  },
  mounted() {
    // this.getLayOutType()
  },
  created() {},
}
</script>

<style scoped lang="less">
.modeType{
  position: relative;
  cursor: pointer;
}
.box-color{
  width: 35px;
  height: 35px;
  position: relative;
  cursor: pointer;
}

.checked{
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 20px;
  color: orange;
  margin-left: -10px;
  margin-top: -10px;
}
</style>