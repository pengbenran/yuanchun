<template>
	<div class="container">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
			<div class="total">
				<div class="sign1"><img src="/static/images/sign1.png"/>
					<div class="Num_div">
						<span>{{userInfo.mp}}片</span>
						<div>面膜数量</div>
					</div>
				</div>
				<div class="businessCard">
					<Calendar
					:months="months"
					:value="value"
					@next="next"
					@prev="prev"
					:events="events"
					lunar
					@select="select" ref="calendar" @selectMonth="selectMonth" @selectYear="selectYear"/>	
				</div>
				<div class="btn" @click="get_Time">立即签到</div> 
				<div class="btn" @click="exchange">立即兑换</div> 
				<div class="tip">兑换规格:每5片即可免费兑换一盒面膜</div>    
				<div class="modemask" @click="closeMode" v-if="modelBool"></div>
				<div class="model" v-if="modelBool">
					<div class="addarress">
						<div class="top">地址：{{memberAddressDO.address}}</div>
						<div class="info">
							<div class="left">收件人：{{memberAddressDO.name}}</div>
							<div class="right">电话：{{memberAddressDO.mobile}}</div>
						</div>
					</div>
					<div class="shop">
						<div class="shopInfop">
							面膜盒数:
						</div>
						<div class="Num" v-for="(item,index) in listArry" :key="item" :index="index" @click="choose(index)">
							<div class="list" :class="{'select':item.isSelect}">{{item.num}}盒</div>
						</div>
					</div>
					<div class="price">
						<div class="list"><span>邮费：</span><span>￥{{postage}}</span></div>
					</div>
					<div class="sumbitbnt" @click="getGoods">确认兑换</div>
				</div>
			</div>
		</blockquote>
