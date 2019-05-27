<template>
	
	<view class="down-app">
		<view class="down-tips">
			<i class="tips-pic"></i>
			小程序暂不支持充值，请前往下载App进行充值。
		</view>
		<view class="content-box">
			<image class="logo-pic" src="../../static/images/logo.png" mode=""></image>
			<text class="app-name">Biu去水印</text>
			<text class="app-version">V1.0.0</text>
		</view>
		<button class="down-btn" open-type="contact">回复"666"下载</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
// 			uni.showModal({
// 				title: '提示',
// 				content: '小程序暂不支持充值，请前往下载App进行充值。',
// 				confirmText:'知道啦',
// 				confirmColor:'#00C8FD',
// 				showCancel:false,
// 				success: (res)=> {
// 					if (res.confirm) {
// 						console.log('用户点击确定');
// 					}
// 				}
// 			});
		}
	}
</script>

<style lang="less">
	page{
		min-height: 100%;
	}
	.down-app{
		box-sizing: border-box;
		text-align: center;
		padding: 40upx 0;
		height: 100%;
		.down-tips{
			box-sizing: border-box;
			border: 1px solid #f5f5f5;
			width: 100%;
			margin: 0 auto;
			font-size: 24upx;
			padding: 10upx 40upx;
			color: #333;
			line-height: 1.5;
			text-align: left;
			margin-bottom: 60upx;
			background: #eee;
			.tips-pic{
				display: inline-block;
				width: 26upx;
				height: 26upx;
				vertical-align: -2upx;
				background: url(../../static/images/down-tips.png) center center no-repeat;
				background-size: 26upx 26upx;
				margin-right: 10upx;
			}
		}
		.content-box{
			width: 262upx;
			margin: 0 auto;
			.logo-pic{
				display: block;
				width: 262upx;
				height: 262upx;
			}
			.app-name{
				display: block;
				font-size: 36upx;
				color: #393E4C;
				font-weight: bold;
				margin-top: 20upx;
			}
			.app-version{
				display: block;
				font-size: 28upx;
				color: #D1D3DE;
			}
		}
		.down-btn,.down-hover{
			display: block;
			width: 686upx;
			height: 88upx;
			line-height: 88upx;
			font-size: 36upx;
			margin: 0 auto;
			margin-top: 30upx;
			background: #00C8FD;
			color: #fff;
			border: 0 !impotant;
			outline: none !impotant;
			border-radius:8upx;
		}
	}
</style>
