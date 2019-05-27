<template>
	<view class="change-name">
		<view class="input-box">
			<input class="input-text" type="text" focus v-model.trim="inputText" placeholder="请输入昵称" />
			<i class="clear" @tap="clearText" v-if="this.inputText != ''"></i>
		</view>
		<view class="tips">
			<text>昵称长度为6-20个字符,1个汉字算2个字符</text>
			<text>{{ByteLen}}/20</text>
		</view>
		<view class="confirm" @tap="changeName">
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
			this.inputText = this.userInfo.nickname;
		},
		methods: {
			clearText(){
				this.inputText = ''
			},
			changeName(){
				if(this.ByteLen > 20 || this.ByteLen < 6){
					uni.showToast({
						title:'昵称长度为6-20个字符',
						icon:'none'
					})
					return false;
				}
				if(this.inputText == this.userInfo.nickname){
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
						nickname:this.inputText
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
						}else{
							console.log(res.data.msg)
						}
					},
					false
				)
				
			}
		}
	}
</script>

<style lang="less">
	@import './changeName.less';
</style>