</div>
</template>
<script>
	import Calendar from 'mpvue-calendar'
	import store from '@/store/store'
	import API from '@/api/lib'
	import api_site from '@/api/site'
	import api_order from '@/api/order'
	import api_good from "@/api/goods"
	import {ToastShow,updateUserInfo,accSub} from '@/utils/index'
	import loading from '@/components/loading'
	import 'mpvue-calendar/src/style.css'
	export default{
		data(){
			return{
				months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],     
				disabledarr:[],         
				begin:[2019,3,14],       
				end:[2020,1,1],       
				events: {},
				userInfo:{},
				modelBool:false,
				memberAddressDO:{},
				countMp:0,
				oneBox:0,
				postage:0,
				value:[],
				todyYear:'',
				todyMonth:'',
				todyDay:'',
				isLoading:false,
				listArry:[{num:'1',isSelect:true},{num:'5',isSelect:false},{num:'10',isSelect:false}],
				canSubmit:true,
				goodsDetail:{},
				num:''
			}
		},
		computed: {
    		
		},
		components:{
			Calendar,
			loading
		},
		methods:{
			//获取当前时间的年月日
			get_Time(){	  
			   let that = this;
			   if(that.userInfo.defaultLv==1){
			   	wx.showModal({
			   		title: '提示',
			   		content: '您还不是合伙人哦~无法签到',
			   		confirmText:'去成为',
			   		success(res) {
			   			if (res.confirm) {
			   				wx.switchTab({url: '../index/main'});
			   			} else if (res.cancel) {

			   			}
			   		}
			   	})
			   }
			   else{
			   	if(that.todyYear==that.value[0]&&that.todyMonth==that.value[1]&&that.todyDay==that.value[2]){
			   		wx.showLoading({title: '加载中'})   
			   		let time = that.value.join('-')
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
			   				ToastShow('今日已签到','none')
			   			}
			   		}).catch(err => {
			   			ToastShow('失败','loading')
			   		}) 		
			   	}
			   	else{
			   		ToastShow('只能签到当天的哦','none')
			   	}
			   }		   
			},
			select(val) {
				this.value=val
			},
			closeMode(){
				this.modelBool=false
				this.listArry.map(item=>{
					item.isSelect=false
				})
				this.listArry[0].isSelect=true
			},
			getSign(){
				let that = this;
				let data = {
					memberId:that.userInfo.memberId
				}
				API.get_Sign(data).then(res => {
					that.isLoading=true
					if(res.code == 0){
						 that.events = res.signInfo
					}
				}).catch(err => {
                      ToastShow('失败','loading')
			   })
			},
			choose(index){
				let that=this
				that.postage = wx.getStorageSync('postage')
				if(that.listArry[index].num*that.oneBox>that.userInfo.mp){
					ToastShow('面膜数量不足','none')
				}
				else{
					that.listArry.map(item=>
						item.isSelect=false
					)
					that.countMp=that.listArry[index].num*that.oneBox
					that.listArry[index].isSelect=true
					that.postage=that.listArry[index].num*that.postage
					that.num=that.listArry[index].num
				}
				
			},
			exchange(){
				let that=this
				if(that.oneBox==0){
					ToastShow('数据错误,请稍后重试','none')
				}
				else if(that.userInfo.mp<that.oneBox){
					ToastShow('面膜数量不足','none')
				}
				else{
					that.getAddres()
				}
				
			},
			//拿到用户的默认地址
			getAddres(){
				let that = this;
				if(wx.getStorageSync('addr')!=''){
					that.memberAddressDO = wx.getStorageSync('addr')
					that.modelBool = true;
				}
				else{
					let data = {
						memberId:that.userInfo.memberId
					}
					api_site.defutaddress(data).then(res =>{
						if(res.code == 0){
							res.memberAddressDO.address=res.memberAddressDO.addr.split('-').join('')+res.memberAddressDO.region
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
				}		
			},
			// 获取签到商品
			getGoods(){
				let params={}
				let that=this
				params.goodsId=72
				params.memberId=that.userInfo.memberId
				api_good.getGoodsInfo(params).then(function(res){
					that.goodsDetail=res.Goods
					that.submitBtn(res.Goods.thumbnail,res.Goods.name,res.Goods.goodsId,res.Goods.price)
				})
			},
			//确认兑换
			submitBtn(thumbnail,name,goodsId,price){  
				let that = this;
				if(that.canSubmit){
					that.canSubmit=false
					let goodarr=[]
					let goodlist={}
					let bean = {}
					goodlist.pic = that.num
					goodlist.num = that.num;
					goodlist.image = thumbnail
					goodlist.name = name
					goodlist.goodsId = goodsId
					goodlist.price = price
					goodlist.cart=0
					goodarr[0] = goodlist;		
					bean.orderAmount = that.postage
					bean.needPayMoney = that.postage
					bean.memberId = that.userInfo.memberId
					// (是否使用平台券)
					bean.orderType = 5
					bean.shipAddr = that.memberAddressDO.address
					bean.shipMobile = that.memberAddressDO.mobile 
					bean.shipName= that.memberAddressDO.name	
					bean.itemsJson=JSON.stringify(goodarr)
					bean.goodsNum = that.countMp
					api_order.giftUser(bean).then(res => {
						that.canSubmit=true
						if(res.code == 0){
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
				// params.payAmount = Math.round(order.needPayMoney * 100)
				params.payAmount=1
				//请求支付
				params.openId=that.userInfo.openId
				params.shippingAmount=0
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
				let data = {
					memberId:that.userInfo.memberId,
					orderId:orderId
				}
                api_order.giftUserPass(data).then(res => {
					if(res.code == 0){
					   that.userInfo.mp=accSub(that.userInfo.mp,that.countMp)
					   updateUserInfo()
					   that.modelBool=false
					   that.listArry.map(item=>{
					   	item.isSelect=false
					   })
					   that.listArry[0].isSelect=true
					   that.postage = wx.getStorageSync('postage')
                       ToastShow('兑换成功','success')
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
			let date = new Date();
			that.todyYear = date.getFullYear();
			that.todyMonth = date.getMonth() + 1;
			that.todyDay = date.getDate();
			that.value=[that.todyYear,that.todyMonth,that.todyDay]
			that.oneBox = wx.getStorageSync('oneBox')	
			that.postage = wx.getStorageSync('postage')
			that.countMp=that.listArry[0].num*that.oneBox
			that.num=that.listArry[0].num
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
	.shop{
		.shopInfop{
			height: 40px;
			line-height:40px;
		}
		.Num{
			display: flex; justify-content: space-around;
			flex-grow: 1;
			.list{
				width:75px;
				height: 40px;
				line-height:40px;
				text-align: center;
				border: 1px solid #7c272f;
				border-radius: 5px;
			}
		}
		

	}
	.model .price div{
		color: #7c272f;
	}
	.sumbitbnt{width: 75%;background: #7c272f;padding: 10px;margin:30px auto;border-radius: 10px;color: #fff;text-align: center;}
	// .model .price{
	// 	display: flex;justify-content: space-between;font-size: 15px;
	// }
	.select{
		color:#fff;
		background: #7c272f;
	}
</style>