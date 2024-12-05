/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Tabs } from "antd";
import {  Row, Col } from "reactstrap";
import { connect } from "react-redux";
import Operation from './operation/operation.component'
//import Task from './task/task.component'
import Timeline from './timeline/timeline.component'
//import Archive from './archive/archive.component'
import NewQuote from './operation/newQuote/newQuote.component'
import EditQuote from './operation/editQuote/editQuote.component'
import { checkTokenExpiration } from '../../../../../redux/shared/auth/auth.action';
import NewTimeline from './timeline/newTimeline/newTimeline.component'
import {getTimelineQuote, getTimelineData, resetNewQuoteTimelineProps, resetTimelineMessage } from '../../../../../redux/sales/quote/timeline/timeline.action'
import { resetProps} from '../../../../../redux/sales/quote/quote/quote.action'
import {changeQuoteTabKeyCounter} from '../../../../../redux/sales/quote/quote.action'
import Notification from '../../../../shared/common/notification/notification.component';
const { TabPane } = Tabs;
/* #endregion */

class Quote extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            tabComponent: <Operation
                new={this.new}
                edit={this.edit} />,
            /* #endregion */

            /* #region  [- flags -] */
            isOperationDisabled: true,
            isTaskDisabled: true,
            isTimelineTabDisabled: true,
            isArchiveTabDisabled: true,

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
        if (data.includes("395")) {
            this.setState({
                isOperationDisabled: false
            })
        }
        if (data.includes("539")) {
            this.setState({
                isTimelineTabDisabled: false,
            })
        }
        
    }
    /* #endregion */

    /* #region  [- componentDidUpdate -] */
    componentDidUpdate(prevProps) {
        if(this.props.tabKeyCounter!==""){
            if (prevProps.tabKeyCounter !== this.props.tabKeyCounter) {
              this.changeTab()
          }  
          }
        if (this.props.timelineMessage !== prevProps.timelineMessage) {
            this.showNotification(this.props.timelineMessage)
            this.props.resetTimelineMessage();
        }
        if (this.props.quoteMessage !== prevProps.quoteMessage) {
            this.showNotification(this.props.quoteMessage)
            this.props.resetProps();
        }
    }
    /* #endregion */

    /* #region  [- new -] */
    new = () => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            tabComponent: <NewQuote />
        });
    }
    /* #endregion */

    /* #region  [- edit -] */
    edit = async (quoteHeaderRef) => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            tabComponent: <EditQuote />
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
    changeTab = async() => {
        switch (this.props.tabKeyCounter) {
            case 1:
                this.setState({ tabComponent: <Operation   new={this.new} edit={this.edit} /> })
                break;

            case 3:
                await this.getTimelineQuote();
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
    newTimeline = async (quoteRef) => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.props.resetNewQuoteTimelineProps();
        await this.getTimelineData();
        this.setState({
            tabComponent: <NewTimeline quoteRef={quoteRef} />
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
            await this.props.changeQuoteTabKeyCounter(1);
            this.setState({
                tabComponent: <Operation
                    new={this.new}
                    edit={this.edit} />
            })
        }

        else if (key === "3") {
            await this.getTimelineQuote();
            await this.props.changeQuoteTabKeyCounter(3);
            this.setState({
                tabComponent: <Timeline />
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

    /* #region  [- getTimelineQuote -] */
    getTimelineQuote = async () => {
        let data = {
            domainRef: this.props.domain
        }
        await this.props.getTimelineQuote(JSON.stringify(data))
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <div style={{ padding: '0 2% 0 0'  ,height:'93vh',overflow:'hidden scroll'}}>

                <Row name='row_01_Header' style={{ borderBottom: '1px solid #0000001a' }} >
                    <Col sm="12" md="12" lg="12" style={{ direction: 'rtl', textAlign: 'right', padding: '0', margin: '0' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '25px' }}>پیش فاکتور</span>
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

                        <TabPane tab="پیشینه" key="3" disabled={this.state.isTimelineTabDisabled}>
                            <Row>
                                <Col >

                                    {this.state.tabComponent}

                                </Col>
                            </Row>
                        </TabPane>

                        <TabPane tab="آرشیو" key="4" disabled={this.state.isArchiveTabDisabled}>
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
        tabKeyCounter: state.mainQuote.tabKeyCounter,
        userMenuAccessList: state.auth.userMenuAccessList,
        quoteMessage: state.quote.message,
        timelineMessage: state.quoteTimeline.message,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    changeQuoteTabKeyCounter: (data) => dispatch(changeQuoteTabKeyCounter(data)),
    getTimelineData: (data) => dispatch(getTimelineData(data)),
    resetNewQuoteTimelineProps: (data) => dispatch(resetNewQuoteTimelineProps(data)),
    resetTimelineMessage: (data) => dispatch(resetTimelineMessage(data)),
    getTimelineQuote: (data) => dispatch(getTimelineQuote(data)),
    resetProps: () => dispatch(resetProps()),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Quote);