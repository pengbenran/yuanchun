<template>
	<div class="privilege">
		<div class="privilegeheader">
			<div class="avator">
				<img :src="userInfo.face">
			</div>
			<div class="headerTitle">{{userInfo.name}}</div>
		</div>
		<div class="banlance">
			<p class="number">{{userInfo.advance}}</p>
			<p>余额(元)</p>
		</div>
		<div class="tip" v-if="showTip"><span>周四提现日,三个工作日内到账</span><span class="iconfont" @click="close">&#xe644;</span></div>
		<div class="withdrawal">
			<div class="withdrawal_case">
				<span class="inpt">
					<input type="number" v-model="inputVal" placeholder="输入提现金额">
				</span>
				<span class="all" @click="allBalance">提现规则</span>
				<span class="btn" @click="canApply">提现</span>
			</div>
		</div>
		<div class="menu">
			<div class="menuList" @click="jump('../inComing/main')" v-if="userInfo.default!=1">
				<img src="/static/images/menu1.png">
				余额
			</div>
			<div class="menuList" @click="jump('../orderList/main?orderStatus=0')">
				<img src="/static/images/menu2.png">
				订单
			</div>
			<div class="menuList" @click="jump('../withdrawal/main')">
				<img src="/static/images/menu3.png">
				提现记录
			</div>
			<div class="menuList" @click="jump('../team/main')" v-if="userInfo.default!=1">
				<img src="/static/images/menu4.png">
				我的合伙人
			</div>
		</div>
		<div class="mark" @click="jump('../recommendationCode/main')" v-if="userInfo.default!=1">
			<img src="/static/images/mingpian.png">我的推荐码
			<span class="iconfont">&#xe72b;</span>
		</div>
	</div>
</template>
<script>
	import store from '@/store/store'
	import Api from '@/api/member'
	import Lib from '@/utils/index'

	export default {
		data(){
			return{
				userInfo:{},
				inputVal:'',
				canSubmit:true,
				showTip:true
			}
		},
		mounted(){
			let that=this
			that.userInfo = store.state.userInfo
		},
		onUnload(){
			let that=this
			that.inputVal=''
		},
		methods:{
			allBalance(){
				let that=this
				that.showTip=true
			},
			jump(url){
				wx.navigateTo({
					url:url,
				})
			},
			close(){
				let that=this
				that.showTip=false
			},
			// 判断是否是提现日
			canApply(){
				var myDate = new Date(); 
				let that=this
				if(myDate.getDay()==4){
					that.isBindCard()
				}
				else{
					Lib.ToastShow('周四为提现日哦','none')
				}
			},
			isBindCard(){
				let that=this
				let params={}
				params.memberId=that.userInfo.memberId
				Api.isBind(params).then(function(res){
					if(res.code==1){
						wx.showModal({
							title: '提示',
							content: '您还未绑定银行卡,是否立即绑定',
							confirmText:'去绑定',
							success(res) {
								if (res.confirm) {
									wx.navigateTo({url: '../bindbankCard/main'});
								} else if (res.cancel) {
								}
							}
						})
					}
					else{
						that.balancePay()
					}
					
				})
			},
			balancePay(){
				let that = this;
				if(that.inputVal>that.userInfo.advance){
					Lib.ToastShow('余额不足','none')	
				}
				else if(that.inputVal==''){
					Lib.ToastShow('请输入提现金额','none')	
				}
				else if(that.inputVal == 0){
					Lib.ToastShow('输入不能为0','none')	
				}
				else{	
					if(that.canSubmit){
						that.canSubmit=false
						let data = {}
						data.memberId = that.userInfo.memberId
						data.amount = that.inputVal
						Api.userBalancePay(data).then(res => {
							that.canSubmit=true	
							if(res.code == 0){
								Lib.updateUserInfo()
								that.userInfo.advance -= that.inputVal
								that.inputVal=''
								Lib.ToastShow('提现成功','success')
							}else{
								Lib.ToastShow('提现失败','none')
							}
						}).catch(err => {
							Lib.ToastShow('网络错误','none')
						})		
					}	
					
				}
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
.privilegeheader{
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
	.withdrawal_case{
		border-radius: 5px;
		box-shadow: 0 3px 10px rgba(0, 0, 0, 0.322);
	}
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
			font-size: 15px;
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
.tip{
	font-size: 13px;
	color: #fff;
	height: 25px;
	line-height:25px;
	padding:0 10px;
	box-sizing: border-box; 
	background: #CC3844;
	width:90%;
	margin:0 auto;
	border-radius: 5px;
	display: flex;
	justify-content: space-between;
}
</style>