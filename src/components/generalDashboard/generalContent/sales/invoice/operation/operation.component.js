/* #region  [- imports -] */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { checkTokenExpiration } from "../../../../../../redux/shared/auth/auth.action";
import { Modal } from "antd";
//import Notification from '../../../../../shared/common/notification/notification.component';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import {
  getInvoiceData,
  resetNewInvoiceProps,
  resetEditInvoiceProps,
  getInvoice,
  deleteInvoice,
  resetMessage,
  saveInvoiceHeaderRef,
  getInvoiceItem,
  getSeenInvoiceItem,
  getInvoiceItemGetData,
  getPrintInvoiceItem,
  invoiceToOrderConvertResetProps,
  getInvoiceToOrderConvertData,
  invoiceToOrderMergeResetProps,
  getInvoiceToOrderMergeData,
  getInvoiceToOrderSplitData,
  invoiceToOrderSplitResetProps,
  getQuoteAccountTitle,
  getQuoteByAccount,
  useRegisteredDocumentsResetProps,
  getOrderAccountTitle,
  getOrderByAccount,
  getInvoiceAccountTitle,
  getInvoiceByAccount,
  quoteToInvoiceCorrespondingResetProps,
  getQuoteToInvoiceCorrespondingData,
  getInvoiceToInvoiceCorrespondingData,
  invoiceToInvoiceCorrespondingResetProps,
  orderToInvoiceCorrespondingResetProps,
  getOrderToInvoiceCorrespondingData,
  getOrderToInvoiceConvertData,
  orderToInvoiceConvertResetProps,
  orderToInvoiceSplitResetProps,
  orderToInvoiceMergeResetProps,
  getOrderToInvoiceMergeData,
  getOrderToInvoiceSplitData,
  getInvoiceItemProduct,
} from "../../../../../../redux/sales/invoice/invoice/invoice.action";
import GridSeenButton from "./gridSeenButton.component";
import Seen from "./seen/seen.component";
import Print from "./print/print.component";
import GridPrintButton from "./gridPrintButton.component";
import { getInvoiceDetailSplitOnWarehouse } from "../../../../../../redux/sales/invoice/requisition/requisition.action";
import InvoiceToOrderConvert from "./convert/convert.component";
import InvoiceToOrderMerge from "./merge/invoiceToOrder/merge.component";
import InvoiceToOrderCorresponding from "./corresponding/invoiceToOrder/corresponding.component";
import InvoiceToInvoiceCorresponding from "./corresponding/invoiceToInvoice/corresponding.component";
import InvoiceToOrderSplit from "./split/invoiceToOrder/split.component";

import Quote from "./newInvoice/useRegisteredDocuments/quote/quote.component";
import Order from "./newInvoice/useRegisteredDocuments/order/order.component";
import Invoice from "./newInvoice/useRegisteredDocuments/invoice/invoice.component";

import NewQuoteToInvoiceCorresponding from "./newInvoice/useRegisteredDocuments/quote/corresponding/corresponding.component";
import NewInvoiceToInvoiceCorresponding from "./newInvoice/useRegisteredDocuments/invoice/corresponding/corresponding.component";

import NewOrderToInvoiceCorresponding from "./newInvoice/useRegisteredDocuments/order/corresponding/corresponding.component";
import NewOrderToInvoiceMerge from "./newInvoice/useRegisteredDocuments/order/merge/merge.component";
import NewOrderToInvoiceSplit from "./newInvoice/useRegisteredDocuments/order/split/split.component";
import NewOrderToInvoiceConvert from "./newInvoice/useRegisteredDocuments/order/convert/convert.component";

import CustomPinnedRowRenderer from "../../../../../shared/common/pinnedRow/customPinnedRow.component";
import dayjs from "dayjs";
/* #endregion */

class Operation extends PureComponent {
  /* #region  [- ctor -] */
  constructor(props) {
    super(props);
    this.state = {
      /* #region  [- flags -] */
      isNewModalVisible: false,
      isNewInvoiceModalDestroy: false,
      isEditDisabled: true,
      isDeleteDisabled: true,

      isNewInvoiceChecked: true,
      isDeleteModalVisible: false,
      isSeenModalVisible: false,
      isSeenModalDestroy: true,
      isUseFromRegisteredDocumentsChecked: false,
      isPrintModalVisible: false,
      isPrintModalDestroy: true,
      isRequisitionDisabled: true,
      isSalesReturnDisabled: true,
      isNewRequisitionModalVisible: false,
      isNewRequisitionModalDestroy: false,
      isSplitOnWarehouseChecked: true,
      isSplitOnWarhouseProductChecked: false,
      isSplitOnProductChecked: false,

      isNewHidden: true,
      isEditHidden: true,
      isDeleteHidden: true,
      isCorrespondingHidden: true,
      isCorrespondingDisabled: true,
      isMergeHidden: true,
      isSplitHidden: true,
      isRequisitionHidden: true,
      isSalesReturnHidden: true,
      isArchiveHidden: false,
      isArchiveDisabled: true,

      isOrderButtonRowHidden: true,
      isInvoiceToOrderConvertDisabled: true,
      isInvoiceToOrderConvertHidden: true,
      isInvoiceToOrderSplitDisabled: true,
      isInvoiceToOrderSplitHidden: true,
      isInvoiceToOrderMergeDisabled: true,
      isInvoiceToOrderMergeHidden: true,
      isInvoiceToOrderCorrespondingDisabled: true,
      isInvoiceToOrderCorrespondingHidden: true,

      isInsertedCodeListModalVisible: false,
      isInsertedCodeListModalDestroy: true,

      isInvoiceToOrderModalVisible: false,
      isInvoiceToOrderModalDestroy: true,

      isInvoiceToInvoiceModalVisible: false,
      isInvoiceToInvoiceModalDestroy: true,

      isMergeCancelModalVisible: false,

      isNewOrderChecked: true,
      isUseQuoteFlagChecked: false,
      isUseOrderFlagChecked: false,
      isUseInvoiceFlagChecked: false,

      isSelectAccountModalVisible: false,
      isSelectAccountModalDestroy: true,
      isAccountSubmitButtonDisabled: true,

      isUseRegisteredDocumentsModalVisible: false,
      isUseRegisteredDocumentsModalDestroy: true,

      isQuoteToInvoiceModalVisible: false,
      isQuoteToInvoiceModalDestroy: true,

      isInvoiceInsertedCodeListModalVisible: false,
      isInvoiceInsertedCodeListModalDestroy: true,

      isOrderToInvoiceModalVisible: false,
      isOrderToInvoiceModalDestroy: true,


      isInvoiceSplitInsertedCodeListModalVisible: false,
      isInvoiceSplitInsertedCodeListModalDestroy: true,

      /* #endregion */

      /* #region  [- ag-Grid -] */
      columnDefs: [
        {
          //cellRenderer: this.cellRenderer,
          headerName: "ردیف",
          headerCheckboxSelection: false,
          checkboxSelection: true,
          cellClass: "locked-col",
          colId: "row",
          valueGetter: "node.rowIndex+1",
          cellRenderer: "agGroupCellRenderer",
        },
        { headerName: "کد", field: "code", valueGetter: this.codeValueGetter },
        {
          headerName: "کد مرجع",
          field: "referenceCode",
          valueGetter: this.referenceCodeValueGetter,
        },
        { headerName: "تاریخ فاکتور", field: "nativeDateInvoice" },
        {
          headerName: " پرینت",
          field: "print",
          cellRenderer: "gridPrintButton",
        },
        { headerName: "خریدار", field: "buyer" },
        { headerName: "فروشنده", field: "seller" },
        {
          headerName: "مبلغ کل فاکتور",
          field: "invoicePrice",
          valueFormatter: this.currencyFormatter,
        },
        {
          headerName: "مبلغ کل اضافات",
          field: "invoiceAdditions",
          valueFormatter: this.currencyFormatter,
        },
        {
          headerName: "مبلغ کل کسورات",
          field: "invoiceDeductions",
          valueFormatter: this.currencyFormatter,
        },
        {
          headerName: "مبلغ قابل پرداخت",
          field: "invoicePayablePrice",
          valueFormatter: this.currencyFormatter,
        },
        {
          headerName: "جزئیات",
          field: "seen",
          cellRenderer: "gridSeenButton",
          width: 200,
        },
        { headerName: "تاریخ ثبت", field: "nativeDateCreated" },
        { headerName: "latinDateCreated", field: "latinDateCreated",sort:'desc' ,hide:true},
        { headerName: 'شماره سریال', field: "serialNumber" },
        { headerName: "توضیحات", field: "descriptionRow" },
      ],
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

            {
              headerName: "کد کالا",
              field: "code",
              pinnedRowCellRenderer: "customPinnedRowRenderer",
            },
            {
              headerName: "نام کالا",
              field: "title",
              pinnedRowCellRenderer: "customPinnedRowRenderer",
            },
            {
              headerName: "واحد اندازه گیری",
              field: "scaleTitle",
              pinnedRowCellRenderer: "customPinnedRowRenderer",
            },
            { headerName: 'تامین کننده', field: "supplyChainTitle", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
            { headerName: 'نام گروه کالا', field: "productCategoryTitle", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
            {
              headerName: "مبلغ پیش فرض",
              field: "unitPrice",
              valueFormatter: this.currencyFormatter,
              pinnedRowCellRenderer: "customPinnedRowRenderer",
            },
            {
              headerName: "تعداد",
              field: "quantity",
              valueFormatter: this.currencyFormatter,
              pinnedRowCellRenderer: "customPinnedRowRenderer",
            },
            {
              headerName: "مبلغ",
              field: "price",
              valueFormatter: this.currencyFormatter,
              pinnedRowCellRenderer: "customPinnedRowRenderer",
            },
            {
              headerName: "اضافات",
              field: "invoiceAdditions",
              valueFormatter: this.currencyFormatter,
              pinnedRowCellRenderer: "customPinnedRowRenderer",
            },
            {
              headerName: "کسورات",
              field: "invoiceDeductions",
              valueFormatter: this.currencyFormatter,
              pinnedRowCellRenderer: "customPinnedRowRenderer",
            },
            {
              headerName: "مبلغ کل",
              field: "finalPrice",
              valueFormatter: this.currencyFormatter,
              pinnedRowCellRenderer: "customPinnedRowRenderer",
            },
            { headerName: "توضیحات", field: "descriptionRow" },
          ],
          pinnedBottomRowData: "",
          frameworkComponents: {
            customPinnedRowRenderer: CustomPinnedRowRenderer,
          },
          enableRtl: "true",
        },
        getDetailRowData: (params) => {
          this.getInvoiceItemProduct(params);
        },
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
      rowData: [],
      idList: [],
      accountBuyerTitleList: [],
      accountSellerTitleList: [],
      /* #endregion */

      /* #region  [- componentFields -] */
      invoiceHeaderRef: "",
      latinDateCreated: "",
      seenModalComponent: <div></div>,
      insertedCodeModalTitle: "",
      invoiceToOrderModalTitle: "",
      invoiceToInvoiceModalTitle: "",
      accountBuyerRef: "",
      accountSellerRef: "",
      newRegisteredDocumentsModalTitle: "",
      modalComponent: <div></div>,
      quoteToInvoiceModalTitle: "",
      orderToInvoiceModalTitle: "",
      mergeCancelModalMessage: "",
      /* #endregion */
    };
  }
  /* #endregion */

