import axios from 'axios';
import {BASE_URL} from './../utilities';

const home = async(date) => {
    const res = await axios.get(BASE_URL + "/home?date=" + date);
    return res.data;
}

const store = async (data) => {
    const res = await axios.post(BASE_URL + "/sensor_data/store", data);
    return res.data;
}

export {
    home as homeAPI,
    store as storeAPI
}