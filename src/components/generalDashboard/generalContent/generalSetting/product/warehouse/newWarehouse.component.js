/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Button } from 'reactstrap';
import { Steps } from 'antd';
import NewWarehouseForm from './warehouse/newWarehouseForm.component';
import Inventory from './inventory/inventory.component'
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
import EditWarehouseForm from './warehouse/editWarehouseForm.component';
import { getWarehouseItem } from '../../../../../../redux/product/warehouse/warehouse.action'

/* #region  [- consts -] */
const { Step } = Steps;
/* #endregion */

/* #endregion */

class NewWarehouse extends PureComponent {

    /* #region  [- ctor -] */

    constructor(props) {
        super(props);
        this.state = {
            stepContent: <NewWarehouseForm onRef={ref => (this.child = ref)} />,
            currentStep: 0,
            insertedPersonId: 0,
            //ّّFlags
            isSaveButtonHidden: false,
            isFinishButtonHidden: true,
            isInventoeyStepDisabled: true,
            editFlag: false,
        }
    }
    /* #endregion */

    /* #region  [- methods -] */

    /* #region  [- save() -] */
    save = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.state.editFlag === false) {
            if(await this.child.postWarehouse()){
this.props.onClose();
            }
        }
        else {
            if(await this.editWarehouse.putWarehouse()){
                this.props.onClose();
            }
        
          
        }


    }
    /* #endregion */

    /* #region  [- saveAndContinue() -] */
    saveAndContinue = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.state.currentStep === 0) {
            if (this.state.editFlag === false) {
                if (await this.child.postWarehouse()) {
                    this.setState({
                        currentStep: 1,
                        stepContent: <Inventory warehouseId={this.props.insertedWarehouseId} />,
                        isFinishButtonHidden: false,
                        isSaveButtonHidden: true,
                        isInventoeyStepDisabled: false,
                    })
                }

            }
            else {
                if (await this.editWarehouse.putWarehouse()) {
                    this.setState({
                        currentStep: 1,
                        stepContent: <Inventory warehouseId={this.props.insertedWarehouseId} />,
                        isFinishButtonHidden: false,
                        isSaveButtonHidden: true,
                        isInventoeyStepDisabled: false,
                    })
                }


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

    /* #region  [- onChangeStep -] */
    onChangeStep = async (event) => {
        if (event === 0) {
            await this.getWarehouseItem();
            this.setState({
                stepContent: <EditWarehouseForm onRef={ref => (this.editWarehouse = ref)} />,
                currentStep: 0,
                isSaveButtonHidden: false,
                isFinishButtonHidden: true,
                isInventoeyStepDisabled: false,
                editFlag: true,
            })
        }
        else if (event === 1) {
            this.setState({
                currentStep: 1,
                stepContent: <Inventory warehouseId={this.props.insertedWarehouseId} />,
                isFinishButtonHidden: false,
                isSaveButtonHidden: true,
                isInventoeyStepDisabled: false,
            })
        }
    }
    /* #endregion */

    /* #region  [- getWarehouseItem() -] */
    getWarehouseItem = async () => {
        let warehouseItemGetData = {
            warehouseId: this.props.insertedWarehouseId * 1,
            domainRef: this.props.domain
        }
        await this.props.getWarehouseItem(warehouseItemGetData);
    }
    /* #endregion */

    /* #region  [- render() -] */
    render() {
        return (
            <Container fluid style={{ height: '100vh' }}>

                <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>ایجاد انبار جدید</span>
                    </Col>
                </Row>

                <Row title='content' style={{ height: '88vh' }}>
                    <Col title='steps' sm='3' style={{ borderLeft: '1px solid #f0f0f0', paddingTop: '10%' }}>
                        <Steps direction="vertical" current={this.state.currentStep} onChange={this.onChangeStep}>
                            <Step title="ایجاد انبار " disabled={false} />
                            <Step title="موجودی کالا  " disabled={this.state.isInventoeyStepDisabled} />
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
        insertedWarehouseId: state.warehouse.insertedWarehouseId,
        message: state.warehouse.message,
        checkTokenCounter: state.auth.checkTokenCounter,
        domain: state.auth.domain
    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getWarehouseItem: (data) => dispatch(getWarehouseItem(data)),
});

/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(NewWarehouse);