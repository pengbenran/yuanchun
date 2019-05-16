<template>
	<div class="index-coupon">
		<!--数据-->
		<div class="index-coupon-list">
			<div class="index-coupon-list-li" v-for="(item,index) in memberTiket" @click="submit(item)">
				<div class="cant">
					<p>抢购{{item.giveMoney}}平台劵</p>
					<p>
						<span>{{item.money}}</span>
						<span>元</span>
						<span class="xian"></span>
					</p>
				</div>
				<div class="btn">
					立即购买
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import API from '@/api/home'
import {ToastShow} from '@/utils/index'
import store from '@/store/store'
import PayApi from '@/api/order'
import Utils from '@/utils/index'
	export default {
		data() {
			return {
				memberTiket:[],
				userInfo:{},
				submitBool:true
			}
		},

		components: {

		},

		methods: {
			tabs: function(index) {
				let that = this;
				that.curr = index
			},

			/**
			 * 提交
			 */
			submit(item){
				if(this.submitBool){
					this.submitBool = false;
                    this.wxPay(item)
				}
			},

			/**
			 * 支付
			 * 微信支付方法封装
			 */
			wxPay(item){ 
				let that = this;
				let params ={}
				params.sn = Utils.random_No(10)
				params.payAmount = Math.round(item.money * 100)
				// params.payAmount=1
				params.shippingAmount=0
				//请求支付
				params.openId=that.userInfo.openId
				PayApi.ConfirmPay(params).then(function(PayRes){
					if(PayRes.code==1){
						that.submitBool = true;
						wx.showToast({ 
			        			title:'网络错误',
			        			icon:'none',
			        			duration: 2000
			        	})
					}
					else{
						wx.requestPayment({
							timeStamp: PayRes.Map.timeStamp, //时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间,
							nonceStr: PayRes.Map.nonceStr, //随机字符串，长度为32个字符以下,
							package: PayRes.Map.package, //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*,
							signType: PayRes.Map.signType, //签名算法，暂支持 MD5,
							paySign: PayRes.Map.paySign, //签名,具体签名方案参见小程序支付接口文档,
							success: res => {
								that.ticketTopUp(item)
								that.submitBool = true;
							},
							fail: function (res) {
								that.submitBool = true;
							// fail   
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

			/**
			 * 生成平台卷订单
			 */
            ticketTopUp(item){
				let that = this;
				wx.showLoading({title: '加载中'})
				let data = Object.assign({},item,{memberId:that.userInfo.memberId})
				API.ticketTopUp(data).then(res => {
					if(res.code == 0){
						wx.showToast({ 
							title: '充值成功',
							icon:'none',
							duration: 2000
						})
						Utils.updateUserInfo()
						wx.switchTab({
						   url: '../myself/main'
						})
					}else{
						ToastShow('失败','none')
					}
					that.submitBool = true;
				}).catch(err => {
					ToastShow('失败','none')
				})
			},

			/**
			 * 平台卷请求方法
			 */
			getTicket(){
				let that = this;
				API.getTicket().then(res => {
				   if(res.code == 0){
					 that.memberTiket = res.memberTiket
					 wx.hideLoading()
				   }else{
					   ToastShow('失败','none')
				   }
				}).catch(err => {
					ToastShow('失败','none')
				})
			},
		},
		mounted() {

			 /**
			  * 加载平台卷
			  */
			 this.getTicket();
			 this.userInfo=store.state.userInfo
		},
	}
</script>

<style scoped lang="less">
	.index-coupon {
		width: 100%;
		height: 100%;
		background-color: #f2f3f7;
		position: absolute;
		/*切换*/
		.tab {
			width: 100%;
			justify-content: space-between;
			display: flex;
			span {
				width: 50%;
				height: 39px;
				line-height: 39px;
				display: block;
				text-align: center;
				font-size: 14px;
				color: #666666;
			}
			.on {
				border-bottom: 1px solid #6e1b22;
				color: #6e1b22;
			}
		}
		/*数据*/
		.index-coupon-list {
			width: 100%;
			padding: 0 12px 100px 12px;
			box-sizing: border-box;
			.index-coupon-list-li {
				display: flex;
				justify-content: space-around;
				align-items: center;
				width: 100%;
				height: 116px;
				background: linear-gradient(#a92732, #701c23);
				border-radius: 5px;
				margin-top: 12px;
				.cant {
					p {
					
						&:nth-child(1) {
							font-size: 13px;
							color: #ffeeee;
						}
						&:nth-child(2) {
								position: relative;
							span {
								&:nth-child(1) {
									font-size: 30px;
									color: #FFEEEE;
								}
								&:nth-child(2) {
									font-size: 15px;
									color: #ffeeee;
								}
							}
							.xian{
								display: block;
								position: absolute;
								right: -42px;
								top: 0;
								width: 1px;
								background-color: #ffd0d0;
								height: 34px;
								z-index: 99;
							}
						}
					}
				}
				.btn{
					width: 90px;
					height: 33px;					
					border-radius: 16.5px;
					border: 1px solid #ebebeb;
					line-height: 33px;
					text-align: center;
					font-size: 14px;
					color: #ffffff;
				}
			}
		}
	}
</style>