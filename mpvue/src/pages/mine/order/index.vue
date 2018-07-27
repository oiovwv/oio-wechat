<template>
    <div>
        <div class="empty_box" v-if="isEmptyOrder">
            <image src="../../../static/images/icon/1.png" alt="" class="empty"/>
        </div>
        <div class="full_order_box" v-else>
            <div class="page">
                <div class="page__bd">
                    <div class="weui-tab">
                        <div class="weui-navbar">
                            <block v-for="(item,index) in tabs" :key="index">
                                <div class="weui-navbar__item" :class="activeIndex == index ? 'weui-bar__item_on' : ''" @click="tabClick(index,$event)">
                                    <div class="weui-navbar__title">{{item}}</div>
                                </div>
                            </block>
                            <div class="weui-navbar__slider" :style="{left: sliderLeft+'px',transform:'translateX('+sliderOffset+'px)'}"></div>
                            
                        </div>
                        <div class="weui-tab__panel">
                            <div class="weui-tab__content" v-show="activeIndex == 0">
                                <order :orderList="allOrderList"></order>
                            </div>
                            <div class="weui-tab__content" v-show="activeIndex == 1">
                                <div class='empty_order_box' v-if="isEmptyDelay">
                                    <image src='../../../static/images/icon/empty.png' />
                                    <div>您还没有待付款订单！</div>
                                </div> 
                                <order :orderList="delayOrderList" v-else @del="isDelay"></order> 
                            </div>
                            <div class="weui-tab__content" v-show="activeIndex == 2">
                                <div class='empty_order_box' v-if="isEmptyDispose">
                                    <image src='../../../static/images/icon/empty.png' />
                                    <div>您还没有待收货订单！</div>
                                </div> 
                                <order :orderList="disposeOrderList" v-else @confirm="isConfirm"></order>
                            </div>
                            <div class="weui-tab__content" v-show="activeIndex == 3" >
                                <div class='empty_order_box' v-if="isEmptySuccess">
                                    <image src='../../../static/images/icon/empty.png' />
                                    <div>您还没有已完成订单！</div>
                                </div> 
                                <order :orderList="successOrderList" v-else></order>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import order from '../../../components/order'
export default {
    data(){
        return {
            tabs:['全部订单','待付款','待收货','已完成'],
            activeIndex: 0,
            sliderOffset: 0,
            sliderLeft: 0,
            isEmptyOrder:true,
            isEmptyDelay:true,
            isEmptyDispose:true,
            isEmptySuccess:true,
            allOrderList:[
                {ordernumber:145545454,status:0,productList:
                [
                    {name:'牛肉发生发誓不会发生分解哈舒服萨福卅发顺丰',price:88,url:'../../../static/images/1.png',description:'500ml',num:15},
                    {name:'猪肉爱上嘎嗦干撒空间广阔萨法沙发沙发沙发上',price:100,url:'../../../static/images/2.png',description:'300g/罐',num:12}
                ]},
                {ordernumber:545646545456,status:1,productList:
                [
                    {name:'牛肉发生发誓不会发生分解哈舒服萨福卅发顺丰',price:88,url:'../../../static/images/1.png',description:'500ml',num:15}
                ]}
            ],
            delayOrderList:[
                {ordernumber:145545454,status:1,productList:
                [
                    {name:'牛肉发生发誓不会发生分解哈舒服萨福卅发顺丰',price:88,url:'../../../static/images/1.png',description:'500ml',num:15}
                ]}
            ],
            disposeOrderList:[
                {ordernumber:145545454,status:2,productList:
                [
                    {name:'猪肉爱上嘎嗦干撒空间广阔萨法沙发沙发沙发上',price:100,url:'../../../static/images/2.png',description:'300g/罐',num:12}
                ]},
                {ordernumber:545646545456,status:2,productList:
                [
                    {name:'牛肉发生发誓不会发生分解哈舒服萨福卅发顺丰',price:88,url:'../../../static/images/1.png',description:'500ml',num:15},
                    {name:'fashfajs就告诉大家看过后开始',price:88,url:'../../../static/images/1.png',description:'500ml',num:15}
                ]}
            ],
            successOrderList:[
                // {ordernumber:145545454,status:0,productList:
                // [
                //     {name:'牛肉发生发誓不会发生分解哈舒服萨福卅发顺丰',price:88,url:'../../../static/images/1.png',description:'500ml',num:15},
                //     {name:'猪肉爱上嘎嗦干撒空间广阔萨法沙发沙发沙发上',price:100,url:'../../../static/images/2.png',description:'300g/罐',num:12}
                // ]},
                // {ordernumber:545646545456,status:0,productList:
                // [
                //     {name:'牛肉发生发誓不会发生分解哈舒服萨福卅发顺丰',price:88,url:'../../../static/images/1.png',description:'500ml',num:15}
                // ]}
            ]
        }
    },
    components:{
        order
    },
    methods:{
        tabClick(index,event){
            this.sliderOffset=event.currentTarget.offsetLeft
            this.activeIndex=index
        },
        isDelay(data){
            this.delayOrderList=data
            if(this.delayOrderList.length==0){
                this.isEmptyDelay=true
            }
        },
        isConfirm(data){
            this.disposeOrderList=data
            if(this.disposeOrderList.length==0){
                this.isEmptyDispose=true
            }
        }
    },
    mounted(){
        if(this.allOrderList.length!=0){
            this.isEmptyOrder=false
        }else{
            this.isEmptyOrder=true
        }
        if(this.delayOrderList.length!=0){
            this.isEmptyDelay=false
        }else{
            this.isEmptyDelay=true
        }
        if(this.disposeOrderList.length!=0){
            this.isEmptyDispose=false
        }else{
            this.isEmptyDispose=true
        }
        if(this.successOrderList.length!=0){
            this.isEmptySuccess=false
        }else{
            this.isEmptySuccess=true
        }
        
    }
}
</script>
<style scoped>

.empty_order_box{
  background: #fff;
  text-align: center;
  padding:50px 15px;
}
.empty_order_box>image{
  width:253px;
  height: 134px;
  margin:15px 0;
}
.empty_order_box>div{
  font-size: 28rpx;
  color:#666;
}
.weui-navbar__item.weui-bar__item_on{
    color:#f73859;
}
.weui-navbar__slider{
    width: 5em;
    background-color:#f73859;
}

</style>
