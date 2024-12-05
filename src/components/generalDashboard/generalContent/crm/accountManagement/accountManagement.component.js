/* #region  [- imports -] */
import React, { Component } from 'react';
import { Tabs } from "antd";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../redux/shared/auth/auth.action';

const { TabPane } = Tabs;
/* #endregion */

class AccountManagement extends Component {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            tabComponent:<div></div>
            /* #endregion */

            /* #region  [- flags -] */


            /* #endregion */

            /* #region  [- grid -] */


            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidUpdate -] */
    componentDidUpdate(prevProps) {
        if (prevProps.tabKeyCounter !== this.props.tabKeyCounter) {
            this.setState({
               // tabComponent: <Operation new={this.new} />
            })
        }
    }
    /* #endregion */

    /* #region  [- new -] */
    new = () => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            //tabComponent: <NewQuote />
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
            this.setState({
               // tabComponent: <Operation new={this.new} />
            })
        }
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */


    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <Container fluid style={{ padding: '0 2%' }}>

                <Row name='row_01_Header' style={{ borderBottom: '1px solid #0000001a' }} >
                    <Col style={{ direction: 'rtl', textAlign: 'right', padding: '0', margin: '0' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '25px' }}>پیش فاکتور</span>
                    </Col>
                </Row>

                <Row name="row_02_Tabs" style={{ direction: 'rtl' }}>
                    <Tabs
                        style={{ padding: "0", width: "100%" }}
                        defaultActiveKey="1"
                        onChange={this.onChangeTab}
                    >
                        <TabPane tab="عملیات" key="1">

                            {this.state.tabComponent}
                        </TabPane>
                        <TabPane tab="وظایف" key="2" >
                            <Row>
                                <Col >

                                    {this.state.tabComponent}

                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="سوابق" key="3" >
                            <Row>
                                <Col >

                                    {this.state.tabComponent}

                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="آرشیو" key="4" >
                            <Row>
                                <Col >

                                    {this.state.tabComponent}

                                </Col>
                            </Row>
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
        checkTokenCounter: state.auth.checkTokenCounter,
        tabKeyCounter: state.quote.tabKeyCounter
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(AccountManagement);