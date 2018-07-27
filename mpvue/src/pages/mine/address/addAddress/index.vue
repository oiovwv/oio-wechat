<template>
    <div>
        <form @submit="formSubmit">
            <div class="weui-panel">
                <div class='weui-cell weui-field'>
                <div class='weui-cell_hd weui-field__title'>收件人：</div>
                <input class='weui-field__input weui-cell__bd' v-model="uname" name="uname" type="text"  confirm-type="done" placeholder='填写收货人姓名' />
                </div>
                <div class='weui-cell weui-field sex'>
                <div class='weui-cell_hd weui-field__title'></div>
                <div class='weui-field__input weui-cell__bd'>
                    <radio-group class="radio-group" @change="radioChange">
                    <label class="radio" v-for="(item,index) in sex" :key="index">
                        <radio :value="item.value" :checked="item.checked" color="#f73859" name="sex"/>{{item.name}}
                    </label>
                    </radio-group>
                </div>
                </div>
                <div class='weui-cell weui-field'>
                <div class='weui-cell_hd weui-field__title'>联系电话：</div>
                <input class='weui-field__input weui-cell__bd' v-model="uphone" name="uphone" type="number" confirm-type="done" placeholder='填写11位手机号码' />
                </div>
                <div class='weui-cell weui-field'>
                    <div class='weui-cell_hd weui-field__title'>所在地区：</div>
                    <div class="weui-field__input weui-cell__bd">
                        <picker mode="region" @change="bindRegionChange" :custom-item="customItem">
                            <view v-if="isShowCity">选择您所在的省市区</view>
                            <view class="picker" v-else>
                            {{region[0]}}{{region[1]}}{{region[2]}}
                            </view>
                        </picker>
                    </div>
                    <!-- <div class="weui-cell__ft weui-cell__ft_in-access"></div> -->
                </div>
                <div class='weui-cell weui-field'>
                <div class='weui-cell_hd weui-field__title'>详细地址：</div>
                <input class='weui-field__input weui-cell__bd' v-model="address" name="address" type="text" confirm-type="done" placeholder='填写详细地址，如小区+楼号+门牌号' />
                </div>
            </div>

            <!-- 保存与取消 -->
            <div class='save_addr'>
                <button formType="submit" class="btn">保存</button>
            </div>
        </form>
        <mptoast></mptoast>
    </div>    
</template>
<script>
import mptoast from 'mptoast'
export default {
    data(){
        return {
            sex: [{ name: '先生', value: 0, checked: false }, { name: '女士', value: 1,checked:false}],
            region: [],
            isShowCity:true,
            uname:'',
            gender:'',
            uphone:'',
            address:'',
            operate:''
        }
    },
    components:{
        mptoast
    },
    onLoad(){
        this.operate=this.$root.$mp.query.operate
        if(this.operate=='修改'){
            wx.getStorage({
                key:'editAddress',
                success:(res)=>{
                    this.uname=res.data.addressName
                    this.uphone=res.data.addressPhone
                    this.address=res.data.addressPath
                    if(res.data.gender==0){
                        this.sex[0].checked=true
                        this.sex[1].checked=false
                    }else{
                        this.sex[1].checked=true
                        this.sex[0].checked=false
                    }
                    this.sex=this.sex
                }
            })
        }
        wx.get
    },
    methods:{
        radioChange(e){
            this.gender=e.mp.detail.value
        },
        bindRegionChange(e){
            this.region=e.mp.detail.value
            this.isShowCity=!this.isShowCity
        },
        formSubmit(){
            let regName=/^[\u4e00-\u9fa5]{2,4}$/
            let regPhone=/^1[3456789]\d{9}$/
            if(!this.uname){
                this.$mptoast('用户名不能为空！')
                return false
            }else if(!regName.test(this.uname)){
                this.$mptoast('名字太奇葩了！')
                return false
            }else if(!this.gender){
                this.$mptoast('想我们直呼您的大名吗？')
                return false
            }else if(!this.uphone){
                this.$mptoast('手机号不能为空！')
                return false
            }else if(!regPhone.test(this.uphone)){
                this.$mptoast('电话太奇葩了！')
                return false
            }else if(this.region.length==0){
                this.$mptoast('请选择省市区！')
                return false
            }else if(!this.address){
                this.$mptoast('地址不能为空啊！')
                return false
            }else{
                console.log(this.uname,this.uphone,this.gender,this.address,this.region)
                console.log('发请求')
                if(this.operate=='新增'){
                    console.log('执行新增请求')
                }else if(this.operate=='修改'){
                    console.log('执行修改请求并清除数据')
                    this.uname=''
                    this.uphone=''
                    // this.gender=''
                    this.address=''
                    this.region=[]
                    this.isShowCity=true
                }
            }
            
        }
    }
}
</script>
<style scoped>
.weui-field {
    padding:7px 15px;
    color:#333;
    font-size: 28rpx;
}
.weui-field__title {
    color:#333;
    min-width:65px;
    padding-right:10px;
}
.weui-field__input{
    padding:8rpx 0;
}

.btn{
    padding: 20rpx;
}

.save_addr{
  width:100%;
  height: 80rpx;
  line-height: 80rpx;
  position: fixed;
  bottom:0;
  display: flex;
}

</style>
