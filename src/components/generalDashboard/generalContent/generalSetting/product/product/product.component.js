import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import { Drawer, Modal } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../..//shared/common/agGridLocalization/agGridLocalFA.component";
import { getProduct, getProductItem, deleteProduct, resetProps } from '../../../../../../redux/product/product/product.action';
import {getProperty} from '../../../../../../redux/product/property/property.action'
import Notification from "../../../../../shared/common/notification/notification.component";
import NewProduct from './newProduct.component';
import EditProduct from './editProduct.component';
import GridSeenButton from './gridSeenButton.component'
import GridFileAattachmentButton from './gridFileAttachmentButton.component'
import GridExtraInfoButton from './gridExtraInfoButton.component'
import ProductSupplier from './productProducerModal.component'
import ProductExtraInfo from './productExtraInfo.component'
import ProductAttachFile from './productAttachFile.component'
import './product.component.css';
//import ExcelImport from '../../../../../shared/common/excelImport/excelImport.component'
//import ExcelExport from '../../../../../shared/common/excelExport/excelExport.component'
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';


class Product extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            domainRef: this.props.domain,
            id: 0,
            title: '',
            deleteModalInputValue: '',
            selectedRowKeys: [],
            searchText: '',
            searchedColumn: '',
            //grid
            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    // cellRenderer: this.cellRenderer,
                    headerName: 'ردیف',
                    headerCheckboxSelection: false,
                    checkboxSelection: true,
                    cellClass: 'locked-col',
                    colId: "row",
                    valueGetter: "node.rowIndex+1",
                    cellRenderer: "agGroupCellRenderer"
                },
                { headerName: ' کالا پایه', field: "materialTitle" },
                { headerName: 'گروه کالا ', field: "productCategoryTitle" },
                { headerName: 'عنوان کالا', field: "title" },
                { headerName: 'کد ', field: "code" },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle" },
                { headerName: 'کد قدیم', field: "previousCode" },
                { headerName: 'شماره سریال', field: "serialNumber" },
                { headerName: 'تامین کننده', field: "supplierTitle" },
                //{ headerName: 'تامین کنندگان', field: "productSupplier",cellRenderer: "gridSeenButton", },
                { headerName: 'توضیحات', field: "descriptionRow" },
                { headerName: 'فایل های پیوست', field: "attachmentFiles",cellRenderer: "gridFileAattachmentButton",width:'300' },
                { headerName: 'اطلاعات بیشتر ', field: "extraInfo",cellRenderer: "gridExtraInfoButton",width:'200' },
            ],

            gridOptions: {
                context: { componentParent: this },
                frameworkComponents: {
                  gridSeenButton: GridSeenButton,
                  gridFileAattachmentButton:GridFileAattachmentButton,
                  gridExtraInfoButton:GridExtraInfoButton
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

            //drawer and modal control flag
            isNewDrawerVisible: false,
            isEditDrawerVisible: false,
            isDeleteModalVisible: false,
            isPrintModalVisible: false,
            isProductSupplierModalVisible:false,
            isProductSupplierModalDestroy:true,
            isExcelImportModalVisible: false,
            isProductAttachmentFileVisible: false,
            isProductAttachmentFileModalDestroy: true,
            isProductExtraInfoModalVisible: false,
            isProductExtraInfoModalDestroy: true,
            //drawer content
            newDrawerContent: <div></div>,
            editDrawerContent: <div></div>,
            //modal content
            productAttachmentFileModalComponent:<div></div>,
            productExtraInfoModalComponent:<div></div>,
            productProducerModalComponent: <div></div>,
            //button control flag
            isDeleteButtonDisable: true,
            isEditButtonDisable: true,
            isModalDeleteButtonDisable: true,
            //button access flag
            isNewButtonHidden: false,
            isEditButtonHidden: false,
            isDeleteButtonHidden: false,
            isPrintButtonHidden: false,
            isExcelButtonHidden: false,
        }
    }
    /* #endregion */

    /* #region  [- componentDidMount() -] */
   async componentDidMount() {
        await this.getProduct();
        this.accessToButton(this.props.userMenuAccessList);
    }
    /* #endregion */

    /* #region  [- accessToButton -] */
    accessToButton = (data) => {
        if (data.includes("900")) {
            this.setState({
                isNewButtonHidden: false
            })
        }

        if (data.includes("910")) {
            this.setState({
                isEditButtonHidden: false
            })
        }

        if (data.includes("908")) {
            this.setState({
                isDeleteButtonHidden: false
            })
        }

    }
    /* #endregion */

    /* #region  [- componentDidUpdate(prevProps) -] */
    componentDidUpdate(prevProps) {
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
            }
        }
        if (this.props.productList !== prevProps.productList) {
            this.setState({
                rowData: this.props.productList
            })
        }
    }
    /* #endregion */


    /* #region  [- getProduct() -] */
    getProduct = async () => {
        let productGetData = {
            domainRef: parseInt(this.state.domainRef)
        }
        await this.props.getProduct(productGetData);
    }
    /* #endregion */

    /* #region  [- getProductItem() -] */
    getProductItem = async () => {
        let productItemGetData = {
            productId: this.state.id
        }
        await this.props.getProductItem(productItemGetData);
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


    /* #region  [ - onGridReady - ] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };
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
                isDeleteButtonDisable: true,
                isEditButtonDisable: true,
            });
        }
        if (len === 1) {
            const picked = Object.keys(selectedData)[0];
            const pickedValue = selectedData[picked];

            if (pickedValue.checkRefFlag === true) {
                this.setState({
                    id: pickedValue.id,
                    title: pickedValue.title,
                    isDeleteButtonDisable: true,
                    isEditButtonDisable: false,
                })
            }
            else {
                this.setState({
                    id: pickedValue.id,
                    title: pickedValue.title,
                    isDeleteButtonDisable: false,
                    isEditButtonDisable: false,
                })

            }
        }
    }
    /* #endregion */

    /* #region  [- deselectAllRows() -] */
    deselectAllRows = async () => {
        await this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #region  [- deselectGridRow() -] */
    deselectGridRow = () => {
        this.setState({
            id: 0,
            title: '',
            deleteModalInputValue: '',
            selectedRowKeys: [],
            isDeleteButtonDisable: true,
            isEditButtonDisable: true,
            isModalDeleteButtonDisable: true,
        })
    }
    /* #endregion */


    /* #region  [- handleChangeDeleteModalInput(event) -] */
    handleChangeDeleteModalInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        if (event.target.value === this.state.title) {
            this.setState({
                isModalDeleteButtonDisable: false
            });
        } else {
            this.setState({
                isModalDeleteButtonDisable: true
            });
        }
    }
    /* #endregion */


    /* #region  [- toggleNewDrawer() -] */
    toggleNewDrawer = () => {
        if (this.state.isNewDrawerVisible === true ) {
            this.deselectAllRows();
            this.deselectGridRow();
            this.getProduct();
            this.setState({
                isNewDrawerVisible: false,
                newDrawerContent: <div></div>,
            })
        }
        else if (this.state.isNewDrawerVisible === false) {
            this.setState({
                isNewDrawerVisible: true
            })
        }
    }
    /* #endregion */

    /* #region  [- toggleEditDrawer() -] */
    toggleEditDrawer = async () => {
        if (this.state.isEditDrawerVisible === true) {
            this.deselectAllRows();
            this.deselectGridRow();
            await this.getProduct();
            this.setState({
                isEditDrawerVisible: false,
                editDrawerContent: <div></div>,
            })
        }
        else if (this.state.isEditDrawerVisible === false) {

            this.setState({
                isEditDrawerVisible: true,
               
            })
        }
    }
    /* #endregion */

    /* #region  [- toggleDeleteModal() -] */
    toggleDeleteModal = async () => {
        if (this.state.isDeleteModalVisible === true) {
            this.deselectAllRows();
            this.deselectGridRow();
            await this.getProduct();
            this.setState({
                isDeleteModalVisible: false,
                id: 0,
                title: '',
                deleteModalInputValue: '',
            })
        }
        else if (this.state.isDeleteModalVisible === false) {
            this.setState({
                isDeleteModalVisible: true
            })
        }
    }
    /* #endregion */

    /* #region  [- togglePrintModal() -] */
    togglePrintModal = async () => {

        if (this.state.isPrintModalVisible === true) {
            this.setState({
                isPrintModalVisible: false,
            })
        }
        else if (this.state.isPrintModalVisible === false) {
            this.setState({
                isPrintModalVisible: true
            })
        }

    }
    /* #endregion */

    /* #region  [- toggleProductScaleModal() -] */
    toggleProductSupplierModal = async () => {

        if (this.state.isProductSupplierModalVisible === true) {
            this.setState({
                isProductSupplierModalVisible: false,
                id:''
            })
            this.deselectAllRows();
            this.deselectGridRow();
        }
        else if (this.state.isProductSupplierModalVisible === false) {
            this.setState({
                isProductSupplierModalVisible: true
            })
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
            this.deselectGridRow();
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
            this.deselectGridRow();
        }
        else if (this.state.isProductAttachmentFileVisible === false) {
            this.setState({
                isProductAttachmentFileVisible: true,
                isProductAttachmentFileModalDestroy:false
            })
        }

    }
    /* #endregion */
    


    /* #region  [- showProductSupplierModal -] */
    showProductSupplierModal = async (data) => {

        this.setState({
        isProductSupplierModalVisible: true,
        isProductSupplierModalDestroy: false,
        productProducerModalComponent: <ProductSupplier />,
        });
    };
    /* #endregion */

    /* #region  [- showProductFileAttachmentModal -] */
    showProductFileAttachmentModal = async (data) => {

        this.setState({
        isProductAttachmentFileVisible: true,
        isProductAttachmentFileModalDestroy: false,
        productAttachmentFileModalComponent: <ProductAttachFile mainGridCalling={true} productId={data.id} />,
        });
    };
    /* #endregion */

    /* #region  [- showProductExtraInfoModal -] */
    showProductExtraInfoModal = async (data) => {

        this.setState({
        isProductExtraInfoModalVisible: true,
        isProductExtraInfoModalDestroy: false,
        productExtraInfoModalComponent: <ProductExtraInfo productId={data.id} mainGridCalling={true} />,
        });
    };
    /* #endregion */
    


    /* #region  [- handleOk() -] */
    handleOk = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.deleteProduct();
        await this.toggleDeleteModal();

    }
    /* #endregion */

    /* #region  [- new -] */
    new = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.toggleNewDrawer();
        this.setState({
            newDrawerContent: <NewProduct onClose={this.toggleNewDrawer} />
        })
    }
    /* #endregion */

    /* #region  [- edit -] */
    edit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        
        if (this.state.id === undefined) {
            await this.refresh();
        }
        else {
            await this.getProductItem();
            this.toggleEditDrawer();
            this.setState({
                editDrawerContent: <EditProduct productId={this.state.id} onClose={this.toggleEditDrawer} />
            })
        }
    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.toggleDeleteModal();
    }
    /* #endregion */

    /* #region  [- refresh -] */
    refresh = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getProduct();
        await this.deselectGridRow();
    }
    /* #endregion */

    /* #region  [- print -] */
    print = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.togglePrintModal();
    }
    /* #endregion */


    /* #region  [- render() -] */
    render() {

        return (
            <Container fluid >
                <Row title='header' className='mt-2'>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '25px' }}>کالا </span>
                    </Col>
                </Row>
                <hr />

                <Row title='buttons'>
                    <Col sm='6' style={{ textAlign: 'right' }}>
                        <Button hidden={this.state.isNewButtonHidden} className='submit-button-style mr-2' onClick={this.new}>
                            جدید
                        </Button>
                        <Button hidden={this.state.isEditButtonHidden} className='submit-button-style mr-2' onClick={this.edit} disabled={this.state.isEditButtonDisable}>
                            ویرایش
                        </Button>
                        <Button hidden={this.state.isDeleteButtonHidden} className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteButtonDisable}>
                            حذف
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.refresh}>
                            بازیابی
                        </Button>
                    </Col>
                </Row>
                <Row title='grid' className='mt-2'>
                    <Col  className="ag-theme-alpine" style={{ height: '60vh', }}>
                        <AgGridReact
                            gridOptions={this.state.gridOptions}
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.props.productList}
                            enableRtl={true}
                            rowSelection='single'
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.defaultColDef}
                        >
                        </AgGridReact>
                    </Col>

                </Row>
                <Row title='drawersAndModals'>
                    {/* New Drawer */}
                    <Drawer
                        placement={"left"}
                        width={1000}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onClose={this.toggleNewDrawer}
                        visible={this.state.isNewDrawerVisible}
                    >
                        {this.state.newDrawerContent}
                    </Drawer>
                    {/* Edit Drawer */}
                    <Drawer
                        placement={"left"}
                        width={1000}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onClose={this.toggleEditDrawer}
                        visible={this.state.isEditDrawerVisible}
                    >
                        {this.state.editDrawerContent}
                    </Drawer>
                    {/* Delete Modal */}
                    <Modal
                        visible={this.state.isDeleteModalVisible}
                        //title="حذف"
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onOk={this.handleOk}
                        onCancel={this.toggleDeleteModal}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.toggleDeleteModal}>
                                لغو
                            </Button>,
                            <Button key='2' className='submit-button-style' onClick={this.handleOk} disabled={this.state.isModalDeleteButtonDisable}>
                                حذف
                            </Button>,
                        ]}
                    >
                        <Container fluid>
                            <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>حذف</span>
                                </Col>
                            </Row>
                            <Row title='content'>
                                <Col sm='12' style={{ textAlign: 'right' }}>
                                    <p>
                                        آیا از حذف این رکورد اطمینان دارید ؟
                                    </p>
                                    <p>برای تایید  <strong>{`"${this.state.title}"`}</strong> را وارد کنید.</p>
                                    <Row>
                                        <Col sm="8">
                                            <Form>
                                                <FormGroup title="enteredTitle">
                                                    <Input
                                                        type="text"
                                                        id="deleteModalInputValue"
                                                        name="deleteModalInputValue"
                                                        value={this.state.deleteModalInputValue}
                                                        onChange={this.handleChangeDeleteModalInput}
                                                    />
                                                </FormGroup>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Modal>
                    {/* Print Modal */}
                    <Modal
                        //title="چاپ"
                        visible={this.state.isPrintModalVisible}
                        bodyStyle={{ padding: '0px' }}
                        maskClosable={false}
                        onOk={this.handleOk}
                        //onOk={this.togglePrintModal}
                        onCancel={this.togglePrintModal}
                        footer={[
                            <Button key='1' className='submit-button-style' onClick={this.togglePrintModal}>
                                تایید
                            </Button>
                        ]}
                    >
                        <Container fluid>
                            <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>چاپ</span>
                                </Col>
                            </Row>
                            <Row title='content'>
                                <Col sm='12' style={{ textAlign: 'right' }}>
                                    <h3>این عملکرد اکنون در دسترس نیست !</h3>
                                </Col>
                            </Row>
                        </Container>
                    </Modal>
                    {/* ProductScale Modal */}
                    <Modal
                        visible={this.state.isProductSupplierModalVisible}
                        bodyStyle={{ padding: '0px' }}
                        maskClosable={false}
                        onCancel={this.toggleProductSupplierModal}
                        footer={[
                            <Button onClick={this.toggleProductSupplierModal}>لغو </Button>
                        ]}
                        destroyOnClose={this.state.isProductSupplierModalDestroy}
                    >
                        <Container fluid>
                            <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                {this.state.productProducerModalComponent}
                            </Row>
                        </Container>
                    </Modal>
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
                        width={900}
                        maskClosable={true}
                        onCancel={this.toggleProductExtraInfoModal}
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
        productList: state.product.productList,
        productSupplierList: state.product.productSupplier,
        productItem: state.product.productItem,
        wasCodeUsedFlag: state.product.wasCodeUsedFlag,
        message: state.product.message,
        domain: state.auth.domain,
        userMenuAccessList: state.auth.userMenuAccessList,
        checkTokenCounter: state.auth.checkTokenCounter,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    getProduct: (data) => dispatch(getProduct(data)),
    getProperty: (data) => dispatch(getProperty(data)),
    getProductItem: (data) => dispatch(getProductItem(data)),
    deleteProduct: (data) => dispatch(deleteProduct(data)),
    resetProps: () => dispatch(resetProps()),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Product);