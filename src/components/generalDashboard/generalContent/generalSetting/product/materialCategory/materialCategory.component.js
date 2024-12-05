import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import { Drawer, Modal } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { getMaterialCategory, getMaterialCategoryFullPath, getMaterialCategoryItem, deleteMaterialCategory, getMaterialCategoryFullPathById, resetProps } from '../../../../../../redux/product/materialCategory/materialCategory.action';
import Notification from "../../../../../shared/common/notification/notification.component";
import NewMaterialCategory from './newMaterialCategory.component';
import EditMaterialCategory from './editMaterialCategory.component';
import './materialCategory.component.css';
//import ExcelImport from '../../../../../shared/common/excelImport/excelImport.component'
//import ExcelExport from '../../../../../shared/common/excelExport/excelExport.component'
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";

class MaterialCategory extends PureComponent {
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
            columnDefs: [
                { headerName: 'ردیف', checkboxSelection: true, valueGetter: 'node.rowIndex+1', cellClass: 'locked-col', width: 70 },
                { headerName: "Id", field: "id", hide: true },
                { headerName: "مجموعه", field: "parentIdTitle" },
                { headerName: "نام", field: "title" },
                { headerName:  'نام کامل', field: "fullPath" },
                { headerName: "مخفف", field: "abbreviation" },
                { headerName: "کد", field: "code" },
                { headerName: 'کد رشته ای', field: "threadCode" },
                { headerName: 'شماره سریال', field: "serialNumber" },
                { headerName: "توضیحات", field: "descriptionRow" },

            ],
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
            //drawer and modal control flag
            isNewDrawerVisible: false,
            isEditDrawerVisible: false,
            isDeleteModalVisible: false,
            isPrintModalVisible: false,
            isExcelImportModalVisible: false,
            //drawer content
            newDrawerContent: <div></div>,
            editDrawerContent: <div></div>,
            //button control flag
            isDeleteButtonDisabled: true,
            isEditButtonDisabled: true,
            isModalDeleteButtonDisabled: true,
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
        this.getMaterialCategory();
        this.accessToButton(this.props.userMenuAccessList);
    }
    /* #endregion */

    /* #region  [- accessToButton -] */
    accessToButton = (data) => {
        if (data.includes("782")) {
            this.setState({
                isNewButtonHidden: false
            })
        }

        if (data.includes("787")) {
            this.setState({
                isEditButtonHidden: false
            })
        }

        if (data.includes("785")) {
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
        this.setState({
            rowData: this.props.materialCategoryList
        })
    }
    /* #endregion */

    /* #region  [- getMaterialCategory() -] */
    getMaterialCategory = async () => {
        let materialCategoryGetData = {
            domainRef: parseInt(this.state.domainRef)
        }
        await this.props.getMaterialCategory(materialCategoryGetData);
    }
    /* #endregion */

    /* #region  [- getMaterialCategoryFullPath() -] */
    getMaterialCategoryFullPath = async () => {
        let materialCategoryFullPathGetData = {
            domainRef: parseInt(this.state.domainRef)
        }
        await this.props.getMaterialCategoryFullPath(materialCategoryFullPathGetData);
    }
    /* #endregion */

    /* #region  [- getMaterialCategoryFullPathById() -] */
    getMaterialCategoryFullPathById = async () => {
        let materialCategoryFullPathByIdGetData = {
            domainRef: parseInt(this.state.domainRef),
            id: this.state.id
        }
        await this.props.getMaterialCategoryFullPathById(materialCategoryFullPathByIdGetData);
    }
    /* #endregion */

    /* #region  [- getMaterialCategoryItem() -] */
    getMaterialCategoryItem = async () => {
        let materialCategoryItemGetData = {
            materialCategoryId: this.state.id
        }
        await this.props.getMaterialCategoryItem(materialCategoryItemGetData);
    }
    /* #endregion */

    /* #region  [- deleteMaterialCategory() -] */
    deleteMaterialCategory = async () => {
        let materialCategoryDeleteData = {
            materialCategoryIdList: [
                {
                    id: this.state.id
                }
            ]
        }
        await this.props.deleteMaterialCategory(materialCategoryDeleteData);
    }
    /* #endregion */

    /* #region  [ - onGridReady - ] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };
    /* #endregion */

    /* #region  [-  onSelectionChanged() -] */
    onSelectionChanged = () => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);

        const len = selectedData.length;
        if (len === 0) {
            this.setState({
                id: 0,
                isDeleteButtonDisabled: true,
                isEditButtonDisabled: true,
            });
        }
        if (len === 1) {
            const picked = Object.keys(selectedData)[0];
            const pickedValue = selectedData[picked];
            this.setState({
                id: pickedValue.id,
                title: pickedValue.title,
            })
            if (pickedValue.checkRefFlag === true) {
                this.setState({
                    isDeleteButtonDisabled: true,
                    isEditButtonDisabled: false,
                })
            }
            else {
                this.setState({
                    isDeleteButtonDisabled: false,
                    isEditButtonDisabled: false,
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
            isDeleteButtonDisabled: true,
            isEditButtonDisabled: true,
            isModalDeleteButtonDisabled: true,
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
                isModalDeleteButtonDisabled: false
            });
        } else {
            this.setState({
                isModalDeleteButtonDisabled: true
            });
        }
    }
    /* #endregion */

    /* #region  [- toggleNewDrawer() -] */
    toggleNewDrawer = async () => {
        if (this.state.isNewDrawerVisible === true) {
            this.deselectAllRows();
            this.deselectGridRow();
            this.getMaterialCategory();
            this.setState({
                isNewDrawerVisible: false,
                newDrawerContent: <div></div>,
            })
        }
        else if (this.state.isNewDrawerVisible === false) {
            await this.getMaterialCategoryFullPath();
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
            await this.getMaterialCategory();
            this.setState({
                isEditDrawerVisible: false,
                editDrawerContent: <div></div>,
            })
        }
        else if (this.state.isEditDrawerVisible === false) {
            await this.getMaterialCategoryFullPathById();
            this.setState({
                isEditDrawerVisible: true
            })
        }
    }
    /* #endregion */

    /* #region  [- toggleDeleteModal() -] */
    toggleDeleteModal = async () => {
        if (this.state.isDeleteModalVisible === true) {
            this.deselectAllRows();
            this.deselectGridRow();
            await this.getMaterialCategory();
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
    togglePrintModal = () => {

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


    /* #region  [- handleOk() -] */
    handleOk = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.deleteMaterialCategory();
        await this.toggleDeleteModal();
        await this.getMaterialCategory();
    }
    /* #endregion */

    /* #region  [- print -] */
    print = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.togglePrintModal();
    }
    /* #endregion */

    /* #region  [- new -] */
    new = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.toggleNewDrawer();
        this.setState({
            newDrawerContent: <NewMaterialCategory onClose={this.toggleNewDrawer} />
        })
    }
    /* #endregion */

    /* #region  [- edit -] */
    edit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getMaterialCategoryItem();
        let materialCategorySelectedItem = { ...this.props.materialCategoryItem[0] }
        if (materialCategorySelectedItem.id === undefined) {
            await this.getMaterialCategory();
        }
        else {
            await this.toggleEditDrawer();
            this.setState({
                editDrawerContent: <EditMaterialCategory onClose={this.toggleEditDrawer} />
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
        await this.getMaterialCategory();
        await this.deselectGridRow();
    }
    /* #endregion */

    /* #region  [- render() -] */
    render() {
        const localText = AG_GRID_LOCALE_FA;

        return (
            <Container fluid>
                <Row title='header' className='mt-2'>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '25px' }}> گروه کالا پایه</span>
                    </Col>
                </Row>
                <hr />
                <Row title='buttons'>
                    <Col sm='12' md='12' lg='12' style={{ textAlign: 'right' ,marginBottom:'1%'}}>
                        <Button hidden={this.state.isNewButtonHidden} className='submit-button-style mr-2' onClick={this.new}>
                            جدید
                        </Button>
                        <Button hidden={this.state.isEditButtonHidden} className='submit-button-style mr-2' onClick={this.edit} disabled={this.state.isEditButtonDisabled}>
                            ویرایش
                        </Button>
                        <Button hidden={this.state.isDeleteButtonHidden} className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteButtonDisabled}>
                            حذف
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.refresh}>
                            بازیابی
                        </Button>
                    </Col>
                </Row>
                <Row name='row_03_Grid' className='grid'>
                          
                          <Col key='agGrid' className='ag-theme-alpine' style={{ height: '60vh', width: '100%' }}>
                              <AgGridReact
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.props.materialCategoryList}
                            enableRtl={true}
                            rowSelection='single'
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={localText}
                            defaultColDef={this.state.defaultColDef}
                              >
                              </AgGridReact>
                          </Col>
                         

                      </Row>
                <Row title='drawersAndModals'>
                    {/* New Drawer */}
                    <Drawer
                        placement={"left"}
                        width={500}
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
                        width={500}
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
                            <Button key='2' className='submit-button-style' onClick={this.handleOk} disabled={this.state.isModalDeleteButtonDisabled}>
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
                    <Modal visible={this.state.isPrintModalVisible} bodyStyle={{ padding: '0px' }} onOk={this.togglePrintModal}
                        closable={true}
                        maskClosable={false}
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

                </Row>
            </Container>
        );
    }
    /* #endregion */
}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        materialCategoryList: state.materialCategory.materialCategoryList,
        materialCategoryItem: state.materialCategory.materialCategoryItem,
        message: state.materialCategory.message,
        domain: state.auth.domain,
        userMenuAccessList: state.auth.userMenuAccessList,
        checkTokenCounter: state.auth.checkTokenCounter,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    getMaterialCategory: (data) => dispatch(getMaterialCategory(data)),
    getMaterialCategoryFullPath: (data) => dispatch(getMaterialCategoryFullPath(data)),
    getMaterialCategoryFullPathById: (data) => dispatch(getMaterialCategoryFullPathById(data)),
    getMaterialCategoryItem: (data) => dispatch(getMaterialCategoryItem(data)),
    deleteMaterialCategory: (data) => dispatch(deleteMaterialCategory(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    resetProps: () => dispatch(resetProps()),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(MaterialCategory);