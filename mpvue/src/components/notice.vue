<template>
    <div class="notice_box">
        <div id='canvas' class="notice_bar">
            <image :src='iconUrl' class="icon" />
            <canvas style="color:red;" canvas-id="firstCanvas"></canvas>
        </div>
    </div>
</template>
<script>
import noticeScroll from '../utils/noticeScroll.js'
export default {
    data(){
        return {
            
        }
    },
    props:{
        iconUrl:{
            type:String,
            default:''
        }
    },
    mounted(){
        let str='符合撒饭哈啊哈哈思考更何况骄傲和烧烤工具安徽发回家啊上飞机啊是个哈苏过舒服噶事噶就是个会发生尬'
        noticeScroll('firstCanvas',str)
        
        
    }
    
}
</script>



<style scoped>
.notice_box{
    width:100%;
    display:flex;
    /* background-image: linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);  */
    background-color:#E3FDFD;
    height:60rpx;
    line-height:60rpx;
    color:red;
}
.notice_bar{
    width:100%;
}
.icon{
    width: 44rpx;
    height: 44rpx;
    margin:0 15rpx;
    position: relative;
    top:-8rpx;
}
canvas{
    display: inline-block;
    width:90%;
    height:60rpx;
}
</style>
