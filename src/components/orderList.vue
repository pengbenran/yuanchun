<template>
	<div class='orderWarp'>
		<div class="orderContain" v-for="(item,index) in orderList" :index="index" :key="item.orderId">
			<blockquote v-if="item.orderType==1">
				<div class="orderList"  v-for="(innerItem,innerIndex) in item.itemsJson" :index="innerIndex" :key="innerItem.productId">
					<div class="goodImg">
						<img :src="innerItem.image">
					</div>
					<div class="goodDetail">
						<div class="top">
							<div class="left">
								<p class="fontHidden">{{innerItem.name}}</p>
								<p class="fontHidden1">{{innerItem.specvalue}}</p>
							</div>
							<div class="number">X{{innerItem.num}}</div>
						</div>
						<div class="price">
							<span>¥{{innerItem.specs}}</span>
						</div>
						<div class="price1">
							<span>¥{{innerItem.price}}+</span>
							<div class="ptq">{{innerItem.deduction}}平台卷</div>
						</div>
					</div>
				</div>
				<div class="orderFooter">
					<p v-if="item.paymentType==1">共计{{item.count}}件商品 合计:￥{{item.orderAmount}}</p>
					<p v-else>共计{{item.count}}件商品 合计:￥{{item.orderAmount}}+{{item.shippingAmount}}平台券</p>
					<div class="btn" v-if="item.status==0">
						<div class="btnleft" @click="cancelOrder(item.orderId,index)">取消订单</div>
						<div class="btnright" @click="payOrder(item.orderId,item.shippingAmount,item.sn,item.needPayMoney,index)">提交付款</div>
					</div>
					<div class="btn" v-if="item.status==1">
						<div class="btnleft" @click="remind">提醒发货</div>
						<div class="btnright"  @click="checkOrder(index)">查看订单</div>
					</div>
					<div class="btn" v-if="item.status==3||item.status==4">
						<div class="btnleft" @click="jumplogistics(index)">查看物流</div>
						<div class="btnright" @click="checkOrder(index)">查看订单</div>
					</div>
					<div class="clear"></div>
				</div>
			</blockquote>
			<blockquote v-if="item.orderType==2">
				<div class="orderList"  v-for="(innerItem,innerIndex) in item.itemsJson" :index="innerIndex" :key="innerItem.goodsId">
					<div class="goodImg">
						<img :src="innerItem.image">
					</div>
					<div class="goodDetail">
						<div class="top">
							<div class="left">
								<p class="fontHidden">{{innerItem.name}}</p>
							</div>
							<div class="number">X{{innerItem.num}}</div>
						</div>
						<div class="price">
							<span>¥{{innerItem.price}}</span>
						</div>
					</div>
				</div>
				<div class="orderFooter">
					<p>共计{{item.count}}件商品 合计:￥{{item.orderAmount}}</p>
					<div class="btn" v-if="item.status==0">
						<div class="btnleft" @click="cancelOrder(item.orderId,index)">取消订单</div>
						<div class="btnright" @click="payOrder(item.orderId,item.shippingAmount,item.sn,item.needPayMoney,index)">提交付款</div>
					</div>
					<div class="btn" v-if="item.status==1">
						<div class="btnleft"  @click="remind">提醒发货</div>
						<div class="btnright"  @click="checkOrder(index)">查看订单</div>
					</div>
					<div class="btn" v-if="item.status==3||item.status==4">
						<div class="btnleft" @click="jumplogistics(index)">查看物流</div>
						<div class="btnright" @click="checkOrder(index)">查看订单</div>
					</div>
					<div class="clear"></div>
				</div>
			</blockquote>
			<blockquote v-if="item.orderType==3">
				<div class="orderList"  v-for="(innerItem,innerIndex) in item.itemsJson" :index="innerIndex" :key="innerItem.repacketId">
					<div class="goodImg">
						<img :src="innerItem.voucherType">
					</div>
					<div class="goodDetail">
						<div class="top">
							<div class="left">
								<p class="fontHidden">{{innerItem.repacketName}}</p>
							</div>
							<div class="number">X1</div>
						</div>
						<div class="price">
							<span>¥{{innerItem.conditionAmount}}</span>
						</div>
					</div>
				</div>
				<div class="orderFooter">
					<p>共计{{item.count}}件商品 合计:￥{{item.orderAmount}}</p>
					<div class="btn" v-if="item.status==0">
						<div class="btnleft" @click="cancelOrder(item.orderId,index)">取消订单</div>
						<div class="btnright" @click="payOrder(item.orderId,item.shippingAmount,item.sn,item.needPayMoney,index)">提交付款</div>
					</div>
					<div class="btn" v-if="item.status==1">
						<div class="btnleft"  @click="remind">提醒发货</div>
						<div class="btnright"  @click="checkOrder(index)">查看订单</div>
					</div>
					<div class="btn" v-if="item.status==3||item.status==4">
						<div class="btnleft" @click="jumplogistics(index)">查看物流</div>
						<div class="btnright" @click="checkOrder(index)">查看订单</div>
					</div>
					<div class="clear"></div>
				</div>
			</blockquote>
			<blockquote v-if="item.orderType==5">
				<div class="orderList"  v-for="(innerItem,innerIndex) in item.itemsJson" :index="innerIndex" :key="innerItem.repacketId">
					<div class="goodImg">
						<img :src="innerItem.image">
					</div>
					<div class="goodDetail">
						<div class="top">
							<div class="left">
								<p class="fontHidden">{{innerItem.name}}</p>
							</div>
							<div class="number">X{{innerItem.num}}</div>
						</div>
						<div class="price">
							<span>¥{{innerItem.price}}</span>
						</div>
					</div>
				</div>
				<div class="orderFooter">
					<p>共计{{item.count}}件商品 合计:￥{{item.orderAmount}}</p>
					<div class="btn" v-if="item.status==0">
						<div class="btnleft" @click="cancelOrder(item.orderId,index)">取消订单</div>
						<div class="btnright" @click="payOrder(item.orderId,item.shippingAmount,item.sn,item.needPayMoney,index)">提交付款</div>
					</div>
					<div class="btn" v-if="item.status==1">
						<div class="btnleft"  @click="remind">提醒发货</div>
						<div class="btnright"  @click="checkOrder(index)">查看订单</div>
					</div>
					<div class="btn" v-if="item.status==3||item.status==4">
						<div class="btnleft" @click="jumplogistics(index)">查看物流</div>
						<div class="btnright" @click="checkOrder(index)">查看订单</div>
					</div>
					<div class="clear"></div>
				</div>
			</blockquote>		
		</div>
	</div>
