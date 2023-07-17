import axios from "../axios";

const handleLogin = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const handleNewUser = (data) => {
    return axios.post('/api/create-new-user', data)
}

const handletest = () => {
    return axios.get('/api/test')
}

const hanlegetAlluser = (userId) => {
    return axios.get(`/api/get-all-user?userId=${userId}`)
}

const handleGetallCodeByType = (type) => {
    return axios.get(`/api-get-all-allCode-by-type?type=${type}`)
}

const handleNewUseradmin = (data) => {
    return axios.post('/api/create-new-user-admin', data)
}

const handleDeleteUser = (userId) => {
    return axios.delete('/api/delete-user', { data: { userId: userId } })
}

const handleUpdateUser = (data) => {
    return axios.put('/api/update-user', data)
}

export {
    handleLogin, handletest, handleNewUser, hanlegetAlluser,
    handleGetallCodeByType, handleNewUseradmin, handleDeleteUser,
    handleUpdateUser
}