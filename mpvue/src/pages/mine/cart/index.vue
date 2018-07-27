<template>
    <div class="">
        <div v-if="isEmpty" class="empty_box">
            <image src="../../../static/images/icon/1.png" alt="" class="empty" />
            <button type="warn" hover-class="none">世界那么大，我想去看看</button>
            <p>猜你喜欢</p>
        </div>
        <div v-else class="full_box">
            <div class="weui-panel weui-panel_access">
                <div class="weui-panel__hd">
                    <span>商品列表</span>
                    <span class="touch">左滑删除</span>
                </div>
                <div class="weui-panel__bd">
                    <div class="touch-item" @touchstart="touchstart" @touchmove="touchmove" 
                    v-for="(item,index) in cartList" :key="index" :data-index="index" :class="item.isTouchMove ? 'touch-move-active' : ''">
                        <div class="weui-media-box weui-media-box_appmsg">
                        <div>
                            <icon class="weui-icon-checkbox_success" type="success" color="#f73859" size="23" v-if='item.selected'  @click='select(index)'></icon>
                            <icon class="weui-icon-checkbox_circle" type="circle" size="23"  @click='select(index)' v-else></icon>
                        </div>
                        <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
                            <image class="weui-media-box__thumb" :src="item.url" />
                        </div>
                        <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
                            <div class="weui-media-box__title">{{item.name}}</div>
                            <div class="weui-media-box__desc">{{item.description}}</div>
                            <div class="weui-media-box__foot">
                                <span>￥{{item.price}}</span>
                                <div class="quantity_box">
                                    <div class="quantity quantity_minus" :class="item.num<=1?'on':''" @click="reduceCount(index)">-</div>
                                    <input type="number" class="quantity_text" v-model="item.num" @blur="handleBlurCount(index)" />
                                    <div class="quantity quantity_plus" :class="item.num>=item.inventory?'on':''" @click="addCount(index)">+</div>
                                </div>
                            </div>
                        </div>
                        
                        </div>
                        <div class="del" @click="del(index)">删除</div>
                    </div>
                </div>
            </div>
            <div class='accounts_box'>
                <div class='select_all_icon'>
                    <div class="weui-cell__hd weui-check__hd_in-checkbox">
                        <icon class="weui-icon-checkbox_success" type="success" color="#f73859" size="23" 
                        v-if="isSelectAll"  @click='selectAll'></icon>
                        <icon class="weui-icon-checkbox_circle" type="circle" size="23"  
                        @click='selectAll' v-else></icon>
                    </div>
                    <div class="weui-cell__bd">全选</div>
                </div>
                <div class='order_box'>
                    <div class='total'>
                        合计：￥{{totalPrice}}
                    </div>
                    <div @click="order">结算</div>
                </div>
            </div>
        </div>
        <mptoast></mptoast>
    </div>
</template>
<script>

