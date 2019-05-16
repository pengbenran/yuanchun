<template>
	<div class="container">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
			<orderHeader :icon="icon" :status="status"/>
			<orderList :orderList="orderList" :icon='icon' :status="status"/>
		</blockquote>
	</div>
</template>
<script>
	import orderHeader from '@/components/orderHeader'
	import orderList from '@/components/orderList'
	import loading from '@/components/loading'
	import Api from '@/api/order'
	import store from '@/store/store'
	export default {
		data(){
			return{
				icon:'',
				status:'',
				orderStatus:'',
				orderList:{},
				userInfo:{},
				isLoading:false,
			}
		},
		mounted(){
			let that=this
			that.userInfo = store.state.userInfo
			that.orderStatus=that.$root.$mp.query.orderStatus*1
			switch(that.orderStatus){
				case 0:
					that.status="全部订单"
					that.getAllOrder(that.userInfo.memberId)
					break;
				case 1:
					that.status="待付款"
					that.getOrderList(0,0,0,that.userInfo.memberId)
					that.icon='https://shop.guqinet.com/html/images/yuanchun/4da8d2dad7bf76e6d257b7fc6596207.png'
				break;
				case 2:
					that.status="待发货"
					that.getOrderList('2,1',2,0,that.userInfo.memberId)
					that.icon='https://shop.guqinet.com/html/images/yuanchun/175306c861be6c53fd04f847c2ddc8f.png'
					break;
				case 3:
					that.status="已发货"
					that.getOrderList(3,2,1,that.userInfo.memberId)
					that.icon='https://shop.guqinet.com/html/images/yuanchun/d7ee5a9c92d9f7b09472934fca9af6e.png'
					break;
				default :
					that.status="已完成"
					that.getOrderList('3,4',2,2,that.userInfo.memberId)
					that.icon='https://shop.guqinet.com/html/images/yuanchun/ff2debcc98fe4da5f34aa2727c020c6.png'
			}		
		},
		components:{
			orderHeader,
			orderList,
			loading
		},
		methods:{
			getOrderList(status,payStatus,shipStatus,memberId){
				let params={}
				let that=this
				params.arrayStatus=status
				params.payStatus=payStatus
				params.shipStatus=shipStatus
				params.memberId=memberId
				Api.getOrderList(params).then(function(res){
					if(res.code==0){
						that.isLoading=true
						for(var i in res.orderList){
							res.orderList[i].itemsJson=JSON.parse(res.orderList[i].itemsJson)
							res.orderList[i].count=res.orderList[i].itemsJson.length
						}
						that.orderList=res.orderList
					}
				})
			},
			getAllOrder(memberId){
				let params={}
				let that=this
				params.memberId=memberId
				Api.getOrderList(params).then(function(res){
					if(res.code==0){
						that.isLoading=true
						for(var i in res.orderList){
							res.orderList[i].itemsJson=JSON.parse(res.orderList[i].itemsJson)
							res.orderList[i].count=res.orderList[i].itemsJson.length
						}
						that.orderList=res.orderList
					}
				})
			}
		},
		onUnload(){
			let that=this
			that.icon=''
			that.status=''
			that.orderStatus=''
			that.orderList={}
			that.userInfo={}
			that.isLoading=false
		},
	}
</script>
<style scoped lang="less">
	img{
		width:100%;
		height: 100%;
		display: block;
	}

</style>