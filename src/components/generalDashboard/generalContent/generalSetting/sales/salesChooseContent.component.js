/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Col, Row, Container } from 'reactstrap';
import CRMBox from '../../../../shared/common/crmBox/crmBox.component';
import { setGeneralSettingContent } from '../../../../../redux/shared/common/common.action';
import { checkTokenExpiration } from '../../../../../redux/shared/auth/auth.action';
//================================================
import { initializeIcons } from "@uifabric/icons";
import { Icon } from "office-ui-fabric-react";
/* #endregion */

initializeIcons();

class SalesChooseContent extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            clickedItemName: "",
        }
    }
    /* #endregion */

    //#region [*** methods ***]

    //#region [*** componentMethods ***]

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        this.accessToMenu(this.props.userMenuAccessList);
    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("259")) {
            let element = document.getElementById("deliveryTerm")

            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("297")) {
            let element = document.getElementById("reportType")
            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("288")) {
            let element = document.getElementById("taskStatus")
            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("279")) {
            let element = document.getElementById("responsibleType")
            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("222")) {
            let element = document.getElementById("accountType")
            element.classList.remove("item-container-disable-style");
        }
        if (data.includes("269")) {
            let element = document.getElementById("shippingMethod")
            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("232")) {
            let element = document.getElementById("financialCaseType")
            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("241")) {
            let element = document.getElementById("termType")
            element.classList.remove("item-container-disable-style");
        }
        if (data.includes("702")) {
            let element = document.getElementById("reasonsSalesReturn")
            element.classList.remove("item-container-disable-style");
        }
        if (data.includes("717")) {
            let element = document.getElementById("manualActivityType")
            element.classList.remove("item-container-disable-style");
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

    //#endregion

    /* #region  [- render() -] */
    render() {
        return (
            <Container fluid className='reacstrap-container' style={{overflowY:'scroll'}}>

                <Row name='row_01_Header' className='content-header-row' style={{ margin: '1% 0 1% 0', padding: '0' }}>
                    <Col className='content-header-col' style={{ marginBottom: '1%' }}>
                        <div name='icon' className='content-header-div' style={{ marginLeft: '1%' }}>
                            <Icon iconName="EngineeringGroup" style={{ fontSize: "20px", padding: '20% 30% 0' }} />
                        </div>
                        <p className='content-header-title'>فروش</p>
                    </Col>
                </Row>

                <Row name='row_02_Boxes' className='content-box-row' style={{marginBottom:'10%'}}>
                    <Container fluid>
                        {/* ================ Boxs ======================== */}

                        {/* ================ Row 1 ======================== */}
                        <Row name='row_01'>

                            <Col name='accountType' className="item-container-disable-style" id='accountType' sm='12' md='6' lg='4'>
                                <CRMBox id='accountType' title='انواع طرف حساب' fabricIcon='EngineeringGroup' onClick={this.showClickedItem} />
                            </Col>

                            <Col name='manualActivityType' className="item-container-disable-style" id='manualActivityType' sm='12' md='6' lg='4'>
                                <CRMBox id='manualActivityType' title='انواع فعالیت' fabricIcon='EngineeringGroup' onClick={this.showClickedItem} />
                            </Col>

                        </Row>
                        <hr />

                        {/* ================ Row 2 ======================== */}
                        <Row name='row_02'>

                            <Col name='financialCaseType' className="item-container-disable-style" id='financialCaseType' sm='12' md='6' lg='4'>
                                <CRMBox id='financialCaseType' title='انواع اضافات و کسورات' fabricIcon='EngineeringGroup' onClick={this.showClickedItem} />
                            </Col>

                            <Col name='termType' className="item-container-disable-style" id='termType' sm='12' md='6' lg='4'>
                                <CRMBox id='termType' title='انواع شرایط و ملاحضات' fabricIcon='EngineeringGroup' onClick={this.showClickedItem} />
                            </Col>

                            {/* 
                            //This table is not needed right now in the project but since it might be 
                              be reused in the future,by the CTO and project managemer permission I didnt delete it and just hide it from the user.
                              --comment by DorsaEslami
                            <Col name='paymentType' className="item-container-disable-style" id='paymentType' sm='12' md='6' lg='4'>
                                <CRMBox id='paymentType' title='انواع روش پرداخت' fabricIcon='EngineeringGroup' onClick={this.showClickedItem} />
                            </Col> */}

                            <Col name='deliveryTerm' className="item-container-disable-style" id='deliveryTerm' sm='12' md='6' lg='4'>
                                <CRMBox id='deliveryTerm' title='شرایط تحویل' fabricIcon='EngineeringGroup' onClick={this.showClickedItem} />
                            </Col>

                            <Col name='shippingMethod' className="item-container-disable-style" id='shippingMethod' sm='12' md='6' lg='4'>
                                <CRMBox id='shippingMethod' title='انواع روش حمل و نقل' fabricIcon='EngineeringGroup' onClick={this.showClickedItem} />
                            </Col>

                        </Row>

                        <hr />
                        {/* ================ Row 4 ======================== */}
                        <Row name='row_04'>

                            <Col name='responsibleType' className="item-container-disable-style" id='responsibleType' sm='12' md='6' lg='4'>
                                <CRMBox id='responsibleType' title='انواع مسئولیت' fabricIcon='EngineeringGroup' onClick={this.showClickedItem} />
                            </Col>

                            <Col name='taskStatus' className="item-container-disable-style" id='taskStatus' sm='12' md='6' lg='4'>
                                <CRMBox id='taskStatus' title='وضعیت کار' fabricIcon='EngineeringGroup' onClick={this.showClickedItem} />
                            </Col>

                            <Col name='reportType' className="item-container-disable-style" id='reportType' sm='12' md='6' lg='4'>
                                <CRMBox id='reportType' title='انواع گزارش' fabricIcon='EngineeringGroup' onClick={this.showClickedItem} />
                            </Col>

                        </Row>

                        {/* ================ Row 5 ======================== */}

                        <Row name='row_05' style={{marginBottom:'10%'}}>

                            <Col name='reasonsSalesReturn' className="item-container-disable-style" id='reasonsSalesReturn' sm='12' md='6' lg='4'>
                                <CRMBox id='reasonsSalesReturn' title='علت مرجوعی' fabricIcon='EngineeringGroup' onClick={this.showClickedItem} />
                            </Col>

                            <Col name='' className="item-container-disable-style" id='' sm='12' md='6' lg='4'>
                            </Col>

                            <Col name='' className="item-container-disable-style" id='' sm='12' md='6' lg='4'>
                            </Col>

                        </Row>


                    </Container>
                </Row>



            </Container>

        );
    }
    /* #endregion */

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

export default connect(mapStateToProps, mapDispatchToProps)(SalesChooseContent);