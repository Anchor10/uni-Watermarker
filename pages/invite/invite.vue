<template>
	<view class="invite">
		<view class="blue-top">
			<view class="invite-card">
				<view class="card-top">
					<view class="user-title">
						<i class="user-icon"></i>
						<text class="phone-number">{{phoneSafe}}</text>
					</view>
					<view class="invite-code">
						我的邀请码：{{inviteCode}}
					</view>
					<view class="grade-now">
						<text class="left">当前等级：{{inviteLevel.current_level}}</text>
						<text class="right">{{inviteLevel.next_msg}}</text>
					</view>
				</view>
				<view class="card-bottom">
					<view class="left">
						<view class="count">
							<text class="num">{{inviteLevel.parse_times}}</text><text class="total">/{{inviteLevel.parse_times_total}}</text>
						</view>
						<text class="txt">今日剩余解析次数</text>
					</view>
					<view class="right">
						<view class="count">
							<text class="num">{{inviteLevel.invite_count}}</text>
						</view>
						<text class="txt">邀请人数</text>
					</view>
				</view>
			</view>
		</view>
		<view class="task">
			<view class="task-title">
				邀请任务
			</view>
			<view class="task-text">
				{{msg}}
			</view>
			<view class="task-list">
				<view class="task-item" v-for="(item,index) of shareLevel" :key="index">
					<view class="task-pic" :style="{backgroundImage: 'url('+item.image+')'}"></view>
					<!-- <image class="task-pic" :src="item.image" mode=""></image> -->
					<view class="task-desc">
						<view class="title">
							{{item.name}}
						</view>
						<text class="desc">{{item.rule}}</text>
					</view>
				</view>
			</view>
		</view>
		<button class="invite-btn" plain=true open-type="share">
			立即邀请
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userPhone: '',
				inviteCode: '',
				inviteLevel: {},
				msg: '',
				shareLevel: []
			};
		},
		computed: {
			phoneSafe() {
				return this.userPhone.substr(0, 3) + "****" + this.userPhone.substr(7);
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: 'Biu去水印',
				path: '/pages/index/index',
				imageUrl: '../../static/images/banner1.png'
			}
		},
		onLoad(e) {
			this.getTask();
			this.userPhone = e.num;
		},
		methods: {
			getUserInfo() {
				this.$uniRequest(
					this.$baseUrl + '/v1/member/info',
					0,
					(res) => {
						this.userInfo = res.data.data;
					}
				)
			},
			getTask() {
				this.$uniRequest(
					this.$baseUrl + '/v1/member/invite',
					0,
					(res) => {
						if (res.data.code == 200) {
							var data = res.data.data;
							this.inviteCode = data.invite_code;
							this.inviteLevel = data.invite_level;
							this.msg = data.msg;
							this.shareLevel = data.share_level;
						}
					}
				)
			}
		}
	}
</script>

<style lang="less">
	@import './invite.less';
</style>
