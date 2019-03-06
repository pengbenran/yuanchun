import * as API from './base'
export default {
	// 提交订单
	OrderSave(params){
		return API.POST('/api/order/save',params)
	},
	// 微信支付
	ConfirmPay(params){
		return API.POST('/api/pay/prepay',{params:JSON.stringify(params)})
	},
	// 支付成功后修改订单状态
	PaypassOrder(params){
		return API.POST('/api/order/passOrder',params)
	},
	// 查询订单列表
	getOrderList(params){
		return API.GET('/api/order/orderList',params)
	},
	// 查询订单数量
	getorderCount(params){
		return API.GET('/api/member/allCount',params)
	}
}