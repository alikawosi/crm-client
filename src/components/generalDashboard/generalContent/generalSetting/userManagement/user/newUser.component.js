/* #region  [- imports -] */
import React, { PureComponent } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
import { Steps } from 'antd';
import UserAccount from './userAccount.component'
import AllocateUserToPerson from './allocateUserToPerson.component'
const { Step } = Steps;

/* #endregion */

class NewUser extends PureComponent {

    /* #region  [ - ctor - ] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            roles: [],
            stepContent: <UserAccount onRef={ref => (this.firstChild = ref)} />,
            currentStep: 0,
            /* #endregion */

            /* #region  [- flags -] */
            isSaveButtonHidden: false,
            isSaveAndContinueButtonHidden: false,
            isAllocateUserToPersonStepDisabled: true,
            /* #endregion */
        };
    }

    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [ - componentDidMount - ] */
    async componentDidMount() {
        this.loadFormData()
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

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region   [ - save - ] */
    save = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.state.currentStep === 0) {
            if (this.firstChild.validateUserAccountFormOnButtonClick() === true) {
                await this.firstChild.createUser();
                this.props.onClose();
                this.setState({
                    isAllocateUserToPersonStepDisabled: false
                })
            }
        }
        else {
            if (this.secondChild.validateAllocateUserToPersonFormOnButtonClick() === true) {
                await this.secondChild.allocateUserToPerson();
                this.props.onClose();
            }
        }

    };
    /* #endregion */

    /* #region  [- saveAndContinue() -] */
    saveAndContinue = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.state.currentStep === 0) {
            if (this.firstChild.validateUserAccountFormOnButtonClick() === true) {
                await this.firstChild.createUser();
                this.setState({
                    currentStep: 1,
                    stepContent: <AllocateUserToPerson  onRef={ref => (this.secondChild = ref)} />,
                    //flags
                    isSaveButtonHidden: false,
                    isSaveAndContinueButtonHidden: true,
                    isAllocateUserToPersonStepDisabled: false

                })
            }

        }
    }
    /* #endregion */

    /* #region  [- finish -] */
    finish = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);

    }
    /* #endregion */

    /* #region  [- cancel -] */
    cancel = () => {
        this.props.onClose();

    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** Handle Changes ***] */


    /* #endregion */

    /* #region  [ - render - ] */
    render() {

        return (

            <Container fluid >
                <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0',}}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>کاربر جدید </span>
                    </Col>
                </Row>
                <Row title='content' style={{  }}>
                    <Col title='steps' sm='3' md='3' lg='3' style={{ borderLeft: '1px solid #f0f0f0', paddingTop: '10%' }}>
                        <Steps direction="vertical" current={this.state.currentStep} >
                            <Step title="حساب کاربری"/>
                            <Step title="اختصاص حساب کاربری به شخص"  style={{fontSize:'12px'}} disabled={this.state.isAllocateUserToPersonStepDisabled} />
                        </Steps>
                    </Col>
                    <Col title='forms' sm='9' md='9' lg='9' style={{overflowY: 'scroll' }}>
                        {this.state.stepContent}
                    </Col>
                </Row>
                <Row title='buttons' style={{ height: '6vh', borderTop: '1px solid #f0f0f0' }}>
                    <Col sm='12' md='12' lg='12' style={{ lineHeight: '6vh' }}>
                        <Button className='cancel-button-style mr-2' onClick={this.cancel}> لغو </Button>
                        <Button className='submit-button-style mr-2' onClick={this.save} hidden={this.state.isSaveButtonHidden}> ذخیره </Button>
                        <Button className='submit-button-style mr-2' onClick={this.saveAndContinue} hidden={this.state.isSaveAndContinueButtonHidden}> ذخیره و ادامه </Button>

                    </Col>
                </Row>
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
        domain: state.auth.domain,

    };
};

/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = (dispatch) => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
