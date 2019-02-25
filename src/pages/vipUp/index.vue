<template>
	<div class="vip">
		<div class="img">
			<img src="/static/images/vipUp.png" />
		</div>
		<div class="btn" @click="btn">
			立即升级
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},

		components: {

		},

		methods: {
           btn:function(){
           	  console.log(1111)
           }
		},

		created() {

		}
	}
</script>

<style lang="less">
	.vip {
		width: 100%;
		.img {
			margin: 36px auto 0 auto;
			width: 315px;
			height: 168px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.btn {
			width: 344px;
			height: 52px;
			position: fixed;
			bottom: 12px;
			left: 50%;
			margin-left: -172px;	
			text-align: center;
			line-height: 52px;
			color: #ffffff;	
			font-size: 17px;
			background: linear-gradient(to right, #bb2935 , #6e1b22);
			border-radius: 5px;
		}
	}
</style>