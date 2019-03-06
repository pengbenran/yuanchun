<template>
	<div class="confirm-referrer">
		<div class="referrer">
			<p>请确定邀请人</p>
			<p><img :src="img"/></p>
			<p>推荐码</p>
			<p>小老弟</p>
		</div> 
		<div class="btn">
			<div class="btn-ture">确认</div>
			<div class="btn-false">信息有误</div>
		</div>
		<div class="text"> 
		       邀请码是元淳为每一个会员用户提供的专 
                       属编码，普通用户需要有会员的推荐码可 
                       在首页购买会员，快去成为元淳的会员吧 
		</div>   
	</div>
</template>
<script>    
	export default {
		data() {
			return {
              img:'/static/images/product-list.png'
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

<style lang="less">
	.confirm-referrer{
		text-align: center;
		.referrer{
			margin-top: 50px;
			p{
				&:nth-child(1){
					font-size: 15px;
					color: #1c1c1c;
				}
				&:nth-child(2){
					width: 55px;
					height: 49px;
					overflow: hidden;
					margin:  14px auto 0 auto;
					img{width: 100%;height: 100%;border-radius: 50%;}
				}
				&:nth-child(3){
					font-size: 14px;
					color: #6E1B22;
					padding: 10px 0 4px 0;
				}
				&:nth-child(4){
					font-size: 15px;
					color: #000000;
				}
			}
		}
		.btn{
			padding-top: 28px;
			.btn-ture,.btn-false{
				width: 168px;
				height: 38px;
				border-radius: 19px;
				text-align: center;
				font-size: 15px;
				line-height: 38px;
				margin:  0 auto;
				border: 1px solid #6e1b22;
			}
			.btn-ture{
				color: #ffffff;
				background: #6e1b22;
			}
			.btn-false{
				color: #6e1b22;
				margin-top: 14px;
			}
		}
		.text{
			color: #7b7b7b;
			font-size: 15px;
			width: 100%;
			padding:  37px 46px;
			box-sizing: border-box;
			text-align: left;
		
		}
	}
</style>