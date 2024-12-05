/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import { saveMaterialDetailData} from '../../../../../../../redux/product/material/material.action'
import { getMaterialCategory} from '../../../../../../../redux/product/materialCategory/materialCategory.action'
import { getProducerMaterial} from '../../../../../../../redux/product/producer/producer.action'
import { AgGridReact } from 'ag-grid-react';
import Notification from "../../../../../../shared/common/notification/notification.component";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import MaterialDetailCellRenderer from './materialDetailCellRenderer.component'

/* #endregion */
class Material extends PureComponent{


    /* #region  [- ctor -] */
    constructor(props){
        super(props);
        this.state = {

            //#region [- dbFields -]
            id: null,
            materialCaregoryRef:null,
            domainRef:this.props.domain,
            //#endregion

            /* #region  [- componentFields -] */
            selectedRowKeys: [],
            materialCategoryList:[],
            materialList:[],
            
            /* #endregion */

            /* #region  [* flags *] */
            isDeleteButtonDisabled: true,
            isModalDeleteButtonDisabled: true,
            // isNewButtonHidden: true,
            // isDeleteButtonHidden: true,

            /* #endregion */

            /* #region  [- ag-Grid -] */
                    columnDefs: [
                        {
                            // cellRenderer: this.cellRenderer,
                            headerName: 'ردیف',
                            headerCheckboxSelection: false,
                            checkboxSelection: false,
                            cellClass: 'locked-col',
                            colId: "row",
                            valueGetter: "node.rowIndex+1",
                            cellRenderer: "agGroupCellRenderer"
                        },
                        { headerName: 'عنوان', field: "title" },
                        { headerName: 'کد کالا', field: "code" },
                        { headerName: 'شماره سریال', field: "serialNumber" },
                        { headerName: 'مخفف', field: "abbreviation" },
                        { headerName: 'توضیحات', field: "descriptionRow" },
                    ],
        
                    detailRowHeight: 310,
                    defaultColDef: {
                        sortable: true,
                        resizable: true,
                        filter: true,
        
                    },
                    detailCellRenderer: 'materialDetailCellRenderer',
                    frameworkComponents: { materialDetailCellRenderer: MaterialDetailCellRenderer },
                    rowData: [],
                    overlayLoadingTemplate:
                        '<span class="ag-overlay-loading-center">در حال بارگذاری ...</span>',
                    overlayNoRowsTemplate:
                        '<span style="padding: 10px; border: 2px solid #444;">رکوردی برای نمایش وجود ندارد</span>',
                    /* #endregion */
        
        }
    }
/* #endregion */

    /* #region  [- componentDidMount() -] */
    async componentDidMount() {
        await this.getMaterialCategory();
        await this.getProducerMaterial();

       // await this.getMaterial();

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
        }
        /* #endregion */
    

    /* #region  [- getMaterialCategory() -] */
    getMaterialCategory = async () => {
        let materialCategoryGetData = {
            domainRef: parseInt(this.state.domainRef)
        }
        await this.props.getMaterialCategory(materialCategoryGetData);
        this.setState({
            materialCategoryList: this.props.materialCategoryList,
        })
    }
    /* #endregion */

    /* #region  [- getProducerMaterial() -] */
    getProducerMaterial = async () => {
        let producerMaterialGetData = {
            supplyChainId: this.props.producerId
        }
        await this.props.getProducerMaterial(producerMaterialGetData);

    }
    /* #endregion */


    /* #region  [ - onGridReady - ] */
onGridReady = params => {
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
        id: '',
      });
    }
    else if (len === 1) {
      this.gridApi.forEachNode(node => node.setExpanded(false))
      let obj = {}
      await this.props.saveMaterialDetailData(obj)
      const picked = Object.keys(selectedData)[0];
      const pickedValue = selectedData[picked];

      this.setState({
        id: pickedValue.id,
      })
    }


  }
  /* #endregion */

    /* #region  [- deselectAllRows() -] */
deselectAllRows = async () => {
    await this.gridApi.deselectAll();
}
/* #endregion */


    /* #region  [- save() -] */
    save = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);

    }
    /* #endregion */

    /* #region  [- delete() -] */
    delete = async () => {

        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.deleteMaterialScale();

    }
    /* #endregion */


    render() {

        return(
            <Container>
                <Row name='insertGrid' style={{ marginTop:'10px', marginBottom:'10px' }}>
                    <Col key='agGrid' className='ag-theme-alpine' style={{ height: '40vh', width: '100%' }}>
                        <AgGridReact
                            gridOptions={this.state.gridOptions}
                            masterDetail={true}
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.materialCategoryList}
                            enableRtl={true}
                            onGridReady={this.onGridReady}
                            rowSelection='single'
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.defaultColDef}
                            detailRowHeight={this.state.detailRowHeight}
                            detailCellRenderer={this.state.detailCellRenderer}
                            frameworkComponents={this.state.frameworkComponents}
                        >
                        </AgGridReact>
                    </Col>
                </Row>

                <Row title='buttons'>

                    <Col sm='12' md='12' lg='12' style={{ textAlign: 'right',marginBottom:'1%' }}>
                        
                        <Button hidden={this.state.isNewButtonHidden} className='submit-button-style mr-2' onClick={this.new}>
                            جدید
                        </Button>
                        <Button hidden={this.state.isDeleteButtonHidden} className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteButtonDisabled}>
                            حذف
                        </Button>

                    </Col>
                </Row>

                <Row name='grid'  style={{ marginTop:'10px', marginBottom:'10px' }}>
                    <Col key='agGrid' className='ag-theme-alpine' style={{ height: '40vh', width: '100%' }}>
                        <AgGridReact
                            gridOptions={this.state.gridOptions}
                            columnDefs={this.state.columnDefs}
                            rowData={this.props.producerMaterialList}
                            enableRtl={true}
                            onGridReady={this.onGridReady}
                            rowSelection='single'
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.defaultColDef}
                        >
                        </AgGridReact>
                    </Col> 
                </Row>
            </Container>
        )

    }

}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        materialCategoryList: state.materialCategory.materialCategoryList,
        producerMaterialList: state.producer.producerMaterialList,
        message: state.supplyChain.message,
        domain: state.auth.domain,
        materialDetailData: state.material.materialDetailData,
        userMenuAccessList: state.auth.userMenuAccessList,
        checkTokenCounter: state.auth.checkTokenCounter,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    getMaterialCategory: (data) => dispatch(getMaterialCategory(data)),
    getProducerMaterial: (data) => dispatch(getProducerMaterial(data)),
    saveMaterialDetailData: (data) => dispatch(saveMaterialDetailData(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Material);