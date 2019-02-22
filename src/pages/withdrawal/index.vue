<template>
	<div class="withdraw">
		<div v-for="(item,index) in withdeawList" class="flowbill-list-li" >
			<div class="top">
				<div class="name">
					<span>提现- {{item.stauname}}</span>
					<span>{{item.time}}</span>
				</div>
				<div class="num">-{{item.withdraw}}</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data(){
			return{
				withdeawList:[
					{withdraw:22,time:'2018-09-2 18:30',stauname:"成功"},
					{withdraw:22,time:'2018-09-2 18:30',stauname:"成功"},
					{withdraw:22,time:'2018-09-2 18:30',stauname:"成功"}
				]
			}
		},
		mounted(){

		},
		methods:{

		}
	}
</script>
<style scoped lang="less">
.flowbill-list-li{
	.top{
		display: flex;
		justify-content: space-between;
		height: 50px;
		border-bottom: 1px solid #ddd;
		padding: 0 15px;
		.name{
			flex-grow: 1;
			margin-top: 4px;
			span {
				max-width: 200px;
				display: block;
				font-size: 14px;
				color: #111111;
				height: 20px;
				line-height:20px;
				&:nth-child(2) {
					font-size: 12px;
					color: #999999;
				}
			}
		}
		.num{
			font-size: 14px;
			font-family: "roboto";
			line-height: 50px;				
		}

	}
}
</style>