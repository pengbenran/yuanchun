<template>
	<div>
	   <div class="sign">
	   	<div class="sign-top">
	   	 <img src="/static/images/sign1.png"/>
	   	</div>
	   	<div class="sign-bottom">
	   	   
	   	</div>
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

<style lang="less">
	.sign{
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 9;
		background: linear-gradient(#6e1b22, #ac3741); /* 标准的语法 */
		.sign-top{
			position: absolute;
			top: 0;
			z-index: 29;
		}
		.sign-bottom{
			width: 345px;
			height: 400px;
			background-color: #FFFFFF;
			position: absolute;
			top: 0;
			z-index: 19;
		}
	}
	
</style>