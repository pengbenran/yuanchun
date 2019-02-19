<template>
	<div class="businessCard">
		<Calendar
		:months="months"
		:value="value"
		@next="next"
		@prev="prev"
		:events="events"
		lunar
		@select="select" ref="calendar" @selectMonth="selectMonth" @selectYear="selectYear"/>
		<button @click="setToday">返回今日</button>   

	</div>
</template>
<script>
	import Calendar from 'mpvue-calendar'
	import 'mpvue-calendar/src/style.css'
	export default{
		data(){
			return{
				months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],     
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
	
	
</style>