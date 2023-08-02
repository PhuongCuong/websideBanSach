
import db from '../models/index';
import { sequelize } from '../models/index';

let handlegetAllBill = (maHD) => {
    return new Promise(async (resolve, reject) => {
        try {
            let billData = {};
            let data = '';
            if (maHD === 'ALL') {
                data = await db.HoaDon.findAll({
                    include: [
                        { model: db.User, as: 'UserData' },
                        { model: db.allCode, as: 'statusData' }

                    ]
                })
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
                    },
                    include: [
                        { model: db.User, as: 'UserData' },
                        { model: db.allCode, as: 'statusData' }

                    ]
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
            console.log(e)
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
                data = await db.ChitietHoaDon.findAll({
                    include: [
                        { model: db.Book, as: 'BookData' }
                    ]
                })
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
                    },
                    include: [
                        { model: db.Book, as: 'BookData' }
                    ]
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

let handleCreateNewBill = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookData = {};
            let datacreate = await db.HoaDon.create({
                userId: data.userId,
                tongTien: data.tongTien,
                status: data.status
            })
            bookData.errCode = 0;
            bookData.errMessage = 'Ok';
            bookData.id = datacreate.id
            resolve(bookData)
        } catch (e) {
            reject(e)
        }
    })
}

let handleCreateNewBilldetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookData = {};
            await db.ChitietHoaDon.bulkCreate(data);
            bookData.errCode = 0;
            bookData.errMessage = 'Ok';
            resolve(bookData);
        } catch (e) {
            reject(e);
        }
    });
};

let handleDeleteBill = (maHD) => {
    return new Promise(async (resolve, reject) => {
        let NCCData = {};
        try {
            let HD = await db.HoaDon.findOne({
                where: {
                    id: maHD
                }
            })
            if (!HD) {
                NCCData.errCode = 2;
                NCCData.errMessage = 'HD is undefined'
            } else {
                await db.HoaDon.destroy({
                    where: {
                        id: maHD
                    }
                })

                NCCData.errCode = 0;
                NCCData.errMessage = 'OK'
            }

            resolve(NCCData)
        } catch (e) {
            reject(e)
        }
    })
}

let handleDeleteBilldetail = (maHD) => {
    return new Promise(async (resolve, reject) => {
        let NCCData = {};
        try {
            let HD = await db.ChitietHoaDon.findAll({
                where: {
                    hoaDonId: maHD
                }
            })
            if (!HD) {
                NCCData.errCode = 2;
                NCCData.errMessage = 'TL is undefined'
            } else {
                await db.ChitietHoaDon.destroy({
                    where: {
                        hoaDonId: maHD
                    }
                })

                NCCData.errCode = 0;
                NCCData.errMessage = 'OK'
            }

            resolve(NCCData)
        } catch (e) {
            reject(e)
        }
    })
}

