<template>
    <div class="model_box" v-if="isShowModel">
        <div class="mask" @click="hideModel"></div>
        <div class="model">
            为了保障您的权益，请先绑定手机号
            <div>
                <input type="tel" class="phone" v-model="phone"/>
            </div>
            <div class="code_box">
                <input type="number" class="code" v-model="code" />
                <span @click="getCode" v-if="isClick">{{clickCount==0?'获取验证码':'重新发送'}}</span>
                <span v-else>倒计时{{time}}秒</span>
            </div>
            <div class="submit">
                <button @click="hideModel">确定</button>
            </div>
        </div>
        <mptoast></mptoast>
    </div>
</template>
<script>
import mptoast from 'mptoast'
export default {
    data(){
        return {
            phone:'',
            code:'',
            isClick:true,
            clickCount:0,
            time:10
        }
    },
    props:{
        isShowModel:{
            type:Boolean,
            default:false
        }
    },
    components:{
        mptoast
    },
    methods:{
        hideModel(){
            this.$emit('hModel')//通过$emit调用父组件传递过来的方法
            this.phone=''
            this.code=''
        },
        getCode(){
            let regPhone=/^1[3456789]\d{9}$/;
            if(this.phone.length==0){
                this.$mptoast('请填写手机号！')
            }else if(!regPhone.test(this.phone)){
                this.$mptoast('手机号格式错误！')
            }else{
                this.isClick=false
                this.clickCount++
                let timer=setInterval(()=>{
                    this.time--;
                    if(this.time<1){
                        clearInterval(timer)
                        this.time=10
                        this.isClick=true
                    }
                    this.time=this.time
                },1000)
                this.clickCount=this.clickCount
                this.$net.https('http://jspang.com/DemoApi/typeGoods.php','')
                .then((response)=>{
                    console.log(response)
                })
                .catch((error)=>{
                    console.log(error)
                })
            }
        }
    }
}
</script>
<style scoped>
.mask{
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,.3)
}
.model{
    position: fixed;
    z-index: 5000;
    width: 70%;
    max-width: 600rpx;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #FFFFFF;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
    font-size:30rpx;
    padding:25rpx;
}
input{
    height: 60rpx;
    background: #efefef;
}
.phone,.code_box{
    margin:25rpx auto;
    width:90%;
}
.code_box{
    display: flex;
}
.code{
    width: 50%;
}
.code_box span,.submit button{
    background: #f73859;
    font-size: 28rpx;
    line-height:60rpx;
    color:#fff;
}
.code_box span{
    flex-grow: 1; 
}
.submit button{
    width: 90%;
    height: 60rpx;
}
</style>
