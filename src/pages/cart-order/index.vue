<template>
	<div class="container">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
		<div class="cart">
			<!--点击新增地址-->
			<div class="AddressWarp">
				<div class="AddressBtn" v-if="AddressBtn" @click="toAddressAdd">
					+请填写收货地址
				</div>
				<div class="Address" v-else @click="toAddress">
					<div class="Address-item">
						<div class="itemLeft">收货人</div>
						<div class="itemRight"><text>{{addr.name}}</text><text>{{addr.mobile}}</text></div>
					</div>
					<div class="Address-item">
						<div class="itemLeft">收货地址</div>
						<div class="itemRight">{{addr.address}}</div>
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
						<div class="fontHidden1">{{item.name}}</div>
						<div class="describe fontHidden1" v-if="orderType==1">{{item.specvalue}}</div>
						<div class="price" v-if="orderType==1">
							<span>¥{{item.price}}</span>
						</div>
						<div class="price" v-else style="margin-top: 20px">
							<span>¥{{item.price}}</span>
						</div>
						<div class="price1" :style="{display:isflex}" v-if="orderType==1">
							<span>¥{{item.specs}}+</span>
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
				<span class="leave_input"><input type="text" placeholder="点击留言"/></span>
			</div>
			<!--支付方式-->
			<div class="PayType" v-if="orderType==1">
				<div class="PayItemTitle">支付方式</div>
				<div class="Item"  @click="selectPay(0)">
					<div class="Items">￥{{goodsItem.priceTotal}}</div>
					<div class="ItemSelect"><icon type="success" size="21" v-show='!PayBool'/><icon type="circle" size="21" v-show='PayBool'/></div>
				</div>
				<div class="Item" @click="selectPay(1)">
					<div class="Items">
						￥{{goodsItem.specsTotal}}+{{goodsItem.deductionTotal}}平台劵
					</div>
					<div class="ItemSelect"><icon type="success" size="21" v-show='PayBool'/><icon type="circle" size="21" v-show='!PayBool'/></div>
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
				PayBool:false,
				PayIndex:0,
				goodsItem:{},
				addr:{},
				AddressBtn:false,
				canbuy:true,
				InputMask:'',
				order:{},
				userInfo:{},
				orderType:'',
				needPay:0,
				isLoading:false
			}
		},
		components: {
			loading
		},
		methods: {
			//支付方式选择
			selectPay(index){
				let that = this;
				// 选择了平台劵支付
				if(index == 1&&that.userInfo.point<that.goodsItem.deductionTotal){
					wx.showModal({
						title: '提示',
						content: '平台券不足，是否立即充值',
						confirmText:'去充值',
						success(res) {
							if (res.confirm) {
								wx.navigateTo({url: '../index-coupon/main'});
							} else if (res.cancel) {
								
							}
						}
					})
		        }
		        else{
		        	that.PayIndex = index;
		        	that.PayBool = !that.PayBool;
		        }
		   },
		   toast(){
		   	let that = this;
		   		if(that.AddressBtn){
		   			wx.showToast({ title: '请添加地址'})
		   		}else{	
		   		    that.OrderUp();  				
		   		} 
		   },
		      //订单提交参数赋值
		     OrderUp(){
		      	let that = this;
		      	let bean = {}
		      	let goodObj = {}
		      	let orderParms = {}
		      	if(that.canbuy){
		      		that.canbuy=false
		      		wx.showLoading({
		      			title: '请稍等',
		      		})
		      		// 商城商品复购
		      		if(that.orderType==1){
		      			bean.gainedpoint = that.goodsItem.fenrunAmount
		      			bean.consumepoint=that.goodsItem.twoAmount
		      			// (是否使用平台券)
		      			if(that.PayIndex==0){
		      				bean.shippingAmount=0
		      				bean.orderAmount = that.goodsItem.priceTotal
		      				bean.needPayMoney=that.goodsItem.priceTotal
		      				bean.paymentType=1
		      			}
		      			else{
		      				bean.shippingAmount = that.goodsItem.deductionTotal
		      				bean.needPayMoney=that.goodsItem.specsTotal
		      				bean.orderAmount = that.goodsItem.specsTotal
		      				bean.paymentType=2
		      			}	
		      		}
		      		// 成为平台会员购买399商品
		      		else{
		      			bean.needPayMoney=that.needPay
		      			bean.orderAmount = that.needPay
		      			bean.shippingAmount=0
		      		}    		
		      		bean.memberId = that.userInfo.memberId		
		      		bean.clickd = that.InputMask 
		      		bean.orderType = that.orderType
		      		bean.shipAddr = that.addr.address
		      		bean.shipMobile = that.addr.mobile 
		      		bean.shipName= that.addr.name	
		      		bean.addressId=that.addr.zip
		      		bean.itemsJson = JSON.stringify(that.goodsItem.googitem)	
			        that.saveOrder(bean)
			      }

 				 },
     			//提交订单并支付
     			async saveOrder(bean){
     				let that = this;
     				let res = await Api.OrderSave(bean)
     				wx.hideLoading()
     				if(res.code == 0){
     					wx.showToast({ 
     						title: '订单提交成功',
     						icon:'success',
     						duration: 2000
     					})
     					that.order = res.order
      					that.wxPay()
     				}	
  				},
   				//微信支付方法封装
   				wxPay(){
   					let that = this;
   					let params ={}
   					params.sn = that.order.sn
   					params.payAmount = Math.round(that.order.needPayMoney * 100)
   					// params.payAmount=1
			        //请求支付
			        params.openId=that.userInfo.openId
			        params.shippingAmount=that.order.shippingAmount
			        Api.ConfirmPay(params).then(function(PayRes){
			        	if(PayRes.code==0){
			        		wx.requestPayment({
				                timeStamp: PayRes.Map.timeStamp, //时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间,
				                nonceStr: PayRes.Map.nonceStr, //随机字符串，长度为32个字符以下,
				                package: PayRes.Map.package, //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*,
				                signType: PayRes.Map.signType, //签名算法，暂支持 MD5,
				                paySign: PayRes.Map.paySign, //签名,具体签名方案参见小程序支付接口文档,
				                success: res => {
				                	that.canbuy=true
				                	that.payReturen()      	
				                },
				                fail: function (res) {
			                        // fail   
			                        that.canbuy=true
			                        wx.showToast({ 
			                        	title: '支付失败',
			                        	icon:'none',
			                        	duration: 2000
			                        })
			                    
	                   			 },
	                   			 complete:function(){
	                   			 	console.log("我执行了")
	                   			 }
	                		});
			        	}
			        	else{
			        		wx.showToast({ 
			        			title:'网络错误',
			        			icon:'none',
			        			duration: 2000
			        		})
			        		that.canbuy=true
			        	}
			        
			        })
			    },
			      payReturen(){
			      	let that=this
			      	let orderParams = {}
			      	orderParams.orderId = that.order.orderId
			      	orderParams.paymoney = that.order.needPayMoney
			      	orderParams.shippingAmount=that.order.shippingAmount
			      	Api.PaypassOrder(orderParams).then(function(res){
			      		if(res.code == 0){
			      			utils.updateUserInfo()
			      			wx.showToast({ 
			      				title: '支付成功',
			      				icon:'success',
			      				duration: 2000
			      			})
			      			wx.navigateTo({ url: '/pages/orderList/main?orderStatus=2'});
    				 }
    				}) 
			      },
		   		// 选择收货地址
		   		toAddress(){
		   			let that=this
		   			wx.setStorageSync('orderType',that.orderType)
		   			wx.navigateTo({ url: '../address/main' });
		   		},
		   		// 跳转添加地址	
		   		toAddressAdd(){
		   			let that=this
		   			wx.setStorageSync('orderType',that.orderType)
		   			wx.navigateTo({ url: '../addressDetail/main' });
		   		}
			
		},
		mounted() {
			let that=this
			that.goodsItem =JSON.parse(store.state.goodItem)
			that.userInfo=store.state.userInfo
			if(that.$root.$mp.query.orderType==undefined){
				that.orderType=wx.getStorageSync('orderType')
			}
			else{
				that.orderType=that.$root.$mp.query.orderType
			}
			if(that.orderType==2){
				that.needPay=that.goodsItem.googitem[0].price
			}
			that.isLoading=true
		},
		onShow(){
			if(wx.getStorageSync('addr')!=''){
				this.addr=wx.getStorageSync('addr')
				this.AddressBtn=false
			}
			else{
				this.AddressBtn=true
			}
		},
		onUnload(){
			let that=this
			that.PayBool=false
			that.PayIndex=0
			that.goodsItem={}
			that.addr={}
			that.AddressBtn=false
			that.canbuy=true
			that.InputMask=''
			that.order={}
			that.userInfo={}
			that.orderType=''
			that.needPay=0
			that.isLoading=false
		}
	}
</script>

<style lang="less">
	.AddressWarp{
		.AddressBtn {
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
		padding: 10px;
		.product-canter {
			display: flex;
			justify-content: space-between;
			.img {
				width: 80px;
				height: 80px;
				border-radius: 5px;
				overflow: hidden;
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
			// input{width: 80%;}
			.leave_input{width: 60%;}
            .leave_input span{font-size: 15px;}
			.leave_input input{font-size: 12px;}
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
		.btn{background: #901414;height: 95rpx;line-height: 95rpx; width: 180rpx;text-align: center;color: #fff;}
	}

</style>