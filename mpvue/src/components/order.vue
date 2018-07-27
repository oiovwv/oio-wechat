<template>
    <div>
        <div class="weui-panel weui-panel_access" v-for="(item,index) in orderList" :key="index">
            <div class="weui-panel__hd">
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">订单编号：{{item.ordernumber}}</div>               
                <div class='weui-cell__ft'>
                <div v-if="item.status==1">待付款</div>
                <div v-else-if="item.status==2">待收货</div>
                <div v-else>已完成</div>
                </div>               
            </div>
            </div>
            <div class="weui-panel__bd">
                <goods :goodsList="item.productList"></goods>
            </div>
            <div class="weui-panel__ft">
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__bd"></div>
                <div>
                    <button size="mini" hover-class="none" 
                        @click='toOrderDetail(item.status,item.ordernumber,index)'>
                        查看订单详情
                    </button>
                    <button class="pay" size="mini" hover-class="none" v-if='item.status==1' @click="deleteOrder(index)">删除订单</button>
                    <button class="pay" size="mini" hover-class="none" v-else-if='item.status==2' @click="confirmOrder(index)">确认收货</button>
                    <button class="pay" size="mini" hover-class="none" 
                        :data-price='item.price' 
                        v-if='item.status==1' 
                        :data-status='item.status' 
                        :data-orderId='item.ordernumber' @click='continuePay'>
                        继续支付
                    </button>
                    
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import goods from './goods'
export default {
    data(){
        return {
            
        }
    },
    props:{
        orderList:{
            type:Array,
            default:[]
        }
    },
    components:{
        goods
    },
    methods:{
        continuePay(){
            console.log('我在继续支付')
        },
        toOrderDetail(status,ordernumber,index){
            console.log(status,ordernumber,index)
            wx.navigateTo({
                url: 'orderDetail/main?status='+status+'&index='+index+'&ordernumber='+ordernumber
            })
        },
        deleteOrder(index){
            wx.showModal({
                content:'确认删除此订单吗？',
                success:(res)=>{
                    if(res.confirm){
                        this.orderList.splice(index,1)
                        if(this.orderList.length==0){
                            this.$emit('del',this.orderList)
                        }
                    }
                }
            })
        },
        confirmOrder(index){
            wx.showModal({
                content:'您确定已经拿到宝贝了吗？',
                success:(res)=>{
                    if(res.confirm){
                        this.orderList.splice(index,1)
                        if(this.orderList.length==0){
                            this.$emit('confirm',this.orderList)
                        }
                    }
                }
            })
        }
    }
}
</script>
<style scoped>

.weui-panel__hd{
    padding: 0;
}
.weui-panel:not(:first-child){
    margin-top: 10rpx;
}

.weui-cell_access>div{
    line-height: 1;
}
.weui-cell_access>div>button{
    font-size: 20rpx;
    padding:0 14rpx;
}
.pay{
    border-color: #f73859;
    color: #f73859;
    margin-left:15rpx; 
}
</style>
