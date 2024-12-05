/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import logo from "../../../../../src/logo.png";
import { Link } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { initializeIcons } from "@uifabric/icons";
import { Icon } from "office-ui-fabric-react";
import { withRouter } from "react-router";
import { signOut, getPersonItem } from '../../../../redux/account/account.action';
import './crmNavbar.component.css';
import { Col, Row, } from 'reactstrap'
initializeIcons();

/* #endregion */

class CRMNavbar extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userNameAbbreviation: '',
            email: '',
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {
        //setTimeout(this.generateUserInformation(), 3000);
        //this.generateUserInformation()
    }
    /* #endregion */

    /* #region  [- componentDidUpdate -] */
    componentDidUpdate(prevProps) {
        // if (this.props.userName !== prevProps.userName) {
        // this.generateUserInformation()
        // }
    }

    /* #endregion */

    /* #region  [ - toggleUserProfile - ] */
    toggleUserProfile = () => {
        document.getElementById("userDropdown").classList.toggle("show");
    };
    /* #endregion */

    /* #region  [- signOut -] */
    signOut = async () => {
        localStorage.clear();
        await this.props.signOut();
        this.props.history.push("/login");
    }
    /* #endregion */

    /* #region  [- generateUserInformation() -] */
    generateUserInformation = () => {
        let userNameAbbreviation = '';
        if (this.props.userName !== '' && this.props.userName !== null) {
            let userNameLetterArray = this.props.userName.split('');
            for (let i = 0; i < userNameLetterArray.length; i++) {
                const element = userNameLetterArray[i];
                if (element === element.toUpperCase()) {
                    userNameAbbreviation = userNameAbbreviation.concat(element);
                }
            }
        }
        this.setState({
            userName: this.props.userName,
            userNameAbbreviation: userNameAbbreviation,
            email: this.props.email,
        })
    }
    /* #endregion */

    /* #region  [- profile -] */
    profile = async () => {

        let data = {
            aspNetUserRef: this.props.userId
        }
        await this.props.getPersonItem(JSON.stringify(data))
        await this.props.history.push("/accountDashboard");
    }
    /* #endregion */

    /* #region  [- render -] */
    render() {
        /* #region  [- consts -] */

        window.addEventListener("click", function (event) {
            if (!event.target.matches('.account-circle')) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        })
        const userSettingMenu = (
            <Menu style={{ width: "230px" }}>
                <Menu.Item style={{ marginRight: "5%" }}>
                    <Row style={{ marginTop: "5px" }} onClick={this.profile}>
                        <Icon
                            iconName="ContactInfo"
                            style={{ fontSize: "20px", marginTop: "1px" }}
                        />
                        <span style={{ fontSize: "13px", marginRight: "7px" }}>پروفایل</span>
                    </Row>
                </Menu.Item>
                <hr />
                <Menu.Item style={{ marginRight: "5%" }}>
                    <Row>
                        <Icon
                            iconName="CannedChat"
                            style={{ fontSize: "16px", marginTop: "1px" }}
                        />
                        <span style={{ fontSize: "13px", marginRight: "7px" }}>
                            اعلان
                        </span>
                    </Row>
                </Menu.Item>
            </Menu>
        );

        const helpMenu = (
            <Menu style={{ width: "230px" }}>
                <Menu.Item style={{ marginRight: "5%" }}>
                    <Row style={{ marginTop: "5px" }}>
                        <Icon
                            iconName="ReadingMode"
                            style={{ fontSize: "16px", marginTop: "1px" }}
                        />
                        <span style={{ fontSize: "13px", marginRight: "7px" }}>
                            شروع
                        </span>
                    </Row>
                </Menu.Item>
                <hr />
            </Menu>
        );

        let userNameAbbreviation = '';
        if (this.props.userName !== '' && this.props.userName !== null) {
            let userNameLetterArray = this.props.userName.split('');
            for (let i = 0; i < userNameLetterArray.length; i++) {
                const element = userNameLetterArray[i];
                if (element === element.toUpperCase()) {
                    userNameAbbreviation = userNameAbbreviation.concat(element);
                }
            }
        }

        /* #endregion */
        return (
            <nav id="navbar" className="navbar navbar-light bg-light fixed-top bg-white" style={{ width: "100%", borderBottom: "1px solid rgb(0,0,0,.1)", zIndex: "990", height: "7vh", direction: 'rtl', padding: '0px' }}>
                <Row style={{ width: "100%", }}>

                    <Col name='logo'          className="col-7"  sm='2' md='2' lg='1' style={{float:'right'}}>
                        <Link to="/generalDashboard">
                            <img src={logo} alt='logo' style={{ width: '100px' }} />
                        </Link>
                    </Col>
                    <Col name='freeSpace'     className="col-1"  sm='1' md='7' lg='9'></Col>
                    <Col name='leftSideItems' className="col-4"  sm='9' md='3' lg='2' style={{ float: 'left' }} >
                        <Row   style={{ float: 'left', textAlign: 'center' }}>

                            <Col  className="col-4" sm='4' md='4' lg='4' style={{ padding: '4px 0 0 0', textAlign: 'center' }}>
                                <Dropdown overlay={helpMenu} trigger={["click"]} style={{ cursor: "pointer" }}  >
                                    <Icon iconName="Unknown" style={{ fontSize: "16px", cursor: "pointer", }} />
                                </Dropdown>
                            </Col>

                            <Col  className="col-4" sm='4' md='4' lg='4' style={{ paddingTop: '4px' }}>
                                <Dropdown overlay={userSettingMenu} trigger={["click"]} style={{ cursor: "pointer" }} >
                                    <Icon iconName="PlayerSettings" style={{ fontSize: "16px" }} />
                                </Dropdown>
                            </Col>

                            <Col  className="col-4" sm='4' md='4' lg='4' style={{paddingLeft:'20px'}}>
                                <div onClick={this.toggleUserProfile} className="account-circle" style={{ textAlign: 'center',paddingTop:'6px',fontSize:'12px' }}>
                                    {userNameAbbreviation}
                                </div>
                            </Col>

                        </Row>
                    </Col>

                </Row>
             
                <div id="userDropdown" className="dropdown-content" style={{ width: "320", height: "245", overflow: 'hidden' }} >

                    <div style={{ height: "17px", width: "inherit", display: "flex", flexWrap: "wrap" }} >
                        <div style={{ width: "70%", textAlign: "right", padding: "10px 20px", fontFamily: "Segoe UI", }} >
                            <p style={{ fontSize: "13", marginLeft: "17px" }}>CRMMonde</p>
                        </div>
                        <div id="signout" className="signout" style={{ width: "30%", cursor: "pointer", padding: "10px 20px", fontFamily: "Segoe UI", }} onClick={this.signOut}>
                            <p id="psignout" className="psignout" style={{ fontSize: "13" }}> خروج </p>
                        </div>
                    </div>

                    <div style={{ height: "110px", width: "inherit", display: "flex", flexWrap: "wrap", marginTop: "25px", }} >
                       
                            <div style={{width:'100px',paddingRight:'10px'}}>
                                <div
                                    style={{
                                        width: "48",
                                        height: "48",
                                        //backgroundColor: "#D93C1A",
                                        fontSize: "13.71px",
                                        fontFamily: "Segoe UI",
                                    }}
                                    className="account-circle-big"
                                >
                                    {userNameAbbreviation}
                                    {/* <Icon
                                        iconName="UserFollowed"
                                        style={{ fontSize: "15px" }}
                                    /> */}
                                </div>
                            </div>
                            <div  style={{width:'150px',paddingRight:'10px'}}>
                                <h5 style={{ textAlign: "right", fontWeight: "bold", fontSize: "18px", fontFamily: "Segoe UI", }}>
                                    <span
                                        title={this.props.userName.length > 18 ? this.props.userName : ''} >
                                        {this.props.userName.length > 13 ? this.props.userName.substring(0, 13) + "..." : this.props.userName}
                                    </span>
                                </h5>
                                <div style={{ textAlign: "left", fontSize: "13px", width: "19px", fontFamily: "Segoe UI", marginTop: "3px", marginLeft: "15px", }}>
                                    <span
                                        title={this.props.email.length > 18 ? this.props.email : ''}>
                                        {this.props.email.length > 18 ?  "..."+this.props.email.substring(0, 18)  : this.props.email}
                                    </span>
                                </div>
                                <div
                                    style={{
                                        pointerEvents: "none",
                                        textAlign: "right",
                                        fontSize: "13px",
                                        fontFamily: "Segoe UI",
                                        marginLeft: "15px",
                                    }}
                                >
                                    <a href="index.html" target="_blank">
                                        اکانت
                                    </a>
                                </div>
                                <div
                                    style={{
                                        pointerEvents: "none",
                                        textAlign: "right",
                                        fontSize: "13px",
                                        fontFamily: "Segoe UI",
                                        marginLeft: "15px",
                                    }}
                                >
                                   <a href="index.html" target="_blank">
                                            پروفایل
                                        </a>
                                 
                                </div>
                            </div>
                        
                    </div>

                    <br />

                    <div style={{ height: "60px" }}>
                        <hr />
                        <Row style={{ height: "60px",paddingRight:'10px' }}>
                            <Icon
                                iconName="AddFriend"
                                style={{ fontSize: "23px", marginRight: "20px", }} />
                            <p style={{ pointerEvents: "none", marginTop: "8px", marginRight: "10px", fontSize: "12px", fontFamily: "Segoe UI", cursor: "pointer", }}>
                                ورود با اکانت دیگر
                            </p>
                        </Row>
                    </div>

                </div>


            </nav>
        );
    }
    /* #endregion */

    /* #endregion */

}

/* #region  [- mapStateToProps -] */
const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        userId: state.auth.userId,
        email: state.auth.email,
    };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = (dispatch) => ({
    signOut: (data) => dispatch(signOut(data)),
    getPersonItem: (data) => dispatch(getPersonItem(data)),
});
/* #endregion */

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CRMNavbar));