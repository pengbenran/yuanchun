<template>
	<div class="container">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
			<div class="header">
				<div class="avator">
					<img :src="userInfo.face">
				</div>
			</div>
			<div class="partnerTitle">
				我的团队
			</div>
			<div class="myTeam">
				<div class="myTeamTitle">
					<span>
						我的团队	
					</span>
					<span>
						团队总人数:{{total}}	
					</span>
				</div>
				<div class="noThing" v-if="total==0">
					<img src="https://shop.guqinet.com/html/images/shuiguo/address/kong.png">
				</div>
				<blockquote v-else>
					<div class="teamList" v-for="(item,index) in myTeam" :index="index" :key="item.unionid">
						<div class="teamAvator">		
							<img :src="item.face">				
						</div>
						<div class="name fontHidden1">{{item.name}}</div>
						<div class="right">
							<p>角色:<span style="color:#B1333F;font-size: 16px;">{{item.lvidname}}</span></p>
							<p>{{item.joinTime}}</p>
						</div>
					</div>
				</blockquote>		
			</div>
		</blockquote>
	</div>
</template>

<script>
	import Api from "@/api/member.js"
	import store from "@/store/store"
	import utils from "@/utils/index"
	import loading from '@/components/loading'
	export default {
		data() {
			return {
				userInfo:{},
				limit:7,
				pages:0,
				myTeam:[],
				hasMore:true,
				total:0,
				isLoading:false

			}
		},

		components: {
			loading
		},

		methods: {
			// 获取我的团队信息
			getAllSubordinate(){
				let that=this
				if(that.hasMore){
					that.isLoading=false
					let params={}
					params.limit=that.limit
					params.offset=that.pages*that.limit
					params.memberId=that.userInfo.memberId
					Api.allSubordinate(params).then(function(res){
						that.isLoading=true
						that.total=res.total
						if(res.rows.length<that.limit){
							that.hasMore=false
						}
						res.rows.map(item=>{
							item.joinTime=utils.formatTime(item.regtime)
						})
						that.myTeam=that.myTeam.concat(res.rows)
					})
				}else{
					wx.showToast({
						title:'没有更多数据了',
						icon:"none",
						duration:1500
					})
				}
				
			}
		},
		mounted() {
			let that=this
			that.userInfo=store.state.userInfo
			that.getAllSubordinate()
		},
		onReachBottom:function(){
			let that = this;
			that.pages+=1
			that.getAllSubordinate()
		},
		onUnload(){
			let that=this
			that.limit=7
			that.pages=0
			that.myTeam=[]
			that.hasMore=true
			that.total=0
			that.isLoading=false
		},

	}
</script>

<style lang="less" scoped>
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
		padding: 0 10px;
		font-size: 14px;
		color: #333333;	
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;	
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
		.teamAvator{
				width: 40px;
				height: 40px;
				overflow: hidden;
				border-radius: 50%;
				vertical-align: middle;
		}
		.name{
			padding-left: 10px;
			width:150px;
			height: 40px;
			line-height:40px;
		}	
		.right{
			font-size: 14px;
			p{
				line-height:20px;
			}
		}
	}
}
.noThing{
	width:150px;
	height: 150px;
	margin:40px auto;
}
</style>