import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalNCC.scss'
import { handlecountAllNCC } from '../../../../services/bookService'


class ModalNCC extends Component {
    constructor(props) {
        super(props)
        this.state = {
            maNCC: '',
            tenNCC: ''
        }
    }



    async componentDidMount() {
    }

    handleSave = async () => {
        let check = this.handleCheckinput();
        if (check === true) {
            let maNCC = '';
            let count = await handlecountAllNCC();
            if (count && count.errCode === 0) {
                maNCC = `NCC${count.data + 1}`
            }
            this.props.handleCreateNewNCC({
                keyMap: maNCC,
                tenNCC: this.state.tenNCC
            });
            this.setState({
                maNCC: '',
                tenNCC: ''
            })
        }
    }

    handleOnChangeInput = (event, id) => {
        let statecopy = { ...this.state };
        statecopy[id] = event.target.value;
        this.setState({
            ...statecopy
        })
    }

    handleCheckinput = () => {
        let check = true;
        let arr = ['tenNCC'];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                alert(`Missing input: ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    }




    render() {
        return (
            <>
                <Modal show={this.props.isShowNCC} onHide={this.props.handleShowNCC} centered={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tạo nhà cung cấp</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row'>
                            <div className='col-12 form-group'>
                                <label>Tên nhà cung cấp</label>
                                <input type='text' className='form-control'
                                    onChange={(event) => this.handleOnChangeInput(event, 'tenNCC')}
                                    value={this.state.tenNCC}

                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"
                            onClick={this.props.handleShowNCC}
                        >
                            Close
                        </Button>
                        <Button variant="primary"
                            onClick={() => this.handleSave()}
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

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

export default connect(mapStateToProps, mapDispatchToProps)(ModalNCC);
