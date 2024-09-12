import axios from 'axios';

const axiosInstance = (options = {}) => {
    const { formData = false } = options;
    const headers = {
        'ngrok-skip-browser-warning': 'true'
    }

    headers['Content-Type'] = formData ? 'multipart/form-data' : 'application/json' ;

    const instance = axios.create({
        baseURL: import.meta.env.REACT_APP_API_ENDPOINT,
        timeout: 10000,
        headers
    })

    instance.interceptors.request.use(
        function (config) {
            return config
        },
        function (error) {
            return Promise.reject(error)
        },
    )
    
    instance.interceptors.response.use(
        function (response) {
            return response.data
        },
        function (error) {
            return Promise.reject(error)
        },
    )

    return instance
}



export { axiosInstance };

