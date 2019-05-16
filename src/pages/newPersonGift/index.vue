<template>
	<div class="wrap">
		<div class="cart">		
			<div class="product-list-li" v-for="(item,index) in personGift">
				<!--内容-->
				<div class="product-canter">
					<div class="img">
						<img :src="item.voucherType" />
					</div>
					<div class="content">
						<div class="tit fontHidden">{{item.repacketName}}</div>
						<div class="price">
							<span>¥{{item.conditionAmount}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="cart-bottom">
			<div class="leave">
				<span>运费:</span>
				<span>￥{{freight}}</span>
			</div>
		</div>
			<!--点击新增地址-->
				<div class="AddressWarp">		
					<div class="tit">地址信息：</div>
					<div class="AddressBtn"  @click="toAddressAdd"  v-if="AddressBtn">
						+添加地址
					</div>
				<div class="Address" v-else>
						<div class="xg"  @click="toAddress">修改</div>						
						<div class="name">
							<span>{{addr.name}}</span>
							<span>{{addr.mobile}}</span>
						</div>
						<div class="address">
							<span>{{addr.addr}}</span>
							<span>{{addr.region}}</span>
						</div>							
					</div>
				</div>
		<div class="footerBnt">	
			<div class="cartBtn">
				合计：{{totalMoney}}元
			</div>
			<div class="btn" @click="toast">立即领取</div>
		</div>
	</div>
</template>

<script>
	import store from '@/store/store'
	import utils from '@/utils/index'
	import Api from "@/api/order"
	export default {
		data() {
			return {
				personGift:[],
				InputMask:'',
				addr:{},
				AddressBtn:false,
				canbuy:true,
				userInfo:{},
				personGiftIdArry:[],
                moneySum:0,
                freight:0,
                googitem:[],
                gifimg:[
				  {voucherType:"/static/images/menu1.png"},
				  {voucherType:"/static/images/menu1.png"}
				]
			}
		},
		components: {},
		computed:{
			totalMoney(){
				let that=this
				let totalMoney=0
				for(var i in that.personGift){
					totalMoney=utils.accAdd(totalMoney,that.personGift[i].conditionAmount)
				}
				totalMoney=utils.accAdd(totalMoney,that.freight)
				return totalMoney
			}
		},
		methods: {
			toast(){
				let that = this;
				if(that.AddressBtn){
					wx.showToast({ title: '请添加地址'})
				}else{	
					that.OrderUp();  				
				} 
			},
			// 新人两重礼使用
			OrderUp(){
				let that = this;
				let bean = {}
				let goodObj = {}
				let orderParms = {}
				if(that.canbuy){
					that.canbuy=false
					wx.showLoading({
						title: '请稍等',
					})
					bean.orderAmount = that.totalMoney
					bean.needPayMoney=that.totalMoney
					bean.memberId = that.userInfo.memberId
		      		// (是否使用平台券)
		      		bean.clickd = that.InputMask 
		      		bean.orderType = 3
		      		bean.shipAddr = that.addr.address
		      		bean.shipMobile = that.addr.mobile 
		      		bean.addressId=that.addr.zip
		      		bean.shipName= that.addr.name	      		
					bean.googitem=JSON.stringify(that.googitem)
		      		bean.itemsJson = JSON.stringify(that.personGift)	
		      		that.saveOrder(bean)
		      	}
		      },
		    //提交订单并支付
		    async saveOrder(bean){
		    	let that = this;
		    	let res = await Api.giftUser(bean)    	
		    	wx.hideLoading()
		    	if(res.code == 0){
		    		that.order = res.order
		    		that.wxPay()
		    	}	
		    },
		    wxPay(){
		    	let that = this;
		    	let params ={}
		    	params.orderId = that.order.orderId
		    	params.sn = that.order.sn
   				params.shippingAmount=0
   				params.payAmount=Math.round(that.order.needPayMoney * 100)
   				// params.payAmount=1
			    //请求支付
			    params.openId=that.userInfo.openId
			    Api.ConfirmPay(params).then(function(PayRes){
			    	if(PayRes.code==1){
			    		wx.showToast({ 
			    			title: '网络错误，请重试',
			    			icon:'none',
			    			duration: 2000
			    		})
			    		that.canbuy=true
			    		
			    	}else{
			    		wx.requestPayment({
			                timeStamp: PayRes.Map.timeStamp, //时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间,
			                nonceStr: PayRes.Map.nonceStr, //随机字符串，长度为32个字符以下,
			                package: PayRes.Map.package, //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*,
			                signType: PayRes.Map.signType, //签名算法，暂支持 MD5,
			                paySign: PayRes.Map.paySign, //签名,具体签名方案参见小程序支付接口文档,
			                success: res => {
			                	that.canbuy=true
			                	that.payReturen()   
			                },
			                fail: function (res) {
			                	that.canbuy=true
	              
	                        wx.showToast({ 
	                        	title: '支付失败',
	                        	icon:'none',
	                        	duration: 2000
	                        })
	                    },
	                });
			    	}

			    })
			},
			      payReturen(){
			      	let that=this
			      	let orderParams = {}
			      	orderParams.orderId = that.order.orderId
			      	orderParams.memberId = that.userInfo.memberId
			      	orderParams.paymoney = that.order.needPayMoney
			      	orderParams.redpacketId = that.personGiftIdArry.join(",")
			      	Api.giftUserPass(orderParams).then(function(res){
			      		if(res.code == 0){
			      			wx.showToast({ 
			      				title: '领取成功',
			      				icon:'success',
			      				duration: 2000
			      			})
			      			let giftbag=store.state.giftbag
			      			for(let i in that.personGiftIdArry){
			      				giftbag=giftbag.filter(item=>
			      					 item.repacketId!=that.personGiftIdArry[i]
			      				)
			      			}
							utils.updateUserInfo()
			      			store.commit("stateGiftbag",giftbag)
			      			wx.switchTab({ url: '/pages/index/main'});
    				 }
    				}) 
			      },
		    // 选择收货地址
		    toAddress(){
		    	let that=this
		    	wx.navigateTo({ url: '../address/main' });
		    },
		    // 跳转添加地址	
		    toAddressAdd(){
		    	wx.navigateTo({ url: '../addressDetail/main' });
		    }
		},
		mounted() {
			let that=this
	    	that.personGift =store.state.personGift			
			that.googitem=[]
			that.personGiftIdArry=[]
			for(var i in that.personGift){
				let googobj={}
				googobj.num=1
				googobj.pic=1
				googobj.image=that.personGift[i].voucherType				
				googobj.name=that.personGift[i].repacketName
				googobj.price=that.personGift[i].conditionAmount
				that.googitem.push(googobj)
				if(that.personGift[i].repacketId==1){
					that.freight=wx.getStorageSync('postage')	
				}
				that.personGiftIdArry.push(that.personGift[i].repacketId)
			}
			that.userInfo=store.state.userInfo
		},
		onShow(){
			if(wx.getStorageSync('addr')!=''){
				this.addr=wx.getStorageSync('addr')
				this.AddressBtn=false
			}
			else{
				this.AddressBtn=true
			}
		},
		onUnload(){
			let that=this
			that.personGift=[]
			that.InputMask=''
			that.addr={}
			that.AddressBtn=false
			that.canbuy=true
			that.userInfo={}
			that.personGiftIdArry=[]
			that.googitem=[]
			that.moneySum=0
			that.freight=0
			console.log(2222222);
		},
	}
</script>

<style lang="less">
   .wrap{
   	background: #F4F4F4;position: absolute;width: 100%;height: 100%;
   	padding: 0 12px;
   	box-sizing: border-box;
   	overflow: hidden;
   }
	.AddressWarp {
		width: 100%;
		height: 140px;
		border-radius: 8px;
		background: #FFFFFF;	
		position: relative;
		line-height: 1;	 		
		margin-top: 12px;
		.tit{
			font-size: 16px;
			color: #666666;
			padding: 12px;
		}
		.xg{
			width: 44px;
			height: 22px;
			border-radius: 4px;
		    text-align: center;
		    line-height: 22px;
		    color: #666666;
		    font-size: 13px;
		    position: absolute;
		    top: 12px;
		    right: 12px;
		    border: 1px solid #DEDEDE;
		}
		.AddressBtn {
            margin: 16px auto;
            font-size: 14px;
            color: #333333;
            text-align: center;
            width: 160px;
            height: 37px;
            border-radius: 12px;
            border: 1px solid #dedede;
            line-height: 37px;
		}
		.Address {
			padding-left: 12px;
			box-sizing: border-box;
             .name{
             	padding-bottom: 10px;
             	span{
             		display: inline-block;
             		font-size: 14px;
             		color: #333333;
             		&:nth-child(2){
             			margin-left: 17px;
             		}
             	}
             }
             .address{
             	span{display: block;}
             	width: 258px;
             	line-height: 22px;
             	font-size: 14px;
             	color: #333333;
             }
		}
	}
	.product-list-li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #f6f6f6;
		background: #FFFFFF;
		padding: 12px;
		box-sizing: border-box;
		margin-top: 12px;
		width: 100%;
		height: 144px;
		border-radius: 12px;
		.product-canter {
			display: flex;
			justify-content: space-between;
			.img {
				width: 120px;
				height: 120px;
				img {
					width: 100%;
					height: 100%;
				}
			} 
			.content {
			    flex-grow: 1;
				padding-left:12px; 
				box-sizing: border-box;
				.tit {
					color: #333333;
					line-height: 18px;
					margin-top: 10px;
					width: 200px;
					height: 44px;
					font-size: 17px;
					line-height: 22px;
					font-weight: bold;
					margin-top: 12px;
				}
				.price {
					margin-top: 22px;
					span {
						color: #a82429;
						font-size: 16px;
					}
				}
			}
		}
	}
	.cart-bottom {
		background: #FFFFFF;
		border-radius: 12px;
		margin-top: 12px;					
		.leave {
			display: flex;
			align-items: center;
			width: 100%;
			height: 44px;
			padding-left: 12px;
			box-sizing: border-box;
			span {
				display: block;
				&:nth-child(1) {
					font-size: 16px;
					color: #666666;
					font-weight: bold;
				}
				&:nth-child(2) {
					flex-grow: 1;
					font-size: 14px;
					margin-left: 16px;
					color: #666666;
				}
			}
		}
	}
	/*结算*/
		.footerBnt {
        width: 100%;
        height: 44px;
        padding: 0 12px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        position: fixed;
        bottom: 12px;
        z-index: 90;
        line-height: 44px;
        left: 0;
		.cartBtn {
          width: 220px;
          height: 100%;
          background: #333333;
          border-top-left-radius: 22px;
          border-bottom-left-radius: 22px;
          text-align: center;
          color: #ffffff;
          font-size: 16px;
		}
		.btn {
          width: 1;
          height: 100%;
          flex-grow: 1;
          background: #f73243;
          border-top-right-radius: 22px;
          border-bottom-right-radius: 22px;
          text-align: center;
           color: #ffffff;
          font-size: 16px;
          font-weight: bold;
		}
	}

</style>