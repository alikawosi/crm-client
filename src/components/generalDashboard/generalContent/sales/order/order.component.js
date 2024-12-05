/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Tabs } from "antd";
import {  Row, Col } from "reactstrap";
import { connect } from "react-redux";
import Operation from './operation/operation.component'
//import Task from './task/task.component'
//import Archive from './archive/archive.component'
import NewOrder from './operation/newOrder/newOrder.component'
import EditOrder from './operation/editOrder/editOrder.component'
import { checkTokenExpiration } from '../../../../../redux/shared/auth/auth.action';
import Notification from '../../../../shared/common/notification/notification.component';
import Timeline from './timeline/timeline.component'
import NewTimeline from './timeline/newTimeline/newTimeline.component'
import { getTimelineOrder,getTimelineData, resetNewOrderTimelineProps, resetTimelineMessage } from '../../../../../redux/sales/order/timeline/timeline.action'
import {  resetMessage } from '../../../../../redux/sales/order/order/order.action'
import { changeOrderTabKeyCounter } from '../../../../../redux/sales/order/order.action'
const { TabPane } = Tabs;
/* #endregion */

class Order extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            tabComponent: <Operation new={this.new} edit={this.edit} />,
            /* #endregion */

            /* #region  [- flags -] */

            isOperationDisabled: true,
            isTaskDisabled: true,
            isTimelineDisabled: true,
            isArchiveDisabled: true,
            /* #endregion */

            /* #region  [- grid -] */


            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        this.accessToMenu(this.props.userMenuAccessList);
    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("412")) {
            this.setState({
                isOperationDisabled: false
            })
        }
        if (data.includes("582")) {
            this.setState({
                isTimelineDisabled: false,
            })
        }
    }
    /* #endregion */

    /* #region  [- componentDidUpdate -] */
    componentDidUpdate(prevProps) {
        if (this.props.tabKeyCounter !== "") {
            if (prevProps.tabKeyCounter !== this.props.tabKeyCounter) {
                this.changeTab()
            }
        }

        if (this.props.orderMessage !== prevProps.orderMessage) {
            this.showNotification(this.props.orderMessage)
            this.props.resetMessage();
        }
        if (this.props.timelineMessage !== prevProps.timelineMessage) {
            this.showNotification(this.props.timelineMessage)
            this.props.resetTimelineMessage();
        }

    }
    /* #endregion */

    /* #region  [- new -] */
    new = () => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            tabComponent: <NewOrder />
        });
    }
    /* #endregion */

    /* #region  [- edit -] */
    edit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            tabComponent: <EditOrder />
        });

    }
    /* #endregion */

    /* #region  [- onClose -] */
    onClose = () => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            tabComponent: <Operation new={this.new} edit={this.edit} />
        });
    }
    /* #endregion */

    /* #region  [- showNotification -] */
    showNotification = (message) => {
        if (message === 'حذف با موفقیت انجام شد.') {
            Notification('bottomLeft', message, 'success');
        }
        else if (message === 'Successfully Set.') {
            Notification('bottomLeft', message, 'success');
        }
        else if (message === 'ذخیره با موفقیت انجام شد.') {
            Notification('bottomLeft', message, 'success');
        }
        else if (message === 'ویرایش با موفقیت انجام شد.') {
            Notification('bottomLeft', message, 'success');
        }
        else if (message === 'Successfully Set.') {
            Notification('bottomLeft', message, 'success');
        }
        else if (message === 'پیدا نشد.') {
            Notification('bottomLeft', message, 'error');
        }
        else if (message === 'خطایی رخ داده است.') {
            Notification('bottomLeft', message, 'error');
        }
    }
    /* #endregion */

    /* #region  [- changeTab -] */
    changeTab = async () => {
        switch (this.props.tabKeyCounter) {
            case 1:
                this.setState({
                    tabComponent: <Operation new={this.new} edit={this.edit} />
                })
                break;

            case 3:
                await this.getTimelineOrder();
                this.setState({
                    tabComponent: <Timeline newTimeline={this.newTimeline} />
                })
                break;

            default:
                break;
        }
    }
    /* #endregion */

    /* #region  [- newTimeline -] */
    newTimeline = async (orderRef) => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.props.resetNewOrderTimelineProps();
        await this.getTimelineData();
        this.setState({
            tabComponent: <NewTimeline orderRef={orderRef} />
        });
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */


    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [ - onChangeTab - ] */
    onChangeTab = async (key) => {

        if (key === "1") {
            await this.props.changeOrderTabKeyCounter(1);
            this.setState({
                tabComponent: <Operation new={this.new} edit={this.edit} />
            })
        }
        else if (key === "3") {
            await this.getTimelineOrder();
            await this.props.changeOrderTabKeyCounter(3);
            this.setState({
                tabComponent: <Timeline newTimeline={this.newTimeline} />
            })
        }
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getTimelineData() -] */
    getTimelineData = async () => {
        let data = {
            domainRef: this.props.domain,
        }
        await this.props.getTimelineData(JSON.stringify(data));
    }
    /* #endregion */

    /* #region  [- getTimelineOrder -] */
    getTimelineOrder = async () => {
        let data = {
            domainRef: this.props.domain
        }
        await this.props.getTimelineOrder(JSON.stringify(data))
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <div  style={{ padding: '0 2%',height:'93vh',overflow:'hidden scroll' }}>

                <Row name='row_01_Header' style={{ borderBottom: '1px solid #0000001a' }} >
                    <Col style={{ direction: 'rtl', textAlign: 'right', padding: '0', margin: '0' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '25px' }}>سفارش</span>
                    </Col>
                </Row>

                <Row name="row_02_Tabs" style={{ direction: 'rtl' }}>
                    <Tabs
                        style={{ padding: "0", width: "100%" }}
                        defaultActiveKey="1"
                        onChange={this.onChangeTab}
                    >
                        <TabPane tab="عملیات" key="1" disabled={this.state.isOperationDisabled}>

                            {this.state.tabComponent}
                        </TabPane>

                        <TabPane tab="وظایف" key="2" disabled={this.state.isTaskDisabled}>
                            <Row>
                                <Col >

                                    {this.state.tabComponent}

                                </Col>
                            </Row>
                        </TabPane>

                        <TabPane tab="پیشینه" key="3" disabled={this.state.isTimelineDisabled}>
                            <Row>
                                <Col >

                                    {this.state.tabComponent}

                                </Col>
                            </Row>
                        </TabPane>

                        <TabPane tab="آرشیو" key="4" disabled={this.state.isArchiveDisabled}>
                            <Row>
                                <Col >

                                    {this.state.tabComponent}

                                </Col>
                            </Row>
                        </TabPane>

                    </Tabs>
                </Row>

            </div>
        );
    }
    /* #endregion */

    /* #endregion */

}


/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        checkTokenCounter: state.auth.checkTokenCounter,
        domain: state.auth.domain,
        userMenuAccessList: state.auth.userMenuAccessList,
        tabKeyCounter: state.mainOrder.tabKeyCounter,
        orderMessage: state.order.message,
        timelineMessage: state.orderTimeline.message,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    resetMessage: (data) => dispatch(resetMessage(data)),
    getTimelineData: (data) => dispatch(getTimelineData(data)),
    resetNewOrderTimelineProps: (data) => dispatch(resetNewOrderTimelineProps(data)),
    resetTimelineMessage: (data) => dispatch(resetTimelineMessage(data)),
    getTimelineOrder: (data) => dispatch(getTimelineOrder(data)),
    changeOrderTabKeyCounter: (data) => dispatch(changeOrderTabKeyCounter(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Order);