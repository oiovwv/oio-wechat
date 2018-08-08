<template>
    <div class="dialog_box" v-if="isShowDialog">
        <div class="mask" @click="hideDialog"></div>
        <div class="dialog" :class="isShowDialog?'on':''">
            <div class="weui-media-box weui-media-box_appmsg">
                <view class="weui-media-box__hd weui-media-box__hd_in-appmsg">
                    <image class="weui-media-box__thumb" src="../../static/images/1.png" />
                </view>
                <view class="weui-media-box__bd weui-media-box__bd_in-appmsg">
                    <view class="weui-media-box__title">球有一定的形状，有自己的运行轨道。</view>
                    <view class="weui-media-box__desc">
                        <div>单价：￥100</div>
                        
                    </view>
                </view>   
            </div>
            <div class="options description">
                <div class="option">规格：</div>
                <div>
                    <ul class="chooser-list">
                        <li v-for="(item,index) in items" :key="index" :class="currentId==index?'active':''" 
                        @click="choose(index,item.name)">
                            {{item.name}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="options num">
                <div class="option">购买数量：</div>
                <div class="quantity_box">
                    <div class="quantity quantity_minus" :class="number<=1?'on':''" @click="reduce">-</div>
                    <input type="number" class="quantity_text" v-model="number" @blur="handleBlur" />
                    <div class="quantity quantity_plus" :class="number>=10?'on':''" @click="add">+</div>
                </div>
                <div class="inventory">库存：100</div>
            </div>
            <div class="btn">
                <btn :txt="str" @hide="hideDialog" :productId="productId" ></btn>
            </div>
            <image src="../../static/images/icon/closed.png" alt="" class="close" @click="hideDialog"/>
        </div>
        <mptoast></mptoast>
    </div>
</template>
<script>
import mptoast from 'mptoast'
import {mapGetters} from 'vuex'
import btn from './btn'
import Bus from './bus.js'
export default {
    data(){
        return {
            items:[
                {value:0,name:'500ml'},
                {value:1,name:'1500ml'},
                {value:2,name:'2000ml'}
            ],
            currentId:0
        }
    },
    props:{
        isShowDialog:{
            type:Boolean,
            default:false
        },
        productId:{
            type:Number,
            default:0
        }
    },
    computed:{
        ...mapGetters(['str','number'])
    },
    components:{
        mptoast,btn
    },
    mounted(){
        
        // if(this.currentId==0){
        //     console.log(this.items[0].name)
        // }
    },
    methods:{
        hideDialog(){
            //通过$emit调用父组件传递过来的方法
            this.$emit('hDialog')
            
            // this.$store.dispatch('choose')
        },
        add(){
            // this.number++
            // if(this.number>10){
            //     this.number=10 
            // }   
            this.$store.dispatch('add')
        },
        reduce(){ 
            // this.number--
            // if(this.number<=1){
            //     this.number=1
            // }
            this.$store.dispatch('reduce')
        },
        handleBlur(){
            // if(this.number==''||this.number<=0){
            //     this.number=1
            // }
            this.$store.dispatch('handleBlur')
        },
        choose(index,value){
            this.currentId=index
            this.$store.dispatch('choose')
            Bus.$emit('option',value)
        }
    }
}
</script>
<style scoped>
.radio,radio{
    display:none;
}
.radio text{
    display: inline-block;
}
.mask{
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,.3);
}
.dialog{
    position: fixed;
    bottom:0;
    z-index: 5000;
    width: 100%;
    height: 468rpx;
    background-color: #FFFFFF;
    text-align: center;
    font-size:30rpx;
    box-sizing: border-box;
    transform: translateY(490rpx);
}
.dialog.on{
    transform: translateY(0);
    transition:all 0.4s ease;
    transition-delay: 2s;
}
.weui-media-box_appmsg,.options{
    position: relative;
    top:-46rpx;
}
.weui-media-box__hd_in-appmsg{
    width: 168rpx;
    height: 168rpx;
}
input{
    height: 60rpx;
    background: #fff;
    box-sizing:border-box;
    text-align:center;
}
.close{
    width:48rpx;
    height: 48rpx;
    position:absolute;
    top: 5rpx;
    right: 10rpx;
}
.dialog .weui-media-box__title,.dialog .weui-media-box__desc{
    font-size: 26rpx;
    color:#f73859;
}
.dialog .weui-media-box__desc{
    display:flex;
    margin-top: 18rpx;
    padding-left: 26rpx;
}
.options{
    padding: 0 30rpx;
    height: 60rpx;
    line-height: 60rpx;
}
.num{
    top:-8rpx;
}
.option{
    width: 160rpx;
    padding:0 10rpx;
    text-align: left;
}
.inventory{
    margin-left: 30rpx;
    color:orange;
    font-size: 28rpx;
}
.chooser-list li{
  display: inline-block;
  border: 1rpx solid #e3e3e3;
  height: 60rpx;
  line-height: 58rpx;
  padding: 0 16rpx;
  margin-right: 15rpx;
  border-radius: 6rpx;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
}
.chooser-list li.active {
  border-color: #f73859;
  background: #f73859;
  color: #fff;
}

</style>
