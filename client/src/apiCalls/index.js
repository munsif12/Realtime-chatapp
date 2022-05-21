
import axios from '../config/axios'
let apiEndpoints = {
    getUsers: '/user',
    createChat: '/chat',
    getChats: '/chat',
    createGroupChat: '/chat/group',
    removeParticipent: '/chat/remove-from-groupchat',
    addParticipentsToGroup: '/chat/add-to-groupchat',
    getMessagesOfChat: '/message', //with parmas
    sendNewMessage: '/message', //with body
}
let callApi = {}
callApi.apiMethod = function (requestName, method, body = null, params = null) {
    let Url = apiEndpoints[requestName];
    if (params) {
        Url = `${apiEndpoints[requestName]}${params}`
    }
    try {
        const data = axios({ method, url: Url, data: body })
            //check if data is error
            .then(res => {
                return res.data
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    return {
                        error: err.response.data,
                        status: err.response.status,
                    };
                } else {
                    return {
                        error: {
                            success: false,
                            message: "Network Error"
                        }
                    };
                }
            });

        //if error throe new error
        if (data.error) {
            throw (data)
        }
        return data;
    } catch (error) {
        return error
    }
}

export default callApi




/* 
------ @api previous method ------

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
*
*/