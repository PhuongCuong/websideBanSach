import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Discount.scss';
import Header from '../../Header/Header';
import DatePicker from "react-datepicker";
import TableDiscountManager from './TableDiscountManager';
import {
    handlegetAllBook, handleSavediscount, handlegetAlldiscount,
    handleDeleteDiscount, handleUpdateDiscount
} from '../../../services/bookService'
import { toast } from 'react-toastify';

class Discount extends Component {

    constructor(props) {
        super(props)

        this.state = {
            arrBook: [],
            tenSach: '',
            maSach: '',
            ngayBD: '',
            ngayKT: '',
            select: '',
            discount: '',
            arrDiscount: [],
            isShowupdate: false,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    async componentDidMount() {
        await this.handlegetAllbook();
        await this.handlegetAllDiscount();
    }

    handlegetAllDiscount = async () => {
        let res = await handlegetAlldiscount('ALL');
        if (res && res.errCode === 0) {
            this.setState({
                arrDiscount: res.data
            })
        }
    }


    handlegetAllbook = async () => {
        let data = await handlegetAllBook('ALL');
        if (data && data.errCode === 0) {
            this.setState({
                arrBook: data.data
            })
        }
    }

    handleOnChangInput = async (event, id) => {
        let copystate = { ...this.state };
        copystate[id] = event.target.value;
        this.setState({
            ...copystate
        })
        let data = await handlegetAllBook(copystate[id]);
        if (data && data.errCode === 0) {
            this.setState({
                maSach: data.data.keyMap,
                tenSach: data.data.tenSach
            })
        }
    }

    handleOnChangleDatePicker = (date, id) => {
        let copystate = { ...this.state };
        copystate[id] = date;
        this.setState({
            ...copystate
        })
    }

    handleCheckinput = () => {
        let check = true;
        let arr = ['tenSach', 'maSach', 'ngayBD', 'ngayKT', 'discount'];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                alert(`Missing input:${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    }

    handleDelete = async (maSach) => {
        if (maSach) {
            let deletes = await handleDeleteDiscount(maSach);
            if (deletes && deletes.errCode === 0) {
                toast.success('delete discount is success!');
                await this.handlegetAllDiscount()
            } else {
                alert(deletes.errMessage)
            }
        }
    }

    handleUpdate = async () => {
        let check = this.handleCheckinput();
        let { ngayBD, ngayKT } = this.state;
        let ngayBDS = new Date(ngayBD).getTime();
        let ngayKTS = new Date(ngayKT).getTime();
        if (check === true) {
            let updates = await handleUpdateDiscount({
                tenSach: this.state.tenSach,
                maSach: this.state.maSach,
                ngayBD: ngayBDS,
                ngayKT: ngayKTS,
                discount: this.state.discount
            });
            if (updates && updates.errCode === 0) {
                toast.success('update discount is success!');
                await this.handlegetAllDiscount();
                this.setState({
                    tenSach: '',
                    maSach: '',
                    ngayBD: '',
                    ngayKT: '',
                    select: '',
                    discount: '',
                })
            } else {
                alert(updates.errMessage)
            }
        }
    }

    handlegetdata = (data) => {
        if (data) {
            this.setState({
                tenSach: data.tenSach,
                maSach: data.maSach,
                ngayBD: data.ngayBD,
                ngayKT: data.ngayKT,
                discount: data.discount,
                select: data.select,
                isShowupdate: !this.state.isShowupdate
            })
        }
    }

    handleSave = async () => {
        let { ngayBD, ngayKT } = this.state;
        let ngayBDS = new Date(ngayBD).getTime();
        let ngayKTS = new Date(ngayKT).getTime();
        let check = this.handleCheckinput();
        if (check === true) {
            let data = await handleSavediscount({
                tenSach: this.state.tenSach,
                maSach: this.state.maSach,
                ngayBD: ngayBDS,
                ngayKT: ngayKTS,
                discount: this.state.discount
            })

            if (data && data.errCode === 0) {
                toast.success('Create new discout success!');
                await this.handlegetAllDiscount();
                this.setState({
                    tenSach: '',
                    maSach: '',
                    ngayBD: '',
                    ngayKT: '',
                    select: '',
                    discount: '',
                })
            }
            else {
                alert(data.errMessage)
            }
        }
    }

    render() {
        let { arrBook, isShowupdate } = this.state;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
        return (
            <div className='discont-container'>
                <div className='discont-content'>
                    <div className='discount-header'>
                        <Header />
                    </div>
                    <div className='discount-title'>Quản lý giảm giá</div>
                    <div className='discount-body row'>
                        <div className='col-6'>
                            <label>Mã sách</label>
                            <input type='text' className='form-control'
                                onChange={(event) => this.handleOnChangInput(event, 'maSach')}
                                value={this.state.maSach}
                            />
                        </div>
                        <div className='col-6'>
                            <label>tên sách</label>
                            <select className='form-control'
                                onChange={(event) => this.handleOnChangInput(event, 'select')}
                                value={this.state.select}
                            >
                                {arrBook && arrBook.length > 0
                                    && arrBook.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {item.tenSach}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='col-6'>
                            <label>ngày bắt đầu</label>
                            <div className='date-picker'>
                                <DatePicker
                                    dateFormat='dd/MM/yyyy'
                                    className='form-control'
                                    onChange={(date) => this.handleOnChangleDatePicker(date, 'ngayBD')}
                                    // value={this.state.ngayBD}
                                    selected={this.state.ngayBD}
                                    minDate={yesterday}
                                />
                            </div>

                        </div>
                        <div className='col-6 form-group'>
                            <label>ngày kết thúc</label>
                            <div className='date-picker'>
                                <DatePicker
                                    dateFormat='dd/MM/yyyy'
                                    className='form-control'
                                    onChange={(date) => this.handleOnChangleDatePicker(date, 'ngayKT')}
                                    selected={this.state.ngayKT}
                                    value={this.state.ngayKT}
                                    minDate={tomorrow}
                                />
                            </div>
                        </div>
                        <div className='col-12'>
                            <label>Giảm giá</label>
                            <input type='text' className='form-control'
                                onChange={(event) => this.handleOnChangInput(event, 'discount')}
                                value={this.state.discount}
                            />
                        </div>
                    </div>
                    <div className='table-manager'>
                        <TableDiscountManager
                            arrDiscount={this.state.arrDiscount}
                            handleDelete={this.handleDelete}
                            handleUpdate={this.handleUpdate}
                            handlegetdata={this.handlegetdata}
                        />
                    </div>
                    <div className='discount-tail'>
                        {isShowupdate === false
                            ?
                            <button className='btn-save'
                                onClick={() => this.handleSave()}
                            >Save</button>
                            :
                            <button className='btn-save-update'
                                onClick={() => this.handleUpdate()}
                            >Save update</button>
                        }

                    </div>
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Discount);
