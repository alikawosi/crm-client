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

class PersonChooseContent extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            clickedItemName: "",
        }
    }
    /* #endregion */

    /* #region  [- method -] */

    componentDidMount(){
        this.accessToMenu(this.props.userMenuAccessList);
    }

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("16")) {
            let element = document.getElementById("realPerson")

            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("27")) {
            let element = document.getElementById("legalPerson")

            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("38")) {
            let element = document.getElementById("workField")

            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("49")) {
            let element = document.getElementById("organizationType")

            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("60")) {
            let element = document.getElementById("categoryType")

            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("71")) {
            let element = document.getElementById("educationLevel")

            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("82")) {
            let element = document.getElementById("representativeType")

            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("93")) {
            let element = document.getElementById("extraInfoTemplate")

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
                                iconName="ReminderPerson"
                                style={{
                                    fontSize: "20px",
                                    marginTop: "8px",
                                    marginRight: "13px",
                                }}
                            />
                        </div>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '25px' }}>اشخاص</span>
                    </Col>
                </Row>
                <hr />
                <Row title='content'>
                    <Container fluid>
                        <Row>
                            <Col className="item-container-disable-style" id='realPerson' sm='12' md='6' lg='4'>
                                <CRMBox id='realPerson' title='شخص حقیقی' fabricIcon='ReminderPerson' onClick={this.showClickedItem} />
                            </Col>
                            <Col className="item-container-disable-style" id='legalPerson' sm='12' md='6' lg='4'>
                                <CRMBox id='legalPerson' title='شخص حقوقی' fabricIcon='ReminderPerson' onClick={this.showClickedItem} />
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className="item-container-disable-style" id='workField' sm='12' md='6' lg='4'>
                                <CRMBox id='workField' title='زمینه فعالیت ' fabricIcon='ReminderPerson' onClick={this.showClickedItem} />
                            </Col>
                            <Col className="item-container-disable-style" id='organizationType' sm='12' md='6' lg='4'>
                                <CRMBox id='organizationType' title='انواع شخص حقوقی' fabricIcon='ReminderPerson' onClick={this.showClickedItem} />
                            </Col>
                            <Col className="item-container-disable-style" id='categoryType' sm='12' md='6' lg='4'>
                                <CRMBox id='categoryType' title='انواع واحد سازمانی' fabricIcon='ReminderPerson' onClick={this.showClickedItem} />
                            </Col>
                            <Col className="item-container-disable-style" id='educationLevel' sm='12' md='6' lg='4'>
                                <CRMBox id='educationLevel' title='سطح تحصیلات' fabricIcon='ReminderPerson' onClick={this.showClickedItem} />
                            </Col>
                            <Col className="item-container-disable-style" id='representativeType' sm='12' md='6' lg='4'>
                                <CRMBox id='representativeType' title='انواع نمایندگان' fabricIcon='ReminderPerson' onClick={this.showClickedItem} />
                            </Col>
                            <Col className="item-container-disable-style" id='extraInfoTemplate' sm='12' md='6' lg='4'>
                                <CRMBox id='extraInfoTemplate' title='نمونه ها' fabricIcon='ReminderPerson' onClick={this.showClickedItem} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonChooseContent);