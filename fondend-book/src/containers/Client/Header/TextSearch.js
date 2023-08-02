import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TextSearch.scss'
import { handlegetAllbookbycart } from '../../../services/bookService'
import { withRouter } from 'react-router';
import * as actions from "../../../store/actions"
import { hanlegetAllBillmore } from '../../../services/BillService';


class TextSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrBook: [],
            searchText: '',
            filteredBooks: [],
            arrSellingcategory: [],
            arrproductmore: []
        }
    }

    handleGetALLbook = async () => {
        let res = await handlegetAllbookbycart('ALL');
        if (res && res.errCode === 0) {
            this.setState({
                arrBook: res.data
            })
        }
    }

    handleGetAllpaid = async () => {
        let data = await hanlegetAllBillmore();
        if (data && data.errCode === 0) {
            this.setState({
                arrproductmore: data.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.searchText !== this.props.searchText) {
            this.setState({
                searchText: this.props.searchText
            })
        }
        if (prevState.searchText !== this.state.searchText) {
            await this.handleSearchBooks()
        }
    }

    handleSearchBooks = () => {
        let { searchText } = this.state;
        let { arrBook } = this.state;

        // Lọc sách dựa trên từ khóa tìm kiếm
        if (searchText === '') {
            this.setState({
                filteredBooks: this.state.arrBook.slice(0, 5),
            });
        }
        else {
            const filteredBooks = arrBook.filter((book) =>
                book.tenSach.toLowerCase().includes(searchText.toLowerCase())
            );

            // Chỉ lấy 5 sản phẩm gần nhất
            const latestBooks = filteredBooks;

            // Cập nhật kết quả tìm kiếm vào state
            this.setState({
                filteredBooks: latestBooks,
            });
        }

    };

    async componentDidMount() {
        await this.handleGetALLbook();
        await this.handleGetAllpaid()
        if (this.state.searchText === '') {
            let arrBook = this.state.arrBook.map((book) => {
                let item = this.state.arrproductmore.find((item) => book.keyMap === item.bookId);
                return item ? { ...book, soluong: item.soluong } : book;
            });
            arrBook.sort((a, b) => +b.soluong - +a.soluong)
            this.setState({
                filteredBooks: this.state.arrBook.slice(0, 5),
                arrSellingcategory: arrBook.slice(0, 10)
            })
        }
    }

    handleBookInfo = async (item) => {
        if (this.props.history) {
            this.props.history.push(`/book/${item.keyMap}`)
            await this.props.fetchallBookStart(item.keyMap);

        }
        await this.props.handleOffSearch()
    }



    render() {
        let { arrBook, filteredBooks, arrSellingcategory, searchText } = this.state;
        return (
            <div className='text-search-container'>
                <div className='text-search-content'>
                    <div className={searchText === '' ? 'find-text' : 'find-text active'}>
                        {filteredBooks && filteredBooks.length > 0
                            && filteredBooks.map((item, index) => {
                                return (
                                    <div className='text-name' key={index}
                                        onClick={() => this.handleBookInfo(item)}
                                    >
                                        <div className='text-img-find'></div>
                                        <div className='text-name-product'>{item.tenSach}</div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className={searchText === '' ? 'selling-category-product' : 'selling-category-product active'}>
                        <div className='selling-category-title'>Danh sách sản phẩm bán chạy</div>
                        <div className='parent-category'>
                            <div className='category-product'>
                                {arrSellingcategory && arrSellingcategory.length > 0
                                    && arrSellingcategory.map((item, index) => {
                                        return (
                                            <div className='item-product' key={index}
                                                onClick={() => this.handleBookInfo(item)}
                                            >
                                                <div className='product-img'
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                ></div>
                                                <div className='product-name'>{item.tenSach}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TextSearch));
