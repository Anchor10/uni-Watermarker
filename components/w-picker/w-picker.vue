<template>
	<view class="w-picker">
		<div class="mask" :class="{'show':showPicker}" @tap="maskTap" catchtouchmove="true"></div>
		<view class="w-picker-cnt" :class="{'show':showPicker}">
			<view class="w-picker-hd" catchtouchmove="true">
			  <view class="w-picker-btn" @tap="pickerCancel">取消</view>
			  <view class="w-picker-btn" :style="{'color':themeColor}" @tap="pickerConfirm">确定</view>
			</view>
			<view class="w-picker-view" v-if="mode=='date'||mode=='dateTime'||mode=='yearMonth'">
				<picker-view indicator-style="height: 40px;" :value="pickVal" @change="bindChange">
					<picker-view-column>
						<view class="item" v-for="(item,index) in data.years" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in data.months" :key="index">{{item}}月</view>
					</picker-view-column>
					<picker-view-column v-if="mode!='yearMonth'">
						<view class="item" v-for="(item,index) in data.days" :key="index">{{item}}日</view>
					</picker-view-column>
					<picker-view-column v-if="mode=='dateTime'">
						<view class="item" v-for="(item,index) in data.hours" :key="index">{{item}}时</view>
					</picker-view-column>
					<picker-view-column v-if="mode=='dateTime'">
						<view class="item" v-for="(item,index) in data.minutes" :key="index">{{item}}分</view>
					</picker-view-column>
					<picker-view-column v-if="mode=='dateTime'">
						<view class="item" v-for="(item,index) in data.seconds" :key="index">{{item}}秒</view>
					</picker-view-column>
				</picker-view>
			</view>
			<view class="w-picker-view" v-if="mode=='time'">
				<picker-view indicator-style="height: 40px;" :value="pickVal" @change="bindChange">
					<picker-view-column>
						<view class="item" v-for="(item,index) in data.hours" :key="index">{{item}}时</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in data.minutes" :key="index">{{item}}分</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in data.seconds" :key="index">{{item}}秒</view>
					</picker-view-column>
				</picker-view>
			</view>
			<view class="w-picker-view" v-if="mode=='region'">
				<picker-view indicator-style="height: 40px;" :value="pickVal" @change="bindChange">
					<picker-view-column>
						<view class="item" v-for="(item,index) in data.provinces" :key="index">{{item.label}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in data.citys" :key="index">{{item.label}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in data.areas" :key="index">{{item.label}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script>
	import {initPicker,initDays} from "@/common/util.js";
	import provinces from './city-data/province.js';
	import citys from './city-data/city.js';
	import areas from './city-data/area.js';
	export default {
		data() {
			return {
				result:[],
				data:{},
				checkArr:[],
				checkValue:[],
				pickVal:[],
				showPicker:false,
				resultStr:""
			};
		},
		computed:{
			
		},
		props:{
			mode:{
				type:String,
				default(){
					return "date"
				}
			},
			themeColor:{
				type:String,
				default(){
					return "#f00"
				}
			},
			startYear:{
				type:String,
				default(){
					return "1970"
				}
			},
			endYear:{
				type:String,
				default(){
					return new Date().getFullYear()+''
				}
			},
			defaultVal:{
				type:Array,
				default(){
					return [0,0,0,0,0,0]
				}
			},
			step:{
				type:null,
				default:1
			}
		},
		watch:{
			mode(){
				this.initData();
			}
		},
		methods:{
			maskTap(){
				this.showPicker = false;
			},
			show(){
				this.showPicker = true;
			},
			hide(){
				this.showPicker = false;
			},
			pickerCancel(){
				this.$emit("cancel",{
					checkArr:this.checkArr,
					defaultVal:this.pickVal
				});
				this.showPicker = false;
			},
			pickerConfirm(e){
				this.$emit("confirm",{
					checkArr:this.checkArr,
					defaultVal:this.pickVal,
					result:this.resultStr
				});
				this.showPicker = false;
			},
			bindChange(val){
				let _this=this;
				let arr=val.detail.value;
				let year="",month="",day="",hour="",minute="",second="",province,city,area;
				let checkArr=_this.checkArr;
				let days=[];
				let mode=_this.mode;
				switch(mode){
					case "date":
						year=_this.data.years[arr[0]];
						month=_this.data.months[arr[1]];
						day=_this.data.days[arr[2]];
						if(year!=checkArr[0]){
							days=initDays(year,month);
							_this.data.days=days;
						};
						if(month!=checkArr[1]){
							days=initDays(year,month);
							_this.data.days=days;
						};
						_this.checkArr=[year,month,day];
						_this.resultStr=`${year+'-'+month+'-'+day}`;
						break;
					case "yearMonth":
						year=_this.data.years[arr[0]];
						month=_this.data.months[arr[1]];
						_this.checkArr=[year,month];
						_this.resultStr=`${year+'-'+month}`;
						break;
					case "dateTime":
						year=_this.data.years[arr[0]];
						month=_this.data.months[arr[1]];
						day=_this.data.days[arr[2]];
						hour=_this.data.hours[arr[3]];
						minute=_this.data.minutes[arr[4]];
						second=_this.data.seconds[arr[5]];
						if(year!=checkArr[0]){
							days=initDays(year,month);
							_this.data.days=days;
						};
						if(month!=checkArr[1]){
							days=initDays(year,month);
							_this.data.days=days;
						};
						_this.checkArr=[year,month,day,hour,minute,second];
						_this.resultStr=`${year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second}`;
						break;
					case "time":
						hour=_this.data.hours[arr[0]];
						minute=_this.data.minutes[arr[1]];
						second=_this.data.seconds[arr[2]];
						_this.checkArr=[hour,minute,second];
						_this.resultStr=`${hour+':'+minute+':'+second}`;
						break;
					case "region":
						province=_this.data.provinces[arr[0]].label;
						city=_this.data.citys[arr[1]].label;
						area=_this.data.areas[arr[2]].label;
						if(province!=checkArr[0]){
							_this.data.citys = citys[arr[0]];
							_this.data.areas = areas[arr[0]][0];
							arr[1] = 0;
							arr[2] = 0;
							city=_this.data.citys[arr[1]].label;
							area=_this.data.areas[arr[2]].label;
						};
						if(city!=checkArr[1]){
							_this.data.areas = areas[arr[0]][arr[1]];
							arr[2]=0;
							area=_this.data.areas[arr[2]].label;
						};
						_this.checkArr=[province,city,area];
						_this.checkValue=[_this.data.provinces[arr[0]].value,_this.data.provinces[arr[0]].value,_this.data.areas[arr[2]].value];
						_this.resultStr=province+city+area;
						break;
				}
				_this.$nextTick(()=>{
					_this.pickVal=arr;
				})
			},
			initData(){
				let _this=this;
				let data={};
				let mode=_this.mode;
				let year,month,day,hour,minute,second,province,city,area;
				if(mode!="region"){
					data=initPicker(_this.startYear,_this.endYear,_this.mode,_this.step)
				}else{
					data={
						provinces:provinces,
						citys:citys[_this.defaultVal[0]],
						areas:areas[_this.defaultVal[0]][_this.defaultVal[1]]
					};
				};
				_this.data=data;
				switch(mode){
					case "date":
						year=data.years[_this.defaultVal[0]];
						month=data.months[_this.defaultVal[1]];
						day=data.days[_this.defaultVal[2]];
						_this.checkArr=[year,month,day];
						_this.resultStr=`${year+'-'+month+'-'+day}`;
						break;
					case "yearMonth":
						year=data.years[_this.defaultVal[0]];
						month=data.months[_this.defaultVal[1]];
						_this.checkArr=[year,month];
						_this.resultStr=`${year+'-'+month}`;
						break;
					case "dateTime":
						year=data.years[_this.defaultVal[0]];
						month=data.months[_this.defaultVal[1]];
						day=data.days[_this.defaultVal[2]];
						hour=data.hours[_this.defaultVal[3]];
						minute=data.minutes[_this.defaultVal[4]];
						second=data.seconds[_this.defaultVal[5]];
						_this.resultStr=`${year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second}`;
						_this.checkArr=[year,month,day,hour,minute];
						break;
					case "time":
						hour=data.hours[_this.defaultVal[0]];
						minute=data.minutes[_this.defaultVal[1]];
						second=data.seconds[_this.defaultVal[2]];
						_this.checkArr=[hour,minute,second];
						_this.resultStr=`${hour+':'+minute+':'+second}`;
						break;
					case "region":
						province=data.provinces[_this.defaultVal[0]];
						city=data.citys[_this.defaultVal[1]];
						area=data.areas[_this.defaultVal[2]];
						_this.checkArr=[province.label,city.label,area.label];
						_this.checkValue=[province.value,city.value,area.value];
						_this.resultStr=province.label+city.label+area.label;
						break;
				}
				_this.$nextTick(()=>{
					_this.pickVal=_this.defaultVal;
				})
			}
		},
		mounted() {
			this.initData();
		}
	}
</script>

<style lang="scss">
	.w-picker{
		.mask {
		  position: fixed;
		  z-index: 1000;
		  top: 0;
		  right: 0;
		  left: 0;
		  bottom: 0;
		  background: rgba(0, 0, 0, 0.6);
		  visibility: hidden;
		  opacity: 0;
		  transition: all 0.3s ease;
		}
		.mask.show{
			visibility: visible;
			opacity: 1;
		}
		.w-picker-cnt {
		  position: fixed;
		  bottom: 0;
		  left: 0;
		  width: 100%;
		  transition: all 0.3s ease;
		  transform: translateY(100%);
		  z-index: 3000;
		}
		.w-picker-cnt.show {
		  transform: translateY(0);
		}
		.w-picker-hd {
		  display: flex;
		  align-items: center;
		  padding: 0 30upx;
		  height: 88upx;
		  background-color: #fff;
		  position: relative;
		  text-align: center;
		  font-size: 32upx;
		  justify-content: space-between;
		  .w-picker-btn{
		  	font-size: 30upx;
		  }
		}
		
		.w-picker-hd:after {
		  content: ' ';
		  position: absolute;
		  left: 0;
		  bottom: 0;
		  right: 0;
		  height: 1px;
		  border-bottom: 1px solid #e5e5e5;
		  color: #e5e5e5;
		  transform-origin: 0 100%;
		  transform: scaleY(0.5);
		}
		.item {
		  text-align: center;
		  width: 100%;
		  height: 80upx;
		  line-height: 80upx;
		  text-overflow: ellipsis;
		  white-space: nowrap;
		  font-size: 30upx;
		}
		.w-picker-view {
		  width: 100%;
		  height: 476upx;
		  overflow: hidden;
		  background-color: rgba(255, 255, 255, 1);
		  z-index: 666;
		}
		picker-view{
			height: 100%;
		}
	}

</style>
