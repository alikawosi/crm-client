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
import { resetProps, getRating, deleteRating, postRating, getRatingItem } from '../../../../../../redux/crm/rating/rating.action';
import NewRating from './newRating.component';
import EditRating from './editRating.component';
/* #endregion */

class Rating extends PureComponent {

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

            //#region [- flags -]

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
                {
                    cellRenderer: this.cellRenderer,
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row", width: 80
                },
                { headerName: 'Id', field: 'id', hide: true },
                { headerName: 'عنوان', field: 'title', },
                { headerName: 'حداکثر بودجه', field: 'budgetAmountMax',},
                { headerName: 'حداقل بودجه', field: 'budgetAmountMin', },
                { headerName: 'توضیحات', field: 'descriptionRow' }
            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            /* #endregion */

            /* #endregion */

        }

    }
    /* #endregion */

    //#region [*** methods ***]

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {
        this.getRating()
        this.accessToMenu(this.props.userMenuAccessList);

    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("308")) {
            this.setState({
                isNewButtonHidden: false
            })
        }
        if (data.includes("312")) {
            this.setState({
                isEditButtonHidden: false
            })
        }
        if (data.includes("310")) {
            this.setState({
                isDeleteButtonHidden: false
            })
        }
        if (data.includes("306")) {
            this.setState({
                isRefreshButtonHidden: false
            })
        }
        if (data.includes("471")) {
            this.setState({
                isPrintButtonHidden: false
            })
        }
        if (data.includes("472")) {
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
            rowData: this.props.ratingList
        })
    }
    /* #endregion */

    /* #region  [- cellRenderer -] */
    cellRenderer = params => {
 
        return (params.node.rowIndex + 1).toLocaleString('fa-IR')
 
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


    /* #region  [- reset -] */
    reset = () => {
        this.setState({
            id: 0,
            title: '',
            deleteModalInputValue: '',
            // selectedRowKeys: [],
            isDeleteDisabled: true,
            isEditDisabled: true,
            isModalDeleteButtonDisabled: true,
        });
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** Handle Changes ***] */

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

    /* #region  [- getRating -] */
    getRating = async () => {
        let ratingData = {
            domainRef: this.props.domain
        }
        await this.props.getRating(JSON.stringify(ratingData));
    }
    /* #endregion */

    /* #region  [- getRatingItem -] */
    getRatingItem = async () => {
        let ratingItemData = {
            id: this.state.id
        }
        await this.props.getRatingItem(JSON.stringify(ratingItemData));
    }
    /* #endregion */

    /* #region  [- deleteRating -] */
    deleteRating = async () => {
        let ratingDeleteData = {
            domainRef: this.props.domain,
            ratingIdList: [{
                id: this.state.id
            }]
        }
        await this.props.deleteRating(JSON.stringify(ratingDeleteData));
    }
    /* #endregion */

    /* #region  [- postExcelFile -] */
    postExcelFile = async (excelData) => {
        let ratingPostData = {
            domainRef: this.props.domain,
            ratingList: excelData
        }
        await this.props.postRating(JSON.stringify(ratingPostData));
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- new -] */
    new = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isNewDrawerVisible: true,
            newDrawerContent: <NewRating onClose={this.onCloseNewDrawer} />
        });
    }
    /* #endregion */

    /* #region  [- edit -] */
    edit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getRatingItem();
        this.setState({
            isEditDrawerVisible: true,
            editDrawerContent: <EditRating onClose={this.onCloseEditDrawer} />
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
        await this.deleteRating();
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
        await this.getRating();
        this.reset()
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

                <Row name='row_02_Header' className='content-header-row' style={{ margin: '0 0 1% 0', padding: '0' }}>

                    <Col className='content-header-col'>
                        <p className='content-header-title'>امتیاز</p>
                    </Col>

                </Row>

                <Row name='row_03_Buttons' className='content-button-row' style={{ margin: '0', padding: '0' }}>

                    <Col sm='6' className='content-button-right-col'>

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

                    <Col sm='6' className='content-button-left-col'>

                        {/* <Dropdown name='import/export' hidden={this.state.isExcelButtonHidden} className='submit-button-style mr-2' overlay={menu}>
                            <Button >ارسال / دریافت ... <DownOutlined /> </Button>
                        </Dropdown>

                        <Button name='print' hidden={this.state.isPrintButtonHidden} className='submit-button-style mr-2' onClick={this.print}>
                            چاپ
                        </Button> */}

                    </Col>
                
                </Row>

                <Row name='row_04_Grid' className='grid' style={{ margin: '0', padding: '0' }}>
                <Col key='agGrid' className='ag-theme-alpine' style={{ height: '60vh', width: '100%' }}>
                                <AgGridReact
                              onGridReady={this.onGridReady}
                              columnDefs={this.state.columnDefs}
                              rowData={this.props.ratingList}
                              enableRtl={true}
                              rowSelection='single'
                              onSelectionChanged={this.onSelectionChanged}
                              localeText={localText}
                              defaultColDef={this.state.defaultColDef}
                                >
                                </AgGridReact>
                            </Col>
                           
                </Row>

                <Row name='row_05_DrawersAndModals'>

                    <Drawer name='new'
                        placement={'left'}
                        width={500}
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isNewDrawerVisible}
                        closable={true}
                        maskClosable={false}
                        onClose={this.onCloseNewDrawer}
                    >
                        {this.state.newDrawerContent}
                    </Drawer>

                    <Drawer name='edit'
                        placement={'left'}
                        width={500}
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isEditDrawerVisible}
                        closable={true}
                        maskClosable={false}
                        onClose={this.onCloseEditDrawer}
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
                        bodyStyle={{ padding: '0px' }} onOk={this.onClosePrintModal} onCancel={this.onClosePrintModal}
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

                    <Modal name='import' visible={this.state.isExcelImportModalVisible} bodyStyle={{ padding: '0px' }} onOk={this.onCloseImportModal} onCancel={this.onCloseImportModal}
                        destroyOnClose={true} closable={false}
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
                                    <ExcelImport name='rating' sendExcelFileList={this.postExcelFile} columnsDef={this.state.columns} onRef={ref => (this.child = ref)} />
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
        message: state.rating.message,
        ratingList: state.rating.ratingList,
        userMenuAccessList: state.auth.userMenuAccessList,

    }
}
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    resetProps: () => dispatch(resetProps()),
    getRating: (data) => dispatch(getRating(data)),
    deleteRating: (data) => dispatch(deleteRating(data)),
    postRating: (data) => dispatch(postRating(data)),
    getRatingItem: (data) => dispatch(getRatingItem(data)),
})
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Rating);




