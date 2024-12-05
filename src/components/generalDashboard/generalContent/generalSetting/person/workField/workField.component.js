/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './workField.component.css';
import { Container, Col, Row, Button, Form, FormGroup, Input } from 'reactstrap';
import { Drawer, Space, Modal } from "antd";
import { Button as AntdButton, Input as AntdInput } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { connect } from 'react-redux';
import { getIndustry, deleteIndustry, getIndustryItem,postIndustry, getIndustryFullPath, resetProps } from '../../../../../../redux/infrastructure/industry/industry.action';
import NewWorkField from './newWorkField.component';
import EditWorkField from './editWorkField.component';
import Notification from "../../../../../shared/common/notification/notification.component";
//import ExcelImport from '../../../../../shared/common/excelImport/excelImport.component'
//import ExcelExport from '../../../../../shared/common/excelExport/excelExport.component'
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
/* #endregion */

class WorkField extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            domainRef: this.props.domain,
            title: '',
            deleteModalInputValue: '',
            //grid
            columnDefs: [
                { headerName: 'ردیف', checkboxSelection: true, valueGetter: 'node.rowIndex+1', cellClass: 'locked-col', width: 70 },
                { headerName: 'Id', field: 'id', hide: true },
                { headerName: 'عنوان', field: 'title', width: 100 },
                { headerName: 'نام کامل', field: 'fullPath', width: 150 },
                { headerName: 'توضیحات', field: 'descriptionRow' }
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
            // flag
            isDeleteModalVisible: false,
            isNewDrawerVisible: false,
            isEditDrawerVisible: false,
            isPrintModalVisible: false,
            isExcelImportModalVisible: false,
            //drawer content
            newDrawerContent: <div></div>,
            editDrawerContent: <div></div>,
            //button control flag
            isDeleteButtonDisable: true,
            isEditButtonDisable: true,
            isModalDeleteButtonDisable: true,

            isNewHidden: true,
            isEditHidden: true,
            isDeleteHidden: true,
            isRefreshHidden: true,
            isExcelHidden: true,
            isPrintHidden: true,
        }
    }
    /* #endregion */

    /* #region  [- method -] */
    
    /* #region  [- componentDidMount -] */
    componentDidMount() {
        this.getIndustry()
        this.accessToMenu(this.props.userMenuAccessList);

    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("40")) {
            this.setState({
                isNewHidden: false
            })
        }
        if (data.includes("42")) {
            this.setState({
                isEditHidden: false
            })
        }
        if (data.includes("45")) {
            this.setState({
                isDeleteHidden: false
            })
        }
        if (data.includes("47")) {
            this.setState({
                isPrintHidden: false
            })
        }
        if (data.includes("48")) {
            this.setState({
                isExcelHidden: false
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
            rowData: this.props.industryList
        })
    }
    /* #endregion */


    /* #region  [- getIndustry -] */
    getIndustry = async () => {
        let industryGetData = {
            domainRef: parseInt(this.state.domainRef)
        }
        await this.props.getIndustry(industryGetData)
    }
    /* #endregion */

    /* #region  [- getIndustryFullPath -] */
    getIndustryFullPath = async () => {
        let industryFullPathGetData = {
            domainRef: parseInt(this.state.domainRef)
        }
        await this.props.getIndustryFullPath(industryFullPathGetData)
    }
    /* #endregion */

    /* #region  [- getIndustryItem -] */
    getIndustryItem = async () => {
        let industryItemGetData = {
            industryId: this.state.id,
            domainRef:parseInt(this.state.domainRef)
        }
        await this.props.getIndustryItem(industryItemGetData)
    }
    /* #endregion */

    /* #region  [- deleteIndustry -] */
    deleteIndustry = async () => {
        let industryDeleteData = {
            industryIdList: [
                {
                    id: this.state.id
                }
            ]
        }
        await this.props.deleteIndustry(industryDeleteData);
    }
    /* #endregion */

    /* #region  [- postExcelFile -] */
    postExcelFile = async (excelData) => {
        let industryPostData = {
            domainRef: parseInt(this.state.domainRef),
            industryList: excelData
        }
        await this.props.postIndustry(industryPostData);
    }
    /* #endregion */
    

    /* #region  [ - onGridReady - ] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };
    /* #endregion */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = async() => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
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
                title: pickedValue.title
            })
            if (pickedValue.checkRefFlag === true) {
                this.setState({
                    isDeleteButtonDisable: true,
                    isEditButtonDisable: false,
                });
            } else {
                this.setState({
                    isDeleteButtonDisable: false,
                    isEditButtonDisable: false,
                });
            }
        }
    }
    /* #endregion */

    /* #region  [- deselectAllRows() -] */
    deselectAllRows = async () => {
        await this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #region  [- deselectGridRow -] */
    deselectGridRow = () => {
        this.setState({
            id: 0,
            title: '',
            deleteModalInputValue: '',
            selectedRowKeys: [],
            isDeleteButtonDisable: true,
            isEditButtonDisable: true,
            isModalDeleteButtonDisable: true,
        });
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
            })
        } else {
            this.setState({
                isModalDeleteButtonDisable: true
            });
        }
    }
    /* #endregion */

    /* #region  [- toggleNewDrawer -] */
    toggleNewDrawer = async() => {
        if (this.state.isNewDrawerVisible === true) {
            this.deselectAllRows();
            this.deselectGridRow();
            this.getIndustry();
            this.setState({
                isNewDrawerVisible: false,
                newDrawerContent: <div></div>
            })
        }
        else if (this.state.isNewDrawerVisible === false) {
            await this.getIndustryFullPath();
            this.setState({
                isNewDrawerVisible: true
            });
        }
    }
    /* #endregion */

    /* #region  [- toggleEditDrawer -] */
    toggleEditDrawer = async () => {
        if (this.state.isEditDrawerVisible === true) {
            this.deselectAllRows();
            this.deselectGridRow();
            await this.getIndustry();
            this.setState({
                isEditDrawerVisible: false,
                editDrawerContent: <div></div>
            });
        } else if (this.state.isEditDrawerVisible === false) {
            await this.getIndustryFullPath();
            this.setState({
                isEditDrawerVisible: true,
                editDrawerContent: <EditWorkField industryId={this.state.id} onClose={this.toggleEditDrawer} />
            });
        }
    }
    /* #endregion */

    /* #region  [- toggleExcelImportModal() -] */
    toggleExcelImportModal = () => {

        if (this.state.isExcelImportModalVisible === true) {
            this.setState({
                isExcelImportModalVisible: false,
            })
        }
        else if (this.state.isExcelImportModalVisible === false) {
            this.setState({
                isExcelImportModalVisible: true
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

    /* #region  [- toggleDeleteModal -] */
    toggleDeleteModal = async () => {
        if (this.state.isDeleteModalVisible === true) {
            this.deselectAllRows();
            this.deselectGridRow();
            await this.getIndustry();
            this.setState({
                isDeleteModalVisible: false,
                id: 0,
                title: '',
                deleteModalInputValue: '',
            });
        } else if (this.state.isDeleteModalVisible === false) {
            this.setState({
                isDeleteModalVisible: true
            });
        }
    }
    /* #endregion */


    /* #region  [- handleOk -] */
    handleOk = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.deleteIndustry();
        await this.toggleDeleteModal();
        await this.getIndustry();
    }
    /* #endregion */

    /* #region  [- new -] */
    new = async() => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.toggleNewDrawer();
        this.setState({
            newDrawerContent: <NewWorkField onClose={this.toggleNewDrawer} />
        });
    }
    /* #endregion */

    /* #region  [- edit -] */
    edit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getIndustryItem();
        let industrySelectedItem = { ...this.props.industryItem[0] }
        if (industrySelectedItem.id === undefined) {
            await this.getIndustry()
        } else {
            this.toggleEditDrawer();
            this.setState({
                //editDrawerContent: <EditIndustry industryId={this.state.id} onClose={this.toggleEditDrawer} />
            });
        }
    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.toggleDeleteModal();
    }
    /* #endregion */

    /* #region  [- print -] */
         print = async() => {
            await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.togglePrintModal();
        }
    /* #endregion */
        
    /* #region  [- showImportModal -] */
        showImportModal = async() => {
            await this.props.checkTokenExpiration(this.props.checkTokenCounter);
            this.toggleExcelImportModal();
        }
        /* #endregion */
        
    /* #region  [- refresh -] */
    refresh = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getIndustry();
        await this.deselectGridRow();
    }
    /* #endregion */

    /* #region  [- getDataFromExcelModal -] */
    getDataFromExcelModal = async () => {
        await this.child.send();
        await this.refresh();
        this.toggleExcelImportModal();

    }
    /* #endregion */


    /* #region  [- render -] */
    render() {
        const localText = AG_GRID_LOCALE_FA;

        return (
            <Container fluid>

                <Row title="header" className="mt-2">
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '25px' }}>زمینه فعالیت</span>
                    </Col>
                </Row>
                <hr />
                <Row title="buttons">
                    <Col sm='12' md='12' lg='12' style={{ textAlign: 'right' ,marginBottom:'1%'}}>
                        <Button
                            hidden={this.state.isNewHidden} className="submit-button-style"
                            onClick={this.new}
                        >
                            جدید
                        </Button>

                        <Button
                            hidden={this.state.isEditHidden} className='submit-button-style mr-2'
                            disabled={this.state.isEditButtonDisable}
                            onClick={this.edit}
                        >
                            ویرایش
                        </Button>

                        <Button
                            hidden={this.state.isDeleteHidden} className='submit-button-style mr-2'
                            disabled={this.state.isDeleteButtonDisable}
                            onClick={this.delete}
                        >
                            حذف
                        </Button>

                        <Button
                            hidden={this.state.isRefreshHidden} className='submit-button-style mr-2'
                            onClick={this.refresh}
                        >
                            بازیابی
                        </Button>
                    </Col>
                </Row>
                <Row name='row_03_Grid' className='grid'>
                          
                            <Col key='agGrid' className='ag-theme-alpine' style={{ height: '60vh', width: '100%' }}>
                                <AgGridReact
                              onGridReady={this.onGridReady}
                              columnDefs={this.state.columnDefs}
                              rowData={this.props.industryList}
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
                        placement={'left'}
                        width={500}
                        bodyStyle={{ padding: '0px' }}
                        closable={false}
                        //onClose={this.toggleNewDrawer}
                        visible={this.state.isNewDrawerVisible}
                    >
                        {this.state.newDrawerContent}
                    </Drawer>
                    {/* Edit Drawer */}
                    <Drawer
                        placement={"left"}
                        width={500}
                        bodyStyle={{ padding: '0px' }}
                        closable={false}
                        // onClose={this.toggleEditDrawer}
                        visible={this.state.isEditDrawerVisible}
                    >
                        {this.state.editDrawerContent}
                    </Drawer>
                    {/* Delete Modal */}
                    <Modal
                        visible={this.state.isDeleteModalVisible}
                        bodyStyle={{ padding: '0px' }}
                        closable={false}
                        //onOk={this.handleOk}
                        //onCancel={this.onClose}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.toggleDeleteModal}>
                                لغو
                            </Button>,
                            <Button key='2' className='submit-button-style' disabled={this.state.isModalDeleteButtonDisable} onClick={this.handleOk}>
                                حذف
                            </Button>
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
                                        <Col sm='8'>
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
                    <Modal visible={this.state.isPrintModalVisible} bodyStyle={{ padding: '0px' }} onOk={this.togglePrintModal} onCancel={this.togglePrintModal}
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
                    {/* Excel  Modal */}
                    {/* <Modal visible={this.state.isExcelImportModalVisible} bodyStyle={{ padding: '0px' }} onOk={this.toggleExcelImportModal} onCancel={this.toggleExcelImportModal}
                        destroyOnClose={true} closable={false}
                        footer={[
                            <Button key='1' className='submit-button-style' onClick={this.getDataFromExcelModal}>
                                ذخیره
                        </Button>
                        ]}

                    >
                        <Container fluid>
                            <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>بارگذاری فایل اکسل</span>
                                </Col>
                            </Row>
                            <Row title='content'>
                                <Col sm='12' >
                                    <ExcelImport title='industry' sendExcelFileList={this.postExcelFile} columnsDef={columns} onRef={ref => (this.child = ref)} />
                                </Col>
                            </Row>
                        </Container>
                    </Modal>
         */}
                
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
        industryList: state.industry.industryList,
        industryItem: state.industry.industryItem,
        message: state.industry.message,
        checkTokenCounter: state.auth.checkTokenCounter,
        domain: state.auth.domain,
        userMenuAccessList: state.auth.userMenuAccessList,

    }
}
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    getIndustry: (data) => dispatch(getIndustry(data)),
    deleteIndustry: (data) => dispatch(deleteIndustry(data)),
    getIndustryItem: (data) => dispatch(getIndustryItem(data)),
    getIndustryFullPath: (data) => dispatch(getIndustryFullPath(data)),
    postIndustry: (data) => dispatch(postIndustry(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    resetProps: () => dispatch(resetProps()),
})
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(WorkField);



