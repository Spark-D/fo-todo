<template>
  <div>
    <form @submit.prevent="onSubmit" >
    <h1 > Todo-List </h1> 
    <input style="display:inline; width:90%" type="text" v-model="subject" name="subject">
    <input type="hidden" name="id" value="1">
    <input type="hidden" name="task_no" v-model="task_no">
    <button type="submit">submit</button>
    </form>
    <br>
    <table>
        <thead>
            <tr>
                <th style="width:10%">no</th>
                <th style="width:50%">subject</th>
                <th>reg_time</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            
            <tr v-for="item in getItems" :key="item.task_no">
                <td>{{item.task_no}}</td>
                <td @click.prevent="onDetail(item.task_no)">{{item.subject}}</td>
                <td>{{item.sys_reg_dt}}</td>
                <td style="cursor:pointer;" @click.prevent="onDelete(item.task_no)">삭제</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import {  insertTask, deleteTask, detailTask, updateTask } from '../api/index.js'
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
           subject: "",
           id: "1",
           task_no:""
        }
    },
    computed: {
        ...mapGetters({
            getItems : 'getList',
            insertItem : 'insertItem'
        }),
    },
    created () {
        this.$store.dispatch('FETCH_LIST');
        // 1. data 호출 : vuex-actions
        // getItemList()
        // .then(response => {
        //     console.log(response);
        //     //2. 담기
        //     this.items = response.data;
        // })
        // .catch(error=>{
        //     console.log(error);
        // })
    },
    methods : {
        refresh(){
            this.$store.dispatch('FETCH_LIST');
            this.subject = "";
            this.task_no = "";
        },
        onSubmit(){
            // event.preventDefault();
            let _self = this;
            console.log(this.subject, this.task_no);
            let data = {
                subject: this.subject,
                id : 1,
                task_no : this.task_no
            }
            console.log(JSON.stringify(data));
            
            if( data.task_no ){
                console.log("task_no 있네? update");
                updateTask(data)
                .then(response =>{
                    console.log(response);
                    alert("수정 완료");
                    _self.refresh();
                })
                .catch(error => {
                    console.log(error);
                })
            } else {
                insertTask(data)
                .then(response =>{
                    console.log(response);
                    alert("등록 완료");
                    _self.refresh();
                })
                .catch(error => {
                    console.log(error);
                })
            }
        },
        onDelete(key){
            // alert(key);
            let _self = this;
            deleteTask(key)
            .then(response =>{
                console.log(response);
                alert("삭제 완료");
                _self.refresh();
            })
            .catch(error =>{
                console.log(error);
            })
        },
        onDetail(key){
            let _self = this;
            console.log(key);
            detailTask(key)
            .then(response=>{
                console.log(response);
                _self.subject = response.data.subject;
                _self.task_no = response.data.task_no;
            })
            .catch(error => {
                console.log(error);
            })
        },

    }

}
</script>

<style>
    table {
    width: 100%;
    border: 1px solid #444444;
    border-collapse: collapse;
    }
    th, td {
        text-align: left;
        border: 1px solid #444444;
    }
</style>