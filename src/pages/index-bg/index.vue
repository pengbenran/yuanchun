<template>
	<div>
		<div class="img-bg">
			<div class="img"><img :src="imageUrl" /></div>
			<div class="tit">
				<span>{{num}}</span>
				<span>s</span>
			</div>
		</div>
		
	</div>
</template>
<script>
	import Api from "@/api/home";
	export default {
		data() {
			return {
				num:3,
				imageUrl:'',
			}
		},
		onLoad() {
			let that = this
			that.sendCode()
			that.getIndexBaner()
		},
		methods: {
			sendCode() {
				var that = this;
				var times = 3
				var i = setInterval(function() {
					times--
					that.num = times
					if(times == 0) {
						wx.switchTab({
							url: '../index/main'
						});
						clearInterval(i)
					}
				}, 1000)
			},
			getIndexBaner() {
				let that = this
				Api.getIndexBaner().then(function(res) {
					that.imageUrl = res.indexScreen.imageUrl
				})
			}

		},
	}
</script>

<style lang="less">
	.img-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 99;
		.img {
			width: 100%;
			height: 100%;
			img{width: 100%;height: 100%;}
		}
		.tit{
			position: absolute;
			top: 12px;
			right: 12px;			
			span{
				&:nth-child(1){
					color: #FFFFFF;
					font-size: 15px;
					margin: 2px;
				}
				&:nth-child(2){
					color: #FFFFFF;
					font-size: 12px;
				}
			}
		}
	}
</style>