</template>
<script>
	import Api from "@/api/order"
	import store from '@/store/store'
	import utils from '@/utils/index'
	export default {
		props: {
			orderList: {
			    type: Object
			},
			icon: {
		       	type: String
			},
			status: {
				type:String,
				default:'' 
			}
		},
		data() {
			return {

			}
		},
		methods:{
			// 取消订单
			cancelOrder(orderId,index){
				let that=this
			
				wx.showModal({
					title: '提示',
					content: '是否取消订单?',
					success(res) {
						if (res.confirm) {
							wx.showLoading({title: '请稍等'})
							let params = {orderId:orderId}
							Api.cancelOrder(params).then(res =>{
								if(res.code == 0){
									that.orderList.splice(index,1); //删除下标的指定数组  
									wx.showToast({
										title:'取消成功',
										icon:'success',
										duration:2000
									})
									wx.hideLoading()
								}
							})
						} else if (res.cancel) {

						}
					}
				})
			},
			// 查看物流
			jumplogistics(index){
				let that=this
				console.log(that.orderList[index]);
				let itemsJson=JSON.stringify(that.orderList[index].itemsJson)
				let url=`../logistics/main?orderId=${that.orderList[index].orderId}&itemsJson=${itemsJson}`
				wx.navigateTo({
				 	url:url,
				})
			},
			// 提醒发货
			remind(){
				wx.showToast({
					title: '已提醒',
					icon: 'success',
					duration: 2000
				})
			},
			// 查看订单
			checkOrder(index){
				let that=this
				store.commit("stateOrderDetail",that.orderList[index])
				wx.navigateTo({
				 	url:`../obligation-detail/main?icon=${that.icon}&status=${that.status}`,
				})
			},
			// 立即支付订单
			payOrder(orderId,shippingAmount,sn,needPayMoney,index){
				// 判断用户的平台券是否少于需支付的拼团券
				let that=this
			 	if(that.userInfo.point<shippingAmount){
			 		wx.showModal({
			 			title: '提示',
			 			content: '平台券不足',
			 			success(res) {
			 				if (res.confirm) {
			 					wx.navigateTo({
			 						url:'../index-coupon/main',
			 					})
			 				}
			 				else{

			 				}
			 			}
			 		})
			 	}
			 	else{
			 		let params={}
			 		wx.showLoading({ title: '加载中',})
			 		params.sn = sn
			 		params.openId=that.userInfo.openId
			 		// params.payAmount = Math.round(needPayMoney * 100)
			 		params.payAmount=1
			 		params.shippingAmount=shippingAmount
			 		Api.ConfirmPay(params).then(function(parRes){
			 			if(parRes.code==0){
			 				wx.requestPayment({
			 					timeStamp: parRes.Map.timeStamp,
			 					nonceStr: parRes.Map.nonceStr,
			 					package: parRes.Map.package,
			 					signType: parRes.Map.signType, 
			 					paySign: parRes.Map.paySign,
			 					success: function (res) {
			 						wx.showToast({
			 							title: '支付成功',
			 							icon: 'success',
			 							duration: 2000
			 						})
			 						that.orderList.splice(index,1)
			 						that.passOrder(orderId,shippingAmount,needPayMoney)
			 					},
			 					fail: function (res) {
			 						console.log(res);
			 						wx.showToast({
			 							title: '支付失败',
			 							icon: 'success',
			 							duration: 2000
			 						})
			 					},
			 					complete: function (complete) {
			 						wx.hideLoading()
			 					}
			 				})
			 			}
			 			
			 		})
			 	}
			},
			// 修改订单状态
			passOrder(OrderId,shippingAmount,needPayMoney){	
	        	let that=this
	        	let statuParam={}
	        	statuParam.orderId=OrderId
	        	statuParam.shippingAmount=shippingAmount
	        	statuParam.paymoney=needPayMoney
	        	Api.PaypassOrder(statuParam).then(function(res){
	        		utils.updateUserInfo()
	        		console.log(res)
	        	})
				
			}
		},
		mounted() {
			let that=this
			that.userInfo = store.state.userInfo
		}
	}
