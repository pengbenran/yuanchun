<template>
	<div class="vip">
		<div class="img">
			<img src="/static/images/vip.png" />
		</div>
		<div class="btn" @click="btn">
			<img src="/static/images/vipbtn.png" />
			<span>立即下单</span>
			<span>¥399</span>
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
			width: 100%;
			height: 222px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.btn {
			width: 315px;
			height: 60px;
			position: fixed;
			bottom: 57px;
			left: 50%;
			margin-left: -157px;
			img {
				width: 100%;
				height: 100%;
				position: absolute;
			}
			span {
				display: inline-block;
				text-align: center;
				color: #FFFFFF;
				line-height: 60px;
				&:nth-child(2) {
					width: 195px;
					height: 60px;
					position: absolute;
					top: 0;
					left: 0;
					font-size: 22px;
				}
				&:nth-child(3) {
					width: 120px;
					height: 60px;
					position: absolute;
					top: 0;
					right: 0;
					font-size: 14px;
				}
			}
		}
	}
</style>