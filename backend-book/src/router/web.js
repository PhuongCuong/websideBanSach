import express from 'express';
import userController from '../controllers/userController';
import homeController from '../controllers/homeController';
import bookController from '../controllers/bookController';
import uploadController from '../controllers/uploadController';
import BillController from '../controllers/BillController';
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

let router = express.Router();

let initWebRoutes = (app) => {
    app.use('/', router);
    router.post('/api/login', userController.handleLogin)
    router.post('/api/create-new-user', userController.handleCreatenNewUser)
    router.get('/api/get-all-user', userController.handlegetAlluser)
    router.get('/api/get-all-user-by-email', userController.handlegetAlluserbyEmail)
    router.post('/api-update-password', userController.updatePassword)

    router.get('/api-get-all-allCode-by-type', userController.handlegetAllallCodebytype)
    router.get('/api/test', homeController.getHomepage)
    router.post('/api/create-new-user-admin', upload.single('image'), userController.handleCreatenNewUseradmin)
    router.delete('/api/delete-user', userController.handleDeleteUser)
    router.put('/api/update-user', upload.single('image'), userController.handleUpdateUser)

    router.post('/api/create-new-NXB', bookController.handleCreatNewNXB)
    router.post('/api/create-new-NCC', bookController.handleCreateNewNCC)
    router.post('/api/create-new-TL', bookController.handleCreateNewTL)
    router.get('/api/get-all-NCC', bookController.handlegetAllNCC)
    router.get('/api/get-all-NXB', bookController.handlegetAllNXB)
    router.get('/api/get-all-TL', bookController.handlegetAllTL)
    router.delete('/api/delete-NCC', bookController.handleDeleteNCC)
    router.delete('/api/delete-NXB', bookController.handleDeleteNXB)
    router.delete('/api/delete-TL', bookController.handleDeleteTL)
    router.put('/api/update-NCC', bookController.handleUpdateNCC)
    router.put('/api/update-NXB', bookController.handleUpdateNXB)
    router.put('/api/update-TL', bookController.handleUpdateTL)
    router.post('/api/create-new-book', upload.single('image'), bookController.handleCreateNewBook)
    router.get('/api/get-all-book', bookController.handlegetAllBook)
    router.delete('/api/delete-book', bookController.handleDeleteBook)
    router.put('/api/update-book', upload.single('file'), bookController.handleUpdateBook)


    router.post('/api/create-new-discount', bookController.handleCreateNewdiscount)
    router.get('/api/get-all-discount', bookController.handlegetAlldiscount)
    router.put('/api/update-discount', bookController.handleUpdatediscout)
    router.delete('/api/delete-discount', bookController.handleDeletediscount)


    router.post('/api/create-new-bookinfo', bookController.handleCreateNewBookInfo)
    router.get('/api/get-all-bookinfo', bookController.handlegetAllBookInfo)
    router.put('/api/update-bookinfo', bookController.handleUpdateBookInfo)

    router.get('/api/get-all-book-by-cart', bookController.handlegetAllBookbyCart)

    router.get('/api/get-all-book-by-cart', bookController.handlegetAllBookbyCart)
    router.get('/api/get-all-book-by-TL', bookController.handlegetAllBookbyTL)
    router.post('/upload', upload.single('image'), uploadController.uploadFile)


    router.get('/api/get-all-count-san-pham', bookController.handleCountALL)
    router.get('/api/get-TL-count-san-pham', bookController.handleCountALLTL)
    router.get('/api/get-NCC-count-san-pham', bookController.handleCountALLNCC)
    router.get('/api/get-NXB-count-san-pham', bookController.handleCountALLNXB)

    router.get('/api/get-all-book-by-san-pham', bookController.handlegetAllBookbySP)
    router.get('/api/get-all-NXB-by-san-pham', bookController.handlegetAllNXBbySP)
    router.get('/api/get-all-TL-by-san-pham', bookController.handlegetAllTLbySP)
    router.get('/api/get-all-NCC-by-san-pham', bookController.handlegetAllNCCbySP)
    router.get('/api/get-all-book-by-NCC', bookController.handlegetAllBookbyNCC)

    router.get('/api/get-all-bill', BillController.handlegetAllBill)
    router.get('/api/get-all-bill-detail', BillController.handlegetAllBilldetail)
    router.post('/api/create-new-bill', BillController.handleCreateNewBill)
    router.post('/api/create-new-bill-detail', BillController.handleCreateNewBilldetail)
    router.delete('/api/delete-bill', BillController.handleDeleteBill)
    router.delete('/api/delete-bill-detail', BillController.handleDeleteBilldetail)
    router.put('/api/update-bill', BillController.handleUpdateBill)
    router.put('/api/update-bill-detail', BillController.handleUpdateBilldetail)

    router.put('api/update-bill-bill-detail-book', BillController.handleUpdateFull)
    router.post('/api-update-create-bill-detail', BillController.handleUpdateCreateBillDetail)
    router.post('/api-delete-bill-and-bill-detail', BillController.handledeletebillandBillDetail)
    router.get('/api-get-all-bill-by-userId', BillController.handlegetAllbillbyUserId)
    router.post('/api-comfim-bill-user', BillController.handleComfimbillUser)

    router.get('/api-get-bill-more', BillController.handlegetAllBillMore)

}

module.exports = initWebRoutes;