<template>
	<div class="header">
		<div class="nav-topbar">
			<div class="container">
				<div class="topbar-menu">
					<router-link to="/index">xxx数据交易平台</router-link>
					<router-link to="">数据产品</router-link>
					<router-link to="">数据服务</router-link>
				</div>
				<div class="topbar-user">
					<a href="javascript:;" v-if="username">{{username}}</a>
					<a href="javascript:;" v-if="!username" @click="login">登录</a>
					<a href="javascript:;" v-if="username" @click="logout">退出</a>
					<a href="javascript:;">会员中心</a>
					<a href="/#/order/list">我的订单</a>
					<a href="javascript:;">在线客服</a>
					<a href="javascript:;">关于我们</a>
					<a href="javascript:;" class="my-cart" @click="gotoCart"><span class="icon-cart"></span>购物车({{cartCount}})</a>
				</div>
			</div>
		</div>
		<div class="nav-header">
			<div class="container">
				<div class="header-logo">
					<a href="/#/index"></a>
				</div>
				<div class="header-menu">
					<div class="item-menu">
						<span>结构化数据</span>
					</div>
					<div class="item-menu">
						<span>图片数据</span>
					</div>
					<div class="item-menu">
						<span>文本数据</span>
					</div>
					<div class="item-menu">
						<span>视频数据</span>
					</div>
					<div class="item-menu">
						<span>音频数据</span>
					</div>
					<div class="item-menu">
						<span>其他</span>
					</div>
				</div>
				<div class="header-search">
					<div class="wrapper">
						<input type="text" name="keyword">
						<a href="javascript:;"></a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex';
export default {
	name:'nav-header',//home直接引用的nav-header标签，与这个名字无关，与NavHeader.vue这个名字有关
	data()
    {
			return{
				phoneList:[],
			}
	},
	computed:{
		username(){
			// return this.$store.state.username;
		},
		cartCount(){
			// return this.$store.state.cartCount;
		},
		...mapState(['username','cartCount'])
	},
	mounted() {
		// this.getProductList();
		let params = this.$route.params;
		if(params && params.from == 'login'){
			// this.getCartCount();
		}
	},
	filters:{
		currency(val){
			if(!val)return '0.00';
			return '￥' + val.toFixed(2) + '元';
		}
	},
	methods:{
		getProductList(){
			this.axios.get('/products', {
				params:{
						categoryId:'100012',
						pageSize:6
						//传六组数据
				}//用get方法时需要用params传递参数，若用post则不需要用params
			}).then((res)=>{
				this.phoneList = res.list
			})
		},
		getCartCount(){
			this.axios.get('/carts/products/sum').then((res=0)=>{
				this.$store.dispatch('saveCartCount',res);
			})
		},
		gotoCart() {
			this.$router.push('/cart');
		},
		login() {
			this.$router.push('/login')
		},
		logout() {
			this.axios.post('/user/logout').then(()=>{
				this.$message.success('退出成功');
				this.$cookie.set('userId','',{expires:'-1'});
				this.$store.dispatch('saveUserName','');
				this.$store.dispatch('saveCartCount','0');
			})
		}
	}
}
</script>
<style lang="scss">
@import '../../assets/scss/base.scss';
@import '../../assets/scss/mixin.scss';
@import '../../assets/scss/config.scss';
.header{
	.nav-topbar{
		height:39px;
		line-height:39px;
		background-color:$colorB;
		.container{
			@include flex();
			// display: flex;
			// justify-content: space-between;
			// align-items: center;
			a{
				display: inline-block;
				color: #B0B0B0;
				margin-right: 17px;
			}
			.my-cart{
				width:110px;
				background-color:$colorA;
				text-align:center;
				color:#ffffff;
				margin-right:0;
			}
			.icon-cart{
				display: inline-block;
				width: 16px;
				height: 12px;
				background: url('@/assets/imgs/icon-cart-checked.png')no-repeat center;
				background-size: contain;
				margin-right: 4px;
			}
		}
	}
	.nav-header{
		.container{
			@include flex();
			position: relative;
			height: 112px;
			.header-menu{
				padding-left: 209px;
				.item-menu{
					display: inline-block;
					font-size: 16px;
					font-weight: bold;
					line-height: 112px;
					margin-right: 20px;
					span{
						cursor: pointer;
					}
					&:hover{
						color: $colorA;
						.children{
							height: 220px;
							opacity: 1;
						}
					}
					.children{
						border-top: 1px solid #E5E5E5;
						z-index: 10;
						position: absolute;
						top: 112px;
						left: 0;
						width: 1226px;
						height: 0px;
						opacity: 0;
						overflow: hidden;
						transition: all 0.5s;
						background-color: $colorG;
						box-shadow:0px 7px 6px 0px rgba(0, 0, 0, 0.11);
						a{
							display: inline-block;
						}
						.product{
							position: relative;
							float: left;
							width: 16.6%;
							text-align: center;
							font-size: 12px;
							line-height: 12px;
							&::before{
								position: absolute;
								content: '';
								top: 28px;
								right: 0;
								height: 100px;
								width: 1px;
								border-right: 1px solid $colorF;
							};
							&:last-child::before{
								display: none;
							}
						}
						img{
							margin-top: 26px;
							height: 111px;
							width: auto;
						}
						.pro-img{
							height: 137px;
						}
						.pro-name{
							font-weight: bold;
							color: $colorB;
							margin-top:19px;
							margin-bottom: 8px;
						}
						.pro-price{
							color: $colorA;
						}
					}
				}
			}
			.header-search{
				width: 319px;
				.wrapper{
					height:50px;
					border:1px solid #E0E0E0;
					display:flex;
					align-items:center;
					input{
						border: none;
						box-sizing: border-box;
						border-right: 1px solid #E0E0E0;
						width: 264px;
						height: 48px;
						padding-left: 14px;
					}
					a{
						@include bgImg(18px,18px,'@/assets/imgs/icon-search.png');
						margin-left: 17px;
					}
				}
			}
		}
	}
}
</style>