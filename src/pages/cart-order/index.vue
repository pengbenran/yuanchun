<template>
	<div>
		<div class="cart">
			<!--点击新增地址-->
			<div class="AddressWarp">
				<div class="AddressBtn" v-if="AddressBtn" @click="toAddress">
					+请填写收货地址
				</div>
				<div class="Address" v-else @click="toAddress">
					<div class="Address-item">
						<div class="itemLeft">收货人</div>
						<div class="itemRight"><text>{{addr.name}}</text><text>{{addr.mobile}}</text></div>
					</div>
					<div class="Address-item">
						<div class="itemLeft">收货地址</div>
						<div class="itemRight">{{addr.addr}}</div>
					</div>
				</div>
			</div>
			<div class="product-list-li" v-for="(item,index) in goodsItem.googitem">
				<!--内容-->
				<div class="product-canter">
					<div class="img">
						<img :src="item.image" />
					</div>
					<div class="content">
						<div class="tit fontHidden1">{{item.name}}</div>
						<div class="describe fontHidden1">{{item.specvalue}}</div>
						<div class="price">
							<span>¥{{item.specs}}</span>
						</div>
						<div class="price1" :style="{display:isflex}">
							<span>¥{{item.price}}+</span>
							<div class="ptq">{{item.deduction}}平台券</div>
						</div>
					</div>
				</div>
				<!--加减-->
				<div class="product-right">
					<span>×{{item.num}}</span>
				</div>
			</div>
		</div>
		<div class="cart-bottom">
			<!--买家留言-->
			<div class="leave">
				<span>买家留言:</span>
				<span><input type="text" placeholder="点击留言"/></span>
			</div>
			<!--支付方式-->
			<div class="PayType">
				<div class="PayItemTitle">支付方式</div>
				<div class="Item"  @click="selectPay(1)">
					<div class="Items">￥{{goodsItem.specsTotal}}</div>
					<div class="ItemSelect"><icon type="success" size="21" v-show='!PayBool'/><icon type="circle" size="21" v-show='PayBool'/></div>
				</div>
				<div class="Item" @click="selectPay(0)">
					<div class="Items">
						￥{{goodsItem.priceTotal}}+{{goodsItem.deductionTotal}}平台劵
					</div>
					<div class="ItemSelect"><icon type="success" size="21" v-show='PayBool'/><icon type="circle" size="21" v-show='!PayBool'/></div>
				</div>
			</div>
		</div>
		<div class="footerBnt">	
			<div class="cartBtn" v-if="PayIndex==1">
				合计：{{goodsItem.specsTotal}}元
			</div>
			<div class="cartBtn" v-else>
				合计：{{goodsItem.priceTotal}}元+{{goodsItem.deductionTotal}}平台劵
			</div>
			<div class="btn" @click="next">立即购买</div>
		</div>
	</div>
</template>

<script>
	import store from '@/store/store'
	export default {
		data() {
			return {
				PayBool:false,
				PayIndex:1,
				goodsItem:{},
				addr:{name:'彭',mobile:'15779556662',addr:'江西宜春'},
				AddressBtn:false
			}
		},

		components: {},

		methods: {
			//支付方式选择
			selectPay(index){
				let that = this;
				that.PayBool = !that.PayBool;
				that.PayIndex = index;
				if(index == 0){
          		 //当选择余额支付的时候判断余额

		       }
		   },
		   // 选择收货地址
		   toAddress(){
		   	let that=this
		   	wx.navigateTo({ url: '../address/main' });
		   },
			
		},
		mounted() {
			let that=this
			that.goodsItem =JSON.parse(store.state.goodItem)
			console.log('ssss',that.goodsItem)
			// that.userInfo = store.state.userInfo

		}
	}
</script>

<style lang="less">
	.AddressWarp{
		.site {
			width: 100%;
			height: 42px;
			color: #858585;
			font-size: 12px;
			background-color: #e0e0e0;
			line-height: 42px;
			text-align: center;
		}
		.Address{padding: 10rpx 25rpx;border-bottom: 1px solid rgb(244,244,244);
			.Address-item{display: flex;align-items: center;font-weight: 100;font-size: 32rpx;height: 50px;}
			.itemLeft{width: 30%;}
			.itemRight{width: 70%;display: flex;align-items: center;justify-content: space-between;color: #8e8e8e;}
		}
	}
	
	
	.product-list-li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #f6f6f6;
		padding: 0 20px 9px 15px;
		.product-canter {
			margin-top: 9px;
			display: flex;
			justify-content: space-between;
			.img {
				width: 80px;
				height: 80px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.content {
			flex-grow: 1;
				font-size: 11px;
				padding-left:10px; 
				box-sizing: border-box;
				.tit {
					color: #333333;
					line-height: 18px;
					margin-top: 10px;
					width:160px;
				}
				.describe {
					color: #b5b5b5;
					font-size: 10px;
					width:160px;
					
				}
				.price {
					span {
						color: #a82429;
						font-size: 16px;
					}
				}
				.price1 {
					color: #a82429;
					font-size: 16px;
					.ptq {
						background-color: #801d20;
						height: 20px;
						text-align: center;
						border-radius: 5px;
						line-height: 20px;
						padding: 0 5px;
						color: #ffffff;
						font-size: 10px;
						display: inline-block;
						vertical-align: middle;
					}
				}
			}
		}
		.product-right {
			span {
				color: #a82429;
			}
		}
	}
	.cart-bottom {
		padding-left: 17px;
		box-sizing: border-box;
		.leave {
			border-bottom: 1px solid #f6f6f6;
			display: flex;
			align-items: center;
			width: 100%;
			height: 35px;
			span {
				display: block;
				&:nth-child(1) {
					font-size: 12px;
					color: #000000;
				}
				&:nth-child(2) {
					font-size: 8px;
					margin-left: 16px;
				}
			}
		}
		.money {
			border-bottom: 1px solid #f6f6f6;
			.money-left,
			.money-right {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 30px;
				span {
					padding-right: 35px;
					box-sizing: border-box;
					display: block;
					&:nth-child(1) {
						font-size: 12px;
						color: #000000;
					}
					&:nth-child(2) {
						font-size: 16px;
						color: #A82429;
					}
				}
			}
		}
		.PayType{padding: 10rpx 20rpx;font-weight: 100;font-weight: 100;font-size: 28rpx;color: #666;
			.PayItemTitle{font-size: 34rpx;}
			img{width: 40rpx;height: 40rpx;margin-right: 15rpx;}
			.Item{padding: 16rpx 0;display: flex;align-items: center;justify-content: space-between;}
			.Items{display: flex;align-items: center;}
		}
	}
	/*结算*/
	.footerBnt{position: fixed;bottom: 0;width: 100%;height: 95rpx;display: flex;justify-content: center;font-size: 36rpx;font-weight: 100;color: #8e8e8e;
		.cartBtn{height: 95rpx;font-size: 16px;flex-grow: 1;line-height: 95rpx;text-align: right;padding-right: 5px;}
		.btn{background-image: -webkit-linear-gradient(0deg, rgb(255,191,3), rgb(252,148,53));height: 95rpx;line-height: 95rpx; width: 180rpx;text-align: center;color: #fff;}
	}

</style>