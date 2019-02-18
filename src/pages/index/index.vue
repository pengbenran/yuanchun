<template>
	<div>
		<!--轮播图-->
		<swiper class="swiper" indicator-dots='true' autoplay='true' indicator-color="#d0d0d0" indicator-active-color="#6e1b22">
			<swiper-item v-for="(item,index) in banner" :key='item' :index="index">
				<img :src="item.banners" mode='widthFix' />
			</swiper-item>
		</swiper>
		<!--购物券-->
		<div class="coupon">
			<div class="coupon-list" v-for="(item,index) in coupon">
				<div class="coupon-list-li">
					<img :src="item.img" />
					<div class="rmb"> <span>¥ </span><span>{{item.rmb}}</span></div>
					<div class="ticket">{{ticket}}元购平台券</div>
					<div class="go">立即抢购</div>
				</div>
			</div>
		</div>
		<!--新人礼包-->
		<div class="giftbag">
			<div class="img"><img :src="giftbag.img" /></div>
			<div class="cant">
				<div class="cant-left">
					{{giftbag.mf}}
				</div>
				<div class="cant-right">
					<p>{{giftbag.tit}}</p>
					<p> <span>{{giftbag.mflq}}</span></p>
				</div>
			</div>
		</div>
		<div class="xian"></div>
		<!--签到-->
		<div class="sign">
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
		<!--vip-->
		<div class="vip">
			<img src="/static/images/indexvip.png" />
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
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isTogo: true,
				msg: [],
				giftbag: {
					img: "/static/images/indexlist.png",
					mf: "免费",
					tit: "新人礼包元淳孕妇护肤品补水保湿面膜滋养蚕丝面膜多效面膜",
					mflq: "免费领取",
				},
				coupon: [{
						img: "/static/images/indexcoupon.png",
						rmb: 300,
						ticket: 100,
					},
					{
						img: "/static/images/indexcoupon.png",
						rmb: 300,
						ticket: 100,
					},
					{
						img: "/static/images/indexcoupon.png",
						rmb: 300,
						ticket: 100,
					},
				],
				banner: [{
						banners: "/static/images/banner.png"
					},
					{
						banners: "/static/images/banner.png"
					},
					{
						banners: "/static/images/banner.png"
					},
				]
			}
		},

		components: {

		},
		mounted: function() {
			var that = this;
			that.hideTabBar();
		},
		methods: {
			//隐藏导航栏
			hideTabBar: function() {
				wx.hideTabBar({
					animation: false //是否需要过渡动画
				})
			},

			//立即抢购按钮
			more: function() {
				let that = this;
				that.isTogo = false
				that.showTabBar()
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

		},

		created() {

		}
	}
</script>

<style lang="less">
	/*checkbox 选项框大小  */
	
	checkbox .wx-checkbox-input {
		width: 14px;
		height: 14px;
		border-radius: 50%;
	}
	
	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		color: #ea3a0d;
	}
	/*弹窗*/
	
	.popup {
		position: absolute;
		z-index: 99;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .7);
		.popup-wp {
			width: 100%;
			padding: 0 10px;
			box-sizing: border-box;
			margin-top: -200px;
			position: relative;
			top: 50%;
			.hidd{
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
		width: 100%;
		background-color: #f5f5f5;
		height: 83px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 36px;
		box-sizing: border-box;
		.coupon-list {
			.coupon-list-li {
				position: relative;
				text-align: center;
				img {
					width: 71px;
					height: 62px;
				}
				.rmb,
				.ticket,
				.go {
					position: absolute;
					color: #ffffff;
				}
				.rmb {
					top: 0;
					display: flex;
					align-items: flex-end;
					left: 10px;
					span {
						display: block;
						&:nth-child(1) {
							font-size: 7px;
							position: relative;
							top: -7px;
						}
						&:nth-child(2) {
							font-size: 26px;
						}
					}
				}
				.ticket {
					top: 28px;
					font-size: 8px;
					left: 15px;
				}
				.go {
					top: 40px;
					font-size: 6px;
					width: 49px;
					margin: 0 auto;
					height: 8px;
					line-height: 8px;
					text-align: center;
					border: 1px solid rgba(255, 255, 255, .6);
					left: 9px;
				}
			}
		}
	}
	/*新人礼包*/
	
	.giftbag {
		width: 100%;
		height: 118px;
		background-color: #FFFFFF;
		padding: 13px 11px 5px 21px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.img {
			width: 100px;
			height: 100px;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.cant {
			width: 237px;
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			margin-top: 18px;
			.cant-left {
				width: 34px;
				height: 15px;
				border-radius: 5px;
				text-align: center;
				line-height: 15px;
				background-color: #6e1b22;
				color: #FFFFFF;
				font-size: 11px;
			}
			.cant-right {
				width: 196px;
				p {
					display: block;
					&:nth-child(1) {
						font-size: 11px;
						color: #333333;
					}
					&:nth-child(2) {
						justify-content: flex-end;
						display: flex;
						span {
							display: block;
							width: 79px;
							height: 20px;
							background-color: #6e1b22;
							text-align: center;
							line-height: 20px;
							border-radius: 5px;
							font-size: 13px;
							color: #ffffff;
							margin-top: 30px;
						}
					}
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
	/*vip*/
	
	.vip {
		margin: 0 auto;
		width: 324px;
		height: 206px;
		padding-bottom: 34px;
		img {
			width: 100;
			height: 100%;
		}
	}
</style>