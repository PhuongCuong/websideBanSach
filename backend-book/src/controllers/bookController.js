import bookService from '../services/bookService';

let handleCreatNewNXB = async (req, res) => {
    try {
        let keyMap = req.body.keyMap;
        let tenNXB = req.body.tenNXB;
        if (!keyMap || !tenNXB) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input parament!'
            })
        } else {
            let data = await bookService.handleCreatNewNXB({
                keyMap: keyMap,
                tenNXB: tenNXB
            })
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handleCreateNewNCC = async (req, res) => {
    try {
        let keyMap = req.body.keyMap;
        let tenNCC = req.body.tenNCC;
        if (!keyMap || !tenNCC) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input parament!'
            })
        } else {
            let data = await bookService.handleCreateNewNCC({
                keyMap: keyMap,
                tenNCC: tenNCC
            })
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handleCreateNewTL = async (req, res) => {
    try {
        let keyMap = req.body.keyMap;
        let theLoai = req.body.theLoai;
        if (!keyMap || !theLoai) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input parament!'
            })
        } else {
            let data = await bookService.handleCreateNewTL({
                keyMap: keyMap,
                theLoai: theLoai
            })
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handlegetAllNCC = async (req, res) => {
    try {
        let keyMap = req.query.keyMap;
        if (!keyMap) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input paramenter!'
            })
        } else {
            let data = await bookService.handlegetAllNCC(keyMap);
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage,
                data: data && data.data ? data.data : {}
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handlegetAllNXB = async (req, res) => {
    try {
        let keyMap = req.query.keyMap;
        if (!keyMap) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input paramenter!'
            })
        } else {
            let data = await bookService.handlegetAllNXB(keyMap);
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage,
                data: data && data.data ? data.data : {}
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handlegetAllTL = async (req, res) => {
    try {
        let keyMap = req.query.keyMap;
        if (!keyMap) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input paramenter!'
            })
        } else {
            let data = await bookService.handlegetAllTL(keyMap);
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage,
                data: data && data.data ? data.data : {}
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handleDeleteNCC = async (req, res) => {
    try {
        let keyMap = req.body.keyMap;
        if (!keyMap) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input parament!'
            })
        } else {
            let data = await bookService.handleDeleteNCC(keyMap);
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handleDeleteNXB = async (req, res) => {
    try {
        let keyMap = req.body.keyMap;
        if (!keyMap) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input parament!'
            })
        } else {
            let data = await bookService.handleDeleteNXB(keyMap);
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handleDeleteTL = async (req, res) => {
    try {
        let keyMap = req.body.keyMap;
        if (!keyMap) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input parament!'
            })
        } else {
            let data = await bookService.handleDeleteTL(keyMap);
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handleUpdateNCC = async (req, res) => {
    try {
        let NCC = req.body;
        if (!NCC.keyMap || !NCC.tenNCC
        ) {
            res.status(200).json({
                errCode: 1,
                errMessager: 'Missing input paramenter'
            })
        } else {
            let data = await bookService.handleUpdateNCC(NCC);
            res.status(200).json({
                errCode: data.errCode,
                errMessager: data.errMessager
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handleUpdateNXB = async (req, res) => {
    try {
        let NXB = req.body;
        if (!NXB.keyMap || !NXB.tenNXB
        ) {
            res.status(200).json({
                errCode: 1,
                errMessager: 'Missing input paramenter'
            })
        } else {
            let data = await bookService.handleUpdateNXB(NXB);
            res.status(200).json({
                errCode: data.errCode,
                errMessager: data.errMessager
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handleUpdateTL = async (req, res) => {
    try {
        let TL = req.body;
        if (!TL.keyMap || !TL.theLoai
        ) {
            res.status(200).json({
                errCode: 1,
                errMessager: 'Missing input paramenter'
            })
        } else {
            let data = await bookService.handleUpdateTL(TL);
            res.status(200).json({
                errCode: data.errCode,
                errMessager: data.errMessager
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handleCreateNewBook = async (req, res) => {
    try {
        let bookdata = req.body;
        let file = req.file;
        if (!bookdata.NCC || !bookdata.NXB || !bookdata.TL
            || !bookdata.tenSach || !bookdata.gia || !bookdata.tacGia
            || !bookdata.soLuong || !bookdata.keyMap || !bookdata.sanPham
        ) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input paramenter!'
            })
        } else {
            let data = await bookService.handleCreateNewBook(bookdata, file);
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handleUpdateBook = async (req, res) => {
    try {
        let bookdata = req.body;
        let file = req.file;
        if (!bookdata.NCC || !bookdata.NXB || !bookdata.TL
            || !bookdata.tenSach || !bookdata.gia || !bookdata.tacGia
            || !bookdata.soLuong || !bookdata.keyMap || !bookdata.image || !bookdata.sanPham) {
            res.status(200).json({
                errCode: 1,
                errMessager: 'Missing input paramenter'
            })
        } else {
            let data = await bookService.handleUpdateBook(bookdata, file);
            res.status(200).json({
                errCode: data.errCode,
                errMessager: data.errMessager
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handlegetAllBook = async (req, res) => {
    try {
        let type = req.query.type;
        if (!type) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input paramenter!'
            })
        } else {
            let data = await bookService.handlegetAllBook(type);
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage,
                data: data.data
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handleDeleteBook = async (req, res) => {
    try {
        let keyMap = req.body.keyMap;
        if (!keyMap) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input paramenter!'
            })
        } else {
            let data = await bookService.handleDeleteBook(keyMap);
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage
            })
        }
    } catch (e) {
        console.log(e)
    }
}


let handleCreateNewdiscount = async (req, res) => {
    try {
        let discountdata = req.body;
        if (!discountdata.maSach || !discountdata.tenSach
            || !discountdata.ngayBD || !discountdata.ngayKT || !discountdata.discount) {
            res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input body'
            })
        } else {
            let data = await bookService.handleCreateNewdiscount(discountdata);
            res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handlegetAlldiscount = async (req, res) => {
    try {
        let maSach = req.query.maSach;
        if (!maSach) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input paramenter!'
            })
        } else {
            let data = await bookService.handlegetAlldiscount(maSach);
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage,
                data: data.data
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handleUpdatediscout = async (req, res) => {
    try {
        let discount = req.body;
        if (!discount.maSach || !discount.tenSach || !discount.discount
            || !discount.ngayBD || !discount.ngayKT
        ) {
            return res.status(200).json({
                errCode: 1,
                errMessager: 'Missing input paramenter'
            })
        } else {
            let data = await bookService.handleUpdatediscout(discount);
            return res.status(200).json({
                errCode: data.errCode,
                errMessager: data.errMessager
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handleDeletediscount = async (req, res) => {
    try {
        let maSach = req.body.maSach;
        if (!maSach) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input paramenter!'
            })
        } else {
            let data = await bookService.handleDeletediscount(maSach);
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage
            })
        }
    } catch (e) {
        console.log(e)
    }
}


let handleCreateNewBookInfo = async (req, res) => {
    try {
        let discountdata = req.body;
        if (!discountdata.bookId || !discountdata.descriptionHTML
            || !discountdata.descriptionMarkDown) {
            res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input body'
            })
        } else {
            let data = await bookService.handleCreateNewBookInfo(discountdata);
            res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handlegetAllBookInfo = async (req, res) => {
    try {
        let bookId = req.query.bookId;
        if (!bookId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input paramenter!'
            })
        } else {
            let data = await bookService.handlegetAllBookInfo(bookId);
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage,
                data: data.data
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handleUpdateBookInfo = async (req, res) => {
    try {
        let discount = req.body;
        if (!discount.bookId || !discount.descriptionHTML || !discount.descriptionMarkDown
        ) {
            return res.status(200).json({
                errCode: 1,
                errMessager: 'Missing input paramenter'
            })
        } else {
            let data = await bookService.handleUpdateBookInfo(discount);
            return res.status(200).json({
                errCode: data.errCode,
                errMessager: data.errMessager
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handlegetAllBookbyCart = async (req, res) => {
    try {
        let type = req.query.type;
        if (!type) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input paramenter!'
            })
        } else {
            let data = await bookService.handlegetAllBookbyCart(type);
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage,
                data: data.data
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handlegetAllBookbyTL = async (req, res) => {
    try {
        let type = req.query.type;
        if (!type) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input paramenter!'
            })
        } else {
            let data = await bookService.handlegetAllBookbyTL(type);
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage,
                data: data.data
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handleCountALL = async (req, res) => {
    try {
        let data = await bookService.handleCountALL();
        return res.status(200).json({
            errCode: data.errCode,
            errMessage: data.errMessage,
            data: data.data
        })
    } catch (e) {
        console.log(e)
    }
}

let handlegetAllBookbySP = async (req, res) => {
    try {
        let sanPham = req.query.sanPham;
        if (!sanPham) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input paramenter!'
            })
        } else {
            let data = await bookService.handlegetAllBookbySP(sanPham);
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage,
                data: data.data
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handlegetAllNXBbySP = async (req, res) => {
    try {
        let sanPham = req.query.sanPham;
        if (!sanPham) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input paramenter!'
            })
        } else {
            let data = await bookService.handlegetAllNXBbySP(sanPham);
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage,
                data: data && data.data ? data.data : {}
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handlegetAllTLbySP = async (req, res) => {
    try {
        let sanPham = req.query.sanPham;
        if (!sanPham) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input paramenter!'
            })
        } else {
            let data = await bookService.handlegetAllTLbySP(sanPham);
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage,
                data: data && data.data ? data.data : {}
            })
        }
    } catch (e) {
        console.log(e)
    }
}


let handlegetAllNCCbySP = async (req, res) => {
    try {
        let sanPham = req.query.sanPham;
        if (!sanPham) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input paramenter!'
            })
        } else {
            let data = await bookService.handlegetAllNCCbySP(sanPham);
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage,
                data: data && data.data ? data.data : {}
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handleCountALLTL = async (req, res) => {
    try {
        let data = await bookService.handleCountALLTL();
        return res.status(200).json({
            errCode: data.errCode,
            errMessage: data.errMessage,
            data: data.data
        })
    } catch (e) {
        console.log(e)
    }
}

let handleCountALLNCC = async (req, res) => {
    try {
        let data = await bookService.handleCountALLNCC();
        return res.status(200).json({
            errCode: data.errCode,
            errMessage: data.errMessage,
            data: data.data
        })
    } catch (e) {
        console.log(e)
    }
}

let handleCountALLNXB = async (req, res) => {
    try {
        let data = await bookService.handleCountALLNXB();
        return res.status(200).json({
            errCode: data.errCode,
            errMessage: data.errMessage,
            data: data.data
        })
    } catch (e) {
        console.log(e)
    }
}

let handlegetAllBookbyNCC = async (req, res) => {
    try {
        let type = req.query.type;
        if (!type) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input paramenter!'
            })
        } else {
            let data = await bookService.handlegetAllBookbyNCC(type);
            return res.status(200).json({
                errCode: data.errCode,
                errMessage: data.errMessage,
                data: data.data
            })
        }
    } catch (e) {
        console.log(e)
    }
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