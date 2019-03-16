<template>
	<div>
		
	</div>
</template>
<script>
	import Api from "@/api/order"
	export default{
		data(){
			return{
				
			}
		},
		components:{
			
		},
		methods:{
		getLogistics(){
			let params={}
			params.orderId=299
			Api.getLogistics(params).then(function(res){
				console.log(res)
			})
		}
			
	
		},
		mounted(){
			let that=this
			that.getLogistics()
		}
	}
</script>
<style scoped lang="less">

</style>