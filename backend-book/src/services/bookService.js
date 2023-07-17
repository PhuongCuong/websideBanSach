import db from '../models/index';
const { QueryTypes } = require('sequelize');

import { uploadfile } from './uploadS3'

let handleCreatNewNXB = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookData = {};
            let res = await db.nhaxuatban.findOne({
                where: {
                    keyMap: data.keyMap
                }
            })
            if (res) {
                bookData.errCode = 2;
                bookData.errMessage = 'NXB existed';
            } else {
                let datacreate = db.nhaxuatban.create({
                    keyMap: data.keyMap,
                    tenNXB: data.tenNXB
                })
                bookData.errCode = 0;
                bookData.errMessage = 'Ok';
            }
            resolve(bookData)
        } catch (e) {
            reject(e)
        }
    })
}

let handleCreateNewNCC = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookData = {};
            let res = await db.nhacungcap.findOne({
                where: {
                    keyMap: data.keyMap
                }
            })
            if (res) {
                bookData.errCode = 2;
                bookData.errMessage = 'NCC existed';
            } else {
                let datacreate = db.nhacungcap.create({
                    keyMap: data.keyMap,
                    tenNCC: data.tenNCC
                })
                bookData.errCode = 0;
                bookData.errMessage = 'Ok';
            }
            resolve(bookData)
        } catch (e) {
            reject(e)
        }
    })
}

let handleCreateNewTL = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookData = {};
            let res = await db.theloai.findOne({
                where: {
                    keyMap: data.keyMap
                }
            })
            if (res) {
                bookData.errCode = 2;
                bookData.errMessage = 'TL existed';
            } else {
                let datacreate = db.theloai.create({
                    keyMap: data.keyMap,
                    theLoai: data.theLoai
                })
                bookData.errCode = 0;
                bookData.errMessage = 'Ok';
            }
            resolve(bookData)
        } catch (e) {
            reject(e)
        }
    })
}

let handlegetAllNCC = (keyMap) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookData = {};
            let data = '';
            if (keyMap === 'ALL') {
                data = await db.nhacungcap.findAll();
                if (data) {
                    bookData.errCode = 0;
                    bookData.errMessage = 'Ok';
                    bookData.data = data;
                } else {
                    bookData.errCode = 2;
                    bookData.errCode = 'data is not fond';
                    bookData.data = {};
                }
            } else {
                data = await db.nhacungcap.findOne({
                    where: {
                        keyMap: keyMap
                    }
                })
                if (data) {
                    bookData.errCode = 0;
                    bookData.errMessage = 'Ok';
                    bookData.data = data;
                } else {
                    bookData.errCode = 2;
                    bookData.errMessage = 'data is not fond';
                    bookData.data = {};
                }
            }
            resolve(bookData)
        } catch (e) {
            reject(e)
        }
    })
}

let handlegetAllNXB = (keyMap) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookData = {};
            let data = '';
            if (keyMap === 'ALL') {
                data = await db.nhaxuatban.findAll();
                if (data) {
                    bookData.errCode = 0;
                    bookData.errMessage = 'Ok';
                    bookData.data = data;
                } else {
                    bookData.errCode = 2;
                    bookData.errMessage = 'data is not fond';
                    bookData.data = {};
                }
            } else {
                data = await db.nhaxuatban.findOne({
                    where: {
                        keyMap: keyMap
                    }
                })
                if (data) {
                    bookData.errCode = 0;
                    bookData.errMessage = 'Ok';
                    bookData.data = data;
                } else {
                    bookData.errCode = 2;
                    bookData.errMessage = 'data is not fond';
                    bookData.data = {};
                }
            }
            resolve(bookData)
        } catch (e) {
            reject(e)
        }
    })
}

let handlegetAllTL = (keyMap) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookData = {};
            let data = '';
            if (keyMap === 'ALL') {
                data = await db.theloai.findAll();
                if (data) {
                    bookData.errCode = 0;
                    bookData.errMessage = 'Ok';
                    bookData.data = data;
                } else {
                    bookData.errCode = 2;
                    bookData.errMessage = 'data is not fond';
                    bookData.data = {};
                }
            } else {
                data = await db.theloai.findOne({
                    where: {
                        keyMap: keyMap
                    }
                })
                if (data) {
                    bookData.errCode = 0;
                    bookData.errMessage = 'Ok';
                    bookData.data = data;
                } else {
                    bookData.errCode = 2;
                    bookData.errMessage = 'data is not fond';
                    bookData.data = {};
                }
            }
            resolve(bookData)
        } catch (e) {
            reject(e)
        }
    })
}

let handleDeleteNCC = (keyMap) => {
    return new Promise(async (resolve, reject) => {
        let NCCData = {};
        try {
            let NCC = await db.nhacungcap.findOne({
                where: {
                    keyMap: keyMap
                }
            })
            if (!NCC) {
                NCCData.errCode = 2;
                NCCData.errMessage = 'NCC is undefined'
            } else {
                await db.nhacungcap.destroy({
                    where: {
                        keyMap: keyMap
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

let handleDeleteNXB = (keyMap) => {
    return new Promise(async (resolve, reject) => {
        let NCCData = {};
        try {
            let NCC = await db.nhaxuatban.findOne({
                where: {
                    keyMap: keyMap
                }
            })
            if (!NCC) {
                NCCData.errCode = 2;
                NCCData.errMessage = 'NXB is undefined'
            } else {
                await db.nhaxuatban.destroy({
                    where: {
                        keyMap: keyMap
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

let handleDeleteTL = (keyMap) => {
    return new Promise(async (resolve, reject) => {
        let NCCData = {};
        try {
            let NCC = await db.theloai.findOne({
                where: {
                    keyMap: keyMap
                }
            })
            if (!NCC) {
                NCCData.errCode = 2;
                NCCData.errMessage = 'TL is undefined'
            } else {
                await db.theloai.destroy({
                    where: {
                        keyMap: keyMap
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

let handleUpdateNCC = (NCC) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let ncc = await db.nhacungcap.findOne({
                where: {
                    keyMap: NCC.keyMap
                }
            });
            if (!ncc) {
                userData.errCode = 2;
                userData.errMessager = 'not find NCC';
            } else {
                await db.nhacungcap.update({
                    keyMap: NCC.keyMap,
                    tenNCC: NCC.tenNCC
                }, {
                    where: {
                        keyMap: NCC.keyMap
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


let handleUpdateNXB = (NXB) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let nxb = await db.nhaxuatban.findOne({
                where: {
                    keyMap: NXB.keyMap
                }
            });
            if (!nxb) {
                userData.errCode = 2;
                userData.errMessager = 'not find NXB';
            } else {
                await db.nhaxuatban.update({
                    keyMap: NXB.keyMap,
                    tenNXB: NXB.tenNXB
                }, {
                    where: {
                        keyMap: NXB.keyMap
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


let handleUpdateTL = (TL) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let tl = await db.theloai.findOne({
                where: {
                    keyMap: TL.keyMap
                }
            });
            if (!tl) {
                userData.errCode = 2;
                userData.errMessager = 'not find TL';
            } else {
                await db.theloai.update({
                    keyMap: TL.keyMap,
                    theLoai: TL.theLoai
                }, {
                    where: {
                        keyMap: TL.keyMap
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

let handleCreateNewBook = (bookinput, file) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookdata = {};
            let data = await db.Book.findOne({
                where: {
                    keyMap: bookinput.keyMap
                }
            })
            if (data) {
                bookdata.errCode = 2;
                bookdata.errMessage = 'Book existed!'
            } else {
                let link = await uploadfile(file);
                // console.log('check link', params.Key)
                await db.Book.create({
                    tenSach: bookinput.tenSach,
                    nhaCungCap: bookinput.NCC,
                    nhaXuatBan: bookinput.NXB,
                    tacGia: bookinput.tacGia,
                    gia: bookinput.gia,
                    theLoai: bookinput.TL,
                    keyMap: bookinput.keyMap,
                    soLuong: bookinput.soLuong,
                    image: link,
                    sanPham: bookinput.sanPham
                })
                bookdata.errCode = 0;
                bookdata.errMessage = 'create a new book is success!'
            }

            resolve(bookdata)
        } catch (e) {
            reject(e)
        }
    })
}

let handlegetAllBook = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookdata = {};
            let data = {};
            if (type === 'ALL') {
                data = await db.Book.findAll({
                    include: [
                        { model: db.nhaxuatban, as: 'nhaxuatbanData' },
                        { model: db.nhacungcap, as: 'nhacungcapData' },
                        { model: db.theloai, as: 'theloaiData' },
                        { model: db.discount, as: 'discountData' },
                        { model: db.BookInfor, as: 'BookInfoData' },
                        { model: db.allCode, as: 'sanPhamData' }


                    ]
                });
                if (data) {
                    bookdata.errCode = 0;
                    bookdata.errMessage = 'OK find all book';
                    bookdata.data = data;
                } else {
                    bookdata.errCode = 2;
                    bookdata.errMessage = 'error find book';
                    bookdata.data = {};
                }
            } else {
                data = await db.Book.findOne({
                    where: {
                        keyMap: type
                    },
                    include: [
                        { model: db.nhaxuatban, as: 'nhaxuatbanData' },
                        { model: db.nhacungcap, as: 'nhacungcapData' },
                        { model: db.theloai, as: 'theloaiData' },
                        { model: db.discount, as: 'discountData' },
                        { model: db.BookInfor, as: 'BookInfoData' },
                        { model: db.allCode, as: 'sanPhamData' }



                    ]
                })
                if (data) {
                    bookdata.errCode = 0;
                    bookdata.errMessage = 'OK find one book';
                    bookdata.data = data;

                } else {
                    bookdata.errCode = 3;
                    bookdata.errMessage = 'error find one book';
                    bookdata.data = {};

                }
            }
            resolve(bookdata)
        } catch (e) {
            reject(e)
        }
    })
}

let handleDeleteBook = (keyMap) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookdata = {};
            let data = await db.Book.findOne({
                where: {
                    keyMap: keyMap
                }
            })
            if (!data) {
                bookdata.errCode = 2;
                bookdata.errMessage = 'not find book';
            } else {
                await db.Book.destroy({
                    where: {
                        keyMap: keyMap
                    }
                })
                bookdata.errCode = 0;
                bookdata.errMessage = 'delete book success!';
            }
            resolve(bookdata)
        } catch (e) {
            reject(e)
        }
    })
}

let handleUpdateBook = (data, file) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookdata = {};
            let book = await db.Book.findOne({
                where: {
                    keyMap: data.keyMap
                }
            });
            if (!book) {
                bookdata.errCode = 2;
                bookdata.errMessager = 'not find book';
            } else {
                let link = '';
                if (file) {
                    link = await uploadfile(file);

                } else {
                    link = data.image;
                }
                await db.Book.update({
                    tenSach: data.tenSach,
                    nhaCungCap: data.NCC,
                    nhaXuatBan: data.NXB,
                    tacGia: data.tacGia,
                    gia: data.gia,
                    theLoai: data.TL,
                    keyMap: data.keyMap,
                    soLuong: data.soLuong,
                    image: link,
                    sanPham: data.sanPham

                }, {
                    where: {
                        keyMap: data.keyMap
                    }
                })
                bookdata.errCode = 0;
                bookdata.errMessager = 'Ok';
            }
            resolve(bookdata)
        } catch (e) {
            reject(e)
        }
    })
}

let handleCreateNewdiscount = (datainput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookdata = {};
            let data = await db.discount.findOne({
                where: {
                    maSach: datainput.maSach
                }
            })
            if (data) {
                bookdata.errCode = 2;
                bookdata.errMessage = 'discount existed!'
            } else {
                await db.discount.create({
                    tenSach: datainput.tenSach,
                    maSach: datainput.maSach,
                    discount: datainput.discount,
                    ngayBD: datainput.ngayBD,
                    ngayKT: datainput.ngayKT,
                })
                bookdata.errCode = 0;
                bookdata.errMessage = 'create a new discount is success!'
            }

            resolve(bookdata)
        } catch (e) {
            reject(e)
        }
    })
}

let handlegetAlldiscount = (maSach) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookData = {};
            let data = '';
            if (maSach === 'ALL') {
                data = await db.discount.findAll();
                if (data) {
                    bookData.errCode = 0;
                    bookData.errMessage = 'Ok';
                    bookData.data = data;
                } else {
                    bookData.errCode = 2;
                    bookData.errMessage = 'data is not fond';
                    bookData.data = {};
                }
            } else {
                data = await db.discount.findOne({
                    where: {
                        maSach: maSach
                    }
                })
                if (data) {
                    bookData.errCode = 0;
                    bookData.errMessage = 'Ok';
                    bookData.data = data;
                } else {
                    bookData.errCode = 2;
                    bookData.errMessage = 'data is not fond';
                    bookData.data = {};
                }
            }
            resolve(bookData)
        } catch (e) {
            reject(e)
        }
    })
}

let handleUpdatediscout = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookdata = {};
            let book = await db.discount.findOne({
                where: {
                    maSach: data.maSach
                }
            });
            if (!book) {
                bookdata.errCode = 2;
                bookdata.errMessager = 'not find discount';
            } else {
                await db.discount.update({
                    maSach: data.maSach,
                    tenSach: data.tenSach,
                    discount: data.discount,
                    ngayBD: data.ngayBD,
                    ngayKT: data.ngayKT,
                }, {
                    where: {
                        maSach: data.maSach
                    }
                })
                bookdata.errCode = 0;
                bookdata.errMessager = 'Ok';
            }
            resolve(bookdata)
        } catch (e) {
            reject(e)
        }
    })
}

let handleDeletediscount = (maSach) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookdata = {};
            let data = await db.discount.findOne({
                where: {
                    maSach: maSach
                }
            })
            if (!data) {
                bookdata.errCode = 2;
                bookdata.errMessage = 'not find discount';
            } else {
                await db.discount.destroy({
                    where: {
                        maSach: maSach
                    }
                })
                bookdata.errCode = 0;
                bookdata.errMessage = 'delete discount success!';
            }
            resolve(bookdata)
        } catch (e) {
            reject(e)
        }
    })
}

let handleCreateNewBookInfo = (datainput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookdata = {};
            let data = await db.BookInfor.findOne({
                where: {
                    bookId: datainput.bookId
                }
            })
            if (data) {
                bookdata.errCode = 2;
                bookdata.errMessage = 'bookinfo existed!'
            } else {
                await db.BookInfor.create({
                    bookId: datainput.bookId,
                    descriptionHTML: datainput.descriptionHTML,
                    descriptionMarkDown: datainput.descriptionMarkDown,
                })
                bookdata.errCode = 0;
                bookdata.errMessage = 'create a new bookinfo is success!'
            }

            resolve(bookdata)
        } catch (e) {
            reject(e)
        }
    })
}

let handlegetAllBookInfo = (maSach) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookData = {};
            let data = '';
            if (maSach === 'ALL') {
                data = await db.BookInfor.findAll();
                if (data) {
                    bookData.errCode = 0;
                    bookData.errMessage = 'Ok';
                    bookData.data = data;
                } else {
                    bookData.errCode = 2;
                    bookData.errMessage = 'data is not fond';
                    bookData.data = {};
                }
            } else {
                data = await db.BookInfor.findOne({
                    where: {
                        bookId: maSach
                    }
                })
                if (data) {
                    bookData.errCode = 0;
                    bookData.errMessage = 'Ok';
                    bookData.data = data;
                } else {
                    bookData.errCode = 2;
                    bookData.errMessage = 'data is not fond';
                    bookData.data = {};
                }
            }
            resolve(bookData)
        } catch (e) {
            reject(e)
        }
    })
}

