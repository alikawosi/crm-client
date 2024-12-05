/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { Container, Col, Row, Button, Form, FormGroup, Input } from 'reactstrap';
import { Drawer, Modal, } from 'antd';
import { connect } from 'react-redux';
import Notification from '../../../../../shared/common/notification/notification.component';
import ExcelImport from '../../../../../shared/common/excelImport/excelImport.component'
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
import { resetProps, getAccountType, deleteAccountType, postAccountType, getAccountTypeItem } from '../../../../../../redux/sales/accountType/accountType.action'
import NewAccountType from './newAccountType.component'
import EditAccountType from './editAccountType.component'
/* #endregion */

class AccountType extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            //#region [- componentFields -]
            newDrawerContent: <div></div>,
            editDrawerContent: <div></div>,
            //#endregion 

            //#region [- dbFields -]
            title: '',
            deleteModalInputValue: '',
            //#endregion

            //#region [* flags *]

            /* #region  [- visible -] */
            isDeleteModalVisible: false,
            isNewDrawerVisible: false,
            isEditDrawerVisible: false,
            isPrintModalVisible: false,
            isExcelImportModalVisible: false,
            /* #endregion */

            /* #region  [- disabled -] */
            isDeleteDisabled: true,
            isEditDisabled: true,
            isModalDeleteButtonDisabled: true,
            /* #endregion */

             /* #region  [- hidden -] */
             isNewButtonHidden: true,
             isEditButtonHidden: true,
             isDeleteButtonHidden: true,
             isRefreshButtonHidden: true,
             isExcelButtonHidden: true,
             isPrintButtonHidden: true,
 
             /* #endregion */
             
            //#endregion

            //#region [- lists -]
            rowData: [],
            //#endregion

            /* #region  [- agGrid -] */
            columnDefs: [
                { headerName: 'ردیف', checkboxSelection: true, valueGetter: 'node.rowIndex+1', cellClass: 'locked-col', width: 70 },
                { headerName: 'عنوان', field: 'title',},
                { headerName: 'توضیحات', field: 'descriptionRow' }
            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
           isRowSelectable: function (rowNode) { return rowNode.data.id===1 ||  rowNode.data.id===2? false : true },
        
            /* #endregion */

            /* #region  [- antdGrid -] */
         
            /* #endregion */

        }

    }
    /* #endregion */

    //#region [*** methods ***]

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {
        this.getAccountType()
        this.accessToMenu(this.props.userMenuAccessList);

    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("224")) {
            this.setState({
                isNewButtonHidden: false
            })
        }
        if (data.includes("229")) {
            this.setState({
                isEditButtonHidden: false
            })
        }
        if (data.includes("227")) {
            this.setState({
                isDeleteButtonHidden: false
            })
        }
        if (data.includes("222")) {
            this.setState({
                isRefreshButtonHidden: false
            })
        }
        if (data.includes("453")) {
            this.setState({
                isPrintButtonHidden: false
            })
        }
        if (data.includes("454")) {
            this.setState({
                isExcelButtonHidden: false
            })
        }
    }
    /* #endregion */

    /* #region  [- componentDidUpdate(prevProps) -] */
    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            if (this.props.message === 'ذخیره با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
                this.props.resetProps();
            } else if (this.props.message === 'ویرایش با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
                this.props.resetProps();
            } else if (this.props.message === 'حذف با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
                this.props.resetProps();
            } else if (this.props.message === 'Successfully Set.') {
                Notification('bottomLeft', this.props.message, 'success');
                this.props.resetProps();
            } else if (this.props.message === 'پیدا نشد.') {
                Notification('bottomLeft', this.props.message, 'error');
                this.props.resetProps();
            } else if (this.props.message === 'خطایی رخ داده است.') {
                Notification('bottomLeft', this.props.message, 'error');
                this.props.resetProps();
            }
        }
        this.setState({
            rowData: this.props.accountTypeList
        })
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

    /* #region  [- reset -] */
    reset = () => {
        this.setState({
            title: '',
            deleteModalInputValue: '',
            selectedRowKeys: [],
            isDeleteDisabled: true,
            isEditDisabled: true,
            isModalDeleteButtonDisabled: true,
        });
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** Handle Changes ***] */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = async () => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        const len = selectedData.length;

        if (len === 0) {
            this.setState({
                id: 0,
                title:'',
                isDeleteDisabled: true,
                isEditDisabled: true,
            });
        }
        if (len === 1) {
            const picked = Object.keys(selectedData)[0];
            const pickedValue = selectedData[picked];

            if (pickedValue.checkRefFlag === true) {
                this.setState({
                    isDeleteDisabled: true,
                    isEditDisabled: false,
                    id: pickedValue.id,
                    title: pickedValue.title
                });
            } else {
                this.setState({
                    isDeleteDisabled: false,
                    isEditDisabled: false,
                    id: pickedValue.id,
                    title: pickedValue.title
                });
            }
        }
    }
    /* #endregion */

    /* #region  [- handleChangeDeleteModalInput -] */
    handleChangeDeleteModalInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        if (event.target.value === this.state.title) {
            this.setState({
                isModalDeleteButtonDisabled: false
            })
        } else {
            this.setState({
                isModalDeleteButtonDisabled: true
            });
        }
    }
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
            searchText: '',
        });
    };
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getAccountType -] */
    getAccountType = async () => {
        let accountTypeData = {
            domainRef: this.props.domain
        }
        await this.props.getAccountType(JSON.stringify(accountTypeData));
    }
    /* #endregion */

    /* #region  [- getAccountTypeItem -] */
    getAccountTypeItem = async () => {
        let accountTypeItemData = {
            id: this.state.id
        }
        await this.props.getAccountTypeItem(JSON.stringify(accountTypeItemData));
    }
    /* #endregion */

    /* #region  [- deleteAccountType -] */
    deleteAccountType = async () => {
        let accountTypeDeleteData = {
            domainRef: this.props.domain,
            accountTypeIdList: [{
                id: this.state.id
            }]
        }
        await this.props.deleteAccountType(JSON.stringify(accountTypeDeleteData));
    }
    /* #endregion */

    /* #region  [- postExcelFile -] */
    postExcelFile = async (excelData) => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        let accountTypePostData = {
            domainRef: this.props.domain,
            accountTypeList: excelData
        }
        await this.props.postAccountType(JSON.stringify(accountTypePostData));
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- new -] */
    new = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isNewDrawerVisible: true,
            newDrawerContent: <NewAccountType onClose={this.onCloseNewDrawer} />
        });
    }
    /* #endregion */

    /* #region  [- edit -] */
    edit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getAccountTypeItem();
        this.setState({
            isEditDrawerVisible: true,
            editDrawerContent: <EditAccountType onClose={this.onCloseEditDrawer} />
        });

    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isDeleteModalVisible: true
        });
    }
    /* #endregion */

    /* #region  [- deleteInModal -] */
    deleteInModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.deleteAccountType();
        await this.onCloseDeleteModal();
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

    /* #region  [- import -] */
    import = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isExcelImportModalVisible: true
        })
    }
    /* #endregion */

    /* #region  [- refresh -] */
    refresh = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getAccountType();
        this.reset();
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

    /* #region  [- onCloseNewDrawer -] */
    onCloseNewDrawer = () => {
        this.deselectAllRows();
        this.reset();
        this.setState({
            isNewDrawerVisible: false,
            newDrawerContent: <div></div>
        })
    }
    /* #endregion */

    /* #region  [- onCloseEditDrawer -] */
    onCloseEditDrawer = async () => {
        this.deselectAllRows();
        this.reset();
        this.setState({
            isEditDrawerVisible: false,
            editDrawerContent: <div></div>
        });
    }
    /* #endregion */

    /* #region  [- onCloseDeleteModal -] */
    onCloseDeleteModal = async () => {
        this.deselectAllRows();
        this.reset();
        this.setState({
            isDeleteModalVisible: false,
            id: 0,
            title: '',
            deleteModalInputValue: '',
        });
    }
    /* #endregion */

    /* #region  [- onCloseImportModal() -] */
    onCloseImportModal = () => {
        this.setState({
            isExcelImportModalVisible: false,
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

    /* #endregion */

    /* #region  [- render -] */
    render() {

        /* #region  [- const -] */

        const localText = AG_GRID_LOCALE_FA;

        /* #endregion */

        return (
            <Container fluid className='reacstrap-container' style={{ padding: '0' }} >

                        <Row name='row_01_Header' className='content-header-row' style={{ margin: '0 0 1% 0', padding: '0' }}>

                            <Col className='content-header-col'>
                                <p className='content-header-title'>انواع طرف حساب</p>
                            </Col>

                        </Row>

                        <Row name='row_02_Buttons' className='content-button-row' style={{ margin: '0', padding: '0' }}>

                            <Col sm='12' md='12' lg='12' className='content-button-right-col'>

                                <Button name='new'
                                    hidden={this.state.isNewButtonHidden} className='submit-button-style'
                                    onClick={this.new}
                                >
                                    جدید
                        </Button>

                                <Button name='edit'
                                    hidden={this.state.isEditButtonHidden} className='submit-button-style mr-2'
                                    disabled={this.state.isEditDisabled}
                                    onClick={this.edit}
                                >
                                    ویرایش
                        </Button>

                                <Button name='delete'
                                    hidden={this.state.isDeleteButtonHidden} className='submit-button-style mr-2'
                                    disabled={this.state.isDeleteDisabled}
                                    onClick={this.delete}
                                >
                                    حذف
                        </Button>

                                <Button name='refresh'
                                    hidden={this.state.isRefreshButtonHidden} className='submit-button-style mr-2'
                                    onClick={this.refresh}
                                >
                                    بازیابی
                        </Button>

                            </Col>


                        </Row>

                        <Row name='row_03_Grid' className='grid' style={{ margin: '0', padding: '0' }}>
                          
                            <Col key='agGrid' className='ag-theme-alpine' style={{ height: '60vh', width: '100%' }}>
                                <AgGridReact
                              onGridReady={this.onGridReady}
                              columnDefs={this.state.columnDefs}
                              rowData={this.props.accountTypeList}
                              enableRtl={true}
                              rowSelection='single'
                              onSelectionChanged={this.onSelectionChanged}
                              localeText={localText}
                              isRowSelectable={this.state.isRowSelectable}
                              defaultColDef={this.state.defaultColDef}
                                >
                                </AgGridReact>
                            </Col>
                           

                        </Row>

                        <Row name='row_04_DrawersAndModals'>

                            <Drawer name='new'
                                placement={'left'}
                                width={500}
                                bodyStyle={{ padding: '0px' }}
                                closable={true}
                                maskClosable={false}
                                onClose={this.onCloseNewDrawer}
                                visible={this.state.isNewDrawerVisible}
                            >
                                {this.state.newDrawerContent}
                            </Drawer>

                            <Drawer name='edit'
                                placement={'left'}
                                width={500}
                                bodyStyle={{ padding: '0px' }}
                                closable={true}
                                maskClosable={false}
                                onClose={this.onCloseEditDrawer}
                                visible={this.state.isEditDrawerVisible}
                            >
                                {this.state.editDrawerContent}
                            </Drawer>

                            <Modal name='delete'
                                visible={this.state.isDeleteModalVisible}
                                bodyStyle={{ padding: '0px' }}
                                closable={true}
                                maskClosable={false}
                                onCancel={this.onCloseDeleteModal}
                                footer={[
                                    <Button key='1' className='cancel-button-style' onClick={this.onCloseDeleteModal}>
                                        لغو
                            </Button>,
                                    <Button key='2' className='submit-button-style'
                                        disabled={this.state.isModalDeleteButtonDisabled} onClick={this.deleteInModal}>
                                        حذف
                            </Button>
                                ]}
                            >

                                <Container fluid>
                                    <Row name='header' className='modal-header-row mb-2'>
                                        <Col className='modal-header-col'>
                                            <p className='modal-header-title'>حذف</p>
                                        </Col>
                                    </Row>

                                    <Row name='content'>
                                        <Col sm='12' className='modal-content-col'>
                                            <p>
                                                آیا از حذف این رکورد اطمینان دارید ؟
                                    </p>
                                            <p>برای تایید  <strong>{`'${this.state.title}'`}</strong> را وارد کنید.</p>
                                            <Row>
                                                <Col sm='8'>
                                                    <Form>
                                                        <FormGroup name='enteredTitle'>
                                                            <Input
                                                                type='text'
                                                                id='deleteModalInputValue'
                                                                name='deleteModalInputValue'
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

                            <Modal name='print' visible={this.state.isPrintModalVisible}
                                bodyStyle={{ padding: '0px' }}
                                onOk={this.onClosePrintModal}
                                closable={true}
                                maskClosable={false}
                                onCancel={this.onClosePrintModal}
                                footer={[
                                    <Button key='1' className='submit-button-style' onClick={this.onClosePrintModal}>
                                        تایید
                        </Button>
                                ]}
                            >
                                <Container fluid>
                                    <Row name='header' className='modal-header-row mb-2'>
                                        <Col className='modal-header-col'>
                                            <p className='modal-header-title'>چاپ</p>
                                        </Col>
                                    </Row>
                                    <Row name='content'>
                                        <Col sm='12' className='modal-content-col'>
                                            <h3>این عملکرد اکنون در دسترس نیست !</h3>
                                        </Col>
                                    </Row>
                                </Container>
                            </Modal>

                            <Modal name='import' visible={this.state.isExcelImportModalVisible}
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
                                            <ExcelImport name='accountType' sendExcelFileList={this.postExcelFile} columnsDef={this.state.columns} onRef={ref => (this.child = ref)} />
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
        checkTokenCounter: state.auth.checkTokenCounter,
        domain: state.auth.domain,
        message: state.accountType.message,
        accountTypeList: state.accountType.accountTypeList,
        userMenuAccessList: state.auth.userMenuAccessList,

    }
}
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    resetProps: () => dispatch(resetProps()),
    getAccountType: (data) => dispatch(getAccountType(data)),
    deleteAccountType: (data) => dispatch(deleteAccountType(data)),
    postAccountType: (data) => dispatch(postAccountType(data)),
    getAccountTypeItem: (data) => dispatch(getAccountTypeItem(data)),
})
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(AccountType);




