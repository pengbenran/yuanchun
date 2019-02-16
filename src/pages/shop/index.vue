<template>
	<div>
		<!--轮播-->
		<div class='test'>
			<swiper display-multiple-items='1' circular previous-margin='28px' next-margin='28px' indicator-dots>
				<div v-for="(item,index) in banner">
					<swiper-item>
						<div class='box'>
							<img :src='item.banners'></img>
						</div>
					</swiper-item>
				</div>
			</swiper>
		</div>
		<!--商品类目-->
		<div class="cate">
			<div class="cate-li" v-for="(item,index) in cate">
				<span><img :src="item.img"/></span>
				<span>{{item.name}}</span>
			</div>
		</div>
		<!--海报-->
		<div class="poster">
			<img :src="poster.img" />
		</div>
		<!--产品列表-->
		<div class="product">
			<div class="headline">商品列表 </div>
			<div class="product-list">
	           <product :products="product"></product>
			</div>
		</div>
	</div>
</template>

<script>
	import product from '@/components/product'
	export default {
		data() {
			return {
			    isflex:"none",
				poster: {
					img: "/static/images/banner.png"
				},
					ticket:20,  //平台券
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
				cate: [{
						img: "/static/images/product-cate.png",
						name: "会员专属"

					},
					{
						img: "/static/images/product-cate.png",
						name: "会员专属"
					},
					{
						img: "/static/images/product-cate.png",
						name: "会员专属"
					},
					{
						img: "/static/images/product-cate.png",
						name: "会员专属"
					},
				],
				banner: [{
						banners: "/static/images/banner.png"
					},
					{
						banners: "/static/images/banner.png"
					},
					{
						banners: "/static/images/banner.png"
					},
				]
			}
		},

		components: {
			product,
		},

		methods: {

		},

		created() {

		}
	}
</script>

<style lang="less">
	/*轮播*/
	
	.test {
		width: 100%;
		height: 172px;
		box-sizing: border-box;
	}
	
	swiper {
		height: 100%;
	}
	
	swiper-item {
		text-align: center;
	}
	
	swiper-item image {
		width: 100%;
	}
	
	.box {
		width: 94%;
		height: 100%;
		display: inline-block;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, .1);
		border-radius: 5px;
		img {
			border-radius: 5px;
			width: 100%;
			height: 100%;
		}
	}
	/*轮播*/
	
	.cate {
		width: 100%;
		padding: 37px 17px 16px 17px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.cate-li {
			span {
				display: block;
				&:nth-child(1) {
					width: 46px;
					height: 46px;
					margin: 0 auto;
					img {
						width: 100%;
						height: 100%;
					}
				}
				&:nth-child(2) {
					text-align: center;
					font-size: 12px;
					color: #666666;
					line-height: 26px;
				}
			}
		}
	}
	/*海报*/
	
	.poster {
		width: 100%;
		height: 167px;
		img {
			width: 100%;
			height: 100%;
		}
	}
	/*商品列表*/
	
	.headline {
		text-align: center;
		font-size: 15px;
		color: #ff485a;
		padding: 20px 0;
		position: relative;
		font-weight: bold;
		&:before,
		&:after {
			content: "";
			width: 32px;
			height: 1px;
			background: #ff485a;
			display: block;
			/*1.首先使伪类显示方式为块级元素*/
			position: absolute;
			/*2.通过相对定位的方式控制两侧内容的位置*/
		}
		&:before {
			/*3.控制左侧横线的位置*/
			top: 30px;
			left: 120px;
		}
		&:after/*4.控制右侧横线的位置*/
		{
			top: 30px;
			right: 120px;
		}
	}
	
	.product {
		.product-list {
			padding: 0 30px 0 10px;
		}
	}
</style>