<template>
    <div class="grid_box">
        <div class="weui-flex">
            <div class="weui-flex__item" v-for="(grid,index) in grids" :key="index">
                <navigator :url='grid.url' hover-class='none'>
                    <image :src='grid.imgUrl' />
                    <div class="placeholder">{{grid.title}}</div>
                </navigator>
            </div>
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
        grids:{
            type:Array,
            default:[]
        }
    }
}
</script>
<style scoped>
.grid_box{
    width: 100%;
    margin:5rpx 0;
}
.weui-flex__item{
    text-align: center;
    padding: 5px;
    font-size: 28rpx;
    color:#666;
    width:25%;
    box-sizing:border-box;
}
.weui-flex__item image{
    width:80rpx;
    height: 80rpx;
}
</style>
