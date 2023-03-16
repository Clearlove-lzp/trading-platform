<template>
  <!-- <div class="banner_w2 container"></div> -->
  <div class="banquan">
    <div class="wrapper">
      <div class="top">
        <ul>
          <li>
            <!-- 通过伪元素添加标签实现精灵图 -->
            <span>安全可靠</span>
          </li>
          <li>
            <span>方便快捷</span>
          </li>
          <li>
            <span>交易保障</span>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <!-- <p>
          <a href="../关于我们/about_us.html">关于我们</a> |
          <a href="#">帮助中心</a> |
          <a href="#">售后服务</a> |
          <a href="#">商务合作</a> |
          <a href="#">搜索推荐</a> |
          <a href="#">友情链接</a>
        </p> -->
        <p>CopyRight @ 数据交易平台</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name:'nav-footer'//home直接引用的nav-footer标签，与这个名字无关，与NavFooter.vue这个名字有关
  }
</script>
<style lang="scss" scoped>
@import '../../assets/scss/config.scss';
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.site-topbar {
  position: relative;
  width: 100%;
  z-index: 30;
  height: 40px;
  font-size: 12px;
  color: #b0b0b0;
  background-color: #333;
}

.site-topbar a {
  color: #b0b0b0;
  line-height: 40px;
  display: inline-block;
}

.site-topbar a:hover {
  color: #f10215;
}

.site-topbar .sep {
  margin: 0 .4em;
  color: #575656;
}

.site-topbar .container {
  position: relative;
}

.site-topbar .container .red {
  color: #f10215;
}

.site-topbar .right img {
  height: 40px;
  position: absolute;
  right: 40px;
  top: 0px;
}

.site-topbar .right a {
  float: right;
  height: 40px;
  position: absolute;
  right: 0px;
  top: 0px;
}

.site-topbar .center {
  position: absolute;
  right: 130px;
  top: 0px;
  height: 40px;
  line-height: 40px;
}

.site-topbar .center .red {
  color: #f10215;
}

.site-header img {
  width: 55px;
  margin-top: 22px;
}

.site-header li {
  display: inline-block;
}

.site-header {
  position: relative;
}

.site-header ul a {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  color: #333333;
  padding: 0 18px;
}

.site-header .header-nav {
  position: absolute;
  width: 850px;
  height: 50px;
  top: 25px;
  left: 290px;
}

.site-header .header-nav a:hover {
  color: #f10215;
}

.site-header .container {
  position: relative;
}

.site-header .search {
  width: 240px;
  height: 50px;
  position: absolute;
  top: 25px;
  right: 52px;
  outline: none;
  padding-left: 6px;
  border: 1px solid #e0e0e0;
}

.site-header .search:hover {
  border: 1px solid #FF6700;
  border-bottom: none;
}

.site-header .image {
  width: 50px;
  height: 50px;
  border: 1px solid #e0e0e0;
  border-left: none;
  position: absolute;
  top: 25px;
  right: 1px;
}

.site-header .header-search img {
  width: 48px;
  position: absolute;
  top: -22px;
  right: 1px;
}

.site-header .header-search .search_box {
  width: 238px;
  border: 1px solid #FF6700;
  position: absolute;
  top: 75px;
  right: 52px;
  float: left;
  display: none;
  background: #fff;
  z-index: 20;
}

.header-search:hover .search_box {
  display: block;
}

.banner {
  width: 1226px;
  height: 460px;
  margin: 20px auto;
  background: url("@/assets/imgs/占位符.jpg");
  background-size: cover;
  position: relative;
}

.banner .aside {
  font-size: 14px;
  width: 230px;
  height: 460px;
  background-color: #4b494e;
  position: absolute;
  left: 0px;
  top: 0px;
}

.banner .pages .left {
  height: 80px;
  width: 44px;
  position: absolute;
  left: 230px;
  top: 50%;
  margin-top: -40px;
  color: #969ea5;
  font-size: 30px;
  line-height: 80px;
  text-align: center;
}

.banner .pages .right {
  height: 80px;
  width: 44px;
  position: absolute;
  right: 0px;
  top: 50%;
  margin-top: -40px;
  color: #969ea5;
  font-size: 30px;
  line-height: 80px;
  text-align: center;
}

.banner .pages .right:hover {
  background: rgba(0, 0, 0, 0.3);
}

.banner .pages .left:hover {
  background: rgba(0, 0, 0, 0.3);
}

.banner .aside ul {
  margin-top: 25px;
  margin-bottom: 20px;
}

.banner .aside li {
  height: 40px;
  display: block;
  line-height: 40px;
  padding-left: 25px;
  color: white;
  position: relative;
}

.banner .aside li:hover {
  background-color: orange;
}

.banner .aside span {
  font-size: 19px;
  position: absolute;
  right: 20px;
}

.footer div {
  float: left;
  width: 316px;
  height: 170px;
}

.footer div:hover {
  box-shadow: 1px 3px 12px #999
}

.footer .one {
  width: 234px;
  height: 170px;
  background: url("@/assets/imgs/图片1.png");
  background-size: cover;

}

.footer .two {
  background: url("@/assets/imgs/图片2.png");
  background-size: cover;
  margin-left: 14px;
}

.footer .three {
  background: url("@/assets/imgs/图片3.png");
  background-size: cover;
  margin-left: 15px;
}

