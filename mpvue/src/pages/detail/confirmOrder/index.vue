<template>
    <div>
        <div class='confirm_box'>
            <div class="weui-panel address">
                <div class="weui-panel__hd">地址信息</div>
                <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_small-appmsg">
                    <div class="weui-cells weui-cells_after-title">
                    <div class="weui-cell weui-cell_access" v-if='isChooseAddr' @click='chooseAddress'>
                        <div class="weui-cell__hd">
                        <image src='../../../static/images/add.png' class='addr_icon' />
                        </div>
                        <div class="weui-cell__bd">选择收货地址</div>
                        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
                    </div>
                    <div  class="weui-cell weui-cell_access" v-else @click='chooseAddress'>
                        <div class="weui-cell__hd">
                        <image src='../../../static/images/addr.png' class='addr_icon' />
                        </div>
                        <!-- <div class="weui-cell__bd ">{{addr}}</div> -->
                        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
                    </div>            
                    </div>
                </div>
                </div>
            </div>
            <div class="weui-panel weui-panel_access">
                <div class="weui-panel__hd">
                    <span>商品信息</span>
                </div>
                <image src="../../../static/images/youjitiao@2x.png" alt="" class='ribbon' />
                <div class="weui-panel__bd">
                    <!-- <div v-for="(item,index) in productList" :key="index">
                        <div class="weui-media-box weui-media-box_appmsg">
                            <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
                                <image class="weui-media-box__thumb" :src="item.url" />
                            </div>
                            <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
                                <div class="weui-media-box__title">
                                    <span>{{item.name}}</span>
                                    <span>×{{item.num}}</span>
                                </div>
                                <div class="weui-media-box__desc">{{item.description}}</div>
                                <div class="weui-media-box__foot">
                                    <span>￥{{item.price}}</span>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <goods :goodsList="productList"></goods>
                </div>
            </div>
            <div class="weui-cells weui-cells_after-title info">
                <div class="weui-cell">
                    <div class="weui-cell__bd">配送方式</div>
                    <div class="weui-cell__ft">普通快递</div>
                </div>
                <div class="weui-cell weui-cell_switch">
                    <div class="weui-cell__bd">积分抵用</div>
                    <div class="weui-cell__ft total">
                        <switch></switch>
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__bd">优惠券</div>
                    <div class="weui-cell__ft total weui-cell__ft_in-access"></div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__bd">买家留言</div>
                    <div class="weui-cell__ft advise">
                        <input type="text" name="" id="" placeholder='点击给商家留言/建议'>
                    </div>
                </div>
            </div>
            <!-- 底部确认下单按钮 -->
            <div class='confirm_order'>
                <div class='total'>
                <text>合计：</text>
                <!-- <text>￥{{totalPrice}}</text> -->
                </div>
                <div @click='confirmOrder'>确认支付</div>
            </div>
        </div>
    </div>
</template>
<script>
import goods from '../../../components/goods'
export default {
    data(){
        return {
            isChooseAddr:true,
            productList:[
                {name:'牛肉发生发誓不会发生分解哈舒服萨福卅发顺丰',price:88,url:'../../../static/images/1.png',description:'500ml',num:15},
                {name:'猪肉爱上嘎嗦干撒空间广阔萨法沙发沙发沙发上',price:100,url:'../../../static/images/2.png',description:'300g/罐',num:12}
            ]
        }
    },
    components:{
        goods
    },
    methods:{
        chooseAddress(){
            this.isChooseAddr=!this.isChooseAddr
        },
        confirmOrder(){

        }
    }
}
</script>
<style scoped>
.address .weui-cells:before,.address .weui-cell:before{
    border-top:none;
}

.confirm_box{
    min-height: 1300rpx;
}
.confirm_box .weui-panel__hd{
    padding:28rpx 30rpx 18rpx;
}
.confirm_box .weui-cell{
  padding:20rpx 30rpx;
}
.confirm_box .weui-cells_after-title{
    margin-top: 0;
}
.addr_icon{
  width:48rpx;
  height:48rpx;
  position:relative;
  top:5rpx;
  margin-right:16rpx;
}
.confirm_box .weui-cell__bd{
  font-size: 28rpx;
  color:#666;
}
.confirm_box .info{
    margin-top: -1rpx;
}
.info .weui-cell__bd{
    color: #333;
}
.info .weui-cell_switch{
    padding:15rpx 30rpx;
}
.info .weui-cell__ft{
    font-size: 28rpx;
}
.info .total{
  color:#f73859;
}
.other-info .advise{
  flex-grow:0.7;
}
.info .advise>input{
  text-align: center;
}

/* 提交订单底部按钮 */
.confirm_order{
  display: flex;
  position: fixed;
  bottom:0;
  width: 100%;
  height: 80rpx;
}
.confirm_order>div{
  line-height:80rpx;
  font-size:30rpx;
}
.confirm_order .total{
  padding:0 10px;
  flex-grow:0.8;
  text-align:center;
  background: #fff;
  color:#f73859;
}
.confirm_order>div:last-child{
  background:#f73859;
  color:#fff;
  flex-grow:0.5;
  text-align: center;
}
</style>
