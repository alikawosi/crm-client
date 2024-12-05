
/* #region  [- imports -] */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button, } from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './inventory.component.css'
import {getInventory, getWarehouseProductInventory, postInventory, deleteInventory ,resetProps} from '../../../../../../../redux/product/inventory/inventory.action'
import Notification from "../../../../../../shared/common/notification/notification.component";
import CustomHeader from '../../../../../../shared/common/agGridCustomHeader/customHeader.component'
import { Modal } from 'antd';
import { AG_GRID_LOCALE_FA } from '../../../../../../shared/common/agGridLocalization/agGridLocalFA.component'
/* #endregion */

class Inventory extends PureComponent {

  /* #region  [- ctor -] */
  constructor(props) {
    super(props);

    this.state = {
      domainRef: this.props.domain,
      /* #region  [- Ag-gridDefiinitionStates -] */

      productGridColumnDefs: [
        {
          cellRenderer: this.rowCellRenderer,
          headerName: "ردیف",
          checkboxSelection: true,
          valueGetter: "node.rowIndex+1",
          cellClass: "locked-col",
          width: 100,
        },
        { headerName: "کالا", field: "title", width: 150, },
        { headerName: "تعداد ", field: "productInventory",colId: "productInventory", 
          valueFormatter: this.currencyFormatter,headerComponentParams: { menuIcon: 'fa fa-pencil' }
        , width: 100,editable: true },
        { headerName: "واحداندازه‌گیری", field: "scaleTitle" },
        { headerName: "تامین‌کننده", field: "supplierTitle" },
      ],
      defaultColDef: {
        sortable: true,
        resizable: true,
        filter: true,
        headerComponentParams: { menuIcon: 'fa-bars' },
    },
      productGridOptions: {
        frameworkComponents: {
            agColumnHeader: CustomHeader
        },
    },

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
        { headerName: "Id", field: "id", hide: true },
        { headerName: "نام کالا", field: "productTitle" },
        { headerName: "موجودی کالا", field: "productInventory" },
        { headerName: "موجودی رزرو", field: "productReserved" },
        { headerName: "موجودی فروخته شده", field: "productSold" },

      ],
      rowData: [],
      overlayLoadingTemplate:
        '<span class="ag-overlay-loading-center">در حال بارگذاری ...</span>',
      overlayNoRowsTemplate:
        '<span style="padding: 10px; border: 2px solid #444;">رکوردی برای نمایش وجود ندارد</span>',

      /* #endregion */

      /* #region  [- Field -] */

      id: 0,
      warehouseId: this.props.warehouseId,
      productRef: '',
      productInventory: '',
      selectedRowKeys: [],

      /* #endregion */

      //flags
      isDeleteButtonDisable: true,
      isSaveDisabled: true,
      isIntersectionVisible: false,

      //content
      modalComponent: <div></div>,
      
      //list
      inventoryList:this.props.inventoryList,
      invertoryInsretingList:[],
    }
  }
  /* #endregion */

  /* #region  [- methods -] */

  /* #region  [- componentDidMount() -] */
  async componentDidMount() {

    await this.getWarehouseProductInventory();
    await this.getInventory();
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
    this.setState({
      rowData: this.props.inventoryList
    })
  }
  /* #endregion */



  /* #region  [- getWarehouseProductInventory -] */
  getWarehouseProductInventory = async () => {

    let inventoryFormGetData = {
      domainRef: parseInt(this.state.domainRef)
    }
    await this.props.getWarehouseProductInventory(inventoryFormGetData)
  }

  /* #endregion */

  /* #region  [- getInventory -] */
