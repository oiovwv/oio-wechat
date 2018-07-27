<template>
    <div class="container">
        <div class="box">
            <div class="userinfo">
                <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
                <div class="userinfo-nickname">
                    <card :text="userInfo.nickName"></card>
                </div>
            </div>
            <div class="notice_bind">
                <image :src="imgUrl" alt="" />
                <div>为了保障您及时获取订单信息和更多优惠，
                    <span @click="showModel">请绑定手机号</span>
                </div>
            </div>
            <div class="weui_panel">
                <navigator v-for="(item,index) in list" :key="index" :url="item.url" 
                class="weui-cell weui-cell_access" hover-class="none">
                    <div v-if="item.icon" class="weui-cell__hd">
                        <image :src="item.icon" class="i_icon" />
                    </div>
                    <div class="weui-cell__bd">{{item.title}}</div>
                    <div class="weui-cell__ft weui-cell__ft_in-access">{{item.subTitle}}</div>
                </navigator>
            </div>
        </div>
        
        <model :isShowModel="hasModel" @hModel="hideModel"></model>
    </div>
</template>
<script>
import card from '../../components/card'
import model from '../../components/model'
import mptoast from 'mptoast'
export default {
    data(){
        return {
            userInfo:{},
            list:[
                {icon:'../../static/images/order.png',url:'order/main',title:'我的订单',subTitle:'查看全部订单'},
                {icon:'../../static/images/b.png',url:'cart/main',title:'购物车',subTitle:''},
                {icon:'../../static/images/addr.png',url:'address/main',title:'收货地址',subTitle:''},
                {icon:'../../static/images/collect.png',url:'collect/main',title:'收藏',subTitle:''},
                {icon:'../../static/images/coupon.png',url:'coupon/main',title:'积分与优惠券',subTitle:''}    
            ],
            imgUrl:'../../static/images/ai.png',
            hasModel:false
        }
    },
    components:{
        mptoast,
        card,
        model
    },
     methods: {
        getUserInfo () {
        // 调用登录接口
            wx.login({
                success: () => {
                wx.getUserInfo({
                    success: (res) => {
                    this.userInfo = res.userInfo
                    }
                })
                }
            })
        },
        showModel(){
            console.log('我是改变状态前的model:'+this.hasModel)
            this.hasModel=!this.hasModel
            console.log('我是改变状态后的model:'+this.hasModel)
        },
        hideModel(){
            this.hasModel=false
            console.log('子组件调用这个方法了吗')
        }
    },
    created () {
        // 调用应用实例的方法获取全局数据
        this.getUserInfo()
    }
}
</script>
<style>
.weui_panel{
    background-color: #fff;
}
.weui-cell{
    padding: 15rpx 30rpx;
}
.weui-cell__ft_in-access{
    font-size: 26rpx;
}
.box{
    width:100%;
}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:50rpx 0;
  background-image: linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent); 
  background-color:#40586d;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}
.userinfo-nickname {
    color: #aaa;
    text-align: center;
}
.i_icon{
    margin:0 25rpx 5rpx 0;
    vertical-align: middle;
    width:20px; 
    height: 20px;
}
.weui-cell__bd{
    font-size: 32rpx;
    color: #555;
}
.notice_bind{
    width:100%;
    display: flex;
    height: 60rpx;
    font-size: 26rpx;
    line-height: 60rpx;
    background-image: linear-gradient(-45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent); 
    background-color:#40586d;
    color:#fff;
    margin-bottom:10rpx;
}
.notice_bind image{
    width: 32rpx;
    height: 32rpx;
    margin:14rpx 10rpx;
}
.notice_bind span{
    color:#f73859;
    text-decoration: underline;
}
</style>
