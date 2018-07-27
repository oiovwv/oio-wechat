<template>
    <div class="swiper_box">
        <div class="slide">
            <swiper :indicator-dots="true" :autoplay="autoPlay" :interval="3000" :duration="1000" 
            indicator-active-color="#FF2E63" indicator-color="#fff" :vertical="direction">
                <swiper-item v-for="(item, index) in swiperList" :key="index">
                    <image :src="item" mode="aspectFill"/>
                </swiper-item>
            </swiper>
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
        swiperList:{
            type:Array,
            default:[]
        },
        autoPlay:{
            type:Boolean,
            default:true
        },
        direction:{
            type:Boolean,
            default:false
        }
    }
}
</script>
<style scoped>
.swiper_box{
  width: 100%;
}
.slide swiper {
  width: 100%;
  height: 480rpx;
}

.slide swiper image {
  height: 100%;
  width: 100%;
}
</style>

