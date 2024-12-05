/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Button, FormGroup, Input, Form, Label, FormFeedback } from 'reactstrap';
import { PlusSquareOutlined } from "@ant-design/icons";
import { getMaterialInventoryFormData, putInventory, postInventory } from '../../../../redux/warehouse/Inventory/inventory.action'
/* #endregion */

class Inventory extends PureComponent {

    /* #region  [- ctor -] */

    constructor(props) {
        super(props);
        this.state = {
            domainRef: this.props.domain,

            materialId: this.props.materialId,
            warehouseId: this.props.warehouseId,
            initialInventory: this.props.initialInventory,
            scale: this.props.scale,
            warehouseTitleList: [],
            //ّّFlags
            isSaveButtonHidden: false,
            isFinishButtonHidden: true,
            isMaterialDisabled: false,
            isWarehouseDisabled: true,

            postMode: false,

            //#region [- formValidation -]
            errors: {},

            isMaterialInvalid: false,
            isMaterialValid: false,

            isWarehouseInvalid: false,
            isWarehouseValid: false,

            isInitialInventoryInvalid: false,
            isInitialInventoryValid: false,
            //#endregion

        }
    }
    /* #endregion */

    /* #region  [- methods -] */

    /* #region  [- componentDidMount() -] */
    async componentDidMount() {
        await this.getMaterialInventoryFormData();


        if (this.state.materialId !== '') {
           let warehouseList = this.props.warehouseInventoryTitleList.filter(item => item.materialId === this.state.materialId)
            this.setState({
                isWarehouseDisabled: false,
                isMaterialDisabled: true,
                warehouseTitleList: warehouseList,
            });
            if (this.state.warehouseId !== '') {
                this.setState({
                    isMaterialDisabled: true,
                    isWarehouseDisabled: true,
                    editMode: true
                })

            }
        }
    }

    /* #endregion */


    /* #region  [- getMaterialInventoryFormData -] */
    getMaterialInventoryFormData = async () => {

        let materialInventoryFormGetData = {
            domainRef: parseInt(this.state.domainRef)
        }
        await this.props.getMaterialInventoryFormData(materialInventoryFormGetData)
    }

    /* #endregion */

    /* #region  [- putInventory -] */
    putInventory = async () => {

        let inventoryPutData = {
            inventorylist: [{
                warehouseId: parseInt(this.state.warehouseId),
                initialInventory: parseInt(this.state.initialInventory),
                materialId: parseInt(this.state.materialId),
                descriptionRow: this.state.descriptionRow
            }]
        }
        await this.props.putInventory(inventoryPutData)
    }

    /* #endregion */

    /* #region  [- postInventory -] */
    postInventory = async () => {

        let inventoryPostData = {
            inventorylist: [{
                warehouseId: parseInt(this.state.warehouseId),
                initialInventory: parseInt(this.state.initialInventory),
                materialId: parseInt(this.state.materialId),
                descriptionRow: this.state.descriptionRow
            }]
        }
        await this.props.postInventory(inventoryPostData)
    }

    /* #endregion */


    //#region [- validateForm() -]
    validateForm = async (event) => {
        var errors = { ...this.state.errors };

        switch (event.target.id) {

            //#region [- materialId -]
            case "materialId":
                if (event.target.value === "") {
                    this.setState({
                        isMaterialInvalid: true,
                        isMaterialValid: false
                    });
                    errors["material"] = "کالا اجباری است";
                }
                else {
                    this.setState({
                        isMaterialInvalid: false,
                        isMaterialValid: true
                    });
                }
                break;
            //#endregion

            //#region [- warehouseId -]
            case "warehouseId":
                if (event.target.value === "") {
                    this.setState({
                        isWarehouseInvalid: true,
                        isWarehouseValid: false
                    });
                    errors["warehouse"] = "انبار اجباری است";
                }
                else {
                    this.setState({
                        isWarehouseInvalid: false,
                        isWarehouseValid: true
                    });
                }
                break;
            //#endregion

            //#region [- initialInventory -]
            case "initialInventory":
                if (event.target.value === "" || event.target.value < 0) {
                    this.setState({
                        initialInventory: 0,
                        isInitialInventoryInvalid: true,
                        isInitialInventoryValid: false
                    });
                    errors["initialInventory"] = "تعداد اجباری است";
                }
                else {
                    this.setState({
                        isInitialInventoryInvalid: false,
                        isInitialInventoryValid: true
                    });
                }
                break;
            //#endregion

            default:
                errors = {};
                break;
        }

        this.setState({
            errors: errors
        });
    }
    //#endregion