.footer div.four {
  width: 316px;
  background: url("@/assets/imgs/图片4.png");
  background-size: cover;
  margin-left: 15px;
}

.footer {
  margin-bottom: 210px;
}

.phone_w {
  background: #f5f5f5;
  margin-top: 80px;
}

.phone p {
  padding-top: 20px;
  font-size: 22px;
  padding-bottom: 20px;
}

.phone .phone_content {
  height: 614px;
}

.phone .phone_site {
  display: inline-block;
  background: url("@/assets/imgs/占位符.jpg");
  background-size: cover;
  height: 614px;
  width: 234px;
}

.phone .phone_right {
  display: inline-block;
  height: 614px;
  width: 985px;
}

.phone .phone_right li {
  margin-left: 12px;
  text-align: center;
  box-sizing: border-box;
  width: 234px;
  height: 300px;
  float: right;
  background: white;
}

.phone .phone_right li:hover {
  transform: translateY(-4px);
  transition: transform 3ms ease-in-out;
  box-shadow: 4px 4px 2px #999;
}

.phone .phone_right li:nth-child(-n+4) {
  margin-bottom: 14px;
}

.phone .phone_right li img {
  width: 160px;
  height: 160px;
  padding-top: 29px;
}

.phone .phone_right li p {
  padding: 0;
}

.phone .phone_right li .main {
  font-size: 14px;
  font-weight: 400;
  color: #333;
  margin-top: 14px;
}

.phone .phone_right li .introduce {
  margin-top: 3px;
  height: 18px;
  font-size: 12px;
  color: #b0b0b0;
}

.phone .phone_right li .value {
  font-size: 16px;
  margin-top: 5px;
  text-align: center;
  color: #ff6700;
}

.banner_w1 {
  height: 120px;
  background: url("@/assets/imgs/占位符.jpg");
  background-size: cover;
  margin-top: 40px;
}

.banner_w2 {
  height: 120px;
  background: url("@/assets/imgs/占位符.jpg");
  background-size: cover;
  margin-top: 40px;
}

.house {
  margin-top: 40px;
  height: 614px;
}

.house li:nth-child(5) {
  margin-left: 0;
  background: url("@/assets/imgs/占位符.jpg");
  background-size: cover;
}

.house li:nth-child(10) {
  margin-left: 0;
  background: url("@/assets/imgs/占位符.jpg");
  background-size: cover;
}

.house li:nth-child(-n+4) {
  margin-bottom: 11px;
}

.house p {
  padding-top: 20px;
  font-size: 22px;
  padding-bottom: 20px;
}

.house li {
  text-align: center;
  box-sizing: border-box;
  width: 234px;
  height: 301px;
  float: right;
  background: white;
  margin-left: 14px;
}

.house li img {
  width: 160px;
  height: 160px;
  padding-top: 29px;
}

.house li p {
  padding: 0;
}

.house li .main {
  font-size: 14px;
  font-weight: 400;
  color: #333;
  margin-top: 14px;
}

.house li .introduce {
  margin-top: 3px;
  height: 18px;
  font-size: 12px;
  color: #b0b0b0;
}

.house li .value {
  font-size: 16px;
  margin-top: 5px;
  text-align: center;
  color: #ff6700;
}

.house li:hover {
  transform: translateY(-4px);
  transition: transform 3ms ease-in-out;
  box-shadow: 4px 4px 2px #999;
}

.bottom {
  font: 14px "microsoft yahei";
}

/* 版心 */
.wrapper {
  overflow: hidden;
  width: 1226px;
  margin: 0 auto;
}

/* 版权banquan */
.banquan {
  height: 250px;
  background-color: #333;
  margin-top: 70px;
}

.banquan .wrapper {
  width: 1393px;
  margin: 0 auto;
}

.banquan .top {
  padding-top: 59px;
  padding-left: 135px;
  height: 150px;
  border-bottom: 3px solid #434343;
}

.banquan .top li {
  position: relative;
  float: left;
  margin-right: 270px;
  width: 195px;
  height: 58px;

  line-height: 58px;
}

.banquan .top li:last-child {
  margin-right: 0;
}

/* 伪元素添加的标签  行内 */
/* 如果行内块和行内文字无法通过vertical-align或行高对齐, 定位 */
.banquan .top li::before {
  position: absolute;
  left: 0;
  top: 0;
  /* display: inline-block; */
  content: '';
  width: 58px;
  height: 58px;
  background-image: url(@/assets/imgs/sprites.png);
  vertical-align: middle;
}

.banquan .top li span {
  margin-left: 77px;
  font-size: 28px;
  color: #fff;
}

/* 第二个li里面的berfore添加背景图位置属性 */
.banquan .top li:nth-child(2)::before {
  background-position: -130px 0;
}

.banquan .top li:nth-child(3)::before {
  background-position: -64px 0;
}

.banquan .bottom {
  padding-top: 40px;
  font-size: 14px;
  color: #999;
  text-align: center;
}

.banquan .bottom a {
  font-size: 14px;
  color: #999;
}

.banquan .bottom p {
  margin-bottom: 20px;
}

.header-nav .order-font {
  font-size: 30px;
  font-family: '微软雅黑';
  margin-left: 30px;
}

.footer {
  height: 120px !important;
  margin-bottom: 0 !important;
}
</style>