let handleUpdateBookInfo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookdata = {};
            let book = await db.BookInfor.findOne({
                where: {
                    bookId: data.bookId
                }
            });
            if (!book) {
                bookdata.errCode = 2;
                bookdata.errMessager = 'not find book';
            } else {
                await db.BookInfor.update({
                    bookId: data.bookId,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkDown: data.descriptionMarkDown,
                }, {
                    where: {
                        bookId: data.bookId
                    }
                })
                bookdata.errCode = 0;
                bookdata.errMessager = 'Ok';
            }
            resolve(bookdata)
        } catch (e) {
            reject(e)
        }
    })
}


let handlegetAllBookbyCart = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookdata = {};
            let data = {};
            if (type === 'ALL') {
                data = await db.Book.findAll({
                    include: [
                        { model: db.theloai, as: 'theloaiData' },
                        { model: db.discount, as: 'discountData' },
                        { model: db.allCode, as: 'sanPhamData' }

                    ],
                    attributes: ['image', 'gia', 'tenSach', 'keyMap', 'soLuong']
                });
                if (data) {
                    bookdata.errCode = 0;
                    bookdata.errMessage = 'OK find all book';
                    bookdata.data = data;
                } else {
                    bookdata.errCode = 2;
                    bookdata.errMessage = 'error find book';
                    bookdata.data = {};
                }
            } else {
                data = await db.Book.findOne({
                    where: {
                        keyMap: type
                    },
                    include: [
                        { model: db.theloai, as: 'theloaiData' },
                        { model: db.discount, as: 'discountData' },
                        { model: db.allCode, as: 'sanPhamData' }

                    ],
                    attributes: ['image', 'gia', 'tenSach', 'keyMap', 'soLuong']

                })
                if (data) {
                    bookdata.errCode = 0;
                    bookdata.errMessage = 'OK find one book';
                    bookdata.data = data;

                } else {
                    bookdata.errCode = 3;
                    bookdata.errMessage = 'error find one book';
                    bookdata.data = {};

                }
            }
            resolve(bookdata)
        } catch (e) {
            reject(e)
        }
    })
}

