<template>
	<div class='index'>
		<div class="container">
			<div class="swiper-box">
				<div class="nav-menu">
					<ul class="menu-wrap">
						<li class="menu-item">
								<a href="javascript:;">手机 电话卡</a>
								<div class="children">
										<ul v-for="(item,i) in menuList" :key="i">
												<li v-for="(sub,j) in item" :key="j">
														<a :href="sub?'/#/product/'+sub.id:''">
														<img :src="sub?sub.img: require('@/assets/imgs/item-box-1.png')" alt="">
														{{sub?sub.name:'小米9'}}
														</a>
												</li>
										</ul>
								</div>
						</li>
						<li class="menu-item">
								<a href="javascript:;">笔记本 平板</a>
						</li>
						<li class="menu-item">
								<a href="javascript:;">家电 插线板</a>
						</li>
						<li class="menu-item">
								<a href="javascript:;">电视 盒子</a>
						</li>
						<li class="menu-item">
								<a href="javascript:;">智能 路由器</a>
						</li>
						<li class="menu-item">
								<a href="javascript:;">出行 穿戴</a>
						</li>
						<li class="menu-item">
								<a href="javascript:;">电源 配件</a>
						</li>
						<li class="menu-item">
								<a href="javascript:;">生活 箱包</a>
						</li>
					</ul>
				</div>
				<swiper ref="mySwiper" :modules="modules" :navigation="true" :loop="true" 
					:autoplay="{ delay: 10000, disableOnInteraction: false, }"
					:pagination="{ clickable: true }" effect="cube" :cubeEffect="{shadowOffset: 100, shadowScale: 0.6}">
					<swiper-slide v-for="(item,index) in slideList" :key="index">
						<a :href="'/#/product/'+item.id"><img :src="item.img" alt=""></a>
					</swiper-slide>
				</swiper>
			</div>
			<!-- <div class="ads-box">
				<a :href="'/#/product/'+item.id" v-for="(item,index) in adsList" :key="index">
					<img v-lazy="item.img" alt="">
				</a>
			</div>
			<div class="banner">
				<a href="/#/product/30">
					<img v-lazy="'@/assets/imgs/banner-1.png'" alt="">
				</a>
			</div> -->
			<!-- <div class="product-box">
				<h2>手机</h2>
				<div class="wrapper">
					<div class="banner-left">
						<a href="/#/product/35"><img v-lazy="'@/assets/imgs/mix-alpha.jpg'" alt=""></a>
					</div>
					<div class="list-box">
						<div class="list" v-for="(arr,i) in phoneList" :key="i">
						<div class="item" v-for="(item,j) in arr" :key="j">
								<span :class="{'new-pro':j%2==0}">新品</span>
								<div class="item-img"><img v-lazy="item.mainImage" alt=""></div>
								<div class="item-info">
									<h3>{{item.name}}</h3>
									<p>{{item.subtitle}}</p>
									<p class="price" @click="addCart(item.id)">{{item.price}}元</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div> -->
		</div>
		<!-- <service-bar></service-bar> -->
		<!-- <modal
			title="提示"
			sureText='查看购物车'
			btnType='1'
			modalType='middle'
			v-bind:showModal='showModal'
			v-on:submit='goToCart'
			v-on:cancel='showModal=false'
			>
			<template v-slot:body>
					<p>商品添加成功！</p>
			</template>
		</modal> -->
	</div>
