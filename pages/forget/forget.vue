<template>
	<view class="forget">
		<view class="phone-num input-box">
			<input class="input-text" type="number" maxlength="11" v-model.trim="userInfo.phoneNum" placeholder="请输入手机号"/>
		</view>
		<view class="code-num input-box">
			<input class="input-text" type="number" maxlength="4" v-model.trim="smscode" placeholder="请输入验证码"/>
			<view class="get-code" @tap="getCode" :class="codeBtnShow?'':'colorGrey'">
				{{codeBtnShow?'获取验证码':'重新发送('+count+'秒)'}}
			</view>
		</view>
		<view class="password input-box">
			<input class="input-text" type="password" v-model.trim="userInfo.password" placeholder="请输入新密码"/>
		</view>
		<view class="repeat-password input-box">
			<input class="input-text" type="password" v-model.trim="userInfo.repassword" placeholder="请再次输入新密码"/>
		</view>
		<view class="confirm-btn" @tap="confirm">
			确认
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{
					phoneNum:'',
					password:'',
					repassword:''
				},
				checked:false,
				inviteCode:'',
				smscode:'',
				codeBtnShow:true,
				codeTimer:null,
				count:''
			};
		},
		methods:{
			getCode(){
				if(this.codeBtnShow){
					if(this.userInfo.phoneNum == ''){
						uni.showToast({
							title:'手机号不能为空',
							icon:'none'
						})
						return false;
					}
					this.$uniRequest(
						this.$baseUrl+'/v1/sms/send',
						{
							mobile:this.userInfo.phoneNum,
							smstype:2
						},
						(res)=>{
							if(res.data.code == 200){
								uni.showToast({
									title:res.data.msg,
									success: () => {
										this.codeBtnShow = false;
										const TIME_COUNT = 60;
										if (!this.codeTimer) {    
											this.count = TIME_COUNT;    
											this.codeBtnShow = false;    
											this.codeTimer = setInterval(() => {    
												if (this.count > 0 && this.count <= TIME_COUNT) {     
													this.count--;     
												} else {     
													this.codeBtnShow = true;     
													clearInterval(this.codeTimer);     
													this.codeTimer = null;     
												}    
											}, 1000)    
										}  
									}
								})
							}else{
								uni.showToast({
									title:res.data.msg,
									icon:'none'
								})
							}
						},
						true
					)
				}
				
			},
			confirm(){
				uni.showLoading({
					title:'重置密码中',
					mask:true
				})
				this.$uniRequest(
					this.$baseUrl+'/v1/login/resetPassword',
					{
						mobile:this.userInfo.phoneNum,
						member_pass:this.userInfo.password,
						smscode:this.smscode
					},
					(res)=>{
						if(res.data.code == 200){
							uni.showToast({
								title:'密码重置成功',
								mask:true,
								duration:1000,
								success: () => {
									setTimeout(()=>{
										uni.navigateBack()
									},1000)
								}
							})
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
					},
					true
				)
			}
		}
	}
</script>

<style lang="less">
	@import './forget.less';
</style>
