/* #region  [- import -] */
import React, { PureComponent } from "react";
import { AgGridReact } from "ag-grid-react";
import { Container, Row, Col} from "reactstrap";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import "ag-grid-enterprise";
import GridFileDownloadButton from './newTimeline/attachFile/gridFileDownloadButton.component'
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { connect } from "react-redux";
/* #endregion */

class TimelineCRMFile extends PureComponent {
  //#region [- ctor -]
  constructor(props) {
    super(props);
    this.state = {

      //#region [- componentFields -]
      rowIndex: null,
      //#endregion 

      //#region [- dbFields -]
      fileType: "",
      fileTitle: "",

      //#endregion

      //#region [- lists -]
      rowData: [],
      //#endregion

      /* #region  [-AgGrid -] */
      columnDefs: [
        {
          headerName: "ردیف",
          //valueGetter: "node.rowIndex+1",
          cellClass: "locked-col",
          width: 80,
          checkboxSelection: true,
        },
        { headerName: "عنوان", field: "title", width: 200 },
        { headerName: "توضیحات", field: "descriptionRow", width: 250 },
        { headerName: 'فایل پیوست', field: "attachment", cellRenderer: "gridFileDownloadButton" },
      ],
      gridOption: {
        suppressRowClickSelection: true,
        context: { componentParent: this },
        frameworkComponents: {
          gridFileDownloadButton: GridFileDownloadButton
        }
      },
      defaultColDef: {
        sortable: true,
        resizable: true,
        filter: true,
    },

      /* #endregion */


    };
  }
  //#endregion

  //#region [*** methods ***]

  //#region [*** componentMethods ***]

  /* #region  [- componentDidMount -] */
  componentDidMount() {
    let list = [...this.props.timelineCRMFileList]
    this.setState({
      rowData: list,
    })
  }
  /* #endregion */

  /* #region  [- onGridReady -] */
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };
  /* #endregion */

  /* #region  [- getFileInformation -] */
  getFileInformation = (data) => {
    let fileType = data.split(".")[1]
    let fileTitle = data.split(".")[0].slice(12)
    this.setState({
      fileType: fileType,
      fileTitle: fileTitle
    });
  }
  /* #endregion */

  /* #region  [- showFileDownload -] */
  showFileDownload = async (data) => {
    var fileName = data.fileName
    var type = data.fileType
    // var file = Object.assign({}, data.attachedFile)
    var b64Data = data.attachedFile
    await this.convertBase64toBlob(b64Data, fileName, type);
  }
  /* #endregion */

  /* #region  [- convertBase64toBlob ] */
  convertBase64toBlob = (b64Data, fileName, type) => {
    var sliceSize = 512
    //const byteCharacters = atob(b64Data);

    //const byteCharacters =URL.createObjectURL(new Blob([b64Data]));
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays);
    const blobUrl = URL.createObjectURL(blob);
    var tempLink = document.createElement('a');
    tempLink.href = blobUrl;
    tempLink.setAttribute('download', `${fileName}.${type}`);
    tempLink.click();

  }
  /* #endregion */

  /* #region  [- onRowSelected -] */
  onRowSelected = (event) => {
    if (event.node.selected === true) {
      this.setState({
        rowIndex: event.node.rowIndex,
      });
    }
    else {
      this.setState({
        rowIndex: null,
      });
    }

  };
  /* #endregion */

  //#endregion

  //#region [- render() -]
  render() {
    return (

      <Container >

        <Row name="row_03_AgGrid" >
          <Col className="ag-theme-balham" style={{ height: '30vh', width: '100%' }}>
          <AgGridReact
            gridOptions={this.state.gridOption}
            columnDefs={this.state.columnDefs}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
            onRowSelected={this.onRowSelected}
            enableRtl={true}
            localeText={AG_GRID_LOCALE_FA}
            defaultColDef={this.state.defaultColDef}

          />
          </Col>
        </Row>

      </Container>
    );
  }
  //#endregion

  //#endregion
}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        checkTokenCounter: state.auth.checkTokenCounter,
        timelineCRMFileList:state.quoteTimeline.timelineCRMFileList
    }
};
/* #endregion */


export default connect(mapStateToProps)(TimelineCRMFile);
