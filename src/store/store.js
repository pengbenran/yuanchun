import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
 
export default new Vuex.Store({
  state:{
  	userInfo:{},
  	config:{},
    goodItem:{},
    codeUnionid:'',
    personGift:[],
    orderStatus:{},
    goodsId:'',
    orderDetail:{}
  },
  mutations:{
   storeUserInfo(state,userInfo){
   	state.userInfo=userInfo
   },
   stateGoodItem(state,goodItem){
    state.goodItem=goodItem
   },
   statecodeUnionid(state,codeUnionid){
    state.codeUnionid=codeUnionid
   },
    stategoodsid(state,goodsId){
    state.goodsId=goodsId
   },
   stateNewPersonGift(state,personGift){
    state.personGift=personGift
   },
   stateOrderStatus(state,orderStatus){
    state.orderStatus = orderStatus
   },
   stateOrderDetail(state,orderDetail){
     state.orderDetail = orderDetail
   }
}
})