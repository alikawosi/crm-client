/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Tabs } from "antd";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import Operation from './operation/operation.component'
//import Task from './task/task.component'
//import Archive from './archive/archive.component'
import NewInvoice from './operation/newInvoice/newInvoice.component'
import EditInvoice from './operation/editInvoice/editInvoice.component'
import Requisition from './requisition/requisition.component'
import NewRequisitionOnWarehouse from './requisition/newRequisition/newRequisitionOnWarehouse.component'
import NewRequisitionOnProduct from './requisition/newRequisition/newRequisitionOnProduct.component'
import NewRequisitionOnWarehouseProduct from './requisition/newRequisition/newRequisitionOnWarehouseProduct.component'
import { checkTokenExpiration } from '../../../../../redux/shared/auth/auth.action';
import { changeInvoiceTabKeyCounter } from '../../../../../redux/sales/invoice/invoice.action'
import { resetMessage as requisitionResetMessage } from '../../../../../redux/sales/invoice/requisition/requisition.action'
import { resetMessage as invoiceResetMessage, saveInvoiceHeaderRef } from '../../../../../redux/sales/invoice/invoice/invoice.action'
import Notification from '../../../../shared/common/notification/notification.component';
import Timeline from './timeline/timeline.component'
import NewTimeline from './timeline/newTimeline/newTimeline.component'
import { getTimelineInvoice, getTimelineData, resetNewInvoiceTimelineProps, resetTimelineMessage } from '../../../../../redux/sales/invoice/timeline/timeline.action'
import SalesReturn from './salesReturn/salesReturn.component'
import NewSalesReturn from './salesReturn/newSalesReturn/newSalesReturn.component'
import EditSalesReturn from './salesReturn/editSalesReturn/editSalesReturn.component'
import { resetSalesReturn, getSalesReturnData, resetSalesReturnMessage, getSalesReturnItem, } from '../../../../../redux/sales/invoice/salesReturn/salesReturn.action'
const { TabPane } = Tabs;
/* #endregion */