getInventory = async () => {

  let inventoryGetData={
    warehouseRef: this.state.warehouseId,
    productRef: null
  }

  await this.props.getInventory(inventoryGetData)

}
/* #endregion */

  /* #region  [- postInventory -] */
  postInventory = async () => {

  var inventoryInsertingList =[{
    warehouseRef: this.state.warehouseId,
    productRef: this.state.productRef,
    productInventory:this.state.productInventory,
    productReserved:0,
    productSold:0
  }]
  var insertedInventoryList= this.props.inventoryList.filter( item => item.productRef === inventoryInsertingList[0].productRef && item.warehouseRef === inventoryInsertingList[0].warehouseRef )
  var len = insertedInventoryList.length
  
  if(len === 0 )
  {
    let inventoryPostData = {
      inventorylist: inventoryInsertingList
    }
    await this.props.postInventory(inventoryPostData)
  }
  else{
    this.setState({
      isIntersectionVisible:true
    })
    this.reset();
    this.deselectAllRows();
  }
  
  }

  /* #endregion */

  /* #region  [- deleteInventory -] */
  deleteInventory = async () => {

    let inventoryDeleteData = {
      inventoryIdlist: [{
          id: this.state.id
      }]
    }
    await this.props.deleteInventory(inventoryDeleteData)
  }

  /* #endregion */


  /* #region  [ - onGridReady - ] */
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
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

  /* #region  [- onSelectedRow() -] */
  onSelectedRow = () => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);

    const len = selectedData.length;
    if (len === 0) {
      this.setState({
        id: 0,
        isDeleteButtonDisable: true,

      });
    }
    if (len === 1) {
      const picked = Object.keys(selectedData)[0];
      const pickedValue = selectedData[picked];
      this.setState({
        id: pickedValue.id
      })
      if (pickedValue.checkRefFlag === true) {
        this.setState({
          isDeleteButtonDisable: true,

        })
      }
      else {
        this.setState({
          isDeleteButtonDisable: false,

        })
      }



    }
  }
  /* #endregion */

  /* #region  [- onSelectionChangedProduct -] */
  onSelectionChangedProduct = () => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const len = selectedData.length
    if (len === 0) {
        this.setState({
            isSaveDisabled: true
        })
    }
    else if (len === 1) {
        this.setState({
            isSaveDisabled: false
        })
    }
}
/* #endregion */

  /* #region  [- deselectAllRows() -] */
  deselectAllRows = async () => {
    await this.gridApi.deselectAll();
  };
  /* #endregion */


  /* #region  [- inputHandleChange(event) -] */
  inputHandleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });

  };
  /* #endregion */

  /* #region  [- onCellValueChanged(params) -] */
  onCellValueChanged = async (params) => {
    var colId = params.column.getId();
    var productId = params.data.id;
    var selectedProductList = [...this.props.warehouseProductInventoryList];
    if (colId === "productInventory") {
        var productInventory= selectedProductList.filter(x => x.id * 1 === params.data.id * 1)[0].productInventory = isNaN(params.data.productInventory) ? '' : params.data.productInventory * 1;

        this.setState({
          isSaveDisabled:false,
          productInventory: productInventory,
          productRef:productId
        })
      }
}
  /* #endregion */


  /* #region  [- onOkIntersections -] */
      onOkIntersections = async () => {

        this.setState({
            isIntersectionVisible: false,
            isSaveDisabled: true,
            modalComponent: <div></div>
        });


    };
    /* #endregion */

  /* #region  [- onCancelIntersections -] */
    onCancelIntersections = () => {
      this.setState({
          isIntersectionVisible: false,
          isSaveDisabled: true,
          modalComponent: <div></div>
      });
  }
  /* #endregion */

  /* #region  [- new -] */
  new = async () => {
      await this.postInventory();
      this.reset();
      this.deselectAllRows();

  }

  /* #endregion */

  /* #region  [- delete -] */

  delete = async () => {
    await this.deleteInventory();
    this.reset();

  }
  /* #endregion */

  /* #region  [- reset -] */

  reset = async () => {

    this.setState({
      id: 0,
      isDeleteButtonDisable: true,
      isSaveDisabled:true,
      productInventory: '',
      productRef:'',

    })
    await this.getInventory();
  }
  /* #endregion */


  /* #region  [- render() -] */

  render() {


    /* #region  [- const -] */


    /* #endregion */

    return (
      <Container fluid>

        <Row title="productSelectGrid" className="mt-2">
          <Col
            className="ag-theme-alpine"
            style={{ height: "30vh", width: "100%", marginBottom:'2%' }}
          >
              <AgGridReact
                enableRtl={true}
                defaultColDef={this.state.defaultColDef}
                columnDefs={this.state.productGridColumnDefs}
                onGridReady={this.onGridReady}
                onCellValueChanged={this.onCellValueChanged}
                rowData={this.props.warehouseProductInventoryList}
                rowSelection="single"
                gridOptions={this.state.productGridOptions}
                onSelectionChanged={this.onSelectionChangedProduct}
                localeText={AG_GRID_LOCALE_FA}
                overlayLoadingTemplate={this.state.overlayLoadingTemplate}
                overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
              />

          </Col>
        </Row>

        <Row title="buttons">
          <Col sm="12" style={{ textAlign: "right" }}>
            <Button title="addButton" className="submit-button-style mr-2" onClick={this.new} disabled={this.state.isSaveDisabled} >{" "}ذخیره{" "}</Button>
            <Button title="deleteButton" className="submit-button-style mr-2" disabled={this.state.isDeleteButtonDisable} onClick={this.delete} >  حذف</Button>
          </Col>
        </Row>

        <Row title="grid" className="mt-2">
          {/* { AgGridReact  } */}
          <Col
            className="ag-theme-alpine"
            style={{ height: "60vh", width: "100%" }}
          >
            <AgGridReact
              onGridReady={this.onGridReady}
              columnDefs={this.state.columnDefs}
              rowData={this.props.inventoryList}
              enableRtl={true}
              onRowSelected={this.onSelectedRow}
              overlayLoadingTemplate={this.state.overlayLoadingTemplate}
              overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
            ></AgGridReact>
          </Col>
        </Row>
      
        <Modal name="show intersections"
          closable={true}
          maskClosable={false}
          width='600px'
          bodyStyle={{ padding: '0px' }}
          visible={this.state.isIntersectionVisible}
          onOk={this.onOkIntersections}
          onCancel={this.onCancelIntersections}
          cancelButtonProps={{ style: { display: 'none' } }}

        >
          <Container fluid>
              <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                      <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>کالا تکراری انتخاب شده است! </span>
                  </Col>
              </Row>
              {this.state.modalComponent}
          </Container>
          </Modal>

      </Container>

    );
  }
  /* #endregion */

  /* #endregion */
}


/* #region  [- mapStateToProps -] */
const mapStateToProps = (state) => {
  return {
    inventoryList: state.inventory.inventoryList,
    warehouseProductInventoryList: state.inventory.warehouseProductInventoryList,
    message: state.inventory.message,
    domain: state.auth.domain
  };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = (dispatch) => ({
  getInventory: (data) => dispatch(getInventory(data)),
  getWarehouseProductInventory: (data) => dispatch(getWarehouseProductInventory(data)),
  postInventory: (data) => dispatch(postInventory(data)),
  deleteInventory: (data) => dispatch(deleteInventory(data)),
  resetProps: () => dispatch(resetProps()),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
