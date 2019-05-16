<template>
	<div class="goodDetailFooter">
		<div class="footerBnt">
			<div class="left">
				<div class="leftItme" @click="jumpIndex"><img :src="homeImg" />
					<p>首页</p>
				</div>
				<div class="button" @click="showModel(2)" form-type="submit">加入购物车</div>
			</div>
			<div class="right">
				<div class="button" @click="showModel(1)" form-type="submit">立即购买</div>
			</div>
		</div>
		<div class="modeWarp" v-if="modelShow">
			<div class="ModelMask"></div>
			<div class="Model" :animation='Animation'>
				<div class="colse" @click="hideModel">
					<span class="iconfont">&#xe61a;</span>
				</div>

				<div class="ModelTop">					
					<div class="topLeft"><img :src="GoodsInfo.thumbnail" /></div>
					<div class="topRight">
						<div class="fontHidden tit">{{GoodsInfo.name}}</div>
						<div class="price1">
							<span>¥{{GoodsInfo.activePrice}}+</span>
							<span>{{GoodsInfo.deduction}}平台劵</span>
						</div>
						<div class="price">
							<span>￥{{GoodsInfo.oldPrice}}</span>
							<span>库存：999+</span>
						</div>
					</div>

				</div>

				<div class="ModelNum"><text>数量：</text>
					<div class="priceright">
						<span class="icon iconfont" @click="Minu()">&#xe60d;</span>
						<span class="num">{{pic}}</span>
						<span class="icon iconfont" @click="Plus()">&#xe600;</span>
					</div>
				</div>
				<div class="ModelBtn"><span v-if='btnIndex == 1' @click="toNext">立即购买</span>
					<span v-if='btnIndex == 2' @click="toCart">加入购物车</span></div>
			</div>

		</div>
	</div>
</template>
<script>
	import Api from '@/api/goods'
	import store from '@/store/store'
	export default {
		props: ['GoodsInfo', 'posts'],
		data() {
			return {
				kefuImg: 'https://shop.guqinet.com/html/images/shuiguo/group/kefu.png',
				homeImg: '/static/images/homeselect.png',
				noshouChang: 'https://shop.guqinet.com/html/images/shuiguo/group/shoucan.png',
				shouChang: 'https://shop.guqinet.com/html/images/shuiguo/group/shoucang.png',
				modelShow: false,
				btnIndex: '',
				pic: 1,
				userInfo: {}
			}
		},
		methods: {
			showModel(index) {
				let that = this;
				that.modelShow = true;
				that.btnIndex = index
				//父组件控制子组件
				// that.$refs.childs.emitEvent(index);
			},
			jumpIndex() {
				wx.switchTab({
					url: '../index/main'
				});
			},
			hideModel() {
				let that = this
				that.modelShow = false;
			},
			// 立即购买
			async toNext() {
				let that = this;
				let productsSelect = that.GoodsInfo.products.find((item) => {
					if(item.selected) {
						return item
					}
				})
				let goodarr = []
				let goodlist = {}
				let Goods = {}
				goodlist.pic = that.pic
				goodlist.num = that.pic;
				goodlist.price = productsSelect.price;
				goodlist.image = that.GoodsInfo.thumbnail
				goodlist.name = that.GoodsInfo.name
				goodlist.goodsId = that.GoodsInfo.goodsId
				goodlist.productId = productsSelect.productId
				goodlist.gainedpoint = that.pic * that.GoodsInfo.point
				goodlist.specvalue = that.GoodsInfo.specs
				goodlist.price = productsSelect.price
				goodlist.specs = productsSelect.specs
				goodlist.cart = 0
				goodlist.deduction = productsSelect.deduction
				goodarr[0] = goodlist;
				Goods.googitem = goodarr
				Goods.fenrunAmount = productsSelect.fenrunAmount * that.pic
				Goods.twoAmount = productsSelect.twoAmount * that.pic
				Goods.priceTotal = productsSelect.price * that.pic
				Goods.specsTotal = productsSelect.specs * that.pic
				Goods.deductionTotal = productsSelect.deduction * that.pic
				store.commit("stateGoodItem", JSON.stringify(Goods))
				wx.navigateTo({
					url: "../cart-order/main?cart=0&orderType=1"
				})
			},
			//点击加入购物车
			async toCart() {
				let that = this;
				let productsSelect = that.GoodsInfo.products.find((item) => {
					if(item.selected) {
						return item
					}
				})
				let cartparms = {};
				cartparms.productId = productsSelect.productId
				cartparms.original = that.GoodsInfo.thumbnail
				cartparms.memberId = that.userInfo.memberId
				cartparms.goodsId = that.GoodsInfo.goodsId
				cartparms.image = that.GoodsInfo.thumbnail
				cartparms.num = that.pic
				cartparms.point = that.GoodsInfo.point
				cartparms.weight = 0
				cartparms.name = that.GoodsInfo.name
				cartparms.price = productsSelect.price
				//判断购物车订单
				cartparms.cart = 1
				cartparms.specvalue = that.GoodsInfo.specs
				let res = await Api.toCartSave(cartparms)
				wx.showToast({
					title: '添加成功',
					icon: 'success',
					duration: 2000
				})
			},
			async AreaselectClick(Pindex) {
				let that = this;
				that.GoodsInfo.products = that.GoodsInfo.products.map((v) => {
					v.selected = false
					return v
				})
				that.GoodsInfo.products[Pindex].selected = true
				that.GoodsInfo.oldPrice = that.GoodsInfo.products[Pindex].price;
				that.GoodsInfo.activePrice = that.GoodsInfo.products[Pindex].specs;
				that.GoodsInfo.deduction = that.GoodsInfo.products[Pindex].deduction
				that.GoodsInfo.enableStore = that.GoodsInfo.products[Pindex].enableStore;
				that.GoodsInfo.specs = that.GoodsInfo.products[Pindex].name
			},
			async collection() {
				let that = this
				let favorite = {}
				favorite.memberId = that.userInfo.memberId
				favorite.goodsId = that.GoodsInfo.goodsId
				console.log(that.posts);
				if(that.posts) {
					let delCollectionRes = await Api.delCollection(favorite)
					if(delCollectionRes.code == 0) {
						wx.showToast({
							title: '取消收藏',
							icon: 'success',
							duration: 2000
						})
						that.posts = !that.posts
					}
				} else {
					let addCollectionRes = await Api.addCollection(favorite)
					if(addCollectionRes.code == 0) {
						wx.showToast({
							title: '收藏成功',
							icon: 'success',
							duration: 2000
						})
						that.posts = !that.posts
					}
				}
			},
			kefu() {
				//触发打电话
				let that = this;
				let indexData = wx.getStorageSync('indexdata');
				wx.makePhoneCall({
					phoneNumber: indexData.mobile,
				})
			},
			Plus() {
				this.pic += 1
			},
			Minu() {
				if(this.pic > 1) {
					this.pic -= 1
				} else {
					wx.showToast({
						title: '最少购买一个',
						icon: 'none',
						duration: 2000
					})
				}
			}
		},
		mounted() {
			let that = this
			that.userInfo = store.state.userInfo
		}
	}
