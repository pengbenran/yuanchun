<template>
	<div class="container">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
			<div class="header">
				<div class="avator">
					<img :src="face">
				</div>
			</div>
			<div class="partnerTitle">
				<span class="iconfont">&#xe67a;</span>
				<input type="text" :placeholder="placeTitle" placeholder-style="color:#7A252C" v-model="searchName" @blur="seachParent" @focus="onFocus">
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
					<div class="teamList" v-for="(item,index) in myTeam" :index="index" :key="item.unionid" @click="getSubordinate(item.memberId,item.face)">
						<div class="teamAvator">		
							<img :src="item.face">				
						</div>
						<div class="name fontHidden1">{{item.name}}</div>
						<div class="right">
							<p>角色:
								<span :class="item.isCheked ? 'Select':''" >{{item.lvidname}}</span>
							</p>
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
				memberId:'',
				limit:15,
				pages:0,
				myTeam:[],
				hasMore:true,
				total:0,
				isLoading:false,
				searchName:'',
				seachMyTeam:[],
				placeTitle:'查找队友',
				face:''
			}
		},

		components: {
			loading
		},

		methods: {
			// 获取他的团队
			getSubordinate(memberId,face){
				let that=this
				that.pages=0
				that.myTeam=[]
				that.hasMore=true
				that.face=face
				that.searchName=''
				that.memberId=memberId
				that.placeTitle='查找队友'
				that.getAllSubordinate(memberId)
			},
			// 获取我的团队信息
			getAllSubordinate(memberId){
				let that=this
				if(that.hasMore){
					let params={}
					params.limit=that.limit
					params.offset=that.pages*that.limit
					// params.memberId=that.userInfo.memberId
					params.memberId=memberId
					params.name=that.searchName
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
				
			},
			seachParent(){
				let that=this
				that.limit=15
				that.pages=0
				that.myTeam=[]
				that.hasMore=true
				if(that.searchName==''){
					that.placeTitle='查找队友'
				}
				that.getAllSubordinate(that.memberId)
			},
			onFocus(){
				this.placeTitle=''
			}
		},
		mounted() {
			let that=this
			that.memberId=that.$root.$mp.query.memberId
			that.face=that.$root.$mp.query.face
			that.getAllSubordinate(that.memberId)
		},
		onReachBottom:function(){
			let that = this;
			that.pages+=1
			that.getAllSubordinate(that.memberId)
		},
		onUnload(){
			let that=this
			that.limit=15
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
	input{
		width: 100px;
		height: 45px;
		line-height: 45px;
		display: inline-block;
		vertical-align: middle;
		color:#7A252C;

	}
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
.Select{
	color:#B1333F;
	font-size: 16px;
}
</style>