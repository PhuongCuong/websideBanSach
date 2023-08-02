import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BookManager.scss';
import Header from '../../Header/Header';
import TableBookManage from './TableBookManage';
import { Scrollbars } from 'react-custom-scrollbars';
import ModalNXB from './Modal/ModalNXB';
import ModalNCC from './Modal/ModalNCC';
import ModalTL from './Modal/ModalTL';
import {
    handleCreateNewNXB, handleCreateNewTL, handleCreateNewNCC,
    handlegetAllNCC, handlegetAllNXB, handlegetAllTL,
    handleCreateNewBook, handlegetAllBook, handleDeleteBook, handleUpdateBook,
    uploadfile, handlegetAllBookbySP, handlegetAllNXBbySP, handlegetAllTLbySP,
    handlegetAllNCCbySP, handlecountAllBook
} from '../../../services/bookService';

import { handleGetallCodeByType } from '../../../services/userService'
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';



class BookManager extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowNXB: false,
            isShowNCC: false,
            isShowTL: false,
            changeUpdate: false,

            arrNCC: [],
            arrNXB: [],
            arrTL: [],
            arrBook: [],
            preview: [],
            NCC: '',
            NXB: '',
            TL: '',
            tenSach: '',
            gia: '',
            tacGia: '',
            soLuong: '',
            image: '',
            keyMap: '',
            editbook: {},

            selectedFile: null,
            file: {},

            arrSanPham: [],
            sanpham: '',
            isShowLoading: false
        }
    }

    async componentDidMount() {
        await this.handleGetallCodeByType();
        await this.handlegetAllNXBbySP()
        await this.handlegetAllNCCbySP();
        await this.handlegetAllTLbySP();
        await this.handlegetAllBookbySP();

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.arrNCC !== this.state.arrNCC) {

        }
        if (prevState.arrNXB !== this.state.arrNXB) {

        }

        if (prevState.arrTL !== this.state.arrTL) {

        }

        if (prevState.sanpham !== this.state.sanpham) {
            await this.handlegetAllBookbySP();
            await this.handlegetAllNXBbySP();
            await this.handlegetAllTLbySP();
            await this.handlegetAllNCCbySP();

        }
    }


    handleGetAllNCC = async () => {
        let res = await handlegetAllNCC('ALL');
        if (res && res.errCode === 0) {
            this.setState({
                arrNCC: res.data
            })
        }
    }


    handleGetAllTL = async () => {
        let res = await handlegetAllTL('ALL');
        if (res && res.errCode === 0) {
            this.setState({
                arrTL: res.data
            })
        }

    }

    handlegetAllNXB = async () => {
        let res = await handlegetAllNXB('ALL');
        if (res && res.errCode === 0) {
            this.setState({
                arrNXB: res.data
            })
        }
    }


    handleGetallCodeByType = async () => {
        let arrSanPham = await handleGetallCodeByType('sanPham');
        if (arrSanPham && arrSanPham.errCode === 0) {
            this.setState({
                arrSanPham: arrSanPham.data,
                sanpham: arrSanPham && arrSanPham.data.length > 0 ? arrSanPham.data[0].keyMap : ''

            })
        }
    }


    handlegetAllNXBbySP = async () => {
        let arrSanPham = await handlegetAllNXBbySP(this.state.sanpham);
        if (arrSanPham && arrSanPham.errCode === 0) {
            this.setState({
                arrNXB: arrSanPham.data,
            })
        }
    }

    handlegetAllNCCbySP = async () => {
        let arrSanPham = await handlegetAllNCCbySP(this.state.sanpham);
        if (arrSanPham && arrSanPham.errCode === 0) {
            this.setState({
                arrNCC: arrSanPham.data,

            })
        }
    }

    handlegetAllTLbySP = async () => {
        let arrSanPham = await handlegetAllTLbySP(this.state.sanpham);
        if (arrSanPham && arrSanPham.errCode === 0) {
            this.setState({
                arrTL: arrSanPham.data,
            })
        }
    }

    handlegetAllBookbySP = async () => {
        let arrbook = await handlegetAllBookbySP(this.state.sanpham);
        if (arrbook && arrbook.errCode === 0) {
            this.setState({
                arrBook: arrbook.data
            })
        }
    }

    handleCreateNewNCC = async (data) => {
        let res = await handleCreateNewNCC(data);
        if (res && res.errCode === 0) {
            toast.success('create new NCC is success!');
            await this.handleGetAllNCC()
            this.setState({
                isShowNCC: false
            })
        }
        else {
            toast.error('create new NCC is error!')
        }
    }

    handleCreateNewNXB = async (data) => {
        let res = await handleCreateNewNXB(data);
        if (res && res.errCode === 0) {
            toast.success('create new NXB is success!');
            await this.handlegetAllNXB()
            this.setState({
                isShowNXB: false
            })
        }
        else {
            toast.error('create new NXB is error!')
        }
    }

    handleCreateNewTL = async (data) => {
        let res = await handleCreateNewTL(data);
        if (res && res.errCode === 0) {
            toast.success('create new TL is success!');
            await this.handleGetAllTL()
            this.setState({
                isShowTL: false
            })
        }
        else {
            toast.error('create new TL is error!')
        }
    }


    handleOnChangefile = async (event) => {
        let file = event.target.files[0];
        let ObjectURL = URL.createObjectURL(file);
        this.setState({
            file: file,
            preview: ObjectURL
        })
    }




    handleShowNXB = () => {
        this.setState({
            isShowNXB: !this.state.isShowNXB
        })
    }

    handleShowNCC = () => {
        this.setState({
            isShowNCC: !this.state.isShowNCC
        })
    }

    handleShowTL = () => {
        this.setState({
            isShowTL: !this.state.isShowTL
        })
    }

    handleOnChangeInput = (event, id) => {
        let statecopy = { ...this.state };
        statecopy[id] = event.target.value;
        this.setState({
            ...statecopy
        })
    }


    handleCheckinput = () => {
        let check = true;
        let arr = ['NCC', 'NXB', 'TL', 'tenSach', 'gia', 'tacGia', 'soLuong'];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                check = false;
                alert(`Missing input:${arr[i]}`);
                break;
            }
        }
        return check;

    }

    handleOnClickSave = async () => {
        let check = this.handleCheckinput();
        let { arrBook } = this.state;
        if (check === true) {
            let keyMap = '';
            let count = arrBook.map(item => parseInt(item.keyMap.match(/\d+$/)[0]));
            let max = Math.max(...count);

            if (max) {
                keyMap = `MS${max + 1}`
            }
            const formData = new FormData();
            formData.append("image", this.state.file)
            formData.append("keyMap", keyMap)
            formData.append("NCC", this.state.NCC)
            formData.append("NXB", this.state.NXB)
            formData.append("TL", this.state.TL)
            formData.append("tenSach", this.state.tenSach)
            formData.append("tacGia", this.state.tacGia)
            formData.append("gia", this.state.gia)
            formData.append("sanPham", this.state.sanpham)
            formData.append("soLuong", this.state.soLuong)
            this.setState({
                isShowLoading: true
            })
            let link = await uploadfile(formData)

            let bookcreate = await handleCreateNewBook(formData)


            if (bookcreate && bookcreate.errCode === 0) {
                toast.success('create new a book success!')
                await this.handlegetAllBookbySP()
                this.setState({
                    preview: [],
                    NCC: this.state.arrNCC[0].keyMap,
                    NXB: this.state.arrNXB[0].keyMap,
                    TL: this.state.arrTL[0].keyMap,
                    tenSach: '',
                    gia: '',
                    tacGia: '',
                    soLuong: '',
                    image: '',
                    keyMap: '',
                    isShowLoading: false

                })
            } else {
                alert(bookcreate.errMessage)
            }
        }
    }

    handleDelete = async (data) => {
        if (!data) {
            toast.error('delete book not success!')
        } else {
            let res = await handleDeleteBook(data.keyMap)
            if (res && res.errCode === 0) {
                toast.success('delete book is success!');
                await this.handlegetAllBookbySP()
            } else {
                toast.error('delete book not success!')

            }
        }
    }

    handleChangeData = (data) => {
        if (data) {
            this.setState({
                image: data.image,
                preview: data.image,
                NCC: data.nhaCungCap,
                NXB: data.nhaXuatBan,
                TL: data.theLoai,
                tenSach: data.tenSach,
                gia: data.gia,
                tacGia: data.tacGia,
                soLuong: data.soLuong,
                keyMap: data.keyMap,
                changeUpdate: true
            })
        }

    }

    handleEditBooks = async () => {
        let check = this.handleCheckinput();
        if (check === true) {
            const formData = new FormData();
            formData.append("image", this.state.image)
            formData.append('file', this.state.file)
            formData.append("keyMap", this.state.keyMap)
            formData.append("NCC", this.state.NCC)
            formData.append("NXB", this.state.NXB)
            formData.append("TL", this.state.TL)
            formData.append("tenSach", this.state.tenSach)
            formData.append("tacGia", this.state.tacGia)
            formData.append("gia", this.state.gia)
            formData.append("sanPham", this.state.sanpham)
            formData.append("soLuong", this.state.soLuong)
            let updatebook = await handleUpdateBook(formData)

            if (updatebook && updatebook.errCode === 0) {
                toast.success('update book is success!')
                await this.handlegetAllBookbySP()
                this.setState({
                    preview: [],
                    NCC: this.state.arrNCC[0].keyMap,
                    NXB: this.state.arrNXB[0].keyMap,
                    TL: this.state.arrTL[0].keyMap,
                    tenSach: '',
                    gia: '',
                    tacGia: '',
                    soLuong: '',
                    keyMap: '',
                    changeUpdate: false
                })
            } else {
                alert(updatebook.errMessage)

            }
        }
    }

    handleExitUpdate = () => {
        this.setState({
            changeUpdate: false
        })
    }


    render() {
        let { arrNCC, arrNXB, arrTL, changeUpdate, arrSanPham } = this.state;
        return (
            <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
                text='Loading your content...'
            >
                <Scrollbars className='scrollbars'>
                    <div className='book-container'>

                        <div className='book-manager-header'>
                            <Header />
                        </div>
                        <div className='book-content'>
                            <div className='book-content-title'>
                                Quản lý sách
                            </div>
                            <div className='select-sanPham col-2'>
                                <label>Danh mục sản phẩm</label>
                                <select className='form-control'
                                    onChange={(event) => this.handleOnChangeInput(event, 'sanpham')}
                                    value={this.state.sanpham}
                                >
                                    {arrSanPham && arrSanPham.length > 0
                                        && arrSanPham.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{item.value}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='info-manage-book'>
                                <div className='image-book' style={{ backgroundImage: `url(${this.state.preview})` }}>
                                    <input type='file' hidden id='previewImg' onChange={(event) => this.handleOnChangefile(event)}
                                    />
                                    <label htmlFor='previewImg' className='label-previewImg'

                                    ></label>
                                </div>
                                <div className='info-book row'>
                                    {/* <div className='col-4'>
                                    <label>Mã sách</label>
                                    <input type='text' className='form-control'
                                        onChange={(event) => this.handleOnChangeInput(event, 'keyMap')}
                                        value={this.state.keyMap}
                                    />
                                </div> */}
                                    <div className='col-6'>
                                        <label>Tên sách</label>
                                        <input type='text' className='form-control'
                                            onChange={(event) => this.handleOnChangeInput(event, 'tenSach')}
                                            value={this.state.tenSach}

                                        />
                                    </div>

                                    <div className='col-6'>
                                        <label>Tác giả</label>
                                        <input type='text' className='form-control'
                                            onChange={(event) => this.handleOnChangeInput(event, 'tacGia')}
                                            value={this.state.tacGia}

                                        />
                                    </div>
                                    <div className='col-4'>
                                        <label>Nhà xuất bản</label>
                                        <div className='info-select'>
                                            <select className='form-control'
                                                onChange={(event) => this.handleOnChangeInput(event, 'NXB')}
                                                value={this.state.NXB}

                                            >
                                                {arrNXB && arrNXB.length > 0
                                                    && arrNXB.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.keyMap}>{item.tenNXB}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <button className='btn-add-select'
                                                onClick={() => this.handleShowNXB()}
                                            ><i className="fas fa-plus-circle"></i></button>
                                        </div>

                                    </div>
                                    <div className='col-4'>
                                        <label>Nhà cung cấp</label>
                                        <div className='info-select'>
                                            <select className='form-control'
                                                onChange={(event) => this.handleOnChangeInput(event, 'NCC')}
                                                value={this.state.NCC}
                                            >
                                                {arrNCC && arrNCC.length > 0
                                                    && arrNCC.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.keyMap}>{item.tenNCC}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <button className='btn-add-select'
                                                onClick={() => this.handleShowNCC()}
                                            ><i className="fas fa-plus-circle"></i></button>
                                        </div>

                                    </div>
                                    <div className='col-4'>
                                        <label>Thể loại</label>
                                        <div className='info-select'>
                                            <select className='form-control'
                                                onChange={(event) => this.handleOnChangeInput(event, 'TL')}
                                                value={this.state.TL}

                                            >
                                                {arrTL && arrTL.length > 0
                                                    && arrTL.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.keyMap}>{item.theLoai}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <button className='btn-add-select'
                                                onClick={() => this.handleShowTL()}
                                            ><i className="fas fa-plus-circle"></i></button>
                                        </div>
                                    </div>
                                    <div className='col-10'>
                                        <label>Giá</label>
                                        <input type='text' className='form-control'
                                            onChange={(event) => this.handleOnChangeInput(event, 'gia')}
                                            value={this.state.gia}

                                        />
                                    </div>
                                    <div className='col-2'>
                                        <label>Số lượng</label>
                                        <input type='number' className='form-control'
                                            onChange={(event) => this.handleOnChangeInput(event, 'soLuong')}
                                            value={this.state.soLuong}

                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='table-book'>
                                <TableBookManage
                                    arrBook={this.state.arrBook}
                                    handleDelete={this.handleDelete}
                                    handleExitUpdate={this.handleExitUpdate}
                                    changeUpdate={this.state.changeUpdate}
                                    onChangeData={this.handleChangeData}
                                />
                            </div>
                            <div className='function-book'>
                                {changeUpdate === false
                                    ?
                                    <button className='btn-save-info-book'
                                        onClick={() => this.handleOnClickSave()}

                                    >
                                        <i className="far fa-save"
                                        ></i>Save
                                    </button>
                                    :
                                    <button className='btn-update-info-book'
                                        onClick={() => this.handleEditBooks()}

                                    >
                                        <i className="far fa-save"
                                        ></i>Save update
                                    </button>
                                }

                            </div>
                        </div>
                    </div>
                    <ModalNXB
                        handleShowNXB={this.handleShowNXB}
                        isShowNXB={this.state.isShowNXB}
                        handleCreateNewNXB={this.handleCreateNewNXB}
                    />
                    <ModalNCC
                        isShowNCC={this.state.isShowNCC}
                        handleShowNCC={this.handleShowNCC}
                        handleCreateNewNCC={this.handleCreateNewNCC}
                    />

                    <ModalTL
                        isShowTL={this.state.isShowTL}
                        handleShowTL={this.handleShowTL}
                        handleCreateNewTL={this.handleCreateNewTL}
                    />

                </Scrollbars>
            </LoadingOverlay>


        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookManager);
