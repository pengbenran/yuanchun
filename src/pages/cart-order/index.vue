<template>
	<div class="container">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
			<div class="cart">
				<div class="product-list-li" v-for="(item,index) in goodsItem.googitem">
					<!--内容-->
					<div class="product-canter">
						<div class="product-left">
							<img :src="item.image" />
						</div>
						<div class="product-right">
							<div class="name fontHidden">{{item.name}}</div>
							<!--<div class="describe fontHidden1" v-if="orderType==1">{{item.specvalue}}</div>-->
							<div class="price1" :style="{display:isflex}" v-if="orderType==1">
								<div class="left">
									<span>¥ {{item.specs}}+</span>
									<span>{{item.deduction}}平台券</span>
								</div>
								<div class="right"><span>×{{item.num}}</span></div>
							</div>

							<div class="price" v-if="orderType==1">
								<span>¥ {{item.price}}</span>
								<span>库存：999+</span>
							</div>
							<div class="price" v-else>
								<span>¥ {{item.price}}</span>
								<span>库存：999+</span>
							</div>
						</div>
					</div>
				</div>
				
			<div class="cart-bottom">
				<!--支付方式-->
				<div class="PayType" v-if="orderType==1">
					<div class="PayItemTitle">支付方式：</div>
					<div class="Item" @click="selectPay(0)">
						<div class="Items">￥{{goodsItem.priceTotal}}</div>
						<div class="ItemSelect">
							<icon type="success" size="21" v-show='!PayBool' />
							<icon type="circle" size="21" v-show='PayBool' />
						</div>
					</div>
					<div class="Item" @click="selectPay(1)">
						<div class="Items">
							￥{{goodsItem.specsTotal}}+{{goodsItem.deductionTotal}}平台劵
						</div>
						<div class="ItemSelect">
							<icon type="success" size="21" v-show='PayBool' />
							<icon type="circle" size="21" v-show='!PayBool' />
						</div>
					</div>
				</div>
				<!--点击新增地址-->
				<div class="AddressWarp">		
					<div class="tit">地址信息：</div>
					<div class="AddressBtn"  @click="toAddressAdd"  v-if="AddressBtn">
						+添加地址
					</div>
				<div class="Address" v-else>
						<div class="xg"  @click="toAddress">修改</div>						
						<div class="name">
							<span>{{addr.name}}</span>
							<span>{{addr.mobile}}</span>
						</div>
						<div class="address">
							<span>{{addr.addr}}</span>
							<span>{{addr.region}}</span>
						</div>							
					</div>
				</div>
			</div>
		</div>
			<div class="footerBnt" v-if="orderType==1">
				<div class="cartBtn" v-if="PayIndex==0">
					合计：{{goodsItem.priceTotal}}元
				</div>
				<div class="cartBtn" v-else>
					合计：{{goodsItem.specsTotal}}元+{{goodsItem.deductionTotal}}平台劵
				</div>
				<div class="btn" @click="toast">立即购买</div>
			</div>
			
			<div class="footerBnt" v-else>
				<div class="cartBtn">
					合计：{{needPay}}元
				</div>
				<div class="btn" @click="toast">立即购买</div>
			</div>
			
		</blockquote>
	</div>
</template>

