<template>
	<div style="padding-bottom: 40px;">
		<!--轮播图-->
		<swiper class="swiper" indicator-dots='true' autoplay='true' indicator-color="#d0d0d0" indicator-active-color="#6e1b22">
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
				<img :src="item.voucherType" />
			</div>
			<div class="cant">
				<div class="cant-right">
					<p class="fontHidden"><span class="cant-tip">新人礼</span>{{item.repacketName}}</p>
					<div class="btn" @click="jumpNewPersonGift(index)">免费领取</div>
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
		<div class="popup" catchtouchmove="true" v-if="isTogo">
			<div class="popup-wp">
				<div class="hidd" @click="hidd"></div>
				<div class="img">
					<img src="/static/images/indexpacket.png" />
				</div>

				<div class="tit">
					<span>恭喜您获得新人礼包</span>
				</div>

				<div class="more">
					<img @click="more" src="/static/images/indexmore.png" />
				</div>
			</div>
		</div>
		<!--商品-->
		<div class="recommend">
			<div class="recommend-li">
				<div class="img"><img :src="recommend.img" /></div>
				<div class="pic">
					<span>¥</span>
					<span>{{recommend.pic}}</span>
				</div>
				<div class="tit">{{recommend.tit}}</div>
				<div class="btn">立即购买</div>
				<!--详情-->
				<div class="detail">
					<div class="detail-shop">商品详情</div>
					<div class="more" @click="more">
						<span>查看详情</span>
						<span class="iconfont" :class="isMore?'on':''"> &#xe72b;</span>
					</div>
					<!--展开详情-->
					<div class="more-check" v-show="isMore" :style="{height:height+'px',opacity:opacity}">
						<p>法发顺丰</p>
						<p>法发顺丰</p>
						<p>法发顺丰</p>
						<p>法发顺丰</p>
						<p>法发顺丰</p>
						<p>法发顺丰</p>
						<p>法发顺丰</p>
						<p>法发顺丰</p>
						<p>法发顺丰</p>
					</div>
					</transition>

				</div>
			</div>
		</div>

		<loginModel ref="loginModel"></loginModel>

	</div>
</template>
<script>
	import Api from "@/api/home";
	import store from '@/store/store'
	import loginModel from "@/components/loginModel";
	export default {
		data() {

			return {
				opacity: 0,
				isMore: false,
				isTogo: true,
				msg: [],
				giftbag: [],
				coupon: [],
				banner: [],
				userInfo: {},
				recommend: {
					img: "/static/images/product-list.png",
					pic: 300,
					tit: '元淳会员大礼包，价值300元的面膜，300元的平台卷，成为终身会员'
				}
			}
		},

		components: {
			loginModel
		},
		async mounted() {
			var that = this;
			wx.showLoading({
				title: '加载中',
			})
			that.hideTabBar()
			that.getBanner()
			that.getTicket()
			that.getUserInfo()
			wx.hideLoading();
		},
		methods: {
			//隐藏导航栏
			hideTabBar: function() {
				wx.hideTabBar({
					animation: false //是否需要过渡动画
				})
			},
			// 获取banner图
			getBanner() {
				let that = this
				Api.getBanner().then(function(res) {
					that.banner = res.banner
				})
			},
			// 获取平台券接口
			getTicket() {
				let that = this
				Api.getTicket().then(function(res) {
					that.coupon = res.memberTiket
				})
			},
			// 获取新人礼	`			
			getNewPersonGift() {
				let params = {}
				let that = this
				params.memberId = store.state.userInfo.memberId
				Api.getNewPersonGift(params).then(function(res) {
					that.giftbag = res.giftPackage
					wx.stopPullDownRefresh()
				})
			},

			// 获取用户信息
			async getUserInfo() {
				let that = this
				await that.$refs.loginModel.userLogin()

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
					url: '../newPersonGift/main'
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

			},
			more() {
				let that = this
				that.isMore = !that.isMore
				let op = 0.1
				if(that.isMore) {
					let interval = setInterval(function() {
						op += 0.1
						that.opacity = parseFloat(op)
						if(op > 1) {
							clearInterval(interval)
						}
					}, 40);
				} else {
                     that.opacity=0
				}

			}
		},

		onPullDownRefresh: function() {
			let that = this
			console.log(11111);
			// wx.startPullDownRefresh()
			that.getUserInfo()
		},
	}
</script>

<style lang="less">
	/*checkbox 选项框大小  */
	/*弹窗*/
	
	.popup {
		position: fixed;
		z-index: 99;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, .7);
		.popup-wp {
			width: 100%;
			padding: 0 10px;
			box-sizing: border-box;
			margin-top: -200px;
			position: relative;
			top: 50%;
			.hidd {
				width: 34px;
				height: 34px;
				border-radius: 50%;
				position: absolute;
				top: 0;
				right: 63px;
			}
			.img {
				width: 95%;
				height: 356px;
				margin: 0 auto;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.tit {
				position: absolute;
				top: 202px;
				left: 109px;
				font-size: 15px;
				span {
					display: block;
					color: #FFFFFF;
					margin-left: 11px;
				}
			}
			.more {
				width: 166px;
				height: 36px;
				margin: 0 auto;
				position: absolute;
				bottom: 39px;
				left: 50%;
				margin-left: -83px;
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
					line-height: 20px;
					.cant-tip {
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
				padding: 9px 9px;
				width: 100%;
				box-sizing: border-box;
				font-size: 14px;
				color: #333333;
				line-height: 23px;
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
			.detail-shop {
				width: 100%;
				text-align: center;
				height: 30px;
				line-height: 30px;
				border-top: 8px solid #f1f1f1;
				color: #952731;
				font-size: 15px;
			}
			.more {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 20px;
				width: 100%;
				height: 39px;
				box-sizing: border-box;
				border-top: 1px solid #f1f1f1;
				border-bottom: 1px solid #f1f1f1;
				transition: all .6s;
				span {
					display: block;
					color: #992832;
					font-size: 15px;
					transition: all .3s;
				}
				.on {
					transform: rotate(90deg);
				}
			}
			.more-check {
				width: 100%;
				background: orangered;
				transition: all .6s;
			}
		}
	}
</style>