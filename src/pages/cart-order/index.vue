<template>
	<div>
		<div class="cart">
			<!--点击新增地址-->
			<div class="site">
				+点击新增地址
			</div>

			<div class="product-list-li" v-for="(item,index) in product">
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
					</div>
				</div>
				<!--加减-->
				<div class="product-right">
					<span>×{{item.num}}</span>
				</div>
			</div>

			<!--结算-->
			<div class="account">
				<!--<div class="account-left">
					<span><input type="checkbox" name="" value="" /></span>
					<span>全选</span>
				</div>-->
				<div class="account-right">
					<span>合计:{{total}}</span>
					<span @click="jump">结算</span>
				</div>
			</div>
		</div>
		<div class="cart-bottom">
			<!--买家留言-->
			<div class="leave">
				<span>买家留言:</span>
				<span><input type="text" placeholder="点击留言"/></span>
			</div>
			<!--商品金额-->
			<div class="money">
				<div class="money-left">
					<span>商品金额</span>
					<span>¥ {{price.money}}</span>
				</div>
				<div class="money-right">
					<span>运费</span>
					<span>¥ {{price.freight}}</span>
				</div>
			</div>
			<!--支付方式-->
			<div class="mode">
				<div class="mode-tit">支付方式</div>
				<div class="mode-moye">
					<div class="mode-moye-left">
						<span>{{price.money}}-20</span>
						<span>平台券</span>
					</div>
					<div class="mode-moye-right">
						<input type="checkbox" name="" id="" value="" />
					</div>
				</div>
				<div class="mode-moye">
					<div class="mode-moye-left">
						<span>{{price.money}}</span>
					</div>
					<div class="mode-moye-right">
						<input type="checkbox" name="" id="" value="" />
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				total: 500,
				price: {
					money: 276,
					freight: 13,

				},
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
			jump: function() {
				wx.navigateTo({
					url: "../cart-order/main",
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
	/*点击新增地址*/
	
	.site {
		width: 100%;
		height: 42px;
		color: #858585;
		font-size: 12px;
		background-color: #e0e0e0;
		line-height: 42px;
		text-align: center;
	}
	
	.product-list-li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #f6f6f6;
		padding: 0 20px 9px 15px;
		.product-canter {
			width: 220px;
			margin-top: 9px;
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
		.product-right {
			span {
				color: #a82429;
			}
		}
	}
	/*结算*/
	
	.account {
		position: fixed;
		bottom: 0;
		background-color: #f6f6f6;
		width: 100%;
		height: 35px;
		line-height: 35px;
		padding-left: 12px;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-end;
		/*.account-left {
			span {
				display: inline-block;
				&:nth-child(1) {}
				&:nth-child(2) {
					font-size: 12px;
					color: #333333;
					margin-left: 2px;
				}
			}
		}*/
		.account-right {
			span {
				display: inline-block;
				&:nth-child(1) {
					color: #a82429;
					font-size: 12px;
					margin-right: 28px;
				}
				&:nth-child(2) {
					color: #ffffff;
					font-size: 16px;
					width: 98px;
					height: 35px;
					background-color: #ff9966;
					text-align: center;
					line-height: 35px;
				}
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
		.mode {
			padding-right: 51px;
			box-sizing: border-box;
			.mode-tit {
				font-size: 12px;
				color: #000000;
				padding: 10px 0 8px 0;
			}
			.mode-moye {
				display: flex;
				align-items:center;
				justify-content: space-between;
				.mode-moye-left{
					font-size: 12px;
					color: #a82429;
					span{
						display:inline-block; 
						&:nth-child(2){
							width: 28px;
							height: 9px;
							background-color: #a82429;
							text-align: center;
							line-height: 9px;
							color: #FFFFFF;
							margin-left: 4px;
							border-radius: 5px;
							font-size: 6px;
							vertical-align: middle;
						}
					}
				}
			
			}
		}
	}
</style>