<template>
	<div class="total">
		<div class="sign1"><img src="/static/images/sign1.png"/>
			<div class="Num_div">
				<span>{{userInfo.mp}}</span>
				<div>签到次数</div>
			</div>
		</div>
		<div class="businessCard">
			<Calendar
			:months="months"
			:value="time"
			@next="next"
			@prev="prev"
			:events="events"
			lunar
			@select="select" ref="calendar" @selectMonth="selectMonth" @selectYear="selectYear"/>	
		</div>
		<div class="btn" @click="get_Time">立即签到</div> 
		<div class="btn" @click="getAddres">立即兑换</div> 
		<div class="tip">兑换规格:每签到5次即可免费兑换一盒面膜</div>  
        
		<div class="modemask" v-if="modelBool"></div>
		<div class="model" v-if="modelBool">
			<div class="addarress">
				<div class="top">地址：{{memberAddressDO.region}}</div>
			    <div class="info">
					<div class="left">收件人：{{memberAddressDO.name}}</div>
					<div class="right">电话：{{memberAddressDO.mobile}}</div>
				</div>
			</div>
			<div class="shop">
				<div class="shopInfop">
					签到面膜
				</div>
				<div class="Num"><span @click="close"> - </span> {{countMp}}件 <span @click="add"> + </span></div>
			</div>
			<div class="price">
				<div class="list"><span>邮费：</span><span>￥{{postage*(countMp/oneBox)}}</span></div>
			    <div class="case"><span>盒数：</span><span>{{countMp/oneBox}} 件</span></div>
			</div>
			<div class="sumbitbnt" @click="submitBtn">确认兑换</div>
		</div>
	</div>
</template>
<script>
	import Calendar from 'mpvue-calendar'
	import store from '@/store/store'
	import API from '@/api/lib'
	import api_site from '@/api/site'
	import api_order from '@/api/order'
	import {ToastShow} from '@/utils/index'
	import 'mpvue-calendar/src/style.css'
	export default{
		data(){
			return{
				months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],     
				disabledarr: ['2018-6-27','2018-6-25'],     
				value: [2018,6,7],     
				begin:[2016,1,1],       
				end:[2020,1,1],       
				events: {},
				userInfo:{},
				modelBool:false,
				memberAddressDO:{},
				countMp:0,
				oneBox:0,
				postage:0
			}
		},
		computed: {
           time:function(){
			    let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				return [year,month,day]
		   },
		   
		},
		components:{
			Calendar
		},
		methods:{
			//获取当前时间的年月日
			get_Time(){
			   wx.showLoading({title: '加载中'})
			   let that = this;
			   let time = that.time[0]+'-'+that.time[1]+'-'+that.time[2]
               let data = {
				   memberId:that.userInfo.memberId,
				   time:time
			   }
			   API.get_Click(data).then(res => {
				  if(res.code == 0){
					  that.userInfo.mp = res.point;
					  that.getSign();
					  ToastShow('成功','success')
				  }else{
					  ToastShow('今日已签到','loading')
				  }
			   }).catch(err => {
                      ToastShow('失败','loading')
			   })
			},

			close(){
                if(this.countMp > 0){
					this.countMp -= this.oneBox
				} 
			},
			add(){
				this.countMp += this.oneBox
			},

			getSign(){
				let that = this;
				let data = {
					memberId:that.userInfo.memberId
				}
				API.get_Sign(data).then(res => {
					if(res.code == 0){
						 that.events = res.signInfo
                        //  ToastShow('加载中','success')
					}
				}).catch(err => {
                      ToastShow('失败','loading')
			   })
			},
			
			//拿到用户的默认地址
			getAddres(){
				let that = this;
				let data = {
					memberId:that.userInfo.memberId
				}
				api_site.defutaddress(data).then(res =>{
					if(res.code == 0){
					   that.memberAddressDO = res.memberAddressDO
                       that.modelBool = true;
					}else{
						wx.showModal({
							title: '提示',
							content: '你还没有默认地址是否去填写',
							success(res) {
								if (res.confirm) {
									wx.navigateTo({
									    url:'../address/main'
									})
								} else if (res.cancel) {
								console.log('用户点击取消')
								}
							}
						})
					}
				}).catch(err => {
					ToastShow('失败','loading')
				})
			},

			submitBtn(){  //确认兑换
				let that = this;
				if(that.userInfo.mp >= that.countMp){
						let bean = {}
						bean.orderAmount = that.postage*(that.countMp/that.oneBox)
						bean.needPayMoney = that.postage*(that.countMp/that.oneBox)
						bean.memberId = that.userInfo.memberId
						// (是否使用平台券)
						bean.orderType = 5
						bean.shipAddr = that.memberAddressDO.addr
						bean.shipMobile = that.memberAddressDO.mobile 
						bean.shipName= that.memberAddressDO.name	
						bean.goodsNum = that.countMp
						api_order.giftUser(bean).then(res => {
							if(res.code == 0){
								console.log("你好世界",res)
								that.wxPay(res.order)
							}else{
								ToastShow('失败','loading')
							}
						})
				}else{
					ToastShow('你的数量不够','loading')
				}
			},

			//微信支付方法封装
			wxPay(order){
				let that = this;
				let params ={}
				params.sn = order.sn
				// params.payAmount = order.needPayMoney * 100
				params.payAmount=1
				//请求支付
				params.openId=that.userInfo.openId
				params.shippingAmount=0
				console.log("过来了吗123",order,params)
				api_order.ConfirmPay(params).then(function(PayRes){
					if(PayRes.code==0){
						wx.requestPayment({
							timeStamp: PayRes.Map.timeStamp, //时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间,
							nonceStr: PayRes.Map.nonceStr, //随机字符串，长度为32个字符以下,
							package: PayRes.Map.package, //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*,
							signType: PayRes.Map.signType, //签名算法，暂支持 MD5,
							paySign: PayRes.Map.paySign, //签名,具体签名方案参见小程序支付接口文档,
							success: res => {
								that.giftUserPass(order.orderId);
							},
							fail: function (res) {
								// fail   
								wx.showToast({ 
									title: '支付失败',
									icon:'none',
									duration: 2000
								})
							
								},
						});
					}
					else{
						wx.showToast({ 
							title:'网络错误',
							icon:'none',
							duration: 2000
						})
					}
				})
			},

			giftUserPass(orderId){
				let that = this;
				console.log(that.userInfo,'用户的信息')
				let data = {
					memberId:that.userInfo.memberId,
					orderId:orderId
				}
                api_order.giftUserPass(data).then(res => {
					console.log("成功",res)
					if(res.code == 0){
                       ToastShow('成功','success')
					}else{
                       ToastShow('失败','loading')
					}
				}).catch(err => {
					ToastShow('失败','loading')
				})
			}


		
		},
		mounted(){
			let that = this;
			that.userInfo = store.state.userInfo
			console.log(that.userInfo,'用户的信息')
			that.oneBox = wx.getStorageSync('oneBox')
			that.postage = wx.getStorageSync('postage')
			that.getSign();
		}
	}
