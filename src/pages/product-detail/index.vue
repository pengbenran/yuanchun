<template>
	<div class="container">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
			<!--轮播-->
			<swiper indicator-dots :style="{height:Width+'px'}">
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
				<div class="tit fontHidden">
					{{detail.name}}
				</div>
				<div class="kdf">
					<span>包邮</span>
					<span>月销{{detail.haveSpec}}笔</span>
					<span>{{detail.brief}}</span>
				</div>		
			</div>
			<div>
				<wxParse :content="detail.intro" @preview="preview" @navigate="navigate" />
			</div>
			<goodsDetailFooter :GoodsInfo='detail' :posts='isCollection'/>
		</blockquote>
	</div>
</template>

<script>
	import Api from '@/api/goods'
	import store from '@/store/store'
	import goodsDetailFooter from '@/components/goodDetailFooter'
	import loading from '@/components/loading'
	import wxParse from 'mpvue-wxparse'
	export default {
		data() {
			return {
				curr:0,
				isCollection:false,
				detail: {},
				banner: [],
				userInfo:{},
				isLoading:false,
				Width:''
			}
		},
		components: {
			goodsDetailFooter,
			loading,
			wxParse
		},
		methods: {
          btnTab:function(index){
          	let that = this
          	that.curr = index
          },
	       getGoodsInfo(goodsId){
          	let params={}
          	let that=this
          	params.goodsId=goodsId
          	params.memberId=that.userInfo.memberId
          	Api.getGoodsInfo(params).then(function(res){
          		that.isLoading=true
          		if(res.code==0){
          			res.products=res.products.map(item=>{
          				item.selected=false
      					return item
          			})
          			that.isCollection=res.count==1?true:false
          			res.products[0].selected=true
          			res.Goods.deduction=res.products[0].deduction
          			res.Goods.oldPrice=res.products[0].specs
          			res.Goods.activePrice=res.products[0].price
          			res.Goods.specs=res.products[0].name
          			that.banner=res.Gallery
          			res.Goods.products=res.products
          			that.detail=res.Goods
          		}
          	})
          }
		},
		mounted() {
			let that=this
			that.goodsId =that.$root.$mp.query.goodsId
			that.userInfo = store.state.userInfo
			that.Width=wx.getSystemInfoSync().windowWidth
			that.getGoodsInfo(that.goodsId)
		},
		onUnload(){
			let that=this
			that.curr=0
			that.isCollection=false
			that.detail={}
			that.banner=[]
			that.userInfo={}
			that.isLoading=false
		},
	}
</script>

<style lang="less">
@import url("~mpvue-wxparse/src/wxParse.css");
	/*轮播*/
	swiper {
		width: 100%;
		.box {
			width: 100%;
			height: 100%;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	.wxParse .img{
		display: flex;
	}
	/*产品详情*/
	.detail{
		padding: 0 20px;
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
			width: 300px;
			font-size: 13px;
			height: 45px;
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