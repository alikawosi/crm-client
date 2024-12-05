import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from "react-redux";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AllModules } from 'ag-grid-enterprise';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { Container, } from "reactstrap";
import { saveMaterialDetailData} from '../../../../../../../redux/product/material/material.action'
import { getMaterialCategoryMaterial} from '../../../../../../../redux/product/supplyChain/supplyChain.action'



class MaterialDetailCellRenderer extends PureComponent {
  /* #region  [- ctor -] */
  constructor(props) {
    super(props);

    this.state = {
        domainRef: this.props.domain,
      /* #region  [- agGrid -] */
      columnDefs: [
        {
            // cellRenderer: this.cellRenderer,
            headerName: 'ردیف',
            headerCheckboxSelection: false,
            checkboxSelection: true,
            cellClass: 'locked-col',
            colId: "row",
            valueGetter: "node.rowIndex+1",
            cellRenderer: "agGroupCellRenderer"
        },
        { headerName: 'عنوان', field: "title" },
        { headerName: 'مخفف', field: "abbreviation" },
        { headerName: 'کد کالا', field: "code" },
        { headerName: 'کد قدیمی', field: "previousCode" },
        { headerName: 'توضیحات', field: "descriptionRow" },
      ],
      defaultColDef: {
        sortable: true,
        resizable: true,
        filter: true,
      },
      rowId: props.node.data.id,
      masterGridApi: props.api,
      rowData: [],
      materialCategoryRef: props.node.data.id,

      /* #endregion */


    };
  }
  /* #endregion */

  /* #region  [- componentDidMount -] */
  async componentDidMount() {
     
          this.saveMaterialDetailData()   
    await this.getMaterialCategoryMaterial();
    this.setState({
        rowData: this.props.materialCategoryMaterialList
    })
        


  }
  /* #endregion */

  /* #region  [- saveMaterialDetailData() -] */
      saveMaterialDetailData = async () => {
        let data = {
            id: '',
            materialCategoryRef: '',
          }
        await this.props.saveMaterialDetailData(data);
    
    }
    /* #endregion */

  /* #region  [- getMaterialCategoryMaterial() -] */
    getMaterialCategoryMaterial = async () => {
    let materialCategoryMaterialGetData = {
        domainRef: parseInt(this.state.domainRef),
        materialCategoryRef: this.state.materialCategoryRef
    }
    await this.props.getMaterialCategoryMaterial(materialCategoryMaterialGetData);

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
        id: '',
        materialCategoryRef: '',
      }

      await this.props.saveMaterialDetailData(data)
    }
    else if (len === 1) {
      const picked = Object.keys(selectedData)[0];
      const pickedValue = selectedData[picked];
      let obj = {
        id: pickedValue.id,
        materialCategoryRef: this.state.materialCategoryRef,

      }
      await this.props.saveMaterialDetailData(obj)
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
            rowSelection={'multiple'}
            rowMultiSelectWithClick={true}
            groupSelectsChildren="true"
            suppressRowClickSelection="true"
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
    domain: state.auth.domain,
    materialCategoryMaterialList: state.supplyChain.materialCategoryMaterialList,
  }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    saveMaterialDetailData: (data) => dispatch(saveMaterialDetailData(data)),
    getMaterialCategoryMaterial: (data) => dispatch(getMaterialCategoryMaterial(data)),
    
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(MaterialDetailCellRenderer);