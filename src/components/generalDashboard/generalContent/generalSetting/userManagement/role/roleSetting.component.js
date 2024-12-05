/* #region  [- imports -] */
import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";
import { Tabs } from "antd";
import { connect } from "react-redux";
import { checkTokenExpiration } from "../../../../../../redux/shared/auth/auth.action";
import Permission from './permission/permission.component'
import Members from './member/member.component'
import Setting from './setting/setting.component'
import { getRolePermission, getRoleMember, getRoleItem,resetProps }
    from '../../../../../../redux/account/account.action'
    import Notification from "../../../../../shared/common/notification/notification.component";

const { TabPane } = Tabs;

/* #endregion */

class RoleSetting extends Component {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            tabComponent: <Permission />,
        }
    }
    /* #endregion */

    /* #region  [*** methods ***]  */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    async componentDidMount() {
        await this.getRolePermission()
    }
    /* #endregion */

    /* #region  [- componentDidUpdate -] */
    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            if (this.props.message === "حذف با موفقیت انجام شد.") {
                Notification("bottomRight", this.props.message, "success");
            }
            else if (this.props.message === "ویرایش با موفقیت انجام شد.") {
                Notification("bottomRight", this.props.message, "success");
            }
            else if (this.props.message === "تغییرات اعمال گردید.") {
                Notification("bottomRight", this.props.message, "success");
            }
            else if (this.props.message === "خطایی رخ داده است.") {
                Notification("bottomRight", this.props.message, "error");
            }
            else if (this.props.message === "کاربر به گروه پیوست.") {
                Notification("bottomRight", this.props.message, "success");
            }
            else if (this.props.message === "کاربر از گروه حذف شد.") {
                Notification("bottomRight", this.props.message, "success");
            }
            this.props.resetProps();

        }
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api  ***] */

    /* #region  [- getRolePermission -] */
    getRolePermission = async () => {
        let data = {
            roleId: this.props.roleId
        }

        await this.props.getRolePermission(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getRoleMember -] */
    getRoleMember = async () => {
        let data = {
            roleId: this.props.roleId
        }

        await this.props.getRoleMember(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getRoleItem -] */
    getRoleItem = async () => {
        let data = {
            roleId: this.props.roleId
        }

        await this.props.getRoleItem(JSON.stringify(data))
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** buttonTasks ***] */


    /* #endregion */

    /* #region  [*** Handle Changes ***] */

    /* #region  [ - onChangeTab - ] */
    onChangeTab = async (key) => {
        this.setState({ tabNumber: key })
        if (key === "1") {
            await this.getRolePermission()
            this.setState({
                tabComponent: <Permission />
            })
        }
        else if (key === "2") {
            await this.getRoleMember()
            this.setState({
                tabComponent: <Members />
            })
        }
        else if (key === "3") {
            await this.getRoleItem()
            this.setState({
                tabComponent: <Setting />
            })
        }

    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {
        return (
            <Container fluid className='reacstrap-container' style={{ padding: '0' ,overflowY: 'scroll'}} >

                <Row name='row_01_Header' className='content-header-row' style={{ margin: '0 0 1% 0', padding: '0' }}>
                    <Col className='content-header-col'>
                        <p className='content-header-title'>تنظیمات گروه </p>
                    </Col>
                </Row>

                <Row name='row_02_Buttons'  style={{ margin: '0',paddingRight:'1%' }}>
                    <Tabs
                        style={{ padding: "0", width: "100%" }}
                        defaultActiveKey="1"
                        onChange={this.onChangeTab}
                    >
                        
                        <TabPane tab="دسترسی " key="1">
                            <Row>
                                <Col sm="4">

                                    {this.state.tabComponent}

                                </Col>
                            </Row>

                        </TabPane>
                        
                        <TabPane tab="اعضا" key="2" >
                            
                            {this.state.tabComponent}
                        </TabPane>
                        
                        <TabPane tab="تنظیمات" key="3" >
                            {this.state.tabComponent}
                        </TabPane>
                    
                    </Tabs>
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
        accessLevelList: state.auth.accessLevelList,
        domain: state.auth.domain,
        checkTokenCounter: state.auth.checkTokenCounter,
        roleId: state.account.roleId,
        message: state.account.message
    };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getRolePermission: (data) => dispatch(getRolePermission(data)),
    getRoleMember: (data) => dispatch(getRoleMember(data)),
    getRoleItem: (data) => dispatch(getRoleItem(data)),
    resetProps: () => dispatch(resetProps()),


});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(RoleSetting);