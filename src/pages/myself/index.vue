<template>
  <div class="myself">
    <div class="header">
      <div class="userInfo">
          <div class="avator">
            <img src="/static/images/product-list.png">
          </div>  
          <div class="userName">
            <p class="memberName">元淳面膜</p>
            <p class="memberLv">合伙人</p>
          </div>
      </div>
    </div>
    <div class="menu">
      <div class="list">
        <p class="num">1</p>
        <p class="name">平台券</p>
      </div>
      <div class="list">
        <p class="num">1</p>
        <p class="name">积分</p>
      </div>
      <div class="list">
        <p class="num">13</p>
        <p class="name">收藏</p>
      </div>
    </div>
    <div class="order">
      <div class="orderTitle">
        <span>我的订单</span>
        <span class="iconfont allOrer">&#xe72b;</span>
        <span class="allOrer">全部订单</span>
      </div>
      <div class="orderItem">
        <div class="orderList">
          <p>1</p>
          <p>待付款</p>
        </div>
        <div class="orderList">
          <p>1</p>
          <p>待发货</p>
        </div>
        <div class="orderList">
          <p>1</p>
          <p>待收货</p>
        </div>
        <div class="orderList">
          <p>1</p>
          <p>售后</p>
        </div>
      </div>
    </div>
    <div class="menuContain">
      <div class="menuTitle">
        我的服务
      </div>
       <div class="menuItem">
        <div class="icon">
          <img src="/static/images/icon.png">
        </div>
        <div class="menuname">我的余额</div>
      </div>
       <div class="menuItem">
        <div class="icon">
          <img src="/static/images/icon3.png">
        </div>
        <div class="menuname">我的合伙人</div>
      </div>
       <div class="menuItem">
        <div class="icon">
          <img src="/static/images/icon4.png">
        </div>
        <div class="menuname">地址管理</div>
      </div>
       <div class="menuItem">
        <div class="icon">
          <img src="/static/images/kefu.png">
        </div>
        <div class="menuname">联系客服</div>
      </div>
       <div class="menuItem">
        <div class="icon">
          <img src="/static/images/mingpian.png">
        </div>
        <div class="menuname">个人名片</div>
      </div>
       <div class="menuItem">
        <div class="icon">
          <img src="/static/images/tequan.png">
        </div>
        <div class="menuname">我的特权</div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  data () {
    return {
    
    }
  },

  components: {
  },

  methods: {
   
  },

  created () {
   
  }
}
</script>

<style scoped lang="less">
img{
  width: 100%;
  height: 100%;
  display: block;
}
.header{
  height: 110px;
  background:linear-gradient(to top right,#FF3D3A,#F56564);
  width: 100%;
  .userInfo{
    display: flex;
    padding: 40px 0 15px 25px;
    box-sizing: border-box;
    .avator{
      width: 55px;
      height: 55px;
      border-radius: 50%;
      overflow: hidden;
    }
    .userName{
      // flex-grow: 1;
      padding-left: 10px;
      box-sizing: border-box;
      color: #323735;
      .memberName{
        height: 30px;
        line-height:30px;
      }
      .memberLv{
        color:#fff;
        background: #901414;
        padding: 0 10px;
        box-sizing: border-box;
        height: 25px;
        line-height: 25px;
        border-radius: 12.5px;
        font-size: 16px;
      }
    }
  }
}
.menu{
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding: 10px 0;
  background: #F9F9F9;
  .list{
    color:#454545;
    font-size: 16px;
  }
}
.order{
  .orderTitle{
    height: 30px;
    line-height:30px;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 18px;
  .allOrer{
    float: right;
    color:#B6B6B6;
  }
  }
  .orderItem{
    display: flex;
    justify-content: space-around;
    text-align: center;
    font-size: 16px;
    padding: 10px 0;
    box-sizing: border-box;
    .orderList{
      p{
        height: 25px;
        line-height:25px;
      }
    }
  }
}
.menuContain{
  .menuTitle{
    height: 40px;
    line-height:40px;
    padding-left: 10px;
    box-sizing: border-box;
  }
  .menuItem{
    display: flex;
    padding-left: 10px;
    height: 40px;
    line-height:40px;
    font-size: 16px;
    .icon{
      width: 24px;
      height: 24px;
      overflow: hidden;
      margin-top: 9px;
    }
    .menuname{
    padding-left: 8px;
    border-top: 1px solid #EDEDED;
    }
  }
}
</style>
