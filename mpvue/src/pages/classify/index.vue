<template>
    <div class="classify_box">
        <search></search>
        <div class='box'>
            <div class='left-nav'>
                <scroll-div scroll-y style='height:19.3em;' class='menu'>
                <div v-for="(classifyBtn,index) in menu"  class="left-nav-btn" :key="index"  
                @click='toggle(index)' :class="scrollNum==index?'on':''">
                    {{classifyBtn}}
                </div>
                </scroll-div>
            </div>
            <div class='right-content'>
                <scroll-view  scroll-y style='height:1026rpx;' 
                    :scroll-top="scrollTop" @scroll="scroll" :scroll-into-view="toView">
                <div v-for="(good,index) in goods" :key="index" :id="good.id">
                    <label class="typename">{{good.name}}</label>
                    <div class='right-content-item' v-for="(item,i) in good.children" :key="i">
                    <div class='item-box'>
                        <image :src='item.img' class="thumb" />
                        <div>
                            <text>{{item.name}}</text>
                            <div>销量：{{item.number}}</div>
                            <div>
                                <span>￥{{item.price}}</span>
                                <image src="../../static/images/icon/buy.png" alt="" class="buy" />
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </scroll-view>
            </div>
        </div>
    </div>
</template>
<script>
import search from '../../components/search'
export default {
    data(){
        return {
            scrollNum: 0,
            scrollTop: 0,
            typeHeight: 46,
            goodHeight: 88,
            toView:'food',
            menu: ['瓜果蔬菜', '粮油米面', '分类3', '分类4', '分类5', '分类6', '分类7', '分类8'],
            menuType: ['food', 'dust', 'bowl', 'cages', 'toys', 'tools','aa','bb'],
            goods: [
                {
                    name: '瓜果蔬菜', id:'food' , children:
                    [
                        { img: '../../static/images/1.png', name: '图片1', number: 10 ,price:64},
                        { img: '../../static/images/2.png', name: '图片2', number: 10,price:64 },
                        { img: '../../static/images/4.png', name: '图片4', number: 10 ,price:64},
                        { img: '../../static/images/5.png', name: '图片5', number: 10,price:64 }
                        
                    ]
                },
                { name: '粮油米面', id:'dust', children: [
                    { img: '../../static/images/6.png', name: '图片6', number: 10 },
                    { img: '../../static/images/7.png', name: '图片7', number: 10 },
                    { img: '../../static/images/8.png', name: '图片8', number: 10 }
                ] },
                {
                    name: '分类3', id: 'bowl', children:
                    [
                        { img: '../../static/images/3.png', name: '图片3' }
                    ]
                },
                {
                    name: '分类4', id:'cages',  children: [{ img: '../../static/images/1.png', name: '图片1', number: 10 },
                    { img: '../../static/images/2.png', name: '图片2', number: 10 }]
                },
                { name: '分类5', id:'toys',  children: [{ img: '../../static/images/5.png', name: '图片5', number: 10 }, { img: '../../static/images/4.png', name: '图片4', number: 10 }] },
                { name: '分类6', id: 'tools',  children: [{ img: '../../static/images/6.png', name: '图片6', number: 10 }] },
                { name: '分类7', id:'aa',  children: [{ img: '../../static/images/7.png', name: '图片7', number: 10 }] },
                { name: '分类8', id:'bb', children: [{ img: '../../static/images/8.png', name: '图片8', number: 10 }] }
            ]
        }
    },
    components:{
        search
    },
    methods:{
        toggle(index){
            // console.log(index)
            this.scrollNum=index
            console.log(this.scrollNum)
            let viewTxt=this.menuType[index]
            this.toView=viewTxt
            console.log(this.toView)
        },
        scroll(e){
            // console.log(e)
            let heightList = [0];
            let curHeight = 0;
            this.goods.forEach((item) => {
                curHeight += (this.typeHeight + item.children.length * this.goodHeight);
                // console.log(curHeight)
                heightList.push(curHeight);
                // console.log(heightList)
            })
            for (let i = 0; i < heightList.length; i++) {
                // console.log(this)
                if (e.mp.detail.scrollTop >= heightList[i] && e.mp.detail.scrollTop < heightList[i + 1]) {
                    this.scrollNum=i
                }
            }
        }
    }
}
</script>
<style scoped>
page{
  height: 100%;
}
::-webkit-scrollbar{
  width:0;
  height: 0;
  color: transparent;
}
.box{
  width:100%;
  height: 100%;
  overflow: hidden;
}
.left-nav{
  float: left;
  width:28%;
  background: #efefef;
}
.left-nav-btn{
  box-sizing: border-box;
  padding:17rpx 40rpx;
  text-align: center;
  color:#555;
  font-size: 26rpx;
  border-bottom: 1rpx solid #fcfcfc;
  background: #fbf0f0;
}
.left-nav-btn:first-child{
  border-top:1rpx solid #fcfcfc;
}
.left-nav-btn:last-child{
  border-bottom: none;
}
.left-nav-btn.on{
  background: #fff;
  color:#f73859;
  border-left: 10rpx solid #f73859;
}

.right-content{
  float: right;
  width:72%;
  height: 100%;
  background: #fff;
}
.item-box{
  padding:10rpx 20rpx;
  display: flex;
  font-size:28rpx;
}
.item-box .thumb{
  width:180rpx;
  height: 174rpx;
  margin-top:20rpx;
}
.item-box>div{
  flex-grow: 1;
  padding:15rpx 0 15rpx 15rpx;
  line-height:56rpx;
  color: #333;
}
.item-box>div>text{
  font-size:28rpx;
  margin:0 0 5rpx;
}
.item-box .buy{
    width: 64rpx;
    height: 64rpx;
}
.item-box>div>div:last-child{
    display: flex;
    justify-content: space-between;
    padding-right: 30rpx;
}
.item-box>div>div:last-child>span{
    line-height: 70rpx;
    color:#f73859;
}
.typename{
  display:block;
  line-height: 2.7em;
  padding:0 0.7em;
  color:#666;
  font-size:29rpx;
  background: #F8F8F8;
  position: relative;
  text-align: center;
}
</style>
