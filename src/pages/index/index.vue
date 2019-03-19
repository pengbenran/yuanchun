<template>
	<div class="container">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
			<div style="padding-bottom: 40px;">
				<!--轮播图-->
				<swiper class="swiper" indicator-dots='true' autoplay='true' indicator-color="#d0d0d0" indicator-active-color="#6e1b22" :style="{height:Height+'px'}">
					<swiper-item v-for="(item,index) in banner" :key='item.imageId' :index="index">
						<img :src="item.imageUrl" mode='widthFix' />
					</swiper-item>
				</swiper>

				<!--购物券-->
				<div class="coupon">
					<div class="coupon-list">
						<div class="coupon-list-li" v-for="(item,index) in coupon" :key='item.id' :index="index" @click="jumpCoupon">
							<!-- <img src="/static/images/indexcoupon.png" /> -->
							<div class="rmb"> <span>¥ </span>{{item.money}}</div>
							<div class="ticket">购{{item.giveMoney}}平台券</div>
							<div class="go">立即抢购</div>
						</div>
					</div>
				</div>

				<!--新人礼包-->
				<div class="giftbag" v-for="(item,index) in giftbag" :key='item.repacketId' :index="index">
					<div class="img">
						<img :src="item.voucherType"/>
					</div>
					<div class="cant">
						<div class="cant-right">
							<p class="fontHidden"><span class="cant-tip">新人礼</span>{{item.repacketName}}</p>
							<div class="btn" @click="jumpNewPersonGift(index)">立即领取</div>
						</div>
					</div>
				</div>
				<div class="xian"></div>

				<!--签到-->
				<div class="sign" @click="jump">
					<div class="sign-wp">
						<div class="sign-left">
							<span><img src="/static/images/vipicon.png"/></span>
							<span>签到</span>
						</div>
						<div class="sign-right">
							<span>签到领取面膜</span>
							<span>&gt;</span>
						</div>
					</div>
				</div>
				<!--弹窗-->
						<!-- 头条广告 -->
				<div class="adv">
					<div class="advTop">
						<span>AI元淳公告</span>
						<span class="iconfont">&#xe72b;</span>
					</div>
					<div class="advBottom">
						<swiper class="swiper"  autoplay='true' vertical='true'>
							<swiper-item v-for="(item,index) in message" :key="item.id">
								<div v-for="(innerItem,innerIndex) in item" class="advList">
									<div class="advconent fontHidden1">{{innerItem.content}}</div>
									<div class="advtime">
										<span class="advlib">加精</span>
										<span>&nbsp;&nbsp;AI 元淳&nbsp;&nbsp;{{innerItem.publicTime}}</span>
									</div>			
								</div>
							</swiper-item>
						</swiper>
					</div>	
				</div>
				<div class='popup' v-if="isTogo">
					<div class='bcgmode' @click="hidd"></div>
					<div class='popup-wp'>
						<div class="hidd" @click="hidd">
							<span class="iconfont">&#xe658;</span>
						</div>
						<div class="img" @click="more">
							<img src="https://shop.guqinet.com/html/images/yuanchun/indexpacket.png" />
						</div>
					</div> 
				</div>
				<!--商品-->
				<div class="recommend">
					<div class="recommend-li">
						<div class="img"><img :src="goodsDO.thumbnail" /></div>
						<div class="pic">
							<span>¥</span>
							<span>{{goodsDO.price}}</span>
						</div>
						<div class="tit fontHidden">{{goodsDO.name}}</div>
						<div class="subTit fontHidden">{{goodsDO.pageTitle}}</div>
						<div class="btn" @click="jumpmemberUp">立即购买</div>
						<!--详情-->
						<div class="detail">
							
							<div class="detail-shop">商品详情</div>
							<!-- <div class="more">
								<span>商品详情</span>
								<span class="iconfont"> &#xe72b;</span>
							</div> -->
							<!--展开详情-->
							<div class="more-check">
								<wxParse :content="goodsDO.intro" @preview="preview" @navigate="navigate" />
							</div>
						</div>
					</div>
				</div>
				<div class="footer">
					<img src="https://shop.guqinet.com/html/images/shuiguo/index/footerImg.png"/>
				</div>
			</div>
	</blockquote>
	<loginModel ref="loginModel"></loginModel>
