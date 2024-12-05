/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, FormFeedback } from 'reactstrap';
import { Switch } from 'antd';
import { putTermType } from '../../../../../../redux/sales/termType/termType.action';
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
/* #endregion */

class EditTermType extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            //#region [- dbFields -]
            id: null,
            title: '',
            descriptionRow: '',
            //#endregion

            //#region [- formValidation -]
            errors: {},

            isTitleInvalid: false,
            isTitleValid: false,
            isShippingFlagChecked: false,
            //#endregion
        }
    }
    /* #endregion */

    //#region [*** methods ***]

    //#region [*** componentMethods ***]

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        this.loadForm();
    }
    /* #endregion */

    /* #region  [- loadForm -] */
    loadForm = async () => {
        let data = { ...this.props.termTypeItem[0] }
        await this.setState({
            id: data.id,
            title: data.title,
            isShippingFlagChecked:data.shippingFlag,
            descriptionRow: data.descriptionRow,
            isTitleValid: true
        })
    }
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async (event) => {
        var errors = {};

        switch (event.target.id) {

            //#region [- title -]
            case "title":
                if (event.target.value === "") {
                    this.setState({
                        isTitleInvalid: true,
                        isTitleValid: false
                    });
                    errors["title"] = "عنوان اجباری است";
                }
                else {
                    this.setState({
                        isTitleInvalid: false,
                        isTitleValid: true
                    });
                }
                break;
            //#endregion

            default:
                errors = {};
                break;
        }

        this.setState({
            errors: errors
        });
    }
    //#endregion

    //#region [- validateFormOnButtonClick() -]
    validateFormOnButtonClick = () => {
        var errors = {};
        var isFormValid = false;

        //#region [- title -]      
        if (this.state.title === "") {
            this.setState({
                isTitleInvalid: true,
                isTitleValid: false
            });
            errors["title"] = "عنوان اجباری است";
        }
        else {
            this.setState({
                isTitleInvalid: false,
                isTitleValid: true
            });
        }

        //#endregion
        this.setState({
            errors: errors,
        });
        if (Object.keys(errors).length === 0) {
            isFormValid = true
        }
        else {
            isFormValid = false
        }
        return isFormValid;
    }

    //#endregion

    //#endregion

    /* #region  [*** Handle Changes ***] */

    /* #region  [- handleChange(event) -] */
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        this.validateForm(event);
    }
    /* #endregion */

    /* #region  [- handleChangeShippingFlag -] */
    handleChangeShippingFlag = () => {
        this.setState({
            isShippingFlagChecked: !this.state.isShippingFlagChecked
        });
    }
    /* #endregion */

    /* #endregion */

    //#region [*** api ***]

    /* #region  [- putTermType() -] */
    putTermType = async () => {
        let termTypePutData = {
            id: this.state.id,
            domainRef: this.props.domain,
            termTypeList: [
                {
                    title: this.state.title,
                    shippingFlag: this.state.isShippingFlagChecked,
                    descriptionRow: this.state.descriptionRow
                }
            ]
        }
        await this.props.putTermType(JSON.stringify(termTypePutData));
    }
    /* #endregion */

    //#endregion

    //#region [*** buttonTasks ***]

    /* #region  [- cancel() -] */
    cancel = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.onClose();
    }
    /* #endregion */

    /* #region  [- submit() -] */
    submit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.validateFormOnButtonClick() === true) {
            await this.putTermType();
            await this.props.onClose();
        }

    }
    /* #endregion */

    //#endregion

    /* #region  [- render() -] */
    render() {

        return (

            <Container fluid className="reacstrap-container" style={{ padding: "0" }} >

                <Row name='row_01_Header' className='form-header-row' style={{ margin: "0" }}>
                    <Col className="form-header-col">
                        <p className="form-header-title">ویرایش نوع شرایط و ملاحضات</p>
                    </Col>
                </Row>

                <Form name='form' className="reactstrap-form">

                    <FormGroup name='shippingFlag' style={{ textAlign: 'right' }} >

                        <Row style={{ marginTop: 15 }}>

                            <Label for="shippingFlag" style={{ marginRight: 15 }}>حمل و نقل و ترابری</Label>

                            <Col name="shippingFlag">
                                <Switch
                                    size="small"
                                    onChange={this.handleChangeShippingFlag}
                                    checked={this.state.isShippingFlagChecked}
                                />
                            </Col>

                        </Row>

                    </FormGroup>

                    <Row name='title'>
                        <Col name='title' sm={12}>
                            <FormGroup name='title' className="reactstrap-formGroup">
                                <Label>عنوان<span className="form-mandatory-field-star">*</span></Label>
                                <Input
                                    type='text'
                                    name='title'
                                    id='title'
                                    placeholder='عنوان'
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                    invalid={this.state.isTitleInvalid}
                                    valid={this.state.isTitleValid}
                                />
                                <FormFeedback>{this.state.errors.title}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row name='descriptionRow'>
                        <Col name='descriptionRow' sm={12}>
                            <FormGroup name='descriptionRow' className="reactstrap-formGroup">
                                <Label>توضیحات</Label>
                                <Input
                                    type='textarea'
                                    name='descriptionRow'
                                    id='descriptionRow'
                                    placeholder='توضیحات'
                                    value={this.state.descriptionRow}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                </Form>

                <Row name='row_02_Buttons' className='form-button-row' style={{ margin: "0" }}>

                    <Col sm='12' style={{ marginTop: "5px" }}>
                        <Button name='cancel' className='cancel-button-style mr-2' onClick={this.cancel}>لغو</Button>
                        <Button name='submit' className='submit-button-style mr-2' onClick={this.submit}>ثبت</Button>
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
        checkTokenCounter: state.auth.checkTokenCounter,
        domain: state.auth.domain,
        termTypeItem: state.termType.termTypeItem
    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    putTermType: (data) => dispatch(putTermType(data)),
});

/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(EditTermType);

