<template>
	<view class="user-info">
		<view class="change-avatar" @tap="changeAvatar">
			<image class="avatar-url" :src="userInfo.avatar || avatarUrl" mode=""></image>
			<view class="avatar-btn">
				点击更换头像
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item" @tap="changeName">
				<text class="list-title">昵称</text>
				<text class="list-text">{{userInfo.nickname}}</text>
				<text class="icon2"></text>
			</view>
			<view class="center-list-item" @tap="changeBirthday">
				<text class="list-title">生日</text>
				<text class="list-text">{{userInfo.birthday}}</text>
				<text class="icon2"></text>
			</view>
			<view class="center-list-item" @tap="changeSign">
				<text class="list-title">签名</text>
				<text class="list-text line-height-sm">{{userInfo.signature}}</text>
				<text class="icon2"></text>
			</view>
			<view class="center-list-item" @tap="changeSex">
				<text class="list-title">性别</text>
				<text class="list-text">{{userInfo.sex | sexName}}</text>
				<text class="icon2"></text>
			</view>
		</view> 
		<w-picker mode="date" startYear="1900" endYear="2015" :defaultVal="value" @confirm="onConfirm" ref="picker" themeColor="#f00"></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		data() {
			return {
				userInfo:{},
				avatarUrl:'../../static/images/avater.png',
				token:'',
			};
		},
		computed:{
			value(){
				var birthday = this.userInfo.birthday
				var arr = [];
				if(birthday){
					arr = birthday.split('-')
					arr[0] = arr[0]-1900;
					arr[1] = arr[1]-1;
					arr[2] = arr[2]-1;
				}
				return arr;
				
			}
		},
		filters:{
			sexName(value){
				if(value == 1){
					return '男';
				}else if(value == 2){
					return '女'
				}else{
					return '保密'
				}
			}
		},
		onShow(){
			const value = uni.getStorageSync('TOKEN');
			if (value) {
				this.token = value;
				this.getUserInfo();
			}else{
				this.token = '';
				this.userInfo = {}
			}
		},
		onLoad(e) {
			this.userInfo = JSON.parse(e.info)
			uni.getStorage({
				key: 'TOKEN',
				success: (res)=> {
					this.token = res.data
				}
			});
		},
		methods:{
			getUserInfo(){
				this.$uniRequest(
					this.$baseUrl+'/v1/member/info',
					0,
					(res)=>{
						this.userInfo = res.data.data;
					},
					false
				)
			},
			changeAvatar(){
				uni.chooseImage({
					count: 1, //默认9
					sourceType: ['album', 'camera'], //从相册选择
					sizeType: ['compressed'],
					success: (img)=> {
						var avatar = img.tempFilePaths[0];
						uni.redirectTo({
							url: '/pages/upload/upload?src=' + avatar
						});

					}
				});
			},
			changeName(){
				uni.navigateTo({
					url:'/pages/changeName/changeName?info='+ JSON.stringify(this.userInfo)
				})
			},
			changeBirthday(){
				this.$refs.picker.show();
			},
			changeSign(){
				uni.navigateTo({
					url:'/pages/changeSign/changeSign?info='+ JSON.stringify(this.userInfo)
				})
			},
			changeSex(){
				uni.showActionSheet({
					itemList: ['保密', '男', '女'],
					success: (item)=> {
						this.$uniRequest(
							this.$baseUrl+'/v1/member/edit',
							{
								birthday:this.userInfo.birthday,
								sex:item.tapIndex,
								nickname:this.userInfo.nickname
							},
							(res)=>{
								console.log(res)
								this.userInfo.sex = item.tapIndex;
								uni.showToast({
									title:res.data.msg
								})
							},
							false
						)
					},
					fail: (res)=> {
						uni.showToast({
							title:"未修改成功,请重试",
							icon:'none'
						})
					}
				});
			},
			onConfirm(val){
				this.$uniRequest(
					this.$baseUrl+'/v1/member/edit',
					{
						birthday:val.result,
						sex:this.userInfo.sex,
						nickname:this.userInfo.nickname
					},
					(res)=>{
						this.userInfo.birthday = val.result;
						uni.showToast({
							title:res.data.msg
						})
					},
					false
				)
			}
		},
		components: {
			wPicker
		}
	}
</script>

<style lang="less">
	@import './userInfo.less';
</style>
