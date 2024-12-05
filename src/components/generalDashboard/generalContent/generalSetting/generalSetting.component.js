/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Row, Col, Menu } from 'antd';
import PersonContent from './person/personContent.component';
import ProductContent from './product/productContent.component';
import UserManagementContent from './userManagement/userManagementContent.component';
import SalesContent from './sales/salesContent.component'
import { setGeneralSettingContent } from '../../../../redux/shared/common/common.action';
import { checkTokenExpiration } from '../../../../redux/shared/auth/auth.action';
import UnderConstruction from '../../../shared/common/underConstruction/underConstruction.component';
//import Auth from '../../../shared/security/auth.component';
//================================================
import { initializeIcons } from "@uifabric/icons";
import { Icon } from "office-ui-fabric-react";
import CRMContent from './crm/crmContent.component'
initializeIcons();

/* #endregion */

class GeneralSetting extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            content: <h1>نمای کلی</h1>,
            isPersonDisabled: true,
            isMaterialDisabled: true,
            isMarketingDisabled: true,
            isSaleDisabled: true,
            isTransportationDisabled: true,
            isServicesDisabled: true,
            isUserManagementDisabled: true,
            isTicketDisabled: true,
            isBPMSDisabled: true,
            isCRMDisabled: true
        }
    }
    /* #endregion */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {
        this.accessToMenu(this.props.userMenuAccessList);
    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("5")) {
            this.setState({
                isPersonDisabled: false
            })
        }
        if (data.includes("6")) {
            this.setState({
                isMaterialDisabled: false
            })
        }
        if (data.includes("7")) {
            this.setState({
                isMarketingDisabled: false
            })

        }
        if (data.includes("8")) {
            this.setState({
                isCRMDisabled: false
            })
        }
        if (data.includes("9")) {
            this.setState({
                isSaleDisabled: false
            })
        }
        if (data.includes("10")) {
            this.setState({
                isTransportationDisabled: false
            })
        }
        if (data.includes("11")) {
            this.setState({
                isServicesDisabled: false
            })
        }
        if (data.includes("13")) {
            this.setState({
                isUserManagementDisabled: false
            })
        }
        if (data.includes("14")) {
            this.setState({
                isTicketDisabled: false
            })
        }
        if (data.includes("15")) {
            this.setState({
                isBPMSDisabled: false
            })
        }
    }
    /* #endregion */

    /* #region  [- handleSidebarClick -] */
    handleSidebarClick = async (e) => {
        //let test = this.props.checkTokenCounter;
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);

        switch (e.key) {

            case "1":
                return (
                    this.props.setGeneralSettingContent(''),
                    this.setState({
                        content: <PersonContent />,
                    })
                );

            case "2":
                return (
                    this.props.setGeneralSettingContent(''),
                    this.setState({
                        content: <ProductContent />,
                    })
                );

            case "4":
                return (
                    this.props.setGeneralSettingContent(''),
                    this.setState({
                        content: <UnderConstruction />,
                    })
                );

            case "5":
                return (
                    this.props.setGeneralSettingContent(''),
                    this.setState({
                        content: <SalesContent />,
                    })
                );

            case "6":
                return (
                    this.props.setGeneralSettingContent(''),
                    this.setState({
                        content: <UnderConstruction />,
                    })
                );

            case "7":
                return (
                    this.props.setGeneralSettingContent(''),
                    this.setState({
                        content: <UnderConstruction />,
                    })
                );

            case "8":
                return (
                    this.props.setGeneralSettingContent(''),
                    this.setState({
                        content: <UnderConstruction />,
                    })
                );

            case "9":
                return (
                    this.props.setGeneralSettingContent(''),
                    this.setState({
                        content: <UserManagementContent />,
                    })
                );

            case "10":
                return (
                    this.props.setGeneralSettingContent(''),
                    this.setState({
                        content: <UnderConstruction />,
                    })
                );

            case "11":
                return (
                    this.props.setGeneralSettingContent(''),
                    this.setState({
                        content: <UnderConstruction />,
                    })
                );
            case "12":
                return (
                    this.props.setGeneralSettingContent(''),
                    this.setState({
                        content: <CRMContent />,
                    })
                );
            default:
                return (
                    this.props.setGeneralSettingContent(''),
                    this.setState({
                        content: <h1>نمای کلی</h1>,
                    })
                );
        }
    }
    /* #endregion */

    /* #region  [- render() -] */
    render() {
        return (
            // <Auth>
            <Row  style={{ width: '100%', height: '100vh' }}>
              
                <Col span={4} >
                    <Menu
                        onClick={this.handleSidebarClick}
                        defaultSelectedKeys={['8']}
                        style={{
                            marginRight: '2px',
                            width: "inherit",
                            fontWeight: "bold",
                            overflowY: "scroll",
                            overflowX: "hidden",
                            backgroundColor: "#F8F8F8",
                            height: "100vh",

                        }}
                        mode="inline"
                    >
                        {/* <div style={{ lineHeight: "25px", marginLeft: "18px", marginTop: "10px" }}>
                            <h4>{this.state.customSettingTitle}</h4>
                        </div> */}
                        <Menu.ItemGroup key="g1" title="تعاریف پایه" style={{ marginTop: "15px" }}>

                            <Menu.Item key="1" name='person' disabled={this.state.isPersonDisabled}>
                                <Row style={{ marginRight: "2px" }}>
                                    <Icon
                                        id={"person"}
                                        style={{
                                            fontSize: "17px",
                                            color: "black",
                                            marginLeft: "5px",
                                        }}
                                        iconName="ReminderPerson"
                                    />
                                    <span style={{ fontSize: "13px", fontWeight: "500" }}>
                                        اشخاص
                                    </span>
                                </Row>
                            </Menu.Item>

                            <Menu.Item key="2" name='material' disabled={this.state.isMaterialDisabled}>
                                <Row style={{ marginRight: "2px" }}>
                                    <Icon
                                        id={"material"}
                                        style={{
                                            fontSize: "17px",
                                            color: "black",
                                            marginLeft: "5px",
                                        }}
                                        iconName="ProductVariant"
                                    />
                                    <span style={{ fontSize: "13px", fontWeight: "500" }}>
                                        کالا
                                    </span>
                                </Row>
                            </Menu.Item>


                        </Menu.ItemGroup>

                        <Menu.ItemGroup key="g2" title="میز کار" className='menuColor'>

                            <Menu.Item key="4" name='marketing' disabled={this.state.isMarketingDisabled}>
                                <Row style={{ marginRight: "2px" }}>
                                    <Icon
                                        id={"marketing"}
                                        style={{
                                            fontSize: "20px",
                                            color: "black",
                                            marginLeft: "5px",
                                        }}
                                        iconName="Transition"
                                    />
                                    <span style={{ fontSize: "13px", fontWeight: "500" }}>
                                        بازاریابی
                                    </span>
                                </Row>
                            </Menu.Item>

                            <Menu.Item key="12" name='crm' disabled={this.state.isCRMDisabled}>
                                <Row style={{ marginRight: "2px" }}>
                                    <Icon
                                        id={"crm"}
                                        iconName="Group"
                                        style={{
                                            color: "black",
                                            fontSize: "20px",
                                            marginLeft: "5px",
                                        }}
                                    />
                                    <span style={{ fontSize: "13px", fontWeight: "500" }}>
                                        مدیریت مشتریان
                                    </span>
                                </Row>
                            </Menu.Item>

                            <Menu.Item key="5" name='sales' disabled={this.state.isSaleDisabled}>
                                <Row style={{ marginRight: "2px" }}>
                                    <Icon
                                        id={"sales"}
                                        iconName="EngineeringGroup"
                                        style={{
                                            color: "black",
                                            fontSize: "20px",
                                            marginLeft: "5px",
                                        }}
                                    />
                                    <span style={{ fontSize: "13px", fontWeight: "500" }}>
                                        فروش
                                    </span>
                                </Row>
                            </Menu.Item>

                            <Menu.Item key="6" name='transportation' disabled={this.state.isTransportationDisabled}>
                                <Row style={{ marginRight: "2px" }}>
                                    <Icon
                                        id={"transportation"}
                                        iconName="DeliveryTruck"
                                        style={{
                                            color: "black",
                                            fontSize: "20px",
                                            marginLeft: "5px",
                                        }}
                                    />
                                    <span style={{ fontSize: "13px", fontWeight: "500", marginTop: "2px" }}>
                                        حمل و نقل
                                    </span>
                                </Row>
                            </Menu.Item>

                            <Menu.Item key="7" name='services' disabled={this.state.isServicesDisabled}>
                                <Row style={{ marginRight: "2px" }}>
                                    <Icon
                                        id={'services'}
                                        iconName="Processing"
                                        style={{
                                            color: "black",
                                            fontSize: "20px",
                                            marginLeft: "5px",
                                        }}
                                    />
                                    <span style={{ fontSize: "13px", fontWeight: "500" }}>
                                        خدمات
                                    </span>
                                </Row>
                            </Menu.Item>
                        </Menu.ItemGroup>

                        <Menu.ItemGroup key="g3" title="مدیریت">

                            <Menu.Item key="8" name='overview'>
                                <Row style={{ marginRight: "2px" }}>
                                    <Icon
                                        id={"overview"}
                                        style={{
                                            fontSize: "20px",
                                            color: "black",
                                            marginLeft: "5px",
                                        }}
                                        iconName="ViewAll"
                                    />
                                    <span style={{ fontSize: "13px", fontWeight: "500" }}>
                                        نمای کلی
                                    </span>
                                </Row>
                            </Menu.Item>

                            <Menu.Item key="9" name='userManagement' disabled={this.state.isUserManagementDisabled}>
                                <Row style={{ marginRight: "2px" }}>
                                    <Icon
                                        id={"userManagement"}
                                        style={{
                                            fontSize: "17px",
                                            color: "black",
                                            marginLeft: "5px",
                                        }}
                                        iconName="AccountManagement"
                                    />
                                    <span style={{ fontSize: "13px", fontWeight: "500" }}>
                                        مدیریت کاربران
                                    </span>
                                </Row>
                            </Menu.Item>

                            <Menu.Item key="10" name='ticket' disabled={this.state.isTicketDisabled}>
                                <Row style={{ marginRight: "2px" }}>
                                    <Icon
                                        id={"ticket"}
                                        style={{
                                            fontSize: "20px",
                                            color: "black",
                                            marginLeft: "5px",
                                        }}
                                        iconName="Send"
                                    />
                                    <span style={{ fontSize: "13px", fontWeight: "500" }}>
                                        تیکت
                                    </span>
                                </Row>
                            </Menu.Item>

                            <Menu.Item key="11" name='BPMS' disabled={this.state.isBPMSDisabled}>
                                <Row style={{ marginRight: "2px" }}>
                                    <Icon
                                        id={"BPMS"}
                                        style={{
                                            fontSize: "20px",
                                            color: "black",
                                            marginLeft: "5px",
                                        }}
                                        iconName="BranchPullRequest"
                                    />
                                    <span style={{ fontSize: "13px", fontWeight: "500" }}>
                                        BPMS
                                    </span>
                                </Row>
                            </Menu.Item>
                        </Menu.ItemGroup>
                    </Menu>
                </Col >
            
                <Col span={20} >
                    {this.state.content}
                </Col>
           
            </Row >
            // </Auth>
        );
    }
    /* #endregion */

}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        userMenuAccessList: state.auth.userMenuAccessList,
        isTokenExpired: state.auth.isTokenExpired,
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

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSetting);