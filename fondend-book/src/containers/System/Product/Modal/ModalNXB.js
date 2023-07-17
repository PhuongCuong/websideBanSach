import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalNXB.scss'
import { handlecountAllNXB } from '../../../../services/bookService'


class ModalNXB extends Component {
    constructor(props) {
        super(props)
        this.state = {
            maNXB: '',
            tenNXB: ''
        }
    }

    async componentDidMount() {
    }

    handleSave = async () => {
        let check = this.handleCheckinput();
        if (check === true) {
            let maNXB = '';
            let count = await handlecountAllNXB();
            if (count && count.errCode === 0) {
                maNXB = `NXB${count.data + 1}`
            }
            this.props.handleCreateNewNXB({
                keyMap: maNXB,
                tenNXB: this.state.tenNXB
            });
            this.setState({
                maNXB: '',
                tenNXB: ''
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




    render() {
        return (
            <>
                <Modal show={this.props.isShowNXB} onHide={this.props.handleShowNXB} centered={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tạo nhà xuất bản</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row'>
                            <div className='col-12 form-group'>
                                <label>Tên nhà xuất bản</label>
                                <input type='text' className='form-control'
                                    onChange={(event) => this.handleOnChangeInput(event, 'tenNXB')}
                                    value={this.state.tenNXB}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"
                            onClick={this.props.handleShowNXB}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalNXB);
