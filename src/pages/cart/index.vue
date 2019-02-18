<template>
		<div class="cart">	
			<div class="product-list-li" v-for="(item,index) in product">
				<!--选择框-->
				<div class="product-left">
					<input type="checkbox" name="" value="" />
				</div>
				<!--内容-->
				<div class="product-canter">
					<div class="img">
						<img :src="item.img" />
					</div>
					<div class="content">
						<div class="tit">{{item.tit}}</div>
						<div class="describe">{{item.describe}}</div>
						<div class="price">
							<span>¥{{item.price}}</span>
						</div>
						<div class="price1" :style="{display:isflex}">
							<span>¥{{item.price}}-</span>
							<span>{{item.ticket}}</span>
							<div class="ptq">平台卷</div>
						</div>
					</div>
				</div>
				<!--加减-->
				<div class="product-right">
					<span @click="jian(index)">-</span>
					<span>{{item.num}}</span>
					<span @click="jia(index)">+</span>
				</div>
			</div>
			
			<!--结算-->
			<div class="account">
				<div class="account-left">
					<span><input type="checkbox" name="" value="" /></span>
					<span>全选</span>
				</div>
				<div class="account-right">
					<span>合计:{{total}}</span>		
					<span @click="jump">结算</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				total:500,
				product: [{
						num: 1,
						id: 1,
						img: "/static/images/product-list.png",
						tit: "元淳孕妇爽肤水保湿水天然孕妇护肤品化妆品补水洋甘菊专用柔肤水",
						describe: "化妆品补水洋甘菊专用柔肤水水天然孕妇护肤",
						price: "198",
						ticket: "20"

					},
					{
						num: 1,
						id: 2,
						img: "/static/images/product-list.png",
						tit: "元淳孕妇爽肤水保湿水天然孕妇护肤品化妆品补水洋甘菊专用柔肤水",
						describe: "化妆品补水洋甘菊专用柔肤水水天然孕妇护肤",
						price: "198",
						ticket: "20",

					},
					{
						num: 1,
						id: 3,
						img: "/static/images/product-list.png",
						tit: "元淳孕妇爽肤水保湿水天然孕妇护肤品化妆品补水洋甘菊专用柔肤水",
						describe: "化妆品补水洋甘菊专用柔肤水水天然孕妇护肤",
						price: "198",
						ticket: "20"
					},
					{
						num: 1,
						img: "/static/images/product-list.png",
						tit: "元淳孕妇爽肤水保湿水天然孕妇护肤品化妆品补水洋甘菊专用柔肤水",
						describe: "化妆品补水洋甘菊专用柔肤水水天然孕妇护肤",
						price: "198",
						ticket: "20"
					},
				],
			}
		},

		components: {},

		methods: {
			//减
			jian: function(index) {
				let that = this;
				if(that.product[index].num > 1) {
					that.product[index].num--
				}
			},
			//加
			jia: function(index) {
				let that = this;
				if(that.product[index].num < 99) {
					that.product[index].num++
				}
			},
			//结算跳转
			jump:function(){
				wx.navigateTo({
					url:"../cart-order/main",
				})
		},
		created() {

		}
	}
	}
</script>

<style lang="less">
	/*checkbox 选项框大小  */
	
	checkbox .wx-checkbox-input {
		width: 16px;
		height: 16px;
		border-radius: 50%;
	}
	/*checkbox选中后样式  */
	
	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background: #ff9966;
	}
	/*checkbox选中后图标样式  */
	
	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		color: #FFFFFF;
	}
	
	.cart{
		padding-bottom: 35px;
	}
	.product-list-li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #f6f6f6;
		padding: 0 20px 20px 15px;
		.product-canter {
			width: 220px;
			margin-top: 20px;
			display: flex;
			justify-content: space-between;
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
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap
				}
				.describe {
					color: #b5b5b5;
					font-size: 10px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap
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
		.product-right{
			span{
				&:nth-child(1){
					margin-right: 11px;
					font-size: 20px;
				}
				&:nth-child(2){
					background-color: #a72126;
					width: 18px;
					height: 18px;
					border-radius: 50%;
					display: inline-block;
					text-align: center;
					font-size: 13px;
					color: #FFFFFF;
					line-height: 18px;
					vertical-align: middle;
				}
				&:nth-child(3){
					margin-left: 11px;
					font-size: 20px;
				}
			}
		}
	}
	/*结算*/
      .account{
      	position: fixed;
      	bottom: 0;
      	background-color: #f6f6f6;
      	width: 100%;
      	height: 35px;
      	line-height: 35px;
      	padding-left: 12px;
      	box-sizing: border-box;
      	display: flex;
      	justify-content: space-between;
      	.account-left{
      		span{
      			display:inline-block; 
      			&:nth-child(1){
      				
      			}
      			&:nth-child(2){
      				  font-size: 12px;
      				  color: #333333;
      				  margin-left: 2px;
      			}
      		}
      	}
      	.account-right{
      		span{
      			display:inline-block; 
      			&:nth-child(1){
      				color: #a82429;
      				font-size: 12px;
      				margin-right: 28px;
      			}
      			&:nth-child(2){
      				color: #ffffff;
      				font-size: 16px;
      				width: 98px;
      				height:35px;
      				background-color: #ff9966;
      				text-align: center;
      				line-height: 35px;
      			}
      		}
      	}
      	
      }

</style>