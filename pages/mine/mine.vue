<template>
	<view class="center">
		<view class="blue-top">
			<view class="user-card">
				<view class="card-top">
					<view class="user-top" @tap="toUserInfo">
						<image class="user-pic" :src="userInfo.avatar ||avatarUrl" mode=""></image>
						<view class="user-board">
							<text class="user-name">{{login ?userInfo.nickname : '点击登录'}}</text>
							<image class="vip-icon" :src="vipIcon" mode="" v-if="login"></image>
						</view>
					</view>
				</view>
				<view class="card-bottom">
					<view class="left">
						<view class="count">
							<text class="num">{{userInfo.parse_times || '-'}}</text>
						</view>
						<text class="txt">今日剩余解析次数</text>
					</view>
					<view class="right">
						<view class="count">
							<text class="num">{{endDate}}</text>
						</view>
						<text class="txt">{{login&&!userInfo.vip_end_time?'专享无限解析次数':'会员到期时间'}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="logo" @tap="toUserInfo">
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
		</view> -->
		<view class="center-list">
			<view class="center-list-item" @tap="toRecharge">
				<text class="icon1 recharge-icon"></text>
				<text class="list-text">我要充值</text>
				<text class="icon2"></text>
			</view>
			<view class="center-list-item" @tap="toInvite">
				<text class="icon1 invite-icon"></text>
				<text class="list-text">邀请有礼</text>
				<text class="icon2"></text>
			</view>
			<view class="center-list-item" @tap="toSecurity">
				<text class="icon1 security-icon"></text>
				<text class="list-text">账号安全</text>
				<text class="icon2"></text>
			</view>
			<view class="center-list-item" @tap="toFeedback">
				<text class="icon1 feedback-icon"></text>
				<text class="list-text">意见反馈</text>
				<text class="icon2"></text>
			</view>
			<view class="center-list-item" @tap="toSetting">
				<text class="icon1 setting-icon"></text>
				<text class="list-text">设置</text>
				<text class="icon2"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				token:''
			}
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
					if(newDate.getFullYear() >= 2050){
						return '永久';
					}
					return newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
				}else if(this.login){
					return '开通VIP会员'
				}else{
					return '-';
				}
			}
		},
		onLoad() {
// 			uni.getStorage({
// 				key: 'TOKEN',
// 				success: (res)=> {
// 					this.token = res.data
// 				}
// 			});
		},
		onShow() {
			var value = uni.getStorageSync('TOKEN');
			if (value) {
				this.token = value;
				this.getUserInfo();
			}else{
				this.token = '';
				this.userInfo = {}
			}
		},
		methods: {
			toLogin(){
				var loginRes = this.$checkLogin('/pages/mine/mine',2);
				if(!loginRes){return false;}
			},
			toUserInfo(){
				var loginRes = this.$checkLogin('/pages/mine/mine',2);
				if(!loginRes){return false;}
				uni.navigateTo({
					url:"/pages/userInfo/userInfo?info="+JSON.stringify(this.userInfo)
				})
			},
			toRecharge(){
				var loginRes = this.$checkLogin('/pages/mine/mine',2);
				if(!loginRes){return false;}
// 				uni.navigateTo({
// 					url:"/pages/recharge/recharge"
// 				})
				uni.navigateTo({
					url:'/pages/downApp/downApp'
				})
			},
			toInvite(){
				var loginRes = this.$checkLogin('/pages/mine/mine',2);
				if(!loginRes){return false;}
				uni.navigateTo({
					url:"/pages/invite/invite?num="+this.userInfo.mobile
				})
			},
			toSecurity(){
				var loginRes = this.$checkLogin('/pages/mine/mine',2);
				if(!loginRes){return false;}
				uni.navigateTo({
					url:"/pages/security/security?num="+this.userInfo.mobile
				})
			},
			toFeedback(){
				var loginRes = this.$checkLogin('/pages/mine/mine',2);
				if(!loginRes){return false;}
				uni.navigateTo({
					url:"/pages/feedback/feedback"
				})
			},
			toSetting(){
				var loginRes = this.$checkLogin('/pages/mine/mine',2);
				if(!loginRes){return false;}
				uni.navigateTo({
					url:"/pages/setting/setting"
				})
			},
			getUserInfo(){
				this.$uniRequest(
					this.$baseUrl+'/v1/member/info',
					0,
					(res)=>{
						this.userInfo = res.data.data;
					}
				)
			}
		}
	}
</script>

<style lang="less">
	@import './mine.less';
</style>