</script>

<style lang="less">
	.footerBnt {
		display: flex;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 57px;
		.left {
			display: flex;
			width: 50%;
			.leftItme {
				width: 57px;
				height: 100%;
				background: #fff2f3;
				text-align: center;
				img {
					width: 22px;
					height: 22px;
					display: block;
					margin: 10px auto 2px auto;
				}
				p {
					font-size: 11px;
					color: #ff6673;
					display: block;
				}
			}
			.button {
				width: 1;
				height: 100%;
				flex-grow: 1;
				line-height: 57px;
				font-size: 16px;
				color: #ffffff;
				font-weight: bold;
				background: #ff6673;
				text-align: center;
			}
		}
		.right {
			width: 50%;
			.button {
				width: 100%;
				height: 100%;
				line-height: 57px;
				color: #ffffff;
				font-weight: bold;
				background: #ce303d;
				text-align: center;
			}
		}
	}
	
	.modeWarp {
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
	}
	
	.ModelMask,
	.Model {
		position: fixed;
		left: 0;
		width: 100%;
		height: 100%;
	}
	
	.ModelMask {
		z-index: 1;
		top: 0;
		background: rgba(0, 0, 0, 0.400);
		height: 100vh;
	}
	
	.Model {
		z-index: 2; 
		bottom: 0;
		height: 300px;
		background: #fff;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		.ModelTop {
			border-bottom: 1px solid #F4F4F4;
			 display: flex;
			 border-radius: 12px;
		     background: #FFFFFF;		     
               .topLeft{
               	padding: 12px;
				height: 120px;
				width:120px;
				img {
					width: 100%;
					height: 100%;
				}
               } 
               .topRight{
               	line-height: 1;
				padding-top: 20px;
				width: 1;
				flex-grow: 1;
				padding-right: 12px;
				  .tit{
				  	font-size: 17px;
					color: #333333;
					font-weight: bold;
					height: 55px;
					line-height: 22px;
					width: 190px;
				  }
               	 .price1{
               	 	span{
               	 		display: inline-block;
               	    	font-size: 16px;
	                  	color: #FF0000;
               	 	}
               	 }
               	 .price{
               	 	display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 12px;
					span {
					  display: block;
					  &:nth-child(1){
					  	font-size: 19px;
					  	color: #ff0000;
					  	font-weight: bold;
					  }
					  &:nth-child(2){
					  	font-size: 14px;
					  	color: #666666;
					  	
					  }
					}
               	 }
               }
		}
		.colse {
			position: absolute;
			right:12px;
			top: 8px;
			color: #999999;
			font-size: 45rpx;
			font-weight: 100;
			img {
				width: 45rpx;
				height: 45rpx;
				display: block;
			}
		}
	}
	
	.ModelBtn {
		position: fixed;
		z-index: 3;
		bottom: 12px;
		width: 100%;
		padding: 0 12px ;
		box-sizing: border-box;
	}
	
	.ModelBtn span {
		display: block;
		width:100%;
		margin: auto;
		line-height: 88rpx;
		text-align: center;
		border-radius: 22px;
		background:linear-gradient(to right, #c42f3c, #ff3344);
		color: #fff;
		font-weight: 100;
		
	}
	
	.ModelNum {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 44px;
		line-height: 44px;
		font-weight: 100;
		font-size: 32rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 0 12px;		
	}
	
	.priceright {
		background: #e7e7e7;
		display: flex;
		align-items: center;
		height: 48rpx;
		.icon {
			text-align: center;
			line-height: 22px;
	         width: 22px;
	         height: 22px;
	         font-size: 12px;
	         color: #FFFFFF;
	         font-weight: bold;
		}
		.num {
			background: #fff;
			height: 40rpx;
			line-height: 40rpx;
			color:#333333;
			display: inline-block;
			padding: 0 15rpx;
			font-size: 28rpx;
		}
	}
</style>