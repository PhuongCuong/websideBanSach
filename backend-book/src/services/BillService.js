import db from '../models/index';


let handlegetAllBill = (maHD) => {
    return new Promise(async (resolve, reject) => {
        try {
            let billData = {};
            let data = '';
            if (maHD === 'ALL') {
                data = await db.HoaDon.findAll()
                if (data) {
                    billData.errCode = 0;
                    billData.errMessage = 'Ok';
                    billData.data = data;
                } else {
                    billData.errCode = 2;
                    billData.errCode = 'data is not fond';
                    billData.data = {};
                }
            } else {
                data = await db.HoaDon.findOne({
                    where: {
                        hoaDonId: maHD
                    }
                })
                if (data) {
                    billData.errCode = 0;
                    billData.errMessage = 'Ok';
                    billData.data = data;
                } else {
                    billData.errCode = 2;
                    billData.errMessage = 'data is not fond';
                    billData.data = {};
                }
            }
            resolve(billData)
        } catch (e) {
            reject(e)
        }
    })
}

let handlegetAllBilldetail = (maHD) => {
    return new Promise(async (resolve, reject) => {
        try {
            let billData = {};
            let data = '';
            if (maHD === 'ALL') {
                data = await db.ChitietHoaDon.findAll()
                if (data) {
                    billData.errCode = 0;
                    billData.errMessage = 'Ok';
                    billData.data = data;
                } else {
                    billData.errCode = 2;
                    billData.errCode = 'data is not fond';
                    billData.data = {};
                }
            } else {
                data = await db.ChitietHoaDon.findAll({
                    where: {
                        hoaDonId: maHD
                    }
                })
                if (data) {
                    billData.errCode = 0;
                    billData.errMessage = 'Ok';
                    billData.data = data;
                } else {
                    billData.errCode = 2;
                    billData.errMessage = 'data is not fond';
                    billData.data = {};
                }
            }
            resolve(billData)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handlegetAllBill: handlegetAllBill,
    handlegetAllBilldetail: handlegetAllBilldetail
}

