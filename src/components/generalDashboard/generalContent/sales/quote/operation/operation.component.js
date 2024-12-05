/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Modal } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import {
    getQuoteData, resetNewQuoteProps, resetEditQuoteProps, getSeenQuoteItem,
    getQuote, getQuoteItemGetData, saveQuoteHeaderRef,
    deleteQuote, getPrintQuoteItem, getQuoteAccountTitle,
    getQuoteByAccount, useRegisteredDocumentsResetProps, getOrderAccountTitle, getOrderByAccount,
    getInvoiceAccountTitle, getInvoiceByAccount, getQuoteToOrderConvertData, convertResetProps, getQuoteToOrderSplitData, splitResetProps,
    mergeResetProps, getQuoteToOrderMergeData, getQuoteItemProduct
}
    from '../../../../../../redux/sales/quote/quote/quote.action'
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
//import Notification from '../../../../../shared/common/notification/notification.component';
import GridSeenButton from './gridSeenButton.component'
import Seen from './seen/seen.component'
import Print from './print/print.component'
import GridPrintButton from './gridPrintButton.component'
import Quote from './newQuote/useRegisteredDocuments/quote/quote.component'
import NewQuoteToQuoteSplit from './newQuote/useRegisteredDocuments/quote/split/split.component'
import NewQuoteToQuoteCorresponding from './newQuote/useRegisteredDocuments/quote/corresponding/corresponding.component'
import NewQuoteToQuoteMerge from './newQuote/useRegisteredDocuments/quote/merge/merge.component'
import Order from './newQuote/useRegisteredDocuments/order/order.component'
import NewOrderToQuoteSplit from './newQuote/useRegisteredDocuments/order/split/split.component'
import NewOrderToQuoteCorresponding from './newQuote/useRegisteredDocuments/order/corresponding/corresponding.component'
import NewOrderToQuoteMerge from './newQuote/useRegisteredDocuments/order/merge/merge.component'
import Invoice from './newQuote/useRegisteredDocuments/invoice/invoice.component'
import NewInvoiceToQuoteCorresponding from './newQuote/useRegisteredDocuments/invoice/corresponding/corresponding.component'
import Convert from './convert/convert.component'
import Split from './split/split.component'
import Merge from './merge/merge.component'
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
            isNewModalDestroy: true,
            isEditDisabled: true,
            isDeleteDisabled: true,
            isConvertDisabled: true,
            isMergeDisabled: true,
            isSplitDisabled: true,
            isArchiveDisabled: true,
            isNewQuoteChecked: true,
            isUseFromRegisteredDocumentsChecked: false,
            isDeleteModalVisible: false,
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

            isNewQuoteSplitModalVisible: false,
            isNewQuoteSplitModalDestroy: true,

            isInsertedCodeListModalVisible: false,
            isInsertedCodeListModalDestroy: true,

            isNewQuoteCorrespondingModalVisible: false,
            isNewQuoteCorrespondingModalDestroy: true,

            isNewQuoteMergeModalVisible: false,
            isNewQuoteMergeModalDestroy: true,

            isConvertModalVisible: false,
            isConvertModalDestroy: true,

            isSplitModalVisible: false,
            isSplitModalDestroy: true,

            isMergeModalVisible: false,
            isMergeModalDestroy: true,



            isNewHidden: true,
            isEditHidden: true,
            isDeleteHidden: true,
            isConvertHidden: true,
            isMergeHidden: true,
            isSplitHidden: true,

            isErrorModalVisible: false,

            /* #endregion */

            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    // cellRenderer: this.cellRenderer,
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row",
                    valueGetter: "node.rowIndex+1",
                    cellRenderer: "agGroupCellRenderer",

                },
                {headerName: 'کد', field: "code",valueGetter: this.codeValueGetter},
                { headerName: 'کد مرجع', field: "referenceCode", valueGetter: this.referenceCodeValueGetter, },
                { headerName: ' تاریخ پیش فاکتور', field: "nativeDateQuote" },
                { headerName: ' پرینت', field: "print", cellRenderer: "gridPrintButton", width: 150 },
                { headerName: 'خریدار', field: "buyer", },
                { headerName: 'فروشنده', field: "seller", },
                { headerName: 'مبلغ کل پیش فاکتور', field: "quotePrice", valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ کل اضافات', field: "quoteAdditions", valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ کل کسورات', field: "quoteDeductions", valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ قابل پرداخت', field: "quotePayablePrice", valueFormatter: this.currencyFormatter, },
                { headerName: 'جزییات', field: "seen", cellRenderer: "gridSeenButton", width: 150 },
                { headerName: 'شماره سریال', field: "serialNumber" },
                { headerName: "تاریخ ثبت", field: "nativeDateCreated" },
                { headerName: "latinDateCreated", field: "latinDateCreated",sort:'desc' ,hide:true},
                { headerName: 'توضیحات', field: "descriptionRow" },
            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            gridOptions: {
                context: { componentParent: this },
                frameworkComponents: {
                    gridSeenButton: GridSeenButton,
                    gridPrintButton: GridPrintButton,

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
                        { headerName: 'اضافات', field: "quoteAdditions", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                        { headerName: 'کسورات', field: "quoteDeductions", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                        { headerName: 'مبلغ کل', field: "finalPrice", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                        { headerName: 'توضیحات', field: "descriptionRow" },
                    ],
                    enableRtl: 'true',
                    pinnedBottomRowData: '',
                    frameworkComponents: { customPinnedRowRenderer: CustomPinnedRowRenderer },
                    
                },
                getDetailRowData: (params) => { this.getQuoteItemProduct(params) },

            },
            /* #endregion */

            /* #region  [- componentFields] */
            quoteHeaderRef: '',
            latinDateCreated: '',
            modalComponent: <div></div>,
            accountBuyerRef: '',
            accountSellerRef: '',
            useRegisteredDocumentsModalTitle: '',
            newRegisteredDocumentsModalTitle: '',
            insertedCodeModalTitle: '',
            errorMessage: '',

            /* #endregion */

            /* #region  [- list -] */
            idList: [],
            accountBuyerTitleList: [],
            accountSellerTitleList: [],
            /* #endregion */
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    async componentDidMount() {
        await this.accessToMenu(this.props.userMenuAccessList);
        this.getQuote()
    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("399")) {
            this.setState({
                isNewHidden: false
            })
        }
        if (data.includes("407")) {
            this.setState({
                isEditHidden: false
            })
        }
        if (data.includes("410")) {
            this.setState({
                isDeleteHidden: false
            })
        }
        if (data.includes("485")) {
            this.setState({
                isConvertHidden: false
            })
        }
        if (data.includes("483")) {
            this.setState({
                isMergeHidden: false
            })
        }
        if (data.includes("484")) {
            this.setState({
                isSplitHidden: false
            })
        }
    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
    };
    /* #endregion */

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
        let quoteAdditions = 0
        let quoteDeductions = 0
        let finalPrice = 0
        this.props.quoteDetailProductList.map(x => {
            unitPrice = unitPrice + x.unitPrice
            quantity = quantity + x.quantity
            price = price + x.price
            quoteAdditions = quoteAdditions + x.quoteAdditions
            quoteDeductions = quoteDeductions + x.quoteDeductions
            finalPrice = finalPrice + x.finalPrice
        })

        result.push({
            code: '---',
            title: '---',
            scaleTitle: '---',
            unitPrice: unitPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
            quantity: quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
            price: price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
            quoteAdditions: quoteAdditions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
            quoteDeductions: quoteDeductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
            finalPrice: finalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
            supplyChainTitle: '---',
            productCategoryTitle: '---',
            descriptionRow: '---',
        });


        return result;
    }
    /* #endregion */

    /* #region  [- cellRenderer -] */
    cellRenderer = params => {

        return (params.node.rowIndex + 1).toLocaleString('fa-IR')

    }
    /* #endregion */

    /* #region  [- currencyFormatter -] */
    currencyFormatter = (params) => {
        let data = params.value === "" || params.value === undefined ? "" : params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return data
    }
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

    /* #region  [- deleteInModal -] */
    deleteInModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.deleteQuote();
        await this.onCloseDeleteModal();
    }
    /* #endregion */

    /* #region  [- showDetails -] */
    showDetails = async (data) => {
        await this.getSeenQuoteItem(data)
        this.setState({
            isSeenModalVisible: true,
            isSeenModalDestroy: false,
            modalComponent: <Seen />
        })
    }
    /* #endregion */

    /* #region  [- print -] */
    print = async (data) => {
        await this.getPrintQuoteItem(data);
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
                insertedCodeModalTitle: 'پیش فاکتور(ها) به شماره(ها)ی زیر ثبت شدند',
                isInsertedCodeListModalVisible: true,
                isInsertedCodeListModalDestroy: false,
            })
        }
        else if (data === 2) {
            this.setState({
                insertedCodeModalTitle: 'سفارش(ها) به شماره(ها)ی زیر ثبت شدند',
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
      await  this.props.resetNewQuoteProps()
    }
    /* #endregion */

    /* #region  [- approve -] */
    approve = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.state.isNewQuoteChecked === true) {
            await this.getQuoteData();
            this.props.new();
            //this.props.resetEditQuoteProps();
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
        await this.props.resetEditQuoteProps();
        await this.getQuoteItemGetData()
        await this.props.edit()
    }
    /* #endregion */

    /* #region  [- onCancelNew -] */
    onCancelNew = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isNewModalVisible: false,
            isNewModalDestroy: true,
            isNewQuoteChecked: true,
            isUseFromRegisteredDocumentsChecked: false,
            isUseQuoteFlagChecked: false,
            isUseOrderFlagChecked: false,
            isUseInvoiceFlagChecked: false,
        })
    }
    /* #endregion */

    /* #region  [- refresh -] */
    refresh = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.getQuote()
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
            isDeleteModalVisible: false,
            isEditDisabled: true,
            isDeleteDisabled: true,
            isConvertDisabled: true,
            isMergeDisabled: true,
            isSplitDisabled: true,
            quoteHeaderRef: '',
            latinDateCreated: '',
            idList: [],
        })
        this.props.saveQuoteHeaderRef('')
        this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #region  [- onCloseSeenModal -] */
    onCloseSeenModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isSeenModalVisible: false,
            modalComponent: <div></div>,
            isSeenModalDestroy: true
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

    /* #region  [- onCloseUseRegisteredDocumentsModal -] */
    onCloseUseRegisteredDocumentsModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({

            isNewQuoteChecked: true,
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
        
        this.setState({
            accountBuyerRef: '',
            accountSellerRef: '',

            isNewQuoteChecked: true,
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
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.state.isUseQuoteFlagChecked === true) {
            await this.getQuoteByAccount();
            this.setState({
                modalComponent: <Quote
                    onCloseUseRegisteredDocumentsModal={this.onCloseUseRegisteredDocumentsModal}
                    newQuoteToQuoteSplit={this.newQuoteToQuoteSplit}
                    newQuoteToQuoteCorresponding={this.newQuoteToQuoteCorresponding}
                    newQuoteToQuoteMerge={this.newQuoteToQuoteMerge}
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
                    onCloseUseRegisteredOrdersModal={this.onCloseUseRegisteredOrdersModal}
                    newOrderToQuoteSplit={this.newOrderToQuoteSplit}
                    newOrderToQuoteCorresponding={this.newOrderToQuoteCorresponding}
                    newOrderToQuoteMerge={this.newOrderToQuoteMerge}
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
                    onCloseUseRegisteredOrdersModal={this.onCloseUseRegisteredOrdersModal}
                    newInvoiceToQuoteCorresponding={this.newInvoiceToQuoteCorresponding}
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

    /* #region  [- newQuoteToQuoteSplit -] */
    newQuoteToQuoteSplit = async (headerRef, sellerTitle, buyerTitle, latinDateCreated) => {
        await this.setState({
            isUseRegisteredDocumentsModalVisible: false,
            isUseRegisteredDocumentsModalDestroy: true,
            isNewQuoteSplitModalVisible: true,
            isNewQuoteSplitModalDestroy: false,
            newRegisteredDocumentsModalTitle: '',
            useRegisteredDocumentsModalTitle: 'استفاده از پیش فاکتورها-تفکیک',
            modalComponent: <NewQuoteToQuoteSplit
                headerRef={headerRef}
                latinDateCreated={latinDateCreated}
                onCloseNewQuoteSplitModal={this.onCloseNewQuoteSplitModal}
                sellerTitle={sellerTitle}
                buyerTitle={buyerTitle}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
            />,

            isNewQuoteChecked: true,
            isUseFromRegisteredDocumentsChecked: false,
            isUseQuoteFlagChecked: false,
            isUseOrderFlagChecked: false,
            isUseInvoiceFlagChecked: false,
            accountBuyerRef: '',
            accountSellerRef: '',
        })
    }
    /* #endregion */

    /* #region  [- onCloseNewQuoteSplitModal -] */
    onCloseNewQuoteSplitModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isNewQuoteSplitModalVisible: false,
            isNewQuoteSplitModalDestroy: true,
            modalComponent: <div></div>,
            useRegisteredDocumentsModalTitle: '',
        })
    }
    /* #endregion */

    /* #region  [- onCloseQuoteInsertedCodeListModal -] */
    onCloseQuoteInsertedCodeListModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isInsertedCodeListModalVisible: false,
            isInsertedCodeListModalDestroy: true,
            insertedCodeModalTitle: '',
        })
    }
    /* #endregion */

    /* #region  [- onCloseNewQuoteCorrespondingModal -] */
    onCloseNewQuoteCorrespondingModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isNewQuoteCorrespondingModalVisible: false,
            isNewQuoteCorrespondingModalDestroy: true,
            modalComponent: <div></div>,
            useRegisteredDocumentsModalTitle: '',
        })
    }
    /* #endregion */

    /* #region  [- newQuoteToQuoteCorresponding -] */
    newQuoteToQuoteCorresponding = async (headerRef) => {
        await this.setState({
            isUseRegisteredDocumentsModalVisible: false,
            isUseRegisteredDocumentsModalDestroy: true,
            isNewQuoteCorrespondingModalVisible: true,
            isNewQuoteCorrespondingModalDestroy: false,
            newRegisteredDocumentsModalTitle: '',
            useRegisteredDocumentsModalTitle: 'استفاده از پیش فاکتورها-سند متناظر',
            modalComponent: <NewQuoteToQuoteCorresponding
                headerRef={headerRef}
                onCloseNewQuoteCorrespondingModal={this.onCloseNewQuoteCorrespondingModal}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
            />,
            isNewQuoteChecked: true,
            isUseFromRegisteredDocumentsChecked: false,
            isUseQuoteFlagChecked: false,
            isUseOrderFlagChecked: false,
            isUseInvoiceFlagChecked: false,
            accountBuyerRef: '',
            accountSellerRef: '',
        })
    }
    /* #endregion */

    /* #region  [- onCloseNewQuoteMergeModal -] */
    onCloseNewQuoteMergeModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isNewQuoteMergeModalVisible: false,
            isNewQuoteMergeModalDestroy: true,
            modalComponent: <div></div>,
            useRegisteredDocumentsModalTitle: '',
        })
    }
    /* #endregion */

    /* #region  [- newQuoteToQuoteMerge -] */
    newQuoteToQuoteMerge = async (mergeHeaderRefList, latinDateCreated) => {
        await this.setState({
            isUseRegisteredDocumentsModalVisible: false,
            isUseRegisteredDocumentsModalDestroy: true,
            isNewQuoteMergeModalVisible: true,
            isNewQuoteMergeModalDestroy: false,
            newRegisteredDocumentsModalTitle: '',
            useRegisteredDocumentsModalTitle: 'استفاده از پیش فاکتورها-ادغام',
            modalComponent: <NewQuoteToQuoteMerge
                mergeHeaderRefList={mergeHeaderRefList}
                latinDateCreated={latinDateCreated}
                onCloseNewQuoteMergeModal={this.onCloseNewQuoteMergeModal}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
            />,
            isNewQuoteChecked: true,
            isUseFromRegisteredDocumentsChecked: false,
            isUseQuoteFlagChecked: false,
            isUseOrderFlagChecked: false,
            isUseInvoiceFlagChecked: false,
            accountBuyerRef: '',
            accountSellerRef: '',
        })
    }
    /* #endregion */

    /* #region  [- newOrderToQuoteCorresponding -] */
    newOrderToQuoteCorresponding = async (headerRef) => {
        await this.setState({
            isUseRegisteredDocumentsModalVisible: false,
            isUseRegisteredDocumentsModalDestroy: true,
            isNewQuoteCorrespondingModalVisible: true,
            isNewQuoteCorrespondingModalDestroy: false,
            newRegisteredDocumentsModalTitle: '',
            useRegisteredDocumentsModalTitle: 'استفاده از سفارش ها-سند متناظر',
            modalComponent: <NewOrderToQuoteCorresponding
                headerRef={headerRef}
                onCloseNewQuoteCorrespondingModal={this.onCloseNewQuoteCorrespondingModal}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
            />,
            isNewQuoteChecked: true,
            isUseFromRegisteredDocumentsChecked: false,
            isUseQuoteFlagChecked: false,
            isUseOrderFlagChecked: false,
            isUseInvoiceFlagChecked: false,
            accountBuyerRef: '',
            accountSellerRef: '',
        })
    }
    /* #endregion */

    /* #region  [- newOrderToQuoteSplit -] */
    newOrderToQuoteSplit = async (headerRef, sellerTitle, buyerTitle, latinDateCreated) => {
        await this.setState({
            isUseRegisteredDocumentsModalVisible: false,
            isUseRegisteredDocumentsModalDestroy: true,
            isNewQuoteSplitModalVisible: true,
            isNewQuoteSplitModalDestroy: false,
            newRegisteredDocumentsModalTitle: '',
            useRegisteredDocumentsModalTitle: 'استفاده از سفارش ها-تفکیک',
            modalComponent: <NewOrderToQuoteSplit
                headerRef={headerRef}
                latinDateCreated={latinDateCreated}
                onCloseNewQuoteSplitModal={this.onCloseNewQuoteSplitModal}
                sellerTitle={sellerTitle}
                buyerTitle={buyerTitle}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
            />,

            isNewQuoteChecked: true,
            isUseFromRegisteredDocumentsChecked: false,
            isUseQuoteFlagChecked: false,
            isUseOrderFlagChecked: false,
            isUseInvoiceFlagChecked: false,
            accountBuyerRef: '',
            accountSellerRef: '',
        })
    }
    /* #endregion */

    /* #region  [- newOrderToQuoteMerge -] */
    newOrderToQuoteMerge = async (mergeHeaderRefList, latinDateCreated) => {
        await this.setState({
            isUseRegisteredDocumentsModalVisible: false,
            isUseRegisteredDocumentsModalDestroy: true,
            isNewQuoteMergeModalVisible: true,
            isNewQuoteMergeModalDestroy: false,
            newRegisteredDocumentsModalTitle: '',
            useRegisteredDocumentsModalTitle: 'استفاده از سفارش ها-ادغام',
            modalComponent: <NewOrderToQuoteMerge
                mergeHeaderRefList={mergeHeaderRefList}
                latinDateCreated={latinDateCreated}
                onCloseNewQuoteMergeModal={this.onCloseNewQuoteMergeModal}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
            />,
            isNewQuoteChecked: true,
            isUseFromRegisteredDocumentsChecked: false,
            isUseQuoteFlagChecked: false,
            isUseOrderFlagChecked: false,
            isUseInvoiceFlagChecked: false,
            accountBuyerRef: '',
            accountSellerRef: '',
        })
    }
    /* #endregion */

    /* #region  [- newInvoiceToQuoteCorresponding -] */
    newInvoiceToQuoteCorresponding = async (headerRef) => {
        await this.setState({
            isUseRegisteredDocumentsModalVisible: false,
            isUseRegisteredDocumentsModalDestroy: true,
            isNewQuoteCorrespondingModalVisible: true,
            isNewQuoteCorrespondingModalDestroy: false,
            newRegisteredDocumentsModalTitle: '',
            useRegisteredDocumentsModalTitle: 'استفاده از فاکتور ها-سند متناظر',
            modalComponent: <NewInvoiceToQuoteCorresponding
                headerRef={headerRef}
                onCloseNewQuoteCorrespondingModal={this.onCloseNewQuoteCorrespondingModal}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
            />,
            isNewQuoteChecked: true,
            isUseFromRegisteredDocumentsChecked: false,
            isUseQuoteFlagChecked: false,
            isUseOrderFlagChecked: false,
            isUseInvoiceFlagChecked: false,
            accountBuyerRef: '',
            accountSellerRef: '',
        })
    }
    /* #endregion */

    /* #region  [- convert -] */
    convert = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.props.useRegisteredDocumentsResetProps();
        await this.props.convertResetProps();
        await this.getQuoteToOrderConvertData();
        this.setState({
            isConvertModalVisible: true,
            isConvertModalDestroy: false,
            modalComponent: <Convert
                headerRef={this.state.quoteHeaderRef}
                latinDateCreated={this.state.latinDateCreated}
                onCloseConvertModal={this.onCloseConvertModal}
                showInsertedCodeListModal={this.showInsertedCodeListModal}
            />
        })
    }
    /* #endregion */

    /* #region  [- onCloseConvertModal -] */
    onCloseConvertModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isConvertModalVisible: false,
            isConvertModalDestroy: true,
            quoteHeaderRef: '',
            latinDateCreated: '',
            idList: [],
        })
        this.props.saveQuoteHeaderRef('')
        this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #region  [- split -] */
    split = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.props.useRegisteredDocumentsResetProps();
        await this.props.splitResetProps();
        await this.getQuoteToOrderSplitData();
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        this.setState({
            isSplitModalVisible: true,
            isSplitModalDestroy: false,
            modalComponent: <Split
                headerRef={this.state.quoteHeaderRef}
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
    onCloseSplitModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isSplitModalVisible: false,
            isSplitModalDestroy: true,
            quoteHeaderRef: '',
            latinDateCreated: '',
            idList: [],
        })
        this.props.saveQuoteHeaderRef('')
        this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #region  [- merge -] */
    merge = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.props.useRegisteredDocumentsResetProps();
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
                errorMessage: 'در فرآیند ادغام خریدار و فروشنده سند های انتخابی می بایست یکسان باشند.',
                isErrorModalVisible: true,
            })
        }
        else if (result === false && dateResult === true) {
            this.setState({
                errorMessage: 'در فرآیند ادغام تاریخ ثبت سندهای انتخاب شده می بایست در یک سال باشند.',
                isErrorModalVisible: true,
            })
        }
        if (result === true && dateResult === true) {
            this.setState({
                errorMessage: 'در فرآیند ادغام خریدار و فروشنده سند های انتخابی می بایست یکسان باشند.',
                isErrorModalVisible: true,
            })
        }
        else if (result === false && dateResult === false) {
            await this.props.mergeResetProps();
            await this.getQuoteToOrderMergeData();
            let list = []
            this.state.idList.map(x => {
                list.push({ headerRef: x.id })
            })
            this.setState({
                isMergeModalVisible: true,
                isMergeModalDestroy: false,
                modalComponent: <Merge
                    mergeHeaderRefList={list}
                    latinDateCreated={latinDateCreated}
                    onCloseMergeModal={this.onCloseMergeModal}
                    showInsertedCodeListModal={this.showInsertedCodeListModal}
                />
            })
        }

    }
    /* #endregion */

    /* #region  [- onCancelErrorModal -] */
    onCancelErrorModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isErrorModalVisible: false,
            errorMessage: true,
            quoteHeaderRef: '',
            latinDateCreated: '',
            idList: [],
        })
        this.props.saveQuoteHeaderRef('')
        this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #region  [- onCloseMergeModal -] */
    onCloseMergeModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isMergeModalVisible: false,
            isMergeModalDestroy: true,
            quoteHeaderRef: '',
            latinDateCreated: '',
            idList: [],
        })
        this.props.saveQuoteHeaderRef('')
        this.gridApi.deselectAll();
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handelChangeNewQuoteRadioButtons -] */
    handelChangeNewQuoteRadioButtons = async (event) => {

        if (event.target.id === '2') {
            this.setState({
                isNewQuoteChecked: true,
                isUseFromRegisteredDocumentsChecked: false,
                isUseQuoteFlagChecked: false,
                isUseOrderFlagChecked: false,
                isUseInvoiceFlagChecked: false,
            })
        }
        if (event.target.id === '3') {
            await this.props.useRegisteredDocumentsResetProps();
            this.setState({
                isNewQuoteChecked: false,
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

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        const len = selectedData.length

        if (len === 0) {
            this.setState({
                isDeleteDisabled: true,
                isEditDisabled: true,
                isConvertDisabled: true,
                isMergeDisabled: true,
                isSplitDisabled: true,
                quoteHeaderRef: '',
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
                isConvertDisabled: selectedData[0].forwardCheckRefFlag,
                isMergeDisabled: true,
                isSplitDisabled: selectedData[0].forwardCheckRefFlag,
                isEditDisabled: selectedData[0].editCheckRefFlag,
                quoteHeaderRef: selectedData[0].id,
                latinDateCreated: dayjs(selectedData[0].latinDateCreated).calendar("jalali").locale("fa"),
                idList: idList,
            })
            this.props.saveQuoteHeaderRef(selectedData[0].id);
        }
        else if (len > 1) {
            let idList = []
            selectedData.map(x => {
                idList.push({
                    id: x.id
                })
            })
            let forwardCheckRefFlag = false
            for (let i = 0; i < len; i++) {
                if (selectedData[i].forwardCheckRefFlag === true) {
                    forwardCheckRefFlag = true;
                    break;
                }
                else {
                    continue;
                }
            }
            this.setState({
                isDeleteDisabled: true,
                isConvertDisabled: true,
                isMergeDisabled: forwardCheckRefFlag,
                isSplitDisabled: true,
                isEditDisabled: true,
                quoteHeaderRef: selectedData[0].id,
                latinDateCreated: '',
                idList: idList,
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

    /* #region  [- getQuoteData -] */
    getQuoteData = async () => {
        let data = {
            domainRef: this.props.domain
        }

        await this.props.getQuoteData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getQuote -] */
    getQuote = async () => {
        let data = {
            domainRef: this.props.domain
        }

        await this.props.getQuote(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getQuoteItemProduct -] */
    getQuoteItemProduct = async (params) => {
        let data = {
            quoteHeaderRef: params.data.id
        }
        await this.props.getQuoteItemProduct(JSON.stringify(data))
        params.successCallback(this.props.quoteDetailProductList);
        this.onPinnedRowBottomCount(params);
    }
    /* #endregion */

    /* #region  [- getQuoteItemGetData -] */
    getQuoteItemGetData = async () => {
        let data = {
            domainRef: this.props.domain,
            quoteHeaderRef: this.state.quoteHeaderRef
        }

        await this.props.getQuoteItemGetData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- deleteQuote-] */
    deleteQuote = async () => {
        let quoteDeleteData = {
            domainRef: this.props.domain,
            aspNetUsersRef: this.props.userId,
            quoteIdList: this.state.idList
        }
        await this.props.deleteQuote(JSON.stringify(quoteDeleteData));
    }
    /* #endregion */

    /* #region  [- getPrintQuoteItem -] */
    getPrintQuoteItem = async (data) => {
        let printGetData = {
            quoteHeaderRef: data.id
        }

        await this.props.getPrintQuoteItem(JSON.stringify(printGetData))
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
            type: 1,
            accountBuyerRef: this.state.accountBuyerRef * 1,
            accountSellerRef: this.state.accountSellerRef * 1,
        }
        await this.props.getQuoteByAccount(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getSeenQuoteItem -] */
    getSeenQuoteItem = async (data) => {
        let quoteItemData = {
            quoteHeaderRef: data.id
        }

        await this.props.getSeenQuoteItem(JSON.stringify(quoteItemData))
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
            type: 1,
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
            type: 1,
            accountBuyerRef: this.state.accountBuyerRef * 1,
            accountSellerRef: this.state.accountSellerRef * 1,
        }
        await this.props.getInvoiceByAccount(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getQuoteToOrderConvertData -] */
    getQuoteToOrderConvertData = async () => {
        let data = {
            headerRef: this.state.quoteHeaderRef
        }
        await this.props.getQuoteToOrderConvertData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getQuoteToOrderSplitData -] */
    getQuoteToOrderSplitData = async () => {
        let data = {
            headerRef: this.state.quoteHeaderRef
        }
        await this.props.getQuoteToOrderSplitData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getQuoteToOrderMergeData -] */
    getQuoteToOrderMergeData = async () => {
        let list = []
        this.state.idList.map(x => {
            list.push({ headerRef: x.id })
        })
        let data = {
            domainRef: this.props.domain,
            mergeHeaderRefList: list
        }
        await this.props.getQuoteToOrderMergeData(JSON.stringify(data))
    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {

        return (
            <Container fluid style={{ margin: '0', padding: '0',  }}>

                <Row name="row_01_Buttons" >

                    <Col sm="12" md="12" lg="12" style={{ textAlign: 'right' }}>

                        <Button className='submit-button-style' onClick={this.new} hidden={this.state.isNewHidden}>جدید</Button>
                        <Button className='submit-button-style mr-2' onClick={this.edit} disabled={this.state.isEditDisabled} hidden={this.state.isEditHidden}>ویرایش</Button>
                        <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteDisabled} hidden={this.state.isDeleteHidden}>حذف</Button>
                        <Button className='submit-button-style mr-2' onClick={this.convert} disabled={this.state.isConvertDisabled} hidden={this.state.isConvertHidden}>تبدیل</Button>
                        <Button className='submit-button-style mr-2' onClick={this.merge} disabled={this.state.isMergeDisabled} hidden={this.state.isMergeHidden}>ادغام</Button>
                        <Button className='submit-button-style mr-2' onClick={this.split} disabled={this.state.isSplitDisabled} hidden={this.state.isSplitHidden}>تفکیک</Button>
                        <Button className='submit-button-style mr-2' disabled={this.state.isArchiveDisabled} hidden={this.state.isHidden}>آرشیو</Button>
                        <Button className='submit-button-style mr-2' onClick={this.refresh} >بازیابی</Button>

                    </Col>

                </Row>

                <Row name="row_02_Grid">

                    <Col sm="12" md="12" lg="12" className="ag-theme-alpine mt-2" style={{ height: '70vh', width: '100%', marginTop: '2%' ,marginBottom:'5%'}}>
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            masterDetail={true}
                            detailCellRendererParams={this.state.detailCellRendererParams}
                            columnDefs={this.state.columnDefs}
                            rowData={this.props.quoteList}
                            enableRtl={true}
                            rowSelection='multiple'
                            gridOptions={this.state.gridOptions}
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.defaultColDef}
                            //detailRowHeight={500}

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
                            <Button key='2' className='submit-button-style' onClick={this.approve} >
                                تایید
                            </Button>,
                        ]}
                    >
                        <Container fluid>

                            <Row name='row_01_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>پیش فاکتور جدید</span>
                                </Col>
                            </Row>

                            <Row name='row_02_Modal_Content'>
                                <Col sm='12' style={{ textAlign: 'right' }}>
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
                                                    onChange={this.handelChangeNewQuoteRadioButtons}
                                                />{' '} استفاده از الگو

                                            </Label>


                                        </FormGroup>
                                        <br />
                                        <FormGroup >

                                            <Label name="newQuote" style={{ marginRight: '15%' }} check>

                                                <Input
                                                    type="radio"
                                                    id="2"
                                                    value="newQuote"
                                                    name="new"
                                                    checked={this.state.isNewQuoteChecked}
                                                    onChange={this.handelChangeNewQuoteRadioButtons} />
                                                {' '} پیش فاکتور جدید

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
                                                    onChange={this.handelChangeNewQuoteRadioButtons}
                                                />
                                                استفاده از اسناد ثبت شده

                                            </Label>

                                            <FormGroup name='useFromRegisteredDocuments' style={{ paddingRight: '20%' }} hidden={!this.state.isUseFromRegisteredDocumentsChecked}>

                                                <Label name="quote" check >

                                                    <Input
                                                        type="radio"
                                                        id="4"
                                                        value="quote"
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
                        destroyOnClose={this.state.isSeenModalDestroy}
                        width={1000}
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
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>نمایش پیش فاکتور</span>
                                </Col>
                            </Row>
                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' style={{ textAlign: 'right' }}>
                                    {this.state.modalComponent}
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
                                    <span className='modal-header-title'>پیش فاکتور جدید</span>
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

                    <Modal name='useRegisteredQuotes'
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

                    <Modal name='newQuoteSplit'
                        visible={this.state.isNewQuoteSplitModalVisible}
                        destroyOnClose={this.state.isNewQuoteSplitModalDestroy}
                        width={1000}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseNewQuoteSplitModal}
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
                        onCancel={this.onCloseQuoteInsertedCodeListModal}
                        footer={[
                            <Button key='1' className='submit-button-style' onClick={this.onCloseQuoteInsertedCodeListModal}>متوجه شدم</Button>,
                        ]}
                    >
                        <Container fluid>

                            <Row name='row_03_Modal_Header' className='modal-header-row'>
                                <Col className='modal-header-col'>
                                    <span className='modal-header-title'> {this.state.insertedCodeModalTitle}</span>
                                </Col>
                            </Row>

                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' md='12' lg='12' className='modal-content-col'>

                                    <Form name='insertedIdList' style={{ margin: '4% 5% 25% 5%' }}>

                                        <FormGroup name='insertedIdList' style={{ textAlign: 'right' }}>
                                            {this.props.insertedCodeList.map((el) => (
                                                <ul key={el.code} style={{ textAlign: 'right', direction: 'left' }}>
                                                    <li>
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

                    <Modal name='newQuoteCorresponding'
                        visible={this.state.isNewQuoteCorrespondingModalVisible}
                        destroyOnClose={this.state.isNewQuoteCorrespondingModalDestroy}
                        width={1000}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseNewQuoteCorrespondingModal}
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

                    <Modal name='newQuoteMerge'
                        visible={this.state.isNewQuoteMergeModalVisible}
                        destroyOnClose={this.state.isNewQuoteMergeModalDestroy}
                        width={1000}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseNewQuoteMergeModal}
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
        checkTokenCounter: state.auth.checkTokenCounter,
        domain: state.auth.domain,
        userId: state.auth.userId,
        quoteList: state.quote.quoteList,
        quoteDetailProductList: state.quote.quoteDetailProductList,
        // message: state.quote.message,
        quoteAccountBuyerTitleList: state.quote.quoteAccountBuyerTitleList,
        quoteAccountSellerTitleList: state.quote.quoteAccountSellerTitleList,
        insertedCodeList: state.quote.insertedCodeList,
        orderAccountBuyerTitleList: state.quote.orderAccountBuyerTitleList,
        orderAccountSellerTitleList: state.quote.orderAccountSellerTitleList,
        invoiceAccountBuyerTitleList: state.quote.invoiceAccountBuyerTitleList,
        invoiceAccountSellerTitleList: state.quote.invoiceAccountSellerTitleList,
        userMenuAccessList: state.auth.userMenuAccessList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    getQuoteData: (data) => dispatch(getQuoteData(data)),
    resetNewQuoteProps: (data) => dispatch(resetNewQuoteProps(data)),
    resetEditQuoteProps: (data) => dispatch(resetEditQuoteProps(data)),
    getQuote: (data) => dispatch(getQuote(data)),
    getQuoteItemGetData: (data) => dispatch(getQuoteItemGetData(data)),
    saveQuoteHeaderRef: (data) => dispatch(saveQuoteHeaderRef(data)),
    deleteQuote: (data) => dispatch(deleteQuote(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getPrintQuoteItem: (data) => dispatch(getPrintQuoteItem(data)),
    getQuoteAccountTitle: (data) => dispatch(getQuoteAccountTitle(data)),
    getQuoteByAccount: (data) => dispatch(getQuoteByAccount(data)),
    getSeenQuoteItem: (data) => dispatch(getSeenQuoteItem(data)),
    useRegisteredDocumentsResetProps: (data) => dispatch(useRegisteredDocumentsResetProps(data)),
    getOrderAccountTitle: (data) => dispatch(getOrderAccountTitle(data)),
    getOrderByAccount: (data) => dispatch(getOrderByAccount(data)),
    getInvoiceAccountTitle: (data) => dispatch(getInvoiceAccountTitle(data)),
    getInvoiceByAccount: (data) => dispatch(getInvoiceByAccount(data)),
    getQuoteToOrderConvertData: (data) => dispatch(getQuoteToOrderConvertData(data)),
    convertResetProps: (data) => dispatch(convertResetProps(data)),
    getQuoteToOrderSplitData: (data) => dispatch(getQuoteToOrderSplitData(data)),
    splitResetProps: (data) => dispatch(splitResetProps(data)),
    getQuoteToOrderMergeData: (data) => dispatch(getQuoteToOrderMergeData(data)),
    mergeResetProps: (data) => dispatch(mergeResetProps(data)),
    getQuoteItemProduct: (data) => dispatch(getQuoteItemProduct(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Operation);