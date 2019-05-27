<template>
	<view class="page-index">
		<swiper id="swiper-box" circular=true :indicator-dots="true" indicator-active-color="#fff" indicator-color="#aaa"
		 :autoplay="true" :interval="3000" :duration="500">
			<swiper-item>
				<view class="swiper-item">
					<image class="banner-pic" src="../../static/images/banner1.png" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image class="banner-pic" src="../../static/images/banner2.png" mode="" @tap="toRecharge"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="analysis">
			<view class="input-box">
				<input type="text" v-model.trim="inputText" placeholder="将视频链接粘贴在此处">
				<i class="clear-icon" v-if="isShow" focus @tap="clearText"></i>
			</view>
			<view class="analysis-btn" @tap="getVideo">解析</view>
		</view>
		<!-- <video class="video-player" objectFit="contain" 
		src="https://v3-dy-x.ixigua.com/b9f1ef00e1d13a57da16eb3cd3b75df0/5ceb6d46/video/m/22084892466f74c4338bee95667a1ac1f8d1162282ff00004ae29edec8e0/?rc=M2VwbXBxZzhubTMzZ2kzM0ApQHRAb0k8OjwzNzU0NDs2NDo4PDNAKXUpQGczdSlAZjN2KUBmbGRqZXpoaGRmOzRAZTAubTViYmJnXy0tYy0wc3MtbyNvI0I0LzMzLTItLS4yLi8tLi9pOmIwcCM6YS1xIzpgLW8jbWwrYitqdDojLy5e#soft.svip8.vip.mp4" controls @error='errorShow'></video>
		<video class="video-player" objectFit="contain" 
		src="https://v3-dy-x.ixigua.com/b9f1ef00e1d13a57da16eb3cd3b75df0/5ceb6d46/video/m/22084892466f74c4338bee95667a1ac1f8d1162282ff00004ae29edec8e0/?rc=M2VwbXBxZzhubTMzZ2kzM0ApQHRAb0k8OjwzNzU0NDs2NDo4PDNAKXUpQGczdSlAZjN2KUBmbGRqZXpoaGRmOzRAZTAubTViYmJnXy0tYy0wc3MtbyNvI0I0LzMzLTItLS4yLi8tLi9pOmIwcCM6YS1xIzpgLW8jbWwrYitqdDojLy5e#soft.svip8.vip.mp4" controls @error='errorShow'></video>
		<video class="video-player" objectFit="contain" 
		src="https://v3-dy-x.ixigua.com/b9f1ef00e1d13a57da16eb3cd3b75df0/5ceb6d46/video/m/22084892466f74c4338bee95667a1ac1f8d1162282ff00004ae29edec8e0/?rc=M2VwbXBxZzhubTMzZ2kzM0ApQHRAb0k8OjwzNzU0NDs2NDo4PDNAKXUpQGczdSlAZjN2KUBmbGRqZXpoaGRmOzRAZTAubTViYmJnXy0tYy0wc3MtbyNvI0I0LzMzLTItLS4yLi8tLi9pOmIwcCM6YS1xIzpgLW8jbWwrYitqdDojLy5e#soft.svip8.vip.mp4" controls @error='errorShow'></video>
		<video class="video-player" objectFit="contain" 
		src="https://v3-dy-x.ixigua.com/b9f1ef00e1d13a57da16eb3cd3b75df0/5ceb6d46/video/m/22084892466f74c4338bee95667a1ac1f8d1162282ff00004ae29edec8e0/?rc=M2VwbXBxZzhubTMzZ2kzM0ApQHRAb0k8OjwzNzU0NDs2NDo4PDNAKXUpQGczdSlAZjN2KUBmbGRqZXpoaGRmOzRAZTAubTViYmJnXy0tYy0wc3MtbyNvI0I0LzMzLTItLS4yLi8tLi9pOmIwcCM6YS1xIzpgLW8jbWwrYitqdDojLy5e#soft.svip8.vip.mp4" controls @error='errorShow'></video> -->
		<view class="video-box" v-show="videoSuccess">
			<video class="video-player" objectFit="contain" :src="videoObj.video_url" controls :poster="videoObj.poster" @error='errorShow'></video>
			<view class="down-video" @tap="downVideo(videoObj.video_url)">{{downProgress}}</view> 
			
			<view class="down-tips">视频归平台及作者所有，本应用不储存任何视频或图片</view>
		</view>
		<view class="support-platform">
			<view class="section-title">支持平台</view>
			<view class="platform-list">
				<view class="platform-item" v-for="(item,index) of appList" :key="index">
					<image class="platform-pic" :src="item.thumbnail"></image>
					<text class="platform-name">{{item.name}}</text>
				</view>

			</view>
		</view>
		<view class="faq">
			<view class="how-get" @tap="toCourse">
				<text>如何获取视频链接</text>
				<i class="question-icon"></i>
			</view>
			<view class="section-title">常见问题答疑</view>
			<view class="faq-list">
				<view class="faq-item" v-for="(item2,index2) of faqList" :key="index2">
					<view class="faq-q"><span>Q:</span><text>{{item2.q}}</text></view>
					<view class="faq-a"><span>A:</span><text>{{item2.answer}}</text></view>
				</view>
			</view>
		</view>
		<view class="relief">
			视频归平台及作者所有，本应用不储存任何视频或图片
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoSuccess: false,
				inputText: '',
				canTap:true,
				appList: [],
				faqList: [],
				videoObj: {
					video_url:'',
					poster:''
				},
				downProgress: ''
			}
		},
		computed: {
			isShow() {
				if (this.inputText == "") {
					return false;
				} else {
					return true;
				}
			}
		},
		onLoad() {
			this.getPlatform();
			this.getFAQ();
		},
		onShow() {
			uni.getClipboardData({
				success: (res) => {
					var data = this.trim(res.data)
					if (data && data != this.inputText) {
						uni.showModal({
							title: '要打开粘贴板中的链接吗？',
							content: data,
							cancelText: '取消',
							confirmText: '解析',
							success: (btn) => {
								if (btn.confirm) {
									this.inputText = data;
								}
							},
							fail: () => {
								uni.showToast({
									title: '复制失败',
									mask: false,
									duration: 1500
								});
							}
						});
					}
				}
			});
		},
		methods: {
			errorShow(e){
				console.log(e)
			},
			clearText() {
				this.inputText = "";
			},
			//去除首尾空格
			trim(s) {
				return s.replace(/(^\s*)|(\s*$)/g, "");
			},
			toRecharge() {
				var loginRes = this.$checkLogin('/pages/index/index', 2);
				if (!loginRes) {
					return false;
				}
				uni.navigateTo({
					url: "/pages/downApp/downApp"
				})
				
			},
			toCourse() {
				uni.navigateTo({
					url: '/pages/course/course'
				});
			},
			videoRequest(){
				this.$uniRequest(
					this.$baseUrl + '/v1/dewater/parseContent', {
						content: this.inputText
					},
					(res) => {
						if (res.data.code == 200) {   
							
							var data = res.data.data;
							//截取字符串,二级域名v3,v6开头的ios才能播放
							var canPlay = data.video_url.slice(9,10);
							if(canPlay == 3 || canPlay == 6){
								return this.videoRequest();
							}else{
								this.videoObj.video_url = data.video_url;
								this.videoObj.poster = data.poster;
								this.downProgress = "保存到本地"
								this.videoSuccess = true;
								uni.hideLoading();
								uni.showToast({
									title: '解析成功',
									duration: 1500
								});
								this.canTap = true;
							}
						} else {
							uni.hideLoading();
							uni.showModal({
								title: '提示',
								content: res.data.msg,
								showCancel: false,
								confirmText: '知道啦'
							});
						}
					},
					false
				)
			},
			
			getVideo() {
				var loginRes = this.$checkLogin('/pages/index/index', 2);
				if (!loginRes) {
					return false;
				}
				if(this.canTap == false){
					return false;
				}
				this.videoObj.video_url = '';
				this.videoObj.poster = '';
				this.videoSuccess = false;
				this.canTap = false;
				uni.showLoading({
					title: '解析中',
					mask: true
				});
				this.videoRequest()
				
			},
			downVideo(url) {
				var loginRes = this.$checkLogin('/pages/index/index', 2);
				if (!loginRes) {
					return false;
				}
				if (this.downProgress != "保存到本地") {
					return false;
				}
				var downloadTask = uni.downloadFile({
					url: url,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveVideoToPhotosAlbum({
								filePath: res.tempFilePath,
								success: (data) => {
									this.downProgress = "保存成功，请到本地相册查看"
									uni.showToast({
										title: '下载成功',
										mask: false,
										duration: 1500
									});
								},
								fail: (err) => {
									this.downProgress = '保存到本地'
									uni.showToast({
										title: '保存失败',
										mask: false,
										icon: 'none',
										duration: 1500
									});
								}
							});

						}
					}
				});
				downloadTask.onProgressUpdate((res) => {
					this.downProgress = res.progress + '%';
				});
			},
			getPlatform() {
				this.$uniRequest(
					this.$baseUrl + '/v1/dewater/supportApps',
					0,
					(res) => {
						if (res.data.code == 200) {
							var data = res.data.data;
							this.appList = data;
						}
					},
					true
				)
			},
			getFAQ() {
				this.$uniRequest(
					this.$baseUrl + '/v1/faq/getFaqs',
					0,
					(res) => {
						if (res.data.code == 200) {
							var data = res.data.data;
							this.faqList = data.sort(this.compare('id'));
						}
					},
					true
				)
			},
			compare(property) {
				return function(a, b) {
					var value1 = a[property];
					var value2 = b[property];
					return value1 - value2;
				}
			}
		}
	}
</script>

<style lang="less">
	@import './index.less';
</style>
