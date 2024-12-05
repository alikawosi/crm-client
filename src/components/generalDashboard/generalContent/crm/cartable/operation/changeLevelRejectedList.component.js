/* #region  [- imports -] */
import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup } from "reactstrap";

/* #endregion */


class ChangeLevelRejectedList extends Component {

    /* #region  [- render -] */
    render() {
        return (
 
                        <Container fluid>

                            <Row name='row_01_Modal_Header' className='modal-header-row mb-2'>
                                <Col className='modal-header-col'>
                                    <p className='modal-header-title'>طرف حساب</p>
                                </Col>
                            </Row>

                            <Row name='row_02_Modal_Content'>
                                <Col sm='12' style={{ textAlign: 'right' }}>
                                    <Form>
                                        <FormGroup name='message' style={{ padding: '2% 7% 0 7%', margin: '0' ,width:'100%'}} >
                                        <p>طرف حساب های زیر به دلیل داشتن سند شرایط تغییر سطح را ندارند:</p>
                                            <ul style={{ listStyleType: 'disc' }}>
                                                {
                                                    this.props.rejectedList.map((item) => <li>{item.title}</li>)
                                                }
                                            </ul>
                                        </FormGroup>

                                    </Form>
                                </Col>
                            </Row>
                        </Container>

        );
    }
    /* #endregion */

    /* #endregion */

}



export default ChangeLevelRejectedList;