<template>
    <div>
        <div class="empty_box" v-if="isEmptyAddress">
            <image src="../../../static/images/icon/1.png" alt="" class="empty"/>
            <button v-text="str" class="btn" hover-class="none" @click="addAddress('新增')"></button>
        </div>
        <div v-else>
            <div class="weui-cells weui-cells_after-title">
                <div class="weui-cell weui-cell_access" @click="addAddress('新增')">
                <div class="weui-cell__hd">
                    <image src='../../../static/images/add.png' class='add_addr_icon' />
                </div>
                <div class="weui-cell__bd">添加新地址</div>
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
                </div>
            </div> 
            <image src='../../../static/images/youjitiao@2x.png' class='ribbon' />
            <div>
                <div class='label' v-for="(item,index) in addressList" :key="index">
                <div class="weui-panel__bd" @click='chooserShippingAddr'>  
                    <div class="weui-media-box weui-media-box_text">
                    <div class="weui-media-box__title weui-media-box__title_in-text">
                        <div class='info'>
                        <div>{{item.addressName}}</div>
                        <div>{{item.addressPhone}}</div>
                        </div>
                    </div>
                    <div class="weui-media-box__desc">{{item.addressProvinces}}{{item.addressPath}}</div>  
                    </div>         
                </div>
                <div class='edit'>
                    <div>
                        <switch color="#f73859" :checked="item.status==1?true:false" @change='setDefault(index)'></switch> 
                        <text>{{item.status==1?'默认地址':'设为默认'}}</text>
                    </div>
                    <div>
                        <button  @click='del(index)' size="mini" hover-class="none">    
                            <image src='../../../static/images/del.png' />
                            删除
                        </button>
                        <button size="mini" class="" @click='edit(index)' :operation="edit" hover-class="none">
                            <image src='../../../static/images/edit.png' />
                            修改
                        </button>
                    </div>
                </div> 
                </div>
            </div> 
        </div>
    </div>
</template>
<script>
import btn from '../../../components/btn'
export default {
    data(){
        return {
            isEmptyAddress:true,
            str:'+新增收货地址',
            addressList:[
                {addressName:'啊啊',addressPhone:'1212121212',addressProvinces:'安徽省合肥市高新区',addressPath:'柏堰科技园',status:1,gender:0},
                {addressName:'啊啊',addressPhone:'1212121212',addressProvinces:'安徽省合肥市高新区',addressPath:'柏堰科技园',status:0,gender:1}
            ]
        }
    },
    components:{
        btn
    },
    methods:{
        chooserShippingAddr(){
            console.log('选择此地址')
        },
        addAddress(str){
            wx.navigateTo({
                url:'addAddress/main?operate='+str
            })
        },
        setDefault(index){
            console.log(index+'设置为默认')
        },
        del(index){
            wx.showModal({
                content:'确定删除此地址吗？',
                success:(res)=>{
                    if(res.confirm){
                        this.addressList.splice(index,1)
                        if(this.addressList.length==0){
                            this.isEmptyAddress=true
                        }
                    }
                }
            })
        },
        edit(index){
            wx.setStorage({
                key: 'editAddress',
                data: this.addressList[index],
            });
            wx.navigateTo({
                url:'addAddress/main?operate=修改',
                success:()=>{
                    wx.setNavigationBarTitle({
                    title: '修改地址',
                    });
                }
            })
        }
    },
    
    created(){
        if(this.addressList.length==0){
            this.isEmptyAddress=true
        }else{
            this.isEmptyAddress=false
        }
    }
}
</script>
<style scoped>
.add_addr_icon{
    width:48rpx;
    height: 48rpx;
    margin-right:15rpx;
    position: relative;
    top:4rpx;
}
.weui-cell__bd{
    color: #666;
    font-size: 30rpx;
}
.ribbon{
    margin-top: 15rpx;
}

.label{
  margin-bottom:12rpx;
}
.weui-panel__bd{
  background: #fff;
  padding: 15rpx 0;
  border-bottom: 1rpx solid #e5e5e5;
}
.weui-media-box{
  display:inline-block; 
  padding:20rpx 30rpx;
  width:100%;
  box-sizing: border-box;
}
.weui-media-box:before{
  border:none;
}
.weui-media-box__title{
  font-size: 28rpx;
}
.weui-media-box__title_in-text{
  margin-bottom: 15rpx;
}
.info,.edit{
  display: flex;
  justify-content: space-between;
}
.edit{
  padding:10rpx 30rpx 12rpx;
  text-align: right;
  background: #fff;
  height: 65rpx;
}
.edit>div:first-child{
  font-size:28rpx;
  color:#666;
  height: 50rpx;
  line-height: 50rpx;
}
.edit>div:last-child{
    position: relative;
    top: 8rpx;
}
.edit text{
  position:relative;
  top:4rpx;
}
.edit button>image{
  width:32rpx;
  height:32rpx;
  position:relative;
  top:3px;
}
.edit button{
    color: #f73859;
    background: #fff;
    border:1rpx solid #f73859;
    padding:0 10rpx;
    height:50rpx;
    line-height:48rpx;
    margin:0 5rpx;
}
.btn{
    padding: 20rpx;
}
</style>
