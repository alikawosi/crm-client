/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, FormGroup, Form, Input, FormFeedback, Button } from "reactstrap";
import { Avatar } from 'antd';
import { connect } from "react-redux";
import { putPerson,resetProps } from '../../../../redux/account/account.action'
import { checkTokenExpiration } from '../../../../redux/shared/auth/auth.action';
import Notification from "../../../shared/common/notification/notification.component";
/* #endregion */

class Profile extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            persoalImage: '',
            image: <div></div>,
            firstName: '',
            surname: '',
            id: null,
            /* #endregion */

            /* #region  [- formValidation -] */
            formErrors: {},
            isFirstNameInvalid: false,
            isFirstNameValid: false,
            isSurnameInvalid: false,
            isSurnameValid: false,
            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [ *** componentmethods *** ] */

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        if (this.state.persoalImage === '') {
            this.setState({
                image: <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    style={{ backgroundColor: 'Purple' }}
                >U</Avatar>
            })
        }
        else {
            this.setState({
                image: <Avatar>X</Avatar>
            })
        }

        if (this.props.personItem.length !== 0) {

            this.loadFormData()

        }
    }
    /* #endregion */

    // #region [- componentDidUpdate() -]
    componentDidUpdate(prevProps) {
        console.log(prevProps.message);
        if (this.props.message !== prevProps.message) {
            if (this.props.message === "ویرایش با موفقیت انجام شد.") {
                Notification("bottomRight", this.props.message, "success");
            }
            this.props.resetProps();
        }

    }

    //#endregion

    /* #region  [- loadFormData -] */
    loadFormData = () => {
        let personItem = this.props.personItem

        this.setState({
            id: personItem[0].id,
            //image: personItem[0].persoalImage,
            firstName: personItem[0].firstName,
            surname: personItem[0].surname
        })
    }
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async (event) => {
        var errors = { ...this.state.errors };

        switch (event.target.id) {

            //#region [- firstName -]
            case "firstName":
                if (event.target.value === "") {
                    this.setState({
                        isFirstNameInvalid: true,
                        isFirstNameValid: false
                    });
                    errors["firstName"] = "نام اجباری است";
                }
                else {
                    this.setState({
                        isFirstNameInvalid: false,
                        isFirstNameValid: true
                    });
                }
                break;
            //#endregion

            //#region [- surname -]
            case "surname":
                if (event.target.value === "") {
                    this.setState({
                        isSurnameInvalid: true,
                        isSurnameValid: false
                    });
                    errors["surname"] = "نام خانوادگی اجباری است";
                }
                else {
                    this.setState({
                        isSurnameInvalid: false,
                        isSurnameValid: true
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

        //#region [- firstName -]      
        if (this.state.firstName === "") {
            this.setState({
                isFirstNameInvalid: true,
                isFirstNameValid: false
            });
            errors["firstName"] = " نام اجباری است";
        }
        else {
            this.setState({
                isFirstNameInvalid: false,
                isFirstNameValid: true
            });
        }

        //#endregion

        //#region [- surename -]      
        if (this.state.surename === "") {
            this.setState({
                isSurnameInvalid: true,
                isSurnameValid: false
            });
            errors["surename"] = "نام خانوادگی اجباری است";
        }
        else {
            this.setState({
                isSurnameInvalid: false,
                isSurnameValid: true
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

    /* #endregion */

    /* #region  [*** Handle Changes ***] */

    /* #region  [ - handleChange - ] */
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
        this.validateForm(event);
    };
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- submit() -] */
    submit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.validateFormOnButtonClick() === true) {
            await this.putPerson();
        }

    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api  ***] */

    /* #region  [- putPerson -] */
    putPerson = async () => {

        let person = [{
            id: this.state.id,
            firstName: this.state.firstName,
            surname: this.state.surname
        }]

        let data = {

            personItem: person
        }

        await this.props.putPerson(JSON.stringify(data));
    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {
        return (
            <Container fluid style={{ padding: '0 2%' }}>

                <Row name='row_01_Header' style={{ borderBottom: '1px solid #0000001a' }} >
                    <Col sm="12" md="12" lg="12" style={{ direction: 'rtl', textAlign: 'right', padding: '0', margin: '0' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '25px' }}>پروفایل</span>
                    </Col>
                </Row>

                <Row name='row_02_ProfileImage' style={{ paddingTop: '2%' }}>
                    {this.state.image}
                </Row>

                <Row name='row_03_Form'>
                    <Col name='col_01_Form'>
                        <Form name='basicInfoForm' >

                            <FormGroup name='firstName' style={{ textAlign: "right", paddingTop: '1%' }}>
                                <Row name='firstName' style={{ marginBottom: '1%' }}>
                                    <Col sm='12' md='12' lg='4'>
                                        <label>نام </label>
                                        <Input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            value={this.state.firstName}
                                            onChange={this.handleChange}
                                            invalid={this.state.isFirstNameInvalid}
                                            valid={this.state.isFirstNameValid}
                                        />
                                        <FormFeedback>{this.state.formErrors.firstName}</FormFeedback>
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup name='surname' style={{ textAlign: "right", paddingTop: '1%' }}>
                                <Row name='surname' style={{ marginBottom: '1%' }}>
                                    <Col sm='12' md='12' lg='4'>
                                        <label>نام خانوادگی </label>
                                        <Input
                                            type="text"
                                            name="surname"
                                            id="surname"
                                            value={this.state.surname}
                                            onChange={this.handleChange}
                                            invalid={this.state.isSurnameInvalid}
                                            valid={this.state.isSurnameValid}
                                        />
                                        <FormFeedback>{this.state.formErrors.surname}</FormFeedback>
                                    </Col>
                                </Row>
                            </FormGroup>

                        </Form>

                    </Col>
                </Row>

                <Row name='row_04_Buttons' style={{ margin: "0" }}>

                    <Col sm='6' md='6' lg='6' style={{ marginTop: "5px", textAlign: 'right', padding: '0' }}>
                        <Button name='submit' className='submit-button-style mr-2' onClick={this.submit}>ذخیره</Button>
                    </Col>
                    <Col sm='6' md='6' lg='6'></Col>
                </Row>

            </Container>
        );
    }
    /* #endregion */

    /* #endregion */

}

/* #region  [- mapStateToProps -] */
const mapStateToProps = (state) => {
    return {
        checkTokenCounter: state.auth.checkTokenCounter,
        personItem: state.account.personItem,
        message: state.account.message,

    };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = (dispatch) => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    putPerson: (data) => dispatch(putPerson(data)),
    resetProps: () => dispatch(resetProps()),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Profile);