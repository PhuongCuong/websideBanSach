import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Listchooseaction.scss'
import { withRouter } from 'react-router';


class ListChooseaction extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    componentDidMount() {
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

    handleClickwarning = () => {
        alert('Chức năng chưa hỗ trợ')
    }


    render() {
        return (
            <div className='list-choose-container'>
                <div className='list-choose-content'>
                    <div className='user-info-name'>
                        <div className='user-info-logo'></div>
                        <div className='user-info-name-user'>
                            <div className='user-name-title'>Tài khoản của</div>
                            <div className='user-is-name'>Cường nguyễn</div>
                        </div>
                    </div>
                    <div className='user-info-choose'
                        onClick={() => this.handleClickInfoUser()}
                    >
                        <i className="fas fa-user"></i>
                        <span className='text-info-choose'>Thông tin tài khoản</span>
                    </div>
                    <div className='user-info-choose'
                        onClick={() => this.handleClickwarning()}

                    >
                        <i className="fas fa-bell"></i>
                        <span className='text-info-choose'>Thông bảo của tôi</span>
                    </div>
                    <div className='user-info-choose'
                        onClick={() => this.handleClickMybill()}

                    >
                        <i className="fas fa-book-open"></i>
                        <span className='text-info-choose'>Quản lý đơn hàng</span>
                    </div>
                    <div className='user-info-choose'
                        onClick={() => this.handleClickwarning()}

                    >
                        <i className="fas fa-box"></i>
                        <span className='text-info-choose'>Quản lý đổi trả</span>
                    </div>
                    <div className='user-info-choose'
                        onClick={() => this.handleClickwarning()}

                    >
                        <i className="fas fa-map-marker-alt"></i>
                        <span className='text-info-choose'>Số địa chỉ</span>
                    </div>
                    <div className='user-info-choose'
                        onClick={() => this.handleClickwarning()}

                    >
                        <i className="far fa-credit-card"></i>
                        <span className='text-info-choose'>Thông tin thanh toán</span>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListChooseaction));