  /* #region  [*** methods ***] */

  /* #region  [*** componentMethods ***] */

  /* #region  [- componentDidMount -] */
  async componentDidMount() {
    await this.accessToMenu(this.props.userMenuAccessList);
    this.getInvoice();
  }
  /* #endregion */

  /* #region  [- accessToMenu -] */
  accessToMenu = (data) => {
    if (data.includes("440")) {
      this.setState({
        isNewHidden: false,
      });
    }
    if (data.includes("447")) {
      this.setState({
        isEditHidden: false,
      });
    }
    if (data.includes("451")) {
      this.setState({
        isDeleteHidden: false,
      });
    }
    if (data.includes("697")) {
      this.setState({
        isRequisitionHidden: false,
      });
    }
    if (data.includes("714")) {
      this.setState({
        isSalesReturnHidden: false,
      });
    }
    if (data.includes("672")) {
      this.setState({
        isCorrespondingHidden: false,
      });
    }


    if (data.includes("674") || data.includes("677") || data.includes("680") || data.includes("683")) {
      this.setState({
        isOrderButtonRowHidden: false,
      });
    }
    if (data.includes("674")) {
      this.setState({
        isInvoiceToOrderConvertHidden: false,
      });
    }
    if (data.includes("677")) {
      this.setState({
        isInvoiceToOrderSplitHidden: false,
      });
    }
    if (data.includes("680")) {
      this.setState({
        isInvoiceToOrderMergeHidden: false,
      });
    }
    if (data.includes("683")) {
      this.setState({
        isInvoiceToOrderCorrespondingHidden: false,
      });
    }
  }
  /* #endregion */

