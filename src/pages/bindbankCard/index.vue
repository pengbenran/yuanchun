<template>
	<div class="bindBankCard">
		<div class="top">
			<img src="/static/images/yinghangka.png" alt="">
		</div>
		<div class="item"><input type="text" v-model="UserName" placeholder="申请人名字"></div>
		<div class="item"><input type="text" v-model="UserPhone" placeholder="电话号码"></div>
		<div class="item"><input type="text" v-model="UserMa" placeholder="身份证号码"></div>
		<div class="item"><input type="text" v-model="UserYin" placeholder="银行卡号"></div>
		<div class="item"><input type="text" v-model="UserYinName" placeholder="开户银行"></div>
		<div class="btn" @click="submit">绑定银行卡</div>
	</div>
</template>
<script>
import store from '@/store/store'
import Lib from '@/utils/index'
import Api from '@/api/member'
export default {
  data () {
    return {
             UserName:'彭本燃',
             UserPhone:'15779556662',
             UserMa:'362201199410025211',
             UserYin:'6217002100003490117',
             UserYinName:'建设银行',
             userInfo:{},
             canSubmit:true
    }
  },
  methods:{
   //选项点击加载   
   async submit(){
      var that = this;
      if (that.UserName == '') {
       Lib.ToastShow('姓名不能为空','none',1000)
      }else if (that.UserPhone == '') {
       Lib.ToastShow('电话不能为空','none',1000)
      }
      else if(that.UserMa == "" || that.UserMa.length!=18) { 
       Lib.ToastShow('身份证格式错误','none',1000)
      }
      else if (that.UserYin == "") {
       Lib.ToastShow('银行卡号为空','none',1000)
      }
      else if (that.UserYinName == "") {
       Lib.ToastShow('开户银行为空','none',1000)
      }
      else {
       if(that.canSubmit){
          that.canSubmit=false
          var params = {}
          params.wechat = that.UserName 
          params.mobile = that.UserPhone
          params.memberId = that.userInfo.memberId
          // params.memberId = 274
          params.midentity = that.UserMa
          params.cardno = that.UserYin
          params.depositBank = that.UserYinName
          Api.SubmitBankCard(params).then(function(res){
            if(res.code==0){
              Lib.ToastShow('绑定成功','success',1000)
              setTimeout(function(){
                that.canSubmit=true
                wx.navigateTo({url:'../privilege/main'})
              },1000)  
            }
            else{
              that.canSubmit=true
            }
          })
       }
    
    }
     
   }
  },
  mounted() {
      let that=this
      that.userInfo=store.state.userInfo
    },
}
</script>
<style scoped lang='less'>
.bindBankCard{
	.top{
		width:114px;
		height: 86px;
		margin:40px auto;
	}
}
img{display: block;height: 100%;width: 100%;}
.distribefrom{background: #f5f5f5;min-height: 100vh;}

.warp{padding-top: 1px;}
.boxWarp{margin: 20rpx 20rpx;padding: 20rpx 20rpx 30rpx;background: #fff;}

.item{border-bottom: 1px solid #ccc;padding: 25rpx 0;
	input{text-align: center;font-weight: 100;}
}

.btn{
  width: 80%;
  height: 50px;
  background: linear-gradient(to right, #d2313f, #77222a);
  line-height: 50px;
  text-align: center;
  font-size: 17px;
  color: #fefefe;
  margin: 30px auto;
  border-radius: 25px;
}

</style>