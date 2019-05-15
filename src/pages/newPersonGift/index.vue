<template>
	<div>
		<div class="cart">
			<!--点击新增地址-->
			<div class="AddressWarp">
				<div class="AddressBtn" v-if="AddressBtn" @click="toAddressAdd">
					+请填写收货地址
				</div>
				<div class="Address" v-else @click="toAddress">
					<div class="Address-item">
						<div class="itemLeft">收货人</div>
						<div class="itemRight"><text>{{addr.name}}</text><text>{{addr.mobile}}</text></div>
					</div>
					<div class="Address-item">
						<div class="itemLeft">收货地址</div>
						<div class="itemRight">{{addr.address}}</div>
					</div>
				</div>
			</div>
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
			<!--买家留言-->
			<div class="leave">
				<span>买家留言:</span>
				<span><input type="text" placeholder="点击留言" v-model="InputMask" /></span>
			</div>
			<div class="leave">
				<span>运费:</span>
				<span>￥{{freight}}</span>
			</div>
			<!--支付方式-->
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
                googitem:[]
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
   				// params.payAmount=Math.round(that.order.needPayMoney * 100)
   				params.payAmount=1
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
	.AddressWarp{
		.AddressBtn {
			width: 100%;
			height:60px;
			color: #858585;
			font-size: 12px;
			background-color: #e0e0e0;
			line-height: 60px;
			text-align: center;
		}
		.Address{padding: 10rpx 25rpx;border-bottom: 1px solid rgb(244,244,244);
			.Address-item{display: flex;align-items: center;font-weight: 100;font-size: 32rpx;height: 50px;}
			.itemLeft{width: 30%;}
			.itemRight{width: 70%;display: flex;align-items: center;justify-content: space-between;color: #8e8e8e;}
		}
	}
	.product-list-li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #f6f6f6;
		padding: 0 20px 9px 15px;
		.product-canter {
			margin-top: 9px;
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
			    flex-grow: 1;
				font-size: 11px;
				padding-left:10px; 
				box-sizing: border-box;
				.tit {
					color: #333333;
					line-height: 18px;
					margin-top: 10px;
					width:240px;
					height: 36px;
					margin-bottom: 10px;
				}
				.price {
					span {
						color: #a82429;
						font-size: 16px;
					}
				}
			}
		}
	}
	.cart-bottom {
		padding-left: 17px;
		box-sizing: border-box;
		.leave {
			border-bottom: 1px solid #f6f6f6;
			display: flex;
			align-items: center;
			width: 100%;
			height: 35px;
			span {
				display: block;
				&:nth-child(1) {
					font-size: 14px;
					color: #000000;
				}
				&:nth-child(2) {
					flex-grow: 1;
					font-size: 12px;
					margin-left: 16px;
				}
			}
		}
	}
	/*结算*/
	.footerBnt{position: fixed;bottom: 0;width: 100%;height: 95rpx;display: flex;justify-content: center;font-size: 36rpx;font-weight: 100;color: #8e8e8e;
		.cartBtn{height: 95rpx;font-size: 16px;flex-grow: 1;line-height: 95rpx;text-align: right;padding-right: 5px;}
		.btn{background: #901414;height: 95rpx;line-height: 95rpx; width: 180rpx;text-align: center;color: #fff;}
	}

</style>