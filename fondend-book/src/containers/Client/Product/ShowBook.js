import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ShowBook.scss'
import HomeHeader from '../Header/HomeHeader';
import HomeProduct from '../Home/HomeProduct';
import ReactPaginate from 'react-paginate';



class ShowBook extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentPage: 0,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    componentDidMount() {
    }


    handlePageChange = (selectedPage) => {
        this.setState({
            currentPage: selectedPage.selected
        })
    };


    render() {
        const itemsPerPage = 25;
        const data = this.props.location.state
        const pageCount = Math.ceil(data.length / itemsPerPage);
        const offset = this.state.currentPage * itemsPerPage;
        const currentData = data.slice(offset, offset + itemsPerPage);
        return (
            <div className='show-book-container'>
                <div className='show-book-content'>
                    <div className='show-book-header'>
                        <HomeHeader />
                    </div>
                    <div className='show-book-body'>
                        <div className='show-book-sort'>
                            <div className='show-book-text'>Sắp xếp theo:</div>
                            <select className='show-book-select'>

                            </select>
                        </div>
                        <div className='show-more-bookk'>
                            <HomeProduct
                                arrBook={currentData}
                            />
                        </div>
                        <div className='show-more-page'>
                            <div className='pagination-wrapper'>
                                <div className='next-page'>
                                    <ReactPaginate
                                        nextLabel={'Next'}
                                        breakLabel={null}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={25}
                                        onPageChange={this.handlePageChange}
                                        containerClassName={'pagination'}
                                        activeClassName={'active'}
                                    />
                                </div>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowBook);
