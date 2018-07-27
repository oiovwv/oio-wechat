<template>
    <div>
        <div class='order_detail_box'>
            <!-- 订单状态栏 -->
            <div class="weui-cells weui-cells_after-title" id="status">
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <div v-if="status==1">等待付款</div>
                        <div v-else-if="status==2">已付款，等待发货</div>
                        <div v-else>已完成订单</div>
                        <div>订单金额（含运费）：<text>￥1212</text></div>
                    </div>
                    <div class="weui-cell__ft">
                        <image src='../../../../static/images/icon/delay.png' class='order_icon' v-if="status==1" />
                        <image src='../../../../static/images/icon/dispose.png' class='order_icon' v-else-if="status==2" />
                        <image src='../../../../static/images/icon/success.png' class='order_icon' wx:else />
                    </div>
                </div>
            </div>

            <div class="weui-panel address_box">
                <div class="weui-panel__bd">
                    <div class="weui-cells weui-cells_after-title">
                    <div class="weui-cell weui-cell_access">
                        <div class="weui-cell__hd">
                        <image src='../../../../static/images/addr.png' class='icon' />
                        </div>
                        <div class="weui-cell__bd">
                        <div>十多年嘎羧看见你跟谁离开那个说看见那个时刻公司</div>
                        </div>
                    </div>          
                    </div>
                </div>
            </div>
            
            <div class="weui-panel">
                <div class="weui-panel__hd">
                    <image src="../../../../static/images/icon/mall.png" alt="" class="mall_icon" />
                    <span>怪力科技</span>
                </div>
                <image src='../../../../static/images/youjitiao@2x.png' class='ribbon' />
                <div class="weui-panel__bd">
                    <goods :goodsList="orderProducts"></goods>
                </div>
            </div>
            <div class="weui-cells weui-cells_after-title info">
                <div class="weui-cell">
                    <div class="weui-cell__bd">商品小计</div>
                    <div class="weui-cell__ft">￥1212</div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__bd">运费</div>
                    <div class="weui-cell__ft">￥12</div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__bd" v-if="status==1">预付费（含运费）</div>
                    <div class="weui-cell__bd" v-else>实付费（含运费）</div>
                    <div class="weui-cell__ft">￥454545</div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__bd">买家留言</div>
                    <div class="weui-cell__ft advise">
                        谁都能够尽可能收到就给你SD卡发生时看见公交卡韩国撒个娇撒离开哪个是哪个几年时间观念是大家能够时刻记得那个就开始的那个家看电视呢更加困难
                    </div>
                </div>
            </div>
            <div class="order_num_box">
                <div>
                <div>订单编号：</div>
                <div>{{orderNum}}</div>
                </div>
                <div>
                <div>创建时间：</div>
                <div>{{createTime}}</div>
                </div>
            </div>

            <div class="weui-flex">
                <div class="weui-flex__item">
                <button hover-class='none' @click='toSee'>重新逛逛</button>
                </div>
                <div class="weui-flex__item">
                <button hover-class='none' @click='continuePay'>返回首页</button>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import goods from '../../../../components/goods'
export default {
    data(){
        return {
            status:'',
            orderProducts:[
                {name:'牛肉发生发誓不会发生分解哈舒服萨福卅发顺丰',price:88,url:'../../../../static/images/1.png',description:'500ml',num:15},
                {name:'猪肉爱上嘎嗦干撒空间广阔萨法沙发沙发沙发上',price:100,url:'../../../../static/images/2.png',description:'300g/罐',num:12}
            ]
        }
    },
    components:{
        goods
    },
    onLoad(){
        let orderArg=this.$root.$mp.query//获取跳转传递过来的参数
        console.log(orderArg)
        this.status=orderArg.status
    },
}
</script>
<style scoped>
.order_detail_box{
    padding-bottom:50rpx; 
}
.icon{
  width:48rpx;
  height:48rpx;
  margin:5px 10px 0 0;
}
.mall_icon{
  width:38rpx;
  height:38rpx;
  margin-right:15rpx; 
  position:relative;
  top:8rpx;
}
.order_icon{
  width: 80rpx;
  height: 80rpx;
}
#status{
  background: #FA4659;  
}
.weui-panel{
    margin-top: 10rpx;
}
.weui-panel__hd{
    padding:20rpx 30rpx;
}
#status .weui-cell{
  padding:40rpx 30rpx;
}
.weui-cell__bd{
  line-height: 1.5;
}
#status .weui-cell__bd{
  color:#fff;
  font-size:30rpx;
}
#status .weui-cell__bd div:last-child,.address_box .weui-cell__bd div:last-child{
  font-size: 24rpx;
}
.info{
    margin-top: -1rpx;
}
.weui-cell__bd,.weui-cell__ft{
    font-size: 26rpx;
}
.advise{
    width: 80%;
    text-align: left;
    text-indent: 50rpx;
}

.order_num_box{
  margin:6px 0;
}
.order_num_box{
  margin-bottom: 15px;
}
.order_num_box{
  background:#fff;
  padding:10px 15px;
  font-size: 30rpx;
  line-height:2;
  color:#333;
} 
.order_num_box>div{
  display:flex;
}
.order_num_box>div>div:first-child{
  width: 23%;
}
.order_num_box>div>div:last-child{
  width: 77%;
}
.weui-flex{
  padding:0 10rpx;
}
.weui-flex .weui-flex__item{
  margin: 0 15rpx;
  flex: 1;
}
.weui-flex .weui-flex__item button{
  font-size:30rpx;
  color: #fff;
}
.weui-flex .weui-flex__item:first-child button{
  background: #11CBD7;
}
.weui-flex .weui-flex__item:last-child button{
  background: #FA4659;
}
</style>
