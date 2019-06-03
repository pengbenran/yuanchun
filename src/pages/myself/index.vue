<template>
	<div class="container">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
			<div class="header">
				<div class="userInfo">
					<div class="avator">
						<img :src="userInfo.face">
					</div>
					<div class="userName">
						<p class="memberName">{{userInfo.name}}</p>
						<p class="memberLv">
							<span>{{userInfo.lvidname}}</span>
							<span @click="jumpvipUp" v-if="canUp">点击升级</span>
						</p>
					</div>
				</div>
			</div>
			<!--进度条-->
			<div class="progress" v-if="userInfo.defaultLv!=1">
				<div class="progress-left">
					<div class="progress-cant">
						<span class="iconfont">&#xe636;</span>
						<span>{{userInfo.lvidname}}</span>
					</div>
					<div class="xian"></div>
				</div>
				<div class="progress-right">
					<div class="hint">当前进度{{count}}/{{condition}}</div>
					<progress border-radius="3" :percent="progressNum" activeColor="#ffda83" />
				</div>
			</div>
			<div class="menu">
				<div class="list">
					<p class="num">{{point}}</p>
					<p class="name">平台券</p>
				</div>
				<div class="list" @click="jump('../inComing/main')">
					<p class="num">{{advance}}</p>
					<p class="name">余额</p>
				</div>
				<div class="list" @click="jump('../favoriteList/main')">
					<p class="num">{{orderStatus.favorite}}</p>
					<p class="name">收藏</p>
				</div>
			</div>
			<div class="order">
				<div class="orderTitle">
					<div class="allOrer-left">我的订单</div>
					
				</div>
				<div class="orderItem">
					<div class="orderList" @click="jump('../orderList/main?orderStatus=1')">
						<p>{{orderStatus.payOrder}}</p>
						<p>待付款</p>
					</div>
					<div class="orderList" @click="jump('../orderList/main?orderStatus=2')">
						<p>{{orderStatus.shipOrder}}</p>
						<p>待发货</p>
					</div>
					<div class="orderList" @click="jump('../orderList/main?orderStatus=3')">
						<p>{{orderStatus.takeOrder}}</p>
						<p>待收货</p>
					</div>
					<div class="orderList" @click="jump('../orderList/main?orderStatus=4')">
						<p>{{orderStatus.completeOrder}}</p>
						<p>已完成</p>
					</div>
				</div>
			</div>

			<div class="menuContain">
				<div class="menuTitle">
					我的服务
				</div>
				<div class="menuItem" v-for="(item,index) in menuItem" :key="item" :inde="index" @click="jump(item.jumpUrl)">
					<div class="icon">
						<img :src="item.icon">
					</div>
					<div class="menuname">{{item.menuName}}</div>
				</div>
			</div>
			<div class="footer">
				<img src="https://shop.guqinet.com/html/images/shuiguo/index/footerImg.png" />
			</div>
			<div class="more" v-if="ismore" @click="more">
				<span><img src="/static/images/more.png"/></span>
			</div>
		</blockquote>
	</div>
</template>

