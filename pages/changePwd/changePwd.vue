<template>
	<view class="change-pwd">
		<view class="password input-box">
			<input class="input-text" focus=true type="password" maxlength="11" v-model.trim="userInfo.password" placeholder="请输入旧密码"/>
		</view>
		<view class="new-password input-box">
			<input class="input-text" type="password" maxlength="11" v-model.trim="userInfo.newPassword" placeholder="请输入新密码"/>
		</view>
		<view class="new-repassword input-box">
			<input class="input-text" type="password" v-model.trim="userInfo.newRepassword" placeholder="请再次输入新密码"/>
		</view>
		<view class="change-pwd-btn" @tap="changePwd">
			确认
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{
					password:'',
					newPassword:'',
					newRepassword:''
					
				}
			};
		},
		methods:{
			changePwd(){
				if(this.userInfo.newPassword != this.userInfo.newRepassword){
					this.userInfo.newPassword = '';
					this.userInfo.newRepassword = '';
					uni.showToast({
						title:'两次输入密码不一致',
						icon:'none'
					})
					return false;
				}
				if(this.userInfo.newPassword.length < 6 || this.userInfo.newPassword.length >20){
					this.userInfo.newPassword = '';
					this.userInfo.newRepassword = '';
					uni.showToast({
						title:'新密码长度应为6-20字符',
						icon:'none'
					})
					return false;
				}
				uni.showLoading({
					title:'修改密码中',
					mask:true
				})
				this.$uniRequest(
					this.$baseUrl+'/v1/member/editPsw',
					{
						old_pwd:this.userInfo.password,
						new_pwd:this.userInfo.newPassword
					},
					(res)=>{
						if(res.data.code == 200){
							uni.showToast({
								title:'密码修改成功',
								mask:true,
								duration:1000,
								success: () => {
									setTimeout(()=>{
										uni.switchTab({
											url:'/pages/mine/mine'
										})
									},1000)
								}
							})
						}else{
							this.userInfo.password = '';
							uni.showToast({
								title:"原密码错误",
								icon:'none'
							})
						}
					},
					false
				)
			}
		}
	}
</script>

<style lang="less">
	@import './changePwd.less';
</style>
