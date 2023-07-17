import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class DefaultComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    componentDidMount() {
    }


    render() {
        return (
            <div>Manage products</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultComponent);
