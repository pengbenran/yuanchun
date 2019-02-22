<template>
	<div>
		<div class="orderContain">
			<div class="orderList">
				<div class="goodImg">
					<img src="/static/images/product-list.png">
				</div>
				<div class="goodDetail">
					<p class="fontHidden">元淳孕妇爽肤水保湿水天然孕妇护肤品化妆品补水洋甘菊专用柔肤水</p>
					<p class="number">X1</p>
					<p class="price">	
						￥89
					</p>
				</div>
			</div>
			<div class="orderFooter">
				<p>共计1件商品 合计89</p>
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
		props: [],
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
			width:240px;
			font-size: 16px;
			padding:0 10px;
			box-sizing: border-box;
			line-height: 25px;
			.number{
				text-align: right;
			}
			.price{
				color: #FF0928;
				font-size: 20px;
				text-align: right;
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