/* #region  [- imports -] */
import React, { PureComponent } from "react";
import { Container, FormGroup, Label, Form, Input, FormFeedback } from "reactstrap";
import { connect } from "react-redux";
import { Multiselect } from 'react-widgets'
import { getUserData, createUser } from '../../../../../../redux/account/account.action'

/* #endregion */

class UserAccount extends PureComponent {

    /* #region  [ - ctor - ] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            roles: [],
            userName: '',
            password: '',
            email: '',
            phone: null,
            /* #endregion */

            //#region [- formValidation -]
            errors: {},

            isUserNameInvalid: false,
            isUserNameValid: false,
            isPasswordInvalid: false,
            isPasswordValid: false,
            isEmailInvalid: false,
            isEmailValid: false,
            //#endregion

        };
    }

    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [ - componentDidMount - ] */
    async componentDidMount() {
        await this.getUserData()
        this.loadFormData()
        this.props.onRef(this);

    }

    /* #endregion */

    /* #region  [- getUserData -] */
    getUserData = async () => {
        let data = {
            domainRef: this.props.domain
        }
        await this.props.getUserData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- loadFormData -] */
    loadFormData = () => {
        this.setState({
            roles: this.props.defaultRoleTitleList
        })
    }
    /* #endregion */

    /* #region  [ - onClose - ] */
    onClose = async () => {
        await this.props.setIsVisibleNewUser(false);
        //await this.props.deSelectRows();
    };
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async (event) => {
        var errors = {};

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

    //#region [- validateUserAccountFormOnButtonClick() -]
    validateUserAccountFormOnButtonClick = () => {
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

    /* #region  [*** api ***] */

    /* #region   [ - createUser - ] */
    createUser = async () => {

        let user = [{
            userName: this.state.userName,
            email: this.state.email,
            domainRef: this.props.domain,
            password: this.state.password,
            phoneNumber: this.state.phone,
        }]

        let data = {
            userList: user,
            roleList: this.state.roles,
            domainRef: this.props.domain
        }

        await this.props.createUser(JSON.stringify(data));
    };
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [ - handleChange - ] */
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
        this.validateForm(event);
    };
    /* #endregion */

    /* #region  [- roleHandelChange -] */
    roleHandelChange = (e) => {
        this.setState({
            roles: e
        })

    }
    /* #endregion */

    /* #endregion */

    /* #region  [ - render - ] */
    render() {

        return (

            <Container fluid className="reacstrap-container" style={{ padding: "0" }} >

                <Form name='form' className="reactstrap-form">

                    <FormGroup name="userName" style={{ textAlign: 'right' }}>
                        <Label for="userName" style={{ textAlign: 'right' }}>نام کاربری <span style={{ color: "red", fontSize: "20px" }}>*</span></Label>
                        <Input
                            type="text"
                            name="userName"
                            id="userName"
                            placeholder="نام کاربری "
                            value={this.state.userName}
                            onChange={this.handleChange}
                            invalid={this.state.isUserNameInvalid}
                            valid={this.state.isUserNameValid}
                        />
                        <FormFeedback>{this.state.errors.userName}</FormFeedback>
                    </FormGroup>

                    <FormGroup name='password' style={{ textAlign: 'right' }}>
                        <Label for="password" style={{ textAlign: 'right' }}>پسورد<span style={{ color: "red", fontSize: "20px" }}>*</span></Label>
                        <Input
                            type="text"
                            name="password"
                            id="password"
                            placeholder="پسورد"
                            value={this.state.password}
                            onChange={this.handleChange}
                            invalid={this.state.isPasswordInvalid}
                            valid={this.state.isPasswordValid}
                        />
                        <FormFeedback>{this.state.errors.password}</FormFeedback>

                    </FormGroup>

                    <FormGroup name='email' style={{ textAlign: 'right' }}>
                        <Label for="email" style={{ textAlign: 'right' }}>ایمیل<span style={{ color: "red", fontSize: "20px" }}>*</span></Label>
                        <Input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="ایمیل"
                            value={this.state.email}
                            onChange={this.handleChange}
                            invalid={this.state.isEmailInvalid}
                            valid={this.state.isEmailValid}

                        />
                        <FormFeedback>{this.state.errors.email}</FormFeedback>
                    </FormGroup>

                    <FormGroup name='phone' style={{ textAlign: 'right' }}>
                        <Label for="phone" style={{ textAlign: 'right' }}>شماره تلفن</Label>
                        <Input
                            type="number"
                            name="phone"
                            id="phone"
                            placeholder="شماره تلفن"
                            value={this.state.phone}
                            onChange={this.handleChange}

                        />
                    </FormGroup>

                    <FormGroup name='roles' style={{ textAlign: 'right' }} >
                        <Label for="roles" style={{ textAlign: 'right' }}>نقش ها</Label>
                        <Multiselect
                            data={this.props.roleTitleList}
                            valueField='id'
                            textField='title'
                            value={this.state.roles}
                            disabled={this.props.defaultRoleTitleList}
                            onChange={this.roleHandelChange}
                        />

                    </FormGroup>

                </Form>
            </Container>
        );
    }
    /* #endregion */

    /* #endregion */
}

/* #region  [ - mapStateToProps - ] */
const mapStateToProps = (state) => {
    return {
        roleTitleList: state.account.roleTitleList,
        defaultRoleTitleList: state.account.defaultRoleTitleList,
        domain: state.auth.domain
    };
};

/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = (dispatch) => ({

    getUserData: (data) => dispatch(getUserData(data)),
    createUser: (data) => dispatch(createUser(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
