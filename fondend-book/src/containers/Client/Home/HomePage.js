import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './HomePage.scss';
import HomeHeader from '../Header/HomeHeader';
import HomeBody from './HomeBody';
import Bookcategory from '../Product/Bookcategory';
import HomeBackgroup from './HomeBackgroup';
import HomeProduct from './HomeProduct';
import ArrProduct from './ArrProduct';
import {
    handlegetAllbookbycart, handlegetAllTL, handlegetAllBookTL,
    handlegetAllBookbySP, handlegetAllNCC, handlegetAllNCCbySP,
    handlegetAllBookNCC
} from '../../../services/bookService'
import ReactPaginate from 'react-paginate';
import * as actions from "../../../store/actions"



class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrBook: [],
            arrBookDiscount: [],
            sanpham: '',
            arrBookPaginate: [],
            currentPage: 0,
            arrNCC: [],
            NCC: '',
            originalArrBook: [],
            frommount: '',
            aboutmount: '',
            isShowBody: false
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

    handlegetAllBookNCC = async () => {
        let res = await handlegetAllBookNCC(this.state.NCC);
        if (res && res.errCode === 0) {
            this.setState({
                arrBook: res.data,
                originalArrBook: res.data
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

    handlegetAllBookbySP = async () => {
        let arrbook = await handlegetAllBookbySP(this.state.sanpham);
        if (arrbook && arrbook.errCode === 0) {
            this.setState({
                arrBook: arrbook.data,
                originalArrBook: arrbook.data
            })
        }
    }

    handlegetAllbook = async () => {
        try {
            let arrbook = await handlegetAllbookbycart('ALL');
            if (arrbook && arrbook.errCode === 0) {
                this.setState({
                    arrBook: arrbook.data,
                    currentPage: 0,
                    originalArrBook: arrbook.data
                })

            }
        } catch (e) {
            console.log(e)
        }

    }

    handlegetMount = (mount) => {
        let { originalArrBook } = this.state;
        let filteredArrBook = []


        if (mount === 'duoi-40000') {
            filteredArrBook = originalArrBook.filter(item => item.gia < 40000);
            this.setState({
                currentPage: 0
            })
            if (filteredArrBook.length === 0) {
                alert('Không tìm thấy sản phẩm')
            }
        } else if (mount === '40000-120000') {
            filteredArrBook = originalArrBook.filter(item => item.gia >= 40000 && item.gia < 120000);
            this.setState({
                currentPage: 0
            })
            if (filteredArrBook.length === 0) {
                alert('Không tìm thấy sản phẩm')
            }
        } else if (mount === '120000-280000') {
            filteredArrBook = originalArrBook.filter(item => item.gia >= 120000 && item.gia < 280000);
            this.setState({
                currentPage: 0
            })
            if (filteredArrBook.length === 0) {
                alert('Không tìm thấy sản phẩm')
            }
        } else if (mount === 'tren-280000') {
            filteredArrBook = originalArrBook.filter(item => item.gia >= 280000);
            this.setState({
                currentPage: 0
            })
            if (filteredArrBook.length === 0) {
                alert('Không tìm thấy sản phẩm')
            }
        } else if (mount === `${this.state.frommount}-${this.state.aboutmount}`) {
            let frommount = +this.state.frommount;
            let aboutmount = +this.state.aboutmount;
            filteredArrBook = originalArrBook.filter(item => item.gia >= frommount && item.gia < aboutmount);
            this.setState({
                currentPage: 0
            })
            if (filteredArrBook.length === 0) {
                alert('Không tìm thấy sản phẩm')
            }
        }

        this.setState({
            arrBook: filteredArrBook.length > 0 ? filteredArrBook : []
        });
    }

    handlefmounta = (fmount, amount) => {
        this.setState({
            frommount: fmount,
            aboutmount: amount
        })
    }

    handleaddarrTime = () => {
        let { arrBook, arrBookDiscount, arrBookTL, selectTL, arrBookPaginate } = this.state;
        let copyarrBook = { ...arrBook }
        let arr = [];
        if (arrBook && arrBook.length > 0) {
            arrBook.forEach((item) => {
                let copytitem = { ...item };
                if (copytitem && copytitem.discountData) {
                    let discountData = { ...copytitem.discountData }
                    let timeDiff = '';
                    if (discountData.ngayBD <= new Date().getTime()) {
                        timeDiff = discountData.ngayKT - new Date().getTime();
                    }

                    var seconds = Math.floor(timeDiff / 1000) % 60;
                    var minutes = Math.floor(timeDiff / 1000 / 60) % 60;
                    var hours = Math.floor(timeDiff / 1000 / 60 / 60);
                    let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    discountData.timeDiff = formattedTime;
                    copytitem.discountData = discountData;
                    item = copytitem;
                }
                arr.push(item);
            })
            if (arr && arr.length > 0) {
                this.setState({
                    arrBookDiscount: arr,
                })
            }
        }
    }

    convertTimeToMilliseconds = (time) => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        const totalMilliseconds = hours * 3600000 + minutes * 60000 + seconds * 1000;
        return totalMilliseconds;
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.sanpham !== this.state.sanpham) {
            await this.handlegetAllNCCbySP();
            await this.handlegetAllBookbySP();
            this.setState({
                currentPage: 0
            })
        }
        if (
            prevState.arrBook !== this.state.arrBook ||
            prevState.originalArrBook !== this.state.originalArrBook
        ) {
            await this.handleaddarrTime();
        }
    }

    async componentDidMount() {
        await this.handlegetAllbook();
        // await this.handlegetAllTL();
        await this.handleGetAllNCC();
        await this.handleaddarrTime();
    }

    handleselectSP = (keyMap) => {
        this.setState({
            sanpham: keyMap,
        }, async () => {
            await this.handlegetAllBookbySP();
        })
    }

    handleselectNCC = (keyMap) => {
        this.setState({
            NCC: keyMap,
        }, async () => {
            await this.handlegetAllBookNCC();
        })
    }

    handlePaginate = (page) => {
        this.setState({
            arrBookDiscount: page
        })
    }

    handlePageChange = (selectedPage) => {
        let currentPage = selectedPage.selected
        let pageCount = Math.ceil(this.state.arrBookDiscount.length / 25);
        if (currentPage >= pageCount) {
            this.setState({
                currentPage: 0
            });
        } else {
            this.setState({
                currentPage: currentPage
            });
        }
    };

    handleisShowBody = (isShowSearch) => {
    }


    handleSearch = (arrAfter) => {
        this.setState({
            arrBook: arrAfter
        })
    }

    handleSort = (arrAfter) => {
        this.setState({
            arrBook: arrAfter
        })
    }

    render() {
        const itemsPerPage = 25;

        const data = this.state.arrBookDiscount
        const pageCount = Math.ceil(data.length / itemsPerPage);
        let offset = this.state.currentPage * itemsPerPage;
        let currentData = data.slice(offset, offset + itemsPerPage);
        let { isShowBody } = this.state;
        return (
            <div className='homepage-container'>
                <div className='homepage-content'>
                    <div className='hompage-header'>
                        <HomeHeader
                            copybook={this.props.copybook}
                            handleisShowBody={this.handleisShowBody}
                            handleSearch={this.handleSearch}
                            originalArrBook={this.state.originalArrBook}
                            arrBook={this.state.arrBook}
                        />
                    </div>
                    <div className='header-homebody'>
                        <div className='homebody'>
                            <div className='body-left'>
                                <Bookcategory
                                    handleselectSP={this.handleselectSP}
                                    arrNCC={this.state.arrNCC}
                                    handleselectNCC={this.handleselectNCC}
                                    handlegetMount={this.handlegetMount}
                                    handlefmounta={this.handlefmounta}

                                />

                            </div>
                            <div className='body-right'>
                                <div className='backgroup-body'>
                                    <HomeBackgroup
                                        originalArrBook={this.state.originalArrBook}
                                        arrBook={this.state.arrBook}
                                        handleSort={this.handleSort}
                                    />
                                </div>
                                <div className='body-product'>
                                    <ArrProduct
                                        arrBook={currentData}
                                        handleSearch={this.handleSearch}

                                    />
                                </div>
                                <div className='bodys-paginates'>
                                    <div className='show-more-page'>
                                        <div className='pagination-wrapper'>
                                            <div className='next-page'>
                                                <ReactPaginate
                                                    nextLabel={'Next'}
                                                    previousLabel={'Previous'}
                                                    breakLabel={null}
                                                    pageCount={pageCount}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={4}
                                                    onPageChange={this.handlePageChange}
                                                    containerClassName={'pagination'}
                                                    activeClassName={'active'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className='homepage-backgroup'>
                        <div className='homepage-search'>
                            <input className='text-search' type='text' placeholder='Tìm kiếm' />
                            <button className='btn-search'>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div> */}
                    {/* <div className='homepage-body'>
                        <HomeBody />
                    </div> */}
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        bookInfo: state.book.bookInfo,
        copybook: state.book.copybook,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchallBookStart: (maSach) => dispatch(actions.fetchallBookStart(maSach)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
