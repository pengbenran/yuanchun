<template>
		<div class="cart">	
			<div class="ShopHeader"><text>购物车</text><text @click="Edits">{{EditsName}}</text></div>
			<cartList :cartLists="cartLists" ref="childs" @onSelect='SeleAllPrice'></cartList>	
		    <!--结算-->
		    <div class="footerBnt">
		    	<div class="footerBnt-left"  @click="AllSelect(SelectBool)">
		    		<icon type="success" class="ico" size="21" v-show="SelectBool"/>
		    		<icon type="circle" class="ico" size="21" v-show="!SelectBool"/> 全选
		    	</div>	
	    		<div class="cartBtn">
	    			<div class="price" v-if='!BtnDelete'>
	    				<div style="line-height: 95rpx">合计：</div>
	    				<div>
	    					<p>{{priceTotal}}元</p>
	    					<p>{{specsTotal}}元+{{deductionTotal}}平台劵</p>
	    				</div>
	    			</div>
	    			<div class="MaskInfo" v-else>注：请选择删除</div>
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
				SelectBool:false,
				cartLists: [],
				userInfo:{},
				EditsName:'编辑',
				BtnDelete:false,
				priceTotal:0,
				specsTotal:0,
				deductionTotal:0,
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
					wx.stopPullDownRefresh()
				}) 
				
			},
			//选中时子组件触发父组件
			SeleAllPrice(priceTotal,specsTotal,deductionTotal){
				let that=this
				that.priceTotal=priceTotal
				that.specsTotal=specsTotal
				that.deductionTotal=deductionTotal
			},
		    //全部选中
			AllSelect(bool){
				let that = this;
				that.SelectBool = !that.SelectBool
				that.cartLists.map(v =>{
					v.selected = v.marketEnable==1 ?  that.SelectBool:false;
					return v
				})
				that.$refs.childs.getTotalPrice();
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
		   	let params={}
		   	let cartArry=[]
		   	let cart = {}
		   	that.cartLists.map(v => {
		   		if(v.selected){
		   			cartArry.push(v.cartId) 
		   		}
		   	})
		   	if(cartArry.length!=0){
		   		params.carts=cartArry.join(',')
		   		let res = await Api.CartOrderDele(params)
		   		if(res.code == 0){
		   			wx.showToast({
		   				title: "删除成功",
		   				icon:'none',
		   				durantion: 2000
		   			})
		   			that.BtnDelete = false
		   			that.priceTotal=0
		   			that.specsTotal=0
		   			that.deductionTotal=0
		   			that.getCartList();
		   		}
		   	}
		   	else{
		   		wx.showToast({
        			title: "请选择要删除的订单",
        			icon:'none',
        			durantion: 2000
        		})
		   	}
		   	
		   },
		   //跳转结算
		   next(){
		   	let that = this
		   	var googitem = [];
		   	var Goods = {};
		   	let fenrunAmount=0;
		   	let twoAmount=0
        	that.cartLists.map(v =>{
        		if(v.selected){
        			v.cart = 1;
        			googitem.push(v) 
        			fenrunAmount += v.fenrunAmount*v.num; 
        			twoAmount+=v.twoAmount*v.num   
        		}
           	})
        	Goods.googitem = googitem
        	// 1度合伙人分润
        	Goods.fenrunAmount = fenrunAmount
        	// 2度合伙人分润
        	Goods.twoAmount = twoAmount
        	Goods.priceTotal=that.priceTotal
        	Goods.specsTotal=that.specsTotal
        	Goods.deductionTotal=that.deductionTotal
	        var gooditemString = JSON.stringify(Goods)
        	if (googitem.length ==0) {
        		wx.showToast({
        			title: "请选择订单",
        			icon: "success",
        			durantion: 2000
        		})
        	}else {
        		store.commit("stateGoodItem",gooditemString)
        		wx.navigateTo({
        			url: "../cart-order/main?cart=1&orderType=1",
        			success: function (res) {
        				that.SelectBool=false;   
        			},
        		})
        	}
    }
	},
	onShow(){
		let that=this
		that.userInfo=store.state.userInfo
		that.priceTotal=0
		that.specsTotal=0
		that.deductionTotal=0
		that.getCartList()
	},
	onPullDownRefresh: function(){
		let that=this
		that.getCartList()
	},
	}
</script>

<style lang="less">
	/*checkbox 选项框大小  */
	.ShopHeader{display: flex;align-items: center;justify-content: space-between;padding: 10rpx 30rpx;border-bottom: 1px solid #f4f4f4;
		text{color: #801d20;font-weight: 100;font-size: 34rpx;}
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
		.cartBtn{display: flex;justify-content: center;font-size: 36rpx;font-weight: 100;color: #8e8e8e;
			.MaskInfo{
				line-height:95rpx;
			}
		}
		.price{height: 95rpx;margin-right: 15rpx;display: flex;justify-content: space-around;font-size: 16px;}
		.btn{background: linear-gradient(to right, #d2313f, #77222a);height: 95rpx;line-height: 95rpx; width: 180rpx;text-align: center;color: #fff;}
	}

</style>