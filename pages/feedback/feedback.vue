<template>
	<view class="feedback">
		<view class="text-box">
			<textarea class="input-text" maxlength='-1' focus=true placeholder-style="color:#999999;" placeholder="请填写意见反馈内容" v-model.trim="content" />
		</view>
		<view class="number">
			<input class="number-text" type="text" value="" placeholder-style="color:#999999;" placeholder="QQ/邮箱/手机号" v-nodel.trim="contact" />
		</view>
		<view class="submit" @tap="feedback">
			提交
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				content:'',
				contact:''
			};
		},
		methods:{
			feedback(){
				this.$uniRequest(
					this.$baseUrl+'/v1/member/feedback',
					{
						content:this.content,
						contact:this.contact
					},
					(res)=>{
						if(res.data.code == 200){
							uni.showToast({
								title:res.data.msg,
								mask:true,
								success:()=>{
									setTimeout(()=>{
										uni.navigateBack()
									},1000)
								}
							})
						}else{
							uni.showToast({
								title:'内容不能为空',
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
	@import './feedback.less';
</style>