let handlegetAllBookbyTL = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookdata = {};
            let data = {};
            if (type === 'ALL') {
                data = await db.Book.findAll({
                    include: [
                        { model: db.discount, as: 'discountData' },
                    ],
                    attributes: ['image', 'gia', 'tenSach', 'keyMap', 'soLuong']
                });
                if (data) {
                    bookdata.errCode = 0;
                    bookdata.errMessage = 'OK find all book';
                    bookdata.data = data;
                } else {
                    bookdata.errCode = 2;
                    bookdata.errMessage = 'error find book';
                    bookdata.data = {};
                }
            } else {
                data = await db.Book.findAll({
                    where: {
                        theLoai: type
                    },
                    include: [
                        { model: db.discount, as: 'discountData' },
                    ],
                    attributes: ['image', 'gia', 'tenSach', 'keyMap', 'soLuong']

                })
                if (data) {
                    bookdata.errCode = 0;
                    bookdata.errMessage = 'OK find one book';
                    bookdata.data = data;

                } else {
                    bookdata.errCode = 3;
                    bookdata.errMessage = 'error find one book';
                    bookdata.data = {};

                }
            }
            resolve(bookdata)
        } catch (e) {
            reject(e)
        }
    })
}

let handleCountALL = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookdata = {};
            let data = await db.Book.count()
            if (data) {
                bookdata.errCode = 0;
                bookdata.errMessage = 'OK find all book';
                bookdata.data = data;
            } else {
                bookdata.errCode = 3;
                bookdata.errMessage = 'error find sanPham book';
                bookdata.data = {};
            }
            resolve(bookdata)
        } catch (e) {
            reject(e)
        }
    })
}

