import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Col, Row, Container } from 'reactstrap';
import CRMBox from '../../../../shared/common/crmBox/crmBox.component';
import { setGeneralSettingContent } from '../../../../../redux/shared/common/common.action';
import { checkTokenExpiration } from '../../../../../redux/shared/auth/auth.action';
//================================================
import { initializeIcons } from "@uifabric/icons";
import { Icon } from "office-ui-fabric-react";
initializeIcons();


class CRMChooseContent extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            clickedItemName: "",
        }
    }
    /* #endregion */

    componentDidMount() {
        this.accessToMenu(this.props.userMenuAccessList);
    }

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("306")) {
            let element = document.getElementById("rating")
            element.classList.remove("item-container-disable-style");
        }
        if (data.includes("315")) {
            let element = document.getElementById("accountSource")
            element.classList.remove("item-container-disable-style");
        }
        if (data.includes("342")) {
            let element = document.getElementById("taskStatus")
            element.classList.remove("item-container-disable-style");
        }
        if (data.includes("324")) {
            let element = document.getElementById("responsibleType")
            element.classList.remove("item-container-disable-style");
        }
        if (data.includes("333")) {
            let element = document.getElementById("reportType")
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
                                iconName="ProductVariant"
                                style={{
                                    fontSize: "20px",
                                    marginTop: "8px",
                                    marginRight: "13px",
                                }}
                            />
                        </div>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '25px' }}>مدیریت مشتریان</span>
                    </Col>
                </Row>
                <hr />
                <Row title='content'>
                    <Col className="item-container-disable-style" id='rating' sm='4'>
                        <CRMBox id='rating' title='امتیاز' fabricIcon='ProductVariant' onClick={this.showClickedItem} />
                    </Col>
                    <Col className="item-container-disable-style" id='accountSource' sm='4'>
                        <CRMBox id='accountSource' title='منابع' fabricIcon='ProductVariant' onClick={this.showClickedItem} />
                    </Col>
                    <Col className="item-container-disable-style" id='taskStatus' sm='4'>
                        <CRMBox id='taskStatus' title='وضعیت کار' fabricIcon='ProductVariant' onClick={this.showClickedItem} />
                    </Col>
                    <Col className="item-container-disable-style" id='responsibleType' sm='4'>
                        <CRMBox id='responsibleType' title='نوع مسئولیت' fabricIcon='ProductVariant' onClick={this.showClickedItem} />
                    </Col>
                    <Col className="item-container-disable-style" id='reportType' sm='4'>
                        <CRMBox id='reportType' title='نوع گزارش' fabricIcon='ProductVariant' onClick={this.showClickedItem} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CRMChooseContent);