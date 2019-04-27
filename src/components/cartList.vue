<template>
	<div class="cart">
		<div class="product-list-li" v-for="(item,index) in cartLists" :key="item.cartId">
				<!--选择框-->
				<div class="product-left" @click="selectCheck(index)">
					 <icon type="success" class="ico" size="21" v-show='item.selected'/>
					 <icon type="circle" class="ico" size="21" v-show='!item.selected'/>
				</div>
				<!--内容-->
				<div class="product-canter">
					<div class="img">
						<img :src="item.image" />
					</div>
					<div class="content">
						<div class="goodtitle fontHidden1">{{item.name}}</div>
						<div class="describe fontHidden1">{{item.specvalue}}</div>
						<div class="price">
							<span>¥{{item.price}}</span>
						</div>
						<div class="price1" :style="{display:isflex}">
							<span>¥{{item.specs}}+</span>
							<div class="ptq">{{item.deduction}}平台劵</div>
						</div>
					</div>
				</div>
				<!--加减-->
				<div class="product-right">
					<span @click="Minu(index,item.cartId)">-</span>
					<span>{{item.num}}</span>
					<span @click="Plus(index,item.cartId)">+</span>
				</div>
			</div>
	</div>
</template>

<script>
	import Api from '@/api/goods'
	export default {
		props: ['cartLists'],
		data() {
			return {
			}
		},
		methods: {
            jump:function(goodsId){
             	wx.navigateTo({
             		url:'../product-detail/main?goodsId='+goodsId
             	})
            },
            //选中
            selectCheck(index){
            	let that = this;
            	that.cartLists[index].selected = !that.cartLists[index].selected	
            	that.getTotalPrice()
            },
            //计算多少钱
            getTotalPrice(){
            	let that = this;
            	let priceTotal = 0;
            	let specsTotal = 0;
            	let deductionTotal = 0;
            	if(that.cartLists != undefined){
            		let cartListsRes=that.cartLists.map(v =>{
            			if(v.selected){
            				priceTotal += v.price * v.num 
            				specsTotal+= v.specs * v.num
            				deductionTotal+=v.deduction * v.num
            			}
            		})   
            	}
            	that.$emit("onSelect",priceTotal,specsTotal,deductionTotal)  
            },
            //减
            async Minu(index,cartId){
            	let that = this;
            	if(that.cartLists[index].num >1){
            		let num = that.cartLists[index].num -1;
            		let res = await that.MinuPlusNum(index,cartId,num);
            		if(res.code == 0){
            			that.cartLists[index].num -=1;
            		}
            	}
            	else{
            		wx.showToast({
            			title:'数量最少为1',
            			icon:'none',
            			durantion:2000
            		})
            	}
            	if(that.cartLists[index].selected){
            		that.getTotalPrice()
            	}

            },
   			//加
   			async Plus(index,cartId){
   				let that = this;
   				if(that.cartLists[index].num !=0){
   					let num = that.cartLists[index].num +1;
   					let res = await that.MinuPlusNum(index,cartId,num);
   					if(res.code == 0){
   						that.cartLists[index].num +=1;
   					}
   				}
   				if(that.cartLists[index].selected){
   					that.getTotalPrice()
   				}

   			},
   			//数量修改
   			async MinuPlusNum(index,cartId,num){
   				let that = this;
   				let params={}
   				params.cartId = cartId
   				params.num = num
   				let res = await Api.CartOrderNum(params)
   				return res;
   			},
		},
		mounted(){

		}
	}
</script>

<style lang="less">
	.product-list-li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #f6f6f6;
		padding: 0 20px 20px 15px;
		box-sizing: border-box;
		.product-left{
			margin-right: 5px;
		}
		.product-canter {
	        flex-grow: 1;
			margin-top: 20px;
			display: flex;
			justify-content: space-between;
			.img {
				width: 80px;
				height: 80px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.content {
				width:160px;
				font-size: 11px;
				padding-left:10px; 
				box-sizing: border-box;
				.goodtitle {
					color: #333333;
					line-height: 18px;
					margin-top: 10px;
					width:160px;
				}
				.describe {
					color: #b5b5b5;
					font-size: 10px;
					width:160px;
					
				}
				.price {
					width:160px;
					span {
						color: #a82429;
						font-size: 16px;
					}
				}
				.price1 {
					color: #a82429;
					font-size: 16px;
					width:160px;
					.ptq {
						background-color: #801d20;
						height: 20px;
						text-align: center;
						border-radius: 5px;
						line-height: 20px;
						padding: 0 5px;
						color: #ffffff;
						font-size: 10px;
						display: inline-block;
						vertical-align: middle;
					}
				}
			}
		}
		.product-right{
			flex-grow: 1;
			span{
				&:nth-child(1){
					margin-right: 11px;
					font-size: 20px;
				}
				&:nth-child(2){
					background-color: #a72126;
					width: 18px;
					height: 18px;
					border-radius: 50%;
					display: inline-block;
					text-align: center;
					font-size: 13px;
					color: #FFFFFF;
					line-height: 18px;
					vertical-align: middle;
				}
				&:nth-child(3){
					margin-left: 11px;
					font-size: 20px;
				}
			}
		}
	}
</style>