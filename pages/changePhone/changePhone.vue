<template>
	<view class="change-phone" v-if="!confirmSuccess">
		<view class="phone-num input-box">
			<input class="input-text" type="number" disabled maxlength="11" v-model.trim="phoneSafe" placeholder="请输入手机号"/>
		</view>
		<view class="code-num input-box">
			<input class="input-text" type="number" maxlength="4" v-model.trim="smscode" placeholder="请输入验证码"/>
			<view class="get-code" @tap="getCode(userInfo.phoneNum,4)" :class="codeBtnShow?'':'colorGrey'">
				{{codeBtnShow?'获取验证码':'重新发送('+count+'秒)'}}
			</view>
		</view>
		<view class="confirm-btn" @tap="confirm">
			下一步
		</view>
	</view>
	<view class="change-phone" v-else>
		<view class="phone-num input-box">
			<input class="input-text" type="number" maxlength="11" v-model.trim="userInfo.newPhoneNum" placeholder="请输入新手机号"/>
		</view>
		<view class="code-num input-box">
			<input class="input-text" type="number" maxlength="4" v-model.trim="newsmscode" placeholder="请输入验证码"/>
			<view class="get-code" @tap="getCode(userInfo.newPhoneNum,3)" :class="codeBtnShow?'':'colorGrey'">
				{{codeBtnShow?'获取验证码':'重新发送('+count+'秒)'}}
			</view>
		</view>
		<view class="confirm-btn" @tap="changePhone">
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
					newPhoneNum:''
				},
				smscode:'',
				newsmscode:'',
				codeBtnShow:true,
				codeTimer:null,
				count:'',
				confirmSuccess:false,
			};
		},
		computed:{
			phoneSafe(){
				return this.userInfo.phoneNum.substr(0,3)+"****"+this.userInfo.phoneNum.substr(7);
			}
		},
		onLoad(e) {
			this.userInfo.phoneNum = e.phone;
		},
		methods:{
			getCode(phone,type){
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
							mobile:phone,
							smstype:type
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
						}
					)
				}
				
			},
			confirm(){
				uni.showLoading({
					title:'验证手机号中...',
					mask:true
				})
				this.$uniRequest(
					this.$baseUrl+'/v1/sms/checkValidate',
					{
						mobile:this.userInfo.phoneNum,
						smstype:4,
						smscode:this.smscode
					},
					(res)=>{
						if(res.data.code == 200){
							uni.showToast({
								title:'手机号验证成功',
								mask:true,
								duration:1000,
								success: () => {
									this.codeBtnShow = true;
									this.confirmSuccess = true;
									clearInterval(this.codeTimer);     
									this.codeTimer = null;
								}
							})
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
					}
				)
			},
			changePhone(){
				if(this.userInfo.newPhoneNum.length != 11){
					uni.showToast({
						title:'请输入正确的11位手机号码',
						icon:'none'
					})
					return false;
				}
				uni.showLoading({
					title:'修改中',
					mask:true
				})
				this.$uniRequest(
					this.$baseUrl+'/v1/member/changeMobile',
					{
						mobile:this.userInfo.newPhoneNum,
						smscode:this.newsmscode
					},
					(res)=>{
						if(res.data.code == 200){
							uni.showToast({
								title:'手机号码换绑成功',
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
							uni.showToast({
								title:"手机号码修改失败",
								icon:'none'
							})
						}
					}
				)
			}
		}
	}
</script>

<style lang="less">
	@import './changePhone.less';
</style>
