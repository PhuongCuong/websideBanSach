import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { withRouter } from 'react-router';
import TextSearch from './TextSearch';


class HomeHeader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            soluongproduct: '',
            searchText: '',
            isShowSearch: false
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.copybook !== this.props.copybook) {
            this.setState({
                soluongproduct: this.props.copybook.length
            })
        }
    }

    componentDidMount() {
        this.setState({
            soluongproduct: this.props.copybook.length
        })
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



    render() {
        let { soluongproduct, isShowSearch } = this.state;
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
                                    onBlur={() => this.handleOffSearch()}
                                    onFocus={() => this.handleShowSearch()}
                                />
                                <button className='btn-search'>
                                    Tìm kiếm
                                </button>
                            </div>
                            <div className={`div-search ${isShowSearch ? 'active' : ''}`}>
                                <TextSearch
                                    searchText={this.state.searchText}
                                />
                            </div>

                        </div>

                    </div>
                    <div className='homeheader-right'>
                        <div className='homeheader-home'>
                            <span className='img-home'>
                            </span>
                            <span className='text-home'>Trang chủ</span>
                        </div>
                        <div className='homeheader-login'>
                            <span className='img-login'>
                            </span>
                            <span className='text-login'>Tài khoản</span>
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

                    {/* <div className='homeheader-right-choice'>
                        <div className='homeheader-home'
                            onClick={() => this.handleHome()}
                        >Home</div>
                        <div className='homeheader-about'>About</div>
                    </div>
                    <div className='homeheader-right-cart'>
                        <span className='homeheader-cart'
                            onClick={() => this.handleCart()}
                        >
                            <i className="fas fa-cart-arrow-down">
                                {soluongproduct
                                    ?
                                    <div className='soluong-incart'>
                                        <span>{soluongproduct ? soluongproduct : ''}</span>
                                    </div>
                                    :
                                    <></>
                                }

                            </i>

                        </span>
                        <span className='homeheader-login'>
                            <i className="far fa-user"></i>
                        </span>
                    </div> */}
                </div>
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        copybook: state.book.copybook,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
