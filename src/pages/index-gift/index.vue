<template>
	<div class="index-gift">
		<div class="top">
			<img src="/static/images/gift1.png" />
			<div class="tit">双重大礼 赶紧领取</div>
		</div>
		<div class="cant">
			<div class="cant-list" v-for="(item,index) in giftList">
				<div class="left">
					<div class="img"><img :src="item.voucherType" /></div>
					<div class="tit fontHidden3">{{item.repacketName}}</div>
				</div>
				<div class="right"><input type="checkbox" name="checkbox" :checked="item.ischeck" @click="isChoose(index)" /></div>
			</div>
		</div>
		<div class="btn" @click="jump">
			立即领取
		</div>
	</div>
</template>

<script>
	import store from '@/store/store'
	import Api from "@/api/home";
	export default {
		data() {
			return {
				giftList: [],
				gifimg: [{
						img: "/static/images/gift0.png"
					},
					{
						img: "/static/images/gift.png"
					}
				]
			}
		},

		components: {

		},

		methods: {
			jump() {
				let chooseGift = []
				let that = this
				for(var i in that.giftList) {
					if(that.giftList[i].ischeck) {
						chooseGift.push(that.giftList[i])
					}
				}
				if(chooseGift.length != 0) {
					store.commit("stateNewPersonGift", chooseGift)
					wx.navigateTo({
						url: '../newPersonGift/main'
					})
				} else {
					wx.showToast({
						title: '请选择新人礼',
						icon: 'none',
						duration: 2000
					})
				}
			},
			// 获取新人礼
			getNewPersonGift() {
				let params = {}
				let that = this
				params.memberId = store.state.userInfo.memberId
				Api.getNewPersonGift(params).then(function(res) {
					for(var i in res.giftPackage) {
						res.giftPackage[i].ischeck = false
					}
					that.giftList = res.giftPackage
				})
			},
			isChoose(index) {
				let that = this
				that.giftList[index].ischeck = !that.giftList[index].ischeck
			},

		},
		mounted() {
			let that = this
			that.getNewPersonGift()
		}
	}
</script>

<style scoped lang="less">
	.index-gift {
		background-color: #6E1B22;
		position: absolute;
		width: 100%;
		height: 100%;
		.top {
			width: 291px;
			height: 68px;
			position: relative;
			margin: 20px auto 54px auto;
			img {
				width: 100%;
				height: 100%;
			}
			.tit {
				position: absolute;
				top: 20px;
				left: 60px;
				font-size: 18px;
				color: #ffffff;
				font-weight: bold;
			}
		}
		.cant {
			.cant-list {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-right: 18px;
				height: 103px;
				width: 309px;
				position: relative;
				box-sizing: border-box;
				background: linear-gradient(to right,#de434f,#982831);
				margin:0 auto 28px auto;
				border-radius: 12px;
				.left {
							display: flex;
					.img{
						width: 102px;
						height: 114px;
						position: absolute;
						bottom: 0;
						left: 0;
						z-index: 9;
						border-radius: 6px;
						overflow: hidden;
						img{width: 100%;height: 100%;}
					}
					.tit{
						width: 117px;
						margin-left: 120px;
						color: #FFFFFF;
						font-size: 15px;
						line-height: 22px;
					}
				}
				.right {
					
				}
			}
		}
		.btn {
			width: 252px;
			height: 44px;
			margin: 40px auto 0 auto;
			background-color: #f9b81a;
			border-radius: 22px;
			line-height: 44px;
			text-align: center;
			color: #FFFFFF;
			font-size: 15px;
		}
	}
</style>