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

class EditPersonAccount extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            stepContent: <PersonalInformation personId={this.props.insertedPersonId} editMode={true} onRef={ref => (this.child = ref)} />,
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
                stepContent: <AccessLevel personId={this.props.insertedPersonId} />,
            })
        }
        else if (this.state.currentStep === 2) {
            this.setState({
                currentStep: 3,
                stepContent: <ExtraInfo personId={this.props.insertedPersonId} />,
            })
        }
        else if (this.state.currentStep === 3) {
            this.setState({
                currentStep: 4,
                stepContent: <AttachFile personId={this.props.insertedPersonId} />,
                isNextStepButtonHidden: true,
                isFinishButtonHidden: false,
            })
        }
    }
    /* #endregion */

    /* #region  [- onChangeStep(current) -] */
    onChangeStep = async current => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (current === 0) {
            await this.getPersonItem(this.props.insertedPersonId);
            this.setState({
                currentStep: 0,
                stepContent: <PersonalInformation personId={this.props.insertedPersonId} editMode={true} onRef={ref => (this.child = ref)} />,
                isSaveButtonHidden: false,
                isNextStepButtonHidden: true,
                isFinishButtonHidden: true,
            })
        }
        if (current === 1) {
            this.setState({
                currentStep: 1,
                stepContent: <UserName personId={this.props.insertedPersonId} />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
                isFinishButtonHidden: true
            })
        }
        else if (current === 2) {
            this.setState({
                currentStep: 2,
                stepContent: <AccessLevel personId={this.props.insertedPersonId} />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
                isFinishButtonHidden: true
            })
        }
        else if (current === 3) {
            this.setState({
                currentStep: 3,
                stepContent: <ExtraInfo personId={this.props.insertedPersonId} />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
                isFinishButtonHidden: true
            })
        }
        else if (current === 4) {
            this.setState({
                currentStep: 4,
                stepContent: <AttachFile personId={this.props.insertedPersonId} />,
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
                stepContent: <UserName personId={this.props.insertedPersonId} />,
                //flags
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
            })}
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

    /* #region  [- getPersonItem() -] */
    getPersonItem = async (id) => {
        let personItemGetData = {
            personId: id
        }
        await this.props.getPersonItem(personItemGetData);
    }
    /* #endregion */

    /* #region  [- render() -] */
    render() {
        return (<Container fluid style={{ height: '76vh', backgroundColor: 'white' }}>

            <Row name='row_01_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                    <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}>ویرایش شخص حقیقی</span>
                </Col>
            </Row>

            <Row name='row_02_Steps' style={{ height: '63vh' }}>

                <Col name='steps' sm='3' style={{ borderLeft: '1px solid black', paddingTop: '1%', height: '60vh', overflowY: 'scroll' }}>
                    <Steps direction="vertical" current={this.state.currentStep} onChange={this.onChangeStep}>
                        <Step title="اطلاعات فردی" disabled={false} />
                        <Step title="نام کاربری" disabled={false} />
                        <Step title="سطح دسترسی" disabled={false} />
                        <Step title="اطلاعات بیشتر" disabled={false} />
                        <Step title="فایل های پیوست" disabled={false} />
                    </Steps>
                </Col>
                <Col name='forms' sm='9' style={{ height: 'inherit', overflowY: 'scroll' }}>
                    {this.state.stepContent}
                </Col>
            </Row>

            <Row name='row_03_Buttons' style={{ margin: '0', padding: '0', borderTop: '1px solid #f0f0f0', height: '7vh', width: '100%', alignContent: 'center', }}>

                <Col sm='6' style={{ textAlign: 'right' }}></Col>

                <Col sm='6' style={{ textAlign: 'left' }}>
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
        domain: state.auth.domain,

    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getPersonItem: (data) => dispatch(getPersonItem(data)),
});

/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(EditPersonAccount);