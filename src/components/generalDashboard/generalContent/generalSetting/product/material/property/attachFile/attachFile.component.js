/* #region  [- import -] */
import React, { PureComponent } from "react";
import {
  Container,
  FormGroup,
  Card,
  Label,
  Row,
  Col,
  Button,
  FormFeedback,
  Form,
  Input,
  CustomInput,
} from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import "ag-grid-enterprise";
import GridFileDownloadButton from './gridFileDownloadButton.component'
import { AG_GRID_LOCALE_FA } from "../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import './attachFile.component.css'
/* #endregion */

class AttachFile extends PureComponent {
  //#region [- ctor -]
  constructor(props) {
    super(props);
    this.state = {

      //#region [- componentFields -]
      rowIndex: null,
      fileLabel: <div></div>,
      //#endregion 

      //#region [- dbFields -]
      title: "",
      fileType: "",
      fileTitle: "",
      descriptionRow: "",
      selectedFile: "",
      //#endregion

      //#region [* flags *]
      isSubmitDisabled: false,
      isAddDisabled: false,
      isDeleteDisabled: true,

      //#endregion

      //#region [- formValidation -]
      errors: {},

      isTitleInvalid: false,
      isTitleValid: false,

      isFileInvalid: false,
      isFileValid: false,

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

    let list = [...this.props.propertyAttachedFileList]
    this.setState({
      rowData: list,
      fileLabel: <CustomInput
        type="file"
        id="file"
        name="file"
        label='انتخاب کنید'
        onChange={this.onChangeHandler}
        invalid={this.state.isFileInvalid}
        valid={this.state.isFileValid}
      />
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
        isDeleteDisabled: false
      });
    }
    else {
      this.setState({
        rowIndex: null,
        isDeleteDisabled: true
      });
    }

  };
  /* #endregion */

  /* #region  [- refreshForm -] */
  refreshForm = async () => {
    await this.setState({
      fileLabel: <div></div>,
      //#region [- formValidation -]
      errors: {},

      isTitleInvalid: false,
      isTitleValid: false,

      isFileInvalid: false,
      isFileValid: false,

      //#endregion
    })
    this.setState({

      //#region [- componentFields -]
      rowIndex: null,
      fileLabel:
        <Input
          type="file"
          id="file"
          name="file"
          label='انتخاب کنید'
          onChange={this.onChangeHandler}
          invalid={this.state.isFileInvalid}
          valid={this.state.isFileValid}
        />,
      //#endregion 

      //#region [- dbFields -]
      title: "",
      fileType: "",
      fileTitle: "",
      descriptionRow: "",
      selectedFile: "",
      //#endregion

      //#region [* flags *]

      /* #region  [- Disabled -] */
      isSubmitDisabled: false,
      isAddDisabled: false,
      isDeleteDisabled: true,
      /* #endregion */

      //#endregion



    });
  }
  /* #endregion */

  //#region [- validateForm() -]
  validateForm = async (event) => {
    var errors = this.state.errors;

    switch (event.target.id) {

      //#region [- title -]
      case "title":
        if (event.target.value === "") {
          this.setState({
            isTitleInvalid: true,
            isTitleValid: false
          });
          errors["title"] = "عنوان اجباری است";
        }
        else {
          this.setState({
            isTitleInvalid: false,
            isTitleValid: true
          });
        }
        break;
      //#endregion

      default:
        var errors = {};
        break;
    }

    this.setState({
      errors: errors
    });
  }
  //#endregion

  //#region [- validateFormOnButtonClick() -]
  validateFormOnButtonClick = async () => {
    var errors = {};
    var isFormValid = false;

    //#region [- title -]   
    if (this.state.title === "") {
      this.setState({
        isTitleInvalid: true,
        isTitleValid: false
      });
      errors["title"] = "عنوان اجباری است";
    }
    else {
      this.setState({
        isTitleInvalid: false,
        isTitleValid: true
      });

    }

    //#endregion

    //#region [- file -]   
    if (this.state.selectedFile.length === 0) {
      this.setState({
        isFileInvalid: true,
        isFileValid: false
      });
      errors["file"] = "فایل اجباری است";
    }
    else {
      this.setState({
        isFileInvalid: false,
        isFileValid: true,
      });

    }

    //#endregion

    this.setState({
      errors: errors
    });

    if (Object.keys(errors).length === 0) {
      isFormValid = true
    }
    else {
      isFormValid = false
    }
    return isFormValid;
  }

  //#endregion

  //#endregion

  //#region [*** Handle Changes ***]