import {mapGetters} from 'vuex'
import mptoast from 'mptoast'
export default {
    data(){
        return {
            isEmpty:true,
            isSelectAll:false,
            totalPrice:0,
            startX: 0, //开始坐标
            startY: 0,
        }
    },
    components:{
        mptoast
    },
    computed:{
        ...mapGetters(['cartList'])
    },
    methods:{
        del(index){
            wx.showModal({
                content:'确定要抛弃我吗？？？',
                success:(res)=>{
                    if(res.confirm){
                        // this.cartList.splice(index,1)
                        this.$store.dispatch('del',index)
                        this.getTotalPrice()
                        if(this.cartList.length==0){
                            this.isEmpty=true
                        }
                    }else if(res.cancel){
                        console.log('点击取消')
                    }
                }
            })
        },
        addCount(index){
            if(this.cartList[index].num>=this.cartList[index].inventory){
                this.$mptoast('再买就没啦！！！')
                this.cartList[index].num=this.cartList[index].inventory
            }else{
                this.cartList[index].num++
            }
            this.getTotalPrice()
        },
        reduceCount(index){
            if(this.cartList[index].num<=1){
                this.$mptoast('不能买0个啊！！！')
                this.cartList[index].num=1
            }else{
                this.cartList[index].num--
            }
            this.getTotalPrice()
        },
        handleBlurCount(index){
            if(this.cartList[index].num==''||this.cartList[index].num<=0){
                this.cartList[index].num=1
            }else if(this.cartList[index].num>=this.cartList[index].inventory){
                this.cartList[index].num=this.cartList[index].inventory
            }
        },
        getTotalPrice(){
            let total=0
            for(let item of this.cartList){
                if(item.selected){
                    total+=item.price*item.num
                }
            }
            this.totalPrice=total.toFixed(2)
        },
        order(){
            console.log(this.cartList)
            let list=[];
            for(let item of this.cartList){
                if(item.selected){
                    list.push(item)
                }
            }
            if(list.length>0){
                wx.navigateTo({
                    url:'../../detail/confirmOrder/main'
                })
                this.isSelectAll=false
                this.totalPrice=0
            }else{
                this.$mptoast('客官不可以！！！')
            }
        },
        select(index){
            this.cartList[index].selected=!this.cartList[index].selected
            let count=0
            if(!this.cartList[index].selected&&this.isSelectAll){
                this.isSelectAll=false
            }
            for(let item of this.cartList){
                if(item.selected){
                    count++
                    if(count==this.cartList.length){
                        this.selectAll()
                    }
                }
            }
            this.getTotalPrice()
        },
        selectAll(){
            this.isSelectAll=!this.isSelectAll
            for(let item of this.cartList){
                item.selected=this.isSelectAll
            }
            this.getTotalPrice()
        },

        //手指触摸动作开始 记录起点X坐标
        touchstart(event){
            // console.log(event)//当前滑动对象
            //开始触摸时 重置所有删除
            this.cartList.forEach(function (v, i) {
            if (v.isTouchMove)//只操作为true的
                v.isTouchMove = false;
            })
            this.startX=event.clientX
            this.startY=event.clientY
        },

        //滑动事件处理
        touchmove(event){
            let index=event.currentTarget.dataset.index
            let startX = this.startX//开始X坐标
            let startY = this.startY//开始Y坐标
            let touchMoveX = event.clientX//滑动变化坐标
            let touchMoveY = event.clientY//滑动变化坐标
            //获取滑动角度
            let angle = this.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
            this.cartList.forEach(function (v, i) {
                v.isTouchMove = false
                //滑动超过30度角 return
                if (Math.abs(angle) > 30) return;
                if (i == index) {
                    if (touchMoveX > startX) //右滑
                    v.isTouchMove = false
                    else //左滑
                    v.isTouchMove = true
                }
            })
        },
        /**
         * 计算滑动角度
         * @param {Object} start 起点坐标
         * @param {Object} end 终点坐标
         */
        angle(start,end){
            var _X = end.X - start.X,
            _Y = end.Y - start.Y
            //返回角度 /Math.atan()返回数字的反正切值
            return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
        }
    },
    mounted(){
        if(this.cartList.length!=0){
            this.isEmpty=false
        }
    }
}
</script>
<style scoped>
.weui-panel__hd{
    color: #333;
    padding: 25rpx 30rpx;
}
.weui-panel::after{
    border-bottom: 0;
}
.weui-media-box{
    padding:20rpx 15rpx;
    width: 100%;
    margin-right:0;
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
    -webkit-transform: translateX(160rpx);
    transform: translateX(160rpx);
    margin-left: -160rpx;
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
    color:#f73859;
}
.weui-media-box__foot{
    display: flex;
    justify-content: space-between;
    line-height: 56rpx;
    padding-right: 40rpx;
}
.weui-media-box__foot .quantity,.weui-media-box__foot .quantity_text{
    text-align: center;
}
.weui-media-box__foot .quantity{
    width:60rpx;
}



.empty_box{
    text-align: center;
    padding: 50rpx;
}
.empty{
    width: 340rpx;
    height: 288rpx;
}
button[type=warn]{
    background:#f73859;
    width: 50%;
    font-size: 24rpx;
    margin-top:10rpx;
}
button::after{
    border: none
}
.touch{
    border:1rpx solid #f73859;
    padding:0 10rpx;
    float: right;
    border-radius: 5rpx;
    color:#666;
    font-size: 24rpx;
}


.touch-item {
  font-size: 28rpx;
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
  margin-bottom:10rpx;
  background:#fafafa;
}
.touch-item:last-child{
    margin-bottom: 0;
}
.del{
  background-color: #f73859;
  width: 160rpx;
  font-size: 26rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  -webkit-transform: translateX(160rpx);
  transform: translateX(160rpx);
  -webkit-transition: all 0.4s;
  transition: all 0.4s;
}
.touch-move-active .weui-media-box,
.touch-move-active .del {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}


/* 底部全选以及其他 */
.accounts_box{
  display:flex;
  position: fixed;
  bottom:0;
  width:100%;
  height: 40px;
  background: #fff;
}
.select_all_icon{
  flex-grow: 0.3;
  padding-left: 15rpx;
}
.select_all_icon>div{
  display: inline-block;
  height: 40px;
}
.accounts_box .weui-cell__bd{
  line-height: 40px;
  font-size: 14px;
}
.order_box{
  display: flex;
  justify-content: space-between;
  flex-grow:0.7;
}
.accounts_box label,.order_box{
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
.total{
  color: #f73859;
  padding:0 10px;
  box-sizing: border-box;
  width:358rpx;
}
.order_box>div:last-child{
  width:188rpx;
  background:#f73859;
  color:#fff;
  text-align: center;
}
</style>