<script>
	import store from '@/store/store'
	import Api from '@/api/member'
	import Api_order from '@/api/order'
	import Lib from '@/utils/index'
	import loading from '@/components/loading'
	import utils from '@/utils/index'
	import api_site from '@/api/site'
	export default {
		data() {
			return {
				ismore: true,
				count: '', //拉了多少人
				condition: '', //总人数
				menuItem: [{
						icon: '/static/images/icon3.png',
						menuName: '我的团队',
						jumpUrl: '../Partner/main',
						flag: true

					},
					{
						icon: '/static/images/icon4.png',
						menuName: '地址管理',
						jumpUrl: '../address/main',
						flag: true
					},
					{
						icon: '/static/images/kefu.png',
						menuName: '联系客服',
						jumpUrl: '../kefu/main',
						flag: true
					},
					{
						icon: '/static/images/tequan.png',
						menuName: '我的特权',
						jumpUrl: '../privilege/main',
						flag: true
					}
				],
				isClickUp: true,
				userInfo: {},
				orderStatus: {},
				phoneNumber: '',
				isLoading: false,
				canUp: false
			}
		},
		components: {
			loading
		},
		computed: {
			progressNum() {
				let that = this;
				var progressNum = (that.count / that.condition) * 100;
				return progressNum //把进度条return出去
			},
			advance() {
				return store.state.userInfo.advance
			},
			point() {
				return store.state.userInfo.point
			}
		},

		methods: {
			more() {
				this.ismore = false
			},
			jump(url) {
				let that = this
				if(url == "../kefu/main") {
					that.makePhone()
				} else if(url == "../privilege/main" && that.userInfo.defaultLv == 1) {
					Lib.ToastShow('抱歉你还没有成为合伙人', 'none')
				} else {
					wx.navigateTo({
						url: url,
					})
				}
			},
			// 拨打电话
			makePhone() {
				let that = this
				wx.makePhoneCall({
					phoneNumber: that.phoneNumber,
				})
			},
			jumpvipUp() {
				let that = this
				let goodItem = store.state.goodItem
				if(that.count >= that.condition) {
					let params = {}
					params.memberId = that.userInfo.memberId
					if(that.isClickUp) {
						switch(that.userInfo.defaultLv) {
							case 1:
								wx.showModal({
									title: '提示',
									content: '购买大礼包成为合伙人',
									confirmText: '去看看',
									success(res) {
										if(res.confirm) {
											let goodsId = 69
											wx.navigateTo({
												url: '../memberUpDetail/main?goodsId=' + goodsId
											})
										} else if(res.cancel) {

										}
									}
								})
								break
							case 2:
								that.upshift(params)
								break;
							case 3:
								that.upHighest(params)
								break;
							default:
								that.makePhone()
						}
					}
				} else {
					wx.showToast({
						title: '条件不满足',
						image: "/static/images/error.png",
						duration: 1500
					})
				}
			},
			// 升级高级合伙人
			upshift(params) {
				let that = this
				that.isClickUp = false
				Api.upshift(params).then(function(res) {
					if(res.code == 0) {
						store.commit("storeUserInfo", res.memberDO)
						that.userInfo = store.state.userInfo
						wx.showToast({
							title: '升级成功',
							icon: 'success',
							duration: 1500
						})
						that.isClickUp = true
						that.selectSubordinate()
					}
				})
			},
			// 升级服务商
			upHighest(params) {
				let that = this
				that.isClickUp = false
				Api.upHighest(params).then(function(res) {
					if(res.code == 0) {
						store.commit("storeUserInfo", res.memberDO)
						that.userInfo = store.state.userInfo
						wx.showToast({
							title: '升级成功',
							icon: 'success',
							duration: 1500
						})
						that.isClickUp = true
						that.selectSubordinate()
					}
				})
			},
			selectSubordinate() {
				let that = this
				let params = {}
				params.memberId = that.userInfo.memberId
				Api.selectSubordinate(params).then(function(res) {
					that.count = res.count
					that.condition = res.condition
					if(that.count >= that.condition) {
						that.canUp = true
					} else {
						that.canUp = false
					}
				})
			},
			// 获取订单数据
			getallCount() {
				let that = this
				let params = {}
				params.memberId = that.userInfo.memberId
				Api.getorderCount(params).then(function(res) {
					that.orderStatus.favorite = res.favorite
					that.orderStatus.payOrder = res.payOrder
					that.orderStatus.shipOrder = res.shipOrder
					that.orderStatus.takeOrder = res.takeOrder
					that.orderStatus.completeOrder = res.completeOrder
					that.phoneNumber = res.mobile.mobile
					that.isLoading = true
					wx.stopPullDownRefresh()
				})
			}
		},
		onShow() {
			let that = this
			that.userInfo = store.state.userInfo
			that.getallCount()
			that.selectSubordinate()
		},
		onPullDownRefresh: function() {
			let that = this
			that.getallCount()
			that.selectSubordinate()
			utils.updateUserInfo()
		},
	}
</script>

