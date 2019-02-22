<template>
	
	
	<div class="index-gift">
		<div class="top">
			<img src="/static/images/gift1.png" />
			<div class="tit">双重大礼 赶紧领取</div>
		</div>

		<div class="cant">
			
			<div class="inp">
				<span><img src="/static/images/gift.png"/></span>
				<span><input type="checkbox" name="checkbox"/></span>
				<div class="tit">领面膜</div>
			</div>
			
				<div class="inp">
					<span><img src="/static/images/gift.png"/></span>
					<span><input type="checkbox" name="checkbox"/></span>
					<div class="tit"> 
						<p class="txt">领面膜</p>
						<p class="txt">3.99购100元平台券</p>
					</div>
				</div>
			
			
		</div>
		<div class="btn">
			立即领取
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

		},

		created() {

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
				&:nth-child(1) {
					.tit{
						position: absolute;top: 50%;left: 50%;
						font-size: 17px;
						color: #ffffff;
						margin-left: -15px;
						margin-top: -11px;
					}
				}
				&:nth-child(2) {
					margin-top: 30px;
					.tit{
						position: absolute;top: 50%;left: 50%;
						 margin-top: -20px;
						 margin-left: -40px;
						line-height: 20px;
						
						.txt{
							font-size: 12px;
							color: #FFFFFF;
          
						}
					}
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
						top: 50%;
						margin-top: -14px;
						right: 50px;
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