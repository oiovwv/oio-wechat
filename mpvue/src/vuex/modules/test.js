import { Store } from "vuex";

const state = {
    str:'',
    number:1,
    cartList:[
        {name:'牛肉发生发誓不会发生分解哈舒服萨福卅发顺丰',price:88,url:'../../../static/images/1.png',selected:false,isTouchMove:false,description:'500ml',num:15,inventory:16},
        {name:'猪肉爱上嘎嗦干撒空间广阔萨法沙发沙发沙发上',price:100,url:'../../../static/images/2.png',selected:false,isTouchMove:false,description:'300g/罐',num:12,inventory:20}
    ]
}

const getters = {
    str(state){
        return state.str
    },
    number(state){
        return state.number
    },
    cartList(state){
        return state.cartList
    }
}

const mutations = {
    change(state,val){
        return state.str=val
    },
    add(state){
        state.number++
        if(state.number>10){
            state.number=10 
        } 
    },
    reduce(state){
        state.number--
        if(state.number<=1){
            state.number=1
        }
    },
    handleBlur(state){
        if(state.number==''||state.number<=0){
            state.number=1
        }
    },
    choose(state){
        state.number=1
    },
    // 从购物车中删除物品
    del(state,i){
        state.cartList.splice(i,1)
    }
}

const actions = {
    change({commit},val){
        commit('change',val)
    },
    add({commit}){
        commit('add')
    },
    reduce({commit}){
        commit('reduce')
    },
    handleBlur({commit}){
        commit('handleBlur')
    },
    choose({commit}){
        commit('choose')
    },
    del({commit},i){
        commit('del',i)
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}