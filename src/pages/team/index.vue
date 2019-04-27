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
				我的合伙人
			</div>
			<div class="Tab">
				<div @click="kindChang(1)" :class="timeindex == 1? 'Select':''">一度合伙人</div>
				<div @click="kindChang(2)" :class="timeindex == 2? 'Select':''">二度合伙人</div>
			</div>
			<div class="myTeam">
				<div class="myTeamTitle">
					<span>
						我的合伙人
					</span>
					<span>
						总人数:{{count}}	
					</span>
				</div>
				<div class="noThing" v-if="count==0">
					<img src="https://shop.guqinet.com/html/images/shuiguo/address/kong.png">
				</div>
				<blockquote v-else>
					<div class="teamList" v-for="(item,index) in TeamList" :index="index" :key="item.unionid">
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
				limit:15,
				pages:[0,0],
				myTeam:[[],[]],
				TeamList:[],
				hasMore:[true,true],
				total:[0,0],
				count:0,
				isLoading:false,
				timeindex:1
			}
		},

		components: {
			loading
		},
		methods: {
			kindChang(index){
				let that=this
				that.timeindex=index
				if(that.myTeam[index-1].length==0){
					if(that.hasMore[index-1]){
						that.HighSubordinate()
					}
					else{
						that.TeamList=that.myTeam[index-1]
						that.count=that.total[index-1]
					}
				}else{
					that.TeamList=that.myTeam[index-1]
					that.count=that.total[index-1]
				}
				
			
			},
			// 获取我的合伙人信息
			HighSubordinate(){
				let that=this
				let index=that.timeindex-1
				console.log(that.hasMore[index])
				if(that.hasMore[index]){
					let params={}
					params.limit=that.limit
					params.offset=that.pages[index]*that.limit
					params.memberId=that.userInfo.memberId
					params.type=that.timeindex
					Api.HighSubordinate(params).then(function(res){
						that.isLoading=true
						if(res.rows.length<that.limit){
							that.hasMore[index]=false
						}
						res.rows.map(item=>{
							item.joinTime=utils.formatTime(item.regtime)
						})
						that.total[index]=res.total
						that.myTeam[index]=that.myTeam[index].concat(res.rows)
						that.TeamList=that.myTeam[index]
						that.count=that.total[index]
					})
				}else{
					wx.showToast({
						title:'没有更多数据了',
						icon:"none",
						duration:1500
					})
				}
			},
		},
		mounted() {
			let that=this
			that.userInfo=store.state.userInfo
			that.HighSubordinate()
		},
		onReachBottom:function(){
			let that = this;
			that.pages[that.timeindex-1]+=1
			that.HighSubordinate()
			
		},
		onUnload(){
			this.pages=[0,0]
			this.myTeam=[[],[]]
			this.TeamList=[]
			this.hasMore=[true,true]
			this.total=[0,0]
			this.count=0
			this.isLoading=false
			this.timeindex=1
		},

	}
</script>

<style lang="less" scoped>
img{
	width: 100%;
	height: 100%;
	display: block;
}
.Select{
	color:#B1333F;
	border-bottom: 2px solid #B1333F;
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
.Tab{
	display: flex;
	justify-content: space-around;
	height: 40px;
	line-height:40px;
	font-size: 16px;	
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