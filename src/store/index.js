import Vue from 'vue';
import Vuex from 'vuex';
import { getItemList, insertTask } from '../api/index.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        items: [],
        item:{}
    },
    getters:{ // computed랑 같은데 store에 있는것
        getList(state){
            return state.items;
        },
        getItem(state){
            return state.item;
        }
    },
    mutations:{
        SET_LIST(state, data) {
            state.items = data;
        },
        SET_TASK(state, data){
            state.item = data;
        }
    },
    actions: {
        FETCH_LIST(context){
            getItemList()
            .then(response=> {
                console.log(response.data);
                context.commit('SET_LIST', response.data);
                // this.state.items = response.data;
            })
            .catch(error => {
                console.log(error);
            })
        },
        INSERT_ITEM(context){
            insertTask()
            .then(response => {
                console.log(response);
                context.commit('SET_TASK', response.data);
            })
            .catch(error=> {
                console.log(error);
            })

        }
    }
})