import React, { PureComponent } from 'react';
import { connect } from "react-redux";
//import { Container, Row, Col } from 'reactstrap';
import logo from '../../logo.png';
import { Container, Form, FormGroup, Input, Label, Button, InputGroup, InputGroupAddon, FormFeedback } from 'reactstrap';
import { Row, Col, Divider } from 'antd';
import { ArrowRightOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { postLogin } from '../../redux/account/account.action';
import { checkTokenExpiration, decodeToken } from '../../redux/shared/auth/auth.action';
import { setSidebarSelectedItem } from '../../redux/shared/common/common.action';
import './login.component.css';
import { Modal } from 'antd';

class Login extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            //flags
            isUserNameHidden: false,
            isPasswordHidden: true,
            isPasswordShow: false,
            //
            passwordInputType: 'password',
            //#region [- formValidation -]
            userNameErrors: {},
            passwordErrors: {},

            isUserNameInvalid: false,
            isUserNameValid: false,

            isPasswordInvalid: false,
            isPasswordValid: false,

            //#endregion
            isMessageModalVisible: false,
            isMessageModalDestroy: true,
        }
    }
    /* #endregion */

    /* #region  [- componentDidMount() -] */
    async componentDidMount() {
        localStorage.clear();
        await this.props.checkTokenExpiration(-1);
    }
    /* #endregion */

    /* #region  [- componentDidUpdatev() -] */
    componentDidUpdate() {
        this.props.checkTokenExpiration(-1);
    }
    /* #endregion */

    /* #region  [- postLogin() -] */
    postLogin = async () => {
        let signInData = {
            signInList: [{
                userName: this.state.userName,
                password: this.state.password,
                rememberMe: false,
            }]
        }
        await this.props.postLogin(signInData);
    }
    /* #endregion */

    /* #region  [- inputHandleChange() -] */
    inputHandleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        this.validateForm(event)
    }
    /* #endregion */

    /* #region  [- toggleShowPassword() -] */
    toggleShowPassword = () => {
        if (this.state.isPasswordShow === false) {
            this.setState({
                isPasswordShow: true,
                passwordInputType: 'text',
            })
        }
        else {
            this.setState({
                isPasswordShow: false,
                passwordInputType: 'password',
            })
        }
    }
    /* #endregion */

    /* #region  [- back() -] */
    back = () => {
        this.setState({
            password: '',
            isUserNameHidden: false,
            isPasswordHidden: true,
            userNameErrors: {},
            passwordErrors: {},

            isUserNameInvalid: false,
            isUserNameValid: true,

            isPasswordInvalid: false,
            isPasswordValid: false,
        })
    }
    /* #endregion */

    /* #region  [- next() -] */
    next = () => {
        if (this.validateFormOnNextButtonClick() === true) {
            if (this.state.password !== '') {
                this.setState({
                    isUserNameHidden: true,
                    isPasswordHidden: false,
                    isPasswordInvalid: false,
                    isPasswordValid: true,
                })
            }
            else {
                this.setState({
                    isUserNameHidden: true,
                    isPasswordHidden: false,
                    isPasswordInvalid: false,
                    isPasswordValid: false,
                })
            }

        }

    }
    /* #endregion */

    /* #region  [- login() -] */
    login = async () => {
        if (this.validateFormOnLoginButtonClick() === true) {
            await this.postLogin();
            if (this.props.token !== null && this.props.token !== undefined) {
                localStorage.setItem("token", this.props.token);
                localStorage.setItem("encryptedToken", this.props.encryptedToken);
                await this.props.decodeToken(this.props.encryptedToken);
                if (this.props.userMenuAccessList !== undefined) {
                    if (Object.keys(this.props.userMenuAccessList).length > 0) {
                        this.props.history.push('/generalDashboard');
                        await this.props.setSidebarSelectedItem('dashboard');
                    }
                    else {
                        this.setState({
                            isMessageModalVisible: true,
                            isMessageModalDestroy: false,
                        })
                    }

                }
                else {
                    this.setState({
                        isMessageModalVisible: true,
                        isMessageModalDestroy: false,
                    })
                }
            }
        }
    }
    /* #endregion */

    //#region [- validateFormOnNextButtonClick() -]
    validateFormOnNextButtonClick = () => {
        var userNameErrors = {};
        var isFormValid = false;

        //#region [- userName -]      
        if (this.state.userName === "") {
            this.setState({
                isUserNameInvalid: true,
                isUserNameValid: false
            });
            userNameErrors["userName"] = "نام کاربری اجباری است";
        }
        else {
            this.setState({
                isUserNameInvalid: false,
                isUserNameValid: true
            });
        }

        //#endregion

        this.setState({
            userNameErrors: userNameErrors,
        });
        if (Object.keys(userNameErrors).length === 0) {
            isFormValid = true
        }
        else {
            isFormValid = false
        }
        return isFormValid;
    }

    //#endregion

    //#region [- validateFormOnLoginButtonClick() -]
    validateFormOnLoginButtonClick = () => {
        var passwordErrors = {};
        var isFormValid = false;

        //#region [- passwordErrors -]      
        if (this.state.password === "") {
            this.setState({
                isPasswordInvalid: true,
                isPasswordValid: false
            });
            passwordErrors["password"] = " رمز عبور اجباری است";
        }
        else {
            this.setState({
                isPasswordInvalid: false,
                isPasswordValid: true
            });
        }

        //#endregion

        this.setState({
            passwordErrors: passwordErrors,
        });
        if (Object.keys(passwordErrors).length === 0) {
            isFormValid = true
        }
        else {
            isFormValid = false
        }
        return isFormValid;
    }

    //#endregion

    //#region [- validateForm() -]
    validateForm = async (event) => {
        let userNameErrors = {}
        let passwordErrors = {}

        if (event.target.name === 'userName') {
            //#region [- userName -]      
            if (event.target.value === "") {
                this.setState({
                    isUserNameInvalid: true,
                    isUserNameValid: false
                });
                userNameErrors["userName"] = "نام کاربری اجباری است";
            }
            else {
                this.setState({
                    isUserNameInvalid: false,
                    isUserNameValid: true
                });
            }
            this.setState({
                userNameErrors: userNameErrors,
            });
            //#endregion
        }

        else if (event.target.name === 'password') {

            //#region [- password-]      
            if (event.target.value === "") {
                this.setState({
                    isPasswordInvalid: true,
                    isPasswordValid: false
                });
                passwordErrors["password"] = " رمز عبور اجباری است";
            }
            else {
                this.setState({
                    isPasswordInvalid: false,
                    isPasswordValid: true
                });
            }
            this.setState({
                passwordErrors: passwordErrors,
            });
            //#endregion
        }


    }
    //#endregion

    /* #region  [- onCancelMessageModal -] */
    onCancelMessageModal = () => {
        this.setState({
            isMessageModalVisible: false,
            isMessageModalDestroy: true,
        })
    }
    /* #endregion */

    /* #region  [- render() -] */
    render() {
        return (
            <div className='main-box responsive-main-box'>
                <div id='userName' hidden={this.state.isUserNameHidden} className='box responsive-box shadow'>
                    <Row title='logo' className='mb-5'>
                        <Col span={4}>
                            {/* <span onClick={this.back}>
                                <ArrowRightOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                            </span> */}
                        </Col>
                        <Col span={16}>
                            <img src={logo} alt='logo' className="logo" />
                        </Col>
                        <Col span={4}></Col>
                    </Row>
                    <Row title='title'>
                        <span style={{ fontWeight: '700', color: '#232933', marginBottom: '8px', fontSize: '1.800rem', lineHeight: '50px' }}>
                            ورود
                        </span>
                    </Row>
                    <Row title='form' className='mb-3'>
                        <Form style={{ width: '100%' }}>
                            <FormGroup title='userName' style={{ textAlign: 'right' }}>
                                <Label for="userName" style={{ color: '#62666d', fontSize: '.9rem', fontWeight: '400' }}>نام کاربری خود را وارد کنید</Label>
                                <Input
                                    type="text"
                                    name="userName"
                                    id="userName"
                                    value={this.state.userName}
                                    style={{ height: '2.7rem' }}
                                    onChange={this.inputHandleChange}
                                    invalid={this.state.isUserNameInvalid}
                                    valid={this.state.isUserNameValid}
                                />
                                <FormFeedback>{this.state.userNameErrors.userName}</FormFeedback>
                            </FormGroup>
                        </Form>
                    </Row>
                    <Row title='link' className='mb-3'>
                        <a style={{ color: '#12b4cd' }} href='forgetUserName'>نام کاربری خود را فراموش کرده ام !</a>
                    </Row>
                    <Row title='button'>
                        <Button onClick={this.next} style={{ width: '100%', backgroundColor: '#00416D', color: 'white', fontWeight: '700', fontSize: '1rem', height: '2.7rem' }}>
                            ادامه
                        </Button>
                    </Row>
                    <Divider />
                    <Row title='footer'>
                        <p style={{ color: '#62666d', fontSize: '.9rem', fontWeight: '400' }}>
                            با ورود به این سایت تمامی قوانین و مقررات آن را می پذیرم.
                        </p>
                    </Row>
                </div>
                <div id='password' hidden={this.state.isPasswordHidden} className='box responsive-box shadow'>
                    <Row title='logo' className='mb-5'>
                        <Col span={4}>
                            <span onClick={this.back}>
                                <ArrowRightOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                            </span>
                        </Col>
                        <Col span={16}>
                            <img src={logo} alt='logo' className="logo" />
                        </Col>
                        <Col span={4}></Col>
                    </Row>
                    <Row title='title'>
                        <span style={{ fontWeight: '700', color: '#232933', marginBottom: '8px', fontSize: '1.800rem', lineHeight: '50px' }}>
                            رمز عبور را وارد کنید
                        </span>
                    </Row>
                    <Row title='form' className='mb-3'>
                        <Form style={{ width: '100%' }}>
                            <FormGroup title='password' style={{ textAlign: 'right' }}>
                                <Label for="password" style={{ color: '#62666d', fontSize: '.9rem', fontWeight: '400' }}>رمز عبور حساب کاربری خود را وارد کنید</Label>

                                <InputGroup>
                                    <Input
                                        type={this.state.passwordInputType}
                                        name="password"
                                        id="password"
                                        value={this.state.password}
                                        style={{ height: '2.7rem' }}
                                        onChange={this.inputHandleChange}
                                        invalid={this.state.isPasswordInvalid}
                                        valid={this.state.isPasswordValid}
                                    />
                                    <InputGroupAddon addonType="prepend">
                                        <Button onClick={this.toggleShowPassword} style={{ paddingBottom: '9px' }}>
                                            {this.state.isPasswordShow ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                        </Button>
                                    </InputGroupAddon>
                                    <FormFeedback>{this.state.passwordErrors.password}</FormFeedback>
                                </InputGroup>

                            </FormGroup>
                        </Form>
                    </Row>
                    <Row title='link' className='mb-3'>
                        <a style={{ color: '#12b4cd' }} href='forgetPassword'>بازیابی رمز عبور</a>
                    </Row>
                    <Row title='button'>
                        <Button onClick={this.login} style={{ width: '100%', backgroundColor: '#00416D', color: 'white', fontWeight: '700', fontSize: '1rem', height: '2.7rem' }}>
                            ورود
                        </Button>
                    </Row>
                </div>

                <Row name="row_01_Modal">

                    <Modal name="messageModal"
                        visible={this.state.isMessageModalVisible}
                        destroyOnClose={this.state.isMessageModalDestroy}
                        bodyStyle={{ padding: '0px' }}
                        onCancel={this.onCancelMessageModal}
                        width={400}
                        footer={[
                            <Button key='2' className='submit-button-style' onClick={this.onCancelMessageModal} >
                                متوجه شدم
                            </Button>,
                        ]}
                    >
                        <Container fluid>

                            <Row name='row_01_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>پیام خطا</span>
                                </Col>
                            </Row>

                            <Row name='row_02_Modal_Content' style={{ margin: '5% 0 5% 0' }}>
                                <Col sm='12' style={{ textAlign: 'right' }}>
                                    <h5>کابر مجاز به ورود نیست.</h5>
                                </Col>
                            </Row>

                        </Container>
                    </Modal>

                </Row>



            </div>
        );
    }
    /* #endregion */
}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        token: state.account.token,
        encryptedToken: state.account.encryptedToken,
        userMenuAccessList: state.auth.userMenuAccessList,
    };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    postLogin: (data) => dispatch(postLogin(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    setSidebarSelectedItem: (data) => dispatch(setSidebarSelectedItem(data)),
    decodeToken: (data) => dispatch(decodeToken(data))
});

/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Login);