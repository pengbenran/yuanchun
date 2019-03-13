<template>
	<div class="total">
		<div class="sign1"><img src="/static/images/sign1.png"/>
			<div class="Num_div">
				<span>{{userInfo.mp}}</span>
				<div>签到次数</div>
			</div>
		</div>
		<div class="businessCard">
			<Calendar
			:months="months"
			:value="time"
			@next="next"
			@prev="prev"
			:events="events"
			lunar
			@select="select" ref="calendar" @selectMonth="selectMonth" @selectYear="selectYear"/>	
		</div>
		<div class="btn" @click="get_Time">立即签到</div> 
		<div class="btn" @click="get_Time">立即兑换</div> 
		<div class="tip">兑换规格:每签到5次即可免费兑换一盒面膜</div>  
	</div>
</template>
<script>
	import Calendar from 'mpvue-calendar'
	import store from '@/store/store'
	import API from '@/api/lib'
	import {ToastShow} from '@/utils/index'
	import 'mpvue-calendar/src/style.css'
	export default{
		data(){
			return{
				months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],     
				disabledarr: ['2018-6-27','2018-6-25'],     
				value: [2018,6,7],     
				begin:[2016,1,1],       
				end:[2020,1,1],       
				events: {},
				userInfo:{}
			}
		},
		computed: {
           time:function(){
			    let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				return [year,month,day]
		   }
		},
		components:{
			Calendar
		},
		methods:{
			//获取当前时间的年月日
			get_Time(){
			   wx.showLoading({title: '加载中'})
			   let that = this;
			   let time = that.time[0]+'-'+that.time[1]+'-'+that.time[2]
               let data = {
				   memberId:that.userInfo.memberId,
				   time:time
			   }
			   API.get_Click(data).then(res => {
				  if(res.code == 0){
					  console.log("打印签到后的信息")
					  that.userInfo.mp = res.point;
					  that.getSign();
					  ToastShow('成功','success')
				  }else{
					  ToastShow('今日已签到','loading')
				  }
			   }).catch(err => {
                      ToastShow('失败','loading')
			   })
			},

			getSign(){
				let that = this;
				let data = {
					memberId:that.userInfo.memberId
				}
				API.get_Sign(data).then(res => {
					if(res.code == 0){
						console.log(res,"所有信息")
						 that.events = res.signInfo
                        //  ToastShow('加载中','success')
					}
				}).catch(err => {
                      ToastShow('失败','loading')
			   })
			},


		
		},
		mounted(){
			let that = this;
			that.userInfo = store.state.userInfo
			console.log(that.userInfo,"用户信息	")
			that.getSign();
		}
	}
</script>
<style scoped lang="less">
  	.mpvue-calendar{
 		border-radius:20px!important;
 	}
 .total{
 	background-color: #6d1b22;
 	.sign1{
		 position: relative;
 		 width: 300px;
		 height: 161px;
		 margin: 12px auto 0;
		 img{width: 100%;height: 100%;}
		 .Num_div{
			 z-index: 2;
			 position: absolute;
			 width: 100%;
			 text-align: center;
			 top: 33px;
			 color: #fff;
		 }
		 .Num_div span{font-size: 20px;}
		 .Num_div div{font-size: 14px;}
 	}
 
 	.businessCard{
		width: 90%;
		overflow: hidden;
		margin: 0 auto;		
	}
 }
	.btn{
		width: 243px;
		height: 40px;
		background-color: #83212c;
		line-height: 40px;
		text-align: center;
		border-radius: 20px;
		color: #FFFFFF;
		font-size: 17px;
		margin:10px auto;
	}
	.tip{
		color: #fff;
		text-align:center;
		font-size: 14px;
		height: 30px;
		line-height: 30px;
	}
</style>