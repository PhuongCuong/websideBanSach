import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ArrProduct.scss'
import { withRouter } from 'react-router';
import * as actions from "../../../store/actions"


class ArrProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrBook: [],

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrBook !== this.props.arrBook) {
            this.setState({
                arrBook: this.props.arrBook
            })
        }
    }

    componentDidMount() {
    }

    convertTimeToMilliseconds = (time) => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        const totalMilliseconds = hours * 3600000 + minutes * 60000 + seconds * 1000;
        return totalMilliseconds;
    };


    handleBookInfo = async (item) => {
        if (this.props.history) {
            this.props.history.push(`/book/${item.keyMap}`)
            await this.props.fetchallBookStart(item.keyMap);

        }
    }

    render() {
        let { arrBook } = this.state;
        return (
            <div className='arr-product-container'>
                <div className='arr-product-content'>
                    {arrBook && arrBook.length > 0
                        ? arrBook.map((item, index) => {
                            let mount = '';
                            let mountDiscount = '';
                            if (item.gia) {
                                mount = parseFloat(item.gia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                                if (item.discountData && item.discountData.discount) {
                                    mountDiscount = parseFloat(item.gia - (item.discountData.discount * item.gia)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

                                }

                            }
                            return (
                                <div className='product-info' key={index}
                                    onClick={() => this.handleBookInfo(item)}
                                >
                                    <div className='product-image'
                                        style={{ backgroundImage: `url(${item.image})` }}

                                    ></div>
                                    <div className='product-name-book'>{item.tenSach}</div>
                                    {item.discountData && item.discountData.discount &&
                                        this.convertTimeToMilliseconds(item.discountData.timeDiff) > 0
                                        ?
                                        <>
                                            <div className='product-gia'>
                                                <span className='gia'>
                                                    {mountDiscount}
                                                </span>
                                                <span className='discount'>{`- ${item.discountData.discount * 100}%`}</span>

                                            </div>
                                            <div className='gia-ban-dau'>{mount}</div>
                                        </>

                                        :
                                        <div className='product-gia'>
                                            <span className='gia'>{mount}</span>
                                        </div>

                                    }

                                </div>
                            )
                        })
                        :
                        <></>
                    }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArrProduct));
