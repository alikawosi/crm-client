/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Tabs } from "antd";
import {  Row, Col } from "reactstrap";
import { connect } from "react-redux";
import Operation from './operation/operation.component'
import Task from './task/task.component'
import Archive from './archive/archive.component'
import NewPriceList from './operation/newPriceList/newPriceList.component'
import EditPriceList from './operation/editPriceList/editPriceList.component';
import { checkTokenExpiration } from '../../../../../redux/shared/auth/auth.action';

const { TabPane } = Tabs;
/* #endregion */

class PriceList extends PureComponent {

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
        if (data.includes("382")) {
            this.setState({
                isOperationDisabled: false
            })
        }
    }
    /* #endregion */

    /* #region  [- componentDidUpdate -] */
    componentDidUpdate(prevProps) {
        if (prevProps.tabKeyCounter !== this.props.tabKeyCounter) {
            this.setState({
                tabComponent: <Operation new={this.new} edit={this.edit} />
            })
        }
    }
    /* #endregion */

    /* #region  [- new -] */
    new = () => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            tabComponent: <NewPriceList />
        });
    }
    /* #endregion */

    /* #region  [- new -] */
    edit = () => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            tabComponent: <EditPriceList />
        });
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [ - onChangeTab - ] */
    onChangeTab = async (key) => {

        if (key === "1") {
            this.setState({
                tabComponent: <Operation new={this.new} edit={this.edit} />
            })
        }
        else if (key === "2") {
            this.setState({
                //tabComponent: <Task />
            })
        }
        else if (key === "3") {
            this.setState({
                tabComponent: <Task />
            })
        }
        else if (key === "5") {
            this.setState({
                tabComponent: <Archive />
            })
        }
    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {
        return (
            <div style={{ padding: '0 2%' ,height:'93vh',overflow:'hidden scroll'}}>

                <Row name='row_01_Header' style={{ borderBottom: '1px solid #0000001a' }} >
                    <Col style={{ direction: 'rtl', textAlign: 'right', padding: '0', margin: '0' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '25px' }}>لیست قیمت</span>
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

                        <TabPane tab="وظایف" key="3" disabled={this.state.isTaskDisabled}>
                            <Row>
                                <Col >

                                    {this.state.tabComponent}

                                </Col>
                            </Row>
                        </TabPane>

                        <TabPane tab="آرشیو" key="5" disabled={this.state.isArchiveDisabled}>
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
        tabKeyCounter: state.priceList.tabKeyCounter,
        userMenuAccessList: state.auth.userMenuAccessList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(PriceList);