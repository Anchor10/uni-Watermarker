<template>
	<view class="change-sign">
		<view class="input-box">
			<textarea class="input-text" maxlength='60' focus=true placeholder-style="color:#999999;" placeholder="请输入个性签名" v-model.trim="inputText" />
			<i class="clear" @tap="clearText" v-if="this.inputText != ''"></i>
		</view>
		<view class="tips">
			<text>签名长度为0-50个字符,1个汉字算2个字符</text>
			<text>{{ByteLen}}/50</text>
		</view>
		<view class="confirm" @tap="changeSign">
			提交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputText:'',
				userInfo:{}
			};
		},
		computed:{
			ByteLen() {
				var len = 0;
				for (var i = 0; i < this.inputText.length; i++) {
					var a = this.inputText.charAt(i);
					if (a.match(/[^\x00-\xff]/ig) != null) {
						len += 2;
					} else {
						len += 1;
					}
				}
				return len;
			}
		},
		onLoad(e) {
			this.userInfo = JSON.parse(e.info)
			this.inputText = this.userInfo.signature;
		},
		methods: {
			clearText(){
				this.inputText = ''
			},
			changeSign(){
				if(this.ByteLen > 50 || this.ByteLen < 0){
					uni.showToast({
						title:'昵称长度为0-50个字符',
						icon:'none'
					})
					return false;
				}
				if(this.inputText == this.userInfo.signature){
					uni.showToast({
						title:'与原昵称相同',
						icon:'none'
					})
					return false;
				}
				this.$uniRequest(
					this.$baseUrl+'/v1/member/edit',
					{
						birthday:this.userInfo.birthday,
						sex:this.userInfo.sex,
						nickname:this.userInfo.nickname,
						signature:this.inputText
					},
					(res)=>{
						if(res.data.code == 200){
							uni.showToast({
								title:'修改成功',
								mask:true
							})
							setTimeout(()=>{
								uni.navigateBack();
							},1000)
						}
					},
					false
				)
				
			}
		}
	}
</script>

<style lang="less">
	@import './changeSign.less';
</style>
