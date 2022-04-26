
import axios from '../config/axios'
let apiEndpoints = {
    getChats: '/user',
    createChat: '/chat'
}
let callApi = {}
callApi.apiMethod = async function (requestName, method, body = null) {
    try {
        const { data } = await axios({ method, url: apiEndpoints[requestName], data: body })
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default callApi