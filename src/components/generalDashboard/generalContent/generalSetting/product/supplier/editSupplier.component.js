/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Button } from 'reactstrap';
import { Steps } from 'antd';
import BasicInfo from './basicInfo/basicInfo.component'
import Material from './material/material.component'
import { resetProps } from '../../../../../../redux/infrastructure/organization/organization.action'
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';

/* #endregion */

/* #region  [- consts -] */
const { Step } = Steps;
/* #endregion */

class EditSupplier extends PureComponent {

    /* #region  [- ctor -] */

    constructor(props) {
        super(props);
        this.state = {
            stepContent: <BasicInfo editMode={true} onRef={ref => (this.child = ref)} />,
            currentStep: 0,
            insertedPersonId: 0,

            //ّّFlags
            isSaveButtonHidden: false,
            isNextStepButtonHidden: true,
            isFinishButtonHidden: true,
        }
    }
    /* #endregion */

    /* #region  [- methods -] */

    /* #region  [- save() -] */
    save = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        let result = await this.child.putSupplyChain();
        if (result === true) {
            this.props.onClose();
        }
    }
    /* #endregion */

    /* #region  [- saveAndContinue() -] */
    saveAndContinue = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.state.currentStep === 0) {
            let result = await this.child.putSupplyChain();
            if (result === true) {
                           this.setState({
                currentStep: 1,
                stepContent: <Material supplierId={this.props.supplierId} />,
                //flags
                isSaveButtonHidden: true,
                isNextStepButtonHidden: false,
                isFinishButtonHidden: false,
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
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>ویرایش تولیدکننده</span>
                    </Col>
                </Row>
                <Row title='content' style={{ height: '89vh' }}>
                    <Col title='steps' sm='4' style={{ borderLeft: '1px solid #f0f0f0', paddingTop: '10%' }}>
                        <Steps direction="vertical" current={this.state.currentStep} onChange={this.onChangeStep}>
                            <Step title="اطلاعات پایه" disabled={true} />
                            <Step title="انتخاب کالا پایه  " disabled={true} />
                        </Steps>
                    </Col>
                    <Col title='forms' sm='8' style={{ height: 'inherit', overflowY: 'scroll' }}>
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
                        <Button className='submit-button-style mr-2' onClick={this.finish} hidden={this.state.isFinishButtonHidden}>
                            تاییدنهایی و ثبت در سیستم
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
        message: state.supplyChain.message,
        checkTokenCounter: state.auth.checkTokenCounter,
    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    resetProps: (data) => dispatch(resetProps(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});

/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(EditSupplier);