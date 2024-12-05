import React, { Component } from 'react';
import { connect } from "react-redux";
import { Col, Row, Container } from 'reactstrap';
import CartableBox from '../../../shared/common/cartableBox/cartableBox.component';
import CartableSubBox from '../../../shared/common/cartableSubBox/cartableSubBox.component';
import { setGeneralSettingContent } from '../../../../redux/shared/common/common.action';
import { checkTokenExpiration } from '../../../../redux/shared/auth/auth.action';
//================================================
import { initializeIcons } from "@uifabric/icons";
import { Icon } from "office-ui-fabric-react";
initializeIcons();

class CartableChooseContent extends Component {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    /* #endregion */

    /* #region  [- showClickedItem -] */
    showClickedItem = (clickedItem) => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.setGeneralSettingContent(clickedItem);
        //console.log('test');
    }
    /* #endregion */

    /* #region  [- render() -] */
    render() {
        return (
            <Container fluid>
                <Row title='header' className='mt-2'>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <div
                            style={{
                                float: "right",
                                width: "48px",
                                height: "48px",
                                background:
                                    "linear-gradient(60deg, rgb(180, 204, 222), rgb(95, 217, 244))",
                                borderRadius: "50%",
                                marginLeft: "5px",
                            }}
                        >
                            <Icon
                                iconName="Taskboard"
                                style={{
                                    fontSize: "20px",
                                    marginTop: "8px",
                                    marginRight: "13px",
                                }}
                            />
                        </div>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '25px' }}>میز کار</span>
                    </Col>
                </Row>
                <hr />
                <Row title='content'>
                    <Col id='materialCard' sm='4'>
                        <CartableBox id='sales' title='فروش' fabricIcon='EngineeringGroup' onClick={this.showClickedItem} style={{height:'366px'}} description={['لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،',<CartableSubBox id='sales' title='سفارشات' fabricIcon='ActivateOrders' onClick={this.showClickedItem} />,<CartableSubBox id='sales' title='سرنخ ها' fabricIcon='PartyLeader' onClick={this.showClickedItem} />,<CartableSubBox id='sales' title='کالا' fabricIcon='Product' onClick={this.showClickedItem} />]} />
                    </Col>
                    <Col sm='8'>
                        <CartableBox id='services' title='سرویس ها' fabricIcon='Processing' onClick={this.showClickedItem} description={'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد.'}/>
                        <CartableBox id='marketing' title='بازاریابی' fabricIcon='Transition' onClick={this.showClickedItem} description={'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد.'}/>
                    </Col>
                </Row>
                <Row title='content'>
                    {/* <Col id='materialCategory' sm='4'>
                        <CartableBox id='inventory' title='موجودی کالا' fabricIcon='OfflineStorage' onClick={this.showClickedItem} />
                    </Col> */}
                    <Col id='scale' sm='4'>
                        <CartableBox id='management' title='مدیریت' fabricIcon='WorkforceManagement' onClick={this.showClickedItem} />
                    </Col>
                </Row>
            </Container>
        );
    }
    /* #endregion */
}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        userMenuAccessList: state.auth.userMenuAccessList,
        checkTokenCounter: state.auth.checkTokenCounter,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    setGeneralSettingContent: (data) => dispatch(setGeneralSettingContent(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(CartableChooseContent);