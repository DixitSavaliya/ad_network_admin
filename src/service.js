import axios from 'axios';
import { config } from './config';
import InterCepter from './intercepter';

export default {
    login: (obj) => {
        return axios.post(config.baseApiUrl + "User/getAuthTokens", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserDetail: (obj) => {
        return axios.post(config.baseApiUrl + "User/currentUser", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    changePassword: (obj) => {
        return axios.post(config.baseApiUrl + "User/changePassword", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    ForgotPassword: (obj) => {
        return axios.post(config.baseApiUrl + "User/forgotPassword", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    updateUserDetail: (obj) => {
        return axios.post(config.baseApiUrl + "User/updateUserDetailsById", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserDetailsByUserGroupId: (obj) => {
        return axios.post(config.baseApiUrl + "User/getUserDetailsByUserGroupId", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    addUserRole: (data) => {
        return axios.post(config.baseApiUrl + "UserRole/registerUserRole", data)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRoleData: (data) => {
        return axios.post(config.baseApiUrl + "UserRole/getUserRole", data)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteUserRole: (data) => {
        return axios.post(config.baseApiUrl + "UserRole/deleteUserRole", data)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    editUserRole: (obj) => {
        return axios.post(config.baseApiUrl + "UserRole/updateUserRole", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    searchUserRole: (data) => {
        return axios.post(config.baseApiUrl + "UserRole/searchUserRole", data)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    countUserRole: () => {
        return axios.post(config.baseApiUrl + "UserRole/countUserRole")
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRoleDetailsPg: (obj) => {
        return axios.post(config.baseApiUrl + "UserRole/getUserRoleDetailsPg", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    addUserRight: (obj) => {
        return axios.post(config.baseApiUrl + "UserRole/registerUserRight", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRightData: () => {
        return axios.post(config.baseApiUrl + "UserRole/getUserRight")
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteUserRight: (obj) => {
        return axios.post(config.baseApiUrl + "UserRole/deleteUserRight", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    editUserRight: (obj) => {
        return axios.post(config.baseApiUrl + "UserRole/updateUserRight", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    searchUserRight: (obj) => {
        return axios.post(config.baseApiUrl + "UserRole/searchUserRight", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    countUserRight: () => {
        return axios.post(config.baseApiUrl + "UserRole/countUserRight")
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRightDetailsPg: (obj) => {
        return axios.post(config.baseApiUrl + "UserRole/getUserRightDetailsPg", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRoleToRightData: (obj) => {
        return axios.post(config.baseApiUrl + "UserRole/getUserRoleToRight", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    updateUserRightToRoleData: (obj) => {
        return axios.post(config.baseApiUrl + "UserRole/registerUserRoleToRight", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    uploadIcon:(data) => {
        return axios.post(config.baseApiUrl + "Application/uploadApplicationIcon", data)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    createApp:(obj) => {
        return axios.post(config.baseApiUrl + "Application/insertApplication", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getApplication:() => {
        return axios.post(config.baseApiUrl + "Application/getApplication")
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getApplicationCountData:() => {
        return axios.post(config.baseApiUrl + "Application/countApplication")
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getApplicationPageDataPg:(obj) => {
        return axios.post(config.baseApiUrl + "Application/applicationByPg", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    searchAppData:(obj) => {
        return axios.post(config.baseApiUrl + "Application/applicationBySearch", obj)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getApp:(obj) => {
        return axios.post(config.baseApiUrl + "Application/getApplication", obj)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    editApp:(obj) => {
        return axios.post(config.baseApiUrl + "Application/updateApplication", obj)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteAppData:(obj) => {
        return axios.post(config.baseApiUrl + "Application/deleteApplication", obj)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    }
}