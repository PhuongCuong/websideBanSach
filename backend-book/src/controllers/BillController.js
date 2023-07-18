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

module.exports = {
    handlegetAllBill: handlegetAllBill,
    handlegetAllBilldetail: handlegetAllBilldetail
}