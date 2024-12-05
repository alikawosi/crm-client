/* #region  [- import -] */
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
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
import { getOrganizationItem } from '../../../../../../redux/infrastructure/organization/organization.action'

/* #endregion */

const { Step } = Steps;

class EditLegalPerson extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            stepContent: <RegistrationInformation organizationId={this.props.organizationId} editMode={true} onRef={ref => (this.child = ref)} />,
            currentStep: 0,
            insertedOrganizationId: 0,
            //flags
            isSaveButtonHidden: false,
            isNextStepButtonHidden: true,
            isFinishButtonHidden: true,
        }
    }
    /* #endregion */

    /* #region  [- method -] */

    /* #region  [- onChangeStep(current) -] */
    onChangeStep = async current => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (current === 0) {
            await  this.getOrganizationItem();
            this.setState({
              currentStep: 0,
              stepContent: <RegistrationInformation organizationId={this.props.organizationId} editMode={true} onRef={ref => (this.child = ref)} />,
              isSaveButtonHidden: false,
              isNextStepButtonHidden: true,
              isFinishButtonHidden: true,
          })
      
          }
       else if (current === 1) {
            this.setState({
                currentStep: 1,
                stepContent: <Category organizationId={this.props.organizationId} />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
                isFinishButtonHidden: true
            })
        }
        else if (current === 2) {
            this.setState({
                currentStep: 2,
                stepContent: <Position organizationId={this.props.organizationId} />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
                isFinishButtonHidden: true
            })
        }
        else if (current === 3) {
            this.setState({
                currentStep: 3,
                stepContent: <Employee organizationId={this.props.organizationId} />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
                isFinishButtonHidden: true
            })
        }
        else if (current === 4) {
            this.setState({
                currentStep: 4,
                stepContent: <Representative organizationId={this.props.organizationId} />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
                isFinishButtonHidden: true

            })
        }
        else if (current === 5) {
            this.setState({
                currentStep: 5,
                stepContent: <OrganizationExtraInfo organizationId={this.props.organizationId} />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
                isFinishButtonHidden: true

            })
        }
        else if (current === 6) {
            this.setState({
                currentStep: 6,
                stepContent: <OrganizationAttachFile organizationId={this.props.organizationId} />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: true,
                isFinishButtonHidden: false,
            })
        }
    }


    /* #endregion */

    /* #region  [- nextStep() -] */
    nextStep = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.state.currentStep === 0) {
            this.setState({
                currentStep: 1,
                stepContent: <Category organizationId={this.props.organizationId} />,
            })
        }
        else if (this.state.currentStep === 1) {
            this.setState({
                currentStep: 2,
                stepContent: <Position organizationId={this.props.organizationId} />,
            })
        }
        else if (this.state.currentStep === 2) {
            this.setState({
                currentStep: 3,
                stepContent: <Employee organizationId={this.props.organizationId} />,


            })
        }
        else if (this.state.currentStep === 3) {
            this.setState({
                currentStep: 4,
                stepContent: <Representative organizationId={this.props.organizationId} />,

            })
        }
        else if (this.state.currentStep === 4) {
            this.setState({
                currentStep: 5,
                stepContent: <OrganizationExtraInfo organizationId={this.props.organizationId} />,

            })
        }
        else if (this.state.currentStep === 5) {
            this.setState({
                currentStep: 6,
                stepContent: <OrganizationAttachFile organizationId={this.props.organizationId} />,
                isNextStepButtonHidden: true,
                isFinishButtonHidden: false,
            })
        }
    }
    /* #endregion */

    /* #region  [- save() -] */
    save = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        let result = await this.child.putOrganization();
        if (result === true) {
            this.props.onClose();
        }
    }
    /* #endregion */

    /* #region  [- saveAndContinue() -] */
    saveAndContinue = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.state.currentStep === 0) {
            let result = await this.child.putOrganization();
            if (result === true) {
                this.setState({
                    currentStep: 1,
                    stepContent: <Category organizationId={this.props.organizationId} />,
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

    /* #region  [- getOrganizationItem() -] */
    getOrganizationItem = async () => {
        let organizationItemGetData = {
          organizationId: this.props.organizationId,
          domainRef: this.props.domain,
        }
        await this.props.getOrganizationItem(organizationItemGetData);
      }
      /* #endregion */

    /* #region  [- render() -] */
    render() {
        return (
            <Container fluid style={{ height: '100vh' }}>
                <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>ویرایش شخص حقوقی</span>
                    </Col>
                </Row>
                <Row title='content' style={{ height: '89vh' }}>
                    <Col title='steps' sm='3' style={{ borderLeft: '1px solid #f0f0f0', paddingTop: '10%' }}>
                        <Steps direction="vertical" current={this.state.currentStep} onChange={this.onChangeStep}>
                            <Step title="اطلاعات ثبتی" disabled={false} />
                            <Step title="واحدهای سازمانی " disabled={false} />
                            <Step title="سمت ها " disabled={false} />
                            <Step title=" کارمندان " disabled={false} />
                            <Step title="نمایندگان" disabled={false} />
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
    getOrganizationItem: (data) => dispatch(getOrganizationItem(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});

/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(EditLegalPerson);