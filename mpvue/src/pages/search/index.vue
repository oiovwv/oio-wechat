<template>
    <div class="search_box">
        <view class="weui-search-bar">
            <view class="weui-search-bar__form">
                <view class="weui-search-bar__box" @click="inputContent">
                    <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
                    <input type="text" id='search' class="weui-search-bar__input" placeholder="搜索" 
                     v-model="msg" ref='content'/>
                    <view class="weui-icon-clear" v-if="msg.length>0" @click="clearInput">
                        <icon type="clear" size="14"></icon>
                    </view>
                </view>
                <!-- <label class="weui-search-bar__label" v-if="!showCancel" @click="inputContent">
                    <icon class="weui-icon-search" type="search" size="14"></icon>
                    <view class="weui-search-bar__text">搜索</view>
                </label> -->
            </view>
            <view class="weui-search-bar__cancel-btn" v-if="showCancel" @click="cancelSearch">取消</view>
        </view>
    </div>    
</template>
<script>
export default {
    data(){
        return {
           showCancel:true,
           msg:''
        }
    },
    // props:{
    //     showCancel:{
    //         type:Boolean,
    //         default:false
    //     },
    //     msg:{
    //         type:String,
    //         default:''
    //     }
    // },
    methods:{
        clearInput(){
            this.msg=''
        },
        inputContent(){
            this.showCancel=true; 
        },
        cancelSearch(){
            wx.navigateBack({
                delta: 1
            })
            this.msg=''
        }
    },
    // 指令的定义
    directives: {
        focus: {
            inserted: function (el) {
                el.focus()
            }
        }
    }
}
</script>
<style scoped>
.search_box{
    width: 100%;
}
.weui-search-bar{
    padding: 8rpx 10rpx;
}
.weui-search-bar__cancel-btn{
    line-height: 60rpx;
    font-size: 28rpx;
    margin-left:20rpx;
    color:#40586d;
}
</style>
