/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import { Button as AntdButton, Input as AntdInput } from "antd";
import { Drawer, Modal, Table, Space, Menu, Dropdown } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { getWarehouseCategory, getWarehouseCategoryFormData, getWarehouseCategoryItem, deleteWarehouseCategory, resetProps } from '../../../../../../redux/product/warehouseCategory/warehouseCategory.action';
import Notification from "../../../../../shared/common/notification/notification.component";
import NewWarehouseCategory from './newWarehouseCategory.component';
import EditWarehouseCategory from './editWarehouseCategory.component';
import './warehouseCategory.component.css';
//import ExcelImport from '../../../../../shared/common/excelImport/excelImport.component'
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
//import ExcelExport from '../../../../../shared/common/excelExport/excelExport.component'
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
/* #endregion */


class WarehouseCategory extends PureComponent {
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
                { headerName: 'تاریخ ایجاد انبار  ', field: "nativeDateCreated" },
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
            /* #region  [- flags -] */
            isNewDrawerVisible: false,
            isEditDrawerVisible: false,
            isDeleteModalVisible: false,
            isPrintModalVisible: false,
            isExcelImportModalVisible: false,
            newDrawerContent: <div></div>,
            editDrawerContent: <div></div>,
            isDeleteButtonDisable: true,
            isEditButtonDisable: true,
            isModalDeleteButtonDisable: true,
            /* #endregion */

