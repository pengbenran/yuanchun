<template>
	<div>
		<!--轮播-->
		<swiper indicator-dots>
			<div v-for="(item,index) in banner">
				<swiper-item>
					<div class='box'>
						<img :src='item.banners'></img>
					</div>
				</swiper-item>
			</div>
		</swiper>
		<!--产品详情-->
		<div class="detail">
			<div class="pic">
				<span>¥ {{detail.pic}}</span>
				<span>¥ {{detail.pic1}}</span>
			</div>
			<div class="tit">
				{{detail.tit}}
			</div>
			<div class="kdf">
				<span>快递费：{{detail.kdf}}元</span>
				<span>月销{{detail.sales}}笔</span>
				<span>{{detail.site}}</span>
			</div>
		</div>
		<div class="xian"></div>
		<!--产品属性-->
		<div class="attribute">
			<span @click="btnTab(index)" class="tit" :class="curr==index?'addr':''" v-for="(attribute,index) in attribute">{{attribute.tit}}</span>			
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				curr:0,
				attribute:[
		              {tit:"商品详情"},
		              {tit:"商品属性"},
		              {tit:"商品推荐"},
				],
				detail: {
					pic: 219,
					pic1: 399,
					tit: '元淳孕妇爽肤水保湿水天然孕妇护肤品化妆品补水洋甘菊专用柔肤水 ',
					kdf:13,
					sales:3456,
					site:"江西南昌",
				},
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

		components: {},

		methods: {
          btnTab:function(index){
          	let that = this
          	that.curr = index
          }
		},

		created() {

		}
	}
</script>

<style lang="less">
	/*轮播*/
	swiper {
		width: 100%;
		height: 300px;
		.box {
			width: 100%;
			height: 100%;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	/*产品详情*/
	.detail{
		padding: 0 10px;
		box-sizing: border-box;
		.pic{
			padding: 17px 0 9px 0;
			span{
				&:nth-child(1){
					font-size: 14px;
					color: #fe2448;
				}
				&:nth-child(2){
					font-size: 12px;
					color: #a6a6a6;
					margin-left: 10px;
					text-decoration: line-through;
				}
			}
		}
		.tit{
			line-height: 20px;
			width: 254px;
			font-size: 13px;
			color: #333333;
			
		}
		.kdf{
			display: flex;
			justify-content: space-between;
			padding: 9px 0 13px 0;
			span{
				display: block;
				font-size: 13px;
				color: #a7a7a7;
				
			}
		}
	}
	.xian{
		width: 100%;
		height: 12px;
		background-color: #f1f1f1;
		
	}
	
	
	.attribute{
		display: flex;
		justify-content: space-between;
		padding: 12px 31px;
		.tit{
			display: block;
			color: #8a8a8a;
			font-size: 15px;
		}
		.addr{
			color: #38ddbf;
		}
	}
</style>