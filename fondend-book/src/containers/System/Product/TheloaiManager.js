import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './NhacungcapManager.scss';
import Header from '../../Header/Header';
import {
    handlegetAllTL, handleCreateNewTL, handleDeleteTL, handleUpdateTL,
    handlecountAllTL
} from '../../../services/bookService';
import { toast } from 'react-toastify';


class TheloaiManager extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrNCC: [],
            maTL: '',
            tenTL: '',
            selectUpdate: false
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    async componentDidMount() {
        await this.handleGetAllNCC();
    }

    handleGetAllNCC = async () => {
        let res = await handlegetAllTL('ALL');
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
            let data = await handleDeleteTL(item.keyMap)
            if (data && data.errCode === 0) {
                toast.success('delete nhacungcap success!');
                await this.handleGetAllNCC()

            } else {
                toast.error('delete Theloai error!');

            }
        }
    }

    handleOnClickEdit = (item) => {
        if (item) {
            this.setState({
                maTL: item.keyMap,
                tenTL: item.theLoai,
                selectUpdate: !this.state.selectUpdate
            })
        }
    }

    handleClean = () => {
        this.setState({
            maTL: '',
            tenTL: ''
        })
    }

    handleCheckinput = () => {
        let check = true;
        let arr = ['tenTL'];
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
            let TL = '';
            let count = arrNCC.map(item => parseInt(item.keyMap.match(/\d+$/)[0]));
            let max = Math.max(...count);
            if (max) {
                TL = `TL${max + 1}`
            }
            let data = await handleCreateNewTL({
                keyMap: TL,
                theLoai: this.state.tenTL
            })
            if (data && data.errCode === 0) {
                toast.success('Create a new TheLoai success!');
                this.setState({
                    maTL: '',
                    tenTL: ''
                })
                await this.handleGetAllNCC()

            } else {
                alert(data.errMessage)
            }
        }
    }

    handleUpdate = async () => {
        let check = this.handleCheckinput();
        if (check === true) {
            let data = await handleUpdateTL({
                keyMap: this.state.maTL,
                theLoai: this.state.tenTL
            })
            if (data && data.errCode === 0) {
                toast.success('update TL is success!')
                await this.handleClean();
                await this.handleGetAllNCC()
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
                        Quản lý thể loại
                    </div>
                    <div className='nhacungcap-info row'>
                        {/* <div className='col-6'>
                            <label>Mã thể loại</label>
                            <input type='text' className='form-control'
                                onChange={(event) => this.handleOnchangeInput(event, 'maTL')}
                                value={this.state.maTL}
                            />
                        </div> */}
                        <div className='col-6'>
                            <label>Tên thể loại</label>
                            <input type='text' className='form-control'
                                onChange={(event) => this.handleOnchangeInput(event, 'tenTL')}
                                value={this.state.tenTL}
                            />
                        </div>
                    </div>
                    <div className='table-nhacungcap'>
                        <table id="customers">
                            <tr>
                                <th className='sticky-column'>Mã thể loại</th>
                                <th className='sticky-column'>Tên thể loại</th>
                                <th className='sticky-column'>Option</th>
                            </tr>
                            {
                                arrNCC && arrNCC.length > 0
                                && arrNCC.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.keyMap}</td>
                                            <td>{item.theLoai}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(TheloaiManager);