</template>
<script>
// import ServiceBar from './../components/ServiceBar'
// import Modal from './../components/Modal'
import SwiperCore, { EffectCube, Navigation, Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import "swiper/css/effect-cube";

SwiperCore.use([EffectCube, Navigation, Autoplay, Pagination])

export default {
	name:'index',
	components:{
		// ServiceBar,
		Swiper,
		SwiperSlide,
		// Modal
	},
	data(){
		return{
			slideList:[
						{
							id:'42',
							img: require('@/assets/imgs/slider/slide-1.jpg')
						},
						{
							id:'45',
							img: require('@/assets/imgs/slider/slide-2.jpg')
						},
						{
							id:'46',
							img: require('@/assets/imgs/slider/slide-3.jpg')
						},
						{
						id:'',
						img: require('@/assets/imgs/slider/slide-4.jpg')
						},
						{
							id:'',
							img: require('@/assets/imgs/slider/slide-5.jpg')
						}
			],
			menuList:[
					[
							{
									id:30,
									img: require('@/assets/imgs/item-box-1.png'),
									name:'小米CC9'
							},{
									id:31,
									img: require('@/assets/imgs/item-box-2.png'),
									name:'小米8青春版'
							},{
									id:32,
									img: require('@/assets/imgs/item-box-3.jpg'),
									name:'Redmi K20 Pro'
							},{
									id:33,
									img: require('@/assets/imgs/item-box-4.jpg'),
									name:'移动4G专区'
							}
					],
					[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
			],
			adsList:[
					{
							id:33,
							img: require('@/assets/imgs/ads/ads-1.png')
					},
					{
							id:48,
							img: require('@/assets/imgs/ads/ads-2.jpg')
					},
					{
							id:45,
							img: require('@/assets/imgs/ads/ads-3.png')
					},{
							id:47,
							img: require('@/assets/imgs/ads/ads-4.jpg')
					}
			],
			phoneList:[],
			showModal:false,
			modules: [EffectCube, Navigation, Autoplay, Pagination]
		}
	},
	mounted() {
		this.init();
	},
	methods:{
		init(){
			// this.axios.get('/products',{
			//     params:{
			//        categoryId:'100012',
			//        pageSize:14
			//     }
			// }).then((res)=>{
			//     res.list=res.list.slice(6,14);
			//     this.phoneList = [res.list.slice(0,4),res.list.slice(4,8)];
			// })
		},
	addCart(id){
		this.axios.post('/carts',{
			productId:id,
			selected: true
		}).then((res)=>{
			this.showModal = true;
			this.$store.dispatch('saveCartCount',res.cartTotalQuantity);
		});
	},
		goToCart(){
				this.$router.push('/cart')
		}
	}
}
</script>
<style lang="scss">
@import '../../../assets/scss/mixin.scss';
@import '../../../assets/scss/config.scss';
.index{
	.container{
		.swiper-box{
			.swiper-container{
				height: 451px;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.nav-menu{
				position: absolute;
				width:264px;
				height:451px;
				z-index:9;
				padding:26px 0;
				background-color:#55585a7a;
				box-sizing:border-box;
				.menu-wrap{
					.menu-item{
						position: relative;
						padding-left: 30px;
						height: 50px;
						line-height: 50px;
						transition: all 0.5s;
						&:hover{
							background-color: $colorA;
							.children{
								display: block;
							}
						}
						a{
							color: #FFFFFF;
							font-size: 16px;
							&::after{
								content: '';
								position: absolute;
								top: 17.5px;
								right: 30px;
								@include bgImg(15px,10px,'@/assets/imgs/icon-arrow.png')
							}
						}
						.children{
							display: none;
							width: 962px;
							height: 451px;
							border: 1px solid $colorH;
							background-color: $colorG;
							position: absolute;
							top:-26px;
							left: 264px;
							ul{
								display: flex;
								justify-content: space-between;
								height: 75px;
								li{
									height: 75px;
									line-height: 75px;
									flex: 1;
									padding-left: 23px;
									a{
										color: $colorB;
										font-size: 14px;
									}
									img{
										width: 35px;
										height: 42px;
										vertical-align: middle;
										margin-right: 15px;
									}
								}
							}
						}
					}
				}
			}
		}
		.ads-box{
			@include flex();
			margin-top: 14px;
			margin-bottom: 31px;
			a{
				width: 296px;
				height: 167px;
			}
		}
		.banner{
			margin-bottom: 50px;
		}
		.product-box{
			background-color:$colorJ;
			padding:30px 0 50px;
			h2{
				font-size:$fontF;
				height:21px;
				line-height:21px;
				color:$colorB;
				margin-bottom:20px;
			}
			.wrapper{
				display:flex;
				.banner-left{
					margin-right:16px;
					img{
						width:224px;
						height:619px;
					}
				}
				.list-box{
					.list{
						@include flex();
						width:986px;
						margin-bottom:14px;
						&:last-child{
							margin-bottom:0;
						}
						.item{
							width:236px;
							height:302px;
							background-color:$colorG;
							text-align:center;
							span{
								display:inline-block;
								width:67px;
								height:24px;
								font-size:14px;
								line-height:24px;
								color:$colorG;
								&.new-pro{
										background-color:#7ECF68;
								}
								&.kill-pro{
										background-color: #E82626;
								}
							}
							.item-img{
								img{
									width:100%;
									height:150px;
									margin-bottom:15px ;
								}
							}
							.item-info{
								h3{
									font-size:$fontJ;
									color:$colorB;
									line-height:$fontJ;
									font-weight:bold;
								}
								p{
									color:$colorD;
									line-height:13px;
									margin:6px auto 13px;
								}
								.price{
									color:#F20A0A;
									font-size:$fontJ;
									font-weight:bold;
									cursor:pointer;
									&:after{
										@include bgImg(22px,22px,'@/assets/imgs/icon-cart-hover.png');
										content:' ';
										margin-left:5px;
										vertical-align: middle;
									}
								}
							}
						}
					}
				}
			}
		}
	}
}

.swiper-button-prev{
	left: 274px;
}
</style>