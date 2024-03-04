import axios from 'axios';

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log('out', error.response.data.message );
        if (error.response && error.response.data.message === 'Unauthorized!') {
            localStorage.removeItem('user');
            window.location.href = '/pages/login'
        }

        return Promise.reject(error);
    }
);

export default axios;