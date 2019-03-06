<template>
	<div class="myself">
		<div class="header">
			<div class="userInfo">
				<div class="avator">
					<img :src="userInfo.face">
				</div>
				<div class="userName">
					<p class="memberName">{{userInfo.name}}</p>
					<p class="memberLv">
						<span>{{userInfo.lvidname}}</span>
						<span @click="jumpvipUp">点击升级</span>
					</p>
				</div>
			</div>
		</div>
    <div class="menu">
      <div class="list">
        <p class="num">{{userInfo.point}}</p>
        <p class="name">平台券</p>
      </div>
      <div class="list">
        <p class="num">{{userInfo.advance}}</p>
        <p class="name">余额</p>
      </div>
      <div class="list">
        <p class="num">{{orderStatus.favorite}}</p>
        <p class="name">收藏</p>
      </div>
    </div>
    <div class="order">
		<div class="orderTitle">
			<div class="allOrer-left">我的订单</div>
			<div class="allOrer-right">
				<span>全部订单</span>
				<span class="iconfont">&#xe72b;</span>
			</div>	
		</div>
      <div class="orderItem">
        <div class="orderList" @click="jump('../orderList/main?orderStatus=1')">
          <p>{{orderStatus.payOrder}}</p>
          <p>待付款</p>
        </div>
        <div class="orderList" @click="jump('../orderList/main?orderStatus=2')">
          <p>{{orderStatus.shipOrder}}</p>
          <p>待发货</p>
        </div>
        <div class="orderList" @click="jump('../orderList/main?orderStatus=3')">
          <p>{{orderStatus.takeOrder}}</p>
          <p>待收货</p>
        </div>
        <div class="orderList" @click="jump('../orderList/main?orderStatus=4')">
          <p>{{orderStatus.completeOrder}}</p>
          <p>已完成</p>
        </div>
      </div>
    </div>
    <div class="menuContain">
      <div class="menuTitle">
        我的服务
      </div>
      <div class="menuItem" v-for="(item,index) in menuItem" :key="item" :inde="index" @click="jump(item.jumpUrl)">
        <div class="icon">
          <img :src="item.icon">
        </div>
        <div class="menuname">{{item.menuName}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store/store'
import Api from'@/api/order'
export default {
  data () {
    return {
      menuItem:[
      {icon:'/static/images/icon3.png',menuName:'我的合伙人',jumpUrl:'../Partner/main'},
      {icon:'/static/images/icon4.png',menuName:'地址管理',jumpUrl:'../address/main'},
      {icon:'/static/images/kefu.png',menuName:'联系客服',jumpUrl:'../kefu/main'},
      {icon:'/static/images/mingpian.png',menuName:'个人名片',jumpUrl:'../businessCard/main'},
      {icon:'/static/images/tequan.png',menuName:'我的特权',jumpUrl:'../privilege/main'}],
      userInfo:{},
      orderStatus:{},
      phoneNumber:''
    }
  },
components: {},
  methods: {
  	jump(url){
  		let that=this
  		if(url=="../kefu/main"){
  			wx.makePhoneCall({
  				phoneNumber: that.phoneNumber,
  			})
  		}
  		else{
  			wx.navigateTo({
  				url:url,
  			})
  		}

  	},
  		//客服电话
			phoneNumber: function() {
				let that = this;
				Api.phoneNumber().then(function(res) {
					if(res.code == 0) {
						that.phone = res.mobile.mobile
					}
				})
			},
   // 获取订单数据
   getallCount(){
   	   let that=this
   	   let params={}
   	   params.memberId=that.userInfo.memberId
   	   Api.getorderCount(params).then(function(res){
   	   	that.orderStatus.favorite=res.favorite
   	   	that.orderStatus.payOrder=res.payOrder
   	   	that.orderStatus.shipOrder=res.shipOrder
   	   	that.orderStatus.takeOrder=res.takeOrder
   	   	that.orderStatus.completeOrder=res.completeOrder
   	   	that.phoneNumber=res.mobile.mobile
   	   	wx.stopPullDownRefresh()
   	   })
   }
  },
  mounted() {
    let that=this
    that.userInfo = store.state.userInfo
    that.getallCount()
  },
  onPullDownRefresh: function(){
  	let that=this
  	that.getallCount()
  },
}
</script>

<style scoped lang="less">
	img {
		width: 100%;
		height: 100%;
		display: block;
	}	
	.header {
		height: 110px;
		background: linear-gradient(to top right, #FF3D3A, #F56564);
		width: 100%;
		.userInfo {
			display: flex;
			padding: 40px 0 15px 25px;
			box-sizing: border-box;
			.avator {
				width: 50px;
				height: 50px;
				border-radius: 50%;
				overflow: hidden;
			}
			.userName {
				// flex-grow: 1;
				padding-left: 10px;
				box-sizing: border-box;
				color: #323735;
				.memberName {
					height: 30px;
					line-height: 30px;
					font-size: 16px;
					color: #3a3a3a;
					font-weight: bold;
				}
				.memberLv {
					display: flex;
					align-items: center;
					span {
						display: block;
						&:nth-child(1) {
							color: #fff;
							background: #901414;
							padding: 0 10px;
							box-sizing: border-box;
							height: 18px;
							line-height: 18px;
							border-radius: 9px;
							font-size: 12px;
							text-align: center;
							vertical-align: middle;
						}
						&:nth-child(2) {
							display: inline-block;
							font-size: 8px;
							margin-left: 5px;
							color: #FFFFFF;
						}
					}
				}
			}
		}
	}
	
	.menu {
		display: flex;
		justify-content: space-around;
		text-align: center;
		padding: 10px 0;
		background: #fdfdfd;
		.list {
			color: #313131;
			font-size: 15px;
			.name {
				margin-top: 10px;
			}
		}
	}
	
	.order {
		.orderTitle {
			display: flex;
			justify-content: space-between;
			align-items: center;

			padding: 13px 13px 20px 13px;		
			.allOrer-left{
				  font-size: 15px;
					color: #313131;
					font-weight: bold;
			}
			.allOrer-right {
				color: #acacac;
				font-size: 14px;
				display: inline-flex;
				align-items: center;
				span {
					&:nth-child(2) {
						font-size: 12px;
						margin-left: 2px;
					}
				}
			}
		}
		.orderItem {
			display: flex;
			justify-content: space-around;
			text-align: center;
			font-size: 16px;
			padding-bottom: 20px;
			box-sizing: border-box;
			.orderList {
				p {
					height: 25px;
					line-height: 25px;
					color: #313131;
					font-size: 13px;
				}
			}
		}
	}
	
	.menuContain {
		padding-bottom: 48px;
		.menuTitle {
			font-size: 15px;
			color: #313131;
			font-weight: bold;
			box-sizing: border-box;
			padding-left: 13px;
			padding-bottom: 8px;
		}
		.menuItem {
			display: flex;
			padding-left: 10px;
			width: 100%;
			height: 40px;
			line-height: 40px;
			font-size: 16px;
			border-top: 1px solid #EDEDED;
			.icon {
				width: 18px;
				height: 18px;
				overflow: hidden;
				margin-top: 9px;
			}
			.menuname {
				padding-left: 15px;
				flex-grow: 1;
				font-size: 11px;
				color: #000000;
			}
		}
	}
</style>