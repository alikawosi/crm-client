import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Button } from 'reactstrap';
import { Steps } from 'antd';
import BasicInfo from './basicInfo/basicInfo.component';
import ProductAttachFile from './productAttachFile.component';
import ProductExtraInfo from './productExtraInfo.component'
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';

const { Step } = Steps;

class EditProduct extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            stepContent: <BasicInfo onRef={ref => (this.child = ref)} productId={this.props.productId} editFlag={true} />,
            currentStep: 0,
            insertedPersonId: 0,
            //flags
            isSaveButtonHidden: false,
            isNextStepButtonHidden: true,
            isFinishButtonHidden: true,
        }
    }
    /* #endregion */

    /* #region  [- cancel() -] */
    cancel = async() => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.onClose();
    }
    /* #endregion */

    /* #region  [- save() -] */
    save = async() => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.child.validateFormOnButtonClick() === true) {
            await this.child.putProduct();
            await this.props.onClose();
        }

    }
    /* #endregion */

    /* #region  [- saveAndContinue() -] */
    saveAndContinue = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.state.currentStep === 0) {
            if (this.child.validateFormOnButtonClick() === true) {
                await this.child.putProduct();
                this.setState({
                    currentStep: 1,
                    stepContent: <ProductAttachFile mainGridCalling={false} productId={this.props.productId} />,
                    //flags
                    isSaveButtonHidden: true,
                    isNextStepButtonHidden: false,
                    isFinishButtonHidden: true,
                })
            }

        }
    }
    /* #endregion */

    /* #region  [- nextStep() -] */
    nextStep = async() => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.state.currentStep === 0) {
            this.setState({
                currentStep: 1,
                stepContent: <ProductAttachFile mainGridCalling={false} productId={this.props.productId}   />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
                isFinishButtonHidden: true,
            })
        }

        if (this.state.currentStep === 1) {
            this.setState({
                currentStep: 2,
                stepContent: <ProductExtraInfo mainGridCalling={false} productId={this.props.productId}   />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: true,
                isFinishButtonHidden: false,
            })
        }

    }
    /* #endregion */

    /* #region  [- finish() -] */
    finish = async() => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.onClose();
    }
    /* #endregion */

    /* #region  [- onChangeStep(current) -] */
    onChangeStep = async(current) => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        //console.log('current is :', current);
        
        if (current === 0) {
            this.setState({
                currentStep: 1,
                stepContent: <ProductAttachFile mainGridCalling={false} productId={this.props.productId} />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
                isFinishButtonHidden: true,
            })
        }

        if (current === 1) {
            this.setState({
                currentStep: 2,
                stepContent: <ProductExtraInfo mainGridCalling={false} productId={this.props.productId} />,
                isSaveButtonHidden: true,
                isNextStepButtonHidden: true,
                isFinishButtonHidden: false,
            })
        }
    }
    /* #endregion */

    /* #region  [- render() -] */
    render() {
        return (
            <Container fluid style={{ height: '100vh' }}>

                <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}> ویرایش کالا </span>
                    </Col>
                </Row>
                <Row title='content' style={{ height: '89vh' }}>
                    <Col title='steps' sm='3' style={{ borderLeft: '1px solid #f0f0f0', paddingTop: '10%' }}>
                        <Steps direction="vertical" current={this.state.currentStep} onChange={this.onChangeStep}>
                            <Step title="اطلاعات پایه" disabled={true} />
                            <Step title="فایل های پیوست" disabled={true} />
                            <Step title="اطلاعات بیشتر " disabled={true} />
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);