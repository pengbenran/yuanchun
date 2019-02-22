<template>
	<div class="order">
		<orderHeader :icon="icon" :status="status"/>
		<orderList />
	</div>
</template>
<script>
	import orderHeader from '@/components/orderHeader'
	import orderList from '@/components/orderList'
	export default {
		data(){
			return{
				icon:'/static/images/4da8d2dad7bf76e6d257b7fc6596207.png',
				status:'待付款'
			}
		},
		mounted(){

		},
		components:{
			orderHeader,
			orderList
		},
		methods:{

		}
	}
</script>
<style scoped lang="less">
	img{
		width:100%;
		height: 100%;
		display: block;
	}
	.order{

	}
</style>