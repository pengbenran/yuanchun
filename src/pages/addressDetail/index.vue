<template>
  <div class="address">
     <div class="item"><text>收货人</text><input type="text" placeholder="请输入收货人" placeholder-style='font-size:26rpx;font-weight: 100;color:#8e8e8e;' v-model="username"/></div> 
     <div class="item"><text>手机号码</text><input type="text" placeholder="请输入手机号码" placeholder-style='font-size:26rpx;font-weight: 100;color:#8e8e8e;' v-model="userphone" /></div> 
     <div class="item itemModel"><text>所在地区</text><span @click="selectAddress">请选择地区</span></div> 
       <div class="AddressModel">
            <textarea placeholder='请选择地址' :value='addres'   placeholder-style='font-size:26rpx;font-weight: 100;color:#8e8e8e;' v-model="addr"></textarea>
       </div>
    <div class="item"><text>详细地址：</text><input type="text" :value="addresInfo" placeholder="门牌号、街区号、单元号楼层" placeholder-style='font-size:26rpx;font-weight: 100;color:#8e8e8e;' v-model="detailaddr"/></div> 
    <div class="ico">
      <span>默认收货地址</span> <switch :checked="switch1Checked" @change="switch1Change" color='#F44156'/></div>
    <div class="SubBtn" @click="addAddress"><text>{{tip}}</text></div>
  </div>
</template>

<script>
	import Api from '@/api/site'
export default {
  data () {
    return {
          switch1Checked: false,
          addresInfo:'',
          isDeafult:0,
          username:'',
          userphone:'',
          addr:'',
          detailaddr:'',
          memberId:'',
          Type:'',
          tip:'新增地址',
          addrId:''

    }
  },
 methods:{
    //switch点击事件
    switch1Change(e){
    	    let that = this
    	    let params = {}
	        params.memberId = that.memberId         		      	
          Api.defutaddress(params).then(function(res){
           	console.log(res)
          })
          
//       params.memberId =e.mp.detail.value ? 1:0
    },
    //selectAddress选择地址
    selectAddress(){
      let that = this;
      wx.chooseLocation({
        success: function (res) {
          that.addr = res.address;
        }
      })
    },
    async addAddress(){
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      let that=this

      if(that.username==''){
        wx.showToast({
          icon:'none',
          title: '用户名不能为空',
        })
      }
      else if(!myreg.test(that.userphone)){
        wx.showToast({
          icon:'none',
          title: '手机号格式不正确',
        })
      }
      else if(that.addr==''){
        wx.showToast({
          icon:'none',
          title: '地址不能为空',
        })
      }
      else if(that.detailaddr==''){
        wx.showToast({
          icon:'none',
          title: '详细地址不能为空',
        })
      }
      else{      		     	
        if(that.Type=='edit'){      	
          let params = {}
          console.log(1111)
          params.addrId =  that.addrId
	        params.memberId = that.memberId
	        params.defAddr = that.isDeafult
	        params.name = that.username
	        params.mobile = that.userphone
	        params.addr = that.addr  
	        params.region = that.detailaddr
	        params.province = ''
	        params.city = ''            		      	
           Api.update(params).then(function(res){
                   
	      	}) 
	      	wx.showToast({
            title: '修改成功', 
            icon: 'success',
            duration: 1500
          })
        }
        else{
	        let params = {}
	        
	        params.memberId = that.memberId
	        params.defAddr = that.isDeafult
	        params.name = that.username
	        params.mobile = that.userphone
	        params.addr = that.addr  
	        params.region = that.detailaddr
	        params.province = ''
	        params.city = ''            		      	
         	   Api.getSite(params).then(function(res){
		  		    console.log(res);
		      	})
           wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 1500
          })
        
         }
				  setTimeout(function () {
				         wx.redirectTo({
				           url: '../address/main',
				        })
				    }, 1500) 				       		         
      }

    },
    async getAddrById(addrId){
      let that=this
      
	    let parms = {}     	  
      parms.addrId = addrId
	    Api.getSiteDef(parms).then(function(res){
      that.addrId = res.getaddr.addrId
      that.username=res.getaddr.name
      that.userphone = res.getaddr.mobile
      that.addr = res.getaddr.addr
      that.detailaddr = res.getaddr.region
      that.switch1Checked=res.getaddr.defAddr==1?true:false   
	     	})
  
    }
 },
  onLoad(options) {
    let that=this
    that.addrId = options.addrId
    that.memberId =179
    if(options.addrId!=undefined){
      that.getAddrById(options.addrId)
      that.Type='edit'
      that.tip="修改地址"
      wx.setNavigationBarTitle({ 
       title: "修改地址"//页面标题为路由参数
     })
    }
    else{
      that.addrId = ''
      that.username=''
      that.userphone = ''
      that.addr = ''
      that.detailaddr = ''
      that.switch1Checked=false 
      that.tip="新增地址"
      wx.setNavigationBarTitle({ 
       title: "新增地址"//页面标题为路由参数
     })
    }
  }
}
</script>

<style scoped lang='less'>
img{display: block;height: 100%;width: 100%;}

.input-placeholder{font-size:20rpx;font-weight: 100;color:#8e8e8e;}
input,textarea{font-size: 32rpx;font-weight: 100;color: #000;}
.address{
    .item{display: flex;align-items: center;font-size: 32rpx;font-weight: 100;padding: 10rpx 20rpx;}
    .item text{width: 25%;}
    .item input{width: 75%;}

}

.itemModel{justify-content: space-between;
 span{font-size: 26rpx;color: #fff;background:#A92429;border-radius: 26rpx;padding: 0 10rpx;}
}
.ico{display: flex;justify-content: space-between;padding: 10rpx 20rpx;font-size: 32rpx;}

.SubBtn{text-align: center;margin-top: 30rpx;
    text{display: inline-block;background: #A92429;color: #fff;width: 90%;text-align: center;line-height: 80rpx;line-height: 80rpx;border-radius: 50rpx;}
}

.AddressModel{padding: 10rpx 30rpx;
    textarea{width: 100%;height: 75rpx;}
}


</style>