  /* #region  [- onChangeHandler -] */
  onChangeHandler = async (e) => {
    var errors = this.state.errors;
    if (Object.keys(e.target.files).length > 0) {
      const file = e.target.files[0];
      await this.getFileInformation(e.target.value);
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => {
          resolve(event.target.result);
          this.setState({
            selectedFile: event.target.result.split(",")[1],
            isFileInvalid: false,
            isFileValid: true,
          });
        };
        reader.onerror = err => {
          reject(err);
        };
        reader.readAsDataURL(file);
      });
    }

    //validation
    else {
      this.setState({
        isFileInvalid: true,
        isFileValid: false,
        selectedFile: "",
      });
      errors["file"] = "فایل اجباری است";
    }
    this.setState({
      errors: errors
    });

  };
  /* #endregion */

  /* #region  [- handleChange -] */
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.validateForm(event);
  };
  /* #endregion */

  //#endregion

  //#region [*** buttonTasks ***]

  /* #region  [- download() -] */
    download = async (data) => {
      await this.props.checkTokenExpiration(this.props.checkTokenCounter);
      this.convertBase64toBlob(data.attachedFile, data.fileTitle, data.fileType);
  }
  /* #endregion */

/* #region  [- onCancel -] */
  onCancel = () =>{


    this.props.onCancelAttachFileModal();

  }
/* #endregion */

  /* #region  [- add -] */
  add = async () => {
    if (await this.validateFormOnButtonClick() === true) {
      let attachFile = {
        title: this.state.title,
        fileType: this.state.fileType,
        fileTitle: this.state.fileTitle,
        attachedFile: this.state.selectedFile,
        descriptionRow: this.state.descriptionRow,
      };
      this.state.rowData.push(attachFile);
      this.gridApi.setRowData(this.state.rowData);
      this.refreshForm();
    }
  };
  /* #endregion */

  /* #region  [- delete -] */
  delete = () => {
    if (this.state.rowIndex > -1 && this.state.rowIndex !== null) {
      var rows = []
      rows = this.state.rowData
      rows.splice(this.state.rowIndex, 1);
    }
    this.setState({
      rowIndex:null,
      isDeleteDisabled:true,
    })
    this.gridApi.setRowData(this.state.rowData);

  };
  /* #endregion */

  /* #region  [- submit -] */
  submit = () => {
    if (Object.keys(this.state.rowData).length > 0) {
      this.props.submitAttachedFile(this.state.rowData);
    }
    else {
      this.validateFormOnButtonClick()
    }

  };
  /* #endregion */

  //#endregion

  //#region [- render() -]
  render() {
    return (

      <Container >

        <Row name="row_01_AttachFileContents" >
          <Col name="form">
            <Card name="form">
              <Form style={{ padding: '2%' }}>

                <FormGroup name="title" style={{ textAlign: 'right' }} >
                  <Label for="Title">عنوان <span style={{ color: "red", fontSize: "20px" }}>
                    *
                              </span></Label>
                  <Row>
                  <Col sm="12" md='12' lg='6'>

                      <Input
                        type="text"
                        name="title"
                        id="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        invalid={this.state.isTitleInvalid}
                        valid={this.state.isTitleValid}
                      ></Input>
                      <FormFeedback>{this.state.errors.title}</FormFeedback>
                    </Col>
                  </Row>


                </FormGroup>

                <FormGroup name="description" style={{ textAlign: 'right' }} >
                  <Label for="Description">توضیحات</Label>
                  <Row>
                  <Col sm="12" md='12' lg='12'>
                      <Input
                        type="textarea"
                        name="descriptionRow"
                        id="descriptionRow"
                        value={this.state.descriptionRow}
                        onChange={this.handleChange}
                      ></Input>
                    </Col>
                  </Row>
                </FormGroup>

                <FormGroup name="file" style={{ textAlign: 'right' }}>
                  <Label for="file"> فایل پیوست<span style={{ color: "red", fontSize: "20px" }}>*</span></Label>
                  <Row>
                    <Col sm="12" md='12' lg='12'>
                      {this.state.fileLabel}
                      <FormFeedback>{this.state.errors.file}</FormFeedback>
                    </Col>
                  </Row>
                </FormGroup>

              </Form>
            </Card>
          </Col>
        </Row>

        <Row name="row_02_Buttons" style={{ paddingTop: '2%', paddingBottom: '2%', textAlign: 'right' }}>

          <Col sm="12" md='12' lg='12' name='col-01-Buttons'>
            <Button
              name='add'
              className='submit-button-style'
              onClick={this.add}
              disabled={this.state.isAddDisabled}>
              ذخیره
           </Button>
            <Button
              name='delete'
              className='submit-button-style mr-2'
              onClick={this.delete}
              disabled={this.state.isDeleteDisabled}>
              حذف
            </Button>

          </Col>

        </Row>

        <Row name="row_03_AgGrid">
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

        <Row name='row_04_SubmitCancel' style={{ paddingTop: '2%' }}>
         
          <Col sm="12"  md='12' lg='12' ame='col-01-Buttons' style={{ direction: 'ltr', paddingLeft: '2%' }}>
          <Button name='submit' className='submit-button-style mr-2'
              onClick={this.submit}
              disabled={this.state.isSubmitDisabled} >
              ثبت
           </Button>
            <Button name='cancel' className='cancel-button-style mr-2' onClick={this.onCancel}>
              لغو
            </Button>
 

          </Col>

        </Row>

      </Container>
    );
  }
  //#endregion

  //#endregion
}


export default AttachFile
