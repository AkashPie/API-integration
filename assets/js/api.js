const axiosApi = axios.create({
    baseURL: 'https://uservision.com/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
        //'Authorization': 'token <your-token-here> -- https://docs.GitHub.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
    }
});

export default axiosApi