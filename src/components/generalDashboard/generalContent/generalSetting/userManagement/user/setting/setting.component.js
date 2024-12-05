/* #region  [- imports -] */
import React, { Component } from 'react';
import { Container, Row, Col, Label, Input, FormGroup, Form, Button, FormFeedback } from 'reactstrap';
import { Card } from "antd";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { connect } from "react-redux";
import { putUser } from '../../../../../../../redux/account/account.action'
//import { setClickedItemInCustomSettingContent } from "../../../../../../redux/actions/shared/common.action";

/* #endregion */

class Setting extends Component {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            userName: "",
            password: "",
            email: "",
            phoneNumber: "",
            organizationRef: "",
            personRef: "",
            /* #endregion */

            //#region [- formValidation -]
            errors: {},

            isTitleInvalid: false,
            isTitleValid: false,

            isUserNameInvalid: false,
            isUserNameValid: false,
            isPasswordInvalid: false,
            isPasswordValid: false,
            isOrganizationRefInvalid: false,
            isOrganizationRefValid: false,
            isPersonRefInvalid: false,
            isPersonRefValid: false,
            isEmailInvalid: false,
            isEmailValid: false,
            //#endregion

        }
    }
    /* #endregion */

    /* #region  [*** methods ***]  */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        this.loadFormData()
    }
    /* #endregion */

    /* #region  [- loadFormData -] */
    loadFormData = () => {
        var errors = {};
        let user = this.props.userItem
        if (Object.keys(this.props.employeeItem).length !== 0) {
            let employee = this.props.employeeItem

            errors["userName"] = ''
            errors["password"] = ' پسورد اجباری است';
            if (employee[0].organizationRef === 0) {
                errors["organizationRef"] = " انتخاب شخص حقوقی اجباری است";
            }
            else if (employee[0].personRef) {
                errors["personRef"] = ' انتخاب شخص حقیقی اجباری است';
            }
            this.setState({
                userName: user.userName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                isUserNameValid: true,
                isPasswordInvalid: true,
                isOrganizationRefValid: employee[0].organizationRef === 0 ? false : true,
                isOrganizationRefInvalid: employee[0].organizationRef === 0 ? true : false,
                isPersonRefValid: employee[0].personRef === 0 ? false : true,
                isPersonRefInvalid: employee[0].personRef === 0 ? true : false,
                isEmailValid: true,
                errors: errors,
                organizationRef: employee[0].organizationRef,
                personRef: employee[0].personRef

            })
        }
        else {
            errors["userName"] = ''
            errors["password"] = ' پسورد اجباری است';
            errors["organizationRef"] = " انتخاب شخص حقوقی اجباری است";
            errors["personRef"] = ' انتخاب شخص حقیقی اجباری است';

            this.setState({
                userName: user.userName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                isUserNameValid: true,
                isPasswordInvalid: true,
                isOrganizationRefInvalid: true,
                isPersonRefInvalid: true,
                isEmailValid: true,
                errors: errors,
                organizationRef: '',
                personRef: ''

            })
        }


    }
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async (event) => {
        var errors = { ...this.state.errors };

        switch (event.target.id) {

            //#region [- userName -]
            case "userName":
                if (event.target.value === "") {
                    this.setState({
                        isUserNameInvalid: true,
                        isUserNameValid: false
                    });
                    errors["userName"] = "نام کاربری اجباری است";
                }
                else {
                    this.setState({
                        isUserNameInvalid: false,
                        isUserNameValid: true
                    });
                }
                break;
            //#endregion

            //#region [- organizationRef -]
            case "organizationRef":
                if (event.target.value === "") {
                    this.setState({
                        isOrganizationRefInvalid: true,
                        isOrganizationRefValid: false
                    });
                    errors["organizationRef"] = " انتخاب شخص حقوقی اجباری است";

                }
                else {
                    this.setState({
                        isOrganizationRefInvalid: false,
                        isOrganizationRefValid: true
                    });
                }
                break;
            //#endregion

            //#region [- personRef -]
            case "personRef":
                if (event.target.value === "") {
                    this.setState({
                        isPersonRefInvalid: true,
                        isPersonRefValid: false
                    });
                    errors["personRef"] = ' انتخاب شخص حقیقی اجباری است';

                }
                else {
                    this.setState({
                        isPersonRefInvalid: false,
                        isPersonRefValid: true
                    });
                }
                break;
            //#endregion

            //#region [- password -]
            case "password":
                if (event.target.value === "") {
                    this.setState({
                        isPasswordInvalid: true,
                        isPasswordValid: false
                    });
                    errors["password"] = ' پسورد اجباری است';
                }
                else {
                    if (Object.keys(event.target.value).length < 8) {
                        this.setState({
                            isPasswordInvalid: true,
                            isPasswordValid: false
                        });
                        errors["password"] = 'طول پسورد می بایست حداقل هشت باشد';
                    }
                    else {
                        var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^&\*])(?=.{8,})");
                        if (!pattern.test(event.target.value)) {
                            this.setState({
                                isPasswordInvalid: true,
                                isPasswordValid: false
                            });
                            errors["password"] = 'رمز عبور میبایست ترکیبی از حروف، اعداد و کاراکترهای خاص (نمادها) باشد';
                        }
                        else {
                            this.setState({
                                isPasswordInvalid: false,
                                isPasswordValid: true
                            });
                        }
                    }
                }
                break;
            //#endregion

            //#region [- email -]
            case "email":
                if (event.target.value === "") {
                    this.setState({
                        isEmailInvalid: true,
                        isEmailValid: false
                    });
                    errors["email"] = ' ایمیل اجباری است';
                }
                else {
                    var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                    if (!emailPattern.test(event.target.value)) {
                        this.setState({
                            isEmailInvalid: true,
                            isEmailValid: false
                        });
                        errors["email"] = ' ایمیل نامعتبر است';
                    }
                    else {
                        this.setState({
                            isEmailInvalid: false,
                            isEmailValid: true
                        });
                    }
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

        //#region [- userName -]      
        if (this.state.userName === "") {
            this.setState({
                isUserNameInvalid: true,
                isUserNameValid: false
            });
            errors["userName"] = "نام کاربری اجباری است";
        }
        else {
            this.setState({
                isUserNameInvalid: false,
                isUserNameValid: true
            });
        }

        //#endregion

        //#region [- organizationRef -]      
        if (this.state.organizationRef === "") {
            this.setState({
                isOrganizationRefInvalid: true,
                isOrganizationRefValid: false
            });
            errors["organizationRef"] = " انتخاب شخص حقوقی اجباری است";
        }
        else {
            this.setState({
                isOrganizationRefInvalid: false,
                isOrganizationRefValid: true
            });
        }

        //#endregion

        //#region [- personRef -]      
        if (this.state.personRef === "") {
            this.setState({
                isPersonRefInvalid: true,
                isPersonRefValid: false
            });
            errors["personRef"] = ' انتخاب شخص حقیقی اجباری است';
        }
        else {
            this.setState({
                isPersonRefInvalid: false,
                isPersonRefValid: true
            });
        }

        //#endregion

        //#region [- password -]      
        if (this.state.password === "") {
            this.setState({
                isPasswordInvalid: true,
                isPasswordValid: false
            });
            errors["password"] = ' پسورد اجباری است';
        }
        else {
            if (Object.keys(this.state.password).length < 8) {
                this.setState({
                    isPasswordInvalid: true,
                    isPasswordValid: false
                });
                errors["password"] = 'طول پسورد می بایست حداقل هشت باشد';
            }
            else {
                var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^&\*])(?=.{8,})");
                if (!pattern.test(this.state.password)) {
                    this.setState({
                        isPasswordInvalid: true,
                        isPasswordValid: false
                    });
                    errors["password"] = 'رمز عبور میبایست ترکیبی از حروف، اعداد و کاراکترهای خاص (نمادها) باشد';
                }
                else {
                    this.setState({
                        isPasswordInvalid: false,
                        isPasswordValid: true
                    });
                }
            }
        }

        //#endregion

        //#region [- email -]      
        if (this.state.email === "") {
            this.setState({
                isEmailInvalid: true,
                isEmailValid: false
            });
            errors["email"] = ' ایمیل اجباری است';
        }
        else {
            var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!emailPattern.test(this.state.email)) {
                this.setState({
                    isEmailInvalid: true,
                    isEmailValid: false
                });
                errors["email"] = ' ایمیل نامعتبر است';
            }
            else {
                this.setState({
                    isEmailInvalid: false,
                    isEmailValid: true
                });
            }
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

    /* #region  [*** api  ***] */

    /* #region  [- putUser -] */
    putUser = async () => {

        let user = [{
            id: this.props.userId,
            userName: this.state.userName,
            email: this.state.email,
            domainRef: this.props.domain,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber,
        }]

        let employee = [{
            organizationRef: parseInt(this.state.organizationRef),
            personRef: parseInt(this.state.personRef),
            userName: this.state.userName
        }]

        let data = {
            userList: user,
            employeeList: employee

        }

        await this.props.putUser(JSON.stringify(data));
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- submit() -] */
    submit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.validateFormOnButtonClick() === true) {
            await this.putUser();
        }

    }
    /* #endregion */

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

    /* #region  [- render -] */
    render() {

        /* #region  [- combobox -] */

        const personTitleList = this.props.personTitleList.map(item => (
            <option key={item.id} value={item.id}>
                {item.title}
            </option>
        ));
        /* #endregion */

        /* #region  [- combobox -] */

        const organizationTitleList = this.props.organizationTitleList.map(item => (
            <option key={item.id} value={item.id}>
                {item.title}
            </option>
        ));
        /* #endregion */

        return (
            <Container fluid style={{  padding: '0 2% 0 0'  ,height:'93vh',overflow:'hidden scroll'}} >
                
                <Card name="edit card" style={{ width: '100%', margin: '0', padding:'0',height:'750px' }} >

                    <Row name='row_01_Header' className='form-header-row' style={{ margin:"0" }}>
                        <Col className="form-header-col">
                            <p className="form-header-title">جزییات کاربر</p>
                        </Col>
                    </Row>

                    <Row name="row_02_Form" style={{ padding:'1%',}}>

                        <Col sm="6">

                            <Form name='form'>

                                <FormGroup name="userName" className="reactstrap-formGroup">
                                    <Label for="userName">نام کاربری <span style={{ color: "red", fontSize: "20px" }}>*</span></Label>
                                    <Input
                                        type="text"
                                        name="userName"
                                        id="userName"
                                        value={this.state.userName}
                                        onChange={this.handleChange}
                                        invalid={this.state.isUserNameInvalid}
                                        valid={this.state.isUserNameValid}
                                    />
                                    <FormFeedback>{this.state.errors.userName}</FormFeedback>
                                </FormGroup>

                                <FormGroup name="password" className="reactstrap-formGroup">
                                    <Label for="password">پسورد <span style={{ color: "red", fontSize: "20px" }}>*</span></Label>
                                    <Input
                                        type="text"
                                        name="password"
                                        id="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        invalid={this.state.isPasswordInvalid}
                                        valid={this.state.isPasswordValid}
                                    />
                                    <FormFeedback>{this.state.errors.password}</FormFeedback>
                                </FormGroup>

                                <FormGroup name='organizationRef' style={{ textAlign: 'right' }}>

                                    <Label for="organizationRef">شخص حقوقی <span style={{ color: "red", fontSize: "20px" }}>*</span></Label>

                                    <Input
                                        type="select"
                                        name="organizationRef"
                                        id="organizationRef"
                                        onChange={this.handleChange}
                                        value={this.state.organizationRef}
                                        invalid={this.state.isOrganizationRefInvalid}
                                        valid={this.state.isOrganizationRefValid}
                                    >
                                        <option value="">انتخاب کنید ...</option>
                                        {organizationTitleList}
                                    </Input>
                                    <FormFeedback>{this.state.errors.organizationRef}</FormFeedback>

                                </FormGroup>

                                <FormGroup name='personRef' style={{ textAlign: 'right' }}>

                                    <Label for="personRef">شخص حقیقی <span style={{ color: "red", fontSize: "20px" }}>*</span></Label>

                                    <Input
                                        type="select"
                                        name="personRef"
                                        id="personRef"
                                        onChange={this.handleChange}
                                        value={this.state.personRef}
                                        invalid={this.state.isPersonRefInvalid}
                                        valid={this.state.isPersonRefValid}
                                    >
                                        <option value="">انتخاب کنید ...</option>
                                        {personTitleList}
                                    </Input>
                                    <FormFeedback>{this.state.errors.personRef}</FormFeedback>

                                </FormGroup>

                                <FormGroup name="email" className="reactstrap-formGroup">
                                    <Label for="email">ایمیل <span style={{ color: "red", fontSize: "20px" }}>*</span></Label>
                                    <Input
                                        type="text"
                                        name="email"
                                        id="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        invalid={this.state.isEmailInvalid}
                                        valid={this.state.isEmailValid}
                                    />
                                    <FormFeedback>{this.state.errors.email}</FormFeedback>
                                </FormGroup>

                                <FormGroup name="phone" className="reactstrap-formGroup">
                                    <Label for="phoneNumber">شماره تلفن</Label>
                                    <Input
                                        type="text"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        value={this.state.phoneNumber}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>

                            </Form>

                        </Col>
                        <Col sm="6"></Col>
                    </Row>

                    <Row name='row_03_Buttons' style={{ margin:"0" }}>

                        <Col sm='6' style={{ marginTop: "5px", textAlign: 'right', padding: '0' }}>
                            <Button name='submit' className='submit-button-style mr-2' onClick={this.submit}>ثبت</Button>
                        </Col>
                        <Col sm='6'></Col>
                    </Row>

                </Card>

            </Container>
        );
    }
    /* #endregion */

    /* #endregion */
}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        accessLevelList: state.auth.accessLevelList,
        checkTokenCounter: state.auth.checkTokenCounter,
        userId: state.account.userId,
        userItem: state.account.userItem,
        domain: state.auth.domain,
        employeeItem: state.account.employeeItem,
        personTitleList: state.account.personTitleList,
        organizationTitleList: state.account.organizationTitleList,

    };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    putUser: (data) => dispatch(putUser(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Setting);