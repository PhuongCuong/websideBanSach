import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Bookcategory.scss'
import { handleGetallCodeByType } from '../../../services/userService'
import { handlegetAllBookNCC } from '../../../services/bookService'


class Bookcategory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrSanPham: [],
            sanpham: '',
            selectedindex: {},
            isShowmore: false,
            NCC: '',
            selectedMount: '',
            frommount: '',
            aboutmount: ''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.selectedMount !== this.state.selectedMount) {
            this.props.handlegetMount(this.state.selectedMount)
        }
    }

    async componentDidMount() {
        await this.handleGetallCodeByType();
    }

    handleGetallCodeByType = async () => {
        let arrSanPham = await handleGetallCodeByType('sanPham');
        if (arrSanPham && arrSanPham.errCode === 0) {
            this.setState({
                arrSanPham: arrSanPham.data,
                sanpham: arrSanPham && arrSanPham.data.length > 0 ? arrSanPham.data[0].keyMap : ''

            })
        }
    }

    handleClickIndex = async (item) => {
        this.setState({
            selectedindex: item
        })
        await this.props.handleselectSP(item.keyMap)
    }

    handleShowmore = () => {
        this.setState({
            isShowmore: !this.state.isShowmore
        })
    }

    handleChooseNCC = (item) => {
        this.setState({
            NCC: item.keyMap
        })
        this.props.handleselectNCC(item.keyMap)
    }

    handleSelectedMount = (mount) => {
        this.setState({
            selectedMount: mount
        })
    }

    handleOnChangeInput = (event, id) => {
        let copystate = { ...this.state };
        copystate[id] = event.target.value;
        this.setState({
            ...copystate
        })
    }

    handleApdung = async () => {
        await this.props.handlefmounta(this.state.frommount, this.state.aboutmount)

        this.setState({
            selectedMount: `${this.state.frommount}-${this.state.aboutmount}`
        })

    }


    render() {
        let { arrSanPham, selectedindex, isShowmore, NCC, selectedMount } = this.state;
        return (
            <div className='book-category-container'>
                <div className='book-category-content'>
                    <div className='category-product'>
                        <div className='category-product-title'>Danh mục sản phẩm</div>
                        {
                            arrSanPham && arrSanPham.length > 0 &&
                            arrSanPham.map((item, index) => {
                                return (
                                    <div className={selectedindex === item ? 'category-product-product action' : 'category-product-product'}
                                        key={index}
                                        onClick={() => this.handleClickIndex(item)}
                                    >{item.value}</div>

                                )
                            })
                        }
                    </div>
                    <div className='category-mount'>
                        <div className='category-mount-title'>Giá</div>
                        <div className={selectedMount === 'duoi-40000' ? 'item active' : 'item'}
                            onClick={() => this.handleSelectedMount('duoi-40000')}
                        >
                            <span className='item-mount'>Dưới 40.000</span>
                        </div>
                        <div className={selectedMount === '40000-120000' ? 'item active' : 'item'}
                            onClick={() => this.handleSelectedMount('40000-120000')}

                        >
                            <span className='item-mount'>40.000 &rarr; 120.000</span>
                        </div>
                        <div className={selectedMount === '120000-280000' ? 'item active' : 'item'}
                            onClick={() => this.handleSelectedMount('120000-280000')}

                        >
                            <span className='item-mount'>120.000 &rarr; 280.000</span>
                        </div>
                        <div className={selectedMount === 'tren-280000' ? 'item active' : 'item'}
                            onClick={() => this.handleSelectedMount('tren-280000')}

                        >
                            <span className='item-mount'>Trên 280.000</span>
                        </div>
                        <div className='text-khoang-gia'>Chọn khoảng giá</div>
                        <div className='choose-khoang-gia'>
                            <input type='text' min={0} className='gia-tu'
                                placeholder='Giá từ'
                                value={this.state.frommount}
                                onChange={(event) => this.handleOnChangeInput(event, 'frommount')}

                            />
                            <span>-</span>
                            <input type='text' min={0} className='gia-den'
                                placeholder='Giá đến'
                                value={this.state.aboutmount}
                                onChange={(event) => this.handleOnChangeInput(event, 'aboutmount')}


                            />
                        </div>
                        <div className='ap-dung'
                            onClick={() => this.handleApdung()}
                        >
                            <span>Áp dụng</span>
                        </div>
                    </div>
                    <div className={isShowmore === false ? 'nha-cung-cap' : 'nha-cung-cap showmoreNCC'}>
                        <div className='nha-cung-cap-title'>Nhà cung cấp</div>
                        {this.props.arrNCC && this.props.arrNCC.length > 0
                            && this.props.arrNCC.map((item, index) => {
                                return (
                                    <div className='nha-cung-cap-item' key={index}>
                                        <input type='checkbox'
                                            checked={NCC === item.keyMap}
                                            onClick={() => this.handleChooseNCC(item)}
                                        ></input>
                                        <span>{item.tenNCC}</span>
                                    </div>
                                )
                            })
                        }

                    </div>
                    {
                        isShowmore === false
                            ?
                            <div className='show-more'
                                onClick={() => this.handleShowmore()}
                            >Xem thêm<i class="fas fa-chevron-down"></i></div>
                            :
                            <div className='show-more'
                                onClick={() => this.handleShowmore()}
                            >Thu gọn<i class="fas fa-chevron-up"></i></div>
                    }


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

export default connect(mapStateToProps, mapDispatchToProps)(Bookcategory);