    //#region [- validateFormOnButtonClick() -]
    validateFormOnButtonClick = () => {
        var errors = {};
        var isFormValid = false;

        //#region [- materialId -]
        if (this.state.warehouseId === "") {
            this.setState({
                isMaterialInvalid: true,
                isMaterialValid: false
            });
            errors["material"] = "کالا اجباری است";
        }
        else {
            this.setState({
                isMaterialInvalid: false,
                isMaterialValid: true
            });
        }
        //#endregion

        //#region [- warehouseId -]
        if (this.state.warehouseId === "") {
            this.setState({
                isWarehouseInvalid: true,
                isWarehouseValid: false
            });
            errors["warehouse"] = "انبار اجباری است";
        }
        else {
            this.setState({
                isWarehouseInvalid: false,
                isWarehouseValid: true
            });
        }
        //#endregion

        //#region [- initialInventory -]
        if (this.state.initialInventory === "" || this.state.initialInventory < 1) {
            this.setState({
                initialInventory: 0,
                isInitialInventoryInvalid: true,
                isInitialInventoryValid: false
            });
            errors["initialInventory"] = "تعداد اجباری است";
        }
        else {
            this.setState({
                isInitialInventoryInvalid: false,
                isInitialInventoryValid: true
            });
        }
        //#endregion

        this.setState({
            errors: errors,
        });
        if (Object.keys(errors).length === 0) {
            isFormValid = true
        }
        else {
            isFormValid = false
        }
        return isFormValid;
    }

    //#endregion


