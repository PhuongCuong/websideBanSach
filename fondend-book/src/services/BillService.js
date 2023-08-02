import axios from "../axios";

const handleCreateNewBill = (data) => {
    return axios.post('/api/create-new-bill', data)
}

const handleCreateNewBilldetail = (data) => {
    return axios.post('/api/create-new-bill-detail', data)
}

const hanlegetAllBill = (maHD) => {
    return axios.get(`/api/get-all-bill?maHD=${maHD}`)
}

const hanlegetAllBilldetail = (maHD) => {
    return axios.get(`/api/get-all-bill-detail?maHD=${maHD}`)
}

const handleDeleteBill = (maHD) => {
    return axios.delete('/api/delete-bill', { data: { maHD: maHD } })
}

const handleDeleteBilldetail = (maHD) => {
    return axios.delete('/api/delete-bill-detail', { data: { maHD: maHD } })
}

const handleUpdateBill = (data) => {
    return axios.put('/api/update-bill', data)
}


const handleUpdateBilldetail = (data) => {
    return axios.put('/api/update-bill-detail', data)
}

const handleUpdateCreateBillDetail = (data) => {
    return axios.post('/api-update-create-bill-detail', data)
}

const handledeleteBillandBillDetail = (data) => {
    return axios.post('/api-delete-bill-and-bill-detail', data)
}

const hanlegetAllBillbyuserId = (userId) => {
    return axios.get(`/api-get-all-bill-by-userId?userId=${userId}`)
}

const handledeComfimBill = (data) => {
    return axios.post('/api-comfim-bill-user', data)
}

const hanlegetAllBillmore = () => {
    return axios.get('/api-get-bill-more')
}


export {
    handleCreateNewBill, handleCreateNewBilldetail, hanlegetAllBill,
    hanlegetAllBilldetail, handleDeleteBill, handleDeleteBilldetail,
    handleUpdateBill, handleUpdateBilldetail, handleUpdateCreateBillDetail,
    handledeleteBillandBillDetail, hanlegetAllBillbyuserId, handledeComfimBill,
    hanlegetAllBillmore
}