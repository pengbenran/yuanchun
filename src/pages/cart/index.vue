<template>
		<div class="cart">	
			<div class="ShopHeader"><text>购物车</text><text @click="Edits">{{EditsName}}</text></div>
			<cartList :cartLists="cartLists"></cartList>	
		    <!--结算-->
		    <div class="footerBnt">
		    	<div class="footerBnt-left">
		    		<input type="checkbox" name="" value="" />全选
		    	</div>	
	    		<div class="cartBtn">
	    			<div class="price" v-show='!BtnDelete'>合计：{{AllPrice}}元</div>
	    			<div class="price MaskInfo" v-show='BtnDelete'>注：请选择删除</div>
	    			<div class="btn" @click="next"  v-show='!BtnDelete'>结算</div>
	    			<div class="btn" @click="Delete" v-show='BtnDelete'>删除</div>
	    		</div>
	    	</div>
		</div>
	</div>
</template>
<script>
	import Api from "@/api/goods"
	import store from '@/store/store'
	import cartList from '@/components/cartList'
	export default {
		data() {
			return {
				total:500,
				cartLists: [],
				userInfo:{},
				EditsName:'编辑',
				BtnDelete:false,
			}
		},

		components: {
			cartList
		},

		methods: {
			getCartList(){
				let that = this;
				let params={}
				params.memberId=that.userInfo.memberId;
				Api.getCartList(params).then(function(res){
					if(res.code != 1){
						that.cartLists = res.cartList.map(v=>{
							v.selected = false
							return v
						})
						that.length =  that.cartLists.length
					}else{
						that.cartLists = [];
					}
				}) 
				
			},
			//编辑删除Edits
			Edits(){
				let that =this;
				that.BtnDelete = !that.BtnDelete
				if(that.BtnDelete){
					that.EditsName = '删除'
				}else{
					that.EditsName = '编辑'
				}
			},
		   //商品删除事件
		   async Delete(){
		   	let that = this
		   	let parms = {}
		   	let cartIdgood=[]
		   	let cart = {}
		   	that.ShopLists.map(v => {
		   		if(v.selected){
		   			cartIdgood.push(v.cartId) 
		   		}
		   	})
		   	parms.cartS = cartIdgood
		   	let res = await api.CartOrderDele(parms)
		   	console.log("删除事件",res)
		   	if(res.data.code == 0){
		   		that.AllPrice = 0.00;
		   		that.BtnDelete = !that.BtnDelete;
		   		that.onLoads();
		   	}
		   },
			//减
			jian: function(index) {
				let that = this;
				if(that.product[index].num > 1) {
					that.product[index].num--
				}
			},
			//加
			jia: function(index) {
				let that = this;
				if(that.product[index].num < 99) {
					that.product[index].num++
				}
			},
			//结算跳转
			jump:function(){
				wx.navigateTo({
					url:"../cart-order/main",
				})
		},
	},
	mounted(){
			let that=this
			that.userInfo=store.state.userInfo
			that.getCartList()
		}
	}
</script>

<style lang="less">
	/*checkbox 选项框大小  */
	.ShopHeader{display: flex;align-items: center;justify-content: space-between;padding: 10rpx 30rpx;border-bottom: 1px solid #f4f4f4;
		text{color: rgb(252,155,45);font-weight: 100;font-size: 34rpx;}
	}
	checkbox .wx-checkbox-input {
		width: 16px;
		height: 16px;
		border-radius: 50%;
	}
	/*checkbox选中后样式  */
	
	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background: #ff9966;
	}
	/*checkbox选中后图标样式  */
	
	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		color: #FFFFFF;
	}
	
	.cart{
		padding-bottom: 35px;
	}

	/*结算*/
	.footerBnt{display: flex;align-items: center;justify-content: space-between;position: fixed;bottom: 0;width: 100%;height: 95rpx;
		.footerBnt-left{
			height: 95rpx;
			padding-left: 5px;
			line-height:95rpx; 
			font-size: 16px;
		}
		.selectBtn{display: flex;align-items: center;padding-left: 15rpx;font-size: 36rpx;font-weight: 100;color: #8e8e8e;}
		.selectBtn icon{margin-right: 10rpx;}
		.cartBtn{display: flex;justify-content: center;font-size: 36rpx;font-weight: 100;color: #8e8e8e;}
		.price{height: 95rpx;line-height: 95rpx;margin-right: 15rpx;}
		.btn{background-image: -webkit-linear-gradient(0deg, rgb(255,191,3), rgb(252,148,53));height: 95rpx;line-height: 95rpx; width: 180rpx;text-align: center;color: #fff;}
	}

</style>