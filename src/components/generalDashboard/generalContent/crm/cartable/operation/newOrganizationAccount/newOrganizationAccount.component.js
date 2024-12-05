/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Button } from 'reactstrap';
import { Steps } from 'antd';
import RegistrationInformation from './registrationInformation/registrationInformation.component'
import Category from './category/category.component'
import Position from './position/position.component'
import Employee from './employee/employee.component'
import Representative from './representative/representative.component'
import OrganizationExtraInfo from './organizationExtraInfo/organizationExtraInfo.component'
import OrganizationAttachFile from './organizationAttachFile/organizationAttachFile.component'
import { resetProps } from '../../../../../../../redux/infrastructure/organization/organization.action'
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { getOrganizationItem } from '../../../../../../../redux/infrastructure/organization/organization.action';
/* #region  [- consts -] */
const { Step } = Steps;
/* #endregion */

/* #endregion */

class NewOrganizationAccount extends PureComponent {

    /* #region  [- ctor -] */

    constructor(props) {
        super(props);
        this.state = {
            stepContent: <RegistrationInformation editMode={false} onRef={ref => (this.child = ref)} />,
            currentStep: 0,
            insertedPersonId: 0,

            //ّّFlags
            isSaveButtonHidden: false,
            isNextStepButtonHidden: true,
            isFinishButtonHidden: true,
            isStepDisabled: true,
        }
    }
    /* #endregion */

    /* #region  [- methods -] */

    /* #region  [- nextStep() -] */
    nextStep = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.state.currentStep === 1) {
            this.setState({
                currentStep: 2,
                stepContent: <Position organizationId={this.props.insertedOrganizationId} />,
                isStepDisabled: false,
            })
        }
        else if (this.state.currentStep === 2) {
            this.setState({
                currentStep: 3,
                stepContent: <Employee organizationId={this.props.insertedOrganizationId} />,
                isStepDisabled: false,
            })
        }
        else if (this.state.currentStep === 3) {
            this.setState({
                currentStep: 4,
                stepContent: <Representative organizationId={this.props.insertedOrganizationId} />,
                isStepDisabled: false,

            })
        }
        else if (this.state.currentStep === 4) {
            this.setState({
                currentStep: 5,
                stepContent: <OrganizationExtraInfo organizationId={this.props.insertedOrganizationId} />,
                isStepDisabled: false,

            })
        }
        else if (this.state.currentStep === 5) {
            this.setState({
                currentStep: 6,
                stepContent: <OrganizationAttachFile organizationId={this.props.insertedOrganizationId} />,
                isStepDisabled: false,
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
            await this.getOrganizationItem(this.props.insertedOrganizationId);
            this.setState({
                currentStep: 0,
                stepContent: <RegistrationInformation organizationId={this.props.insertedOrganizationId} editMode={true} onRef={ref => (this.child = ref)} />,
                isSaveButtonHidden: false,
                isNextStepButtonHidden: true,
                isFinishButtonHidden: true,
                isStepDisabled: true,
            })
        }

        if (current === 1) {
            this.setState({
                currentStep: 1,
                stepContent: <Category organizationId={this.props.organizationId} />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
                isFinishButtonHidden: true,
                isStepDisabled: false,
            })
        }
        else if (current === 2) {
            this.setState({
                currentStep: 2,
                stepContent: <Position organizationId={this.props.organizationId} />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
                isFinishButtonHidden: true,
                isStepDisabled: false,
            })
        }
        else if (current === 3) {
            this.setState({
                currentStep: 3,
                stepContent: <Employee organizationId={this.props.organizationId} />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
                isFinishButtonHidden: true,
                isStepDisabled: false,
            })
        }
        else if (current === 4) {
            this.setState({
                currentStep: 4,
                stepContent: <Representative organizationId={this.props.organizationId} />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
                isFinishButtonHidden: true,
                isStepDisabled: false,

            })
        }
        else if (current === 5) {
            this.setState({
                currentStep: 5,
                stepContent: <OrganizationExtraInfo organizationId={this.props.organizationId} />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
                isFinishButtonHidden: true,
                isStepDisabled: false,

            })
        }
        else if (current === 6) {
            this.setState({
                currentStep: 6,
                stepContent: <OrganizationAttachFile organizationId={this.props.organizationId} />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: true,
                isFinishButtonHidden: false,
                isStepDisabled: false,
            })
        }
    }


    /* #endregion */

    /* #region  [- save() -] */
    save = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        let result=false
        if (this.props.insertedOrganizationId !== '' && this.props.insertedOrganizationId !== null) {
            result = await this.child.putOrganization();

        }
        else {
            result = await this.child.postOrganizationAccount();
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
            if (this.props.insertedOrganizationId !== '' && this.props.insertedOrganizationId !== null) {
                result = await this.child.putOrganization();
    
            }
            else {
                result = await this.child.postOrganizationAccount();
            }
            if (result === true){
            this.setState({
                currentStep: 1,
                stepContent: <Category organizationId={this.props.insertedOrganizationId} />,
                //flags
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
                isStepDisabled: false,
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

    /* #region  [- getOrganizationItem() -] */
    getOrganizationItem = async (id) => {
        let organizationItemGetData = {
            organizationId: id,
            domainRef: this.props.domain,

        }
        await this.props.getOrganizationItem(organizationItemGetData);
    }
    /* #endregion */

    /* #region  [- render() -] */
    render() {
        return (
            <Container fluid style={{ height: '76vh', backgroundColor: 'white' }}>

                <Row name='row_01_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}>شخص حقوقی جدید</span>
                    </Col>
                </Row>
                <Row name='row_02_Steps' style={{ height: '63vh' }}>

                    <Col name='steps' sm='3' style={{ borderLeft: '1px solid black', paddingTop: '1%', height: '60vh', overflowY: 'scroll' }}>
                        <Steps direction="vertical" current={this.state.currentStep} onChange={this.onChangeStep}>
                            <Step title="اطلاعات ثبتی" disabled={false} />
                            <Step title="واحدهای سازمانی " disabled={this.state.isStepDisabled} />
                            <Step title="سمت ها " disabled={this.state.isStepDisabled} />
                            <Step title=" کارمندان " disabled={this.state.isStepDisabled} />
                            <Step title="نمایندگان" disabled={this.state.isStepDisabled} />
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
        insertedOrganizationId: state.organizationAccount.insertedOrganizationId,
        message: state.organization.message,
        checkTokenCounter: state.auth.checkTokenCounter,
        domain: state.auth.domain,
    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    resetProps: (data) => dispatch(resetProps(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getOrganizationItem: (data) => dispatch(getOrganizationItem(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(NewOrganizationAccount);