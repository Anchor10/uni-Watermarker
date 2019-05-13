<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default{
		data(){
			return{
				url:'https://www.baidu.com',
				order_id:''
			}
		},
		onLoad(e) {
			this.order_id = e.order_id;
			this.$uniRequest(
				this.$baseUrl + '/v1/vip/pay',
				{
					order_id:this.order_id,
					payway:'wxpay'
				},
				(res) => {
					this.url = res.data.data.token
				}
			)
		}
	}
</script>

<style>
</style>
