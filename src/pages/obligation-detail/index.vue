<template>
	<div class="obligation">
		<!---->
		<div class="await">
			
		</div>
		<!--收货人-->
		<div class="address">
			<div class="address-left">
				<p class="img"><img src="/static/images/ress.png" /></p>
			</div>
			<div class="address-cant">
				<p>
					收货人：{{orderDetail.shipName}}
				</p>
				<p class="fontHidden1">
					收货地址:{{orderDetail.shipAddr}}
				</p>
			</div>
			<div class="address-right">
				{{orderDetail.shipMobile}}
			</div>
		</div>
		<!--list-->
		<div class="list" v-for="(item,index) in orderDetail.itemsJson" :index="index">
			<div class="list-left" v-if="orderDetail.orderType==1">
				<p class="img"><img :src="item.image" /></p>
			</div>
			<div class="list-left" v-if="orderDetail.orderType==2">
				<p class="img"><img :src="item.image" /></p>
			</div>
			<div class="list-left" v-if="orderDetail.orderType==3">
				<p class="img"><img :src="item.voucherType" /></p>
			</div>
			<div class="list-cant fontHidden1" v-if="orderDetail.orderType==1">		
	           {{item.name}}
			</div>
			<div class="list-cant fontHidden1" v-if="orderDetail.orderType==2">		
	           {{item.name}}
			</div>
			<div class="list-cant fontHidden1" v-if="orderDetail.orderType==3">		
	           {{item.repacketName}}
			</div>
			<div class="list-right" v-if="orderDetail.orderType==1">
				<span>¥{{item.price}}</span>
				<span>x{{item.num}}</span>				
			</div>
			<div class="list-right" v-if="orderDetail.orderType==3">
				<span>¥{{item.conditionAmount}}</span>
				<span>x1</span>				
			</div>
		</div>
		<!--价格-->
		<div class="pic">
			<div class="pic-wp1">
				<span>商品总价</span>
				<span>¥{{orderDetail.orderAmount}}</span>
			</div>
			<div class="pic-wp2">
				<span>运费（快递）</span>
				<span v-if="orderDetail.orderType==3">¥13</span>
				<span v-else>¥0</span>
			</div>
			<div class="pic-wp4" v-if="orderDetail.orderType==1">
				<span>订单总价</span>
				<span>¥{{orderDetail.orderAmount}}+{{orderDetail.shippingAmount}}平台券</span>
			</div>
			<div class="pic-wp4" v-else>
				<span>订单总价</span>
				<span>¥{{orderDetail.orderAmount}}</span>
			</div>
		</div>
		<!--提交付款-->
		<!-- <div class="submit">
			<span>取消订单</span>
			<span>提交付款</span>
		</div> -->
	</div>
</template>

<script>
	import store from "@/store/store"
	export default {
		data() {
			return {
				orderDetail:{}
			}
		},

		components: {

		},

		methods: {

		},
		mounted() {
			let that=this
			that.orderDetail=store.state.orderDetail
			
		}
	}
</script>

<style lang="less">
	.obligation {
		width: 100%;
		.await {
			width: 100%;
			height: 100px;
			background: linear-gradient(to right, #ae2934, #6e1b22);
			display: flex;
			justify-content: space-between;
			padding: 0 39px;
			box-sizing: border-box;
			align-items: center;
			.await-left {
				line-height: 24px;
				span {
					display: block;
					color: #FFFFFF;
					&:nth-child(1) {
						font-size: 16px;
					}
					&:nth-child(2) {
						font-size: 12px;
					}
				}
			}
			.await-right {
				width: 50px;
				height: 50px;
		
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
		/*收货人*/
		.address {
			width: 100%;
			height: 88px;
			display: flex;
			justify-content: space-between;
			padding: 0 14px;
			box-sizing: border-box;
			align-items: center;
			.address-left {
				.img {
					width: 12px;
					height: 16px;
					img {
						width: 100%;
						height: 100%;
					}
				}
			}
			.address-cant {
				flex-grow: 1;
				padding: 5px;
				box-sizing: border-box;
				font-size: 12px;
				p{
					height: 30px;
					width:250px;
					line-height:30px;
				}
			}
			.address-right {
				color: #000000;
				font-size: 12px;
				align-self: flex-start;
				margin-top: 28px;
				
			}
		}
		/*价格*/
		
		.pic{
		      padding: 0 18px;
		      box-sizing: border-box;
		      width: 100%;
		   .pic-wp1, .pic-wp2, .pic-wp3, .pic-wp4,{		 
		    display: flex;
		    font-size: 11px;
		    justify-content: space-between;
		   		
		   }
           .pic-wp1{
           	color: #ababab;
           	margin-top: 20px;
           }
           .pic-wp2{
           	color: #ababab;
           		margin-top: 6px;
           }	
           .pic-wp3{
           	color: #000000;
           		margin-top: 12px;
           }	
           .pic-wp4{
           	color: #000000;
           		margin-top: 6px;
           		border-bottom: 1px solid #e6e6e6;
           		border-top: 1px solid #e6e6e6;
           		padding: 5px 0;
           		box-sizing: border-box;
           		
           	span{
           		&:nth-child(2){
           			color: #c40000            ;
           		}
           	}
           }				
		}
		/*list*/
		.list {
			width: 100%;
			height: 90px;
			display: flex;
			justify-content: space-between;
			padding: 0 14px;
			box-sizing: border-box;
			box-shadow: 0 0 10px rgba(0,0,0,.2);
			align-items: center;
			.list-left {
				.img {
					width: 85px;
					height: 85px;
					img {
						width: 100%;
						height: 100%;
					}
				}
			}
			.list-cant {
				flex-grow: 1;
				max-width: 208px;
				font-size: 11px;
				color: #333333;
				line-height: 20px;
			}
			.list-right {
			span{
				display: block;
				font-size: 11px;
				color: #333333;
			}
				
			}
		}
		
		
		/*提交付款*/
		
		.submit{
			width: 100%;
			height: 50px;
			border-top: 1px solid #e0e0e0;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			position: fixed;
			bottom: 0;
			span{
				display: block;
				width: 63px;
				height: 23px;
			    line-height: 23px;
			    text-align: center;
			    font-size: 11px;
			    border-radius:12px;
			    &:nth-child(1){
			    	color: #999999;
			    	border: 1px solid #999999;
			    	margin-right: 9px;
			    	
			    }
			    &:nth-child(2){
			    	color: #7e1e26;
			    	border: 1px solid #7e1e26;
			    	margin-right: 15px;
			    }
			}
		}
	}
</style>