</div>
</template>
<script>
	import Api from "@/api/home";
	import store from '@/store/store'
	import loginModel from "@/components/loginModel";
	import loading from '@/components/loading'
	import wxParse from 'mpvue-wxparse'
	import utils from "@/utils/index"
	export default {
		data() {
			return {
				isLoading:false,
				opacity: 0,
				isMore: false,
				isTogo: false,
				msg: [],
				giftbag: [],
				coupon: [],
				banner: [],
				userInfo: {},
				goodsDO: {},
				Height:'',
				message:[]
			}
		},
		components: {
			loginModel,
			loading,
			wxParse
		},
		async mounted() {
			var that = this;
			let Width=wx.getSystemInfoSync().windowWidth
			that.Height=Width/2.5
			that.hideTabBar()
			that.getBanner()
			that.getTicket()
			that.getUserInfo(),
			that.getmemberUpGoods()
		},
		onShow(){
			let that=this
			that.giftbag=store.state.giftbag
		},
		methods: {
			//隐藏导航栏
			hideTabBar: function() {
				wx.hideTabBar({
					animation: false //是否需要过渡动画
				})
			},
			// 获取会员升级商品
			getmemberUpGoods(){
				let that=this
				Api.getmemberUpGoods().then(function(res){
					that.goodsDO=res.goodsDO
				})
			},
			jumpmemberUp(){	
				let that=this
				let goodarr=[]
				let goodlist={}
				let Goods={}
				goodlist.pic = 1
				goodlist.num = 1;
				goodlist.image = that.goodsDO.thumbnail
				goodlist.name = that.goodsDO.name
				goodlist.goodsId = that.goodsDO.goodsId
				goodlist.price = that.goodsDO.price
				goodlist.cart=0
				goodarr[0] = goodlist;
				Goods.googitem = goodarr
				store.commit("stateGoodItem",JSON.stringify(Goods))
				wx.navigateTo({
					url: "../cart-order/main?cart=0&orderType=2"
				})
			},
			// 获取banner图
			getBanner() {
				let that = this
				Api.getBanner().then(function(res) {
					that.banner = res.banner
					for(let i=0;i<res.carousel.length;i+=2){
						let messageArry=[]
						for(let j=0;j<2;j++){
							if(res.carousel[i+j]!=undefined){
								res.carousel[i+j].publicTime=utils.formatTime(res.carousel[i+j].msgDate)
								messageArry.push(res.carousel[i+j])
							}	
						}
						that.message.push(messageArry)
					}
					 wx.setStorageSync('oneBox', res.oneBox)
					 wx.setStorageSync('postage', res.postage)
				})
			},
			pushMessage(message){

			},
			// 获取平台券接口
			getTicket() {
				let that = this
				Api.getTicket().then(function(res) {
					that.coupon = res.memberTiket
				})
			},
			// 获取新人礼
			getNewPersonGift(){
				let params={}
				let that=this
				params.memberId=store.state.userInfo.memberId
				Api.getNewPersonGift(params).then(function(res){
					if(res.code==0){
						that.isLoading=true
						if(res.giftPackage.length==0){
							that.isTogo = false
						}
						else{
							that.isTogo = true
						}
						store.commit("stateGiftbag",res.giftPackage)	
						that.giftbag=store.state.giftbag
						
					}
				})
			},
			// 获取用户信息
			async getUserInfo() {
				let that = this
				await that.$refs.loginModel.userLogin()
 				wx.stopPullDownRefresh()
			},
			jumpCoupon: function() {
				wx.navigateTo({
					url: '../index-coupon/main'
				})
			},
			//免费领取跳转
			jumpNewPersonGift: function(index) {
				let chooseGift = []
				let that = this
				chooseGift.push(that.giftbag[index])
				store.commit("stateNewPersonGift", chooseGift)
				wx.navigateTo({
					url: '../newPersonGift/main?orderType=2'
				})
			},

			//立即抢购按钮
			more: function() {
				let that = this;
				that.isTogo = false
				that.showTabBar()
				wx.navigateTo({
					url: '../index-gift/main'
				})
			},
			//关闭弹窗
			hidd: function() {
				let that = this;
				that.isTogo = false
				that.showTabBar()
			},
			//显示导航栏
			showTabBar: function() {
				let that = this;
				wx.showTabBar({
					animation: false //是否需要过渡动画
				})
			},
			//签到跳转
			jump: function() {
				wx.navigateTo({
					url: "../sign/main"
				})

			}
		},
		onPullDownRefresh: function() {
			let that = this
			that.getUserInfo()
		},
		onShareAppMessage: function () {
			withShareTicket: true
		}
	}
