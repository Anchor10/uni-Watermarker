<template>
	<view class="setting">
		<view class="center-list">
			<view class="center-list-item" @tap="toAbout">
				<text class="list-text">关于我们</text>
				<text class="icon2"></text>
			</view>
		</view>
		<view class="login-out" @tap="loginOut">
			退出
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			toAbout(){
				uni.navigateTo({
					url:'/pages/about/about'
				})
			},
			loginOut(){
				uni.showModal({
					title: '提示',
					content: '确定要退出嘛',
					success: (res)=> {
						if (res.confirm) {
							try {
								uni.removeStorageSync('TOKEN');
								uni.showToast({
									title:'退出成功',
									icon:'none',
									mask:true
								})
								setTimeout(()=>{
									uni.switchTab({
										url:'/pages/mine/mine'
									})
								},1000)
							} catch (e) {
								uni.showToast({
									title:'退出失败',
									icon:'none',
									mask:true
								})
							}
						} else if (res.cancel) {
							uni.showToast({
								title:'取消退出',
								icon:'none'
							})
						}
					}
				});
				
			}
		}
	}
</script>

<style lang="less">
	@import './setting.less';
</style>
