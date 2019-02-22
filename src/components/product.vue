<template>
	<div>
		<div class="product-list-li" v-for="(item,index) in products" @click="jump(item.goodsId)">
			<div class="img">
				<img :src="item.thumbnail" />
			</div>
			<div class="content">
				<div class="tit fontHidden">{{item.name}}</div>
				<div class="price">
					<span>¥{{item.cost}}</span>
				</div> 
				<div class="price1" :style="{display:isflex}">
					<span>¥{{item.price}}+</span>
					<div class="ptq">{{item.unit}}平台卷</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default {
		props: ['products','isflex'],
		data() {
			return {

			}
		},

		components: {},

		methods: {
             jump:function(goodsId){
             	wx.navigateTo({
             		url:'../product-detail/main?goodsId='+goodsId
             	})
             }
		},

		created() {

		}
	}
</script>

<style lang="less">
	.product-list-li {
		display: flex;
		justify-content: space-between;
		padding: 15px 0 15px 0;
		border-bottom: 1px solid #e6e6e6;
		flex-wrap: wrap;
		.img {
			width: 110px;
			height: 110px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.content {
			width: 210px;
			font-size: 11px;
			.tit {
				color: #333333;
				line-height: 25px;
				box-sizing: border-box;
				height: 55px;
				margin-bottom: 10px;
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
		}
	}
</style>