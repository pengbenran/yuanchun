<template>
	<div class="total">
	<div class="sign1"><img src="/static/images/sign1.png"/></div>
	<div class="businessCard">
		<Calendar
		:months="months"
		:value="value"
		@next="next"
		@prev="prev"
		:events="events"
		lunar
		@select="select" ref="calendar" @selectMonth="selectMonth" @selectYear="selectYear"/>
		<button @click="setToday">立即签到</button>   
	</div>
	</div>
</template>
<script>
	import Calendar from 'mpvue-calendar'
	import 'mpvue-calendar/src/style.css'
	export default{
		data(){
			return{
				months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],     
				disabledarr: ['2018-6-27','2018-6-25'],     
				value: [2018,6,7],     
				begin:[2016,1,1],       
				end:[2020,1,1],       
				events: {'2018-6-27':'今日备注', '2018-6-8':'已签到'}
			}
		},
		components:{
			Calendar
		},
		methods:{
		
		},
		mounted(){
		
		}
	}
</script>
<style scoped lang="less">
  	.mpvue-calendar{
 		border-radius:20px!important;
 	}
 .total{
 	position: absolute;
 	width: 100%;
 	height: 100%;
 	background-color: #6d1b22;
 	.sign1{
 		width: 300px;
 		height: 161px;
 		position: absolute;
 		top: 10px;
 		left: 50%;
 		margin-left: -150px;
 		z-index: 99;
 		img{width: 100%;height: 100%;}
 	}
 
 	.businessCard{
		width: 90%;
		position: absolute;
		top: 170px;
		left: 50%;
		margin-left:-45%;
		
	}
 }
	button{
		width: 243px;
		height: 40px;
		background-color: #83212c;
		line-height: 40px;
		text-align: center;
		border-radius: 20px;
		color: #FFFFFF;
		font-size: 17px;
	}
	
</style>