class Invoice extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            tabComponent: <Operation new={this.new} edit={this.edit} newRequisition={this.newRequisition} newSalesReturn={this.newSalesReturn}/>,
            tabKey: 1,
            /* #endregion */

            /* #region  [- flags -] */
            isOperationDisabled: true,
            isTaskTabDisabled: true,
            isTimelineTabDisabled: true,
            isRequisitionTabDisabled: true,
            isArchiveTabDisabled: true,
            isSalesReturnDisabled: true,
            /* #endregion */

            /* #region  [- grid -] */


            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    async componentDidMount() {
        this.accessToMenu(this.props.userMenuAccessList);
    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("433")) {
            this.setState({
                isOperationDisabled: false
            })
        }
        if (data.includes("489")) {
            this.setState({
                isRequisitionTabDisabled: false
            })
        }
        if (data.includes("641")) {
            this.setState({
                isTimelineTabDisabled: false,
            })
        }
        if (data.includes("713")) {
            this.setState({
                isSalesReturnDisabled: false,
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


        if (this.props.requisitionMessage !== prevProps.requisitionMessage) {
            this.showNotification(this.props.requisitionMessage)
            this.props.requisitionResetMessage();
        }
        if (this.props.invoiceMessage !== prevProps.invoiceMessage) {
            this.showNotification(this.props.invoiceMessage)
            this.props.invoiceResetMessage();
        }
        if (this.props.timelineMessage !== prevProps.timelineMessage) {
            this.showNotification(this.props.timelineMessage)
            this.props.resetTimelineMessage();
        }
        if (this.props.salesReturnMessage !== prevProps.salesReturnMessage) {
            this.showNotification(this.props.salesReturnMessage)
            this.props.resetSalesReturnMessage();
        }
    }
    /* #endregion */

    /* #region  [- new -] */
    new = () => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            tabComponent: <NewInvoice />
        });
    }
    /* #endregion */

    /* #region  [- newRequisition -] */
    newRequisition = async (isSplitOnWarehouseChecked, isSplitOnProductChecked, isSplitOnWarhouseProductChecked, isInOperationFlag) => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (isInOperationFlag === true) {
            await this.props.changeInvoiceTabKeyCounter(1)
        }
        else {
            await this.props.changeInvoiceTabKeyCounter(2)
        }

        if (isSplitOnWarehouseChecked === true) {
            this.setState({
                tabComponent: <NewRequisitionOnWarehouse />
            });
        }
        if (isSplitOnProductChecked === true) {
            this.setState({
                tabComponent: <NewRequisitionOnProduct />
            });
        }
        if (isSplitOnWarhouseProductChecked === true) {
            this.setState({
                tabComponent: <NewRequisitionOnWarehouseProduct />
            });
        }
    }
    /* #endregion */

    /* #region  [- edit -] */
    edit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            tabComponent: <EditInvoice />
        });

    }
    /* #endregion */

    /* #region  [- onClose -] */
    onClose = () => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            tabComponent: <Operation new={this.new} edit={this.edit} newRequisition={this.newRequisition} newSalesReturn={this.newSalesReturn}/>
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
                    tabKey: 1,
                    tabComponent: <Operation new={this.new} edit={this.edit} newRequisition={this.newRequisition} newSalesReturn={this.newSalesReturn}/>
                })
                break;

            case 2:
                this.setState({
                    tabKey: 2,
                    tabComponent: <Requisition newRequisition={this.newRequisition} />
                })
                break;

            case 3:
                await this.getTimelineInvoice();
                this.setState({
                    tabKey: 3,
                    tabComponent: <Timeline newTimeline={this.newTimeline} />
                })
                break;

            case 5:
                this.setState({
                    tabKey: 5,
                    tabComponent: <SalesReturn newSalesReturn={this.newSalesReturn} editSalesReturn={this.editSalesReturn} />
                })
                break;

            default:
                break;
        }
    }
    /* #endregion */

    /* #region  [- newTimeline -] */
    newTimeline = async (invoiceRef) => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.props.resetNewInvoiceTimelineProps();
        await this.getTimelineData();
        this.setState({
            tabComponent: <NewTimeline invoiceRef={invoiceRef} />
        });
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- newSalesReturn -] */
    newSalesReturn = async (data) => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.props.resetSalesReturn()
        await this.getSalesReturnData(data.invoiceRef);
        this.setState({
            tabComponent: <NewSalesReturn cancelNewSalesReturn={this.cancelNewSalesReturn} invoiceData={data} />
        });
    }
    /* #endregion */

    /* #region  [- cancelNewSalesReturn -] */
    cancelNewSalesReturn = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            tabComponent: <SalesReturn newSalesReturn={this.newSalesReturn} editSalesReturn={this.editSalesReturn} />
        });
    }
    /* #endregion */

    /* #region  [- editSalesReturn -] */
    editSalesReturn = async (data) => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.props.resetSalesReturn()
        await this.getSalesReturnItem(data);
        this.setState({
            tabComponent: <EditSalesReturn cancelEditSalesReturn={this.cancelEditSalesReturn} invoiceData={data} />
        });
    }
    /* #endregion */

    /* #region  [- cancelEditSalesReturn -] */
    cancelEditSalesReturn = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            tabComponent: <SalesReturn newSalesReturn={this.newSalesReturn} editSalesReturn={this.editSalesReturn} />
        });
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [ - onChangeTab - ] */
    onChangeTab = async (key) => {

        if (key === "1") {
            await this.props.changeInvoiceTabKeyCounter(1);
            this.setState({
                tabKey: 1,
                tabComponent: <Operation new={this.new} edit={this.edit} newRequisition={this.newRequisition} newSalesReturn={this.newSalesReturn}/>
            })
        }
        else if (key === "2") {
            await this.props.saveInvoiceHeaderRef("");
            await this.props.changeInvoiceTabKeyCounter(2);
            this.setState({
                tabKey: 2,
                tabComponent: <Requisition newRequisition={this.newRequisition} />
            })
        }
        else if (key === "3") {
            await this.getTimelineInvoice();
            await this.props.changeInvoiceTabKeyCounter(3);
            this.setState({
                tabKey: 3,
                tabComponent: <Timeline newTimeline={this.newTimeline} />
            })
        }
        else if (key === "5") {
            await this.props.changeInvoiceTabKeyCounter(5);
            this.setState({
                tabKey: 5,
                tabComponent: <SalesReturn newSalesReturn={this.newSalesReturn} editSalesReturn={this.editSalesReturn} />
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

    /* #region  [- getTimelineInvoice -] */
    getTimelineInvoice = async () => {
        let data = {
            domainRef: this.props.domain
        }
        await this.props.getTimelineInvoice(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getSalesReturnData -] */
    getSalesReturnData = async (invoiceRef) => {
        let data = {
            domainRef: this.props.domain,
            invoiceHeaderRef: invoiceRef
        }
        await this.props.getSalesReturnData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getSalesReturnItem -] */
    getSalesReturnItem = async (data) => {
        let obj = {
            domainRef: this.props.domain,
            invoiceHeaderRef: data.invoiceRef,
            salesReturnRef:data.salesReturnId
        }
        await this.props.getSalesReturnItem(JSON.stringify(obj))
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <div style={{ padding: '0 2%', height: '93vh', overflow: 'hidden scroll' }}>

                <Row name='row_01_Header' style={{ borderBottom: '1px solid #0000001a' }} >
                    <Col style={{ direction: 'rtl', textAlign: 'right', padding: '0', margin: '0' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '25px' }}>فاکتور</span>
                    </Col>
                </Row>

                <Row name="row_02_Tabs" style={{ direction: 'rtl' }}>
                    <Tabs
                        style={{ padding: "0", width: "100%" }}
                        onChange={this.onChangeTab}
                        activeKey={this.state.tabKey.toString()}
                    >
                        <TabPane tab="عملیات" key="1" disabled={this.state.isOperationDisabled}>

                            {this.state.tabComponent}
                        </TabPane>

                        <TabPane tab="وظایف" key="4" disabled={this.state.isTaskTabDisabled}>
                            <Row>
                                <Col >

                                    {this.state.tabComponent}

                                </Col>
                            </Row>
                        </TabPane>

                        <TabPane tab="پیشینه" key="3" disabled={this.state.isTimelineTabDisabled}>
                            <Row>
                                <Col >

                                    {this.state.tabComponent}

                                </Col>
                            </Row>
                        </TabPane>

                        <TabPane tab="حواله خروج" key="2" disabled={this.state.isRequisitionTabDisabled} >
                            <Row>
                                <Col >

                                    {this.state.tabComponent}

                                </Col>
                            </Row>
                        </TabPane>

                        <TabPane tab="برگشت از فروش" key="5"
                            disabled={this.state.isSalesReturnDisabled}

                        >
                            <Row>
                                <Col >

                                    {this.state.tabComponent}

                                </Col>
                            </Row>
                        </TabPane>

                        <TabPane tab="آرشیو" key="6" disabled={this.state.isArchiveTabDisabled}>
                            <Row>
                                <Col >

                                    {this.state.tabComponent}

                                </Col>
                            </Row>
                        </TabPane>

                    </Tabs>
                </Row>

            </div >
        );
    }
    /* #endregion */

    /* #endregion */

}


/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {

    return {
        domain: state.auth.domain,
        checkTokenCounter: state.auth.checkTokenCounter,
        tabKeyCounter: state.mainInvoice.tabKeyCounter,
        userMenuAccessList: state.auth.userMenuAccessList,
        requisitionMessage: state.requisition.message,
        invoiceMessage: state.invoice.message,
        timelineMessage: state.invoiceTimeline.message,
        invoiceHeaderRefInOperationTab: state.invoice.invoiceHeaderRef,
        salesReturnMessage: state.salesReturn.message,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    changeInvoiceTabKeyCounter: (data) => dispatch(changeInvoiceTabKeyCounter(data)),
    requisitionResetMessage: (data) => dispatch(requisitionResetMessage(data)),
    invoiceResetMessage: (data) => dispatch(invoiceResetMessage(data)),

    getTimelineData: (data) => dispatch(getTimelineData(data)),
    resetNewInvoiceTimelineProps: (data) => dispatch(resetNewInvoiceTimelineProps(data)),
    resetTimelineMessage: (data) => dispatch(resetTimelineMessage(data)),
    getTimelineInvoice: (data) => dispatch(getTimelineInvoice(data)),
    saveInvoiceHeaderRef: (data) => dispatch(saveInvoiceHeaderRef(data)),

    getSalesReturnData: (data) => dispatch(getSalesReturnData(data)),
    resetSalesReturn: () => dispatch(resetSalesReturn()),
    resetSalesReturnMessage: () => dispatch(resetSalesReturnMessage()),
    getSalesReturnItem: (data) => dispatch(getSalesReturnItem(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);