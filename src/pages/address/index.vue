<template>
  <div class="address">
    <div class="addressHeader">
        <div class="left"><span class="iconfont">&#xe63c;</span>收货地址</div>
        <div class="right">
            <span class="iconfont">&#xe616;</span>
            <text @click="selectTo(1)" v-show='selectIndex==2'>删除地址</text><text  @click="selectTo(2)" v-show='selectIndex==1'>取消</text>
        </div>
    </div>
    <div class="addressList" v-if='addressList.length!=0'>
        <div class="item" v-for="(item,index) in addressList" :index='index' :key='item'>
            <div class="left" @click="jumpOrder(index)">
                <div class="title">{{item.addr}}</div>
                <div class="info">{{item.region}}</div>
                <div class="pople"><text>{{item.name}}</text> | <text>{{item.mobile}}</text></div>
            </div>
            <div class="right">
                 <div class="deit" v-if='selectIndex==2' @click="edits(index)">
                    <p class="iconfont">&#xe6ec;</p> 
                    <p v-if="item.defAddr==1" class="defaultAddr">默认</p>        
                  </div>
                 <div class="deit" v-if='selectIndex==1'  @click="delAddr(index)"><text>删除</text></div>
            </div>
        </div>
    </div>
     <div class="addressList" v-else><img :src="noAddrImg" mode='aspectFit'/></div>
     <!--addressList end-->
     <div class="addresBtn" @click="toAddress"><text>添加新增收货地址</text></div>
     <!--addresBtn end-->
  </div>
</template>

<script>
	import Api from '@/api/site'
	import store from '@/store/store'
export default {
  data () {
    return {                              
        noAddrImg:'https://shop.guqinet.com/html/images/shuiguo/address/kong.png',
        selectIndex:2,
        addressList:[],
        memberId:'',
        jumpfrom:'',
    }
  },
  
  methods:{
    selectTo(index){
        let that = this;
        that.selectIndex = index;
    },
     //跳转
    toAddress(){
       wx.navigateTo({ url: '../addressDetail/main' });
    },
    jumpOrder(e){
      let that = this
      console.log(that.addressList[e])
      wx.setStorageSync('addr',that.addressList[e])
      if(that.jumpfrom=='cartOrder'){
        wx.navigateTo({ url: '../cart-order/main' });
      }
      else if(that.jumpfrom=='newPersonGift'){
        wx.navigateTo({ url: '../newPersonGift/main' });
      }
      else if(that.jumpfrom=='sign'){
        wx.navigateTo({ url: '../sign/main' });
      }
        
    },
    edits(e){
      let that=this
      let url=`../addressDetail/main?addrId=${that.addressList[e].addrId}`
      wx.navigateTo({
          url:url
       })
    }, 
    delAddr(e){
      var that= this  
      var parms = {}
      parms.addrId = that.addressList[e].addrId
      wx.showModal({
        title: '提示',
        content: '是否删除该地址',
        success(res) {
        if (res.confirm){       
          Api.addressAll(parms).then(function(res){         	
               if(res.code==0){
                that.addressList=that.addressList.filter((item => item.addrId!=that.addressList[e].addrId ))
                wx.showToast({
                 title: '删除成功',
                 icon: 'none',
                 duration: 1500
               })
               }
             })
          }
        }
      })
    },
     	//具体会员地址
 	 grtDefinite:function(e){
 	 	       let that=this
	     	   let parms = {}     	  
           parms.addrId = that.addressList[e].addrId
	     	   Api.getSiteDef(parms).then(function(res){ 
	     	    
	     	})
	    }
  },
  onShow(){
    let that=this
    let params = {}
    that.memberId = store.state.userInfo.memberId
    params.memberId = that.memberId 
    //所有会员地址
    Api.getSiteList(params).then(function(res) {
      if(res.code == 0) {
        res.memberAddressList.map(item=>
          item.address=item.addr.split('-').join('')+item.region
        )
       that.addressList = res.memberAddressList
     }
   })
    that.selectIndex = 2
  },
  onLoad(){
   let that=this
   let pages = getCurrentPages();
   let prevpage = pages[pages.length-2];
   if(prevpage.route=="pages/myself/main"){
     that.jumpfrom='myself'
   }
   else if(prevpage.route=="pages/cart-order/main"){
     that.jumpfrom='cartOrder'
   }
   else if(prevpage.route=="pages/newPersonGift/main"){
      that.jumpfrom='newPersonGift'
   }
  else if(prevpage.route=="pages/sign/main"){
      that.jumpfrom='sign'
   }
  },
  onPullDownRefresh: function(){  
      wx.stopPullDownRefresh()
   },

}
</script>

<style scoped lang='less'>

.addressIcon{
  width: 40rpx;height: 40rpx;overflow: hidden;vertical-align: middle;display:inline-block;
}
img{display: block;height: 100%;width: 100%;}

.addressHeader{display: flex;justify-content: space-between;font-weight: 100;font-size: 30rpx;padding:20rpx;border-bottom:1px solid rgb(245,245,245);
     .right{color: #A1171C;}
     .right text{margin-left: 10rpx;}
}

.addressList{padding: 10rpx 30rpx;
   .item{display: flex;justify-content: space-between;padding: 15rpx 0;border-bottom:1px solid rgb(245,245,245);}
   .left .title{font-size: 32rpx;}
   .info,.pople{font-weight: 100;font-size: 26rpx;color: #666;}
   .deit{width: 100rpx;overflow: hidden;
      .defaultAddr{
        font-weight: 100;font-size: 30rpx;color:#A92429;
      }
   }
   .deit text{font-weight: 100;font-size: 30rpx;color:#A92429;}
}
.addresBtn{position: absolute;bottom: 40rpx;left: 5%;width: 90%;background:#A92429;margin: auto;text-align: center;
   text{color: #fff;font-weight: 100;font-size: 32rpx;line-height: 80rpx;line-height: 80rpx;border-radius: 10rpx;}
}



</style>
