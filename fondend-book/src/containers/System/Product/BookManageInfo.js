import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BookManageInfo.scss';
import Header from '../../Header/Header';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { handlegetAllBook, handleSaveBookInfo, handlegetAllbookInfo, handleUpdateBookinfo } from '../../../services/bookService';
import { toast } from 'react-toastify';
import _ from 'lodash';

const mdParser = new MarkdownIt(
);

class BookManageInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrBook: [],
            bookId: '',
            descriptionHTML: '',
            descriptionMarkDown: '',
            isShowupdate: false
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.bookId !== this.state.bookId) {
            await this.handleGetBookInfo(this.state.bookId);
        }
    }

    handlegetAllbook = async () => {
        let res = await handlegetAllBook('ALL');
        if (res && res.errCode === 0) {
            this.setState({
                arrBook: res.data
            })
        }
    }

    async componentDidMount() {
        await this.handlegetAllbook();
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkDown: text
        })
    }

    handleOnChange = async (event, id) => {
        let copystate = { ...this.state }
        copystate[id] = event.target.value;
        this.setState({
            ...copystate
        })
    }

    handleCheckinput = () => {
        let check = true;
        let arr = ['bookId', 'descriptionHTML', 'descriptionMarkDown'];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                alert(`Missing input:${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    }

    handleSave = async () => {
        let check = this.handleCheckinput();
        if (check === true) {
            let data = await handleSaveBookInfo({
                bookId: this.state.bookId,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkDown: this.state.descriptionMarkDown
            })
            if (data && data.errCode === 0) {
                toast.success('Create a new bookInfo success!');
                this.setState({
                    bookId: '',
                    descriptionHTML: '',
                    descriptionMarkDown: ''
                })
            }
            else {
                alert(data.errMessage)
            }
        }
    }

    handleGetBookInfo = async (bookId) => {
        let data = await handlegetAllbookInfo(bookId);
        if (data && data.errCode === 0 && !_.isEmpty(data.data)) {
            this.setState({
                descriptionMarkDown: data.data.descriptionMarkDown,
                isShowupdate: true
            })
        } else {
            this.setState({
                descriptionMarkDown: '',
                isShowupdate: false
            })
        }
    }

    handleEditBookInfo = async () => {
        let check = this.handleCheckinput();
        if (check === true) {
            let data = await handleUpdateBookinfo({
                bookId: this.state.bookId,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkDown: this.state.descriptionMarkDown
            });
            if (data && data.errCode === 0) {
                toast.success('update book info is success!');
                this.setState({
                    bookId: '',
                    descriptionHTML: '',
                    descriptionMarkDown: ''
                })
            } else {
                alert(data.errMessager)

            }
        }
    }

    handleCancelUpdate = () => {
        this.setState({
            isShowupdate: false
        })
    }


    render() {
        let { arrBook, isShowupdate, bookId } = this.state;
        return (
            <div className='book-info-container'>
                <div className='book-info-content'>
                    <div className='book-info-header'>
                        <Header />
                    </div>
                    <div className='book-info-title'>
                        Quản lý thông tin sách
                    </div>

                    <div className='book-info-body row'>
                        <div className='book-info-tenSach col-6'>
                            <label>Tên sách</label>
                            <select className='form-control'
                                onChange={(event) => this.handleOnChange(event, 'bookId')}
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

                        <div className='book-info-markdown col-12'>
                            <MdEditor style={{ height: '500px', width: '100%' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkDown}
                            />
                        </div>

                        <div className='book-info-btn col-12'>
                            {isShowupdate === false
                                ?
                                <button className='btn-save'
                                    onClick={() => this.handleSave()}
                                >Save</button>

                                :
                                <>
                                    <button className='btn-save'
                                        onClick={() => this.handleEditBookInfo()}
                                    >Save update</button>

                                    <button className='btn-save'
                                        onClick={() => this.handleCancelUpdate()}
                                    >Hủy</button>
                                </>

                            }

                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookManageInfo);
