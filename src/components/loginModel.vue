 <template>
  <div class='mode' v-if="isMember">
    <div class='bcg'></div>
    <div class='loginmodel'>
      <div class='title'>需要您的授权</div>
      <div class='modeltip'>为了提供更好的服务请在稍后的提示框中点击允许</div>
      <button class='modelbtn' open-type="getUserInfo"  @getuserinfo="getUserInfo" :disable="isSubmit">我知道了</button> 
    </div> 
  </div>
</template>

<script>
import Api from "@/api/home";
import store from '@/store/store'
export default {
  props: [],
  data () {
    return {
       isMember:false,
       isSubmit:false
    }
    },
    mounted(){
 
    },
    methods: {
    getUserInfo(){   
      var that = this 
      if(that.memberId=="00"){
       that.isSubmit=true
       wx.login({
        success: res => {
           let code=res.code   
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (code) { 
             wx.getUserInfo({
              success: function (res_user) {
                let params={}
                params.code=code
                params.iv=res_user.iv
                params.encryptedData=res_user.encryptedData
                Api.weCatLogin(params).then(function(res){
                	console.log(res)
                  if(res.code==0){
                    that.isSubmit=false
                    that.isMember=false
                    that.userLogin()
                  }
                }) 
              }
            }) 
           }
        } 
       })
     }
   },
  userLogin(){
    return new Promise((resolve, reject) => {
      let that=this
      wx.login({
        success: function (res) {
          if (res.code) {
            Api.getCode(res.code).then(function(memberRes){
              if(memberRes.code!=1){
                 wx.showTabBar({})
                wx.setStorageSync('memberId', memberRes.memberDo.memberId)
                // let memberDo={}
                // memberDo.address=''
                // memberRes.advance=0
                // memberDo.agentHigh=1765
                // memberDo.bonus=''
                // memberDo.city=''
                // memberDo.defaultLv=1
                // memberDo.desHigh=''
                // memberDo.desLow=''
                // memberDo.discount=''
                // memberDo.email=''
                // memberDo.face='https://wx.qlogo.cn/mmopen/vi_32/icyianiaCq6lUFJJscnuG190QPJ0ZCQqEaIKmBPRqKDgeKyAe0iahMYgKLeBdYXRgAtS7uA7tc13X7IBFR08zxucqg/132'
                // memberDo.infoFull=''
                // memberDo.lvId=11
                // memberDo.lvidname='VIP'
//               memberDo.memberId=2673
                // memberDo.memberUp=''
                // memberDo.mobile=''
                // memberDo.name='春华秋实'
                // memberDo.openId='o_lFH478YkuOzjseXxZBG_uUnACg'
                // memberDo.point=''
                // memberDo.province='上海'
                // memberDo.region='徐汇'
                // memberDo.regtime=1553916882767
                // memberDo.remark=''
                // memberDo.sex='2'
                // memberDo.signStatus=''
                // memberDo.uname=''
                // memberDo.unionid='opJYm1gKr5QfPcy9LJO0gifzCFVw'
                store.commit("storeUserInfo",memberRes.memberDo)
                that.$parent.getNewPersonGift();
              }
              else {
                let memberId="00"
                that.memberId=memberId
                wx.setStorageSync('memberId', "00")
                that.isMember=true
              }
              resolve()
            })
          }
        }
      }) 
    })
    
  },
}
}
</script>

<style  scoped lang='less'>
/* 登录模态框 */
.mode{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
.bcg{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
}
.loginmodel{
  border-radius:10rpx; 
  width: 60%;
  height: 260rpx;
  background: #fff;
  position: absolute;
  top: 500rpx;
  left: 20%;
}
.title{
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
}
.modeltip{
  width: 90%;
  margin: 0 auto;
  font-size: 0.8em;
  text-indent: 20px;
  color: #8a8a8a;
  height: 100rpx;
}
.modelbtn{
  border: none;
  outline: 0;
  text-align: right;
  background: #fff;
  color: #3494ff
}
button::after {
  border: none;
}

</style>