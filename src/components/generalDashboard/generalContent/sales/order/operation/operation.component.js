/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
import { Modal } from 'antd';
import Notification from '../../../../../shared/common/notification/notification.component';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import {
    getOrderData, resetNewOrderProps, resetEditOrderProps,
    getOrder, deleteOrder, resetMessage, saveOrderHeaderRef, getOrderItem, getSeenOrderItem, getOrderItemGetData, getPrintOrderItem,
    getQuoteAccountTitle,
    getQuoteByAccount, useRegisteredDocumentsResetProps, getOrderAccountTitle, getOrderByAccount,
    getInvoiceAccountTitle, getInvoiceByAccount,
    getOrderToInvoiceConvertData, orderToInvoiceConvertResetProps,
    orderToInvoiceSplitResetProps, orderToInvoiceMergeResetProps,
    getOrderToInvoiceMergeData, getOrderToInvoiceSplitData,
    getOrderToQuoteConvertData, orderToQuoteConvertResetProps,
    getOrderToQuoteSplitData, orderToQuoteSplitResetProps,
    getOrderToQuoteMergeData, orderToQuoteMergeResetProps,
    orderToOrderCorrespondingResetProps, getOrderToOrderCorrespondingData,
    orderToOrderMergeResetProps, getOrderToOrderMergeData,
    orderToOrderSplitResetProps, getOrderToOrderSplitData,
    getQuoteToOrderConvertData, quoteToOrderConvertResetProps,
    getQuoteToOrderSplitData, quoteToOrderSplitResetProps,
    quoteToOrderergeResetProps, getQuoteToOrderMergeData,

    getInvoiceToOrderConvertData, invoiceToOrderConvertResetProps,
    getInvoiceToOrderSplitData, invoiceToOrderSplitResetProps,
    invoiceToOrderergeResetProps, getInvoiceToOrderMergeData,
    getOrderItemProduct,

} from '../../../../../../redux/sales/order/order/order.action';

import GridSeenButton from './gridSeenButton.component'
import Seen from './seen/seen.component'
import Print from './print/print.component'
import GridPrintButton from './gridPrintButton.component'
import Quote from './newOrder/useRegisteredDocuments/quote/quote.component'

import Order from './newOrder/useRegisteredDocuments/order/order.component'
import Invoice from './newOrder/useRegisteredDocuments/invoice/invoice.component'

import NewQuoteToOrderSplit from './newOrder/useRegisteredDocuments/quote/split/split.component'
import NewQuoteToOrderMerge from './newOrder/useRegisteredDocuments/quote/merge/merge.component'
import NewQuoteToOrderConvert from './newOrder/useRegisteredDocuments/quote/convert/convert.component'

import OrderToInvoiceConvert from './convert/orderToInvoice/convert.component'
import OrderToInvoiceSplit from './split/orderToInvoice/split.component'
import OrderToInvoiceMerge from './merge/orderToInvoice/merge.component'

import OrderToQuoteConvert from './convert/orderToQuote/convert.component'
import OrderToQuoteSplit from './split/orderToQuote/split.component'
import OrderToQuoteMerge from './merge/orderToQuote/merge.component'

import OrderToOrderCorresponding from './corresponding/corresponding.component'
import OrderToOrderMerge from './merge/orderToOrder/merge.component'
import OrderToOrderSplit from './split/orderToOrder/split.component'


import NewOrderToOrderConvert from './newOrder/useRegisteredDocuments/order/corresponding/corresponding.component'
import NewOrderToOrderMerge from './newOrder/useRegisteredDocuments/order/merge/merge.component'
import NewOrderToOrderSplit from './newOrder/useRegisteredDocuments/order/split/split.component'



import NewInvoiceToOrderConvert from './newOrder/useRegisteredDocuments/invoice/convert/convert.component'
import NewInvoiceToOrderSplit from './newOrder/useRegisteredDocuments/invoice/split/split.component'
import NewInvoiceToOrderMerge from './newOrder/useRegisteredDocuments/invoice/merge/merge.component'

import CustomPinnedRowRenderer from '../../../../../shared/common/pinnedRow/customPinnedRow.component'
import dayjs from "dayjs";
/* #endregion */