</script>
<style scoped lang="less">
img{
		width:100%;
		height: 100%;
		display: block;
	}

.orderWarp{padding:8px;background:#f2f2f2;}
.orderContain{margin-bottom:8px;background:#fff;border-radius:8px;}
.orderContain{
	.orderList{
		display: flex;
		padding: 10px;
		box-sizing: border-box;

		.goodImg{
			width: 100px;
			height: 100px;
			border-radius:5px;
			overflow: hidden;
		}
		.goodDetail{
			font-size: 16px;
			padding:0 10px;
			box-sizing: border-box;
			line-height: 25px;
			.top{
				display: flex;
				.number{
				text-align: center;
				line-height:50px;
				flex-grow: 1;
			    }
			    .left{
			    	width:200px;
			    }
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
				display: flex;
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
	.orderFooter{
		border-top:1px solid #f2f2f2;
		padding-bottom:8px;
		margin:0 8px;
		p{
			text-align:right;
			padding-right: 15px;
			height: 35px;
			line-height:35px;
			font-size: 15px;
		}
		.btn{
			float: right;
			font-size: 16px;
			div{
				width:100px;
				height: 34px;
				display: inline-block;
				border-radius: 17px;
				margin-right:10px; 
				line-height:34px;
				background: #fff;
				font-size: 16px;
				text-align: center;
			}
			.btnleft{
				border: 1px solid #929292;
				color:#929292;
			}
			.btnright{
				border: 1px solid #720E13;
				color:#720E13;
			}

		}
		.clear{
			clear:both;	
		}
	}

}
</style>