import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label,Button } from 'reactstrap';
import { Drawer, Modal } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import { PlusSquareOutlined } from "@ant-design/icons";
import GridFileAttachmentButton from './gridFileAttachmentButton.component'
import GridExtraInfoButton from './gridExtraInfoButton.component'
import Notification from "../../../../../../shared/common/notification/notification.component";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../..//shared/common/agGridLocalization/agGridLocalFA.component";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { getSupplierFormData,deleteProduct,postProduct,getProductSupplier,resetProps } from '../../../../../../../redux/product/product/product.action'
import ProductAttachFile from '../productAttachFile.component'
import ProductExtraInfo from '../productExtraInfo.component'
class Supplier extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            domainRef: this.props.domain,
            materialScaleRef: this.props.productBasicDataList.productBasicDataList[0].materialScaleRef,
            productCategoryRef: this.props.productBasicDataList.productBasicDataList[0].productCategoryRef,
            id: 0,
            supplyChainRef:'',
            supplyChaindescriptionRow:'',
            //drawer and modal content
            supplyChainDrawerContent:<div></div>,
            productAttachmentFileModalComponent:<div></div>,
            productExtraInfoModalComponent:<div></div>,
            //flag
            isSupplyChainDrawerVisible:false,
            isDeleteButtonDisabled:true,
            isSupplyChainRefInvalid: false,
            isSupplyChainRefValid: false,
            isProductAttachmentFileVisible: false,
            isProductAttachmentFileModalDestroy: true,
            isProductExtraInfoModalVisible: false,
            isProductExtraInfoModalDestroy: true,
            // list
            supplierTitleList:[],
            productSupplierList:[],
            productBasicData: this.props.productBasicDataList.productBasicDataList[0],
            errors: {},
            //grid
            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    // cellRenderer: this.cellRenderer,
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row",
                    valueGetter: "node.rowIndex+1",
                    cellRenderer: "agGroupCellRenderer"
                },
                { headerName: 'عنوان', field: "supplierTitle" },
                { headerName: 'توضیحات', field: "supplyChainDescriptionRow" },
                { headerName: 'فایل های پیوست', field: "attachedDucument", cellRenderer:'gridFileAttachmentButton' },
                { headerName: 'اطلاعات بیشتر', field: "extraInfo", cellRenderer:'gridExtraInfoButton' },
            ],
            gridOptions:{
                context: { componentParent: this },
                frameworkComponents: {
                    gridFileAttachmentButton: GridFileAttachmentButton,
                    gridExtraInfoButton: GridExtraInfoButton
                  },
            },
            

            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,

            },
            rowData: [],
            overlayLoadingTemplate:
                '<span class="ag-overlay-loading-center">در حال بارگذاری ...</span>',
            overlayNoRowsTemplate:
                '<span style="padding: 10px; border: 2px solid #444;">رکوردی برای نمایش وجود ندارد</span>',
            /* #endregion */

        }
    }
    /* #endregion */


    /* #region  [- componentDidMount() -] */
   async componentDidMount() {
    this.props.onRef(this);
    await this.getProductSupplier();
    await this.getSupplierFormData();
    }
    /* #endregion */

    /* #region  [- componentDidUpdate(prevProps) -] */
    async componentDidUpdate(prevProps) {

        if (this.props.message !== prevProps.message) {
            if (this.props.message === "ذخیره با موفقیت انجام شد.") {
                Notification("bottomLeft", this.props.message, "success");
                this.props.resetProps();
            } else if (this.props.message === "ویرایش با موفقیت انجام شد.") {
                Notification("bottomLeft", this.props.message, "success");
                this.props.resetProps();
            } else if (this.props.message === "حذف با موفقیت انجام شد.") {
                Notification("bottomLeft", this.props.message, "success");
                this.props.resetProps();
            } else if (this.props.message === "Successfully Set.") {
                Notification("bottomLeft", this.props.message, "success");
                this.props.resetProps();
            } else if (this.props.message === "پیدا نشد.") {
                Notification("bottomLeft", this.props.message, "error");
                this.props.resetProps();
            } else if (this.props.message === "خطایی رخ داده است.") {
                Notification("bottomLeft", this.props.message, "error");
                this.props.resetProps();
            } else if (this.props.message === "کد نمی تواند تکراری باشد.") {
                Notification("bottomLeft", this.props.message, "error");
                this.props.resetProps();
            }
        }

        if (this.props.supplierTitleList !== prevProps.supplierTitleList) {
            this.setState({
                supplierTitleList: this.props.supplierTitleList
            })
        }
        if (this.props.productSupplierList !== prevProps.productSupplierList) {
            this.setState({
                productSupplierList: this.props.productSupplierList
            })
        }

    }
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async (event) => {
        var errors = this.state.errors;
        if ([event.target.name] === 'supplyChainRef') {
            if (event.target.value === '') {
                this.setState({
                    isSupplyChainInvalid: true,
                    isSupplyChainValid: false,
                })
                errors["supplyChainRef"] = 'تامین‌کننده اجباری است';
            }
            else {
                this.setState({
                    isSupplyChainInvalid: false,
                    isSupplyChainValid: true,
                    errors: errors
                });
            }
        }

    }
    //#endregion

    //#region [- validateFormOnButtonClick() -]
    validateFormOnButtonClick = () => {
        var errors = {};
        var isFormValid = false;
        if (this.state.supplyChainRef === '') {
            this.setState({

                isSupplyChainInvalid: true,
                isSupplyChainValid: false,
            })
            errors["supplyChainRef"] = ' تامین‌کننده اجباری است';

        }

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


    /* #region  [- getSupplierFormData -] */
    getSupplierFormData = async () =>{

        let supplierFormGetData={
            domainRef: this.state.domainRef 
        }
        await this.props.getSupplierFormData(supplierFormGetData)
    }
/* #endregion */

    /* #region  [- getProductSupplier -] */
    getProductSupplier = async () =>{

        let productSupplierGetData={
            domainRef: this.state.domainRef,
            materialScaleRef: this.state.materialScaleRef,
            productCategoryRef: this.state.productCategoryRef 
        }
        await this.props.getProductSupplier(productSupplierGetData)
    }
/* #endregion */

    /* #region  [- postProduct -] */

    postProduct = async () =>{
        
        var obj={
            supplyChainRef: parseInt(this.state.supplyChainRef),
            supplyChaindescriptionRow: this.state.supplyChaindescriptionRow
        }
        let productList=[]
        productList=[{...obj,...this.state.productBasicData}]

        let productPostData={
            domainRef: this.state.domainRef,
            productList:productList
        }

        await this.props.postProduct(productPostData)
        await this.getProductSupplier();

    }
    /* #endregion */

    /* #region  [- deleteProduct() -] */
    deleteProduct = async () =>{

        let productDeleteData={
           
            productIdList:
            [
                {
                    id:this.state.id
                }
            ] 
        }
        await this.props.deleteProduct(productDeleteData)
    }
    /* #endregion */


    /* #region  [- inputHandleChange(event) -] */
    inputHandleChange = (event) => {

            this.setState({
                [event.target.name]: event.target.value
            })
        
        this.validateForm(event);
    }
    /* #endregion */


    /* #region  [ - onGridReady - ] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };
    /* #endregion */

    /* #region  [- deselectAllRows() -] */
    deselectAllRows = async () => {
        await this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #region  [- onSelectionChanged() -] */
    onSelectionChanged =async () => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);

        const len = selectedData.length;
        if (len === 0) {
            this.setState({
                id: '',
                title: '',
                isDeleteButtonDisabled: true,
            });
        }
        if (len === 1) {
            const picked = Object.keys(selectedData)[0];
            const pickedValue = selectedData[picked];

            if (pickedValue.checkRefFlag === true) {
                this.setState({
                    isDeleteButtonDisabled: true,
                    
                })
            }
            else {
                this.setState({
                    id: pickedValue.productId,
                    isDeleteButtonDisabled: false,
                    
                })

            }
        }
    }
    /* #endregion */

    /* #region  [- toggleProductExtraInfoModal() -] */
    toggleProductExtraInfoModal = async () => {

        if (this.state.isProductExtraInfoModalVisible === true) {
            this.setState({
                isProductExtraInfoModalVisible: false,
                isProductExtraInfoModalDestroy:true,
                id:''
            })
            this.deselectAllRows();
        }
        else if (this.state.isProductExtraInfoModalVisible === false) {
            this.setState({
                isProductExtraInfoModalVisible: true,
                isProductExtraInfoModalDestroy:false
            })
        }

    }
    /* #endregion */

    /* #region  [- toggleProductAttachmentFileModal() -] */
    toggleProductAttachmentFileModal = async () => {

        if (this.state.isProductAttachmentFileVisible === true) {
            this.setState({
                isProductAttachmentFileVisible: false,
                isProductAttachmentFileModalDestroy:true,
                id:''
            })
            this.deselectAllRows();
        }
        else if (this.state.isProductAttachmentFileVisible === false) {
            this.setState({
                isProductAttachmentFileVisible: true,
                isProductAttachmentFileModalDestroy:false
            })
        }

    }
    /* #endregion */
    

    /* #region  [- showProductFileAttachmentModal -] */
    showProductFileAttachmentModal = async (data) => {

        this.setState({
        isProductAttachmentFileVisible: true,
        isProductAttachmentFileModalDestroy: false,
        productAttachmentFileModalComponent: <ProductAttachFile mainGridCalling={false} productId={data.id} />,
        });
    };
    /* #endregion */

    /* #region  [- showProductExtraInfoModal -] */
    showProductExtraInfoModal = async (data) => {

        this.setState({
        isProductExtraInfoModalVisible: true,
        isProductExtraInfoModalDestroy: false,
        productExtraInfoModalComponent: <ProductExtraInfo mainGridCalling={false} productId={data.id} />,
        });
    };
    /* #endregion */
      
    
    /* #region  [- refresh() -] */
    refresh = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            id: null,
            supplyChainRef: '',
            supplyChaindescriptionRow: '',
            isDeleteButtonDisabled: true,

            //#region [- formValidation -]
            errors: {},

            isSupplyChainInvalid: false,
            isSupplyChainValid: false,

            //#endregion
        })
    }
    /* #endregion */

    /* #region  [- save() -] */
    save = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.validateFormOnButtonClick() === true) {
            await this.postProduct();
            this.refresh();
        }

    }
    /* #endregion */

    /* #region  [- delete() -] */
    delete = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.deleteProduct();
        await this.getProductSupplier();
        this.refresh();
    }
    /* #endregion */
  

    /* #region  [- render() -] */
    render() {

        const supplierTitleList = this.state.supplierTitleList.map(item => (
            <option key={item.id} value={item.id}>
                {item.title}
            </option>
        ));

        return (
            <Container fluid >

                <Row title='form'>
                    <Col sm='12'>
                        <Form>
                            <FormGroup title='supplier' style={{ textAlign: 'right' }}>
                                <Label >تامین‌کننده <span className="form-mandatory-field-star">*</span></Label>

                                <Row>

                                    <Col name="supplier" sm='10' >
                                        <Input
                                            type="select"
                                            name="supplyChainRef"
                                            id="supplyChainRef"
                                            //placeholder="نوع فیلد"
                                            value={this.state.supplyChainRef}
                                            onChange={this.inputHandleChange}
                                            invalid={this.state.isSupplyChainInvalid}
                                            valid={this.state.isSupplyChainValid}
                                        >
                                            <option value=''>  -- انتخاب کنید --  </option>
                                            {supplierTitleList}
                                        </Input>
                                    </Col>

                                    <Col name="quickAccessSupplyChain" sm='1' style={{ padding: '0' }}>
                                        <PlusSquareOutlined
                                            style={{
                                                fontSize: "30px",
                                                color: "#0168b8",
                                                cursor: 'pointer',
                                            }}
                                            onClick={this.quickAccessSupplyChain}
                                        />
                                    </Col>

                                </Row>

                            </FormGroup>
                        
                            <FormGroup title='supplyChaindescriptionRow' style={{ textAlign: 'right' }}>
                                <Label >توضیحات</Label>
                                <Input
                                    type="textarea"
                                    name="supplyChaindescriptionRow"
                                    id="supplyChaindescriptionRow"
                                    value={this.state.supplyChaindescriptionRow}
                                    placeholder="توضیحات"
                                    onChange={this.inputHandleChange}
                                />
                            </FormGroup>
                            
                        </Form>
                    </Col>
                </Row>

                <Row title='buttons'>
                    <Col sm='12' style={{ textAlign: 'right' }}>
                        <Button className='submit-button-style mr-2' onClick={this.save}>
                            ذخیره
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteButtonDisabled}>
                            حذف
                        </Button>
                    </Col>
                </Row>


                <Row title='grid' className='mt-2'>
                    <Col  className="ag-theme-alpine" style={{ height: '60vh' }}>
                        <AgGridReact
                            gridOptions={this.state.gridOptions}
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.productSupplierList}
                            rowSelection='single'
                            enableRtl={true}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.defaultColDef}
                            onSelectionChanged={this.onSelectionChanged}
                        >
                        </AgGridReact>
                    </Col>
                </Row>

                <Row title='modalsAndDrawers'>
                    <Drawer name='supplyChain'
                            placement={"left"}
                            width={800}
                            bodyStyle={{ padding: '0px' }}
                            closable={true}
                            maskClosable={false}
                            onClose={this.onCloseSupplyChainDrawer}
                            visible={this.state.isSupplyChainDrawerVisible}
                        >
                            {this.state.supplyChainDrawerContent}
                    </Drawer>
                
                    {/* FileAttachment Modal */}
                    <Modal
                        visible={this.state.isProductAttachmentFileVisible}
                        bodyStyle={{ padding: '0px' }}
                        maskClosable={true}
                        width={900}
                        onCancel={this.toggleProductAttachmentFileModal}
                        footer={[
                            <Button onClick={this.toggleProductAttachmentFileModal}>لغو </Button>
                        ]}
                        destroyOnClose={this.state.isProductAttachmentFileModalDestroy}
                    >
                        <Container fluid>
                            <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                {this.state.productAttachmentFileModalComponent}
                            </Row>
                        </Container>
                    </Modal>
                    {/* ExtraInfo Modal */}
                    <Modal
                        visible={this.state.isProductExtraInfoModalVisible}
                        bodyStyle={{ padding: '0px' }}
                        maskClosable={true}
                        onCancel={this.toggleProductExtraInfoModal}
                        width={900}
                        footer={[
                            <Button onClick={this.toggleProductExtraInfoModal}>لغو </Button>
                        ]}
                        destroyOnClose={this.state.isProductExtraInfoModalDestroy}
                    >
                        <Container fluid>
                            <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                {this.state.productExtraInfoModalComponent}
                            </Row>
                        </Container>
                    </Modal>
                
                
                </Row>

            </Container>
        );
    }
    /* #endregion */

}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        domain: state.auth.domain,
        productSupplierList:state.product.productSupplierList,
        productBasicDataList:state.product.productBasicDataList,
        supplierTitleList: state.product.supplierTitleList,
        userMenuAccessList: state.auth.userMenuAccessList,
        message: state.product.message,
        checkTokenCounter: state.auth.checkTokenCounter,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

    getSupplierFormData: (data) => dispatch(getSupplierFormData(data)),
    postProduct: (data) => dispatch(postProduct(data)),
    getProductSupplier: (data) => dispatch(getProductSupplier(data)),
    deleteProduct: (data) => dispatch(deleteProduct(data)),
    resetProps: () => dispatch(resetProps()),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),


});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Supplier);