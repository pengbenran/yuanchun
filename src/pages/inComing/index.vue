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
				<div class="headerTitle">{{userInfo.uname}}</div>
			</div>
			<div class="partnerTitle">
				我的余额
			</div>
			<div class="myTeam">
				<div class="myTeamTitle">
					<span>
						余额明细	
					</span>
					<span>
						余额累计:{{total}}	
					</span>
					
				</div>
				<div class="teamList" v-for="(item,index) in inComingList" :key="item.payId" :index='index' @click="showMore(index)">
					<div class="teamListIntro">
						<div class="left">
							<span class="teamAvator">
								<img :src="item.wechat">
							</span>
							<span class="name">{{item.uname}}</span>
						</div>
						<div class="right">
							余额:+￥{{item.total}}
						</div>
					</div>
					<div class="teamListDetail" v-show="item.isSelct">
						<p>订单编号:{{item.sn}}</p>
						<p class="timer">
							<span>下单时间:{{item.payTime}}</span>
							<span>管理奖励:￥{{item.bonus}}</span>
						</p>
						<p class="money">
							<span class="consum">消费金额:￥{{item.orderAmount}}</span>
							<span class="returnCommission">商品奖励:￥{{item.payMoney}}</span>
						</p>
					</div>	
				</div>
			</div>
		</blockquote>
	</div>
</template>

<script>
	import Api from "@/api/member"
	import loading from '@/components/loading'
	import store from '@/store/store'
	import utils from '@/utils/index'
	export default {
		data() {
			return {
				isLoading:false,
				inComingList:[],
				hasMore:true,
				limit:10,
				pages:0,
				hasMore:true,
				userInfo:{},
				total:0
			}
		},

		components: {
			loading
		},

		methods: {
			showMore(index){
				let that=this
				that.inComingList.map(item=>{
					item.isSelct=false
				})
				that.inComingList[index].isSelct=true
			},
			// 获取分润列表
			shareDetails(){
			    let that=this
				if(that.hasMore){
					let params={}
					params.limit=that.limit
					params.offset=that.pages*that.limit
					params.memberId=that.userInfo.memberId
					Api.shareDetails(params).then(function(res){
						that.isLoading=true
						if(res.rows.length<that.limit){
							that.hasMore=false
						}
						res.rows.map(item=>{
							item.isSelct=false
							item.total=utils.accAdd(item.payMoney,item.bonus)
							item.joinTime=utils.formatTime(item.regtime)
						})
						that.total=res.total
						that.inComingList=that.inComingList.concat(res.rows)
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
		onReachBottom:function(){
			let that = this;
			that.pages+=1
			that.shareDetails()
		},
		mounted() {
			let that=this
			that.userInfo=store.state.userInfo
			that.shareDetails()
		},
		onUnload(){
			let that=this
			that.isLoading=false
			that.inComingList=[]
			that.hasMore=true
			that.limit=7
			that.pages=0
			that.hasMore=true
		},
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
	.avator{
		width: 80px;
		height: 80px;
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
		.teamListIntro{
			display: flex;
			justify-content: space-between;
			height: 50px;
			padding: 0 10px;
			box-sizing:border-box;
			line-height:50px;
			font-size: 16px;
			color:#323232;
			border-top: 1px solid #ddd;
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
		.teamListDetail{
			font-size: 16px;
			color:#323232;
			padding: 10px;
			box-sizing: border-box;
			p{
				height: 30px;
				line-height:30px;
			}
			.timer{
				display: flex;
				justify-content: space-between;
			}
			.money{
				display: flex;
				justify-content: space-between;
			}
		}
	}
}
</style>