</script>
<style  lang="less">
  	.mpvue-calendar{
		z-index: 0!important;
 		border-radius:20px!important;
 	}
 .total{
	 position: relative;
 	background-color: #6d1b22;
 	.sign1{
		 position: relative;
 		 width: 300px;
		 height: 161px;
		 margin: 12px auto 0;
		 img{width: 100%;height: 100%;}
		 .Num_div{
			 z-index: 2;
			 position: absolute;
			 width: 100%;
			 text-align: center;
			 top: 33px;
			 color: #fff;
		 }
		 .Num_div span{font-size: 20px;}
		 .Num_div div{font-size: 14px;}
 	}
 
 	.businessCard{
		 z-index: 0;
		width: 90%;
		overflow: hidden;
		margin: 0 auto;		
	}
 }
	.btn{
		width: 243px;
		height: 40px;
		background-color: #83212c;
		line-height: 40px;
		text-align: center;
		border-radius: 20px;
		color: #FFFFFF;
		font-size: 17px;
		margin:10px auto;
	}
	.tip{
		color: #fff;
		text-align:center;
		font-size: 14px;
		height: 30px;
		line-height: 30px;
	}
	.modemask{z-index: 1;background: rgba(0, 0, 0, 0.171);position: absolute;top: 0;left: 0;width: 100%;height: 100%;}
	.model{
		z-index: 2;
		position:absolute;
		bottom: 0;
		background: #fff;
		width: 100%;height: 300px;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
	}
	.addarress{padding: 10px;font-size: 16px;border-bottom: 1px solid rgba(204, 204, 204, 0.411);
	    div{padding: 3px 0;}
	    .info{display: flex;justify-content: space-between;}
	}
	.shop,.model .price div{
		display: flex;justify-content: space-between;font-size: 15px;padding: 10px;color: #7c272f;
	}
	.shop .Num{border:1px solid #6d1b22;border-radius: 10px;overflow: hidden;
		span{background: #6d1b22;color: #fff;display: inline-block;padding: 0 8px}
	}
	 
	.model .price div{
		color: #7c272f;
	}
	.sumbitbnt{width: 75%;background: #7c272f;padding: 10px;margin:30px auto;border-radius: 10px;color: #fff;text-align: center;}
	// .model .price{
	// 	display: flex;justify-content: space-between;font-size: 15px;
	// }
</style>