/* #region  [- imports] */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";
import { Icon, CalloutContent } from "office-ui-fabric-react";
import { initializeIcons } from "@uifabric/icons";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { Drawer, Modal } from "antd";
import Notification from "../../../shared/common/notification/notification.component";
import Inventory from './inventory.component'
import CustomHeader from '../../../shared/common/agGridCustomHeader/customHeader.component'
//import { saveMaterialInventoryDetailData } from '../../../../redux/warehouse/Inventory/inventory.action'
import {getProductInventory,getProductWarehouseInventory,putInventory } from '../../../../redux/product/inventory/inventory.action' 
import MaterialInventoryDetailCellRenderer from './productInventoryDetailCellRenderer.component'
initializeIcons();
/* #endregion */

class ProductInventory extends PureComponent {

  /* #region  [- ctor -] */

  constructor(props) {
    super(props);

    this.state = {

      /* #region  [- ag-Grid -] */
      columnDefs: [
        {
          headerName: 'ردیف', headerCheckboxSelection: false,
          checkboxSelection: true, cellClass: 'locked-col',
          colId: "row",
          valueGetter: "node.rowIndex+1",
          cellRenderer: "agGroupCellRenderer"
        },
        { headerName: "کالا", field: "title", },
        { headerName: "واحد اندازه‌گیری ", field: "scaleTitle" },
        { headerName: "تامین کنندگان", field: "supplierTitle" },
        { headerName: " موجودی", field: "productInventory" },
        { headerName: " موجودی رزرو", field: "productReserved" },
      ],
      defaultColDef: {
        sortable: true,
        resizable: true,
        filter: true,

      },
      detailCellRendererParams: {

        detailGridOptions: {
            columnDefs: [
                { headerName: 'انبار', field: "warehouseTitle" },
                { headerName: 'موجودی', field: "productInventory", editable:true, colId: "productInventory", 
                  valueFormatter: this.currencyFormatter,headerComponentParams: { menuIcon: 'fa fa-pencil' }, width: 100,
                  onCellValueChanged :(params) =>{this.putInventory(params)}
       },
                { headerName: 'موجودی رزرو', field: "productReserved" },
                { headerName: 'توضیحات', field: "descriptionRow",editable:true,
                 headerComponentParams: { menuIcon: 'fa fa-pencil' }, width: 100,
                 onCellValueChanged :(params) =>{this.putInventory(params)} },
            ],
            enableRtl: 'true',
        },
        getDetailRowData: (params) => {this.getProductWarehouseInventory(params);},
        frameworkComponents: {
          agColumnHeader: CustomHeader
      },
    },

      detailRowHeight: 310,
      frameworkComponents: { productInventoryDetailCellRenderer: MaterialInventoryDetailCellRenderer },

      overlayLoadingTemplate:
        '<span class="ag-overlay-loading-center">در حال بارگذاری ...</span>',
      overlayNoRowsTemplate:
        '<span style="padding: 10px; border: 2px solid #444;">رکوردی برای نمایش وجود ندارد</span>',

      /* #endregion */

      /* #region  [- statesForNewDrawer -] */
      isNewDrawerVisible: false,
      newDrawerContent: <div></div>,
      /* #endregion */

      materialId: '',
      warehouseId: '',
      initialInventory: '',
      scale: '',
      selectedRowKeys: [],
      //Flags
      isPrintModalVisible: false,
      isExcelImportModalVisible: false,
      isSetInventoryButtonHidden: true,
      isRefreshButtonHidden: true,
      isExcelButtonHidden: true,
      isPrintButtonHidden: true,
    };
  }
  /* #endregion */

  /* #region  [- methods -] */

  /* #region  [- componentDidMount() -] */
  componentDidMount() {
    this.getProductInventory();
    this.accessToMenu(this.props.userMenuAccessList);

  }
  /* #endregion */

  /* #region  [- accessToMenu -] */
  accessToMenu = (data) => {
    if (data.includes("214")) {
      this.setState({
        isSetInventoryButtonHidden: false
      })
    }
    if (data.includes("212")) {
      this.setState({
        isRefreshButtonHidden: false
      })
    }
    if (data.includes("367")) {
      this.setState({
        isPrintButtonHidden: false
      })
    }

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
    // if (this.props.materialInventoryDetailData.initialInventory !== undefined &&
    //   this.props.materialInventoryDetailData.initialInventory !== prevProps.materialInventoryDetailData.initialInventory &&
    //   this.props.materialInventoryDetailData.initialInventory !== '') {
    //   this.gridApi.deselectAll()
    //   this.gridApi.forEachNode(node => {
    //     if (node.data.materialId !== this.props.materialInventoryDetailData.materialId) {
    //       node.setExpanded(false)
    //     }
    //   })
    // }

    
  }
  /* #endregion */


