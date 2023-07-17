import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './CartBillTail.scss';
import { withRouter } from 'react-router';


class CartBill extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    componentDidMount() {
    }

    handleBackCart = () => {
        if (this.props.history) {
            this.props.history.push('/cart')
        }
    }


    render() {
        return (
            <div className='cart-tail-container'>
                <div className='cart-tail-content'>
                    <span className='back-cart'
                        onClick={() => this.handleBackCart()}
                    >
                        <i className="fas fa-long-arrow-alt-left"></i>
                    </span>
                    <div className='text-back-cart'>Quay lại giỏ hàng</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartBill));
