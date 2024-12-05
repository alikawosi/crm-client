import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import { Drawer, Modal } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../..//shared/common/agGridLocalization/agGridLocalFA.component";
import { getMaterial, getMaterialItem, deleteMaterial, resetProps } from '../../../../../../redux/product/material/material.action';
import {getMaterialScale} from '../../../../../../redux/product/materialScale/materialScale.action'
import {getProperty} from '../../../../../../redux/product/property/property.action'
import Notification from "../../../../../shared/common/notification/notification.component";
import NewMaterial from './newMaterial.component';
import EditMaterial from './editMaterial.component';
import GridSeenButton from './gridSeenButton.component'
import MaterialScale from './materialScaleModal.component'
import './material.component.css';
//import ExcelImport from '../../../../../shared/common/excelImport/excelImport.component'
//import ExcelExport from '../../../../../shared/common/excelExport/excelExport.component'
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';



class Material extends PureComponent {

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
                { headerName: 'گروه کالا پایه', field: "materialCategoryTitle" },
                { headerName: 'مجموعه ', field: "parentIdTitle" },
                { headerName: 'عنوان', field: "title" },
                { headerName: 'کد کالا', field: "code" },
                { headerName: 'واحدهای اندازه گیری', field: "materialScaleExictanceCheck",cellRenderer: "gridSeenButton", },
                { headerName: 'شماره سریال', field: "serialNumber" },
                { headerName: 'مخفف', field: "abbreviation" },
                { headerName: 'توضیحات', field: "descriptionRow" },
            ],

            gridOptions: {
                context: { componentParent: this },
                frameworkComponents: {
                  gridSeenButton: GridSeenButton,
                },
              },

            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,

            },
            detailCellRendererParams: {

                detailGridOptions: {
                    columnDefs: [
                        { headerName: 'عنوان', field: "title" },
                        { headerName: 'واحد اندازه گیری', field: "scaleTitle" },
                        { headerName: 'مقدار', field: "propertyValue" },
                        { headerName: 'مخفف', field: "abbreviation" },
                        { headerName: 'توضیحات', field: "descriptionRow" },
                    ],
                    enableRtl: 'true',
                },
                getDetailRowData: (params) => {this.getProperty(params);},

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
            isMaterialScaleModalVisible:false,
            isMaterialScaleModalDestroy:true,
            isExcelImportModalVisible: false,
            //drawer content
            newDrawerContent: <div></div>,
            editDrawerContent: <div></div>,
            materialScaleModalComponent: <div></div>,
            //button control flag
            isDeleteButtonDisable: true,
            isEditButtonDisable: true,
            isModalDeleteButtonDisable: true,
            //button access flag
            isNewButtonHidden: true,
            isEditButtonHidden: true,
            isDeleteButtonHidden: true,
            isPrintButtonHidden: true,
            isExcelButtonHidden: true,
        }
    }
    /* #endregion */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {
        this.getMaterial();
        this.accessToButton(this.props.userMenuAccessList);
    }
    /* #endregion */

    /* #region  [- accessToButton -] */
    accessToButton = (data) => {
        if (data.includes("795")) {
            this.setState({
                isNewButtonHidden: false
            })
        }

        if (data.includes("811")) {
            this.setState({
                isEditButtonHidden: false
            })
        }

        if (data.includes("809")) {
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
        if (this.props.materialList !== prevProps.materialList) {
            this.setState({
                rowData: this.props.materialList
            })
        }
    }
    /* #endregion */


    /* #region  [- getMaterial() -] */
    getMaterial = async () => {
        let materialGetData = {
            domainRef: parseInt(this.state.domainRef)
        }
        await this.props.getMaterial(materialGetData);
    }
    /* #endregion */

    /* #region  [- getMaterialFullPath() -] */
    getMaterialFullPath = async () => {
        let materialFullPathGetData = {
            domainRef: parseInt(this.state.domainRef)
        }
        await this.props.getMaterialFullPath(materialFullPathGetData);
    }
    /* #endregion */

    /* #region  [- getMaterialItem() -] */
    getMaterialItem = async () => {
        let materialItemGetData = {
            materialId: this.state.id
        }
        await this.props.getMaterialItem(materialItemGetData);
    }
    /* #endregion */

    /* #region  [- getMaterialScale() -] */
    getMaterialScale = async () => {
        let materialScaleGetData = {
            materialId: parseInt(this.state.id)
        }
        await this.props.getMaterialScale(materialScaleGetData);
    }
    /* #endregion */
        
    /* #region  [- getProperty -] */
    getProperty = async (params) => {
        let data = {
        materialId: params.data.id,
        };
        await this.props.getProperty(JSON.stringify(data));
        params.successCallback(this.props.propertyList);
    };
    /* #endregion */


    /* #region  [- deleteMaterial() -] */
    deleteMaterial = async () => {
        let materialDeleteData = {
            materialIdList: [
                {
                    id: this.state.id
                }
            ]
        }
        await this.props.deleteMaterial(materialDeleteData);
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
                await this.getMaterialScale();

            }
            else {
                this.setState({
                    id: pickedValue.id,
                    title: pickedValue.title,
                    isDeleteButtonDisable: false,
                    isEditButtonDisable: false,
                })
                await this.getMaterialScale();


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
        if (this.state.isNewDrawerVisible === true) {
            this.deselectAllRows();
            this.deselectGridRow();
            this.getMaterial();
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
            await this.getMaterial();
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
            await this.getMaterial();
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

    /* #region  [- toggleMaterialScaleModal() -] */
    toggleMaterialScaleModal = async () => {

        if (this.state.isMaterialScaleModalVisible === true) {
            this.setState({
                isMaterialScaleModalVisible: false,
                id:''
            })
            this.deselectAllRows();
            this.deselectGridRow();
        }
        else if (this.state.isMaterialScaleModalVisible === false) {
            this.setState({
                isMaterialScaleModalVisible: true
            })
        }

    }
    /* #endregion */


    /* #region  [- showMaterialScaleModal -] */
    showMaterialScaleModal = async (data) => {

        this.setState({
        isMaterialScaleModalVisible: true,
        isMaterialScaleModalDestroy: false,
        materialScaleModalComponent: <MaterialScale />,
        });
    };
    /* #endregion */

    /* #region  [- handleOk() -] */
    handleOk = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.deleteMaterial();
        await this.toggleDeleteModal();

    }
    /* #endregion */

    /* #region  [- new -] */
    new = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.toggleNewDrawer();
        this.setState({
            newDrawerContent: <NewMaterial onClose={this.toggleNewDrawer} />
        })
    }
    /* #endregion */

    /* #region  [- edit -] */
    edit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getMaterialItem();
        let materialSelectedItem = { ...this.props.materialItem[0] }
        if (materialSelectedItem.id === undefined) {
            await this.refresh();
        }
        else {
            this.toggleEditDrawer();
            this.setState({
                editDrawerContent: <EditMaterial materialId={this.state.id} onClose={this.toggleEditDrawer} />
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
        await this.getMaterial();
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
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '25px' }}>کالا پایه</span>
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
                            masterDetail={true}
                            detailCellRendererParams={this.state.detailCellRendererParams}
                            columnDefs={this.state.columnDefs}
                            rowData={this.props.materialList}
                            enableRtl={true}
                            rowSelection='single'
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.defaultColDef}
                            detailRowHeight={500}
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
                    {/* MaterialScale Modal */}
                    <Modal
                        visible={this.state.isMaterialScaleModalVisible}
                        bodyStyle={{ padding: '0px' }}
                        maskClosable={false}
                        onCancel={this.toggleMaterialScaleModal}
                        footer={[
                            <Button onClick={this.toggleMaterialScaleModal}>لغو </Button>
                        ]}
                        destroyOnClose={this.state.isMaterialScaleModalDestroy}
                    >
                        <Container fluid>
                            <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                {this.state.materialScaleModalComponent}
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
        materialList: state.material.materialList,
        propertyList: state.property.propertyList,
        materialItem: state.material.materialItem,
        message: state.material.message,
        domain: state.auth.domain,
        userMenuAccessList: state.auth.userMenuAccessList,
        checkTokenCounter: state.auth.checkTokenCounter,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    getMaterial: (data) => dispatch(getMaterial(data)),
    getMaterialScale: (data) => dispatch(getMaterialScale(data)),
    getProperty: (data) => dispatch(getProperty(data)),
    getMaterialItem: (data) => dispatch(getMaterialItem(data)),
    deleteMaterial: (data) => dispatch(deleteMaterial(data)),
    resetProps: () => dispatch(resetProps()),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Material);