let handlegetAllBookbySP = (sanPham) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookdata = {};
            let data = {};
            if (sanPham === 'ALL') {
                data = await db.Book.findAll({
                    include: [
                        { model: db.nhaxuatban, as: 'nhaxuatbanData' },
                        { model: db.nhacungcap, as: 'nhacungcapData' },
                        { model: db.theloai, as: 'theloaiData' },
                        { model: db.discount, as: 'discountData' },
                        { model: db.BookInfor, as: 'BookInfoData' },
                        { model: db.allCode, as: 'sanPhamData' },
                        { model: db.discount, as: 'discountData' },

                    ],
                });
                if (data) {
                    bookdata.errCode = 0;
                    bookdata.errMessage = 'OK find all book';
                    bookdata.data = data;
                } else {
                    bookdata.errCode = 2;
                    bookdata.errMessage = 'error find book';
                    bookdata.data = {};
                }
            } else {
                data = await db.Book.findAll({
                    where: {
                        sanPham: sanPham
                    },
                    include: [
                        { model: db.nhaxuatban, as: 'nhaxuatbanData' },
                        { model: db.nhacungcap, as: 'nhacungcapData' },
                        { model: db.theloai, as: 'theloaiData' },
                        { model: db.discount, as: 'discountData' },
                        { model: db.BookInfor, as: 'BookInfoData' },
                        { model: db.allCode, as: 'sanPhamData' },
                        { model: db.discount, as: 'discountData' },

                    ],

                })
                if (data) {
                    bookdata.errCode = 0;
                    bookdata.errMessage = 'OK find one book';
                    bookdata.data = data;

                } else {
                    bookdata.errCode = 3;
                    bookdata.errMessage = 'error find one book';
                    bookdata.data = {};

                }
            }
            resolve(bookdata)
        } catch (e) {
            reject(e)
        }
    })
}

