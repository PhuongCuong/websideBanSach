import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableDiscountManager.scss'
import { Scrollbars } from 'react-custom-scrollbars';
import moment, { months } from 'moment/moment';
import Countdown from 'react-countdown';
import ReactDOM from "react-dom";
import { update } from 'lodash';
import { couldStartTrivia } from 'typescript';

class TableDiscountManager extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrTime: [],
            arrDiscount: [],
            timeCount: ''
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrDiscount !== this.props.arrDiscount) {
            this.setState({
                arrDiscount: this.props.arrDiscount
            })
            if (this.state.arrDiscount && this.state.arrDiscount.length > 0) {

            }
        }

        if (prevState.arrDiscount !== this.state.arrDiscount) {
            await this.handleaddarrTime();
            console.log('check update')
        }
    }


    //     // Chuyển đổi thời gian thành giờ, phút và giây
    //     var parts = timeDiff.split(":");
    //     var hours = parseInt(parts[0]);
    //     var minutes = parseInt(parts[1]);
    //     var seconds = parseInt(parts[2]);

    //     // Tổng số giây cần đếm ngược
    //     var totalSeconds = hours * 3600 + minutes * 60 + seconds;

    //     // Bắt đầu đếm ngược
    //     var timer = setInterval(() => {
    //         // Giảm số giây đi 1
    //         totalSeconds--;

    //         // Tính toán giờ, phút và giây từ số giây còn lại
    //         var remainingHours = Math.floor(totalSeconds / 3600);
    //         var remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
    //         var remainingSeconds = totalSeconds % 60;

    //         // Định dạng lại thời gian đếm ngược
    //         var formattedTime =
    //             remainingHours.toString().padStart(2, "0") +
    //             ":" +
    //             remainingMinutes.toString().padStart(2, "0") +
    //             ":" +
    //             remainingSeconds.toString().padStart(2, "0");

    //         // Lưu thời gian đếm ngược vào state
    //         this.setState({
    //             timeCount: formattedTime
    //         });

    //         // Kiểm tra nếu thời gian đếm ngược kết thúc
    //         if (totalSeconds <= 0) {
    //             clearInterval(timer);
    //             console.log("Kết thúc đếm ngược");
    //         }
    //     }, 1000); // Đếm ngược mỗi giây (1000ms)
    // };


    handleaddarrTime = () => {
        let { arrTime, arrDiscount } = this.state;
        let arr = [];
        if (arrDiscount && arrDiscount.length > 0) {
            arrDiscount.forEach((item) => {
                let object = {};

                object.id = item.id;
                object.maSach = item.maSach;
                object.tenSach = item.tenSach;
                object.discount = item.discount;
                object.ngayBD = item.ngayBD;
                object.ngayKT = item.ngayKT;
                let timeDiff = '';
                if (item.ngayBD <= new Date().getTime()) {
                    timeDiff = item.ngayKT - new Date().getTime();
                }
                var seconds = Math.floor(timeDiff / 1000) % 60;
                var minutes = Math.floor(timeDiff / 1000 / 60) % 60;
                var hours = Math.floor(timeDiff / 1000 / 60 / 60);
                let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                object.timeDiff = formattedTime;
                arr.push(object)

            })
            if (arr && arr.length > 0) {
                this.setState({
                    arrTime: arr
                })
            }

        }
    }

    convertTimeToMilliseconds = (time) => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        const totalMilliseconds = hours * 3600000 + minutes * 60000 + seconds * 1000;
        return totalMilliseconds;
    };


    handleDeleteDiscount = (item) => {
        this.props.handleDelete(item.maSach);
    }

    handleloaddiscount = (item) => {
        let ngayBD = new Date(+item.ngayBD);
        let ngayKT = new Date(+item.ngayKT);
        this.props.handlegetdata({
            maSach: item.maSach,
            tenSach: item.tenSach,
            discount: item.discount,
            ngayBD: ngayBD,
            ngayKT: ngayKT,
            select: item.maSach

        })
    }


    render() {

        let { arrDiscount, arrTime } = this.state;
        return (
            <div className='table-container'>
                <table id="customers">
                    <tr>
                        <th className='sticky-column'>Mã sách</th>
                        <th className='sticky-column'>Tên sách</th>
                        <th className='sticky-column'>giảm giá</th>
                        <th className='sticky-column'>ngày bắt đầu</th>
                        <th className='sticky-column'>ngày kết thúc</th>
                        <th className='sticky-column'>thời gian đếm ngược</th>
                        <th className='sticky-column'>Option</th>
                    </tr>
                    {arrTime && arrTime.length > 0
                        && arrTime.map((item, index) => {
                            let ngayBD = '';
                            let ngayKT = '';
                            if (item.ngayBD) {
                                ngayBD = moment(+item.ngayBD).format('DD/MM/yyyy HH:mm:ss');
                            }
                            if (item.ngayKT) {
                                ngayKT = moment(+item.ngayKT).format('DD/MM/yyyy HH:mm:ss');
                            }
                            return (
                                <tr key={index}>
                                    <td>{item.maSach}</td>
                                    <td>{item.tenSach}</td>
                                    <td>{item.discount}</td>
                                    <td>{ngayBD}</td>
                                    <td>{ngayKT}</td>
                                    <td>
                                        {item.timeDiff && this.convertTimeToMilliseconds(item.timeDiff) >= 0 ? (
                                            <Countdown
                                                date={Date.now() + this.convertTimeToMilliseconds(item.timeDiff)}
                                                renderer={({ days, hours, minutes, seconds }) => (
                                                    <span>
                                                        {days.toString().padStart(2, '0')}:
                                                        {hours.toString().padStart(2, '0')}:
                                                        {minutes.toString().padStart(2, '0')}:
                                                        {seconds.toString().padStart(2, '0')}
                                                    </span>
                                                )}
                                                onComplete={() =>
                                                    <span>Hến hạn giảm giá</span>
                                                }
                                            />
                                        ) : (
                                            this.handleDeleteDiscount(item)

                                        )}
                                    </td>
                                    <td>
                                        {/* {changeUpdate === false */}
                                        {/* ? */}
                                        <button className='btn-delete-book'
                                            onClick={() => this.handleDeleteDiscount(item)}
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                        {/* : */}
                                        {/* <button className='btn-exitupdate-book'
                                                onClick={handleExitUpdate}
                                            >
                                                <i className="far fa-times-circle"></i>
                                            </button> */}
                                        {/* } */}

                                        <button className='btn-edit-book'
                                            onClick={() => this.handleloaddiscount(item)}
                                        >
                                            <i className="fas fa-pencil-alt"

                                            ></i>

                                        </button>
                                    </td>

                                </tr>
                            )
                        })
                    }



                </table>
                <div id='countdown-container'></div>
            </div>

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


export default connect(mapStateToProps, mapDispatchToProps)(TableDiscountManager);
