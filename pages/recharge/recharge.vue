<template>
	<view class="recharge">
		<user-info :userInfo="userInfo" :token="token"></user-info>
		<view class="open-vip">
			<image class="open-vip-pic" src="../../static/images/open-VIP.png" mode=""></image>
		</view>
		<view class="recharge-box">
			<view class="recharge-way">
				<view class="way-item" v-for="(item,index) of items" :key="index" >
					<view class="way-title" :class="{'current':current == index}" @tap="tabChange(item,index)">
						{{item.title}}
					</view>
					<view class="list" v-if="current == index">
						<view class="list-item" :class="{on:cur==index1}" v-for="(item1,index1) of item.list" :key="index1" @tap="selectItem(item1,index1)">
							<view class="name">{{item1.name}}</view>
							<view class="amount">{{item1.amount}}元</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="wx-recharge" @tap="weixinPay">
			微信充值
		</view>
	</view>
</template>

<script>
	import UserInfo from "@/components/user-info/user-info.vue"
	export default {
		data() {
			return {
				userInfo: {},
				token: '',
				current: 0,
				items: [],
				timesList:[],
				dateList:[],
				cur:0
			};
		},
		onLoad() {
			uni.getStorage({
				key: 'TOKEN',
				success: (res) => {
					this.token = res.data
				}
			});
			this.getUserInfo();
			this.getRechargeList();
			uni.authorize({
				scope: 'scope.userInfo',
				success:(res)=> {
					console.log(res)
				}
			})
		},
		onShow() {
			var loginRes = this.$checkLogin('/pages/mine/mine',2);
			if(!loginRes){return false;}
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
			tabChange(item,index){
				if (this.current !== index) {
					this.current = index;
					this.cur = 0;
				}
			},
			getRechargeList(){
				this.$uniRequest(
					this.$baseUrl + '/v1/vip/setting',
					0,
					(res) => {
						if(res.data.code == 200){
							var data = res.data.data
							console.log(res)
							this.items = data.list.reverse();
						}
					}
				)
			},
			selectItem(item,index){
				if (this.cur !== index) {
					this.cur = index;
				}
			},
			payment(){
				console.log(123)
				this.$uniRequest(
					this.$baseUrl + '/v1/vip/order',
					{
						vip_id:9
					},
					(res) => {
						console.log(res)
						this.order_id = res.data.data.order_id;
					}
				)
			},
			paySearch(){
				this.$uniRequest(
					this.$baseUrl + '/v1/order/query',
					{
						order_id:this.order_id
					},
					(res) => {
						console.log(res)
					}
				)
			},
			weixinPay() {
			    console.log("发起支付");
// 				uni.requestPayment({
// 					provider: 'wxpay',
// 					timeStamp: String(Date.now()),
// 					nonceStr: 'A1B2C3D4E5',
// 					package: 'prepay_id=wx20180101abcdefg',
// 					signType: 'MD5',
// 					paySign: '',
// 					success: function (res) {
// 						console.log('success:' + JSON.stringify(res));
// 					},
// 					fail: function (err) {
// 						console.log('fail:' + JSON.stringify(err));
// 					}
// 				});
			    uni.login({
			        success: (e) => {
			            console.log("login success", e);
			            uni.request({
			                url: `https://unidemo.dcloud.net.cn/payment/wx/mp?code=${e.code}&amount=20`,
			                success: (res) => {
			                    console.log("pay request success", res);
			                    if (res.statusCode !== 200) {
			                        uni.showModal({
			                            content: "支付失败，请重试！",
			                            showCancel: false
			                        });
			                        return;
			                    }
			                    if (res.data.ret === 0) {
			                        console.log("得到接口prepay_id", res.data.payment);
			                        let paymentData = res.data.payment;
			                        uni.requestPayment({
			                            timeStamp: paymentData.timeStamp,
			                            nonceStr: paymentData.nonceStr,
			                            package: paymentData.package,
			                            signType: 'MD5',
			                            paySign: paymentData.paySign,
			                            success: (res) => {
			                                uni.showToast({
			                                    title: "感谢您的赞助!"
			                                })
			                            },
			                            fail: (res) => {
			                                uni.showModal({
			                                    content: "支付失败,原因为: " + res
			                                        .errMsg,
			                                    showCancel: false
			                                })
			                            },
			                            complete: () => {
			                                this.loading = false;
			                            }
			                        })
			                    } else {
			                        uni.showModal({
			                            content: "支付太失败了",
			                            showCancel: false
			                        })
			                    }
			                },
			                fail: (e) => {
			                    console.log("fail", e);
			                    this.loading = false;
			                    uni.showModal({
			                        content: "支付失败,原因为: " + e.errMsg,
			                        showCancel: false
			                    })
			                }
			            })
			        },
			        fail: (e) => {
			            console.log("fail", e);
			            this.loading = false;
			            uni.showModal({
			                content: "支付失败,原因为: " + e.errMsg,
			                showCancel: false
			            })
			        }
			    })
			}
		},
		components: {
			UserInfo
		}
	}
</script>

<style lang="less">
	@import './recharge.less';
</style>
