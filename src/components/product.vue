<template>
	<div>
			<div class="exclusive">
					<div class="exclusive-list">
						<div class="exclusive-list-li" v-for="(item,index) in products" @click="jump(item.goodsId)">
							<div class="left"><img :src="item.thumbnail" /></div>
							<div class="right">
								<div class="name">{{item.name}}</div>
								<div class="picold">
									<span>¥{{item.cost}}+</span>
									<span>{{item.unit}}平台券</span>
								</div>
								<div class="pic">
									<span>¥{{item.price}}</span>
									<span>立即购买</span>
								</div>
							</div>
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
	
	.exclusive {
		padding: 0 12px;
		box-sizing: border-box;
		.exclusive-list {
			.exclusive-list-li {
				display: flex;
				width: 100%;
				height: 150px;
				border-radius: 12px;
				overflow: hidden;
				box-shadow:0 0 8px #e6e5ff;
				margin-top: 10px;
				&:nth-child(1){margin-top: 0;}
				.left {
						width: 150px;
						height: 150px;
						padding: 4px 0 4px 4px;
						box-sizing: border-box;
						img{width: 100%;height: 100%;border-top-left-radius: 8px;border-bottom-left-radius: 8px;}
				}
				.right {
						padding: 14px 12px 0 7px;
						box-sizing: border-box;
						width: 1px;
						flex-grow: 1;
					.name {
                        font-size: 15px;
                        color: #333333;
                        height: 40px;
                        line-height: 20px;                                              
					}
					.picold {
						margin-top: 20px;
						font-size: 16px;
						color: #ff0000;
					}
					.pic {  
						margin-top: 11px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						span{
							display: block;
							&:nth-child(1){
								font-size: 19px;
								color: #ff0000;
								font-weight: bold;
							}
							&:nth-child(2){
								font-size: 14px;
								color: #ffffff;
								text-align: center;
								width: 90px;
								height: 33px;
								border-radius: 16.5px;
								background: linear-gradient(to right,#c42f3c,#ff3344);
								line-height: 33px;
								
							}
						}
					}
				}
			}
		}
	}
</style>