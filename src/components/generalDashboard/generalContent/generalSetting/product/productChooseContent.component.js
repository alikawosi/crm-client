import React, { PureComponent } from '../../../../../../node_modules/react';
import { connect } from "../../../../../../node_modules/react-redux";
import { Col, Row, Container } from '../../../../../../node_modules/reactstrap';
import CRMBox from '../../../../shared/common/crmBox/crmBox.component';
import { setGeneralSettingContent } from '../../../../../redux/shared/common/common.action';
import { checkTokenExpiration } from '../../../../../redux/shared/auth/auth.action';
//================================================
import { initializeIcons } from "../../../../../../node_modules/@uifabric/icons";
import { Icon } from "../../../../../../node_modules/office-ui-fabric-react";
initializeIcons();


class ProductChooseContent extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            clickedItemName: "",
        }
    }
    /* #endregion */

    componentDidMount(){
        this.accessToMenu(this.props.userMenuAccessList);
    }

    /* #region  [- accessToMenu -] */
    
    accessToMenu = (data) => {
        
        if (data.includes("104")) {
            let element = document.getElementById("materialCard")

            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("115")) {
            let element = document.getElementById("materialCategory")

            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("126")) {
            let element = document.getElementById("scale")

            element.classList.remove("item-container-disable-style");
        }
        if (data.includes("137")) {
            let element = document.getElementById("warehouseCategory")

            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("148")) {
            let element = document.getElementById("warehouseCard")

            element.classList.remove("item-container-disable-style");
        }


    }

    /* #endregion */

    /* #region  [- showClickedItem -] */

    showClickedItem = (clickedItem) => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.setGeneralSettingContent(clickedItem);
    }

    /* #endregion */

    /* #region  [- render() -] */

    render() {
        return (
            <Container fluid className='reacstrap-container' style={{overflowY:'scroll'}}>
                <Row name='row_01_header' className='mt-2'>
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
                                iconName="ProductVariant"
                                style={{
                                    fontSize: "20px",
                                    marginTop: "8px",
                                    marginRight: "13px",
                                }}
                            />
                        </div>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '25px' }}>کالا</span>
                    </Col>
                </Row>
                <hr />

                <Row name='row_02_productAndWarehouse'>

                    <Col className="item-container-style" id='productCategory' sm='4'>
                        <CRMBox id='productCategory' title='گروه کالا' fabricIcon='ProductVariant' onClick={this.showClickedItem} />
                    </Col>

                    <Col className="item-container-style" id='productCard' sm='4'>
                        <CRMBox id='product' title='کالا' fabricIcon='ProductVariant' onClick={this.showClickedItem} />
                    </Col>

                    <Col className="item-container-style" id='supplier' sm='4'>
                        <CRMBox id='supplier' title='تامین کنندگان ' fabricIcon='ProductVariant' onClick={this.showClickedItem} />
                    </Col>

                    <Col className="item-container-style" id='warehouseCategory' sm='4'>
                        <CRMBox id='warehouseCategory' title='گروه انبار' fabricIcon='ProductVariant' onClick={this.showClickedItem} />
                    </Col>

                    <Col className="item-container-style" id='warehouseCard' sm='4'>
                        <CRMBox id='warehouse' title='انبار' fabricIcon='ProductVariant' onClick={this.showClickedItem} />
                    </Col>

                </Row>

                <hr />
                <Row name='row_03-materialAndProducer'>

                    <Col className="item-container-style" id='materialCategory' sm='4'>
                        <CRMBox id='materialCategory' title=' گروه کالا پایه' fabricIcon='ProductVariant' onClick={this.showClickedItem} />
                    </Col>

                    <Col className="item-container-style" id='materialCard' sm='4'>
                        <CRMBox id='material' title='کالا پایه' fabricIcon='ProductVariant' onClick={this.showClickedItem} />
                    </Col>

                    <Col className="item-container-style" id='producer' sm='4'>
                        <CRMBox id='producer' title='تولیدکنندگان ' fabricIcon='ProductVariant' onClick={this.showClickedItem} />
                    </Col>
                </Row>

                <hr />
                <Row name='row_03-scale' style={{marginBottom:'10%'}}>
                    <Col className="item-container-style" id='scale' sm='4'>
                        <CRMBox id='scale' title='واحد اندازه گیری' fabricIcon='ProductVariant' onClick={this.showClickedItem} />
                    </Col>
                </Row>
               
                <hr />



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

export default connect(mapStateToProps, mapDispatchToProps)(ProductChooseContent);