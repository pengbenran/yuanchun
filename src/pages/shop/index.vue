<template>
	<div class="container">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
			<!--轮播-->
			<div class='test' :style="{height:Height+'px'}">
				<swiper circular display-multiple-items='1'  previous-margin='28px' next-margin='28px' indicator-dots>
					<div v-for="(item,index) in banner" :key="item.imageId" :index="index" @click="Brandjump(item.goodsId)">
						<swiper-item style='text-align: center;'>
							<div class='box'>
								<img :src='item.imageUrl'></img>
							</div>
						</swiper-item>
					</div>
				</swiper>
			</div>
			<!--商品类目-->
			<div class="cate">
				<div class="cate-li" v-for="(item,index) in cate" :key="item.catId" :index="index" @click="getKindGoods(item.catId,index)">
					<div class="img">
						<img v-if="kindIndex==index" :src="item.goodsCount"/>
						<img v-if="kindIndex!=index" :src="item.image"/>
					</div>
					<div class="name" :class="kindIndex==index?'on':''">{{item.name}}</div>
				</div>
			</div>
			<!--产品列表-->
			<div class="product">
				<div class="product-list">
		           <product :products="product"></product>
				</div>
			</div>			
		</blockquote>
	</div>
</template>
<script>
	import product from '@/components/product'
	import Api from "@/api/goods";
	import loading from '@/components/loading'
	export default {
		data() {
			return {
				listcurr: 0,
			    isflex:"none",
				catImg:'',
				ticket:20,  //平台券
				product: [],
				cate: [],
				banner: [],
				pages:0,
				limit:3,
				hasMore:[],
				goodsList:[],
				nowPage:[],
				kindIndex:0,
				catId:'',
				isLoading:false,
				Height:'',
				kindHeight:'',
				recommendList: [
				  {name:"普通商城"},
				  {name:"积分商城"},
				],
			}
		},

		components: {
			product,
			loading
		},

		methods: {
			listTab(e,catId) {
				this.listcurr = e
			},
			changeTab(e) {
				let that = this
				that.listcurr = e.mp.detail.current
			},
			async getGoodsAll(catId,pages,limit){
				let that=this
				if(that.hasMore[that.kindIndex]){
					let params={}
					params.catId=catId
					params.offset=pages*limit
					params.limit=limit
					params.disabled=2
					let res=await Api.getGoodsAll(params)
					that.isLoading=true
					if(res.code==0){
						wx.hideLoading();
						if(res.Goods.length<that.limit){
							that.hasMore[that.kindIndex]=false
						}
						that.goodsList[that.kindIndex]=that.goodsList[that.kindIndex].concat(res.Goods)
					}
				}
				else{
					wx.showToast({
						title:'没有更多数据了',
						icon:"none",
						duration:1500
					})
				}
				that.product=that.goodsList[that.kindIndex]		
			},
			getKindGoods(catId,index){
				let that=this
				that.catId=catId
				that.kindIndex=index
				that.catImg=that.cate[index].image
				for(var i in that.cate){
					that.hasMore[i]=true
					that.goodsList[i]=[]
					that.nowPage[i]=0
				}
				that.getGoodsAll(catId,that.nowPage[that.kindIndex],that.limit)			
			},

			//brand跳转
			Brandjump(goodsId){
				if(goodsId){
					wx.navigateTo({
						url:'../product-detail/main?goodsId='+goodsId
					})
				}
			},
		},
		mounted() {
			let that=this
			Api.getGoodCat().then(function(res){
				if(res.code==0){
					that.cate=res.firstGoodCat
					that.catImg=res.firstGoodCat[0].image
					that.banner=res.shopBanner
					that.catId=res.firstGoodCat[0].catId 
					for(var i in that.cate){
						that.hasMore[i]=true
						that.goodsList[i]=[]
						that.nowPage[i]=0
					}
				 that.getGoodsAll(res.firstGoodCat[0].catId,that.nowPage[that.kindIndex],that.limit)

				}
				else{

				}
			})
			that.Height=wx.getSystemInfoSync().windowWidth/2
			that.kindHeight=wx.getSystemInfoSync().windowWidth/2.5
		},
		onReachBottom:function(){
			let that = this;
			that.nowPage[that.kindIndex]+=1
			that.getGoodsAll(that.catId,that.nowPage[that.kindIndex],that.limit)
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
		box-sizing: border-box;
	}
	
	swiper {
		height: 100%;
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
	
	
	.cate {
		width: 100%;
		padding:18px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		.cate-li {
				.img {
					width: 40px;
					height: 40px;
					margin: 0 auto;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.name{
					text-align: center;
					font-size: 17px;
					color: #8d8db2;
					line-height: 30px;
				}				
			
			.on{color: #333333;}
			img{
				border-radius: 5px;
			}
		}
	}
	/*海报*/
	
	.poster {
		width: 100%;
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
			padding-bottom: 20px;
		}
	}
</style>