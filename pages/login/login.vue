<template>
	<view class="login">
		<view class="phone-num input-box">
			<input class="input-text" type="text" v-model.trim="userInfo.phoneNum" placeholder="请输入手机号"/>
		</view>
		<view class="password input-box">
			<input class="input-text" type="password" v-model.trim="userInfo.password" placeholder="请输入密码"/>
		</view>
		<view class="section-box">
			<view class="remember">
				<label class="checkbox">
					<checkbox value="" :checked="checked" @tap="this.checked = !this.checked"/>
				</label>
				<text>记住密码</text>
			</view>
			<view class="forget" @tap="toForget">
				忘记密码
			</view>
		</view>
		<view class="btns">
			<view class="btn register-btn" @tap="toRegister">
				注册
			</view>
			<view class="btn login-btn" @tap="login">
				登录
			</view>
		</view>
	</view>
</template>

<script>
	var backpage,backtype;
	export default {
		data() {
			return {
				userInfo:{
					phoneNum:'',
					password:''
				},
				checked:true,
			};
		},
		onLoad(e){
			backpage = e.backpage;
			backtype = e.backtype;
			var userInfo = uni.getStorageSync("USERINFO");
			if(userInfo){
				this.userInfo = JSON.parse(userInfo)
			}
			
		},
		methods:{
			login(){
				uni.showLoading({
					title:"登录中..",
					mask:true
				})
				this.$uniRequest(
					this.$baseUrl+'/v1/login/doLogin',
					{
						mobile:this.userInfo.phoneNum,
						member_pass:this.userInfo.password
					},
					(res)=>{
						if(res.data.code == 200){
							uni.hideLoading();
							uni.showToast({
								title:"登录成功",
								mask:true,
								duration:1500
							})
							uni.setStorage({
								key:"TOKEN",
								data:res.data.data.token
							})
							if(this.checked){
								uni.setStorage({
									key:"USERINFO",
									data:JSON.stringify(this.userInfo)
								})
							}
							setTimeout(()=>{
								if(!backpage){
									uni.switchTab({
										url:'/pages/mine/mine'
									});
								}else{
									if(backtype == 1){
									    uni.redirectTo({url:backpage});
									}else{
									    uni.switchTab({url:backpage});
									}
								}
							},1500)
						}else{
							uni.hideLoading();
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
					},
					true
				)
			},
			toRegister(){
				uni.navigateTo({
					url:'/pages/register/register'
				})
			},
			toForget(){
				uni.navigateTo({
					url:'/pages/forget/forget'
				})
			}
		}
	}
</script>

<style lang="less">
	@import "./login.less";
</style>
