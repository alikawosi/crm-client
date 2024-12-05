/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { checkTokenExpiration } from '../../../../../../../../../../redux/shared/auth/auth.action';
import { postOrderToInvoiceConvert, getInvoiceInventory } from '../../../../../../../../../../redux/sales/invoice/invoice/invoice.action'
import { ConfigProvider } from "antd";
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import "antd/dist/antd.css";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import CustomPinnedRowRenderer from '../../../../../../../../../shared/common/pinnedRow/customPinnedRow.component'
import GridQuantityButton from './gridQuantityButton.component'
import ProductQuantity from './productQuantity.component'
import { Modal } from 'antd'
/* #endregion */
class Convert extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            /* #endregion */

            /* #region  [- flags -] */
            isProductQuantityVisible: false,
            isProductQuantityDestroy: true,
            /* #endregion */

            /* #region  [- dbField -] */
            patternCode: this.props.latinDateCreated.format('YYYY'),
            dateInvoice: this.props.latinDateCreated,
            descriptionRow: '',
            /* #endregion */

            /* #region  [- ag-Grid -] */

            columnDefs: [
                {
                    cellRenderer: this.rowCellRenderer,
                    pinnedRowCellRenderer: 'customPinnedRowRenderer',
                    field: 'rowField',
                    headerName: 'ردیف',
                    headerCheckboxSelection: false,
                    checkboxSelection: false,
                    cellClass: 'locked-col',
                    width: 80,
                },
                { headerName: 'کد کالا', field: "code", pinnedRowCellRenderer: 'customPinnedRowRenderer',width: 80 ,  },
                { headerName: 'نام کالا', field: "title", pinnedRowCellRenderer: 'customPinnedRowRenderer', width: 80 , },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle", pinnedRowCellRenderer: 'customPinnedRowRenderer',  },
                { headerName: 'تامین کننده', field: "supplyChainTitle", },
                { headerName: 'نام گروه کالا', field: "productCategoryTitle", },
                { headerName: 'مبلغ پیش فرض', field: "unitPrice", pinnedRowCellRenderer: 'customPinnedRowRenderer',width: 80 , valueFormatter: this.currencyFormatter, },
                {
                    headerName: 'تعداد', field: "quantity", cellRenderer: 'gridQuantityButton', pinnedRowCellRenderer: 'customPinnedRowRenderer',
                },
                { headerName: 'مبلغ', field: "price", pinnedRowCellRenderer: 'customPinnedRowRenderer',width: 80 ,valueFormatter: this.currencyFormatter, },
                { headerName: 'اضافات', field: "orderAdditions", pinnedRowCellRenderer: 'customPinnedRowRenderer',valueFormatter: this.currencyFormatter, },
                { headerName: 'کسورات', field: "orderDeductions", pinnedRowCellRenderer: 'customPinnedRowRenderer',valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ نهایی', field: "finalPrice", pinnedRowCellRenderer: 'customPinnedRowRenderer', valueFormatter: this.currencyFormatter,},
                { headerName: 'توضیحات', field: "descriptionRow", pinnedRowCellRenderer: 'customPinnedRowRenderer', }

            ],
            gridOptions: {
                pinnedBottomRowData: '',
                context: { componentParent: this },
                frameworkComponents: {
                    gridQuantityButton: GridQuantityButton,
                    customPinnedRowRenderer: CustomPinnedRowRenderer
                },
                getRowHeight: params => {
                    return params.node.rowPinned === 'bottom' ? 40 : 58
                },
                getRowStyle: params => {
                    return params.node.rowPinned === 'bottom' ? { padding: '0', fontSize: '12px !important' } : { padding: '2px', fontSize: '12px !important' }
                },


            },

            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
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
        this.onPinnedRowBottomCount();
    };
    /* #endregion */

    /* #region  [- rowCellRenderer -] */
    rowCellRenderer = params => {
        return (params.node.rowIndex + 1).toLocaleString('fa-IR')
    }
    /* #endregion */

     /* #region  [- currencyFormatter -] */
     currencyFormatter = (params) => {
        let data = params.value === "" || params.value === undefined ? "" : params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            return data
        }
        /* #endregion */

    /* #region  [- onPinnedRowBottomCount -] */
    onPinnedRowBottomCount = () => {
        var rows = this.createData();
        this.state.gridOptions.api.setPinnedBottomRowData(rows);
    }
    /* #endregion */

    /* #region  [- createData -] */
    createData = () => {
        var result = [];
        if (Object.keys(this.props.orderProductList).length > 0) {
            let unitPrice = 0
            let quantity = 0
            let price = 0
            let orderAdditions = 0
            let orderDeductions = 0
            let finalPrice = 0
            this.props.orderProductList.map(x => {
                unitPrice = unitPrice + x.unitPrice
                quantity = quantity + x.quantity
                price = price + (x.quantity * x.unitPrice)
                finalPrice = finalPrice + x.finalPrice
                orderAdditions = orderAdditions + x.orderAdditions
                orderDeductions = orderDeductions + x.orderDeductions
            })

            result.push({
                rowField: '---',
                code: '---',
                title: '---',
                scaleTitle: '---',
                supplyChainTitle: '---',
                productCategoryTitle: '---',
                unitPrice: unitPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                quantity: quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                price: price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                orderAdditions: orderAdditions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                orderDeductions: orderDeductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                finalPrice: finalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                descriptionRow: '---',

            });
        }
        else {
            result.push({
                rowField: '---',
                code: '---',
                title: '---',
                scaleTitle: '---',
                supplyChainTitle: '---',
                productCategoryTitle: '---',
                unitPrice: '---',
                quantity: '---',
                price: '---',
                orderAdditions: '---',
                orderDeductions: '---',
                finalPrice: '---',
                descriptionRow: '---',

            });
        }

        return result;
    }
    /* #endregion */

     /* #region  [- disabledDate -] */
     disabledDate = (current) => {
        let startDate = this.props.latinDateCreated.subtract(1,'year').endOf('year').add(1,'day')
        let endDate = this.props.latinDateCreated.endOf('year').add(1,'day')
       return  current > endDate || current < startDate 
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- cancel -] */
    cancel = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.onCloseOrderToInvoiceModal();

    }
    /* #endregion */

    /* #region  [- submit -] */
    submit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.postOrderToInvoiceConvert();
        await this.props.onCloseOrderToInvoiceModal();
        await this.props.showInsertedCodeListModal(2);
    }
    /* #endregion */

    /* #region  [- countQuantity -] */
    countQuantity = (data) => {
        this.getInvoiceInventory(data.id)
        this.setState({
            isProductQuantityVisible: true,
            isProductQuantityDestroy: false,
            modalComponent: <ProductQuantity
            productData={data}
                productRef={data.id}
                quantity={data.quantity}
                onCancelProductQuantity={this.onCancelProductQuantity}
            />
        })
    }
    /* #endregion */

    /* #region  [- onCancelProductQuantity -] */
    onCancelProductQuantity = async () => {
        await this.setState({
            isProductQuantityVisible: false,
            isProductQuantityDestroy: true,
            modalComponent: <div></div>,
        });
        await this.gridApi.setRowData(this.props.orderProductList)
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handleChangeDatePicker -] */
    handleChangeDatePicker = (dateString, date) => {
        this.setState({
            dateInvoice: dateString,
            patternCode: date.split('-')[0],
        })
    }
    /* #endregion */

    /* #region  [- handleChange -] */
    handleChange = async (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    /* #endregion */

    /* #region  [- onSelectionChanged -] */
    // onSelectionChanged = () => {
    //     const selectedNodes = this.gridApi.getSelectedNodes()
    //     const selectedData = selectedNodes.map(node => node.data)
    //     if (selectedData.length === 0) {
    //         this.setState({
    //         })
    //     }
    //     else {

    //     }
    // };
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- postOrderToInvoiceConvert -] */
    postOrderToInvoiceConvert = async () => {
        let invoiceHeaderList = []

        let nativeDate = dayjs(this.state.dateInvoice).format('YYYY-MM-DD')
        let latinDate = dayjs(nativeDate, { jalali: true })

        invoiceHeaderList.push({
            nativeDateInvoice: dayjs(this.state.dateInvoice).format('YYYY/MM/DD').toString(),
            LatinDateInvoice: dayjs(latinDate).calendar('gregory').format('YYYY-MM-DD'),
            patternCode: this.state.patternCode,
            descriptionRow: this.state.descriptionRow
        })
        let data = {
            domainRef: this.props.domain,
            aspNetUsersRef:this.props.userId,
            headerRef: this.props.headerRef,
            invoiceHeaderList: invoiceHeaderList,
        }
        await this.props.postOrderToInvoiceConvert(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getInvoiceInventory -] */
    getInvoiceInventory = async (productRef) => {
        let data = {
            productRef: productRef
        }
        await this.props.getInvoiceInventory(JSON.stringify(data))
    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {

        return (
            <Container fluid style={{ margin: '0', padding: '0' }}>

                <Row name='row_01_Forms' >

                    <Col name='col_01_Forms'>

                        <Form name='basicInfoForm' style={{ padding: '1%' }}>

                            <FormGroup name='dateInvoice' style={{ textAlign: 'right' }}>
                                <Label for='dateInvoice'>تاریخ فاکتور جدید</Label>
                                <br />
                                <Row>
                                    <Col sm={6}>
                                        <ConfigProvider locale={fa_IR} direction="rtl">
                                            <DatePickerJalali
                                                onChange={this.handleChangeDatePicker}
                                                size="middle"
                                                defaultValue={this.state.dateInvoice}
                                                value={this.state.dateInvoice}
                                                style={{ width: "100%" }}
                                                allowClear={false}
                                                disabledDate={this.disabledDate}
                                            />
                                        </ConfigProvider>

                                    </Col>
                                </Row>

                            </FormGroup>

                            <FormGroup name='descriptionRow' style={{ textAlign: 'right' }}>

                                <Label for="descriptionRow">توضیحات </Label>
                                <Input
                                    type="textarea"
                                    name="descriptionRow"
                                    id="descriptionRow"
                                    onChange={this.handleChange}
                                    value={this.state.descriptionRow}
                                >
                                </Input>



                            </FormGroup>

                        </Form>

                    </Col>

                </Row>

                <Row name='row_02_ProductGrid'>
                    <Col className="ag-theme-alpine" style={{ width: '100%', padding: '2%', height: '400px' }}>

                        <AgGridReact
                            enableRtl={true}
                            defaultColDef={this.state.defaultColDef}
                            columnDefs={this.state.columnDefs}
                            onGridReady={this.onGridReady}
                            rowData={this.props.orderProductList}
                            //onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            gridOptions={this.state.gridOptions}
                        />

                    </Col>
                </Row>

                <Row name="row_03_Buttons" style={{ paddingLeft: '0.7%', marginBottom: '1%', }}>
                    <Col sm="6"></Col>
                    <Col sm="6" style={{ textAlign: 'left' }}>

                        <Button className='cancel-button-style' style={{ marginLeft: '1%' }} onClick={this.cancel}>لغو</Button>
                        <Button className='submit-button-style' onClick={this.submit}>تایید نهایی و ثبت در سیستم</Button>

                    </Col>

                </Row>

                <Row name='row_06_Modals'>

                    <Modal name="show product quantity"
                        destroyOnClose={this.state.isProductQuantityDestroy}
                        closable={true}
                        maskClosable={false}
                        width='800px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isProductQuantityVisible}
                        onCancel={this.onCancelProductQuantity}
                        //cancelButtonProps={{ style: { display: 'none' } }}
                        okButtonProps={{ style: { display: 'none' } }}
                        //footer={null}
                    >
                        <Container fluid>
                            <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>انبار</span>
                                </Col>
                            </Row>
                            {this.state.modalComponent}

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
        userId: state.auth.userId,
        orderProductList: state.invoice.orderProductList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    postOrderToInvoiceConvert: (data) => dispatch(postOrderToInvoiceConvert(data)),
    getInvoiceInventory: (data) => dispatch(getInvoiceInventory(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Convert);