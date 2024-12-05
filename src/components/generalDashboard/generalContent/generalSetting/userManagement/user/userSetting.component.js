/* #region  [- imports -] */
import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";
import { Tabs } from "antd";
import { connect } from "react-redux";
import { checkTokenExpiration } from "../../../../../../redux/shared/auth/auth.action";
import Permission from './permission/permission.component'
import MemberOf from './memberof/memberof.component'
import Setting from './setting/setting.component'
import { getUserRole, getUserPermission, getUserItem,resetProps }
    from '../../../../../../redux/account/account.action'
import Notification from "../../../../../shared/common/notification/notification.component";

const { TabPane } = Tabs;

/* #endregion */

class UserSetting extends Component {

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
    componentDidMount() {
        //await this.getRolePermission()
    }
    /* #endregion */

    /* #region  [- componentDidUpdate -] */
    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            if (this.props.message === "ویرایش با موفقیت انجام شد.") {
                Notification("bottomRight", this.props.message, "success");
            }
            else if (this.props.message === "کاربر با موفقیت به گروه پیوست.") {
                Notification("bottomRight", this.props.message, "success");
            }
            else if (this.props.message === "کاربر با موفقیت از گروه حدف شد.") {
                Notification("bottomRight", this.props.message, "success");
            }
            else if (this.props.message === "تغییرات اعمال گردید.") {
                Notification("bottomRight", this.props.message, "success");
            }
            else if (this.props.message === "خطایی رخ داده است.") {
                Notification("bottomRight", this.props.message, "error");
            }
            this.props.resetProps();
        }

    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api  ***] */

    /* #region  [- getUserRole -] */
    getUserRole = async () => {
        let data = {
            userRef: this.props.userId
        }

        await this.props.getUserRole(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getUserPermission -] */
    getUserPermission = async () => {

        let data = {
            userRef: this.props.userId
        }
        await this.props.getUserPermission(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getUserItem -] */
    getUserItem = async () => {
        let data = {
            userRef: this.props.userId,
            domainRef:this.props.domain
        }
        await this.props.getUserItem(JSON.stringify(data))
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
            await this.getUserPermission()
            this.setState({
                tabComponent: <Permission />
            })
        }
        else if (key === "2") {
            await this.getUserRole()
            this.setState({
                tabComponent: <MemberOf />
            })
        }
        else if (key === "3") {
            await this.getUserItem()
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
            <Container fluid className='reacstrap-container' style={{ padding: '0',overflowY: 'scroll' }} >

                <Row name='row_01_Header' className='content-header-row' style={{ margin: '0 0 1% 0', padding: '0' }}>
                    <Col className='content-header-col'>
                        <p className='content-header-title'>تنظیمات کاربر </p>
                    </Col>
                </Row>

                <Row name='row_02_Buttons' style={{ margin: '0', paddingRight: '1%', }}>
                    <Tabs
                        style={{ padding: "0", width: "100%" }}
                        defaultActiveKey="1"
                        onChange={this.onChangeTab}
                    >
                        <TabPane tab="دسترسی " key="1" >
                            <Row  >
                                <Col sm="4" >

                                    {this.state.tabComponent}

                                </Col>
                            </Row>

                        </TabPane>

                        <TabPane tab="گروه ها" key="2" >

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
        userId: state.account.userId,
        userName: state.account.userName,
        message: state.account.message,
    };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getUserRole: (data) => dispatch(getUserRole(data)),
    getUserPermission: (data) => dispatch(getUserPermission(data)),
    getUserItem: (data) => dispatch(getUserItem(data)),
    resetProps: () => dispatch(resetProps()),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(UserSetting);