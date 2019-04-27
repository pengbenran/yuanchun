import * as API from './base'
export default {
	// 提交订单
	OrderSave(params){
		return API.POST('/api/order/save',params)
	},
	// 微信支付
	ConfirmPay(params){
		return API.POST('/api/pay/prepay',params)
	},
	// 支付成功后修改订单状态
	PaypassOrder(params){
		return API.POST('/api/order/passOrder',params)
	},
	// 查询订单列表
	getOrderList(params){
		return API.GET('/api/order/orderList',params)
	},

	giftUser(params){
		return API.POST('/api/order/giftUser',params)
	},
	// 领取新人礼修改状态
	giftUserPass(params){
		return API.POST('/api/order/giftUserPass',params)	
	},
	// 取消订单
	cancelOrder(params){
		return API.PUT('/api/order/cancel',params)
	},
	// 查询物流
	getLogistics(params){
		return API.GET('/api/order/logistics',params)
	}
}