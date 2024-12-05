/* #region  [- imports -] */
import React, { PureComponent } from 'react';
//================================================
import { initializeIcons } from "@uifabric/icons";
import { Icon } from 'semantic-ui-react'
import { Card, Row, Col, Button } from 'reactstrap';
import './salesDashboardBox.component.css'
initializeIcons();

/* #endregion */

class SalesDashboardBox extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    /* #endregion */

    /* #region  [- route -] */
    route = () => {

    }
    /* #endregion */

    /* #region  [- render -] */
    render() {

        /* #region  [- const -] */
        const mainCardStyle = {
            backgroundColor: this.props.mainCardBackgroundColor,
            color: 'white',
            padding: '3%',
            borderRadius: '5px',
            margin:'2%'
        }

        const subCardStyle = {
            padding: '2%',
            backgroundColor: this.props.subCardBackgroundColor,
            margin: 0,
            color: 'black'
        }
        /* #endregion */

        return (

            <div>

                <Card style={mainCardStyle}>

                    <Row name='row_01_Header' style={{ padding: '3%' }}>
                        <Col sm='' md='12' lg='6' >
                            <h4 className="header" style={{ textAlign: 'right', color: 'white', fontWeight: 'bold' }}>{this.props.cardTitle}</h4>
                        </Col>
                        <Col sm='6' md='12' lg='6' style={{ textAlign: 'left' }}>
                            <Row>
                                <Col md='6' lg="6" style={{ paddingLeft: '0' }}>
                                    <h3 style={{ color: 'white', fontWeight: 'bold' }}>{this.props.sum}</h3>

                                </Col>
                                <Col md='6' lg="6">
                                    <Button style={{ backgroundColor: 'white' }}>
                                        <Icon name='plus' size='small' color="black"></Icon>

                                    </Button>

                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row name='row_02_Quantity' style={subCardStyle}>

                        <Col sm='3' lg='3' md='3' style={{ padding: '2%' }}>
                            <Row style={{ margin: '0' }}>
                                <Col md='12' lg="12" style={{ padding: '0' }}>
                                    <span className='salesDashboardBoxSpan' style={{ textAlign: 'center', fontWeight: 'bold' }} onClick={this.route}>ثبت شده</span>

                                </Col>
                                <Col md='12' lg='12'>
                                    <Icon size='small' color='black' name='caret down' />
                                </Col>
                                <Col md='12' lg="12" style={{ border: '1px solid', height: '70px', fontSize: '12px' }}>
                                    {this.props.sumInsertedFlow}
                                </Col>
                            </Row>
                        </Col>

                        <Col sm='3' lg='3' md='3' style={{ padding: '2%' }}>
                            <Row style={{ margin: '0' }}>
                                <Col sm="12" style={{ padding: '0' }}>
                                    <span  className='salesDashboardBoxSpan' style={{ textAlign: 'center', fontWeight: 'bold' }}>درحال تایید</span>

                                </Col>
                                <Col sm='12'>
                                    <Icon size='small' color='black' name='caret down' />
                                </Col>
                                <Col sm="12" style={{ border: '1px solid', height: '70px', fontSize: '12px' }}>
                                    {this.props.sumConfirmingFlow}
                                </Col>
                            </Row>
                        </Col>

                        <Col sm='3'lg='3' md='3' style={{ padding: '2%' }}>
                            <Row style={{ margin: '0' }}>
                                <Col sm="12" style={{ padding: '0' }}>
                                    <span className='salesDashboardBoxSpan' style={{ textAlign: 'center', fontWeight: 'bold' }}>تایید شده</span>

                                </Col>
                                <Col sm='12'>
                                    <Icon size='small' color='green' name='caret down' />
                                </Col>
                                <Col sm="12" style={{ border: '1px solid', height: '70px', fontSize: '12px' }}>
                                    {this.props.sumConfirmedFlow}

                                </Col>
                            </Row>
                        </Col>

                        <Col sm='3'lg='3' md='3' style={{ padding: '2%' }}>
                            <Row style={{ margin: '0' }}>
                                <Col sm="12" style={{ padding: '0' }}>
                                    <span className='salesDashboardBoxSpan' style={{ textAlign: 'center', fontWeight: 'bold' }}>رد شده</span>

                                </Col>
                                <Col sm='12'>
                                    <Icon size='small' color='red' name='caret down' />
                                </Col>
                                <Col sm="12" style={{ border: '1px solid', height: '70px', fontSize: '12px' }}>
                                    {this.props.sumRejectedFlow}

                                </Col>
                            </Row>
                        </Col>

                    </Row>

                    <Row name='row_03_TodayDate' style={{ padding: '5%', margin: 0, color: 'white' }}>
                        <span>ثبت امروز</span>
                    </Row>

                    <Row name='row_04_TodayQuantity' style={subCardStyle}>

                        <Col sm='3'lg='3' md='3' style={{ padding: '2%' }}>
                            <Row style={{ margin: '0' }}>
                                <Col sm="12" style={{ border: '1px solid', height: '40px', fontSize: '12px' }}>
                                    {this.props.sumTodayInsertedFlow}
                                </Col>
                            </Row>
                        </Col>

                        <Col sm='3'lg='3' md='3' style={{ padding: '2%' }}>
                            <Row style={{ margin: '0' }}>
                                <Col sm="12" style={{ border: '1px solid', height: '40px', fontSize: '12px' }}>
                                    {this.props.sumTodayConfirmingFlow}
                                </Col>
                            </Row>
                        </Col>

                        <Col sm='3' lg='3' md='3' style={{ padding: '2%' }}>
                            <Row style={{ margin: '0' }}>

                                <Col sm="12" style={{ border: '1px solid', height: '40px', fontSize: '12px' }}>
                                    {this.props.sumTodayConfirmedFlow}

                                </Col>
                            </Row>
                        </Col>

                        <Col sm='3' lg='3' md='3' style={{ padding: '2%' }}>
                            <Row style={{ margin: '0' }}>

                                <Col sm="12" style={{ border: '1px solid', height: '40px', fontSize: '12px' }}>
                                    {this.props.sumTodayRejectedFlow}
                                </Col>
                            </Row>
                        </Col>

                    </Row>

                </Card>

            </div>

        );
    }
    /* #endregion */

}

export default SalesDashboardBox;