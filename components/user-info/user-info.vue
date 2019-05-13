<template>
	<view class="logo" @tap="toUserInfo">
		<image class="logo-img" :src="userInfo.avatar ||avatarUrl"></image>
		<view class="logo-title">
			<view class="user-name">{{login ? userInfo.nickname : '点击登录'}}
				<image class="vip-icon" :src="vipIcon" mode="" v-if="login"></image>
			</view>
			<view class="score" v-if="login">
				剩余解析次数：<text>{{userInfo.parse_times}}</text>次
			</view>
			<view class="vip-date" v-if="login && (userInfo.vip_end_time != null)">
				会员到期时间：<text>{{endDate}}</text>
			</view>
		</view>
		<text class="icon2"></text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		props:{
			userInfo: Object,
			token:String
		},
		computed:{
			login(){
				if(this.token != ""){
					return true;
				}else{
					return false;
				}
			},
			avatarUrl(){
				if(this.token != ""){
					return '../../static/images/avater.png'
				}else{
					return '../../static/images/nologin.png'
				}
			},
			vipIcon(){
				if(this.userInfo.vip_end_time != null){
					return '../../static/images/isvip.png'
				}else{
					return '../../static/images/novip.png'
				}
			},
			endDate(){
				if(this.userInfo.vip_end_time != null){
					var date = new Date().getTime();
					date = Math.floor(date/1000)+this.userInfo.vip_end_time
					date = date*1000;
					var newDate = new Date(date)
					var nYear = newDate.getFullYear();
					var nMonth = (newDate.getMonth() + 1);
					var nDate = newDate.getDate();
					nMonth = nMonth<10?'0'+nMonth:nMonth;
					nDate = nDate<10?'0'+nDate:nDate;
					return nYear + "." + nMonth + "." + nDate;
				}
			}
		},
		methods:{
			toUserInfo(){
				var loginRes = this.$checkLogin('/pages/mine/mine',2);
				if(!loginRes){return false;}
				uni.navigateTo({
					url:"/pages/userInfo/userInfo?info="+JSON.stringify(this.userInfo)
				})
			}
		}
	}
</script>

<style lang="less">
	.logo {
		width: 750upx;
		height: 200upx;
		padding: 20upx 32upx;
		box-sizing: border-box;
		background-color: #fff;
		flex-direction: row;
		align-items: center;
		display: flex;
	}
	
	.logo-img {
		width: 122upx;
		height: 122upx;
		border-radius: 50%;
	}
	
	.logo-title {
		display: flex;
		height: 150upx;
		flex: 1;
		flex-direction: column;
		align-items: left;
		justify-content: center;
		margin-left: 20upx;
		.user-name {
			line-height: 44upx;
			font-size: 38upx;
			color: #1f1F1f;
			font-size: 28upx;
			font-weight: bold;
			.vip-icon{
				width: 44upx;
				height: 44upx;
				vertical-align: middle;
				margin-left: 20upx;
			}
		}
		.score{
			font-size: 28upx;
			color: #1F1F1F;
			line-height: 44upx;
			text{
				margin-left: 10upx;
			}
		}
		.vip-date{
			font-size: 28upx;
			color: #1F1F1F;
			line-height: 44upx;
			text{
				margin-left: 10upx;
			}
		}
	}
	
	
	
	.login-title {
		height: 150upx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20upx;
	}
	/*右箭头*/
	.icon2 {
		display: block;
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		background: url(../../static/images/arrow-right.png) center center no-repeat;
		background-size: 32upx 32upx;
		color: #555;
		text-align: right;
	}
</style>
