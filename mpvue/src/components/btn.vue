<template>
    <div class="btn">
        <button v-text="txt" @click="hideDialog(str)"></button>    
    </div>    
</template>
<script>
import {mapGetters} from 'vuex'
import Bus from './bus.js'
export default {
    data(){
        return {
            option:''
        }
    },
    props:{
        txt:{
            type:String,
            default:'确定'
        },
        productId:{
            type:Number,
            default:0
        }
    },
    computed:{
        ...mapGetters(['str','number'])
    },
    methods:{
        hideDialog(value){
            this.$emit('hide')
            if(value=='加入购物车'){
                console.log('我是加入到购物车产品id'+this.productId)
                console.log('我是加入到购物车的数量'+this.number)
                console.log('我是加入到购物车产品的规格'+this.option)
                wx.showLoading({
                    title: '加载中',
                })
                setTimeout(function(){
                    wx.hideLoading()
                },2000)
            }else if(value=='立即购买'){
                wx.navigateTo({
                    url:'../detail/confirmOrder/main'
                })
            }
            
        }
    },
    mounted(){
        Bus.$on('option',(e)=>{
            this.option=e
        })
    }
}
</script>
<style scoped>
.btn{
    width: 100%;
    height:80rpx;
    position: fixed;
    bottom: 0;
    left: 0;
}
.btn button{
    width: 100%;
    height: 100%;
    line-height: 80rpx;
    color: #fff;
    font-size: 28rpx;
    background: #f73859;
    border-radius: 0;
}
</style>
