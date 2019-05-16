<template>
	<div class="container">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
			<div>
				<!--轮播图-->
				<swiper class="swiper" indicator-dots='true' autoplay='true' indicator-color="#d0d0d0" indicator-active-color="#6e1b22" :style="{height:Height+'px'}">
					<swiper-item v-for="(item,index) in banner" :key='item.imageId' :index="index" @click="Brandjump(item.goodsId)">
						<img :src="item.imageUrl" mode='widthFix' />
					</swiper-item>
				</swiper>
				<!--购物券-->
				<div class="coupon">
					<div class="coupon-list">
						<div class="coupon-list-li" v-for="(item,index) in coupon" :key='item.id' :index="index" @click="jumpCoupon">
							<div class="ticket">{{item.giveMoney}}平台券</div>
							<div class="rmb">{{item.money}}元购</div>
						</div>
					</div>
				</div>
				<!--通告滚动 -->
				<div class="advs">
					<div class="adv">
						<div class="advtit"><img src="/static/images/toutian.png" /></div>
						<div class="box">
							<div class="animate" v-for="(item,index) in message" :key="item.id">
								<span class="advList" v-for="(innerItem,innerIndex) in item">{{innerItem.content}}</span>
							</div>
						</div>
					</div>
				</div>
				<!--新人礼包-->
				<div class="giftbags" v-if="hasGift">
					<div class="tit">新人礼包</div>
					<scroll-view class="scroll-view_H" scroll-x>
						<div class="giftbag" @click="jumpNewPersonGift(index)" v-for="(item,index) in giftbag" :key='item.repacketId' :index="index">
							<div class="giftbag-list">
								<div class="img">
									<img :src="item.voucherType" />
								</div>
								<div class="cant">
									<div class="cant-right">
										<p class="fontHidden">{{item.repacketName}}</p>
										<div class="btn">免费领取</div>
									</div>
								</div>
							</div>
						</div>
					</scroll-view>                      
				</div>
				<!--弹窗-->
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
				<!--合伙人大礼包-->
				<div class="recommend">
					<div class="comtit">
						<span><img src="/static/images/comtit.png"/></span>
						<span>合伙人大礼包</span>
						<span><img src="/static/images/comtit.png"/></span>
					</div>
					<div class="recommend-li">
						<div class="img">
							<img :src="goodsDO.thumbnail" />
							<div class="tit">
								<p>{{goodsDO.name}}</p>
								<p @click="jumpMemberUpDetail(goodsDO.goodsId)">查看详情 > </p>
							</div>
						</div>
						<div class="subTit">{{goodsDO.pageTitle}}</div>
						<div class="pic">
							<span>¥</span>
							<span>{{goodsDO.price}}</span>
						</div>
						<div class="btns">
							<div class="btn" @click="jumpmemberUp">立即抢购</div>
						</div>
					</div>
				</div>
				<!--合伙人专属区-->
				<div class="exclusive">
					<div class="comtit">
						<span><img src="/static/images/comtit.png"/></span>
						<span>合伙人专属区</span>
						<span><img src="/static/images/comtit.png"/></span>
					</div>
					<div class="exclusive-list">
						<div class="exclusive-list-li" v-for="(item,index) in exclusive">
							<div class="left"><img :src="item.thumbnail" /></div>
							<div class="right">
								<div class="name">{{item.name}}</div>
								<div class="picold">
									<span>¥{{item.price}}+</span>
									<span>{{item.unit}}平台券</span>
								</div>
								<div class="pic">
									<span>¥{{item.cost}}</span>
									<span @click="jumpDistribe(item.goodsId)">立即购买</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--签到领取面膜-->
				<div class="sign" @click="jump">
					<div class="comtit">
						<span><img src="/static/images/comtit.png"/></span>
						<span>签到领取面膜</span>
						<span><img src="/static/images/comtit.png"/></span>
					</div>
					<div class="sign-wp">
						<div class="sign-left">
							<span><img src="/static/images/vipicon.png"/></span>
							<span>签到</span>
						</div>
						<div class="sign-right">
							<span>点击签到领取面膜</span>
							<span>&gt;</span>
						</div>
					</div>
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
	import Api_good from "@/api/goods";
	export default {
		data() {
			return {
				isLoading: false,
				opacity: 0,
				isMore: false,
				isTogo: false,
				msg: [],
				giftbag: [],
				coupon: [],
				banner: [],
				userInfo: {},
				goodsDO: {},
				Height: '',
				message: [],
				showDetail: false,
				exclusive: [],
				hasGift:false,
			}
		},
		components: {
			loginModel,
			loading,
			wxParse
		},
		async mounted() {
			var that = this;
			let Width = wx.getSystemInfoSync().windowWidth
			that.Height = Width / 2.5
			that.hideTabBar()
			that.getBanner()
			that.getTicket()
			that.getUserInfo()
			that.getmemberUpGoods()
			that.getDistribeGood()
		},
		onShow() {
			let that = this
			that.giftbag = store.state.giftbag
			if(that.giftbag.length==0){
				that.hasGift=false
			}
			else{
				that.hasGift=true
			}
		},
		methods: {
			//隐藏导航栏
			hideTabBar: function() {
				wx.hideTabBar({
					animation: false //是否需要过渡动画
				})
			},
			showGoodDetail() {
				let that = this
				that.showDetail = !that.showDetail
			},
			// 获取会员升级商品
			getmemberUpGoods() {
				let that = this
				Api.getmemberUpGoods().then(function(res) {
					that.goodsDO = res.goodsDO
				})
			},
			// 获取合伙人专属礼包
			getDistribeGood(){
				let that = this
				let params={}
				params.offset=0;
				params.limit=5
				params.disabled=1
				Api_good.getGoodsAll(params).then(function(res) {
					if(res.code==0){
						that.exclusive = res.Goods
					}
					
				})
			},
			// 跳转合伙人礼包详情
			jumpMemberUpDetail(goodsId){
				wx.navigateTo({
					url:'../memberUpDetail/main?goodsId='+goodsId
				})
			},
			jumpDistribe(goodsId){
				let that=this
				if(that.userInfo.lvId==11){
					wx.showToast({
						icon: 'none',
						title: '请先成为合伙人',
					})
				}
				else{
					wx.navigateTo({
						url:'../product-detail/main?goodsId='+goodsId
					})
				}
             },
			jumpmemberUp() {
				let that = this
				let goodarr = []
				let goodlist = {}
				let Goods = {}
				goodlist.pic = 1
				goodlist.num = 1;
				goodlist.image = that.goodsDO.thumbnail
				goodlist.name = that.goodsDO.name
				goodlist.goodsId = that.goodsDO.goodsId
				goodlist.price = that.goodsDO.price
				goodlist.cart = 0
				goodarr[0] = goodlist;
				Goods.googitem = goodarr
				store.commit("stateGoodItem", JSON.stringify(Goods))
				wx.navigateTo({
					url: "../cart-order/main?cart=0&orderType=2"
				})
			},
			// 获取banner图
			getBanner() {
				let that = this
				Api.getBanner().then(function(res) {
					that.banner = res.banner
					for(let i = 0; i < res.carousel.length; i += 2) {
						let messageArry = []
						for(let j = 0; j < 2; j++) {
							if(res.carousel[i + j] != undefined) {
								res.carousel[i + j].publicTime = utils.formatTime(res.carousel[i + j].msgDate)
								messageArry.push(res.carousel[i + j])
							}
						}
						that.message.push(messageArry)
					}
					wx.setStorageSync('oneBox', res.oneBox)
					wx.setStorageSync('postage', res.postage)
				})
			},
			pushMessage(message) {

			},
			// 获取平台券接口
			getTicket() {
				let that = this
				Api.getTicket().then(function(res) {
					that.coupon = res.memberTiket
				})
			},
			// 获取新人礼
			getNewPersonGift() {
				let params = {}
				let that = this
				params.memberId = store.state.userInfo.memberId
				Api.getNewPersonGift(params).then(function(res) {
					if(res.code == 0) {
						that.isLoading = true
						if(res.giftPackage.length == 0) {
							that.isTogo = false
							that.hasGift=false
						} else {
							that.isTogo = true
							that.hasGift=true
						}
						store.commit("stateGiftbag", res.giftPackage)
						that.giftbag = store.state.giftbag

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

			//brand跳转
			Brandjump(goodsId) {
				if(goodsId) {
					wx.navigateTo({
						url: '../product-detail/main?goodsId=' + goodsId
					})
				}
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
		onShareAppMessage: function() {
			withShareTicket: true
		}
	}
</script>

<style lang="less">
	/*公用标题*/
	
	.comtit {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 190px;
		margin: 0 auto;
		padding: 30px 0 15px 0;
		span {
			display: block;
			&:nth-child(1) {
				width: 27px;
				height: 8px;
				img {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
			&:nth-child(2) {
				font-size: 19px;
				color: #333333;
				font-weight: bold;
			}
			&:nth-child(3) {
				width: 27px;
				height: 8px;
				transform: rotate(180deg);
				img {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
		}
	}
	/*通告滚动*/
	
	.advs {
		padding: 0 12px;
		box-sizing: border-box;
	}
	
	.adv {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #b02c37;
		width: 100%;
		height: 36px;
		box-sizing: border-box;
		.advtit {
			width: 88px;
			height: 15px;
			img {
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
	
	.box {
		width: 250px;
		overflow: hidden;
		line-height: 32px;
		height: 36px;
	}
	
	.animate {
		padding-left: 20px;
		font-size: 14px;
		color: #333333;
		display: inline-block;
		white-space: nowrap;
		animation: 15s wordsLoop linear infinite normal;
	}
	
	@keyframes wordsLoop {
		0% {
			transform: translateX(200px);
			-webkit-transform: translateX(200px);
		}
		100% {
			transform: translateX(-100%);
			-webkit-transform: translateX(-100%);
		}
	}
	
	@-webkit-keyframes wordsLoop {
		0% {
			transform: translateX(200px);
			-webkit-transform: translateX(200px);
		}
		100% {
			transform: translateX(-100%);
			-webkit-transform: translateX(-100%);
		}
	}
	
	@import url("~mpvue-wxparse/src/wxParse.css");
	/*checkbox 选项框大小  */
	/*弹窗*/
	
	.wxParse .img {
		display: flex;
	}
	
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		.bcgmode {
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, .5);
		}
		.popup-wp {
			border-radius: 10rpx;
			width: 100%;
			position: absolute;
			top: 100px;
			color: #FFFFFF;
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
		width: 100%;
		padding: 0 12px;
		box-sizing: border-box;
		margin: 12px 0;
		.coupon-list {
			align-items: center;
			justify-content: space-between;
			display: flex;
			.coupon-list-li {
				width: 110px;
				height: 60px;
				background: #fff2f3;
				border-radius: 8px;
				text-align: center;
				line-height: 1;
				.ticket {
					font-size: 17px;
					color: #333333;
					padding: 11px 0 8px 0;
				}
				.rmb {
					font-size: 15px;
					font-weight: bold;
					color: #ff1f1f;
				}
			}
		}
	}
	/*新人礼包*/
	
	.giftbags {
		width: 100%;
		height: 184px;
		background: #c42f3c;
		margin-top: 12px;
		.tit {
			text-align: center;
			font-size: 19px;
			font-weight: bold;
			color: #FFFFFF;
			padding: 12px 0;
		}
	}
	
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		.giftbag {
			display: inline-block;
			margin-right: 12px;
			&:nth-child(1) {
				margin-left: 12px;
			}
		}
		.giftbag-list {
			display: flex;
			position: relative;
			justify-content: space-between;
			border-radius: 8px;
			background: #FFFFFF;
			height: 125px;
			overflow: hidden;
			width: 290px;
			.img {
				width: 125px;
				height: 125px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.cant {
				flex-grow: 1;
				width: 1px;
				.cant-right {
					padding: 0 5px;
					.fontHidden {
						font-size: 14px;
						color: #333333;
						line-height: 20px;
					/*	font-weight: bold;*/
						padding-top: 12px;
					}
					.btn {
						width: 90px;
						height: 33px;
						border-radius: 16.5px;
						background: linear-gradient(to right, #c42f3c, #ff3344);
						line-height: 33px;
						text-align: center;
						font-size: 14px;
						color: #ffffff;
						/*font-weight: bold;*/
						position: absolute;
						bottom: 12px;
						right: 12px;
					}
				}
			}
		}
	}
	/*签到*/	
	.sign {
		padding: 0 12px 40px 12px;
		box-sizing: border-box;
		.sign-wp {
			border-radius: 12px;
			background: linear-gradient(to right,#c42f3c, #ff3344);
			width: 100%;
			height: 66px;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: center;
			box-sizing: border-box;
			padding: 0 10px 0 20px;
			.sign-left {
				width: 60px;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				font-weight: bold;
				font-size: 17px;
				color: #ffffff;
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
				width: 138px;
				font-size: 15px;
				color: #ffffff;
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
		padding: 0 12px;
		box-sizing: border-box;
		.recommend-li {
			border-radius: 12px;
			overflow: hidden;
			padding-bottom: 12px;
			box-shadow: 0 4px 8px #e6e5ff;
			width: 100%;
			.img {
				width: 100%;
				height: 375px;
				position: relative;
				img {
					width: 100%;
					height: 100%;
					display: block;
				}
				.tit {
					padding: 0 12px;
					box-sizing: border-box;
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					height: 44px;
					background: linear-gradient(to right, #1dae00, #2bd982);
					display: flex;
					align-items: center;
					justify-content: space-between;
					p {
						display: block;
						&:nth-child(1) {
							font-size: 19px;
							color: #ffffff;					
						}
						&:nth-child(2) {
							font-size: 14px;
							color: #ffffff;
						}
					}
				}
			}
			.pic {
				padding: 0 12px;
				width: 100%;
				box-sizing: border-box;
				color: #ff0000;
				font-size: 17px;
				margin-top: 10px;
				font-weight: bold;
				span {
					&:nth-child(1) {
						font-size: 17px;
						margin-right: 3px;
					}
				}
			}
			.subTit {
				padding: 0 12px;
				box-sizing: border-box;
				font-size: 17px;
				color: #333333;
				width: 350px;
				margin-top: 8px;
				font-weight: bold;
				line-height: 20px;
			}
			.btns {
				padding: 0 12px;
				box-sizing: border-box;
				width: 100%;
			}
			.btn {
				margin-top: 17px;
				width: 100%;
				height: 44px;
				border-radius: 22px;
				background: linear-gradient(to right, #c42f3c, #ff3344);
				line-height: 44px;
				text-align: center;
				font-size: 16px;
				color: #ffffff;
				font-weight: bold;
			}
		}
		/*详情*/
		.detail {
			// margin-top: 30px;
			.detail-shop {
				width: 100%;
				text-align: center;
				height: 50px;
				line-height: 50px;
				border-bottom: 8px solid #f1f1f1;
				color: #952731;
				font-size: 15px;
				padding: 0 10px;
				box-sizing: border-box;
			}
		}
	}
	
	.footer {
		height: 80rpx;
		padding: 20rpx 30rpx 10rpx 0;
		img {
			width: 100%;
			height: 100%;
			display: block;
		}
	}
	/*合伙人专区*/
	
	.exclusive {
		padding: 0 12px;
		box-sizing: border-box;
		.exclusive-list {
			.exclusive-list-li {
				display: flex;
				width: 100%;
				height: 150px;
				border-radius: 12px;
				overflow: hidden;
				box-shadow:0 0 8px #e6e5ff;
				margin-top: 10px;
				&:nth-child(1){margin-top: 0;}
				.left {
						width: 150px;
						height: 150px;
						padding: 4px 0 4px 4px;
						box-sizing: border-box;
						img{width: 100%;height: 100%;border-top-left-radius: 8px;border-bottom-left-radius: 8px;}
				}
				.right {
						padding: 14px 12px 0 7px;
						box-sizing: border-box;
						width: 1px;
						flex-grow: 1;
					.name {
                        font-size: 15px;
                        color: #333333;
                        line-height: 20px;
                         height: 40px;
                          
					}
					.picold {
						margin-top: 20px;
						font-size: 16px;
						color: #ff0000;
					}
					.pic {  
						margin-top: 11px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						span{
							display: block;
							&:nth-child(1){
								font-size: 19px;
								color: #ff0000;
								font-weight: bold;
							}
							&:nth-child(2){
								font-size: 14px;
								color: #ffffff;
								text-align: center;
								width: 90px;
								height: 33px;
								border-radius: 16.5px;
								background: linear-gradient(to right,#c42f3c,#ff3344);
								line-height: 33px;
								
							}
						}
					}
				}
			}
		}
	}
</style>