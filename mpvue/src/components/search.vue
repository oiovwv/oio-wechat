<template>
    <div class="search_box">
        <view class="weui-search-bar">
            <view class="weui-search-bar__form">
                <view class="weui-search-bar__box" @click="toSearch">
                    <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
                    <input type="text" id='search' class="weui-search-bar__input" placeholder="搜索" />
                </view>
                <label class="weui-search-bar__label" @click="toSearch">
                    <icon class="weui-icon-search" type="search" size="14"></icon>
                    <view class="weui-search-bar__text">搜你想吃的</view>
                </label>
            </view>
        </view>
    </div>    
</template>
<script>
export default {
    data(){
        return {

        }
    },
    components:{},
    methods:{
        toSearch(){
            wx.navigateTo({
                url:'../search/main'
            })
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
</style>