<script>
	import store from '@/store/store'
	import Api from '@/api/order'
	import utils from '@/utils/index'
	import loading from '@/components/loading'
	export default {
		data() {
			return {
				PayBool: false,
				PayIndex: 0,
				goodsItem: {},
				addr: {},
				AddressBtn: false,
				canbuy: true,
				InputMask: '',
				order: {},
				userInfo: {},
				orderType: '',
				needPay: 0,
				isLoading: false
			}
		},
		components: {
			loading
		},
		methods: {
			//支付方式选择
			selectPay(index) {
				let that = this;
				// 选择了平台劵支付
				if(index == 1 && that.userInfo.point < that.goodsItem.deductionTotal) {
					wx.showModal({
						title: '提示',
						content: '平台券不足，是否立即充值',
						confirmText: '去充值',
						success(res) {
							if(res.confirm) {
								wx.navigateTo({
									url: '../index-coupon/main'
								});
							} else if(res.cancel) {

							}
						}
					})
				} else {
					that.PayIndex = index;
					that.PayBool = !that.PayBool;
				}
			},
			toast() {
				let that = this;
				if(that.AddressBtn) {
					wx.showToast({
						title: '请添加地址'
					})
				} else {
					that.OrderUp();
				}
			},
			//订单提交参数赋值
			OrderUp() {
				let that = this;
				let bean = {}
				let goodObj = {}
				let orderParms = {}
				if(that.canbuy) {
					that.canbuy = false
					wx.showLoading({
						title: '请稍等',
					})
					// 商城商品复购
					if(that.orderType == 1) {
						bean.gainedpoint = that.goodsItem.fenrunAmount
						bean.consumepoint = that.goodsItem.twoAmount
						// (是否使用平台券)
						if(that.PayIndex == 0) {
							bean.shippingAmount = 0
							bean.orderAmount = that.goodsItem.priceTotal
							bean.needPayMoney = that.goodsItem.priceTotal
							bean.paymentType = 1
						} else {
							bean.shippingAmount = that.goodsItem.deductionTotal
							bean.needPayMoney = that.goodsItem.specsTotal
							bean.orderAmount = that.goodsItem.specsTotal
							bean.paymentType = 2
						}
					}
					// 成为平台会员购买399商品
					else {
						bean.needPayMoney = that.needPay
						bean.orderAmount = that.needPay
						bean.shippingAmount = 0
					}
					bean.memberId = that.userInfo.memberId
					bean.clickd = that.InputMask
					bean.orderType = that.orderType
					bean.shipAddr = that.addr.address
					bean.shipMobile = that.addr.mobile
					bean.shipName = that.addr.name
					bean.addressId = that.addr.zip
					bean.itemsJson = JSON.stringify(that.goodsItem.googitem)
					that.saveOrder(bean)
				}

			},
			//提交订单并支付
			async saveOrder(bean) {
				let that = this;
				let res = await Api.OrderSave(bean)
				wx.hideLoading()
				if(res.code == 0) {
					wx.showToast({
						title: '订单提交成功',
						icon: 'success',
						duration: 2000
					})
					that.order = res.order
					that.wxPay()
				}
			},
			//微信支付方法封装
			wxPay() {
				let that = this;
				let params = {}
				params.sn = that.order.sn
				params.payAmount = Math.round(that.order.needPayMoney * 100)
				// params.payAmount=1
				//请求支付
				params.openId = that.userInfo.openId
				params.shippingAmount = that.order.shippingAmount
				Api.ConfirmPay(params).then(function(PayRes) {
					if(PayRes.code == 0) {
						wx.requestPayment({
							timeStamp: PayRes.Map.timeStamp, //时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间,
							nonceStr: PayRes.Map.nonceStr, //随机字符串，长度为32个字符以下,
							package: PayRes.Map.package, //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*,
							signType: PayRes.Map.signType, //签名算法，暂支持 MD5,
							paySign: PayRes.Map.paySign, //签名,具体签名方案参见小程序支付接口文档,
							success: res => {
								that.canbuy = true
								that.payReturen()
							},
							fail: function(res) {
								// fail   
								that.canbuy = true
								wx.showToast({
									title: '支付失败',
									icon: 'none',
									duration: 2000
								})

							},
							complete: function() {
								console.log("我执行了")
							}
						});
					} else {
						wx.showToast({
							title: '网络错误',
							icon: 'none',
							duration: 2000
						})
						that.canbuy = true
					}

				})
			},
			payReturen() {
				let that = this
				let orderParams = {}
				orderParams.orderId = that.order.orderId
				orderParams.paymoney = that.order.needPayMoney
				orderParams.shippingAmount = that.order.shippingAmount
				Api.PaypassOrder(orderParams).then(function(res) {
					if(res.code == 0) {
						utils.updateUserInfo()
						wx.showToast({
							title: '支付成功',
							icon: 'success',
							duration: 2000
						})
						wx.navigateTo({
							url: '/pages/orderList/main?orderStatus=2'
						});
					}
				})
			},
			// 选择收货地址
			toAddress() {
				let that = this
				wx.setStorageSync('orderType', that.orderType)
				wx.navigateTo({
					url: '../address/main'
				});
			},
			// 跳转添加地址	
			toAddressAdd() {
				let that = this
				wx.setStorageSync('orderType', that.orderType)
				wx.navigateTo({
					url: '../addressDetail/main'
				});
			}

		},
		mounted() {
			let that = this
			that.goodsItem = JSON.parse(store.state.goodItem)
			that.userInfo = store.state.userInfo
			if(that.$root.$mp.query.orderType == undefined) {
				that.orderType = wx.getStorageSync('orderType')
			} else {
				that.orderType = that.$root.$mp.query.orderType
			}
			if(that.orderType == 2) {
				that.needPay = that.goodsItem.googitem[0].price
			}
			that.isLoading = true
		},
		onShow() {
			if(wx.getStorageSync('addr') != '') {
				this.addr = wx.getStorageSync('addr')
				this.AddressBtn = false
			} else {
				this.AddressBtn = true
			}
			console.log(this.addr)
		},
		onUnload() {
			let that = this
			that.PayBool = false
			that.PayIndex = 0
			that.goodsItem = {}
			that.addr = {}
			that.AddressBtn = false
			that.canbuy = true
			that.InputMask = ''
			that.order = {}
			that.userInfo = {}
			that.orderType = ''
			that.needPay = 0
			that.isLoading = false
		}
	}
