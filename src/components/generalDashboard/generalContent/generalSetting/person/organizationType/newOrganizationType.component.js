/* #region  [- import -] */

import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { postOrganizationType } from '../../../../../../redux/infrastructure/organizationType/organizationType.action';
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
/* #endregion */

class NewOrganizationType extends PureComponent {
    
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            domainRef: this.props.domain,
            title: '',
            descriptionRow: '',
            //flags
            isSaveButtonHidden: false,
            isNextStepButtonHidden: true,
            isFinishButtonHidden: true,
        }
    }
    /* #endregion */

    /* #region  [- method -] */

    /* #region  [- componentDidMount -] */
    componentDidMount() {

    }
    /* #endregion */


    /* #region  [- postOrganizationType() -] */
    postOrganizationType = async () => {
        let organizationTypePostData = {
            domainRef: parseInt(this.state.domainRef),
            organizationTypeList: [
                {
                    title: this.state.title,
                    descriptionRow: this.state.descriptionRow
                }
            ]
        }
        await this.props.postOrganizationType(organizationTypePostData);
    }
    /* #endregion */


    /* #region  [- inputHandleChange(event) -] */
    inputHandleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    /* #endregion */


    /* #region  [- cancel() -] */
    cancel = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.onClose();
    }
    /* #endregion */

    /* #region  [- save() -] */
    submit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        //this.child.postPerson();
        await this.postOrganizationType();
        await this.props.onClose();
    }
    /* #endregion */


    /* #region  [- render() -] */
    render() {
        return (
            <Container style={{ height: '100vh' }}>
                <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>انواع شخص حقوقی جدید</span>
                    </Col>
                </Row>
                <Row title='content' style={{ height: '89vh' }}>
                    <Col title='form' sm='12'>
                        <Form>
                            <FormGroup title='title' style={{ textAlign: 'right' }}>
                                <Label for="exampleEmail">نام</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={this.state.title}
                                    placeholder="نام"
                                    onChange={this.inputHandleChange}
                                />
                            </FormGroup>
                            <FormGroup title='descriptionRow' style={{ textAlign: 'right' }}>
                                <Label for="exampleEmail">توضیحات</Label>
                                <Input
                                    type="textarea"
                                    name="descriptionRow"
                                    id="descriptionRow"
                                    value={this.state.descriptionRow}
                                    placeholder="توضیحات"
                                    onChange={this.inputHandleChange}
                                />
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                <Row title='buttons' style={{ height: '6vh', borderTop: '1px solid #f0f0f0' }}>
                    <Col sm='12' style={{ lineHeight: '6vh' }}>
                        <Button className='cancel-button-style mr-2' onClick={this.cancel}>
                            لغو
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.submit} hidden={this.state.isSaveButtonHidden}>
                            ثبت
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
    /* #endregion */

    /* #endregion */
}

/* #region  [ - mapStateToProps - ] */
const mapStateToProps = state => {
    return {
        domain: state.auth.domain,
        checkTokenCounter: state.auth.checkTokenCounter,
    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    postOrganizationType: (data) => dispatch(postOrganizationType(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});

/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(NewOrganizationType);