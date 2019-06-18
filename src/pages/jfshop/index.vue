<template>
	<div>
		<div class="cz">
			<div class="num">我的积分: 1288</div>
		</div>
		<div class="list">
			<div class="list-li" v-for="(item,index) in list">
				<div class="left"><img :src="item.img" /></div>
				<div class="right">
					<div class="name fontHidden">{{item.name}}</div>
					<div class="pic">
						<span v-if="item.pic!=0">¥{{item.pic}}+</span>
						<span>{{item.jf}}积分</span>
					</div>
					<div class="btn"><span>立即兑换</span></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561363603&di=e1eac67b5033cfd29013b40ae6ecb4fa&imgtype=jpg&er=1&src=http%3A%2F%2Fpic5.58cdn.com.cn%2Fzhuanzh%2Fn_v27c9829ceb7a34d039b706c8e45593d1a.jpg%3Fw%3D750%26amp%3Bh%3D0",
						name: "婴幼儿植萃舒缓洗发沐浴露",
						pic: 0,
						jf: 50
					},
					{
						img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561363603&di=e1eac67b5033cfd29013b40ae6ecb4fa&imgtype=jpg&er=1&src=http%3A%2F%2Fpic5.58cdn.com.cn%2Fzhuanzh%2Fn_v27c9829ceb7a34d039b706c8e45593d1a.jpg%3Fw%3D750%26amp%3Bh%3D0",
						name: "元淳夏季伴侣（雪莲夏季隔离乳+七珍莹润水水霜）",
						pic: 88,
						jf: 50
					},
				]
			}
		},

		components: {

		},

		methods: {
			jumpcz() {
				wx.navigateTo({
					url: '../jfcz/main'
				})
			}

		},

		created() {}
	}
</script>

<style lang="less">
	.cz {
		width: 100%;
		height: 49px;
		background: #ff3344;
		display: flex;
		padding: 0 12px;
		justify-content: space-between;
		box-sizing: border-box;
		align-items: center;
		.num {
			color: #ffffff;
			font-size: 20px;
		}
	}
	
	.list {
		padding: 0 12px;
		box-sizing: border-box;
		.list-li {
			display: flex;
			justify-content: space-between;
			box-shadow: 0 0 8px #e6e5ff;
			width: 100%;
			height: 150px;
			overflow: hidden;
			border-radius: 12px;
			margin-top: 12px;
			box-sizing: border-box;
			padding: 4px;
			.left {
				width: 146px;
				height: 142px;
				img {
					width: 100%;
					height: 100%;
					display: block;
					border-top-left-radius: 8px;
					border-bottom-left-radius: 8px;
				}
			}
			.right {
				width: 1px;
				flex-grow: 1;
				padding: 14px 0 0 8px;
				.name {
					color: #333333;
					font-size: 15px;
					line-height: 22px;
					height: 44px;
				}
				.pic {
					color: #ff0000;
					font-size: 16px;
					padding-top: 10px;
					padding-bottom: 10px;
				}
				.btn {
					display: flex;
					justify-content: flex-end;
					padding-right: 8px;
					span {
						display: block;
						width: 90px;
						height: 33px;
						border-radius: 16.5px;
						border: 1px solid #dedede;
						line-height: 33px;
						text-align: center;
						color: #333333;
						font-size: 14px;
					}
				}
			}
		}
	}
</style>