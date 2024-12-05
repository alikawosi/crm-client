/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
import { Modal } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import GridSeenButton from '../operation/gridSeenButton.component'
import Seen from '../operation/seen/seen.component'
import Print from '../operation/print/print.component'
import GridPrintButton from '../operation/gridPrintButton.component'
import { getSeenOrderItem, getPrintOrderItem, getOrder, } from '../../../../../../redux/sales/order/order/order.action'
import TimelineCellRenderer from './timelineCellRenderer.component'
import { saveIsDeleteButonDisabled, saveTimelineIdList, deleteTimeline, } from '../../../../../../redux/sales/order/timeline/timeline.action'
/* #endregion */


class Timeline extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isNewDisabled: true,
            isDeleteDisabled: true,
            isRegisterTaskDisabled: true,
            isRegisterAsTemplateDisabled: true,
            isNewTimelineChecked: true,
            isNewModalVisible: false,
            isNewModalDestroy: true,
            isSeenModalVisible: false,
            isSeenModalDestroy: true,
            isPrintModalVisible: false,
            isPrintModalDestroy: true,

            isDeleteModalVisible: false,

            isNewHidden:true,
isDeleteHidden:true,
            /* #endregion */

            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    cellRenderer: "agGroupCellRenderer",
                    headerName: 'ردیف',
                    headerCheckboxSelection: false,
                    checkboxSelection: true,
                    cellClass: 'locked-col',
                    colId: "row",
                    valueGetter: "node.rowIndex+1",
                },
                { headerName: 'کد', field: "code", valueGetter: this.codeValueGetter, },
                { headerName: 'کد مرجع', field: "referenceCode", valueGetter: this.referenceCodeValueGetter },
                { headerName: 'تاریخ سفارش', field: "nativeDateOrder", },
               // { headerName: ' پرینت', field: "print", cellRenderer: "gridPrintButton" },
                { headerName: 'خریدار', field: "buyer" },
                { headerName: 'فروشنده', field: "seller" },
                { headerName: 'مبلغ کل سفارش', field: "orderPrice", valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ کل اضافات', field: "orderAdditions", valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ کل کسورات', field: "orderDeductions", valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ قابل پرداخت', field: "orderPayablePrice", valueFormatter: this.currencyFormatter, },
               // { headerName: 'جزئیات', field: "seen", cellRenderer: "gridSeenButton", width: 200 },
               { headerName: "تاریخ ثبت", field: "nativeDateCreated" },
               { headerName: "latinDateCreated", field: "latinDateCreated",sort:'desc' ,hide:true},
                { headerName: 'شماره سریال', field: "serialNumber" },
                { headerName: 'توضیحات', field: "descriptionRow" },
            ],
            gridOptions: {
                //detailRowHeight: 510,
                detailCellRenderer: 'timelineCellRenderer',
                context: { componentParent: this },
                frameworkComponents: {
                    gridSeenButton: GridSeenButton,
                    gridPrintButton: GridPrintButton,
                    timelineCellRenderer: TimelineCellRenderer
                },
                detailRowAutoHeight: true,
            },
            overlayLoadingTemplate:
                '<span class="ag-overlay-loading-center">در حال بارگذاری ...</span>',
            overlayNoRowsTemplate:
                '<span style="padding: 10px; border: 2px solid #444;">رکوردی برای نمایش وجود ندارد</span>',
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },

            /* #endregion */

            /* #region  [- list -] */


            /* #endregion */

            /* #region  [- componentFields -]  */
            modalComponent: <div></div>,
            orderRef: '',
            /* #endregion */



        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    
  /* #region  [- componentDidMount -] */
  async componentDidMount() {
    await this.accessToMenu(this.props.userMenuAccessList);

  }
  /* #endregion */

    /* #region  [- componentDidUpdate -] */
    componentDidUpdate(prevProps) {
        if (this.props.isDeleteButtonDisabled !== prevProps.isDeleteButtonDisabled) {
            this.setDeleteButtonValue();
        }
        if(this.props.timelineCellRendererRowId!==prevProps.timelineCellRendererRowId && this.props.timelineCellRendererRowId!==''){
            this.gridApi.forEachNode(node =>{
                if(this.props.timelineCellRendererRowId!==node.data.id){
                 node.setExpanded(false)    
                }
               
            } )
        }
    }
    /* #endregion */

        /* #region  [- accessToMenu -] */
        accessToMenu = (data) => {
            if (data.includes("590")) {
              this.setState({
                isNewHidden: false,
              });
            }
            if (data.includes("591")) {
                this.setState({
                    isDeleteHidden: false,
                });
              }
            }
          /* #endregion */

    /* #region  [ - onGridReady - ] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };
    /* #endregion */

    /* #region  [- currencyFormatter -] */
    currencyFormatter = (params) => {
        let data = params.value === "" || params.value === undefined ? "" : params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return data
    }
    /* #endregion */

    /* #region  [- rowCellRenderer -] */
    rowCellRenderer = params => {
        return (params.node.rowIndex + 1).toLocaleString('fa-IR')
    }
    /* #endregion */

    /* #region  [- codeValueGetter   -] */
    codeValueGetter = params => {

        if (params.data.code.includes('\\')) {
            let patternCode = params.data.code.split('\\')[0]
            let ordinalCode = params.data.code.split('\\')[1]
            return ordinalCode + '\\' + patternCode
        }
        else if (params.data.code.includes('*')) {
            let patternCode = params.data.code.split('*')[0]
            let ordinalCode = params.data.code.split('*')[1]
            return ordinalCode + '*' + patternCode
        }
        else {
            return params.data.code
        }
    }
    /* #endregion */

    /* #region  [- referenceCodeValueGetter  -] */
    referenceCodeValueGetter = params => {

        if (params.data.referenceCode.includes('\\')) {
            let patternCode = params.data.referenceCode.split('\\')[0]
            let ordinalCode = params.data.referenceCode.split('\\')[1]
            return ordinalCode + '\\' + patternCode
        }
        else if (params.data.referenceCode.includes('*')) {
            let patternCode = params.data.referenceCode.split('*')[0]
            let ordinalCode = params.data.referenceCode.split('*')[1]
            return ordinalCode + '*' + patternCode
        }
        else {
            return params.data.referenceCode
        }
    }
    /* #endregion */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = async () => {
     
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        const len = selectedData.length
     

        if (len === 0 || len > 1) {
            this.setState({
                isNewDisabled: true,
                isRegisterTaskDisabled: true,
                isRegisterAsTemplateDisabled: true,
                orderRef: '',
            })
        }
        if (len === 1) {
            let list = []
            this.props.saveIsDeleteButonDisabled(true)
            this.props.saveTimelineIdList(list)
            this.gridApi.forEachNode(node => node.setExpanded(false))
            this.setState({
                isNewDisabled: false,
                isRegisterTaskDisabled: true,
                isRegisterAsTemplateDisabled: true,
                orderRef: selectedData[0].id
            })
     
}
    }

    /* #endregion */

    /* #region  [- showDetails -] */
    showDetails = async (data) => {
        await this.getSeenOrderItem(data);
        this.setState({
            isSeenModalVisible: true,
            isSeenModalDestroy: false,
            seenModalComponent: <Seen />
        })
    }
    /* #endregion */

    /* #region  [- print -] */
    print = async (data) => {
        await this.getPrintOrderItem(data);
        this.setState({
            isPrintModalVisible: true,
            isPrintModalDestroy: false,
            modalComponent: <Print />,

        })

    }
    /* #endregion */

    /* #region  [- setDeleteButtonValue -] */
    setDeleteButtonValue = async () => {
        if (this.props.isDeleteButtonDisabled === false) {
            this.setState({
                isNewDisabled: true,
                isRegisterTaskDisabled: true,
                isRegisterAsTemplateDisabled: true,
                orderRef: '',
                isDeleteDisabled: this.props.isDeleteButtonDisabled,
               
            })
            this.gridApi.deselectAll()
        }
        else {
            this.setState({
                isDeleteDisabled: this.props.isDeleteButtonDisabled,
                isMasterAndDetailChecked:false,
            })
        }

    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- new -] */
    new = () => {
        this.setState({
            isNewModalVisible: true,
            isNewModalDestroy: false,
        })
    }
    /* #endregion */

    /* #region  [- cancelNew -] */
    cancelNew = () => {
        this.setState({
            isNewModalVisible: false,
            isNewModalDestroy: true,
        })
    }
    /* #endregion */

    /* #region  [- approve -] */
    approve = async () => {
        if (this.state.isNewTimelineChecked) {
            this.props.newTimeline(this.state.orderRef);
        }
    }
    /* #endregion */

    /* #region  [- onCloseSeenModal -] */
    onCloseSeenModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isSeenModalVisible: false,
            seenModalComponent: <div></div>,
            isSeenModalDestroy: true,
        })

    }
    /* #endregion */

    /* #region  [- onClosePrintModal -] */
    onClosePrintModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isPrintModalVisible: false,
            modalComponent: <div></div>,
            isPrintModalDestroy: true
        })

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

    /* #region  [- onCloseDeleteModal -] */
    onCloseDeleteModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.props.saveIsDeleteButonDisabled(true)
        await this.props.saveTimelineIdList('')
        this.gridApi.setRowData(this.props.orderList);
        this.setState({
            isDeleteModalVisible: false,
        })

    }
    /* #endregion */

    /* #region  [- deleteInModal -] */
    deleteInModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.deleteTimeline();
        await this.onCloseDeleteModal();
        this.gridApi.setRowData(this.props.orderList);
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handelChangeNew-] */
    handelChangeNew = async (event) => {
        if (event.target.id === '1') {
            this.setState({
                isNewTimelineChecked: true,
            })
        }

    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getSeenOrderItem -] */
    getSeenOrderItem = async (data) => {
        let orderItemData = {
            orderHeaderRef: data.id
        }

        await this.props.getSeenOrderItem(JSON.stringify(orderItemData))
    }
    /* #endregion */

    /* #region  [- getPrintOrderItem -] */
    getPrintOrderItem = async (data) => {
        let printGetData = {
            orderHeaderRef: data.id
        }

        await this.props.getPrintOrderItem(JSON.stringify(printGetData))
    }
    /* #endregion */

    /* #region  [- deleteTimeline -] */
    deleteTimeline = async () => {
        let deletePostData = {
            timelineIdList: this.props.timelineIdList
        }

        await this.props.deleteTimeline(JSON.stringify(deletePostData))
    }
    /* #endregion */

    /* #region  [- getOrder -] */
    getOrder = async () => {
        let data = {
            domainRef: this.props.domain
        }
        await this.props.getOrder(JSON.stringify(data))
    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {
        const localText = AG_GRID_LOCALE_FA;
        return (
            <Container fluid style={{ margin: '0', padding: '0' }}>

                <Row name="row_01_Buttons">

                    <Col sm="12" md="12" lg="12" style={{ textAlign: 'right' }}>
                        <Button className='submit-button-style' onClick={this.new} disabled={this.state.isNewDisabled} hidden={this.state.isNewHidden}>جدید</Button>
                        <Button className='submit-button-style mr-2' disabled={this.state.isDeleteDisabled} onClick={this.delete} hidden={this.state.isDeleteHidden}>حذف</Button>
                        <Button className='submit-button-style mr-2' disabled={this.state.isRegisterTaskDisabled}>ثبت وظیفه</Button>
                        <Button className='submit-button-style mr-2' disabled={this.state.isRegisterAsTemplateDisabled}>ثبت به عنوان الگو</Button>
                        <Button className='submit-button-style mr-2' >بازیابی</Button>
                    </Col>

                </Row>

                <Row name="row_02_Grid">

                    <Col sm="12" md="12" lg="12" className="ag-theme-alpine mt-2" style={{ height: '70vh', width: '100%', marginTop: '2%',marginBottom:'5%' }}>
                        <AgGridReact
                            enableRtl={true}
                            rowSelection='single'
                            localeText={localText}
                            masterDetail={true}
                            gridOptions={this.state.gridOptions}
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.props.orderList}
                            onSelectionChanged={this.onSelectionChanged}
                            defaultColDef={this.state.defaultColDef}
                        >
                        </AgGridReact>
                    </Col>

                </Row>

                <Row name="row_03_Modal">

                    <Modal name='delete'
                        visible={this.state.isDeleteModalVisible}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseDeleteModal}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.onCloseDeleteModal}>لغو</Button>,
                            <Button key='2' className='submit-button-style' onClick={this.deleteInModal}>حذف</Button>
                        ]}
                    >

                        <Container fluid>
                            <Row name='header' className='modal-header-row mb-2'>
                                <Col className='modal-header-col'>
                                    <p className='modal-header-title'>حذف</p>
                                </Col>
                            </Row>

                            <Row name='content' style={{ marginBottom: '3%' }}>
                                <Col sm='12' className='modal-content-col'>
                                    <p>
                                        آیا از حذف این رکورد اطمینان دارید ؟
                                    </p>
                                </Col>
                            </Row>
                        </Container>

                    </Modal>

                    <Modal name="newButtonModal"
                        visible={this.state.isNewModalVisible}
                        destroyOnClose={this.state.isNewModalDestroy}
                        bodyStyle={{ padding: '0px' }}
                        onOk={this.onOkNew}
                        onCancel={this.cancelNew}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.cancelNew}>
                                لغو
                            </Button>,
                            <Button key='2' className='submit-button-style' onClick={this.approve}>
                                تایید
                            </Button>,
                        ]}
                    >
                        <Container fluid>
                            <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>پیشینه جدید</span>
                                </Col>
                            </Row>

                            <Row name='row_02_Modal_Content'>
                                <Col sm='12' style={{ textAlign: 'right' }}>
                                    <Form>

                                        <FormGroup >

                                            <Label name="newTimeline" style={{ marginRight: '15%' }} check>

                                                <Input
                                                    type="radio"
                                                    id="1"
                                                    value="newTimeline"
                                                    name="new"
                                                    checked={this.state.isNewTimelineChecked}
                                                    onChange={this.handelChangeNew} />
                                                    پیشینه جدید
                                            </Label>

                                        </FormGroup>
                                        <br />
                                        <FormGroup >

                                            <Label name="useTemplate" style={{ marginRight: '15%' }} check>

                                                <Input
                                                    type="radio"
                                                    id="2"
                                                    value="useTemplate"
                                                    name="new"
                                                    disabled={true}
                                                />{' '} استفاده از الگو</Label>

                                        </FormGroup>

                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </Modal>

                    <Modal name='seen'
                        visible={this.state.isSeenModalVisible}
                        width={1200}
                        destroyOnClose={this.state.isSeenModalDestroy}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseSeenModal}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.onCloseSeenModal}>لغو</Button>
                        ]}
                    >

                        <Container fluid>
                            <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>نمایش سفارش </span>
                                </Col>
                            </Row>
                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' style={{ textAlign: 'right' }}>
                                    {this.state.seenModalComponent}
                                </Col>
                            </Row>
                        </Container>

                    </Modal>

                    <Modal name='print'
                        visible={this.state.isPrintModalVisible}
                        destroyOnClose={this.state.isPrintModalDestroy}
                        width={1200}
                        bodyStyle={{ padding: '0px' }}
                        closable={false}
                        maskClosable={true}
                        onCancel={this.onClosePrintModal}
                        maskStyle={{ backgroundColor: 'white' }}
                        footer={[]}
                    >

                        <Container fluid>

                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' style={{ textAlign: 'right' }} >
                                    {this.state.modalComponent}
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
        orderList: state.orderTimeline.orderList,
        isDeleteButtonDisabled: state.orderTimeline.isDeleteButtonDisabled,
        timelineIdList: state.orderTimeline.timelineIdList,
        timelineCellRendererRowId: state.orderTimeline.timelineCellRendererRowId,
        userMenuAccessList: state.auth.userMenuAccessList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getPrintOrderItem: (data) => dispatch(getPrintOrderItem(data)),
    getSeenOrderItem: (data) => dispatch(getSeenOrderItem(data)),
    saveIsDeleteButonDisabled: (data) => dispatch(saveIsDeleteButonDisabled(data)),
    saveTimelineIdList: (data) => dispatch(saveTimelineIdList(data)),
    deleteTimeline: (data) => dispatch(deleteTimeline(data)),
    getOrder: (data) => dispatch(getOrder(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
