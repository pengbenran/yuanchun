<template>
  <div class='mode' v-if="openSetting">
    <div class='bcg'></div>
    <div class='loginmodel'>
      <div class='title'>需要您的授权</div>
      <div class='modeltip'>为了提供更好的服务请在稍后的设置页面打开授权</div>
      <button class='modelbtn' open-type="openSetting"  @openSetting="openSetting">我知道了</button> 
    </div> 
  </div>
</template>

<script>
export default {
  props: ['openSetting'],
  data () {
    return {
     
    }
    },
    mounted(){
 
    },
    methods: {
    openSetting(e) {//跳转授权设置之后的回调
      console.log(e)
    }     
  },
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