  /* #region  [- getProductInventory -] */
  getProductInventory = async () => {

    let productInventoryGetData = {
      domainRef: this.props.domain
    }
    await this.props.getProductInventory(productInventoryGetData)
  }

  /* #endregion */

  /* #region  [- getProductWarehouseInventory -] */

    getProductWarehouseInventory = async (params) => {
      let data = {
      productRef: params.data.id,
      };
      await this.props.getProductWarehouseInventory(JSON.stringify(data));
      params.successCallback(this.props.productWarehouseInventoryList);
  };
/* #endregion */

  /* #region  [- putInventory -] */
  
  putInventory = async (params) =>{

  let inventoryPutData={
    inventoryList:[{
      id: params.data.id,
      productInventory: parseInt(params.data.productInventory),
      descriptionRow: params.data.descriptionRow
    }]
  }
   await this.props.putInventory(inventoryPutData);
   this.getProductInventory();
  }

/* #endregion */
  

/* #endregion */


  /* #region  [- postExcelFile -] */
  postExcelFile = async (excelData) => {
    let organizationPostData = {
      domainRef: this.props.domain,
      organizationList: excelData
    }
    await this.props.postOrganization(organizationPostData);
  }
  /* #endregion */

  /* #region  [ - onGridReady - ] */
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  };
  /* #endregion */

  /* #region  [- onSelectionChanged() -] */
  onSelectionChanged = async () => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const len = selectedData.length;

    if (len === 0) {
      this.setState({
        materialId: '',
        scale: ''
      });
    }
    else if (len === 1) {
      this.gridApi.forEachNode(node => node.setExpanded(false))
      let obj = {}
      //await this.props.saveMaterialInventoryDetailData(obj)
      const picked = Object.keys(selectedData)[0];
      const pickedValue = selectedData[picked];

      this.setState({
        materialId: pickedValue.materialId,
        scale: pickedValue.materialScale
      })
    }


  }
  /* #endregion */

  /* #region  [- deselectAllRows() -] */
  deselectAllRows = async () => {
    await this.gridApi.deselectAll();
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



  /* #region  [- toggleNewDrawer() -] */
  toggleNewDrawer = async () => {
    if (this.state.isNewDrawerVisible === true) {

      this.setState({
        isNewDrawerVisible: false,
        newDrawerContent: <div></div>,
      });
      await this.refresh();

    } else if (this.state.isNewDrawerVisible === false) {
      let data = this.props.materialInventoryDetailData
      if (data.warehouseId === undefined) {
        this.setState({
          isNewDrawerVisible: true,
          newDrawerContent: <Inventory materialId={this.state.materialId} warehouseId='' initialInventory='' scale={this.state.scale} onClose={this.toggleNewDrawer}></Inventory>,
        });
      }
      else {
        this.setState({
          isNewDrawerVisible: true,
          newDrawerContent: <Inventory materialId={data.materialId} warehouseId={data.warehouseId} initialInventory={data.initialInventory} scale={data.scale} onClose={this.toggleNewDrawer}></Inventory>,
        });
      }

    }
  };
  /* #endregion */

  /* #region  [- togglePrintModal() -] */
  togglePrintModal = () => {

    if (this.state.isPrintModalVisible === true) {
      this.setState({
        isPrintModalVisible: false,
      })
    }
    else if (this.state.isPrintModalVisible === false) {
      this.setState({
        isPrintModalVisible: true
      })
    }

  }
  /* #endregion */

  /* #region  [- toggleExcelImportModal() -] */
  toggleExcelImportModal = () => {

    if (this.state.isExcelImportModalVisible === true) {
      this.setState({
        isExcelImportModalVisible: false,
      })
    }
    else if (this.state.isExcelImportModalVisible === false) {
      this.setState({
        isExcelImportModalVisible: true
      })
    }

  }
  /* #endregion */

  /* #region  [- showImportModal -] */
  showImportModal = () => {
    this.toggleExcelImportModal();
  }
  /* #endregion */

  /* #region  [- getDataFromExcelModal -] */
  getDataFromExcelModal = async () => {
    this.child.send();
    this.toggleExcelImportModal();
    await this.getOrganization();
  }
  /* #endregion */

  
  /* #region  [- print -] */
  print = () => {
    this.togglePrintModal();
  }
  /* #endregion */

  /* #region  [- new -] */

  //Function for OnClick addButton

  new = () => {
    this.toggleNewDrawer();

  };
  /* #endregion */

  /* #region  [- refresh -] */
  refresh = async () => {

    await this.getMaterialInventory();
    this.gridApi.deselectAll();
    this.setState({
      materialId: '',
      warehouseId: '',
      scale: '',
      initialInventory: ''
    })
    let data = {
      warehouseId: '',
      materialId: '',
      initialInventory: '',
      scale: '',
    }

    //await this.props.saveMaterialInventoryDetailData(data)
    this.gridApi.forEachNode(node => node.setExpanded(false))
  }
  /* #endregion */


  /* #region  [- render() -] */
  render() {


    return (
      <Container fluid>
        <Row name='header' className='mt-4' style={{ width: 'inherit' }}>
          {/* <div
            style={{
              float: "right",
              width: "48px",
              height: "48px",
              background: "linear-gradient(60deg, rgb(180, 204, 222), rgb(95, 217, 244))",
              borderRadius: "50%",
              marginRight: "1%",
            }}
          >
            <Icon
              iconName="OfflineStorage"
              style={{
                fontSize: "20px",
                marginTop: "8px",
                //marginRight: "13px",
              }}
            />
          </div> */}
          <Col style={{ textAlign: 'right', fontSize: '25px' }}>
            موجودی کالا
          </Col>
        </Row>
        <hr />
        <Row title="buttons">
          <Col sm="6" style={{ textAlign: "right" }}>
            <Button title="addButton" hidden={true} className="submit-button-style mr-2"  >{" "}ثبت موجودی کالا{" "}</Button>
            <Button title="refreshButton" hidden={this.state.isRefreshButtonHidden} className="submit-button-style mr-2" onClick={this.refresh} >{" "}بازیابی{" "}</Button>
          </Col>
          <Col sm='6' style={{ textAlign: 'left' }}>
          </Col>
        </Row>

        <Row title="grid" className="mt-2">

          <Col className="ag-theme-alpine" style={{ height: "60vh", width: "100%" }}>
            <AgGridReact
              onGridReady={this.onGridReady}
              masterDetail={true}
              detailCellRendererParams={this.state.detailCellRendererParams}
              columnDefs={this.state.columnDefs}
              rowData={this.props.productInventoryList}
              enableRtl={true}
              rowSelection='single'
              onSelectionChanged={this.onSelectionChanged}
              onCellValueChanged={this.putInventory}
              localeText={AG_GRID_LOCALE_FA}
              defaultColDef={this.state.defaultColDef}
              detailRowHeight={this.state.detailRowHeight}
              frameworkComponents={this.state.frameworkComponents}
            ></AgGridReact>
          </Col>

        </Row>

        <Row title="drawersAndModals">
          {/* New Drawer */}
          <Drawer
            placement={"left"}
            width={600}
            bodyStyle={{ padding: "0px" }}
            closable={true}
            maskClosable={false}
            visible={this.state.isNewDrawerVisible}
            onClose={this.toggleNewDrawer}
          >
            {this.state.newDrawerContent}
          </Drawer>

          {/* Print Modal */}
          <Modal
            visible={this.state.isPrintModalVisible}
            bodyStyle={{ padding: '0px' }}
            maskClosable={false}
            closable={true}
            onOk={this.togglePrintModal}
            onCancel={this.togglePrintModal}
            footer={[
              <Button key='1' className='submit-button-style' onClick={this.togglePrintModal}>
                تایید
              </Button>
            ]}
          >
            <Container fluid>
              <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                  <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>چاپ</span>
                </Col>
              </Row>
              <Row title='content'>
                <Col sm='12' style={{ textAlign: 'right' }}>
                  <h3>این عملکرد اکنون در دسترس نیست !</h3>
                </Col>
              </Row>
            </Container>
          </Modal>
          {/* Excel  Modal */}
          <Modal
            visible={this.state.isExcelImportModalVisible}
            bodyStyle={{ padding: '0px' }}
            maskClosable={false}
            closable={true}
            onOk={this.toggleExcelImportModal}
            onCancel={this.toggleExcelImportModal}
            destroyOnClose={true} closable={false}
            footer={[
              <Button key='1' className='submit-button-style' onClick={this.getDataFromExcelModal}>
                ذخیره
              </Button>
            ]}

          >
            <Container fluid>
              <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                  <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>بارگذاری فایل اکسل</span>
                </Col>
              </Row>
              <Row title='content'>
                <Col sm='12' >
                  {/* <ExcelImport title='Organization' sendExcelFileList={this.postExcelFile} columnsDef={columns} onRef={ref => (this.child = ref)} /> */}
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
    domain: state.auth.domain,
    productInventoryList: state.inventory.productInventoryList,
    productWarehouseInventoryList: state.inventory.productWarehouseInventoryList,
    userMenuAccessList: state.auth.userMenuAccessList,
  };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = (dispatch) => ({

  //saveMaterialInventoryDetailData: (data) => dispatch(saveMaterialInventoryDetailData(data)),
  getProductInventory: (data) => dispatch(getProductInventory(data)),
  getProductWarehouseInventory: (data) => dispatch(getProductWarehouseInventory(data)),
  putInventory: (data) => dispatch(putInventory(data))
  
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(ProductInventory);
