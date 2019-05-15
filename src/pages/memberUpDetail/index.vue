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
				<div class="tit">
					<span>包邮</span>
					<span>{{detail.name}}</span>
				</div>
				<div class="total">
				<div class="left">
					<div class="price1">
						<!-- <span>¥{{detail.price}}+</span>
						<span>{{detail.unit}}平台劵</span> -->
					</div>
					<div class="pic"> ¥ {{detail.cost}}</div>
				</div>
				<div class="right">
					<span>{{detail.brief}}</span>
					<span>月销{{detail.buyCount}}笔</span>					
				</div>
				</div>
			</div>
             <!--商品详情 -->
             <div class="detail-tit">
             	<span></span>
             	<span>商品详情</span>
             </div>
			<div>
				<wxParse :content="detail.intro" @preview="preview" @navigate="navigate" />
			</div>
			<div class="footerBnt">
				<div class="button"  @click="jumpmemberUp">立即购买</div >
			</div>
		</blockquote>
	</div>
</template>

<script>
	import Api from '@/api/goods'
	import store from '@/store/store'
	import loading from '@/components/loading'
	import wxParse from 'mpvue-wxparse'
	export default {
		data() {
			return {
				curr: 0,
				isCollection: false,
				detail: {},
				banner: [],
				userInfo: {},
				isLoading: false,
				Width: ''
			}
		},
		components: {
			loading,
			wxParse
		},
		methods: {
			btnTab: function(index) {
				let that = this
				that.curr = index
			},
			jumpmemberUp(){
				let that = this
				let goodarr = []
				let goodlist = {}
				let Goods = {}
				goodlist.pic = 1
				goodlist.num = 1;
				goodlist.image = that.detail.thumbnail
				goodlist.name = that.detail.name
				goodlist.goodsId = that.detail.goodsId
				goodlist.price = that.detail.price
				goodlist.cart = 0
				goodarr[0] = goodlist;
				Goods.googitem = goodarr
				store.commit("stateGoodItem", JSON.stringify(Goods))
				wx.navigateTo({
					url: "../cart-order/main?cart=0&orderType=2"
				})
			},
			getGoodsInfo(goodsId) {
				let params = {}
				let that = this
				params.goodsId = goodsId
				params.memberId = that.userInfo.memberId
				Api.getGoodsInfo(params).then(function(res) {
					that.isLoading = true
					if(res.code == 0) {
						res.products = res.products.map(item => {
							item.selected = false
							return item
						})
						that.isCollection = res.count == 1 ? true : false
						res.products[0].selected = true
						res.Goods.deduction = res.products[0].deduction
						res.Goods.oldPrice = res.products[0].price
						res.Goods.activePrice = res.products[0].specs
						res.Goods.specs = res.products[0].name
						that.banner = res.Gallery
						res.Goods.products = res.products
						that.detail = res.Goods
					}
				})
			}
		},
		mounted() {
			let that = this
			that.goodsId = that.$root.$mp.query.goodsId
			that.userInfo = store.state.userInfo
			that.Width = wx.getSystemInfoSync().windowWidth*0.8
			that.getGoodsInfo(that.goodsId)
		},
		onUnload() {
			let that = this
			that.curr = 0
			that.isCollection = false
			that.detail = {}
			that.banner = []
			that.userInfo = {}
			that.isLoading = false
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
	.footerBnt{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 57px;
	.button{	
		width: 100%;
		height: 100%;
		line-height: 57px;
		color: #ffffff;
		font-weight: bold;
		background: #ce303d;
		text-align: center;
	}
}
	/*商品详情*/
	.detail-tit{
		width: 100%;padding-left: 12px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		margin-top: 35px;
		span{
			display:block;
			&:nth-child(1){
				width: 4px;
				height: 14px;
				background: linear-gradient(#c42f3c,#ff3344);
			}
			&:nth-child(2){
			 font-size: 15px;
		     color: #333333;
		     margin-left: 4px;
			}
		}
	}
	.wxParse .img {
		display: flex;
	}
	/*产品详情*/
	
	.detail {
		padding: 0 12px;
		width: 100%;
		box-sizing: border-box;
		line-height: 1;
		.tit{
			align-items: center;			
			display: flex;
			padding: 8px 0 12px 0;
			span{
				display: block;
				&:nth-child(1){
					background: linear-gradient(to right,#1dae00,#2bd982);
					width: 44px;
					height: 19px;
					font-size: 13px;
					color: #ffffff;
					font-weight: bold;
					text-align: center;
					line-height: 19px;
					
				}
				&:nth-child(2){
					font-size: 17px;
					color: #333333;
					font-weight: bold;
					margin-left: 4px;
				}
			}
		}
		.total{
			display: flex;
			width: 100%;
			justify-content: space-between;
			.left{
				.price1{
					font-size: 17px;
					color: #FF0000;
				}
				.pic{
					font-size: 19px;
					color: #ff0000;
					font-weight: bold;
					padding-top: 11px;
				}
			}
			.right{
				span{
					display: block;
					font-size: 12px;
					color: #666666;
					&:nth-child(1){
						padding-top: 4px;
					}
					&:nth-child(2){
						padding-top: 15px;
					}
				}
			}
		}
	}
</style>