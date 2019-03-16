<template>
	<div class="logistics">
		<div class="header">
			<div class="img">
				<img src="/static/images/indexlist.png">
			</div>
			<div class="detail">
				<p class="title fontHidden">集散地放假啊soID发奇偶按实际坚实的佛家搜房祭扫打飞机扫</p>
				<p class="priceNum"><span>￥17.9</span><span>X1</span></p>
			</div>
		</div>
		<div class="logisticsCompany">
			<div class="companyName">{{logisticsCompany}}</div>
			<div class="logisticsNo">运单编号:{{shipNo}} &nbsp;&nbsp;<span class="copy">复制</span></div>
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
				shipNo:''
			}
		},
		components:{
			
		},
		methods:{
		getLogistics(){
			let that=this
			let params={}
			params.orderId=299
			Api.getLogistics(params).then(function(res){
				that.logisticsCompany=res.com
				that.express=res.express
				that.shipNo=res.shipNo
			})
		}
			
	
		},
		mounted(){
			let that=this
			that.getLogistics()
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
		display: flex;
		justify-content: space-between;
		border-bottom: 8px solid #F1F1F1;
		padding: 5px;
		box-sizing: border-box;
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