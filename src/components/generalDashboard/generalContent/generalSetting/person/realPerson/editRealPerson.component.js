/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Button } from 'reactstrap';
import { Steps } from 'antd';
import PersonalInformation from './personalInformation/personalInformation.component';
import UserName from './userName/userName.component';
import AccessLevel from './accesLevel/accessLevel.component';
import ExtraInfo from './extraInfo/extraInfo.component';
import AttachFile from './attachFile/attachFile.component';
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
/* #endregion */

const { Step } = Steps;

class EditRealPerson extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            stepContent: <PersonalInformation personId={this.props.personId} editMode={true} onRef={ref => (this.child = ref)} />,
            currentStep: 0,
            insertedPersonId: 0,
            //flags
            isSaveButtonHidden: false,
            isNextStepButtonHidden: true,
            isFinishButtonHidden: true,
        }
    }
    /* #endregion */

    /* #region  [- method -] */

    /* #region  [- nextStep() -] */
    nextStep = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.state.currentStep === 1) {
            this.setState({
                currentStep: 2,
                stepContent: <AccessLevel personId={this.props.personId} />,
            })
        }
        else if (this.state.currentStep === 2) {
            this.setState({
                currentStep: 3,
                stepContent: <ExtraInfo personId={this.props.personId} />,
            })
        }
        else if (this.state.currentStep === 3) {
            this.setState({
                currentStep: 4,
                stepContent: <AttachFile personId={this.props.personId} />,
                isNextStepButtonHidden: true,
                isFinishButtonHidden: false,
            })
        }
    }
    /* #endregion */

    /* #region  [- onChangeStep(current) -] */
    onChangeStep = async current => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        //console.log('current is :', current);
        if (current === 0) {
            this.setState({
                stepContent: <PersonalInformation personId={this.props.personId} editMode={true} onRef={ref => (this.child = ref)} />,
                currentStep: 0,
                isSaveButtonHidden: false,
                isNextStepButtonHidden: true,
                isFinishButtonHidden: true,
            })
        }
        if (current === 1) {
            this.setState({
                currentStep: 1,
                stepContent: <UserName personId={this.props.personId} />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
                isFinishButtonHidden: true
            })
        }
        else if (current === 2) {
            this.setState({
                currentStep: 2,
                stepContent: <AccessLevel personId={this.props.personId} />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
                isFinishButtonHidden: true
            })
        }
        else if (current === 3) {
            this.setState({
                currentStep: 3,
                stepContent: <ExtraInfo personId={this.props.personId} />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
                isFinishButtonHidden: true
            })
        }
        else if (current === 4) {
            this.setState({
                currentStep: 4,
                stepContent: <AttachFile personId={this.props.personId} />,
                isNextStepButtonHidden: true,
                isFinishButtonHidden: false,
            })
        }
    }
    /* #endregion */


    /* #region  [- save() -] */
    save = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        let result = await this.child.putPerson();;
        if (result === true) {
            this.props.onClose();
        }
    }
    /* #endregion */

    /* #region  [- saveAndContinue() -] */
    saveAndContinue = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.state.currentStep === 0) {
            let result = await this.child.putPerson();
            if (result === true){
            this.setState({
                currentStep: 1,
                stepContent: <UserName personId={this.props.personId} />,
                //flags
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
            })
            }
            

        }
    }
    /* #endregion */

    /* #region  [- finish() -] */
    finish = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.onClose();

    }
    /* #endregion */

    /* #region  [- cancel() -] */
    cancel = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.onClose();
    }
    /* #endregion */


    /* #region  [- render() -] */
    render() {
        return (
            <Container fluid style={{ height: '100vh' }}>
                <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>ویرایش شخص حقیقی</span>
                    </Col>
                </Row>
                <Row title='content' style={{ height: '89vh' }}>
                    <Col title='steps' sm='3' style={{ borderLeft: '1px solid #f0f0f0', paddingTop: '10%' }}>
                        <Steps direction="vertical" current={this.state.currentStep} onChange={this.onChangeStep}>
                            <Step title="اطلاعات فردی" disabled={false} />
                            <Step title="نام کاربری" disabled={false} />
                            <Step title="سطح دسترسی" disabled={false} />
                            <Step title="اطلاعات بیشتر" disabled={false} />
                            <Step title="فایل های پیوست" disabled={false} />
                        </Steps>
                    </Col>
                    <Col title='forms' sm='9' style={{ height: 'inherit', overflowY: 'scroll' }}>
                        {this.state.stepContent}
                    </Col>
                </Row>
                <Row title='buttons' style={{ height: '6vh', borderTop: '1px solid #f0f0f0' }}>
                    <Col sm='12' style={{ lineHeight: '6vh' }}>
                        <Button className='cancel-button-style mr-2' onClick={this.cancel}>
                            لغو
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.save} hidden={this.state.isSaveButtonHidden}>
                            ذخیره
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.saveAndContinue} hidden={this.state.isSaveButtonHidden}>
                            ذخیره و ادامه
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.nextStep} hidden={this.state.isNextStepButtonHidden}>
                            مرحله بعد
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.finish} hidden={this.state.isFinishButtonHidden}>
                            پایان
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
        checkTokenCounter: state.auth.checkTokenCounter,
    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});

/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(EditRealPerson);