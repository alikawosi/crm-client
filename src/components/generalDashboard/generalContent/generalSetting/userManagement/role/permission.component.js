
/* #region  [- imports -] */
import React, { Component, PureComponent } from 'react';
import { Container, Row, Col, Button } from "reactstrap";
import { Switch } from 'antd';
import { connect } from "react-redux";
import { postRole } from '../../../../../redux/actions/generalDashboard/generalSetting/userManagement/role/role.action'

/* #endregion */

class Permission extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            isCheckedOrganization: false,
            isCheckedSetting: false,
            isCheckedTicket: false,
            isCheckedOrganizationChange: false,
            isCheckedOrganizationDelete: false,
            isCheckedOrganizationChangeHidden: true,
            isCheckedOrganizationDeleteHidden: true,
            isCheckedSettingHidden: true,
            isCheckedUserManagementHidden: true,
            isCheckedSettingOBSChange: false,
            isCheckedSettingOBSDelete: false,
            isCheckedSettingOBSPrint: false,
            isCheckedSettingUserManagementRoleChange: false,
            isCheckedSettingUserManagementRoleDelete: false,
            isCheckedSettingUserManagementRolePrint: false,
            isCheckedSettingOBSChangeHidden: true,
            isCheckedSettingOBSDeleteHidden: true,
            isCheckedSettingOBSPrintHidden: true,
            isCheckedUserManagementRoleChangeHidden: true,
            isCheckedUserManagementRoleDeleteHidden: true,
            isCheckedUserManagementRolePrintHidden: true,
            isCheckedUserManagementRoleHidden: true,
            isCheckedUserManagementUserHidden: true,
            isCheckedSettingUserManagementUser: false,
            isCheckedUserManagementUserChangeHidden: true,
            isCheckedSettingUserManagementUserChange: false,
            isCheckedUserManagementUserDeleteHidden: true,
            isCheckedSettingUserManagementUserDelete: false,
            isCheckedUserManagementUserPrintHidden: true,
            isCheckedSettingUserManagementUserPrint: false,
            isCheckedSettingTicketHidden: true,
            isCheckedSettingTicket: false,
            isCheckedUserManagementUserBlockHidden: true,
            isCheckedSettingUserManagementUserBlock: false,
            sourceList: []
        }
    }
    /* #endregion */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {
        this.props.onRef(this);
    }
    /* #endregion */

    /* #region  [- UNSAFE_componentWillUnMount() -] */
    UNSAFE_componentWillUnMount() {
        this.props.onRef(undefined)
    }
    /* #endregion */

    /* #region  [- handleChange -] */
    handleChange = (e, key) => {
        switch (key) {

            case "organization":
                this.state.sourceList.push({ sourceId: 2 }, { sourceId: 3 })

                if (e === true) {
                    this.setState({
                        isCheckedOrganizationChangeHidden: false,
                        isCheckedOrganizationDeleteHidden: false,
                        isCheckedOrganization: e
                    })
                }
                else {
                    this.setState({
                        isCheckedOrganizationChangeHidden: true,
                        isCheckedOrganizationDeleteHidden: true,
                        isCheckedOrganization: e,
                        isCheckedOrganizationChange: false,
                        isCheckedOrganizationDelete: false,
                    })
                }


                break;

            case "organizationChange":
                this.state.sourceList.push({ sourceId: 4 }, { sourceId: 5 }, { sourceId: 6 }, { sourceId: 7 })
                this.setState({
                    isCheckedOrganizationChange: e
                })

                break;

            case "organizationDelete":
                this.state.sourceList.push({ sourceId: 8 }, { sourceId: 9 })

                this.setState({
                    isCheckedOrganizationDelete: e
                })

                break;

            case "setting":
                this.state.sourceList.push({ sourceId: 10 })

                if (e === true) {
                    this.setState({
                        isCheckedSetting: e,
                        isCheckedSettingHidden: false,
                        isCheckedSettingTicketHidden: false,
                        isCheckedUserManagementHidden: false,
                        isCheckedSettingOBSChangeHidden: true,
                        isCheckedSettingOBSDeleteHidden: true,
                        isCheckedSettingOBSPrintHidden: true,
                        isCheckedUserManagementRoleChangeHidden: true,
                        isCheckedUserManagementRoleDeleteHidden: true,
                        isCheckedUserManagementRolePrintHidden: true,
                    })
                }
                else {
                    this.setState({
                        isCheckedSetting: e,
                        isCheckedSettingHidden: true,
                        isCheckedUserManagementHidden: true,
                        isCheckedSettingOBSChange: false,
                        isCheckedSettingOBSDelete: false,
                        isCheckedSettingOBSPrint: false,
                        isCheckedSettingUserManagementRoleChange: false,
                        isCheckedSettingUserManagementRoleDelete: false,
                        isCheckedSettingUserManagementRolePrint: false,
                        isCheckedSettingOBS: false,
                        isCheckedSettingUserManagement: false,
                        isCheckedSettingOBSChangeHidden: true,
                        isCheckedSettingOBSDeleteHidden: true,
                        isCheckedSettingOBSPrintHidden: true,
                        isCheckedUserManagementRoleChangeHidden: true,
                        isCheckedUserManagementRoleDeleteHidden: true,
                        isCheckedUserManagementRolePrintHidden: true,
                        isCheckedUserManagementRoleChangeHidden: true,
                        isCheckedUserManagementRoleDeleteHidden: true,
                        isCheckedUserManagementRolePrintHidden: true,
                        isCheckedUserManagementRoleHidden: true,
                        isCheckedUserManagementUserHidden: true,
                        isCheckedSettingUserManagementUser: false,
                        isCheckedSettingUserManagementRole: false,
                        isCheckedUserManagementUserChangeHidden: true,
                        isCheckedSettingUserManagementUserChange: false,
                        isCheckedUserManagementUserDeleteHidden: true,
                        isCheckedSettingUserManagementUserDelete: false,
                        isCheckedUserManagementUserPrintHidden: true,
                        isCheckedSettingUserManagementUserPrint: false,
                        isCheckedSettingTicketHidden: true,
                        isCheckedSettingTicket: false,
                        isCheckedUserManagementUserBlockHidden: true,
                        isCheckedSettingUserManagementUserBlock: false,
                    })
                }

                break;

            case "settingOBS":
                this.state.sourceList.push({ sourceId: 11 }, { sourceId: 12 })

                if (e === true) {
                    this.setState({
                        isCheckedSettingOBS: e,
                        isCheckedSettingOBSChangeHidden: false,
                        isCheckedSettingOBSDeleteHidden: false,
                        isCheckedSettingOBSPrintHidden: false,
                    })
                }
                else {
                    this.setState({
                        isCheckedSettingOBS: e,
                        isCheckedSettingOBSChangeHidden: true,
                        isCheckedSettingOBSDeleteHidden: true,
                        isCheckedSettingOBSPrintHidden: true,
                        isCheckedSettingOBSChange: false,
                        isCheckedSettingOBSDelete: false,
                        isCheckedSettingOBSPrint: false,
                    })
                }

                break;

            case "settingOBSChange":
                this.state.sourceList.push({ sourceId: 13 }, { sourceId: 14 }, { sourceId: 15 }, { sourceId: 16 })

                this.setState({
                    isCheckedSettingOBSChange: e,
                })
                break;

            case "settingOBSDelete":
                this.state.sourceList.push({ sourceId: 17 }, { sourceId: 18 })

                this.setState({
                    isCheckedSettingOBSDelete: e,
                })
                break;

            case "settingOBSPrint":
                this.state.sourceList.push({ sourceId: 19 }, { sourceId: 20 })

                this.setState({
                    isCheckedSettingOBSPrint: e,
                })
                break;

            case "settingUserManagement":
                this.state.sourceList.push({ sourceId: 21 })

                if (e === true) {
                    this.setState({
                        isCheckedSettingUserManagement: e,
                        isCheckedUserManagementRoleHidden: false,
                        isCheckedUserManagementUserHidden: false
                    })
                }
                else {
                    this.setState({
                        isCheckedSettingUserManagement: e,
                        isCheckedSettingUserManagementRole: false,
                        isCheckedSettingUserManagementUser: false,
                        isCheckedUserManagementRoleHidden: true,
                        isCheckedUserManagementRoleChangeHidden: true,
                        isCheckedUserManagementRoleDeleteHidden: true,
                        isCheckedUserManagementRolePrintHidden: true,
                        isCheckedSettingUserManagementRoleChange: false,
                        isCheckedSettingUserManagementRoleDelete: false,
                        isCheckedSettingUserManagementRolePrint: false,
                        isCheckedUserManagementUserHidden: true,
                        isCheckedUserManagementUserChangeHidden: true,
                        isCheckedUserManagementUserDeleteHidden: true,
                        isCheckedUserManagementUserPrintHidden: true,
                        isCheckedSettingUserManagementUserChange: false,
                        isCheckedSettingUserManagementUserDelete: false,
                        isCheckedSettingUserManagementUserPrint: false,
                        isCheckedUserManagementUserBlockHidden: true,
                        isCheckedSettingUserManagementUserBlock: false,
                    })
                }

                break;

            case "settingUserManagementRole":
                this.state.sourceList.push({ sourceId: 22 }, { sourceId: 23 })

                if (e === true) {
                    this.setState({
                        isCheckedSettingUserManagementRole: e,
                        isCheckedUserManagementRoleChangeHidden: false,
                        isCheckedUserManagementRoleDeleteHidden: false,
                        isCheckedUserManagementRolePrintHidden: false,
                    })
                }
                else {
                    this.setState({
                        isCheckedSettingUserManagementRole: e,
                        isCheckedUserManagementRoleChangeHidden: true,
                        isCheckedUserManagementRoleDeleteHidden: true,
                        isCheckedUserManagementRolePrintHidden: true,
                        isCheckedSettingUserManagementRoleChange: false,
                        isCheckedSettingUserManagementRoleDelete: false,
                        isCheckedSettingUserManagementRolePrint: false,
                    })
                }
                break;

            case "settingUserManagementRoleChange":
                this.state.sourceList.push({ sourceId: 24 }, { sourceId: 25 }, { sourceId: 26 }, { sourceId: 27 })

                this.setState({
                    isCheckedSettingUserManagementRoleChange: e,
                })
                break;

            case "settingUserManagementRoleDelete":
                this.state.sourceList.push({ sourceId: 28 }, { sourceId: 29 })

                this.setState({
                    isCheckedSettingUserManagementRoleDelete: e,
                })
                break;

            case "settingUserManagementRolePrint":
                this.state.sourceList.push({ sourceId: 189 }, { sourceId: 190 })

                this.setState({
                    isCheckedSettingUserManagementRolePrint: e,
                })
                break;

            case "settingUserManagementUser":
                this.state.sourceList.push({ sourceId: 30 }, { sourceId: 31 })

                if (e === true) {
                    this.setState({
                        isCheckedSettingUserManagementUser: e,
                        isCheckedUserManagementUserChangeHidden: false,
                        isCheckedUserManagementUserDeleteHidden: false,
                        isCheckedUserManagementUserPrintHidden: false,
                        isCheckedUserManagementUserBlockHidden: false
                    })
                }
                else {
                    this.setState({
                        isCheckedSettingUserManagementUser: e,
                        isCheckedUserManagementUserChangeHidden: true,
                        isCheckedUserManagementUserDeleteHidden: true,
                        isCheckedUserManagementUserPrintHidden: true,
                        isCheckedSettingUserManagementUserChange: false,
                        isCheckedSettingUserManagementUserDelete: false,
                        isCheckedSettingUserManagementUserPrint: false,
                        isCheckedUserManagementUserBlockHidden: true,
                        isCheckedSettingUserManagementUserBlock: false,
                    })
                }
                break;

            case "settingUserManagementUserChange":
                this.state.sourceList.push({ sourceId: 32 }, { sourceId: 33 }, { sourceId: 34 }, { sourceId: 35 })

                this.setState({
                    isCheckedSettingUserManagementUserChange: e,
                })
                break;

            case "settingUserManagementUserDelete":
                this.state.sourceList.push({ sourceId: 36 }, { sourceId: 37 })

                this.setState({
                    isCheckedSettingUserManagementUserDelete: e,
                })
                break;

            case "settingUserManagementUserPrint":
                this.state.sourceList.push({ sourceId: 40 }, { sourceId: 41 })

                this.setState({
                    isCheckedSettingUserManagementUserPrint: e,
                })
                break;

            case "settingUserManagementUserBlock":
                this.state.sourceList.push({ sourceId: 38 }, { sourceId: 39 })

                this.setState({
                    isCheckedSettingUserManagementUserBlock: true,
                })

                break;

            case "settingTicket":
                this.state.sourceList.push({ sourceId: 42 })

                this.setState({
                    isCheckedSettingTicket: e,
                })
                break;

            case "ticket":
                this.state.sourceList.push({ sourceId: 43 })

                this.setState({
                    isCheckedTicket: e,
                })
                break;


            default:
                break;
        }

    }
    /* #endregion */

    /* #region  [- postRole -] */
    postRole = async() => {
        let data = {
            roleList: this.props.roleList,
            sourceList: this.state.sourceList
        }

       await this.props.postRole(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (

            <div>
                <div title="organozation" className="item-container">
                    Organization
                    <Switch checked={this.state.isCheckedOrganization} onChange={e => { this.handleChange(e, "organization") }} className="switch" />
                    <div className="item-container" hidden={this.state.isCheckedOrganizationChangeHidden} >
                        Change
                        <Switch checked={this.state.isCheckedOrganizationChange} onChange={e => { this.handleChange(e, "organizationChange") }} className="switch" />

                    </div>
                    <div className="item-container" hidden={this.state.isCheckedOrganizationDeleteHidden}>
                        Delete
                        <Switch checked={this.state.isCheckedOrganizationDelete} onChange={e => { this.handleChange(e, "organizationDelete") }} className="switch" />

                    </div>

                </div>

                <div title="setting" className="item-container">
                    Setting
                    <Switch checked={this.state.isCheckedSetting} onChange={e => { this.handleChange(e, "setting") }} className="switch" />

                    <div title="obs" hidden={this.state.isCheckedSettingHidden} className="item-container">
                        OBS
                        <Switch checked={this.state.isCheckedSettingOBS} onChange={e => { this.handleChange(e, "settingOBS") }} className="switch" />
                        <div className="item-container" hidden={this.state.isCheckedSettingOBSChangeHidden}>
                            Change
                            <Switch checked={this.state.isCheckedSettingOBSChange} onChange={e => { this.handleChange(e, "settingOBSChange") }} className="switch" />

                        </div>
                        <div className="item-container" hidden={this.state.isCheckedSettingOBSDeleteHidden}>
                            Delete
                            <Switch checked={this.state.isCheckedSettingOBSDelete} onChange={e => { this.handleChange(e, "settingOBSDelete") }} className="switch" />

                        </div>
                        <div className="item-container" hidden={this.state.isCheckedSettingOBSPrintHidden} >
                            Print
                            <Switch checked={this.state.isCheckedSettingOBSPrint} onChange={e => { this.handleChange(e, "settingOBSPrint") }} className="switch" />

                        </div>
                    </div>

                    <div title="userManagement" hidden={this.state.isCheckedUserManagementHidden} className="item-container">
                        User Management
                        <Switch checked={this.state.isCheckedSettingUserManagement} onChange={e => { this.handleChange(e, "settingUserManagement") }} className="switch" />

                        <div title="role" hidden={this.state.isCheckedUserManagementRoleHidden} className="item-container">
                            Role
                        <Switch checked={this.state.isCheckedSettingUserManagementRole} onChange={e => { this.handleChange(e, "settingUserManagementRole") }} className="switch" />
                            <div className="item-container" hidden={this.state.isCheckedUserManagementRoleChangeHidden}>
                                Change
                                <Switch checked={this.state.isCheckedSettingUserManagementRoleChange} onChange={e => { this.handleChange(e, "settingUserManagementRoleChange") }} className="switch" />

                            </div>
                            <div className="item-container" hidden={this.state.isCheckedUserManagementRoleDeleteHidden}>
                                Delete
                                <Switch checked={this.state.isCheckedSettingUserManagementRoleDelete} onChange={e => { this.handleChange(e, "settingUserManagementRoleDelete") }} className="switch" />

                            </div>
                            <div className="item-container" hidden={this.state.isCheckedUserManagementRolePrintHidden}>
                                Print
                                <Switch checked={this.state.isCheckedSettingUserManagementRolePrint} onChange={e => { this.handleChange(e, "settingUserManagementRolePrint") }} className="switch" />

                            </div>


                        </div>

                        <div title="user" hidden={this.state.isCheckedUserManagementUserHidden} className="item-container">
                            User
                        <Switch checked={this.state.isCheckedSettingUserManagementUser} onChange={e => { this.handleChange(e, "settingUserManagementUser") }} className="switch" />
                            <div className="item-container" hidden={this.state.isCheckedUserManagementUserChangeHidden}>
                                Change
                                <Switch checked={this.state.isCheckedSettingUserManagementUserChange} onChange={e => { this.handleChange(e, "settingUserManagementUserChange") }} className="switch" />

                            </div>
                            <div className="item-container" hidden={this.state.isCheckedUserManagementUserDeleteHidden}>
                                Delete
                                <Switch checked={this.state.isCheckedSettingUserManagementUserDelete} onChange={e => { this.handleChange(e, "settingUserManagementUserDelete") }} className="switch" />

                            </div>
                            <div className="item-container" hidden={this.state.isCheckedUserManagementUserPrintHidden}>
                                Print
                                <Switch checked={this.state.isCheckedSettingUserManagementUserPrint} onChange={e => { this.handleChange(e, "settingUserManagementUserPrint") }} className="switch" />

                            </div>
                            <div className="item-container" hidden={this.state.isCheckedUserManagementUserBlockHidden}>
                                Block
                                <Switch checked={this.state.isCheckedSettingUserManagementUserBlock} onChange={e => { this.handleChange(e, "settingUserManagementUserBlock") }} className="switch" />

                            </div>


                        </div>


                    </div>

                    <div title="settingTicket" hidden={this.state.isCheckedSettingTicketHidden} className="item-container">
                        Ticket
                    <Switch checked={this.state.isCheckedSettingTicket} onChange={e => { this.handleChange(e, "settingTicket") }} className="switch" />

                    </div>

                </div>

                <div title="ticket" className="item-container">
                    Ticket
                    <Switch checked={this.state.isCheckedTicket} onChange={e => { this.handleChange(e, "ticket") }} className="switch" />

                </div>


            </div>



        );
    }
    /* #endregion */

}

/* #region  [ - mapStateToProps - ] */
const mapStateToProps = (state) => {
    return {
        roleItem: state.role.roleItem
    };
};

/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = (dispatch) => ({
    postRole: (data) => dispatch(postRole(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Permission);
