import Vue from 'vue'
import App from './App'
import urlRequest from './common/request.js'

Vue.config.productionTip = false
//http://apiw.3ssjx.com:85/index.php
//https://api.dspqsy.com/index.php
Vue.prototype.$baseUrl = 'https://api.dspqsy.com/index.php';
Vue.prototype.$uniRequest = (url, param,func,flag)=> {
			urlRequest(url,param,func,flag)
		}

//backtype ==> 打开页面的类型[1 : redirectTo 2 : switchTab]
Vue.prototype.$checkLogin = (backpage, backtype)=>{
	var TOKEN  = uni.getStorageSync('TOKEN');
	if(TOKEN == ''){
		uni.navigateTo({url:'/pages/login/login?backpage='+backpage+'&backtype='+backtype});
		return false;
	}
	return TOKEN;
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
