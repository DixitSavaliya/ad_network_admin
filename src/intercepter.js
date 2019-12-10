import axios from 'axios';

axios.interceptors.request.use((config) => {
    let auth =  JSON.parse(localStorage.getItem('ad_network_auth'))
    console.log("auth".auth)
        config.headers['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
        config.headers['content-md5'] = auth ? auth.secret_key : '';
   return config;
}, function (error) {
   console.log('error: ', error);
});



axios.interceptors.response.use((response) => {
    return response
}, function (error) {
    const originalRequest = error.config;
    let auth = JSON.parse(localStorage.getItem('ad_network_auth'))
    if (error.response.status === 401) {
        window.location.href = "/login";
        return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        axios.defaults.headers.post['Authorization']  = 'Barier ' + (auth ? auth.refresh_token : '');
    }
    return Promise.reject(error);
})


