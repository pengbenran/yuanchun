<template>
	<div>
		<div class="product-list-li" v-for="(item,index) in product">
			<!--选择框-->
			<div class="product-left">

			</div>
    <!--内容-->
			<div class="product-canter">
				<div class="img">
					<img :src="item.img" />
				</div>
				<div class="content">
					<div class="tit">{{item.tit}}</div>
					<div class="price">
						<span>¥{{item.price}}</span>
					</div>
					<div class="price1" :style="{display:isflex}">
						<span>¥{{item.price}}-</span>
						<span>{{ticket}}</span>
						<div class="ptq">平台卷</div>
					</div>
				</div>
			</div>
<!--加减-->
  <div class="product-right">
  	<span>-</span>
  	<span>{{num}}</span>
  	<span>+</span>
  </div>
 		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				product: [{
						img: "/static/images/product-list.png",
						tit: "元淳孕妇爽肤水保湿水天然孕妇护肤品化妆品补水洋甘菊专用柔肤水",
						price: "198"

					},
					{
						img: "/static/images/product-list.png",
						tit: "元淳孕妇爽肤水保湿水天然孕妇护肤品化妆品补水洋甘菊专用柔肤水",
						price: "198"
					},
					{
						img: "/static/images/product-list.png",
						tit: "元淳孕妇爽肤水保湿水天然孕妇护肤品化妆品补水洋甘菊专用柔肤水",
						price: "198"
					},
					{
						img: "/static/images/product-list.png",
						tit: "元淳孕妇爽肤水保湿水天然孕妇护肤品化妆品补水洋甘菊专用柔肤水",
						price: "198"
					},
				],
			}
		},

		components: {},

		methods: {

		},

		created() {

		}
	}
</script>

<style lang="less">
	.product-canter{
		width: 202px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.img {
			width: 60px;
			height: 60px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.content {
			width: 143px;
			font-size: 11px;
			.tit {
				color: #333333;
				line-height: 18px;
				margin-top: 10px;
			}
			.price {
				margin-top: 20px;
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
					width: 36px;
					height: 13px;
					text-align: center;
					border-radius: 5px;
					line-height: 13px;
					color: #ffffff;
					font-size: 7px;
					display: inline-block;
					vertical-align: middle;
				}
			}
		}
	}
</style>