  /* #region  [- componentDidUpdate -] */
  componentDidUpdate(prevProps) {
    if (this.props.invoiceList !== prevProps.invoiceList) {
      this.setState({
        rowData: this.props.invoiceList,
      });
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
    let detailGridApi = this.state.gridOptions.api.getDetailGridInfo(
      params.node.id
    );
    detailGridApi.api.setPinnedBottomRowData(rows);
  };
  /* #endregion */

  /* #region  [- createData -] */
  createData = () => {
    var result = [];
    let unitPrice = 0;
    let quantity = 0;
    let price = 0;
    let invoiceAdditions = 0;
    let invoiceDeductions = 0;
    let finalPrice = 0;
    this.props.invoiceDetailProductList.map((x) => {
      unitPrice = unitPrice + x.unitPrice;
      quantity = quantity + x.quantity;
      price = price + x.price;
      invoiceAdditions = invoiceAdditions + x.invoiceAdditions;
      invoiceDeductions = invoiceDeductions + x.invoiceDeductions;
      finalPrice = finalPrice + x.finalPrice;
    });

    result.push({
      code: "---",
      title: "---",
      scaleTitle: "---",
      supplyChainTitle: '---',
      productCategoryTitle: '---',
      unitPrice: unitPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
      quantity: quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
      price: price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
      invoiceAdditions: invoiceAdditions
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
      invoiceDeductions: invoiceDeductions
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
      finalPrice: finalPrice
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
      descriptionRow: "---",
    });

    return result;
  };
  /* #endregion */

  /* #region  [- currencyFormatter -] */
  currencyFormatter = (params) => {
    let data =
      params.value === "" || params.value === undefined
        ? ""
        : params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return data;
  };
  /* #endregion */

  /* #region  [- rowCellRenderer -] */
  rowCellRenderer = (params) => {
    return (params.node.rowIndex + 1).toLocaleString("fa-IR");
  };
  /* #endregion */

  /* #region  [- codeValueGetter   -] */
  codeValueGetter = (params) => {
    if (params.data.code.includes("\\")) {
      let patternCode = params.data.code.split("\\")[0];
      let ordinalCode = params.data.code.split("\\")[1];
      return ordinalCode + "\\" + patternCode;
    } else if (params.data.code.includes("*")) {
      let patternCode = params.data.code.split("*")[0];
      let ordinalCode = params.data.code.split("*")[1];
      return ordinalCode + "*" + patternCode;
    } else {
      return params.data.code;
    }
  };
  /* #endregion */

  /* #region  [- referenceCodeValueGetter  -] */
  referenceCodeValueGetter = (params) => {
    if (params.data.referenceCode.includes("\\")) {
      let patternCode = params.data.referenceCode.split("\\")[0];
      let ordinalCode = params.data.referenceCode.split("\\")[1];
      return ordinalCode + "\\" + patternCode;
    } else if (params.data.referenceCode.includes("*")) {
      let patternCode = params.data.referenceCode.split("*")[0];
      let ordinalCode = params.data.referenceCode.split("*")[1];
      return ordinalCode + "*" + patternCode;
    } else {
      return params.data.referenceCode;
    }
  };
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
    });
  };
  /* #endregion */

  /* #region  [- onOkNew -] */
  onOkNew = () => {
    this.setState({
      isNewModalVisible: true,
    });
  };
  /* #endregion */

  /* #region  [- onSelectionChanged -] */
  onSelectionChanged = async () => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const len = selectedData.length;

    if (len === 0) {
      this.setState({
        isDeleteDisabled: true,
        isEditDisabled: true,
        isCorrespondingDisabled: true,
        isInvoiceToOrderConvertDisabled: true,
        isInvoiceToOrderSplitDisabled: true,
        isInvoiceToOrderMergeDisabled: true,
        isInvoiceToOrderCorrespondingDisabled: true,
        invoiceHeaderRef: "",
        latinDateCreated: "",
        isRequisitionDisabled: true,
        isSalesReturnDisabled: true,
        idList: [],
      });
      if(this.state.isInvoiceInsertedCodeListModalVisible===false){
        this.props.saveInvoiceHeaderRef("");

      }
    }
    if (len === 1) {
      let idList = [
        {
          id: selectedData[0].id,
        },
      ];
      if (selectedData[0].hasRequisitionFlag === true) {
        this.setState({
          isDeleteDisabled: true,
          isEditDisabled: true,
          isCorrespondingDisabled: false,
          isInvoiceToOrderConvertDisabled: selectedData[0].backwardCheckRefFlag,
          isInvoiceToOrderSplitDisabled: selectedData[0].backwardCheckRefFlag,
          // isInvoiceToOrderConvertDisabled: true,
          // isInvoiceToOrderSplitDisabled: true,

          isInvoiceToOrderMergeDisabled: true,
          isInvoiceToOrderCorrespondingDisabled: false,
          invoiceHeaderRef: selectedData[0].id,
          latinDateCreated: dayjs(selectedData[0].latinDateCreated).calendar("jalali").locale("fa"),
          idList: idList,
          isRequisitionDisabled: true,
          isSalesReturnDisabled: selectedData[0].innerCycleCheckRefFlag,
        });
        this.props.saveInvoiceHeaderRef(selectedData[0].id);

      } else if (selectedData[0].hasRequisitionFlag === false) {
        this.setState({
          isDeleteDisabled: selectedData[0].deleteCheckRefFlag,
          isEditDisabled: selectedData[0].editCheckRefFlag,
          isCorrespondingDisabled: false,
          isInvoiceToOrderConvertDisabled: selectedData[0].backwardCheckRefFlag,
          isInvoiceToOrderSplitDisabled: selectedData[0].backwardCheckRefFlag,
          isInvoiceToOrderMergeDisabled: true,
          isInvoiceToOrderCorrespondingDisabled: false,
          invoiceHeaderRef: selectedData[0].id,
          latinDateCreated: dayjs(selectedData[0].latinDateCreated).calendar("jalali").locale("fa"),
          idList: idList,
          isRequisitionDisabled: selectedData[0].innerCycleCheckRefFlag,
          isSalesReturnDisabled: selectedData[0].innerCycleCheckRefFlag,
        });
        this.props.saveInvoiceHeaderRef(selectedData[0].id);
      }

    }

    else if (len > 1) {
      this.props.saveInvoiceHeaderRef("");
      let idList = [];
      let checkRefFlag = false;
      selectedData.map((x) => {
        if (x.backwardCheckRefFlag === true) {
          checkRefFlag = true
        }
        idList.push({
          id: x.id,
        });
      });
      this.setState({
        isDeleteDisabled: true,
        isEditDisabled: true,
        isCorrespondingDisabled: true,
        isInvoiceToOrderConvertDisabled: true,
        isInvoiceToOrderSplitDisabled: true,
        isInvoiceToOrderMergeDisabled: checkRefFlag,
        isInvoiceToOrderCorrespondingDisabled: true,
        invoiceHeaderRef: selectedData[0].id,
        latinDateCreated: "",
        idList: idList,
        isRequisitionDisabled: true,
        isSalesReturnDisabled: true
      });
    }
  };
  /* #endregion */

  /* #region  [- showDetails -] */
  showDetails = async (data) => {
    await this.getSeenInvoiceItem(data);
    this.setState({
      isSeenModalVisible: true,
      isSeenModalDestroy: false,
      seenModalComponent: <Seen />,
    });
  };
  /* #endregion */

  /* #region  [- print -] */
  print = async (data) => {
    await this.getPrintInvoiceItem(data);
    this.setState({
      isPrintModalVisible: true,
      isPrintModalDestroy: false,
      modalComponent: <Print />,
    });
  };
  /* #endregion */

  /* #region  [- renderCode -] */
  renderCode = (code) => {
    if (code.includes("\\")) {
      let patternCode = code.split("\\")[0];
      let ordinalCode = code.split("\\")[1];
      return ordinalCode + "\\" + patternCode;
    } else if (code.includes("*")) {
      let patternCode = code.split("*")[0];
      let ordinalCode = code.split("*")[1];
      return ordinalCode + "*" + patternCode;
    } else {
      return code;
    }
  };
  /* #endregion */

  /* #region  [- validateAccountForm -] */
  validateAccountForm = async () => {
    if (
      this.state.accountBuyerRef !== "" &&
      this.state.accountSellerRef !== ""
    ) {
      this.setState({
        isAccountSubmitButtonDisabled: false,
      });
    } else {
      this.setState({
        isAccountSubmitButtonDisabled: true,
      });
    }
  };
  /* #endregion */

  /* #endregion */

  /* #region  [*** buttonTasks ***] */

  /* #region  [- new -] */
  new = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    this.setState({
      isNewModalVisible: true,
    });
    await this.props.resetNewInvoiceProps();
  };
  /* #endregion */

  /* #region  [- approve -] */
  approve = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    if (this.state.isNewOrderChecked === true) {
      //  await this.props.resetEditInvoiceProps();
      await this.getInvoiceData();
      this.props.new();
    } else if (this.state.isUseFromRegisteredDocumentsChecked === true) {
      if (this.state.isUseQuoteFlagChecked === true) {
        await this.getQuoteAccountTitle();
        this.setState({
          isSelectAccountModalVisible: true,
          isSelectAccountModalDestroy: false,
          isNewModalVisible: false,
          isNewModalDestroy: true,
          accountBuyerTitleList: this.props.quoteAccountBuyerTitleList.map(
            (item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            )
          ),
          accountSellerTitleList: this.props.quoteAccountSellerTitleList.map(
            (item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            )
          ),
        });
      } else if (this.state.isUseOrderFlagChecked === true) {
        await this.getOrderAccountTitle();
        this.setState({
          isSelectAccountModalVisible: true,
          isSelectAccountModalDestroy: false,
          isNewModalVisible: false,
          isNewModalDestroy: true,
          accountBuyerTitleList: this.props.orderAccountBuyerTitleList.map(
            (item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            )
          ),
          accountSellerTitleList: this.props.orderAccountSellerTitleList.map(
            (item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            )
          ),
        });
      } else if (this.state.isUseInvoiceFlagChecked === true) {
        await this.getInvoiceAccountTitle();
        this.setState({
          isSelectAccountModalVisible: true,
          isSelectAccountModalDestroy: false,
          isNewModalVisible: false,
          isNewModalDestroy: true,
          accountBuyerTitleList: this.props.invoiceAccountBuyerTitleList.map(
            (item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            )
          ),
          accountSellerTitleList: this.props.invoiceAccountSellerTitleList.map(
            (item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            )
          ),
        });
      }
    }
  };
  /* #endregion */

  /* #region  [- edit -] */
  edit = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.props.resetEditInvoiceProps();
    await this.getInvoiceItemGetData();
    await this.props.edit();
  };
  /* #endregion */

  /* #region  [- delete -] */
  delete = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    this.setState({
      isDeleteModalVisible: true,
    });
  };
  /* #endregion */

  /* #region  [- onCloseDeleteModal -] */
  onCloseDeleteModal = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    this.setState({
      isEditDisabled: true,
      isDeleteDisabled: true,
      idList: [],
      isDeleteModalVisible: false,
    });
    this.gridApi.deselectAll();
  };
  /* #endregion */

  /* #region  [- refresh -] */
  refresh = async () => {
    await this.getInvoice();
  };
  /* #endregion */

  /* #region  [- deleteInModal -] */
  deleteInModal = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.deleteInvoice();
    await this.onCloseDeleteModal();
  };
  /* #endregion */

  /* #region  [- onCloseSeenModal -] */
  onCloseSeenModal = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    this.setState({
      isSeenModalVisible: false,
      seenModalComponent: <div></div>,
      isSeenModalDestroy: true,
    });
  };
  /* #endregion */

  /* #region  [- onClosePrintModal -] */
  onClosePrintModal = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    this.setState({
      isPrintModalVisible: false,
      modalComponent: <div></div>,
      isPrintModalDestroy: true,
    });
  };
  /* #endregion */

  /* #region  [- onCancelNewRequisition -] */
  onCancelNewRequisition = async () => {
    await this.props.saveInvoiceHeaderRef("");
   await this.setState({
      isNewRequisitionModalVisible: false,
      isNewRequisitionModalDestroy: true,
    });
    this.gridApi.deselectAll()
  };
  /* #endregion */

  /* #region  [- onApproveNewRequisition -] */
  onApproveNewRequisition = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.getInvoiceDetailSplitOnWarehouse();
    let isInOperationFlag = true
    this.props.newRequisition(
      this.state.isSplitOnWarehouseChecked,
      this.state.isSplitOnProductChecked,
      this.state.isSplitOnWarhouseProductChecked,
      isInOperationFlag
    );
  };
  /* #endregion */

  /* #region  [- newInvoiceRequisition -] */
  newInvoiceRequisition = async () => {
    await this.props.useRegisteredDocumentsResetProps();
    this.setState({
      isNewRequisitionModalVisible: true,
      isInvoiceInsertedCodeListModalVisible: false,
      isInvoiceInsertedCodeListModalDestroy: true,
    });
  };
  /* #endregion */

  /* #region  [-  showInsertedCodeListModal -] */
  showInsertedCodeListModal = (data) => {
    if (data === 1) {
      this.setState({
        insertedCodeModalTitle: "سفارش(ها) به شماره(ها)ی زیر ثبت شدند",
        isInsertedCodeListModalVisible: true,
        isInsertedCodeListModalDestroy: false,
      });
    } else if (data === 2) {
      this.setState({
        isInvoiceInsertedCodeListModalVisible: true,
        isInvoiceInsertedCodeListModalDestroy: false,
      });
    }
    else if (data === 3) {
      this.setState({
        isInvoiceSplitInsertedCodeListModalVisible: true,
        isInvoiceSplitInsertedCodeListModalDestroy: false,
      });
    }

  };
  /* #endregion */

  /* #region  [- onCloseInsertedCodeListModal -] */
  onCloseInsertedCodeListModal = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.props.useRegisteredDocumentsResetProps();
    this.setState({
      isInsertedCodeListModalVisible: false,
      isInsertedCodeListModalDestroy: true,
      insertedCodeModalTitle: "",
    });
  };
  /* #endregion */

  /* #region  [- onCloseInvoiceInsertedCodeListModal -] */
  onCloseInvoiceInsertedCodeListModal = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.props.useRegisteredDocumentsResetProps();
    this.setState({
      isInvoiceInsertedCodeListModalVisible: false,
      isInvoiceInsertedCodeListModalDestroy: true,
    });
  };
  /* #endregion */

  /* #region  [- onCloseInvoiceToOrderModal -] */
  onCloseInvoiceToOrderModal = () => {
    // await this.props.useRegisteredDocumentsResetProps();
    this.setState({
      isInvoiceToOrderModalVisible: false,
      isInvoiceToOrderModalDestroy: true,
      invoiceHeaderRef: "",
      idList: [],
    });
    //this.props.saveInvoiceHeaderRef("");
    this.gridApi.deselectAll();
  };
  /* #endregion */

  /* #region  [- onCloseInvoiceToInvoiceModal -] */
  onCloseInvoiceToInvoiceModal = async () => {
    //await this.props.useRegisteredDocumentsResetProps();
    this.setState({
      isInvoiceToInvoiceModalVisible: false,
      isInvoiceToInvoiceModalDestroy: true,
      invoiceHeaderRef: "",
      idList: [],
    });
    this.gridApi.deselectAll();
  };
  /* #endregion */

  /* #region  [- onCloseQuoteToInvoiceModal -] */
  onCloseQuoteToInvoiceModal = () => {
    //   await this.props.useRegisteredDocumentsResetProps();
    this.setState({
      isQuoteToInvoiceModalVisible: false,
      isQuoteToInvoiceModalDestroy: true,
      invoiceHeaderRef: "",
      idList: [],
    });
    //this.props.saveInvoiceHeaderRef("");
    this.gridApi.deselectAll();
  };
  /* #endregion */

  /* #region  [- onCloseOrderToInvoiceModal -] */
  onCloseOrderToInvoiceModal = () => {
    // await this.props.useRegisteredDocumentsResetProps();
    this.setState({
      isOrderToInvoiceModalVisible: false,
      isOrderToInvoiceModalDestroy: true,
      invoiceHeaderRef: "",
      idList: [],
    });
    //this.props.saveInvoiceHeaderRef("");
    this.gridApi.deselectAll();
  };
  /* #endregion */

  /* #region  [- onCloseMergeCancelModal -] */
  onCloseMergeCancelModal = () => {
    //  await this.props.useRegisteredDocumentsResetProps();
    this.setState({
      isMergeCancelModalVisible: false,
      mergeCancelModalMessage: "",
      invoiceHeaderRef: "",
      idList: [],
    });
    //this.props.saveInvoiceHeaderRef("");
    this.gridApi.deselectAll();
  };
  /* #endregion */

  /* #region  [- invoiceToOrderCorresponding -] */
  invoiceToOrderCorresponding = async () => {
    this.setState({
      invoiceToOrderModalTitle: "فرآیند ایجاد سند متناظر",
      isInvoiceToOrderModalVisible: true,
      isInvoiceToOrderModalDestroy: false,
      modalComponent: (
        <InvoiceToOrderCorresponding
          headerRef={this.state.invoiceHeaderRef}
          onCloseInvoiceToOrderModal={this.onCloseInvoiceToOrderModal}
          showInsertedCodeListModal={this.showInsertedCodeListModal}
        />
      ),
    });
  };
  /* #endregion */

  /* #region  [- invoiceToInvoiceCorresponding -] */
  invoiceToInvoiceCorresponding = async () => {
    await this.props.invoiceToInvoiceCorrespondingResetProps();
    await this.getInvoiceToInvoiceCorrespondingData(
      this.state.invoiceHeaderRef
    );
    this.setState({
      invoiceToInvoiceModalTitle: "فرآیند ایجاد سند متناظر",
      isInvoiceToInvoiceModalVisible: true,
      isInvoiceToInvoiceModalDestroy: false,
      modalComponent: (
        <InvoiceToInvoiceCorresponding
          headerRef={this.state.invoiceHeaderRef}
          onCloseInvoiceToInvoiceModal={this.onCloseInvoiceToInvoiceModal}
          showInsertedCodeListModal={this.showInsertedCodeListModal}
        />
      ),
    });
  };
  /* #endregion */

  /* #region  [- invoiceToOrderMerge -] */
  invoiceToOrderMerge = async () => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    let sellerId = selectedData[0].sellerRef;
    let buyerId = selectedData[0].buyerRef;
    let latinDateCreated = dayjs(selectedData[0].latinDateCreated)
      .calendar("jalali")
      .locale("fa");
    let result = false;
    let dateResult = false;

    for (let i = 0; i < Object.keys(selectedData).length; i++) {
      if (
        selectedData[i].sellerRef !== sellerId ||
        selectedData[i].buyerRef !== buyerId
      ) {
        result = true;
        break;
      } else {
        let date = dayjs(selectedData[i].latinDateCreated)
          .calendar("jalali")
          .locale("fa");
        if (date.format("YYYY") !== latinDateCreated.format("YYYY")) {
          dateResult = true;
          break;
        } else {
          if (latinDateCreated > date) {
            latinDateCreated = date;
          }
          continue;
        }
      }
    }

    if (result === true && dateResult === false) {
      this.setState({
        mergeCancelModalMessage:
          "در فرآیند ادغام خریدار و فروشنده سند های انتخابی می بایست یکسان باشند.",
        isMergeCancelModalVisible: true,
      });
    } else if (result === false && dateResult === true) {
      this.setState({
        mergeCancelModalMessage:
          "در فرآیند ادغام تاریخ ثبت سندهای انتخاب شده می بایست در یک سال باشند.",
        isMergeCancelModalVisible: true,
      });
    }
    if (result === true && dateResult === true) {
      this.setState({
        mergeCancelModalMessage:
          "در فرآیند ادغام خریدار و فروشنده سند های انتخابی می بایست یکسان باشند.",
        isMergeCancelModalVisible: true,
      });
    } else if (result === false && dateResult === false) {
      await this.props.invoiceToOrderMergeResetProps();
      let list = [];
      this.state.idList.map((x) => {
        list.push({ headerRef: x.id });
      });
      await this.getInvoiceToOrderMergeData(list);
      if (this.props.isInvoiceMergable === false) {
        this.setState({
          isMergeCancelModalVisible: true,
          mergeCancelModalMessage:
            "اسناد انتخاب شده به دلیل وجود کالاهایی با قیمت یا واحد اندازه‌گیری متفاوت قابل ادغام نمی باشند",
        });
      } else {
        this.setState({
          invoiceToOrderModalTitle: "فرآیند ادغام",
          isInvoiceToOrderModalVisible: true,
          isInvoiceToOrderModalDestroy: false,
          modalComponent: (
            <InvoiceToOrderMerge
              mergeHeaderRefList={list}
              latinDateCreated={latinDateCreated}
              onCloseInvoiceToOrderModal={this.onCloseInvoiceToOrderModal}
              showInsertedCodeListModal={this.showInsertedCodeListModal}
            />
          ),
        });
      }
    }
  };
  /* #endregion */

  /* #region  [- invoiceToOrderConvert -] */
  invoiceToOrderConvert = async () => {
    await this.props.invoiceToOrderConvertResetProps();
    await this.getInvoiceToOrderConvertData();
    // const selectedNodes = this.gridApi.getSelectedNodes();
    // const selectedData = selectedNodes.map((node) => node.data);
    this.setState({
      invoiceToOrderModalTitle: "فرآیند تبدیل",
      isInvoiceToOrderModalVisible: true,
      isInvoiceToOrderModalDestroy: false,
      modalComponent: (
        <InvoiceToOrderConvert
          headerRef={this.state.invoiceHeaderRef}
          latinDateCreated={this.state.latinDateCreated}
          onCloseInvoiceToOrderModal={this.onCloseInvoiceToOrderModal}
          showInsertedCodeListModal={this.showInsertedCodeListModal}
        />
      ),
    });
  };
  /* #endregion */

  /* #region  [- invoiceToOrderSplit -] */
  invoiceToOrderSplit = async () => {
    await this.props.invoiceToOrderSplitResetProps();
    await this.getInvoiceToOrderSplitData(this.state.invoiceHeaderRef);
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);

    this.setState({
      invoiceToOrderModalTitle: "فرآیند تفکیک",
      isInvoiceToOrderModalVisible: true,
      isInvoiceToOrderModalDestroy: false,
      modalComponent: (
        <InvoiceToOrderSplit
          headerRef={this.state.invoiceHeaderRef}
          latinDateCreated={this.state.latinDateCreated}
          onCloseInvoiceToOrderModal={this.onCloseInvoiceToOrderModal}
          showInsertedCodeListModal={this.showInsertedCodeListModal}
          sellerTitle={selectedData[0].seller}
          buyerTitle={selectedData[0].buyer}
        />
      ),
    });
  };
  /* #endregion */

  /* #region  [- onCloseSelectAccountModal -] */
  onCloseSelectAccountModal = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.props.useRegisteredDocumentsResetProps();
    this.setState({
      accountBuyerRef: "",
      accountSellerRef: "",

      isNewOrderChecked: true,
      isUseFromRegisteredDocumentsChecked: false,
      isUseQuoteFlagChecked: false,
      isUseOrderFlagChecked: false,
      isUseInvoiceFlagChecked: false,

      isSelectAccountModalVisible: false,
      isSelectAccountModalDestroy: true,
      isAccountSubmitButtonDisabled: true,
    });
  };
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

      accountBuyerRef: "",
      accountSellerRef: "",

      isUseRegisteredDocumentsModalVisible: false,
      isUseRegisteredDocumentsModalDestroy: true,
      newRegisteredDocumentsModalTitle: "",
    });
  };
  /* #endregion */

  /* #region  [- submitAccount -] */
  submitAccount = async () => {
    if (this.state.isUseQuoteFlagChecked === true) {
      await this.getQuoteByAccount();
      this.setState({
        modalComponent: (
          <Quote
            newQuoteToInvoiceCorresponding={this.newQuoteToInvoiceCorresponding}
          />
        ),

        isSelectAccountModalVisible: false,
        isSelectAccountModalDestroy: true,
        isAccountSubmitButtonDisabled: true,

        isUseRegisteredDocumentsModalVisible: true,
        isUseRegisteredDocumentsModalDestroy: false,
        newRegisteredDocumentsModalTitle: "استفاده از پیش فاکتورها",
      });
    } else if (this.state.isUseOrderFlagChecked === true) {
      await this.getOrderByAccount();
      this.setState({
        modalComponent: (
          <Order
            newOrderToInvoiceSplit={this.newOrderToInvoiceSplit}
            newOrderToInvoiceCorresponding={this.newOrderToInvoiceCorresponding}
            newOrderToInvoiceConvert={this.newOrderToInvoiceConvert}
            newOrderToInvoiceMerge={this.newOrderToInvoiceMerge}
          />
        ),
        isSelectAccountModalVisible: false,
        isSelectAccountModalDestroy: true,
        isAccountSubmitButtonDisabled: true,

        isUseRegisteredDocumentsModalVisible: true,
        isUseRegisteredDocumentsModalDestroy: false,
        newRegisteredDocumentsModalTitle: "استفاده از سفارش ها",
      });
    } else if (this.state.isUseInvoiceFlagChecked === true) {
      await this.getInvoiceByAccount();
      this.setState({
        modalComponent: (
          <Invoice
            newInvoiceToInvoiceCorresponding={
              this.newInvoiceToInvoiceCorresponding
            }
          />
        ),
        isSelectAccountModalVisible: false,
        isSelectAccountModalDestroy: true,
        isAccountSubmitButtonDisabled: true,

        isUseRegisteredDocumentsModalVisible: true,
        isUseRegisteredDocumentsModalDestroy: false,
        newRegisteredDocumentsModalTitle: "استفاده از فاکتور ها",
      });
    }
  };
  /* #endregion */

  /* #region  [- newQuoteToInvoiceCorresponding-] */
  newQuoteToInvoiceCorresponding = async (headerRef) => {
    await this.props.quoteToInvoiceCorrespondingResetProps();
    await this.getQuoteToInvoiceCorrespondingData(headerRef);
    await this.setState({
      isUseRegisteredDocumentsModalVisible: false,
      isUseRegisteredDocumentsModalDestroy: true,
      isQuoteToInvoiceModalVisible: true,
      isQuoteToInvoiceModalDestroy: false,
      newRegisteredDocumentsModalTitle: "",
      quoteToInvoiceModalTitle: "استفاده از پیش فاکتورها-سند متناظر",
      modalComponent: (
        <NewQuoteToInvoiceCorresponding
          headerRef={headerRef}
          onCloseQuoteToInvoiceModal={this.onCloseQuoteToInvoiceModal}
          showInsertedCodeListModal={this.showInsertedCodeListModal}
        />
      ),
      isNewOrderChecked: true,
      isUseFromRegisteredDocumentsChecked: false,
      isUseQuoteFlagChecked: false,
      isUseOrderFlagChecked: false,
      isUseInvoiceFlagChecked: false,
      accountBuyerRef: "",
      accountSellerRef: "",
    });
  };
  /* #endregion */

  /* #region  [- newInvoiceToInvoiceCorresponding -] */
  newInvoiceToInvoiceCorresponding = async (headerRef) => {
    await this.props.invoiceToInvoiceCorrespondingResetProps();
    await this.getInvoiceToInvoiceCorrespondingData(headerRef);
    this.setState({
      isUseRegisteredDocumentsModalVisible: false,
      isUseRegisteredDocumentsModalDestroy: true,
      isInvoiceToInvoiceModalVisible: true,
      isInvoiceToInvoiceModalDestroy: false,
      newRegisteredDocumentsModalTitle: "",
      invoiceToInvoiceModalTitle: "استفاده از  فاکتورها-سند متناظر",
      modalComponent: (
        <NewInvoiceToInvoiceCorresponding
          headerRef={headerRef}
          onCloseInvoiceToInvoiceModal={this.onCloseInvoiceToInvoiceModal}
          showInsertedCodeListModal={this.showInsertedCodeListModal}
        />
      ),
      isNewOrderChecked: true,
      isUseFromRegisteredDocumentsChecked: false,
      isUseQuoteFlagChecked: false,
      isUseOrderFlagChecked: false,
      isUseInvoiceFlagChecked: false,
      accountBuyerRef: "",
      accountSellerRef: "",
    });
  };
  /* #endregion */

  /* #region  [- newOrderToInvoiceCorresponding -] */
  newOrderToInvoiceCorresponding = async (headerRef) => {
    await this.props.orderToInvoiceCorrespondingResetProps();
    await this.getOrderToInvoiceCorrespondingData(headerRef);
    this.setState({
      isUseRegisteredDocumentsModalVisible: false,
      isUseRegisteredDocumentsModalDestroy: true,
      isOrderToInvoiceModalVisible: true,
      isOrderToInvoiceModalDestroy: false,
      newRegisteredDocumentsModalTitle: "",
      orderToInvoiceModalTitle: "استفاده از سفارش ها - سند متناظر",
      modalComponent: (
        <NewOrderToInvoiceCorresponding
          headerRef={headerRef}
          onCloseOrderToInvoiceModal={this.onCloseOrderToInvoiceModal}
          showInsertedCodeListModal={this.showInsertedCodeListModal}
        />
      ),
      isNewOrderChecked: true,
      isUseFromRegisteredDocumentsChecked: false,
      isUseQuoteFlagChecked: false,
      isUseOrderFlagChecked: false,
      isUseInvoiceFlagChecked: false,
      accountBuyerRef: "",
      accountSellerRef: "",
    });
  };
  /* #endregion */

  /* #region  [- newOrderToInvoiceMerge -] */
  newOrderToInvoiceMerge = async (mergeHeaderRefList, latinDateCreated) => {
    await this.props.orderToInvoiceMergeResetProps();
    await this.getOrderToInvoiceMergeData(mergeHeaderRefList);
    if (this.props.isOrderMergable === false) {
      this.setState({
        isMergeCancelModalVisible: true,
        mergeCancelModalMessage:
          "اسناد انتخاب شده به دلیل وجود کالاهایی با قیمت یا واحد اندازه‌گیری متفاوت قابل ادغام نمی باشند",
      });
    } else {
      this.setState({
        isUseRegisteredDocumentsModalVisible: false,
        isUseRegisteredDocumentsModalDestroy: true,
        isOrderToInvoiceModalVisible: true,
        isOrderToInvoiceModalDestroy: false,
        newRegisteredDocumentsModalTitle: "",
        orderToInvoiceModalTitle: "استفاده از سفارش ها - ادغام ",
        modalComponent: (
          <NewOrderToInvoiceMerge
            mergeHeaderRefList={mergeHeaderRefList}
            latinDateCreated={latinDateCreated}
            onCloseOrderToInvoiceModal={this.onCloseOrderToInvoiceModal}
            showInsertedCodeListModal={this.showInsertedCodeListModal}
          />
        ),
        isNewOrderChecked: true,
        isUseFromRegisteredDocumentsChecked: false,
        isUseQuoteFlagChecked: false,
        isUseOrderFlagChecked: false,
        isUseInvoiceFlagChecked: false,
        accountBuyerRef: "",
        accountSellerRef: "",
      });
    }
  };
  /* #endregion */

  /* #region  [- newOrderToInvoiceSplit -] */
  newOrderToInvoiceSplit = async (headerRef, sellerTitle, buyerTitle, latinDateCreated) => {
    await this.props.orderToInvoiceSplitResetProps();
    await this.getOrderToInvoiceSplitData(headerRef);
    this.setState({
      isUseRegisteredDocumentsModalVisible: false,
      isUseRegisteredDocumentsModalDestroy: true,
      isOrderToInvoiceModalVisible: true,
      isOrderToInvoiceModalDestroy: false,
      newRegisteredDocumentsModalTitle: "",
      orderToInvoiceModalTitle: "استفاده از سفارش ها - تفکیک",
      modalComponent: (
        <NewOrderToInvoiceSplit
          headerRef={headerRef}
          latinDateCreated={latinDateCreated}
          onCloseOrderToInvoiceModal={this.onCloseOrderToInvoiceModal}
          showInsertedCodeListModal={this.showInsertedCodeListModal}
          sellerTitle={sellerTitle}
          buyerTitle={buyerTitle}
        />
      ),
      isNewOrderChecked: true,
      isUseFromRegisteredDocumentsChecked: false,
      isUseQuoteFlagChecked: false,
      isUseOrderFlagChecked: false,
      isUseInvoiceFlagChecked: false,
      accountBuyerRef: "",
      accountSellerRef: "",
    });
  };
  /* #endregion */

  /* #region  [- newOrderToInvoiceConvert -] */
  newOrderToInvoiceConvert = async (headerRef, latinDateCreated) => {
    await this.props.orderToInvoiceConvertResetProps();
    await this.getOrderToInvoiceConvertData(headerRef);
    this.setState({
      isUseRegisteredDocumentsModalVisible: false,
      isUseRegisteredDocumentsModalDestroy: true,
      isOrderToInvoiceModalVisible: true,
      isOrderToInvoiceModalDestroy: false,
      newRegisteredDocumentsModalTitle: "",
      orderToInvoiceModalTitle: "استفاده از سفارش ها - تبدیل",
      modalComponent: (
        <NewOrderToInvoiceConvert
          headerRef={headerRef}
          latinDateCreated={latinDateCreated}
          onCloseOrderToInvoiceModal={this.onCloseOrderToInvoiceModal}
          showInsertedCodeListModal={this.showInsertedCodeListModal}
        />
      ),
      isNewOrderChecked: true,
      isUseFromRegisteredDocumentsChecked: false,
      isUseQuoteFlagChecked: false,
      isUseOrderFlagChecked: false,
      isUseInvoiceFlagChecked: false,
      accountBuyerRef: "",
      accountSellerRef: "",
    });
  };
  /* #endregion */

  /* #region  [- onCloseInvoiceSplitInsertedCodeListModal -] */
  onCloseInvoiceSplitInsertedCodeListModal = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.props.useRegisteredDocumentsResetProps();
    this.setState({
      isInvoiceSplitInsertedCodeListModalVisible: false,
      isInvoiceSplitInsertedCodeListModalDestroy: true,
    })
  }
  /* #endregion */

  /* #region  [- newInvoiceSalesReturn -] */
  newInvoiceSalesReturn = async () => {
    await this.props.useRegisteredDocumentsResetProps();
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    let data = {
      isInOperationFlag: true,
      invoiceRef: selectedData[0].id,
      invoiceCode: selectedData[0].code,
      hasRequisitionFlag: selectedData[0].hasRequisitionFlag,
    }
    await this.props.newSalesReturn(data);
  };
  /* #endregion */

  /* #endregion */

  /* #region  [*** handle Changes ***] */

  /* #region  [- handelChangeSplitOnWarehouse -] */
  handelChangeSplitOnWarehouse = (e) => {
    this.setState({
      isSplitOnWarehouseChecked: e.target.checked,
    });
  };
  /* #endregion */

  /* #region  [- handelChangeSplitOnWarhouseProduct -] */
  handelChangeSplitOnWarhouseProduct = (e) => {
    this.setState({
      isSplitOnWarehouseChecked: false,
      isSplitOnWarhouseProductChecked: e.target.checked,
    });
  };
  /* #endregion */

  /* #region  [- handelChangeNewOrderRadioButtons -] */
  handelChangeNewOrderRadioButtons = async (event) => {
    if (event.target.id === "2") {
      this.setState({
        isNewOrderChecked: true,
        isUseFromRegisteredDocumentsChecked: false,
        isUseQuoteFlagChecked: false,
        isUseOrderFlagChecked: false,
        isUseInvoiceFlagChecked: false,
      });
    }
    if (event.target.id === "3") {
      await this.props.useRegisteredDocumentsResetProps();
      this.setState({
        isNewOrderChecked: false,
        isUseFromRegisteredDocumentsChecked: true,
        isUseQuoteFlagChecked: true,
        isUseOrderFlagChecked: false,
        isUseInvoiceFlagChecked: false,
      });
    }
  };
  /* #endregion */

  /* #region  [- handelChangeUseFromRegisteredDocuments -] */
  handelChangeUseFromRegisteredDocuments = (event) => {
    if (event.target.id === "4") {
      this.setState({
        isUseQuoteFlagChecked: true,
        isUseOrderFlagChecked: false,
        isUseInvoiceFlagChecked: false,
      });
    } else if (event.target.id === "5") {
      this.setState({
        isUseQuoteFlagChecked: false,
        isUseOrderFlagChecked: true,
        isUseInvoiceFlagChecked: false,
      });
    } else if (event.target.id === "6") {
      this.setState({
        isUseQuoteFlagChecked: false,
        isUseOrderFlagChecked: false,
        isUseInvoiceFlagChecked: true,
      });
    }
  };
  /* #endregion */

  /* #region  [- handleChangeAccount -] */
  handleChangeAccount = async (event) => {
    await this.setState({
      [event.target.name]: event.target.value,
    });
    this.validateAccountForm();
  };
  /* #endregion */

  /* #endregion */

  /* #region  [*** api ***] */

  /* #region  [- getInvoiceData -] */
  getInvoiceData = async () => {
    let data = {
      domainRef: this.props.domain,
    };
    await this.props.getInvoiceData(JSON.stringify(data));
  };
  /* #endregion */

  /* #region  [- getInvoice -] */
  getInvoice = async () => {
    let data = {
      domainRef: this.props.domain,
    };
    await this.props.getInvoice(JSON.stringify(data));
  };
  /* #endregion */

  /* #region  [- getInvoiceItemProduct -] */
  getInvoiceItemProduct = async (params) => {
    let data = {
      invoiceHeaderRef: params.data.id,
    };
    await this.props.getInvoiceItemProduct(JSON.stringify(data));
    params.successCallback(this.props.invoiceDetailProductList);
    this.onPinnedRowBottomCount(params);
  };
  /* #endregion */

  /* #region  [- getInvoiceItemGetData -] */
  getInvoiceItemGetData = async () => {
    let data = {
      domainRef: this.props.domain,
      invoiceHeaderRef: this.state.invoiceHeaderRef,
    };

    await this.props.getInvoiceItemGetData(JSON.stringify(data));
  };
  /* #endregion */

  /* #region  [- deleteInvoice-] */
  deleteInvoice = async () => {
    let invoiceDeleteData = {
      domainRef: this.props.domain,
      aspNetUsersRef: this.props.userId,
      invoiceIdList: this.state.idList,
    };
    await this.props.deleteInvoice(JSON.stringify(invoiceDeleteData));
  };
  /* #endregion */

  /* #region  [- getInvoiceItem -] */
  getInvoiceItem = async (data) => {
    let invoiceItemData = {
      domainRef: this.props.domain,
      invoiceHeaderRef: data.id,
    };

    await this.props.getInvoiceItem(JSON.stringify(invoiceItemData));
  };
  /* #endregion */

  /* #region  [- getSeenInvoiceItem -] */
  getSeenInvoiceItem = async (data) => {
    let invoiceItemData = {
      invoiceHeaderRef: data.id,
    };

    await this.props.getSeenInvoiceItem(JSON.stringify(invoiceItemData));
  };
  /* #endregion */

  /* #region  [- getPrintInvoiceItem -] */
  getPrintInvoiceItem = async (data) => {
    let printGetData = {
      invoiceHeaderRef: data.id,
    };

    await this.props.getPrintInvoiceItem(JSON.stringify(printGetData));
  };
  /* #endregion */

  /* #region  [- getInvoiceDetailSplitOnWarehouse -] */
  getInvoiceDetailSplitOnWarehouse = async () => {
    let data = {
      domainRef: this.props.domain,
      invoiceHeaderRef: this.props.invoiceHeaderRef,
    };

    await this.props.getInvoiceDetailSplitOnWarehouse(JSON.stringify(data));
  };
  /* #endregion */

  /* #region  [- getInvoiceToOrderConvertData -] */
  getInvoiceToOrderConvertData = async () => {
    let data = {
      headerRef: this.state.invoiceHeaderRef,
    };
    await this.props.getInvoiceToOrderConvertData(JSON.stringify(data));
  };
  /* #endregion */

  /* #region  [- getInvoiceToOrderMergeData -] */
  getInvoiceToOrderMergeData = async (list) => {
    let data = {
      domainRef: this.props.domain,
      mergeHeaderRefList: list,
    };
    await this.props.getInvoiceToOrderMergeData(JSON.stringify(data));
  };
  /* #endregion */

  /* #region  [- getInvoiceToOrderSplitData -] */
  getInvoiceToOrderSplitData = async (quoteHeaderRef) => {
    let data = {
      headerRef: quoteHeaderRef,
    };
    await this.props.getInvoiceToOrderSplitData(JSON.stringify(data));
  };
  /* #endregion */

  /* #region  [- getQuoteAccountTitle -] */
  getQuoteAccountTitle = async () => {
    let data = {
      domainRef: this.props.domain,
    };

    await this.props.getQuoteAccountTitle(JSON.stringify(data));
  };
  /* #endregion */

  /* #region  [- getQuoteByAccount -] */
  getQuoteByAccount = async () => {
    let data = {
      domainRef: this.props.domain,
      type: 3,
      accountBuyerRef: this.state.accountBuyerRef * 1,
      accountSellerRef: this.state.accountSellerRef * 1,
    };
    await this.props.getQuoteByAccount(JSON.stringify(data));
  };
  /* #endregion */

  /* #region  [- getOrderAccountTitle -] */
  getOrderAccountTitle = async () => {
    let data = {
      domainRef: this.props.domain,
    };

    await this.props.getOrderAccountTitle(JSON.stringify(data));
  };
  /* #endregion */

  /* #region  [- getOrderByAccount -] */
  getOrderByAccount = async () => {
    let data = {
      domainRef: this.props.domain,
      type: 3,
      accountBuyerRef: this.state.accountBuyerRef * 1,
      accountSellerRef: this.state.accountSellerRef * 1,
    };
    await this.props.getOrderByAccount(JSON.stringify(data));
  };
  /* #endregion */

  /* #region  [- getInvoiceAccountTitle -] */
  getInvoiceAccountTitle = async () => {
    let data = {
      domainRef: this.props.domain,
    };

    await this.props.getInvoiceAccountTitle(JSON.stringify(data));
  };
  /* #endregion */

  /* #region  [- getInvoiceByAccount -] */
  getInvoiceByAccount = async () => {
    let data = {
      domainRef: this.props.domain,
      type: 3,
      accountBuyerRef: this.state.accountBuyerRef * 1,
      accountSellerRef: this.state.accountSellerRef * 1,
    };
    await this.props.getInvoiceByAccount(JSON.stringify(data));
  };
  /* #endregion */

  /* #region  [- getQuoteToInvoiceCorrespondingData -] */
  getQuoteToInvoiceCorrespondingData = async (headerRef) => {
    let data = {
      headerRef: headerRef,
    };
    await this.props.getQuoteToInvoiceCorrespondingData(JSON.stringify(data));
  };
  /* #endregion */

  /* #region  [- getInvoiceToInvoiceCorrespondingData -] */
  getInvoiceToInvoiceCorrespondingData = async (headerRef) => {
    let data = {
      headerRef: headerRef,
    };
    await this.props.getInvoiceToInvoiceCorrespondingData(JSON.stringify(data));
  };
  /* #endregion */

  /* #region  [- getOrderToInvoiceCorrespondingData -] */
  getOrderToInvoiceCorrespondingData = async (headerRef) => {
    let data = {
      headerRef: headerRef,
    };
    await this.props.getOrderToInvoiceCorrespondingData(JSON.stringify(data));
  };
  /* #endregion */

  /* #region  [- getOrderToInvoiceConvertData -] */
  getOrderToInvoiceConvertData = async (headerRef) => {
    let data = {
      headerRef: headerRef,
    };
    await this.props.getOrderToInvoiceConvertData(JSON.stringify(data));
  };
  /* #endregion */

  /* #region  [- getOrderToInvoiceMergeData -] */
  getOrderToInvoiceMergeData = async (list) => {
    let data = {
      domainRef: this.props.domain,
      mergeHeaderRefList: list,
    };
    await this.props.getOrderToInvoiceMergeData(JSON.stringify(data));
  };
  /* #endregion */

  /* #region  [- getOrderToInvoiceSplitData -] */
  getOrderToInvoiceSplitData = async (headerRef) => {
    let data = {
      orderHeaderRef: headerRef,
    };
    await this.props.getOrderToInvoiceSplitData(JSON.stringify(data));
  };
  /* #endregion */

  /* #endregion */

  /* #region  [- render -] */
  render() {
    const localText = AG_GRID_LOCALE_FA;

    return (
      <Container fluid style={{ margin: "0", padding: "0", overflowX: "hidden", overflowY: 'scroll' }}>
        <Row name="row_01_Buttons">
          <Col sm="3" md="3" lg="1" style={{ paddingLeft: "0" }} hidden={this.state.isOrderButtonRowHidden}>
            <Button
              style={{
                backgroundColor: "#eceff1",
                color: "#b3b5b7",
                pointerEvents: "none",
                borderColor: "#eceff1",
                paddingRight: "0"
              }}
            >
              فاکتور
            </Button>
          </Col>
          <Col
            sm="9"
            md="9"
            lg="10"
            style={{
              textAlign: "right",
              paddingRight:
                this.state.isOrderButtonRowHidden === true
                  ? "0.8%"
                  : "0",
            }}
          >
            <Button
              className="submit-button-style"
              onClick={this.new}
              hidden={this.state.isNewHidden}
            >
              جدید
            </Button>
            <Button
              className="submit-button-style mr-2"
              onClick={this.edit}
              disabled={this.state.isEditDisabled}
              hidden={this.state.isEditHidden}
            >
              ویرایش
            </Button>
            <Button
              className="submit-button-style mr-2"
              disabled={this.state.isDeleteDisabled}
              onClick={this.delete}
              hidden={this.state.isDeleteHidden}
            >
              حذف
            </Button>
            <Button
              className="submit-button-style mr-2"
              onClick={this.invoiceToInvoiceCorresponding}
              disabled={this.state.isCorrespondingDisabled}
              hidden={this.state.isCorrespondingHidden}
            >
              سند متناظر
            </Button>
            <Button
              className="submit-button-style mr-2"
              onClick={this.newInvoiceRequisition}
              hidden={this.state.isRequisitionHidden}
              disabled={this.state.isRequisitionDisabled}
            >
              حواله خروج
            </Button>
            <Button className="submit-button-style mr-2"
              onClick={this.newInvoiceSalesReturn}
              hidden={this.state.isSalesReturnHidden}
              disabled={this.state.isSalesReturnDisabled}
            >
              برگشت از فروش
            </Button>
            <Button className="submit-button-style mr-2" disabled={true}>
              ثبت به عنوان الگو
            </Button>
            <Button
              className="submit-button-style mr-2"
              disabled={this.state.isArchiveDisabled}
              hidden={this.state.isArchiveHidden}
            >
              آرشیو
            </Button>
            <Button className="submit-button-style mr-2" onClick={this.refresh}>
              بازیابی
            </Button>
          </Col>
        </Row>
        <hr hidden={this.state.isOrderButtonRowHidden} />
        <Row name="row_02_Buttons" hidden={this.state.isOrderButtonRowHidden}>
          <Col sm="3" md="3" lg="1" style={{ paddingLeft: "0" }}>
            <Button
              style={{
                backgroundColor: "#eceff1",
                color: "#b3b5b7",
                pointerEvents: "none",
                borderColor: "#eceff1",
              }}
            >
              سفارش
            </Button>
          </Col>
          <Col
            sm="9"
            md="9"
            lg="11"
            style={{ textAlign: "right", paddingRight: "0" }}
          >
            <Button
              className="submit-button-style mr-2"
              onClick={this.invoiceToOrderConvert}
              disabled={this.state.isInvoiceToOrderConvertDisabled}
              hidden={this.state.isInvoiceToOrderConvertHidden}
            >
              تبدیل
            </Button>
            <Button
              className="submit-button-style mr-2"
              onClick={this.invoiceToOrderSplit}
              disabled={this.state.isInvoiceToOrderSplitDisabled}
              hidden={this.state.isInvoiceToOrderSplitHidden}
            >
              تفکیک
            </Button>
            <Button
              className="submit-button-style mr-2"
              onClick={this.invoiceToOrderMerge}
              disabled={this.state.isInvoiceToOrderMergeDisabled}
              hidden={this.state.isInvoiceToOrderMergeHidden}
            >
              ادغام
            </Button>
            <Button
              className="submit-button-style mr-2"
              onClick={this.invoiceToOrderCorresponding}
              disabled={this.state.isInvoiceToOrderCorrespondingDisabled}
              hidden={this.state.isInvoiceToOrderCorrespondingHidden}
            >
              سند متناظر
            </Button>
          </Col>
        </Row>

        <Row name="row_02_Grid">
          <Col
            sm="12"
            md="12"
            lg="12"
            className="ag-theme-alpine mt-2"
            style={{ height: "70vh", width: "100%", marginTop: "2%", marginBottom: '5%' }}
          >
            <AgGridReact
              gridOptions={this.state.gridOptions}
              onGridReady={this.onGridReady}
              masterDetail={true}
              detailCellRendererParams={this.state.detailCellRendererParams}
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData}
              enableRtl={true}
              rowSelection="multiple"
              onSelectionChanged={this.onSelectionChanged}
              localeText={localText}
              defaultColDef={this.state.defaultColDef}
             // detailRowHeight={500}
            ></AgGridReact>
          </Col>
        </Row>

        <Row name="row_03_Modal">
          <Modal
            name="newModal"
            visible={this.state.isNewModalVisible}
            destroyOnClose={this.state.isNewInvoiceModalDestroy}
            bodyStyle={{ padding: "0px" }}
            onOk={this.onOkNew}
            onCancel={this.onCancelNew}
            footer={[
              <Button
                key="1"
                className="cancel-button-style"
                onClick={this.onCancelNew}
              >
                لغو
              </Button>,
              <Button
                key="2"
                className="submit-button-style"
                onClick={this.approve}
              >
                تایید
              </Button>,
            ]}
          >
            <Container fluid>
              <Row
                name="row_03_Modal_Header"
                className="mb-2"
                style={{ borderBottom: "1px solid #f0f0f0" }}
              >
                <Col style={{ direction: "rtl", textAlign: "right" }}>
                  <span
                    style={{
                      height: "48px",
                      lineHeight: "48px",
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    فاکتور جدید
                  </span>
                </Col>
              </Row>

              <Row name="row_02_Modal_Content">
                <Col sm="12" style={{ textAlign: "right" }}>
                  <Form>
                    <br />
                    <FormGroup>
                      <Label
                        name="useTemplate"
                        style={{ marginRight: "15%" }}
                        check
                      >
                        <Input
                          type="radio"
                          id="1"
                          value="useTemplate"
                          name="new"
                          disabled={true}
                        />{" "}
                        استفاده از الگو
                      </Label>
                    </FormGroup>
                    <br />
                    <FormGroup>
                      <Label
                        name="newOrder"
                        style={{ marginRight: "15%" }}
                        check
                      >
                        <Input
                          type="radio"
                          id="2"
                          value="newOrder"
                          name="new"
                          checked={this.state.isNewOrderChecked}
                          onChange={this.handelChangeNewOrderRadioButtons}
                        />
                        فاکتور جدید
                      </Label>
                    </FormGroup>
                    <br />
                    <FormGroup>
                      <Label
                        name="useFromRegisteredDocuments"
                        style={{ marginRight: "15%" }}
                        check
                      >
                        <Input
                          type="radio"
                          id="3"
                          value="useFromRegisteredDocuments"
                          name="new"
                          checked={
                            this.state.isUseFromRegisteredDocumentsChecked
                          }
                          onChange={this.handelChangeNewOrderRadioButtons}
                        />
                        استفاده از اسناد ثبت شده
                      </Label>

                      <FormGroup
                        name="useFromRegisteredDocuments"
                        style={{ paddingRight: "20%" }}
                        hidden={!this.state.isUseFromRegisteredDocumentsChecked}
                      >
                        <Label name="order" check>
                          <Input
                            type="radio"
                            id="4"
                            value="order"
                            name="useFromRegisteredDocuments"
                            checked={this.state.isUseQuoteFlagChecked}
                            onChange={
                              this.handelChangeUseFromRegisteredDocuments
                            }
                          />
                          پیش فاکتور
                        </Label>
                        <br />
                        <Label name="order" check>
                          <Input
                            type="radio"
                            id="5"
                            value="order"
                            name="useFromRegisteredDocuments"
                            checked={this.state.isUseOrderFlagChecked}
                            onChange={
                              this.handelChangeUseFromRegisteredDocuments
                            }
                          />
                          سفارش
                        </Label>
                        <br />
                        <Label name="invoice" check>
                          <Input
                            type="radio"
                            id="6"
                            value="invoice"
                            name="useFromRegisteredDocuments"
                            checked={this.state.isUseInvoiceFlagChecked}
                            onChange={
                              this.handelChangeUseFromRegisteredDocuments
                            }
                          />
                          فاکتور
                        </Label>
                      </FormGroup>
                    </FormGroup>
                    <br />
                  </Form>
                </Col>
              </Row>
            </Container>
          </Modal>

          <Modal
            name="delete"
            visible={this.state.isDeleteModalVisible}
            bodyStyle={{ padding: "0px" }}
            closable={true}
            maskClosable={false}
            onCancel={this.onCloseDeleteModal}
            footer={[
              <Button
                key="1"
                className="cancel-button-style"
                onClick={this.onCloseDeleteModal}
              >
                لغو
              </Button>,
              <Button
                key="2"
                className="submit-button-style"
                onClick={this.deleteInModal}
              >
                حذف
              </Button>,
            ]}
          >
            <Container fluid>
              <Row name="header" className="modal-header-row mb-2">
                <Col className="modal-header-col">
                  <p className="modal-header-title">حذف</p>
                </Col>
              </Row>

              <Row name="content" style={{ marginBottom: "3%" }}>
                <Col sm="12" className="modal-content-col">
                  <p>آیا از حذف این رکورد اطمینان دارید ؟</p>
                </Col>
              </Row>
            </Container>
          </Modal>

          <Modal
            name="seen"
            visible={this.state.isSeenModalVisible}
            width={1000}
            destroyOnClose={this.state.isSeenModalDestroy}
            bodyStyle={{ padding: "0px" }}
            closable={true}
            maskClosable={false}
            onCancel={this.onCloseSeenModal}
            footer={[
              <Button
                key="1"
                className="cancel-button-style"
                onClick={this.onCloseSeenModal}
              >
                لغو
              </Button>,
            ]}
          >
            <Container fluid>
              <Row
                name="row_03_Modal_Header"
                className="mb-2"
                style={{ borderBottom: "1px solid #f0f0f0" }}
              >
                <Col style={{ direction: "rtl", textAlign: "right" }}>
                  <span
                    style={{
                      height: "48px",
                      lineHeight: "48px",
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    نمایش فاکتور{" "}
                  </span>
                </Col>
              </Row>
              <Row name="row_03_Modal_Content">
                <Col sm="12" style={{ textAlign: "right" }}>
                  {this.state.seenModalComponent}
                </Col>
              </Row>
            </Container>
          </Modal>

          <Modal
            name="print"
            visible={this.state.isPrintModalVisible}
            destroyOnClose={this.state.isPrintModalDestroy}
            width={1000}
            bodyStyle={{ padding: "0px" }}
            closable={false}
            maskClosable={true}
            onCancel={this.onClosePrintModal}
            maskStyle={{ backgroundColor: "white" }}
            footer={[]}
          >
            <Container fluid>
              <Row name="row_03_Modal_Content">
                <Col sm="12" style={{ textAlign: "right" }}>
                  {this.state.modalComponent}
                </Col>
              </Row>
            </Container>
          </Modal>

          <Modal
            name="newRequisitionModal"
            visible={this.state.isNewRequisitionModalVisible}
            destroyOnClose={this.state.isNewRequisitionModalDestroy}
            bodyStyle={{ padding: "0px" }}
            //onOk={this.onOkNewRequisition}
            onCancel={this.onCancelNewRequisition}
            footer={[
              <Button
                key="1"
                className="cancel-button-style"
                onClick={this.onCancelNewRequisition}
              >
                لغو
              </Button>,
              <Button
                key="2"
                className="submit-button-style"
                onClick={this.onApproveNewRequisition}
              >
                تایید
              </Button>,
            ]}
          >
            <Container fluid>
              <Row
                name="row_03_Modal_Header"
                className="mb-2"
                style={{ borderBottom: "1px solid #f0f0f0" }}
              >
                <Col style={{ direction: "rtl", textAlign: "right" }}>
                  <span
                    style={{
                      height: "48px",
                      lineHeight: "48px",
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    حواله خروج جدید
                  </span>
                </Col>
              </Row>
              <Row name="row_03_Modal_Content">
                <Col sm="12" style={{ textAlign: "right" }}>
                  <Form>
                    <br />
                    <FormGroup>
                      <Label
                        name="splitOnWarehouse"
                        style={{ marginRight: "15%" }}
                        check
                      >
                        <Input
                          type="radio"
                          id="splitOnWarehouse"
                          value="splitOnWarehouse"
                          name="split"
                          checked={this.state.isSplitOnWarehouseChecked}
                          onChange={this.handelChangeSplitOnWarehouse}
                        />{" "}
                        به تفکیک انبار
                      </Label>
                    </FormGroup>
                    <br />
                    <FormGroup hidden={true}>
                      <Label
                        name="splitOnProduct"
                        style={{ marginRight: "15%" }}
                        check
                      >
                        <Input
                          type="radio"
                          id="splitOnProduct"
                          value="splitOnProduct"
                          name="split"
                          checked={this.state.isSplitOnProductChecked}
                          onChange={this.handelChangeSplitOnProduct}
                        />
                        به تفکیک کالا
                      </Label>
                    </FormGroup>
                    <br />
                    <FormGroup>
                      <Label
                        name="splitOnWarhouseProduct"
                        style={{ marginRight: "15%" }}
                        check
                      >
                        <Input
                          type="radio"
                          id="splitOnWarhouseProduct"
                          value="splitOnWarhouseProduct"
                          name="split"
                          checked={this.state.isSplitOnWarhouseProductChecked}
                          onChange={this.handelChangeSplitOnWarhouseProduct}
                        />{" "}
                        به تفکیک کالا و انبار
                      </Label>
                    </FormGroup>
                    <br />
                  </Form>
                </Col>
              </Row>
            </Container>
          </Modal>

          <Modal
            name="InsertedCode"
            visible={this.state.isInsertedCodeListModalVisible}
            destroyOnClose={this.state.isInsertedCodeListModalDestroy}
            width={500}
            bodyStyle={{ padding: "0px" }}
            closable={true}
            maskClosable={false}
            onCancel={this.onCloseInsertedCodeListModal}
            footer={[
              <Button
                key="1"
                className="submit-button-style"
                onClick={this.onCloseInsertedCodeListModal}
              >
                متوجه شدم
              </Button>,
            ]}
          >
            <Container fluid>
              <Row name="row_03_Modal_Header" className="modal-header-row">
                <Col className="modal-header-col">
                  <span className="modal-header-title">
                    {" "}
                    {this.state.insertedCodeModalTitle}
                  </span>
                </Col>
              </Row>

              <Row name="row_03_Modal_Content">
                <Col sm="12" className="modal-content-col">
                  <Form
                    name="insertedIdList"
                    style={{ margin: "4% 5% 25% 5%" }}
                  >
                    <FormGroup
                      name="insertedIdList"
                      style={{ textAlign: "right" }}
                    >
                      {this.props.insertedCodeList.map((el) => (
                        <ul
                          key={el.code}
                          style={{ textAlign: "right", direction: "left" }}
                        >
                          <li>{this.renderCode(el.code)}</li>
                        </ul>
                      ))}
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Modal>

          <Modal
            name="invoiceToOrder"
            visible={this.state.isInvoiceToOrderModalVisible}
            destroyOnClose={this.state.isInvoiceToOrderModalDestroy}
            width={1000}
            bodyStyle={{ padding: "0px" }}
            closable={true}
            maskClosable={false}
            onCancel={this.onCloseInvoiceToOrderModal}
            footer={null}
          >
            <Container fluid>
              <Row name="row_03_Modal_Header" className="modal-header-row">
                <Col className="modal-header-col">
                  <span className="modal-header-title">
                    {this.state.invoiceToOrderModalTitle}
                  </span>
                </Col>
              </Row>

              <Row name="row_03_Modal_Content">
                <Col sm="12" className="modal-content-col">
                  {this.state.modalComponent}
                </Col>
              </Row>
            </Container>
          </Modal>

          <Modal
            name="invoiceToInvoice"
            visible={this.state.isInvoiceToInvoiceModalVisible}
            destroyOnClose={this.state.isInvoiceToInvoiceModalDestroy}
            width={1000}
            bodyStyle={{ padding: "0px" }}
            closable={true}
            maskClosable={false}
            onCancel={this.onCloseInvoiceToInvoiceModal}
            footer={null}
          >
            <Container fluid>
              <Row name="row_03_Modal_Header" className="modal-header-row">
                <Col className="modal-header-col">
                  <span className="modal-header-title">
                    {this.state.invoiceToInvoiceModalTitle}
                  </span>
                </Col>
              </Row>

              <Row name="row_03_Modal_Content">
                <Col sm="12" className="modal-content-col">
                  {this.state.modalComponent}
                </Col>
              </Row>
            </Container>
          </Modal>

          <Modal
            name="quoteToInvoice"
            visible={this.state.isQuoteToInvoiceModalVisible}
            destroyOnClose={this.state.isQuoteToInvoiceModalDestroy}
            width={1000}
            bodyStyle={{ padding: "0px" }}
            closable={true}
            maskClosable={false}
            onCancel={this.onCloseQuoteToInvoiceModal}
            footer={null}
          >
            <Container fluid>
              <Row name="row_03_Modal_Header" className="modal-header-row">
                <Col className="modal-header-col">
                  <span className="modal-header-title">
                    {this.state.quoteToInvoiceModalTitle}
                  </span>
                </Col>
              </Row>

              <Row name="row_03_Modal_Content">
                <Col sm="12" className="modal-content-col">
                  {this.state.modalComponent}
                </Col>
              </Row>
            </Container>
          </Modal>

          <Modal
            name="error"
            visible={this.state.isMergeCancelModalVisible}
            bodyStyle={{ padding: "0px" }}
            closable={true}
            maskClosable={false}
            onCancel={this.onCloseMergeCancelModal}
            footer={[
              <Button
                key="2"
                className="submit-button-style"
                onClick={this.onCloseMergeCancelModal}
              >
                متوجه شدم
              </Button>,
            ]}
          >
            <Container fluid>
              <Row name="header" className="modal-header-row mb-2">
                <Col className="modal-header-col">
                  <p className="modal-header-title">لغو فرآیند ادغام</p>
                </Col>
              </Row>

              <Row name="content" style={{ marginBottom: "3%" }}>
                <Col sm="12" className="modal-content-col">
                  <p>{this.state.mergeCancelModalMessage}</p>
                </Col>
              </Row>
            </Container>
          </Modal>

          <Modal
            name="selectAccount"
            visible={this.state.isSelectAccountModalVisible}
            destroyOnClose={this.state.isSelectAccountModalDestroy}
            width={500}
            bodyStyle={{ padding: "0px" }}
            closable={true}
            maskClosable={false}
            onCancel={this.onCloseSelectAccountModal}
            footer={[
              <Button
                key="1"
                className="cancel-button-style"
                onClick={this.onCloseSelectAccountModal}
              >
                لغو
              </Button>,
              <Button
                key="2"
                className="submit-button-style"
                onClick={this.submitAccount}
                disabled={this.state.isAccountSubmitButtonDisabled}
              >
                تایید
              </Button>,
            ]}
          >
            <Container fluid>
              <Row name="row_03_Modal_Header" className="modal-header-row">
                <Col className="modal-header-col">
                  <span className="modal-header-title">فاکتور جدید</span>
                </Col>
              </Row>

              <Row name="row_03_Modal_Content">
                <Col sm="12" className="modal-content-col">
                  <Form
                    name="accountBuyerRef"
                    style={{ margin: "4% 5% 25% 5%" }}
                  >
                    <FormGroup
                      name="accountBuyerRef"
                      style={{ textAlign: "right" }}
                    >
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

                    <FormGroup
                      name="accountSellerRef"
                      style={{ textAlign: "right" }}
                    >
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

          <Modal
            name="useRegisteredDocs"
            visible={this.state.isUseRegisteredDocumentsModalVisible}
            destroyOnClose={this.state.isUseRegisteredDocumentsModalDestroy}
            width={900}
            bodyStyle={{ padding: "0px" }}
            closable={true}
            maskClosable={false}
            onCancel={this.onCloseUseRegisteredDocumentsModal}
            footer={[
              <Button
                key="1"
                className="cancel-button-style"
                onClick={this.onCloseUseRegisteredDocumentsModal}
              >
                لغو
              </Button>,
            ]}
          >
            <Container fluid>
              <Row name="row_03_Modal_Header" className="modal-header-row">
                <Col className="modal-header-col">
                  <span className="modal-header-title">
                    {this.state.newRegisteredDocumentsModalTitle}
                  </span>
                </Col>
              </Row>

              <Row name="row_03_Modal_Content">
                <Col sm="12" className="modal-content-col">
                  {this.state.modalComponent}
                </Col>
              </Row>
            </Container>
          </Modal>

          <Modal
            name="InvoiceInsertedCode"
            visible={this.state.isInvoiceInsertedCodeListModalVisible}
            destroyOnClose={this.state.isInvoiceInsertedCodeListModalDestroy}
            width={500}
            bodyStyle={{ padding: "0px" }}
            closable={true}
            maskClosable={false}
            onCancel={this.onCloseInvoiceInsertedCodeListModal}
            footer={[
              <Button
                key="1"
                className="cancel-button-style"
                onClick={this.onCloseInvoiceInsertedCodeListModal}
              >
                خیر
              </Button>,
              <Button
                key="2"
                className="submit-button-style"
                onClick={this.newInvoiceRequisition}
              >
                بلی
              </Button>,
            ]}
          >
            <Container fluid>
              <Row name="row_03_Modal_Header" className="modal-header-row">
                <Col className="modal-header-col">
                  <span className="modal-header-title">
                    :فاکتور(ها) به شماره(ها)ی زیر ثبت شدند
                  </span>
                </Col>
              </Row>

              <Row name="row_03_Modal_Content">
                <Col sm="12" className="modal-content-col">
                  <Form
                    name="insertedIdList"
                    style={{ margin: "4% 5% 25% 5%" }}
                  >
                    <FormGroup
                      name="insertedIdList"
                      style={{ textAlign: "right" }}
                    >
                      {this.props.insertedCodeList.map((el) => (
                        <ul
                          key={el.code}
                          style={{ textAlign: "right", direction: "left" }}
                        >
                          <li>{this.renderCode(el.code)}</li>
                        </ul>
                      ))}
                    </FormGroup>
                  </Form>
                </Col>
              </Row>

              <Row name="row_03_Modal_Content" style={{ marginBottom: "5%" }}>
                <Col className="modal-header-col">
                  <p style={{ fontWeight: "500" }}>
                    آیا تمایل به صدور حواله خروج دارید؟
                  </p>
                </Col>
              </Row>
            </Container>
          </Modal>

          <Modal
            name="orderToInvoice"
            visible={this.state.isOrderToInvoiceModalVisible}
            destroyOnClose={this.state.isOrderToInvoiceModalDestroy}
            width={1000}
            bodyStyle={{ padding: "0px" }}
            closable={true}
            maskClosable={false}
            onCancel={this.onCloseOrderToInvoiceModal}
            footer={null}
          >
            <Container fluid>
              <Row name="row_03_Modal_Header" className="modal-header-row">
                <Col className="modal-header-col">
                  <span className="modal-header-title">
                    {this.state.orderToInvoiceModalTitle}
                  </span>
                </Col>
              </Row>

              <Row name="row_03_Modal_Content">
                <Col sm="12" className="modal-content-col">
                  {this.state.modalComponent}
                </Col>
              </Row>
            </Container>
          </Modal>

          <Modal
            name="InvoiceSplitInsertedCode"
            visible={this.state.isInvoiceSplitInsertedCodeListModalVisible}
            destroyOnClose={this.state.isInvoiceSplitInsertedCodeListModalDestroy}
            width={500}
            bodyStyle={{ padding: "0px" }}
            closable={true}
            maskClosable={false}
            onCancel={this.onCloseInvoiceSplitInsertedCodeListModal}
            footer={[
              <Button
                key="1"
                className="submit-button-style"
                onClick={this.onCloseInvoiceSplitInsertedCodeListModal}
              >
                متوجه شدم
              </Button>
            ]}
          >
            <Container fluid>
              <Row name="row_03_Modal_Header" className="modal-header-row">
                <Col className="modal-header-col">
                  <span className="modal-header-title">
                    :فاکتور(ها) به شماره(ها)ی زیر ثبت شدند
                  </span>
                </Col>
              </Row>

              <Row name="row_03_Modal_Content">
                <Col sm="12" className="modal-content-col">
                  <Form
                    name="insertedIdList"
                    style={{ margin: "4% 5% 25% 5%" }}
                  >
                    <FormGroup
                      name="insertedIdList"
                      style={{ textAlign: "right" }}
                    >
                      {this.props.insertedCodeList.map((el) => (
                        <ul
                          key={el.code}
                          style={{ textAlign: "right", direction: "left" }}
                        >
                          <li>{this.renderCode(el.code)}</li>
                        </ul>
                      ))}
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
const mapStateToProps = (state) => {
  return {
    checkTokenCounter: state.auth.checkTokenCounter,
    domain: state.auth.domain,
    userId: state.auth.userId,
    invoiceList: state.invoice.invoiceList,
    invoiceDetailProductList: state.invoice.invoiceDetailProductList,
    message: state.invoice.message,
    invoiceItemAccountList: state.invoice.invoiceItemAccountList,
    invoiceHeaderRef: state.invoice.invoiceHeaderRef,
    userMenuAccessList: state.auth.userMenuAccessList,
    insertedCodeList: state.invoice.insertedCodeList,
    isInvoiceMergable: state.invoice.isInvoiceMergable,

    quoteAccountBuyerTitleList: state.order.quoteAccountBuyerTitleList,
    quoteAccountSellerTitleList: state.order.quoteAccountSellerTitleList,
    orderAccountBuyerTitleList: state.order.orderAccountBuyerTitleList,
    orderAccountSellerTitleList: state.order.orderAccountSellerTitleList,
    invoiceAccountBuyerTitleList: state.order.invoiceAccountBuyerTitleList,
    invoiceAccountSellerTitleList: state.order.invoiceAccountSellerTitleList,
    isOrderMergable: state.invoice.isOrderMergable,
  };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = (dispatch) => ({
  checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
  getInvoiceData: (data) => dispatch(getInvoiceData(data)),
  resetNewInvoiceProps: (data) => dispatch(resetNewInvoiceProps(data)),
  getInvoice: (data) => dispatch(getInvoice(data)),
  getInvoiceItemProduct: (data) => dispatch(getInvoiceItemProduct(data)),
  deleteInvoice: (data) => dispatch(deleteInvoice(data)),
  resetMessage: () => dispatch(resetMessage()),
  getInvoiceItemGetData: (data) => dispatch(getInvoiceItemGetData(data)),
  saveInvoiceHeaderRef: (data) => dispatch(saveInvoiceHeaderRef(data)),
  getInvoiceItem: (data) => dispatch(getInvoiceItem(data)),
  resetEditInvoiceProps: (data) => dispatch(resetEditInvoiceProps(data)),
  getPrintInvoiceItem: (data) => dispatch(getPrintInvoiceItem(data)),
  getSeenInvoiceItem: (data) => dispatch(getSeenInvoiceItem(data)),
  getInvoiceDetailSplitOnWarehouse: (data) =>
    dispatch(getInvoiceDetailSplitOnWarehouse(data)),

  invoiceToOrderConvertResetProps: (data) =>
    dispatch(invoiceToOrderConvertResetProps(data)),
  getInvoiceToOrderConvertData: (data) =>
    dispatch(getInvoiceToOrderConvertData(data)),
  invoiceToOrderMergeResetProps: (data) =>
    dispatch(invoiceToOrderMergeResetProps(data)),
  getInvoiceToOrderMergeData: (data) =>
    dispatch(getInvoiceToOrderMergeData(data)),
  getInvoiceToOrderSplitData: (data) =>
    dispatch(getInvoiceToOrderSplitData(data)),
  invoiceToOrderSplitResetProps: (data) =>
    dispatch(invoiceToOrderSplitResetProps(data)),
  useRegisteredDocumentsResetProps: (data) =>
    dispatch(useRegisteredDocumentsResetProps(data)),
  getQuoteAccountTitle: (data) => dispatch(getQuoteAccountTitle(data)),
  getQuoteByAccount: (data) => dispatch(getQuoteByAccount(data)),
  getOrderAccountTitle: (data) => dispatch(getOrderAccountTitle(data)),
  getOrderByAccount: (data) => dispatch(getOrderByAccount(data)),
  getInvoiceAccountTitle: (data) => dispatch(getInvoiceAccountTitle(data)),
  getInvoiceByAccount: (data) => dispatch(getInvoiceByAccount(data)),
  quoteToInvoiceCorrespondingResetProps: (data) =>
    dispatch(quoteToInvoiceCorrespondingResetProps(data)),
  getQuoteToInvoiceCorrespondingData: (data) =>
    dispatch(getQuoteToInvoiceCorrespondingData(data)),
  invoiceToInvoiceCorrespondingResetProps: (data) =>
    dispatch(invoiceToInvoiceCorrespondingResetProps(data)),
  getInvoiceToInvoiceCorrespondingData: (data) =>
    dispatch(getInvoiceToInvoiceCorrespondingData(data)),

  orderToInvoiceCorrespondingResetProps: (data) =>
    dispatch(orderToInvoiceCorrespondingResetProps(data)),
  getOrderToInvoiceCorrespondingData: (data) =>
    dispatch(getOrderToInvoiceCorrespondingData(data)),
  getOrderToInvoiceConvertData: (data) =>
    dispatch(getOrderToInvoiceConvertData(data)),
  orderToInvoiceConvertResetProps: (data) =>
    dispatch(orderToInvoiceConvertResetProps(data)),
  orderToInvoiceSplitResetProps: (data) =>
    dispatch(orderToInvoiceSplitResetProps(data)),
  orderToInvoiceMergeResetProps: (data) =>
    dispatch(orderToInvoiceMergeResetProps(data)),
  getOrderToInvoiceMergeData: (data) =>
    dispatch(getOrderToInvoiceMergeData(data)),
  getOrderToInvoiceSplitData: (data) =>
    dispatch(getOrderToInvoiceSplitData(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Operation);
