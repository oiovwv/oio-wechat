<template>
    <div class="goods_box">
        <div >
            <div class="weui-media-box weui-media-box_appmsg" v-for="(goods,i) in goodsList" :key="i">
                <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
                    <image class="weui-media-box__thumb" :src="goods.url" />
                </div>
                <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
                    <div class="weui-media-box__title">
                        <span>{{goods.name}}</span>
                        <span>×{{goods.num}}</span>
                    </div>
                    <div class="weui-media-box__desc">{{goods.description}}</div>
                    <div class="weui-media-box__foot">
                        <span>￥{{goods.price}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props:{
        goodsList:{
            type:Array,
            default:[]
        }
    }
}
</script>
<style scoped>
.weui-panel__bd>div{
    margin-bottom:10rpx;
    background:#fafafa;
}
.weui-panel__bd>div:last-child{
    margin-bottom:0;
}
.weui-media-box__hd_in-appmsg{
    width:160rpx;
    height: 160rpx;
}
.weui-icon-checkbox_circle, .weui-icon-checkbox_success{
    margin:0 15rpx;
}
.weui-media-box__title{
    font-size: 30rpx;
    font-weight: normal;
}
.weui-media-box__desc{
    font-size: 28rpx;
    color: #333;
}
.weui-media-box__title,.weui-media-box__desc{
    margin-bottom: 10rpx;
}
.weui-media-box__foot>span{
    font-size: 28rpx;
}
.weui-media-box__title{
    display: flex;
    justify-content: space-between;
    line-height: 56rpx;
    padding-right: 15rpx;
}
.weui-media-box__title>span:first-child{
    width: 85%;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
