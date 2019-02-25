import * as API from './base'
export default {
	// 获取商品分类
	getGoodCat(){
		return API.GET('/api/Goods/getFirstGoodCat')
	},
	// 获取分类下的商品数据
	getGoodsAll(params){
		return API.GET('/api/Goods/getGoodsAll',params)
	},
	// 根据商品ID获取商品详情
	getGoodsInfo(params){
		return API.GET('/api/Goods/getGoods',params)
	},
	// 商品收藏
	addCollection(params){
		return API.POST('/api/favorite/add',params)
	},
	// 取消收藏
	delCollection(params){
		return API.POST('/api/favorite/delete',params)
	},
	// 添加购物车
	toCartSave(params){
		return API.POST('/api/shoppingCart/save',params)
	},
	// 获取购物车详情
	getCartList(params){
		return API.GET('/api/shoppingCart/select',params)
	},
	//购物车所有订单数量加减
    CartOrderNum(params){
      return API.PUT('/api/shoppingCart/modification',params)
    },
    //购物车商品删除
    CartOrderDele(parms){
      return API.POST('/api/shoppingCart/deleteAll',params)   
    }
}