</script>

<style lang="less">
@import url("~mpvue-wxparse/src/wxParse.css");
	/*checkbox 选项框大小  */
	/*弹窗*/
	
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		.bcgmode{
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.5);
		}
		.popup-wp {
			border-radius:10rpx; 
			width: 100%;
			position: absolute;
			top: 100px;
			.hidd {
				position: absolute;
				top: -30px;
				right: 30px;
				font-size: 26px;
			}
			.img {
				width: 361px;
				height: 336px;
				margin: 0 auto;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.adv {
		border: 1px solid #ddd;
		width: 95%;
		margin: 10px auto;
		border-radius: 10px;
		overflow: hidden;
		.advTop{
			display: flex;
			justify-content: space-between;
			background: linear-gradient(to bottom,#cd3d4b,#922830);
			height: 40px;
			line-height:40px;
			padding: 0 10px;
			box-sizing: border-box;
			font-size: 16px;
			color:#fff;

		}
		.advBottom{
			background: #ffeff0;
			padding-left: 10px;
			box-sizing: border-box;
			flex-grow: 1;
			font-size: 18px;
			swiper{
				height: 130px;
				.advList{
					height: 60px;
					padding: 0 10px;
					box-sizing: border-box;
					margin-bottom: 5px;
					.advconent{
					  height: 30px;
					  line-height:30px;	
					  font-size: 16px;
					  color: #313131;
					}
					.advtime{
						font-size: 14px;
						color:#7c7c7c;
						.advlib{
							color:#fff;
							display: inline-block;
							background:#B83F4A;
							width:40px;
							text-align: center;
							height: 25px;
							line-height:25px;
							border-radius: 5px;
						}
					}
				}
			}
		}
	}
	/*轮播*/
	
	.swiper {
		width: 100%;
		image {
			display: block;
			width: 100%;
		}
	}
	/*购物券*/
	
	.coupon {
		background-color: #f5f5f5;
		height: 70px;
		position: relative;
		overflow: hidden;
		.coupon-list {
			width: 100%;
			position: absolute;
			display: flex;
			justify-content: space-around;
			bottom: -20px;
			.coupon-list-li {
				text-align: center;
				background: #6e1b22;
				width: 80px;
				height: 80px;
				border-radius: 40px 40px 35px 35px;
				color: #fff;
				.rmb {
					top: 0;
					left: 10px;
					span {
						&:nth-child(1) {
							font-size: 7px;
						}
						&:nth-child(2) {
							font-size: 26px;
						}
					}
				}
				.ticket {
					font-size: 10px;
					height: 18px;
					line-height: 18px;
				}
				.go {
					font-size: 8px;
					width: 49px;
					margin: 0 auto;
					height: 12px;
					line-height: 12px;
					text-align: center;
					border: 1px solid rgba(255, 255, 255, .6);
				}
			}
		}
	}
	/*新人礼包*/
	
	.giftbag {
		width: 100%;
		height: 100px;
		background-color: #FFFFFF;
		padding: 13px 11px 5px 21px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.img {
			width: 90px;
			height: 90px;
			border-radius: 4px;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.cant {
			width: 237px;
			.cant-right {
				p {
					font-size: 11px;
					color: #333333;
					line-height:20px;
					height: 40px;
					.cant-tip{
						width: 40px;
						height: 15px;
						border-radius: 5px;
						text-align: center;
						line-height: 15px;
						background-color: #6e1b22;
						color: #FFFFFF;
						display: inline-block;
					}
				}
				.btn {
					width: 79px;
					height: 20px;
					background-color: #6e1b22;
					text-align: center;
					line-height: 20px;
					border-radius: 5px;
					font-size: 13px;
					color: #ffffff;
					padding: 0;
					border: 0;
					outline: none;
					float: right;
					margin-top: 15px;
				}
			}
		}
	}
	
	.xian {
		width: 100%;
		height: 13px;
		background-color: #f4f4f4;
	}
	/*签到*/
	
	.sign {
		padding: 10px;
		box-sizing: border-box;
		.sign-wp {
			border-radius: 5px;
			box-shadow: 0 3px 10px rgba(0, 0, 0, 0.322);
			background: linear-gradient(#6e1b22, #7c272f);
			width: 100%;
			height: 66px;
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			flex-wrap: wrap;
			align-items: center;
			box-sizing: border-box;
			padding: 0 10px 0 20px;
			.sign-left {
				width: 60px;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				span {
					color: #FFFFFF;
					&:nth-child(1) {
						height: 20px;
						width: 20px;
						img {
							width: 100%;
							height: 100%;
						}
					}
					&:nth-child(2) {}
				}
			}
			.sign-right {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				align-items: center;
				width: 100px;
				span {
					color: #FFFFFF;
					&:nth-child(1) {}
					&:nth-child(2) {
						font-size: 17px;
					}
				}
			}
		}
	}
	/*商品*/
	
	.recommend {
		width: 100%;
		.recommend-li {
			width: 100%;
			.img {
				width: 375px;
				height: 375px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.pic {
				padding: 0 9px;
				width: 100%;
				box-sizing: border-box;
				color: #fe2448;
				font-size: 22px;
				margin-top: 10px;
				span {
					&:nth-child(1) {
						font-size: 17px;
						margin-right: 3px;
					}
				}
			}
			.tit {
				padding: 0 9px;
				width: 300px;
				box-sizing: border-box;
				font-size: 18px;
				color: #272727;
				line-height: 30px;
			}
			.subTit{
				padding: 0 9px;
				width: 350px;
				box-sizing: border-box;
				font-size: 14px;
				color: #7c7c7c;
				line-height: 30px;
				margin-bottom: 10px;
			}
			.btn {
				width: 100%;
				height: 50px;
				background: linear-gradient(to right, #d2313f, #77222a);
				line-height: 50px;
				text-align: center;
				font-size: 17px;
				color: #fefefe;
			}
		}
		/*详情*/
		.detail {
			// margin-top: 30px;
			.detail-shop {
				width: 100%;
				text-align: center;
				height: 30px;
				line-height: 30px;
				border-top: 8px solid #f1f1f1;
				color: #952731;
				font-size: 15px;
			}
			// .more {
			// 	display: flex;
			// 	justify-content: space-between;
			// 	align-items: center;
			// 	padding: 0 20px;
			// 	width: 100%;
			// 	height: 39px;
			// 	box-sizing: border-box;
			// 	border-top: 1px solid #f1f1f1;
			// 	border-bottom: 1px solid #f1f1f1;
			// 	transition: all .6s;
			// 	span {
			// 		display: block;
			// 		color: #992832;
			// 		font-size: 15px;
			// 		transition: all .3s;
			// 	}
			// 	.on {
			// 		transform: rotate(90deg);
			// 	}
			// }
			// .more-check {
			// 	width: 100%;
			// 	background: orangered;
			// 	transition: all .6s;
			// }
		}
	}
	.footer{height: 80rpx;padding: 20rpx 30rpx 10rpx 0; 
		img{
			width: 100%;
			height: 100%;
			display: block;
		}
	}
</style>