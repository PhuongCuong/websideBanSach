import axios from "../axios";

const handlegetAllNCC = (keyMap) => {
    return axios.get(`/api/get-all-NCC?keyMap=${keyMap}`)
}

const handlegetAllNXB = (keyMap) => {
    return axios.get(`/api/get-all-NXB?keyMap=${keyMap}`)
}

const handlegetAllTL = (keyMap) => {
    return axios.get(`/api/get-all-TL?keyMap=${keyMap}`)
}

const handleCreateNewNCC = (data) => {
    return axios.post('/api/create-new-NCC', data)
}

const handleCreateNewNXB = (data) => {
    return axios.post('/api/create-new-NXB', data)
}

const handleCreateNewTL = (data) => {
    return axios.post('/api/create-new-TL', data)
}

const handleDeleteNCC = (keyMap) => {
    return axios.delete('/api/delete-NCC', { data: { keyMap: keyMap } })
}

const handleDeleteNXB = (keyMap) => {
    return axios.delete('/api/delete-NXB', { data: { keyMap: keyMap } })
}

const handleDeleteTL = (keyMap) => {
    return axios.delete('/api/delete-TL', { data: { keyMap: keyMap } })
}

const handleUpdateNCC = (data) => {
    return axios.put('/api/update-NCC', data)
}

const handleUpdateNXB = (data) => {
    return axios.put('/api/update-NXB', data)
}

const handleUpdateTL = (data) => {
    return axios.put('/api/update-TL', data)
}

const handleCreateNewBook = (formdata) => {
    return axios.post('/api/create-new-book', formdata, { headers: { 'Content-Type': 'multipart/form-data' } })
}

const handlegetAllBook = (type) => {
    return axios.get(`/api/get-all-book?type=${type}`)
}

const handleDeleteBook = (keyMap) => {
    return axios.delete('/api/delete-book', { data: { keyMap: keyMap } })
}

const handleUpdateBook = (formdata) => {
    return axios.put('/api/update-book', formdata, { headers: { 'Content-Type': 'multipart/form-data' } })
}

const handleSavediscount = (data) => {
    return axios.post('/api/create-new-discount', data)
}

const handlegetAlldiscount = (maSach) => {
    return axios.get(`/api/get-all-discount?maSach=${maSach}`)
}

const handleDeleteDiscount = (maSach) => {
    return axios.delete('/api/delete-discount', { data: { maSach: maSach } })
}

const handleUpdateDiscount = (data) => {
    return axios.put('/api/update-discount', data)
}

const handleSaveBookInfo = (data) => {
    return axios.post('/api/create-new-bookinfo', data)
}

const handlegetAllbookInfo = (maSach) => {
    return axios.get(`/api/get-all-bookinfo?bookId=${maSach}`)
}

const handleUpdateBookinfo = (data) => {
    return axios.put('/api/update-bookinfo', data)
}

const handlegetAllbookbycart = (type) => {
    return axios.get(`/api/get-all-book-by-cart?type=${type}`)
}

const handlegetAllBookTL = (type) => {
    return axios.get(`/api/get-all-book-by-TL?type=${type}`)
}

const uploadfile = (formdata) => {
    return axios.post('/upload', formdata, { headers: { 'Content-Type': 'multipart/form-data' } })
}

const handlegetAllBookbySP = (sanpham) => {
    return axios.get(`/api/get-all-book-by-san-pham?sanPham=${sanpham}`)
}

const handlegetAllNXBbySP = (sanpham) => {
    return axios.get(`/api/get-all-NXB-by-san-pham?sanPham=${sanpham}`)
}

const handlegetAllTLbySP = (sanpham) => {
    return axios.get(`/api/get-all-TL-by-san-pham?sanPham=${sanpham}`)
}

const handlegetAllNCCbySP = (sanpham) => {
    return axios.get(`/api/get-all-NCC-by-san-pham?sanPham=${sanpham}`)
}

const handlecountAllBook = () => {
    return axios.get('/api/get-all-count-san-pham')
}

const handlecountAllTL = () => {
    return axios.get('/api/get-TL-count-san-pham')
}

const handlecountAllNCC = () => {
    return axios.get('/api/get-NCC-count-san-pham')
}

const handlecountAllNXB = () => {
    return axios.get('/api/get-NXB-count-san-pham')
}

const handlegetAllBookNCC = (type) => {
    return axios.get(`/api/get-all-book-by-NCC?type=${type}`)
}



export {
    handlegetAllNCC, handlegetAllNXB, handlegetAllTL, handleCreateNewNCC, handleDeleteNCC,
    handleDeleteNXB, handleDeleteTL, handleUpdateNCC, handleUpdateNXB, handleUpdateTL,
    handleCreateNewNXB, handleCreateNewTL, handleCreateNewBook, handlegetAllBook, handleDeleteBook,
    handleUpdateBook, handleSavediscount, handlegetAlldiscount, handleDeleteDiscount, handleUpdateDiscount,
    handleSaveBookInfo, handlegetAllbookInfo, handleUpdateBookinfo, handlegetAllbookbycart,
    handlegetAllBookTL, uploadfile, handlegetAllBookbySP, handlegetAllTLbySP, handlegetAllNCCbySP,
    handlegetAllNXBbySP, handlecountAllNXB, handlecountAllNCC, handlecountAllTL, handlecountAllBook,
    handlegetAllBookNCC
}