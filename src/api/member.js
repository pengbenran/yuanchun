	import * as API from './base'
	// 查询订单数量
	export default {
		getorderCount(params){
			return API.GET('/api/member/allCount',params)
		},
		selectSubordinate(params){
			return API.GET('/api/place/selectSubordinate',params)
		},

		//用户提现
		userBalancePay(params){
			return API.POST('/api/distribe/submitDistribeApply',params)
		},

		//用户提现记录
		userPayList(params){
			return API.GET('/api/distribe/accountManagement',params)
		},	
	}