<style scoped lang="less">
	.more {
		span {
			position: absolute;
			top: 0;
			display: block;
			width: 100%;
			height: 30px;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	.footer {
		width: 443rpx;
		height: 61rpx;
		margin: 10px auto;
		img {
			width: 100%;
			height: 100%;
			display: block;
		}
	}
	/*进度条*/
	
	.progress {
		width: 100%;
		height: 44px;
		background: #ff8282;
		display: flex;
		align-items: center;
		padding: 0 18px;
		box-sizing: border-box;
		.progress-left {
			display: flex;
			align-items: center;
			.progress-cant {
				background: #901414;
				display: flex;
				justify-content: space-around;
				box-sizing: border-box;
				align-items: center;
				padding: 0 5px;
				box-sizing: border-box;
				height: 18px;
				border-radius: 9px;
				span {
					display: block;
					color: #FFFFFF;
					font-size: 12px;
				}
			}
			.xian {
				width: 1px;
				height: 21px;
				background: #771f27;
				margin: 0 18px 0 12px;
			}
		}
		.progress-right {
			align-self: flex-start;
			.hint {
				font-size: 10px;
				color: #ffffff;
				padding: 2px 0 4px 0;
			}
			progress {
				width: 220px;
			}
		}
	}
	
	img {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	.header {
		height: 110px;
		background: linear-gradient(to top right, #FF3D3A, #F56564);
		width: 100%;
		.userInfo {
			display: flex;
			padding: 40px 0 15px 25px;
			box-sizing: border-box;
			.avator {
				width: 50px;
				height: 50px;
				border-radius: 50%;
				overflow: hidden;
			}
			.userName {
				// flex-grow: 1;
				padding-left: 10px;
				box-sizing: border-box;
				color: #323735;
				.memberName {
					height: 30px;
					line-height: 30px;
					font-size: 16px;
					color: #FFFFFF;
					font-weight: bold;
				}
				.memberLv {
					display: flex;
					align-items: center;
					span {
						display: block;
						&:nth-child(1) {
							color: #fff;
							background: #901414;
							padding: 0 10px;
							box-sizing: border-box;
							height: 18px;
							line-height: 18px;
							border-radius: 9px;
							font-size: 12px;
							text-align: center;
							vertical-align: middle;
						}
						&:nth-child(2) {
							display: inline-block;
							font-size: 13px;
							margin-left: 5px;
							color: #FFFFFF;
						}
					}
				}
			}
		}
	}
	
	.menu {
		display: flex;
		justify-content: space-around;
		text-align: center;
		padding: 10px 0;
		background: #fdfdfd;
		.list {
			color: #313131;
			font-size: 15px;
			.name {
				margin-top: 10px;
			}
		}
	}
	
	.order {
		.orderTitle {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 13px 13px 20px 13px;
			.allOrer-left {
				font-size: 15px;
				color: #313131;
				font-weight: bold;
			}
			.allOrer-right {
				color: #acacac;
				font-size: 14px;
				display: inline-flex;
				align-items: center;
				span {
					&:nth-child(2) {
						font-size: 12px;
						margin-left: 2px;
					}
				}
			}
		}
		.orderItem {
			display: flex;
			justify-content: space-around;
			text-align: center;
			font-size: 16px;
			padding-bottom: 20px;
			box-sizing: border-box;
			.orderList {
				p {
					height: 25px;
					line-height: 25px;
					color: #313131;
					font-size: 13px;
				}
			}
		}
	}
	
	.menuContain {
		.menuTitle {
			font-size: 15px;
			color: #313131;
			font-weight: bold;
			box-sizing: border-box;
			padding-left: 13px;
			padding-bottom: 8px;
		}
		.menuItem {
			display: flex;
			padding-left: 10px;
			width: 100%;
			height: 44px;
			line-height: 44px;
			font-size: 20px;
			border-top: 1px solid #EDEDED;
			.icon {
				width: 20px;
				height: 20px;
				overflow: hidden;
				margin-top: 9px;
			}
			.menuname {
				padding-left: 15px;
				flex-grow: 1;
				font-size: 14px;
				color: #000000;
			}
		}
	}
</style>