class Operation extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isNewModalVisible: false,
            isNewModalDestroy: false,
            isEditDisabled: true,
            isDeleteDisabled: true,
            isArchiveDisabled: true,
            isNewOrderChecked: true,
            isUseFromRegisteredDocumentsChecked: false,
            isDeleteModalVisible: false,
            isOrderToInvoiceConvertDisabled: true,
            isOrderToInvoiceMergeDisabled: true,
            isOrderToInvoiceSplitDisabled: true,
            isSeenModalVisible: false,
            isSeenModalDestroy: true,
            isPrintModalVisible: false,
            isPrintModalDestroy: true,

            isUseQuoteFlagChecked: false,
            isUseOrderFlagChecked: false,
            isUseInvoiceFlagChecked: false,

            isSelectAccountModalVisible: false,
            isSelectAccountModalDestroy: true,
            isAccountSubmitButtonDisabled: true,

            isUseRegisteredDocumentsModalVisible: false,
            isUseRegisteredDocumentsModalDestroy: true,

            isNewOrderSplitModalVisible: false,
            isNewOrderSplitModalDestroy: true,

            isInsertedCodeListModalVisible: false,
            isInsertedCodeListModalDestroy: true,

            isNewOrderCorrespondingModalVisible: false,
            isNewOrderCorrespondingModalDestroy: true,

            isNewOrderMergeModalVisible: false,
            isNewOrderMergeModalDestroy: true,

            isConvertModalVisible: false,
            isConvertModalDestroy: true,

            isSplitModalVisible: false,
            isSplitModalDestroy: true,

            isMergeModalVisible: false,
            isMergeModalDestroy: true,

            isNewHidden: true,
            isEditHidden: true,
            isDeleteHidden: true,

            isOrderToOrderSplitHidden: true,
            isOrderToOrderMergeHidden: true,
            isOrderToOrderCorrespondingHidden: true,
            isSubmitAsTemplateHidden: false,
            isArchiveHidden: false,

            isOrderToInvoiceConvertHidden: true,
            isOrderToInvoiceSplitHidden: true,
            isOrderToInvoiceMergeHidden: true,

            isOrderToQuoteConvertHidden: true,
            isOrderToQuoteSplitHidden: true,
            isOrderToQuoteMergeHidden: true,


            isInvoiceButtonRowHidden: true,
            isQuoteButtonRowHidden: true,

            isOrderToQuoteConvertDisabled: true,
            isOrderToQuoteSplitDisabled: true,
            isOrderToQuoteMergeDisabled: true,


            isOrderToOrderSplitDisabled: true,
            isOrderToOrderMergeDisabled: true,
            isOrderToOrderCorrespondingDisabled: true,

            isCorrespondingModalVisible: false,
            isCorrespondingModalDestroy: true,


            isNewOrderConvertModalVisible: false,
            isNewOrderConvertModalDestroy: true,

            isMergeCancelModalVisible: false,
            /* #endregion */

            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    //cellRenderer: this.cellRenderer,
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row",
                    valueGetter: "node.rowIndex+1",
                    cellRenderer: "agGroupCellRenderer",
                },
                { headerName: 'کد', field: "code", cellRenderer: this.codeValueGetter, },
                { headerName: 'کد مرجع', field: "referenceCode", cellRenderer: this.referenceCodeValueGetter },
                { headerName: 'تاریخ سفارش', field: "nativeDateOrder", },
                { headerName: ' پرینت', field: "print", cellRenderer: "gridPrintButton" },
                { headerName: 'خریدار', field: "buyer" },
                { headerName: 'فروشنده', field: "seller" },
                { headerName: 'مبلغ کل سفارش', field: "orderPrice", valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ کل اضافات', field: "orderAdditions", valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ کل کسورات', field: "orderDeductions", valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ قابل پرداخت', field: "orderPayablePrice", valueFormatter: this.currencyFormatter, },
                { headerName: 'جزئیات', field: "seen", cellRenderer: "gridSeenButton", width: 200 },
                { headerName: "تاریخ ثبت", field: "nativeDateCreated" },
                { headerName: "latinDateCreated", field: "latinDateCreated",sort:'desc' ,hide:true},
                { headerName: 'شماره سریال', field: "serialNumber" },
                { headerName: 'توضیحات', field: "descriptionRow" },
            ],
            gridOptions: {
                context: { componentParent: this },
                frameworkComponents: {
                    gridSeenButton: GridSeenButton,
                    gridPrintButton: GridPrintButton

                },
                detailRowAutoHeight: true,
            },
            detailCellRendererParams: {

                detailGridOptions: {
                    columnDefs: [
                        { headerName: 'کد کالا', field: "code", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                        { headerName: 'نام کالا', field: "title", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                        { headerName: 'واحد اندازه گیری', field: "scaleTitle", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                        { headerName: 'تامین کننده', field: "supplyChainTitle", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                        { headerName: 'نام گروه کالا', field: "productCategoryTitle", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                        { headerName: 'مبلغ پیش فرض', field: "unitPrice", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                        { headerName: 'تعداد', field: "quantity", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                        { headerName: 'مبلغ', field: "price", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                        { headerName: 'اضافات', field: "orderAdditions", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                        { headerName: 'کسورات', field: "orderDeductions", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                        { headerName: 'مبلغ کل', field: "finalPrice", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                        { headerName: 'توضیحات', field: "descriptionRow" },
                    ],
                    pinnedBottomRowData: '',
                    frameworkComponents: { customPinnedRowRenderer: CustomPinnedRowRenderer },
                    enableRtl: 'true',
                },
                getDetailRowData: (params) => { this.getOrderItemProduct(params) }
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
            idList: [],
            accountBuyerTitleList: [],
            accountSellerTitleList: [],
            /* #endregion */

            /* #region  [- componentFields -] */
            orderHeaderRef: '',
            latinDateCreated: '',
            seenModalComponent: <div></div>,
            accountBuyerRef: '',
            accountSellerRef: '',
            useRegisteredDocumentsModalTitle: '',
            newRegisteredDocumentsModalTitle: '',
            insertedCodeModalTitle: '',
            mergeCancelModalMessage: '',
            /* #endregion */
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    async componentDidMount() {
        await this.accessToMenu(this.props.userMenuAccessList);
        this.getOrder();
    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("418")) {
            this.setState({
                isNewHidden: false
            })
        }
        if (data.includes("427")) {
            this.setState({
                isEditHidden: false
            })
        }
        if (data.includes("431")) {
            this.setState({
                isDeleteHidden: false
            })
        }

        if (data.includes("503")) {
            this.setState({
                isOrderToOrderSplitHidden: false
            })
        }
        if (data.includes("502")) {
            this.setState({
                isOrderToOrderMergeHidden: false
            })
        }
        if (data.includes("501")) {
            this.setState({
                isOrderToOrderCorrespondingHidden: false
            })
        }

        if (data.includes("486") || data.includes("488") || data.includes("487")) {
            this.setState({
                isInvoiceButtonRowHidden: false,
            });
        }

        if (data.includes("486")) {
            this.setState({
                isOrderToInvoiceConvertHidden: false
            })
        }
        if (data.includes("488")) {
            this.setState({
                isOrderToInvoiceSplitHidden: false
            })
        }
        if (data.includes("487")) {
            this.setState({
                isOrderToInvoiceMergeHidden: false
            })
        }

        if (data.includes("498") || data.includes("500") || data.includes("499")) {
            this.setState({
                isQuoteButtonRowHidden: false,
            });
        }
        if (data.includes("498")) {
            this.setState({
                isOrderToQuoteConvertHidden: false
            })
        }
        if (data.includes("500")) {
            this.setState({
                isOrderToQuoteSplitHidden: false
            })
        }
        if (data.includes("499")) {
            this.setState({
                isOrderToQuoteMergeHidden: false
            })
        }

    }
    /* #endregion */

    /* #region  [- componentDidUpdate -] */
    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            if (this.props.message === 'حذف با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
            } else if (this.props.message === 'Successfully Set.') {
                Notification('bottomLeft', this.props.message, 'success');
            } else if (this.props.message === 'پیدا نشد.') {
                Notification('bottomLeft', this.props.message, 'error');
            } else if (this.props.message === 'خطایی رخ داده است.') {
                Notification('bottomLeft', this.props.message, 'error');
            }
            this.props.resetMessage();
        }

    }
    /* #endregion */

    //#region  [ - onGridReady - ] */
    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
    };
    //#endregion

    /* #region  [- onPinnedRowBottomCount -] */
    onPinnedRowBottomCount = (params) => {
        var rows = this.createData();
        let detailGridApi = this.state.gridOptions.api.getDetailGridInfo(params.node.id)
        detailGridApi.api.setPinnedBottomRowData(rows);
    }
    /* #endregion */

    /* #region  [- createData -] */
    createData = () => {
        var result = [];
        let unitPrice = 0
        let quantity = 0
        let price = 0
        let orderAdditions = 0
        let orderDeductions = 0
        let finalPrice = 0
        this.props.orderDetailProductList.map(x => {
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

    /* #region  [- cellRenderer -] */
    // cellRenderer = params => {
    //     return (params.node.rowIndex + 1).toLocaleString('fa-IR')
    // }
    /* #endregion */

    /* #region  [- codeValueGetter -] */
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

    /* #region  [- referenceCodeValueGetter -] */
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

    /* #region  [- currencyFormatter -] */
    currencyFormatter = (params) => {
        let data = params.value === "" || params.value === undefined ? "" : params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return data
    }
    /* #endregion */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        const len = selectedData.length

        if (len === 0) {
            this.setState({
                isDeleteDisabled: true,
                isEditDisabled: true,
                isOrderToInvoiceConvertDisabled: true,
                isOrderToInvoiceMergeDisabled: true,
                isOrderToInvoiceSplitDisabled: true,
                isOrderToQuoteConvertDisabled: true,
                isOrderToQuoteSplitDisabled: true,
                isOrderToQuoteMergeDisabled: true,
                isOrderToOrderSplitDisabled: true,
                isOrderToOrderMergeDisabled: true,
                isOrderToOrderCorrespondingDisabled: true,
                orderHeaderRef: '',
                latinDateCreated: '',
                idList: [],
            })
        }
        if (len === 1) {
            let idList = [{
                id: selectedData[0].id
            }]
            this.setState({
                isDeleteDisabled: selectedData[0].deleteCheckRefFlag,
                isOrderToInvoiceConvertDisabled: selectedData[0].forwardCheckRefFlag,
                isOrderToInvoiceMergeDisabled: true,
                isOrderToInvoiceSplitDisabled: selectedData[0].forwardCheckRefFlag,
                isEditDisabled: selectedData[0].editCheckRefFlag,
                isOrderToQuoteConvertDisabled: selectedData[0].backwardCheckRefFlag,
                isOrderToQuoteSplitDisabled: selectedData[0].backwardCheckRefFlag,
                isOrderToQuoteMergeDisabled: true,
                isOrderToOrderSplitDisabled: selectedData[0].innerCheckRefFlag,
                isOrderToOrderMergeDisabled: true,
                isOrderToOrderCorrespondingDisabled: false,
                orderHeaderRef: selectedData[0].id,
                latinDateCreated: dayjs(selectedData[0].latinDateCreated).calendar("jalali").locale("fa"),
                idList: idList,
            })
            this.props.saveOrderHeaderRef(selectedData[0].id)
        }
        else if (len > 1) {
            let idList = []
            let forwardCheckRefFlag = false
            let backwardCheckRefFlag = false
            let innerCheckRefFlag = false
            selectedData.map(x => {
                if (x.forwardCheckRefFlag ===true) {
                    forwardCheckRefFlag=true
                }
                if (x.backwardCheckRefFlag ===true) {
                    backwardCheckRefFlag=true
                }
                if (x.innerCheckRefFlag ===true) {
                    innerCheckRefFlag=true
                }
                idList.push({
                    id: x.id
                })
            })



            this.setState({
                isDeleteDisabled: true,
                isOrderToInvoiceConvertDisabled: true,
                isOrderToInvoiceMergeDisabled: forwardCheckRefFlag,
                isOrderToInvoiceSplitDisabled: true,
                isEditDisabled: true,
                isOrderToQuoteConvertDisabled: true,
                isOrderToQuoteSplitDisabled: true,
                isOrderToQuoteMergeDisabled: backwardCheckRefFlag,
                isOrderToOrderSplitDisabled: true,
                isOrderToOrderMergeDisabled: innerCheckRefFlag,
                isOrderToOrderCorrespondingDisabled: true,
                orderHeaderRef: selectedData[0].id,
                latinDateCreated: '',
                idList: idList,
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

    /* #region  [-  showInsertedCodeListModal -] */
    showInsertedCodeListModal = (data) => {
        if (data === 1) {
            this.setState({
                insertedCodeModalTitle: 'سفارش(ها) به شماره(ها)ی زیر ثبت شدند',
                isInsertedCodeListModalVisible: true,
                isInsertedCodeListModalDestroy: false,
            })
        }
        else if (data === 2) {
            this.setState({
                insertedCodeModalTitle: 'فاکتور(ها) به شماره(ها)ی زیر ثبت شدند',
                isInsertedCodeListModalVisible: true,
                isInsertedCodeListModalDestroy: false,
            })
        }
        else if (data === 3) {
            this.setState({
                insertedCodeModalTitle: 'پیش فاکتور(ها) به شماره(ها)ی زیر ثبت شدند',
                isInsertedCodeListModalVisible: true,
                isInsertedCodeListModalDestroy: false,
            })
        }
    }
    /* #endregion */

    /* #region  [- renderCode -] */
    renderCode = (code) => {
        if (code.includes('\\')) {
            let patternCode = code.split('\\')[0]
            let ordinalCode = code.split('\\')[1]
            return ordinalCode + '\\' + patternCode
        }
        else if (code.includes('*')) {
            let patternCode = code.split('*')[0]
            let ordinalCode = code.split('*')[1]
            return ordinalCode + '*' + patternCode
        }
        else {
            return code
        }
    }
    /* #endregion */

    /* #region  [- validateAccountForm -] */
    validateAccountForm = async () => {
        if (this.state.accountBuyerRef !== '' && this.state.accountSellerRef !== '') {
            this.setState({
                isAccountSubmitButtonDisabled: false
            })
        }
        else {
            this.setState({
                isAccountSubmitButtonDisabled: true
            })
        }
    }
    /* #endregion */



    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- new -] */
    new = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isNewModalVisible: true,
            isNewModalDestroy: false,
        })
      await  this.props.resetNewOrderProps()
    }
    /* #endregion */

    /* #region  [- approve -] */
    approve = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.state.isNewOrderChecked === true) {
          //  await this.props.resetEditOrderProps();
            await this.getOrderData();
            this.props.new();
        }
        else if (this.state.isUseFromRegisteredDocumentsChecked === true) {
            if (this.state.isUseQuoteFlagChecked === true) {
                await this.getQuoteAccountTitle();
                this.setState({
                    isSelectAccountModalVisible: true,
                    isSelectAccountModalDestroy: false,
                    isNewModalVisible: false,
                    isNewModalDestroy: true,
                    accountBuyerTitleList: this.props.quoteAccountBuyerTitleList.map(item => (<option key={item.id} value={item.id}>{item.title}</option>)),
                    accountSellerTitleList: this.props.quoteAccountSellerTitleList.map(item => (<option key={item.id} value={item.id}>{item.title}</option>)),
                })
            }
            else if (this.state.isUseOrderFlagChecked === true) {
                await this.getOrderAccountTitle();
                this.setState({
                    isSelectAccountModalVisible: true,
                    isSelectAccountModalDestroy: false,
                    isNewModalVisible: false,
                    isNewModalDestroy: true,
                    accountBuyerTitleList: this.props.orderAccountBuyerTitleList.map(item => (<option key={item.id} value={item.id}>{item.title}</option>)),
                    accountSellerTitleList: this.props.orderAccountSellerTitleList.map(item => (<option key={item.id} value={item.id}>{item.title}</option>)),
                })
            }
            else if (this.state.isUseInvoiceFlagChecked === true) {
                await this.getInvoiceAccountTitle();
                this.setState({
                    isSelectAccountModalVisible: true,
                    isSelectAccountModalDestroy: false,
                    isNewModalVisible: false,
                    isNewModalDestroy: true,
                    accountBuyerTitleList: this.props.invoiceAccountBuyerTitleList.map(item => (<option key={item.id} value={item.id}>{item.title}</option>)),
                    accountSellerTitleList: this.props.invoiceAccountSellerTitleList.map(item => (<option key={item.id} value={item.id}>{item.title}</option>)),
                })
            }
        }

    }
    /* #endregion */

    /* #region  [- edit -] */
    edit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.props.resetEditOrderProps()
        await this.getOrderItemGetData();
        await this.props.edit();

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
        this.setState({
            isEditDisabled: true,
            isDeleteDisabled: true,
            idList: [],
            isDeleteModalVisible: false
        })
        this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #region  [- refresh -] */
    refresh = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getOrder();
    }
    /* #endregion */

    /* #region  [- deleteInModal -] */
    deleteInModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.deleteOrder();
        await this.onCloseDeleteModal();
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

    /* #region  [- onCancelNew -] */
    onCancelNew = () => {
        this.setState({
            isNewModalVisible: false,
            isNewModalDestroy: true,
            isNewOrderChecked: true,
            isUseFromRegisteredDocumentsChecked: false,
            isUseQuoteFlagChecked: false,
            isUseOrderFlagChecked: false,
            isUseInvoiceFlagChecked: false,
        })
    }
    /* #endregion */

    /* #region  [- onCloseUseRegisteredDocumentsModal -] */
    onCloseUseRegisteredDocumentsModal = async () => {
        await this.props.useRegisteredDocumentsResetProps();
        this.setState({

            isNewOrderChecked: true,
            isUseFromRegisteredDocumentsChecked: false,
            isUseQuoteFlagChecked: false,
            isUseOrderFlagChecked: false,
            isUseInvoiceFlagChecked: false,

            accountBuyerRef: '',
            accountSellerRef: '',

            isUseRegisteredDocumentsModalVisible: false,
            isUseRegisteredDocumentsModalDestroy: true,
            newRegisteredDocumentsModalTitle: '',
        })
    }
    /* #endregion */

    /* #region  [- onCloseSelectAccountModal -] */
    onCloseSelectAccountModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.props.useRegisteredDocumentsResetProps();
        this.setState({
            accountBuyerRef: '',
            accountSellerRef: '',

            isNewOrderChecked: true,
            isUseFromRegisteredDocumentsChecked: false,
            isUseQuoteFlagChecked: false,
            isUseOrderFlagChecked: false,
            isUseInvoiceFlagChecked: false,

            isSelectAccountModalVisible: false,
            isSelectAccountModalDestroy: true,
            isAccountSubmitButtonDisabled: true,

        })
    }
    /* #endregion */

    /* #region  [- submitAccount -] */
    submitAccount = async () => {
        if (this.state.isUseQuoteFlagChecked === true) {
            await this.getQuoteByAccount();
            this.setState({
                modalComponent: <Quote
                    newQuoteToOrderSplit={this.newQuoteToOrderSplit}
                    newQuoteToOrderConvert={this.newQuoteToOrderConvert}
                    newQuoteToOrderMerge={this.newQuoteToOrderMerge}
                />,

                isSelectAccountModalVisible: false,
                isSelectAccountModalDestroy: true,
                isAccountSubmitButtonDisabled: true,

                isUseRegisteredDocumentsModalVisible: true,
                isUseRegisteredDocumentsModalDestroy: false,
                newRegisteredDocumentsModalTitle: 'استفاده از پیش فاکتورها'
            })
        }
        else if (this.state.isUseOrderFlagChecked === true) {
            await this.getOrderByAccount();
            this.setState({
                modalComponent: <Order
                    newOrderToOrderSplit={this.newOrderToOrderSplit}
                    newOrderToOrderCorresponding={this.newOrderToOrderCorresponding}
                    newOrderToOrderMerge={this.newOrderToOrderMerge}
                />,
                isSelectAccountModalVisible: false,
                isSelectAccountModalDestroy: true,
                isAccountSubmitButtonDisabled: true,

                isUseRegisteredDocumentsModalVisible: true,
                isUseRegisteredDocumentsModalDestroy: false,
                newRegisteredDocumentsModalTitle: 'استفاده از سفارش ها'
            })
        }
        else if (this.state.isUseInvoiceFlagChecked === true) {
            await this.getInvoiceByAccount();
            this.setState({
                modalComponent: <Invoice
                    newInvoiceToOrderSplit={this.newInvoiceToOrderSplit}
                    newInvoiceToOrderConvert={this.newInvoiceToOrderConvert}
                    newInvoiceToOrderMerge={this.newInvoiceToOrderMerge}
                />,
                isSelectAccountModalVisible: false,
                isSelectAccountModalDestroy: true,
                isAccountSubmitButtonDisabled: true,

                isUseRegisteredDocumentsModalVisible: true,
                isUseRegisteredDocumentsModalDestroy: false,
                newRegisteredDocumentsModalTitle: 'استفاده از فاکتور ها'
            })
        }
    }
    /* #endregion */

    /* #region  [- newQuoteToOrderSplit -] */
    newQuoteToOrderSplit = async (headerRef, sellerTitle, buyerTitle, latinDateCreated) => {
        await this.props.quoteToOrderSplitResetProps();
        await this.getQuoteToOrderSplitData(headerRef);
        await this.setState({
            isUseRegisteredDocumentsModalVisible: false,
            isUseRegisteredDocumentsModalDestroy: true,
            isNewOrderSplitModalVisible: true,
            isNewOrderSplitModalDestroy: false,
            newRegisteredDocumentsModalTitle: '',
            useRegisteredDocumentsModalTitle: 'استفاده از پیش فاکتورها-تفکیک',
            modalComponent: <NewQuoteToOrderSplit
                headerRef={headerRef}
                latinDateCreated={latinDateCreated}
                onCloseNewOrderSplitModal={this.onCloseNewOrderSplitModal}
                sellerTitle={sellerTitle}
                buyerTitle={buyerTitle}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
            />,

            isNewOrderChecked: true,
            isUseFromRegisteredDocumentsChecked: false,
            isUseQuoteFlagChecked: false,
            isUseOrderFlagChecked: false,
            isUseInvoiceFlagChecked: false,
            accountBuyerRef: '',
            accountSellerRef: '',
        })
    }
    /* #endregion */

    /* #region  [- onCloseNewOrderSplitModal -] */
    onCloseNewOrderSplitModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        //  await this.props.useRegisteredDocumentsResetProps();
        this.setState({
            isNewOrderSplitModalVisible: false,
            isNewOrderSplitModalDestroy: true,
            modalComponent: <div></div>,
            useRegisteredDocumentsModalTitle: '',
        })
    }
    /* #endregion */

    /* #region  [- onCloseInsertedCodeListModal -] */
    onCloseInsertedCodeListModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        //  await this.props.useRegisteredDocumentsResetProps();
        this.setState({
            isInsertedCodeListModalVisible: false,
            isInsertedCodeListModalDestroy: true,
            insertedCodeModalTitle: '',
        })
    }
    /* #endregion */

    /* #region  [- onCloseNewOrderCorrespondingModal -] */
    onCloseNewOrderCorrespondingModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        //  await this.props.useRegisteredDocumentsResetProps();
        this.setState({
            isNewOrderCorrespondingModalVisible: false,
            isNewOrderCorrespondingModalDestroy: true,
            modalComponent: <div></div>,
            useRegisteredDocumentsModalTitle: '',
        })
    }
    /* #endregion */

    /* #region  [- newQuoteToOrderConvert-] */
    newQuoteToOrderConvert = async (headerRef, latinDateCreated) => {
        await this.props.quoteToOrderConvertResetProps();
        await this.getQuoteToOrderConvertData(headerRef);
        await this.setState({
            isUseRegisteredDocumentsModalVisible: false,
            isUseRegisteredDocumentsModalDestroy: true,
            isNewOrderConvertModalVisible: true,
            isNewOrderConvertModalDestroy: false,
            newRegisteredDocumentsModalTitle: '',
            useRegisteredDocumentsModalTitle: 'استفاده از پیش فاکتورها-تبدیل',
            modalComponent: <NewQuoteToOrderConvert
                headerRef={headerRef}
                latinDateCreated={latinDateCreated}
                onCloseNewOrderConvertModal={this.onCloseNewOrderConvertModal}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
            />,
            isNewOrderChecked: true,
            isUseFromRegisteredDocumentsChecked: false,
            isUseQuoteFlagChecked: false,
            isUseOrderFlagChecked: false,
            isUseInvoiceFlagChecked: false,
            accountBuyerRef: '',
            accountSellerRef: '',
        })
    }
    /* #endregion */

    /* #region  [- onCloseNewOrderConvertModal -] */
    onCloseNewOrderConvertModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        //  await this.props.useRegisteredDocumentsResetProps();
        this.setState({
            isNewOrderConvertModalVisible: false,
            isNewOrderConvertModalDestroy: true,
            modalComponent: <div></div>,
            useRegisteredDocumentsModalTitle: '',
        })
    }
    /* #endregion */

    /* #region  [- onCloseNewOrderMergeModal -] */
    onCloseNewOrderMergeModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        // await this.props.useRegisteredDocumentsResetProps();
        this.setState({
            isNewOrderMergeModalVisible: false,
            isNewOrderMergeModalDestroy: true,
            modalComponent: <div></div>,
            useRegisteredDocumentsModalTitle: '',
        })
    }
    /* #endregion */

    /* #region  [- newQuoteToOrderMerge -] */
    newQuoteToOrderMerge = async (mergeHeaderRefList, latinDateCreated) => {

        await this.props.quoteToOrderergeResetProps();
        await this.getQuoteToOrderMergeData(mergeHeaderRefList);
        await this.setState({
            isUseRegisteredDocumentsModalVisible: false,
            isUseRegisteredDocumentsModalDestroy: true,
            isNewOrderMergeModalVisible: true,
            isNewOrderMergeModalDestroy: false,
            newRegisteredDocumentsModalTitle: '',
            useRegisteredDocumentsModalTitle: 'استفاده از پیش فاکتورها-ادغام',
            modalComponent: <NewQuoteToOrderMerge
                mergeHeaderRefList={mergeHeaderRefList}
                latinDateCreated={latinDateCreated}
                onCloseNewOrderMergeModal={this.onCloseNewOrderMergeModal}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
            />,
            isNewOrderChecked: true,
            isUseFromRegisteredDocumentsChecked: false,
            isUseQuoteFlagChecked: false,
            isUseOrderFlagChecked: false,
            isUseInvoiceFlagChecked: false,
            accountBuyerRef: '',
            accountSellerRef: '',
        })
    }
    /* #endregion */

    /* #region  [- newOrderToOrderCorresponding-] */
    newOrderToOrderCorresponding = async (headerRef) => {
        await this.props.orderToOrderCorrespondingResetProps();
        await this.getOrderToOrderCorrespondingData(headerRef)
        await this.setState({
            isUseRegisteredDocumentsModalVisible: false,
            isUseRegisteredDocumentsModalDestroy: true,
            isNewOrderCorrespondingModalVisible: true,
            isNewOrderCorrespondingModalDestroy: false,
            newRegisteredDocumentsModalTitle: '',
            useRegisteredDocumentsModalTitle: 'استفاده از سفارش ها-تبدیل',
            modalComponent: <NewOrderToOrderConvert
                headerRef={headerRef}
                onCloseCorrespondingModal={this.onCloseCorrespondingModal}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
                onCloseNewOrderCorrespondingModal={this.onCloseNewOrderCorrespondingModal}
            />,
            isNewOrderChecked: true,
            isUseFromRegisteredDocumentsChecked: false,
            isUseQuoteFlagChecked: false,
            isUseOrderFlagChecked: false,
            isUseInvoiceFlagChecked: false,
            accountBuyerRef: '',
            accountSellerRef: '',
        })
    }
    /* #endregion */

    /* #region  [- newOrderToOrderSplit -] */
    newOrderToOrderSplit = async (headerRef, sellerTitle, buyerTitle, latinDateCreated) => {
        await this.props.orderToOrderSplitResetProps();
        await this.getOrderToOrderSplitData(headerRef);
        await this.setState({
            isUseRegisteredDocumentsModalVisible: false,
            isUseRegisteredDocumentsModalDestroy: true,
            isNewOrderSplitModalVisible: true,
            isNewOrderSplitModalDestroy: false,
            newRegisteredDocumentsModalTitle: '',
            useRegisteredDocumentsModalTitle: 'استفاده از سفارش ها-تفکیک',
            modalComponent: <NewOrderToOrderSplit
                headerRef={headerRef}
                latinDateCreated={latinDateCreated}
                sellerTitle={sellerTitle}
                buyerTitle={buyerTitle}
                onCloseSplitModal={this.onCloseSplitModal}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
                onCloseNewOrderSplitModal={this.onCloseNewOrderSplitModal}
            />,

            isNewOrderChecked: true,
            isUseFromRegisteredDocumentsChecked: false,
            isUseQuoteFlagChecked: false,
            isUseOrderFlagChecked: false,
            isUseInvoiceFlagChecked: false,
            accountBuyerRef: '',
            accountSellerRef: '',
        })
    }
    /* #endregion */

    /* #region  [- newOrderToOrderMerge -] */
    newOrderToOrderMerge = async (mergeHeaderRefList, latinDateCreated) => {

        await this.props.orderToOrderMergeResetProps();
        await this.getOrderToOrderMergeData(mergeHeaderRefList)
        await this.setState({
            isUseRegisteredDocumentsModalVisible: false,
            isUseRegisteredDocumentsModalDestroy: true,
            isNewOrderMergeModalVisible: true,
            isNewOrderMergeModalDestroy: false,
            newRegisteredDocumentsModalTitle: '',
            useRegisteredDocumentsModalTitle: 'استفاده از سفارش ها-ادغام',
            modalComponent: <NewOrderToOrderMerge
                mergeHeaderRefList={mergeHeaderRefList}
                latinDateCreated={latinDateCreated}
                onCloseMergeModal={this.onCloseMergeModal}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
                onCloseNewOrderMergeModal={this.onCloseNewOrderMergeModal}
            />,
            isNewOrderChecked: true,
            isUseFromRegisteredDocumentsChecked: false,
            isUseQuoteFlagChecked: false,
            isUseOrderFlagChecked: false,
            isUseInvoiceFlagChecked: false,
            accountBuyerRef: '',
            accountSellerRef: '',
        })
    }
    /* #endregion */

    /* #region  [- newInvoiceToOrderSplit -] */
    newInvoiceToOrderSplit = async (headerRef, sellerTitle, buyerTitle, latinDateCreated) => {
        await this.props.invoiceToOrderSplitResetProps();
        await this.getInvoiceToOrderSplitData(headerRef);
        await this.setState({
            isUseRegisteredDocumentsModalVisible: false,
            isUseRegisteredDocumentsModalDestroy: true,
            isNewOrderSplitModalVisible: true,
            isNewOrderSplitModalDestroy: false,
            newRegisteredDocumentsModalTitle: '',
            useRegisteredDocumentsModalTitle: 'استفاده از فاکتور ها-تفکیک',
            modalComponent: <NewInvoiceToOrderSplit
                headerRef={headerRef}
                latinDateCreated={latinDateCreated}
                onCloseNewOrderSplitModal={this.onCloseNewOrderSplitModal}
                sellerTitle={sellerTitle}
                buyerTitle={buyerTitle}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
            />,

            isNewOrderChecked: true,
            isUseFromRegisteredDocumentsChecked: false,
            isUseQuoteFlagChecked: false,
            isUseOrderFlagChecked: false,
            isUseInvoiceFlagChecked: false,
            accountBuyerRef: '',
            accountSellerRef: '',
        })
    }
    /* #endregion */

    /* #region  [- newInvoiceToOrderConvert-] */
    newInvoiceToOrderConvert = async (headerRef, latinDateCreated) => {
        await this.props.invoiceToOrderConvertResetProps();
        await this.getInvoiceToOrderConvertData(headerRef);
        await this.setState({
            isUseRegisteredDocumentsModalVisible: false,
            isUseRegisteredDocumentsModalDestroy: true,
            isNewOrderConvertModalVisible: true,
            isNewOrderConvertModalDestroy: false,
            newRegisteredDocumentsModalTitle: '',
            useRegisteredDocumentsModalTitle: 'استفاده از فاکتور ها-تبدیل',
            modalComponent: <NewInvoiceToOrderConvert
                headerRef={headerRef}
                latinDateCreated={latinDateCreated}
                onCloseNewOrderConvertModal={this.onCloseNewOrderConvertModal}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
            />,
            isNewOrderChecked: true,
            isUseFromRegisteredDocumentsChecked: false,
            isUseQuoteFlagChecked: false,
            isUseOrderFlagChecked: false,
            isUseInvoiceFlagChecked: false,
            accountBuyerRef: '',
            accountSellerRef: '',
        })
    }
    /* #endregion */

    /* #region  [- newInvoiceToOrderMerge -] */
    newInvoiceToOrderMerge = async (mergeHeaderRefList, latinDateCreated) => {
        await this.props.invoiceToOrderergeResetProps();
        await this.getInvoiceToOrderMergeData(mergeHeaderRefList);
        if (this.props.isInvoiceMergable === false) {
            this.setState({
                mergeCancelModalMessage: 'به دلیل تکراری بودن کالا ادامه ی فرآیند ادغام امکان پذیر نمیباشد.',
                isMergeCancelModalVisible: true,
            })
        }
        else {
            await this.setState({
                isUseRegisteredDocumentsModalVisible: false,
                isUseRegisteredDocumentsModalDestroy: true,
                isNewOrderMergeModalVisible: true,
                isNewOrderMergeModalDestroy: false,
                newRegisteredDocumentsModalTitle: '',
                useRegisteredDocumentsModalTitle: 'استفاده از فاکتور ها-ادغام',
                modalComponent: <NewInvoiceToOrderMerge
                    mergeHeaderRefList={mergeHeaderRefList}
                    latinDateCreated={latinDateCreated}
                    onCloseNewOrderMergeModal={this.onCloseNewOrderMergeModal}
                    showInsertedCodeListModal={this.showInsertedCodeListModal}
                />,
                isNewOrderChecked: true,
                isUseFromRegisteredDocumentsChecked: false,
                isUseQuoteFlagChecked: false,
                isUseOrderFlagChecked: false,
                isUseInvoiceFlagChecked: false,
                accountBuyerRef: '',
                accountSellerRef: '',
            })
        }


    }
    /* #endregion */

    /* #region  [- orderToInvoiceConvert -] */
    orderToInvoiceConvert = async () => {
        await this.props.orderToInvoiceConvertResetProps();
        await this.getOrderToInvoiceConvertData();
        this.setState({
            isConvertModalVisible: true,
            isConvertModalDestroy: false,
            modalComponent: <OrderToInvoiceConvert
                headerRef={this.state.orderHeaderRef}
                latinDateCreated={this.state.latinDateCreated}
                onCloseConvertModal={this.onCloseConvertModal}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
            />
        })
    }
    /* #endregion */

    /* #region  [- onCloseConvertModal -] */
    onCloseConvertModal = () => {
        //await this.props.useRegisteredDocumentsResetProps();
        this.setState({
            isConvertModalVisible: false,
            isConvertModalDestroy: true,
            orderHeaderRef: '',
            latinDateCreated: '',
            idList: [],
        })
        this.props.saveOrderHeaderRef('')
        this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #region  [- orderToInvoiceSplit -] */
    orderToInvoiceSplit = async () => {
        await this.props.orderToInvoiceSplitResetProps();
        await this.getOrderToInvoiceSplitData();
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        this.setState({
            isSplitModalVisible: true,
            isSplitModalDestroy: false,
            modalComponent: <OrderToInvoiceSplit
                headerRef={this.state.orderHeaderRef}
                latinDateCreated={this.state.latinDateCreated}
                sellerTitle={selectedData[0].seller}
                buyerTitle={selectedData[0].buyer}
                onCloseSplitModal={this.onCloseSplitModal}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
            />
        })
    }
    /* #endregion */

    /* #region  [- onCloseSplitModal -] */
    onCloseSplitModal = () => {
        //await this.props.useRegisteredDocumentsResetProps();
        this.setState({
            isSplitModalVisible: false,
            isSplitModalDestroy: true,
            orderHeaderRef: '',
            latinDateCreated: '',
            idList: [],
        })
        this.props.saveOrderHeaderRef('')
        this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #region  [- orderToInvoiceMerge -] */
    orderToInvoiceMerge = async () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        let sellerId = selectedData[0].sellerRef
        let buyerId = selectedData[0].buyerRef
        let latinDateCreated = dayjs(selectedData[0].latinDateCreated).calendar("jalali").locale("fa")
        let result = false
        let dateResult = false

        for (let i = 0; i < Object.keys(selectedData).length; i++) {
            if (selectedData[i].sellerRef !== sellerId || selectedData[i].buyerRef !== buyerId) {
                result = true;
                break;
            }
            else {
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
        }

        if (result === true && dateResult === false) {
            this.setState({
                mergeCancelModalMessage: 'در فرآیند ادغام خریدار و فروشنده سند های انتخابی می بایست یکسان باشند.',
                isMergeCancelModalVisible: true,
            })
        }
        else if (result === false && dateResult === true) {
            this.setState({
                mergeCancelModalMessage: 'در فرآیند ادغام تاریخ ثبت سندهای انتخاب شده می بایست در یک سال باشند.',
                isMergeCancelModalVisible: true,
            })
        }
        if (result === true && dateResult === true) {
            this.setState({
                mergeCancelModalMessage: 'در فرآیند ادغام خریدار و فروشنده سند های انتخابی می بایست یکسان باشند.',
                isMergeCancelModalVisible: true,
            })
        }
        else if (result === false && dateResult === false) {
            await this.props.orderToInvoiceMergeResetProps();
            let list = []
            this.state.idList.map(x => {
                list.push({ headerRef: x.id })
            })
            await this.getOrderToInvoiceMergeData(list);
            if (this.props.isOrderMergable === false) {
                this.setState({
                    isMergeCancelModalVisible: true,
                    mergeCancelModalMessage: 'اسناد انتخاب شده به دلیل وجود کالاهایی با قیمت یا واحد اندازه‌گیری متفاوت قابل ادغام نمی باشند',
                })
            }
            else {
                // const selectedNodes = this.gridApi.getSelectedNodes()
                // const selectedData = selectedNodes.map(node => node.data)
                this.setState({
                    isMergeModalVisible: true,
                    isMergeModalDestroy: false,
                    modalComponent: <OrderToInvoiceMerge
                        mergeHeaderRefList={list}
                        latinDateCreated={latinDateCreated}
                        // sellerTitle={selectedData[0].seller}
                        // buyerTitle={selectedData[0].buyer}
                        onCloseMergeModal={this.onCloseMergeModal}
                        showInsertedCodeListModal={this.showInsertedCodeListModal}
                    />
                })
            }
        }


    }
    /* #endregion */

    /* #region  [- onCloseMergeModal -] */
    onCloseMergeModal = () => {
        // await this.props.useRegisteredDocumentsResetProps();
        this.setState({
            isMergeModalVisible: false,
            isMergeModalDestroy: true,
            orderHeaderRef: '',
            latinDateCreated: '',
            idList: [],
        })
        this.props.saveOrderHeaderRef('')
        this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #region  [- orderToQuoteConvert -] */
    orderToQuoteConvert = async () => {
        await this.props.orderToInvoiceConvertResetProps();
        await this.getOrderToQuoteConvertData();
        this.setState({
            isConvertModalVisible: true,
            isConvertModalDestroy: false,
            modalComponent: <OrderToQuoteConvert
                headerRef={this.state.orderHeaderRef}
                latinDateCreated={this.state.latinDateCreated}
                onCloseConvertModal={this.onCloseConvertModal}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
            />
        })
    }
    /* #endregion */

    /* #region  [- orderToQuoteSplit -] */
    orderToQuoteSplit = async () => {
        await this.props.orderToQuoteSplitResetProps();
        await this.getOrderToQuoteSplitData();
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        this.setState({
            isSplitModalVisible: true,
            isSplitModalDestroy: false,
            modalComponent: <OrderToQuoteSplit
                headerRef={this.state.orderHeaderRef}
                latinDateCreated={this.state.latinDateCreated}
                sellerTitle={selectedData[0].seller}
                buyerTitle={selectedData[0].buyer}
                onCloseSplitModal={this.onCloseSplitModal}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
            />
        })
    }
    /* #endregion */

    /* #region  [- orderToQuoteMerge -] */
    orderToQuoteMerge = async () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        let sellerId = selectedData[0].sellerRef
        let buyerId = selectedData[0].buyerRef
        let latinDateCreated = dayjs(selectedData[0].latinDateCreated).calendar("jalali").locale("fa")
        let result = false
        let dateResult = false

        for (let i = 0; i < Object.keys(selectedData).length; i++) {
            if (selectedData[i].sellerRef !== sellerId || selectedData[i].buyerRef !== buyerId) {
                result = true;
                break;
            }
            else {
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
        }

        if (result === true && dateResult === false) {
            this.setState({
                mergeCancelModalMessage: 'در فرآیند ادغام خریدار و فروشنده سند های انتخابی می بایست یکسان باشند.',
                isMergeCancelModalVisible: true,
            })
        }
        else if (result === false && dateResult === true) {
            this.setState({
                mergeCancelModalMessage: 'در فرآیند ادغام تاریخ ثبت سندهای انتخاب شده می بایست در یک سال باشند.',
                isMergeCancelModalVisible: true,
            })
        }
        if (result === true && dateResult === true) {
            this.setState({
                mergeCancelModalMessage: 'در فرآیند ادغام خریدار و فروشنده سند های انتخابی می بایست یکسان باشند.',
                isMergeCancelModalVisible: true,
            })
        }
        else if (result === false && dateResult === false) {
            await this.props.orderToQuoteMergeResetProps();
            let list = []
            this.state.idList.map(x => {
                list.push({ headerRef: x.id })
            })
            await this.getOrderToQuoteMergeData(list);
            if (this.props.isOrderMergable === false) {
                this.setState({
                    isMergeCancelModalVisible: true,
                    mergeCancelModalMessage: 'اسناد انتخاب شده به دلیل وجود کالاهایی با قیمت یا واحد اندازه‌گیری متفاوت قابل ادغام نمی باشند'
                })
            }
            else {
                // const selectedNodes = this.gridApi.getSelectedNodes()
                // const selectedData = selectedNodes.map(node => node.data)
                this.setState({
                    isMergeModalVisible: true,
                    isMergeModalDestroy: false,
                    modalComponent: <OrderToQuoteMerge
                        mergeHeaderRefList={list}
                        latinDateCreated={latinDateCreated}
                        // sellerTitle={selectedData[0].seller}
                        // buyerTitle={selectedData[0].buyer}
                        onCloseMergeModal={this.onCloseMergeModal}
                        showInsertedCodeListModal={this.showInsertedCodeListModal}
                    />
                })
            }
        }


    }
    /* #endregion */

    /* #region  [- orderToOrderCorresponding -] */
    orderToOrderCorresponding = async () => {
        await this.props.orderToOrderCorrespondingResetProps();
        await this.getOrderToOrderCorrespondingData(this.state.orderHeaderRef)
        this.setState({
            isCorrespondingModalVisible: true,
            isCorrespondingModalDestroy: false,
            modalComponent: <OrderToOrderCorresponding
                headerRef={this.state.orderHeaderRef}
                onCloseCorrespondingModal={this.onCloseCorrespondingModal}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
            />
        })
    }
    /* #endregion */

    /* #region  [- onCloseCorrespondingModal -] */
    onCloseCorrespondingModal = () => {
        //await this.props.useRegisteredDocumentsResetProps();
        this.setState({
            isCorrespondingModalVisible: false,
            isCorrespondingModalDestroy: true,
            orderHeaderRef: '',
            latinDateCreated: '',
            idList: [],
        })
        this.props.saveOrderHeaderRef('')
        this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #region  [- orderToOrderMerge -] */
    orderToOrderMerge = async () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        let sellerId = selectedData[0].sellerRef
        let buyerId = selectedData[0].buyerRef
        let latinDateCreated = dayjs(selectedData[0].latinDateCreated).calendar("jalali").locale("fa")
        let result = false
        let dateResult = false

        for (let i = 0; i < Object.keys(selectedData).length; i++) {
            if (selectedData[i].sellerRef !== sellerId || selectedData[i].buyerRef !== buyerId) {
                result = true;
                break;
            }
            else {
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
        }

        if (result === true && dateResult === false) {
            this.setState({
                mergeCancelModalMessage: 'در فرآیند ادغام خریدار و فروشنده سند های انتخابی می بایست یکسان باشند.',
                isMergeCancelModalVisible: true,
            })
        }
        else if (result === false && dateResult === true) {
            this.setState({
                mergeCancelModalMessage: 'در فرآیند ادغام تاریخ ثبت سندهای انتخاب شده می بایست در یک سال باشند.',
                isMergeCancelModalVisible: true,
            })
        }
        if (result === true && dateResult === true) {
            this.setState({
                mergeCancelModalMessage: 'در فرآیند ادغام خریدار و فروشنده سند های انتخابی می بایست یکسان باشند.',
                isMergeCancelModalVisible: true,
            })
        }
        else if (result === false && dateResult === false) {
            let list = []
            this.state.idList.map(x => {
                list.push({ headerRef: x.id })
            })
            await this.props.orderToOrderMergeResetProps();
            await this.getOrderToOrderMergeData(list)
            this.setState({
                isMergeModalVisible: true,
                isMergeModalDestroy: false,
                modalComponent: <OrderToOrderMerge
                    mergeHeaderRefList={list}
                    latinDateCreated={latinDateCreated}
                    onCloseMergeModal={this.onCloseMergeModal}
                    showInsertedCodeListModal={this.showInsertedCodeListModal}
                />
            })
        }

    }
    /* #endregion */

    /* #region  [- onCloseMergeModal -] */
    onCloseMergeModal = () => {
        //await this.props.useRegisteredDocumentsResetProps();
        this.setState({
            isMergeModalVisible: false,
            isMergeModalDestroy: true,
            orderHeaderRef: '',
            latinDateCreated: '',
            idList: [],
        })
        this.props.saveOrderHeaderRef('')
        this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #region  [- orderToOrderSplit -] */
    orderToOrderSplit = async () => {
        await this.props.orderToOrderSplitResetProps();
        await this.getOrderToOrderSplitData(this.state.orderHeaderRef);
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        this.setState({
            isSplitModalVisible: true,
            isSplitModalDestroy: false,
            modalComponent: <OrderToOrderSplit
                headerRef={this.state.orderHeaderRef}
                latinDateCreated={this.state.latinDateCreated}
                sellerTitle={selectedData[0].seller}
                buyerTitle={selectedData[0].buyer}
                onCloseSplitModal={this.onCloseSplitModal}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
            />
        })
    }
    /* #endregion */

    /* #region  [- onCloseMergeCancelModal -] */
    onCloseMergeCancelModal = () => {
        this.setState({
            isMergeCancelModalVisible: false,
            mergeCancelModalMessage: '',
            invoiceHeaderRef: '',
            idList: [],
        })
        this.props.saveOrderHeaderRef('')
        this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handelChangeNewOrderRadioButtons -] */
    handelChangeNewOrderRadioButtons = async (event) => {
        if (event.target.id === '2') {
            this.setState({
                isNewOrderChecked: true,
                isUseFromRegisteredDocumentsChecked: false,
                isUseQuoteFlagChecked: false,
                isUseOrderFlagChecked: false,
                isUseInvoiceFlagChecked: false,
            })
        }
        if (event.target.id === '3') {
            await this.props.useRegisteredDocumentsResetProps();
            this.setState({
                isNewOrderChecked: false,
                isUseFromRegisteredDocumentsChecked: true,
                isUseQuoteFlagChecked: true,
                isUseOrderFlagChecked: false,
                isUseInvoiceFlagChecked: false,
            })
        }
    }
    /* #endregion */

    /* #region  [- handelChangeUseFromRegisteredDocuments -] */
    handelChangeUseFromRegisteredDocuments = (event) => {
        if (event.target.id === '4') {
            this.setState({
                isUseQuoteFlagChecked: true,
                isUseOrderFlagChecked: false,
                isUseInvoiceFlagChecked: false,
            })
        }
        else if (event.target.id === '5') {
            this.setState({
                isUseQuoteFlagChecked: false,
                isUseOrderFlagChecked: true,
                isUseInvoiceFlagChecked: false,
            })
        }
        else if (event.target.id === '6') {
            this.setState({
                isUseQuoteFlagChecked: false,
                isUseOrderFlagChecked: false,
                isUseInvoiceFlagChecked: true,
            })
        }
    }
    /* #endregion */

    /* #region  [- handleChangeAccount -] */
    handleChangeAccount = async (event) => {
        await this.setState({
            [event.target.name]: event.target.value
        })
        this.validateAccountForm();
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getOrderData -] */
    getOrderData = async () => {
        let data = {
            domainRef: this.props.domain
        }
        await this.props.getOrderData(JSON.stringify(data))
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

    /* #region  [- getOrderItemProduct -] */
    getOrderItemProduct = async (params) => {
        let data = {
            orderHeaderRef: params.data.id
        }
        await this.props.getOrderItemProduct(JSON.stringify(data))
        params.successCallback(this.props.orderDetailProductList)
        this.onPinnedRowBottomCount(params);
    }
    /* #endregion */

    /* #region  [- getOrderItemGetData -] */
    getOrderItemGetData = async () => {
        let data = {
            domainRef: this.props.domain,
            orderHeaderRef: this.state.orderHeaderRef
        }

        await this.props.getOrderItemGetData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- deleteOrder-] */
    deleteOrder = async () => {
        let orderDeleteData = {
            domainRef: this.props.domain,
            aspNetUsersRef: this.props.userId,
            orderIdList: this.state.idList
        }
        await this.props.deleteOrder(JSON.stringify(orderDeleteData));
    }
    /* #endregion */

    /* #region  [- getOrderItem -] */
    getOrderItem = async (data) => {
        let orderItemData = {
            domainRef: this.props.domain,
            orderHeaderRef: data.id
        }

        await this.props.getOrderItem(JSON.stringify(orderItemData))
    }
    /* #endregion */

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

    /* #region  [- getQuoteAccountTitle -] */
    getQuoteAccountTitle = async () => {
        let data = {
            domainRef: this.props.domain
        }

        await this.props.getQuoteAccountTitle(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getQuoteByAccount -] */
    getQuoteByAccount = async () => {
        let data = {
            domainRef: this.props.domain,
            type:2,
            accountBuyerRef: this.state.accountBuyerRef * 1,
            accountSellerRef: this.state.accountSellerRef * 1,
        }
        await this.props.getQuoteByAccount(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getOrderAccountTitle -] */
    getOrderAccountTitle = async () => {
        let data = {
            domainRef: this.props.domain
        }

        await this.props.getOrderAccountTitle(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getOrderByAccount -] */
    getOrderByAccount = async () => {
        let data = {
            domainRef: this.props.domain,
            type:2,
            accountBuyerRef: this.state.accountBuyerRef * 1,
            accountSellerRef: this.state.accountSellerRef * 1,
        }
        await this.props.getOrderByAccount(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getInvoiceAccountTitle -] */
    getInvoiceAccountTitle = async () => {
        let data = {
            domainRef: this.props.domain
        }

        await this.props.getInvoiceAccountTitle(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getInvoiceByAccount -] */
    getInvoiceByAccount = async () => {
        let data = {
            domainRef: this.props.domain,
            type:2,
            accountBuyerRef: this.state.accountBuyerRef * 1,
            accountSellerRef: this.state.accountSellerRef * 1,
        }
        await this.props.getInvoiceByAccount(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getOrderToInvoiceConvertData -] */
    getOrderToInvoiceConvertData = async () => {
        let data = {
            headerRef: this.state.orderHeaderRef
        }
        await this.props.getOrderToInvoiceConvertData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getOrderToInvoiceMergeData -] */
    getOrderToInvoiceMergeData = async (list) => {
        // let list = []
        // this.state.idList.map(x => {
        //     list.push({ headerRef: x.id })
        // })
        let data = {
            domainRef: this.props.domain,
            mergeHeaderRefList: list
        }
        await this.props.getOrderToInvoiceMergeData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getOrderToInvoiceSplitData -] */
    getOrderToInvoiceSplitData = async () => {
        let data = {
            orderHeaderRef: this.state.orderHeaderRef
        }
        await this.props.getOrderToInvoiceSplitData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getOrderToQuoteConvertData -] */
    getOrderToQuoteConvertData = async () => {
        let data = {
            headerRef: this.state.orderHeaderRef
        }
        await this.props.getOrderToQuoteConvertData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getOrderToQuoteSplitData -] */
    getOrderToQuoteSplitData = async () => {
        let data = {
            orderHeaderRef: this.state.orderHeaderRef
        }
        await this.props.getOrderToQuoteSplitData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getOrderToQuoteMergeData -] */
    getOrderToQuoteMergeData = async (list) => {

        let data = {
            domainRef: this.props.domain,
            mergeHeaderRefList: list
        }
        await this.props.getOrderToQuoteMergeData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getOrderToOrderCorrespondingData -] */
    getOrderToOrderCorrespondingData = async (orderHeaderRef) => {
        let data = {
            headerRef: orderHeaderRef
        }
        await this.props.getOrderToOrderCorrespondingData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getOrderToOrderMergeData -] */
    getOrderToOrderMergeData = async (list) => {
        let data = {
            domainRef: this.props.domain,
            mergeHeaderRefList: list
        }
        await this.props.getOrderToOrderMergeData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getOrderToOrderSplitData -] */
    getOrderToOrderSplitData = async (orderHeaderRef) => {
        let data = {
            orderHeaderRef: orderHeaderRef
        }
        await this.props.getOrderToOrderSplitData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getQuoteToOrderConvertData -] */
    getQuoteToOrderConvertData = async (quoteHeaderRef) => {
        let data = {
            headerRef: quoteHeaderRef
        }
        await this.props.getQuoteToOrderConvertData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getQuoteToOrderSplitData -] */
    getQuoteToOrderSplitData = async (quoteHeaderRef) => {
        let data = {
            headerRef: quoteHeaderRef
        }
        await this.props.getQuoteToOrderSplitData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getQuoteToOrderMergeData -] */
    getQuoteToOrderMergeData = async (list) => {
        let data = {
            domainRef: this.props.domain,
            mergeHeaderRefList: list
        }
        await this.props.getQuoteToOrderMergeData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getInvoiceToOrderConvertData -] */
    getInvoiceToOrderConvertData = async (quoteHeaderRef) => {
        let data = {
            headerRef: quoteHeaderRef
        }
        await this.props.getInvoiceToOrderConvertData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getInvoiceToOrderSplitData -] */
    getInvoiceToOrderSplitData = async (quoteHeaderRef) => {
        let data = {
            headerRef: quoteHeaderRef
        }
        await this.props.getInvoiceToOrderSplitData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getInvoiceToOrderMergeData -] */
    getInvoiceToOrderMergeData = async (list) => {
        let data = {
            domainRef: this.props.domain,
            mergeHeaderRefList: list
        }
        await this.props.getInvoiceToOrderMergeData(JSON.stringify(data))
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {

        const localText = AG_GRID_LOCALE_FA;

        return (
            <Container fluid style={{ margin: '0', padding: '0',overflowX: "hidden",overflowY:'scroll'  }}>

                <Row name="row_01_Buttons" >

                    <Col hidden={this.state.isInvoiceButtonRowHidden === true && this.state.isQuoteButtonRowHidden === true ? true : false} sm="3" md="3" lg="1" style={{ paddingLeft: '0' }}>

                        <Button style={{
                            backgroundColor: '#eceff1',
                            color: '#b3b5b7',
                            pointerEvents: 'none',
                            borderColor: '#eceff1',
                        }}>سفارش</Button>

                    </Col>
                    <Col sm="9" md="9" lg="10" style={{ textAlign: 'right', paddingRight: this.state.isInvoiceButtonRowHidden === true && this.state.isQuoteButtonRowHidden === true ? '0.8%' : '0' }}>

                        <Button className='submit-button-style mr-2' onClick={this.new} hidden={this.state.isNewHidden} >جدید</Button>
                        <Button className='submit-button-style mr-2' onClick={this.edit} disabled={this.state.isEditDisabled} hidden={this.state.isEditHidden}>ویرایش</Button>
                        <Button className='submit-button-style mr-2' disabled={this.state.isDeleteDisabled} onClick={this.delete} hidden={this.state.isDeleteHidden}>حذف</Button>
                        <Button className='submit-button-style mr-2' disabled={this.state.isOrderToOrderSplitDisabled} onClick={this.orderToOrderSplit} hidden={this.state.isOrderToOrderSplitHidden}>تفکیک</Button>
                        <Button className='submit-button-style mr-2' disabled={this.state.isOrderToOrderMergeDisabled} onClick={this.orderToOrderMerge} hidden={this.state.isOrderToOrderMergeHidden} >ادغام</Button>
                        <Button className='submit-button-style mr-2' disabled={this.state.isOrderToOrderCorrespondingDisabled} onClick={this.orderToOrderCorresponding} hidden={this.state.isOrderToOrderCorrespondingHidden}>سند متناظر</Button>
                        <Button className='submit-button-style mr-2' disabled={true} hidden={this.state.isSubmitAsTemplateHidden} >ثبت به عنوان الگو</Button>
                        <Button className='submit-button-style mr-2' disabled={this.state.isArchiveDisabled} hidden={this.state.isArchiveHidden}>آرشیو</Button>
                        <Button className='submit-button-style mr-2' onClick={this.refresh} >بازیابی</Button>
                    </Col>

                </Row>
                <hr hidden={this.state.isInvoiceButtonRowHidden} />
                <Row name="row_02_Buttons" hidden={this.state.isInvoiceButtonRowHidden}>

                    <Col sm="3" md="3" lg="1" style={{ paddingLeft: '0' }}>

                        <Button style={{
                            backgroundColor: '#eceff1',
                            color: '#b3b5b7',
                            pointerEvents: 'none',
                            borderColor: '#eceff1',
                        }}>فاکتور</Button>

                    </Col>
                    <Col sm="9" md="9" lg="11" style={{ textAlign: 'right', paddingRight: '0' }}>
                        <Button className='submit-button-style mr-2' onClick={this.orderToInvoiceConvert} disabled={this.state.isOrderToInvoiceConvertDisabled} hidden={this.state.isOrderToInvoiceConvertHidden}>تبدیل</Button>
                        <Button className='submit-button-style mr-2' onClick={this.orderToInvoiceSplit} disabled={this.state.isOrderToInvoiceSplitDisabled} hidden={this.state.isOrderToInvoiceSplitHidden}>تفکیک</Button>
                        <Button className='submit-button-style mr-2' onClick={this.orderToInvoiceMerge} disabled={this.state.isOrderToInvoiceMergeDisabled} hidden={this.state.isOrderToInvoiceMergeHidden}>ادغام</Button>
                    </Col>

                </Row>

                <hr hidden={this.state.isQuoteButtonRowHidden} />
                <Row name="row_03_Buttons" hidden={this.state.isQuoteButtonRowHidden}>

                    <Col sm="3" md="3" lg="1" style={{ paddingLeft: '0' }}>

                        <Button style={{
                            backgroundColor: '#eceff1',
                            color: '#b3b5b7',
                            pointerEvents: 'none',
                            borderColor: '#eceff1',
                        }}>پیش فاکتور</Button>

                    </Col>
                    <Col sm="9" md="9" lg="11" style={{ textAlign: 'right', paddingRight: '0' }}>
                        <Button className='submit-button-style mr-2' disabled={this.state.isOrderToQuoteConvertDisabled} onClick={this.orderToQuoteConvert} hidden={this.state.isOrderToQuoteConvertHidden}>تبدیل</Button>
                        <Button className='submit-button-style mr-2' disabled={this.state.isOrderToQuoteSplitDisabled} onClick={this.orderToQuoteSplit} hidden={this.state.isOrderToQuoteSplitHidden}>تفکیک</Button>
                        <Button className='submit-button-style mr-2' disabled={this.state.isOrderToQuoteMergeDisabled} onClick={this.orderToQuoteMerge} hidden={this.state.isOrderToQuoteMergeHidden}>ادغام</Button>
                    </Col>
                </Row>

                <Row name="row_02_Grid">

                    <Col sm="12" md="12" lg="12" className="ag-theme-alpine" style={{ height: '60vh', width: '100%', marginTop: '2%',marginBottom:'5%' }}>
                        <AgGridReact
                            gridOptions={this.state.gridOptions}
                            onGridReady={this.onGridReady}
                            masterDetail={true}
                            detailCellRendererParams={this.state.detailCellRendererParams}
                            columnDefs={this.state.columnDefs}
                            rowData={this.props.orderList}
                            enableRtl={true}
                            rowSelection='multiple'
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={localText}
                            defaultColDef={this.state.defaultColDef}
                          //  detailRowHeight={500}
                        >
                        </AgGridReact>
                    </Col>


                </Row>

                <Row name="row_03_Modal">

                    <Modal name="newModal"
                        visible={this.state.isNewModalVisible}
                        destroyOnClose={this.state.isNewModalDestroy}
                        bodyStyle={{ padding: '0px' }}
                        onCancel={this.onCancelNew}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.onCancelNew}>
                                لغو
                            </Button>,
                            <Button key='2' className='submit-button-style' onClick={this.approve}>
                                تایید
                            </Button>,
                        ]}
                    >
                        <Container fluid>

                            <Row name='row_01_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>سفارش جدید</span>
                                </Col>
                            </Row>

                            <Row name='row_02_Modal_Content'>
                                <Col sm='12' md='12' lg='12' style={{ textAlign: 'right' }}>
                                    <Form>
                                        <br />
                                        <FormGroup >

                                            <Label name="useTemplate" style={{ marginRight: '15%' }} check>

                                                <Input
                                                    type="radio"
                                                    id="1"
                                                    value="useTemplate"
                                                    name="new"
                                                    disabled={true}
                                                    onChange={this.handelChangeNewOrderRadioButtons}
                                                />{' '} استفاده از الگو

                                            </Label>


                                        </FormGroup>
                                        <br />
                                        <FormGroup >

                                            <Label name="newOrder" style={{ marginRight: '15%' }} check>

                                                <Input
                                                    type="radio"
                                                    id="2"
                                                    value="newOrder"
                                                    name="new"
                                                    checked={this.state.isNewOrderChecked}
                                                    onChange={this.handelChangeNewOrderRadioButtons} />
                                                سفارش جدید

                                            </Label>

                                        </FormGroup>
                                        <br />
                                        <FormGroup >

                                            <Label name="useFromRegisteredDocuments" style={{ marginRight: '15%' }} check>

                                                <Input
                                                    type="radio"
                                                    id="3"
                                                    value="useFromRegisteredDocuments"
                                                    name="new"
                                                    checked={this.state.isUseFromRegisteredDocumentsChecked}
                                                    onChange={this.handelChangeNewOrderRadioButtons}
                                                />
                                                استفاده از اسناد ثبت شده

                                            </Label>

                                            <FormGroup name='useFromRegisteredDocuments' style={{ paddingRight: '20%' }} hidden={!this.state.isUseFromRegisteredDocumentsChecked}>

                                                <Label name="order" check >

                                                    <Input
                                                        type="radio"
                                                        id="4"
                                                        value="order"
                                                        name="useFromRegisteredDocuments"
                                                        checked={this.state.isUseQuoteFlagChecked}
                                                        onChange={this.handelChangeUseFromRegisteredDocuments} />پیش فاکتور</Label>
                                                <br />
                                                <Label name="order" check>

                                                    <Input
                                                        type="radio"
                                                        id="5"
                                                        value="order"
                                                        name="useFromRegisteredDocuments"
                                                        checked={this.state.isUseOrderFlagChecked}
                                                        onChange={this.handelChangeUseFromRegisteredDocuments} />سفارش</Label>
                                                <br />
                                                <Label name="invoice" check>

                                                    <Input
                                                        type="radio"
                                                        id="6"
                                                        value="invoice"
                                                        name="useFromRegisteredDocuments"
                                                        checked={this.state.isUseInvoiceFlagChecked}
                                                        onChange={this.handelChangeUseFromRegisteredDocuments}
                                                    />فاکتور</Label>

                                            </FormGroup>

                                        </FormGroup>
                                        <br />
                                    </Form>
                                </Col>
                            </Row>

                        </Container>
                    </Modal>

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

                    <Modal name='seen'
                        visible={this.state.isSeenModalVisible}
                        width={1000}
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
                        width={1000}
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

                    <Modal name='selectAccount'
                        visible={this.state.isSelectAccountModalVisible}
                        destroyOnClose={this.state.isSelectAccountModalDestroy}
                        width={500}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseSelectAccountModal}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.onCloseSelectAccountModal}>لغو</Button>,
                            <Button key='2' className='submit-button-style' onClick={this.submitAccount} disabled={this.state.isAccountSubmitButtonDisabled}>تایید</Button>
                        ]}
                    >
                        <Container fluid>

                            <Row name='row_03_Modal_Header' className='modal-header-row'>
                                <Col className='modal-header-col'>
                                    <span className='modal-header-title'>سفارش جدید</span>
                                </Col>
                            </Row>

                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' className='modal-content-col'>


                                    <Form name='accountBuyerRef' style={{ margin: '4% 5% 25% 5%' }}>

                                        <FormGroup name='accountBuyerRef' style={{ textAlign: 'right' }}>
                                            <Label for="accountBuyerRef">انتخاب خریدار</Label>
                                            <Input
                                                type="select"
                                                name="accountBuyerRef"
                                                id="accountBuyerRef"
                                                onChange={this.handleChangeAccount}
                                                value={this.state.accountBuyerRef}
                                            >
                                                <option value="">انتخاب کنید ...</option>
                                                {this.state.accountBuyerTitleList}
                                            </Input>
                                        </FormGroup>

                                        <FormGroup name='accountSellerRef' style={{ textAlign: 'right' }}>
                                            <Label for="accountSellerRef">انتخاب فروشنده</Label>
                                            <Input
                                                type="select"
                                                name="accountSellerRef"
                                                id="accountSellerRef"
                                                onChange={this.handleChangeAccount}
                                                value={this.state.accountSellerRef}
                                            >
                                                <option value="">انتخاب کنید ...</option>
                                                {this.state.accountSellerTitleList}
                                            </Input>
                                        </FormGroup>

                                    </Form>

                                </Col>
                            </Row>

                        </Container>

                    </Modal>

                    <Modal name='useRegisteredDocs'
                        visible={this.state.isUseRegisteredDocumentsModalVisible}
                        destroyOnClose={this.state.isUseRegisteredDocumentsModalDestroy}
                        width={900}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseUseRegisteredDocumentsModal}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.onCloseUseRegisteredDocumentsModal}>لغو</Button>

                        ]}
                    >
                        <Container fluid>

                            <Row name='row_03_Modal_Header' className='modal-header-row'>
                                <Col className='modal-header-col'>
                                    <span className='modal-header-title'>{this.state.newRegisteredDocumentsModalTitle}</span>
                                </Col>
                            </Row>

                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' className='modal-content-col'>
                                    {this.state.modalComponent}
                                </Col>
                            </Row>

                        </Container>

                    </Modal>

                    <Modal name='newOrderSplit'
                        visible={this.state.isNewOrderSplitModalVisible}
                        destroyOnClose={this.state.isNewOrderSplitModalDestroy}
                        width={1000}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseNewOrderSplitModal}
                        footer={null}
                    >
                        <Container fluid>

                            <Row name='row_03_Modal_Header' className='modal-header-row'>
                                <Col className='modal-header-col'>
                                    <span className='modal-header-title'>{this.state.useRegisteredDocumentsModalTitle}</span>
                                </Col>
                            </Row>

                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' className='modal-content-col'>
                                    {this.state.modalComponent}
                                </Col>
                            </Row>

                        </Container>

                    </Modal>

                    <Modal name='InsertedCode'
                        visible={this.state.isInsertedCodeListModalVisible}
                        destroyOnClose={this.state.isInsertedCodeListModalDestroy}
                        width={500}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseInsertedCodeListModal}
                        footer={[
                            <Button key='1' className='submit-button-style' onClick={this.onCloseInsertedCodeListModal}>متوجه شدم</Button>,
                        ]}
                    >
                        <Container fluid>

                            <Row name='row_03_Modal_Header' className='modal-header-row'>
                                <Col className='modal-header-col'>
                                    <span className='modal-header-title'> {this.state.insertedCodeModalTitle}</span>
                                </Col>
                            </Row>

                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' className='modal-content-col'>


                                    <Form name='insertedIdList' style={{ margin: '4% 5% 25% 5%' }}>

                                        <FormGroup name='insertedIdList' style={{ textAlign: 'right' }}>

                                            {this.props.insertedCodeList.map((el) => (
                                                <ul key={el.code} style={{ textAlign: 'right', direction: 'left' }}>
                                                    <li >
                                                        {this.renderCode(el.code)}
                                                    </li>
                                                </ul>
                                            ))}
                                        </FormGroup>

                                    </Form>

                                </Col>
                            </Row>

                        </Container>

                    </Modal>

                    <Modal name='newOrderCorresponding'
                        visible={this.state.isNewOrderCorrespondingModalVisible}
                        destroyOnClose={this.state.isNewOrderCorrespondingModalDestroy}
                        width={1000}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseNewOrderCorrespondingModal}
                        footer={null}
                    >
                        <Container fluid>

                            <Row name='row_03_Modal_Header' className='modal-header-row'>
                                <Col className='modal-header-col'>
                                    <span className='modal-header-title'>{this.state.useRegisteredDocumentsModalTitle}</span>
                                </Col>
                            </Row>

                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' className='modal-content-col'>
                                    {this.state.modalComponent}
                                </Col>
                            </Row>

                        </Container>

                    </Modal>

                    <Modal name='newOrderConvert'
                        visible={this.state.isNewOrderConvertModalVisible}
                        destroyOnClose={this.state.isNewOrderConvertModalDestroy}
                        width={1000}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseNewOrderConvertModal}
                        footer={null}
                    >
                        <Container fluid>

                            <Row name='row_03_Modal_Header' className='modal-header-row'>
                                <Col className='modal-header-col'>
                                    <span className='modal-header-title'>{this.state.useRegisteredDocumentsModalTitle}</span>
                                </Col>
                            </Row>

                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' className='modal-content-col'>
                                    {this.state.modalComponent}
                                </Col>
                            </Row>

                        </Container>

                    </Modal>

                    <Modal name='newOrderMerge'
                        visible={this.state.isNewOrderMergeModalVisible}
                        destroyOnClose={this.state.isNewOrderMergeModalDestroy}
                        width={1000}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseNewOrderMergeModal}
                        footer={null}
                    >
                        <Container fluid>

                            <Row name='row_03_Modal_Header' className='modal-header-row'>
                                <Col className='modal-header-col'>
                                    <span className='modal-header-title'>{this.state.useRegisteredDocumentsModalTitle}</span>
                                </Col>
                            </Row>

                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' className='modal-content-col'>
                                    {this.state.modalComponent}
                                </Col>
                            </Row>

                        </Container>

                    </Modal>

                    <Modal name='convert'
                        visible={this.state.isConvertModalVisible}
                        destroyOnClose={this.state.isConvertModalDestroy}
                        width={1000}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseConvertModal}
                        footer={null}
                    >
                        <Container fluid>

                            <Row name='row_03_Modal_Header' className='modal-header-row'>
                                <Col className='modal-header-col'>
                                    <span className='modal-header-title'>فرآیند تبدیل</span>
                                </Col>
                            </Row>

                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' className='modal-content-col'>
                                    {this.state.modalComponent}
                                </Col>
                            </Row>

                        </Container>

                    </Modal>

                    <Modal name='split'
                        visible={this.state.isSplitModalVisible}
                        destroyOnClose={this.state.isSplitModalDestroy}
                        width={1000}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseSplitModal}
                        footer={null}
                    >
                        <Container fluid>

                            <Row name='row_03_Modal_Header' className='modal-header-row'>
                                <Col className='modal-header-col'>
                                    <span className='modal-header-title'>فرآیند تفکیک</span>
                                </Col>
                            </Row>

                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' className='modal-content-col'>
                                    {this.state.modalComponent}
                                </Col>
                            </Row>

                        </Container>

                    </Modal>

                    <Modal name='merge'
                        visible={this.state.isMergeModalVisible}
                        destroyOnClose={this.state.isMergeModalDestroy}
                        width={1000}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseMergeModal}
                        footer={null}
                    >
                        <Container fluid>

                            <Row name='row_03_Modal_Header' className='modal-header-row'>
                                <Col className='modal-header-col'>
                                    <span className='modal-header-title'>فرآیند ادغام</span>
                                </Col>
                            </Row>

                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' className='modal-content-col'>
                                    {this.state.modalComponent}
                                </Col>
                            </Row>

                        </Container>

                    </Modal>

                    <Modal name='corresponding'
                        visible={this.state.isCorrespondingModalVisible}
                        destroyOnClose={this.state.isCorrespondingModalDestroy}
                        width={1000}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseCorrespondingModal}
                        footer={null}
                    >
                        <Container fluid>

                            <Row name='row_03_Modal_Header' className='modal-header-row'>
                                <Col className='modal-header-col'>
                                    <span className='modal-header-title'>فرآیند ایجاد سند متناظر</span>
                                </Col>
                            </Row>

                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' className='modal-content-col'>
                                    {this.state.modalComponent}
                                </Col>
                            </Row>

                        </Container>

                    </Modal>

                    <Modal name='error'
                        visible={this.state.isMergeCancelModalVisible}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseMergeCancelModal}
                        footer={[
                            <Button key='2' className='submit-button-style' onClick={this.onCloseMergeCancelModal}>متوجه شدم</Button>
                        ]}
                    >

                        <Container fluid>
                            <Row name='header' className='modal-header-row mb-2'>
                                <Col className='modal-header-col'>
                                    <p className='modal-header-title'>لغو فرآیند ادغام</p>
                                </Col>
                            </Row>

                            <Row name='content' style={{ marginBottom: '3%' }}>
                                <Col sm='12' className='modal-content-col'>
                                    <p>
                                        {this.state.mergeCancelModalMessage}

                                    </p>
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
        userId: state.auth.userId,
        orderList: state.order.orderList,
        orderDetailProductList: state.order.orderDetailProductList,
        message: state.order.message,

        insertedCodeList: state.order.insertedCodeList,
        quoteAccountBuyerTitleList: state.order.quoteAccountBuyerTitleList,
        quoteAccountSellerTitleList: state.order.quoteAccountSellerTitleList,
        orderAccountBuyerTitleList: state.order.orderAccountBuyerTitleList,
        orderAccountSellerTitleList: state.order.orderAccountSellerTitleList,
        invoiceAccountBuyerTitleList: state.order.invoiceAccountBuyerTitleList,
        invoiceAccountSellerTitleList: state.order.invoiceAccountSellerTitleList,
        isOrderMergable: state.order.isOrderMergable,
        userMenuAccessList: state.auth.userMenuAccessList,
        isInvoiceMergable: state.order.isInvoiceMergable,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getOrderData: (data) => dispatch(getOrderData(data)),
    resetNewOrderProps: (data) => dispatch(resetNewOrderProps(data)),
    getOrder: (data) => dispatch(getOrder(data)),
    getOrderItemProduct: (data) => dispatch(getOrderItemProduct(data)),
    deleteOrder: (data) => dispatch(deleteOrder(data)),
    resetMessage: () => dispatch(resetMessage()),
    getOrderItemGetData: (data) => dispatch(getOrderItemGetData(data)),
    saveOrderHeaderRef: (data) => dispatch(saveOrderHeaderRef(data)),
    getOrderItem: (data) => dispatch(getOrderItem(data)),
    resetEditOrderProps: (data) => dispatch(resetEditOrderProps(data)),
    getPrintOrderItem: (data) => dispatch(getPrintOrderItem(data)),
    getSeenOrderItem: (data) => dispatch(getSeenOrderItem(data)),
    useRegisteredDocumentsResetProps: (data) => dispatch(useRegisteredDocumentsResetProps(data)),
    getQuoteAccountTitle: (data) => dispatch(getQuoteAccountTitle(data)),
    getQuoteByAccount: (data) => dispatch(getQuoteByAccount(data)),
    getOrderAccountTitle: (data) => dispatch(getOrderAccountTitle(data)),
    getOrderByAccount: (data) => dispatch(getOrderByAccount(data)),
    getInvoiceAccountTitle: (data) => dispatch(getInvoiceAccountTitle(data)),
    getInvoiceByAccount: (data) => dispatch(getInvoiceByAccount(data)),
    getOrderToInvoiceConvertData: (data) => dispatch(getOrderToInvoiceConvertData(data)),
    orderToInvoiceConvertResetProps: (data) => dispatch(orderToInvoiceConvertResetProps(data)),
    orderToInvoiceSplitResetProps: (data) => dispatch(orderToInvoiceSplitResetProps(data)),
    orderToInvoiceMergeResetProps: (data) => dispatch(orderToInvoiceMergeResetProps(data)),
    getOrderToInvoiceMergeData: (data) => dispatch(getOrderToInvoiceMergeData(data)),
    getOrderToInvoiceSplitData: (data) => dispatch(getOrderToInvoiceSplitData(data)),
    getOrderToQuoteConvertData: (data) => dispatch(getOrderToQuoteConvertData(data)),
    orderToQuoteConvertResetProps: (data) => dispatch(orderToQuoteConvertResetProps(data)),
    getOrderToQuoteSplitData: (data) => dispatch(getOrderToQuoteSplitData(data)),
    orderToQuoteSplitResetProps: (data) => dispatch(orderToQuoteSplitResetProps(data)),
    getOrderToQuoteMergeData: (data) => dispatch(getOrderToQuoteMergeData(data)),
    orderToQuoteMergeResetProps: (data) => dispatch(orderToQuoteMergeResetProps(data)),
    orderToOrderCorrespondingResetProps: (data) => dispatch(orderToOrderCorrespondingResetProps(data)),
    getOrderToOrderCorrespondingData: (data) => dispatch(getOrderToOrderCorrespondingData(data)),
    orderToOrderMergeResetProps: (data) => dispatch(orderToOrderMergeResetProps(data)),
    getOrderToOrderMergeData: (data) => dispatch(getOrderToOrderMergeData(data)),
    orderToOrderSplitResetProps: (data) => dispatch(orderToOrderSplitResetProps(data)),
    getOrderToOrderSplitData: (data) => dispatch(getOrderToOrderSplitData(data)),

    getQuoteToOrderConvertData: (data) => dispatch(getQuoteToOrderConvertData(data)),
    quoteToOrderConvertResetProps: (data) => dispatch(quoteToOrderConvertResetProps(data)),
    getQuoteToOrderSplitData: (data) => dispatch(getQuoteToOrderSplitData(data)),
    quoteToOrderSplitResetProps: (data) => dispatch(quoteToOrderSplitResetProps(data)),
    quoteToOrderergeResetProps: (data) => dispatch(quoteToOrderergeResetProps(data)),
    getQuoteToOrderMergeData: (data) => dispatch(getQuoteToOrderMergeData(data)),

    getInvoiceToOrderConvertData: (data) => dispatch(getInvoiceToOrderConvertData(data)),
    invoiceToOrderConvertResetProps: (data) => dispatch(invoiceToOrderConvertResetProps(data)),
    getInvoiceToOrderSplitData: (data) => dispatch(getInvoiceToOrderSplitData(data)),
    invoiceToOrderSplitResetProps: (data) => dispatch(invoiceToOrderSplitResetProps(data)),
    invoiceToOrderergeResetProps: (data) => dispatch(invoiceToOrderergeResetProps(data)),
    getInvoiceToOrderMergeData: (data) => dispatch(getInvoiceToOrderMergeData(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Operation);