import BillService from '../services/BillService'

let handlegetAllBill = async (req, res) => {
    let maHD = req.query.maHD;
    if (!maHD) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing input paramenter'
        })
    } else {
        let data = await BillService.handlegetAllBill(maHD);
        return res.status(200).json({
            errCode: data.errCode,
            errMessage: data.errMessage,
            data: data && data.data ? data.data : {}

        })
    }
}

let handlegetAllBilldetail = async (req, res) => {
    let maHD = req.query.maHD;
    if (!maHD) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing input paramenter'
        })
    } else {
        let data = await BillService.handlegetAllBilldetail(maHD);
        return res.status(200).json({
            errCode: data.errCode,
            errMessage: data.errMessage,
            data: data && data.data ? data.data : {}

        })
    }
}

let handleCreateNewBill = async (req, res) => {
    try {
        let HD = req.body
        // if (!HD.userId || !HD.tongTien || !HD.status) {
        //     return res.status(200).json({
        //         errCode: 1,
        //         errMessage: 'Missing input parament!'
        //     })
        // } else {
        let data = await BillService.handleCreateNewBill(HD)
        return res.status(200).json({
            errCode: data.errCode,
            errMessage: data.errMessage,
            id: data.id
        })
        // }
    } catch (e) {
        console.log(e)
    }
}

let handleCreateNewBilldetail = async (req, res) => {
    try {

        let data = await BillService.handleCreateNewBilldetail(req.body);

        return res.status(200).json({
            errCode: data.errCode,
            errMessage: data.errMessage
        });
    } catch (e) {
        console.log(e);
    }
}

let handleDeleteBill = async (req, res) => {
    try {
        let maHD = req.body.maHD;
        if (!maHD) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input parament!'
            })
        } else {
            let data = await BillService.handleDeleteBill(maHD);
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handleDeleteBilldetail = async (req, res) => {
    try {
        let maHD = req.body.maHD;
        if (!maHD) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input parament!'
            })
        } else {
            let data = await BillService.handleDeleteBilldetail(maHD);
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handleUpdateBill = async (req, res) => {
    try {
        let HD = req.body;
        if (!HD.tongTien || !HD.status || !HD.maHD
        ) {
            res.status(200).json({
                errCode: 1,
                errMessager: 'Missing input paramenter'
            })
        } else {
            let data = await BillService.handleUpdateBill(HD);
            res.status(200).json({
                errCode: data.errCode,
                errMessager: data.errMessager
            })
        }
    } catch (e) {
        console.log(e)
    }
}


let handleUpdateBilldetail = async (req, res) => {
    try {
        let HD = req.body;
        if (!HD.id || !HD.hoaDonId || !HD.bookId || !HD.soLuong || !HD.thanhTien
        ) {
            res.status(200).json({
                errCode: 1,
                errMessager: 'Missing input paramenter'
            })
        } else {
            let data = await BillService.handleUpdateBilldetail(HD);
            res.status(200).json({
                errCode: data.errCode,
                errMessager: data.errMessager
            })
        }
    } catch (e) {

        console.log(e)
    }
}

let handleUpdateFull = async (req, res) => {
    try {
        let data = await BillService.handleUpdateFull(req.body);
        return res.status(200), json({
            errCode: data.errCode,
            errMessager: data.errMessager
        })
    } catch (e) {
        console.log(e)
    }
}

let handleUpdateCreateBillDetail = async (req, res) => {
    let data = await BillService.handleUpdateCreateBillDetail(req.body);
    return res.status(200).json({
        errCode: data.errCode,
        errMessager: data.errMessager
    })
}

let handledeletebillandBillDetail = async (req, res) => {
    let data = await BillService.handledeletebillandBillDetail(req.body);
    return res.status(200).json({
        errCode: data.errCode,
        errMessager: data.errMessager
    })
}

let handlegetAllbillbyUserId = async (req, res) => {
    let userId = req.query.userId;
    if (!userId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing input paramenter'
        })
    } else {
        let data = await BillService.handlegetAllbillbyUserId(userId);
        return res.status(200).json({
            errCode: data.errCode,
            errMessage: data.errMessage,
            data: data && data.data ? data.data : {}

        })
    }
}

let handleComfimbillUser = async (req, res) => {
    try {

        let data = await BillService.handleComfimbillUser(req.body);

        return res.status(200).json({
            errCode: data.errCode,
            errMessage: data.errMessage
        });
    } catch (e) {
        console.log(e);
    }
}


let handlegetAllBillMore = async (req, res) => {
    try {

        let data = await BillService.handlegetAllBillMore();

        return res.status(200).json({
            errCode: data.errCode,
            errMessage: data.errMessage,
            data: data && data.data ? data.data : {}

        });
    } catch (e) {
        console.log(e);
    }
}



module.exports = {
    handlegetAllBill: handlegetAllBill,
    handlegetAllBilldetail: handlegetAllBilldetail,
    handleCreateNewBill: handleCreateNewBill,
    handleCreateNewBilldetail: handleCreateNewBilldetail,
    handleDeleteBill: handleDeleteBill,
    handleDeleteBilldetail: handleDeleteBilldetail,
    handleUpdateBill: handleUpdateBill,
    handleUpdateBilldetail: handleUpdateBilldetail,
    handleUpdateFull: handleUpdateFull,
    handleUpdateCreateBillDetail: handleUpdateCreateBillDetail,
    handledeletebillandBillDetail: handledeletebillandBillDetail,
    handlegetAllbillbyUserId: handlegetAllbillbyUserId,
    handleComfimbillUser: handleComfimbillUser,
    handlegetAllBillMore: handlegetAllBillMore
}
