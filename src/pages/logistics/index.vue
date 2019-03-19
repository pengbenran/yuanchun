<template>
	<div class="logistics">
		<div class="logisticsHeader">
			<div  class="orderList" v-for="(item,index) in itemsJson" :index="index" :key="item">	
				<div class="img">
					<img :src="item.image">
				</div>
				<div class="detail">
					<p class="title fontHidden">{{item.name}}</p>
					<p class="priceNum"><span>￥{{item.price}}</span><span>X{{item.num}}</span></p>
				</div>
			</div>
			
		</div>
		<div class="logisticsCompany">
			<div class="companyName">{{logisticsCompany}}</div>
			<div class="logisticsNo">运单编号:{{shipNo}} &nbsp;&nbsp;<span class="copy" @click="copy">复制</span></div>
		</div>
		<div class="logisticsDetil">
			<div class="logisticsTitle">
				物流信息
			</div>
			<ul class="conent">
				<li class="list" v-for="(item,index) in express" :key="item" :index="index">
					<div class="left">
						<p class="top"></p>
						<p class="center"></p>
						<p class="bottom"></p>
					</div>
					<div class="right">
						<p class="intro fontHidden">{{item.context}}</p>
						<p class="time">{{item.time}}</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import Api from "@/api/order"
	export default{
		data(){
			return{
				logisticsCompany:'',
				express:[],
				shipNo:'',
				itemsJson:[],
				orderId:''
			}
		},
		components:{
			
		},
		methods:{
		getLogistics(orderId){
			let that=this
			let params={}
			params.orderId=orderId
			Api.getLogistics(params).then(function(res){
				that.logisticsCompany=res.com
				that.express=res.express
				that.shipNo=res.shipNo
			})
		},
		copy(){
			let that=this
			wx.setClipboardData({
				data:that.shipNo,
				success: function(res) {

				}
			})
		}
		},
		mounted(){
			let that=this
			that.orderId=that.$root.$mp.query.orderId
			that.itemsJson=JSON.parse(that.$root.$mp.query.itemsJson) 
			that.getLogistics(that.orderId)
		}
	}
</script>
<style scoped lang="less">
	img{
		width: 100%;
		height: 100%;
		display: block;
	}
	.logisticsHeader{
		border-bottom: 8px solid #F1F1F1;
		padding: 5px;
		box-sizing: border-box;
		.orderList{
			display: flex;
			justify-content: space-between;
			margin-bottom: 5px;
			.img{
				width: 100px;
				height: 100px;
				border: 1px solid #ddd;
				overflow: hidden;
			}
			.detail{
				flex-grow: 1;
				display: flex;
				flex-direction:column;
				justify-content: space-around;
				.title{
					width:250px;
					font-size: 16px;
					padding:5px;
					box-sizing: border-box; 
				}
				.priceNum{
					font-size: 16px;
					display: flex;
					justify-content: space-between;
					padding: 0 10px;
				}
			}
		}
	}
	.logisticsCompany{
		border-bottom: 8px solid #F1F1F1;
		padding:0 20px;
		div{
			height: 40px;
			line-height:40px;
		}
		.logisticsNo{
			color:#848484;
			font-size: 16px;
			.copy{
				width: 60px;
				height: 30px;
				line-height:30px;
				display: inline-block;
				text-align: center;
				border:1px solid #ddd;
				border-radius: 15px;
				color: #363636;
			}
		}
	}
	.logisticsDetil{
		.logisticsTitle{
			height: 40px;
			line-height:40px;
			padding-left:20px; 
		}
		ul{
			li{
				height:100px; 
				display: flex;
				.left{
					width: 100px;
					.top,.bottom{
						margin: 0 auto;
						width: 1px;
						background: #8F8D8E;
						height: 47px;
					}
					.center{
						width: 10px;
						height: 10px;
						border-radius:50%;
						background: #8F8D8E;
						margin: 0 auto;
					}
				}
				.right{
					flex-grow: 1;
					color:#8F8D8E;
					font-size: 16px;
					border-bottom:1px solid #ddd;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					.intro{
						width: 240px;
					}
				}
				&:nth-child(1){
					.left{
						.top{
							width:0;

						}
						.center{
						    box-shadow: 0px 0px 25px #4D866C;
							background:#4D866C;
							width: 15px;
							height: 15px;
						}
					}
					.right{
						color:#4D866C;
					}
				}
				&:last-child{
					.left{
						.bottom{
							width:0;
						}
					}
				}	
			}
			
		}
		
	}
</style>