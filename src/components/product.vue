<template>
	<div>
		<div class="product-list-li" v-for="(item,index) in products">
			<div class="img">
				<img :src="item.img" />
			</div>
			<div class="content">
				<div class="tit">{{item.tit}}</div>
				<div class="price">
					<span>¥{{item.price}}</span>
				</div> 
				<div class="price1" :style="{display:isflex}">
					<span>¥{{item.price}}-</span>
					<span>{{item.ticket}}</span>
					<div class="ptq">平台卷</div>
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
		&:nth-child(1) {
			padding: 0 0 15px 0;
		}
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
				line-height: 18px;
				margin-top: 10px;
			}
			.price {
				margin-top: 20px;
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
</style>