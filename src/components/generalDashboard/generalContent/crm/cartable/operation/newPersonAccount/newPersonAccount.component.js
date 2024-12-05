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
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { getPersonItem } from '../../../../../../../redux/infrastructure/person/person.action';
/* #endregion */

const { Step } = Steps;

class NewPersonAccount extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            stepContent: <PersonalInformation editMode={false} onRef={ref => (this.child = ref)} />,
            currentStep: 0,
            //flags
            isSaveButtonHidden: false,
            isNextStepButtonHidden: true,
            isFinishButtonHidden: true,
            isStepDisabled:true,
        }
    }
    /* #endregion */

    /* #region  [- method -] */

     
    /* #region  [- onChangeStep(current) -] */
    onChangeStep = async current => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (current === 0) {
           await this.getPersonItem(this.props.insertedPersonId);
            this.setState({
                stepContent: <PersonalInformation personId={this.props.insertedPersonId} editMode={true} onRef={ref => (this.child = ref)} />,
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
                isStepDisabled:false,
            })
        }
        if (current === 2) {
            this.setState({
                currentStep: 2,
                stepContent: <AccessLevel />,
                isStepDisabled:false,
            })
        }
        else if (current === 3) {
            this.setState({
                currentStep: 3,
                stepContent: <ExtraInfo personId={this.props.insertedPersonId} />,
                isStepDisabled:false,
            })
        }
        else if (current === 4) {
            this.setState({
                currentStep: 4,
                stepContent: <AttachFile personId={this.props.insertedPersonId} />,
                isNextStepButtonHidden: true,
                isFinishButtonHidden: false,
                isStepDisabled:false,
            })
        }
    }
    /* #endregion */

    /* #region  [- cancel() -] */
    cancel = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.onClose();
    }
    /* #endregion */

    /* #region  [- save() -] */
    save = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        let result=false
        if(this.props.insertedPersonId!=='' && this.props.insertedPersonId!==null){
            result = await this.child.putPerson();

        }
        else{
            result = await this.child.postPersonAccount();

        }
        if (result === true) {
            this.props.onClose();
        }
    }
    /* #endregion */

    /* #region  [- saveAndContinue() -] */
    saveAndContinue = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.state.currentStep === 0) {
            let result=false
            if(this.props.insertedPersonId!=='' && this.props.insertedPersonId!==null){
                result = await this.child.putPerson();
            }
            else{
                result = await this.child.postPersonAccount();
            }
            if (result === true){
                this.setState({
                    currentStep: 1,
                    stepContent: <UserName />,
                    //flags
                    isSaveButtonHidden: true,
                    isNextStepButtonHidden: false,
                    isStepDisabled:false,
                })
            }
                
 
        }
    }
    /* #endregion */

    /* #region  [- nextStep() -] */
    nextStep = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.state.currentStep === 1) {
            this.setState({
                currentStep: 2,
                stepContent: <AccessLevel />,
                isStepDisabled:false,
            })
        }
        else if (this.state.currentStep === 2) {
            this.setState({
                currentStep: 3,
                stepContent: <ExtraInfo personId={this.props.insertedPersonId} />,
                isStepDisabled:false,
            })
        }
        else if (this.state.currentStep === 3) {
            this.setState({
                currentStep: 4,
                stepContent: <AttachFile personId={this.props.insertedPersonId} />,
                isNextStepButtonHidden: true,
                isFinishButtonHidden: false,
                isStepDisabled:false,
            })
        }
    }
    /* #endregion */

    /* #region  [- finish() -] */
    finish = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.onClose();
    }
    /* #endregion */

    /* #region  [- getPersonItem() -] */
    getPersonItem = async (insertedPersonId) => {
        let personItemGetData = {
            personId: insertedPersonId
        }
        await this.props.getPersonItem(personItemGetData);
    }
    /* #endregion */

    /* #region  [- render() -] */
    render() {
        return (
            <Container fluid style={{ height: '76vh',backgroundColor:'white' }}>

                <Row name='row_01_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}>شخص حقیقی جدید</span>
                    </Col>
                </Row>

                <Row name='row_02_Steps' style={{ height: '63vh' }}>

                    <Col name='steps' sm='3' style={{ borderLeft: '1px solid black', paddingTop: '1%', height: '60vh', overflowY: 'scroll' }}>
                        <Steps direction="vertical" current={this.state.currentStep} onChange={this.onChangeStep}>
                            <Step title="اطلاعات فردی" disabled={false} />
                            <Step title="نام کاربری" disabled={this.state.isStepDisabled} />
                            <Step title="سطح دسترسی" disabled={this.state.isStepDisabled} />
                            <Step title="اطلاعات بیشتر" disabled={this.state.isStepDisabled} />
                            <Step title="فایل های پیوست" disabled={this.state.isStepDisabled} />
                        </Steps>
                    </Col>
                    <Col name='forms' sm='9' style={{ height: 'inherit', overflowY: 'scroll' }}>
                        {this.state.stepContent}
                    </Col>
                </Row>

                <Row name='row_03_Buttons' style={{ margin: '0', padding: '0', borderTop: '1px solid #f0f0f0', height: '7vh', width: '100%', alignContent: 'center', }}>
                  
                    <Col sm='6' style={{ textAlign: 'right' }}></Col>

                    <Col sm='6' style={{ textAlign: 'left' }}>
                        <Button name='cancel' className='cancel-button-style mr-2' onClick={this.cancel}>
                            لغو
                        </Button>
                        <Button name='save' className='submit-button-style mr-2' onClick={this.save} hidden={this.state.isSaveButtonHidden}>
                            ذخیره
                        </Button>
                        <Button name='saveAndContinue' className='submit-button-style mr-2' onClick={this.saveAndContinue} hidden={this.state.isSaveButtonHidden}>
                            ذخیره و ادامه
                        </Button>
                        <Button name='next' className='submit-button-style mr-2' onClick={this.nextStep} hidden={this.state.isNextStepButtonHidden}>
                            مرحله بعد
                        </Button>
                        <Button name='finish' className='submit-button-style mr-2' onClick={this.finish} hidden={this.state.isFinishButtonHidden}>
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
        insertedPersonId: state.personAccount.insertedPersonId,
        checkTokenCounter: state.auth.checkTokenCounter,
        domain:state.auth.domain,
    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getPersonItem: (data) => dispatch(getPersonItem(data)),
});

/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(NewPersonAccount);