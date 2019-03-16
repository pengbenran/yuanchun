<template>
	<div class="index-gift">
		<div class="top">
			<img src="/static/images/gift1.png" />
			<div class="tit">双重大礼 赶紧领取</div>
		</div>
		<div class="cant">		
			<div class="inp" v-for="(item,index) in giftList">
				<span><img src="/static/images/gift.png"/></span>
				<span><input type="checkbox" name="checkbox" :checked="item.ischeck" @click="isChoose(index)"/></span>
				<div class="tit fontHidden">{{item.repacketName}}</div>
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
				giftList:[]
			}
		},

		components: {

		},

		methods: {
			jump(){
				let chooseGift=[]
				let that=this
				for(var i in that.giftList){
					if(that.giftList[i].ischeck){
						chooseGift.push(that.giftList[i])
					}
				}
				if(chooseGift.length!=0){
					store.commit("stateNewPersonGift",chooseGift)
					wx.navigateTo({
						url: '../newPersonGift/main'
					})
				}
				else{
					wx.showToast({
						title: '请选择新人礼',
						icon: 'none',
						duration: 2000
					})
				}		
			},
			// 获取新人礼
			getNewPersonGift(){
				let params={}
				let that=this
				params.memberId=store.state.userInfo.memberId
				Api.getNewPersonGift(params).then(function(res){
					for(var i in res.giftPackage){
						res.giftPackage[i].ischeck=false
					}
					that.giftList=res.giftPackage
				})
			},
			isChoose(index){
				let that=this
				that.giftList[index].ischeck=!that.giftList[index].ischeck
			},

		},

		mounted() {
			let that=this
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
			height: 68px;position: relative;
			margin: 20px auto 54px auto;
			
			img {
				width: 100%;
				height: 100%;
			}
			.tit{
				position: absolute;
				top: 20px;
				left: 60px;
				font-size: 18px;
				color: #ffffff;
				font-weight: bold;
			}
		}
		.cant {
			.inp {
				position: relative;
				margin-bottom: 20px;
				.tit{
					position: absolute;
					top:0;
					left: 32%;
					line-height:25px;
					padding: 21px 0 0 0;
					box-sizing: border-box;
					font-size: 15px;
					color: #ffffff;
					width:170px;
				}		
				span {
					margin: 0 auto;
					display: block;
					&:nth-child(1) {
						width: 296px;
						height: 92px;
						img {
							width: 100%;
							height: 100%;
						}
					}
					&:nth-child(2) {
						position: absolute;
						top: 31%;
						right: 13%;
					}
				}
			}
		}
		.btn {
			width: 252px;
			height: 40px;
			margin: 40px auto 0 auto;
			background-color: #f9b81a;
			border-radius: 20px;
			line-height: 40px;
			text-align: center;
			color: #FFFFFF;
			font-size: 15px;
		}
	}
</style>