let handlegetAllNXBbySP = (sanPham) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookData = {};
            let data = '';
            if (sanPham === 'ALL') {
                data = await db.nhaxuatban.findAll({
                    include: 'BookData'

                });
                if (data) {
                    bookData.errCode = 0;
                    bookData.errMessage = 'Ok';
                    bookData.data = data;
                } else {
                    bookData.errCode = 2;
                    bookData.errMessage = 'data is not fond';
                    bookData.data = {};
                }
            } else {
                data = await db.nhaxuatban.findAll({
                    include: [{
                        model: db.Book,
                        as: 'BookData',
                        where: {
                            sanPham: sanPham
                        }
                    }
                    ]

                })
                if (data) {
                    bookData.errCode = 0;
                    bookData.errMessage = 'Ok';
                    bookData.data = data;
                } else {
                    bookData.errCode = 2;
                    bookData.errMessage = 'data is not fond';
                    bookData.data = {};
                }
            }
            resolve(bookData)
        } catch (e) {
            reject(e)
        }
    })
}

let handlegetAllTLbySP = (sanPham) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookData = {};
            let data = '';
            if (sanPham === 'ALL') {
                data = await db.theloai.findAll();
                if (data) {
                    bookData.errCode = 0;
                    bookData.errMessage = 'Ok';
                    bookData.data = data;
                } else {
                    bookData.errCode = 2;
                    bookData.errMessage = 'data is not fond';
                    bookData.data = {};
                }
            } else {
                data = await db.theloai.findAll({
                    include: [{
                        model: db.Book,
                        as: 'BookData',
                        where: {
                            sanPham: sanPham
                        }
                    }
                    ]
                })
                if (data) {
                    bookData.errCode = 0;
                    bookData.errMessage = 'Ok';
                    bookData.data = data;
                } else {
                    bookData.errCode = 2;
                    bookData.errMessage = 'data is not fond';
                    bookData.data = {};
                }
            }
            resolve(bookData)
        } catch (e) {
            reject(e)
        }
    })
}

let handlegetAllNCCbySP = (sanPham) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookData = {};
            let data = '';
            if (sanPham === 'ALL') {
                data = await db.nhacungcap.findAll(

                );
                if (data) {
                    bookData.errCode = 0;
                    bookData.errMessage = 'Ok';
                    bookData.data = data;
                } else {
                    bookData.errCode = 2;
                    bookData.errMessage = 'data is not fond';
                    bookData.data = {};
                }
            } else {
                data = await db.nhacungcap.findAll({
                    include: [{
                        model: db.Book,
                        as: 'BookData',
                        where: {
                            sanPham: sanPham
                        }
                    }
                    ]
                })
                if (data) {
                    bookData.errCode = 0;
                    bookData.errMessage = 'Ok';
                    bookData.data = data;
                } else {
                    bookData.errCode = 2;
                    bookData.errMessage = 'data is not fond';
                    bookData.data = {};
                }
            }
            resolve(bookData)
        } catch (e) {
            reject(e)
        }
    })
}

let handleCountALLTL = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookdata = {};
            let data = await db.theloai.count()
            if (data) {
                bookdata.errCode = 0;
                bookdata.errMessage = 'OK find all book';
                bookdata.data = data;
            } else {
                bookdata.errCode = 3;
                bookdata.errMessage = 'error find sanPham book';
                bookdata.data = {};
            }
            resolve(bookdata)
        } catch (e) {
            reject(e)
        }
    })
}