            isNewButtonHidden: true,
            isEditButtonHidden: true,
            isDeleteButtonHidden: true,
            isRefreshButtonHidden: true,
            isExcelButtonHidden: true,
            isPrintButtonHidden: true,
        }
    }
    /* #endregion */

    /* #region  [- method -] */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {
        this.getWarehouseCategory();
        this.accessToMenu(this.props.userMenuAccessList);

    }
    /* #endregion */

     /* #region  [- accessToMenu -] */
     accessToMenu = (data) => {
        if (data.includes("863")) {
            this.setState({
                isNewButtonHidden: false
            })
        }
        if (data.includes("868")) {
            this.setState({
                isEditButtonHidden: false
            })
        }
        if (data.includes("866")) {
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
            rowData: this.props.warehouseCategoryList
        })
    }
    /* #endregion */

    /* #region  [- getWarehouseCategory() -] */
    getWarehouseCategory = async () => {
        let warehouseCategoryGetData = {
            domainRef: parseInt(this.state.domainRef)
        }
        await this.props.getWarehouseCategory(warehouseCategoryGetData);
    }
    /* #endregion */

    /* #region  [- getWarehouseCategoryFormData() -] */
    getWarehouseCategoryFormData = async () => {
        let warehouseCategoryFormDataGetData = {
            domainRef: parseInt(this.state.domainRef)
        }
        await this.props.getWarehouseCategoryFormData(warehouseCategoryFormDataGetData);
    }
    /* #endregion */

    /* #region  [- getWarehouseCategoryItem() -] */
    getWarehouseCategoryItem = async () => {
        let warehouseCategoryItemGetData = {
            warehouseCategoryId: this.state.id,
            domainRef: parseInt(this.state.domainRef)
        }
        await this.props.getWarehouseCategoryItem(warehouseCategoryItemGetData);
    }
    /* #endregion */

    /* #region  [- deleteWarehouseCategory() -] */
    deleteWarehouseCategory = async () => {
        let warehouseCategoryDeleteData = {
            warehouseCategoryIdList: [
                {
                    id: this.state.id
                }
            ]
        }
        await this.props.deleteWarehouseCategory(warehouseCategoryDeleteData);
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
    onSelectionChanged = () => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);

        const len = selectedData.length;
        if (len === 0) {
            this.setState({
                id: 0,
                isDeleteButtonDisable: true,
                isEditButtonDisable: true,
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
                    isDeleteButtonDisable: true,
                    isEditButtonDisable: false,
                })
            }
            else {
                this.setState({
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

    /* #region  [- getColumnSearchProps -] */
    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, }) => (
            <div style={{ padding: 8 }}>
                <AntdInput
                    ref={(node) => {
                        this.searchInput = node;
                    }}
                    //placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        this.handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ width: 188, marginBottom: 8, display: "block" }}
                />
                <Space>
                    <AntdButton
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex, clearFilters)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        جستجو
                </AntdButton>
                    <AntdButton
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        پاک کردن
                </AntdButton>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
                : "",
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
    });

    /* #endregion */

    /* #region  [- handleSearch -] */
    handleSearch = (selectedKeys, confirm, dataIndex, clearFilters) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
            clearFilters: clearFilters
        });
    };
    /* #endregion */

    /* #region  [- handleReset -] */
    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({
            searchText: "",
        });
    };
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

    /* #region  [- onCloseNewDrawer() -] */
    onCloseNewDrawer = async () => {
        this.deselectAllRows();
        this.deselectGridRow();
        await this.refresh();
        this.setState({
            isNewDrawerVisible: false,
            newDrawerContent: <div></div>,
        })

    }
    /* #endregion */

    /* #region  [- onCloseEditDrawer() -] */
    onCloseEditDrawer = async () => {
        this.deselectAllRows();
        this.deselectGridRow();
        await this.refresh();
        this.setState({
            isEditDrawerVisible: false,
            editDrawerContent: <div></div>,
        })
    }
    /* #endregion */

    /* #region  [- onCloseDeleteModal() -] */
    onCloseDeleteModal = async () => {
        this.deselectAllRows();
        this.deselectGridRow();
        await this.getWarehouseCategory();
        this.setState({
            isDeleteModalVisible: false,
            id: 0,
            title: '',
            deleteModalInputValue: '',
        })
    }
    /* #endregion */

    /* #region  [- newPrintModal() -] */
    newPrintModal = () => {
        this.setState({
            isPrintModalVisible: true,
        })
    }
    /* #endregion */

    /* #region  [- onClosePrintModal() -] */
    onClosePrintModal = () => {
        this.setState({
            isPrintModalVisible: false,
        })
    }
    /* #endregion */

    /* #region  [- handleOk() -] */
    handleOk = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.deleteWarehouseCategory();
        await this.onCloseDeleteModal();
        await this.getWarehouseCategory();
    }
    /* #endregion */

    /* #region  [- new -] */
    new = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isNewDrawerVisible: true,
            newDrawerContent: <NewWarehouseCategory onClose={this.onCloseNewDrawer} />
        })
    }
    /* #endregion */

    /* #region  [- edit -] */
    edit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getWarehouseCategoryItem();
        let warehouseCategorySelectedItem = { ...this.props.warehouseCategoryItem[0] }
        if (warehouseCategorySelectedItem.id === undefined) {
            await this.getWarehouseCategory();
        }
        else {
            this.setState({
                isEditDrawerVisible:true,
                editDrawerContent: <EditWarehouseCategory onClose={this.onCloseEditDrawer} />
            })
        }
    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
       this.setState({
        isDeleteModalVisible: true,
       })
    }
    /* #endregion */

    /* #region  [- refresh -] */
    refresh = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getWarehouseCategory();
        this.deselectGridRow();
    }
    /* #endregion */

    /* #region  [- print -] */
    print = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.newPrintModal();
    }
    /* #endregion */

    /* #region  [- onCloseImportModal() -] */
    onCloseImportModal = () => {
        this.setState({
            isExcelImportModalVisible: false,
        })
    }
    /* #endregion */

    /* #region  [- getDataFromExcelModal -] */
    getDataFromExcelModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.child.send();
        await this.refresh();
        this.onCloseImportModal();

    }
    /* #endregion */

    /* #region  [- postExcelFile -] */
    postExcelFile = async (excelData) => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        // let accountTypePostData = {
        //     domainRef: this.props.domain,
        //     accountTypeList: excelData
        // }
        // await this.props.postAccountType(JSON.stringify(accountTypePostData));
    }
    /* #endregion */

    /* #region  [- render() -] */
    render() {

        const localText = AG_GRID_LOCALE_FA;

        return (
            <Container fluid>
                <Row title='header' className='mt-2'>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '25px' }}>گروه انبار</span>
                    </Col>
                </Row>
                <hr />
                <Row title='buttons' style={{marginBottom:'1%'}}>
                    <Col sm='12' md='12' lg='12' className='content-button-right-col' >
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
                <Row name='row_03_Grid' className='grid'>
                          
                          <Col key='agGrid' className='ag-theme-alpine' style={{ height: '60vh', width: '100%' }}>
                              <AgGridReact
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.props.warehouseCategoryList}
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
                        onClose={this.onCloseNewDrawer}
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
                        onClose={this.onCloseEditDrawer}
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
                        onCancel={this.onCloseDeleteModal}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.onCloseDeleteModal}>
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
                        visible={this.state.isPrintModalVisible}
                        bodyStyle={{ padding: '0px' }}
                        onOk={this.onClosePrintModal}
                        onCancel={this.onClosePrintModal}
                        closable={true}
                        maskClosable={false}
                        footer={[
                            <Button key='1' className='submit-button-style' onClick={this.onClosePrintModal}>
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
                    {/* Excel Import Modal */}
                    {/* <Modal name='import' visible={this.state.isExcelImportModalVisible}
                        bodyStyle={{ padding: '0px' }}
                        onOk={this.onCloseImportModal}
                        destroyOnClose={true}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseImportModal}
                        footer={[
                            <Button key='1' className='submit-button-style' onClick={this.getDataFromExcelModal}>
                                ذخیره
                        </Button>
                        ]}

                    >
                        <Container fluid>
                            <Row name='header' className='modal-header-row mb-2' >
                                <Col className='modal-header-col'>
                                    <p className='modal-header-title'>بارگذاری فایل اکسل</p>
                                </Col>
                            </Row>
                            <Row name='content'>
                                <Col sm='12' >
                                    <ExcelImport name='warehouseCategory' sendExcelFileList={this.postExcelFile} columnsDef={columns} onRef={ref => (this.child = ref)} />
                                </Col>
                            </Row>
                        </Container>
                    </Modal> */}


                </Row>
            </Container>
        );
    }
    /* #endregion */

    /* #endregion */
}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        warehouseCategoryList: state.warehouseCategory.warehouseCategoryList,
        warehouseCategoryItem: state.warehouseCategory.warehouseCategoryItem,
        message: state.warehouseCategory.message,
        domain: state.auth.domain,
        checkTokenCounter: state.auth.checkTokenCounter,
        userMenuAccessList: state.auth.userMenuAccessList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    getWarehouseCategory: (data) => dispatch(getWarehouseCategory(data)),
    getWarehouseCategoryFormData: (data) => dispatch(getWarehouseCategoryFormData(data)),
    getWarehouseCategoryItem: (data) => dispatch(getWarehouseCategoryItem(data)),
    deleteWarehouseCategory: (data) => dispatch(deleteWarehouseCategory(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    resetProps: () => dispatch(resetProps()),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseCategory);