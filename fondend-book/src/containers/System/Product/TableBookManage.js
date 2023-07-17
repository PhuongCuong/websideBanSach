import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableBookManage.scss'
import { Scrollbars } from 'react-custom-scrollbars';



class TableBookManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrBook: [],
            editbook: {}
        }
    }

    async componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrBook !== this.props.arrBook) {
            this.setState({
                arrBook: this.props.arrBook
            })
        }
    }

    handleDeleteBook = async (item) => {
        await this.props.handleDelete(item);
    }

    handleEditBook = async (item) => {
        await this.props.onChangeData(item)

    }




    render() {
        let { arrBook } = this.state;
        let { changeUpdate, handleExitUpdate } = this.props;
        return (
            <div className='table-container'>
                <table id="customers">
                    <tr>
                        <th className='sticky-column'>Mã sách</th>
                        <th className='sticky-column'>Tên sách</th>
                        <th className='sticky-column'>Tác giả</th>
                        <th className='sticky-column'>Nhà xuất bản</th>
                        <th className='sticky-column'>Nhà cung cấp</th>
                        <th className='sticky-column'>Thể loại</th>
                        <th className='sticky-column'>Giá tiền</th>
                        <th className='sticky-column'>Số lượng</th>
                        <th className='sticky-column'>ảnh</th>
                        <th className='sticky-column'>Option</th>
                    </tr>
                    {arrBook && arrBook.length > 0
                        && arrBook.map((item, index) => {

                            return (
                                <tr key={index}>
                                    <td>{item.keyMap}</td>
                                    <td>{item.tenSach}</td>
                                    <td>{item.tacGia}</td>
                                    <td>{item.nhaxuatbanData ? item.nhaxuatbanData.tenNXB : ''}</td>
                                    <td>{item.nhacungcapData ? item.nhacungcapData.tenNCC : ''}</td>
                                    <td>{item.theloaiData ? item.theloaiData.theLoai : ''}</td>
                                    <td>{item.gia}</td>
                                    <td>{item.soLuong}</td>
                                    <td className='image-book-manage'
                                        style={{ backgroundImage: `url(${item.image})` }}
                                    ></td>
                                    <td>
                                        {changeUpdate === false
                                            ?
                                            <button className='btn-delete-book'
                                                onClick={() => this.handleDeleteBook(item)}
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                            :
                                            <button className='btn-exitupdate-book'
                                                onClick={handleExitUpdate}
                                            >
                                                <i className="far fa-times-circle"></i>
                                            </button>
                                        }

                                        <button className='btn-edit-book'
                                            onClick={() => this.handleEditBook(item)}
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

export default connect(mapStateToProps, mapDispatchToProps)(TableBookManage);
