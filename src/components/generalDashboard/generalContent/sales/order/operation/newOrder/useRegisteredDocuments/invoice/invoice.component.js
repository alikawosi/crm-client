/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Button, Form,FormGroup} from "reactstrap";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { checkTokenExpiration } from '../../../../../../../../../redux/shared/auth/auth.action';
import {Modal} from 'antd'
import dayjs from "dayjs";
/* #endregion */

class Invoice extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isSplitDisabled: true,
            isConvertDisabled: true,
            isMergeDisabled: true,
            isErrorModalVisible: false,
            /* #endregion */

            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    valueGetter: 'node.rowIndex+1',
                    headerName: 'ردیف',
                    headerCheckboxSelection: false,
                    checkboxSelection: true,
                    cellClass: 'locked-col',
                    colId: "row", width: 80
                },
                { headerName: 'کد', field: "code", valueGetter: this.codeValueGetter },
                { headerName: 'تاریخ فاکتور', field: "nativeDateInvoice" },
                { headerName: 'خریدار', field: "buyer" },
                { headerName: 'فروشنده', field: "seller" },
                { headerName: 'تاریخ ثبت', field: "nativeDateCreated" },
                { headerName: 'شماره سریال', field: "serialNumber" },
                { headerName: 'توضیحات', field: "descriptionRow" },

            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            /* #endregion */

            /* #region  [- componentFields] */
            headerRef: '',
            latinDateCreated: '',
            errorMessage: '',
            sellerTitle: '',
            buyerTitle: '',
            mergeHeaderRefList: []
            /* #endregion */
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();

    };
    /* #endregion */

    /* #region  [- codeValueGetter  -] */
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

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- split -] */
    split = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.props.newInvoiceToOrderSplit(this.state.headerRef, this.state.sellerTitle, this.state.buyerTitle, this.state.latinDateCreated);
    }
    /* #endregion */

    /* #region  [- convert -] */
    convert = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.props.newInvoiceToOrderConvert(this.state.headerRef, this.state.latinDateCreated);
    }
    /* #endregion */

    /* #region  [- merge -] */
    merge = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        let latinDateCreated = dayjs(selectedData[0].latinDateCreated).calendar("jalali").locale("fa")
        let dateResult = false

        for (let i = 0; i < Object.keys(selectedData).length; i++) {

            let date = dayjs(selectedData[i].latinDateCreated).calendar("jalali").locale("fa")
            if (date.format('YYYY') !== latinDateCreated.format('YYYY')) {
                dateResult = true;
                break;
            }
            else {
                if (latinDateCreated > date) {
                    latinDateCreated = date
                }
                continue;
            }
        }

        if (dateResult === true) {
            this.setState({
                errorMessage: 'در فرآیند ادغام تاریخ ثبت سندهای انتخاب شده می بایست در یک سال باشند.',
                isErrorModalVisible: true,
            })
        }
        else {
            await this.props.newInvoiceToOrderMerge(this.state.mergeHeaderRefList,latinDateCreated);
        }
    }
    /* #endregion */

    /* #region  [- onCancelErrorModal -] */
    onCancelErrorModal = async() => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isErrorModalVisible: false,
            errorMessage: '',
            latinDateCreated: '',
            isSplitDisabled: true,
            isConvertDisabled: true,
            isMergeDisabled: true,
            headerRef: '',
            sellerTitle: '',
            buyerTitle: '',
            mergeHeaderRefList: []
        })
        this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        const len = selectedData.length

        if (len === 0) {
            this.setState({
                isSplitDisabled: true,
                isConvertDisabled: true,
                isMergeDisabled: true,
                headerRef: '',
                sellerTitle: '',
                buyerTitle: '',
                mergeHeaderRefList: [],
                latinDateCreated: '',
            })
        }
        if (len === 1) {
            this.setState({
                isSplitDisabled: selectedData[0].checkRefFlag,
                isConvertDisabled: selectedData[0].checkRefFlag,
                isMergeDisabled: true,
                headerRef: selectedData[0].id,
                sellerTitle: selectedData[0].seller,
                buyerTitle: selectedData[0].buyer,
                mergeHeaderRefList: [],
                latinDateCreated: dayjs(selectedData[0].latinDateCreated).calendar("jalali").locale("fa"),

            })
        }
        else if (len > 1) {
            let list = []
            let checkRefFlag=false
            selectedData.map(x => {
                if(x.checkRefFlag===true){
                    checkRefFlag=true
                }
                list.push({ headerRef: x.id })
            })
            this.setState({
                isSplitDisabled: true,
                isConvertDisabled: true,
                isMergeDisabled: checkRefFlag,
                headerRef: '',
                latinDateCreated: '',
                mergeHeaderRefList: list,
                sellerTitle: selectedData[0].seller,
                buyerTitle: selectedData[0].buyer,
            })
        }
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** api ***] */



    /* #endregion */


    /* #region  [- render -] */
    render() {

        return (
            <Container fluid style={{ margin: '0', padding: '0' }}>

                <Row name="row_01_Buttons" style={{ marginTop: '3%' }}>

                    <Col sm="6" style={{ textAlign: 'right' }}>

                        <Button key='1' className='submit-button-style' disabled={this.state.isSplitDisabled} onClick={this.split}>تفکیک</Button>
                        <Button key='2' className='submit-button-style mr-2' disabled={this.state.isMergeDisabled} onClick={this.merge} >ادغام</Button>
                        <Button key='3' className='submit-button-style mr-2' disabled={this.state.isConvertDisabled} onClick={this.convert}>تبدیل</Button>

                    </Col>

                    <Col sm="6"></Col>

                </Row>

                <Row name='row_02_GridTitle' style={{ marginTop: '2%' }}>
                    <Col sm='4'>
                        <span style={{ fontSize: '15px', fontWeight: '500' }}>لیست فاکتور های ثبت شده</span>
                    </Col>
                    <Col sm="8"></Col>
                </Row>

                <Row name="row_03_Grid" style={{ marginTop: '3%', marginBottom: '1%' }}>

                    <Col className="ag-theme-alpine mt-2" style={{ height: '50vh', width: '100%', marginTop: '2%' }}>
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.props.invoiceListByAccount}
                            enableRtl={true}
                            rowSelection='multiple'
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.defaultColDef}
                        >
                        </AgGridReact>
                    </Col>

                </Row>

                <Row name="row_04_Modals">

                    <Modal name="show error"
                        closable={true}
                        maskClosable={false}
                        width='500px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isErrorModalVisible}
                        onCancel={this.onCancelErrorModal}
                        cancelButtonProps={{ style: { display: 'none' } }}
                        okButtonProps={{ style: { display: 'none' } }}
                        footer={[
                            <Button key='1' className='submit-button-style' onClick={this.onCancelErrorModal}>متوجه شدم</Button>,
                        ]}
                    >
                        <Container fluid>
                            <Row name='row_01_Modal_Content'>
                                <Col sm='12' className='modal-content-col'>

                                    <Form name='message' style={{ padding: '4% 1% 4% 0' }}>

                                        <FormGroup name='message' style={{ textAlign: 'right', marginTop: '10%' }}>

                                            <h5>{this.state.errorMessage}</h5>

                                        </FormGroup>

                                    </Form>

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
        domain: state.auth.domain,
        invoiceListByAccount: state.order.invoiceListByAccount,
        checkTokenCounter: state.auth.checkTokenCounter,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);