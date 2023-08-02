import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { withRouter } from 'react-router';
import TextSearch from './TextSearch';
import { handlegetAllbookbycart } from '../../../services/bookService'
import * as actions from "../../../store/actions"


class HomeHeader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            soluongproduct: '',
            searchText: '',
            isShowSearch: false,
            isLoggedIns: false
        }
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.copybook !== this.props.copybook) {
            this.setState({
                soluongproduct: this.props.copybook.length
            })
        }
        if (prevProps.arrBook !== this.props.arrBook) {
            await this.handleOffSearch();
        }
        if (prevState.searchText !== this.state.searchText) {
            await this.handleShowSearch()
        }
        if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
            this.setState({
                isLoggedIns: this.props.isLoggedIn
            })
        }

    }

    async componentDidMount() {
        this.setState({
            soluongproduct: this.props.copybook.length
        })
        document.addEventListener('click', this.handleClickOutside, { capture: true });
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, { capture: true });
    }

    handleShowSearch = async () => {
        this.setState({
            isShowSearch: true
        })

    }

    handleOffSearch = async () => {
        this.setState({
            isShowSearch: false
        })

    }

    handleHome = () => {
        if (this.props.history) {
            this.props.history.push('/home')
        }
    }

    handleCart = () => {
        if (this.props.history) {
            this.props.history.push('/cart')
        }
    }

    handleChangeSearch = (event) => {
        this.setState({
            searchText: event.target.value
        })
    }

    handleClickOutside = (event) => {
        const divSearch = document.querySelector('.homeheader-search');
        if (divSearch && !divSearch.contains(event.target)) {
            this.handleOffSearch();
        }
    }

    handEnterSearch = async (event) => {
        let { searchText } = this.state;
        if (event.key === 'Enter') {
            const currentPath = window.location.pathname;
            const desiredPath = '/home-search';
            if (currentPath !== desiredPath) {
                this.props.history.push({
                    pathname: desiredPath,
                    state: this.state.searchText
                });
            } else {
                let { searchText } = this.state;
                let { arrBook, originalArrBook } = this.props;
                let filteredBooks = originalArrBook.filter((book) =>
                    book.tenSach.toLowerCase().includes(searchText.toLowerCase())
                );
                await this.props.handleSearch(filteredBooks);
            }
        }
    };

    handleClickSearch = async () => {
        let { searchText } = this.state;
        const currentPath = window.location.pathname;
        const desiredPath = '/home-search';
        if (currentPath !== desiredPath) {
            this.props.history.push({
                pathname: desiredPath,
                state: this.state.searchText
            });
        } else {
            let { searchText } = this.state;
            let { arrBook, originalArrBook } = this.props;
            let filteredBooks = originalArrBook.filter((book) =>
                book.tenSach.toLowerCase().includes(searchText.toLowerCase())
            );
            await this.props.handleSearch(filteredBooks);
        }
    }

    handleClickInfoUser = () => {
        let { userInfo } = this.props;
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: `/user/${userInfo && userInfo.data ? userInfo.data.id : 'id'}`,
                    state: this.props.userInfo
                }
            )
        }
    }


    handleClickMybill = () => {
        if (this.props.history) {
            this.props.history.push('/list-bill')
        }
    }

    handleLogin = () => {
        if (this.props.history) {
            this.props.history.push('/login')
        }
    }

    handletopageManager = () => {
        if (this.props.history) {
            this.props.history.push('/system')
        }
    }


    render() {
        let { soluongproduct, isShowSearch, isLoggedIns } = this.state;
        let { isLoggedIn, userInfo } = this.props;
        console.log('check propsss', this.props)
        return (
            <div className='homeheader-container'>
                <div className='homeheader-content'>
                    <div className='homeheader-left'
                    >
                        <div className='homeheader-logo'
                            onClick={() => this.handleHome()}

                        >
                        </div>
                        <div className='homeheader-search'>

                            <div className='search-info'>
                                <span className='icon-search'>
                                    <i className="fas fa-search"></i>
                                </span>
                                <input className='text-search' type='text' placeholder='Tìm kiếm'
                                    onChange={(event) => this.handleChangeSearch(event)}
                                    value={this.state.searchText}
                                    onFocus={() => this.handleShowSearch()}
                                    onKeyPress={(event) => this.handEnterSearch(event)}
                                />
                                <button className='btn-search'
                                    onClick={() => this.handleClickSearch()}
                                >
                                    Tìm kiếm
                                </button>
                            </div>
                            <div className={`div-search ${isShowSearch ? 'active' : ''}`}
                            >
                                <TextSearch
                                    searchText={this.state.searchText}
                                    handleOffSearch={this.handleOffSearch}
                                />
                            </div>

                        </div>

                    </div>
                    <div className='homeheader-right'>
                        <div className='homeheader-home'
                            onClick={() => this.handleHome()}
                        >
                            <span className='img-home'>
                            </span>
                            <span className='text-home'>Trang chủ</span>
                        </div>
                        <div className='homeheader-parent-login'>
                            {this.props.isLoggedIn === true
                                ?
                                <>
                                    <div className='homeheader-login'>
                                        <span className='img-login'>
                                        </span>
                                        <span className='text-login'>Tài khoản</span>
                                    </div>
                                    <div className='homeheader-chill'>
                                        <div className='homeheader-login-choose'
                                            onClick={() => this.handleClickInfoUser()}
                                        >
                                            <i className="far fa-user-circle"></i>Thông tin tài khoản
                                        </div>
                                        <div className='homeheader-login-choose'
                                            onClick={() => this.handleClickMybill()}

                                        >
                                            <i className="far fa-file-alt"></i>Thông tin đơn hàng
                                        </div>
                                        {this.props.userInfo && this.props.userInfo.data &&
                                            this.props.userInfo.data.roleId === 'R1' || this.props.userInfo.data.roleId === 'R3'
                                            ?
                                            <div className='homeheader-login-choose'
                                                onClick={() => this.handletopageManager()}
                                            >
                                                <i className="fas fa-tasks"></i>Trang quản lý
                                            </div>
                                            :
                                            <></>
                                        }
                                        <div className='homeheader-login-choose'
                                            onClick={this.props.processLogout}
                                        >
                                            <i className="fas fa-sign-out-alt"></i>Đăng xuất
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className='homeheader-login'
                                        onClick={() => this.handleLogin()}
                                    >
                                        <span className='img-login'>
                                        </span>
                                        <span className='text-login'>Tài khoản</span>
                                    </div>
                                </>
                            }

                        </div>

                        <div className='homeheader-cart'
                            onClick={() => this.handleCart()}
                        >
                            <div className='img-cart'></div>
                            {soluongproduct
                                ?
                                <span className='count-product'>{soluongproduct ? soluongproduct : ''}</span>
                                :
                                <></>
                            }
                        </div>
                    </div>
                </div>
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        copybook: state.book.copybook,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
