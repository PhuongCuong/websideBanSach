import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalSoLuong.scss'
import { handlecountAllTL } from '../../../../services/bookService'


class ModalSoLuong extends Component {
    constructor(props) {
        super(props)
        this.state = {
            soluong: ''
        }
    }

    async componentDidMount() {
    }


    handleSave = async () => {
        let check = this.handleCheckinput();
        if (check === true) {
            this.props.handleAddBilldetail(+this.state.soluong)
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
        let arr = ['soluong'];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                alert(`Missing input: ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    }

    handleEnter = (event) => {
        if (event.key === 'Enter') {
            let check = this.handleCheckinput();
            if (check === true) {
                this.props.handleAddBilldetail(+this.state.soluong);
                this.setState({
                    soluong: ''
                })
            }
        }
    }




    render() {
        return (
            <>
                <Modal show={this.props.isShowModal} onHide={this.props.handleShowModal} centered={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nhập số lượng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row'>
                            <div className='col-12 form-group'>
                                <label>Số lượng</label>
                                <input type='text' className='form-control'
                                    onChange={(event) => this.handleOnChangeInput(event, 'soluong')}
                                    value={this.state.soluong}
                                    onKeyPress={(event) => this.handleEnter(event)}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"
                            onClick={this.props.handleShowModal}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalSoLuong);