let handleUpdateBill = (HDinput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let HD = await db.HoaDon.findOne({
                where: {
                    id: HDinput.maHD
                }
            });
            if (!HD) {
                userData.errCode = 2;
                userData.errMessager = 'not find HD';
            } else {
                await db.HoaDon.update({
                    tongTien: HDinput.tongTien,
                    status: HDinput.status
                }, {
                    where: {
                        id: HDinput.maHD
                    }
                })

                userData.errCode = 0;
                userData.errMessager = 'Ok';
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let handleUpdateBilldetail = (HDinput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let HD = await db.ChitietHoaDon.findOne({
                where: {
                    id: HDinput.id,
                    hoaDonId: HDinput.hoaDonId,
                    bookId: HDinput.bookId
                }
            });
            if (!HD) {
                userData.errCode = 2;
                userData.errMessager = 'not find CTHD';
            } else {
                await db.ChitietHoaDon.update({
                    soLuong: HDinput.soLuong,
                    thanhTien: HDinput.thanhTien
                }, {
                    where: {
                        id: HDinput.id,
                        hoaDonId: HDinput.hoaDonId,
                        bookId: HDinput.bookId
                    }
                })

                userData.errCode = 0;
                userData.errMessager = 'Ok';
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let handleUpdateFull = (bill, billdetail, product) => {
    return new Promise((resolve, reject) => {
        try {

        } catch (e) {
            reject(e)
        }
    })

}

let handleUpdateCreateBillDetail = (datainput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let soluong = 0;
            let tongtien = 0;
            let data = {};
            let arrdetail = await db.ChitietHoaDon.findAll({
                where: {
                    hoaDonId: datainput[0].hoaDonId,
                }
            })
            if (arrdetail.length > datainput.length) {
                for (let i = 0; i < arrdetail.length; i++) {
                    let existingItem = arrdetail[i];
                    let foundInDataInput = datainput.find(item => item.hoaDonId === existingItem.hoaDonId
                        && item.bookId === existingItem.bookId
                    );
                    if (!foundInDataInput) {
                        console.log('check found', foundInDataInput)

                        await db.ChitietHoaDon.destroy({
                            where: {
                                id: existingItem.id
                            }
                        });
                        let databook = await db.Book.findOne({
                            where: {
                                keyMap: existingItem.bookId
                            }
                        })
                        if (databook) {
                            await db.Book.update({
                                soLuong: databook.soLuong + (existingItem.soLuong)
                            }, {
                                where: {
                                    keyMap: existingItem.bookId
                                }
                            })
                        }

                        for (let i = 0; i < datainput.length; i++) {
                            tongtien += +datainput[i].thanhTien;
                            await db.HoaDon.update({
                                tongTien: tongtien,
                            }, {
                                where: {
                                    id: datainput[i].hoaDonId
                                }
                            })
                            // if (datainput[i].hoaDonId === existingItem.hoaDonId
                            //     && datainput[i].bookId !== existingItem.bookId) {
                            //     await db.Book.update({
                            //         soLuong: datainput[i].BookData.soLuong + (datainput[i].soLuong)
                            //     }, {
                            //         where: {
                            //             keyMap: datainput[i].bookId
                            //         }
                            //     })
                            // }

                        }
                    }
                }

            } else {
                for (let item of datainput) {
                    data = await db.ChitietHoaDon.findOne({
                        where: {
                            hoaDonId: item.hoaDonId,
                            bookId: item.bookId
                        }
                    })
                    if (data) {
                        soluong = data.soLuong;
                        await db.ChitietHoaDon.update({
                            soLuong: item.soLuong,
                            thanhTien: item.thanhTien
                        }, {
                            where: {
                                hoaDonId: item.hoaDonId,
                                bookId: item.bookId
                            }
                        })
                        await db.Book.update({
                            soLuong: item.BookData.soLuong - (item.soLuong - soluong)
                        }, {
                            where: {
                                keyMap: item.bookId
                            }
                        })
                    } else {
                        await db.ChitietHoaDon.create({
                            hoaDonId: item.hoaDonId,
                            bookId: item.bookId,
                            soLuong: item.soLuong,
                            thanhTien: item.thanhTien,
                            image: item.BookData.image
                        });
                        await db.Book.update({
                            soLuong: item.BookData.soLuong - (item.soLuong)
                        }, {
                            where: {
                                keyMap: item.bookId
                            }
                        })
                    }
                    tongtien += +item.thanhTien;
                    await db.HoaDon.update({
                        tongTien: tongtien,
                    }, {
                        where: {
                            id: item.hoaDonId
                        }
                    })

                }
            }

            userData.errCode = 0;
            userData.errMessager = 'Ok';
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let handledeletebillandBillDetail = (datainput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let billdata = {};
            if (!datainput) {
                billdata.errCode = 1;
                billdata.errMessager = 'Missing input parament';
            } else {
                let data = await db.HoaDon.findOne({
                    where: {
                        id: datainput.maHD
                    }
                })
                if (!data) {
                    billdata.errCode = 2;
                    billdata.errMessager = 'not find bill';
                } else {
                    await db.HoaDon.destroy({
                        where: {
                            id: datainput.maHD
                        }
                    });
                    let billdetail = await db.ChitietHoaDon.findAll({
                        where: {
                            hoaDonId: datainput.maHD
                        }
                    })
                    if (billdetail) {
                        for (let i = 0; i < billdetail.length; i++) {
                            await db.ChitietHoaDon.destroy({
                                where: {
                                    hoaDonId: datainput.maHD
                                }
                            });
                            let databook = await db.Book.findOne({
                                where: {
                                    keyMap: billdetail[i].bookId
                                }
                            })
                            if (databook) {
                                await db.Book.update({
                                    soLuong: databook.soLuong + (billdetail[i].soLuong)
                                }, {
                                    where: {
                                        keyMap: billdetail[i].bookId
                                    }
                                })
                            }
                        }

                        billdata.errCode = 0;
                        billdata.errMessager = 'delete bill is success';
                    } else {
                        billdata.errCode = 3;
                        billdata.errMessager = 'not find detailbill';
                    }

                }

            }
            resolve(billdata)
        } catch (e) {
            reject(e)
        }
    })
}

let handlegetAllbillbyUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let billData = {};
            let data = '';
            if (userId === 'ALL') {
                data = await db.HoaDon.findAll({
                    include: [
                        { model: db.User, as: 'UserData' },
                        { model: db.allCode, as: 'statusData' }

                    ]
                })
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
                data = await db.HoaDon.findAll({
                    where: {
                        userId: userId
                    },
                    include: [
                        { model: db.User, as: 'UserData' },
                        { model: db.allCode, as: 'statusData' }

                    ]
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
            console.log(e)
            reject(e)
        }
    })
}


let handleComfimbillUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookData = {};
            let findUser = await db.User.findOne({
                where: {
                    email: data.email
                }
            })
            if (findUser) {
                await db.User.update({
                    firstName: data.firstName,
                    address: data.address,
                    phoneNumber: data.phonenumber,
                }, {
                    where: {
                        email: data.email
                    }
                })
                let createbill = await db.HoaDon.create({
                    userId: findUser.id,
                    tongTien: data.tongTien,
                    status: data.status
                })

                data.billDetailDataArray.map(async (item) => {
                    let findBook = await db.Book.findOne({
                        where: {
                            keyMap: item.bookId
                        }
                    })
                    if (findBook) {
                        await db.Book.update({
                            soLuong: findBook.soLuong - item.soLuong
                        }, {
                            where: {
                                keyMap: item.bookId
                            }
                        })
                    }
                })

                let billDetailDataArray = data.billDetailDataArray.map(item => ({
                    hoaDonId: createbill.id,
                    bookId: item.bookId,
                    soLuong: item.soLuong,
                    thanhTien: item.thanhTien,
                    image: item.image,
                }));

                await db.ChitietHoaDon.bulkCreate(billDetailDataArray);
                bookData.errCode = 0;
                bookData.errMessage = 'Ok';
            } else {
                let createUser = await db.User.create({
                    firstName: data.firstName,
                    email: data.email,
                    address: data.address,
                    phoneNumber: data.phonenumber,
                    roleId: data.roleId
                })
                let createbill = await db.HoaDon.create({
                    userId: createUser.id,
                    tongTien: data.tongTien,
                    status: data.status
                })

                let billDetailDataArray = data.billDetailDataArray.map(item => ({
                    hoaDonId: createbill.id,
                    bookId: item.bookId,
                    soLuong: item.soLuong,
                    thanhTien: item.thanhTien,
                    image: item.image,
                }));

                await db.ChitietHoaDon.bulkCreate(billDetailDataArray);
                bookData.errCode = 0;
                bookData.errMessage = 'Ok';
            }

            resolve(bookData);
        } catch (e) {
            reject(e);
        }
    });
};

let handlegetAllBillMore = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let billData = {};
            let data = await db.ChitietHoaDon.findAll({
                attributes: ['bookId', [sequelize.fn('SUM', sequelize.col('soLuong')), 'soluong']],
                group: ['bookId']
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
            resolve(billData)
        } catch (e) {
            reject(e)
        }
    })
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

