import axios from 'axios';

const config ={
    baseurl: 'http://localhost:8080'
}

function getItemList () {
    return axios.get( `${config.baseurl}/functionaltodo/`);
}

function insertTask (data) {
    return axios.post( `${config.baseurl}/functionaltodo/`, data);
}

function deleteTask (id) {
    return axios.delete( `${config.baseurl}/functionaltodo/${id}`);
}

function detailTask (id) {
    return axios.get( `${config.baseurl}/functionaltodo/${id}`);
}

function updateTask (data) {
    return axios.put( `${config.baseurl}/functionaltodo/${data.task_no}`, data);
}

export {
    getItemList,
    insertTask,
    deleteTask,
    detailTask,
    updateTask
}