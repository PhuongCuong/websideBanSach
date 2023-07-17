import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Paginate.scss'
import ReactPaginate from 'react-paginate';


class Paginate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentPage: 0,
            currentData: []
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currentPage !== this.state.currentPage) {
            const itemsPerPage = 25;

            let offset = this.state.currentPage * itemsPerPage;
            this.setState({
                currentData: this.props.arrBook.slice(offset, offset + itemsPerPage)
            })
            await this.props.handlePaginate(this.state.currentData)
        }
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

        const data = this.props.arrBook
        const pageCount = Math.ceil(data.length / itemsPerPage);

        return (
            <div className='paginate-container'>
                <div className='paginate-content'>
                    <div className='show-more-page'>
                        <div className='pagination-wrapper'>
                            <div className='next-page'>
                                <ReactPaginate
                                    nextLabel={'Next'}
                                    breakLabel={null}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={this.state.currentData}
                                    onPageChange={this.handlePageChange}
                                    containerClassName={'pagination'}
                                    activeClassName={'active'}
                                />
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

export default connect(mapStateToProps, mapDispatchToProps)(Paginate);
