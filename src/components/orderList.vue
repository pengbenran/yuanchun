<template>
	<div>
		<div class="orderContain" v-for="(item,index) in orderList" :index="index" :key="item.orderId">
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
				<p v-else>共计2件商品 合计:￥{{item.orderAmount}}+{{item.shippingAmount}}</p>
				<div class="btn">
					<button>取消订单</button>
					<button>提交付款</button>
				</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['orderList'],
		data() {
			return {

			}
		},
		created() {

		}
	}
</script>
<style scoped lang="less">
img{
		width:100%;
		height: 100%;
		display: block;
	}
.orderContain{
	margin-top: 5px;
	border-bottom: 1px solid #ddd;
	.orderList{
		display: flex;
		background: #E4E4E4;
		padding: 10px;
		box-sizing: border-box;
		.goodImg{
			width: 100px;
			height: 100px;
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

		p{
			text-align:right;
			padding-right: 15px;
			height: 35px;
			line-height:35px;
			font-size: 16px;
		}
		.btn{
			float: right;
			font-size: 16px;
			button{
				width:100px;
				height: 34px;
				outline: none;
				border: 1px solid #929292;
				padding:0;
				display: inline-block;
				border-radius: 17px;
				margin-right:10px; 
				line-height:34px;
				background: #fff;
				font-size: 16px;
				color:#929292;
			}
			button:nth-child(2){
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