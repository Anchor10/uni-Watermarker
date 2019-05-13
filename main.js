import Vue from 'vue'
import App from './App'
import urlRequest from './common/request.js'

Vue.config.productionTip = false

Vue.prototype.$baseUrl = 'http://apiw.3ssjx.com:85/index.php';
Vue.prototype.$uniRequest = (url, param,func)=> {
			urlRequest(url,param,func)
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
