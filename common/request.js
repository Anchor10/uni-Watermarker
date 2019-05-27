// 参数： url:请求地址  param：请求参数 func：回调函数
	// import md5 from 'js-md5'
	// token:0a41939468ecc02ef67d0b41c281a92d752e8db661f09dce2df4eeb9fffb6900
	//appid:fiev73r9gk
	// uuid:'00000000-1ee1-c7fb-ffff-ffffd3ce6eb2',
	function urlRequest(url,param, func, flag) {
		//flag为true时,将token请求参数的token设置为0;
		//无需token的请求flag=>true,flag=>false
		var baseParam = {
				device:'Mini',
				system_version:'Mini',
				sign:'F7F5F3472016A909FF6A510E1DA92505',
				verid:7,
				token:0,
				package:'com.videow.mini',
				uuid:'1',
				appid:'fierteronzd',
				mac_address:'02:00:00:00:00:00',
				agentname:'default',
				timestamp:'1550746155',
				from:3,
				userua:'Mini',
				
			};
			var TOKEN  = uni.getStorageSync('TOKEN');
			baseParam.token = TOKEN || 0;
			if(flag === true){
				baseParam.token = 0;
			}
			//没有额外参数的话传0
			if(param != 0){
				var paramObj = {params:JSON.stringify(param)};
				var realParam =Object.assign(paramObj,baseParam);
			}else{
				var paramObj = {params:'{}'};
				var realParam =Object.assign(paramObj,baseParam);
			}
		uni.request({
			url: url,
			data: realParam,
			method: 'POST',
			success: res=>{
				if(res.data.code == 998 && baseParam.token != 0){
					uni.removeStorageSync('TOKEN');
					uni.showToast({
						title: res.data.msg,
						icon:'none',
						success:()=>{
							setTimeout(()=>{
								uni.navigateTo({
									url:'/pages/login/login'
								})
								
							},1000)
						}
					})
					return false;
					
				}
				func(res);
			},
			fail:err=>{
				uni.showToast({
					title: '网络请求错误,请重试',
					icon:'none',
					duration: 3000
				});
			}
			// complete:()=>{
			// 	setTimeout(()=> {
			// 		uni.hideLoading();
			// 	}, 1500);
			// }
		});
 
 
	}
 
export default urlRequest
