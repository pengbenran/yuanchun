<template>
  <div class="address">
    <div class="header">
        <div class="left"><span class="iconfont">&#xe63c;</span>收货地址</div>
        <div class="right">
            <span class="iconfont">&#xe616;</span>
            <text @click="selectTo(1)" v-show='selectIndex==2'>删除地址</text><text  @click="selectTo(2)" v-show='selectIndex==1'>取消</text>
        </div>
    </div>
    <div class="addressList" v-if='addressList.length!=0' >
        <div class="item" v-for="(item,index) in addressList" :index='index' :key='item'>
            <div class="left" @click="jumpOrder(index)">
                <div class="title">{{item.addr}}</div>
                <div class="info">{{item.region}}</div>
                <div class="pople"><text>{{item.name}}</text> | <text>{{item.mobile}}</text></div>
            </div>
            <div class="right">
                 <div class="deit" v-show='selectIndex==2' @click="edits(index)">
                    <span class="iconfont">&#xe6ec;</span>         
                  </div>
                 <div class="deit" v-show='selectIndex==1'  @click="delAddr(index)"><text>删除</text></div>
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
      wx.setStorageSync('addr',that.addressList[e])
      if(that.jumpfrom=='order'){
        wx.navigateTo({ url: '../order/main' });
      }
      else if(that.jumpfrom=='orderOne'){
        wx.navigateTo({ url: '../orderOne/main' });
      }
      else{

      }
      
    },
    edits(e){
      let that=this
      that.grtDefinite(e)
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
        success: function (res) {
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
      })
    },
     	//具体会员地址
 	 grtDefinite:function(e){
 	 	       let that=this
	     	   let parms = {}     	  
           parms.addrId = that.addressList[e].addrId
	     	   Api.getSiteDef(parms).then(function(res){ 
	     	    	console.log(res)
	     	})
	    }
  },

  onLoad(){
        let that=this
        let params = {}
        params.memberId = 179  
        //所有会员地址
	     	Api.getSiteList(params).then(function(res){
	     				if(res.code==0){
               that.addressList = res.memberAddressList
          	} 		   
	    	})	    
  },
  onPullDownRefresh: function(){  
      wx.stopPullDownRefresh()
    },

}
</script>

<style scoped lang='less'>
/*局部水平居中*/
// @mixin flexc{
// display: flex;align-items: center;
// }
.addressIcon{
  width: 40rpx;height: 40rpx;overflow: hidden;vertical-align: middle;display:inline-block;
}
// /*文本换行省略*/
// @mixin fontM{
// white-space:normal;overflow: hidden;display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;
// }
img{display: block;height: 100%;width: 100%;}

.header{display: flex;justify-content: space-between;font-weight: 100;font-size: 30rpx;padding:20rpx;border-bottom:1px solid rgb(245,245,245);
     .right{color: #A1171C;}
     .right text{margin-left: 10rpx;}
}

.addressList{padding: 10rpx 30rpx;
   .item{display: flex;justify-content: space-between;padding: 15rpx 0;border-bottom:1px solid rgb(245,245,245);}
   .left .title{font-size: 32rpx;}
   .info,.pople{font-weight: 100;font-size: 26rpx;color: #666;}
   .deit{width: 100rpx;height: 50rpx;overflow: hidden;}
   .deit text{font-weight: 100;font-size: 30rpx;color:#A92429;}
}

.addressList{height: 900rpx;
  
}

.addresBtn{position: absolute;bottom: 40rpx;left: 5%;width: 90%;background:#A92429;margin: auto;text-align: center;
   text{color: #fff;font-weight: 100;font-size: 32rpx;line-height: 80rpx;line-height: 80rpx;border-radius: 10rpx;}
}



</style>
