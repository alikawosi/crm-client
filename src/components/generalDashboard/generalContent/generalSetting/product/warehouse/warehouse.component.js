/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import { Drawer, Modal, Table, Space } from 'antd';
import { Button as AntdButton, Input as AntdInput } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Notification from "../../../../../shared/common/notification/notification.component";
import { getWarehouse, getWarehouseItem, deleteWarehouse, resetProps } from '../../../.././../../redux/product/warehouse/warehouse.action';
import NewWarehouse from '../warehouse/newWarehouse.component'
import EditWarehouse from '../warehouse/editWarehouse.component'
import './warehouse.component.css'
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
/* #endregion */

class Warehouse extends PureComponent {

    /* #region  [- ctor -] */

    constructor(props) {
        super(props);
        this.state = {
            domainRef: this.props.domain,
            /* #region  [- fields -] */

            id: 0,
            parentId: '',
            warehouseCategoryRef: '',
            title: '',
            abbreviation: '',
            code: '',
            threadCode: '',
            warehouseStatus: false,
            descriptionRow: '',

            /* #endregion */

            deleteModalInputValue: '',
            selectedRowKeys: [],
            searchText: '',
            searchedColumn: '',

            //grid
            columnDefs: [
                {
                    headerName: "ردیف",
                    //headerCheckboxSelection: true,
                    checkboxSelection: true,
                    valueGetter: "node.rowIndex+1",
                    cellClass: "locked-col",
                    //pinned: "right",
                    //width: 70
                },
                { headerName: "Id", field: "id", hide: true },
                { headerName: 'گروه انبار', field: "warehouseCategoryTitle" },
                { headerName: "عنوان", field: "title" },
                { headerName: "کد", field: "code" },
                { headerName: 'عنوان کامل', field: "fullPath" },
                { headerName: "مجموعه", field: "parentIdTitle" },
                { headerName: 'وضعیت ', field: "warehouseStatusTitle" },
                { headerName: "مخفف", field: "abbreviation" },
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
            isExcelExportModalVisible: false,
            //drawer content
            newDrawerContent: <div></div>,
            editDrawerContent: <div></div>,
            //button control flag
            isDeleteButtonDisable: true,
            isEditButtonDisable: true,
            isModalDeleteButtonDisable: true,

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
        this.getWarehouse();
        this.accessToMenu(this.props.userMenuAccessList);

    }
    /* #endregion */

       /* #region  [- accessToMenu -] */
       accessToMenu = (data) => {
        if (data.includes("873")) {
            this.setState({
                isNewButtonHidden: false
            })
        }
        if (data.includes("877")) {
            this.setState({
                isEditButtonHidden: false
            })
        }
        if (data.includes("879")) {
            this.setState({
                isDeleteButtonHidden: false
            })
        }
        
    }
    /* #endregion */


    /* #region  [- componentDidUpdate(prevProps) -]  */
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
            rowData: this.props.warehouseList
        })
    }
    /* #endregion */

    /* #region  [- getWarehouse -] */
    getWarehouse = async () => {

        let warehouseGetData = {
            domainRef: parseInt(this.state.domainRef)
        }
        await this.props.getWarehouse(warehouseGetData)
    }

    /* #endregion */

    /* #region  [- getWarehouseItem() -] */
    getWarehouseItem = async () => {
        let warehouseItemGetData = {
            warehouseId: this.state.id,
            domainRef: parseInt(this.state.domainRef)
        }
        await this.props.getWarehouseItem(warehouseItemGetData);
    }
    /* #endregion */

    /* #region  [- deleteWarehouse -] */
    deleteWarehouse = async () => {

        let warehouseDeleteData = {
            warehouseIdList:
                [
                    {
                        id: this.state.id
                    }
                ]
        }
        await this.props.deleteWarehouse(warehouseDeleteData)
        this.getWarehouse();
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

    /* #region  [- onCloseNewDrawer -] */
    onCloseNewDrawer = async () => {
            //this.deselectAllRows();
            this.deselectGridRow();
            await this.refresh();
            this.setState({
                isNewDrawerVisible: false,
                newDrawerContent: <div></div>,
            })
            this.getWarehouse();     
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

    /* #region  [- onClosePrintModal() -] */
   onClosePrintModal = () => {
            this.setState({
                isPrintModalVisible: false,
            })
    }
    /* #endregion */

    /* #region  [- toggleExcelExportModal() -] */
    toggleExcelExportModal = () => {

        if (this.state.isExcelExportModalVisible === true) {
            this.setState({
                isExcelExportModalVisible: false,
            })
        }
        else if (this.state.isExcelExportModalVisible === false) {
            this.setState({
                isExcelExportModalVisible: true
            })
        }

    }
    /* #endregion */

    /* #region  [- onCloseDeleteModal -] */
    onCloseDeleteModal = async () => {
            this.deselectAllRows();
            this.deselectGridRow();
            this.setState({
                isDeleteModalVisible: false,
                id: 0,
                title: '',
                deleteModalInputValue: '',
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

    /* #region  [- new -] */
    new = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            newDrawerContent: <NewWarehouse onClose={this.onCloseNewDrawer} />,
            isNewDrawerVisible: true
        })
    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isDeleteModalVisible: true
        })
    }
    /* #endregion */

    /* #region  [- edit -] */
    edit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getWarehouseItem();
        let warehouseSelectedItem = { ...this.props.warehouseItem[0] }
        if (warehouseSelectedItem.id === undefined) {
            await this.getWarehouse();
        }
        else {
            this.setState({
                isEditDrawerVisible: true,
                editDrawerContent: <EditWarehouse warehouseId={this.props.warehouseItem[0].id} onClose={this.onCloseEditDrawer} />
            })
        }
    }
    /* #endregion */

    /* #region  [- refresh -] */
    refresh = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getWarehouse();
        this.deselectGridRow();
    }
    /* #endregion */

    /* #region  [- handleOk -] */
    handleOk = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.deleteWarehouse();
        this.onCloseDeleteModal();
        this.getWarehouse();
    }
    /* #endregion */

    /* #region  [- excelExport -] */
    excelExport = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.toggleExcelExportModal();
    }
    /* #endregion */

    /* #region  [- print -] */
    print = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isPrintModalVisible: true
        })
    }
    /* #endregion */



    /* #region  [- render() -] */
    render() {

        const localText = AG_GRID_LOCALE_FA;
        return (
            <Container fluid>
                <Row title='header' className='mt-2'>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '25px' }}> انبار </span>
                    </Col>
                </Row>
                <hr />
                <Row title='buttons' style={{marginBottom:'1%'}}>
                    <Col sm='12' md='12' lg='12' style={{ textAlign: 'right' }}>
                        <Button hidden={this.state.isNewButtonHidden} className='submit-button-style mr-2' onClick={this.new} >
                            جدید
                        </Button>
                        <Button hidden={this.state.isEditButtonHidden} className='submit-button-style mr-2' disabled={this.state.isEditButtonDisable} onClick={this.edit}>
                            ویرایش
                        </Button>
                        <Button hidden={this.state.isDeleteButtonHidden} className='submit-button-style mr-2' disabled={this.state.isDeleteButtonDisable} onClick={this.delete}>
                            حذف
                        </Button>
                        <Button  className='submit-button-style mr-2' onClick={this.refresh} >
                            بازیابی
                        </Button>
                    </Col>
                </Row>
  
                <Row name='row_03_Grid' className='grid'>
                          
                          <Col key='agGrid' className='ag-theme-alpine' style={{ height: '60vh', width: '100%' }}>
                              <AgGridReact
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.props.warehouseList}
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
                        width='50%'
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
                        width='50%'
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        visible={this.state.isEditDrawerVisible}
                        onClose={this.onCloseEditDrawer}
                    >
                        {this.state.editDrawerContent}
                    </Drawer>
                    {/* Delete Modal */}
                    <Modal
                        visible={this.state.isDeleteModalVisible}
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
                    {/* Excel Export Modal */}
                    {/* <Modal
                        visible={this.state.isExcelExportModalVisible}
                        bodyStyle={{ padding: '0px' }}
                        onOk={this.toggleExcelExportModal}
                        onCancel={this.toggleExcelExportModal}
                        closable={true}
                        maskClosable={false}
                        footer={[
                            <Button key='1' className='submit-button-style' onClick={this.toggleExcelExportModal}>
                                تایید
                        </Button>
                        ]}
                    >
                        <Container fluid>
                            <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>خروجی اکسل</span>
                                </Col>
                            </Row>
                            <Row title='content'>
                                <Col sm='12' style={{ textAlign: 'right' }}>
                                    <h3>این عملکرد اکنون در دسترس نیست !</h3>
                                </Col>
                            </Row>
                        </Container>
                    </Modal>
 */}

                </Row>


            </Container>
        )
    }
    /* #endregion */

    /* #endregion */

}


/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {

        warehouseList: state.warehouse.warehouseList,
        warehouseItem: state.warehouse.warehouseItem,
        message: state.warehouse.message,
        domain: state.auth.domain,
        checkTokenCounter: state.auth.checkTokenCounter,
        userMenuAccessList: state.auth.userMenuAccessList,

    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    getWarehouse: (data) => dispatch(getWarehouse(data)),
    getWarehouseItem: (data) => dispatch(getWarehouseItem(data)),
    deleteWarehouse: (data) => dispatch(deleteWarehouse(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    resetProps: (data) => dispatch(resetProps(data))


});
/* #endregion */


export default connect(mapStateToProps, mapDispatchToProps)(Warehouse);