    /* #region  [- inputHandleChange(event) -] */
    inputHandleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
        this.validateForm(event);
    };
    /* #endregion */

    /* #region  [- inputHandleChangeMaterialSelect(event) -] */
    inputHandleChangeMaterialSelect = (event) => {
        if (event.target.value!=='') {
            let warehouseList = this.props.warehouseInventoryTitleList.filter(item => item.materialId === parseInt(event.target.value));
            if (warehouseList.length > 0) {
                let selectedMaterial = this.props.materialTitleList.filter(item => item.id === parseInt(event.target.value))
                let scale = selectedMaterial[0].scaleTitle
                this.setState({
                    [event.target.name]: event.target.value,
                    isWarehouseDisabled: false,
                    warehouseTitleList: warehouseList,
                    scale: scale,
                    postMode: false,

                    isWarehouseInvalid: false,
                    isWarehouseValid: false,
                    warehouseId: ''
                });
            }
            else {
                let selectedMaterial = this.props.materialTitleList.filter(item => item.id === parseInt(event.target.value))
                let scale = selectedMaterial[0].scaleTitle
                this.setState({
                    [event.target.name]: event.target.value,
                    isWarehouseDisabled: false,
                    scale: scale,
                    postMode: true,
                    warehouseTitleList: this.props.warehouseTitleList,

                    isWarehouseInvalid: false,
                    isWarehouseValid: false,
                    warehouseId: ''
                })
            }
  
        }
        else{
            this.setState({
                materialId:'',
                isWarehouseDisabled: true,
                scale:'',
                postMode: false,
                warehouseTitleList:[],

                isWarehouseInvalid: false,
                isWarehouseValid: false,
                warehouseId: '' 
            })
        }
          this.validateForm(event);
    };

    /* #endregion */

    
    /* #region  [- cancel() -] */
    cancel = () => {
        this.props.onClose();
    }
    /* #endregion */

    /* #region  [- submit() -] */
    submit = async () => {

        if (this.validateFormOnButtonClick() === true) {
            if (this.state.postMode === true) {
                await this.postInventory();
                this.props.onClose();
            }
            else {
                await this.putInventory();
                this.props.onClose();
            }
            
        }



    }
    /* #endregion */


    /* #region  [- render() -] */
    render() {

        /* #region  [- combobox -] */
        const material = this.props.materialTitleList.map((item) => (
            <option key={item.id} value={item.id}>
                {item.title}
            </option>
        ));

        const warehouse = (this.state.postMode === false) ? this.state.warehouseTitleList.map((item) => (
            <option key={item.warehouseId} value={item.warehouseId}>
                {item.title}
            </option>
        )) :
            this.state.warehouseTitleList.map((item) => (
                <option key={item.id} value={item.id}>
                    {item.fullPath}
                </option>
            ));



        /* #endregion */

        return (
            <Container fluid style={{ height: '100vh' }}>
                <Row>
                    <Col sm='12'>
                        <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                            <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>ثبت موجودی کالا </span>
                            </Col>
                        </Row>

                        <Row title='content' style={{ height: '89vh' }}>
                            <Form style={{ width: '100%', padding: '3%' }}>
                                <FormGroup title="material" style={{ textAlign: "right" }}>
                                    <Label for="materialId">  کالا<span className="form-mandatory-field-star">*</span> </Label>
                                    <Row>
                                        <Col sm="11">
                                            <Input
                                                type="select"
                                                name="materialId"
                                                id="materialId"
                                                disabled={this.state.isMaterialDisabled}
                                                value={this.state.materialId}
                                                onChange={this.inputHandleChangeMaterialSelect}
                                                invalid={this.state.isMaterialInvalid}
                                                valid={this.state.isMaterialValid}
                                            >
                                                <option value=''>-- انتخاب کنید --</option>
                                                {material}
                                            </Input>
                                            <FormFeedback>{this.state.errors.material}</FormFeedback>

                                        </Col>

                                        <Col sm="1">
                                            <PlusSquareOutlined
                                                style={{
                                                    fontSize: "30px",
                                                    color: "#0168b8",
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>

                                <FormGroup title="warehouseSelect" style={{ textAlign: "right" }}>
                                    <Label for="warehouseId"> انبار<span className="form-mandatory-field-star">*</span> </Label>
                                    <Row>
                                        <Col sm="11">
                                            <Input
                                                type="select"
                                                name="warehouseId"
                                                id="warehouseId"
                                                disabled={this.state.isWarehouseDisabled}
                                                value={this.state.warehouseId}
                                                onChange={this.inputHandleChange}
                                                invalid={this.state.isWarehouseInvalid}
                                                valid={this.state.isWarehouseValid}
                                            >
                                                <option value=''>-- انتخاب کنید --</option>
                                                {warehouse}
                                            </Input>
                                            <FormFeedback>{this.state.errors.warehouse}</FormFeedback>

                                        </Col>

                                        <Col sm="1">
                                            <PlusSquareOutlined
                                                style={{
                                                    fontSize: "30px",
                                                    color: "#0168b8",
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>

                                <FormGroup title="initialInventory" style={{ textAlign: "right" }}>
                                    <Label for="initialInventory"> تعداد <span className="form-mandatory-field-star">*</span></Label>
                                    <Row>
                                        <Col sm="12">
                                            <Input
                                                type='number'
                                                name="initialInventory"
                                                id="initialInventory"
                                                value={this.state.initialInventory}
                                                onChange={this.inputHandleChange}
                                                invalid={this.state.isInitialInventoryInvalid}
                                                valid={this.state.isInitialInventoryValid}
                                            />
                                            <FormFeedback>{this.state.errors.initialInventory}</FormFeedback>

                                        </Col>
                                    </Row>
                                </FormGroup>

                                <FormGroup title="scale" style={{ textAlign: "right" }}>
                                    <Label for="scale"> واحد </Label>
                                    <Row>
                                        <Col sm="12">
                                            <Input
                                                type='text'
                                                name="scale"
                                                id="scale"
                                                disabled={true}
                                                value={this.state.scale}
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Form>
                        </Row>

                        <Row title='buttons' style={{ height: '6vh', borderTop: '1px solid #f0f0f0' }}>
                            <Col sm='12' style={{ lineHeight: '6vh' }}>
                                <Button className='cancel-button-style mr-2' onClick={this.cancel} >
                                    لغو
                                </Button>
                                <Button className='submit-button-style mr-2' onClick={this.submit} >
                                    ثبت
                                </Button>
                            </Col>
                        </Row>
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
        domain: state.auth.domain,
        materialTitleList: state.inventory.materialTitleList,
        warehouseTitleList: state.inventory.warehouseTitleList,
        warehouseInventoryTitleList: state.inventory.warehouseInventoryTitleList,


    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    getMaterialInventoryFormData: (data) => dispatch(getMaterialInventoryFormData(data)),
    putInventory: (data) => dispatch(putInventory(data)),
    postInventory: (data) => dispatch(postInventory(data)),
});

/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);