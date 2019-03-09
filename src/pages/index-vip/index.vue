<template>
	<div class="vip">
		<div class="btn" @click="bth">点击弹窗</div>
		<div class="more" v-show="is">
			<div class="tit">余经理</div>
			<div></div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				is: false,

			}
		},

		components: {

		},

		methods: {
			bth() {
				let that = this
				that.is = true
			}
		},

		created() {

		}
	}
</script>
 
<style lang="less">
	.vip {
		width: 100%;
		height: 1000px;
		background: red;
	}
	
	.btn {
		text-align: center;
	}
	
	.more {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 80%;
		background: #FF9966;
		z-index: 99;
		.tit {
			text-align: center;
			width: 100%;
			height: 40px;
			line-height: 40px;
			font-size: 15px;
			color: #FFFFFF;
			background: orange;
		}
	}
</style>