<template>
	<div>
		<!--轮播-->
		<swiper indicator-dots>
			<div v-for="(item,index) in banner">
				<swiper-item>
					<div class='box'>
						<img :src='item.original' mode="widthFix"></img>
					</div>
				</swiper-item>
			</div>
		</swiper>
		<!--产品详情-->
		<div class="detail">
			<div class="pic">
			   ¥ {{detail.cost}}
			</div>
			<div class="price1">
				<span>¥{{detail.price}}+</span>
				<div class="ptq">{{detail.unit}}平台卷</div>
			</div>
			<div class="tit">
				{{detail.name}}
			</div>
			<div class="kdf">
				<span>快递费：{{detail.kdf}}元</span>
				<span>月销{{detail.haveSpec}}笔</span>
				<span>{{detail.site}}</span>
			</div>
		</div>
		<goodsDetailFooter :GoodsInfo='detail'/>
	</div>
</template>

<script>
	import Api from '@/api/goods'
	import goodsDetailFooter from '@/components/goodDetailFooter'
	export default {
		data() {
			return {
				curr:0,
				posts:false,
				detail: {},
				banner: []
			}
		},

		components: {goodsDetailFooter},

		methods: {
          btnTab:function(index){
          	let that = this
          	that.curr = index
          },
	       getGoodsInfo(goodsId){
          	let params={}
          	let that=this
          	params.goodsId=goodsId
          	Api.getGoodsInfo(params).then(function(res){
          		if(res.code==0){
          			that.banner=res.Gallery
          			res.Goods.products=res.products
          			that.detail=res.Goods
          		}
          		console.log(res);
          	})
          }
		},
		mounted() {
			let that=this
			// that.goodsId =that.$root.$mp.query.goodsId
			 that.goodsId=50
			that.getGoodsInfo(that.goodsId)
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
			font-size: 16px;
			color: #a82429;		
		}
		.price1 {
			color: #a82429;
			font-size: 16px;
			.ptq {
				background-color: #801d20;
				padding:0 10px;
				box-sizing: border-box;
				height: 19px;
				text-align: center;
				border-radius: 5px;
				line-height: 19px;
				color: #ffffff;
				font-size: 13px;
				display: inline-block;
				vertical-align: middle;
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