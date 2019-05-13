<template>
	<view class="security">
		<view class="center-list">
			<view class="center-list-item" @tap="toChangePwd">
				<text class="list-text">修改密码</text>
				<text class="icon2"></text>
			</view>
			<view class="center-list-item" @tap="toChangePhone">
				<text class="list-text">更换手机号</text>
				<text class="icon2"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNum:''
			};
		},
		onLoad(e) {
			this.phoneNum = e.num;
		},
		methods:{
			toChangePwd(){
				uni.navigateTo({
					url:'/pages/changePwd/changePwd'
				})
			},
			toChangePhone(){
				uni.navigateTo({
					url:'/pages/changePhone/changePhone?phone='+this.phoneNum
				})
			}
		}
	}
</script>

<style lang="less">
	@import './security.less';
</style>
