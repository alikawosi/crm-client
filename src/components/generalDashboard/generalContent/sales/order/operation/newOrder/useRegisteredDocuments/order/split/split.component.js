/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { checkTokenExpiration } from '../../../../../../../../../../redux/shared/auth/auth.action';
import { postOrderToOrderSplit, saveOrderToOrderSplitedData } from '../../../../../../../../../../redux/sales/order/order/order.action'
import { ConfigProvider, Modal } from "antd";
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import "antd/dist/antd.css";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import moment from 'jalali-moment';
import CustomPinnedRowRenderer from '../../../../../../../../../shared/common/pinnedRow/customPinnedRow.component'
/* #endregion */

class Split extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            rowCode: '',
            message: '',
            /* #endregion */

            /* #region  [- flags -] */
            isSaveDisabled: true,
            isDeleteDisabled: true,
            isValidationModalVisible: false,
            /* #endregion */

            /* #region  [- dbField -] */
            patternCode: this.props.latinDateCreated.format('YYYY'),
            dateOrder: this.props.latinDateCreated,
            descriptionRow: '',
            code: 0,
            /* #endregion */

            /* #region  [- list -] */
            productList: [],
            /* #endregion */

            /* #region  [- ag-Grid -] */

            productColumnDefs: [
                {
                    cellRenderer: this.rowCellRenderer,
                    pinnedRowCellRenderer: 'customPinnedRowRenderer',
                    field: 'rowField',
                    headerName: 'ردیف',
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    cellClass: 'locked-col',
                    width: 80,
                    cellStyle: function () {
                        return {
                            paddingTop: '0'
                        }
                    }
                },
                { headerName: 'کد کالا', field: "code", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'نام کالا', field: "title", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'تامین کننده', field: "supplyChainTitle", },
                { headerName: 'نام گروه کالا', field: "productCategoryTitle", },
                { headerName: 'مبلغ پیش فرض', field: "unitPrice", pinnedRowCellRenderer: 'customPinnedRowRenderer', valueFormatter: this.currencyFormatter, },
                { headerName: 'تعداد', field: "quantity", pinnedRowCellRenderer: 'customPinnedRowRenderer',  valueFormatter: this.currencyFormatter,},
                { headerName: 'مبلغ', field: "price", pinnedRowCellRenderer: 'customPinnedRowRenderer', valueFormatter: this.currencyFormatter,},
                { headerName: 'اضافات', field: "orderAdditions", pinnedRowCellRenderer: 'customPinnedRowRenderer',  valueFormatter: this.currencyFormatter,},
                { headerName: 'کسورات', field: "orderDeductions", pinnedRowCellRenderer: 'customPinnedRowRenderer', valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ نهایی', field: "finalPrice", pinnedRowCellRenderer: 'customPinnedRowRenderer',  valueFormatter: this.currencyFormatter,},
                { headerName: 'توضیحات', field: "descriptionRow", pinnedRowCellRenderer: 'customPinnedRowRenderer', }

            ],
            productGridOptions: {
                pinnedBottomRowData: '',
                context: { componentParent: this },
                frameworkComponents: {
                    customPinnedRowRenderer: CustomPinnedRowRenderer
                }
            },
            orderColumnDefs: [
                {
                    cellRenderer: "agGroupCellRenderer",
                    valueGetter: "node.rowIndex+1",
                    headerName: 'ردیف',
                    headerCheckboxSelection: false,
                    checkboxSelection: true,
                    cellClass: 'locked-col',
                    colId: "row",
                    width: 80
                },
                { headerName: ' تاریخ سفارش', field: "nativeDateOrder" },
                { headerName: 'خریدار', field: "buyerTitle" },
                { headerName: 'فروشنده', field: "sellerTitle" },
                { headerName: 'توضیحات', field: "descriptionRow" },

            ],
            detailCellRendererParams: {

                detailGridOptions: {
                    columnDefs: [
                        { headerName: 'کد کالا', field: "code",pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                        { headerName: 'نام کالا', field: "title",pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                        { headerName: 'واحد اندازه گیری', field: "scaleTitle" ,pinnedRowCellRenderer: 'customPinnedRowRenderer',},
                        { headerName: 'تامین کننده', field: "supplyChainTitle", },
                { headerName: 'نام گروه کالا', field: "productCategoryTitle", },
                        { headerName: 'مبلغ فرض', field: "unitPrice" , valueFormatter: this.currencyFormatter,pinnedRowCellRenderer: 'customPinnedRowRenderer',},
                        { headerName: 'تعداد', field: "quantity" , valueFormatter: this.currencyFormatter,pinnedRowCellRenderer: 'customPinnedRowRenderer',},
                        { headerName: 'مبلغ', field: "price", valueFormatter: this.currencyFormatter,pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                        { headerName: 'اضافات', field: "orderAdditions" , valueFormatter: this.currencyFormatter,pinnedRowCellRenderer: 'customPinnedRowRenderer',},
                        { headerName: 'کسورات', field: "orderDeductions" , valueFormatter: this.currencyFormatter,pinnedRowCellRenderer: 'customPinnedRowRenderer',},
                        { headerName: 'مبلغ نهایی', field: "finalPrice", valueFormatter: this.currencyFormatter,pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                        { headerName: 'توضیحات', field: "descriptionRow",pinnedRowCellRenderer: 'customPinnedRowRenderer', }
                    ],
                    enableRtl: 'true',
                    pinnedBottomRowData: '',
                    frameworkComponents: { customPinnedRowRenderer: CustomPinnedRowRenderer },
                },
                getDetailRowData: (params) => {
                    this.getDetailData(params);
                },

                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    filter: true,
                },
            }
            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        this.setOrderData();
    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.onPinnedRowBottomCountProduct()
    };
    /* #endregion */

    /* #region  [- onGridReadyOrder -] */
    onGridReadyOrder = params => {
        this.orderGridApi = params.api;
        this.orderGridColumnApi = params.columnApi;
    };
    /* #endregion */

    /* #region  [- onPinnedRowBottomCountOrder -] */
    onPinnedRowBottomCountOrder = (params,list) => {
        var rows = this.createDataOrder(list);
        let detailGridApi = this.orderGridApi.getDetailGridInfo(params.node.id)
        detailGridApi.api.setPinnedBottomRowData(rows);
    }
    /* #endregion */

    /* #region  [- createDataOrder -] */
    createDataOrder = (list) => {
        var result = [];
        let unitPrice = 0
        let quantity = 0
        let price = 0
        let orderAdditions = 0
        let orderDeductions = 0
        let finalPrice = 0
        list.map(x => {
            unitPrice = unitPrice + x.unitPrice
            quantity = quantity + x.quantity
            price = price + x.price
            orderAdditions = orderAdditions + x.orderAdditions
            orderDeductions = orderDeductions + x.orderDeductions
            finalPrice = finalPrice + x.finalPrice
        })

        result.push({
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


        return result;
    }
    /* #endregion */

     /* #region  [- currencyFormatter -] */
     currencyFormatter = (params) => {
        let data = params.value === "" || params.value === undefined ? "" : params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return data
    }
    /* #endregion */

    /* #region  [- getDetailData -] */
    getDetailData = (params) => {
        let list = this.props.orderSplitProductList.filter(x => x.masterCode === params.data.code)
        params.successCallback(list)
        this.onPinnedRowBottomCountOrder(params,list);
    }
    /* #endregion */

    /* #region  [- setOrderData -] */
    setOrderData = () => {
        this.setState({
            productList: this.props.orderProductList,
        })
    }
    /* #endregion */

    /* #region  [- resetForm -] */
    resetForm = () => {
        let year = moment().locale('fa').format('YYYY')
        let newProductList = [...this.props.orderProductList]
        this.props.orderSplitProductList.map(x => {
            newProductList = newProductList.filter(y => y.id !== x.id)
        }
        )
        this.setState({
            isSaveDisabled: true,
            isDeleteDisabled: true,
            patternCode: year,
            dateOrder: this.props.latinDateCreated,
            descriptionRow: '',
            code: this.state.code + 1,
            productList: newProductList,
            rowCode: '',
        })
        this.onPinnedRowBottomCountProduct()
    }
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
    
    /* #region  [- onPinnedRowBottomCountProduct -] */
    onPinnedRowBottomCountProduct = () => {
        var rows = this.createData();
        this.state.productGridOptions.api.setPinnedBottomRowData(rows);
    }
    /* #endregion */

    /* #region  [- createData -] */
    createData = () => {
        var result = [];
        if (Object.keys(this.state.productList).length > 0) {
            let unitPrice = 0
            let quantity = 0
            let price = 0
            let orderAdditions = 0
            let orderDeductions = 0
            let finalPrice = 0
            this.state.productList.map(x => {
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

    /* #region  [- save -] */
    save = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);

        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);

        let newProductList = [...this.props.orderSplitProductList]
        for (let i = 0; i < Object.keys(selectedData).length; i++) {
            let data = {
                id: selectedData[i].id,
                masterCode: this.state.code + 1,
                code: selectedData[i].code,
                title: selectedData[i].title,
                scaleTitle: selectedData[i].scaleTitle,
                supplyChainTitle: selectedData[i].supplyChainTitle,
                productCategoryTitle: selectedData[i].productCategoryTitle,
                unitPrice: selectedData[i].unitPrice,
                quantity: selectedData[i].quantity,
                price: selectedData[i].price,
                orderAdditions: selectedData[i].orderAdditions,
                orderDeductions: selectedData[i].orderDeductions,
                finalPrice: selectedData[i].finalPrice,
                descriptionRow: selectedData[i].descriptionRow,
            }
            newProductList.push(data);
        }

        let orderHeaderList = [...this.props.orderSplitList]

        let nativeDate = dayjs(this.state.dateOrder).format('YYYY-MM-DD')
        let latinDate = dayjs(nativeDate, { jalali: true })

        orderHeaderList.push({
            code: parseInt(this.state.code + 1),
            nativeDateOrder: dayjs(this.state.dateOrder).format('YYYY/MM/DD').toString(),
            LatinDateOrder: dayjs(latinDate).calendar('gregory').format('YYYY-MM-DD'),
            patternCode: this.state.patternCode,
            buyerTitle: this.props.buyerTitle,
            sellerTitle: this.props.sellerTitle,
            descriptionRow: this.state.descriptionRow
        })

        let data = {
            orderSplitList: orderHeaderList,
            productList: newProductList
        }

        await this.props.saveOrderToOrderSplitedData(data)

        this.resetForm();
    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        let orderHeaderList = [...this.props.orderSplitList]
        let newProductList = [...this.props.orderSplitProductList]

        let data = {
            orderSplitList: orderHeaderList.filter(x => x.code !== this.state.rowCode),
            productList: newProductList.filter(x => x.masterCode !== this.state.rowCode)
        }
        await this.props.saveOrderToOrderSplitedData(data);
        this.resetForm();
    }
    /* #endregion */

    /* #region  [- cancel -] */
    cancel = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.onCloseNewOrderSplitModal();
    }
    /* #endregion */

    /* #region  [- onCancelValidationModal -] */
    onCancelValidationModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isValidationModalVisible: false,
            message: '',
            isSaveDisabled: true,
        })
        this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #region  [- submit -] */
    submit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (Object.keys(this.props.orderSplitList).length > 0 && Object.keys(this.state.productList).length === 0) {
            await this.postOrderToOrderSplit();
            await this.props.onCloseNewOrderSplitModal();
            await this.props.showInsertedCodeListModal(1);
        }
        else {
            this.setState({
                isValidationModalVisible: true,
                message: 'در تفکیک می بایست تمامی کالا ها تفکیک شوند.'
            })
        }
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handleChangeDatePicker -] */
    handleChangeDatePicker = (dateString, date) => {
        this.setState({
            dateOrder: dateString,
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

    /* #region  [- onSelectionChangedProduct -] */
    onSelectionChangedProduct = () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        if (selectedData.length === 0) {
            this.setState({
                isSaveDisabled: true,
            })
        }
        else {
            if (selectedData.length === Object.keys(this.props.orderProductList).length) {
                this.setState({
                    isValidationModalVisible: true,
                    message: 'درفرآیند تفکیک مجاز به انتخاب تمام کالا ها باهم نیستید.',
                    isSaveDisabled: true,
                })
            }
            else {
                this.setState({
                    isSaveDisabled: false,
                })
            }

        }
    };
    /* #endregion */

    /* #region  [- onSelectionChangedOrder -] */
    onSelectionChangedOrder = () => {
        const selectedNodes = this.orderGridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        if (selectedData.length === 0) {
            this.setState({
                isDeleteDisabled: true,
                rowCode: ''
            })
        }
        else {
            this.setState({
                isDeleteDisabled: false,
                rowCode: selectedData[0].code
            })

        }
    };
    /* #endregion */


    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- postOrderToOrderSplit -] */
    postOrderToOrderSplit = async () => {
        let data = {
            domainRef: this.props.domain,
            aspNetUsersRef:this.props.userId,
            headerRef: this.props.headerRef,
            orderHeaderList: this.props.orderSplitList,
            productList: this.props.orderSplitProductList,
        }
        await this.props.postOrderToOrderSplit(JSON.stringify(data))
    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {

        return (
            <Container fluid style={{ margin: '0', padding: '0' }}>

                <Row name='row_01_Forms' >

                    <Col sm='12' md='12' lg='12' name='col_01_Forms'>

                        <Form name='basicInfoForm' style={{ padding: '1%' }}>

                            <FormGroup name='dateOrder' style={{ textAlign: 'right' }}>
                                <Label for='dateOrder'>تاریخ سفارش جدید</Label>
                                <br />
                                <Row>
                                    <Col sm="12" md="12" lg="6">
                                        <ConfigProvider locale={fa_IR} direction="rtl">
                                            <DatePickerJalali
                                                onChange={this.handleChangeDatePicker}
                                                size="middle"
                                                defaultValue={this.state.dateOrder}
                                                value={this.state.dateOrder}
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

                <Row name='row_02_GridTitle' style={{ paddingRight: '1%' }}>
                    <Col sm='12' md='12' lg='12'>
                        <span style={{ fontSize: '15px', fontWeight: '500' }}>لیست کالاهای سفارش مرجع(انتخابی)</span>
                    </Col>

                </Row>

                <Row name='row_03_ProductGrid'>
                    <Col className="ag-theme-alpine" style={{ width: '100%', padding: '2%', height: '400px' }}>

                        <AgGridReact
                            enableRtl={true}
                            defaultColDef={this.state.defaultColDef}
                            columnDefs={this.state.productColumnDefs}
                            onGridReady={this.onGridReady}
                            rowSelection="multiple"
                            rowData={this.state.productList}
                            onSelectionChanged={this.onSelectionChangedProduct}
                            localeText={AG_GRID_LOCALE_FA}
                            gridOptions={this.state.productGridOptions}
                        />

                    </Col>
                </Row>

                <Row name="row_04_Buttons" style={{ paddingRight: '1%' }}>

                    <Col sm='12' md='12' lg='6' style={{ textAlign: 'right' }}>

                        <Button className='submit-button-style' disabled={this.state.isSaveDisabled} onClick={this.save}>ذخیره</Button>
                        <Button className='submit-button-style mr-2' disabled={this.state.isDeleteDisabled} onClick={this.delete}>حذف</Button>

                    </Col>

                    <Col sm='12' md='12' lg='6'></Col>

                </Row>

                <Row name='row_05_GridTitle' style={{ marginTop:'1%', paddingRight: '1%' }}>
                    <Col sm='12' md='12' lg='12'>
                        <span style={{ fontSize: '15px', fontWeight: '500' }}>سفارش جدید</span>
                    </Col>

                </Row>

                <Row name='row_06_orderSplitGrid'>
                    <Col className="ag-theme-alpine" style={{ width: '100%', padding: '2%', height: '400px' }}>

                        <AgGridReact
                            enableRtl={true}
                            masterDetail={true}
                            defaultColDef={this.state.defaultColDef}
                            columnDefs={this.state.orderColumnDefs}
                            onGridReady={this.onGridReadyOrder}
                            rowSelection="single"
                            rowData={this.props.orderSplitList}
                            detailCellRendererParams={this.state.detailCellRendererParams}
                            onSelectionChanged={this.onSelectionChangedOrder}
                            localeText={AG_GRID_LOCALE_FA}
                        />

                    </Col>
                </Row>

                <Row name="row_07_Buttons" style={{ paddingLeft: '0.7%', marginBottom: '1%' }}>
                    <Col sm='12' md='12' lg='6'></Col>
                    <Col sm='12' md='12' lg='6' style={{ textAlign: 'left' }}>

                        <Button className='cancel-button-style' style={{ marginLeft: '1%' }} onClick={this.cancel}>لغو</Button>
                        <Button className='submit-button-style' onClick={this.submit}>تایید نهایی و ثبت در سیستم</Button>

                    </Col>

                </Row>

                <Row name='row_08_Modals'>

                    <Modal name="show error"
                        closable={true}
                        maskClosable={false}
                        width='500px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isValidationModalVisible}
                        onCancel={this.onCancelValidationModal}
                        cancelButtonProps={{ style: { display: 'none' } }}
                        okButtonProps={{ style: { display: 'none' } }}
                        footer={[
                            <Button key='1' className='submit-button-style' onClick={this.onCancelValidationModal}>متوجه شدم</Button>,
                        ]}
                    >
                        <Container fluid>
                            <Row name='row_01_Modal_Content'>
                                <Col sm='12' className='modal-content-col'>

                                    <Form name='message' style={{ padding: '4% 1% 4% 0' }}>

                                        <FormGroup name='message' style={{ textAlign: 'right', marginTop: '10%' }}>

                                            <h5>{this.state.message}</h5>

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
        userId: state.auth.userId,
        orderProductList: state.order.orderProductList,
        orderSplitList: state.order.orderSplitList,
        orderSplitProductList: state.order.orderSplitProductList
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    postOrderToOrderSplit: (data) => dispatch(postOrderToOrderSplit(data)),
    saveOrderToOrderSplitedData: (data) => dispatch(saveOrderToOrderSplitedData(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Split);