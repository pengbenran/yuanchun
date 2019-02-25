<template>
	<div class="partner">
		<div class="header">
			<div class="avator">
				<img src="/static/images/product-list.png">
			</div>
		</div>
		<div class="partnerTitle">
			我的合伙人
		</div>
		<div class="myTeam">
			<div class="myTeamTitle">
				一级成员
			</div>
			<div class="teamList">
				<div class="left">
					<span class="teamAvator">
						<img src="/static/images/product-list.png">
					</span>
					<span class="name">元淳</span>
				</div>
				<div class="right">
					2018-11-20 13:50
				</div>
			</div>
			<div class="teamList">
				<div class="left">
					<span class="teamAvator">
						<img src="/static/images/product-list.png">
					</span>
					<span class="name">元淳</span>
				</div>
				<div class="right">
					2018-11-20 13:50
				</div>
			</div>
			<div class="teamList">
				<div class="left">
					<span class="teamAvator">
						<img src="/static/images/product-list.png">
					</span>
					<span class="name">元淳</span>
				</div>
				<div class="right">
					2018-11-20 13:50
				</div>
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
img{
	width: 100%;
	height: 100%;
	display: block;
}
.header{
	height: 150px;
	background: #B1333F;
	width: 100%;
	padding-top:20px;
	box-sizing: border-box;
	box-shadow: 0 0 10px rgba(0,0,0,.5);
	.avator{
		width: 80px;
		height: 80px;
		border-radius: 50%;
		overflow: hidden;
		margin: 0  auto;
	}
}
.partnerTitle{
	text-align: center;
	height: 45px;
	line-height: 45px;
	color: #7A252C;
	box-shadow: 0 0 6px rgba(0,0,0,.4);
	width: 242px;
	margin: 0 auto;
	position: relative;
	top:-10px;
	background: #fff;
	border-radius: 5px;  
}
.myTeam{
	.myTeamTitle{
		height: 40px;
		line-height:40px;
		padding-left: 10px;
		font-size: 14px;
		color: #333333;		
	}
	.teamList{
		display: flex;
		justify-content: space-between;
		padding: 8px 10px;
		box-sizing:border-box;
		font-size: 16px;
		color:#323232;
		border-top: 1px solid #f4f4f4;
		&:nth-last-child(1){
			border-bottom:1px solid #f4f4f4;
		}
		.left{
			flex-grow: 1;
			.teamAvator{
				display: inline-block;
				width: 40px;
				height: 40px;
				overflow: hidden;
				border-radius: 50%;
				vertical-align: middle;
			}
			.name{
				display: inline-block;
				padding-left: 10px;
			}
		}
		.right{
			
		}
	}
}
</style>