<template>
  <div class="container">
    <search></search>
    <swiper :swiperList='imgList'></swiper>
    <notice :iconUrl="indexNoticeUrl"></notice>
    <div class="grid">
      <grid :grids="gridList"></grid>
      <grid :grids="aa"></grid>
    </div>
    <div class="first_floor">
      <image src="../../static/images/true.jpg" alt="" class="title title_1" />
      
      <scroll-view scroll-x class="scroll">
        <navigator class="scroll_item" v-for="(sale,index) in sales" :key="index" 
          :url="'../detail/main?detailId='+sale.productId" hover-class="none">
          <image :src="sale.url" alt="" class="discount" />
          <div>
            <p class="sub_title">{{sale.subTitle}}</p>
            <p class="price">
              <span>￥{{sale.newPrice}}</span>
              <span>￥{{sale.oldPrice}}</span>
            </p>
          </div>
        </navigator>
      </scroll-view>
    </div>

    <div class="second_floor">
      <image src="../../static/images/hot.jpg" alt="" class="title title_2" />
      <div class="goods_box">
        <navigator class="goods" v-for="(item,index) in list" :key="index" 
          :url="'../detail/main?detailId='+item.productId" hover-class="none">
          <image :src="item.url" alt="" class="goods_img"/>
          <div class="">
            <div>{{item.title}}</div>
            <div>{{item.subTitle}}</div>
            <div class="progress">
              <div>￥{{item.price}}</div>
              <div>
                <progress :percent="item.percent" active color="#f73859" />
              </div>
            </div>
          </div>
        </navigator>
      </div>
    </div>
    
  </div>
</template>

<script>
import search from '../../components/search'
import swiper from '../../components/swiper'
import notice from '../../components/notice'
import grid from '../../components/grid'

export default {
  data () {
    return {
      userInfo: {},
      indexNoticeUrl:'../../static/images/notification.png',
      imgList:[
          '../../static/images/banner_1.jpg',
          '../../static/images/banner_2.jpg',
          '../../static/images/banner_3.jpg'
      ],
      gridList:[
        {url:'',imgUrl:'../../static/images/vip.png',title:'特价会员'},
        {url:'',imgUrl:'../../static/images/hot.png',title:'火热来袭'},
        {url:'',imgUrl:'../../static/images/share-i.png',title:'大牌分享'},
        {url:'',imgUrl:'../../static/images/integral.png',title:'积分商城'},
      ],
      sales:[
        {url:'../../static/images/1.png',subTitle:'自然系列 | 混合版',newPrice:100,oldPrice:1000,productId:1},
        {url:'../../static/images/2.png',subTitle:'清新系列 | 混合版',newPrice:80,oldPrice:1000,productId:2},
        {url:'../../static/images/3.png',subTitle:'放心系列 | 混合版',newPrice:150,oldPrice:1000,productId:3},
        {url:'../../static/images/4.png',subTitle:'阿里系列 | 混合版',newPrice:110,oldPrice:1000,productId:4},
        {url:'../../static/images/5.png',subTitle:'腾讯系列 | 混合版',newPrice:16450,oldPrice:1000,productId:5}
      ],
      list:[
        {url:'../../static/images/1.png',title:'自然系列 | 混合版',subTitle:'爱就爱健身房',price:100,productId:6,percent:10},
        {url:'../../static/images/2.png',title:'清新系列 | 混合版',subTitle:'爱就爱健身房',price:80,productId:7,percent:30},
        {url:'../../static/images/3.png',title:'放心系列 | 混合版',subTitle:'爱就爱健身房',price:150,productId:8,percent:80},
        {url:'../../static/images/4.png',title:'阿里系列 | 混合版',subTitle:'爱就爱健身房',price:110,productId:9,percent:50},
        {url:'../../static/images/5.png',title:'腾讯系列 | 混合版',subTitle:'爱就爱健身房',price:16450,productId:10,percent:60},
        {url:'../../static/images/6.png',title:'腾讯系列 | 混合版',subTitle:'爱就爱健身房',price:16450,productId:11,percent:90},
      ]
    }
  },

  components: {search,notice,swiper,grid},

  methods:{
    
  },
  // 上拉加载，拉到底部触发
  onReachBottom() {
    //每次上拉请求一遍
    let arr=[
      {url:'../../static/images/7.png',title:'腾讯系列 | 混合版',subTitle:'爱就爱健身房',price:16450,productId:12},
      {url:'../../static/images/8.png',title:'腾讯系列 | 混合版',subTitle:'爱就爱健身房',price:16450,productId:13}
    ]
    this.list=this.list.concat(arr)
  },
}
</script>

<style scoped>
image{
    display: block;
}
.container{
  background: #efefef;
}
.grid{
  margin-bottom:20rpx;
  width: 100%;
  background: #fff;
}
.title{
  width:750rpx;
  display: block;
 
}
.title_1{
  height:304rpx;
  margin-bottom:8rpx;
}
.title_2{
  height:252rpx;
}
.first_floor,.second_floor{
  width: 100%;
  background: #fff;
}
.scroll{
  width:100%;
  white-space: nowrap; 
  display: flex;
  padding:10rpx 0;
}
.scroll_item{
  width:43%;
  height: 418rpx;
  margin:5rpx 10rpx;
  display: inline-block;
  padding:5rpx;
}
.discount,.goods_img{
  width:100%;
  height: 278rpx;
  margin-bottom: 15rpx;
}
.scroll_item p{
  line-height: 60rpx;
  font-size: 28rpx;
  letter-spacing:4rpx;
}
.price>span:first-child{
  color:#f73859;
  margin-right:15rpx;
}
.price>span:last-child{
  color:#aaa;
  font-size:24rpx;
  text-decoration: line-through;
}
.second_floor{
  min-height: 500rpx;
  margin-top:20rpx;
}
.goods_box{
  display: flex;
  width:100%;
  flex-flow:row wrap;
  padding:0 10rpx;
  justify-content:space-around; 
  box-sizing: border-box;
}
.goods{
  width: 46%;
  margin:15rpx;
  text-align:center;
  background-color:#fff;
  border-radius:5rpx;
  box-shadow:0 5px 5px rgba(34, 25, 25, 0.4);
  padding:10rpx 0;
}
.goods div{
  line-height: 50rpx;
  color:#000;
}
.goods div:first-child{
  font-size: 30rpx;
}
.goods div:nth-child(2){
  color:#666;
  font-size:24rpx;
}
.goods div.progress{
  display:flex;
  padding:0 30rpx;
}
.progress>div:first-child{
  color:#f73859;
  font-size:26rpx;
}
.progress>div:last-child{
  flex:1;
  margin-left: 15rpx;
}
progress{
  margin-top: 20rpx;
}
</style>
