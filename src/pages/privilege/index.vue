<template>
	<div class="privilege">
		<div class="header">
			<div class="avator">
				<img :src="userInfo.face">
			</div>
			<div class="headerTitle">{{userInfo.name}}</div>
		</div>
		<div class="banlance">
			<p class="number">{{userInfo.advance}}</p>
			<p>余额(元)</p>
		</div>
		<div class="withdrawal">
			<div>
				<span class="inpt">
					<input type="number" placeholder="输入提现金额">
				</span>
				<span class="all">全部提现</span>
				<span class="btn">提现</span>
			</div>
		</div>
		<div class="menu">
			<div class="menuList" @click="jump('../inComing/main')">
				<img src="/static/images/menu1.png">
				佣金
			</div>
			<div class="menuList" @click="jump('../orderList/main?orderStatus=0')">
				<img src="/static/images/menu2.png">
				订单
			</div>
			<div class="menuList" @click="jump('../withdrawal/main')">
				<img src="/static/images/menu3.png">
				提现记录
			</div>
			<div class="menuList" @click="jump('../Partner/main')">
				<img src="/static/images/menu4.png">
				我的合伙人
			</div>
		</div>
		<div class="mark" @click="jump('../recommendationCode/main')">
			<img src="/static/images/mingpian.png">我的推荐码
			<span class="iconfont">&#xe72b;</span>
		</div>
	</div>
</template>
<script>
	import store from '@/store/store'
	export default {
		data(){
			return{
				userInfo:{}
			}
		},
		mounted(){
			let that=this
			that.userInfo = store.state.userInfo
		},
		methods:{
			jump(url){
				wx.navigateTo({
					url:url,
				})
			}
		}
	}
</script>
<style scoped lang="less">
img{
	width: 100%;
	height: 100%;
	display: block;
}
.privilege{
	height: 100vh;
	background: #F7F7F7;
}
.header{
	height: 130px;
	background: #6C1B21;
	width: 100%;
	padding-top:20px;
	box-sizing: border-box;
	.avator{
		width: 60px;
		height: 60px;
		border-radius: 50%;
		overflow: hidden;
		margin: 0  auto;
	}
	.headerTitle{
		text-align: center;
		font-size: 16px;
		color:#fff;
		height: 30px;
		line-height:30px;
	}
}
.banlance{
	padding: 10px;
	color:#919191;
	font-size: 16px;
	background: #fff;
	margin-bottom: 5px;
	.number{
		color:#732D31;
	}
}
.withdrawal{
	padding:15px;
	box-sizing: border-box;
	background: #fff;
	div{
		background:linear-gradient(to right,#CC3844,#AC2A34);
		padding: 15px 0 15px 10px;
		font-size: 16px;
		box-sizing: border-box;
		display: flex;
		.inpt{
			display: inline-block;
			width: 150px;
			height: 40px;
			overflow: hidden;
			background: #fff;
			border-radius: 4px;
			vertical-align: middle;
			input{
				width: 100%;
				height: 100%;
				outline: none;
				border: 0;
				padding-left: 5px;

			}
		}
		.all{
			display: inline-block;
			height: 40px;
			line-height:40px;
			width: 100px;
			text-align: center;
			color:#fff;
		}
		.btn{
			flex-grow: 1;
			text-align: center;
			height: 30px;
			line-height:30px;
			color: #fff;
			border-radius: 15px 0 0 15px;
			background: #6C1B21;
			margin-top: 5px;
		}
	}
	
}
.menu{
	display: flex;
	flex-wrap: wrap;
	margin-top: 10px;
	background: #fff;
	padding: 15px 0;
	box-sizing: border-box;
	.menuList{
		width: 50%;
		text-align: center;
		padding: 10px;
		box-sizing: border-box;
		font-size:16px;	
		img{
			width: 30px;
			height: 30px;
			margin: 10px auto;
		}
	}
	div:nth-child(1),div:nth-child(2){
	   border-bottom: 1px solid #ddd;
	}
	div:nth-child(1),div:nth-child(3){
		border-right: 1px solid #ddd;
		
	}
}
.mark{
	height: 50px;
	background: #fff;
	line-height:50px;
	font-size: 16px;
	margin-top: 10px;
	padding-right: 15px;
	box-sizing: border-box;
	img{
		width: 20px;
		height: 20px;
		display: inline-block;
		vertical-align:middle;
		margin: 15px;
	}
	.iconfont{
		float: right;
	}
}
</style>