</script>

<style lang="less">
	.AddressWarp {
		width: 100%;
		height: 140px;
		border-radius: 8px;
		background: #FFFFFF;	
		position: relative;
		line-height: 1;	 		
		margin-top: 12px;
		.tit{
			font-size: 16px;
			color: #666666;
			padding: 12px;
		}
		.xg{
			width: 44px;
			height: 22px;
			border-radius: 4px;
		    text-align: center;
		    line-height: 22px;
		    color: #666666;
		    font-size: 13px;
		    position: absolute;
		    top: 12px;
		    right: 12px;
		    border: 1px solid #DEDEDE;
		}
		.AddressBtn {
            margin: 16px auto;
            font-size: 14px;
            color: #333333;
            text-align: center;
            width: 160px;
            height: 37px;
            border-radius: 12px;
            border: 1px solid #dedede;
            line-height: 37px;
		}
		.Address {
			padding-left: 12px;
			box-sizing: border-box;
             .name{
             	padding-bottom: 10px;
             	span{
             		display: inline-block;
             		font-size: 14px;
             		color: #333333;
             		&:nth-child(2){
             			margin-left: 17px;
             		}
             	}
             }
             .address{
             	span{display: block;}
             	width: 258px;
             	line-height: 22px;
             	font-size: 14px;
             	color: #333333;
             }
		}
	}
	.cart{
		background: #F4F4F4;
		position: absolute;
		top: 0;
		width: 100%;height: 100%;
		
	}
	/**/
	.product-list-li {
		padding: 0 12px;	
		margin-top: 12px;	
		.product-canter {
			display: flex;
			border-radius: 12px;
		     background: #FFFFFF;
			.product-left {
				padding: 12px;
				height: 120px;
				width:120px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.product-right {
				line-height: 1;
				padding-top: 20px;
				width: 1;
				flex-grow: 1;
				padding-right: 12px;
				.name {
					font-size: 17px;
					color: #333333;
					font-weight: bold;
					width: 200px;
					height: 55px;
					line-height: 22px;
				}
				.price1 {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.left{
					   span{
	                  	display: inline-block;
	                  	font-size: 16px;
	                  	color: #FF0000;
	                  }
					}
                    .right{
					  	font-size: 14px;
					  	color: #666666;
	                  	
                    }
				}
				.price {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 12px;
					span {
					  display: block;
					  &:nth-child(1){
					  	font-size: 19px;
					  	color: #ff0000;
					  	font-weight: bold;
					  }
					  &:nth-child(2){
					  	font-size: 14px;
					  	color: #666666;
					  	
					  }
					}
				}
			}
		}
	}
	
	.cart-bottom {
		padding: 0 12px;
		box-sizing: border-box;
		.PayType {
			border-radius: 8px;
			box-sizing: border-box;
			padding: 12px;
			margin: 12px 0;
			line-height: 1;
			background: #FFFFFF;
			.PayItemTitle {
				font-size: 16px;
				color: #666666;				
			}
			.Item {
				display: flex;
				padding-top: 24px;
				font-size: 16px;
				color: #333333;
				align-items: center;
				justify-content: space-between;
				font-weight: bold;
			}
			.Items {
				display: flex;
				align-items: center;
			}
		}
	}
	/*结算*/
	
	.footerBnt {
        width: 100%;
        height: 44px;
        padding: 0 12px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        position: fixed;
        bottom: 12px;
        z-index: 90;
        line-height: 44px;
		.cartBtn {
          width: 220px;
          height: 100%;
          background: #333333;
          border-top-left-radius: 22px;
          border-bottom-left-radius: 22px;
          text-align: center;
          color: #ffffff;
          font-size: 16px;
		}
		.btn {
          width: 1;
          height: 100%;
          flex-grow: 1;
          background: #f73243;
          border-top-right-radius: 22px;
          border-bottom-right-radius: 22px;
          text-align: center;
           color: #ffffff;
          font-size: 16px;
          font-weight: bold;
		}
	}
</style>