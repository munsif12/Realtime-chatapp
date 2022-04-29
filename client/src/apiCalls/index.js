
import axios from '../config/axios'
let apiEndpoints = {
    getUsers: '/user',
    createChat: '/chat',
    getChats: '/chat',
    createGroupChat: '/chat/group',
}
let callApi = {}
callApi.apiMethod = async function (requestName, method, body = null, params = null) {
    let Url = apiEndpoints[requestName];
    if (params) {
        Url = `${apiEndpoints[requestName]}${params}`
    }
    try {
        const { data } = await axios({ method, url: Url, data: body })
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default callApi