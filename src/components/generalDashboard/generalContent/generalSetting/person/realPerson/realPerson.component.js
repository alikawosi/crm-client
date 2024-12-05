/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import { Drawer, Modal, Table, Avatar, Space, } from 'antd';
import { Button as AntdButton, Input as AntdInput } from 'antd';
import {  SearchOutlined } from '@ant-design/icons';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import NewRealPerson from './newRealPerson.component';
import EditRealPerson from './editRealPerson.component';
import { getPerson, deletePerson, getPersonItem, postPerson, resetProps } from '../../../../../../redux/infrastructure/person/person.action';
import Notification from "../../../../../shared/common/notification/notification.component";
import './realPerson.component.css';
import ExcelImport from '../../../../../shared/common/excelImport/excelImport.component'
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";

/* #endregion */

class RealPerson extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            domainRef: this.props.domain,
            id: 0,
            surname: '',
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
                    width: 100,
                },
                //{ headerName: "Id", field: "id", hide: true },
                { headerName: "کد", field: "code" },
                { headerName: "نام", field: "firstName" },
                { headerName: "نام خانوادگی", field: "surname" },
                { headerName: "نام پدر", field: "fatherName" },
                { headerName: "محل تولد", field: "placeOfBirth" },
                { headerName: "کد ملی", field: "nationalCode" },
                { headerName: "شماره شناسنامه", field: "idNumber" },
                { headerName: "سطح تحصیلات", field: "educationLevelTitle" },
                { headerName: "معرف", field: "introducer" },
                { headerName: "تاریخ تولد", field: "nativeBirthDate" },
                { headerName: "موبایل", field: "mobile" },
                //{ headerName: "عکس", field: "personalImage", hide: true },
                { headerName: "ایمیل", field: "email" },
                //{ headerName: "آواتار", field: "avatar", hide: true },
                { headerName: "تلفن", field: "tel" },
                { headerName: "فکس", field: "fax" },
                { headerName: "کد پستی", field: "postalCode" },
                { headerName: "آدرس", field: "personAddress" },
                { headerName: "توضیحات", field: "descriptionRow" },
            ],
            rowData: [],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
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

    /* #region  [- componentDidMount() -] */
    componentDidMount() {
        this.getPerson();
        this.accessToMenu(this.props.userMenuAccessList);

    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("18")) {
            this.setState({
                isNewHidden: false
            })
        }
        if (data.includes("20")) {
            this.setState({
                isEditHidden: false
            })
        }
        if (data.includes("23")) {
            this.setState({
                isDeleteHidden: false
            })
        }
        if (data.includes("25")) {
            this.setState({
                isPrintHidden: false
            })
        }
        if (data.includes("26")) {
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
        // this.setState({
        //     rowData: this.props.personList
        // })
    }
    /* #endregion */


    /* #region  [- getPerson() -] */
    getPerson = async () => {
        let personGetData = {
            domainRef: parseInt(this.state.domainRef)
        }
        await this.props.getPerson(personGetData);
    }
    /* #endregion */

    /* #region  [- getPersonItem() -] */
    getPersonItem = async () => {
        let personItemGetData = {
            personId: this.state.id
        }
        await this.props.getPersonItem(personItemGetData);
    }
    /* #endregion */

    /* #region  [- deletePerson() -] */
    deletePerson = async () => {
        let personDeleteData = {
            domainRef: this.props.domain,
            personIdList: [
                {
                    id: this.state.id
                }
            ]
        }
        await this.props.deletePerson(personDeleteData);
    }
    /* #endregion */

    /* #region  [- postExcelFile -] */
    postExcelFile = async (excelData) => {
        let personPostData = {
            domainRef: parseInt(this.state.domainRef),
            personList: excelData
        }
        await this.props.postPerson(personPostData);
    }
    /* #endregion */



    /* #region  [ - onGridReady - ] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };
    /* #endregion */

    /* #region  [- onSelectedRow() -] */
    onSelectedRow = () => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);

        const len = selectedData.length;
        if (len === 0) {
            this.setState({
                id: 0,
                surname:'',
                isDeleteButtonDisable: true,
                isEditButtonDisable: true,
            });
        }
        if (len === 1) {
            const picked = Object.keys(selectedData)[0];
            const pickedValue = selectedData[picked];

            if (pickedValue.checkRefFlag === true) {
                this.setState({
                    isDeleteButtonDisable: true,
                    isEditButtonDisable: false,
                    id: pickedValue.id,
                    surname: pickedValue.surname,
                })
            }
            else {
                this.setState({
                    isDeleteButtonDisable: false,
                    isEditButtonDisable: false,
                    id: pickedValue.id,
                    surname: pickedValue.surname,
                })
            }



        }
    }
    /* #endregion */

    /* #region  [- onSelectionChanged(selectedRowKeys) -] */
    onSelectionChanged = (selectedRowKeys) => {
        ////console.log('selectedRowKeys changed: ', selectedRowKeys);
        let selectedId = selectedRowKeys[0];
        let selectedObject = this.props.personList.filter(item => item.id === selectedId);
        this.setState({
            id: selectedObject[0].id,
            surname: selectedObject[0].surname,
        })
        if (selectedObject[0].checkRefFlag === true) {
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
        ////console.log('id', selectedObject);
        this.setState({ selectedRowKeys });
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
            surname: '',
            deleteModalInputValue: '',
            selectedRowKeys: [],
            isDeleteButtonDisable: true,
            isEditButtonDisable: true,
            isModalDeleteButtonDisable: true,
        })
    }
    /* #endregion */

    /* #region  [- getColumnSearchProps(dataIndex) -] */
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <AntdInput
                    ref={node => {
                        this.searchInput = node;
                    }}
                    //placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <AntdButton
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        جستجو
                </AntdButton>
                    <AntdButton onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        پاک کردن
                </AntdButton>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },

    });
    /* #endregion */

    /* #region  [- handleSearch(selectedKeys, confirm, dataIndex) -] */
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    /* #endregion */

    /* #region  [- handleReset(clearFilters) -] */
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    /* #endregion */


    /* #region  [- handleChangeDeleteModalInput(event) -] */
    handleChangeDeleteModalInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        if (event.target.value === this.state.surname) {
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
    toggleNewDrawer = async () => {
        if (this.state.isNewDrawerVisible === true) {
            //this.deselectAllRows();
            this.deselectAllRows();
            this.setState({
                isNewDrawerVisible: false,
                newDrawerContent: <div></div>,
            })
            await this.refresh();
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
            // this.deselectAllRows();
            this.deselectGridRow();
            await this.refresh();
            this.setState({
                isEditDrawerVisible: false,
                editDrawerContent: <div></div>,
            })
        }
        else if (this.state.isEditDrawerVisible === false) {
            this.setState({
                isEditDrawerVisible: true
            })
        }
    }
    /* #endregion */

    /* #region  [- toggleDeleteModal() -] */
    toggleDeleteModal = async () => {

        if (this.state.isDeleteModalVisible === true) {
            //await this.deselectAllRows();
            this.deselectGridRow();
            await this.refresh();
            this.setState({
                isDeleteModalVisible: false,
                id: 0,
                surname: '',
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

    /* #region  [- toggleExcelImportModal() -] */
    toggleExcelImportModal = async () => {

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


    /* #region  [- handleOk() -] */
    handleOk = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.deletePerson();
        await this.toggleDeleteModal();
    }
    /* #endregion */

    /* #region  [- new -] */
    new = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.toggleNewDrawer();
        this.setState({
            newDrawerContent: <NewRealPerson onClose={this.toggleNewDrawer} />
        })
    }
    /* #endregion */

    /* #region  [- edit -] */
    edit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getPersonItem();
        let personSelectedItem = { ...this.props.personItem[0] }
        if (personSelectedItem.id === undefined) {

        }
        else {
            this.toggleEditDrawer();
            this.setState({
                editDrawerContent: <EditRealPerson personId={this.state.id} onClose={this.toggleEditDrawer} />
            })
        }
        this.deselectAllRows()
    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.toggleDeleteModal();
        

    }
    /* #endregion */

    /* #region  [- print -] */
    print = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.togglePrintModal();
    }
    /* #endregion */

    /* #region  [- showImportModal -] */
    showImportModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.toggleExcelImportModal();
    }
    /* #endregion */

    /* #region  [- refresh -] */
    refresh = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getPerson();
        this.deselectGridRow();
    }
    /* #endregion */

    /* #region  [- getDataFromExcelModal -] */
    getDataFromExcelModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.child.send();
        await this.refresh();
        this.toggleExcelImportModal();

    }
    /* #endregion */


    /* #region  [- render() -] */

    render() {

        /* #region  [- const -] */

        /* #region  [- grid -] */
        const columns = [
            {
                title: 'عکس',
                dataIndex: 'personalImage',
                key: 'id',
                width: 80,
                render: (data) => {
                    if (data === "" || data === null) {
                        return <Avatar>U</Avatar>
                    } else {
                        return <Avatar src={"data:image/png;base64," + data} />
                    }
                }
            },
            {
                title: 'کد',
                dataIndex: 'code',
                key: 'id',
                width: 150,
                ...this.getColumnSearchProps('code'),
            },
            {
                title: 'نام',
                dataIndex: 'firstName',
                key: 'id',
                width: 150,
            },
            {
                title: 'نام خانوادگی',
                dataIndex: 'surname',
                key: 'id',
                width: 150,
                ...this.getColumnSearchProps('surname'),
            },
            {
                title: " وضعیت کاربری",
                dataIndex: "",
                key: "",
                width: 150,
            },
            {
                title: " سطح ",
                dataIndex: "",
                key: "",
                width: 150,
            },
            {
                title: 'نام پدر',
                dataIndex: 'fatherName',
                key: 'id',
                width: 150,
            },
            {
                title: 'محل تولد',
                dataIndex: 'placeOfBirth',
                key: 'id',
                width: 150,
            },
            {
                title: 'کد ملی',
                dataIndex: 'nationalCode',
                key: 'id',
                width: 150,
                ...this.getColumnSearchProps('nationalCode'),
            },
            {
                title: 'شماره شناسنامه',
                dataIndex: 'idNumber',
                key: 'id',
                width: 150,
            },
            {
                title: 'سطح تحصیلات',
                dataIndex: 'educationLevelTitle',
                key: 'id',
                width: 150,
            },
            {
                title: 'معرف',
                dataIndex: 'introducer',
                key: 'id',
                width: 150,
            },
            {
                title: 'تاریخ تولد',
                dataIndex: 'nativeBirthDate',
                key: 'id',
                width: 150,
            },
            {
                title: 'موبایل',
                dataIndex: 'mobile',
                key: 'id',
                width: 150,
            },
            {
                title: 'ایمیل',
                dataIndex: 'email',
                key: 'id',
                width: 150,
            },
            {
                title: 'تلفن',
                dataIndex: 'tel',
                key: 'id',
                width: 150,
            },
            {
                title: 'فکس',
                dataIndex: 'fax',
                key: 'id',
                width: 150,
            },
            {
                title: 'کد پستی',
                dataIndex: 'postalCode',
                key: 'id',
                width: 150,
            },
            {
                title: 'آدرس',
                dataIndex: 'personAddress',
                key: 'id',
                width: 250,
            },
            {
                title: 'توضیحات',
                dataIndex: 'descriptionRow',
                key: 'id',
                width: 250,
            },
        ]
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectionChanged,
            type: 'radio'
        };

        /* #endregion */

        /* #region  [- dropdownMenu -] */
        // const menu = (
        //     <Menu>
        //         <Menu.Item>
        //             <ExcelExport rowData={this.state.rowData} excelColumnDef={columns} title='person' />
        //         </Menu.Item>
        //         <Menu.Item onClick={this.toggleExcelImportModal} disabled={true} >
        //             بارگذاری فایل اکسل
        //         </Menu.Item>
        //     </Menu>
        // );
        /* #endregion */


        /* #endregion */

        return (
            <Container fluid>
                <Row title='header' className='mt-2'>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '25px' }}>شخص حقیقی</span>
                    </Col>
                </Row>
                
                <hr />
                
                <Row title='buttons'>
                    <Col sm='6' style={{ textAlign: 'right' }}>
                        <Button hidden={this.state.isNewHidden} className='submit-button-style mr-2' onClick={this.new}>
                            جدید
                        </Button>
                        <Button hidden={this.state.isEditHidden} className='submit-button-style mr-2' onClick={this.edit} disabled={this.state.isEditButtonDisable}>
                            ویرایش
                        </Button>
                        <Button hidden={this.state.isDeleteHidden} className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteButtonDisable}>
                            حذف
                        </Button>
                        <Button hidden={this.state.isRefreshHidden} className='submit-button-style mr-2' onClick={this.refresh}>
                            بازیابی
                        </Button>
                    </Col>
                    <Col sm='6' style={{ textAlign: 'left' }}>
                        {/* <Dropdown hidden={this.state.isExcelHidden} className='submit-button-style mr-2' overlay={menu}>
                            <Button>ارسال / دریافت ... <DownOutlined /> </Button>
                        </Dropdown>
                        <Button hidden={this.state.isPrintHidden} className='submit-button-style mr-2' onClick={this.print}>
                            چاپ
                        </Button> */}
                    </Col>
                </Row>
                
                <Row title='grid' className='mt-2'>
                    <Col hidden={false} className="ag-theme-balham" style={{ height: '75vh', width: '100%', direction: 'rtl', textAlign: 'right' }}>
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            //rowData={this.state.rowData}
                            rowData={this.props.personList}
                            overlayLoadingTemplate={this.state.overlayLoadingTemplate}
                            overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
                            enableRtl={true}
                            defaultColDef={this.state.defaultColDef}
                            onGridReady={this.onGridReady}
                            rowSelection="single"
                            onSelectionChanged={this.onSelectedRow}
                            localeText={AG_GRID_LOCALE_FA}
                           
                        >
                        </AgGridReact>
                    </Col>
                    <Col hidden={true} className="ag-theme-balham" style={{ height: '75vh', width: '100%', direction: 'rtl', textAlign: 'right', overflowY: 'scroll' }}>
                        <Table rowKey="id" rowSelection={rowSelection} dataSource={this.state.rowData} columns={columns} scroll={{ x: 1000, y: '55vh' }} bordered pagination={false} />
                    </Col>
                </Row>
                
                <Row title='drawersAndModals'>
                    {/* New Drawer */}
                    <Drawer
                        placement={"left"}
                        width={1000}
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
                        width={1000}
                        bodyStyle={{ padding: '0px' }}
                        closable={false}
                        //onClose={this.toggleEditDrawer}
                        visible={this.state.isEditDrawerVisible}
                    >
                        {this.state.editDrawerContent}
                    </Drawer>
                    {/* Delete Modal */}
                    <Modal
                        visible={this.state.isDeleteModalVisible}
                        //title="حذف"
                        bodyStyle={{ padding: '0px' }}
                        closable={false}
                        onOk={this.handleOk}
                        onCancel={this.onClose}
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
                                    <p>برای تایید  <strong>{`"${this.state.surname}"`}</strong> را وارد کنید.</p>
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
                        //onOk={this.togglePrintModal}
                        //onCancel={this.handleCancel}
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
                    <Modal visible={this.state.isExcelImportModalVisible} bodyStyle={{ padding: '0px' }} onOk={this.toggleExcelImportModal} onCancel={this.toggleExcelImportModal}
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
                                    <ExcelImport title='person' sendExcelFileList={this.postExcelFile} columnsDef={columns} onRef={ref => (this.child = ref)} />
                                </Col>
                            </Row>
                        </Container>
                    </Modal>

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
        personList: state.person.personList,
        personItem: state.person.personItem,
        message: state.person.message,
        domain: state.auth.domain,
        checkTokenCounter: state.auth.checkTokenCounter,
        userMenuAccessList: state.auth.userMenuAccessList,

    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    getPerson: (data) => dispatch(getPerson(data)),
    deletePerson: (data) => dispatch(deletePerson(data)),
    getPersonItem: (data) => dispatch(getPersonItem(data)),
    postPerson: (data) => dispatch(postPerson(data)),
    resetProps: () => dispatch(resetProps()),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(RealPerson);