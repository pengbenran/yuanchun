<template>
	<div class="container">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
			<!--产品列表-->
			<div class="product">
				<div class="product-list">
		           <product :products="List"></product>
				</div>
			</div>
		</blockquote>
	</div>
</template>

<script>
	import product from '@/components/product'
	import Api from "@/api/member";
	import loading from '@/components/loading'
	import { ToastShow } from '@/utils/index'
	export default {
		data() {
			return {
				product: [],
				List:[],
				isLoading:false,
			}
		},

		components: {
			product,
			loading
		},

		methods: {
	         get_favorite(){
				 let that = this;
				 let data = {
					 memberId:wx.getStorageSync('memberId')
				 }
                 Api.getfavoritelist(data).then(res =>{
					 if(res.code == 0){
						that.isLoading = true; 
						that.List = res.FavoriteList
					 }
				 }).catch(err => {
                    ToastShow('失败','none')
				 })
			 },
		},
		mounted() {
			let that=this
            that.get_favorite();
		},

		onUnload(){
			this.product = [];
			this.List = [];
			this.isLoading = false;
		},
		
		onReachBottom:function(){
			let that = this;
			// that.nowPage[that.kindIndex]+=1
		
		},
		onPullDownRefresh: function(){	
			wx.stopPullDownRefresh()
		},
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
			img{
				border-radius: 5px;
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