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
	}
}