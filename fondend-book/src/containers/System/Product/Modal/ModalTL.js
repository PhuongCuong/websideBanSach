import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalTL.scss'
import { handlecountAllTL } from '../../../../services/bookService'


class ModalTL extends Component {
    constructor(props) {
        super(props)
        this.state = {
            maTL: '',
            tenTL: ''
        }
    }

    async componentDidMount() {
    }


    handleSave = async () => {
        let check = this.handleCheckinput();
        if (check === true) {
            let TL = '';
            let count = await handlecountAllTL();
            if (count && count.errCode === 0) {
                TL = `TL${count.data + 1}`
            }
            this.props.handleCreateNewTL({
                keyMap: TL,
                theLoai: this.state.tenTL
            });
            this.setState({
                maTL: '',
                tenTL: ''
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



    render() {
        return (
            <>
                <Modal show={this.props.isShowTL} onHide={this.props.handleShowTL} centered={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tạo thể loại</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row'>
                            <div className='col-12 form-group'>
                                <label>Tên thể loại</label>
                                <input type='text' className='form-control'
                                    onChange={(event) => this.handleOnChangeInput(event, 'tenTL')}
                                    value={this.state.tenTL}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"
                            onClick={this.props.handleShowTL}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalTL);
