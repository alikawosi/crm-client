import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from "react-redux";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AllModules } from 'ag-grid-enterprise';
import { AG_GRID_LOCALE_FA } from "../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { Container, } from "reactstrap";
import { saveMaterialInventoryDetailData } from '../../../../redux/warehouse/Inventory/inventory.action'


class ProductInventoryDetailCellRenderer extends PureComponent {
  /* #region  [- ctor -] */
  constructor(props) {
    super(props);

    this.state = {

      /* #region  [- agGrid -] */
      columnDefs: [
        {
          headerName: 'ردیف', headerCheckboxSelection: false,
          checkboxSelection: true, cellClass: 'locked-col',
          colId: "row",
          valueGetter: "node.rowIndex+1",
          cellRenderer: "agGroupCellRenderer"
        },
        { headerName: 'انبار', field: "warehouseTitle", },
        { headerName: 'موجودی اولیه', field: "initialInventory", },
        { headerName: 'موجودی فعلی', field: "" },
        { headerName: 'موجودی رزرو', field: "" },
      ],
      defaultColDef: {
        sortable: true,
        resizable: true,
        filter: true,
      },
      rowId: props.node.data.headerId,
      masterGridApi: props.api,
      rowData: props.node.data.inventoryList,
      materialId: props.node.data.materialId,
      materialScale: props.node.data.materialScale,
      /* #endregion */


    };
  }
  /* #endregion */

  /* #region  [- componentDidMount -] */
  componentDidMount() {
    let data = {
      warehouseId: '',
      materialId: '',
      initialInventory: '',
      scale: '',
    }

    this.props.saveMaterialInventoryDetailData(data)
  }
  /* #endregion */

  /* #region  [- onGridReady -] */
  onGridReady = async (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

  }
  /* #endregion */

  /* #region  [- onSelectionChanged() -] */
  onSelectionChanged = async () => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const len = selectedData.length;

    if (len === 0) {
      let data = {
        warehouseId: '',
        materialId: '',
        initialInventory: '',
        scale: '',
      }

      await this.props.saveMaterialInventoryDetailData(data)
    }
    else if (len === 1) {
      const picked = Object.keys(selectedData)[0];
      const pickedValue = selectedData[picked];
      let obj = {
        warehouseId: pickedValue.warehouseId,
        materialId: this.state.materialId,
        initialInventory: pickedValue.initialInventory,
        scale: this.state.materialScale,
      }
      await this.props.saveMaterialInventoryDetailData(obj)
    }
  }
  /* #endregion */


  /* #region  [- render -] */
  render() {

    return (
      <Container fluid >

        <div name='div_01_agGrid' className="ag-theme-alpine" style={{ width: '100%', padding: '2%', marginBottom: '3%', height: '300px', overflowY: 'scroll !important' }}>
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
            modules={AllModules}
            onGridReady={this.onGridReady}
            enableRtl={true}
            localeText={AG_GRID_LOCALE_FA}
            rowSelection="single"
            onSelectionChanged={this.onSelectionChanged}

          />

        </div>
      </Container>

    );
  }
  /* #endregion */

}
/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
  return {
  }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
  saveMaterialInventoryDetailData: (data) => dispatch(saveMaterialInventoryDetailData(data))
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(ProductInventoryDetailCellRenderer);