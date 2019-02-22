<template>
	<div class="header">
		<div class="title">
			{{status}}
		</div>
		<div class="icon">
			<img :src="icon">
		</div>
	</div>
</template>

<script>
	
	export default {
		props: ['status','icon'],
		data() {
			return {

			}
		},
		created() {

		}
	}
</script>

<style lang="less">
	.header{
			height: 120px;
			width: 100%;
			display: flex;
			background: linear-gradient(to right,#A62732,#761C25);
			.title{
				width:45%;
				text-align: center;
				line-height: 120px;
				font-size: 24px;
				color: #fff;
			}
			.icon{
				width:55%;
				text-align:center;
				img{
					width:80px;
					height: 80px;
					margin: 20px auto;
				}
			}
		}
</style>