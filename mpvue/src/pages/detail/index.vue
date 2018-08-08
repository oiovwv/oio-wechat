<template>
    <div class="detail_box">
        <swiper :swiperList="detailImgBanner" :autoPlay="autoPlay" :direction="direction"></swiper>
        <div class="weui-panel info">
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_text">
                    <div class="weui-media-box__title weui-media-box__title_in-text">{{productInfo[0].productName}}</div>  
                    <div class="weui-media-box__info">
                        <div class="weui-media-box__info__meta price">价格：</div>
                        <div class="weui-media-box__info__meta">￥{{productInfo[0].productPrice}}</div>
                        <div class="weui-media-box__info__meta weui-media-box__info__meta_extra">销量：{{productInfo[0].productSales}}</div>
                        <div class="weui-media-box__info__meta weui-media-box__info__meta_extra">库存：{{productInfo[0].productInventory}}</div>
                    </div>
                </div>
                <div class="weui-cell">
                    <div>
                        运费：￥10.00-20.00
                    </div>
                    <div>
                        <span>满减</span>
                        <span>包邮</span>
                        满68包邮
                    </div>
                </div>
            </div>
        </div>
        <div class="weui-panel attestation">
            <div class="weui-cell">
                <div>
                    <image src="../../static/images/icon/tick.png" alt="" class="tick" />
                    企业认证
                </div>
                <div>
                    <image src="../../static/images/icon/tick.png" alt="" class="tick" />
                    店铺认证
                </div>
                <div>
                    <image src="../../static/images/icon/tick.png" alt="" class="tick" />
                    担保交易
                </div>
                <div>
                    <image src="../../static/images/icon/tick.png" alt="" class="tick" />
                    线下门店
                </div>
            </div>
        </div>
         <div class="weui-panel info_comment">
            <div class="weui-tab">
                <div class="weui-navbar">
                    <block v-for="(item,index) in tabs" :key="index">
                        <div class="weui-navbar__item" :class="activeIndex == index ? 'weui-bar__item_on' : ''" @click="tabClick(index,$event)">
                            <div class="weui-navbar__title">{{item}}</div>
                        </div>
                    </block>
                   
                    
                </div>
                <div class="weui-tab__panel">
                    <div class="weui-tab__content" v-show="activeIndex == 0">
                        <div class="weui-loadmore weui-loadmore_line">
                            <div class="weui-loadmore__tips weui-loadmore__tips_in-line">商品介绍</div>
                        </div>
                        <div class='particulars'>
                            {{productInfo[0].productIntroduction}}
                        </div>
                        <image v-for="(item,index) in productInfo[0].productImgBanner" :key="index" :src="item" @click='predivImage' />
                    </div>
                    <div class="weui-tab__content comment" v-show="activeIndex == 1">
                        <div class="weui-panel weui-panel_access">
                            <div class="weui-panel__hd">热门评论</div>
                            <div class="weui-panel__bd">
                                <div  class="weui-media-box weui-media-box_appmsg" v-for="(item,index) in commentList" :key="index">
                                    <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
                                        <image mode="aspectFit" class="weui-media-box__thumb" :src="item.commentUserAvatar" />
                                    </div>
                                    <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
                                        <div class="weui-media-box__title">{{item.commentUserName}}</div>
                                        <div class="weui-media-box__desc">{{item.commentInfo}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="weui-cells__title">
                                <image src="../../static/images/comment.png" alt="" />
                            </div>
                                <div class="weui-cell">
                                    <div class="weui-cell__bd">
                                        <textarea  placeholder="请输入文本" style="height: 3.3em" v-model="comment"/>
                                        <div class="weui-textarea-counter">0/200</div>
                                    </div>
                                </div>
                            
                            <button hover-class="none" @click="addComment">提交评论</button>                
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="operation">
            <div class="left">
                <div>
                    <button open-type="contact" hover-class="none">
                        <image src="../../static/images/icon/service.png" alt="" />
                        <div>客服</div>
                    </button>
                </div>
                <div @click="toggleCollection" :class="productInfo[0].productCollectionStatus?'collection_active':''">
                    <image src="../../static/images/icon/collection.png" alt="" v-if="!productInfo[0].productCollectionStatus" />
                    <image src="../../static/images/icon/collection-actived.png" alt="" v-else/>
                    <div v-if="!productInfo[0].productCollectionStatus">收藏</div>
                    <div v-else>已收藏</div>
                </div>
                <div @click="toCart">
                    <image src="../../static/images/icon/cart.png" alt="" />
                    <div>购物车</div>
                </div>
            </div>
            <div class="right">
                <div @click="showDialog('加入购物车')">加入购物车</div>
                <div @click="showDialog('立即购买')">立即购买</div>
            </div>
        </div>

        <!-- 这是组件 -->
        <operate :isShowDialog="hasDialog" @hDialog="hideDialog" :productId="productId"></operate>
    </div>    
</template>
<script>
import swiper from '../../components/swiper'
import operate from '../../components/operate'

import {mapGetters} from 'vuex'
import Bus from '../../components/bus.js'


export default {
    data(){
        return {
            productId:'',
            productInfo:[
                {productId:'',productName:'爆炒黄牛肉',productPrice:33,productSales:10,productInventory:128,
                productIntroduction:'我是商品描述我是商品描述我是商品描述我是商品描述我是商品描述我是商品描述我是商品描述我是商品描述我是商品描述我是商品描述',
                productCollectionStatus:false,productImgBanner:[
                    '../../static/images/banner_1.jpg',
                    '../../static/images/banner_2.jpg',
                    '../../static/images/banner_3.jpg'
                ]}
            ],
            detailImgBanner:[
                '../../static/images/banner_1.jpg',
                '../../static/images/banner_2.jpg',
                '../../static/images/banner_3.jpg'
            ],
            autoPlay:false,
            direction:true,
            isCollection:false,
            hasDialog:false,
            isAnimate:true,
            tabs:['商品详情','评论列表'],
            activeIndex: 0,
            commentList:[
                {commentUserName:'哒哒',commentUserAvatar:'../../static/images/icon/avatar_1.jpg',commentInfo:'我是第一个评论内容'},
                {commentUserName:'奔奔',commentUserAvatar:'../../static/images/icon/avatar_2.jpg',commentInfo:'我是第二个评论内容'},
                {commentUserName:'嘟嘟',commentUserAvatar:'../../static/images/icon/avatar_3.jpg',commentInfo:'我是第三个评论内容'},
                {commentUserName:'嘻嘻',commentUserAvatar:'../../static/images/icon/avatar_4.jpg',commentInfo:'我是第四个评论内容'}
            ],
            comment:''
        }
    },
    computed:{},
    components:{
        swiper,
        operate
    },
    onLoad(){
        let arg=this.$root.$mp.query//获取跳转传递过来的参数
        this.productId=arg.detailId
        
    },
    methods:{
        tabClick(index,event){
            this.activeIndex=index
        },
        toggleCollection(){
            this.productInfo[0].productCollectionStatus=!this.productInfo[0].productCollectionStatus
        },
        showDialog(string){
            this.hasDialog=true
            if(string=='加入购物车'){
                this.$store.dispatch('change',string)  
            }else if(string=='立即购买'){
                this.$store.dispatch('change',string)
            }
        },
        hideDialog(){
            this.hasDialog=false
        },
        toCart(){
            wx.navigateTo({
                url:'../mine/cart/main'
            })
        },
        addComment(){
            console.log(this.comment)
        }
    }
}
</script>
<style scoped>
.detail_box{
    padding-bottom:110rpx;
}
.info{
    margin-top:0;
}
.info .weui-cell{
    font-size: 28rpx;
    color: #555;
    justify-content: space-between;
}
.weui-media-box__title_in-text{
    color: #666;
}

.info .weui-cell>div:last-child{
    font-size: 24rpx;
}
.info .weui-cell span{
    display: inline-block;
    padding:0 15rpx;
    border: 1rpx solid #f73859;
    color: #f73859;
    border-radius: 5rpx;
    font-size:20rpx;
    margin-left:10rpx;
}
.attestation,.info_comment{
    font-size: 26rpx;
    color: #666;
    margin-top: 10rpx;
}
.attestation .weui-cell{
    padding:10rpx 30rpx;
    line-height: 60rpx;
}
.attestation .weui-cell>div:not(:first-child){
    margin-left:15rpx;
}
.tick{
    width: 48rpx;
    height: 48rpx;
    position:relative;
    top:15rpx;
    left: 8rpx;
}
.weui-media-box{
    padding: 20rpx 30rpx;
}
.weui-media-box__info{
    color: #666;
}
.weui-media-box__info__meta:first-child{
    padding-right:0.3em;
}
.weui-media-box__info__meta:first-child,.weui-media-box__info__meta:nth-child(2){
    color:#f73859;
}
.weui-navbar{
    justify-content: space-around;
    border-color: #e9e9e9;

}
.weui-navbar__item{
    flex:0.2;
}
.weui-navbar__item.weui-bar__item_on{
    color:#f73859;
    border-bottom: 5rpx solid #f73859;
}
.weui-navbar__slider{
    width: 4em;
    background-color:#f73859;
}
.weui-media-box__hd_in-appmsg{
    margin-right: 35rpx;
}
.info_comment .weui-media-box__title{
    font-size:30rpx;
}
.weui-media-box__thumb{
    border-radius:50%;
}

.weui-loadmore_line {
    margin-bottom:0;
}
.particulars{
  padding:5px 15px;
  text-align: center;
  margin:0 auto 1em;
  font-size:13px;
  color:#666;
}
.weui-tab__content image{
    width: 100%;
    
}
.comment{
    padding-bottom:20rpx; 
}
.weui-cells__title{
    margin: 0;
    padding: 10rpx 30rpx;
}
.weui-cells__title image{
    width: 64rpx;
    height: 64rpx;
    position:relative;
    top:8rpx;
}
.comment button{
    background: #f73859;
    color: #fff;
    font-size: 28rpx;
    margin-top: 10rpx;
    width: 80%;
}




.operation,.left,.right{
    display: flex;
}
.operation{
    position: fixed;
    bottom:0;
    height: 80rpx;
    width: 100%;
}
.operation button{
    height: 100%;
    padding:0;
    color:#8a8a8a;
    font-size: 24rpx;
    border-radius: 0;
    background: #fff;
    border:none;
    line-height:1.2;
}
button::after{
    border-radius:0;
    border:0; 
}

.left{
    flex:0.8;
    border-top:1rpx solid #eee;
    background: #fff;
}

.right{
    flex: 1;
}
.left>div,.right>div{
    flex:1;
}
.left>div{
    text-align: center;
    font-size: 24rpx;
    color:#8a8a8a;
}
.left>.collection_active{
    color:#f73859;
}
.left>div>div{
    position: relative;
    top:-8rpx;
}
.left>div:first-child,.left>div:nth-child(2){
    border-right: 1rpx solid #eee;
}
.left image{
    width:32rpx;
    height: 32rpx;
    margin-top: 8rpx;
}
.operation button image{
    margin-top:10rpx; 
}
.right>div{
    height: 80rpx;
    line-height: 80rpx;
    color:#fff;
    font-size:28rpx;
    text-align: center;
}
.right>div:first-child{
    background: orange;
}
.right>div:last-child{
    background: #f73859;
}





</style>
