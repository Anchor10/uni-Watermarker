<template>
	<view class="register">
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
			<input class="input-text" type="password" v-model.trim="userInfo.password" placeholder="请输入密码"/>
		</view>
		<view class="invite-code input-box">
			<input class="input-text" type="text" v-model.trim="inviteCode" placeholder="请输入邀请码（选填）"/>
		</view>
		<view class="agreement">
			<label class="checkbox">
				<checkbox value="" :checked="checked" @tap="this.checked = !this.checked"/>
			</label>
			<view class="agreement-text">
				我同意
				<text @tap="agreementShow">《用户协议》</text>
			</view>
		</view>
		<view class="register-btn" @tap="register">
			立即注册
		</view>
		<view class="agreement-bg" v-show="agreeShow" @tap="agreeShow = !agreeShow">
			<view class="agreement-box">
				<view class="agreement-title">{{agreement.title}}</view>
				<view class="agreement-content">
					<rich-text name="view" :nodes="agreement.content"></rich-text>
				</view>
				<view class="close"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{
					phoneNum:'',
					password:''
				},
				checked:true,
				inviteCode:'',
				smscode:'',
				codeBtnShow:true,
				codeTimer:null,
				count:'',
				agreement:{
					title:'',
					content:''
				},
				agreeShow:false
			};
		},
		onLoad(){
			this.agreementInit();
		},
		methods:{
			formatP(html){
				var newContent = html.replace(/font-size:18px/gi,'font-size:12px;line-height:1.2!important;')
				return newContent;
			},
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
							smstype:1
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
			register(){
				if(this.checked == false){
					uni.showToast({
						title:'必须统一用户协议才能注册',
						icon:'none'
					})
					return false;
				}
				uni.showLoading({
					title:'注册中',
					mask:true
				})
				this.$uniRequest(
					this.$baseUrl+'/v1/register/doRegister',
					{
						mobile:this.userInfo.phoneNum,
						member_pass:this.userInfo.password,
						smscode:this.smscode,
						invite_code:this.inviteCode
					},
					(res)=>{
						if(res.data.code == 200){
							uni.showToast({
								title:'注册成功',
								mask:true,
								duration:1000,
								success: () => {
									try {
										uni.setStorageSync('TOKEN', res.data.data.token);
										uni.switchTab({
											url:'/pages/mine/mine'
										})
									} catch (e) {
										uni.showToast({
											title:'跳转失败,请手动登录',
											duration:1000
										})
										return false;
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
			},
			agreementShow(){
				this.agreeShow = true;
			},
			agreementInit(){
				this.$uniRequest(
					this.$baseUrl+'/v1/system/appinit',
					0,
					(res)=>{
						if(res.data.code == 200){
							var data = res.data.data;
							this.agreement.title = data.agreement.title;
							this.agreement.content = this.formatP(data.agreement.content);
						}
					},
					true
				)
			}
		}
	}
</script>

<style lang="less">
	@import './register.less';
</style>