let handleCountALLNCC = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookdata = {};
            let data = await db.nhacungcap.count()
            if (data) {
                bookdata.errCode = 0;
                bookdata.errMessage = 'OK find all book';
                bookdata.data = data;
            } else {
                bookdata.errCode = 3;
                bookdata.errMessage = 'error find sanPham book';
                bookdata.data = {};
            }
            resolve(bookdata)
        } catch (e) {
            reject(e)
        }
    })
}

let handleCountALLNXB = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookdata = {};
            let data = await db.nhaxuatban.count()
            if (data) {
                bookdata.errCode = 0;
                bookdata.errMessage = 'OK find all book';
                bookdata.data = data;
            } else {
                bookdata.errCode = 3;
                bookdata.errMessage = 'error find sanPham book';
                bookdata.data = {};
            }
            resolve(bookdata)
        } catch (e) {
            reject(e)
        }
    })
}

let handlegetAllBookbyNCC = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookdata = {};
            let data = {};
            if (type === 'ALL') {
                data = await db.Book.findAll({
                    include: [
                        { model: db.discount, as: 'discountData' },
                    ],
                    attributes: ['image', 'gia', 'tenSach', 'keyMap', 'soLuong']
                });
                if (data) {
                    bookdata.errCode = 0;
                    bookdata.errMessage = 'OK find all book';
                    bookdata.data = data;
                } else {
                    bookdata.errCode = 2;
                    bookdata.errMessage = 'error find book';
                    bookdata.data = {};
                }
            } else {
                data = await db.Book.findAll({
                    where: {
                        nhaCungCap: type
                    },
                    include: [
                        { model: db.discount, as: 'discountData' },
                    ],
                    attributes: ['image', 'gia', 'tenSach', 'keyMap', 'soLuong']

                })
                if (data) {
                    bookdata.errCode = 0;
                    bookdata.errMessage = 'OK find one book';
                    bookdata.data = data;

                } else {
                    bookdata.errCode = 3;
                    bookdata.errMessage = 'error find one book';
                    bookdata.data = {};

                }
            }
            resolve(bookdata)
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    handleCreatNewNXB: handleCreatNewNXB,
    handleCreateNewNCC: handleCreateNewNCC,
    handleCreateNewTL: handleCreateNewTL,
    handlegetAllNCC: handlegetAllNCC,
    handlegetAllNXB: handlegetAllNXB,
    handlegetAllTL: handlegetAllTL,
    handleDeleteNCC: handleDeleteNCC,
    handleDeleteNXB: handleDeleteNXB,
    handleDeleteTL: handleDeleteTL,
    handleUpdateNCC: handleUpdateNCC,
    handleUpdateNXB: handleUpdateNXB,
    handleUpdateTL: handleUpdateTL,
    handleCreateNewBook: handleCreateNewBook,
    handlegetAllBook: handlegetAllBook,
    handleDeleteBook: handleDeleteBook,
    handleUpdateBook: handleUpdateBook,
    handleCreateNewdiscount: handleCreateNewdiscount,
    handlegetAlldiscount: handlegetAlldiscount,
    handleDeletediscount: handleDeletediscount,
    handleUpdatediscout: handleUpdatediscout,
    handleCreateNewBookInfo: handleCreateNewBookInfo,
    handlegetAllBookInfo: handlegetAllBookInfo,
    handleUpdateBookInfo: handleUpdateBookInfo,
    handlegetAllBookbyCart: handlegetAllBookbyCart,
    handlegetAllBookbyTL: handlegetAllBookbyTL,
    handleCountALL: handleCountALL,
    handlegetAllBookbySP: handlegetAllBookbySP,
    handlegetAllNXBbySP: handlegetAllNXBbySP,
    handlegetAllTLbySP: handlegetAllTLbySP,
    handlegetAllNCCbySP: handlegetAllNCCbySP,
    handleCountALLTL: handleCountALLTL,
    handleCountALLNCC: handleCountALLNCC,
    handleCountALLNXB: handleCountALLNXB,
    handlegetAllBookbyNCC: handlegetAllBookbyNCC
}