import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './NhacungcapManager.scss';
import Header from '../../Header/Header';
import {
    handlegetAllNXB, handleCreateNewNXB, handleDeleteNXB, handleUpdateNXB,
    handlecountAllNXB
} from '../../../services/bookService';
import { toast } from 'react-toastify';


class nhaxuatbanManager extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrNCC: [],
            maNXB: '',
            tenNXB: '',
            selectUpdate: false
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    async componentDidMount() {
        await this.handlegetAllNXB();
    }

    handlegetAllNXB = async () => {
        let res = await handlegetAllNXB('ALL');
        if (res && res.errCode === 0) {
            this.setState({
                arrNCC: res.data
            })
        }
    }

    handleOnchangeInput = (event, id) => {
        let statecopy = { ...this.state };
        statecopy[id] = event.target.value;
        this.setState({
            ...statecopy
        })
    }

    handleOnClickdelete = async (item) => {
        if (item) {
            let data = await handleDeleteNXB(item.keyMap)
            if (data && data.errCode === 0) {
                toast.success('delete nhaxuatban success!');
                await this.handlegetAllNXB()

            } else {
                toast.error('delete nhaxuatban error!');

            }
        }
    }

    handleOnClickEdit = (item) => {
        if (item) {
            this.setState({
                maNXB: item.keyMap,
                tenNXB: item.tenNXB,
                selectUpdate: !this.state.selectUpdate
            })
        }
    }

    handleClean = () => {
        this.setState({
            maNXB: '',
            tenNXB: ''
        })
    }

    handleCheckinput = () => {
        let check = true;
        let arr = ['tenNXB'];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                alert(`Missing input: ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    }

    handleSave = async () => {
        let check = this.handleCheckinput();
        let { arrNCC } = this.state;
        if (check === true) {
            let maNXB = '';
            let count = arrNCC.map(item => parseInt(item.keyMap.match(/\d+$/)[0]));
            let max = Math.max(...count);
            if (max) {
                maNXB = `NXB${max + 1}`
            }
            let data = await handleCreateNewNXB({
                keyMap: maNXB,
                tenNXB: this.state.tenNXB
            })
            if (data && data.errCode === 0) {
                toast.success('Create a new nhaxuatban success!');
                this.setState({
                    maNXB: '',
                    tenNXB: ''
                })
                await this.handlegetAllNXB()

            } else {
                alert(data.errMessage)
            }
        }
    }

    handleUpdate = async () => {
        let check = this.handleCheckinput();
        if (check === true) {
            let data = await handleUpdateNXB({
                keyMap: this.state.maNXB,
                tenNXB: this.state.tenNXB
            })
            if (data && data.errCode === 0) {
                toast.success('update NXB is success!')
                await this.handleClean();
                await this.handlegetAllNXB()
                this.setState({
                    selectUpdate: false
                })

            } else {
                alert(data.errMessage)

            }
        }
    }


    render() {
        let { arrNCC, selectUpdate } = this.state;
        return (
            <div className='nhacungcap-container'>
                <div className='nhacungcap-content'>
                    <div className='nhacuncap-hearder'>
                        <Header />
                    </div>
                    <div className='nhacungcap-title'>
                        Quản lý nhà xuất bản
                    </div>
                    <div className='nhacungcap-info row'>
                        {/* <div className='col-6'>
                            <label>Mã nhà xuất bản</label>
                            <input type='text' className='form-control'
                                onChange={(event) => this.handleOnchangeInput(event, 'maNXB')}
                                value={this.state.maNXB}
                            />
                        </div> */}
                        <div className='col-6'>
                            <label>Tên nhà xuất bản</label>
                            <input type='text' className='form-control'
                                onChange={(event) => this.handleOnchangeInput(event, 'tenNXB')}
                                value={this.state.tenNXB}
                            />
                        </div>
                    </div>
                    <div className='table-nhacungcap'>
                        <table id="customers">
                            <tr>
                                <th className='sticky-column'>Mã nhà xuất bản</th>
                                <th className='sticky-column'>Tên nhà xuất bản</th>
                                <th className='sticky-column'>Option</th>
                            </tr>
                            {
                                arrNCC && arrNCC.length > 0
                                && arrNCC.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.keyMap}</td>
                                            <td>{item.tenNXB}</td>
                                            <td>
                                                <button className='btn-delete-book'
                                                    onClick={() => this.handleOnClickdelete(item)}
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                                <button className='btn-edit-book'
                                                    onClick={() => this.handleOnClickEdit(item)}

                                                >
                                                    <i className="fas fa-pencil-alt"></i>

                                                </button>
                                            </td>

                                        </tr>
                                    )
                                })
                            }


                        </table>
                    </div>

                    <div className='btn-nhacungcap'>
                        {selectUpdate === false

                            ?
                            <button className='btn-add-ncc'
                                onClick={() => this.handleSave()}
                            >
                                <i className="fas fa-plus"></i>Tạo
                            </button>
                            :
                            <button className='btn-save-ncc'
                                onClick={() => this.handleUpdate()}
                            >
                                <i className="far fa-save"></i>Save
                            </button>
                        }

                        <button className='btn-clean-ncc'
                            onClick={() => this.handleClean()}
                        >
                            <i className="fas fa-broom"></i>Clean
                        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(nhaxuatbanManager);
